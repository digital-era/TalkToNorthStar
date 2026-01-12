/**
 * /functions/api/qwenproxy.js
 * 
 * Universal BYOK Proxy with Dynamic Role-Aware Web Search
 * Adapted for Cloudflare Pages Functions
 */

const ALLOWED_ORIGIN = 'https://talktonorthstar.pages.dev';
// 注意：由于这是一个具体的文件路由，我们需要指定确切的上游 Qwen API 地址
// 如果你需要支持不同的 Qwen 模型路径，请根据前端请求参数进行动态调整，这里默认为文本生成接口
const UPSTREAM_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation';
const ALLOWED_HEADERS = 'Content-Type, X-API-Key, Authorization';

// === 辅助函数定义 ===

// 判断是否需要触发搜索
function shouldSearch(fullPrompt) {
  const match = fullPrompt.match(/用户问题:\s*["']?([^\n]+)/i);
  const question = match ? match[1] : fullPrompt;
  const lower = question.toLowerCase();
  return /(\d{4}年|明年|最新|刚刚|最近|今日|今天|新闻|事件|采访|发布会|\d{2}年)/.test(lower);
}

// 👑 核心：动态提取角色名 + 构建高召回搜索 query
function buildSearchQuery(fullPrompt) {
  // 1. 提取角色
  let subject = "public figure";
  const roleMatch = fullPrompt.match(/背景设定:\s*你是\s*([^.。]+)[.。]/i);
  if (roleMatch) {
    subject = roleMatch[1].trim(); 
  }

  // 2. 提取用户问题
  const questionMatch = fullPrompt.match(/用户问题:\s*["']?([^\n]+)/i);
  let userQuestion = questionMatch ? questionMatch[1].trim() : "";

  // 3. 智能标准化
  let refined = userQuestion
    .replace(/\b(\d{2})年\b/g, (match, p1) => {
      const num = parseInt(p1, 10);
      return (num >= 20 && num <= 29) ? `20${num}年` : match;
    })
    .replace(/\b(三小时|3个小时|三个小时|3小时)\b/g, "3 hour interview")
    .replace(/请先通过网络搜索核实|请核实|请搜索|核心内容|主要内容|说了什么|要点/i, "")
    .trim();

  // 4. 组合最终 query
  const query = `${subject} ${refined}`.trim();
  return query || subject;
}

// 调用 Google Programmable Search Engine
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

// === Pages Functions 处理程序 ===

// 处理 CORS 预检请求 (OPTIONS)
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

// 处理 POST 请求
export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('Origin') || '';
  const url = new URL(request.url);

  // 1. Origin 校验
  if (origin !== ALLOWED_ORIGIN) {
    return new Response('Forbidden: Invalid origin.', { status: 403 });
  }

  // 2. API Key 校验
  const userApiKey = request.headers.get('X-API-Key');
  if (!userApiKey) {
    return new Response('Missing X-API-Key header.', { status: 400 });
  }

  // 3. 解析请求体
  let originalBody;
  try {
    originalBody = await request.json();
  } catch (e) {
    return new Response('Invalid JSON body.', { status: 400 });
  }

  // 4. 提取用户完整消息
  let fullUserMessage = '';
  try {
    if (originalBody.input?.messages?.length > 0) {
      fullUserMessage = originalBody.input.messages[originalBody.input.messages.length - 1].content || '';
    }
  } catch (e) {
    console.warn('Full message parse failed');
    fullUserMessage = originalBody.input?.messages?.[0]?.content || '';
  }

  if (!fullUserMessage) {
    return new Response('Empty user message.', { status: 400 });
  }

  let finalPrompt = fullUserMessage;

  // 5. 按需触发智能搜索
  if (shouldSearch(fullUserMessage)) {
    try {
      const searchQuery = buildSearchQuery(fullUserMessage);
      console.log("🔍 Dynamic search query:", searchQuery);
      // 注意：这里传入 context.env
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
  }

  // 6. 转发到 DashScope/Qwen
  // 保持原有 URL 的 query parameters (如果有)
  const targetUrl = `${UPSTREAM_URL}${url.search}`;
  
  const dashRequest = new Request(targetUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userApiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'BYOK-Qwen-Proxy/universal-role-search-pages',
    },
    body: JSON.stringify({
      ...originalBody,
      input: { messages: [{ role: "user", content: finalPrompt }] },
      parameters: {
        ...originalBody.parameters,
        plugins: undefined,
        function_call: undefined
      }
    }),
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
