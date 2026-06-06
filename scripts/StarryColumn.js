/**
 * 进入星空专栏页面
 * 复用 category-layout-container 的左右布局结构
 */
function enterStarryColumn() {
    // 停止水晶球演示，避免后台动画消耗
    if (crystalInstance) {
        crystalInstance.stopDemoLoop();
        crystalInstance._pauseDemo(Infinity);
    }

    // 过渡动画
    const overlay = document.getElementById('pageTransitionOverlay');
    if (overlay) overlay.classList.add('active');

    setTimeout(() => {
        // 隐藏水晶球首页
        const nebulaCrystal = document.getElementById('nebula-crystal');
        if (nebulaCrystal) nebulaCrystal.style.display = 'none';

        // 隐藏旧转盘（兼容）
        const wheelSection = document.getElementById('wheel-of-destiny');
        if (wheelSection) wheelSection.style.display = 'none';

        // 隐藏传统容器
        const mainContainer = document.querySelector('.container');
        if (mainContainer) mainContainer.style.display = 'none';

        document.querySelectorAll('.tab-content').forEach(tc => {
            tc.style.display = 'none';
        });

        // 渲染星空专栏布局
        renderStarryColumnLayout();

        if (overlay) overlay.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, 300);
}


/**
 * 渲染星空专栏的左右布局
 * 左侧：固定封面图  右侧：星空专栏卡片列表
 */
function renderStarryColumnLayout() {
    const layout = document.getElementById('category-layout-container');
    if (!layout) {
        console.error('category-layout-container not found');
        return;
    }

    const lang = window.currentLang || 'zh-CN';
    const isAdmin = checkAdminPermission();

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
            <div class="starry-cards-container" id="starryCardsContainer">
                <!-- 卡片列表由 JS 渲染 -->
            </div>
            ${isAdmin ? `
                <button class="add-card-btn" id="btn-add-card">
                    <span>+</span>
                    ${getFieldValue(starryColumnTexts.addCard, lang)}
                </button>
            ` : ''}
        </div>
    `;

    // 绑定返回按钮
    document.getElementById('btn-starry-back')?.addEventListener('click', backToWheelSelection);

    // 渲染卡片列表
    renderStarryCardsList();

    // 绑定添加卡片按钮（管理员）
    if (isAdmin) {
        document.getElementById('btn-add-card')?.addEventListener('click', showAddCardModal);
    }
}


/**
 * 渲染星空专栏卡片列表
 */
function renderStarryCardsList() {
    const container = document.getElementById('starryCardsContainer');
    if (!container) return;

    const lang = window.currentLang || 'zh-CN';

    container.innerHTML = '';

    starryColumnCards.forEach(card => {
        const isEmpty = card.type === 'fusion' && 
                       (!card.experts || card.experts.length === 0);
        
        const isConfigurable = card.configurable;
        const cardEl = document.createElement('div');
        cardEl.className = `starry-card ${card.builtIn ? 'built-in' : ''} ${isEmpty ? 'empty' : ''}`;
        cardEl.dataset.cardId = card.id;

        cardEl.innerHTML = `
            <div class="starry-card-header">
                <div class="starry-card-icon">
                    ${getCardTypeIcon(card.type)}
                </div>
                <h4 class="starry-card-name">${getFieldValue(card.name, lang)}</h4>
                ${isConfigurable ? `
                    <button class="starry-card-config" data-card-id="${card.id}" title="${lang === 'en' ? 'Configure' : '配置'}">
                        ⚙️
                    </button>
                ` : ''}
            </div>
            <p class="starry-card-contribution">${getFieldValue(card.contribution, lang)}</p>
            <div class="starry-card-meta">
                <span class="starry-card-field">${getFieldValue(card.field, lang)}</span>
                ${isEmpty 
                    ? `<span class="starry-card-status empty">${lang === 'en' ? 'Not Configured' : '未配置'}</span>`
                    : `<span class="starry-card-status active">${card.experts.length} ${lang === 'en' ? 'Experts' : '位专家'}</span>`
                }
            </div>
            <p class="starry-card-remarks">${getFieldValue(card.remarks, lang)}</p>
        `;

        // 点击卡片进入对话（空配置卡片除外）
        if (!isEmpty || card.type === 'navigator') {
            cardEl.addEventListener('click', (e) => {
                // 避免点击配置按钮时触发
                if (e.target.closest('.starry-card-config')) return;
                selectStarryCard(card);
            });
            cardEl.style.cursor = 'pointer';
        } else {
            cardEl.style.cursor = 'not-allowed';
            cardEl.style.opacity = '0.6';
        }

        // 配置按钮事件
        const configBtn = cardEl.querySelector('.starry-card-config');
        if (configBtn) {
            configBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showConfigModal(card);
            });
        }

        container.appendChild(cardEl);
    });
}


/**
 * 获取卡片类型图标
 */
function getCardTypeIcon(type) {
    if (type === 'navigator') {
        // 指南针图标
        return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>`;
    }
    // 融合体图标：群星
    return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>`;
}

/**
 * 选择星空专栏卡片，进入对话模式
 * 复用现有的 selectLeader / getAIResponse 流程
 */
function selectStarryCard(card) {
    const lang = window.currentLang || 'zh-CN';

    // 设置当前选中的卡片上下文
    window.currentSelectedCard = card;

    // 根据卡片类型准备专家数据
    let resolvedExperts;
    if (card.type === 'navigator') {
        // 领航员：动态提取全库
        resolvedExperts = buildInterstellarSnapshot(lang);
    } else {
        // 融合体：解析配置的专家
        resolvedExperts = resolveCardExperts(card);
    }

    // 创建虚拟 leader 对象，复用现有对话流程
    const virtualLeader = {
        id: card.id,
        name: card.name,
        field: card.field,
        contribution: card.contribution,
        remarks: card.remarks,
        _isStarryCard: true,        // 标记为星空卡片
        _cardType: card.type,        // 'navigator' | 'fusion'
        _experts: resolvedExperts,  // 解析后的专家列表
        _systemPromptBuilder: card.systemPromptBuilder
    };

    // 更新 UI 为对话模式
    renderStarryDialogMode(card, virtualLeader);

    // 滚动到交互区
    setTimeout(() => {
        document.querySelector('.interaction-area')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 100);
}

/**
 * 渲染星空卡片的对话界面
 * 复用现有的大卡片 + 交互区结构
 */
function renderStarryDialogMode(card, virtualLeader) {
    const layoutRight = document.getElementById('starryRight');
    if (!layoutRight) return;

    const lang = window.currentLang || 'zh-CN';

    // 清空右侧，保留返回按钮
    const header = layoutRight.querySelector('.starry-header');
    layoutRight.innerHTML = '';
    if (header) layoutRight.appendChild(header);

    // 创建对话区域
    const dialogArea = document.createElement('div');
    dialogArea.className = 'starry-dialog-area';

    // 卡片信息展示
    const infoSection = document.createElement('div');
    infoSection.className = 'starry-dialog-info';
    infoSection.innerHTML = `
        <div class="starry-dialog-card-brief">
            <div class="brief-icon">${getCardTypeIcon(card.type)}</div>
            <div class="brief-text">
                <h4>${getFieldValue(card.name, lang)}</h4>
                <p>${getFieldValue(card.field, lang)}</p>
            </div>
        </div>
        <p class="brief-desc">${getFieldValue(card.contribution, lang)}</p>
        ${card.type === 'fusion' && card.experts.length > 0 ? `
            <div class="brief-experts">
                <span class="experts-label">${lang === 'en' ? 'Participants: ' : '参与专家：'}</span>
                ${card.experts.map(id => {
                    const expert = findExpertById(id);
                    return expert ? `<span class="expert-tag">${getFieldValue(expert.name, lang)}</span>` : '';
                }).join('')}
            </div>
        ` : ''}
    `;

    // 用户输入区
    const inputSection = document.createElement('div');
    inputSection.className = 'starry-input-section';
    inputSection.innerHTML = `
        <textarea 
            id="starryUserQuestion" 
            class="starry-question-input"
            placeholder="${lang === 'en' 
                ? 'Enter your question, let wisdom guide you...' 
                : '输入你的问题，让智慧指引你...'}"
            rows="4"
        ></textarea>
        <button class="starry-submit-btn" id="btnStarrySubmit">
            <span>${lang === 'en' ? 'Ask' : '提问'}</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
        </button>
    `;

    // AI 回复区
    const responseSection = document.createElement('div');
    responseSection.className = 'starry-response-section';
    responseSection.id = 'starryResponseSection';
    responseSection.style.display = 'none';
    responseSection.innerHTML = `
        <div class="starry-response-header">
            <span class="response-label">${lang === 'en' ? 'Wisdom Response' : '智慧回应'}</span>
            <button class="copy-btn" id="btnCopyResponse" title="${lang === 'en' ? 'Copy' : '复制'}">📋</button>
        </div>
        <div class="starry-response-content" id="starryResponseText"></div>
    `;

    dialogArea.appendChild(infoSection);
    dialogArea.appendChild(inputSection);
    dialogArea.appendChild(responseSection);
    layoutRight.appendChild(dialogArea);

    // 绑定提交事件
    document.getElementById('btnStarrySubmit')?.addEventListener('click', () => {
        submitStarryQuestion(card, virtualLeader);
    });

    // 绑定复制事件
    document.getElementById('btnCopyResponse')?.addEventListener('click', copyStarryResponse);
}

/**
 * 提交星空卡片的问题
 * 复用 getAIResponse 的核心逻辑，但使用星空卡片的系统指令
 */
async function submitStarryQuestion(card, virtualLeader) {
    const questionInput = document.getElementById('starryUserQuestion');
    const question = questionInput?.value.trim();
    
    if (!question) {
        alert(translations[window.currentLang || 'zh-CN']?.alertNoPrompt || '请输入问题');
        return;
    }

    const responseSection = document.getElementById('starryResponseSection');
    const responseText = document.getElementById('starryResponseText');
    const submitBtn = document.getElementById('btnStarrySubmit');

    // 显示加载状态
    responseSection.style.display = 'block';
    responseText.innerHTML = `<div class="starry-loading"><span class="loading-dots">...</span></div>`;
    submitBtn.disabled = true;

    try {
        // 构建系统指令
        let systemPrompt = '';
        if (card.type === 'navigator') {
            systemPrompt = buildNavigatorSystemPrompt(window.currentLang || 'zh-CN');
        } else {
            systemPrompt = buildFusionSystemPrompt(card, window.currentLang || 'zh-CN');
        }

        // 构建消息
        const messages = [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: question }
        ];

        // 调用 API（复用现有配置）
        const response = await callStarryAPI(messages);
        
        // 显示结果
        responseText.dataset.raw = response;
        responseText.innerHTML = response.replace(/\n/g, '<br>');

        // 保存到对话历史
        saveStarryConversation(card, question, response);

    } catch (error) {
        console.error('Starry API Error:', error);
        responseText.textContent = `Error: ${error.message}`;
    } finally {
        submitBtn.disabled = false;
    }
}

/**
 * 构建融合体卡片的系统指令
 * @param {Object} card - 星空卡片配置
 * @param {string} lang - 语言代码
 */
function buildFusionSystemPrompt(card, lang = 'zh-CN') {
    const isZh = lang === 'zh-CN';

    // 解析配置的专家列表
    const experts = resolveCardExperts(card);
    if (!experts || experts.length === 0) {
        return isZh 
            ? '系统错误：未配置任何专家。'
            : 'System error: No experts configured.';
    }

    // 构建专家目录文本
    const expertLines = experts.map(e => 
        `  · ${e.name} [${e.field}]`
    ).join('\n');

    // 获取融合策略
    const strategy = card.fusionStrategy || { mode: 'synthesis' };

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
        ? `你是"对话北极星"的融合智慧体。你的任务是针对用户的核心问题，融合以下多位"北极星"人物的洞察，给出深度回答。

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
        : `You are the Fusion Wisdom of "Talk with North Stars". Your task is to synthesize insights from the following "North Star" figures to provide a deep answer.

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
 * 根据卡片配置解析实际专家列表
 */
function resolveCardExperts(card) {
    const lang = window.currentLang || 'zh-CN';

    if (card.type === 'navigator') {
        // 领航员：动态提取全库（排除自身）
        return buildInterstellarSnapshot(lang);
    }

    if (card.type === 'fusion') {
        if (!card.experts || card.experts.length === 0) {
            return null;
        }

        // 根据 ID 列表从 allData 提取
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
 * 根据 ID 查找专家完整数据
 */
function findExpertById(id) {
    for (const [category, leaders] of Object.entries(allData)) {
        const found = leaders.find(l => l.id === id);
        if (found) {
            found._category = category; // 临时标记类别
            return found;
        }
    }
    return null;
}

/**
 * 查找专家所属类别
 */
function findExpertCategory(id) {
    for (const [category, leaders] of Object.entries(allData)) {
        if (leaders.some(l => l.id === id)) {
            return category;
        }
    }
    return null;
}

/**
 * 星空专栏的 API 调用
 * 复用 getAIResponse 的配置逻辑
 */
async function callStarryAPI(messages) {
    const apiBaseUrl = apiEndpointSelect.value;
    const apiKey = apiKeyInput.value;
    const modelWithSuffix = apiModelSelect.value;
    const model = modelWithSuffix.split('@')[0];

    const headers = { 'Content-Type': 'application/json' };
    const isGeminiModel = model.toLowerCase().includes("gemini");
    const isQwenModel = apiBaseUrl === "https://qwenapi.aivibeinvest.com";

    // 构造 URL（复用现有逻辑）
    let fullApiUrl;
    if (isGeminiModel) {
        const baseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
        fullApiUrl = `${baseUrl}/v1beta/models/${model}:generateContent?key=${apiKey}`;
    } else if (isQwenModel) {
        const baseUrl = "/api/qwenproxy";
        fullApiUrl = `${baseUrl}/api/v1/services/aigc/text-generation/generation`;
        headers['X-API-Key'] = apiKey;
    } else {
        fullApiUrl = (apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl) + "/v1/chat/completions";
        headers['Authorization'] = `Bearer ${apiKey}`;
    }

    // 构造 Body
    let requestBody;
    if (isGeminiModel) {
        const contents = messages.map(m => ({
            role: m.role === 'system' ? 'user' : m.role,
            parts: [{ text: m.content }]
        }));
        requestBody = { contents, generationConfig: { temperature: 0.7 } };
    } else if (isQwenModel) {
        requestBody = {
            model: model,
            input: { messages: messages },
            parameters: { temperature: 0.7, plugins: { web_search: {} } }
        };
    } else {
        requestBody = { model: model, messages: messages, temperature: 0.7 };
    }

    const response = await fetch(fullApiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: response.statusText }));
        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || errorData.detail}`);
    }

    const data = await response.json();

    // 解析响应（复用现有逻辑）
    if (isGeminiModel) {
        return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
    } else if (isQwenModel) {
        return data.output?.text?.trim() || '';
    } else {
        return data.choices?.[0]?.message?.content?.trim() || '';
    }
}

