window.currentSelectedLeader = null;
window.currentSelectedLeaderCategory = '';
window.currentGeneratedPrompt = '';

// --- [新增] 对话画布相关全局变量 ---
let conversationHistory = []; // 存储 {role, text, leaderName, timestamp}
// --- [新增] 用于临时存储从 MD 导入的对话历史
let importedHistory = null;  
let isCanvasModeOpen = false;

// ═══════════════════════════════════════════════
// 【Session 持久化】仅恢复对话画布内容
// ═══════════════════════════════════════════════
(function initCanvasSession() {
    try {
        // 恢复对话历史
        const savedChat = sessionStorage.getItem('northstar_canvas_history');
        if (savedChat) {
            conversationHistory = JSON.parse(savedChat);
        }

        // --- [新增] 恢复导入的历史 ---
        const savedImported = sessionStorage.getItem('northstar_imported_history');
        if (savedImported) {
            importedHistory = JSON.parse(savedImported);
        }
    } catch (e) {
        console.error("Session 恢复失败:", e);
        conversationHistory = [];
        importedHistory = null;
    }
})();

// 优雅模式状态锁，防止频繁点击
let isElegantModeOpen = false;

// --- NEW: Modal Control ---
const apiSettingsModal = document.getElementById('apiSettingsModal');
const apiEndpointSelect = document.getElementById('apiEndpoint'); // Changed ID to match HTML
const apiKeyInput = document.getElementById('apiKey');           // Changed ID to match HTML
const apiModelSelect = document.getElementById('apiModel');       // Changed ID to match HTML
const apiDefaultModelCheck = document.getElementById('apiDefaultModelCheck'); // Added checkbox

function openApiSettingsModal(event) {
    if (event) event.preventDefault(); // Prevent default anchor behavior
    if (apiSettingsModal) apiSettingsModal.style.display = 'block';
    loadApiSettings(); // Load settings when modal opens
}

function closeApiSettingsModal() {
    if (apiSettingsModal) apiSettingsModal.style.display = 'none';
}

// Close modal if user clicks outside of the modal content
window.onclick = function(event) {
    if (event.target == apiSettingsModal) {
        closeApiSettingsModal();
    }
}

// --- NEW: Settings Persistence ---
// Helper to get all settings from localStorage
function getAllApiSettings() {
    try {
        const settings = JSON.parse(localStorage.getItem('apiSettingsMap') || '{}');
        return settings;
    } catch (e) {
        console.error("Error parsing apiSettingsMap from localStorage:", e);
        return {};
    }
}

// Helper to get the default API settings
function getDefaultApiSettings() {
    const allSettings = getAllApiSettings();
    const defaultSetting = Object.values(allSettings).find(s => s.isDefaultModel);
    return defaultSetting || { endpoint: null, apiKey: null, model: null };
}

function saveApiSettings() {
    const selectedModelName = apiModelSelect.value;
    const selectedEndpoint = apiEndpointSelect.value;
    const inputApiKey = apiKeyInput.value;
    const isDefault = apiDefaultModelCheck.checked;

    if (!selectedModelName) {
        alert(translations[currentLang].alertSelectModelToSave); // Ensure this translation key exists
        return;
    }

    const allSettings = getAllApiSettings();

    // Set/update current model's configuration
    allSettings[selectedModelName] = {
        endpoint: selectedEndpoint,
        apiKey: inputApiKey,
        model: selectedModelName,
        isDefaultModel: isDefault
    };

    // If this model is set as default, ensure all others are not
    if (isDefault) {
        Object.keys(allSettings).forEach(modelKey => {
            if (modelKey !== selectedModelName) {
                allSettings[modelKey].isDefaultModel = false;
            }
        });
    }

    localStorage.setItem('apiSettingsMap', JSON.stringify(allSettings));

    // alert(translations[currentLang].settingsSaved || 'Settings Saved!');
    // 修改后（确保 translations 中包含 settingsSaved 键）
    alert(translations[currentLang].settingsSaved);
    closeApiSettingsModal();
}

function loadApiSettings() {
    const allSettings = getAllApiSettings();
    const defaultSetting = getDefaultApiSettings();

    // Populate the endpoint dropdown with all available endpoints
    populateEndpointSelect(defaultSetting.endpoint);

    // After populating endpoints, if there's a default, update models for it
    if (defaultSetting.endpoint) {
        updateModelSelectByEndpoint(defaultSetting.endpoint, defaultSetting.model);
    } else {
        // If no default, populate models for the first endpoint in the map, or clear
        const firstEndpoint = Object.keys(endpointModelMap)[0];
        if (firstEndpoint) {
            apiEndpointSelect.value = firstEndpoint;
            updateModelSelectByEndpoint(firstEndpoint);
        } else {
            apiEndpointSelect.value = '';
            apiModelSelect.innerHTML = '';
            apiModelSelect.disabled = true;
        }
    }

    // Now, apply the settings of the *currently selected* model in the dropdown
    // or the default settings if no specific model is selected yet.
    const currentSelectedModelInUI = apiModelSelect.value;
    const cfgToApply = allSettings[currentSelectedModelInUI] || defaultSetting;

    if (cfgToApply.endpoint) apiEndpointSelect.value = cfgToApply.endpoint;
    if (cfgToApply.apiKey) apiKeyInput.value = cfgToApply.apiKey;
    if (cfgToApply.model) apiModelSelect.value = cfgToApply.model;
    apiDefaultModelCheck.checked = Boolean(cfgToApply.isDefaultModel);

    // This ensures that if a model is selected, its corresponding settings are loaded
    // regardless of whether it's the default.
    // This part is crucial for editing settings of non-default models.
    if (currentSelectedModelInUI && allSettings[currentSelectedModelInUI]) {
        const specificModelConfig = allSettings[currentSelectedModelInUI];
        apiEndpointSelect.value = specificModelConfig.endpoint;
        apiKeyInput.value = specificModelConfig.apiKey;
        apiDefaultModelCheck.checked = specificModelConfig.isDefaultModel;
        updateModelSelectByEndpoint(specificModelConfig.endpoint, specificModelConfig.model);
    } else if (defaultSetting.model) {
        apiEndpointSelect.value = defaultSetting.endpoint;
        apiKeyInput.value = defaultSetting.apiKey;
        apiDefaultModelCheck.checked = defaultSetting.isDefaultModel;
        updateModelSelectByEndpoint(defaultSetting.endpoint, defaultSetting.model);
    } else {
        // If no settings at all, clear everything
        apiKeyInput.value = '';
        apiDefaultModelCheck.checked = false;
    }
}



// 在 renderDialogueCanvas 外部定义（或文件顶部）
// 辅助函数：防止 LaTeX 中的 < 和 > 破坏 HTML 结构
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    if(evt) evt.currentTarget.className += " active";

    if (window.currentSelectedLeader && window.currentSelectedLeaderCategory !== tabName) {
        clearSelection();
    }
    updateAllScrollButtonStates();

    //现代界面风格
    onTabChanged();
}

function populateLeaders() {
    for (const category in allData) {
        const grid = document.getElementById(`${category}Grid`);
        if (!grid) continue;
        grid.innerHTML = '';
        allData[category].forEach(leader => {
            const card = document.createElement('div');
            card.className = 'leader-card';
            card.dataset.id = leader.id;
            card.dataset.category = category;

            const displayedContribution = leader.contribution[currentLang] || leader.contribution['zh-CN'];
            const displayedField = leader.field[currentLang] || leader.field['zh-CN'];
            const displayedRemarks = leader.remarks ? (leader.remarks[currentLang] || leader.remarks['zh-CN']) : '';

            card.innerHTML = `
                <h3>${leader.name}</h3>
                <p><strong>${translations[currentLang].labelContribution}</strong> ${displayedContribution}</p>
                <p class="field"><strong>${translations[currentLang].labelField}</strong> ${displayedField}</p>
                ${displayedRemarks ? `<p class="remarks"><strong>${translations[currentLang].labelRemarks}</strong> ${displayedRemarks}</p>` : ''}
            `;
            card.onclick = () => selectLeader(leader, category, card);
            grid.appendChild(card);
        });
        grid.addEventListener('scroll', () => updateScrollButtonStates(grid));
        updateScrollButtonStates(grid);
    }
}

function clearSelection() {
    if (window.currentSelectedLeader) {
        const prevSelectedCard = document.querySelector(`.leader-card.selected[data-category='${window.currentSelectedLeaderCategory}']`);
        if (prevSelectedCard) {
            prevSelectedCard.classList.remove('selected');
        }
    }
    window.currentSelectedLeader = null;
    window.currentSelectedLeaderCategory = '';
    document.getElementById('selectedLeaderName').textContent = translations[currentLang].noLeaderSelected;
    window.currentGeneratedPrompt = '';
    document.getElementById('prompt-display-area').style.display = 'none';
    
    // --- 新增：重置折叠状态 ---
    document.getElementById('prompt-collapsible-content').style.display = 'none';
    document.getElementById('prompt-toggle-icon').classList.remove('icon-rotated');
    
    document.getElementById('ai-response-area').style.display = 'none';
    document.getElementById('generatedPromptText').value = '';
    document.getElementById('aiResponseText').textContent = '';
}

function selectLeader(leader, category, cardElement) {
    // 清除之前选中的高亮（仅当有 cardElement 时才操作 DOM）
    if (window.currentSelectedLeader) {
        const prevSelectedCard = document.querySelector(
            `.leader-card.selected[data-category='${window.currentSelectedLeaderCategory}']`
        );
        if (prevSelectedCard) {
            prevSelectedCard.classList.remove('selected');
        }
    }

    // 设置新的全局状态
    window.currentSelectedLeader = leader;
    window.currentSelectedLeaderCategory = category;
    document.getElementById('selectedLeaderName').textContent = leader.name;

    // 如果有新的卡片元素，高亮它（新 UI 中 cardElement 为 null，跳过）
    if (cardElement) {
        cardElement.classList.add('selected');
    }

    // 重置提示区和回复区（原有逻辑保持不变）
    window.currentGeneratedPrompt = '';
    document.getElementById('prompt-display-area').style.display = 'none';
    document.getElementById('prompt-collapsible-content').style.display = 'none';
    const toggleIcon = document.getElementById('prompt-toggle-icon');
    if (toggleIcon) toggleIcon.classList.remove('icon-rotated');
    document.getElementById('ai-response-area').style.display = 'none';
    document.getElementById('generatedPromptText').value = '';
    document.getElementById('aiResponseText').textContent = '';

    // 自动切换到对应标签页（如果当前标签页未激活）
    if (!document.getElementById(category).classList.contains('active')) {
        const tabButtons = document.getElementsByClassName('tab-button');
        for (let btn of tabButtons) {
            if (btn.onclick && btn.onclick.toString().includes(category)) {
                btn.click();
                break;
            }
        }
    }
}

