// modern-filter.js
// 现代风格相关完整逻辑：胶囊动态生成、过滤动画、风格切换
// 包含调试日志，用于排查过滤结果问题

// ──────────────────────────────────────────────
// 1. 获取分类数据
// ──────────────────────────────────────────────
function getMastersByCategory(category) {
    if (window.allData && allData[category]) {
        return allData[category];
    }
    const map = {
        'ai': typeof aiMasters !== 'undefined' ? aiMasters : [],
        'quantum': typeof quantumMasters !== 'undefined' ? quantumMasters : [],
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
function extractCommonFieldKeywords(category, lang = currentLang || 'zh-CN') {
    const masters = getMastersByCategory(category);
    if (!masters.length) return [];
    const keywordCount = new Map();
    masters.forEach(master => {
        let text = master.field?.[lang] || master.field?.['zh-CN'] || '';
        if (!text) return;
        text = text.replace(/（[^）]*）|\([^)]*\)/g, '').trim();
        const parts = text.split(/[、,，；;\s]+/)
            .map(p => p.trim())
            .filter(p => p.length >= 2 && p.length <= 12);
        parts.forEach(k => {
            if (k) keywordCount.set(k, (keywordCount.get(k) || 0) + 1);
        });
    });
    const keywords = [...keywordCount.entries()]
        .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
        .slice(0, 8)
        .map(([k]) => k);
    console.log(`[DEBUG] ${category} 提取关键词（${lang}）：`, keywords);
    return keywords;
}

// ──────────────────────────────────────────────
// 3. 生成胶囊
// ──────────────────────────────────────────────
function generateChipsForCategory(category, container) {
    if (!container) return;
    container.innerHTML = '';

    const allBtn = document.createElement('button');
    allBtn.className = 'chip active';
    allBtn.dataset.filter = 'all';
    allBtn.textContent = translations[currentLang]?.all || '全部';
    allBtn.addEventListener('click', () => filterModernGrid(allBtn));
    container.appendChild(allBtn);

    extractCommonFieldKeywords(category, currentLang).forEach(kw => {
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

    document.querySelectorAll('.leader-scroll-container').forEach(el => {
        el.style.display = (style === 'modern') ? 'none' : 'flex';
    });

    updateModernFilterBarVisibility();

    if (style === 'modern') {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            const grid = activeTab.querySelector('.leader-grid');
            if (grid) {
                filterModernGrid(null, activeTab.id);
            }
        }
    } else {
        if (typeof populateLeaders === 'function') {
            populateLeaders();
        }
        updateAllScrollButtonStates?.();
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

function toggleModernSearch(iconElement) {
    const wrapper = iconElement.closest('.modern-search-wrapper');
    if (!wrapper) return;
    const input = wrapper.querySelector('.modern-search-input');
    if (!input) return;

    if (wrapper.classList.contains('search-active')) {
        wrapper.classList.remove('search-active');
        input.style.display = 'none';
        input.value = '';
        filterModernGrid(input);
        console.log('[DEBUG] 搜索框已收起并清空');
    } else {
        wrapper.classList.add('search-active');
        input.style.display = 'block';
        input.focus();
        console.log('[DEBUG] 搜索框已展开');
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
    if (localStorage.getItem('northstarUIStyle') === 'modern') {
        refreshChipsForActiveTab();
    }
}

// ──────────────────────────────────────────────
// 初始化
// ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initUIStyle();

    document.querySelectorAll('.modern-search-input').forEach(el => {
        el.addEventListener('input', () => filterModernGrid(el));
    });

    document.querySelectorAll('.search-icon').forEach(el => {
        el.addEventListener('click', () => toggleModernSearch(el));
    });
});

// 暴露全局接口
window.switchUIStyle = switchUIStyle;
window.onTabChanged = onTabChanged;
window.onLanguageChanged = onLanguageChanged;
