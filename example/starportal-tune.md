针对您描述的“切换语言后卡片不显示”以及“切换英语后分类仍为中文”且“没有任何console打印”的问题，核心原因通常归结为以下三点：

1.  **变量作用域问题（最主要原因）**：`currentLang` 在主逻辑中可能是局部变量，导致 `modern-filter.js` 读取到的仍然是初始值（通常是 undefined 或 zh-CN）。
2.  **执行顺序与引用问题**：`onLanguageChanged` 没有被正确调用，或者调用时数据尚未准备好。
3.  **数据结构兼容性**：数据源中的 `field` 字段可能没有英文对应值。

以下是具体的修复方案和代码修改建议：

### 第一步：修复变量作用域 (在主文件中)

在您的 `document.addEventListener` 代码中，请确保 `currentLang` 被赋值给全局对象 `window`，否则 `modern-filter.js` 里的函数可能读不到最新的语言状态。

**修改后的主入口代码：**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const preferredLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language || navigator.userLanguage;

    // 1. 定义临时变量
    let selectedLang; 

    if (preferredLang && translations[preferredLang]) {
        selectedLang = preferredLang;
    } else if (browserLang.startsWith('en') && translations['en']) {
        selectedLang = 'en';
    } else {
        selectedLang = 'zh-CN';
    }

    // 2. 【关键修复】强制更新全局 currentLang，确保 modern-filter.js 能读到
    window.currentLang = selectedLang; 
    
    // 如果您的代码里本来有 var currentLang; 或 let currentLang; 请确保赋值给了它
    // 为了保险，直接操作 window.currentLang

    document.getElementById('languageSelector').value = window.currentLang;

    loadApiSettings();
    setLanguage(window.currentLang);

    // 3. 【关键修复】确保 onLanguageChanged 存在再调用，并增加日志
    console.log('[Main] 准备调用 onLanguageChanged，当前语言:', window.currentLang);
    
    if (typeof window.onLanguageChanged === 'function') {
        window.onLanguageChanged();
    } else {
        console.error('[Main] 错误：onLanguageChanged 函数未定义，请检查 modern-filter.js 是否已加载');
    }

    // ... 后续代码保持不变 ...
    openTab(null, 'ai');
    // ...
});
```

---

### 第二步：修复 `modern-filter.js` 中的逻辑

主要修复 `extractCommonFieldKeywords` 的语言获取逻辑，以及 `onLanguageChanged` 的刷新机制。

请替换或修改 `modern-filter.js` 中的以下函数：

#### 1. 修复关键词提取 (解决分类名仍是中文的问题)

```javascript
// 修复后的 extractCommonFieldKeywords
function extractCommonFieldKeywords(category, lang) {
    // 【关键修复】优先使用传入的 lang，其次读取全局 window.currentLang
    const targetLang = lang || window.currentLang || 'zh-CN';
    
    console.log(`[DEBUG] 提取关键词 - 分类: ${category}, 语言: ${targetLang}`);

    const masters = getMastersByCategory(category);
    if (!masters.length) return [];
    
    const keywordCount = new Map();
    
    masters.forEach(master => {
        // 1. 尝试获取对应语言的字段
        let text = master.field?.[targetLang];
        
        // 【关键修复】如果英文为空，是否回退到中文？
        // 如果您的数据结构里 field 只是字符串而不是对象（例如 field: "物理"），
        // 那么 master.field['en'] 会是 undefined。
        // 如果数据只有中文，这里必须做兼容，否则英文模式下全是空的
        if (!text && typeof master.field === 'string') {
            // 如果 field 是纯字符串，说明没有多语言支持，直接使用
            text = master.field;
        } else if (!text && targetLang === 'en') {
            // 如果是对象但没有英文，回退到中文 (可选)
            // text = master.field?.['zh-CN']; 
        }

        if (!text) return;        
        
        // ... 原有的分割和处理逻辑保持不变 ...
        const parts = text.split(/[()（）\[\]、,，；;]+/) 
            .map(p => p.trim().replace(/[。.]$/, ''))
            .filter(p => p.length >= 2 && p.length <= 40);

        parts.forEach(k => {
            if (k && !/^[\d\s]+$/.test(k)) {
                keywordCount.set(k, (keywordCount.get(k) || 0) + 1);
            }
        });
    });
    
    // ... 排序和返回逻辑保持不变 ...
    return [...keywordCount.entries()]
        .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
        .slice(0, 8)
        .map(([k]) => k);
}
```

#### 2. 修复语言切换响应 (解决卡片不显示的问题)

卡片不显示通常是因为切换语言后，过滤器的状态丢了，或者没有触发重绘。

```javascript
// 修复后的 onLanguageChanged
function onLanguageChanged() {
    console.log('[DEBUG] onLanguageChanged 被触发，当前全局语言:', window.currentLang);

    // 仅在现代模式下处理
    const currentStyle = localStorage.getItem('northstarUIStyle');
    if (currentStyle === 'modern') {
        
        // 1. 重新生成胶囊按钮 (确保分类名称变成英文)
        refreshChipsForActiveTab();

        // 2. 强制刷新网格内容 (解决卡片消失问题)
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            // 找到刚才新生成的“全部/All”按钮
            const allBtn = activeTab.querySelector('.chip[data-filter="all"]');
            
            if (allBtn) {
                console.log(`[DEBUG] 触发重绘: ${activeTab.id}`);
                
                // 【关键操作】模拟点击或直接调用过滤
                // 必须传入 allBtn 作为 trigger，这样 filterModernGrid 才知道要显示“全部”
                // 并且这会重置内部的 filterVal 为 'all'
                allBtn.classList.add('active'); // 视觉上激活
                filterModernGrid(allBtn, activeTab.id); 
            } else {
                console.warn('[DEBUG] 未找到 All 按钮，尝试直接刷新');
                // 如果找不到按钮，手动调用一次生成全部数据的逻辑
                const grid = activeTab.querySelector('.leader-grid');
                if(grid) grid.innerHTML = ''; // 先清空
                // 传 null 表示没有特定过滤词，默认显示全部
                filterModernGrid({ dataset: { filter: 'all' } }, activeTab.id);
            }
        }
    } else {
        // 传统模式也可能需要刷新
        if (typeof populateLeaders === 'function') {
            populateLeaders();
        }
    }
}
```

### 为什么之前没有 Console Log？

如果之前没有任何打印，原因大概率是：
1.  **加载顺序错误**：`modern-filter.js` 加载得比主 JS 晚，或者在主 JS 执行 `DOMContentLoaded` 时，`onLanguageChanged` 还没被挂载到 `window` 上。
    *   **解决**：确保 `<script src="modern-filter.js"></script>` 在主逻辑脚本**之前**引入。
2.  **函数未暴露**：原代码最后虽然写了 `window.onLanguageChanged = onLanguageChanged;`，但如果这行代码因为前面的报错（如语法错误）没执行到，函数就不会暴露。

### 总结检查清单

1.  在主逻辑中，使用 `window.currentLang = ...` 赋值。
2.  确保 `modern-filter.js` 脚本标签在 HTML 中位于调用它的脚本之前。
3.  应用上述 `onLanguageChanged` 的修改，确保它显式地找到“All”按钮并触发 `filterModernGrid`，这样卡片才会重新渲染出来。