/**
 * 保存星空专栏对话到历史
 */
function saveStarryConversation(card, question, response) {
    const lang = window.currentLang || 'zh-CN';
    
    const cardMeta = {
        id: card.id,
        name: getFieldValue(card.name, lang),
        type: card.type,
        field: getFieldValue(card.field, lang)
    };

    // 用户提问
    conversationHistory.push({
        id: Date.now() + '_starry_user',
        role: 'user',
        text: question,
        leaderInfo: null,
        cardInfo: cardMeta,
        timestamp: new Date()
    });

    // AI 回答
    conversationHistory.push({
        id: Date.now() + '_starry_ai',
        role: 'ai',
        text: response,
        leaderInfo: null,
        cardInfo: cardMeta,
        timestamp: new Date()
    });

    saveCanvasSession();
}

/**
 * 显示卡片配置模态框
 */
function showConfigModal(card) {
    const lang = window.currentLang || 'zh-CN';
    
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'starry-modal';
    modal.id = 'starryConfigModal';
    
    // 构建可选专家列表
    const allExperts = [];
    for (const [category, leaders] of Object.entries(allData)) {
        leaders.forEach(l => {
            if (l.id !== 'interstellar_navigator') {
                allExperts.push({
                    ...l,
                    _category: category
                });
            }
        });
    }

    modal.innerHTML = `
        <div class="starry-modal-overlay">
            <div class="starry-modal-content">
                <div class="starry-modal-header">
                    <h3>${lang === 'en' ? 'Configure Card' : '配置卡片'}: ${getFieldValue(card.name, lang)}</h3>
                    <button class="modal-close" onclick="closeConfigModal()">×</button>
                </div>
                <div class="starry-modal-body">
                    <div class="config-section">
                        <label>${lang === 'en' ? 'Fusion Mode' : '融合模式'}</label>
                        <select id="configFusionMode">
                            <option value="roundtable" ${card.fusionStrategy?.mode === 'roundtable' ? 'selected' : ''}>
                                ${lang === 'en' ? 'Roundtable' : '圆桌会议'}
                            </option>
                            <option value="synthesis" ${card.fusionStrategy?.mode === 'synthesis' ? 'selected' : ''}>
                                ${lang === 'en' ? 'Synthesis' : '综合融合'}
                            </option>
                            <option value="debate" ${card.fusionStrategy?.mode === 'debate' ? 'selected' : ''}>
                                ${lang === 'en' ? 'Debate' : '思想交锋'}
                            </option>
                        </select>
                    </div>
                    <div class="config-section">
                        <label>${lang === 'en' ? 'Select Experts' : '选择专家'}</label>
                        <div class="experts-grid">
                            ${allExperts.map(expert => {
                                const isSelected = card.experts?.includes(expert.id);
                                return `
                                    <div class="expert-option ${isSelected ? 'selected' : ''}" 
                                         data-expert-id="${expert.id}"
                                         onclick="toggleExpertSelection(this)">
                                        <span class="expert-name">${getFieldValue(expert.name, lang)}</span>
                                        <span class="expert-field">${getFieldValue(expert.field, lang)}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>
                <div class="starry-modal-footer">
                    <button class="btn-secondary" onclick="closeConfigModal()">
                        ${lang === 'en' ? 'Cancel' : '取消'}
                    </button>
                    <button class="btn-primary" onclick="saveCardConfig('${card.id}')">
                        ${lang === 'en' ? 'Save' : '保存'}
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

/**
 * 关闭配置模态框
 */
function closeConfigModal() {
    document.getElementById('starryConfigModal')?.remove();
}

/**
 * 切换专家选择
 */
function toggleExpertSelection(el) {
    el.classList.toggle('selected');
}

/**
 * 保存卡片配置
 */
function saveCardConfig(cardId) {
    const card = starryColumnCards.find(c => c.id === cardId);
    if (!card) return;

    // 获取选中的专家
    const selectedExperts = Array.from(
        document.querySelectorAll('.expert-option.selected')
    ).map(el => el.dataset.expertId);

    // 获取融合模式
    const fusionMode = document.getElementById('configFusionMode')?.value || 'synthesis';

    // 更新卡片配置
    card.experts = selectedExperts;
    card.fusionStrategy = {
        mode: fusionMode,
        description: card.fusionStrategy?.description || {}
    };

    // 更新领域标签（根据选中专家自动推断）
    if (selectedExperts.length > 0) {
        const fields = selectedExperts.map(id => {
            const expert = findExpertById(id);
            return expert ? getFieldValue(expert.field, window.currentLang || 'zh-CN') : '';
        }).filter(Boolean);
        
        // 去重后拼接
        const uniqueFields = [...new Set(fields.flatMap(f => f.split(/[,、]/)))].slice(0, 3).join('、');
        card.field = {
            'zh-CN': uniqueFields || '融合领域',
            'en': 'Fusion Domain'
        };
    }

    // 关闭模态框并刷新列表
    closeConfigModal();
    renderStarryCardsList();
    
    // 持久化（需接入后端或 localStorage）
    persistStarryColumnCards();
}

/**
 * 持久化配置（示例：localStorage）
 */
function persistStarryColumnCards() {
    localStorage.setItem('starryColumnCards', JSON.stringify(starryColumnCards));
}

/**
 * 加载持久化配置
 */
function loadStarryColumnCards() {
    const saved = localStorage.getItem('starryColumnCards');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            // 合并保存的配置到默认卡片（保留内置卡片结构）
            parsed.forEach(savedCard => {
                const existing = starryColumnCards.find(c => c.id === savedCard.id);
                if (existing && existing.configurable) {
                    existing.experts = savedCard.experts || [];
                    existing.fusionStrategy = savedCard.fusionStrategy || { mode: 'synthesis' };
                    existing.field = savedCard.field || existing.field;
                }
            });
        } catch (e) {
            console.error('Failed to load starry column cards:', e);
        }
    }
}

/**
 * 检查是否为管理员
 * 基于 qgr_jwt_token 的客户端 JWT 解析
 */
function checkAdminPermission() {
    const token = localStorage.getItem('qgr_jwt_token');
    if (!token) return false;

    const decoded = parseJWTClientSide(token);
    if (!decoded) return false;

    const username = decoded.user;
    const isAdmin = username === 'admin';
    
    return isAdmin;
}

// 在应用初始化时调用
function initStarryColumn() {
    loadStarryColumnCards();
}
