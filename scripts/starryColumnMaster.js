// starryColumnMaster.js

const starryColumnCards = [    
    // ═══════════════════════════════════════════════
    // 【用户配置】群星闪耀（初始为空，待管理员配置）
    // ═══════════════════════════════════════════════
    {
        id: "galaxy_shine",
        name: {
            "zh-CN": "星光闪耀",
            "en": "Shining Stars"
        },
        contribution: {
            "zh-CN": "北极星在决定历史走向、技术质变、或是思想涌现的非凡成就。",
            "en": "Gathering top wisdom across domains, fusing insights from multiple North Star figures to provide deep interdisciplinary perspectives."
        },
        field: {
            "zh-CN": "星光闪耀",
            "en": "Shining Stars"
        },
        remarks: {
            "zh-CN": "展现杰出人物的灵魂抉择与思维模型，为用户提供高维的精神共鸣。",
            "en": "Let different schools of thought spark new ideas."
        },
        
        configurable: true,
        builtIn: false,
        type: "fusion",
        
        experts: [],                    // ← 空数组：必须管理员配置后才可用
        systemPromptBuilder: "buildFusionSystemPrompt",
        userInputMode: "rawQuestion",
        
        fusionStrategy: {
            mode: "roundtable",
            description: {
                "zh-CN": "（待配置：选择融合模式与参与专家）",
                "en": "(To be configured: select fusion mode and participating experts)"
            }
        }
    },
    
    // ═══════════════════════════════════════════════
    // 【用户配置】文明穿越（初始为空，待管理员配置）
    // ═══════════════════════════════════════════════
    {
        id: "civilization_journey",
        name: {
            "zh-CN": "文明穿越",
            "en": "Civilization Transmigration"
        },
        contribution: {
            "zh-CN": "全球文明发展史，打破时空的线性隔阂",
            "en": "Cross-temporal intellectual dialogue, exploring key nodes of human civilization evolution."
        },
        field: {
            "zh-CN": "文明穿越",
            "en": "To Be Configured"
        },
        remarks: {
            "zh-CN": "将璀璨的中西古典文明与现代文明放在同一个“坐标系”中进行交叉互补，让用户触及真正塑造人类文明的深刻思想。",
            "en": "Learn from the past to understand the present; know the present to foresee the future."
        },
        
        configurable: true,
        builtIn: false,
        type: "fusion",
        
        experts: [],                    // ← 空数组
        systemPromptBuilder: "buildFusionSystemPrompt",
        userInputMode: "rawQuestion",
        
        fusionStrategy: {
            mode: "synthesis",
            description: {
                "zh-CN": "（待配置：选择融合模式与参与专家）",
                "en": "(To be configured: select fusion mode and participating experts)"
            }
        }
    },
    
    // ═══════════════════════════════════════════════
    // 【用户配置】投资论道（初始为空，待管理员配置）
    // ═══════════════════════════════════════════════
    {
        id: "investment_dialogue",
        name: {
            "zh-CN": "投资论道",
            "en": "Investment Dialogue"
        },
        contribution: {
            "zh-CN": "金融投资与商业决策（高维决策模型、商业周期、跨越周期的商业智慧）。",
            "en": "Gathering top investment wisdom, insight into market trends and value logic."
        },
        field: {
            "zh-CN": "投资论道",
            "en": "To Be Configured"
        },
        remarks: {
            "zh-CN": "价值投资，时间的朋友。",
            "en": "Value investing, friend of time."
        },
        
        configurable: true,
        builtIn: false,
        type: "fusion",
        
        experts: [],                    // ← 空数组
        systemPromptBuilder: "buildFusionSystemPrompt",
        userInputMode: "rawQuestion",
        
        fusionStrategy: {
            mode: "debate",
            description: {
                "zh-CN": "（待配置：选择融合模式与参与专家）",
                "en": "(To be configured: select fusion mode and participating experts)"
            }
        }
    },

    // ═══════════════════════════════════════════════
    // 【系统内置】星际领航员（不可配置，但专家动态提取）
    // ═══════════════════════════════════════════════
    {
        id: "interstellar_navigator",
        name: {
            "zh-CN": "星际领航员",
            "en": "Interstellar Navigator"
        },
        contribution: {
            "zh-CN": "作为'对话北极星'领航员，针对用户问题，提供三位领域互补的'北极星'人物建议。",
            "en": "As navigator for Talk with North Stars, provide recommendations for three complementary North Star figures based on user questions."
        },
        field: {
            "zh-CN": "星际领航",
            "en": "Stellar Navigation Guide"
        },
        remarks: {
            "zh-CN": "追求北极星人物之间的跨学科洞见和化学反应。",
            "en": "Pursuing interdisciplinary insights and chemical reactions among the North Star figures."
        },
        
        configurable: false,
        builtIn: true,
        type: "navigator",
        
        experts: [],                    // ← 空数组：运行时从 allData 全库动态提取
        systemPromptBuilder: "buildNavigatorSystemPrompt",
        userInputMode: "rawQuestion"
    }
];