function scrollGrid(buttonElement, direction) {
    const scrollContainer = buttonElement.closest('.leader-scroll-container');
    const grid = scrollContainer.querySelector('.leader-grid');
    const firstCard = grid.querySelector('.leader-card');

    let cardWidth = 250;
    if (firstCard) {
         cardWidth = firstCard.offsetWidth;
    }

    const scrollAmount = (cardWidth + parseInt(getComputedStyle(grid).gap || '20px')) * 1.5;

    grid.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

function updateScrollButtonStates(gridElement) {
    if (!gridElement || !gridElement.closest('.tab-content.active')) {
         const scrollContainerInactive = gridElement.closest('.leader-scroll-container');
         if(scrollContainerInactive) {
            const leftBtnInactive = scrollContainerInactive.querySelector('.scroll-button.left');
            const rightBtnInactive = scrollContainerInactive.querySelector('.scroll-button.right');
            if(leftBtnInactive) leftBtnInactive.style.display = 'none';
            if(rightBtnInactive) rightBtnInactive.style.display = 'none';
         }
        return;
    }

    const scrollContainer = gridElement.closest('.leader-scroll-container');
    if (!scrollContainer) return;

    const leftButton = scrollContainer.querySelector('.scroll-button.left');
    const rightButton = scrollContainer.querySelector('.scroll-button.right');

    if (!leftButton || !rightButton) return;

    leftButton.style.display = 'flex';
    rightButton.style.display = 'flex';

    const scrollLeft = gridElement.scrollLeft;
    const scrollWidth = gridElement.scrollWidth;
    const clientWidth = gridElement.clientWidth;

    if (scrollWidth <= clientWidth + 1) {
        leftButton.style.display = 'none';
        rightButton.style.display = 'none';
    } else {
        leftButton.disabled = scrollLeft <= 0;
        rightButton.disabled = scrollLeft >= (scrollWidth - clientWidth - 1);
    }
}

function updateAllScrollButtonStates() {
    setTimeout(() => {
        document.querySelectorAll('.leader-grid').forEach(grid => {
            updateScrollButtonStates(grid);
        });
    }, 50);
}

function generateBasePrompt() {
    const question = document.getElementById('userQuestion').value.trim();
    const lang = currentLang;

    if (!window.currentSelectedLeader) {
        alert(translations[lang].alertSelectLeaderFirst);
        return "";
    }
    if (!question) {
        alert(translations[lang].alertEnterQuestion);
        return "";
    }

    const leader = window.currentSelectedLeader;

    // ═══════════════════════════════════════════════════
    // 【修复】兼容普通领袖（多语言对象）和星空专栏虚拟领袖（_raw对象）
    // 逻辑：
    // 1. 优先使用 _raw 对象（星空专栏有，普通领袖无）
    // 2. 回退到 leader.xxx（普通领袖是多语言对象，星空专栏是字符串）
    // 3. getFieldValue 统一处理：字符串直接返回，对象按语言解析
    // ═══════════════════════════════════════════════════

    const contributionObj = leader._rawContribution || leader.contribution;
    const fieldObj = leader._rawField || leader.field;
    const remarksObj = leader._rawRemarks || leader.remarks;

    const leaderContribution = getFieldValue(contributionObj, lang) 
        || getFieldValue(contributionObj, 'zh-CN') 
        || '';

    const leaderField = getFieldValue(fieldObj, lang) 
        || getFieldValue(fieldObj, 'zh-CN') 
        || '';

    const leaderRemarks = remarksObj 
        ? (getFieldValue(remarksObj, lang) || getFieldValue(remarksObj, 'zh-CN') || '')
        : '';

    const remarksText = leaderRemarks || translations[lang].promptBaseRemarksNone;
    const remarksSection = leaderRemarks
        ? translations[lang].promptBaseRemarksWith.replace('${remarks}', leaderRemarks)
        : '';

    const replyInstructionKey = lang === 'zh-CN' ? 'promptReplyInChinese' : 'promptReplyInEnglish';

    return `
${translations[lang].promptBackgroundSetting}
${translations[lang].promptYouAre} ${leader.name}. ${translations[lang].promptBasedOnPublicContributions}

${leader.name}${translations[lang].promptCoreInfoFor}
- ${translations[lang].promptMainContributions} ${leaderContribution}
- ${translations[lang].promptExpertise} ${leaderField}
- ${translations[lang].promptKeyRemarksFeatures} ${remarksText}

${translations[lang].promptThinkingFrameworkGuidance.replace('${name}', leader.name)}
1.  **${translations[lang].promptFirstPrinciplesThinking}**: ${translations[lang].promptFirstPrinciplesDetail}
2.  **${translations[lang].promptDomainExpertise}**: ${translations[lang].promptDomainExpertiseDetail1.replace('${field}', leaderField)} ${translations[lang].promptDomainExpertiseDetail2}
3.  **${translations[lang].promptCorePhilosophyDrivingForce}**: ${translations[lang].promptCorePhilosophyDetail1.replace('${name}', leader.name).replace('${remarksSection}', remarksSection)}
4.  **${translations[lang].promptProblemAnalysis}**: ${translations[lang].promptProblemAnalysisDetail}
5.  **${translations[lang].promptSolutionInsight}**: ${translations[lang].promptSolutionInsightDetail1.replace('${name}', leader.name)} ${translations[lang].promptSolutionInsightDetail2} ${translations[lang].promptSolutionInsightDetail3}
6.  **${translations[lang].promptCognitiveFriction}**: ${translations[lang].promptCognitiveFrictionDetail}
7.  **${translations[lang].promptLanguageStyle}**: ${translations[lang].promptLanguageStyleDetail1.replace('${name}', leader.name)} ${translations[lang].promptLanguageStyleDetail2}

${translations[lang].promptUserQuestion}
"${question}"

${translations[lang].promptAs} ${leader.name}, ${translations[lang][replyInstructionKey]}
`;
}


// --- 新增：控制 Prompt 区域折叠与展开 ---
function togglePromptCollapse() {
    const content = document.getElementById('prompt-collapsible-content');
    const icon = document.getElementById('prompt-toggle-icon');
    
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        icon.classList.add('icon-rotated'); // 旋转箭头
    } else {
        content.style.display = 'none';
        icon.classList.remove('icon-rotated'); // 恢复箭头
    }
}

function generateAndShowPrompt() {
    window.currentGeneratedPrompt = generateBasePrompt();
    const promptDisplayArea = document.getElementById('prompt-display-area');
    const promptTextElement = document.getElementById('generatedPromptText');
    
    // 获取内容区和图标，用于重置状态
    const content = document.getElementById('prompt-collapsible-content');
    const icon = document.getElementById('prompt-toggle-icon');

    if (window.currentGeneratedPrompt) {
        promptTextElement.value = window.currentGeneratedPrompt.trim();
        promptDisplayArea.style.display = 'block'; // 显示整个提示词区域
        
        // 建议：点击“生成”后，默认仍保持折叠状态（如需自动展开，请把下面设为 'block' 并 add class）
        content.style.display = 'none'; 
        icon.classList.remove('icon-rotated');

        document.getElementById('ai-response-area').style.display = 'none';
        document.getElementById('aiResponseText').textContent = '';
    } else {
        promptDisplayArea.style.display = 'none';
        promptTextElement.value = '';
    }
}

