const starryColumnTexts = {
    title: {
        'zh-CN': '星空专栏',
        'en': 'Starry Column'
    },
    subtitle: {
        'zh-CN': '跨领域智慧融合',
        'en': 'Cross-domain Wisdom Fusion'
    },
    columnNameList: {
        'zh-CN': '专栏列表',
        'en': 'Column List'
    },
    
    // 卡片/创作视图标题
    columnNameCard: {
        'zh-CN': '专栏创作',
        'en': 'Column Writing'
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
    configureCard: {
        'zh-CN': '配置卡片',
        'en': 'Configure Card'
    },
    fusionMode: {
        'zh-CN': '融合模式',
        'en': 'Fusion Mode'
    },
    selectExperts: {
        'zh-CN': '选择北极星',
        'en': 'Select NorthStar'
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
    // ═══════════════════════════════════════════════════
    // 【新增】导入导出全球化
    // ═══════════════════════════════════════════════════
    exportConfig: {
        'zh-CN': '导出配置',
        'en': 'Export Config'
    },
    importConfig: {
        'zh-CN': '导入配置',
        'en': 'Import Config'
    },
    exportSuccess: {
        'zh-CN': '已导出 {count} 张卡片配置',
        'en': 'Exported {count} cards'
    },
    importConfirm: {
        'zh-CN': '导入将覆盖现有自定义卡片配置，确定继续？',
        'en': 'Import will overwrite existing custom cards. Continue?'
    },
    importSuccess: {
        'zh-CN': '导入成功：新增 {added} 张，更新 {updated} 张',
        'en': 'Import success: {added} added, {updated} updated'
    },
    importFailed: {
        'zh-CN': '导入失败：{error}',
        'en': 'Import failed: {error}'
    },
    systemColumn: {
        'zh-CN': '系统专栏',
        'en': 'System Column'
    },
    canvasNotEmptyTitle: {
        'zh-CN': '画布非空',
        'en': 'Canvas Not Empty'
    },
    canvasNotEmptyMessage: {
        'zh-CN': '当前画布内容非空，请先导出然后清空，才能加载系统专栏。',
        'en': 'Current canvas is not empty. Please export and clear it before loading system column.'
    },
    systemColumnLoaded: {
        'zh-CN': '系统专栏已加载',
        'en': 'System column loaded'
    },
    systemColumnLoadFailed: {
        'zh-CN': '加载失败：',
        'en': 'Load failed: '
    },
    // ═══════════════════════════════════════════════════
    // 【新增】删除卡片全球化
    // ═══════════════════════════════════════════════════
    deleteCard: {
        'zh-CN': '删除卡片',
        'en': 'Delete Card'
    },
    deleteCardConfirm: {
        'zh-CN': '确定要删除这张卡片吗？此操作不可恢复。',
        'en': 'Are you sure you want to delete this card? This cannot be undone.'
    },
    deleteCardSuccess: {
        'zh-CN': '卡片已删除',
        'en': 'Card deleted'
    },
    deleteCardNotFound: {
        'zh-CN': '卡片不存在',
        'en': 'Card not found'
    },
    deleteCardBuiltIn: {
        'zh-CN': '内置卡片不能删除',
        'en': 'Built-in cards cannot be deleted'
    },
    
    // ═══ 新增：系统专栏文件错误提示 ═══
    systemColumnFileNotFound: {
        'zh-CN': '系统专栏文件不存在',
        'en': 'System column file not found'
    },
    systemColumnFileEmpty: {
        'zh-CN': '系统专栏文件内容为空',
        'en': 'System column file is empty'
    },
    systemColumnParseFailed: {
        'zh-CN': '无法解析专栏内容',
        'en': 'Unable to parse column content'
    }
};

/**
 * Toast 适配器
 * 优先复用 contextUI._showToast，否则使用内置兜底
 */
function showToast(message, type = 'info') {
    // 方案1：复用 contextUI 的 toast（保持项目 UI 风格统一）
    if (typeof window.contextUI !== 'undefined' && 
        typeof window.contextUI._showToast === 'function') {
        window.contextUI._showToast(message);
        return;
    }

    // 方案2：兜底实现（与之前提供的版本一致，确保任何场景都不报错）
    const existing = document.getElementById('starry-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'starry-toast';
    
    const colors = {
        success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        info: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    };

    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 99999;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        background: ${colors[type] || colors.info};
        max-width: 80vw;
        word-break: break-word;
        text-align: center;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; });
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * 根据当前视图模式返回对应的标题文案
 */
function getColumnTitle(lang) {
    const mode = window.starryColumnViewMode || 'list';
    if (mode === 'card') {
        return getFieldValue(starryColumnTexts.columnNameCard, lang);
    }
    return getFieldValue(starryColumnTexts.columnNameList, lang);
}

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

    setTimeout(async () => {  // ✅ 改为 async
        const nebulaCrystal = document.getElementById('nebula-crystal');
        if (nebulaCrystal) nebulaCrystal.style.display = 'none';

        const wheelSection = document.getElementById('wheel-of-destiny');
        if (wheelSection) wheelSection.style.display = 'none';

        const mainContainer = document.querySelector('.container');
        if (mainContainer) mainContainer.style.display = 'none';

        document.querySelectorAll('.tab-content').forEach(tc => {
            tc.style.display = 'none';
        });

        // 设置全局状态
        window.currentSelectedCategory = 'starryColumn';
        window.starryColumnViewMode = 'list';
        window.currentSelectedLeader = null;
        window.currentSelectedCard = null;

        // ═══════════════════════════════════════════════════
        // 【关键】先加载持久化数据，再渲染
        // ═══════════════════════════════════════════════════
        await initStarryColumn();  // ✅ 加载 KV/localStorage 数据

        renderStarryColumnLayout();

        if (overlay) overlay.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, 300);
}

/**
 * 渲染星空专栏布局（图标按钮，无文字，支持语言切换）
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
                <img src="images/starry.jpg"
                     alt="${getFieldValue(starryColumnTexts.title, lang)}"
                     class="starry-cover"
                     id="starryCover"
                     style="display: block; margin-bottom: 20px;">
                
                <img src="images/starry.jpg"
                     alt="${getFieldValue(starryColumnTexts.title, lang)}"
                     class="starry-cover"
                     id="starryCover"
                     style="display: block;">
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
                    ${getColumnTitle(lang)}
                </h3>
                ${isAdmin ? `
                    <div class="starry-admin-actions" id="starryAdminActions">
                        <button class="btn-starry-icon" id="btn-starry-export" 
                                title="${getFieldValue(starryColumnTexts.exportConfig, lang)}">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                        </button>
                        <label class="btn-starry-icon" for="btn-starry-import-input" 
                               title="${getFieldValue(starryColumnTexts.importConfig, lang)}">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="17 8 12 3 7 8"/>
                                <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                        </label>
                        <input type="file" id="btn-starry-import-input" 
                               accept=".json,application/json" 
                               style="display:none">
                    </div>
                ` : ''}
            </div>
            <div class="starry-cards-container" id="starryCardsContainer"></div>
        </div>
    `;

    document.getElementById('btn-starry-back')?.addEventListener('click', backToWheelSelection);

    if (isAdmin) {
        _bindExportImportEvents();
    }

    renderStarryCardsList(isAdmin);
}


/**
 * 绑定导出/导入事件（只调用一次，语言无关）
 */
function _bindExportImportEvents() {
    // 导出按钮
    const exportBtn = document.getElementById('btn-starry-export');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const lang = window.currentLang || 'zh-CN';  // ✅ 实时读取
            const result = exportStarryColumnData();
            if (result.success) {
                const msg = lang === 'zh-CN' 
                    ? `已导出 ${result.count} 张卡片配置` 
                    : `Exported ${result.count} cards`;
                showToast(msg, 'success');
            }
        });
    }

    // 导入文件选择
    const importInput = document.getElementById('btn-starry-import-input');
    if (importInput) {
        importInput.addEventListener('change', async (e) => {
            const lang = window.currentLang || 'zh-CN';  // ✅ 实时读取
            const file = e.target.files[0];
            if (!file) return;

            const confirmMsg = lang === 'zh-CN' 
                ? '导入将覆盖现有自定义卡片配置，确定继续？' 
                : 'Import will overwrite existing custom cards. Continue?';

            if (!confirm(confirmMsg)) {
                e.target.value = '';
                return;
            }

            const result = await importStarryColumnData(file);

            if (result.success) {
                const msg = lang === 'zh-CN' 
                    ? `导入成功：新增 ${result.added} 张，更新 ${result.updated} 张` 
                    : `Import success: ${result.added} added, ${result.updated} updated`;
                showToast(msg, 'success');

                const isAdmin = checkAdminPermission();
                renderStarryCardsList(isAdmin);
            } else {
                const msg = lang === 'zh-CN' 
                    ? `导入失败：${result.error}` 
                    : `Import failed: ${result.error}`;
                showToast(msg, 'error');
            }

            e.target.value = '';
        });
    }
}

