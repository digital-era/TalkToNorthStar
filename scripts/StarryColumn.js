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

function buildCardSystemPrompt(card, lang) {
    // 1. 获取模板前缀
    const template = card.systemPrompt[lang] || card.systemPrompt['zh-CN'] || '';
    
    // 2. 构建专家信息
    let expertsInfo = '';
    
    if (card.id === 'interstellar_navigator') {
        // ══════════════════════════════════════════════
        // 【星际领航员】全量所有专家（同原来）
        // ══════════════════════════════════════════════
        expertsInfo = buildAllExpertsInfo(lang);
        
        // 领航员任务指令
        expertsInfo += `
\n\n你的任务：
1. 分析用户的问题或需求
2. 从上述人物中推荐 3 位领域互补的北极星人物
3. 解释为什么这三位人物的组合能产生"化学反应"
4. 建议用户先与哪位人物对话，为什么

推荐原则：
- 领域互补：尽量选择不同领域的人物
- 视角差异：技术视角 + 哲学视角 + 实践视角
- 避免同质化：不要推荐同一公司的三位人物

输出格式：
【推荐组合】
1. [人物A]（领域）- [推荐理由]
2. [人物B]（领域）- [推荐理由]
3. [人物C]（领域）- [推荐理由】

【对话策略】
建议先与 [人物X] 对话，因为...
`;
        
    } else {
        // ══════════════════════════════════════════════
        // 【融合体】用户配置的特定专家
        // ══════════════════════════════════════════════
        if (card.experts && card.experts.length > 0) {
            expertsInfo += '\n\n你融合了以下人物的智慧：\n';
            
            card.experts.forEach(expert => {
                const leader = findLeaderById(expert.leaderId);
                if (!leader) return;
                
                const name = leader.name;
                const contribution = getFieldValue(leader.contribution, lang);
                const field = getFieldValue(leader.field, lang);
                const remarks = getFieldValue(leader.remarks, lang);
                
                expertsInfo += `\n【${name}】\n`;
                expertsInfo += `- 领域：${field}\n`;
                expertsInfo += `- 贡献：${contribution}\n`;
                expertsInfo += `- 特质：${remarks}\n`;
            });
        }
        
        // 融合体任务指令
        expertsInfo += `
\n\n回答要求：
1. 综合融合以上人物的视角和思维方式
2. 不是分别引用每个人物的观点，而是形成统一的融合洞察
3. 在回答中体现不同人物思维的化学反应
4. 保持客观中立，展现多元智慧的融合
`;
    }
    
    return template + expertsInfo;
}

async function getStarryResponse() {
    const card = window.currentStarryCard;
    if (!card) return;
    
    const userQuestion = document.getElementById('userQuestion').value.trim();
    if (!userQuestion) {
        alert('请输入问题');
        return;
    }
    
    // 构建系统指令（根据卡片类型自动区分）
    const lang = currentLang;
    const systemContent = buildCardSystemPrompt(card, lang);
    
    // 统一发送（与星际领航员相同处理方式）
    await sendStarryApiRequest(userQuestion, systemContent);
}

// 发送API请求（与原来星际领航员相同）
async function sendStarryApiRequest(userQuestion, systemContent) {
    // ... 复用原来星际领航员的API处理逻辑 ...
    // 即：原始问题 + 系统指令（包含专家信息）
}


