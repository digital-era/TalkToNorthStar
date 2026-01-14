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
    // 确保获取到当前语言，默认为 zh-CN
    const targetLang = lang || (typeof currentLang !== 'undefined' ? currentLang : 'zh-CN');
    
    const masters = getMastersByCategory(category);
    if (!masters.length) return [];
    
    const keywordCount = new Map();
    
    masters.forEach(master => {
       // 1. 优先读取目标语言字段
        let text = master.field?.[targetLang];

        // 2. 只有在非中文模式下且该字段为空时，才不回退（宁愿为空也不要混杂中文），
        // 或者你可以根据需求决定是否回退：
        // text = text || master.field?.['zh-CN']; // 如果想强制回退中文解开这行
        
        if (!text) return;        
        
        // 修改 1: 不再使用 replace 删除括号内容
        // 修改 2: split 分割符加入 ()（） 以及常见标点，去掉 \s 以保留英文词组空格
        const parts = text.split(/[()（）\[\]、,，；;]+/) 
            .map(p => {
                // 修改 3: 去除首尾空格后，去除尾部的句号(。)或点(.)
                return p.trim().replace(/[。.]$/, '');
            })
            .filter(p => {
                // 修改 4: 长度限制放宽到 40，否则 "Artificial Intelligence" 会被过滤
                return p.length >= 2 && p.length <= 40;
            });

        parts.forEach(k => {
            // 排除纯数字或无意义符号（可选优化）
            if (k && !/^[\d\s]+$/.test(k)) {
                keywordCount.set(k, (keywordCount.get(k) || 0) + 1);
            }
        });
    });

    const keywords = [...keywordCount.entries()]
        .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
        .slice(0, 8) // 取前8个高频词
        .map(([k]) => k);
        
      console.log(`[DEBUG] 提取关键词 (${category} - ${targetLang}):`, keywords);
    return keywords;
}

// ──────────────────────────────────────────────
// 3. 生成胶囊
// ──────────────────────────────────────────────
function generateChipsForCategory(category, container) {
    if (!container) return;
    container.innerHTML = '';

    // 确保使用最新的 currentLang
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'zh-CN';

    // 生成 "All" 按钮
    const allBtn = document.createElement('button');
    allBtn.className = 'chip active';
    allBtn.dataset.filter = 'all';
    // 确保 translations 对象存在且有对应翻译
    allBtn.textContent = (typeof translations !== 'undefined' && translations[lang]?.all) ? translations[lang].all : '全部';
    allBtn.addEventListener('click', () => filterModernGrid(allBtn));
    container.appendChild(allBtn);

    // 生成关键词按钮 - 关键点：传入 lang
    extractCommonFieldKeywords(category, lang).forEach(kw => {
        const btn = document.createElement('button');
        btn.className = 'chip';
        btn.dataset.filter = kw;
        btn.textContent = kw;
        btn.addEventListener('click', () => filterModernGrid(btn));
        container.appendChild(btn);
    });
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
    if (!tab) {
        console.warn('[DEBUG] 未找到当前激活的 tab');
        return;
    }

    const grid = tab.querySelector('.leader-grid');
    if (!grid) {
        console.warn('[DEBUG] 未找到 leader-grid 元素');
        return;
    }

    let filterVal = 'all';
    if (trigger) {
        if (trigger.tagName === 'INPUT') {
            filterVal = trigger.value.trim();
        } else if (trigger.dataset?.filter) {
            filterVal = trigger.dataset.filter;
        }
    }

    console.log(`[DEBUG] 过滤触发 - 条件: "${filterVal}" | tab: ${tab.id}`);

    // 更新胶囊激活状态
    if (trigger && trigger.classList?.contains('chip')) {
        tab.querySelectorAll('.chip').forEach(b => b.classList.remove('active'));
        trigger.classList.add('active');
    }

    const masters = getMastersByCategory(tab.id);
    if (!masters || !Array.isArray(masters) || masters.length === 0) {
        console.warn('[DEBUG] masters 数据为空或非数组', masters);
        grid.innerHTML = '<div class="no-result-message">分类数据加载失败</div>';
        return;
    }

    let filtered = masters;

    if (filterVal !== 'all' && filterVal) {
        const q = filterVal.toLowerCase();
        const lang = currentLang || 'zh-CN';
        filtered = masters.filter(m => {
            const t = [
                (m.name || '').toLowerCase(),
                (m.contribution?.[lang] || m.contribution?.['zh-CN'] || '').toLowerCase(),
                (m.field?.[lang] || m.field?.['zh-CN'] || '').toLowerCase(),
                (m.remarks?.[lang] || m.remarks?.['zh-CN'] || '').toLowerCase(),
                (m.field?.[lang === 'zh-CN' ? 'en' : 'zh-CN'] || '').toLowerCase()
            ].join(' ');
            return t.includes(q);
        });
    }

    console.log(`[DEBUG] 过滤前总数: ${masters.length} | 过滤后数量: ${filtered.length} | 关键词: "${filterVal}"`);

    grid.innerHTML = '';

    if (filtered.length === 0) {
        console.log('[DEBUG] 无匹配结果，显示提示');
        const msg = document.createElement('div');
        msg.className = 'no-result-message';
        msg.textContent = translations[currentLang]?.noMatchingLeader || '暂无匹配的北极星';
        grid.appendChild(msg);
    } else {
        console.log('[DEBUG] 开始渲染卡片，共', filtered.length, '张');
        filtered.forEach((leader, i) => {
            const card = document.createElement('div');
            card.className = 'leader-card';
            card.dataset.id = leader.id;
            card.dataset.category = tab.id;

            const lang = currentLang || 'zh-CN';
            card.innerHTML = `
                <h3>${leader.name}</h3>
                <p><strong>${translations[lang]?.labelContribution || '贡献'}：</strong> ${leader.contribution?.[lang] || leader.contribution?.['zh-CN'] || ''}</p>
                <p class="field"><strong>${translations[lang]?.labelField || '领域'}：</strong> ${leader.field?.[lang] || leader.field?.['zh-CN'] || ''}</p>
                ${leader.remarks?.[lang] || leader.remarks?.['zh-CN'] ? `<p class="remarks"><strong>${translations[lang]?.labelRemarks || '备注'}：</strong> ${leader.remarks?.[lang] || leader.remarks?.['zh-CN']}</p>` : ''}
            `;
            card.onclick = () => selectLeader?.(leader, tab.id, card);

            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            card.style.transition = `all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.06}s`;

            grid.appendChild(card);

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 50);
        });
    }

    // [新增/确认]：渲染完成后，检查是否需要显示左右箭头
    // 稍微延迟一点，确保DOM渲染计算出宽度
    setTimeout(() => {
        if (typeof updateScrollButtonStates === 'function') {
            updateScrollButtonStates(grid); 
        }
    }, 100);

    updateScrollButtonStates?.(grid);
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
            // populateLeaders();
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
