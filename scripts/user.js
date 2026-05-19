// 定义全局变量
let gmarketdate = null;

// ==========================================
// UI 逻辑：Settings Tab 切换
// ==========================================
function switchSettingsTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('tab-' + tabName).classList.add('active');
    
    if(tabName === 'user') checkAuthStatus();
    document.getElementById('auth-status-msg').innerText = ''; // 切换时清空消息
}

// ================= UTILS =================
function log(msgKey, color="#0f0", isDirectText = false) {
    const time = new Date().toLocaleTimeString('en-US', {
        hour12: false, 
        timeZone: 'Asia/Shanghai' 
    });
    
    // 如果是直接文本（如 API 返回的错误），直接输出；如果是 Key，则翻译
    const message = isDirectText ? msgKey : (translations[currentLang][msgKey] || msgKey);
    console.log(`%c[${time}] %c${message}`, "color: #666;", `color: ${color};`);
}

function openSettingsAndCheckAuth(event) {
    openApiSettingsModal(event) 
    checkAuthStatus(); 
}

// ==========================================
// 操作权限拦截检查机制
// ==========================================
function checkActionAuth(actionName) {
    if (!currentSelectedLeader) {
        alert(translations[currentLang].alertSelectLeaderFirst);
        return false;
    }
    
    // 特殊硬编码逻辑保留，但建议以后也放入配置
    if (currentSelectedLeader.name == "Elon Musk (马斯克)") {
        return true;
    }        
        
    const token = localStorage.getItem('qgr_jwt_token');
    let isLoggedIn = false;

    if (token) {
        const decoded = parseJWTClientSide(token);
        if (decoded) isLoggedIn = true;
    }

    if (!isLoggedIn) {
        let alertMsg = translations[currentLang].authActionDenied.replace('${action}', actionName);
        alert(alertMsg);
        return false;
    }
    return true;
}

function showAuthMsg(msgKey, color) {
    const box = document.getElementById('auth-status-msg');
    if (!box) return;

    // 1. 获取当前语言 (例如 'zh-CN' 或 'en')
    const lang = window.currentLang || 'zh-CN';

    // 2. 查字典逻辑：
    // 如果 translations[lang][msgKey] 存在，则使用翻译
    // 否则直接显示 msgKey (这处理了后端返回的原始错误信息)
    const translatedMsg = (translations[lang] && translations[lang][msgKey]) 
                          ? translations[lang][msgKey] 
                          : msgKey;

    box.innerText = translatedMsg;
    box.style.color = color;
}

function checkAuthStatus() {
    const token = localStorage.getItem('qgr_jwt_token');
    if (token) {
        const decoded = parseJWTClientSide(token);
        if (decoded) {
            document.getElementById('loginSection').classList.add('auth-hidden');
            document.getElementById('cpwSection').classList.remove('auth-hidden');
            document.getElementById('loggedInUser').innerText = decoded.user.toUpperCase();
            return true;
        } else {
            // Token 过期处理
            localStorage.removeItem('qgr_jwt_token'); 
            if (typeof ossClient !== 'undefined') ossClient = null;
            window.CURRENT_OSS_PREFIX = '';
            
            alert(translations[currentLang].authSessionExpired);
            window.location.reload();
            return false;
        }
    }
    document.getElementById('loginSection').classList.remove('auth-hidden');
    document.getElementById('cpwSection').classList.add('auth-hidden');
    return false;
}

const b64DecodeUnicode = str => decodeURIComponent(atob(str).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

function parseJWTClientSide(token) {
    try {
        const parts = token.split('.');
        if(parts.length !== 3) return null;
        const payload = JSON.parse(b64DecodeUnicode(parts[1]));
        if(Date.now() > payload.exp * 1000) return null; 
        return payload;
    } catch(e) { return null; }
}

// ==========================================
// 认证逻辑：登录/登出/改密
// ==========================================

async function handleLogin() {
    const u = document.getElementById('auth_username').value.trim();
    const p = document.getElementById('auth_password').value;
    if(!u || !p) return showAuthMsg("authMsgMissing", "#EF4444");

    showAuthMsg("authMsgAuthenticating", "#FFD700");

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            if (typeof ossClient !== 'undefined') ossClient = null;
            window.CURRENT_OSS_PREFIX = '';
            localStorage.setItem('qgr_jwt_token', data.token);
            
            showAuthMsg("authMsgSuccess", "#10B981");
            document.getElementById('auth_password').value = '';
            
            setTimeout(() => { window.location.reload(); }, 800);
        } else {
            showAuthMsg(data.error || "authMsgDenied", "#EF4444");
        }
    } catch (error) {
        showAuthMsg("authMsgNetworkError", "#EF4444");
    }
}