async function getAIResponse() {
    const promptText = document.getElementById('generatedPromptText').value.trim();

    if (!promptText) {
        alert(translations[currentLang].alertNoPrompt);
        return;
    }

    const apiBaseUrl = apiEndpointSelect.value;
    const apiKey = apiKeyInput.value;
     const modelWithSuffix = apiModelSelect.value; // 这是带后缀的名字，如 gemini-1.5-flash@proxy
    // 【新增这一行】：去掉 @ 符号及其后面的内容，恢复成 Google 认识的真实名称
    const model = modelWithSuffix.split('@')[0]; 

    const aiResponseArea = document.getElementById('ai-response-area');
    const aiResponseTextElement = document.getElementById('aiResponseText');
    const getAIResponseButton = document.getElementById('getAIResponseButton');
    const loadingIndicator = document.getElementById('loadingIndicator');

    if (!apiBaseUrl || !apiKey || !model) {
        //alert("请确保 API 设置完整（接入点、Key、模型）");
        alert(translations[currentLang].alertApiSettingsIncomplete);
        return;
    }

    // 1. 预设 Header
    const headers = { 'Content-Type': 'application/json' };
    const isGeminiModel = model.toLowerCase().includes("gemini");

    //修改 getAIResponse() 中的 Qwen 判断逻辑
    const isQwenModel = apiBaseUrl === "https://qwenapi.aivibeinvest.com";

    // 判断是否为 Qwen 模型（通过 endpoint 或 model 名）
    //const isQwenModel = apiBaseUrl.includes("dashscope.aliyuncs.com") || 
    //                model.startsWith("qwen-");
 
    // 2. 构造 URL
    let fullApiUrl;
    if (isGeminiModel) {
        const baseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
        fullApiUrl = `${baseUrl}/v1beta/models/${model}:generateContent?key=${apiKey}`;
    } else if (isQwenModel) {  // DashScope Qwen 的专属路径        
        // 使用你的自定义代理，路径由 Worker 自动拼接
        // 为了代理环境下可以执行所以固定赋值可以访问的地址
        const baseUrl = "/api/qwenproxy"
        //const baseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
        
        fullApiUrl = `${baseUrl}/api/v1/services/aigc/text-generation/generation`;
        
        // 【关键修改】使用 X-API-Key 而不是 Authorization
        headers['X-API-Key'] = apiKey; // ← 不要加 Bearer
        
        // 可选：如果你的 Worker 需要 Content-Type（通常需要）
        headers['Content-Type'] = 'application/json';
        
        // 注意：X-DashScope-Async 不再需要，因为你的 Worker 是通用代理
        // 如果 DashScope 后端仍需要，可保留；否则建议移除
        // headers['X-DashScope-Async'] = 'disable'; // 删除或注释掉
    } else {
        fullApiUrl = (apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl) + "/v1/chat/completions";
        // 非 Gemini 模型需要在 Header 里传 Key
        headers['Authorization'] = `Bearer ${apiKey}`;
    }

    // 3. 构造 Body
     // ═══════════════════════════════════════════════
    // 【星语上下文注入】与 Prompt 完全解耦
    // ═══════════════════════════════════════════════
        // ═══════════════════════════════════════════════
    // 【星语上下文】原有逻辑
    // ═══════════════════════════════════════════════
    const ctxMessages = (window.starContext && window.starContext.getAll().length > 0)
      ? window.starContext.getContextMessages()
      : [];
    const ctxSystemContent = ctxMessages.length > 0 ? ctxMessages[0].content : '';

    // ═══════════════════════════════════════════════
    // 【星际领航员模式】判断
    // ═══════════════════════════════════════════════
    const isNavigatorMode = window.currentSelectedLeader?.id === 'interstellar_navigator';

    // ═══════════════════════════════════════════════
    // 【星空专栏融合模式】判断 —— 新增
    // ═══════════════════════════════════════════════
    const isStarryFusionMode = window.currentSelectedLeader?._isStarryCard === true &&  window.currentSelectedLeader?._cardType === 'fusion';

    // ═══════════════════════════════════════════════
    // 【系统指令合并】上下文 + 领航员指令 + 融合体指令（可叠加）
    // ═══════════════════════════════════════════════
    let finalSystemContent = '';
    if (ctxSystemContent) finalSystemContent += ctxSystemContent + '\n\n';
    
    if (isNavigatorMode) {
        finalSystemContent += buildNavigatorSystemPrompt(currentLang);
    } else if (isStarryFusionMode) {
        // 直接传 virtualLeader，函数内部兼容处理
        finalSystemContent += buildFusionSystemPrompt(window.currentSelectedLeader, currentLang);
    }
    
    finalSystemContent = finalSystemContent.trim();

    // 3. 构造 Body
    let requestBody;

    if (isGeminiModel) {
      const contents = [];
      
      if (isNavigatorMode) {
        // 领航员模式：合并 system 内容 + 用户原始问题
        const userQuestion = document.getElementById('userQuestion').value.trim();
        const geminiUserContent = finalSystemContent 
          ? finalSystemContent + "\n\n用户问题：" + userQuestion
          : userQuestion;
        contents.push({ role: "user", parts: [{ text: geminiUserContent }] });
      } else {
        // 普通模式：原有逻辑
        if (finalSystemContent) {
          contents.push({ role: "user", parts: [{ text: finalSystemContent }] });
        }
        contents.push({ role: "user", parts: [{ text: promptText }] });
      }
      
      requestBody = {
        contents: contents,
        generationConfig: { temperature: 0.7 }
      };

    } else if (isQwenModel) {
      const messages = [];
      
      if (finalSystemContent) {
        messages.push({ role: "system", content: finalSystemContent });
      }
      
      messages.push({ 
        role: "user", 
        content: isNavigatorMode 
          ? document.getElementById('userQuestion').value.trim() 
          : promptText 
      });
      
      requestBody = {
        model: model,
        input: { messages: messages },
        parameters: {
          temperature: 0.7,
          plugins: { web_search: {} },
          function_call: "auto"
        }
      };

    } else {
      // OpenAI 兼容格式
      const messages = [];
      
      if (finalSystemContent) {
        messages.push({ role: "system", content: finalSystemContent });
      }
      
      messages.push({ 
        role: "user", 
        content: isNavigatorMode 
          ? document.getElementById('userQuestion').value.trim() 
          : promptText 
      });
      
      requestBody = {
        model: model,
        messages: messages,
        temperature: 0.7,
      };
    }

    // UI 状态更新
    aiResponseTextElement.textContent = ''; 
    aiResponseArea.style.display = 'block';
    loadingIndicator.style.display = 'inline-block';
    getAIResponseButton.disabled = true;

    try {
        const response = await fetch(fullApiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ detail: response.statusText }));
            throw new Error(`API Error: ${response.status} - ${errorData.error?.message || errorData.detail || 'Unknown error'}`);
        }
        
        const data = await response.json();
        // 【修正 1】先定义变量，确保用来存储原始文本
        let rawContent = "";
        if (isGeminiModel) {
            if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                // 【修正 2】先赋值给变量，而不是直接操作 DOM
                rawContent = data.candidates[0].content.parts[0].text.trim();
            } else {
                throw new Error("Gemini 返回数据结构异常");
            }
         } else if (isQwenModel) {
            // Qwen 响应解析
            if (data.output && data.output.text) {
                rawContent = data.output.text.trim();
            } else {
                console.error("Qwen response:", data);
                throw new Error("Qwen 返回数据结构异常或配额不足");
            }
        } else {
            if (data.choices && data.choices[0]?.message?.content) {
                // 【修正 2】同上
                rawContent = data.choices[0].message.content.trim();
            } else {
                throw new Error("API 返回数据结构异常");
            }
        } 

        // 【修正 3】现在 rawContent 有值了，把它存入 dataset
        aiResponseTextElement.dataset.raw = rawContent;

        // 【修正 4】主界面显示：如果主界面也想支持 Markdown，可以在这里也用 marked.parse(rawContent)
        // 这里为了保持和你原逻辑一致（可能主界面只需要简单显示），我们保留直接赋值，或者简单的换行处理
        // 建议：如果主界面也想好看，也可以变成 aiResponseTextElement.innerHTML = marked.parse(rawContent);    
        aiResponseTextElement.innerHTML = rawContent.replace(/\n/g, "<br>");
        
         // --- [新增]画布保存到对话历史 ---
        // 1. 获取纯净的用户问题 (不带Prompt指令)
        const rawUserQuestion = document.getElementById('userQuestion').value.trim();
    
        // 2. 准备北极星的元数据 (防止当前没选人报错)
        const leaderMeta = window.currentSelectedLeader ? {
            name: getFieldValue(window.currentSelectedLeader.name, currentLang),
            field: getFieldValue(window.currentSelectedLeader.field, currentLang),
            contribution: getFieldValue(window.currentSelectedLeader.contribution, currentLang)
        } : { name: 'North Star', field: 'General AI', contribution: '' };
    
        // 3. 存入历史 - 用户提问
        conversationHistory.push({
            id: Date.now() + '_user',
            role: 'user',
            text: rawUserQuestion || "（用户仅生成了提示词，未填写问题）", // 兜底
            leaderInfo: null, // 用户不需要leader信息
            timestamp: new Date()
        });
        saveCanvasSession();  // ← 追加这行
        
        // 4. 存入历史 - AI回答
        conversationHistory.push({
            id: Date.now() + '_ai',
            role: 'ai',
            text: rawContent, 
            leaderInfo: leaderMeta, // 保存这一刻的北极星状态
            timestamp: new Date()
        });
        saveCanvasSession();  // ← 追加这行
        
        // 如果画布当前是打开的，实时刷新
        if(isCanvasModeOpen) {
            renderDialogueCanvas();
        }
        
        // 数学公式渲染
        if (window.MathJax) {
            MathJax.typesetPromise([aiResponseTextElement]).catch(err => console.error('MathJax error:', err));
        }

    } catch (error) {
        console.error('Error calling API:', error);
        aiResponseTextElement.textContent = `发生错误: ${error.message}`;
    } finally {
        loadingIndicator.style.display = 'none';
        getAIResponseButton.disabled = false;
    }
}

async function copyContentToClipboard() {
    const aiResponseArea = document.getElementById('ai-response-area');
    const aiResponseTextElement = document.getElementById('aiResponseText');
    const promptDisplayArea = document.getElementById('prompt-display-area');
    const generatedPromptTextElement = document.getElementById('generatedPromptText');

    let textToCopy = '';
    let contentTypeKey = '';

    if (aiResponseArea.style.display !== 'none' && aiResponseTextElement.textContent.trim()) {
        textToCopy = aiResponseTextElement.textContent.trim();
        contentTypeKey = 'contentTypeAiResponse';
    }
    else if (promptDisplayArea.style.display !== 'none' && generatedPromptTextElement.value.trim()) {
        textToCopy = generatedPromptTextElement.value.trim();
        contentTypeKey = 'contentTypePrompt';
    }

    if (textToCopy) {
        try {
            await navigator.clipboard.writeText(textToCopy);
            alert(`${translations[currentLang][contentTypeKey]} ${translations[currentLang].copiedToClipboard}`);
        } catch (err) {
            console.error('Copy failed: ', err);
            alert(`${translations[currentLang].copyFailed}${err.message}.${translations[currentLang].copyFailedHint}`);
        }
    } else {
        alert(translations[currentLang].nothingToCopy);
    }
}

// --- 新增功能：合并拷贝用户问题和AI回答 ---
function copyConversationToClipboard() {
    // 1. 获取内容
    // 优先获取生成的 Prompt，如果没有则获取用户输入的原始问题
    const generatedPrompt = document.getElementById('generatedPromptText').value;
    const userQuestion = document.getElementById('userQuestion').value;
    const finalQuestion = generatedPrompt ? generatedPrompt : userQuestion;
    
    // 获取 AI 回复内容 (innerText 获取纯文本)
    const aiResponse = document.getElementById('aiResponseText').innerText;

    // 2. 检查是否有内容
    if (!finalQuestion && !aiResponse) {
        // 如果没有任何内容，可以在这里处理，或者直接返回
        return; 
    }

    // 3. 格式化合并文本
    const clipboardText = `【问题 / Question】:\n${finalQuestion}\n\n【北极星答复 / NorthStar Answer】:\n${aiResponse}`;

    // 4. 写入剪贴板
    navigator.clipboard.writeText(clipboardText).then(() => {
        // 5. 获取当前的成功提示语 (支持 i18n)
        // 假设你有一个全局的 translations 对象存储了所有翻译
        // 或者我们可以直接通过一个隐藏元素或者手动判断来获取文本
        
        let successMsg = "已拷贝到粘贴板！"; // 默认中文
        
        // 尝试从翻译对象中获取 (假设 locale.js 定义了 translations 变量和 currentLanguage 变量)
        if (typeof translations !== 'undefined' && typeof currentLanguage !== 'undefined') {
            if (translations[currentLanguage] && translations[currentLanguage]['msgCopySuccess']) {
                successMsg = translations[currentLanguage]['msgCopySuccess'];
            }
        } else {
             // 简单的回退机制：如果检测到 html lang 不是 zh-CN，则显示英文
             const lang = document.documentElement.lang || 'zh-CN';
             if (lang !== 'zh-CN') {
                 successMsg = "Merged Copy [Question] & [NorthStar Answer] to Clipboard!";
             }
        }
        alert(successMsg);
    }).catch(err => {
        console.error('无法拷贝文本: ', err);
    });
}

