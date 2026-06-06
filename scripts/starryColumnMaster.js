// starryColumnMaster.js

const starryColumnMaster = [
    {
        id: "interstellar_navigator",
        name: "星际领航员",
        nameEn: "Interstellar Navigator",
        type: "system",                    // 系统内置
        configurable: false,               // 不可配置
        deletable: false,                  // 不可删除
        // 专家列表：全量所有专家（硬编码，同原来处理方式）
        experts: "all",                    // 特殊标记：表示所有专家
        // 系统指令：硬编码（同原来）
        systemPrompt: {
            "zh-CN": "你是一位星际领航员，精通所有领域的北极星人物...",
            "en": "You are an Interstellar Navigator, proficient in all North Star figures..."
        },
        description: {
            "zh-CN": "针对用户问题，提供三位领域互补的北极星人物建议",
            "en": "Provide three complementary North Star recommendations"
        }
    },
    {
        id: "starry_shining",
        name: "群星闪耀",
        nameEn: "Starry Shining",
        type: "custom",
        configurable: true,                // 可配置
        deletable: true,                   // 可删除
        experts: [],                       // 用户配置的多位专家
        systemPrompt: { "zh-CN": "", "en": "" },
        description: { "zh-CN": "", "en": "" }
    },
    {
        id: "civilization_journey",
        name: "文明之旅",
        nameEn: "Civilization Journey",
        type: "custom",
        configurable: true,
        deletable: true,
        experts: [],
        systemPrompt: { "zh-CN": "", "en": "" },
        description: { "zh-CN": "", "en": "" }
    },
    {
        id: "investment_discussion",
        name: "投资论道",
        nameEn: "Investment Discussion",
        type: "custom",
        configurable: true,
        deletable: true,
        experts: [],
        systemPrompt: { "zh-CN": "", "en": "" },
        description: { "zh-CN": "", "en": "" }
    }
];
