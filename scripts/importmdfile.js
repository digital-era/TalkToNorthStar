/**
 * 用户点击“导入历史MD”按钮时调用
 * 负责文件选择、读取和解析流程
 */
function importFromMD() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,text/markdown';
    input.style.display = 'none';

    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.name.toLowerCase().endsWith('.md')) {
            alert('请上传 .md 格式的文件');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert('文件大小超过5MB，请选择较小的文件');
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            try {
                const mdContent = event.target.result;
                const parsed = parseMDToHistory(mdContent);

                if (parsed.length === 0) {
                    alert('未能从文件中解析出有效的对话内容');
                    return;
                }

                // --- 修改点：保存到内存后立即持久化 ---
                importedHistory = parsed;
                if (typeof saveCanvasSession === 'function') {
                    saveCanvasSession(); 
                }
                
                renderDialogueCanvas();
                // ------------------------------------

            } catch (err) {
                console.error('导入MD解析失败:', err);
                alert('文件内容解析失败，可能格式不被当前版本支持');
            }
        };

        reader.onerror = function() {
            alert('无法读取文件，请确认文件是否正常');
        };

        reader.readAsText(file);
    };

    document.body.appendChild(input);
    input.click();

    setTimeout(() => {
        document.body.removeChild(input);
    }, 1000);
}

// 转义正则特殊字符的辅助函数（防止角色名中含有 . * 等字符导致正则失效）
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * 专门处理旧格式（### User: / ### 人物名:）的解析函数
 * 已针对头部元信息、🧩 信息块剥离、leaderInfo 正确传递进行优化
 */
/**
 * 专门处理旧格式（### User: / ### 人物名:）的解析函数
 * 已针对头部元信息、🧩 信息块剥离、leaderInfo 正确传递进行优化
 * 【修复】兼容移动端MD使用英文冒号(:)的情况
 */
function parseOldFormatMD(normalized) {
    const history = [];
    const sections = normalized.split(/^###\s+/m).filter(Boolean);

    // 跳过头部元信息
    let startIndex = 0;
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].trim().match(/对话北极星|Talk with North Stars|Exported on|---/)) {
            startIndex = i + 1;
            continue;
        }
        break;
    }

    let pendingUser = null;

    for (let i = startIndex; i < sections.length; i++) {
        const section = sections[i].trim();
        if (!section) continue;

        const lines = section.split('\n');
        const roleName = lines[0].trim().replace(/:$/, '');

        // 原始文本行
        let rawLines = lines.slice(1);

        if (roleName === 'User') {
            // ★ 关键强化：User 段落的完整清理 + 信息块剥离
            let userLines = rawLines.map(line => {
                // 去掉引用符
                if (line.trim().startsWith('>')) {
                    return line.replace(/^>\s?/, '');
                }
                return line;
            });

            let userText = userLines.join('\n');

            // ★【修复】剥离 🧩 关联信息块（兼容中英文冒号）
            const infoBlockPatterns = [
                // 模式1: **🧩 关联北极星人物**：姓名 (中文/英文冒号)
                /\*\*🧩 关联北极星人物\*\*[：:]\s*(.+?)\n\s*-\s*领域[：:]\s*(.+?)\n\s*-\s*贡献[：:]\s*(.+?)(?=\n|$)/s,
                // 模式2: 🧩 关联北极星人物：姓名 (无加粗，兼容冒号)
                /🧩 关联北极星人物[：:]\s*(.+?)\n\s*-\s*领域[：:]\s*(.+?)\n\s*-\s*贡献[：:]\s*(.+?)(?=\n|$)/s,
                // 模式3: 宽松匹配（兼容冒号，非贪婪）
                /\*\*🧩 关联北极星人物\*\*[：:](.+?)(?:-\s*领域[：:](.+?))?(?:-\s*贡献[：:](.+?))?/s
            ];

            let extractedLeaderInfo = null;
            for (const pattern of infoBlockPatterns) {
                const match = userText.match(pattern);
                if (match) {
                    const name = (match[1] || '').trim();
                    const field = (match[2] || '').trim();
                    const contribution = (match[3] || '').trim();

                    extractedLeaderInfo = {
                        name: name || 'Unknown',
                        field: field || '',
                        contribution: contribution || ''
                    };

                    // 移除整个信息块
                    userText = userText.replace(pattern, '').trim();
                    break;
                }
            }

            // 最终清理：保留段落换行，只去多余空行
            userText = userText
                .replace(/\n{3,}/g, '\n\n')
                .trim();

            pendingUser = {
                role: 'user',
                text: userText,
                leaderInfo: null
            };

            // 如果剥离出了信息块，保存给下一个 assistant 用
            if (extractedLeaderInfo) {
                pendingUser._tempLeaderInfo = extractedLeaderInfo;
            }

            continue;
        }

        // assistant 节点处理（保持换行修复）
        let textLines = rawLines.map(line => {
            if (line.trim().startsWith('>')) {
                return line.replace(/^>\s?/, '');
            }
            return line;
        });

        textLines = textLines.map(l => l.trimEnd());

        let text = textLines.join('\n')
            .replace(/\n{3,}/g, '\n\n')
            .trim();

        // 移除可能的角色名重复
        if (roleName && text) {
            const prefixRegex = new RegExp(`^\\s*${escapeRegExp(roleName)}[：:]?\\s*`, 'i');
            text = text.replace(prefixRegex, '').trim();
        }

        // 额外防护：移除残余标题语法
        text = text
            .replace(/^#{1,6}\s*/gm, '')
            .replace(/^(?:-{3,}|={3,})\s*$/gm, '---')
            .trim();

        let leaderInfo = { name: roleName, field: '', contribution: '' };

        // 使用 User 段提取的信息（最可靠）
        if (pendingUser && pendingUser._tempLeaderInfo) {
            leaderInfo = pendingUser._tempLeaderInfo;
            delete pendingUser._tempLeaderInfo;
        }

        if (pendingUser) {
            history.push(pendingUser);
            pendingUser = null;
        }

        history.push({
            role: 'assistant',
            text: text,
            leaderInfo: leaderInfo
        });
    }

    if (pendingUser) history.push(pendingUser);

    return history;
}

