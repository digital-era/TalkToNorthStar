/**
 * /functions/api/qwenproxy/[[path]].js
 * 
 * Universal BYOK Proxy with Dynamic Routing
 * Matches: /api/qwenproxy/* (Catch-all)
 */

const ALLOWED_ORIGIN = 'https://talktonorthstar.pages.dev';
const TARGET_HOST = 'https://dashscope.aliyuncs.com'; // 只定义域名，路径动态获取
const ALLOWED_HEADERS = 'Content-Type, X-API-Key, Authorization';

// === 辅助函数：是否需要搜索 (保持不变) ===
function shouldSearch(fullPrompt) {
  const match = fullPrompt.match(/用户问题:\s*["']?([^\n]+)/i);
  const question = match ? match[1] : fullPrompt;
  const lower = question.toLowerCase();
  return /(\d{4}年|明年|最新|刚刚|最近|今日|今天|新闻|事件|采访|发布会|\d{2}年)/.test(lower);
}

// === 辅助函数：构建搜索词 (保持不变) ===
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

// === 辅助函数：Google 搜索 (保持不变) ===
async function googleSearch(query, env) {
  if (!env.GOOGLE_SEARCH_KEY || !env.GOOGLE_SEARCH_ENGINE_ID) {
    throw new Error('GOOGLE_SEARCH_KEY or GOOGLE_SEARCH_ENGINE_ID not configured');
  }
  const url = `https://www.googleapis.com/customsearch/v1?key=${env.GOOGLE_SEARCH_KEY}&cx=${env.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=3`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Search API error ${res.status}: ${text}`);
  }
  const data = await res.json();
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
  const { request, env, params } = context; // 注意这里解构了 params
  const origin = request.headers.get('Origin') || '';
  const url = new URL(request.url);

  // 1. Origin 校验
  if (origin !== ALLOWED_ORIGIN) {
    return new Response('Forbidden: Invalid origin.', { status: 403 });
  }

  // 2. 动态计算上游 URL (修复 405 问题的关键)
  // 此时 params.path 是一个数组，例如 ['api', 'v1', 'services', 'aigc', 'text-generation', 'generation']
  // 我们需要把它还原成路径字符串。
  let pathSuffix = '';
  if (params.path && Array.isArray(params.path)) {
    pathSuffix = params.path.join('/');
  }
  
  // 如果前端只请求了 /api/qwenproxy，没有后缀，则使用默认的文本生成路径（可选兜底）
  if (!pathSuffix) {
     pathSuffix = 'api/v1/services/aigc/text-generation/generation';
  }

  // 拼接完整的阿里云地址：域名 + 提取的后缀 +原本的 Query 参数
  const targetUrl = `${TARGET_HOST}/${pathSuffix}${url.search}`;

  console.log(`📡 Proxying to: ${targetUrl}`); // 调试日志

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

  // === 3. 处理搜索逻辑 (仅在是文本生成请求时处理) ===
  // 如果前端复用了这个代理发图片或embedding，我们就不应该修改 prompt
  let finalBody = originalBody;
  
  // 简单的判断：如果路径包含 'generation' 且 body 里有 input.messages，则尝试处理搜索
  if (pathSuffix.includes('generation') && originalBody.input?.messages) {
    let fullUserMessage = '';
    try {
        if (originalBody.input.messages.length > 0) {
            fullUserMessage = originalBody.input.messages[originalBody.input.messages.length - 1].content || '';
        }
    } catch (e) {
        fullUserMessage = originalBody.input?.messages?.[0]?.content || '';
    }

    if (fullUserMessage && shouldSearch(fullUserMessage)) {
      let finalPrompt = fullUserMessage;
      try {
        const searchQuery = buildSearchQuery(fullUserMessage);
        const searchResults = await googleSearch(searchQuery, env);
        if (searchResults) {
          finalPrompt = fullUserMessage.replace(
            /(用户问题:\s*["']?[^"'\n]*)/i,
            `【联网搜索结果】\n${searchResults}\n\n---\n\n$1`
          );
        } else {
            finalPrompt = fullUserMessage.replace(
                /(用户问题:\s*["']?[^"'\n]*)/i,
                `【警告：未找到可验证的公开信息】\n\n请基于角色设定回答，但必须明确说明：无法核实该事件真实性，且不得虚构人物、日期、媒体、引述或细节。\n\n---\n\n$1`
            );
        }
      } catch (err) {
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

  // 4. 转发请求
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
    console.error('DashScope fetch failed:', error.message);
    return new Response('Upstream error.', { status: 502 });
  }

  return new Response(dashResponse.body, {
    status: dashResponse.status,
    statusText: dashResponse.statusText,
    headers: {
      'Content-Type': dashResponse.headers.get('Content-Type') || 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Vary': 'Origin',
    },
  });
}
