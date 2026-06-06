const starryColumnTexts = {
    title: {
        'zh-CN': '星空专栏',
        'en': 'Starry Column'
    },
    subtitle: {
        'zh-CN': '跨领域智慧融合',
        'en': 'Cross-domain Wisdom Fusion'
    },
    columnName: {
        'zh-CN': '星空专栏',
        'en': 'Starry Column'
    },
    backTooltip: {
        'zh-CN': '返回首页',
        'en': 'Back to Home'
    },
    addCard: {
        'zh-CN': '添加卡片',
        'en': 'Add Card'
    },
    statusNotConfigured: {
        'zh-CN': '未配置',
        'en': 'Not Configured'
    },
    statusExpertsCount: {
        'zh-CN': '位专家',
        'en': 'Experts'
    },
    wisdomResponse: {
        'zh-CN': '智慧回应',
        'en': 'Wisdom Response'
    },
    askButton: {
        'zh-CN': '提问',
        'en': 'Ask'
    },
    questionPlaceholder: {
        'zh-CN': '输入你的问题，让智慧指引你...',
        'en': 'Enter your question, let wisdom guide you...'
    },
    configureCard: {
        'zh-CN': '配置卡片',
        'en': 'Configure Card'
    },
    fusionMode: {
        'zh-CN': '融合模式',
        'en': 'Fusion Mode'
    },
    selectExperts: {
        'zh-CN': '选择专家',
        'en': 'Select Experts'
    },
    modeRoundtable: {
        'zh-CN': '圆桌会议',
        'en': 'Roundtable'
    },
    modeSynthesis: {
        'zh-CN': '综合融合',
        'en': 'Synthesis'
    },
    modeDebate: {
        'zh-CN': '思想交锋',
        'en': 'Debate'
    },
    cancel: {
        'zh-CN': '取消',
        'en': 'Cancel'
    },
    save: {
        'zh-CN': '保存',
        'en': 'Save'
    },
    copy: {
        'zh-CN': '复制',
        'en': 'Copy'
    },
    participantsLabel: {
        'zh-CN': '参与专家：',
        'en': 'Participants: '
    }
};


// ═══════════════════════════════════════════════
// 星空专栏 - 入口与布局
// ═══════════════════════════════════════════════

/**
 * 进入星空专栏页面
 */
function enterStarryColumn() {
    if (crystalInstance) {
        crystalInstance.stopDemoLoop();
        crystalInstance._pauseDemo(Infinity);
    }

    const overlay = document.getElementById('pageTransitionOverlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(() => {
        const nebulaCrystal = document.getElementById('nebula-crystal');
        if (nebulaCrystal) nebulaCrystal.style.display = 'none';

        const wheelSection = document.getElementById('wheel-of-destiny');
        if (wheelSection) wheelSection.style.display = 'none';

        const mainContainer = document.querySelector('.container');
        if (mainContainer) mainContainer.style.display = 'none';

        document.querySelectorAll('.tab-content').forEach(tc => {
            tc.style.display = 'none';
        });

        // ═══════════════════════════════════════════════
        // 【关键修复】设置全局状态
        // ═══════════════════════════════════════════════
        window.currentSelectedCategory = 'starryColumn';
        window.starryColumnViewMode = 'list';
        window.currentSelectedLeader = null;
        window.currentSelectedCard = null;

        renderStarryColumnLayout();

        if (overlay) overlay.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, 300);
}

/**
 * 渲染星空专栏布局
 */
function renderStarryColumnLayout() {
    const layout = document.getElementById('category-layout-container');
    if (!layout) {
        console.error('category-layout-container not found');
        return;
    }

    const lang = window.currentLang || 'zh-CN';
    const isAdmin = checkAdminPermission();

    // 确保状态正确
    window.starryColumnViewMode = 'list';

    layout.style.display = 'flex';
    layout.innerHTML = `
        <div class="layout-left" id="starryLeft">
            <div class="starry-cover-wrapper">
                <img src="images/ambient-starry-column.jpg" 
                     alt="${getFieldValue(starryColumnTexts.title, lang)}" 
                     class="starry-cover"
                     id="starryCover">
                <div class="starry-cover-overlay">
                    <h2 class="starry-cover-title">
                        ${getFieldValue(starryColumnTexts.title, lang)}
                    </h2>
                    <p class="starry-cover-subtitle">
                        ${getFieldValue(starryColumnTexts.subtitle, lang)}
                    </p>
                </div>
            </div>
        </div>
        <div class="layout-right" id="starryRight">
            <div class="starry-header">
                <button class="back-btn-inline" id="btn-starry-back" 
                        title="${getFieldValue(starryColumnTexts.backTooltip, lang)}">
                    <svg viewBox="0 0 24 24">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </svg>
                </button>
                <h3 class="starry-list-title">
                    ${getFieldValue(starryColumnTexts.columnName, lang)}
                </h3>
            </div>
            <div class="starry-cards-container" id="starryCardsContainer"></div>
            <!-- 添加卡片按钮移到容器内部，由 renderStarryCardsList 统一控制 -->
        </div>
    `;

    document.getElementById('btn-starry-back')?.addEventListener('click', backToWheelSelection);
    renderStarryCardsList(isAdmin);  // 传递 isAdmin 状态
}

/**
 * 渲染星空专栏卡片列表
 */