/**
 * 渲染星空专栏卡片列表 - 简化版：只显示专栏名称
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

        cardEl.innerHTML = `
            <div class="starry-card-header">
                <div class="starry-card-icon">${getCardTypeIcon(card.type)}</div>
                <h4 class="starry-card-name">${getFieldValue(card.name, lang)}</h4>
                
                <!-- 【新增】系统专栏按钮 - 所有用户可见 -->
                <button class="starry-card-system" data-card-id="${card.id}" 
                        title="${getFieldValue(starryColumnTexts.systemColumn, lang)}">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                    </svg>
                </button>
                
                ${isConfigurable ? `
                    <button class="starry-card-config" data-card-id="${card.id}" 
                            title="${getFieldValue(starryColumnTexts.configureCard, lang)}">
                        ⚙️
                    </button>
                    <button class="starry-card-delete" data-card-id="${card.id}" 
                        title="${getFieldValue(starryColumnTexts.deleteCard, lang)}">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                ` : ''}
            </div>
        `;

        if (!isEmpty || card.type === 'navigator') {
            cardEl.addEventListener('click', (e) => {
                if (e.target.closest('.starry-card-config') || 
                    e.target.closest('.starry-card-system') ||
                    e.target.closest('.starry-card-delete')) return;
                selectStarryCard(card);
            });
            cardEl.style.cursor = 'pointer';
        } else {
            cardEl.style.cursor = 'not-allowed';
            cardEl.style.opacity = '0.5';
        }

        // 【新增】系统专栏按钮事件
        const systemBtn = cardEl.querySelector('.starry-card-system');
        if (systemBtn) {
            systemBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                //loadSystemColumn(card);
                // 获取卡片中文名，拼接成 HTML 链接
                const fileName = getFieldValue(card.name, 'zh-CN');
                const htmlPath = `/StarryColumn/${fileName}.html`;
                window.open(htmlPath, '_blank');
            });
        }

        const configBtn = cardEl.querySelector('.starry-card-config');
        if (configBtn) {
            configBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showConfigModal(card);
            });
        }

        // ═══ 新增：删除按钮事件 ═══
        const deleteBtn = cardEl.querySelector('.starry-card-delete');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteStarryCard(card.id);
            });
        }

        container.appendChild(cardEl);
    });

    // 在容器末尾添加"添加卡片"按钮（admin 专用）
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

    // ═══════════════════════════════════════════════════
    // 【方案1变体】保留多语言对象 + 当前语言解析值
    // ═══════════════════════════════════════════════════
    const virtualLeader = {
        id: card.id,
        
        // 显示用：当前语言解析值（字符串，兼容现有显示逻辑）
        name: getFieldValue(card.name, lang),
        field: getFieldValue(card.field, lang),
        contribution: getFieldValue(card.contribution, lang),
        remarks: getFieldValue(card.remarks, lang),
        
        // 【新增】prompt 用：原始多语言对象
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
                    ${getColumnTitle(lang)}
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
    
    const experts = source._experts || resolveCardExperts(source);
    const fusionStrategy = source._fusionStrategy || source.fusionStrategy;
    
    if (!experts || experts.length === 0) {
        return isZh 
            ? '系统错误：未配置任何专家。' 
            : 'System error: No experts configured.';
    }

    // 构建备选专家列表（简要说明，不强制全部使用）
    const expertBrief = experts.map(e => `${e.name}（${e.field}）`).join('、');
    
    const strategy = fusionStrategy || { mode: 'synthesis' };

    const modeDescriptions = {
        roundtable: {
            'zh-CN': '以专栏作家主持圆桌的形式，让相关专家依次发言，最后由专栏作家整合形成共识。',
            'en': 'In a roundtable format hosted by the columnist, let relevant experts speak in turn, then integrate into consensus.'
        },
        synthesis: {
            'zh-CN': '专栏作家综合相关专家视角，给出融合性的深度回答，以专栏作家为第一作者。',
            'en': 'Columnist synthesizes relevant expert perspectives into a comprehensive deep answer, with columnist as primary author.'
        },
        debate: {
            'zh-CN': '专栏作家呈现相关专家的不同观点，展开思想交锋，最终由专栏作家给出自己的判断。',
            'en': 'Columnist presents differing viewpoints from relevant experts, lets ideas clash, and gives own judgment.'
        }
    };

    const modeDesc = modeDescriptions[strategy.mode]?.[lang] || modeDescriptions.synthesis[lang];

    return isZh
        ? `你是"对话北极星"星空专栏的专栏作家。你的任务是针对用户的核心问题，以专栏作家的身份给出深度回答。

【备选专家库】（根据问题相关性选择性参考，非必须全部使用）
${expertBrief}

【融合模式】
${modeDesc}

【写作要求】
1. 以专栏作家为第一作者，专家为幕后思想资源，不直接标注引用专家姓名和领域
2. 根据问题相关性，从备选专家中筛选合适的视角，不相关的不必强行使用
3. 将专家的思想和方法论自然内化，转化为专栏作家自身的分析框架和叙事风格
4. 在分歧处呈现思想张力，在共识处深化洞见，但始终以专栏作家的口吻表达
5. 追求跨学科的思想化学反应，让融合后的观点浑然一体，看不出拼凑痕迹
6. 输出为完整的专栏文章形式，文章逻辑层面要求：有清晰的论点、论据和结论，而非问答式罗列，提出深刻或细腻的洞见而非泛泛或人云亦云；文章情感层面要求：通过具象化场景+环境+人物互动的立体化描写直击人心，带来影院般的镜头氛围感`
        : `You are the columnist of "Talk with North Stars" Starry Column. Your task is to provide a deep answer as the primary author.

【Expert Pool】（Selectively reference based on relevance, not mandatory to use all）
${expertBrief}

【Fusion Mode】
${modeDesc}

【Writing Requirements】
1. Columnist is the primary author, experts are behind-the-scenes resources, do not cite expert names and fields
2. Select relevant perspectives from the expert pool based on question relevance, do not force unrelated experts
3. Naturally internalize expert ideas and methodologies into the columnist's own analytical framework and narrative style
4. Present intellectual tension where views diverge, deepen insight where they converge, but always in the columnist's voice
5. Pursue interdisciplinary chemical reactions, make fused views seamless without patchwork traces
6. Deliver the output in the form of a complete, cohesive column article. Regarding structural logic: The piece must be anchored by a distinct central argument, substantial evidence, and a solid conclusion, eschewing any disjointed or bulleted Q&A formats. It requires penetrating and delicate insights that transcend platitudes and the echoing of others. Regarding emotional resonance: The narrative must pierce the reader's heart through multi-dimensional descriptions that weave together tangible scenes, vivid settings, and authentic character interactions, thereby evoking a rich, theater-like cinematic atmosphere.`;
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

                <!-- 专栏定位 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '定位' : 'Position'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <textarea class="config-textarea" id="configContributionPrimary" rows="3"
                        placeholder="${lang === 'zh-CN' ? '描述这张卡片的定位...' : 'Describe the function...'}">${currentContribution}</textarea>
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文定位' : '中文定位'}
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

                <!-- 评注 -->
                <div class="config-section">
                    <label class="config-label">
                        ${lang === 'zh-CN' ? '评注' : 'Remarks'}
                        <span class="lang-tag">${lang === 'zh-CN' ? '中文' : 'English'}</span>
                    </label>
                    <input type="text" class="config-input" id="configRemarksPrimary" 
                           value="${currentRemarks}" placeholder="${lang === 'zh-CN' ? '一句标志性的评注...' : 'A signature motto...'}">
                    
                    <label class="config-label secondary">
                        ${lang === 'zh-CN' ? '英文评注' : '中文评注'}
                        <span class="lang-tag secondary">${lang === 'zh-CN' ? 'English' : '中文'}</span>
                    </label>
                    <input type="text" class="config-input" id="configRemarksSecondary" 
                           value="${currentRemarksOther}" placeholder="${lang === 'zh-CN' ? 'English motto...' : '中文评注...'}">
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
                               placeholder="${lang === 'zh-CN' ? '输入北极星姓名或领域...' : 'Type NorthStar name or field...'}"
                               autocomplete="off">
                        <div class="expert-search-icon">🔍</div>
                    </div>
                    
                    <div class="expert-dropdown" id="expertDropdown"></div>
                    
                    <div class="selected-experts-area">
                        <label class="config-label sub">
                            ${lang === 'zh-CN' ? '已选北极星' : 'Selected NorthStars'}
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
                ${lang === 'zh-CN' ? '未找到匹配北极星' : 'No matching NortStar found'}
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

    // ═══ 修改：基于英文名称生成 ID（去掉 custom_ 前缀）═══
    const englishName = lang === 'en' ? namePrimary : (nameSecondary || namePrimary);
    const newId = englishName
        .toLowerCase()                    // 转小写
        .replace(/[^\w\s]/g, '')          // 移除特殊字符（保留字母数字空格）
        .trim()
        .replace(/\s+/g, '_');            // 空格替换为下划线

    // 校验 ID 唯一性
    if (starryColumnCards.some(c => c.id === newId)) {
        alert(lang === 'zh-CN' ? '卡片标识已存在，请修改英文名称' : 'Card ID already exists, please change the English name');
        return;
    }

    // 校验 ID 不为空（纯中文且无英文时可能为空）
    if (!newId || newId === '_') {
        alert(lang === 'zh-CN' ? '请填写有效的英文名称作为卡片标识' : 'Please enter a valid English name as card ID');
        return;
    }

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
                ${lang === 'en' ? 'No NorthStar selected' : '尚未选择北极星'}
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

/**
 * 删除卡片（仅自定义卡片）
 */
