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
            "en": "The North Star extraordinary achievement that shapes the course of history, drives a qualitative shift in technology, or sparks the emergence of new ideas.."
        },
        field: {
            "zh-CN": "名人传记",
            "en": "Biographies of distinguished figures"
        },
        remarks: {
            "zh-CN": "展现杰出人物的思维模型与灵魂抉择，提供高维精神共鸣。",
            "en": "Showcasing the mental models and pivotal soul-defining choices of extraordinary figures, while offering a profound spiritual resonance."
        },
        
        configurable: true,
        builtIn: false,
        type: "fusion",
        
        experts: [],                    // ← 空数组：必须管理员配置后才可用
        systemPromptBuilder: "buildFusionSystemPrompt",
        userInputMode: "rawQuestion",
        
        fusionStrategy: {
            mode: "synthesis", //roundtable
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
            "zh-CN": "穿越文明",
            "en": "Traversing Civilizations"
        },
        contribution: {
            "zh-CN": "全球文明发展史，打破时空的线性隔阂",
            "en": "Cross-temporal intellectual dialogue, exploring key nodes of human civilization evolution."
        },
        field: {
            "zh-CN": "全球文明史",
            "en": "History of Global Civilization"
        },
        remarks: {
            "zh-CN": "鉴往知今，察今预未来。",
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
        id: "business_Insights",
        name: {
            "zh-CN": "商海论道",
            "en": "Insights on Investment"
        },
        contribution: {
            "zh-CN": "商业决策与金融投资观点交锋。",
            "en": "A Clash of Perspectives on Financial Investment and Business Decision-Making."
        },
        field: {
            "zh-CN": "商业洞见",
            "en": "Business Insights"
        },
        remarks: {
            "zh-CN": "人类的远见绝非商品。",
            "en": "Human foresight is by no means a commodity."
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
    } ,

    // ═══════════════════════════════════════════════
    // 【用户配置】投资论道（初始为空，待管理员配置）
    // ═══════════════════════════════════════════════
    {
        id: "technology_wave",
        name: {
            "zh-CN": "科技观潮",
            "en": "Riding the Wave of Technology"
        },
        contribution: {
            "zh-CN": "AI、新能源、先进制造、太空探索和量子计算的发展、演进和渗透。",
            "en": "The development, evolution, and permeation of AI, new energy, advanced manufacturing, space exploration, and quantum computing."
        },
        field: {
            "zh-CN": "技术发展迭代",
            "en": "Technological development and iteration"
        },
        remarks: {
            "zh-CN": "技术浪潮变迁和对社会的影响。",
            "en": "Shifts in the wave of technological change and their impact on society."
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
