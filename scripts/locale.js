        // --- I18N Translations ---
        const translations = {
            "zh-CN": {
                "pageTitle": "对话北极星",
                "headerTitleComplete": "对话北极星<br>\"让AI点亮你心中永恒的灯塔\"",
                "headerTitle": "对话北极星",
                "headerSubtitle": "让AI点亮你心中永恒的灯塔",
                "tabAi": "泛AI",
                "tabQuantum": "泛量子",
                "tabFinance": "泛金融",
                "tabLiterature": "泛人文",
                "tabArt": "泛艺术",
                "tabChinaEntrepreneurs": "泛中华",
                "selectAiLeader": "选择一位泛AI北极星",
                "selectQuantumLeader": "选择一位泛量子北极星",
                "selectFinanceLeader": "选择一位泛金融北极星",
                "selectLiteratureLeader": "选择一位泛文学北极星",
                "selectArtLeader": "选择一位泛艺术北极星",
                "selectChinaEntrepreneursLeader": "选择一位泛中华北极星",
                "scrollLeft": "向左滚动",
                "scrollRight": "向右滚动",
                "labelApiEndpoint": "模型接入点:",
                "labelApiKey": "API Key :",
                "placeholderApiKey": "sk-xxxx",
                "labelApiModel": "模型选择:",
                "labelSetDefaultModel": "设为默认模型", // 新增
                "settingsSaved": "设置已保存！", // 新增
                "settingsCleared": "API信息已清除！", // 新增    
                "interactWithLeader": "与北极星对话",
                "currentSelectedLeaderPrefix": "当前选择的北极星: ",
                "noLeaderSelected": "无",
                "noLeaderSelectedInitial": "无",
                "placeholderUserQuestion": "请输入您的问题...",
                "btnGeneratePrompt": "1. 生成 问题",
                "btnGetAiResponse": "2. 获取 北极星 回复",
                "btnCopyToClipboard": "拷贝到粘贴板",
                "generatedPromptTitle": "生成的 问题 (对选定北极星):",
                "aiResponseTitle": "北极星 回复:",
                "alertSelectLeaderFirst": "请先选择一位北极星！",
                "alertEnterQuestion": "请输入您的问题！",
                "alertEnterApiUrl": "请输入API镜像站基础URL！",
                "alertEnterApiKey": "请输入API Key!",
                "alertNoPrompt": "请先点击“1. 生成 问题”来准备对话内容。",
                "apiErrorOccurred": "请求API时出错: ",
                "apiErrorCheckConsole": "\n\n请检查: \n1. API URL是否正确且可访问。\n2. 是否支持CORS跨域请求。\n3. 网络连接是否正常。\n4. API Key是否正确 (如果需要)。\n5. 控制台(F12)查看详细错误信息。",
                "geminiApiErrorCheckConsole": "\n\n请检查: \n1. Gemini API的URL/Endpoint是否正确且可访问 \n2. API Key是否正确且有效，并以正确的方式（Header或URL参数）传递。\n3. 网络连接是否正常。\n4. 请求体 (RequestBody) 是否符合Gemini API的要求。\n5. 控制台(F12)查看详细错误信息。",
                "apiNoValidResponse": "未能从API获取有效回复。请检查API响应结构。",
                "copiedToClipboard": "已拷贝到粘贴板！",
                "contentTypePrompt": "Prompt",
                "contentTypeAiResponse": "AI 回复",
                "copyFailed": "无法拷贝到粘贴板: ",
                "copyFailedHint": "\n\n提示：\n1. 确保页面是通过 HTTPS 加载的 (本地 localhost 通常也可以)。\n2. 浏览器可能需要用户交互 (如点击) 才能执行复制操作。\n3. 检查浏览器控制台是否有权限相关的错误信息。\n4. 您可以尝试手动选中内容并按 Ctrl+C (或 Cmd+C) 复制。",
                "nothingToCopy": "没有可拷贝的内容。请先生成问题或获取北极星回复。",
                "labelContribution": "贡献:",
                "labelField": "领域:",
                "labelRemarks": "备注:",
                "modelDeepSeekV3": "DeepSeek-V3",
                "modelGeminiFlash": "Gemini-2.5-Flash",
                "modelGpt4oMini": "gpt-4o-mini",
                "promptBaseRemarksNone": "无特定备注，请基于其贡献和领域推断其核心思维模式。",
                "promptBaseRemarksWith": "备注中提到的特点 (${remarks}) 和",
                "promptBackgroundSetting": "背景设定:",
                "promptYouAre": "你是",
                "promptBasedOnPublicContributions": "根据公开的贡献、专长领域和已知行事风格/理念，从第一性原理出发，深入思考并回答以下用户提出的问题。",
                "promptCoreInfoFor": "的核心信息:",
                "promptMainContributions": "主要贡献",
                "promptExpertise": "专业领域",
                "promptKeyRemarksFeatures": "关键备注/特点",
                "promptThinkingFrameworkGuidance": "思考框架指引 (以 ${name} 思考时请遵循)：",
                "promptFollowWhenThinkingAs": "以 ${name} 思考时请遵循",
                "promptFirstPrinciplesThinking": "第一性原理 (First Principles Thinking)",
                "promptFirstPrinciplesDetail": "将问题分解到最基本的、不容置疑的真实要素。避免类比推理或依赖普遍接受的假设，除非这些假设已经过严格验证。",
                "promptDomainExpertise": "领域专长",
                "promptDomainExpertiseDetail1": "运用你在 ${field} 的深厚知识。",
                "promptDomainExpertiseDetail2": "如果问题跨领域，尝试从你的核心领域视角寻找切入点或提出独到见解。",
                "promptCorePhilosophyDrivingForce": "核心理念/驱动力",
                "promptCorePhilosophyDetail1": "结合 ${name} 的 ${remarksSection} 已知贡献，思考其做决策、看待问题时的核心驱动力是什么（例如，技术乐观主义、风险厌恶、社会责任、效率至上、创新驱动、长期主义等）。",
                "promptProblemAnalysis": "问题剖析",
                "promptProblemAnalysisDetail": "深入分析用户问题的本质，探讨其背后的深层原因和可能的多种解读。",
                "promptSolutionInsight": "解决方案/洞察",
                "promptSolutionInsightDetail1": "基于以上思考，提出具有 ${name} 特色的、富有洞察力的、可能具有前瞻性的观点、分析或解决方案框架。",
                "promptSolutionInsightDetail2": "如果适用，可以指出潜在的挑战、机遇或需要进一步探索的方向。",
                "promptLanguageStyle": "语言风格",
                "promptLanguageStyleDetail1": "尝试模仿 ${name} 可能的沟通风格（例如，直接、富有远见、严谨、强调数据、关注伦理等）。",
                "promptLanguageStyleDetail2": "如果其风格未知，则采用清晰、专业、有深度的表达。",
                "promptUserQuestion": "用户问题:",
                "promptAs": "请你作为",
                "promptReplyInChinese": "开始你的思考和中文回复:",
                "promptReplyInEnglish": "开始你的思考和英文回复:",
                "settingsBtnText": "设置",
                "modalTitle": "API及模型设置",
                "saveBtnText": "保存设置",
                "aboutBtnText": "了解我们",    
                // --- 新增宣言模态框的翻译 ---
                "manifestoTitle": "《对话北极星》——一场与信念最深刻的对话",
                "manifestoPara1": "你，是否曾仰望星空，渴望与群星对话？",
                "manifestoPara2": "在知识的浩瀚海洋中，我们时常感到迷茫，被信息的洪流裹挟，被表面的喧嚣困扰。我们追逐着零散的知识碎片，却鲜少有机会触及那些真正塑造人类文明的深刻思想。",
                "manifestoPara3": "达·芬奇、爱因斯坦、海明威、马斯克……他们的卓越并非偶然，而是源于对世界运转的深刻洞察：物理的第一性原理、艺术的无限可能、人性的光辉与挑战。他们理解系统，面对混沌，每一次的远见与修正都如北极星般指引，最终塑造了他们的时代。",
                "manifestoPara4": "我们不再只是被动地接收信息，而是主动去触碰那些照亮人类文明的智慧之光。",
                "manifestoPara5": "想象一下：你轻轻点击，就能与OpenAI的Sam Altman探讨通用人工智能的伦理边界，或与Google DeepMind的Demis Hassabis共话AI如何加速科学发现；你可以与量子理论的Max Planck回溯能量量子化的起源，也能与Google量子AI实验室的Hartmut Neven展望量子计算的未来。",
                "manifestoPara6": "如果你对商业的脉搏充满好奇，可以与巴菲特洞察价值投资的精髓，或和腾讯马化腾分析社交媒体的演变。在文学的殿堂，与莎士比亚品味人性的悲喜，或随马尔克斯的魔幻现实主义漫游拉美大地；艺术的殿堂里，与达·芬奇共鸣科学与艺术的融合，或与梵高感受色彩深处的情感。更可以与中国家电巨头美的方洪波探讨智能制造的未来，或跟比亚迪王传福展望新能源汽车的蓝图。",
                "manifestoPara7": "这不仅仅是技术，更是一次灵魂的邀约，一次思维的远征。我们精心构建《对话北极星》，让AI化身为连接人类智慧与潜能的桥梁。它严格遵循每一位“北极星”人物的思想框架、专业领域和语言风格，确保每一次回复都深邃而富有启发性。",
                "manifestoPara8": "你无需穷尽所有数据，也无需在噪音中苦寻信号。在这里，你的每一个问题，都将得到北极星般的回应。每一次提问，都可能激发你内心深处未曾触及的创新火花；每一次对话，都将拓展你认知世界的边界，推动你个人成长的进程。",
                "manifestoConclusion": "我们使命是以AI原生智慧，重燃探索与创意的火花——点亮你心中永恒的灯塔。",
                 "footerRight": "© 2025 AI范式进化. 保留所有权利。",
            },
            "en": {
                "pageTitle": "Talk with North Stars",
                "headerTitleComplete": "Talk with North Stars<br>\"Let AI Illuminate the Eternal Lighthouse in Your Heart\"",
                "headerTitle": "Talk with North Stars",
                "headerSubtitle": "Let AI Illuminate the Eternal Lighthouse in Your Heart",
                "tabAi": "Pan-AI",
                "tabQuantum": "Pan-Quantum",
                "tabFinance": "Pan-Finance",                    
                "tabLiterature": "Pan-humanities",
                "tabArt": "Pan-Art",
                "tabChinaEntrepreneurs": "Pan-Chinese",
                "selectAiLeader": "Select a Pan-AI North Star",
                "selectQuantumLeader": "Select a Pan-Quantum North Star",
                "selectFinanceLeader": "Select a Pan-Finance North Star",                    
                "selectLiteratureLeader": "Select a Pan-Literature North Star",
                "selectArtLeader": "Select a Pan-Art North Star",
                "selectChinaEntrepreneursLeader": "Select a Pan-Chinese North Star",
                "scrollLeft": "Scroll Left",
                "scrollRight": "Scroll Right",
                "labelApiEndpoint": "Model Endpoint:",
                "labelApiKey": "API Key :",
                "placeholderApiKey": "sk-xxxx",
                "labelApiModel": "Model Selection:",
                "labelSetDefaultModel": "Set as Default Model", // 新增
                "settingsSaved": "Settings saved!", // 新增
                "settingsCleared": "API info cleared!", // 新增
                "interactWithLeader": "Talk with North Star",
                "currentSelectedLeaderPrefix": "Currently Selected North Star: ",
                "noLeaderSelected": "None",
                "noLeaderSelectedInitial": "None",
                "placeholderUserQuestion": "Please enter your question...",
                "btnGeneratePrompt": "1. Generate Question",
                "btnGetAiResponse": "2. Get NorthStar Response",
                "btnCopyToClipboard": "Copy to Clipboard",
                "generatedPromptTitle": "Generated Question (for selected NorthStar):",
                "aiResponseTitle": "NorthStar Response:",
                "alertSelectLeaderFirst": "Please select a North Star first!",
                "alertEnterQuestion": "Please enter your question!",
                "alertEnterApiUrl": "Please enter the API mirror base URL!",
                "alertEnterApiKey": "Please enter API Key!",
                "alertNoPrompt": "Please click \"1. Generate Prompt\" first to prepare the talk content.",
                "apiErrorOccurred": "Error requesting API: ",
                "apiErrorCheckConsole": "\n\nPlease check: \n1. If the API URL is correct and accessible.\n2. If CORS cross-origin requests are supported.\n3. If the network connection is normal.\n4. If the API Key is correct (if required).\n5. Check the console (F12) for detailed error messages.",
                "geminiApiErrorCheckConsole": "\n\nPlease check: \n1. If the Gemini API URL/Endpoint is correct and accessible.\n2. If the API Key is correct and valid, and passed correctly (Header or URL parameter).\n3. If the network connection is normal.\n4. If the request body (RequestBody) meets Gemini API requirements.\n5. Check the console (F12) for detailed error messages.",
                "apiNoValidResponse": "Failed to get a valid response from the API. Please check the API response structure.",
                "copiedToClipboard": "Copied to clipboard!",
                "contentTypePrompt": "Prompt",
                "contentTypeAiResponse": "AI Response",
                "copyFailed": "Failed to copy to clipboard: ",
                "copyFailedHint": "\n\nHint:\n1. Ensure the page is loaded via HTTPS (localhost usually works too).\n2. The browser might require user interaction (like a click) to perform the copy operation.\n3. Check the browser console for any permission-related error messages.\n4. You can try manually selecting the content and pressing Ctrl+C (or Cmd+C) to copy.",
                "nothingToCopy": "Nothing to copy. Please generate a Prompt or get an AI response first.",
                "labelContribution": "Contribution:",
                "labelField": "Field:",
                "labelRemarks": "Remarks:",
                "modelDeepSeekV3": "DeepSeek-V3",
                "modelGeminiFlash": "Gemini-2.5-Flash",
                "modelGpt4oMini": "gpt-4o-mini",
                "promptBaseRemarksNone": "No specific remarks, please infer their core thinking model based on their contributions and field.",
                "promptBaseRemarksWith": "The characteristics mentioned in the remarks (${remarks}) and",
                "promptBackgroundSetting": "Background Setting:",
                "promptYouAre": "You are",
                "promptBasedOnPublicContributions": "Based on public contributions, expertise, and known style/philosophy, think deeply from first principles and answer the user's question below.",
                "promptCoreInfoFor": "'s Core Information:",
                "promptMainContributions": "Main Contributions",
                "promptExpertise": "Professional Field",
                "promptKeyRemarksFeatures": "Key Remarks/Features",
                "promptThinkingFrameworkGuidance": "Thinking Framework Guide (Follow when thinking as ${name}):",
                "promptFollowWhenThinkingAs": "Follow when thinking as ${name}",
                "promptFirstPrinciplesThinking": "First Principles Thinking",
                "promptFirstPrinciplesDetail": "Break down the problem into its most fundamental, indisputable truths. Avoid analogical reasoning or relying on commonly accepted assumptions unless they have been rigorously validated.",
                "promptDomainExpertise": "Domain Expertise",
                "promptDomainExpertiseDetail1": "Utilize your deep knowledge in ${field}.",
                "promptDomainExpertiseDetail2": "If the question spans multiple domains, try to find entry points or offer unique insights from your core domain perspective.",
                "promptCorePhilosophyDrivingForce": "Core Philosophy/Driving Force",
                "promptCorePhilosophyDetail1": "Considering ${name}'s ${remarksSection} known contributions, reflect on their core driving force when making decisions and viewing problems (e.g., technological optimism, risk aversion, social responsibility, efficiency-first, innovation-driven, long-termism, etc.).",
                "promptProblemAnalysis": "Problem Analysis",
                "promptProblemAnalysisDetail": "Deeply analyze the essence of the user's question, exploring its underlying causes and possible multiple interpretations.",
                "promptSolutionInsight": "Solution/Insight",
                "promptSolutionInsightDetail1": "Based on the above thinking, propose viewpoints, analyses, or solution frameworks that are characteristic of ${name}, insightful, and potentially forward-looking.",
                "promptSolutionInsightDetail2": "If applicable, point out potential challenges, opportunities, or directions for further exploration.",
                "promptLanguageStyle": "Language Style",
                "promptLanguageStyleDetail1": "Attempt to mimic ${name}'s likely communication style (e.g., direct, visionary, rigorous, data-driven, ethics-focused, etc.).",
                "promptLanguageStyleDetail2": "If their style is unknown, use clear, professional, and in-depth expression.",
                "promptUserQuestion": "User Question:",
                "promptAs": "As",
                "promptReplyInChinese": "begin your thinking and reply in Chinese:",
                "promptReplyInEnglish": "begin your thinking and reply in English:",                    
                "settingsBtnText": "Setting",
                "modalTitle": "API&Modal Setting",
                "saveBtnText": "Save Setting",                    
                "aboutBtnText": "About Us",    
                 // --- 新增宣言模态框的翻译 ---
                "manifestoTitle": "《Talk to NorthStar》—A Profound Dialogue with Belief",
                "manifestoPara1": "Have you ever gazed at the stars, yearning to converse with the constellations?",
                "manifestoPara2": "In the vast ocean of knowledge, we often feel lost, swept away by the deluge of information and troubled by superficial clamor. We chase fragmented pieces of knowledge, yet rarely have the opportunity to touch upon the profound thoughts that truly shaped human civilization.",
                "manifestoPara3": "Leonardo da Vinci, Albert Einstein, Ernest Hemingway, Elon Musk... their excellence was not accidental, but stemmed from profound insights into how the world operates: the first principles of physics, the infinite possibilities of art, the brilliance and challenges of human nature. They understood systems, faced chaos, and every foresight and correction, like the North Star, guided them, ultimately shaping their era.",
                "manifestoPara4": "We no longer passively receive information, but actively reach out to touch the wisdom that illuminates human civilization.",
                "manifestoPara5": "Imagine: with a click, you can discuss the ethical boundaries of general artificial intelligence with Sam Altman of OpenAI, or converse with Demis Hassabis of Google DeepMind about how AI accelerates scientific discovery; you can trace the origins of energy quantization with Max Planck, the father of quantum theory, or envision the future of quantum computing with Hartmut Neven of Google's Quantum AI Lab.",
                "manifestoPara6": "If you are curious about the pulse of business, you can gain insights into the essence of value investing with Warren Buffett, or analyze the evolution of social media with Pony Ma of Tencent. In the halls of literature, you can savor the joys and sorrows of humanity with Shakespeare, or wander through Latin America with Márquez's magical realism; in the realm of art, you can resonate with Leonardo da Vinci's fusion of science and art, or feel the deep emotions within colors with Van Gogh. You can even discuss the future of intelligent manufacturing with Fang Hongbo, CEO of Chinese home appliance giant Midea, or envision the blueprint for new energy vehicles with Wang Chuanfu, chairman of BYD.",
                "manifestoPara7": "This is not just technology; it is an invitation to the soul, an expedition of the mind. We meticulously built 'Talk to NorthStar' to let AI serve as a bridge connecting human wisdom and potential. It strictly adheres to the thought framework, professional field, and linguistic style of each 'NorthStar' figure, ensuring every response is profound and inspiring.",
                "manifestoPara8": "You don't need to exhaust all data, nor search tirelessly for signals amidst the noise. Here, every question you ask will receive a NorthStar-like response. Every inquiry may spark innovative fires previously untouched deep within you; every dialogue will expand the boundaries of your perception of the world and propel your personal growth.",
                "manifestoConclusion": "Our mission is to rekindle the spark of exploration and creativity with AI-native wisdom—Illuminate the eternal lighthouse in your heart.",
                "footerRight": "© 2025 AI Paradigm Evolution. All rights reserved.",
            }
        };
        let currentLang = 'zh-CN'; // Default language
        // === NEW: Function to update manifesto modal content ===
        function updateManifestoModalContent(lang) {
            const manifestoModalTitle = document.getElementById('manifestoModalTitle');
            const manifestoModalParas = document.querySelectorAll('#manifestoModal .manifesto-text p');
            const manifestoModalConclusion = document.getElementById('manifestoModalConclusion');
        
            if (manifestoModalTitle && translations[lang] && translations[lang]['manifestoTitle']) {
                manifestoModalTitle.innerHTML = translations[lang]['manifestoTitle'];
            }
        
            if (manifestoModalParas.length > 0 && translations[lang]) {
                manifestoModalParas.forEach((p, index) => {
                    const key = `manifestoPara${index + 1}`;
                    if (translations[lang][key]) {
                        p.innerHTML = translations[lang][key];
                    }
                });
            }
        
            if (manifestoModalConclusion && translations[lang] && translations[lang]['manifestoConclusion']) {
                manifestoModalConclusion.innerHTML = `<em>${translations[lang]['manifestoConclusion']}</em>`;
            }
        }

        function setLanguage(lang) {
            currentLang = lang;
            document.documentElement.lang = currentLang;
            document.title = translations[currentLang].pageTitle;
            localStorage.setItem('preferredLang', lang); // Save preference

            document.querySelectorAll('[data-i18n-key]').forEach(el => {
                const key = el.dataset.i18nKey;
                const target = el.dataset.i18nTarget || 'textContent'; // Default to textContent
                let translation = translations[currentLang][key] || key; // Fallback to key if no translation

                if (target === 'innerHTML') {
                    el.innerHTML = translation;
                } else if (target === 'placeholder') {
                    el.placeholder = translation;
                } else if (target === 'aria-label') {
                    el.setAttribute('aria-label', translation);
                } else {
                    el.textContent = translation;
                }
            });
            
            // Update dynamic elements that need re-translation
            populateLeaders(); // This will now use translated labels AND translated data content
            updateModelSelectByEndpoint(document.getElementById('apiEndpoint').value); // Re-populate models with translated labels

            // Update selected leader display if "None"
            const selectedLeaderNameEl = document.getElementById('selectedLeaderName');
            if (!currentSelectedLeader) {
                selectedLeaderNameEl.textContent = translations[currentLang].noLeaderSelected;
            }

            // === NEW: Call function to update manifesto modal content ===
            updateManifestoModalContent(lang);
            // === END NEW ===
        }    
