let currentSelectedLeader = null;
let currentSelectedLeaderCategory = '';
let currentGeneratedPrompt = '';

// --- [新增] 对话画布相关全局变量 ---
let conversationHistory = []; // 存储 {role, text, leaderName, timestamp}
let isCanvasModeOpen = false;

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

    alert(translations[currentLang].settingsSaved || 'Settings Saved!');
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

    if (currentSelectedLeader && currentSelectedLeaderCategory !== tabName) {
        clearSelection();
    }
    updateAllScrollButtonStates();
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
    if (currentSelectedLeader) {
        const prevSelectedCard = document.querySelector(`.leader-card.selected[data-category='${currentSelectedLeaderCategory}']`);
        if (prevSelectedCard) {
            prevSelectedCard.classList.remove('selected');
        }
    }
    currentSelectedLeader = null;
    currentSelectedLeaderCategory = '';
    document.getElementById('selectedLeaderName').textContent = translations[currentLang].noLeaderSelected;
    currentGeneratedPrompt = '';
    document.getElementById('prompt-display-area').style.display = 'none';
    
    // --- 新增：重置折叠状态 ---
    document.getElementById('prompt-collapsible-content').style.display = 'none';
    document.getElementById('prompt-toggle-icon').classList.remove('icon-rotated');
    
    document.getElementById('ai-response-area').style.display = 'none';
    document.getElementById('generatedPromptText').value = '';
    document.getElementById('aiResponseText').textContent = '';
}

