// ══════════════════════════════════════════════
// hotspot.js —— 领域今日热点（前端）
// 依赖：全局 currentLang / categoryNames
// ══════════════════════════════════════════════

// hotspot.js —— 领域今日热点（前端）

const HOTSPOT_CACHE = new Map(); // category -> { data, timestamp }
const HOTSPOT_TTL = 30 * 60 * 1000; // 30 分钟缓存

/**
 * 获取领域今日 Top 1 深度热点
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
 * 渲染热点弹窗（调整为 Top 1）
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
    width: 380px;
    max-width: 92vw;
    background: rgba(10, 15, 30, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(0, 223, 216, 0.25);
    border-radius: 12px;
    padding: 16px;
    z-index: 1000;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 223, 216, 0.1);
    animation: fadeInDown 0.25s ease;
  `;

  const titleText = lang === 'en' ? `Today's Top 1` : `今日 ${displayName} 热点`;
  const addText = lang === 'en' ? 'Add to context' : '加入上下文';
  const emptyText = lang === 'en' ? 'No hotspot available' : '暂无热点数据';

  dropdown.innerHTML = `
    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
      <div style="font-size:14px; font-weight:600; color:#00dfd8; letter-spacing:1px;">${titleText}</div>
    </div>
    <div class="hotspot-list">
      ${hotspots.length === 0 ? `<div style="color:rgba(255,255,255,0.4); font-size:13px; text-align:center; padding:40px;">${emptyText}</div>` :
        hotspots.map((h) => `
        <div class="hotspot-item" style="
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
        ">
          <div style="font-size:14px; color:rgba(255,255,255,0.9); line-height:1.5; margin-bottom:8px;">${h.title}</div>
          <div style="font-size:12px; color:rgba(255,255,255,0.55); line-height:1.6; margin-bottom:12px;">${h.content ? h.content.substring(0, 220) + '...' : h.summary}</div>
          <div style="font-size:11px; color:rgba(255,255,255,0.4); display:flex; gap:8px; margin-bottom:12px;">
            <span>${h.source}</span>
            <span>${h.time}</span>
          </div>
          <button class="btn-add-context" data-id="${h.id}" style="
            width: 100%;
            padding: 8px;
            background: rgba(0, 223, 216, 0.1);
            border: 1px solid rgba(0, 223, 216, 0.3);
            border-radius: 6px;
            color: #00dfd8;
            font-size: 13px;
            cursor: pointer;
          ">
            ${addText}
          </button>
        </div>
      `).join('')}
    </div>
  `;

  // 定位与关闭逻辑（保持不变）
  const rect = anchorEl.getBoundingClientRect();
  dropdown.style.top = `${rect.bottom + window.scrollY + 8}px`;
  dropdown.style.left = `${Math.max(8, Math.min(rect.left + window.scrollX, window.innerWidth - 400))}px`;

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
