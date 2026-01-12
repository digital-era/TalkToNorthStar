/**
 * /functions/api/qwenproxy/[[path]].js
 * 
 * Universal BYOK Proxy with Dynamic Routing & Debug Headers
 * 优化版：智能搜索关键词构建 + 上下文历史保留
 */

const ALLOWED_ORIGIN = 'https://talktonorthstar.pages.dev';
const TARGET_HOST = 'https://dashscope.aliyuncs.com';
const ALLOWED_HEADERS = 'Content-Type, X-API-Key, Authorization';

// === 工具：安全编码 Header 值 (防止中文乱码或超长) ===
const safeHeader = (val) => {
  if (!val) return "";
  return encodeURIComponent(String(val)).substring(0, 800);
};

// === 辅助函数：是否需要搜索 ===
function shouldSearch(fullPrompt) {
  // 提取用户实际问题（去掉 System Prompt 或 Wrap）
  const match = fullPrompt.match(/用户问题:\s*["']?([^\n]+)/i);
  const question = match ? match[1] : fullPrompt;
  const lower = question.toLowerCase();
  
  // 关键词匹配：包含具体年份、时效性词汇
  // 移除了单纯的 \d{2}年 防止误判，保留 \d{4}年
  return /(\d{4}年|明年|最新|刚刚|最近|今日|今天|新闻|事件|采访|发布会|结果|现状|如何|现在)/.test(lower);
}

// === 辅助函数：构建高精准搜索词 (Search Query Engineering) ===
function buildSearchQuery(fullPrompt) {
  let subject = "";
  
  // 1. 提取角色/主体 (Context)
  const roleMatch = fullPrompt.match(/背景设定:\s*你是\s*([^.。]+)[.。]/i);
  if (roleMatch) {
    subject = roleMatch[1].trim(); 
  }

  // 2. 提取核心问题
  const questionMatch = fullPrompt.match(/用户问题:\s*["']?([^\n]+)/i);
  let userQuestion = questionMatch ? questionMatch[1].trim() : fullPrompt;

  // 3. 深度清洗 (NLP 去噪)
  let refined = userQuestion
    // 去除 Prompt 指令词
    .replace(/请先通过网络搜索核实|请核实|请搜索|核心内容|主要内容|说了什么|要点|根据最新信息|介绍下|请问|告诉|描述|分析/gi, " ")
    // 去除高频无意义虚词 (Stop Words)
    .replace(/(关于|的|了|吗|什么|是|在|对|有|和|与|及)/g, " ")
    // 规范化年份 (如：26年 -> 2026年)
    .replace(/\b(\d{2})年\b/g, (match, p1) => {
      const num = parseInt(p1, 10);
      // 假设 20-99 指 20xx年
      return (num >= 20 && num <= 99) ? `20${num}年` : match;
    })
    // 压缩多余空格
    .replace(/\s+/g, " ")
    .trim();

  // 4. 组合最终 Query
  // 逻辑：主体 + 核心关键词
  // 例如：输入 "介绍下2026年你接受3个小时采访的" -> 输出 "Elon Musk 2026年 3个小时 采访"
  const query = `${subject} ${refined}`.trim();
  
  // 如果清洗后为空，只搜主体（虽然很少见）
  return query || subject;
}

// === 辅助函数：Google 搜索 ===
async function googleSearch(query, env) {
  if (!env.GOOGLE_SEARCH_KEY || !env.GOOGLE_SEARCH_ENGINE_ID) {
    throw new Error('Env vars missing: GOOGLE_SEARCH_KEY or GOOGLE_SEARCH_ENGINE_ID');
  }
  
  // 基础 URL
  let url = `https://www.googleapis.com/customsearch/v1?key=${env.GOOGLE_SEARCH_KEY}&cx=${env.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=3`;
  
  // [可选优化] 如果查询词包含“最新、新闻、Today”，可以强制加上 dateRestrict 参数
  // if (query.includes('最新') || query.includes('新闻')) {
  //   url += '&dateRestrict=m1'; // 限制最近一个月
  // }

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API Error ${res.status}: ${text}`);
  }
  const data = await res.json();
  
  // 格式化输出：标题 + 链接 + 摘要
  return data.items?.map(item => `标题: ${item.title}\n链接: ${item.link}\n摘要: ${item.snippet}`).join('\n\n') || '';
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

  // 0. 初始化调试 Headers
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

  // === 3. 处理搜索逻辑 (RAG) ===
  let finalBody = originalBody;
  
  // 检查是否为生成请求且包含 messages
  const isGenerationRequest = pathSuffix.includes('generation') && 
                              originalBody.input?.messages && 
                              Array.isArray(originalBody.input.messages);
  
  if (isGenerationRequest) {
    const messages = originalBody.input.messages;
    // 获取最后一条用户消息
    let lastUserMessage = '';
    let lastMsgIndex = -1;

    // 从后往前找 role='user'
    for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === 'user') {
            lastUserMessage = messages[i].content || '';
            lastMsgIndex = i;
            break;
        }
    }

    // [DEBUG] 
    debugHeaders['x-debug-1-prompt-extracted'] = safeHeader(lastUserMessage.substring(0, 50));
    
    const needSearch = shouldSearch(lastUserMessage);
    debugHeaders['x-debug-2-should-search'] = needSearch.toString();

    if (lastUserMessage && needSearch) {
      // 深度克隆 input 对象，避免修改引用
      const newMessages = JSON.parse(JSON.stringify(messages));
      
      try {
        const searchQuery = buildSearchQuery(lastUserMessage);
        debugHeaders['x-debug-3-search-query'] = safeHeader(searchQuery);

        // 执行搜索
        const searchResults = await googleSearch(searchQuery, env);
        debugHeaders['x-debug-4-google-result'] = safeHeader(searchResults ? "FOUND_RESULTS" : "NO_RESULTS");

        let newContent = lastUserMessage;

        if (searchResults) {
          // 注入搜索结果
          // 策略：将搜索结果插在 Prompt 头部，明确标注
          if (newContent.includes('用户问题:')) {
             // 针对特定格式的 Prompt 注入
             newContent = newContent.replace(
                /(用户问题:\s*["']?[^"'\n]*)/i,
                `【联网实时信息】\n${searchResults}\n\n---\n\n$1`
              );
          } else {
             // 普通 Prompt 注入
             newContent = `参考以下网络搜索结果回答问题：\n【搜索结果】\n${searchResults}\n\n【用户问题】\n${newContent}`;
          }
        } else {
            // 搜索无结果
            debugHeaders['x-debug-warning'] = "Search_executed_but_empty";
            if (newContent.includes('用户问题:')) {
                newContent = newContent.replace(
                    /(用户问题:\s*["']?[^"'\n]*)/i,
                    `【提示：未在近期网络信息中找到相关记录】\n\n$1`
                );
            }
        }

        // 更新最后一条消息的内容
        newMessages[lastMsgIndex].content = newContent;

      } catch (err) {
        debugHeaders['x-debug-error'] = safeHeader(err.message);
        console.error("⚠️ Google search failed:", err.message);
        // 出错时不修改 Prompt，直接透传原始请求
      }
      
      // 更新 Body
      finalBody = {
        ...originalBody,
        input: { 
            ...originalBody.input,
            messages: newMessages // 使用更新后的消息列表，保留了历史
        },
        parameters: {
          ...originalBody.parameters,
          // 移除可能导致冲突的插件参数
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
  
  newHeaders.set('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  newHeaders.set('Vary', 'Origin');

  Object.keys(debugHeaders).forEach(key => {
      newHeaders.set(key, debugHeaders[key]);
  });

  return new Response(dashResponse.body, {
    status: dashResponse.status,
    statusText: dashResponse.statusText,
    headers: newHeaders,
  });
}