const endpointModelMap = {
    "https://api.deepseek.com": [
        { value: "deepseek-chat", labelKey: "modelDeepSeekV3" }
    ],
    // 新增：你的自定义 Cloudflare Gemin代理接入点
    "https://geminiapi.aivibeinvest.com": [
        { value: "gemini-2.5-flash@proxy", labelKey: "modelGeminiFlash" },
    ],
    "https://generativelanguage.googleapis.com": [
        { value: "gemini-2.5-flash", labelKey: "modelGeminiFlash" }
    ],
    "https://api.openai.com": [
        { value: "gpt-4o-mini", labelKey: "modelGpt4oMini" }
    ],
    // 自定义 Qwen 代理（BYOK 模式）<- 新增：阿里云 DashScope - Qwen 系列
    "https://qwenapi.aivibeinvest.com": [
        { value: "qwen-max", labelKey: "modelQwenMax" },
        { value: "qwen-plus", labelKey: "modelQwenPlus" }
    ]
};

function populateEndpointSelect(selectedEndpoint = null) {
    apiEndpointSelect.innerHTML = ""; // Clear existing options
    let hasDefaultEndpoint = false;

    // Add a default "Select an endpoint" option if no specific endpoint is passed initially
    if (!selectedEndpoint) {
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = translations[currentLang].selectApiEndpoint || "选择一个接入点";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        apiEndpointSelect.appendChild(defaultOption);
    }

    for (const ep in endpointModelMap) {
        const option = document.createElement('option');
        option.value = ep;
        option.textContent = ep;
        if (ep === selectedEndpoint) {
            option.selected = true;
            hasDefaultEndpoint = true;
        }
        apiEndpointSelect.appendChild(option);
    }

    // If selectedEndpoint was provided but not found, or no default,
    // ensure a valid option is selected or the default prompt is shown.
    if (selectedEndpoint && !hasDefaultEndpoint && apiEndpointSelect.options.length > 0) {
        apiEndpointSelect.value = selectedEndpoint; // Try to set it even if not explicitly added, might exist.
        if (apiEndpointSelect.value !== selectedEndpoint) { // If it didn't set, fallback
            apiEndpointSelect.selectedIndex = 0;
            // If the first option is the "Select an endpoint" prompt, then set its value to empty
            if (apiEndpointSelect.options[0].value === "") {
                apiEndpointSelect.value = "";
            }
        }
    }
}


function updateModelSelectByEndpoint(endpoint, selectedModelValue = null) {
    apiModelSelect.innerHTML = "";
    apiModelSelect.disabled = true;

    const modelsForEndpoint = endpointModelMap[endpoint];

    if (!endpoint || !modelsForEndpoint || modelsForEndpoint.length === 0) {
        const noModelsOption = document.createElement('option');
        noModelsOption.value = "";
        noModelsOption.textContent = translations[currentLang].noModelsForEndpoint || "该接入点无预设模型";
        noModelsOption.disabled = true;
        noModelsOption.selected = true;
        apiModelSelect.appendChild(noModelsOption);
        apiKeyInput.value = '';
        apiDefaultModelCheck.checked = false;
        return;
    }

    apiModelSelect.disabled = false;
    let hasSelectedModel = false;

    modelsForEndpoint.forEach(model => {
        const option = document.createElement('option');
        option.value = model.value;
        option.textContent = translations[currentLang][model.labelKey] || model.value;
        if (model.value === selectedModelValue) {
            option.selected = true;
            hasSelectedModel = true;
        }
        apiModelSelect.appendChild(option);
    });

    // If selectedModelValue was provided but not found in the list, try to select the first one
    if (selectedModelValue && !hasSelectedModel && apiModelSelect.options.length > 0) {
        apiModelSelect.selectedIndex = 0;
        selectedModelValue = apiModelSelect.value; // Update selectedModelValue to the actually selected one
    } else if (!selectedModelValue && apiModelSelect.options.length > 0) {
        // If no specific model value was requested, just select the first one
        apiModelSelect.selectedIndex = 0;
        selectedModelValue = apiModelSelect.value;
    }

    // Now load the specific settings for the *currently selected* model in the dropdown
    const allSettings = getAllApiSettings();
    const cfg = allSettings[selectedModelValue] || {};

    apiKeyInput.value = cfg.apiKey || '';
    apiDefaultModelCheck.checked = Boolean(cfg.isDefaultModel);
}

function updateEndpointByModel(modelValue) {
    if (!modelValue) {
        // If no model is selected, clear everything
        populateEndpointSelect('');
        updateModelSelectByEndpoint('');
        return;
    }

    const allSettings = getAllApiSettings();
    const specificModelConfig = allSettings[modelValue];

    if (specificModelConfig && specificModelConfig.endpoint) {
        apiEndpointSelect.value = specificModelConfig.endpoint;
        apiKeyInput.value = specificModelConfig.apiKey || '';
        apiDefaultModelCheck.checked = specificModelConfig.isDefaultModel || false;
        updateModelSelectByEndpoint(specificModelConfig.endpoint, modelValue);
    } else {
        // If the selected model doesn't have saved settings,
        // find its endpoint from the hardcoded map and try to populate.
        for (const ep in endpointModelMap) {
            if (endpointModelMap[ep].some(m => m.value === modelValue)) {
                apiEndpointSelect.value = ep;
                // No API key or default status if not saved
                apiKeyInput.value = '';
                apiDefaultModelCheck.checked = false;
                updateModelSelectByEndpoint(ep, modelValue);
                break;
            }
        }
    }
}

function fillSampleQuestion(type) {
    const textarea = document.getElementById('userQuestion');
    const key = 'sampleQuestionText' + type;
    
    const text = translations[currentLang]?.[key] 
              || translations['zh-CN']?.[key] 
              || '';
    
    textarea.value = text;
    
    // 对应图标触发点击反馈动画
    const iconClass = type === 1 ? '.sample-q-icon' 
                    : type === 2 ? '.sample-q-icon2' 
                    : '.sample-q-icon3';
    const icon = document.querySelector(iconClass);
    if (icon) {
        icon.classList.add('active');
        setTimeout(() => icon.classList.remove('active'), 600);
    }
}

// --- 沉浸模式逻辑 ---
const immersiveModal = document.getElementById('immersiveModal');

function handleImmersiveMode() {
    // 1. 获取参数
    const pLeader = window.currentSelectedLeader; // 参数(1)
    const pUserQuestion = document.getElementById('userQuestion').value; // 参数(2)
    const pPrompt = document.getElementById('generatedPromptText').value; // 参数(3)
    const pAiResponse = document.getElementById('aiResponseText').innerHTML; // 参数(4)

    // 2. 逻辑判断
    if (!pLeader) {
        // 如果参数(1)为空，跟点击生成问题按钮时的处理一样 (弹出提示)
        alert(translations[currentLang].alertSelectLeaderFirst);
        return;
    }

    // 3. 如果参数(1)不为空，弹出模态框
    // 这里可以在控制台打印一下参数，模拟"传入处理"
    console.log("Entering Immersive Mode with:", {
        leader: pLeader.name,
        question: pUserQuestion,
        prompt: pPrompt,
        response: pAiResponse
    });

    openImmersiveModal();
}

function openImmersiveModal() {
    if (immersiveModal) {
        immersiveModal.style.display = 'block';
    }
}

function closeImmersiveModal() {
    if (immersiveModal) {
        immersiveModal.style.display = 'none';
    }
}

// 注册点击外部关闭事件 (合并到现有的 window.onclick 或添加监听器)
window.addEventListener('click', function(event) {
    if (event.target == immersiveModal) {
        closeImmersiveModal();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. 【优先】初始化语言设置
    // 先确定语言，防止后续渲染时语言不正确导致二次刷新
    const preferredLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language || navigator.userLanguage;
    let targetLang = 'zh-CN';

    if (preferredLang && translations[preferredLang]) {
        targetLang = preferredLang;
    } else if (browserLang.startsWith('en') && translations['en']) {
        targetLang = 'en';
    }
    
    // 更新全局变量
    window.currentLang = targetLang;
    const langSelect = document.getElementById('languageSelector');
    if (langSelect) langSelect.value = targetLang;

    // 2. 加载 API 设置 (不影响 UI渲染，可并行)
    if (typeof loadApiSettings === 'function') {
        loadApiSettings();
    }

    // 3. 设置语言文本 (静态文本替换)
    if (typeof setLanguage === 'function') {
        setLanguage(targetLang);
    }

    // 4. 【关键】处理 Tab 状态
    // 确保在渲染网格前，Tab 已经是 active 状态，否则 filterModernGrid 找不到容器会报错或渲染为空
    if (typeof openTab === 'function') {
        // 默认打开 AI，或者恢复上次的 Tab（如果有相关逻辑）
        openTab(null, 'ai'); 
    }
    
    // 确保 Tab 按钮状态同步
    const firstTabButton = document.querySelector('.tab-button[onclick*="ai"]');
    if (firstTabButton && !document.querySelector('.tab-button.active')) {
         firstTabButton.classList.add('active');
    }

    // 5. 【核心修复】初始化 UI 风格与数据渲染
    // 这一步会根据 localStorage 判断是 'modern' 还是 'traditional'
    // switchUIStyle 内部会触发 filterModernGrid，所以我们不需要手动调 onLanguageChanged 了
    initUIStyle(); 

    // 6. 绑定搜索框与按钮事件 (防止重复绑定)
    bindModernEvents();

    // 7. 【致命冲突修复】仅在“非现代模式”下调用旧的 populateLeaders
    const currentStyle = localStorage.getItem('northstarUIStyle');
    if (currentStyle !== 'modern' && typeof populateLeaders === 'function') {
        console.log('[Init] 传统模式，执行 populateLeaders');
        populateLeaders();
    } else {
        console.log('[Init] 现代模式，跳过 populateLeaders，由 switchUIStyle 接管渲染');
    }

    // 8. 绑定 API 下拉框事件
    // 直接使用文件最上方定义的正确变量，或者用 getElementById('apiEndpoint')
    if (apiEndpointSelect && typeof updateModelSelectByEndpoint === 'function') {
        apiEndpointSelect.addEventListener('change', function() {
            updateModelSelectByEndpoint(this.value);
        });
    }
    
    if (apiModelSelect && typeof updateEndpointByModel === 'function') {
        apiModelSelect.addEventListener('change', function() {
            updateEndpointByModel(this.value);
        });
    }

    // 9. 处理窗口调整
    window.addEventListener('resize', updateAllScrollButtonStates);
});

// 辅助函数：将事件绑定逻辑抽离，避免闭包重复引用
function bindModernEvents() {
    document.querySelectorAll('.modern-search-input').forEach(el => {
        // 移除旧监听器比较麻烦，这里利用 dataset 标记防止重复绑定
        if (el.dataset.bound) return;
        el.addEventListener('input', (e) => {
            filterModernGrid(e.target);
        });
        el.dataset.bound = 'true';
    });

    document.querySelectorAll('.search-icon').forEach(el => {
        if (el.dataset.bound) return;
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleModernSearch(el);
        });
        el.dataset.bound = 'true';
    });
}

