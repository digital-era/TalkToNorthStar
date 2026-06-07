/**
 * Cloudflare Pages Function
 * 路由: /api/starry-column
 */

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
};

const KV_KEY = 'starryColumnCards';

/**
 * GET - 读取
 */
export async function onRequestGet(context) {
    const { env } = context;

    try {
        // 绑定名是 STARRY_KV_KEY
        const data = await env.STARRY_KV_KEY.get(KV_KEY, 'json');

        if (!data) {
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
        }), { status: 500, headers: corsHeaders });
    }
}

/**
 * POST - 保存
 */
export async function onRequestPost(context) {
    const { request, env } = context;

    try {
        const body = await request.json();

        if (!body || typeof body !== 'object') {
            return new Response(JSON.stringify({
                error: 'Invalid request body'
            }), { status: 400, headers: corsHeaders });
        }

        const payload = {
            _schema: 2,
            _savedAt: Date.now(),
            cards: body.cards || []
        };

        // 绑定名是 STARRY_KV_KEY
        await env.STARRY_KV_KEY.put(KV_KEY, JSON.stringify(payload));

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
        }), { status: 500, headers: corsHeaders });
    }
}

/**
 * OPTIONS - CORS 预检
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
