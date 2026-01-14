// modern-filter.js
// 现代风格相关完整逻辑：胶囊动态生成、过滤动画、风格切换
// 包含详细调试日志，用于排查搜索框闪现/不显示、过滤结果异常等问题

// 防抖工具函数
function debounce(fn, delay = 250) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// ──────────────────────────────────────────────
// 1. 获取分类数据
// ──────────────────────────────────────────────
function getMastersByCategory(category) {
    if (window.allData && allData[category]) {
        // console.log(`[DEBUG] 从 allData 获取 ${category} 数据`);
        return allData[category];
    }
    const map = {
        'ai': typeof aiMasters !== 'undefined' ? aiMasters : [],
        'quantum': typeof QuantumMasters  !== 'undefined' ? QuantumMasters  : [],
        'universe': typeof universeMasters !== 'undefined' ? universeMasters : [],
        'humanities': typeof humanitiesMasters !== 'undefined' ? humanitiesMasters : [],
        'art': typeof artMasters !== 'undefined' ? artMasters : [],
        'finance': typeof financeMasters !== 'undefined' ? financeMasters : [],
        'sport': typeof sportMasters !== 'undefined' ? sportMasters : [],
        'chinaEntrepreneurs': typeof chinaEntrepreneurs !== 'undefined' ? chinaEntrepreneurs : []
    };
    return map[category] || [];
}

// ──────────────────────────────────────────────
// 2. 从 field 提取关键词 (最终融合版)
// ──────────────────────────────────────────────
function extractCommonFieldKeywords(category, lang) {
    const targetLang = lang || window.currentLang || 'zh-CN';
    const masters = getMastersByCategory(category);
    if (!masters || !masters.length) return [];
    
    const keywordCount = new Map();
    
    masters.forEach(master => {
        // 稳健的数据读取
        let text = '';
        if (master.field && typeof master.field === 'object') {
            text = master.field[targetLang] || master.field['en'] || master.field['zh-CN'] || '';
        } else if (typeof master.field === 'string') {
            text = master.field;
        }

        if (!text) return;        
        
        // 分割逻辑：保留英文短语空格，同时兼容中文和常见标点
        const parts = text.split(/[()（）\[\]、,，；;./]+/) 
            .map(p => p.trim().replace(/[。.。]+$/, ''))
            .filter(p => p && p.length >= 2 && p.length <= 60);

        parts.forEach(k => {
            if (!/^[\d\s]+$/.test(k)) {
                const keyLower = k.toLowerCase();
                if (!keywordCount.has(keyLower)) {
                    keywordCount.set(keyLower, { text: k, count: 0 });
                }
                keywordCount.get(keyLower).count++;
            }
        });
    });

    // 返回所有结果，按频率排序
    return [...keywordCount.values()]
        .sort((a, b) => b.count - a.count || b.text.length - a.text.length)
        .map(item => item.text);
}

// ──────────────────────────────────────────────
// 3. 生成胶囊
// ──────────────────────────────────────────────
function generateChipsForCategory(category, container) {
    if (!container) return;
    container.innerHTML = '';

    const lang = window.currentLang || 'zh-CN';

    // 生成 "All" 按钮
    const allBtn = document.createElement('button');
    allBtn.className = 'chip active';
    allBtn.dataset.filter = 'all';
    
    let allText = '全部';
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang].all) {
        allText = translations[lang].all;
    } else if (lang === 'en') {
        allText = 'All';
    }
    allBtn.textContent = allText;
    
    allBtn.addEventListener('click', () => filterModernGrid(allBtn, category));
    container.appendChild(allBtn);

    // 生成关键词按钮
    const keywords = extractCommonFieldKeywords(category, lang);
    
    if (keywords.length > 0) {
        keywords.forEach(kw => {
            const btn = document.createElement('button');
            btn.className = 'chip';
            btn.dataset.filter = kw;
            btn.textContent = kw;
            btn.addEventListener('click', () => filterModernGrid(btn, category));
            container.appendChild(btn);
        });
    }
}

// ──────────────────────────────────────────────
// 4. 刷新当前 tab 胶囊
// ──────────────────────────────────────────────
function refreshChipsForActiveTab() {
    const tab = document.querySelector('.tab-content.active');
    if (tab) {
        const container = tab.querySelector('.filter-chips-container');
        generateChipsForCategory(tab.id, container);
    }
}