function selectLeader(leader, category, cardElement) {
    if (currentSelectedLeader) {
         const prevSelectedCard = document.querySelector(`.leader-card.selected[data-category='${currentSelectedLeaderCategory}']`);
         if (prevSelectedCard) {
            prevSelectedCard.classList.remove('selected');
         }
    }

    currentSelectedLeader = leader;
    currentSelectedLeaderCategory = category;
    document.getElementById('selectedLeaderName').textContent = leader.name;
    cardElement.classList.add('selected');
    currentGeneratedPrompt = '';
    document.getElementById('prompt-display-area').style.display = 'none';
     // --- 新增：重置折叠状态 ---
    document.getElementById('prompt-collapsible-content').style.display = 'none';
    const toggleIcon = document.getElementById('prompt-toggle-icon');
    if(toggleIcon) toggleIcon.classList.remove('icon-rotated');
    
    document.getElementById('ai-response-area').style.display = 'none';
    document.getElementById('generatedPromptText').value = '';
    document.getElementById('aiResponseText').textContent = '';

    if (!document.getElementById(category).classList.contains('active')) {
        const tabButtons = document.getElementsByClassName("tab-button");
        for(let btn of tabButtons) {
            if(btn.onclick.toString().includes(category)){
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

    if (!currentSelectedLeader) {
        alert(translations[lang].alertSelectLeaderFirst);
        return "";
    }
    if (!question) {
        alert(translations[lang].alertEnterQuestion);
        return "";
    }

    const leaderContribution = currentSelectedLeader.contribution[lang] || currentSelectedLeader.contribution['zh-CN'];
    const leaderField = currentSelectedLeader.field[lang] || currentSelectedLeader.field['zh-CN'];
    const leaderRemarks = currentSelectedLeader.remarks ? (currentSelectedLeader.remarks[lang] || currentSelectedLeader.remarks['zh-CN']) : '';

    const remarksText = leaderRemarks || translations[lang].promptBaseRemarksNone;
    const remarksSection = leaderRemarks
        ? translations[lang].promptBaseRemarksWith.replace('${remarks}', leaderRemarks)
        : '';

    const replyInstructionKey = lang === 'zh-CN' ? 'promptReplyInChinese' : 'promptReplyInEnglish';

    return `
${translations[lang].promptBackgroundSetting}
${translations[lang].promptYouAre} ${currentSelectedLeader.name}. ${translations[lang].promptBasedOnPublicContributions}

${currentSelectedLeader.name}${translations[lang].promptCoreInfoFor}
- ${translations[lang].promptMainContributions}: ${leaderContribution}
- ${translations[lang].promptExpertise}: ${leaderField}
- ${translations[lang].promptKeyRemarksFeatures}: ${remarksText}

${translations[lang].promptThinkingFrameworkGuidance.replace('${name}', currentSelectedLeader.name)}
1.  **${translations[lang].promptFirstPrinciplesThinking}**: ${translations[lang].promptFirstPrinciplesDetail}
2.  **${translations[lang].promptDomainExpertise}**: ${translations[lang].promptDomainExpertiseDetail1.replace('${field}', leaderField)} ${translations[lang].promptDomainExpertiseDetail2}
3.  **${translations[lang].promptCorePhilosophyDrivingForce}**: ${translations[lang].promptCorePhilosophyDetail1.replace('${name}', currentSelectedLeader.name).replace('${remarksSection}', remarksSection)}
4.  **${translations[lang].promptProblemAnalysis}**: ${translations[lang].promptProblemAnalysisDetail}
5.  **${translations[lang].promptSolutionInsight}**: ${translations[lang].promptSolutionInsightDetail1.replace('${name}', currentSelectedLeader.name)} ${translations[lang].promptSolutionInsightDetail2}
6.  **${translations[lang].promptLanguageStyle}**: ${translations[lang].promptLanguageStyleDetail1.replace('${name}', currentSelectedLeader.name)} ${translations[lang].promptLanguageStyleDetail2}

${translations[lang].promptUserQuestion}
"${question}"

${translations[lang].promptAs} ${currentSelectedLeader.name}, ${translations[lang][replyInstructionKey]}
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
    currentGeneratedPrompt = generateBasePrompt();
    const promptDisplayArea = document.getElementById('prompt-display-area');
    const promptTextElement = document.getElementById('generatedPromptText');
    
    // 获取内容区和图标，用于重置状态
    const content = document.getElementById('prompt-collapsible-content');
    const icon = document.getElementById('prompt-toggle-icon');

    if (currentGeneratedPrompt) {
        promptTextElement.value = currentGeneratedPrompt.trim();
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
        alert("请确保 API 设置完整（接入点、Key、模型）");
        return;
    }

    // 1. 预设 Header
    const headers = { 'Content-Type': 'application/json' };
    const isGeminiModel = model.toLowerCase().includes("gemini");

    // 2. 构造 URL
    let fullApiUrl;
    if (isGeminiModel) {
        const baseUrl = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;
        fullApiUrl = `${baseUrl}/v1beta/models/${model}:generateContent?key=${apiKey}`;
    } else {
        fullApiUrl = (apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl) + "/v1/chat/completions";
        // 非 Gemini 模型需要在 Header 里传 Key
        headers['Authorization'] = `Bearer ${apiKey}`;
    }

    // 3. 构造 Body
    let requestBody;
    if (isGeminiModel) {
        requestBody = {
            contents: [{ role: "user", parts: [{ text: promptText }] }],
            generationConfig: { temperature: 0.7 }
        };
    } else {
        requestBody = {
            model: model,
            messages: [{ role: "user", content: promptText }],
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
        const leaderMeta = currentSelectedLeader ? {
            name: currentSelectedLeader.name,
            field: currentSelectedLeader.field[currentLang] || currentSelectedLeader.field['zh-CN'],
            contribution: currentSelectedLeader.contribution[currentLang] || currentSelectedLeader.contribution['zh-CN']
        } : { name: 'North Star', field: 'General AI', contribution: '' };
    
        // 3. 存入历史 - 用户提问
        conversationHistory.push({
            id: Date.now() + '_user',
            role: 'user',
            text: rawUserQuestion || "（用户仅生成了提示词，未填写问题）", // 兜底
            leaderInfo: null, // 用户不需要leader信息
            timestamp: new Date()
        });
        
        // 4. 存入历史 - AI回答
        conversationHistory.push({
            id: Date.now() + '_ai',
            role: 'ai',
            text: rawContent, 
            leaderInfo: leaderMeta, // 保存这一刻的北极星状态
            timestamp: new Date()
        });
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
    "https://api.aivibeinvest.com": [
        { value: "gemini-2.5-flash@proxy", labelKey: "modelGeminiFlash" },
    ],
    "https://generativelanguage.googleapis.com": [
        { value: "gemini-2.5-flash", labelKey: "modelGeminiFlash" }
    ],
    "https://api.openai.com": [
        { value: "gpt-4o-mini", labelKey: "modelGpt4oMini" }
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

// --- 沉浸模式逻辑 ---
const immersiveModal = document.getElementById('immersiveModal');

function handleImmersiveMode() {
    // 1. 获取参数
    const pLeader = currentSelectedLeader; // 参数(1)
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
    const preferredLang = localStorage.getItem('preferredLang');
    const browserLang = navigator.language || navigator.userLanguage;

    if (preferredLang && translations[preferredLang]) {
        currentLang = preferredLang;
    } else if (browserLang.startsWith('en') && translations['en']) {
        currentLang = 'en';
    } else {
        currentLang = 'zh-CN';
    }
    document.getElementById('languageSelector').value = currentLang;

    // Load API settings early to ensure endpoint and model are set up before other UI elements might need them
    // Note: populateEndpointSelect and updateModelSelectByEndpoint are called within loadApiSettings now
    loadApiSettings();

    setLanguage(currentLang);

    openTab(null, 'ai');
    const firstTabButton = document.querySelector('.tab-button');
    if (firstTabButton && !firstTabButton.classList.contains('active')) {
         firstTabButton.classList.add('active');
    }
    updateAllScrollButtonStates();
    window.addEventListener('resize', updateAllScrollButtonStates);

    apiEndpointSelect.addEventListener('change', function() {
        updateModelSelectByEndpoint(this.value);
    });
    apiModelSelect.addEventListener('change', function() {
        updateEndpointByModel(this.value);
    });

    // Populate leaders after language is set and settings are loaded
    populateLeaders();
});

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


/* --- [新增] 优雅阅读模式逻辑 --- */
// 【新增辅助函数】安全解析 Markdown，保护数学公式不被 marked.js 破坏
function renderMarkdownWithMath(rawText) {
    if (!rawText) return '';

    // 1. 临时占位符数组
    const mathBlocks = [];
    
    // 2. 正则匹配 LaTeX 公式：
    // 匹配 $$...$$, \[...\], \(...\), $...$
    // 注意：这就要求 AI 返回标准的 LaTeX 格式
    const protectMath = (text) => {
        return text.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\(.*?\\\)|(?<!\\)\$.*?(?<!\\)\$)/gm, (match) => {
            mathBlocks.push(match); // 存入数组
            return `__MATH_BLOCK_${mathBlocks.length - 1}__`; // 用占位符替换
        });
    };

    // 3. 恢复公式
    const restoreMath = (text) => {
        return text.replace(/__MATH_BLOCK_(\d+)__/g, (match, index) => {
            return mathBlocks[index];
        });
    };

    // 4. 执行流程
    let protectedText = protectMath(rawText);
    
    let html = '';
    // 如果引入了 marked.js 则使用，否则简单换行
    if (typeof marked !== 'undefined') {
        html = marked.parse(protectedText);
    } else {
        html = protectedText.replace(/\n/g, '<br>');
    }

    // 5. 恢复公式并返回
    return restoreMath(html);
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

// 辅助函数：防止 LaTeX 中的 < 和 > 破坏 HTML 结构
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function openElegantMode() {
    // 1. 获取元素
    const userQuestion = document.getElementById('userQuestion').value;
    const aiResponseEl = document.getElementById('aiResponseText');
    
    // 【关键】必须从 dataset.raw 获取原始纯文本
    // 如果 dataset.raw 为空（修正前的代码会导致为空），逻辑就无法进行
    const rawAiContent = aiResponseEl.dataset.raw; 

    // 2. 校验
    if (!rawAiContent) {
        // 如果 raw 为空，说明还没生成，或者生成函数没保存 raw
        // 尝试回退读取 innerText，但效果可能不好
        if (aiResponseEl.innerText.trim() === "") {
             alert("请先获取北极星的回复，才能开启沉浸阅读模式。");
             return;
        }
    }

    // 3. 填充问题
    document.getElementById('elegantQuestionText').innerText = userQuestion || "（北极星指引）";

    // 4. 填充答案 (使用保护函数)
    const elegantAnswerBox = document.getElementById('elegantAnswerText');
    
    // 这里传入原始文本，先保护公式，再转 MD，再恢复公式
    elegantAnswerBox.innerHTML = parseMarkdownWithMath(rawAiContent || aiResponseEl.innerText);

    // 5. 显示模态框
    const modal = document.getElementById('elegantModal');
    modal.style.display = 'block';
    modal.offsetHeight; // 强制重绘
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // 6. 触发 MathJax 渲染
    if (window.MathJax) {
        // 针对模态框区域重新渲染
        MathJax.typesetPromise([elegantAnswerBox]).catch(err => console.error('Modal MathJax error:', err));
    }
}

function closeElegantMode() {
    const modal = document.getElementById('elegantModal');
    modal.classList.remove('show');
    
    // 等待动画结束后隐藏
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复滚动
    }, 400);
}

// 点击模态框背景关闭
document.getElementById('elegantModal').addEventListener('click', function(e) {
    // 如果点击的是背景（elegantModal）或 container 外部区域，则关闭
    // 注意：点击 .elegant-content 内部不应关闭
    if (e.target === this) {
        closeElegantMode();
    }
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
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 500);
}

function clearCanvasHistory() {
    // 1. 判断是否有内容可清空
    if (!conversationHistory || conversationHistory.length === 0) {
        alert("画布已经是空的了。");
        return;
    }

    // 2. 弹出确认框
    const isConfirmed = confirm("⚠️ 高风险操作\n\n您确定要清空整个画布吗？\n此操作将移除所有当前的思维节点且无法恢复。\n(主界面的对话记录不会受影响)");

    // 3. 用户点击“确定”后执行
    if (isConfirmed) {
        conversationHistory = []; // 清空数组
        renderDialogueCanvas();   // 重绘界面
        
        // 可选：给个轻提示
        // alert("画布已清空"); 
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('inspirationSidebar');
    sidebar.classList.toggle('open');
}

/* --- 核心渲染函数 (renderDialogueCanvas) --- */
function renderDialogueCanvas() {
    const container = document.getElementById('thoughtStreamContent');
    const svgEl = document.getElementById('thoughtTrailsSvg');
    container.innerHTML = '';
    
    if (conversationHistory.length === 0) {
        container.innerHTML = `<div style="text-align:center; color:#888; margin-top:100px; font-family:'Ma Shan Zheng'">
            暂无思想轨迹...<br>请先在主界面与北极星对话。
        </div>`;
        svgEl.innerHTML = ''; 
        return;
    }

    conversationHistory.forEach((item, index) => {
        const node = document.createElement('div');
        const isUser = item.role === 'user';
        
        node.className = `thought-node ${isUser ? 'question-node' : 'answer-node'}`;
        node.id = `node-${index}`;
        
        // --- 新增：删除按钮 ---
        // 注意：onclick 绑定了 deleteNode 并传入 index
        const deleteBtnHTML = `
            <button class="node-delete-btn" onclick="deleteNode(event, ${index})" title="删除此节点">
                <i class="fas fa-times"></i>
            </button>
        `;

        let contentHTML = '';

        if (isUser) {
            contentHTML = `
                ${deleteBtnHTML} <!-- 插入删除按钮 -->
                <div class="user-avatar-mark"><i class="fas fa-user-astronaut"></i></div>
                <div class="node-content user-handwriting">${item.text}</div>
            `;
        } else {
            let processedText = typeof parseMarkdownWithMath === 'function' 
                ? parseMarkdownWithMath(item.text) 
                : item.text.replace(/\n/g, '<br>');

            const info = item.leaderInfo || { name: 'Unknown', field: '', contribution: '' };

            contentHTML = `
                ${deleteBtnHTML} <!-- 插入删除按钮 -->
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
        
        container.appendChild(node);
    });

    if (window.MathJax) {
        MathJax.typesetPromise([container]).catch(err => {});
    }

    setTimeout(drawConnections, 300);
}


function drawConnections() {
    const container = document.getElementById('thoughtStreamContent');
    const svgEl = document.getElementById('thoughtTrailsSvg');
    const nodes = container.querySelectorAll('.thought-node');
    
    // 调整SVG高度以匹配内容
    svgEl.style.height = container.scrollHeight + 'px';
    svgEl.innerHTML = ''; // 清除旧线

    if (nodes.length < 2) return;

    let pathD = '';
    
    // 遍历节点，连接 i 和 i+1
    for (let i = 0; i < nodes.length - 1; i++) {
        const current = nodes[i];
        const next = nodes[i+1];
        
        // 获取相对坐标
        const currentRect = current.getBoundingClientRect();
        const nextRect = next.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect(); // 视口容器
        
        // 计算相对于 SVG 容器 (container) 的坐标
        // 注意：因为 container 是 scrollable，这里需要加上 scrollTop 
        // 但更简单的是利用 offsetTop/Left，因为 thought-node 是 relative 到 container 的
        
        const startX = current.offsetLeft + (current.offsetWidth / 2);
        const startY = current.offsetTop + current.offsetHeight;
        
        const endX = next.offsetLeft + (next.offsetWidth / 2);
        const endY = next.offsetTop;
        
        // 贝塞尔曲线控制点 (S型)
        const controlY = (endY - startY) / 2;
        
        // 绘制路径 M(起点) C(控制点1) (控制点2) (终点)
        // 路径颜色根据是 User->AI 还是 AI->User 变化
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", `M ${startX} ${startY} C ${startX} ${startY + controlY}, ${endX} ${endY - controlY}, ${endX} ${endY}`);
        path.setAttribute("class", "trail-path");
        
        svgEl.appendChild(path);
    }
}

// 将内容添加到手稿区
function addToInspiration(event, text) {
    if(event) event.stopPropagation();

    const sidebar = document.getElementById('inspirationSidebar');
    const notesDiv = document.getElementById('notesContainer');

    // 1. 确保侧边栏滑出
    if(!sidebar.classList.contains('open')) {
        sidebar.classList.add('open');
    }

    // 2. 创建精美的笔记块
    const noteBlock = document.createElement('div');
    noteBlock.className = 'inspiration-note-block'; // 对应上面的CSS
    noteBlock.contentEditable = "false"; // 建议设为 false，防止用户不小心把格式删乱了，用户可以在块外面打字
    
    // 截取文本
    const snippet = text.length > 100 ? text.substring(0, 100) + "..." : text;
    noteBlock.innerText = snippet;
    
    // 3. 处理 contenteditable 的插入逻辑
    // 如果容器是空的（显示placeholder），先清空内容
    if (notesDiv.innerText.trim() === "") {
        notesDiv.innerHTML = "";
    }
    
    // 插入笔记块
    notesDiv.appendChild(noteBlock);
    
    // 4. 插入一个换行符，方便用户在引用后面打字
    const spacer = document.createElement('div');
    spacer.innerHTML = "<br>";
    notesDiv.appendChild(spacer);

    // 5. 滚动到底部
    notesDiv.scrollTop = notesDiv.scrollHeight;
}

// 监听窗口大小变化重绘连线
window.addEventListener('resize', () => {
    if(isCanvasModeOpen) drawConnections();
});

/* --- 新增功能逻辑 --- */

// 1. 删除单个节点功能
function deleteNode(event, index) {
    // 1. 阻止事件冒泡 (非常重要)
    // 防止点击删除按钮时，同时触发底下的“点击摘录到灵感手稿”功能
    if (event) {
        event.stopPropagation();
    }
    
    // 2. 弹出确认框
    const isConfirmed = confirm("🗑️ 确认删除\n\n您确定要移除这个对话节点吗？\n删除后，画布上的连线将自动重新连接。");

    // 3. 用户点击“确定”后执行
    if (isConfirmed) {
        // 从数组中删除指定索引的元素
        conversationHistory.splice(index, 1);
        
        // 重新渲染画布 (这会自动更新SVG连线)
        renderDialogueCanvas();
    }
}

/* --- 辅助函数：生成文件名时间戳 --- */
function getExportFileName() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    
    // 格式：TalkwithNorthStars20231027103000
    return `TalkwithNorthStars${year}${month}${day}${hour}${minute}${second}`;
}

