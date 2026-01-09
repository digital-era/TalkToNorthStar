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

                importedHistory = parsed;
                renderDialogueCanvas();

                // 可选：添加成功提示（根据你的UI风格实现）
                // showToast(`已成功导入 ${parsed.length} 条对话记录`, 3000);

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

    // 触发选择对话框
    document.body.appendChild(input);
    input.click();

    // 清理（可选）
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

            // ★ 剥离 🧩 关联信息块（精确匹配三种常见写法）
            const infoBlockPatterns = [
                /\*\*🧩 关联北极星人物\*\*：\s*(.+?)\n\s*-\s*领域[：:]\s*(.+?)\n\s*-\s*贡献[：:]\s*(.+?)(?=\n|$)/s,
                /🧩 关联北极星人物：\s*(.+?)\n\s*-\s*领域：\s*(.+?)\n\s*-\s*贡献：\s*(.+?)(?=\n|$)/s,
                /\*\*🧩 关联北极星人物\*\*：(.+?)(?:- 领域：(.+?))?(?:- 贡献：(.+?))?/s
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
            const prefixRegex = new RegExp(`^\\s*${escapeRegExp(roleName)}[:：]?\\s*`, 'i');
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
    const history = [];

    const normalized = mdContent
        .replace(/\r\n/g, '\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    // ── 策略1：经典 ### 格式 ───────────────────────────────
   // 根据文件特征选择解析策略
    if (normalized.includes('### ')) {
        return parseOldFormatMD(normalized);
    }
    // ── 策略2：【问题 / Question】 + 【北极星答复】格式 ───────
    else if (normalized.includes('【问题 / Question】') || normalized.includes('【北极星答复')) {
        const parts = normalized.split(/【([^】]+)】:/).filter(Boolean);
    
        let currentRole = null;
        let questionBlock = '';  // 暂存【问题 / Question】的全部内容
    
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
    
            if (i % 2 === 0) {
                // 标题部分
                const title = part.toLowerCase();
                if (title.includes('问题') || title.includes('question')) {
                    currentRole = 'user';
                    questionBlock = '';
                } else if (title.includes('答复') || title.includes('northstar answer')) {
                    currentRole = 'assistant';
                }
            } else {
                // 内容部分
                if (currentRole === 'user') {
                    questionBlock += part + '\n';
    
                    // ★ 核心：从 questionBlock 中提取真正用户问题 + 北极星信息
                    const userQuestion = extractRealUserQuestion(questionBlock);
                    const leaderInfo = extractLeaderInfoFromPrompt(questionBlock);
    
                    history.push({
                        role: 'user',
                        text: userQuestion || '（未提取到具体问题）',
                        leaderInfo: null
                    });
    
                    // 如果提取到了 leaderInfo，保存给后续 assistant 使用
                    if (leaderInfo) {
                        history[history.length - 1]._pendingLeader = leaderInfo;
                    }
                } else if (currentRole === 'assistant') {
                    let text = part.trim();
    
                    // 使用从 prompt 中提取的 leaderInfo（优先级最高）
                    let leaderInfo = { name: 'Unknown', field: '', contribution: '' };
                    if (history.length > 0 && history[history.length - 1]._pendingLeader) {
                        leaderInfo = history[history.length - 1]._pendingLeader;
                        delete history[history.length - 1]._pendingLeader;
                    }
    
                    history.push({
                        role: 'assistant',
                        text: text,
                        leaderInfo: leaderInfo
                    });
                }
            }
        }
    }

    // 最终清理
    return history.filter(item => item && item.text?.trim());
}

/**
 * 从【问题 / Question】块中提取真正用户提出的核心问题
 * 主要依赖“用户问题:”关键字
 */
function extractRealUserQuestion(blockText) {
    const lines = blockText.split('\n').map(l => l.trim());

    for (let line of lines) {
        // 优先匹配最常见的格式：用户问题: "实际问题内容"
        const quotedMatch = line.match(/用户问题\s*[:：]\s*["“](.+?)["”]/);
        if (quotedMatch && quotedMatch[1]) {
            return quotedMatch[1].trim();
        }

        // 次优先：用户问题: 后面直接跟内容（不带引号）
        const colonMatch = line.match(/用户问题\s*[:：]\s*(.+)/);
        if (colonMatch && colonMatch[1]) {
            return colonMatch[1].trim();
        }
    }

    // 降级方案：返回块中最后出现的、看起来像问题的行（带问号或较长内容）
    for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        if (line.length > 8 &&
            (line.includes('？') || line.includes('?') || line.includes('请') || line.length > 30)) {
            return line.trim();
        }
    }

    // 最坏情况：返回块的前200字符（避免返回整块提示词）
    return blockText.trim().substring(0, 200);
}