// ──────────────────────────────────────────────
// 5. 风格切换核心函数
// ──────────────────────────────────────────────
function switchUIStyle(style) {
    style = (style === 'modern') ? 'modern' : 'traditional';
    localStorage.setItem('northstarUIStyle', style);
    document.body.classList.toggle('modern-mode', style === 'modern');

    // 处理容器和按钮
    document.querySelectorAll('.leader-scroll-container').forEach(container => {
        const leftBtn = container.querySelector('.scroll-button.left');
        const rightBtn = container.querySelector('.scroll-button.right');
        const grid = container.querySelector('.leader-grid');

        container.style.display = 'flex';
        container.style.overflow = 'hidden';

        if (style === 'modern') {
            // === 现代模式 ===
            if (leftBtn) leftBtn.style.display = 'block';
            if (rightBtn) rightBtn.style.display = 'block';

            if (grid) {
                grid.style.display = 'flex';
                grid.style.flexWrap = 'nowrap';
                grid.style.justifyContent = 'flex-start';
                grid.style.gap = '20px';
                grid.style.overflowX = 'auto';
                grid.style.scrollBehavior = 'smooth';
                grid.style.scrollbarWidth = 'none'; // Firefox
                grid.style.msOverflowStyle = 'none'; // IE
            }
        } else {
            // === 传统模式 ===
            if (leftBtn) leftBtn.style.display = 'block';
            if (rightBtn) rightBtn.style.display = 'block';

            if (grid) {
                grid.style.display = 'flex';
                grid.style.flexWrap = 'nowrap';
                grid.style.justifyContent = 'flex-start';
                grid.style.gap = '0';
                grid.style.overflowX = 'auto';
                grid.style.scrollbarWidth = 'auto';
            }
            if (typeof populateLeaders === 'function') {
                populateLeaders();
            }
        }
        
        if (typeof updateScrollButtonStates === 'function' && grid) {
             updateScrollButtonStates(grid);
        }
    });

    updateModernFilterBarVisibility();

    if (style === 'modern') {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            filterModernGrid(null, activeTab.id);
        }
    }
}

// ──────────────────────────────────────────────
// 6. 初始化恢复上次风格
// ──────────────────────────────────────────────
function initUIStyle() {
    const saved = localStorage.getItem('northstarUIStyle') || 'traditional';
    const select = document.getElementById('uiStyle');
    if (select) select.value = saved;
    switchUIStyle(saved);
}

