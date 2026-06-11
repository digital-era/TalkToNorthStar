// ═══ 多语言文本（合并到全局）═══
const shareTextKeys = {
    'noAIContent': { 'zh-CN': '只能生成AI回答节点的页面', 'en-US': 'Can only generate pages for AI response nodes' },
    'msgNotFound': { 'zh-CN': '消息不存在', 'en-US': 'Message not found' },
    'pageTitleSuffix': { 'zh-CN': '· 对话北极星', 'en-US': '· Talk with North Stars' },
    'defaultTitle': { 'zh-CN': '星空夜话', 'en-US': 'Starry Night' },
    'exploreBoundary': { 'zh-CN': '书写思想旋律，点燃潜能火花', 'en-US': 'Compose the melody of thought, ignite the spark of potentiality.' },
    'pageGenerated': { 'zh-CN': '页面已生成', 'en-US': 'Page generated' },
    'coverTooLarge': { 'zh-CN': '图片过大，请选择5MB以内', 'en-US': 'Image too large, please choose under 5MB' },
    'coverImported': { 'zh-CN': '封面已导入', 'en-US': 'Cover imported' },
    'coverImportedTitle': { 'zh-CN': '已导入封面，点击更换', 'en-US': 'Cover imported, click to change' },
    'importCoverTitle': { 'zh-CN': '导入封面', 'en-US': 'Import Cover' },
    'generatePageTitle': { 'zh-CN': '生成页面', 'en-US': 'Generate Page' },
    'popupBlocked': { 'zh-CN': '请允许浏览器打开新标签页', 'en-US': 'Please allow the browser to open a new tab' },
};

// 合并到全局 translations
function initShareTexts() {
    const langs = ['zh-CN', 'en-US'];
    langs.forEach(lang => {
        if (!window.translations[lang]) window.translations[lang] = {};
        Object.entries(shareTextKeys).forEach(([key, values]) => {
            window.translations[lang][key] = values[lang];
        });
    });
}

