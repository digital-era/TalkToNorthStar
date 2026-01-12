/**
 * /functions/api/qwenproxy/[[path]].js
 * 
 * Universal BYOK Proxy with Dynamic Routing & Debug Headers
 */

const ALLOWED_ORIGIN = 'https://talktonorthstar.pages.dev';
const TARGET_HOST = 'https://dashscope.aliyuncs.com';
const ALLOWED_HEADERS = 'Content-Type, X-API-Key, Authorization';

// === 工具：安全编码 Header 值 (防止中文乱码或超长) ===
const safeHeader = (val) => {
  if (!val) return "";
  // 使用 encodeURIComponent 处理中文，截取前 800 字符防止 Header 过大
  return encodeURIComponent(String(val)).substring(0, 800);
};

// === 辅助函数：是否需要搜索 ===
function shouldSearch(fullPrompt) {
  const match = fullPrompt.match(/用户问题:\s*["']?([^\n]+)/i);
  const question = match ? match[1] : fullPrompt;
  const lower = question.toLowerCase();
  return /(\d{4}年|明年|最新|刚刚|最近|今日|今天|新闻|事件|采访|发布会|\d{2}年)/.test(lower);
}

// === 辅助函数：构建搜索词 ===
function buildSearchQuery(fullPrompt) {
  let subject = "public figure";
  const roleMatch = fullPrompt.match(/背景设定:\s*你是\s*([^.。]+)[.。]/i);
  if (roleMatch) {
    subject = roleMatch[1].trim(); 
  }

  const questionMatch = fullPrompt.match(/用户问题:\s*["']?([^\n]+)/i);
  let userQuestion = questionMatch ? questionMatch[1].trim() : "";

  let refined = userQuestion
    .replace(/\b(\d{2})年\b/g, (match, p1) => {
      const num = parseInt(p1, 10);
      return (num >= 20 && num <= 29) ? `20${num}年` : match;
    })
    .replace(/\b(三小时|3个小时|三个小时|3小时)\b/g, "3 hour interview")
    .replace(/请先通过网络搜索核实|请核实|请搜索|核心内容|主要内容|说了什么|要点/i, "")
    .trim();

  const query = `${subject} ${refined}`.trim();
  return query || subject;
}

// === 辅助函数：Google 搜索 ===
async function googleSearch(query, env) {
  if (!env.GOOGLE_SEARCH_KEY || !env.GOOGLE_SEARCH_ENGINE_ID) {
    throw new Error('Env vars missing: GOOGLE_SEARCH_KEY or GOOGLE_SEARCH_ENGINE_ID');
  }
  const url = `https://www.googleapis.com/customsearch/v1?key=${env.GOOGLE_SEARCH_KEY}&cx=${env.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=3`;
  
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
  const data = await res.json();
  // 返回格式化的结果
  return data.items?.map(item => `${item.title}\n${item.snippet}`).join('\n\n') || '';
}

// === Pages Functions 主逻辑 ===

export async function onRequestOptions(context) {
  const request = context.request;
  const origin = request.headers.get('Origin') || '';
  const allowed = origin === ALLOWED_ORIGIN;

  return new Response(null, {
    status: allowed ? 204 : 403,
    headers: {
      'Access-Control-Allow-Origin': allowed ? ALLOWED_ORIGIN : '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': ALLOWED_HEADERS,
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    },
  });
}

export async function onRequestPost(context) {
  const { request, env, params } = context;
  const origin = request.headers.get('Origin') || '';
  const url = new URL(request.url);

  // 0. 初始化调试对象
  const debugHeaders = {}; 
  debugHeaders['x-debug-timestamp'] = new Date().toISOString();

  // 1. Origin 校验
  if (origin !== ALLOWED_ORIGIN) {
    return new Response('Forbidden: Invalid origin.', { status: 403 });
  }

  // 2. 动态计算上游 URL
  let pathSuffix = '';
  if (params.path && Array.isArray(params.path)) {
    pathSuffix = params.path.join('/');
  }
  if (!pathSuffix) {
     pathSuffix = 'api/v1/services/aigc/text-generation/generation';
  }
  const targetUrl = `${TARGET_HOST}/${pathSuffix}${url.search}`;

  const userApiKey = request.headers.get('X-API-Key');
  if (!userApiKey) {
    return new Response('Missing X-API-Key header.', { status: 400 });
  }

  let originalBody;
  try {
    originalBody = await request.json();
  } catch (e) {
    return new Response('Invalid JSON body.', { status: 400 });
  }

  // === 3. 处理搜索逻辑 ===
  let finalBody = originalBody;

  // 记录是否进入了文本生成逻辑
  const isGenerationRequest = pathSuffix.includes('generation') && originalBody.input?.messages;
  
  if (isGenerationRequest) {
    let fullUserMessage = '';
    try {
        if (originalBody.input.messages.length > 0) {
            fullUserMessage = originalBody.input.messages[originalBody.input.messages.length - 1].content || '';
        }
    } catch (e) {
        fullUserMessage = originalBody.input?.messages?.[0]?.content || '';
    }

    // [DEBUG] 记录提取到的 Prompt
    debugHeaders['x-debug-1-prompt-extracted'] = safeHeader(fullUserMessage);

    const needSearch = shouldSearch(fullUserMessage);
    // [DEBUG] 记录是否触发搜索
    debugHeaders['x-debug-2-should-search'] = needSearch.toString();

    if (fullUserMessage && needSearch) {
      let finalPrompt = fullUserMessage;
      try {
        const searchQuery = buildSearchQuery(fullUserMessage);
        
        // [DEBUG] 记录构建的搜索词
        debugHeaders['x-debug-3-search-query'] = safeHeader(searchQuery);

        // 执行搜索
        const searchResults = await googleSearch(searchQuery, env);
        
        // [DEBUG] 记录搜索结果片段 (截取前500字符)
        debugHeaders['x-debug-4-google-result'] = safeHeader(searchResults ? searchResults : "NO_RESULTS");

        if (searchResults) {
          finalPrompt = fullUserMessage.replace(
            /(用户问题:\s*["']?[^"'\n]*)/i,
            `【联网搜索结果】\n${searchResults}\n\n---\n\n$1`
          );
        } else {
            // 搜索执行了但没结果
            finalPrompt = fullUserMessage.replace(
                /(用户问题:\s*["']?[^"'\n]*)/i,
                `【警告：未找到可验证的公开信息】\n\n请基于角色设定回答，但必须明确说明：无法核实该事件真实性。\n\n---\n\n$1`
            );
        }
      } catch (err) {
        // [DEBUG] 记录搜索错误
        debugHeaders['x-debug-error'] = safeHeader(err.message);
        console.error("⚠️ Google search failed:", err.message);

        finalPrompt = fullUserMessage.replace(
            /(用户问题:\s*["']?[^"'\n]*)/i,
            `【警告：搜索服务暂时不可用】\n\n请谨慎回答，避免猜测。\n\n---\n\n$1`
        );
      }
      
      // 更新 Body
      finalBody = {
        ...originalBody,
        input: { messages: [{ role: "user", content: finalPrompt }] },
        parameters: {
          ...originalBody.parameters,
          plugins: undefined,
          function_call: undefined
        }
      };
    }
  }

  // 4. 转发请求给阿里云
  const dashRequest = new Request(targetUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userApiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'BYOK-Qwen-Proxy/universal-role-search-pages',
    },
    body: JSON.stringify(finalBody),
  });

  let dashResponse;
  try {
    dashResponse = await fetch(dashRequest);
  } catch (error) {
    debugHeaders['x-debug-upstream-error'] = safeHeader(error.message);
    return new Response('Upstream error.', { status: 502, headers: debugHeaders });
  }

  // 5. 构建响应并注入 Debug Headers
  const newHeaders = new Headers(dashResponse.headers);
  
  // 设置 CORS
  newHeaders.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  newHeaders.set('Vary', 'Origin');

  // 注入调试信息到 Header
  Object.keys(debugHeaders).forEach(key => {
      newHeaders.set(key, debugHeaders[key]);
  });

  return new Response(dashResponse.body, {
    status: dashResponse.status,
    statusText: dashResponse.statusText,
    headers: newHeaders,
  });
}
