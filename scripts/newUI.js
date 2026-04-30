// newUI.js —— 新界面：缘动转盘 + 左右布局
// 依赖：全局 allData / translations / selectLeader / openTab / generateChipsForCategory

const categories = ['ai','quantum','universe','humanities','art','finance','sport','chinaEntrepreneurs'];
// 图片路径映射 - key 就是原始 category 值
const categoryImages = {
  'ai': 'images/ambient-ai.jpg',
  'quantum': 'images/ambient-quantum.jpg',
  'universe': 'images/ambient-universe.jpg',
  'humanities': 'images/ambient-humanities.jpg',
  'art': 'images/ambient-art.jpg',
  'finance': 'images/ambient-finance.jpg',
  'sport': 'images/ambient-sport.jpg',
  'chinaEntrepreneurs': 'images/ambient-chinaEntrepreneurs.jpg'
};

const categoryNames = {
  'ai': { 'zh-CN': '人工智能', 'en': 'AI' },
  'quantum': { 'zh-CN': '量子', 'en': 'Quantum' },
  'universe': { 'zh-CN': '宇宙', 'en': 'Universe' },
  'humanities': { 'zh-CN': '人文', 'en': 'Humanities' },
  'art': { 'zh-CN': '艺术', 'en': 'Art' },
  'finance': { 'zh-CN': '金融', 'en': 'Finance' },
  'sport': { 'zh-CN': '竞技', 'en': 'Sport' },
  'chinaEntrepreneurs': { 'zh-CN': '中华', 'en': 'Chinese' }
};

// 按钮/提示文本映射
const uiTexts = {
  'zh-CN': {
    spin: '✦ 缘动',
    destiny: '缘定',
    confirm: '确认选择',
    backToWheel: '返回转盘',
    backTooltip: '返回转盘 (ESC)',
    noMatch: '无匹配的北极星',
    searchPlaceholder: '搜索...',
    labelContribution: '贡献',
    labelField: '领域',
    labelRemarks: '评注'
  },
  'en': {
    spin: '✦ Spin',
    destiny: 'Destiny',
    confirm: 'Confirm',
    backToWheel: 'Back to Wheel',
    backTooltip: 'Back to Wheel (ESC)',
    noMatch: 'No matching North Star',
    searchPlaceholder: 'Search...',
    labelContribution: 'Contribution',
    labelField: 'Field',
    labelRemarks: 'Remarks'
  }
};

// 快捷获取当前语言文本
function t(key) {
  const lang = currentLang || 'zh-CN';
  return uiTexts[lang]?.[key] || uiTexts['zh-CN'][key];
}

let currentSelectedCategory = null;

// 大类中文 / 英文名称（从 translations 动态获取）
function getCategoryName(cat) {
  const key = 'tab' + cat.charAt(0).toUpperCase() + cat.slice(1);
  if (typeof translations !== 'undefined' && translations[currentLang]) {
    return translations[currentLang][key] || cat;
  }
  return cat;
}

// ──────────────────────────────────────────────
// 转盘类
// ──────────────────────────────────────────────
class DestinyWheel {
  constructor(canvas, categories, namesMap) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.categories = categories;
    this.namesMap = namesMap;
    this.angle = 0;
    this.spinning = false;
    this.animId = null;
    this.targetAngle = 0;
    this.spinSpeed = 0;
    this.maxSpeed = 0.5;
    this.deceleration = 0.985;
    this.stopThreshold = 0.003;
    this.onSelect = null;
    this.onPendingSelect = null;
    this.pendingCategory = null;
    this.dragging = false;
    this.lastMouseAngle = 0;
    this.dragThreshold = 5;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.locked = false;
    this.isPointerDown = false;

    // 【方案2核心】CSS 已控制尺寸，JS 只负责像素密度和绘制
    // 初始化时直接设置画布像素，无需等待布局
    this._initCanvas();
    this.draw();
    