function deleteStarryCard(cardId) {
    const lang = window.currentLang || 'zh-CN';
    
    if (!confirm(getFieldValue(starryColumnTexts.deleteCardConfirm, lang))) return;

    const cardIndex = starryColumnCards.findIndex(c => c.id === cardId);
    if (cardIndex === -1) {
        showToast(getFieldValue(starryColumnTexts.deleteCardNotFound, lang), 'error');
        return;
    }

    const card = starryColumnCards[cardIndex];

    if (card.builtIn) {
        showToast(getFieldValue(starryColumnTexts.deleteCardBuiltIn, lang), 'error');
        return;
    }

    starryColumnCards.splice(cardIndex, 1);

    if (window.currentSelectedCard?.id === cardId) {
        window.currentSelectedCard = null;
        window.currentSelectedLeader = null;
    }

    persistStarryColumnCards();

    const isAdmin = checkAdminPermission();
    renderStarryCardsList(isAdmin);

    showToast(getFieldValue(starryColumnTexts.deleteCardSuccess, lang), 'success');
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
    if (listTitle) listTitle.textContent = getColumnTitle(lang);
    
    // 3. 更新按钮 title
    const backBtn = document.getElementById('btn-starry-back');
    if (backBtn) backBtn.title = getFieldValue(starryColumnTexts.backTooltip, lang);
    
    const backToListBtn = document.getElementById('btn-back-to-list');
    if (backToListBtn) {
        backToListBtn.title = lang === 'zh-CN' ? '返回专栏列表' : 'Back to Column List';
    }
    
    // ═══════════════════════════════════════════════════
    // 【新增】更新导出/导入按钮 tooltip（关键修复）
    // ═══════════════════════════════════════════════════
    const exportBtn = document.getElementById('btn-starry-export');
    if (exportBtn) {
        exportBtn.title = getFieldValue(starryColumnTexts.exportConfig, lang);
    }
    
    const importLabel = document.querySelector('label[for="btn-starry-import-input"]');
    if (importLabel) {
        importLabel.title = getFieldValue(starryColumnTexts.importConfig, lang);
    }
    
    // 4. 根据模式更新内容
    if (window.starryColumnViewMode === 'card' && window.currentSelectedLeader) {
        const leader = window.currentSelectedLeader;
        
        if (leader._rawName) {
            leader.name = getFieldValue(leader._rawName, lang);
            leader.field = getFieldValue(leader._rawField, lang);
            leader.contribution = getFieldValue(leader._rawContribution, lang);
            leader.remarks = getFieldValue(leader._rawRemarks, lang);
        }
        
        updateSingleCard(leader);
        
        const selectedLeaderName = document.getElementById('selectedLeaderName');
        if (selectedLeaderName) {
            selectedLeaderName.textContent = leader.name;
        }
        
    } else {
        // 列表模式：重新渲染卡片列表
        const isAdmin = checkAdminPermission();
        renderStarryCardsList(isAdmin);
        
        // ═══════════════════════════════════════════════════
        // 【修复】只在首次渲染时绑定事件，避免重复
        // 事件监听器内部实时读取 window.currentLang
        // ═══════════════════════════════════════════════════
        // 不需要在这里重新绑定，事件已用实时语言
    }
}


