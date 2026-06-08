// starryColumnMaster.js

const starryColumnCards = [    
    // ═══════════════════════════════════════════════
    // 【用户配置】群星闪耀（初始为空，待管理员配置）
    // ═══════════════════════════════════════════════
    {
        id: "galaxy_shine",
        name: {
            "zh-CN": "星光回眸",
            "en": "Starry Glance"
        },
        contribution: {
            "zh-CN": "撰写星光回眸专栏，书写在决定历史走向、技术质变、或思想涌现取得非凡成就的北极星人物传记。",
            "en": "Authoring the Starry Glance column, a collection of biographies on NorthStar figures who achieved greatness by shaping history, revolutionizing technology, or inspiring intellectual flowerings."
        },
        field: {
            "zh-CN": "传记文学、心理传记、历史传记、历史瞬间写作。",
            "en": "Biographical Literature, Psychological Biography, Historical Biography, Historical Miniatures."
        },
        remarks: {
            "zh-CN": "展现杰出人物的性格、人性、思想、命运轨迹与灵魂抉择，提供高维精神共鸣。",
            "en": "Portraying the character, humanity, intellect, life trajectories, and soul-defining choices of exceptional figures to offer a profound spiritual resonance."
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
                "zh-CN": "（待配置：选择融合模式与参与北极星）",
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
            "en": "Civilizational Traversal"
        },
        contribution: {
            "zh-CN": "撰写文明穿越专栏，书写全球文明发展史，打破时空的线性隔阂，勾勒人类文明、东西文化的脉络与交融。",
            "en": "Authoring the Civilizational Traversal column to write a history of global civilization that transcends the linear constraints of time and space to map out the evolution and fusion of human civilization and East-West cultures."
        },
        field: {
            "zh-CN": "人类文明史、史学、地缘文明史、文化史、史学解读。",
            "en": "History of Human Civilization, Historiography, Geopolitical and Civilizational History, Cultural History, Historical Interpretation."
        },
        remarks: {
            "zh-CN": "鉴往知今，察今预未来。通过双向互鉴的视角，将特定历史置于世界坐标系中重新定位，反过来以全球史照见未来。",
            "en": "Learn from the past to guide the present, and observe the present to preview the future. By re-contextualizing specific histories within a global matrix through mutual learning, we let global history illuminate what lies ahead."
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
                "zh-CN": "（待配置：选择融合模式与参与北极星）",
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
            "en": "Business Discourse"
        },
        contribution: {
            "zh-CN": "撰写商海论道专栏，书写商业决策与金融投资观点交锋，深度剖析商业案例，提供观点鲜明的商业和投资洞见。",
            "en": "Authoring the the Business Discourse column to chronicle the clash of ideas in corporate decisions and financial investments, dissecting business case studies to deliver incisive business and investment insights."
        },
        field: {
            "zh-CN": "商业战略、企业家研究、投资、量化、金融科技、生态平台、大宗商品。",
            "en": "Business Strategy, Entrepreneur Research. Investing, Quantitative,Fintech, Ecosystem Platforms, Commodities."
        },
        remarks: {
            "zh-CN": "追求商业本质，大道至简，相信人类的远见绝非商品。",
            "en": "Pursue the essence of business, embrace simplicity, and believe that human vision is by no means a commodity."
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
                "zh-CN": "（待配置：选择融合模式与参与北极星）",
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
            "en": "Tech Horizon"
        },
        contribution: {
            "zh-CN": "撰写科技观潮专栏，跟踪和洞见人工智能、具身智能、新能源、先进制造、太空探索、区块链、多组学和量子计算等技术浪潮的发展、演进和渗透。",
            "en": "Authoring the Tech Horizon column to track and analyze the rise, evolution, and penetration of technological waves such as AI, embodied intelligence, new energy, advanced manufacturing, space exploration, blockchain, multi-omics, and quantum computing."
        },
        field: {
            "zh-CN": "人工智能、量子力学、半导体制造、宇宙学、结构生物学。",
            "en": "Artificial Intelligence、 Quantum、 Semiconductor Manufacturing、Structural Biology."
        },
        remarks: {
            "zh-CN": "深刻洞见技术浪潮发展和变迁趋势，见证和预测其对社会的影响。",
            "en": "Deeply understand the shifts and trends in technological waves, witnessing and predicting their profound influence on society."
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
                "zh-CN": "（待配置：选择融合模式与参与北极星）",
                "en": "(To be configured: select fusion mode and participating experts)"
            }
        }
    } 
];