/**
 * 从【问题 / Question】块中精确提取用户真正提问
 * 优先级：1. “用户问题:”后双引号内容（最可靠）  2. 到第一个“请你作为”前的非空内容
 */
function extractRealUserQuestion(block) {
    console.group('【extractRealUserQuestion 调试】');
    console.log('原始输入 block（完整内容）：', block);
    console.log('block 长度：', block.length);
    console.log('block 前 200 字符：', block.substring(0, 200));

    block = block.trim();
    console.log('清理 trim 后 block：', block);

    // 步骤1：严格匹配“用户问题:”后（允许中间换行）的双引号内容
    const strictPattern = /用户问题\s*[:：]\s*(?:\n\s*)*["“]([^"”]+)["”]/;
    const strictMatch = block.match(strictPattern);
    console.log('步骤1 - strictPattern 正则：', strictPattern);
    console.log('步骤1 - 匹配结果 strictMatch：', strictMatch);
    if (strictMatch && strictMatch[1]) {
        const result = strictMatch[1].trim();
        console.log('【成功】步骤1 命中，返回：', result);
        console.groupEnd();
        return result;
    }

    // 步骤2：匹配“用户问题:”后到“请你作为”前的所有内容
    const untilCmd = block.match(/用户问题\s*[:：]\s*([\s\S]*?)(?=请你作为\s|$)/);
    console.log('步骤2 - untilCmd 正则：', /用户问题\s*[:：]\s*([\s\S]*?)(?=请你作为\s|$)/);
    console.log('步骤2 - 匹配结果 untilCmd：', untilCmd);
    if (untilCmd && untilCmd[1]) {
        let candidate = untilCmd[1]
            .replace(/^\n+/, '')           // 去掉冒号后的空行
            .replace(/["“]([^"”]*)["”]/g, '$1') // 提取引号内容
            .replace(/\s+$/, '')
            .trim();

        console.log('步骤2 - 清理后的 candidate：', candidate);
        if (candidate && !candidate.includes('请你作为')) {
            console.log('【成功】步骤2 命中，返回：', candidate);
            console.groupEnd();
            return candidate;
        }
    }

    // 步骤3：兜底取第一个完整双引号
    const firstQuote = block.match(/["“](.+?)["”]/);
    console.log('步骤3 - firstQuote 正则：', /["“](.+?)["”]/);
    console.log('步骤3 - 匹配结果 firstQuote：', firstQuote);
    if (firstQuote && firstQuote[1]) {
        const result = firstQuote[1].trim();
        console.log('【兜底成功】步骤3 命中，返回：', result);
        console.groupEnd();
        return result;
    }

    console.log('【兜底失败】未匹配到任何有效内容，返回默认值');
    console.groupEnd();
    return '（未提取到具体问题）';
}



/**
 * 从背景设定中提取北极星人物信息
 */
function extractLeaderInfoFromPrompt(block) {
    const info = { name: 'Unknown', field: '', contribution: '' };

    // 提取“你是 XXX (英文名)”
    const nameMatch = block.match(/你是\s+([^（(]+)[（(]([^）)]+)[）)]/);
    if (nameMatch) {
        info.name = nameMatch[1].trim();
    }

    // 提取“主要贡献:”
    const contribMatch = block.match(/主要贡献[：:]\s*([^\n]+?)(?=\n\s*-|$)/);
    if (contribMatch) {
        info.contribution = contribMatch[1].trim();
    }

    // 提取“专业领域:”
    const fieldMatch = block.match(/专业领域[：:]\s*([^\n]+?)(?=\n\s*-|$)/);
    if (fieldMatch) {
        info.field = fieldMatch[1].trim();
    }

    return info.name !== 'Unknown' ? info : null;
}

/**
 * 从MD内容解析出 conversationHistory 格式
 * 支持两种主要导出格式
 */
function parseMDToHistory(mdContent) {
    let history = []; // 使用 let，允许重新赋值

    const normalized = mdContent
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    if (!normalized) return [];

    // ── 策略1：尝试解析【问题 / Question】格式 ───────
    // 只有当解析出内容了，才算成功
    if (normalized.includes('【问题 / Question】') || normalized.includes('【北极星答复】')) {
        const parts = normalized.split(/【([^】]+)】\s*[:：]/).filter(Boolean);
        let currentRole = null;
        let questionBlock = '';
        const tempHistory = []; // 临时存放，确认解析成功后再合并

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (i % 2 === 0) {
                const title = part.toLowerCase();
                if (title.includes('问题') || title.includes('question')) {
                    currentRole = 'user';
                    questionBlock = '';
                } else if (title.includes('答复') || title.includes('northstar answer')) {
                    currentRole = 'assistant';
                }
            } else {
                if (currentRole === 'user') {
                    questionBlock += part + '\n';
                    const userQuestion = extractRealUserQuestion(questionBlock);
                    const leaderInfo = extractLeaderInfoFromPrompt(questionBlock);
                    tempHistory.push({
                        role: 'user',
                        text: userQuestion || '（未提取到具体问题）',
                        leaderInfo: null
                    });
                    if (leaderInfo) tempHistory[tempHistory.length - 1]._pendingLeader = leaderInfo;
                } else if (currentRole === 'assistant') {
                    let leaderInfo = { name: 'Unknown', field: '', contribution: '' };
                    if (tempHistory.length > 0 && tempHistory[tempHistory.length - 1]._pendingLeader) {
                        leaderInfo = tempHistory[tempHistory.length - 1]._pendingLeader;
                        delete tempHistory[tempHistory.length - 1]._pendingLeader;
                    }
                    tempHistory.push({
                        role: 'assistant',
                        text: part.trim(),
                        leaderInfo: leaderInfo
                    });
                }
            }
        }
        
        // 只有当策略1确实解析出了有效条目，才采纳
        if (tempHistory.length > 0) {
            history = tempHistory;
        }
    }
    
    // ── 策略2：尝试解析旧格式（### 格式） ───────────────────────────────
    // 【修改核心】：增加严苛的“指纹校验”
    // 必须同时满足三个条件（或其关键组合），才会被认定为是旧版导出的对话记录
    
    // 1. 特征一：是否存在 "### User" 分隔符（结构特征）
    const hasUserSeparator = /^###\s+User/im.test(normalized);
    
    // 2. 特征二：是否存在特定的文件头标识（身份特征）
    // 匹配 "# 对话北极星" 或 "Talk with North Stars"
    const hasHeaderSignature = /#\s*(?:对话北极星|Talk with North Stars)/i.test(normalized);
    
    // 3. 特征三：是否存在导出时间戳（辅助特征）
    const hasExportMeta = />\s*Exported on/i.test(normalized);

    // 【判定逻辑】：
    // 必须有 "### User" 结构，且 (包含标题签名 或 包含导出时间)
    // 这样既能防止普通MD文章误判，也能兼容用户可能不小心删掉了一行头部的边缘情况
    const isOldFormatDialogue = hasUserSeparator && (hasHeaderSignature || hasExportMeta);

    if (history.length === 0 && isOldFormatDialogue) {
        // 只有验明正身后，才调用旧格式解析器
        const oldFormatResult = parseOldFormatMD(normalized);
        if (oldFormatResult.length > 0) {
            history = oldFormatResult;
        }
    }

    // ── 策略3（兜底）：如果不符合上述任何结构，或上述解析均失效 ──────────
    // 无论前面命中了什么关键字，只要最终结果为空，就强行把全文当作一个回答
    if (history.length === 0) {
        history.push({
            role: 'assistant',
            text: normalized,
            leaderInfo: { 
                name: 'Imported Doc', 
                field: '', 
                contribution: '' 
            }
        });
    }

    return history.filter(item => item && item.text?.trim());
}