// ═══════════════════════════════════════════════════════════════
// 星空专栏 - 前端持久化模块
// 双保险: Cloudflare KV (主) + localStorage (备)
// ═══════════════════════════════════════════════════════════════

const PERSISTENCE = {
    API_BASE: '/api/starry-column',     // 同域 API
    STORAGE_KEY: 'starryColumnCards',    // localStorage key
    SCHEMA_VERSION: 2,
    SAVE_DEBOUNCE_MS: 800,               // 防抖间隔
    MAX_RETRIES: 3,                      // 网络失败重试
    RETRY_DELAY_MS: 1000
};

// 内存状态
let _pendingSaveTimer = null;
let _lastPersistedHash = null;
let _isLoading = false;

// ═══════════════════════════════════════════════════════════════
// 初始化
// ═══════════════════════════════════════════════════════════════

/**
 * 初始化星空专栏持久化
 * 1. 先加载内置卡片
 * 2. 尝试从 KV 加载自定义卡片
 * 3. KV 失败则回退 localStorage
 */
async function initStarryColumn() {
    if (_isLoading) return;
    _isLoading = true;

    console.log('[StarryColumn] Initializing... (localStorage only)');

    // ═══════════════════════════════════════════════════
    // 【已注释】Cloudflare KV 加载过慢，暂时禁用
    // ═══════════════════════════════════════════════════
    // try {
    //     const response = await fetchWithRetry(PERSISTENCE.API_BASE, {
    //         method: 'GET'
    //     });
    //     if (response.ok) {
    //         const serverData = await response.json();
    //         await _mergeServerData(serverData);
    //         console.log('[StarryColumn] Loaded from KV:', serverData.cards?.length || 0, 'cards');
    //     } else {
    //         throw new Error(`HTTP ${response.status}`);
    //     }
    // } catch (e) {
    //     console.warn('[StarryColumn] KV load failed, fallback to localStorage:', e.message);
    //     _loadFromLocalStorage();
    // }

    // 直接从 localStorage 加载
    _loadFromLocalStorage();

    _updateHashCache();
    _isLoading = false;

    console.log('[StarryColumn] Initialized. Total cards:', starryColumnCards.length);
}