    // 绑定 resize（防抖）
    this._bindResize();
    this._bindDragEvents();
    this._bindConfirmButton();
  }

  // 【方案2核心】初始化 Canvas 像素尺寸
  // 【修复】增加安全判断，防止半径为负
  _initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    // 保底：如果取不到尺寸，先设一个最小值
    const cssWidth = displayWidth > 0 ? displayWidth : 300;
    const cssHeight = displayHeight > 0 ? displayHeight : 300;

    this.canvas.width = cssWidth * dpr;
    this.canvas.height = cssHeight * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 【关键修复】确保半径不会为负数
    this._radius = Math.max(20, (Math.min(cssWidth, cssHeight) / 2) - 10);
  }

  // 【方案2核心】窗口大小变化时重绘
  // 【修复】resize 时也重置变换矩阵
  _bindResize() {
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._initCanvas();
        this.draw();
      }, 200);
    });
  }

  get radius() {
    // 【修复】保底返回值
    return Math.max(20, this._radius || 150);
  }

  // 绘制方法（与之前一致，使用 this.radius）
  draw() {
    const ctx = this.ctx;
    const dpr = window.devicePixelRatio || 1;
    
    // 计算中心点（基于 CSS 像素）
    const cssWidth = this.canvas.width / dpr;
    const cssHeight = this.canvas.height / dpr;
    const w = cssWidth / 2;
    const h = cssHeight / 2;
    const r = this.radius;
    const slice = (2 * Math.PI) / this.categories.length;

    ctx.clearRect(0, 0, cssWidth, cssHeight);

    // 外发光圆环
    ctx.save();
    ctx.shadowColor = 'rgba(0, 223, 216, 0.15)';
    ctx.shadowBlur = 40;
    ctx.beginPath();
    ctx.arc(w, h, r + 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(30, 43, 60, 0.4)';
    ctx.fill();
    ctx.restore();

    for (let i = 0; i < this.categories.length; i++) {
      const start = this.angle + i * slice;
      const end = start + slice;

      ctx.beginPath();
      ctx.moveTo(w, h);
      ctx.arc(w, h, r, start, end);

      if (this.pendingCategory === this.categories[i]) {
        ctx.fillStyle = '#3a6a9c';
      } else {
        ctx.fillStyle = i % 2 === 0 ? '#1e2b3c' : '#2c3e50';
      }
      ctx.fill();

      ctx.strokeStyle = '#00dfd8';
      ctx.lineWidth = 2;
      ctx.stroke();

      this._drawSectorText(ctx, w, h, r, start, slice, this.categories[i]);
    }

    // 中心装饰圆
    ctx.beginPath();
    ctx.arc(w, h, r * 0.12, 0, 2 * Math.PI);
    ctx.fillStyle = '#050a14';
    ctx.fill();
    ctx.strokeStyle = '#00dfd8';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 中心小圆点
    ctx.beginPath();
    ctx.arc(w, h, r * 0.04, 0, 2 * Math.PI);
    ctx.fillStyle = '#00dfd8';
    ctx.fill();
  }

  // 沿扇形弧度绘制文字
  _drawSectorText(ctx, cx, cy, r, startAngle, slice, category) {
    const text = this.namesMap[category] || '';
    const midAngle = startAngle + slice / 2;
    const textRadius = r * 0.55;
    const x = cx + Math.cos(midAngle) * textRadius;
    const y = cy + Math.sin(midAngle) * textRadius;

    ctx.save();
    ctx.translate(x, y);

    let rotation = midAngle + Math.PI / 2;
    if (rotation > Math.PI / 2 && rotation < 3 * Math.PI / 2) {
      rotation += Math.PI;
    }
    ctx.rotate(rotation);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const fontSize = Math.max(16, r * 0.08);
    ctx.font = `bold ${fontSize}px "Noto Serif SC", "Poppins", sans-serif`;

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.lineWidth = fontSize * 0.15;
    ctx.lineJoin = 'round';
    ctx.strokeText(text, 0, 0);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(text, 0, 0);

    ctx.shadowColor = 'rgba(0, 223, 216, 0.4)';
    ctx.shadowBlur = 10;
    ctx.fillText(text, 0, 0);

    ctx.restore();
  }

  spin() {
    if (this.spinning) return;
    this.locked = false;
    this.clearPending();
    this.spinning = true;

    const minSpins = 3;
    const maxSpins = 6;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    this.targetAngle = this.angle + spins * 2 * Math.PI;

    this.spinSpeed = this.maxSpeed;
    this.animate();
  }

  animate() {
    if (!this.spinning) return;

    this.spinSpeed *= this.deceleration;
    this.angle += this.spinSpeed;

    if (this.spinSpeed < this.stopThreshold || this.angle >= this.targetAngle) {
      this.angle = this.targetAngle % (2 * Math.PI);
      this.spinning = false;
      this.spinSpeed = 0;
      this.selectByAngle();
      return;
    }

    this.draw();
    this.animId = requestAnimationFrame(() => this.animate());
  }

  stop() {
    if (!this.spinning) return;
    this.spinning = false;
    cancelAnimationFrame(this.animId);
    this.clearPending();
    this.selectByAngle();
  }

  selectByAngle() {
    const norm = ((this.angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const slice = (2 * Math.PI) / this.categories.length;
    const pointerAngle = 3 * Math.PI / 2;
    const relative = (pointerAngle - norm + 2 * Math.PI) % (2 * Math.PI);
    const idx = Math.floor(relative / slice) % this.categories.length;
    const selectedCat = this.categories[idx];
    this.pendingCategory = selectedCat;
    this.draw();
    if (this.onPendingSelect) this.onPendingSelect(selectedCat);
  }

  _bindDragEvents() {
    this.canvas.addEventListener('mousedown', (e) => this._onDragStart(e));
    window.addEventListener('mousemove', (e) => this._onDragMove(e));
    window.addEventListener('mouseup', (e) => this._onDragEnd(e));
    this.canvas.addEventListener('touchstart', (e) => this._onDragStart(e), { passive: false });
    window.addEventListener('touchmove', (e) => this._onDragMove(e), { passive: false });
    window.addEventListener('touchend', (e) => this._onDragEnd(e));
    this.canvas.style.touchAction = 'none';
    this.canvas.style.userSelect = 'none';
    this.canvas.style.cursor = 'grab';
  }

  // 获取鼠标/触摸角度（同样去掉多余的 DPR 缩放）──
 _getMouseAngle(e) {
    const rect = this.canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return Math.atan2(dy, dx);
}

_isInsideWheel(e) {
    const rect = this.canvas.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    // 原来这里乘了 scaleX/scaleY（即 DPR），导致距离被放大
    // 现在统一用 CSS 像素与 this.radius（CSS 像素半径）比较
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return Math.sqrt(dx * dx + dy * dy) <= this.radius;
}

// ── touchstart 里阻止浏览器默认行为（防止滚动/缩放抢事件）──
_onDragStart(e) {
    if (!this._isInsideWheel(e)) return;
    if (this.locked || this.spinning) return;
    
    // 新增：阻止默认触摸行为，避免浏览器劫持事件
    if (e.cancelable) e.preventDefault();

    if (this.spinning) {
      this.spinning = false;
      cancelAnimationFrame(this.animId);
    }
    const pos = this._getEventPos(e);
    this.touchStartX = pos.x;
    this.touchStartY = pos.y;
    this.isPointerDown = true;
    this.dragging = false;
    this.lastMouseAngle = this._getMouseAngle(e);
    this.clearPending();
}

// ── touchmove 也要尽早 preventDefault ──
_onDragMove(e) {
    if (!this.isPointerDown || this.locked) return;
    
    // 新增：始终阻止默认行为，防止页面滚动打断拖拽
    if (e.cancelable) e.preventDefault();

    const pos = this._getEventPos(e);
    if (this.dragging) {
      const currentAngle = this._getMouseAngle(e);
      let delta = currentAngle - this.lastMouseAngle;
      if (delta > Math.PI) delta -= 2 * Math.PI;
      if (delta < -Math.PI) delta += 2 * Math.PI;
      this.angle += delta;
      this.lastMouseAngle = currentAngle;
      this.draw();
    } else {
      const dx = pos.x - this.touchStartX;
      const dy = pos.y - this.touchStartY;
      if (dx * dx + dy * dy > this.dragThreshold * this.dragThreshold) {
        this.dragging = true;
        this.canvas.style.cursor = 'grabbing';
        this.lastMouseAngle = this._getMouseAngle(e);
      }
    }
}

  _onDragEnd(e) {
    if (!this.isPointerDown) return;
    this.isPointerDown = false;
    if (this.dragging) {
      this.dragging = false;
      this.canvas.style.cursor = 'grab';
      this.selectByAngle();
    }
  }

  _getEventPos(e) {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches.length > 0) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }

  showPendingUI(categoryName) {
    const infoDiv = document.getElementById('wheel-selection-info');
    const nameSpan = document.getElementById('selected-category-name');
    if (infoDiv && nameSpan) {
      nameSpan.textContent = categoryName;
      infoDiv.style.display = 'block';
    }
  }

  hidePendingUI() {
    const infoDiv = document.getElementById('wheel-selection-info');
    if (infoDiv) infoDiv.style.display = 'none';
  }

  clearPending() {
    this.pendingCategory = null;
    this.hidePendingUI();
    this.draw();
  }

  _bindConfirmButton() {
    const confirmBtn = document.getElementById('btn-confirm-category');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        if (this.pendingCategory && this.onSelect) {
          this.onSelect(this.pendingCategory);
          this.pendingCategory = null;
          this.hidePendingUI();
        }
      });
    }
  }
}