// ═══ 默认封面缓存 ═══
const CoverCache = {
    _dataUrl: null,
    _loading: null,

    async get() {
        if (this._dataUrl) return this._dataUrl;
        if (this._loading) return this._loading;
        
        this._loading = this._load();
        const result = await this._loading;
        this._dataUrl = result;
        this._loading = null;
        return result;
    },

    async _load() {
        try {
            const response = await fetch(window.location.origin + '/images/ambient-starry-column.jpg');
            if (!response.ok) throw new Error('HTTP ' + response.status);
            
            const blob = await response.blob();
            
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (e) {
            console.warn('[CoverCache] Failed to load default cover:', e);
            return null;  // 用 CSS 渐变兜底
        }
    },

    clear() {
        this._dataUrl = null;
    }
};

function generateNodePage(msg) {
    const lang = window.currentLang || 'zh-CN';
    const _t = (key) => getFieldValue(shareTextKeys[key], lang) || key;

    if (!msg || msg.role === 'user') {
        showToast(_t('noAIContent'), 'warning');
        return;
    }

    // ═══ 关键：同步打开空窗口（必须在用户点击事件内执行）═══
    const newWin = window.open('', '_blank');
    if (!newWin) {
        showToast(_t('popupBlocked'), 'warning');
        return;
    }

    // 异步获取封面并渲染
    renderPageContent(msg, newWin, _t, lang);
}

/**
 * 异步获取封面并写入页面内容
 */
async function renderPageContent(msg, newWin, _t, lang) {
    // 获取封面
    let coverUrl = msg._cover;
    if (!coverUrl) {
        coverUrl = await CoverCache.get();
    }

    const hasCover = coverUrl && coverUrl.startsWith('data:');
    const heroStyle = hasCover ? '' : 'background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);';
    const heroHtml = hasCover
        ? `<img src="${coverUrl}" alt="${escapeHtml(msg.leaderInfo?.name || '')}" style="width:100%;height:100%;object-fit:cover;display:block;">`
        : '';

    const title = msg.leaderInfo?.name || _t('defaultTitle');
    const field = msg.leaderInfo?.field || '';

    // Markdown → HTML
    let htmlContent = msg._processedText;
    if (!htmlContent) {
        if (typeof parseMarkdownWithMath === 'function') {
            htmlContent = parseMarkdownWithMath(msg.text);
        } else if (typeof parseMarkdown === 'function') {
            htmlContent = parseMarkdown(msg.text);
        } else if (typeof simpleMarkdownToHtml === 'function') {
            htmlContent = simpleMarkdownToHtml(msg.text);
        } else {
            htmlContent = escapeHtml(msg.text).replace(/\n/g, '<br>');
        }
    }
    htmlContent = htmlContent.replace(/<img[^>]*>/g, '');

    // 下载按钮文本
    const saveText = lang === 'zh-CN' ? '保存页面' : 'Save Page';

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
        padding-bottom: 100px;  /* ← 给底部下载按钮留空间 */
    }
    .hero {
        width: 100%;
        margin-top: 24px;
        padding: 20px 0;
    
        background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .hero img {
        width: 90%;
        max-width: 1000px;
        height: auto;
        display: block;
    }
    
    @media (max-width: 768px) {
        .hero {
            padding: 10px 0;
        }
    
        .hero img {
            width: 100%;
            max-width: none;
        }
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
        color: #d4c4a8;
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
        color: #d4c4a8;
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
        padding: 40px 24px 80px;  /* ← 底部增加padding，避免与下载按钮重叠 */
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
        color: #fff;
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
    /* ═══ 下载按钮样式 ═══ */
    .download-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px 24px;
        background: rgba(10, 14, 39, 0.95);
        border-top: 1px solid rgba(102, 126, 234, 0.2);
        display: flex;
        justify-content: center;
        gap: 12px;
        z-index: 100;
        backdrop-filter: blur(10px);
    }
    .download-btn {
        background: #667eea;
        color: white;
        border: none;
        padding: 12px 32px;
        border-radius: 24px;
        font-size: 15px;
        cursor: pointer;
        letter-spacing: 1px;
        transition: all 0.2s;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .download-btn:hover {
        background: #5a6fd6;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    }
    .download-btn:active {
        transform: translateY(0);
    }
</style>
</head>
<body>
<div class="stars"></div>

<div class="hero" style="${heroStyle}">
    ${heroHtml}
</div>

<div class="content">
    <div class="meta">
        <div class="meta-name">${escapeHtml(title)}</div>
        <div class="meta-field">${escapeHtml(field)}</div>
    </div>
    <div class="body-text">${htmlContent}</div>
</div>

<div class="footer">
    <div class="footer-logo">✦ ${_t('pageTitleSuffix')}</div>
    <div class="footer-text">${_t('exploreBoundary')}</div>
</div>

<!-- ═══ 下载按钮 ═══ -->
<div class="download-bar">
    <button class="download-btn" onclick="downloadPage()">
        <span>💾</span>
        <span>${saveText}</span>
    </button>
</div>

<script>
function downloadPage() {
    const html = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = document.title.replace(/[\\\\/:*?"<>|]/g, '_') + '.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
}
</script>
</body>
</html>`;

    // ═══ 关键：用 document.write 写入，避免 Blob URL 被清理 ═══
    newWin.document.open();
    newWin.document.write(html);
    newWin.document.close();

    showToast(_t('pageGenerated'), 'success');
}


/**
 * 导入节点封面（支持多语言）
 */
// ═══ 导入封面 ═══
function importNodeCover(msg, btnElement) {
    const lang = window.currentLang || 'zh-CN';
    const _t = (key) => getFieldValue(shareTextKeys[key], lang) || key;

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
            msg._cover = dataUrl;
            
            // 同步到历史数组（通过引用或 id）
            [importedHistory, conversationHistory].forEach(arr => {
                if (!Array.isArray(arr)) return;
                const found = arr.find(h => h === msg || h.id === msg.id);
                if (found && found !== msg) found._cover = dataUrl;
            });
            
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