// ═══════════════════════════════════════════════════════════════
// 持久化入口
// ═══════════════════════════════════════════════════════════════

/**
 * 触发持久化（防抖）
 * 自动检测数据变更，无变化则跳过
 */
function persistStarryColumnCards() {
    // 只持久化自定义卡片（可配置的内置卡片也算）
    const customCards = starryColumnCards.filter(c => c.configurable);
    const payload = {
        _schema: PERSISTENCE.SCHEMA_VERSION,
        cards: customCards
    };

    const json = JSON.stringify(payload);
    const currentHash = _simpleHash(json);

    // 数据未变更，跳过
    if (currentHash === _lastPersistedHash) {
        console.log('[StarryColumn] No changes, skip persist');
        return { skipped: true };
    }

    // 清除之前的待写入
    clearTimeout(_pendingSaveTimer);

    // 防抖写入
    _pendingSaveTimer = setTimeout(() => {
        _executePersist(json, currentHash, payload);
    }, PERSISTENCE.SAVE_DEBOUNCE_MS);

    return { queued: true };
}

/**
 * 立即执行持久化（内部）
 */
async function _executePersist(json, hash, payload) {
    console.log('[StarryColumn] Persisting', payload.cards.length, 'cards...');

    // 1. 始终写 localStorage（保底，同步）
    try {
        localStorage.setItem(PERSISTENCE.STORAGE_KEY, json);
    } catch (e) {
        console.error('[StarryColumn] localStorage write failed:', e);
    }

    // 2. 异步写后端 KV
    try {
        const response = await fetchWithRetry(PERSISTENCE.API_BASE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json
        });

        if (response.ok) {
            const result = await response.json();
            _lastPersistedHash = hash;
            console.log('[StarryColumn] KV saved:', result);
            return { success: true, target: 'kv', result };
        }

        throw new Error(`HTTP ${response.status}`);

    } catch (e) {
        console.warn('[StarryColumn] KV save failed, localStorage only:', e.message);
        return {
            success: true,
            target: 'localStorage',
            warning: 'KV unavailable, data saved to localStorage only'
        };
    }
}