/* --- 音乐播放控制逻辑 --- */
// 1. 主按钮点击：播放/暂停指定音乐
function toggleMusic(btnElement) {
    var audio = document.getElementById("bgMusic");
    
    // 检查 audio 元素是否存在
    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => {
            // 播放成功，添加旋转动画类
            btnElement.classList.add("music-playing");
        }).catch(error => {
            console.error("播放失败 (可能是浏览器策略限制自动播放):", error);
        });
    } else {
        audio.pause();
        // 暂停，移除旋转动画类
        btnElement.classList.remove("music-playing");
    }
}

// 2. 小标记点击：随机播放 (未来功能)
function playRandomMusic(event) {
    // 关键：阻止事件冒泡！
    // 这样点击小圆点时，不会触发父级按钮的 toggleMusic
    event.stopPropagation(); 
    
    console.log("未来功能：随机播放触发");
    
    // 这里留作未来扩展：
    // var songs = ['song1.mp3', 'song2.mp3', ...];
    // var randomSong = songs[Math.floor(Math.random() * songs.length)];
    // var audio = document.getElementById("bgMusic");
    // audio.src = randomSong;
    // audio.play();
}

// 设置模态框内部标签页切换
function switchSettingsTab(event, tabId) {
    // 阻止默认事件
    event.preventDefault();

    // 隐藏所有设置标签页内容
    const tabContents = document.querySelectorAll('.settings-tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });

    // 移除所有按钮的 active 状态
    const tabBtns = document.querySelectorAll('.settings-tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    // 显示目标标签页，激活对应按钮
    document.getElementById(tabId).style.display = 'block';
    event.currentTarget.classList.add('active');
}


/* --- [新增] 优雅阅读模式逻辑 --- */
function parseMarkdownWithMath(rawText) {
    if (!rawText) return "";

    // 1. 存储公式的临时数组
    const mathSegments = [];
    
    // 2. 保护公式：将 LaTeX 内容替换为占位符
    const protectedText = rawText.replace(
        /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\(.*?\\\)|(?<!\\)\$.*?(?<!\\)\$)/gm, 
        (match) => {
            mathSegments.push(match);
            return `@@MATH_PLACEHOLDER_${mathSegments.length - 1}@@`;
        }
    );

    // 【核心新增】3. 防止尖括号被 Markdown 解析器识别为 HTML 标签
    // 例如：<<文章名>>、<<某标签> 会被 marked.js 吞掉或解析为 DOM 节点
    // 注意：先转义 &，再转义 < >，避免双重转义
    const safeText = protectedText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    // 4. Markdown 转换（此时 < > 已安全，不会被视为 HTML 标签）
    let htmlContent = "";
    if (typeof marked !== 'undefined') {
        htmlContent = marked.parse(safeText);
    } else {
        htmlContent = safeText.replace(/\n/g, "<br>");
    }

    // 5. 还原公式（公式内部可能含 < >，用 escapeHtml 避免破坏 HTML 结构）
    const finalHtml = htmlContent.replace(/@@MATH_PLACEHOLDER_(\d+)@@/g, (match, index) => {
        return escapeHtml(mathSegments[index]); 
    });

    return finalHtml;
}

function parseMarkdownWithMath(rawText) {
    if (!rawText) return "";

    // 1. 存储公式的临时数组
    const mathSegments = [];
    
    // 2. 保护公式：将 LaTeX 内容替换为占位符
    // 使用 @@ 而不是 __，避免被 marked 解析为粗体/斜体
    const protectedText = rawText.replace(
        /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\(.*?\\\)|(?<!\\)\$.*?(?<!\\)\$)/gm, 
        (match) => {
            mathSegments.push(match);
            // 【修改点1】使用 @@ 包裹，或者其他不会触发 Markdown 渲染的字符
            return `@@MATH_PLACEHOLDER_${mathSegments.length - 1}@@`;
        }
    );

    // 3. Markdown 转换
    let htmlContent = "";
    if (typeof marked !== 'undefined') {
        htmlContent = marked.parse(protectedText);
    } else {
        htmlContent = protectedText.replace(/\n/g, "<br>");
    }

    // 4. 还原公式
    // 【修改点2】正则匹配 @@...@@
    const finalHtml = htmlContent.replace(/@@MATH_PLACEHOLDER_(\d+)@@/g, (match, index) => {
        // 【优化】防止公式中的 < > 等符号被浏览器当作 HTML 标签解析错误
        // 如果你的公式里包含 a < b，直接 innerHTML 会出问题
        return escapeHtml(mathSegments[index]); 
    });

    return finalHtml;
}

/* --- [新增] 文字流动控制函数 --- */
function triggerTextFlowEffect(containerId, scrollContainerId) {
    const container = document.getElementById(containerId);
    const scrollArea = document.getElementById(scrollContainerId);
    if (!container || !scrollArea) return;

    // 获取所有顶层区块（段落、标题、列表、引用等）
    const elements = container.children;
    
    // 使用 IntersectionObserver 监听元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 元素进入视口，触发流动动画
                entry.target.classList.add('flow-animate');
                // 触发后停止观察，保持常驻
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: scrollArea, // 监听滚动区域
        threshold: 0.1,   // 露出10%就开始流动
        rootMargin: "0px 0px -30px 0px" // 底部视口稍微往上一点触发，更有流动感
    });

    Array.from(elements).forEach((el, index) => {
        // 首屏可见的元素（假设前5个），给予阶梯式延迟，产生“哗啦啦”流下来的感觉
        if (index < 6) {
            el.style.animationDelay = `${index * 0.15}s`;
        } else {
            // 滚动出来的元素，仅给微小延迟
            el.style.animationDelay = `0.1s`;
        }
        // 开始观察
        observer.observe(el);
    });
}

async function openElegantMode() {
    if (isElegantModeOpen) return;
    
    const userQuestionEl = document.getElementById('userQuestion');
    const aiResponseEl = document.getElementById('aiResponseText');
    const elegantQuestionBox = document.getElementById('elegantQuestionText');
    const elegantAnswerBox = document.getElementById('elegantAnswerText');
    const modal = document.getElementById('elegantModal');

    const rawAiContent = aiResponseEl.dataset.raw || aiResponseEl.innerText;
    if (!rawAiContent || rawAiContent.trim() === "") {
        //alert("✦ 星辰尚未汇聚，请先获取北极星的指引。");
        alert(translations[currentLang].alertNoNorthStarResponse);
        return;
    }

    elegantQuestionBox.innerText = userQuestionEl?.value || "「 探寻北极星视角的深度洞见 」";
    
    // 【修改点1】在解析前，先给容器加上准备流动的 class
    elegantAnswerBox.classList.add('flowing-ready');
    elegantAnswerBox.innerHTML = parseMarkdownWithMath(rawAiContent);

    modal.style.display = 'flex'; 
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            isElegantModeOpen = true;
        });
    });

    // 4. 异步且安全地触发 MathJax 渲染
    if (window.MathJax && window.MathJax.typesetPromise) {
        try {
            await MathJax.typesetPromise([elegantAnswerBox]);
        } catch (err) {
            console.warn('✦ 星语公式渲染出现微小扰动:', err);
        }
    }
    
    // 【修改点2】确保 MathJax 渲染完成（高度撑开）后，再触发文字流动，防止排版跳动
    // 传入 答案容器ID 和 滚动区域ID (.elegant-content)
    // 请确保你的 .elegant-content 有一个 id="elegantContentArea" 
    // 如果没有，我在下面给了兼容写法，直接传 class 选择器获取
    const scrollContainer = document.querySelector('.elegant-content');
    if (!scrollContainer.id) scrollContainer.id = 'elegantContentArea'; // 临时赋个ID
    
    triggerTextFlowEffect('elegantAnswerText', 'elegantContentArea');
}

function closeElegantMode() {
    if (!isElegantModeOpen) return;
    
    const modal = document.getElementById('elegantModal');
    modal.classList.remove('show');
    
    // 监听动画结束事件，比硬编码 setTimeout 更优雅准确
    modal.addEventListener('transitionend', function handler() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // 恢复默认滚动
        modal.removeEventListener('transitionend', handler);
        isElegantModeOpen = false;
    }, { once: true });
}

// 点击模态框背景关闭
document.getElementById('elegantModal').addEventListener('click', function(e) {
    // 如果点击的是背景（elegantModal）或 container 外部区域，则关闭
    // 注意：点击 .elegant-content 内部不应关闭
    if (e.target === this) {
        closeElegantMode();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isElegantModeOpen) closeElegantMode();
});


/* --- 对话画布逻辑 (Dialogue Canvas Logic) --- */
function openDialogueCanvas() {
    isCanvasModeOpen = true;
    const modal = document.getElementById('dialogueCanvasModal');
    modal.style.display = 'block';
    
    // 延时一点渲染，确保DOM可见
    setTimeout(() => {
        modal.style.opacity = '1';
        renderDialogueCanvas();
    }, 10);
    
    document.body.style.overflow = 'hidden'; // 锁定主页滚动
}

function closeDialogueCanvas() {
    isCanvasModeOpen = false;
    const modal = document.getElementById('dialogueCanvasModal');
    modal.style.opacity = '0';
    
    // ═══ 停止朗读 ═══
    if (window.canvasTTS?.isPlaying) {
        window.canvasTTS.stop();
    }
    // 恢复朗读按钮状态（无论是否在播放）
    const ttsBtn = document.getElementById('btn-canvas-tts');
    const ttsIcon = document.getElementById('tts-icon');
    if (ttsBtn) {
        ttsBtn.classList.remove('tts-active', 'tts-paused');
        ttsBtn.title = window.currentLang === 'zh-CN' ? '朗读' : 'Read Aloud';
    }
    if (ttsIcon) ttsIcon.className = 'fas fa-volume-high';
    
    // ═══ 停止背景音乐 ═══
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;  // 可选：重置到开头
    }
    // 恢复所有音乐按钮状态
    document.querySelectorAll('.music-wrapper, .music-wrapper-canvas').forEach(btn => {
        btn.classList.remove('music-playing', 'music-active');
    });

    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 500);
}