// ──────────────────────────────────────────────
// 初始化转盘界面
// 修改 initWheelUI 函数（初始化时创建返回按钮）
// ══════════════════════════════════════════════
function initWheelUI() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;

    const confirmBtn = document.getElementById('btn-confirm-category');
    if (confirmBtn) confirmBtn.textContent = t('confirm');
    
    const spinBtn = document.getElementById('btn-spin');
    if (spinBtn) {
        // ❌ 不要这样：spinBtn.textContent = t('spin');
        // ✅ 只替换 span 的内容，保留 ✦ 符号
        const spinSpan = spinBtn.querySelector('.i18n-spin');
        if (spinSpan) spinSpan.textContent = t('spin');
        
        spinBtn.onclick = () => wheelInstance.spin();
    }
    
    createBackButtonIfNeeded();
    
    const namesMap = {};
    categories.forEach(cat => {
        namesMap[cat] = getCategoryName(cat);
    });
    
    wheelInstance = new DestinyWheel(canvas, categories, namesMap);
    wheelInstance.onSelect = (cat) => selectCategory(cat);
    wheelInstance.onPendingSelect = (cat) => {
        wheelInstance.showPendingUI(getCategoryName(cat));
    };
    
    wheelInstance.clearPending();
    
    document.getElementById('wheel-of-destiny').style.display = 'flex';
    document.getElementById('category-layout-container').style.display = 'none';
    document.querySelector('.container').style.display = 'none';
    
    document.querySelectorAll('.tab-content').forEach(tc => {
        tc.style.display = 'none';
    });
}