/**
 * 强制立即保存（用于页面卸载前）
 */
async function _mergeServerData(serverData) {
    if (!serverData || !Array.isArray(serverData.cards)) {
        console.log('[Merge] No cards in serverData');
        return;
    }

    console.log('[Merge] Starting merge, server cards:', serverData.cards.length);

    for (const savedCard of serverData.cards) {
        /*
        console.log('[Merge] Processing card:', savedCard.id);
        console.log('[Merge] Raw experts:', savedCard.experts, 
                    'type:', typeof savedCard.experts,
                    'isArray:', Array.isArray(savedCard.experts),
                    'length:', savedCard.experts?.length);
        */
        if (!_isValidCard(savedCard)) {
            console.warn('[Merge] Invalid card skipped:', savedCard.id);
            continue;
        }

        const existing = starryColumnCards.find(c => c.id === savedCard.id);
        /*
        console.log('[Merge] Found existing:', !!existing, 
                    'configurable:', existing?.configurable,
                    'builtIn:', existing?.builtIn);*/

        if (existing && existing.configurable) {
            /*console.log('[Merge] Updating existing card');*/
            
            // 先记录旧值
            const oldExperts = existing.experts;
            
            Object.assign(existing, {
                name: savedCard.name || existing.name,
                contribution: savedCard.contribution || existing.contribution,
                field: savedCard.field || existing.field,
                remarks: savedCard.remarks || existing.remarks,
                experts: savedCard.experts || [],
                fusionStrategy: savedCard.fusionStrategy || { mode: 'synthesis' }
            });
            
            /*console.log('[Merge] After update, experts:', existing.experts,
                        'was:', oldExperts);*/

        } else if (!existing) {
            console.log('[Merge] Adding new card');
            starryColumnCards.push(savedCard);
            
        } else {
            console.log('[Merge] Skipped builtIn card:', existing.id);
        }
    }

    console.log('[Merge] Complete. Total cards:', starryColumnCards.length);

    // 缓存到 localStorage
    try {
        localStorage.setItem(PERSISTENCE.STORAGE_KEY, JSON.stringify(serverData));
    } catch (e) {
        console.error('[Merge] Cache failed:', e);
    }
}

/**
 * 强制立即保存（用于页面卸载前）
 */
function _flushPendingSave() {
    clearTimeout(_pendingSaveTimer);

    const customCards = starryColumnCards.filter(c => c.configurable);
    const payload = {
        _schema: PERSISTENCE.SCHEMA_VERSION,
        _savedAt: Date.now(),
        cards: customCards
    };
    const json = JSON.stringify(payload);

    // 同步写 localStorage
    try {
        localStorage.setItem(PERSISTENCE.STORAGE_KEY, json);
    } catch (e) {
        console.error('[StarryColumn] Flush to localStorage failed:', e);
    }

    // 尝试同步发送 beacon
    if (navigator.sendBeacon) {
        navigator.sendBeacon(
            PERSISTENCE.API_BASE,
            new Blob([json], { type: 'application/json' })
        );
    }
}


// ═══════════════════════════════════════════════════════════════
// 数据加载与合并
// ═══════════════════════════════════════════════════════════════

/**
 * 从 localStorage 加载（回退方案）
 */
function _loadFromLocalStorage() {
    const raw = localStorage.getItem(PERSISTENCE.STORAGE_KEY);
    if (!raw) {
        console.log('[StarryColumn] No localStorage data');
        return;
    }

    try {
        const data = JSON.parse(raw);
        const cards = data.cards || [];

        for (const savedCard of cards) {
            if (!_isValidCard(savedCard)) continue;

            const existing = starryColumnCards.find(c => c.id === savedCard.id);
            if (existing && existing.configurable) {
                Object.assign(existing, {
                    name: savedCard.name || existing.name,
                    contribution: savedCard.contribution || existing.contribution,
                    field: savedCard.field || existing.field,
                    remarks: savedCard.remarks || existing.remarks,
                    experts: savedCard.experts || [],
                    fusionStrategy: savedCard.fusionStrategy || { mode: 'synthesis' }
                });
            } else if (!existing) {
                starryColumnCards.push(savedCard);
            }
        }

        console.log('[StarryColumn] Loaded from localStorage:', cards.length, 'cards');

    } catch (e) {
        console.error('[StarryColumn] localStorage parse failed:', e);
    }
}

// ═══════════════════════════════════════════════════════════════
// 工具函数
// ═══════════════════════════════════════════════════════════════

/**
 * 带重试的 fetch
 */
async function fetchWithRetry(url, options, retries = PERSISTENCE.MAX_RETRIES) {
    try {
        const response = await fetch(url, options);
        if (!response.ok && retries > 0) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response;
    } catch (e) {
        if (retries > 0) {
            console.log(`[StarryColumn] Retry ${PERSISTENCE.MAX_RETRIES - retries + 1}/${PERSISTENCE.MAX_RETRIES}`);
            await _sleep(PERSISTENCE.RETRY_DELAY_MS);
            return fetchWithRetry(url, options, retries - 1);
        }
        throw e;
    }
}

