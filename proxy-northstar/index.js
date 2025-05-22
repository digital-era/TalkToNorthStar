// 阿里云函数计算 HTTP 触发器示例：API 代理并加 CORS
const fetch = require('node-fetch'); // FC Node.js 18+ 内置 fetch，可去掉此行

module.exports.handler = async (event, context, callback) => {
  // 解析 event
  const { method, headers, path, queries, body: eventBody, url } = event;

  // 1. 允许跨域
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  // 2. 处理预检请求（OPTIONS）
  if (method === "OPTIONS") {
    callback(null, {
      statusCode: 204,
      headers: corsHeaders,
      body: ""
    });
    return;
  }

  // 3. 配置目标API，比如 https://hf-mirror.com/v1/chat/completions
  const targetApi = "https://hf-mirror.com/v1/chat/completions";

  // 4. 组装请求
  let fetchOptions = {
    method,
    headers: {
      ...headers,
      host: undefined  // 避免 host 头转发
    },
    body: eventBody && (method === "POST" || method === "PUT") ? eventBody : undefined
  };

  // 5. 转发请求
  try {
    const res = await fetch(targetApi, fetchOptions);
    const resText = await res.text();
    // 保持原 API 的 Content-Type
    const contentType = res.headers.get("content-type") || "application/json";
    callback(null, {
      statusCode: res.status,
      headers: {
        ...corsHeaders,
        "content-type": contentType
      },
      body: resText
    });
  } catch (err) {
    callback(null, {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message })
    });
  }
};
