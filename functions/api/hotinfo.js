// functions/api/hotinfo.js
// Cloudflare Pages Function：使用 Currents API 获取每个类别的 Top 1 深度实时报道（完整文章内容）

// 仅使用您原有的 NEWS_CATEGORY_MAP 中的类别进行映射
const CURRENTS_CATEGORY_MAP = {
  'ai': 'science_technology',
  'quantum': 'science_technology',
  'universe': 'science_technology',
  'humanities': 'general',
  'art': 'arts_culture_entertainment',
  'finance': 'economy_business_finance',
  'sport': 'sport',
  'chinaEntrepreneurs': 'economy_business_finance'
};

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  const category = url.searchParams.get('category');
  const langParam = url.searchParams.get('lang') || 'zh-CN';

  if (!category) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Missing category parameter' 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // 语言转换
  const language = langParam.startsWith('zh') ? 'zh' : 'en';

  let hotspots = [];

  try {
    // 使用原有类别映射，不增加新类别
    const currentsCategory = CURRENTS_CATEGORY_MAP[category] || 'general';

    const apiUrl = new URL('https://api.currentsapi.services/v1/latest-news');
    apiUrl.searchParams.set('language', language);
    apiUrl.searchParams.set('category', currentsCategory);
    apiUrl.searchParams.set('page_size', '1');           // 仅返回 Top 1
    apiUrl.searchParams.set('apiKey', env.CURRENTS_API_KEY);

    const res = await fetch(apiUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; HotspotFetcher/1.0)'
      }
    });

    if (!res.ok) {
      throw new Error(`Currents API error: ${res.status}`);
    }

    const data = await res.json();

    if (data.news && data.news.length > 0) {
      const article = data.news[0];

      hotspots = [{
        id: `currents-${article.id || Date.now()}`,
        title: article.title,
        summary: article.description || '',
        content: article.content || article.description || '', // 完整文章内容
        source: article.source?.name || article.author || 'Unknown',
        time: article.published 
          ? new Date(article.published).toLocaleString(langParam === 'zh-CN' ? 'zh-CN' : 'en-US')
          : '',
        url: article.url,
        image: article.image || '',
        authority: 'Currents'
      }];
    }

  } catch (error) {
    console.error('[Hotspot API - Currents] Error:', error);
  }

  return new Response(JSON.stringify({ 
    success: true, 
    data: hotspots 
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=600'
    }
  });
}