/**
 * 卡片基础校验
 */
function _isValidCard(card) {
    if (!card || typeof card !== 'object') return false;
    if (!card.id || typeof card.id !== 'string') return false;
    if (!card.name || typeof card.name !== 'object') return false;
    if (!card.type || typeof card.type !== 'string') return false;
    return true;
}

/**
 * 简单哈希
 */
function _simpleHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h |= 0;
    }
    return h.toString(16);
}

/**
 * 更新哈希缓存
 */
function _updateHashCache() {
    const customCards = starryColumnCards.filter(c => c.configurable);
    const payload = { _schema: PERSISTENCE.SCHEMA_VERSION, cards: customCards };
    _lastPersistedHash = _simpleHash(JSON.stringify(payload));
}

/**
 * 延迟
 */
function _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ═══════════════════════════════════════════════════════════════
// 页面生命周期
// ═══════════════════════════════════════════════════════════════

// 页面卸载前强制保存
// window.addEventListener('beforeunload', _flushPendingSave);

// 页面可见性变化（切回页面时同步）
/*
document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible') {
        await initStarryColumn();
        // 如果正在显示列表，刷新卡片
        if (window.currentSelectedCategory === 'starryColumn' && 
            window.starryColumnViewMode === 'list') {
            renderStarryCardsList(checkAdminPermission());
        }
    }
});*/

async function loadSystemColumn(card) {
    const lang = window.currentLang || 'zh-CN';

    if (!card) {
        console.error('[StarryColumn] No card provided');
        return;
    }

    // ═══ 防御：确保全局变量是数组 ═══
    if (!Array.isArray(importedHistory)) importedHistory = [];
    if (!Array.isArray(conversationHistory)) conversationHistory = [];

    const fileName = getFieldValue(card.name, 'zh-CN') + '.md';
    const filePath = `/StarryColumn/${fileName}`;
    
    // ═══ 画布非空检查 ═══
    let canvasHistory;
    try {
        canvasHistory = getMergedHistory(importedHistory, conversationHistory);
    } catch (e) {
        console.error('[StarryColumn] getMergedHistory failed:', e);
        canvasHistory = [];
    }
    // 最终防御
    if (!Array.isArray(canvasHistory)) canvasHistory = [];    

    if (canvasHistory.length > 0) {
        const isOnlySystemColumn = (
            importedHistory.length > 0 &&
            importedHistory._source === 'systemColumn' &&
            conversationHistory.length === 0
        );

        if (isOnlySystemColumn) {
            importedHistory = [];
            conversationHistory = [];
            if (typeof saveCanvasSession === 'function') saveCanvasSession();
        } else {
            const title = getFieldValue(starryColumnTexts.canvasNotEmptyTitle, lang);
            const message = getFieldValue(starryColumnTexts.canvasNotEmptyMessage, lang);
            alert(`${title}\n\n${message}`);
            return;
        }
    }

    // ═══ 关键：先关闭画布，确保错误时不显示乱七八糟内容 ═══
    const canvasModal = document.getElementById('dialogueCanvasModal');
    if (canvasModal) {
        canvasModal.style.display = 'none';
        canvasModal.style.opacity = '0';
    }

    try {
        const response = await fetch(filePath);
        
        // ═══ 关键：检查 HTTP 状态 ═══
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('FILE_NOT_FOUND');
            }
            throw new Error(`HTTP ${response.status}`);
        }

        const mdContent = await response.text();

        // 空内容检查
        if (!mdContent || mdContent.trim().length === 0) {
            throw new Error('EMPTY_FILE');
        }

        // 解析检查
        const parsed = parseMDToHistory(mdContent);
        if (parsed.length === 0) {
            throw new Error('PARSE_EMPTY');
        }

        // ═══ 成功后才写入并打开画布 ═══
        importedHistory = parsed;
        importedHistory._source = 'systemColumn';
        importedHistory._sourceCardId = card.id;
        importedHistory._loadedAt = Date.now();

        if (typeof saveCanvasSession === 'function') {
            saveCanvasSession();
        }

        // 打开画布
        openDialogueCanvas();
        renderDialogueCanvas();

        showToast(
            getFieldValue(starryColumnTexts.systemColumnLoaded, lang),
            'success'
        );

    } catch (e) {
        console.error('[StarryColumn] Failed to load system column:', e);

        // ═══ 确保画布已关闭 ═══
        if (canvasModal) {
            canvasModal.style.display = 'none';
            canvasModal.style.opacity = '0';
        }

        // 清理可能残留的 importedHistory
        importedHistory = [];

        let errorMsg;
        if (e.message === 'FILE_NOT_FOUND') {
            errorMsg = lang === 'zh-CN' 
                ? `系统专栏文件不存在：${fileName}` 
                : `System column file not found: ${fileName}`;
        } else if (e.message === 'EMPTY_FILE') {
            errorMsg = lang === 'zh-CN' 
                ? '系统专栏文件内容为空' 
                : 'System column file is empty';
        } else if (e.message === 'PARSE_EMPTY') {
            errorMsg = lang === 'zh-CN' 
                ? '无法解析专栏内容' 
                : 'Unable to parse column content';
        } else {
            errorMsg = getFieldValue(starryColumnTexts.systemColumnLoadFailed, lang) + e.message;
        }

        showToast(errorMsg, 'error');
    }
}

