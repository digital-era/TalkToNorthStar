// functions/api/hotinfo.js
// Cloudflare Pages Function：代理获取领域热点，服务端无 CORS 限制
// 策略：ai/quantum/universe 走 Actually Relevant，其余走 The News API

const AR_ENDPOINT = 'https://actually-relevant-api.onrender.com/api/stories';

// 仅 ai/quantum/universe 走 Actually Relevant
const AR_CATEGORIES = new Set(['ai', 'quantum', 'universe']);

// The News API 分类映射
const NEWS_CATEGORY_MAP = {
  'ai': 'tech',
  'quantum': 'tech',
  'universe': 'science',
  'humanities': 'general',
  'art': 'entertainment',
  'finance': 'business',
  'sport': 'sports',
  'chinaEntrepreneurs': 'business'
};

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const category = url.searchParams.get('category');
  const lang = url.searchParams.get('lang') || 'zh-CN';

  if (!category) {
    return new Response(JSON.stringify({ success: false, error: 'Missing category' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  let hotspots = [];

  // ══════════════════════════════════════════════
  // 第一层：Actually Relevant（仅科技类领域）
  // ══════════════════════════════════════════════
  if (AR_CATEGORIES.has(category)) {
    try {
      const res = await fetch(
        `${AR_ENDPOINT}?issueSlug=science-technology`,
        { headers: { 'Accept': 'application/json' } }
      );
      if (res.ok) {
        const data = await res.json();
        // 注意：API 返回 { data: [...] }，不是 { stories: [...] }
        hotspots = (data.data || []).slice(0, 3).map(s => ({
          id: `ar-${s.slug}`,
          title: s.title,
          source: s.sourceTitle || s.sourceUrl,
          time: s.datePublished,
          summary: s.summary,
          url: s.sourceUrl,
          authority: 'AI-curated'
        }));
      }
    } catch (e) {
      console.warn('[Hotspot API] Actually Relevant failed:', e);
    }
  }

  // ══════════════════════════════════════════════
  // 第二层：The News API（非科技类领域直接走这里，科技类兜底也走这里）
  // 需环境变量 THE_NEWS_API_TOKEN
  // ══════════════════════════════════════════════
  if (hotspots.length === 0 && env.THE_NEWS_API_TOKEN) {
    try {
      const cat = NEWS_CATEGORY_MAP[category];
      if (cat) {
        const res = await fetch(
          `https://api.thenewsapi.com/v1/news/top?` +
          `api_token=${env.THE_NEWS_API_TOKEN}&` +
          `categories=${cat}&limit=3&language=${lang === 'zh-CN' ? 'zh' : 'en'}`
        );
        if (res.ok) {
          const data = await res.json();
          hotspots = (data.data || []).map(a => ({
            id: `tn-${a.uuid}`,
            title: a.title,
            source: a.source,
            time: a.published_at,
            summary: a.snippet || a.description,
            url: a.url,
            authority: a.source
          }));
        }
      }
    } catch (e) {
      console.warn('[Hotspot API] The News API failed:', e);
    }
  }

  // 不做 Mock 兜底，外部 API 都失败则返回空数组
  // 前端弹窗会显示"暂无热点数据"

  return new Response(JSON.stringify({ success: true, data: hotspots }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