function renderStarryCardsList(isAdmin = false) {
    const container = document.getElementById('starryCardsContainer');
    if (!container) return;

    const lang = window.currentLang || 'zh-CN';
    container.innerHTML = '';

    starryColumnCards.forEach(card => {
        const isEmpty = card.type === 'fusion' && (!card.experts || card.experts.length === 0);
        const isConfigurable = card.configurable && isAdmin;
        
        const cardEl = document.createElement('div');
        cardEl.className = `starry-card ${card.builtIn ? 'built-in' : ''} ${isEmpty ? 'empty' : ''}`;
        cardEl.dataset.cardId = card.id;

        const statusText = isEmpty 
            ? getFieldValue(starryColumnTexts.statusNotConfigured, lang)
            : `${card.experts.length} ${getFieldValue(starryColumnTexts.statusExpertsCount, lang)}`;

        cardEl.innerHTML = `
            <div class="starry-card-header">
                <div class="starry-card-icon">${getCardTypeIcon(card.type)}</div>
                <h4 class="starry-card-name">${getFieldValue(card.name, lang)}</h4>
                ${isConfigurable ? `
                    <button class="starry-card-config" data-card-id="${card.id}" 
                            title="${getFieldValue(starryColumnTexts.configureCard, lang)}">
                        ⚙️
                    </button>
                ` : ''}
            </div>
            <p class="starry-card-contribution">${getFieldValue(card.contribution, lang)}</p>
            <div class="starry-card-meta">
                <span class="starry-card-field">${getFieldValue(card.field, lang)}</span>
                <span class="starry-card-status ${isEmpty ? 'empty' : 'active'}">${statusText}</span>
            </div>
            <p class="starry-card-remarks">${getFieldValue(card.remarks, lang)}</p>
        `;

        if (!isEmpty || card.type === 'navigator') {
            cardEl.addEventListener('click', (e) => {
                if (e.target.closest('.starry-card-config')) return;
                selectStarryCard(card);
            });
            cardEl.style.cursor = 'pointer';
        } else {
            cardEl.style.cursor = 'not-allowed';
            cardEl.style.opacity = '0.5';
        }

        const configBtn = cardEl.querySelector('.starry-card-config');
        if (configBtn) {
            configBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showConfigModal(card);
            });
        }

        container.appendChild(cardEl);
    });

    // ═══════════════════════════════════════════════
    // 【关键】在容器末尾添加"添加卡片"按钮（admin 专用）
    // ═══════════════════════════════════════════════
    if (isAdmin) {
        const addBtn = document.createElement('button');
        addBtn.className = 'add-card-btn';
        addBtn.id = 'btn-add-card';
        addBtn.innerHTML = `<span>+</span> ${getFieldValue(starryColumnTexts.addCard, lang)}`;
        addBtn.addEventListener('click', showAddCardModal);
        container.appendChild(addBtn);
    }
}

/**
 * 获取卡片类型图标
 */