// ═══════════════════════════════════════════════════════════════
// 数据导出 / 导入 JSON 文件
// ═══════════════════════════════════════════════════════════════

/**
 * 导出星空专栏配置为 JSON 文件下载
 */
function exportStarryColumnData() {
    const customCards = starryColumnCards.filter(c => c.configurable);
    
    const exportData = {
        _schema: PERSISTENCE.SCHEMA_VERSION,
        _exportedAt: Date.now(),
        _version: '1.0.0',
        cards: customCards
    };
    
    const blob = new Blob(
        [JSON.stringify(exportData, null, 2)], 
        { type: 'application/json' }
    );
    
    const url = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `starry-column-backup-${timestamp}.json`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 100);
    
    console.log('[StarryColumn] Exported', customCards.length, 'cards');
    return { success: true, count: customCards.length };
}

/**
 * 从 JSON 文件导入配置
 */
async function importStarryColumnData(file) {
    if (!file || file.type !== 'application/json') {
        return { success: false, error: 'Please select a JSON file' };
    }
    
    return new Promise((resolve) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // 校验结构
                if (!data.cards || !Array.isArray(data.cards)) {
                    resolve({ success: false, error: 'Invalid file format: missing cards array' });
                    return;
                }
                
                // 版本检查
                const fileSchema = data._schema || 1;
                if (fileSchema > PERSISTENCE.SCHEMA_VERSION) {
                    resolve({ success: false, error: `File schema v${fileSchema} is newer than supported v${PERSISTENCE.SCHEMA_VERSION}` });
                    return;
                }
                
                // 校验每张卡片
                const validCards = [];
                const errors = [];
                
                for (const card of data.cards) {
                    if (_isValidCard(card)) {
                        validCards.push(card);
                    } else {
                        errors.push(`Invalid card: ${card.id || 'unknown'}`);
                    }
                }
                
                if (validCards.length === 0) {
                    resolve({ success: false, error: 'No valid cards found in file' });
                    return;
                }
                
                // 合并到内存（只替换/新增自定义卡片，不碰内置）
                let added = 0, updated = 0;
                
                for (const card of validCards) {
                    const existing = starryColumnCards.find(c => c.id === card.id);
                    
                    if (existing && existing.configurable) {
                        Object.assign(existing, card);
                        updated++;
                    } else if (!existing) {
                        starryColumnCards.push(card);
                        added++;
                    }
                    // builtIn 卡片跳过
                }
                
                // 立即持久化到 KV + localStorage
                persistStarryColumnCards();
                
                resolve({
                    success: true,
                    imported: validCards.length,
                    added: added,
                    updated: updated,
                    errors: errors.length > 0 ? errors : undefined
                });
                
            } catch (parseError) {
                resolve({ success: false, error: 'Failed to parse JSON: ' + parseError.message });
            }
        };
        
        reader.onerror = () => {
            resolve({ success: false, error: 'Failed to read file' });
        };
        
        reader.readAsText(file);
    });
}

/**
 * 创建导出/导入 UI（管理员专用）
 */
function renderImportExportButtons(container) {
    if (!container) return;
    
    const lang = window.currentLang || 'zh-CN';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'import-export-bar';
    wrapper.innerHTML = `
        <button class="btn-export" id="btn-export-data">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            ${lang === 'zh-CN' ? '导出配置' : 'Export Config'}
        </button>
        <label class="btn-import" for="import-file-input">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            ${lang === 'zh-CN' ? '导入配置' : 'Import Config'}
        </label>
        <input type="file" id="import-file-input" accept=".json,application/json" style="display:none">
    `;
    
    container.appendChild(wrapper);
    
    // 绑定事件
    document.getElementById('btn-export-data')?.addEventListener('click', () => {
        const result = exportStarryColumnData();
        if (result.success) {
            alert(lang === 'zh-CN' 
                ? `已导出 ${result.count} 张卡片配置` 
                : `Exported ${result.count} cards`);
        }
    });
    
    document.getElementById('import-file-input')?.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const confirmed = confirm(lang === 'zh-CN' 
            ? '导入将覆盖现有自定义卡片配置，确定继续？' 
            : 'Import will overwrite existing custom cards. Continue?');
        
        if (!confirmed) {
            e.target.value = ''; // 重置
            return;
        }
        
        const result = await importStarryColumnData(file);
        
        if (result.success) {
            alert(lang === 'zh-CN' 
                ? `导入成功：新增 ${result.added} 张，更新 ${result.updated} 张` 
                : `Import success: ${result.added} added, ${result.updated} updated`);
            // 刷新列表
            const isAdmin = checkAdminPermission();
            renderStarryCardsList(isAdmin);
        } else {
            alert(lang === 'zh-CN' 
                ? `导入失败：${result.error}` 
                : `Import failed: ${result.error}`);
        }
        
        e.target.value = ''; // 重置，允许重复导入同一文件
    });
}