/**
 * 合并导入历史与当前会话历史，返回用于渲染/导出/操作的完整数组
 * @param {Array|null} imported - 从 MD 导入的历史（可能为 null）
 * @param {Array} current - 当前会话的 conversationHistory
 * @returns {Array} 合并后的完整历史数组（imported 在前，current 在后）
 */
function getMergedHistory(imported, current) {
    const result = [];
    
    // 先放入导入的历史（如果存在）
    if (imported && Array.isArray(imported) && imported.length > 0) {
        result.push(...imported);
    }
    
    // 再追加当前会话的新节点
    if (current && Array.isArray(current) && current.length > 0) {
        result.push(...current);
    }
    
    return result;
}

function clearCanvasHistory() {
    // 1. 判断当前是否有内容（考虑导入历史）
    const currentHistory = getMergedHistory(importedHistory, conversationHistory);
    if (!currentHistory || currentHistory.length === 0) {
        alert("画布已经是空的了。");
        return;
    }

    // 2. 提示语稍作调整，提醒用户会清空导入内容
    /*
    const isConfirmed = confirm(
        "⚠️ 高风险操作\n\n" +
        "您确定要清空整个画布吗？\n" +
        "此操作将移除所有当前的思维节点（包括任何从MD导入的历史内容），且无法恢复。\n" +
        "(主界面的对话记录不会受影响)"
    );*/

    // 修改后
    const isConfirmed = confirm(translations[currentLang].confirmClearCanvas);

    // 3. 执行清空
    if (isConfirmed) {
        conversationHistory = [];           // 清空原有对话历史
        importedHistory = null;             // ★ 同时清除导入的历史
        clearCanvasSession();  // ← 追加这行
        renderDialogueCanvas();             // 重绘
        
        // 可选：轻提示
        // alert("画布已清空");
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('inspirationSidebar');
    sidebar.classList.toggle('open');
}

/* --- 核心渲染函数 (renderDialogueCanvas) - 全球化增强版 --- */
function renderDialogueCanvas() {
    // 内部翻译辅助方法
    const _t = (key) => {
        const lang = window.currentLang || 'zh-CN';
        const dict = window.translations?.[lang] || window.translations?.['zh-CN'] || {};
        return dict[key] || key;
    };

    const container = document.getElementById('thoughtStreamContent');
    const svgEl = document.getElementById('thoughtTrailsSvg');
    container.innerHTML = '';
    lastDrawnHash = '';

    const history = getMergedHistory(importedHistory, conversationHistory);
    if (history.length === 0) {
        container.innerHTML = `<div style="text-align:center; color:#888; margin-top:100px; font-family:'Noto Serif SC', serif">
            ${_t('canvasEmptyHint')}<br>${_t('canvasEmptyDesc')}
        </div>`;
        svgEl.innerHTML = '';
        return;
    }

    const fragment = document.createDocumentFragment();

    history.forEach((item, index) => {
        const node = document.createElement('div');
        const isUser = item.role === 'user';
        
        node.className = `thought-node ${isUser ? 'question-node' : 'answer-node'}`;
        node.id = `node-${index}`;

        let contentHTML = '';

        // 修改用户节点渲染逻辑
        if (isUser) {
            contentHTML = `
                <div class="user-avatar-mark"><i class="fas fa-user-astronaut"></i></div>
                <div class="node-content user-handwriting">${escapeHtml(item.text)}</div>
            `;
        } else {
            let processedText = item._processedText;
            if (!processedText) {
                processedText = typeof parseMarkdownWithMath === 'function' 
                    ? parseMarkdownWithMath(item.text) 
                    : item.text.replace(/\n/g, '<br>');
                item._processedText = processedText;
            }

            const info = item.leaderInfo || { name: 'Unknown', field: '', contribution: '' };

            contentHTML = `
                <div class="star-decoration-top"><i class="fas fa-star-of-life"></i></div>
                <div class="leader-header">
                    <div class="leader-name">${info.name}</div>
                    <div class="leader-badges">
                        <span class="badge-field">${info.field}</span>
                    </div>
                </div>
                <div class="leader-contribution-hint" title="${info.contribution}">
                    <i class="fas fa-quote-left"></i> ${info.contribution.substring(0, 30)}...
                </div>
                <div class="node-divider"></div>
                <div class="node-content star-content">${processedText}</div>
                <div class="star-decoration-bottom"><i class="fas fa-feather-alt"></i> North Star Insight</div>
            `;
        }
        
        node.innerHTML = contentHTML;
        node.onclick = (e) => addToInspiration(e, item.text);

        /* ═══════════════════════════════════════════════
           【星语上下文按钮】仅 AI 回答节点显示
           用户提问节点不显示上下文按钮
           ═══════════════════════════════════════════════ */
        if (!isUser) {
            // ── 左侧按钮容器 ──
            const leftActions = document.createElement('div');
            leftActions.className = 'left-actions-bar';
        
            // ── 生成页面按钮 ──
            const pageBtn = document.createElement('button');
            pageBtn.className = 'left-action-btn';
            pageBtn.innerHTML = '<i class="fas fa-file-alt"></i>';
            pageBtn.title = _t('generatePageTitle');
            pageBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                generateNodePage(item);  // ← 同步执行，确保 window.open 不被拦截
            });
            leftActions.appendChild(pageBtn);
        
            // ── 导入封面按钮 ──
            const coverBtn = document.createElement('button');
            coverBtn.className = 'left-action-btn';
            if (item._cover) {
                coverBtn.classList.add('has-cover');
                coverBtn.title = _t('coverImportedTitle');
            } else {
                coverBtn.title = _t('importCoverTitle');
            }
            coverBtn.innerHTML = '<i class="fas fa-image"></i>';
            coverBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                importNodeCover(item, coverBtn);  // ← 也直接传 item
            });
            leftActions.appendChild(coverBtn);
        
            //node.insertBefore(leftActions, node.firstChild);
            node.appendChild(leftActions);
            
            const ctxBtn = document.createElement('button');
            ctxBtn.className = 'right-action-btn ctx-btn';
            ctxBtn.innerHTML = '<i class="fas fa-star"></i>';  
            ctxBtn.title = _t('contextCanvasAddTitle');
            
            ctxBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (!window.starContext) {
                    alert(_t('ctxErrorNotInit'));
                    return;
                }
                
                if (window.starContext.isFull()) {
                    const go = confirm(_t('ctxErrorFullCleanup'));
                    if (go && window.ContextUI) window.ContextUI.openPanel();
                    return;
                }
                
                const res = window.starContext.addFromDialogue(item);
                if (res.success) {
                    ctxBtn.classList.add('just-added');
                    setTimeout(() => ctxBtn.classList.remove('just-added'), 600);
                    
                    if (window.ContextUI && window.ContextUI._renderList) {
                        window.ContextUI._renderList();
                    }
                    
                    const msg = _t('contextToastAdded');
                    const t = document.createElement('div');
                    t.style.cssText = 'position:fixed; bottom:50px; left:50%; transform:translateX(-50%); background:rgba(0,124,240,.12); border:1px solid rgba(0,124,240,.3); color:#007cf0; padding:13px 28px; border-radius:50px; font-size:14px; font-family:"Noto Serif SC",serif; backdrop-filter:blur(12px); z-index:999999; opacity:0; transition:all .35s; pointer-events:none; white-space:nowrap; letter-spacing:1px; box-shadow:0 8px 32px rgba(0,0,0,.3);';
                    t.innerHTML = `<i class="fas fa-star" style="margin-right:8px"></i> ${msg}`;
                    document.body.appendChild(t);
                    requestAnimationFrame(() => requestAnimationFrame(() => t.style.opacity = '1'));
                    setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)'; setTimeout(()=>t.remove(), 350); }, 2200);
                } else {
                    alert(res.message);
                }
            });

            /* ═══════════════════════════════════════════════
               【删除按钮】所有节点保留
            ═══════════════════════════════════════════════ */
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'right-action-btn delete-btn';
            deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
            deleteBtn.title = _t('contextRemoveTitleAttr');
            
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteNode(e, index);
            });

            // node.insertBefore(ctxBtn, node.firstChild);
            // ── 右侧按钮容器 ──
            const rightActions = document.createElement('div');
            rightActions.className = 'right-actions-bar';
            
            rightActions.appendChild(ctxBtn);
            rightActions.appendChild(deleteBtn);
            
            //node.insertBefore(rightActions, node.firstChild);            
            node.appendChild(rightActions);
            
        }

        //node.insertBefore(deleteBtn, node.firstChild); 
        fragment.appendChild(node);
    });

    container.appendChild(fragment);

    if (window.MathJax) {
        const delay = typeof requestIdleCallback !== 'undefined' 
            ? cb => requestIdleCallback(cb, { timeout: 500 })
            : cb => setTimeout(cb, 300);
            
        delay(() => {
            MathJax.typesetPromise([container])
                .then(() => {
                    setTimeout(drawConnections, 100); 
                })
                .catch(err => console.warn('MathJax reflow error:', err));
        });
    } else {
        setTimeout(drawConnections, 200);
    }
}


/* --- 优化版 drawConnections (防抖 + 缓存) --- */
let drawConnectionsTimeout = null;
let lastDrawnHash = '';

function drawConnections() {
    if (drawConnectionsTimeout) clearTimeout(drawConnectionsTimeout);
    drawConnectionsTimeout = setTimeout(() => {
        _doDrawConnections();
    }, 100);
}

