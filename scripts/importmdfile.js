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

    // 跳过头部的元信息（标题 + Exported on + ---）
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

        // 原始文本行（不提前 trim）
        let rawLines = lines.slice(1);

        if (roleName === 'User') {
            // User 部分处理（保持简单）
            let userText = rawLines
                .map(l => l.startsWith('> ') ? l.substring(2) : l)
                .join('\n')
                .trim();

            pendingUser = { role: 'user', text: userText, leaderInfo: null };
            continue;
        }

        // ★ assistant 部分：核心规范化处理
        let textLines = rawLines.map(line => {
            // 只去掉引用符，不破坏段落
            if (line.trim().startsWith('>')) {
                return line.replace(/^>\s?/, '');
            }
            return line;
        });

        // 保留空行作为段落分隔，只清理行尾空白
        textLines = textLines.map(l => l.trimEnd());

        // 拼接回文本，压缩过多空行
        let text = textLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();

        // 移除可能的角色名重复开头
        if (roleName && text) {
            const prefixRegex = new RegExp(`^\\s*${escapeRegExp(roleName)}[:：]?\\s*`, 'i');
            text = text.replace(prefixRegex, '').trim();
        }

        // ★ 额外防护：提前移除所有行首 # 和 Setext 标题线，防止 marked 再生成标题
        text = text
            .replace(/^#{1,6}\s*/gm, '')                // 移除所有标题语法
            .replace(/^(?:-{3,}|={3,})\s*$/gm, '---')   // 分隔符降级为普通文本
            .trim();

        let leaderInfo = { name: roleName, field: '', contribution: '' };

        // 使用 pending 的 leaderInfo（如果有）
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

// 辅助函数（如果还没有）
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
    else if (normalized.match(/【\s*(问题|Question)\s*\/\s*(问题|Question)\s*】/i) ||
             normalized.includes('【北极星答复') ||
             normalized.includes('【NorthStar Answer')) {

        const parts = normalized.split(/【([^】]+)】:/).filter(Boolean);

        let currentRole = null;
        let questionBlockLines = [];

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();

            if (i % 2 === 0) {
                // 标题
                const title = part.toLowerCase();
                if (title.includes('问题') || title.includes('question')) {
                    currentRole = 'user';
                    questionBlockLines = [];
                } else if (title.includes('答复') || title.includes('northstar answer')) {
                    currentRole = 'assistant';
                    questionBlockLines = []; // 新的assistant块开始
                }
            } else {
                // 内容
                if (currentRole === 'user') {
                    questionBlockLines.push(part);

                    // 尝试在本块结束时提取真正的问题
                    const fullBlock = questionBlockLines.join('\n');
                    const userQuestion = extractRealUserQuestion(fullBlock);

                    if (userQuestion) {
                        history.push({
                            role: 'user',
                            text: userQuestion,
                            leaderInfo: null
                        });
                    }
                } else if (currentRole === 'assistant') {
                    let text = part.trim();

                    // 尝试提取人物名称（常见写法：作为 某某 (英文名)）
                    const leaderMatch = text.match(/^作为\s+([^（(]+)[（(]([^）)]+)[）)]/);
                    const leaderName = leaderMatch ? leaderMatch[1].trim() : null;

                    history.push({
                        role: 'assistant',
                        text,
                        leaderInfo: leaderName ? {
                            name: leaderName,
                            field: '',
                            contribution: ''
                        } : null
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
