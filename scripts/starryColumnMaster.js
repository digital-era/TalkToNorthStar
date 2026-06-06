// starryColumnMaster.js

const starryColumnCards = [
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
    },
    
    // ═══════════════════════════════════════════════
    // 【用户配置】群星闪耀（初始为空，待管理员配置）
    // ═══════════════════════════════════════════════
    {
        id: "galaxy_shine",
        name: {
            "zh-CN": "群星闪耀",
            "en": "Galaxy Shine"
        },
        contribution: {
            "zh-CN": "汇聚各领域顶尖智慧，融合多位北极星人物的洞察，为用户提供深度跨学科视角。",
            "en": "Gathering top wisdom across domains, fusing insights from multiple North Star figures to provide deep interdisciplinary perspectives."
        },
        field: {
            "zh-CN": "待配置",
            "en": "To Be Configured"
        },
        remarks: {
            "zh-CN": "让不同流派的思想碰撞出新的火花。",
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
    // 【用户配置】文明之旅（初始为空，待管理员配置）
    // ═══════════════════════════════════════════════
    {
        id: "civilization_journey",
        name: {
            "zh-CN": "文明之旅",
            "en": "Civilization Journey"
        },
        contribution: {
            "zh-CN": "跨越时空的思想对话，探索人类文明演进的关键节点。",
            "en": "Cross-temporal intellectual dialogue, exploring key nodes of human civilization evolution."
        },
        field: {
            "zh-CN": "待配置",
            "en": "To Be Configured"
        },
        remarks: {
            "zh-CN": "以古鉴今，以今知来。",
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
            "zh-CN": "汇聚投资领域顶尖智慧，洞察市场趋势与价值逻辑。",
            "en": "Gathering top investment wisdom, insight into market trends and value logic."
        },
        field: {
            "zh-CN": "待配置",
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
    }
];
