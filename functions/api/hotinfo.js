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
  // 【注意】AR API 仅返回英文内容，中文模式下标题会标注 [EN]
  // ══════════════════════════════════════════════
  if (AR_CATEGORIES.has(category)) {
    try {
      // 尝试传递 language 参数（API 可能不支持，但无负面影响）
      const langParam = lang === 'zh-CN' ? 'zh' : 'en';
      const res = await fetch(
        `${AR_ENDPOINT}?issueSlug=science-technology&language=${langParam}`,
        { headers: { 'Accept': 'application/json' } }
      );
      if (res.ok) {
        const data = await res.json();
        hotspots = (data.data || []).slice(0, 3).map(s => ({
          id: `ar-${s.slug}`,
          title: s.title,
          source: s.sourceTitle || s.sourceUrl,
          time: s.datePublished,
          summary: s.summary,
          url: s.sourceUrl,
          authority: 'AI-curated'  // 标记为 AI 精选，前端据此判断语言
        }));
      }
    } catch (e) {
      console.warn('[Hotspot API] Actually Relevant failed:', e);
    }
  }

  // ══════════════════════════════════════════════
  // 第二层：The News API（非科技类领域直接走这里，科技类兜底也走这里）
  // 【修复】中文请求改为 zh，但 The News API 返回繁体，需前端处理或接受
  // ══════════════════════════════════════════════
  if (hotspots.length === 0 && env.THE_NEWS_API_TOKEN) {
    try {
      const cat = NEWS_CATEGORY_MAP[category];
      if (cat) {
        // The News API 的 language 参数：zh 返回繁体，无法指定简体
        const newsLang = lang === 'zh-CN' ? 'zh' : 'en';
        const res = await fetch(
          `https://api.thenewsapi.com/v1/news/top?` +
          `api_token=${env.THE_NEWS_API_TOKEN}&` +
          `categories=${cat}&limit=3&language=${newsLang}`
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
            authority: a.source  // 标记为真实媒体源
          }));
        }
      }
    } catch (e) {
      console.warn('[Hotspot API] The News API failed:', e);
    }
  }

  return new Response(JSON.stringify({ success: true, data: hotspots }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300'
    }
  });
}
