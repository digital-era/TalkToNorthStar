// modern-filter.js
// 现代风格相关完整逻辑：胶囊动态生成、过滤动画、风格切换
// 包含详细调试日志，用于排查搜索框闪现/不显示、过滤结果异常等问题

// 防抖工具函数（防止快速点击导致状态抖动）
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
        console.log(`[DEBUG] 从 allData 获取 ${category} 数据，数量：${allData[category].length}`);
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
    const result = map[category] || [];
    console.log(`[DEBUG] 获取 ${category} 分类数据，数量：${result.length}`);
    return result;
}

// ──────────────────────────────────────────────
// 2. 从 field 提取关键词
// ──────────────────────────────────────────────
function extractCommonFieldKeywords(category, lang) {
    // 1. 确定目标语言，优先使用传入的 lang
    const targetLang = lang || window.currentLang || 'zh-CN';
    
    console.log(`[DEBUG] 提取关键词 - 分类: ${category}, 语言: ${targetLang}`);
    
    const masters = getMastersByCategory(category);
    if (!masters.length) return [];
    
    const keywordCount = new Map();
    
    masters.forEach(master => {
        let text = '';
        
        // --- 核心修复：多语言字段读取逻辑 ---
        if (master.field && typeof master.field === 'object') {
            // 优先级：当前语言 -> 英文 -> 中文 -> 空字符串
            // 这样如果你加了日语(ja)，但某些数据只有英文，它会显示英文而不是空白
            text = master.field[targetLang] || master.field['en'] || master.field['zh-CN'] || '';
        } else if (typeof master.field === 'string') {
            // 兼容旧数据（纯字符串）
            text = master.field;
        }
        
        if (!text) return;        
        
        // --- 核心修复：关键词分割逻辑 ---
        // 使用正则分割：
        // 1. 中文标点：、 ， ； （ ）
        // 2. 英文标点：, ; ( ) [ ]
        // 3. 注意：不要把空格(\s)作为分割符，因为英文 "Artificial Intelligence" 中间有空格
        const parts = text.split(/[()（）\[\]、,，；;]+/) 
            .map(p => {
                // 去除首尾空格，并去除尾部可能的句号
                return p.trim().replace(/[。.。]+$/, '');
            })
            .filter(p => {
                // 长度过滤：
                // 中文至少2个字，英文至少2个字符
                // 英文最长放宽到 50 (例如 "Reinforcement Learning from Human Feedback")
                return p && p.length >= 2 && p.length <= 50;
            });

        parts.forEach(k => {
            // 排除纯数字或纯特殊符号
            if (!/^[\d\s\W]+$/.test(k)) {
                // 统一转小写来统计频率，但存储原名（为了显示好看，取第一次出现的大小写格式）
                const keyLower = k.toLowerCase();
                if (!keywordCount.has(keyLower)) {
                    keywordCount.set(keyLower, { text: k, count: 0 });
                }
                keywordCount.get(keyLower).count++;
            }
        });
    });

    // --- 排序与输出 ---
    // 按频率降序，频率相同按长度降序
    const keywords = [...keywordCount.values()]
        .sort((a, b) => b.count - a.count || b.text.length - a.text.length)
        .slice(0, 8) // 取前8个
        .map(item => item.text);
        
    return keywords;
}

// ──────────────────────────────────────────────
// 3. 生成胶囊
// ──────────────────────────────────────────────
function generateChipsForCategory(category, container) {
    if (!container) return;
    container.innerHTML = '';

    // 确保使用最新的 currentLang
    const lang = window.currentLang || 'zh-CN';

    // 生成 "All" 按钮 (修复：确保取到翻译)
    const allBtn = document.createElement('button');
    allBtn.className = 'chip active';
    allBtn.dataset.filter = 'all';
    
    // 安全获取翻译，防止报错
    let allText = '全部';
    if (typeof translations !== 'undefined' && translations[lang] && translations[lang].all) {
        allText = translations[lang].all;
    } else if (lang === 'en') {
        allText = 'All';
    }
    allBtn.textContent = allText;
    
    allBtn.addEventListener('click', () => filterModernGrid(allBtn));
    container.appendChild(allBtn);

    // 生成关键词按钮
    const keywords = extractCommonFieldKeywords(category, lang);
    
    // 如果没有关键词（可能是英文数据缺失），不生成多余按钮
    if (keywords.length > 0) {
        keywords.forEach(kw => {
            const btn = document.createElement('button');
            btn.className = 'chip';
            btn.dataset.filter = kw;
            btn.textContent = kw;
            btn.addEventListener('click', () => filterModernGrid(btn));
            container.appendChild(btn);
        });
    }
}