// ──────────────────────────────────────────────
// 7. 过滤核心函数 (关键修正：增加 ScrollIntoView)
// ──────────────────────────────────────────────
function filterModernGrid(trigger, category = null) {
    const tab = category ? document.getElementById(category) : document.querySelector('.tab-content.active');
    if (!tab) return;
    const grid = tab.querySelector('.leader-grid');
    if (!grid) return;

    const lang = window.currentLang || 'zh-CN';

    let filterVal = 'all';
    if (trigger) {
        if (trigger.tagName === 'INPUT') {
            filterVal = trigger.value.trim();
        } else if (trigger.dataset?.filter) {
            filterVal = trigger.dataset.filter;
        }
    }

    // 更新胶囊状态 & 自动滚动
    if (trigger && trigger.classList?.contains('chip')) {
        tab.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
        trigger.classList.add('active');
        trigger.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

    const masters = getMastersByCategory(tab.id);
    let filtered = masters;

    if (filterVal !== 'all' && filterVal) {
        const q = filterVal.toLowerCase();
        filtered = masters.filter(m => {
            const getName = (obj) => (typeof obj === 'string' ? obj : (obj[lang] || obj['en'] || obj['zh-CN'] || ''));
            const searchStr = [m.name, getName(m.contribution), getName(m.field), getName(m.remarks)].join(' ').toLowerCase();
            return searchStr.includes(q);
        });
    }

    grid.innerHTML = '';

    if (filtered.length === 0) {
        const msg = document.createElement('div');
        msg.className = 'no-result-message';
        const t = translations[lang] || translations['en'] || {};
        msg.textContent = t.noMatchingLeader || 'No matching results';
        grid.appendChild(msg);
    } else {
        filtered.forEach((leader, i) => {
            const card = document.createElement('div');
            card.className = 'leader-card';
            card.dataset.id = leader.id;
            
            // 辅助函数
            const getText = (fieldObj) => {
                if (!fieldObj) return '';
                if (typeof fieldObj === 'string') return fieldObj;
                return fieldObj[lang] || fieldObj['en'] || fieldObj['zh-CN'] || '';
            };

            const txtContrib = getText(leader.contribution);
            const txtField = getText(leader.field);
            const txtRemarks = getText(leader.remarks);
            
            const t = translations[lang] || translations['zh-CN'] || {};
            
            card.innerHTML = `
                <h3>${leader.name}</h3>
                <p><strong>${t.labelContribution || 'Contribution'}：</strong> ${txtContrib}</p>
                <p class="field"><strong>${t.labelField || 'Field'}：</strong> ${txtField}</p>
                ${txtRemarks ? `<p class="remarks"><strong>${t.labelRemarks || 'Remarks'}：</strong> ${txtRemarks}</p>` : ''}
            `;
            
            // --- 【核心修复】 单选逻辑开始 ---
            card.onclick = function() {
                // 1. 清除当前网格内所有卡片的选中状态
                // 注意：这里使用 grid.querySelectorAll 确保只影响当前 Tab
                grid.querySelectorAll('.leader-card').forEach(c => c.classList.remove('selected'));

                // 2. 给当前点击的卡片添加选中状态
                this.classList.add('selected');

                // 3. 调用原有的详情展示逻辑
                if(typeof selectLeader === 'function') {
                    selectLeader(leader, tab.id, this);
                }
            };
            // --- 【核心修复】 单选逻辑结束 ---

            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = `all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s`;
            grid.appendChild(card);
            
            requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    setTimeout(() => {
        if(typeof updateScrollButtonStates === 'function') updateScrollButtonStates(grid);
    }, 100);
}

// ──────────────────────────────────────────────
// 8. 其他辅助函数
// ──────────────────────────────────────────────
function updateModernFilterBarVisibility() {
    const isModern = localStorage.getItem('northstarUIStyle') === 'modern';
    document.querySelectorAll('.modern-filter-bar').forEach(el => {
        el.style.display = isModern ? 'flex' : 'none';
    });
    if (isModern) refreshChipsForActiveTab();
}

// 搜索框切换 (关键修正：移除 display 操作，配合 CSS 动画)
function toggleModernSearch(iconElement) {
    const wrapper = iconElement.closest('.modern-search-wrapper');
    if (!wrapper) return;

    const input = wrapper.querySelector('.modern-search-input');
    
    // 切换 class，让 CSS 处理宽度动画
    wrapper.classList.toggle('search-active');
    const isActive = wrapper.classList.contains('search-active');

    console.log('[DEBUG] 搜索框状态:', isActive ? '展开' : '收起');

    if (isActive) {
        if (input) input.focus();
    } else {
        if (input) {
            input.value = '';
            input.blur();
            // 搜索框收起时，重置过滤
            filterModernGrid(input); 
        }
    }
}

function onTabChanged() {
    if (localStorage.getItem('northstarUIStyle') === 'modern') {
        refreshChipsForActiveTab();
        const tab = document.querySelector('.tab-content.active');
        if (tab) {
            const allChip = tab.querySelector('.chip[data-filter="all"]');
            if (allChip) filterModernGrid(allChip);
        }
    }
}

function onLanguageChanged() {
    const langSelect = document.getElementById('languageSelector');
    if (langSelect) window.currentLang = langSelect.value;
    
    console.log('[DEBUG] 语言切换为:', window.currentLang);

    const currentStyle = localStorage.getItem('northstarUIStyle');
    if (currentStyle === 'modern') {
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab) return;

        // 重新生成胶囊
        refreshChipsForActiveTab();

        // 强制触发全部
        setTimeout(() => {
            const allBtn = activeTab.querySelector('.chip[data-filter="all"]');
            if (allBtn) {
                // 使用 click() 模拟点击，确保触发 scrollIntoView 和 active 状态更新
                allBtn.click(); 
            } else {
                filterModernGrid({ dataset: { filter: 'all' } }, activeTab.id);
            }
        }, 50);
    } else {
        if (typeof populateLeaders === 'function') populateLeaders();
    }
}

// ──────────────────────────────────────────────
// 初始化
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initUIStyle();
    
    // 如果 HTML 里写了 onclick/oninput，这里的绑定其实是冗余的，但保留作为兜底
    document.querySelectorAll('.modern-search-input').forEach(el => {
        if (!el.dataset.bound) {
            el.addEventListener('input', (e) => filterModernGrid(e.target));
            el.dataset.bound = 'true';
        }
    });

    document.querySelectorAll('.search-icon').forEach(el => {
        if (!el.dataset.bound) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                toggleModernSearch(e.target);
            });
            el.dataset.bound = 'true';
        }
    });
});

// 暴露全局接口
window.switchUIStyle = switchUIStyle;
window.onTabChanged = onTabChanged;
window.onLanguageChanged = onLanguageChanged;
window.toggleModernSearch = toggleModernSearch;
window.filterModernGrid = filterModernGrid;