function _doDrawConnections() {
    const container = document.getElementById('thoughtStreamContent');
    const svgEl = document.getElementById('thoughtTrailsSvg');
    if (!container || !svgEl) return;
    
    const nodes = container.querySelectorAll('.thought-node');
    
    // 布局未变化则跳过重绘
    const currentHash = Array.from(nodes).map(n => n.offsetTop + ',' + n.offsetHeight).join('|');
    if (currentHash === lastDrawnHash && svgEl.innerHTML !== '') return;
    lastDrawnHash = currentHash;
    
    const newHeight = container.scrollHeight;
    if (svgEl.style.height !== newHeight + 'px') {
        svgEl.style.height = newHeight + 'px';
    }
    
    svgEl.innerHTML = '';
    if (nodes.length < 2) return;

    const fragment = document.createDocumentFragment();
    
    for (let i = 0; i < nodes.length - 1; i++) {
        const current = nodes[i];
        const next = nodes[i+1];
        
        const startX = current.offsetLeft + (current.offsetWidth / 2);
        const startY = current.offsetTop + current.offsetHeight;
        const endX = next.offsetLeft + (next.offsetWidth / 2);
        const endY = next.offsetTop;
        
        if (startY >= endY) continue;
        
        const controlY = (endY - startY) / 2;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${startX} ${startY} C ${startX} ${startY + controlY}, ${endX} ${endY - controlY}, ${endX} ${endY}`);
        path.setAttribute("class", "trail-path");
        fragment.appendChild(path);
    }
    
    svgEl.appendChild(fragment);
}


// 将内容添加到手稿区
function addToInspiration(event, text) {
    if(event) event.stopPropagation();

    const sidebar = document.getElementById('inspirationSidebar');
    const notesDiv = document.getElementById('notesContainer');
    console.log("笔记功能，未来考虑");
    // // 1. 确保侧边栏滑出
    // if(!sidebar.classList.contains('open')) {
    //     sidebar.classList.add('open');
    // }

    // // 2. 创建精美的笔记块
    // const noteBlock = document.createElement('div');
    // noteBlock.className = 'inspiration-note-block'; // 对应上面的CSS
    // noteBlock.contentEditable = "false"; // 建议设为 false，防止用户不小心把格式删乱了，用户可以在块外面打字
    
    // // 截取文本
    // const snippet = text.length > 100 ? text.substring(0, 100) + "..." : text;
    // noteBlock.innerText = snippet;
    
    // // 3. 处理 contenteditable 的插入逻辑
    // // 如果容器是空的（显示placeholder），先清空内容
    // if (notesDiv.innerText.trim() === "") {
    //     notesDiv.innerHTML = "";
    // }
    
    // // 插入笔记块
    // notesDiv.appendChild(noteBlock);
    
    // // 4. 插入一个换行符，方便用户在引用后面打字
    // const spacer = document.createElement('div');
    // spacer.innerHTML = "<br>";
    // notesDiv.appendChild(spacer);

    // // 5. 滚动到底部
    // notesDiv.scrollTop = notesDiv.scrollHeight;
}

// 替换原有的resize监听（需先移除旧监听）
let resizeTimeout = null;
window.addEventListener('resize', () => {
    if (!isCanvasModeOpen) return;
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(drawConnections, 200);
});

/* --- 新增功能逻辑 --- */

// 1. 删除单个节点功能
function deleteNode(event, index) {
    // 1. 阻止事件冒泡 (防止误触其他功能)
    if (event) {
        event.stopPropagation();
    }
    
    // 2. 弹出确认框
   //const isConfirmed = confirm("🗑️ 确认删除\n\n您确定要移除这个对话节点吗？\n删除后，画布上的连线将自动重新连接。");
    const isConfirmed = confirm(translations[currentLang].confirmDeleteNode);

    // 3. 用户点击“确定”后执行
    if (isConfirmed) {
        // 获取导入历史的长度（防止为null报错，默认为0）
        const importedLen = (importedHistory && Array.isArray(importedHistory)) ? importedHistory.length : 0;

        // 【核心修复】判断 index 落在哪个数组里
        if (index < importedLen) {
            // 情况 A: 索引小于导入长度，说明点击的是【导入历史】里的节点
            // 直接从 importedHistory 数组中移除该元素
            importedHistory.splice(index, 1);
        } else {
            // 情况 B: 索引大于等于导入长度，说明点击的是【当前新对话】里的节点
            // 计算它在 conversationHistory 中的相对位置
            const relativeIndex = index - importedLen;
            
            // 安全检查并删除
            if (conversationHistory && conversationHistory[relativeIndex]) {
                conversationHistory.splice(relativeIndex, 1);
            }
        }

        // --- [核心修复] 删除后立即保存到持久化 ---
        saveCanvasSession(); 
        
        // 4. 重新渲染画布 (这时候数据源已经真的变少了)
        renderDialogueCanvas();
    }
}

/* --- 辅助函数：创建全屏封面页 (配合 Named Pages) --- */
function createCoverPage(imagePath, type) {
    const pageContainer = document.createElement('div');
    pageContainer.className = 'print-cover-page';
    
    // 基础样式：Flex布局
    pageContainer.style.display = 'flex';
    pageContainer.style.width = '100%';
    pageContainer.style.height = '100%'; 
    
    // 默认居中
    pageContainer.style.justifyContent = 'center';
    pageContainer.style.alignItems = 'center';

    const img = document.createElement('img');
    img.src = imagePath;
    img.style.width = '100%'; 
    img.style.objectFit = 'contain'; 
    pageContainer.appendChild(img);

    // --- 分页逻辑 ---
    if (type === 'back') {
        pageContainer.style.breakBefore = 'page';
    } else {
        pageContainer.style.breakAfter = 'page';
    }
    return pageContainer;
}

/* --- PDF导出最终版 --- */
/* --- PDF导出最终版 (彻底修复重名冲突与封面排版) --- */
function exportToPDF() {
    console.group("🚀 [PDF Export] Start");
    
    const source = document.getElementById('thoughtStreamContent');
    if (!source) {
        //alert("无可导出内容");
        alert(translations[currentLang].alertNoExportContent);
        return;
    }

    // --- 图片加载追踪器 ---
    const imagePromises = [];
    function trackImageLoad(img) {
        return new Promise((resolve) => {
            if (img.complete && img.naturalHeight !== 0) resolve();
            else { img.onload = resolve; img.onerror = resolve; }
        });
    }

    // 1. 清理旧层
    let oldOverlay = document.getElementById('print-overlay');
    if (oldOverlay) document.body.removeChild(oldOverlay);

    // 2. 创建新层
    const overlay = document.createElement('div');
    overlay.id = 'print-overlay';

    // --- 步骤 A: 注入 Named Page 样式 ---
    const style = document.createElement('style');
    style.innerHTML = `
        @page cover-layout { margin: 0 !important; size: auto; }
        @media print {
            html, body { height: auto !important; overflow: visible !important; margin: 0 !important; }
            #print-overlay { position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; display: block !important; }
            #print-content-wrapper { page: auto; break-before: page; position: relative; width: 100%; display: block !important; }
        }
    `;
    overlay.appendChild(style);

    // ★ 根据当前语言选择封面图片（英文版使用 -En 后缀）
    const isEnglish = (window.currentLang === 'en');
    const cover1Src = isEnglish ? 'images/对话北极星Cover1-EN.jpg' : 'images/对话北极星Cover1.jpg';
    const cover2Src = isEnglish ? 'images/对话北极星Cover2-EN.jpg' : 'images/对话北极星Cover2.jpg';
    const cover3Src = isEnglish ? 'images/对话北极星Cover3-EN.jpg' : 'images/对话北极星Cover3.jpg';

    // --- 步骤 B: 第一页 商业级封面排版 ---
    const coverPage1 = document.createElement('div');
    // 强制内联样式，完美融合深空背景
    coverPage1.style.cssText = 'break-after: page; width: 100%; height: 260mm; display: flex; flex-direction: column; justify-content: center; background-color: #0b111e; margin-bottom: 20px;'; 

    const img1 = document.createElement('img');
    img1.src = cover1Src; 
    img1.style.cssText = 'width: 100%; height: 50%; object-fit: contain; object-position: bottom; margin: 0; padding: 0; display: block; margin-bottom: -1px;'; 
    imagePromises.push(trackImageLoad(img1));
    coverPage1.appendChild(img1);

    const img2 = document.createElement('img');
    img2.src = cover2Src; 
    img2.style.cssText = 'width: 100%; height: 50%; object-fit: contain; object-position: top; margin: 0; padding: 0; display: block; margin-top: -1px;'; 
    imagePromises.push(trackImageLoad(img2));
    coverPage1.appendChild(img2);
    
    overlay.appendChild(coverPage1);

    // --- 步骤 C: 处理对话内容, 重新构建对话内容（修复尖括号丢失）--- */
    const contentWrapper = document.createElement('div');
    contentWrapper.id = 'print-content-wrapper';
    
    const history = getMergedHistory(importedHistory, conversationHistory);
    
    history.forEach((item) => {
        const isUser = item.role === 'user';
        const node = document.createElement('div');
        node.className = `thought-node ${isUser ? 'question-node' : 'answer-node'}`;
    
        if (isUser) {
            // 用户节点：HTML 实体转义，防止 < > 被解析为标签
            node.innerHTML = `
                <div class="print-role-title user-role">🧑 User</div>
                <div class="node-content user-handwriting">${escapeHtml(item.text)}</div>
            `;
        } else {
            // AI 节点：使用已修复的 parseMarkdownWithMath，安全渲染 Markdown
            let processedText = '';
            if (typeof parseMarkdownWithMath === 'function') {
                processedText = parseMarkdownWithMath(item.text);
            } else {
                processedText = escapeHtml(item.text).replace(/\n/g, '<br>');
            }
    
            const info = item.leaderInfo || { name: 'Unknown', field: '', contribution: '' };
    
            node.innerHTML = `
                <div class="print-role-title ai-role">✦ North Star</div>
                <div class="leader-header">
                    <div class="leader-name">${escapeHtml(info.name)}</div>
                    <div class="leader-badges">
                        <span class="badge-field">${escapeHtml(info.field)}</span>
                    </div>
                </div>
                <div class="leader-contribution-hint" title="${escapeHtml(info.contribution || '')}">
                    <i class="fas fa-quote-left"></i> ${escapeHtml(info.contribution?.substring(0, 30) || '')}...
                </div>
                <div class="node-divider"></div>
                <div class="node-content star-content">${processedText}</div>
                <div class="star-decoration-bottom"><i class="fas fa-feather-alt"></i> North Star Insight</div>
            `;
        }
    
        contentWrapper.appendChild(node);
    });
    
    overlay.appendChild(contentWrapper);

    // --- 步骤 D: 最后一页 商业级封底排版 ---
    const backCoverWrapper = document.createElement('div');
    // 强制内联样式，深色背景延伸，居中显示
    backCoverWrapper.style.cssText = 'break-before: page; width: 100%; height: 260mm; display: flex; align-items: center; justify-content: center; background-color: #0f1524;'; 
    
    const img3 = document.createElement('img');
    img3.src = cover3Src;
    img3.style.cssText = 'width: 100%; max-height: 85%; object-fit: contain;'; 
    imagePromises.push(trackImageLoad(img3));
    backCoverWrapper.appendChild(img3);
    
    overlay.appendChild(backCoverWrapper);

    // 3. 挂载
    document.body.appendChild(overlay);

    // 4. 执行打印
    console.log(`⏳ 等待 ${imagePromises.length} 张图片资源...`);
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5000));
    
    Promise.race([Promise.all(imagePromises), timeoutPromise]).then(() => {
        const originalTitle = document.title;
        
        // 文件名设定
        let finalName = "对话记录";
        if (typeof getExportFileName === 'function') {
            finalName = getExportFileName();
        } else {
            const d = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            finalName = `对话北极星_${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
        }

        document.title = finalName;
        console.log("📄 文件名已设置为:", finalName);

        const mediaQueryList = window.matchMedia('print');
        
        // 备用清理机制
        const backupCleanup = setTimeout(() => {
            document.title = originalTitle;
            if (document.body.contains(overlay)) document.body.removeChild(overlay);
            if (mediaQueryList.removeEventListener) mediaQueryList.removeEventListener('change', handlePrintChange);
            else mediaQueryList.removeListener(handlePrintChange);
            console.groupEnd();
        }, 10000); 
        
        const handlePrintChange = (event) => {
            if (!event.matches) {
                clearTimeout(backupCleanup);
                setTimeout(() => {
                    document.title = originalTitle;
                    if (document.body.contains(overlay)) document.body.removeChild(overlay);
                    overlay.innerHTML = "";
                    if (mediaQueryList.removeEventListener) mediaQueryList.removeEventListener('change', handlePrintChange);
                    else mediaQueryList.removeListener(handlePrintChange);
                    console.groupEnd();
                }, 500); 
            }
        };
        
        if (mediaQueryList.addEventListener) mediaQueryList.addEventListener('change', handlePrintChange);
        else mediaQueryList.addListener(handlePrintChange);
        
        setTimeout(() => {
            if (document.title !== finalName) document.title = finalName;
            window.print();
        }, 300);
    });
}