// ──────────────────────────────────────────────
// 4. 刷新当前 tab 胶囊
// ──────────────────────────────────────────────
function refreshChipsForActiveTab() {
    const tab = document.querySelector('.tab-content.active');
    if (!tab) return;
    const container = tab.querySelector('.filter-chips-container');
    if (container) {
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

    // 处理容器和按钮的显示逻辑
    document.querySelectorAll('.leader-scroll-container').forEach(container => {
        const leftBtn = container.querySelector('.scroll-button.left');
        const rightBtn = container.querySelector('.scroll-button.right');
        const grid = container.querySelector('.leader-grid');

        // 无论哪种模式，我们现在都希望显示滚动容器结构
        container.style.display = 'flex'; // 保证容器是flex布局以便放置按钮
        container.style.overflow = 'hidden'; // 隐藏原生滚动条，由按钮控制

        if (style === 'modern') {
            // === 现代模式 (修改版：横向滚动) ===
            
            // 1. 显示左右滚动按钮 (原本是 hide)
            if (leftBtn) leftBtn.style.display = 'block';
            if (rightBtn) rightBtn.style.display = 'block';

            // 2. 强制单行排列，不换行
            if (grid) {
                grid.style.display = 'flex';
                grid.style.flexWrap = 'nowrap'; // 关键：不换行
                grid.style.justifyContent = 'flex-start'; // 从左侧开始
                grid.style.gap = '20px'; // 保持现代风格的宽间距
                grid.style.overflowX = 'auto'; // 允许横向滚动
                grid.style.scrollBehavior = 'smooth'; // 平滑滚动
                
                // 隐藏网格自身的滚动条（视觉上更干净，依赖按钮）
                grid.style.scrollbarWidth = 'none'; // Firefox
                grid.style.msOverflowStyle = 'none';  // IE/Edge
            }

        } else {
            // === 传统模式 ===
            
            if (leftBtn) leftBtn.style.display = 'block';
            if (rightBtn) rightBtn.style.display = 'block';

            if (grid) {
                grid.style.display = 'flex';
                grid.style.flexWrap = 'nowrap';
                grid.style.justifyContent = 'flex-start';
                grid.style.gap = '0'; // 恢复传统模式的默认间距
                grid.style.overflowX = 'auto';
                grid.style.scrollbarWidth = 'auto'; // 恢复默认滚动条
            }
            
            // 传统模式下重新填充数据
            if (typeof populateLeaders === 'function') {
                populateLeaders();
            }
        }
        
        // 尝试更新按钮状态（如果按钮逻辑存在）
        // 注意：现代模式重新渲染是异步的，所以在 filterModernGrid 里还需要再调一次
        if (typeof updateScrollButtonStates === 'function' && grid) {
             updateScrollButtonStates(grid);
        }
    });

    updateModernFilterBarVisibility();

    // 如果是现代模式，触发一次过滤以渲染卡片
    if (style === 'modern') {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            // 这里的 null 表示没有触发元素，仅初始化
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
// 7. 过滤核心函数（带详细调试日志）
// ──────────────────────────────────────────────
function filterModernGrid(trigger, category = null) {
    const tab = category ? document.getElementById(category) : document.querySelector('.tab-content.active');
    if (!tab) return;
    const grid = tab.querySelector('.leader-grid');
    if (!grid) return;

    // --- 获取当前语言 ---
    const lang = window.currentLang || 'zh-CN';

    // --- 获取过滤词 ---
    let filterVal = 'all';
    if (trigger) {
        if (trigger.tagName === 'INPUT') {
            filterVal = trigger.value.trim();
        } else if (trigger.dataset?.filter) {
            filterVal = trigger.dataset.filter;
        }
    }

    // --- 更新胶囊状态 ---
    if (trigger && trigger.classList?.contains('chip')) {
        tab.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
        trigger.classList.add('active');
    }

    const masters = getMastersByCategory(tab.id);
    let filtered = masters;

    // --- 执行过滤 ---
    if (filterVal !== 'all' && filterVal) {
        const q = filterVal.toLowerCase();
        filtered = masters.filter(m => {
            // 获取各字段文本用于搜索（包含回退逻辑）
            const getName = (obj) => (typeof obj === 'string' ? obj : (obj[lang] || obj['en'] || obj['zh-CN'] || ''));
            
            // 构建搜索的大字符串
            const searchStr = [
                m.name,
                getName(m.contribution),
                getName(m.field),
                getName(m.remarks)
            ].join(' ').toLowerCase();
            
            return searchStr.includes(q);
        });
    }

    // --- 渲染卡片 ---
    grid.innerHTML = '';

    if (filtered.length === 0) {
        const msg = document.createElement('div');
        msg.className = 'no-result-message';
        // 翻译容错
        const t = translations[lang] || translations['en'] || {};
        msg.textContent = t.noMatchingLeader || 'No matching results';
        grid.appendChild(msg);
    } else {
        filtered.forEach((leader, i) => {
            const card = document.createElement('div');
            card.className = 'leader-card';
            card.dataset.id = leader.id;
            
            // --- 提取字段显示内容 ---
            // 辅助函数：安全获取多语言文本
            const getText = (fieldObj) => {
                if (!fieldObj) return '';
                if (typeof fieldObj === 'string') return fieldObj;
                return fieldObj[lang] || fieldObj['en'] || fieldObj['zh-CN'] || '';
            };

            const txtContrib = getText(leader.contribution);
            const txtField = getText(leader.field);
            const txtRemarks = getText(leader.remarks);
            
            // 获取标签翻译
            const t = translations[lang] || translations['zh-CN'] || {};
            const lblContrib = t.labelContribution || 'Contribution';
            const lblField = t.labelField || 'Field';
            const lblRemarks = t.labelRemarks || 'Remarks';

            card.innerHTML = `
                <h3>${leader.name}</h3>
                <p><strong>${lblContrib}：</strong> ${txtContrib}</p>
                <p class="field"><strong>${lblField}：</strong> ${txtField}</p>
                ${txtRemarks ? `<p class="remarks"><strong>${lblRemarks}：</strong> ${txtRemarks}</p>` : ''}
            `;
            
            card.onclick = () => {
                if(typeof selectLeader === 'function') selectLeader(leader, tab.id, card);
            };

            // 动画
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = `all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s`;

            grid.appendChild(card);

            // 触发动画
            requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // 更新箭头状态
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

function refreshChipsForActiveTab() {
    const tab = document.querySelector('.tab-content.active');
    if (tab) generateChipsForCategory(tab.id, tab.querySelector('.filter-chips-container'));
}

// 防抖版本的 toggleModernSearch
const debouncedToggle = debounce(function (iconElement) {
    const wrapper = iconElement.closest('.modern-search-wrapper');
    if (!wrapper) return;

    const input = wrapper.querySelector('.modern-search-input');
    if (!input) return;

    const isActive = wrapper.classList.contains('search-active');

    console.log('[DEBUG] toggleModernSearch 执行 - 当前状态：', isActive ? '展开' : '收起');

    if (isActive) {
        wrapper.classList.remove('search-active');
        input.style.display = 'none';
        input.value = '';
        input.blur();
        filterModernGrid(input);
        console.log('[DEBUG] 已收起搜索框并清空');
    } else {
        wrapper.classList.add('search-active');
        input.style.display = 'block';
        setTimeout(() => {
            input.focus();
            console.log('[DEBUG] 已展开搜索框并聚焦');
        }, 50);
    }
}, 250);

function toggleModernSearch(iconElement) {
    debouncedToggle(iconElement);
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
    // 1. 强制同步全局语言状态
    const langSelect = document.getElementById('languageSelector');
    if (langSelect) {
        window.currentLang = langSelect.value;
    }
    
    console.log('[DEBUG] 语言切换为:', window.currentLang);

    // 2. 仅在现代模式下处理
    const currentStyle = localStorage.getItem('northstarUIStyle');
    if (currentStyle === 'modern') {
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab) return;

        // 3. 重新生成分类胶囊 (传入新语言)
        // 这一步会更新“全部”按钮的文字，以及尝试提取英文关键词
        refreshChipsForActiveTab();

        // 4. 【关键修复】强制触发“全部”筛选
        // 我们找到刚才新生成的 "All" 按钮，并手动调用过滤逻辑
        const allBtn = activeTab.querySelector('.chip[data-filter="all"]');
        
        if (allBtn) {
            console.log(`[DEBUG] 触发重绘: ${activeTab.id}`);
            // 模拟点击效果，添加 active 类
            activeTab.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            allBtn.classList.add('active');
            
            // 传入 allBtn 作为 trigger，确保 filterVal = 'all'
            filterModernGrid(allBtn, activeTab.id); 
        } else {
            // 如果万一没找到按钮，兜底强制渲染
            console.warn('[DEBUG] 未找到 All 按钮，强制渲染全部');
            filterModernGrid({ dataset: { filter: 'all' } }, activeTab.id);
        }
    } else {
        // 传统模式刷新
        if (typeof populateLeaders === 'function') {
             populateLeaders();
        }
    }
}

// ──────────────────────────────────────────────
// 初始化
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initUIStyle();

    document.querySelectorAll('.modern-search-input').forEach(el => {
        if (!el.dataset.eventBound) {
            el.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                console.log('[DEBUG] input 事件触发，当前值：', value || '(空)');
                filterModernGrid(e.target);
            });
            el.dataset.eventBound = 'true';
        }
    });

    document.querySelectorAll('.search-icon').forEach(el => {
        if (!el.dataset.eventBound) {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleModernSearch(el);
            });
            el.dataset.eventBound = 'true';
        }
    });
});

// 暴露全局接口
window.switchUIStyle = switchUIStyle;
window.onTabChanged = onTabChanged;
window.onLanguageChanged = onLanguageChanged;
