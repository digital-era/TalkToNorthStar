function renderStarryCards() {
    const container = document.getElementById('starryCardsList');
    if (!container) return;
    
    const lang = window.currentLang || 'zh-CN';
    const isAdminUser = isAdmin();
    
    container.innerHTML = '';
    
    starryColumnMaster.forEach(card => {
        const cardEl = document.createElement('div');
        cardEl.className = 'starry-card-item';
        cardEl.dataset.id = card.id;
        
        const name = lang === 'en' ? card.nameEn : card.name;
        const desc = card.description[lang] || card.description['zh-CN'] || '';
        
        // ══════════════════════════════════════════════
        // 【关键】操作按钮：只有 configurable 为 true 才显示
        // ══════════════════════════════════════════════
        let actionsHtml = '';
        if (isAdminUser && card.configurable !== false) {
            actionsHtml = `
                <div class="card-actions">
                    <button class="card-action-btn" 
                            onclick="openCardConfig('${card.id}')"
                            title="${lang === 'en' ? 'Configure' : '配置'}">
                        <i class="fas fa-cog"></i>
                    </button>
                    ${card.deletable !== false ? `
                        <button class="card-action-btn delete-btn" 
                                onclick="deleteStarryCard('${card.id}')"
                                title="${lang === 'en' ? 'Delete' : '删除'}">
                            <i class="fas fa-trash"></i>
                        </button>
                    ` : ''}
                </div>
            `;
        }
        // 如果 configurable === false（如星际领航员），不显示任何操作按钮
        
        cardEl.innerHTML = `
            ${actionsHtml}
            <h3>${name}</h3>
            <div class="card-desc">${desc}</div>
        `;
        
        // 点击卡片进入
        cardEl.addEventListener('click', (e) => {
            if (e.target.closest('.card-actions')) return;
            enterStarryCardDetail(card.id);
        });
        
        container.appendChild(cardEl);
    });
    
    // 添加卡片按钮（仅管理员）
    if (isAdminUser) {
        const addBtn = document.createElement('div');
        addBtn.className = 'starry-card-item add-card-item';
        addBtn.innerHTML = `
            <i class="fas fa-plus"></i>
            <span>${lang === 'en' ? 'Add New Card' : '添加卡片'}</span>
        `;
        addBtn.onclick = () => openAddCardModal();
        container.appendChild(addBtn);
    }
}