/* --- 新增：导出为 HTML 功能 --- */
/* --- 新增：导出为 HTML 功能（修复尖括号丢失）--- */
function exportToHTML() {
    const history = getMergedHistory(importedHistory, conversationHistory);
    
    if (!history || history.length === 0) {
        alert(translations[currentLang].alertCanvasEmpty || "画布为空，无法导出。");
        return;
    }

    let fileName = "对话记录";
    if (typeof getExportFileName === 'function') {
        fileName = getExportFileName();
    }

    // ═══════════════════════════════════════════════
    // 【核心修复】基于原始数据重新构建 HTML，不再克隆 DOM
    // ═══════════════════════════════════════════════
    let nodesHtml = '';
    
    history.forEach((item) => {
        const isUser = item.role === 'user';
        
        if (isUser) {
            // 用户节点：HTML 实体转义，防止 < > 被浏览器解析为标签
            nodesHtml += `
                <div class="thought-node question-node">
                    <div class="user-avatar-mark"><i class="fas fa-user-astronaut"></i></div>
                    <div class="node-content user-handwriting">${escapeHtml(item.text)}</div>
                </div>
            `;
        } else {
            // AI 节点：使用已修复的 parseMarkdownWithMath，安全渲染 Markdown
            let processedText = '';
            if (typeof parseMarkdownWithMath === 'function') {
                processedText = parseMarkdownWithMath(item.text);
            } else {
                processedText = escapeHtml(item.text).replace(/\n/g, '<br>');
            }

            const info = item.leaderInfo || { name: 'Unknown', field: '', contribution: '' };

            nodesHtml += `
                <div class="thought-node answer-node">
                    <div class="star-decoration-top"><i class="fas fa-star-of-life"></i></div>
                    <div class="leader-header">
                        <div class="leader-name">${escapeHtml(info.name)}</div>
                        <div class="leader-badges">
                            <span class="badge-field">${escapeHtml(info.field)}</span>
                        </div>
                    </div>
                    <div class="leader-contribution-hint" title="${escapeHtml(info.contribution || '')}">
                        <i class="fas fa-quote-left"></i> ${escapeHtml(info.contribution?.substring(0, 30) || '')}...
                    </div>
                    <div class="node-divider"></div>
                    <div class="node-content star-content">${processedText}</div>
                    <div class="star-decoration-bottom"><i class="fas fa-feather-alt"></i> North Star Insight</div>
                </div>
            `;
        }
    });

    const htmlContent = `<!DOCTYPE html>
<html lang="${window.currentLang || 'zh-CN'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(fileName)}</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;700&family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <style>
        body { margin: 0; padding: 0; font-family: 'Noto Serif SC', serif; overflow-x: hidden; }
        body {
            background: linear-gradient(to bottom, #02060a 0%, #0d1620 100%);
            min-height: 100vh;
            color: #ccc;
        }
        body::before {
            content: ""; position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-image: radial-gradient(1px 1px at 10% 10%, #fff, transparent), radial-gradient(2px 2px at 50% 50%, #fff, transparent);
            background-size: 500px 500px; opacity: 0.5; z-index: -1; pointer-events: none;
        }
        .thought-stream {
            max-width: 900px; margin: 0 auto; padding: 80px 20px;
            display: flex; flex-direction: column; gap: 60px;
        }
        .thought-node {
            position: relative; max-width: 80%; padding: 0; border-radius: 4px;
            margin-bottom: 20px;
        }
        .thought-node.question-node {
            align-self: flex-start;
            background: rgba(255, 255, 255, 0.1);
            border-left: 4px solid #fff;
            padding: 20px 25px; color: #fff;
            border-radius: 0 10px 10px 0;
            backdrop-filter: blur(5px);
        }
        .user-avatar-mark {
            position: absolute; left: -20px; top: -15px; width: 40px; height: 40px;
            background: #fff; color: #0d1218; border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .user-handwriting {
            font-family: 'Ma Shan Zheng', cursive; font-size: 1.3rem; line-height: 1.6; letter-spacing: 1px;
        }
        .thought-node.answer-node {
            align-self: flex-end;
            background: #f4ecd8; color: #2c1e12;
            border-radius: 4px 4px 4px 50px;
            padding: 30px 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            border: 1px solid rgba(139, 90, 43, 0.2);
            position: relative;
        }
        .thought-node.answer-node::after {
            content: ''; position: absolute; bottom: 8px; right: 8px;
            width: 40px; height: 40px; z-index: -1;
            box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.4);
            transform: skew(15deg) rotate(5deg); border-radius: 50%;
        }
        .leader-name { font-family: 'Cinzel', serif; font-weight: 700; font-size: 1.4rem; color: #3e2723; text-align: center; }
        .badge-field { background: #3e2723; color: #d7ccc8; padding: 2px 8px; border-radius: 2px; font-size: 0.75rem; display: inline-block; }
        .leader-header { text-align: center; margin-bottom: 10px; }
        .leader-contribution-hint { font-size: 0.9rem; color: #6d4c41; font-style: italic; text-align: center; margin-bottom: 15px; }
        .node-divider { height: 1px; background: linear-gradient(to right, transparent, #8b5a2b, transparent); margin: 15px 0; opacity: 0.4; }
        .star-content { font-size: 1rem; line-height: 1.8; color: #1a1a1a; text-align: justify; }
        .star-decoration-top { text-align: center; color: #8b5a2b; margin-bottom: 10px; }
        .star-decoration-bottom { margin-top: 20px; text-align: right; font-size: 0.8rem; color: #8b5a2b; font-family: 'Cinzel', serif; opacity: 0.6; }
        footer { text-align: center; padding: 50px; color: #555; font-size: 0.8rem; font-family: sans-serif; }
    </style>
</head>
<body>
    <div class="thought-stream">
        ${nodesHtml}
    </div>
    <footer>
        Exported from Talk with North Stars • ${new Date().toLocaleString()}
    </footer>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/* ═══════════════════════════════════════════════
   画布节点上下文按钮处理器
   ═══════════════════════════════════════════════ */
function handleCtxCanvasBtn(event, historyIndex) {
    event.stopPropagation();
    
    // 确保上下文管理器已初始化
    if (!window.starContext) {
        alert('星语上下文系统尚未初始化');
        return;
    }
    
    const history = getMergedHistory(importedHistory, conversationHistory);
    const data = history[historyIndex];
    if (!data || !data.id) return;
    
    const res = window.starContext.addFromDialogue(data);
    if (res.success) {
        const isIn = res.action === 'added';
        const btn = event.currentTarget;
        btn.classList.toggle('in-context', isIn);
        btn.innerHTML = `<i class="fas ${isIn ? 'fa-minus' : 'fa-plus'}"></i>`;
        btn.title = isIn ? '从星语上下文移除' : '加入星语上下文';
        
        // 刷新侧滑面板列表（如果打开）
        if (window.ContextUI && window.ContextUI._renderList) {
            window.ContextUI._renderList();
        }
        
        // Toast 提示
        const msg = isIn ? '已加入星语上下文' : '已从上下文移除';
        const t = document.createElement('div');
        t.className = 'ctx-toast show';
        t.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
        t.style.cssText = 'position:fixed; bottom:50px; left:50%; transform:translateX(-50%); background:rgba(0,223,216,.12); border:1px solid rgba(0,223,216,.3); color:#00dfd8; padding:13px 28px; border-radius:50px; font-size:14px; font-family:\"Noto Serif SC\",serif; backdrop-filter:blur(12px); z-index:999999; opacity:1; pointer-events:none; white-space:nowrap; letter-spacing:1px; box-shadow:0 8px 32px rgba(0,0,0,.3);';
        document.body.appendChild(t);
        setTimeout(() => { t.style.opacity='0'; t.style.transform='translateX(-50%) translateY(20px)'; setTimeout(()=>t.remove(), 350); }, 2200);
    } else {
        alert(res.message);
    }
}

/* ═══════════════════════════════════════════════
   对话画布 Session 持久化（仅 conversationHistory）
   ═══════════════════════════════════════════════ */
function saveCanvasSession() {
    try {
        // 保存当前对话
        if (conversationHistory && conversationHistory.length > 0) {
            sessionStorage.setItem('northstar_canvas_history', JSON.stringify(conversationHistory));
        } else {
            sessionStorage.removeItem('northstar_canvas_history');
        }

        // --- [新增] 保存导入的历史 ---
        if (importedHistory && importedHistory.length > 0) {
            sessionStorage.setItem('northstar_imported_history', JSON.stringify(importedHistory));
        } else {
            sessionStorage.removeItem('northstar_imported_history');
        }
    } catch (e) {
        // 静默失败
    }
}

// 补充：清空函数也要同步
function clearCanvasSession() {
    sessionStorage.removeItem('northstar_canvas_history');
}
