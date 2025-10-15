let currentSelectedLeader = null;
        let currentSelectedLeaderCategory = '';
        let currentGeneratedPrompt = ''; 

        // --- NEW: Modal Control ---
        const apiSettingsModal = document.getElementById('apiSettingsModal');

        function openApiSettingsModal(event) {
            if (event) event.preventDefault(); // Prevent default anchor behavior
            if (apiSettingsModal) apiSettingsModal.style.display = 'block';
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
        function saveApiSettings() {
            const endpoint = document.getElementById('apiEndpoint').value;
            const key = document.getElementById('apiKey').value;
            const model = document.getElementById('apiModel').value;

            localStorage.setItem('apiEndpoint', endpoint);
            localStorage.setItem('apiKey', key);
            localStorage.setItem('apiModel', model);
            
            // It's good practice to provide feedback to the user.
            // Ensure you have a 'settingsSaved' key in your locale.js translations object.
            alert(translations[currentLang].settingsSaved || 'Settings Saved!'); 
            closeApiSettingsModal();
        }

        function loadApiSettings() {
            const savedEndpoint = localStorage.getItem('apiEndpoint');
            const savedKey = localStorage.getItem('apiKey');
            const savedModel = localStorage.getItem('apiModel');

            if (savedEndpoint) {
                const endpointSelect = document.getElementById('apiEndpoint');
                endpointSelect.value = savedEndpoint;
                // Important: Update model list after setting endpoint
                updateModelSelectByEndpoint(savedEndpoint);
            }
            if (savedKey) {
                document.getElementById('apiKey').value = savedKey;
            }
            if (savedModel) {
                // The model select is now populated based on the loaded endpoint,
                // so we can safely set its value.
                document.getElementById('apiModel').value = savedModel;
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
            document.getElementById('ai-response-area').style.display = 'none';
            document.getElementById('generatedPromptText').textContent = '';
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
            document.getElementById('ai-response-area').style.display = 'none';
            document.getElementById('generatedPromptText').textContent = '';
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

        function generateAndShowPrompt() {
            currentGeneratedPrompt = generateBasePrompt(); 
            const promptDisplayArea = document.getElementById('prompt-display-area');
            const promptTextElement = document.getElementById('generatedPromptText');

            if (currentGeneratedPrompt) {
                promptTextElement.textContent = currentGeneratedPrompt.trim();
                promptDisplayArea.style.display = 'block';
                document.getElementById('ai-response-area').style.display = 'none'; 
                document.getElementById('aiResponseText').textContent = ''; 
            } else {
                promptDisplayArea.style.display = 'none';
                promptTextElement.textContent = '';
            }
        }

        async function getAIResponse() {
            if (!currentGeneratedPrompt) { 
                alert(translations[currentLang].alertNoPrompt);
                return;
            }

            const apiBaseUrl = document.getElementById('apiEndpoint').value.trim();
            const apiKey = document.getElementById('apiKey').value.trim();
            const model = document.getElementById('apiModel').value;
            
            const aiResponseArea = document.getElementById('ai-response-area');
            const aiResponseTextElement = document.getElementById('aiResponseText');
            const getAIResponseButton = document.getElementById('getAIResponseButton');
            const loadingIndicator = document.getElementById('loadingIndicator');

            if (!apiBaseUrl) {
                alert(translations[currentLang].alertEnterApiUrl);
                return;
            }

            if (!apiKey) {
                alert(translations[currentLang].alertEnterApiKey);
                return;
            }

            let fullApiUrl = (apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl) + "/v1/chat/completions";

            if(apiBaseUrl == "https://generativelanguage.googleapis.com") {
                fullApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            }

            aiResponseTextElement.textContent = ''; 
            aiResponseArea.style.display = 'block';
            loadingIndicator.style.display = 'inline-block';
            getAIResponseButton.disabled = true;
            let requestBody; 
            if (apiKey && model.toLowerCase().includes("gpt")) {
                requestBody = {
                    model: model,
                    messages: [ { role: "user", content: currentGeneratedPrompt } ], 
                    temperature: 0.7,
                };
            } else if (apiKey && model.toLowerCase().includes("deepseek")) {
                requestBody = {
                    model: model,
                    messages: [ { role: "user", content: currentGeneratedPrompt } ], 
                    temperature: 0.7,
                };
            } else if (apiKey && model.toLowerCase().includes("gemini")) {
                requestBody = {
                    contents: [ { role: "user", parts: [ { text: currentGeneratedPrompt } ] } ],
                    generationConfig: { temperature: 0.7 }
                };
            }
            const headers = { 'Content-Type': 'application/json', };
            if (apiKey && !model.toLowerCase().includes("gemini"))  { headers['Authorization'] = `Bearer ${apiKey}`; }
            
            let response;
            let errorData;
            let data;
            if (apiKey && !model.toLowerCase().includes("gemini"))  { 
                try {
                    response = await fetch(fullApiUrl, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(requestBody)
                    });
    
                    if (!response.ok) {
                        errorData = await response.json().catch(() => ({ detail: response.statusText }));
                        throw new Error(`API Error: ${response.status} - ${errorData.detail || errorData.error?.message || 'Unknown error'}`);
                    }
                    data = await response.json();
                    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
                        aiResponseTextElement.textContent = data.choices[0].message.content.trim();
                    } else {
                        aiResponseTextElement.textContent = translations[currentLang].apiNoValidResponse;
                        console.error("Unexpected API response structure:", data);
                    }
                } catch (error) {
                    console.error('Error calling API:', error);
                    aiResponseTextElement.textContent = `${translations[currentLang].apiErrorOccurred}${error.message}${translations[currentLang].apiErrorCheckConsole}`;
                } finally {
                    loadingIndicator.style.display = 'none';
                    getAIResponseButton.disabled = false;
                }
            }
            else if (apiKey && model.toLowerCase().includes("gemini")) {
                try {
                    response = await fetch(fullApiUrl, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(requestBody)
                    });
    
                    if (!response.ok) {
                        errorData = await response.json().catch(() => ({ detail: response.statusText }));
                        throw new Error(`API Error: ${response.status} - ${errorData.error?.message || errorData.detail || 'Unknown error'}`);
                    }
                    data = await response.json();
                    
                    if (data.candidates && data.candidates.length > 0 && 
                        data.candidates[0].content && data.candidates[0].content.parts &&
                        data.candidates[0].content.parts.length > 0 && data.candidates[0].content.parts[0].text) {
                        aiResponseTextElement.textContent = data.candidates[0].content.parts[0].text.trim();
                    } else {
                        aiResponseTextElement.textContent = translations[currentLang].apiNoValidResponse;
                        console.error("Unexpected API response structure for Gemini:", data);
                    }
    
                } catch (error) {
                    console.error('Error calling API:', error);
                    aiResponseTextElement.textContent = `${translations[currentLang].apiErrorOccurred}${error.message}${translations[currentLang].geminiApiErrorCheckConsole}`;
                } finally {
                    loadingIndicator.style.display = 'none';
                    getAIResponseButton.disabled = false;
                }
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
            else if (promptDisplayArea.style.display !== 'none' && generatedPromptTextElement.textContent.trim()) {
                textToCopy = generatedPromptTextElement.textContent.trim();
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

        const endpointModelMap = {            
            "https://api.deepseek.com": [
                { value: "deepseek-chat", labelKey: "modelDeepSeekV3" }
            ],
            "https://generativelanguage.googleapis.com": [
                { value: "gemini-1.5-flash-latest", labelKey: "modelGeminiFlash" }
            ],
            "https://api.openai.com": [
                { value: "gpt-4o-mini", labelKey: "modelGpt4oMini" }
            ]
        };
        
        function populateEndpointSelect() {
            const endpointSelect = document.getElementById('apiEndpoint');
            endpointSelect.innerHTML = ""; // Clear existing options
            for (const ep in endpointModelMap) {
                const option = document.createElement('option');
                option.value = ep;
                option.textContent = ep; // Endpoint URL itself is not translated
                endpointSelect.appendChild(option);
            }
        }
        
        function updateModelSelectByEndpoint(endpoint) {
            const modelSelect = document.getElementById('apiModel');
            const currentModelValue = modelSelect.value;
            modelSelect.innerHTML = "";
            (endpointModelMap[endpoint] || []).forEach(model => {
                const option = document.createElement('option');
                option.value = model.value;
                option.textContent = translations[currentLang][model.labelKey] || model.labelKey;
                modelSelect.appendChild(option);
            });
            if (Array.from(modelSelect.options).some(opt => opt.value === currentModelValue)) {
                modelSelect.value = currentModelValue;
            }
        }
        
        function updateEndpointByModel(modelValue) {
            for (const ep in endpointModelMap) {
                if (endpointModelMap[ep].some(m => m.value === modelValue)) {
                    document.getElementById('apiEndpoint').value = ep;
                    updateModelSelectByEndpoint(ep);
                    document.getElementById('apiModel').value = modelValue;
                    break;
                }
            }
        }
        
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

            populateEndpointSelect(); // Populates endpoints first
            loadApiSettings(); // Load settings, which will also trigger model list update for the loaded endpoint
        
            setLanguage(currentLang);

            openTab(null, 'aiQuantum'); 
            const firstTabButton = document.querySelector('.tab-button');
            if (firstTabButton && !firstTabButton.classList.contains('active')) {
                 firstTabButton.classList.add('active');
            }
            updateAllScrollButtonStates(); 
            window.addEventListener('resize', updateAllScrollButtonStates); 

            document.getElementById('apiEndpoint').addEventListener('change', function() {
                updateModelSelectByEndpoint(this.value);
            });
            document.getElementById('apiModel').addEventListener('change', function() {
                updateEndpointByModel(this.value);
            });
        });