function getCardTypeIcon(type) {
    if (type === 'navigator') {
        return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>`;
    }
    return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>`;
}

function selectStarryCard(card) {
    const lang = window.currentLang || 'zh-CN';

    window.currentSelectedCard = card;
    window.currentSelectedCategory = 'starryColumn';
    window.starryColumnViewMode = 'card';  // ← 【添加这行】

    // 准备专家数据
    let resolvedExperts;
    if (card.type === 'navigator') {
        resolvedExperts = buildInterstellarSnapshot(lang);
    } else {
        resolvedExperts = resolveCardExperts(card);
    }

    // ═══════════════════════════════════════════════
    // 【修复】保留原始多语言对象，同时提供当前语言的解析值
    // ═══════════════════════════════════════════════
    const virtualLeader = {
        id: card.id,
        // 当前语言的解析值（用于直接显示）
        name: getFieldValue(card.name, lang),
        field: getFieldValue(card.field, lang),
        contribution: getFieldValue(card.contribution, lang),
        remarks: getFieldValue(card.remarks, lang),
        
        // 保留原始多语言对象（用于语言切换时重新解析）
        _rawName: card.name,
        _rawField: card.field,
        _rawContribution: card.contribution,
        _rawRemarks: card.remarks,
        
        _isStarryCard: true,
        _cardType: card.type,
        _experts: resolvedExperts,
        _systemPromptBuilder: card.systemPromptBuilder,
        _fusionStrategy: card.fusionStrategy
    };

    window.currentSelectedLeader = virtualLeader;

    // ═══════════════════════════════════════════════
    // 【关键】复用 selectCategory 的完整 DOM 流程
    // 但使用第一个实际分类作为宿主，确保 selectLeader 的 DOM 操作不报错
    // ═══════════════════════════════════════════════
    
    // 找一个实际存在的分类作为宿主
    const hostCategory = Object.keys(allData).find(cat => allData[cat]?.length > 0) || 'ai';
    
    // 1. 隐藏水晶球/转盘
    const nebulaCrystal = document.getElementById('nebula-crystal');
    if (nebulaCrystal) nebulaCrystal.style.display = 'none';
    const wheelSection = document.getElementById('wheel-of-destiny');
    if (wheelSection) wheelSection.style.display = 'none';

    // 2. 显示布局容器
    const layout = document.getElementById('category-layout-container');
    if (layout) layout.style.display = 'flex';

    // 3. 隐藏 tabs
    const tabsBar = document.querySelector('.tabs');
    if (tabsBar) tabsBar.style.display = 'none';

    // 4. 调用 openTab 创建标准 DOM 结构（使用宿主分类）
    openTab(null, hostCategory);
    document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');

    // 5. 渲染星空专栏布局（覆盖 layout 内容，但保留关键结构）
    renderStarryColumnLayoutForLeader(hostCategory);

    // 6. 显示 .container
    const container = document.querySelector('.container');
    if (container) container.style.display = 'block';

    // 7. 【关键】调用 selectLeader，传入宿主分类（确保 DOM 元素存在）
    // 但标记当前实际是星空专栏
    selectLeader(virtualLeader, hostCategory, null);

    // 8. 更新单卡显示
    updateSingleCard(virtualLeader);

    // 滚动到交互区
    setTimeout(() => {
        const interactionArea = document.querySelector('.interaction-area');
        if (interactionArea) interactionArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

/**
 * 渲染星空专栏布局，但保留 selectLeader 需要的交互结构
 */
function renderStarryColumnLayoutForLeader(hostCategory) {
    const layout = document.getElementById('category-layout-container');
    if (!layout) return;
    
    const lang = window.currentLang || 'zh-CN';
    
    layout.innerHTML = `
        <div class="layout-left" id="starryLeft">
            <div class="starry-cover-wrapper">
                <img src="images/ambient-starry-column.jpg" 
                     alt="${getFieldValue(starryColumnTexts.title, lang)}" 
                     class="starry-cover"
                     id="starryCover">
                <div class="starry-cover-overlay">
                    <h2 class="starry-cover-title">
                        ${getFieldValue(starryColumnTexts.title, lang)}
                    </h2>
                    <p class="starry-cover-subtitle">
                        ${getFieldValue(starryColumnTexts.subtitle, lang)}
                    </p>
                </div>
            </div>
        </div>
        <div class="layout-right" id="starryRight">
            <div class="starry-header">
                <!-- 左上角：返回首页 -->
                <button class="back-btn-inline" id="btn-starry-back" 
                        title="${getFieldValue(starryColumnTexts.backTooltip, lang)}">
                    <svg viewBox="0 0 24 24">
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                    </svg>
                </button>
                <h3 class="starry-list-title">
                    ${getFieldValue(starryColumnTexts.columnName, lang)}
                </h3>
                <!-- 右上角：返回专栏列表 -->
                <button class="back-to-list-btn" id="btn-back-to-list" 
                        title="${lang === 'zh-CN' ? '返回专栏列表' : 'Back to Column List'}">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
            <div id="single-northstar-card" class="northstar-single-card"></div>
            <div class="interaction-area" id="interactionArea"></div>
        </div>
    `;

    // 左上角：返回首页
    document.getElementById('btn-starry-back')?.addEventListener('click', backToWheelSelection);
    
    // 右上角：返回专栏列表
    document.getElementById('btn-back-to-list')?.addEventListener('click', backToStarryColumnList);
}

/**
 * 从星空专栏卡片详情返回列表页
 * 清理对话状态，恢复列表视图
 */
function backToStarryColumnList() {
    const lang = window.currentLang || 'zh-CN';

    // 1. 清除当前选中状态
    window.currentSelectedLeader = null;
    window.currentSelectedCard = null;
    window.starryColumnViewMode = 'list';

    // 【关键】不要清除 currentSelectedCategory，或者设置为 'starryColumn'
    // currentSelectedCategory = null;  // ← 不要这行！
    window.currentSelectedCategory = 'starryColumn';  // ← 改为这样

    // 2. 清理对话区域内容（避免残留）
    const promptArea = document.getElementById('prompt-display-area');
    if (promptArea) promptArea.style.display = 'none';

    const promptContent = document.getElementById('prompt-collapsible-content');
    if (promptContent) promptContent.style.display = 'none';

    const toggleIcon = document.getElementById('prompt-toggle-icon');
    if (toggleIcon) toggleIcon.classList.remove('icon-rotated');

    const responseArea = document.getElementById('ai-response-area');
    if (responseArea) responseArea.style.display = 'none';

    const promptText = document.getElementById('generatedPromptText');
    if (promptText) promptText.value = '';

    const responseText = document.getElementById('aiResponseText');
    if (responseText) responseText.textContent = '';

    // 3. 清除全局提示状态
    window.currentGeneratedPrompt = '';

    // 4. 重新渲染星空专栏列表
    renderStarryColumnLayout();

    const isAdmin = checkAdminPermission();
    renderStarryCardsList(isAdmin);

    // 5. 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 构建融合体系统指令
 * 兼容两种调用方式：原始 card 对象 或 虚拟领袖对象
 */
function buildFusionSystemPrompt(source, lang = 'zh-CN') {
    const isZh = lang === 'zh-CN';
    
    // 统一提取字段（兼容 card 和 virtualLeader）
    // 优先使用原始多语言对象，回退到已解析的字符串
    const experts = source._experts || resolveCardExperts(source);
    const fusionStrategy = source._fusionStrategy || source.fusionStrategy;
    
    if (!experts || experts.length === 0) {
        return isZh 
            ? '系统错误：未配置任何专家。' 
            : 'System error: No experts configured.';
    }

    const expertLines = experts.map(e => `  · ${e.name} [${e.field}]`).join('\n');
    const strategy = fusionStrategy || { mode: 'synthesis' };

    const modeDescriptions = {
        roundtable: {
            'zh-CN': '以圆桌会议的形式，让各位专家依次发言，最后形成共识。',
            'en': 'In a roundtable format, let each expert speak in turn, then reach consensus.'
        },
        synthesis: {
            'zh-CN': '综合各位专家的视角，给出一个融合性的深度回答。',
            'en': 'Synthesize perspectives from all experts into a comprehensive deep answer.'
        },
        debate: {
            'zh-CN': '呈现各位专家的不同观点，展开思想交锋。',
            'en': 'Present differing viewpoints from experts and let ideas clash.'
        }
    };

    const modeDesc = modeDescriptions[strategy.mode]?.[lang] || modeDescriptions.synthesis[lang];

    return isZh
        ? `你是"对话北极星"星空专栏的融合智慧体。你的任务是针对用户的核心问题，融合以下多位"北极星"人物的洞察，给出深度回答。

【参与专家】
${expertLines}

【融合模式】
${modeDesc}

【任务要求】
1. 深入理解每位专家的思想体系和核心方法论
2. 从各自专业视角分析问题，展现多元思维
3. 在分歧处呈现张力，在共识处深化洞见
4. 输出必须标注引用专家的姓名和领域
5. 追求跨学科的思想化学反应，而非简单并列`
        : `You are the Fusion Wisdom of "Talk with North Stars" Starry Column. Your task is to synthesize insights from the following "North Star" figures to provide a deep answer.

【Participating Experts】
${expertLines}

【Fusion Mode】
${modeDesc}

【Requirements】
1. Deeply understand each expert's framework and core methodology
2. Analyze the problem from each professional perspective
3. Present tension where views diverge, deepen insight where they converge
4. Cite each expert's name and field in your response
5. Pursue interdisciplinary chemical reactions, not simple juxtaposition`;
}

/**
 * 解析卡片专家
 */
function resolveCardExperts(card) {
    const lang = window.currentLang || 'zh-CN';

    if (card.type === 'navigator') {
        return buildInterstellarSnapshot(lang);
    }

    if (card.type === 'fusion') {
        if (!card.experts || card.experts.length === 0) return null;

        const resolved = [];
        for (const expertId of card.experts) {
            const expert = findExpertById(expertId);
            if (expert) {
                resolved.push({
                    id: expert.id,
                    name: getFieldValue(expert.name, lang),
                    field: getFieldValue(expert.field, lang),
                    category: expert._category || findExpertCategory(expertId)
                });
            }
        }
        return resolved;
    }

    return null;
}

/**
 * 查找专家
 */
function findExpertById(id) {
    for (const [category, leaders] of Object.entries(allData)) {
        const found = leaders.find(l => l.id === id);
        if (found) {
            found._category = category;
            return found;
        }
    }
    return null;
}

function findExpertCategory(id) {
    for (const [category, leaders] of Object.entries(allData)) {
        if (leaders.some(l => l.id === id)) return category;
    }
    return null;
}


// ═══════════════════════════════════════════════
// 配置模态框 - 完整字段编辑 + 模糊搜索
// ═══════════════════════════════════════════════

/**
 * 显示配置模态框
 */
function showConfigModal(card) {
    if (!checkAdminPermission()) {
        console.warn('Unauthorized: admin permission required');
        alert('Unauthorized: admin permission required');
        return;
    }
    const lang = window.currentLang || 'zh-CN';
    const otherLang = lang === 'zh-CN' ? 'en' : 'zh-CN';

    // 当前值
    const currentName = getFieldValue(card.name, lang);
    const currentNameOther = getFieldValue(card.name, otherLang);
    const currentContribution = getFieldValue(card.contribution, lang);
    const currentContributionOther = getFieldValue(card.contribution, otherLang);
    const currentField = getFieldValue(card.field, lang);
    const currentFieldOther = getFieldValue(card.field, otherLang);
    const currentRemarks = getFieldValue(card.remarks, lang);
    const currentRemarksOther = getFieldValue(card.remarks, otherLang);

    const modeOptions = [
        { value: 'roundtable', label: getFieldValue(starryColumnTexts.modeRoundtable, lang) },
        { value: 'synthesis', label: getFieldValue(starryColumnTexts.modeSynthesis, lang) },
        { value: 'debate', label: getFieldValue(starryColumnTexts.modeDebate, lang) }
    ];

    const modal = document.createElement('div');
    modal.className = 'starry-modal';
    modal.id = 'starryConfigModal';

    modal.innerHTML = `
        <div class="starry-modal-overlay" onclick="if(event.target===this)closeConfigModal()"></div>
        <div class="starry-modal-content">
            <div class="starry-modal-header">
                <h3>${getFieldValue(starryColumnTexts.configureCard, lang)}: ${currentName}</h3>
                <button class="modal-close" onclick="closeConfigModal()">×</button>
            </div>
            
            <div class="starry-modal-body">
                <!-- 卡片名称 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '卡片名称' : 'Card Name'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <input type="text" class="config-input" id="configNamePrimary" 
                           value="${currentName}" placeholder="${lang === 'zh-CN' ? '输入中文名称' : 'Enter English name'}">
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文名称' : '中文名称'}
                        <span class="lang-tag secondary">${lang === 'zh-CN' ? 'English' : '中文'}</span>
                    </label>
                    <input type="text" class="config-input" id="configNameSecondary" 
                           value="${currentNameOther}" placeholder="${lang === 'zh-CN' ? 'Enter English name' : '输入中文名称'}">
                </div>

                <!-- 功能描述 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '功能描述' : 'Description'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <textarea class="config-textarea" id="configContributionPrimary" rows="3"
                        placeholder="${lang === 'zh-CN' ? '描述这张卡片的功能...' : 'Describe the function...'}">${currentContribution}</textarea>
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文描述' : '中文描述'}
                        <span class="lang-tag secondary">${lang === 'zh-CN' ? 'English' : '中文'}</span>
                    </label>
                    <textarea class="config-textarea" id="configContributionSecondary" rows="3"
                        placeholder="${lang === 'zh-CN' ? 'Describe in English...' : '用中文描述...'}">${currentContributionOther}</textarea>
                </div>

                <!-- 领域标签 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '领域标签' : 'Field Tag'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <input type="text" class="config-input" id="configFieldPrimary" 
                           value="${currentField}" placeholder="${lang === 'zh-CN' ? '如：AI融合、人文跨界' : 'e.g. AI Fusion'}">
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文标签' : '中文标签'}
                        <span class="lang-tag secondary">${lang === 'zh-CN' ? 'English' : '中文'}</span>
                    </label>
                    <input type="text" class="config-input" id="configFieldSecondary" 
                           value="${currentFieldOther}" placeholder="${lang === 'zh-CN' ? 'e.g. AI Fusion' : '如：AI融合'}">
                </div>

                <!-- 备注格言 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '备注格言' : 'Remarks'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <input type="text" class="config-input" id="configRemarksPrimary" 
                           value="${currentRemarks}" placeholder="${lang === 'zh-CN' ? '一句标志性的格言...' : 'A signature motto...'}">
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文格言' : '中文格言'}
                        <span class="lang-tag secondary">${lang === 'zh-CN' ? 'English' : '中文'}</span>
                    </label>
                    <input type="text" class="config-input" id="configRemarksSecondary" 
                           value="${currentRemarksOther}" placeholder="${lang === 'zh-CN' ? 'English motto...' : '中文格言...'}">
                </div>

                <!-- 融合模式 -->
                <div class="config-section">
                    <label class="config-label">${getFieldValue(starryColumnTexts.fusionMode, lang)}</label>
                    <select class="config-select" id="configFusionMode">
                        ${modeOptions.map(opt => `
                            <option value="${opt.value}" ${card.fusionStrategy?.mode === opt.value ? 'selected' : ''}>
                                ${opt.label}
                            </option>
                        `).join('')}
                    </select>
                </div>

                <!-- 专家选择（模糊匹配） -->
                <div class="config-section">
                    <label class="config-label">
                        ${getFieldValue(starryColumnTexts.selectExperts, lang)}
                        <span class="hint-text">${lang === 'zh-CN' ? '输入名称或领域，模糊匹配' : 'Type name or field to search'}</span>
                    </label>
                    
                    <div class="expert-search-box">
                        <input type="text" class="config-input expert-search-input" id="expertSearchInput"
                               placeholder="${lang === 'zh-CN' ? '输入专家姓名或领域...' : 'Type expert name or field...'}"
                               autocomplete="off">
                        <div class="expert-search-icon">🔍</div>
                    </div>
                    
                    <div class="expert-dropdown" id="expertDropdown"></div>
                    
                    <div class="selected-experts-area">
                        <label class="config-label sub">
                            ${lang === 'zh-CN' ? '已选专家' : 'Selected Experts'}
                            <span class="count-badge" id="selectedCount">${card.experts?.length || 0}</span>
                        </label>
                        <div class="selected-experts-list" id="selectedExpertsList"></div>
                    </div>
                </div>
            </div>
            
            <div class="starry-modal-footer">
                <button class="btn-secondary" onclick="closeConfigModal()">
                    ${getFieldValue(starryColumnTexts.cancel, lang)}
                </button>
                <button class="btn-primary" onclick="saveCardConfig('${card.id}')">
                    ${getFieldValue(starryColumnTexts.save, lang)}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    
    // 初始化已选专家
    window._tempSelectedExperts = [...(card.experts || [])];
    renderSelectedExperts(window._tempSelectedExperts);
    
    // 绑定搜索事件
    const searchInput = document.getElementById('expertSearchInput');
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleExpertSearch(e.target.value, lang);
        }, 300);
    });
    
    // 点击外部关闭下拉
    document.addEventListener('click', closeExpertDropdownHandler);
}

/**
 * 关闭配置模态框
 */
function closeConfigModal() {
    // 移除下拉点击事件
    const dropdown = document.getElementById('expertDropdown');
    if (dropdown) dropdown.onclick = null;
    
    window._tempSelectedExperts = null;
    document.getElementById('starryConfigModal')?.remove();
}

/**
 * 关闭下拉处理器
 */
function closeExpertDropdownHandler(e) {
    const dropdown = document.getElementById('expertDropdown');
    const searchBox = document.querySelector('.expert-search-box');
    if (!dropdown || !searchBox) return;
    if (!searchBox.contains(e.target)) {
        dropdown.classList.remove('active');
    }
}

/**
 * 处理专家搜索
 */
function handleExpertSearch(query, lang) {
    const dropdown = document.getElementById('expertDropdown');
    if (!query || query.trim().length < 1) {
        dropdown.innerHTML = '';
        dropdown.classList.remove('active');
        return;
    }
    
    const results = fuzzySearchExperts(query, lang, 8);
    
    if (results.length === 0) {
        dropdown.innerHTML = `
            <div class="dropdown-empty">
                ${lang === 'zh-CN' ? '未找到匹配专家' : 'No matching experts found'}
            </div>
        `;
        dropdown.classList.add('active');
        return;
    }
    
    // 使用事件委托，不绑定内联 onclick
    dropdown.innerHTML = results.map(r => {
        const isSelected = (window._tempSelectedExperts || []).includes(r.id);
        return `
            <div class="dropdown-item ${isSelected ? 'selected' : ''}" 
                 data-expert-id="${r.id}">
                <span class="dropdown-item-text">${escapeHtml(r.display)}</span>
                <span class="dropdown-item-category">${getCategoryName(r.category)}</span>
                ${isSelected ? '<span class="dropdown-check">✓</span>' : ''}
            </div>
        `;
    }).join('');
    
    dropdown.classList.add('active');
    
    // 绑定一次性点击事件（事件委托）
    dropdown.onclick = function(e) {
        const item = e.target.closest('.dropdown-item');
        if (!item) return;
        
        const expertId = item.dataset.expertId;
        if (expertId) {
            toggleExpertSelect(expertId);
        }
    };
}

/**
 * 显示添加卡片模态框
 */
function showAddCardModal() {
    if (!checkAdminPermission()) {
        console.warn('Unauthorized: admin permission required');
        alert('Unauthorized: admin permission required');
        return;
    }

    const lang = window.currentLang || 'zh-CN';
    const otherLang = lang === 'zh-CN' ? 'en' : 'zh-CN';

    const modal = document.createElement('div');
    modal.className = 'starry-modal';
    modal.id = 'starryAddCardModal';

    modal.innerHTML = `
        <div class="starry-modal-overlay" onclick="if(event.target===this)closeAddCardModal()"></div>
        <div class="starry-modal-content">
            <div class="starry-modal-header">
                <h3>${lang === 'zh-CN' ? '添加新卡片' : 'Add New Card'}</h3>
                <button class="modal-close" onclick="closeAddCardModal()">×</button>
            </div>
            
            <div class="starry-modal-body">
                <!-- 卡片名称 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '卡片名称' : 'Card Name'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <input type="text" class="config-input" id="newCardNamePrimary" 
                           placeholder="${lang === 'zh-CN' ? '输入中文名称' : 'Enter name'}">
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文名称' : 'Chinese Name'}
                        <span class="lang-tag secondary">${lang === 'zh-CN' ? 'English' : '中文'}</span>
                    </label>
                    <input type="text" class="config-input" id="newCardNameSecondary" 
                           placeholder="${lang === 'zh-CN' ? 'Enter English name' : '输入中文名称'}">
                </div>

                <!-- 功能描述 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '功能描述' : 'Description'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <textarea class="config-textarea" id="newCardContributionPrimary" rows="3"
                        placeholder="${lang === 'zh-CN' ? '描述这张卡片的功能...' : 'Describe the function...'}"></textarea>
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文描述' : 'Chinese Description'}
                        <span class="lang-tag secondary">${lang === 'zh-CN' ? 'English' : '中文'}</span>
                    </label>
                    <textarea class="config-textarea" id="newCardContributionSecondary" rows="3"
                        placeholder="${lang === 'zh-CN' ? 'Describe in English...' : '用中文描述...'}"></textarea>
                </div>

                <!-- 领域标签 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '领域标签' : 'Field Tag'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <input type="text" class="config-input" id="newCardFieldPrimary" 
                           placeholder="${lang === 'zh-CN' ? '如：AI融合、人文跨界' : 'e.g. AI Fusion'}">
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文标签' : 'Chinese Tag'}
                        <span class="lang-tag secondary">${lang === 'zh-CN' ? 'English' : '中文'}</span>
                    </label>
                    <input type="text" class="config-input" id="newCardFieldSecondary" 
                           placeholder="${lang === 'zh-CN' ? 'e.g. AI Fusion' : '如：AI融合'}">
                </div>

                <!-- 备注格言 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '备注格言' : 'Remarks'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <input type="text" class="config-input" id="newCardRemarksPrimary" 
                           placeholder="${lang === 'zh-CN' ? '一句标志性的格言...' : 'A signature motto...'}">
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文格言' : 'Chinese Remarks'}
                        <span class="lang-tag secondary">${lang === 'zh-CN' ? 'English' : '中文'}</span>
                    </label>
                    <input type="text" class="config-input" id="newCardRemarksSecondary" 
                           placeholder="${lang === 'zh-CN' ? 'English motto...' : '中文格言...'}">
                </div>

                <!-- 融合模式 -->
                <div class="config-section">
                    <label class="config-label">${getFieldValue(starryColumnTexts.fusionMode, lang)}</label>
                    <select class="config-select" id="newCardFusionMode">
                        <option value="roundtable">${getFieldValue(starryColumnTexts.modeRoundtable, lang)}</option>
                        <option value="synthesis" selected>${getFieldValue(starryColumnTexts.modeSynthesis, lang)}</option>
                        <option value="debate">${getFieldValue(starryColumnTexts.modeDebate, lang)}</option>
                    </select>
                </div>
            </div>
            
            <div class="starry-modal-footer">
                <button class="btn-secondary" onclick="closeAddCardModal()">
                    ${getFieldValue(starryColumnTexts.cancel, lang)}
                </button>
                <button class="btn-primary" onclick="saveNewCard()">
                    ${getFieldValue(starryColumnTexts.save, lang)}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

/**
 * 关闭添加卡片模态框
 */
function closeAddCardModal() {
    document.getElementById('starryAddCardModal')?.remove();
}

/**
 * 保存新卡片
 */
function saveNewCard() {
    const lang = window.currentLang || 'zh-CN';
    const otherLang = lang === 'zh-CN' ? 'en' : 'zh-CN';

    const namePrimary = document.getElementById('newCardNamePrimary')?.value.trim();
    const nameSecondary = document.getElementById('newCardNameSecondary')?.value.trim();
    const contribPrimary = document.getElementById('newCardContributionPrimary')?.value.trim();
    const contribSecondary = document.getElementById('newCardContributionSecondary')?.value.trim();
    const fieldPrimary = document.getElementById('newCardFieldPrimary')?.value.trim();
    const fieldSecondary = document.getElementById('newCardFieldSecondary')?.value.trim();
    const remarksPrimary = document.getElementById('newCardRemarksPrimary')?.value.trim();
    const remarksSecondary = document.getElementById('newCardRemarksSecondary')?.value.trim();
    const fusionMode = document.getElementById('newCardFusionMode')?.value || 'synthesis';

    if (!namePrimary || !contribPrimary || !fieldPrimary) {
        alert(lang === 'zh-CN' ? '请填写主要语言的所有必填字段' : 'Please fill all required fields in primary language');
        return;
    }

    // 生成唯一 ID
    const newId = 'custom_' + Date.now();

    const newCard = {
        id: newId,
        name: {
            [lang]: namePrimary,
            [otherLang]: nameSecondary || namePrimary
        },
        contribution: {
            [lang]: contribPrimary,
            [otherLang]: contribSecondary || contribPrimary
        },
        field: {
            [lang]: fieldPrimary,
            [otherLang]: fieldSecondary || fieldPrimary
        },
        remarks: {
            [lang]: remarksPrimary,
            [otherLang]: remarksSecondary || remarksPrimary
        },
        configurable: true,
        builtIn: false,
        type: 'fusion',
        experts: [],
        systemPromptBuilder: 'buildFusionSystemPrompt',
        userInputMode: 'rawQuestion',
        fusionStrategy: {
            mode: fusionMode,
            description: {
                'zh-CN': '（已配置）',
                'en': '(Configured)'
            }
        }
    };

    starryColumnCards.push(newCard);
    
    closeAddCardModal();
    const isAdmin = checkAdminPermission();
    renderStarryCardsList(isAdmin);
    persistStarryColumnCards();
}


/**
 * 切换专家选择
 */
/**
 * 切换专家选择
 */
function toggleExpertSelect(expertId) {
    if (!window._tempSelectedExperts) {
        window._tempSelectedExperts = [];
    }
    
    const idx = window._tempSelectedExperts.indexOf(expertId);
    if (idx > -1) {
        window._tempSelectedExperts.splice(idx, 1);
    } else {
        window._tempSelectedExperts.push(expertId);
    }
    
    // 更新已选标签显示
    renderSelectedExperts(window._tempSelectedExperts);
    
    // 更新下拉列表中的选中状态（不重新搜索，避免闪烁）
    updateDropdownSelection();
}

/**
 * 更新下拉列表选中状态（不重新搜索）
 */
function updateDropdownSelection() {
    const dropdown = document.getElementById('expertDropdown');
    if (!dropdown) return;
    
    const items = dropdown.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        const id = item.dataset.expertId;
        const isSelected = (window._tempSelectedExperts || []).includes(id);
        item.classList.toggle('selected', isSelected);
        
        // 更新勾选标记
        const check = item.querySelector('.dropdown-check');
        if (isSelected && !check) {
            item.insertAdjacentHTML('beforeend', '<span class="dropdown-check">✓</span>');
        } else if (!isSelected && check) {
            check.remove();
        }
    });
}

/**
 * 渲染已选专家
 */
function renderSelectedExperts(expertIds) {
    const container = document.getElementById('selectedExpertsList');
    const countBadge = document.getElementById('selectedCount');
    if (!container) return;
    
    window._tempSelectedExperts = expertIds;
    if (countBadge) countBadge.textContent = expertIds.length;
    
    const lang = window.currentLang || 'zh-CN';
    
    if (expertIds.length === 0) {
        container.innerHTML = `
            <div class="selected-empty">
                ${lang === 'en' ? 'No experts selected' : '尚未选择专家'}
            </div>
        `;
        return;
    }
    
    container.innerHTML = expertIds.map(id => {
        const expert = findExpertById(id);
        if (!expert) return '';
        
        const display = lang === 'en' 
            ? `${getFieldValue(expert.field, 'en')}: ${getFieldValue(expert.name, 'en')}`
            : `${getFieldValue(expert.field, 'zh-CN')}: ${getFieldValue(expert.name, 'zh-CN')}`;
        
        return `
            <div class="selected-expert-tag" data-expert-id="${id}">
                <span class="tag-text">${display}</span>
                <button class="tag-remove" onclick="removeSelectedExpert('${id}')" title="Remove">×</button>
            </div>
        `;
    }).join('');
}

/**
 * 移除已选专家
 */
function removeSelectedExpert(expertId) {
    if (!window._tempSelectedExperts) return;
    const idx = window._tempSelectedExperts.indexOf(expertId);
    if (idx > -1) {
        window._tempSelectedExperts.splice(idx, 1);
        renderSelectedExperts(window._tempSelectedExperts);
    }
}

/**
 * 保存卡片配置
 */
function saveCardConfig(cardId) {
    const card = starryColumnCards.find(c => c.id === cardId);
    if (!card) return;

    const lang = window.currentLang || 'zh-CN';
    const otherLang = lang === 'zh-CN' ? 'en' : 'zh-CN';

    // 读取所有字段
    const namePrimary = document.getElementById('configNamePrimary')?.value.trim();
    const nameSecondary = document.getElementById('configNameSecondary')?.value.trim();
    const contribPrimary = document.getElementById('configContributionPrimary')?.value.trim();
    const contribSecondary = document.getElementById('configContributionSecondary')?.value.trim();
    const fieldPrimary = document.getElementById('configFieldPrimary')?.value.trim();
    const fieldSecondary = document.getElementById('configFieldSecondary')?.value.trim();
    const remarksPrimary = document.getElementById('configRemarksPrimary')?.value.trim();
    const remarksSecondary = document.getElementById('configRemarksSecondary')?.value.trim();
    const fusionMode = document.getElementById('configFusionMode')?.value || 'synthesis';
    const selectedExperts = window._tempSelectedExperts || [];

    // 校验
    if (!namePrimary || !contribPrimary || !fieldPrimary) {
        alert(lang === 'zh-CN' ? '请填写主要语言的所有必填字段' : 'Please fill all required fields in primary language');
        return;
    }

    // 更新数据
    card.name = { [lang]: namePrimary, [otherLang]: nameSecondary || namePrimary };
    card.contribution = { [lang]: contribPrimary, [otherLang]: contribSecondary || contribPrimary };
    card.field = { [lang]: fieldPrimary, [otherLang]: fieldSecondary || fieldPrimary };
    card.remarks = { [lang]: remarksPrimary, [otherLang]: remarksSecondary || remarksPrimary };
    card.experts = selectedExperts;
    card.fusionStrategy = {
        mode: fusionMode,
        description: { 'zh-CN': '（已配置）', 'en': '(Configured)' }
    };

    // 清理
    window._tempSelectedExperts = null;
    document.removeEventListener('click', closeExpertDropdownHandler);

    // 刷新
    closeConfigModal();
    const isAdmin = checkAdminPermission();
    renderStarryCardsList(isAdmin);
    persistStarryColumnCards();
}

// ═══════════════════════════════════════════════
// 专家搜索工具
// ═══════════════════════════════════════════════

/**
 * 构建专家搜索索引
 */
function buildExpertSearchIndex() {
    const index = [];
    for (const [category, leaders] of Object.entries(allData)) {
        leaders.forEach(leader => {
            if (leader.id === 'interstellar_navigator') return;
            
            const nameZh = getFieldValue(leader.name, 'zh-CN');
            const nameEn = getFieldValue(leader.name, 'en');
            const fieldZh = getFieldValue(leader.field, 'zh-CN');
            const fieldEn = getFieldValue(leader.field, 'en');
            
            index.push({
                id: leader.id,
                name: leader.name,
                field: leader.field,
                category: category,
                searchKeyZh: `${fieldZh} ${nameZh} ${category}`.toLowerCase(),
                searchKeyEn: `${fieldEn} ${nameEn} ${category}`.toLowerCase(),
                displayZh: `${fieldZh}: ${nameZh}`,
                displayEn: `${fieldEn}: ${nameEn}`
            });
        });
    }
    return index;
}

/**
 * 模糊搜索专家
 */
function fuzzySearchExperts(query, lang = 'zh-CN', limit = 10) {
    if (!query || query.trim().length < 1) return [];
    
    const searchIndex = buildExpertSearchIndex();
    const q = query.toLowerCase().trim();
    
    const scored = searchIndex.map(expert => {
        const searchKey = lang === 'en' ? expert.searchKeyEn : expert.searchKeyZh;
        const display = lang === 'en' ? expert.displayEn : expert.displayZh;
        
        let score = 0;
        
        // 精确匹配
        if (searchKey.includes(q)) score += 100;
        if (searchKey.startsWith(q)) score += 60;
        
        // 分词匹配
        const queryChars = q.split('');
        const matchCount = queryChars.filter(c => searchKey.includes(c)).length;
        score += (matchCount / queryChars.length) * 40;
        
        return { ...expert, score, display };
    });
    
    return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
}

// ═══════════════════════════════════════════════
// 数据持久化
// ═══════════════════════════════════════════════

function persistStarryColumnCards() {
    localStorage.setItem('starryColumnCards', JSON.stringify(starryColumnCards));
}

function loadStarryColumnCards() {
    const saved = localStorage.getItem('starryColumnCards');
    if (!saved) return;
    
    try {
        const parsed = JSON.parse(saved);
        parsed.forEach(savedCard => {
            const existing = starryColumnCards.find(c => c.id === savedCard.id);
            if (existing && existing.configurable) {
                existing.name = savedCard.name || existing.name;
                existing.contribution = savedCard.contribution || existing.contribution;
                existing.field = savedCard.field || existing.field;
                existing.remarks = savedCard.remarks || existing.remarks;
                existing.experts = savedCard.experts || [];
                existing.fusionStrategy = savedCard.fusionStrategy || { mode: 'synthesis' };
            }
        });
    } catch (e) {
        console.error('Failed to load starry column cards:', e);
    }
}

// ═══════════════════════════════════════════════
// 权限检查
// ═══════════════════════════════════════════════

function checkAdminPermission() {
    const token = localStorage.getItem('qgr_jwt_token');
    if (!token) return false;

    const decoded = parseJWTClientSide(token);
    if (!decoded) return false;

    return decoded.user === 'admin';
}

function parseJWTClientSide(token) {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        
        const payload = parts[1];
        const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        const json = atob(base64);
        return JSON.parse(json);
    } catch (e) {
        console.error('JWT parse error:', e);
        return null;
    }
}


/**
 * 刷新星空专栏界面语言 - 局部更新，保留交互状态
 */
function updateStarryColumnLanguage() {
    const lang = window.currentLang || 'zh-CN';
    const layout = document.getElementById('category-layout-container');
    if (!layout || layout.style.display === 'none') return;
    
    // 1. 更新左侧封面
    const coverTitle = layout.querySelector('.starry-cover-title');
    if (coverTitle) coverTitle.textContent = getFieldValue(starryColumnTexts.title, lang);
    
    const coverSubtitle = layout.querySelector('.starry-cover-subtitle');
    if (coverSubtitle) coverSubtitle.textContent = getFieldValue(starryColumnTexts.subtitle, lang);
    
    // 2. 更新右侧头部
    const listTitle = layout.querySelector('.starry-list-title');
    if (listTitle) listTitle.textContent = getFieldValue(starryColumnTexts.columnName, lang);
    
    // 3. 更新按钮 title
    const backBtn = document.getElementById('btn-starry-back');
    if (backBtn) backBtn.title = getFieldValue(starryColumnTexts.backTooltip, lang);
    
    const backToListBtn = document.getElementById('btn-back-to-list');
    if (backToListBtn) {
        backToListBtn.title = lang === 'zh-CN' ? '返回专栏列表' : 'Back to Column List';
    }
    
    // 4. 根据模式更新内容
    if (window.starryColumnViewMode === 'card' && window.currentSelectedLeader) {
        const leader = window.currentSelectedLeader;
        
        // ═══════════════════════════════════════════════
        // 【关键修复】如果 leader 有原始多语言对象，重新解析
        // ═══════════════════════════════════════════════
        if (leader._rawName) {
            leader.name = getFieldValue(leader._rawName, lang);
            leader.field = getFieldValue(leader._rawField, lang);
            leader.contribution = getFieldValue(leader._rawContribution, lang);
            leader.remarks = getFieldValue(leader._rawRemarks, lang);
        }
        
        // 更新卡片显示
        updateSingleCard(leader);
        
        // 更新 selectLeader 渲染的标题
        const selectedLeaderName = document.getElementById('selectedLeaderName');
        if (selectedLeaderName) {
            selectedLeaderName.textContent = leader.name;
        }
        
    } else {
        // 列表模式：重新渲染卡片列表
        const isAdmin = checkAdminPermission();
        renderStarryCardsList(isAdmin);
    }
}


// ═══════════════════════════════════════════════
// 初始化
// ═══════════════════════════════════════════════

function initStarryColumn() {
    loadStarryColumnCards();
}

