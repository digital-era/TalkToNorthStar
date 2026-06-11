// ═══ 多语言文本（加到项目现有的 translations 中）═══
const shareTexts = {
    pageTitleSuffix: { 'zh-CN': '· 星空夜话', 'en-US': '· Starry Night' },
    defaultTitle: { 'zh-CN': '星空夜话', 'en-US': 'Starry Night' },
    viewFullDialogue: { 'zh-CN': '查看完整对话', 'en-US': 'View Full Dialogue' },
    exploreBoundary: { 'zh-CN': '探索思想的边界', 'en-US': 'Explore the Boundary of Thought' },
    pageGenerated: { 'zh-CN': '页面已生成', 'en-US': 'Page generated' },
};

/**
 * 生成节点独立浏览页面（支持多语言）
 */
function generateNodePage(msg) {
    const lang = window.currentLang || 'zh-CN';
    const _t = (key) => getFieldValue(shareTexts[key], lang) || key;

    // ═══ 直接判断传入的消息 ═══
    if (!msg) {
        showToast(_t('msgNotFound'), 'error');
        return;
    }

    // 保险：如果不是 AI 回答，找下一条 AI
    if (msg.role === 'user') {
        showToast(_t('noAIContent'), 'warning');
        return;
    }

    const coverUrl = msg._cover || '/images/ambient-starry-column.jpg';
    const title = msg.leaderInfo?.name || _t('defaultTitle');
    const field = msg.leaderInfo?.field || '';

    // Markdown → HTML
    let htmlContent = msg._processedText;
    if (!htmlContent) {
        htmlContent = typeof parseMarkdownWithMath === 'function'
            ? parseMarkdownWithMath(msg.text)
            : (typeof parseMarkdown === 'function'
                ? parseMarkdown(msg.text)
                : simpleMarkdownToHtml(msg.text));
    }
    htmlContent = htmlContent.replace(/<img[^>]*>/g, '');

    const html = `<!DOCTYPE html>
<html lang="${lang === 'zh-CN' ? 'zh-CN' : 'en'}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)} ${_t('pageTitleSuffix')}</title>
<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ${lang === 'zh-CN' ? "'PingFang SC', 'Microsoft YaHei'" : "'Helvetica Neue', Arial"}, sans-serif;
        background: #0a0e27;
        color: #e0e0e0;
        line-height: 1.9;
        min-height: 100vh;
    }
    .hero {
        position: relative;
        width: 100%;
        height: 45vh;
        min-height: 280px;
        max-height: 480px;
        overflow: hidden;
    }
    .hero img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    .hero::after {
        content: '';
        position: absolute;
        bottom: 0; left: 0; right: 0;
        height: 120px;
        background: linear-gradient(transparent, #0a0e27);
    }
    .content {
        max-width: 720px;
        margin: 0 auto;
        padding: 40px 24px 60px;
    }
    .meta {
        margin-bottom: 32px;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(197, 160, 89, 0.2);
    }
    .meta-name {
        font-size: 26px;
        font-weight: bold;
        color: #fff;
        margin-bottom: 6px;
    }
    .meta-field {
        font-size: 13px;
        color: #667eea;
        letter-spacing: 1px;
    }
    .body-text {
        font-size: 16px;
        line-height: 1.9;
        color: #c5c8d6;
    }
    .body-text p { margin-bottom: 1.2em; text-align: justify; }
    .body-text h1, .body-text h2, .body-text h3, .body-text h4, .body-text h5, .body-text h6 {
        color: #fff;
        margin: 1.5em 0 0.8em;
        line-height: 1.4;
    }
    .body-text h1 {
        font-size: 1.5em;
        border-left: 4px solid #c5a059;
        padding-left: 12px;
    }
    .body-text h2 {
        font-size: 1.3em;
        border-left: 3px solid rgba(197, 160, 89, 0.6);
        padding-left: 10px;
    }
    .body-text h3 { font-size: 1.15em; color: #d4c4a8; }
    .body-text strong, .body-text b { color: #fff; font-weight: 600; }
    .body-text blockquote {
        margin: 1.2em 0;
        padding: 12px 20px;
        border-left: 3px solid #667eea;
        background: rgba(102, 126, 234, 0.08);
        color: #b0b8d0;
        font-style: italic;
    }
    .body-text blockquote p:last-child { margin-bottom: 0; }
    .body-text ul, .body-text ol { margin: 1em 0; padding-left: 2em; }
    .body-text li { margin-bottom: 0.5em; }
    .body-text code {
        background: rgba(255,255,255,0.08);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'SF Mono', Monaco, monospace;
        font-size: 0.9em;
        color: #e0c080;
    }
    .body-text pre {
        background: rgba(0,0,0,0.3);
        padding: 16px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 1em 0;
    }
    .body-text pre code { background: none; padding: 0; }
    .body-text hr {
        border: none;
        height: 1px;
        background: linear-gradient(to right, transparent, rgba(197,160,89,0.3), transparent);
        margin: 2em 0;
    }
    .body-text a {
        color: #667eea;
        text-decoration: none;
        border-bottom: 1px solid rgba(102,126,234,0.3);
    }
    .body-text a:hover { border-bottom-color: #667eea; }
    .footer {
        text-align: center;
        padding: 40px 24px;
        border-top: 1px solid rgba(255,255,255,0.08);
    }
    .footer-logo {
        font-size: 18px;
        color: #667eea;
        margin-bottom: 8px;
        letter-spacing: 2px;
    }
    .footer-text {
        font-size: 12px;
        color: rgba(255,255,255,0.3);
    }
    .stars {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        pointer-events: none;
        z-index: -1;
        opacity: 0.4;
        background-image: 
            radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.4), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.3), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.4), transparent);
        background-size: 220px 220px;
    }
</style>
</head>
<body>
<div class="stars"></div>

<div class="hero">
    <img src="${coverUrl}" alt="${escapeHtml(title)}" 
         onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,#1a1a2e,#16213e)'">
</div>

<div class="content">
    <div class="meta">
        <div class="meta-name">${escapeHtml(title)}</div>
        <div class="meta-field">${escapeHtml(field)}</div>
    </div>
    <div class="body-text">${htmlContent}</div>
</div>

<div class="footer">
    <div class="footer-logo">✦ ${_t('defaultTitle')}</div>
    <div class="footer-text">${_t('exploreBoundary')}</div>
</div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    window.open(URL.createObjectURL(blob), '_blank');
    
    showToast(_t('pageGenerated'), 'success');
}

/**
 * 导入节点封面（支持多语言）
 */
/**
 * 导入节点封面
 * @param {Object} msg - 消息对象（直接传入）
 * @param {HTMLElement} btnElement - 按钮元素
 */
function importNodeCover(msg, btnElement) {
    const lang = window.currentLang || 'zh-CN';
    const _t = (key) => getFieldValue(shareTexts[key], lang) || key;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        if (file.size > 5 * 1024 * 1024) {
            showToast(_t('coverTooLarge'), 'warning');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target.result;
            
            // 直接写入消息对象
            msg._cover = dataUrl;
            
            // 同步到历史数组中的同一条消息
            [importedHistory, conversationHistory].forEach(arr => {
                const found = arr.find(h => h === msg);  // 同一引用
                if (found) found._cover = dataUrl;
            });
            
            // 视觉反馈
            if (btnElement) {
                btnElement.classList.add('has-cover');
                btnElement.title = _t('coverImportedTitle');
            }
            
            if (typeof saveCanvasSession === 'function') saveCanvasSession();
            showToast(_t('coverImported'), 'success');
        };
        reader.readAsDataURL(file);
    };
    
    input.click();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
