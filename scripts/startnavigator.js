// ═══════════════════════════════════════════════
// 【星际领航】辅助函数
// 依赖：复用 newUI.js 已定义的 getFieldValue / getCategoryName
// ═══════════════════════════════════════════════

/**
 * 构建精简人物快照（仅当前语言，不含领航员自身）
 */
function buildInterstellarSnapshot(lang = 'zh-CN') {
    const snapshot = {};
    for (const [category, leaders] of Object.entries(allData)) {
        snapshot[category] = leaders
            .filter(l => l.id !== 'interstellar_navigator')
            .map(l => ({
                name: getFieldValue(l.name, lang),
                field: getFieldValue(l.field, lang)
            }));
    }
    return snapshot;
}

/**
 * 构建领航员系统指令（注入到 API 请求的 system 角色中）
 */
function buildNavigatorSystemPrompt(lang) {
    const snapshot = buildInterstellarSnapshot(lang);
    
    // 紧凑序列化人物库（仅 name + field，最小化 Token）
    const catalogText = Object.entries(snapshot)
        .map(([cat, leaders]) => {
            const catName = getCategoryName(cat);  // ← 复用 newUI.js
            const leaderLines = leaders.map(l => `  · ${l.name} [${l.field}]`).join('\n');
            return `[${catName}]\n${leaderLines}`;
        })
        .join('\n\n');

    const isZh = lang === 'zh-CN';

    return isZh
        ? `你是"对话北极星"的首席领航员。你的任务是针对用户的核心问题，从以下8大领域的北极星人物中，自动锚定三位性格迥异、领域互补的"北极星"人物。

【可用人物库】
${catalogText}

【任务要求】
1. 分析用户问题，从8个领域中挑选最能产生跨学科洞见的3位人物
2. 解释选择理由（他们思想体系中的哪一点能击中问题本质）
3. 输出必须包含人物的领域(field)和姓名(name)
4. 深入人物灵魂底色，严禁百科全书式罗列
5. 必须从上述人物库中选择，不得虚构人物`

        : `You are the Chief Navigator of "Talk with North Stars". Your task is to anchor three distinct, complementary "North Star" figures from the 8 domains below, based on the user's core question.

[Available Figures]
${catalogText}

[Requirements]
1. Analyze the question and select 3 figures that produce maximum interdisciplinary insight
2. Explain reasoning (which aspect of their framework hits the problem's essence)
3. Output must include field and name for each figure
4. Delve into the soul of figures; no encyclopedic listings
5. Must select from the catalog above; no invented figures`;
}


/**
 * 激活星际领航员模式
 * 自动选中星际领航员卡片，兼容传统模式和现代模式
 */
function activateInterstellarNavigator() {
    // 查找星际领航员数据（遍历所有领域）
    let navigatorLeader = null;
    let navigatorCategory = '';
    
    for (const [category, leaders] of Object.entries(allData)) {
        const found = leaders.find(l => l.id === 'interstellar_navigator');
        if (found) {
            navigatorLeader = found;
            navigatorCategory = category;
            break;
        }
    }
    
    if (!navigatorLeader) {
        console.error('星际领航员未找到');
        alert(translations[currentLang]?.alertNavigatorNotFound || '星际领航员配置缺失');
        return;
    }
    
    // 图标视觉反馈
    const icon = document.querySelector('.navigator-icon');
    if (icon) {
        icon.classList.add('active');
        icon.classList.remove('pulsing');
    }
    
    // ═══════════════════════════════════════════════
    // 【现代模式】
    // ═══════════════════════════════════════════════
    const layoutContainer = document.getElementById('category-layout-container');
    const isModernActive = layoutContainer && layoutContainer.style.display !== 'none';
    
    if (isModernActive) {
        if (currentSelectedCategory !== navigatorCategory) {
            selectCategory(navigatorCategory);
        }
        selectLeader(navigatorLeader, navigatorCategory, null);
        updateSingleCard(navigatorLeader);
        
        setTimeout(() => {
            document.querySelector('.interaction-area')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        return;
    }
    
    // ═══════════════════════════════════════════════
    // 【传统模式】强制立即渲染 + 取消动画延迟
    // ═══════════════════════════════════════════════
    const targetTab = document.getElementById(navigatorCategory);
    const isTabActive = targetTab && targetTab.classList.contains('active');
    
    if (!isTabActive) {
        // 1. 执行 Tab 切换
        openTab(null, navigatorCategory);
    }
    
    // 2. 【关键】强制卡片立即可见，取消任何入场动画
    const grid = document.getElementById(`${navigatorCategory}Grid`);
    if (grid) {
        grid.querySelectorAll('.leader-card').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
            card.style.animation = 'none';
            card.style.filter = 'none';
        });
    }
    
    // 3. 选中领航员并高亮
    selectLeader(navigatorLeader, navigatorCategory, null);
    highlightNavigatorCard(navigatorCategory);
    
    // 4. 滚动到交互区
    scrollToInteraction();
}

/**
 * 高亮星际领航员卡片
 */
function highlightNavigatorCard(category) {
    const grid = document.getElementById(`${category}Grid`);
    if (!grid) return;
    
    // 清除旧选中
    grid.querySelectorAll('.leader-card.selected').forEach(c => c.classList.remove('selected'));
    
    // 查找并高亮领航员卡片
    const navigatorCard = Array.from(grid.querySelectorAll('.leader-card'))
        .find(card => card.dataset.id === 'interstellar_navigator');
    
    if (navigatorCard) {
        navigatorCard.classList.add('selected');
        navigatorCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

/**
 * 滚动到交互区
 */
function scrollToInteraction() {
    setTimeout(() => {
        document.querySelector('.interaction-area')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 150);
}
