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