function handleLogout() {
    localStorage.removeItem('qgr_jwt_token');
    if (typeof ossClient !== 'undefined') ossClient = null;
    window.CURRENT_OSS_PREFIX = '';

    checkAuthStatus();
    showAuthMsg("authMsgLoggedOut", "#10B981");
    log("authMsgLoggedOut", "#9CA3AF");
    
    setTimeout(() => { window.location.reload(); }, 500);
}

async function handleChangePassword() {
    const token = localStorage.getItem('qgr_jwt_token');
    const decoded = parseJWTClientSide(token);
    if(!decoded) return handleLogout();

    const oldP = document.getElementById('cpw_old').value;
    const newP = document.getElementById('cpw_new').value;
    if(!oldP || !newP) return showAuthMsg("authMsgEmptyFields", "#EF4444");

    showAuthMsg("authMsgUpdatingPw", "#FFD700");

    try {
        const response = await fetch('/api/changepw', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ oldPassword: oldP, newPassword: newP })
        });

        const data = await response.json();
        if (response.ok && data.success) {
            showAuthMsg("authMsgPwUpdated", "#10B981");
            localStorage.removeItem('qgr_jwt_token');
            setTimeout(() => { window.location.reload(); }, 1000);
        } else {
            showAuthMsg(data.error || "authMsgUpdateFailed", "#EF4444");
        }
    } catch (error) {
        showAuthMsg("authMsgNetworkError", "#EF4444");
    }
}

// ================= OSS & Market Data =================

async function initOSS() {
    if (ossClient) return true;

    const token = localStorage.getItem('qgr_jwt_token');
    if (!token) return false;

    const decoded = parseJWTClientSide(token);
    if (!decoded) return false;

    const username = decoded.user;
    const isAdmin = username === 'admin';
    window.CURRENT_OSS_PREFIX = isAdmin ? '' : `${username}/`;

    let postBody = {};
    if (isAdmin) {
        const cfg = window.OSS_CONFIG || {};
        const getValid = v => (typeof v === 'string' && v.trim()) ? v.trim() : undefined;
        postBody = {
            OSS_ACCESS_KEY_ID:     getValid(cfg.ACCESS_KEY_ID),
            OSS_ACCESS_KEY_SECRET: getValid(cfg.ACCESS_KEY_SECRET),
            OSS_STS_ROLE_ARN:      getValid(cfg.STS_ROLE_ARN),
            OSS_REGION:            getValid(cfg.OSS_REGION)
        };
    }

    try {
        const res = await fetch(STS_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(postBody)
        });

        if (!res.ok) throw new Error(`STS fail: ${res.status}`);
        const data = await res.json();

        const region = isAdmin ? window.OSS_CONFIG?.OSS_REGION : OSS_REGION;
        const finalRegion = region?.startsWith('oss-') ? region : `oss-${region}`;
        const bucket = window.OSS_CONFIG?.OSS_BUCKET || OSS_BUCKET;

        ossClient = new OSS({
            region: finalRegion,
            accessKeyId: data.AccessKeyId,
            accessKeySecret: data.AccessKeySecret,
            stsToken: data.SecurityToken,
            bucket: bucket,
            refreshSTSToken: async () => {
                // 刷新逻辑内部也需处理过期
                const r = await fetch(STS_API_URL, { /*...*/ });
                if (!r.ok) {
                    alert(translations[currentLang].authSessionExpired);
                    handleLogout();
                    throw new Error("Refresh token failed");
                }
                const d = await r.json();
                return { accessKeyId: d.AccessKeyId, accessKeySecret: d.AccessKeySecret, stsToken: d.SecurityToken };
            }
        });
        return true;
    } catch (e) {
        console.error(e);
        const logBox = document.getElementById('systemLog');
        if (logBox) logBox.innerHTML += `<div class="log-line" style="color:red">> ${translations[currentLang].ossInitFail}</div>`;
        return false;
    }
}

async function loadMarketDate() {
    log("marketDateLoading", "cyan"); 
    if (!ossClient) return;
    
    try {
        const result = await ossClient.get('MarketDate.json');
        const jsonStr = result.content ? new TextDecoder("utf-8").decode(result.content) : "";
        if (jsonStr) {
            const marketData = JSON.parse(jsonStr);
            if (marketData && marketData.date) {
                gmarketdate = marketData.date;
                log("marketDateSuccess", "cyan");
            }
        }
    } catch (e) {
        log("marketDateError", "red");
    }
}

function getSecureOssPath(filename) {
    const token = localStorage.getItem('qgr_jwt_token');
    let username = '';
    if (token) {
        const decoded = parseJWTClientSide(token);
        if (decoded) username = decoded.user;
    }
    if (!username) return filename;

    const isAdmin = username === 'admin';
    if (isAdmin) return filename;

    const lastDotIndex = filename.lastIndexOf('.');
    let newFilename = lastDotIndex > 0 
        ? `${filename.substring(0, lastDotIndex)}_${username}${filename.substring(lastDotIndex)}`
        : `${filename}_${username}`;
    
    return `${username}//${newFilename}`; 
}
