// ══════════════════════════════════════════════
// hotspot.js —— 领域今日热点（前端）
// 依赖：全局 currentLang / categoryNames
// ══════════════════════════════════════════════

const HOTSPOT_CACHE = new Map(); // category -> { data, timestamp }
const HOTSPOT_TTL = 30 * 60 * 1000; // 30 分钟缓存

/**
 * 获取领域今日 Top3 热点
 * 走同域 /api/hotinfo 代理，彻底规避第三方 CORS；本地 30 分钟缓存
 */
async function fetchCategoryHotspots(category) {
  const now = Date.now();
  const cached = HOTSPOT_CACHE.get(category);
  if (cached && (now - cached.timestamp) < HOTSPOT_TTL) {
    return cached.data;
  }

  const lang = currentLang || 'zh-CN';
  let hotspots = [];

  try {
    const res = await fetch(
      `/api/hotinfo?category=${encodeURIComponent(category)}&lang=${encodeURIComponent(lang)}`
    );
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        hotspots = json.data;
      }
    }
  } catch (e) {
    console.warn('[Hotspot] API fetch failed:', e);
  }

  HOTSPOT_CACHE.set(category, { data: hotspots, timestamp: now });
  return hotspots;
}

/**
 * 渲染热点弹窗
 */
function renderHotspotDropdown(category, hotspots, anchorEl) {
  const old = document.getElementById('hotspot-dropdown');
  if (old) old.remove();

  const lang = currentLang || 'zh-CN';
  const displayName = (categoryNames[category] && categoryNames[category][lang]) || category;

  const dropdown = document.createElement('div');
  dropdown.id = 'hotspot-dropdown';
  dropdown.style.cssText = `
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 360px;
    max-width: 90vw;
    background: rgba(10, 15, 30, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 223, 216, 0.25);
    border-radius: 12px;
    padding: 16px;
    z-index: 1000;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 223, 216, 0.1);
    animation: fadeInDown 0.25s ease;
  `;

  const titleText = lang === 'en' ? `Today's Top 3` : `今日 ${displayName} 热点`;
  const addText = lang === 'en' ? 'Add to context' : '加入上下文';
  const emptyText = lang === 'en' ? 'No hotspots available' : '暂无热点数据';

  dropdown.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
      <div style="font-size:14px; font-weight:600; color:#00dfd8; letter-spacing:1px;">${titleText}</div>
    </div>
    <div class="hotspot-list">
      ${hotspots.length === 0 ? `<div style="color:rgba(255,255,255,0.4); font-size:13px; text-align:center; padding:20px;">${emptyText}</div>` :
        hotspots.map((h, idx) => {
          // 【修复】中文模式下，AR 来源的英文内容标注 [EN]
          const isEnglishContent = lang === 'zh-CN' && h.authority === 'AI-curated';
          const titleDisplay = isEnglishContent ? `${h.title} <span style="color:rgba(0,223,216,0.6);font-size:11px;">[EN]</span>` : h.title;
          
          return `
        <div class="hotspot-item" style="
          padding: 12px;
          margin-bottom: 8px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          transition: all 0.2s;
          cursor: default;
        ">
          <div style="display:flex; align-items:flex-start; gap:8px;">
            <div style="
              width: 20px; height: 20px; border-radius: 50%;
              background: ${idx === 0 ? 'rgba(255,200,100,0.2)' : idx === 1 ? 'rgba(200,200,200,0.15)' : 'rgba(200,150,100,0.15)'};
              color: ${idx === 0 ? '#ffc864' : idx === 1 ? '#ccc' : '#c89664'};
              font-size: 11px; font-weight: 700;
              display:flex; align-items:center; justify-content:center;
              flex-shrink: 0;
            ">${idx + 1}</div>
            <div style="flex:1; min-width:0;">
              <div style="font-size:13px; color:rgba(255,255,255,0.85); line-height:1.4; margin-bottom:4px;">${titleDisplay}</div>
              <div style="font-size:11px; color:rgba(255,255,255,0.35); display:flex; gap:8px;">
                <span>${h.source}</span><span>${h.time}</span>
              </div>
              <div style="font-size:12px; color:rgba(255,255,255,0.55); margin-top:6px; line-height:1.5;">${h.summary}</div>
            </div>
          </div>
          <button class="btn-add-context" data-id="${h.id}" style="
            margin-top: 8px;
            width: 100%;
            padding: 6px;
            background: rgba(0, 223, 216, 0.1);
            border: 1px solid rgba(0, 223, 216, 0.25);
            border-radius: 6px;
            color: #00dfd8;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s;
            display:flex; align-items:center; justify-content:center; gap:4px;
          ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            ${addText}
          </button>
        </div>
      `}).join('')}
    </div>
  `;

  const rect = anchorEl.getBoundingClientRect();
  const dropLeft = Math.min(rect.left + window.scrollX, window.innerWidth - 380);
  dropdown.style.top = `${rect.bottom + window.scrollY + 8}px`;
  dropdown.style.left = `${Math.max(8, dropLeft)}px`;

  document.body.appendChild(dropdown);

  const closeHandler = (e) => {
    if (!dropdown.contains(e.target) && e.target !== anchorEl && !anchorEl.contains(e.target)) {
      dropdown.remove();
      document.removeEventListener('click', closeHandler);
    }
  };
  setTimeout(() => document.addEventListener('click', closeHandler), 0);

  dropdown.querySelectorAll('.btn-add-context').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const hotspot = hotspots.find(h => h.id === id);
      if (hotspot) {
        addHotspotToContext(hotspot, category);
        btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00dfd8" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg> ${lang === 'en' ? 'Added' : '已加入'}`;
        btn.style.background = 'rgba(0, 223, 216, 0.2)';
        btn.style.borderColor = '#00dfd8';
        setTimeout(() => dropdown.remove(), 600);
      }
    });
  });
}

/**
 * 将热点加入北极星对话上下文
 */
function addHotspotToContext(hotspot, category) {
  if (!window.northStarContext) window.northStarContext = [];

  const entry = {
    type: 'hotspot',
    category: category,
    title: hotspot.title,
    summary: hotspot.summary,
    source: hotspot.source,
    addedAt: new Date().toISOString()
  };

  window.northStarContext.push(entry);
  window.dispatchEvent(new CustomEvent('northstar:context:updated', {
    detail: entry
  }));

  console.log('[Hotspot] Added to context:', entry);
}

// ══════════════════════════════════════════════
// 【CSS 动画注入】（首次调用时插入）
// ══════════════════════════════════════════════
(function injectHotspotStyles() {
  if (document.getElementById('hotspot-styles')) return;
  const style = document.createElement('style');
  style.id = 'hotspot-styles';
  style.textContent = `
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .hotspot-item:hover {
      background: rgba(255,255,255,0.06) !important;
      border-color: rgba(0, 223, 216, 0.15) !important;
    }
    .btn-add-context:hover {
      background: rgba(0, 223, 216, 0.2) !important;
      box-shadow: 0 0 8px rgba(0, 223, 216, 0.2);
    }
  `;
  document.head.appendChild(style);
})();