// 2. 导出为 Markdown
function exportToMD() {
    if (!conversationHistory || conversationHistory.length === 0) {
        alert("画布为空，无法导出。");
        return;
    }

    let mdContent = "# Dialogue Canvas Export\n\n";
    const timestamp = new Date().toLocaleString();
    mdContent += `> Exported on: ${timestamp}\n\n---\n\n`;

    conversationHistory.forEach((item, index) => {
        const isUser = item.role === 'user';
        const roleName = isUser ? "User" : (item.leaderInfo?.name || "North Star");
        
        // 引用格式化
        let text = item.text.replace(/\n/g, '\n> '); 
        
        // --- 修改点：在 User 问题后增加北极星人物信息 ---
        if (isUser) {
            // 向后看一条
            const nextItem = conversationHistory[index + 1];
            if (nextItem && nextItem.role !== 'user' && nextItem.leaderInfo) {
                const info = nextItem.leaderInfo;
                // 追加信息到 User 的文本块中
                text += `\n\n> **🧩 关联北极星人物**：${info.name}`;
                text += `\n> - 领域：${info.field}`;
                text += `\n> - 贡献：${info.contribution}`;
            }
        }

        mdContent += `### ${roleName}:\n${text}\n\n`;
    });

    // 创建 Blob 并下载
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    // --- 修改点：统一文件名 ---
    a.download = `${getExportFileName()}.md`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/* 
 * 3. 导出 PDF 
 * 逻辑：创建一个临时的、干净的 HTML 列表（仅包含问答文字），
 * 然后对其截图生成 PDF。不包含 SVG 连线和画布特效。
 */
async function exportToPDF() {
    // 1. 基础校验
    if (!conversationHistory || conversationHistory.length === 0) {
        alert("没有可导出的内容。");
        return;
    }

    // 2. 锁定界面状态 & 记录原始滚动位置
    const originalCursor = document.body.style.cursor;
    const originalScrollPos = window.scrollY; 
    const originalOverflow = document.body.style.overflow;

    document.body.style.cursor = 'wait';
    
    // --- 【关键修复 1】强制滚动到顶部 ---
    // 防止因滚动条在底部，导致绝对定位在 top:0 的 printDiv 处于视口外而被判定为 0 宽高
    window.scrollTo(0, 0);

    // 3. 创建离屏容器
    const printDiv = document.createElement('div');
    printDiv.style.position = 'absolute';
    printDiv.style.top = '0px';
    printDiv.style.left = '0px'; 
    printDiv.style.width = '650px';   
    printDiv.style.backgroundColor = '#ffffff';
    printDiv.style.padding = '40px 50px'; 
    printDiv.style.fontFamily = '"Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", sans-serif';
    printDiv.style.color = '#333';
    
    // --- 【关键修复 2】调整层级与显示 ---
    // 使用 z-index: -1 让其位于底层但仍然参与渲染树计算
    printDiv.style.zIndex = '-1';  
    printDiv.style.display = 'block';

    // 4. 构建 HTML 头部
    let contentHtml = `
        <div style="text-align:center; margin-bottom: 40px;">
            <h2 style="color:#2c3e50; font-size: 24px; margin-bottom:10px; font-weight:700;">
                对话北极星思维轨迹
            </h2>
            <div style="font-size: 14px; color: #95a5a6; font-family: serif; font-style: italic;">
                Talk with North Stars - Insight Stream
            </div>
            <div style="width: 60px; height: 3px; background: #e67e22; margin: 15px auto;"></div>
            <div style="font-size: 12px; color: #aaa; text-align: right; margin-top: 10px;">
                ${new Date().toLocaleString()}
            </div>
        </div>
    `;

    // 5. 遍历并构建对话节点 (逻辑保持不变)
    conversationHistory.forEach((item, index) => {
        const isUser = item.role === 'user';
        let textContent = item.text.replace(/\n/g, '<br>');
        if (!isUser && typeof parseMarkdownWithMath === 'function') {
            try { textContent = parseMarkdownWithMath(item.text); } catch(e) {}
        }

        if (isUser) {
            let extraInfoHtml = '';
            const nextItem = conversationHistory[index + 1];
            if (nextItem && nextItem.role !== 'user' && nextItem.leaderInfo) {
                const info = nextItem.leaderInfo;
                extraInfoHtml = `
                    <div style="margin-top: 15px; border-top: 1px dashed #bcdaea; padding-top: 10px; font-size: 13px; color: #555; display:flex; align-items:center;">
                        <span style="font-weight:bold; color: #2c3e50; margin-right:8px;">🧩 关联人物：${info.name}</span> 
                        <span style="background:#eef6fa; color: #7f8c8d; font-size:11px; padding:2px 6px; border-radius:4px;">${info.field}</span>
                    </div>
                    <div style="margin-top:6px; font-style:italic; color:#7f8c8d; font-size: 12px; padding-left: 20px;">
                        "${info.contribution.substring(0, 50)}${info.contribution.length > 50 ? '...' : ''}"
                    </div>
                `;
            }

            contentHtml += `
                <div class="pdf-node" style="margin-bottom: 30px; display: flex; flex-direction: column; align-items: flex-end;">
                    <div style="font-weight: bold; color: #2980b9; margin-bottom: 8px; font-size: 15px; width: 100%; text-align: right;">
                        <span style="background: #eef7fc; padding: 4px 10px; border-radius: 15px;">User (提问)</span>
                    </div>
                    <div style="background: #f0f7fb; padding: 15px 20px; border-radius: 12px 0 12px 12px; line-height: 1.6; font-size: 14px; border: 1px solid #dbe9f1; text-align: justify; box-shadow: 0 2px 5px rgba(0,0,0,0.03); max-width: 90%;">
                        <div style="font-family: 'Indie Flower', 'KaiTi', cursive; font-weight: bold; color: #34495e;">${item.text}</div>
                        ${extraInfoHtml}
                    </div>
                </div>
            `;
        } else {
            const info = item.leaderInfo || { name: 'Unknown', field: '', contribution: '' };
            contentHtml += `
                <div class="pdf-node" style="margin-bottom: 40px; margin-top: 10px; position: relative;">
                    <div style="border: 1px solid #ecd0b7; background: #fffdf9; border-radius: 12px; position: relative; box-shadow: 0 4px 15px rgba(211, 84, 0, 0.08); overflow: hidden;">
                        <div style="text-align: center; color: #e67e22; font-size: 14px; margin-top: 10px; opacity: 0.7;"><i class="fas fa-star-of-life"></i></div>
                        <div style="text-align: center; padding: 5px 20px;">
                            <div style="font-size: 20px; font-weight: bold; color: #d35400; font-family: 'Ma Shan Zheng', cursive, sans-serif;">${info.name}</div>
                            <div style="margin-top: 5px;"><span style="background: #fff5eb; color: #d35400; border: 1px solid #f5c6cb; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600;">${info.field}</span></div>
                        </div>
                        <div style="background: #fff8e1; color: #8d6e63; font-size: 12px; padding: 10px 15px; margin: 15px 25px; border-radius: 6px; border-left: 3px solid #ffca28; font-style: italic; line-height: 1.4;">
                            <i class="fas fa-quote-left" style="font-size: 10px; opacity: 0.6; margin-right: 5px;"></i> ${info.contribution}
                        </div>
                        <div style="height: 1px; background: linear-gradient(to right, transparent, #e0e0e0, transparent); margin: 15px 40px;"></div>
                        <div style="padding: 0 30px 20px 30px; color: #2c3e50; line-height: 1.8; font-size: 14px; text-align: justify; font-family: -apple-system, sans-serif;">${textContent}</div>
                        <div style="background: #fdf2e9; padding: 6px; text-align: right; font-size: 10px; color: #d35400; font-weight: bold; padding-right: 20px;"><i class="fas fa-feather-alt"></i> NORTH STAR INSIGHT</div>
                    </div>
                </div>
            `;
        }
    });

    // 6. 插入DOM
    printDiv.innerHTML = contentHtml;
    document.body.appendChild(printDiv);

    try {
        // 等待渲染
        await new Promise(resolve => setTimeout(resolve, 800)); // 适当增加延时
        
        if (window.MathJax) {
            try { await MathJax.typesetPromise([printDiv]); } catch (e) {}
        }

        // --- 【关键修复 3】使用 Math.ceil 取整 ---
        // 避免小数像素导致的 0 宽高判定
        const totalWidth = Math.ceil(printDiv.scrollWidth);
        const totalHeight = Math.ceil(printDiv.scrollHeight);

        // 8. 智能切割点计算
        const nodeElements = printDiv.querySelectorAll('.pdf-node');
        const safeCuts = []; 
        nodeElements.forEach(el => {
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;
            safeCuts.push(top - 10); 
            safeCuts.push(bottom + 10); 
        });
        const sortedCuts = [...new Set(safeCuts)].sort((a, b) => a - b);

        const scale = 2; 
        
        // 9. 执行截图
        const canvas = await html2canvas(printDiv, {
            scale: scale,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff',
            // --- 【关键修复 4】明确指定尺寸和滚动 ---
            width: totalWidth,      
            height: totalHeight,
            scrollY: 0, // 告诉 canvas 不要计算滚动偏移，因为我们已经滚到 (0,0)
            scrollX: 0
        });

        // 10. PDF 分页生成 (保持原有逻辑)
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pdfWidth = 210; 
        const pdfHeight = 297; 
        const pageHeightInCanvas = (canvas.width / pdfWidth) * pdfHeight;
        
        let renderedHeight = 0; 
        const canvasHeight = canvas.height;

        while (renderedHeight < canvasHeight) {
            let proposedCut = renderedHeight + pageHeightInCanvas;
            
            if (proposedCut >= canvasHeight) {
                proposedCut = canvasHeight;
            } else {
                let bestCut = -1;
                for (let cutDom of sortedCuts) {
                    const cutCanvas = cutDom * scale; 
                    if (cutCanvas > renderedHeight && cutCanvas < proposedCut) {
                        bestCut = cutCanvas;
                    }
                }
                if (bestCut !== -1 && (proposedCut - bestCut) < (pageHeightInCanvas * 0.4)) {
                    proposedCut = bestCut;
                }
            }

            const sliceHeight = proposedCut - renderedHeight;
            if (sliceHeight <= 0) break; 

            const sliceCanvas = document.createElement('canvas');
            sliceCanvas.width = canvas.width;
            sliceCanvas.height = sliceHeight;
            
            const ctx = sliceCanvas.getContext('2d');
            ctx.drawImage(canvas, 0, renderedHeight, canvas.width, sliceHeight, 0, 0, canvas.width, sliceHeight);
            
            const imgData = sliceCanvas.toDataURL('image/jpeg', 0.95);
            
            if (renderedHeight > 0) {
                pdf.addPage();
            }
            
            const imgHeightInPdf = (sliceHeight * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeightInPdf);

            renderedHeight = proposedCut;
        }

        // 11. 下载
        pdf.save(`${getExportFileName()}.pdf`);

    } catch (error) {
        console.error("PDF Export Failed:", error);
        alert("导出 PDF 失败，请检查控制台。\n" + (error.message || ""));
    } finally {
        // 12. 清理 & 恢复现场
        if (printDiv && printDiv.parentNode) {
            printDiv.parentNode.removeChild(printDiv);
        }
        document.body.style.cursor = originalCursor;
        document.body.style.overflow = originalOverflow;
        // 恢复滚动位置
        window.scrollTo(0, originalScrollPos); 
    }
}
