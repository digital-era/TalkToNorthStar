/**
 * Cloudflare Pages Function
 * 路由: /api/starry-column
 * 方法: GET (读取) / POST (保存) / OPTIONS (预检)
 */

// CORS 响应头
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
};

// KV 存储键名
const KV_KEY = 'starryColumnCards';

/**
 * GET /api/starry-column - 读取持久化数据
 */
export async function onRequestGet(context) {
    const { env } = context;

    try {
        const data = await env.STARRY_KV.get(STARRY_KV_KEY, 'json');

        if (!data) {
            // 首次访问，返回空结构
            return new Response(JSON.stringify({
                _schema: 2,
                _savedAt: Date.now(),
                cards: []
            }), { headers: corsHeaders });
        }

        return new Response(JSON.stringify(data), { headers: corsHeaders });

    } catch (e) {
        console.error('KV GET error:', e);
        return new Response(JSON.stringify({
            error: 'Failed to read from KV',
            message: e.message
        }), {
            status: 500,
            headers: corsHeaders
        });
    }
}

/**
 * POST /api/starry-column - 保存数据到 KV
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        // 解析请求体
        const body = await request.json();

        // 校验基本结构
        if (!body || typeof body !== 'object') {
            return new Response(JSON.stringify({
                error: 'Invalid request body'
            }), {
                status: 400,
                headers: corsHeaders
            });
        }

        // 补充元数据
        const payload = {
            _schema: 2,
            _savedAt: Date.now(),
            cards: body.cards || []
        };

        // 写入 KV
        await env.STARRY_KV.put(KV_KEY, JSON.stringify(payload));

        return new Response(JSON.stringify({
            success: true,
            savedAt: payload._savedAt,
            cardCount: payload.cards.length
        }), { headers: corsHeaders });

    } catch (e) {
        console.error('KV PUT error:', e);
        return new Response(JSON.stringify({
            error: 'Failed to save to KV',
            message: e.message
        }), {
            status: 500,
            headers: corsHeaders
        });
    }
}

/**
 * OPTIONS /api/starry-column - CORS 预检
 */
export async function onRequestOptions() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    });
}
