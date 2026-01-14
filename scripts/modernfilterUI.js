// 现代模式下显示/隐藏过滤栏
function updateModernFilterBarVisibility() {
    const isModern = localStorage.getItem('northstarUIStyle') === 'modern';
    document.querySelectorAll('.modern-filter-bar').forEach(el => {
        el.style.display = isModern ? 'flex' : 'none';
    });
}

// 切换风格时调用（在您已有的 switchUIStyle 函数末尾添加）
function switchUIStyle(style) {
    // ... 原有代码 ...
    
    updateModernFilterBarVisibility();
    
    if (style === 'modern') {
        // 首次进入现代模式时，默认执行一次全部过滤（显示所有）
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            filterModernGrid({ dataset: { filter: 'all' } }, activeTab.id);
        }
    }
}

// 胶囊点击 & 搜索输入 共用过滤函数
function filterModernGrid(elementOrInput, tabId = null) {
    // 获取当前 tab（如果未传入则从活跃 tab 取）
    const currentTab = tabId 
        ? document.getElementById(tabId) 
        : document.querySelector('.tab-content.active');
    
    if (!currentTab) return;
    
    const grid = currentTab.querySelector('.leader-grid');
    if (!grid) return;
    
    // 获取 filter 值
    let filterValue = 'all';
    if (elementOrInput.tagName === 'INPUT') {
        filterValue = elementOrInput.value.trim().toLowerCase();
    } else if (elementOrInput.dataset?.filter) {
        filterValue = elementOrInput.dataset.filter;
    }
    
    // 更新激活状态（仅对胶囊有效）
    if (elementOrInput.tagName === 'BUTTON') {
        currentTab.querySelectorAll('.chip').forEach(btn => btn.classList.remove('active'));
        elementOrInput.classList.add('active');
    }
    
    // 获取该 tab 对应的人物数组（需根据 tab id 映射）
    const category = currentTab.id.replace('Grid', ''); // 如 'ai', 'quantum' 等
    const masters = getMastersByCategory(category);     // 您需实现或已有此函数
    
    // 过滤逻辑
    let filtered = masters;
    
    if (filterValue !== 'all' && filterValue !== '') {
        filtered = masters.filter(item => {
            const lang = document.getElementById('languageSelector').value;
            const text = [
                item.name.toLowerCase(),
                item.contribution?.[lang]?.toLowerCase() || '',
                item.field?.[lang]?.toLowerCase() || '',
                item.remarks?.[lang]?.toLowerCase() || '',
                ...(item.tags || [])
            ].join(' ');
            
            return text.includes(filterValue);
        });
    }
    
    // 清空网格
    grid.innerHTML = '';
    
    // 重新生成卡片 + 带延迟的动画
    filtered.forEach((master, index) => {
        const card = createLeaderCard(master); // 假设您有此函数生成单张卡片 DOM
        card.classList.add('leader-card');
        card.style.transitionDelay = `${index * 0.06}s`;
        grid.appendChild(card);
        
        // 下一帧触发动画
        requestAnimationFrame(() => {
            card.classList.add('visible');
        });
    });
    
    // 如果没有结果，可显示提示
    if (filtered.length === 0) {
        grid.innerHTML = '<div class="no-result">暂无匹配的北极星</div>';
    }
}

// 搜索图标点击展开/收起输入框（可选）
function toggleModernSearch(icon) {
    const wrapper = icon.parentElement;
    const input = wrapper.querySelector('.modern-search-input');
    if (input) {
        input.style.display = input.style.display === 'none' ? 'block' : 'none';
        if (input.style.display === 'block') input.focus();
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    updateModernFilterBarVisibility();
});