// ──────────────────────────────────────────────
// 选择大类后：进入左右布局
// 修改 selectCategory 函数（在显示布局后调用 showBackButton）
// ══════════════════════════════════════════════
function selectCategory(category) {
    currentSelectedCategory = category;
    
    document.getElementById('wheel-of-destiny').style.display = 'none';
    const layout = document.getElementById('category-layout-container');
    layout.style.display = 'flex';
    
    const tabsBar = document.querySelector('.tabs');
    if (tabsBar) tabsBar.style.display = 'none';
    
    openTab(null, category);
    document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');
    
    renderCategoryLayout(category);
    
    const leaders = allData[category];
    if (leaders && leaders.length > 0) {
        selectLeader(leaders[0], category, null);
        updateSingleCard(leaders[0]);
    }
    
    document.getElementById('wheel-of-destiny').style.display = 'none';
    document.getElementById('category-layout-container').style.display = 'flex';
    document.querySelector('.container').style.display = 'block';
    
    // 【新增】显示返回按钮
    showBackButton();
}

// 【新增】动态创建返回按钮
function createBackButtonIfNeeded() {
    if (document.getElementById('backToWheelBtn')) {
        initBackToWheel();
        return;
    }
    
    const btn = document.createElement('button');
    btn.id = 'backToWheelBtn';
    btn.className = 'back-to-wheel-btn';
    //btn.setAttribute('data-tooltip', currentLang === 'en' ? 'Back to Wheel' : '返回转盘');  
    btn.setAttribute('data-tooltip', t('backTooltip'));  // 【修改】
    btn.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
    `;
    document.body.appendChild(btn);
    
    // 创建滑动提示
    const hint = document.createElement('div');
    hint.id = 'swipeBackHint';
    hint.className = 'swipe-back-hint';
    document.body.appendChild(hint);
    
    // 创建过渡遮罩
    const overlay = document.createElement('div');
    overlay.id = 'pageTransitionOverlay';
    overlay.className = 'page-transition-overlay';
    document.body.appendChild(overlay);
    
    initBackToWheel();
}

// ──────────────────────────────────────────────
// 渲染左右布局
// ──────────────────────────────────────────────
function renderCategoryLayout(category) {
  const container = document.getElementById('category-layout-container');
  const lang = currentLang || 'zh-CN';
  //const ambientSrc = `images/ambient-${category}.jpg`;
  const ambientSrc = categoryImages[category] || 'images/ambient-default.jpg';
  
  const categoryDisplayName = categoryNames[category]?.[lang] || categoryNames[category]?.['zh-CN'] || category;
  
  //const placeholderText = (window.translations && window.translations[lang]?.search) || '搜索...';
  // 【修改】使用 t() 获取多语言文本
  const placeholderText = t('searchPlaceholder');
  
  container.innerHTML = `
    <div class="layout-left">
      <img src="${ambientSrc}" alt="${categoryDisplayName}">
    </div>
    <div class="layout-right">
      <div class="card-stage">
        <div class="search-and-random">
          <input type="text" class="modern-search-input" id="newUI-search" placeholder="${placeholderText}">
          <button class="magic-btn small" id="btn-random-leader">${t('spin')}</button>
        </div>
        <div id="single-northstar-card" class="northstar-single-card"></div>
      </div>
      ...
    </div>
  `;
  
  const chipsContainer = document.getElementById(`chips-${category}`);
  if (typeof generateChipsForCategory === 'function' && chipsContainer) {
    generateChipsForCategory(category, chipsContainer);
    chipsContainer.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', function() {
        chipsContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        showFirstCandidate(category);
      });
    });
  }
  
  const searchInput = document.getElementById('newUI-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      showFirstCandidate(category);
    });
  }
  
  const randomBtn = document.getElementById('btn-random-leader');
  if (randomBtn) {
    randomBtn.onclick = () => {
      const candidates = getFilteredCandidates(category);
      if (candidates.length === 0) {
         alert(t('noMatch'));  // 【修改】
        return;
      }
      const random = candidates[Math.floor(Math.random() * candidates.length)];
      selectLeader(random, category, null);
      updateSingleCard(random);
    };
  }
  
  const leaders = allData[category];
  if (leaders && leaders.length > 0) {
    selectLeader(leaders[0], category, null);
    updateSingleCard(leaders[0]);
  }
}

// ──────────────────────────────────────────────
// 更新大卡片
// ──────────────────────────────────────────────
function updateSingleCard(leader) {
  const card = document.getElementById('single-northstar-card');
  if (!card) return;
  
  const lang = window.currentLang || 'zh-CN';
  
  // 直接用 t() 获取标签，uiTexts 已包含映射
  const labelContribution = t('labelContribution');
  const labelField = t('labelField');
  const labelRemarks = t('labelRemarks');
  
  const contrib = leader.contribution ? (leader.contribution[lang] || leader.contribution['zh-CN'] || '') : '';
  const field = leader.field ? (leader.field[lang] || leader.field['zh-CN'] || '') : '';
  const remarks = leader.remarks ? (leader.remarks[lang] || leader.remarks['zh-CN'] || '') : '';
  
  card.innerHTML = `
    <h2>${leader.name}</h2>
    <p class="contribution"><strong>${labelContribution}</strong> ${contrib}</p>
    <p class="field"><strong>${labelField}</strong> ${field}</p>
    ${remarks ? `<p class="remarks"><strong>${labelRemarks}</strong> ${remarks}</p>` : ''}
  `;
}

function getFilteredCandidates(category) {
  const lang = window.currentLang || 'zh-CN';
  const chipsContainer = document.getElementById(`chips-${category}`);
  let activeSub = null;
  if (chipsContainer) {
    const activeChip = Array.from(chipsContainer.querySelectorAll('.chip.active'))
      .find(chip => chip.dataset.filter && chip.dataset.filter !== 'all');
    if (activeChip) activeSub = activeChip.dataset.filter;
  }
  
  let candidates = (allData[category] || []).slice();
  if (activeSub) {
    const q = activeSub.toLowerCase();
    candidates = candidates.filter(m => {
      const f = m.field ? (m.field[lang] || m.field['zh-CN'] || '').toLowerCase() : '';
      return f.includes(q);
    });
  }
  
  const searchInput = document.getElementById('newUI-search');
  if (searchInput && searchInput.value.trim()) {
    const sq = searchInput.value.trim().toLowerCase();
    candidates = candidates.filter(m => {
      const searchStr = [
        m.name,
        m.contribution ? (m.contribution[lang] || m.contribution['zh-CN'] || '') : '',
        m.field ? (m.field[lang] || m.field['zh-CN'] || '') : ''
      ].join(' ').toLowerCase();
      return searchStr.includes(sq);
    });
  }
  
  return candidates;
}

function showFirstCandidate(category) {
  const candidates = getFilteredCandidates(category);
  if (candidates.length > 0) {
    selectLeader(candidates[0], category, null);
    updateSingleCard(candidates[0]);
  } else {
    const card = document.getElementById('single-northstar-card');
    if (card) card.innerHTML = `<p style="color:#aaa;text-align:center;">无匹配北极星</p>`;
  }
}

// ══════════════════════════════════════════════
// 返回大类选择功能
// ══════════════════════════════════════════════

// 初始化返回按钮
function initBackToWheel() {
    const btn = document.getElementById('backToWheelBtn');
    if (!btn) return;
    
    btn.addEventListener('click', () => {
        backToWheelSelection();
    });
    
    // 键盘快捷键：ESC 返回
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && currentSelectedCategory) {
            backToWheelSelection();
        }
    });
    
    // 手机端手势返回
    initSwipeBack();
}

// 返回转盘选择界面
// 修改 backToWheelSelection 函数
function backToWheelSelection() {
    const overlay = document.getElementById('pageTransitionOverlay');
    const layout = document.getElementById('category-layout-container');
    const wheelSection = document.getElementById('wheel-of-destiny');
    const mainContainer = document.querySelector('.container');
    const backBtn = document.getElementById('backToWheelBtn');
    
    // 显示过渡遮罩
    if (overlay) overlay.classList.add('active');
    
    setTimeout(() => {
        // 隐藏左右布局
        if (layout) {
            layout.style.display = 'none';
            layout.innerHTML = ''; // 清空内容，释放内存
        }
        
        // 【修复】彻底隐藏主容器，避免下面的北极星内容露出来
        if (mainContainer) {
            mainContainer.style.display = 'none';
        }
        
        // 隐藏所有 tab-content（双重保险）
        document.querySelectorAll('.tab-content').forEach(tc => {
            tc.style.display = 'none';
        });
        
        // 显示转盘
        if (wheelSection) {
            wheelSection.style.display = 'flex';
            wheelSection.classList.add('wheel-fade-enter');
            setTimeout(() => wheelSection.classList.remove('wheel-fade-enter'), 500);
        }
        
        // 恢复 tab 栏显示（首页状态）
        const tabsBar = document.querySelector('.tabs');
        if (tabsBar) tabsBar.style.display = 'flex';
        
        // 隐藏返回按钮
        if (backBtn) backBtn.classList.remove('visible');
        
        // 重置状态
        currentSelectedCategory = null;
        if (wheelInstance) {
            wheelInstance.clearPending();
            wheelInstance.draw();
        }
        
        // 移除遮罩
        if (overlay) overlay.classList.remove('active');
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }, 300);
}

// 显示返回按钮（进入大类页面时调用）
function showBackButton() {
    const btn = document.getElementById('backToWheelBtn');
    if (btn) btn.classList.add('visible');
}

// ══════════════════════════════════════════════
// 手机端手势返回（从屏幕左边缘向右滑动）
// ══════════════════════════════════════════════
function initSwipeBack() {
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwiping = false;
    const threshold = 80; // 滑动距离阈值
    const edgeZone = 30;  // 边缘触发区域宽度
    
    const hint = document.getElementById('swipeBackHint');
    
    document.addEventListener('touchstart', (e) => {
        if (!currentSelectedCategory) return;
        
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        
        // 只有在左边缘才开始监听
        if (touchStartX < edgeZone) {
            isSwiping = true;
            if (hint) hint.classList.add('visible');
        }
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (!isSwiping || !currentSelectedCategory) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - touchStartX;
        const deltaY = Math.abs(currentY - touchStartY);
        
        // 水平滑动为主，且向右滑动
        if (deltaX > 20 && deltaY < deltaX * 0.5) {
            if (hint) {
                hint.style.width = Math.min(deltaX / 2, 60) + 'px';
                hint.style.opacity = Math.min(deltaX / threshold, 1);
            }
        }
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        
        // 超过阈值则触发返回
        if (deltaX > threshold && touchStartX < edgeZone) {
            backToWheelSelection();
        }
        
        // 重置提示
        if (hint) {
            hint.style.width = '4px';
            hint.classList.remove('visible');
        }
    });
}

// ──────────────────────────────────────────────
// 语言切换时更新转盘文字
// ──────────────────────────────────────────────
function updateWheelLanguage() {
  if (!wheelInstance) return;
  
  // 刷新转盘扇形文字
  const namesMap = {};
  categories.forEach(cat => {
    namesMap[cat] = getCategoryName(cat);
  });
  wheelInstance.namesMap = namesMap;
  wheelInstance.draw();
  
  // ✅ 刷新 HTML 中的静态文本（只改 span，不动父元素）
  const spinSpan = document.querySelector('#btn-spin .i18n-spin');
  if (spinSpan) spinSpan.textContent = t('spin');
  
  const destinySpan = document.querySelector('#wheel-selection-info .i18n-destiny');
  if (destinySpan) destinySpan.textContent = t('destiny');
  
  const confirmSpan = document.querySelector('#btn-confirm-category .i18n-confirm');
  if (confirmSpan) confirmSpan.textContent = t('confirm');
}

if (typeof onLanguageChanged === 'function') {
  const originalOnLanguageChanged = onLanguageChanged;
  window.onLanguageChanged = function() {
    originalOnLanguageChanged();
    const style = localStorage.getItem('northstarUIStyle');
    if (style === 'modern') {
      updateWheelLanguage();
    }
  };
}

(function() {
  const origLangChanged = window.onLanguageChanged;
  window.onLanguageChanged = function() {
    if (origLangChanged && typeof origLangChanged === 'function') {
      origLangChanged();
    }
    
    const backBtn = document.getElementById('backToWheelBtn');
    if (backBtn) {
        backBtn.setAttribute('data-tooltip', t('backTooltip'));
    }
    
    const layout = document.getElementById('category-layout-container');
    if (layout && layout.style.display !== 'none' && currentSelectedCategory) {
        renderCategoryLayout(currentSelectedCategory);
        if (currentSelectedLeader && currentSelectedLeaderCategory === currentSelectedCategory) {
            updateSingleCard(currentSelectedLeader);
        }
    }
    
    if (typeof updateWheelLanguage === 'function' && wheelInstance) {
        updateWheelLanguage();
    }
  };
})();
