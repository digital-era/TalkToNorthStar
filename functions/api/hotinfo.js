// functions/api/hotinfo.js
// Cloudflare Pages Function：代理获取领域热点，服务端无 CORS 限制

const HOTSPOT_SOURCES = {
  actuallyRelevant: {
    endpoint: 'https://actually-relevant-api.onrender.com/api/stories',
    issueMap: {
      'ai': 'science-technology',
      'quantum': 'science-technology',
      'universe': 'science-technology',
      'humanities': 'human-development',
      'art': 'human-development',
      'finance': 'human-development',
      'sport': 'human-development',
      'chinaEntrepreneurs': 'human-development'
    }
  },
  theNewsApi: {
    endpoint: 'https://api.thenewsapi.com/v1/news/top',
    token: null, // 从环境变量读取
    categoryMap: {
      'ai': 'tech',
      'quantum': 'tech',
      'universe': 'science',
      'humanities': 'general',
      'art': 'entertainment',
      'finance': 'business',
      'sport': 'sports',
      'chinaEntrepreneurs': 'business'
    }
  }
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
  // 第一层：Actually Relevant（无 Key，AI 精选）
  // ══════════════════════════════════════════════
  try {
    const issueSlug = HOTSPOT_SOURCES.actuallyRelevant.issueMap[category];
    if (issueSlug) {
      const res = await fetch(
        `${HOTSPOT_SOURCES.actuallyRelevant.endpoint}?issueSlug=${issueSlug}`,
        { headers: { 'Accept': 'application/json' } }
      );
      if (res.ok) {
        const data = await res.json();
        hotspots = (data.stories || []).slice(0, 3).map(s => ({
          id: `ar-${s.slug}`,
          title: s.title,
          source: s.source,
          time: s.publishedAt,
          summary: s.summary || s.blurb,
          url: s.url,
          authority: 'AI-curated'
        }));
      }
    }
  } catch (e) {
    console.warn('[Hotspot API] Actually Relevant failed:', e);
  }

  // ══════════════════════════════════════════════
  // 第二层：The News API（需环境变量 THE_NEWS_API_TOKEN）
  // ══════════════════════════════════════════════
  if (hotspots.length === 0 && env.THE_NEWS_API_TOKEN) {
    try {
      const cat = HOTSPOT_SOURCES.theNewsApi.categoryMap[category];
      const res = await fetch(
        `${HOTSPOT_SOURCES.theNewsApi.endpoint}?` +
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
    } catch (e) {
      console.warn('[Hotspot API] The News API failed:', e);
    }
  }

  // 【注意】不做 Mock 兜底，外部 API 都失败则返回空数组
  // 前端弹窗会显示"暂无热点数据"

  return new Response(JSON.stringify({ success: true, data: hotspots }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
