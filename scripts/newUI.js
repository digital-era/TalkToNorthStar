// newUI.js —— 新界面：缘动转盘 + 左右布局
// 依赖：全局 allData / translations / selectLeader / openTab / generateChipsForCategory

// ══════════════════════════════════════════════
// 星云水晶球 - 粒子系统 + 交互逻辑
// ══════════════════════════════════════════════

const NEBULA_CATEGORIES = ['ai','quantum','universe','humanities','art','finance','sport','chinaEntrepreneurs'];


// 多语言文本
const crystalTexts = {
  'zh-CN': {
    touchHint: '触碰以启动潜能',
    holdStatus: '长按水晶球以充能',
    chargingStatus: '充能中...',
    releasing: '释放思维之力...'
  },
  'en': {
    touchHint: 'Touch to unlock potential',
    holdStatus: 'Hold the crystal to charge',
    chargingStatus: 'Charging...',
    releasing: 'Releasing power of mind...'
  }
};

let crystalInstance = null;
let wheelInstance = null;

// ══════════════════════════════════════════════
// 星云粒子系统
// ══════════════════════════════════════════════
class NebulaParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.width = 0;
    this.height = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.radius = 0;
    
    // 状态参数
    this.chargeLevel = 0;        // 0 ~ 1 充能进度
    this.isCharging = false;
    this.isRevealed = false;
    this.revealProgress = 0;
    
    // 基础参数
    this.particleCount = 120;
    this.baseSpeed = 0.3;
    this.chargeSpeed = 3.0;
    this.colors = [
      { r: 0, g: 223, b: 216 },    // 青色
      { r: 100, g: 200, b: 255 },  // 蓝色
      { r: 200, g: 100, b: 255 },  // 紫色
      { r: 0, g: 150, b: 200 },    // 深蓝
      { r: 255, g: 200, b: 100 }   // 金色
    ];
    
    this._initCanvas();
    this._createParticles();
    this._bindResize();
    
    this.animId = null;
    this.running = false;
  }
  
  _initCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    const cssW = rect.width || 400;
    const cssH = rect.height || 400;
    
    this.canvas.width = cssW * dpr;
    this.canvas.height = cssH * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    this.width = cssW;
    this.height = cssH;
    this.centerX = cssW / 2;
    this.centerY = cssH / 2;
    this.radius = Math.min(cssW, cssH) / 2 - 10;
  }
  
  _createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this._createParticle());
    }
  }
  
  _createParticle() {
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * this.radius * 0.85;
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    
    return {
      x: this.centerX + Math.cos(angle) * dist,
      y: this.centerY + Math.sin(angle) * dist,
      angle: angle,
      dist: dist,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.2,
      color: color,
      alpha: Math.random() * 0.5 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
      orbitOffset: (Math.random() - 0.5) * 0.02  // 轨道扰动
    };
  }
  
  _bindResize() {
    let timer = null;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._initCanvas();
        this._createParticles();
      }, 200);
    });
  }
  
  // 开始充能
  startCharging() {
    this.isCharging = true;
  }
  
  // 停止充能
  stopCharging() {
    this.isCharging = false;
  }
  
  // 设置充能进度 0~1
  setChargeLevel(level) {
    this.chargeLevel = Math.max(0, Math.min(1, level));
  }
  
  // 触发揭晓
  reveal() {
    this.isRevealed = true;
    this.revealProgress = 0;
  }
  
  // 重置
  reset() {
    this.isCharging = false;
    this.isRevealed = false;
    this.chargeLevel = 0;
    this.revealProgress = 0;
    this._createParticles();
  }
  
  // 核心绘制循环
  render() {
    const ctx = this.ctx;
    const time = Date.now() * 0.001;
    
    ctx.clearRect(0, 0, this.width, this.height);
    
    // 创建圆形裁剪区域（限制在球内）
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
    ctx.clip();
    
    // 背景渐变（随充能变化）
    const bgIntensity = 0.05 + this.chargeLevel * 0.15;
    const gradient = ctx.createRadialGradient(
      this.centerX, this.centerY, 0,
      this.centerX, this.centerY, this.radius
    );
    gradient.addColorStop(0, `rgba(0, 40, 60, ${bgIntensity})`);
    gradient.addColorStop(0.6, `rgba(0, 20, 40, ${bgIntensity * 0.5})`);
    gradient.addColorStop(1, 'rgba(0, 5, 15, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.width, this.height);
    
    // 绘制粒子
    for (const p of this.particles) {
      this._updateAndDrawParticle(p, time);
    }
    
    // 揭晓时的粒子爆散效果
    if (this.isRevealed) {
      this._drawRevealEffect(time);
    }
    
    // 中心光晕（充能时增强）
    if (this.chargeLevel > 0) {
      const glowRadius = 20 + this.chargeLevel * 60;
      const glowAlpha = 0.1 + this.chargeLevel * 0.3;
      const glow = ctx.createRadialGradient(
        this.centerX, this.centerY, 0,
        this.centerX, this.centerY, glowRadius
      );
      glow.addColorStop(0, `rgba(0, 223, 216, ${glowAlpha})`);
      glow.addColorStop(0.5, `rgba(0, 150, 255, ${glowAlpha * 0.5})`);
      glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, this.width, this.height);
    }
    
    ctx.restore();
  }
  
  _updateAndDrawParticle(p, time) {
    const ctx = this.ctx;
    
    // 计算当前速度倍率
    let speedMult = 1;
    if (this.isCharging) {
      speedMult = 1 + this.chargeLevel * 4;  // 充能时最高5倍速
    }
    
    // 漩涡运动：角度随时间变化
    const orbitSpeed = p.speed * speedMult * 0.5;
    p.angle += orbitSpeed * 0.016 + p.orbitOffset;
    
    // 距离轻微脉动
    const pulse = Math.sin(time * 2 + p.pulsePhase) * 3;
    const currentDist = p.dist + pulse * (1 - this.chargeLevel * 0.5);
    
    // 充能时向中心收缩（漩涡加速）
    let targetDist = currentDist;
    if (this.isCharging && this.chargeLevel > 0.3) {
      targetDist = currentDist * (1 - (this.chargeLevel - 0.3) * 0.3);
    }
    
    // 揭晓时向外爆散
    if (this.isRevealed) {
      const explodeFactor = this.revealProgress * 3;
      targetDist = currentDist + explodeFactor * this.radius;
      p.alpha = Math.max(0, 1 - this.revealProgress);
    }
    
    // 更新位置
    p.x = this.centerX + Math.cos(p.angle) * targetDist;
    p.y = this.centerY + Math.sin(p.angle) * targetDist;
    
    // 绘制粒子
    const size = p.size * (1 + this.chargeLevel * 0.5);
    const alpha = p.alpha * (0.5 + this.chargeLevel * 0.5);
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
    ctx.fill();
    
    // 高光粒子（充能时增加）
    if (this.chargeLevel > 0.5 && Math.random() > 0.7) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
      ctx.fill();
    }
    
    // 拖尾效果（高速时）
    if (speedMult > 2) {
      const tailX = p.x - Math.cos(p.angle) * size * 3;
      const tailY = p.y - Math.sin(p.angle) * size * 3;
      const tailGrad = ctx.createLinearGradient(p.x, p.y, tailX, tailY);
      tailGrad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.6})`);
      tailGrad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = tailGrad;
      ctx.lineWidth = size * 0.8;
      ctx.stroke();
    }
  }
  
  _drawRevealEffect(time) {
    const ctx = this.ctx;
    this.revealProgress += 0.02;
    
    if (this.revealProgress > 1) return;
    
    // 冲击波环
    const waveRadius = this.revealProgress * this.radius * 1.5;
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, waveRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(0, 223, 216, ${1 - this.revealProgress})`;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 闪光
    if (this.revealProgress < 0.3) {
      const flashAlpha = 1 - this.revealProgress / 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${flashAlpha * 0.3})`;
      ctx.fillRect(0, 0, this.width, this.height);
    }
  }
  
  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      if (!this.running) return;
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    loop();
  }
  
  stop() {
    this.running = false;
    cancelAnimationFrame(this.animId);
  }
}

// ══════════════════════════════════════════════
// 水晶球交互控制器
// ══════════════════════════════════════════════
class CrystalBallController {
  constructor() {
    this.ball = document.getElementById('crystalBall');
    this.canvas = document.getElementById('nebulaCanvas');
    this.hint = document.getElementById('crystalHint');
    this.result = document.getElementById('crystalResult');
    this.resultText = document.getElementById('resultText');
    this.resultSub = document.getElementById('resultSub');
    this.status = document.getElementById('crystalStatus');
    this.statusText = this.status.querySelector('.status-text');
    this.chargeRing = document.getElementById('chargeRing');
    this.chargeProgress = document.getElementById('chargeProgress');
    
    // ══════════════════════════════════════════════
    // 【初始化】同步 SVG 路径长度，确保 JS 与 SVG 属性绝对一致
    // ══════════════════════════════════════════════
    this.circumference = 2 * Math.PI * 46;  // r=46
    if (this.chargeProgress) {
      this.chargeProgress.setAttribute('stroke-dasharray', this.circumference);
      this.chargeProgress.setAttribute('stroke-dashoffset', this.circumference); // 初始为空环
    }
    
    this.nebula = new NebulaParticleSystem(this.canvas);
    
    // 充能参数
    this.chargeDuration = 2000;    // 充满需要 2 秒
    this.demoChargeDuration = 3800;    // 【新增】演示模式：3.8 秒（舒缓优雅）
    this.chargeStartTime = 0;
    this.isHolding = false;
    this.chargeComplete = false;
    
    // 选中回调
    this.onSelect = null;
    
    this._bindEvents();
    this.nebula.start();

    // ══════════════════════════════════════════════
    // [DEMO] 自动演示模式：模拟触摸，不触发揭晓
    // ══════════════════════════════════════════════
    this.isDemo = false;           // 是否处于系统演示中
    this.demoTimer = null;         // setInterval 句柄
    this.demoInterval = 3500;      // 循环间隔 3.5 秒
    this.demoChargeMax = 0.82;     // 充能到 82% 自动回退（不触发 reveal）
  }
  
  _bindEvents() {
    // 鼠标事件
    this.ball.addEventListener('mousedown', (e) => this._onPressStart(e));
    window.addEventListener('mousemove', (e) => this._onPressMove(e));
    window.addEventListener('mouseup', (e) => this._onPressEnd(e));
    
    // 触摸事件
    this.ball.addEventListener('touchstart', (e) => this._onPressStart(e), { passive: false });
    window.addEventListener('touchmove', (e) => this._onPressMove(e), { passive: false });
    window.addEventListener('touchend', (e) => this._onPressEnd(e));
    
    // 防止上下文菜单
    this.ball.addEventListener('contextmenu', (e) => e.preventDefault());
    
    // 防止拖拽
    this.ball.addEventListener('dragstart', (e) => e.preventDefault());
  }
  
  _onPressStart(e) {
    // [DEMO] 用户真实触摸时，立即中断系统演示
    if (this.isDemo) {
      this._endDemoPress();
    }
    if (this.chargeComplete) return;
    if (e.cancelable) e.preventDefault();
    
    this.isHolding = true;
    this.chargeStartTime = Date.now();
    this.chargeComplete = false;
    
    // UI 状态
    this.ball.classList.add('charging');
    this.chargeRing.classList.add('visible');
    this.hint.classList.add('hidden');
    this.statusText.textContent = crystalTexts[currentLang || 'zh-CN'].chargingStatus;

    // 【修复抖动】强制移除任何残留的 CSS 过渡，确保 RAF 直接驱动、绝对跟手
    this.chargeProgress.style.transition = 'none';
    this.chargeProgress.style.strokeDashoffset = this.circumference;
    
    // 粒子系统
    this.nebula.startCharging();
    
    // 开始充能循环
    this._chargeLoop();
  }
  
  _onPressMove(e) {
    // 拖拽时可选：根据拖拽距离微调充能速度
    // 当前版本简化为纯时间充能
  }
  
  _onPressEnd(e) {
    if (!this.isHolding) return;
    this.isHolding = false;
    
    // 停止充能循环
    cancelAnimationFrame(this.chargeAnimId);
    
    // 检查是否充满
    const elapsed = Date.now() - this.chargeStartTime;
    const chargeLevel = Math.min(1, elapsed / this.chargeDuration);
    
    if (chargeLevel >= 1) {
      // 充满 → 揭晓
      this._reveal();
    } else {
      // 未充满 → 回弹
      this._cancelCharge();
    }
  }
  
  _chargeLoop() {
    if (!this.isHolding) return;
    
    const elapsed = Date.now() - this.chargeStartTime;
    
    // 【修改】演示模式使用更长的充能时长
    const duration = this.isDemo ? this.demoChargeDuration : this.chargeDuration;    
    const chargeLevel = Math.min(1, elapsed / duration);
    
    // 更新粒子系统
    this.nebula.setChargeLevel(chargeLevel);
    
    // 更新进度环
    const circumference = 2 * Math.PI * 46;  // r=46
    const offset = circumference * (1 - chargeLevel);
    this.chargeProgress.style.strokeDashoffset = offset;    

    // [DEMO] 演示模式下达到阈值自动回退，绝不触发揭晓
    if (this.isDemo && chargeLevel >= this.demoChargeMax) {
      this._endDemoPress();
      return;
    }
    
    // 正常充满检查（真人触摸时）
    if (chargeLevel >= 1) {
      this.chargeComplete = true;
      this._onChargeComplete();
      return;
    }
    
    this.chargeAnimId = requestAnimationFrame(() => this._chargeLoop());
  }
  
  _onChargeComplete() {
    // 充满但还未松手 → 保持震动，等待释放
    this.statusText.textContent = crystalTexts[currentLang || 'zh-CN'].releasing;
    
    // 可选：自动释放（不等待松手）
    // setTimeout(() => this._reveal(), 300);
  }
  
   _reveal(forcedCategory = null) {
    this.ball.classList.remove('charging');
    this.ball.classList.add('revealed');
    this.chargeRing.classList.remove('visible');
    this.status.classList.add('hidden');
    
    // 粒子爆散
    this.nebula.reveal();
    
    // 随机选择，或使用传入的强制大类
    const selectedCat = forcedCategory || NEBULA_CATEGORIES[Math.floor(Math.random() * NEBULA_CATEGORIES.length)];
    
    // 【修复英文错乱问题】：统一使用 getCategoryName 保证与转盘、标签页的文案绝对同步！
    // 之前错乱是因为英文模式下发生了事件穿透，或者 categoryNames 字典与全局 translations 没对齐
    const name = getCategoryName(selectedCat);
    const enName = categoryNames[selectedCat]?.['en'] || selectedCat;
    
    setTimeout(() => {
        this.resultText.textContent = name;
        this.resultSub.textContent = enName;
        this.result.classList.add('show');
        
        setTimeout(() => {
            if (this.onSelect) this.onSelect(selectedCat);
            this.reset();
        }, 2000);
    }, 500);
  }
  
  // 新增：极简优雅的强制触发方法
  forceSelect(category) {
    if (this.chargeComplete || this.isHolding) return; // 如果正在操作则忽略
    
    this.chargeComplete = true; 
    
    // UI 瞬间高光充能状态
    this.ball.classList.add('charging');
    this.chargeRing.classList.add('visible');
    this.hint.classList.add('hidden');
    this.statusText.textContent = crystalTexts[currentLang || 'zh-CN'].releasing;
    
    // 粒子系统瞬间满充能
    this.nebula.startCharging();
    this.nebula.setChargeLevel(1); 
    
    // 给予0.6秒的视觉缓冲（水晶球亮起）后，爆发揭晓动画
    setTimeout(() => {
      this._reveal(category);
    }, 600);
  }  
  
  _cancelCharge() {
    // 未充满松手 → 平滑回退
    this.ball.classList.remove('charging');
    this.chargeRing.classList.remove('visible');
    this.hint.classList.remove('hidden');
    this.statusText.textContent = crystalTexts[currentLang || 'zh-CN'].holdStatus;
    
    this.nebula.stopCharging();
    this.nebula.setChargeLevel(0);
    
    // 进度环回弹动画
    this.chargeProgress.style.transition = 'stroke-dashoffset 0.5s ease-out';
    this.chargeProgress.style.strokeDashoffset = this.circumference; //原来是 289
    
    setTimeout(() => {
      this.chargeProgress.style.transition = 'none'; // 【修复抖动】回弹结束后，彻底移除transition, 'stroke-dashoffset 0.1s linear'，绝不留到下一次充能 
    }, 500);
    
  }
  
  reset() {
    
    // [DEMO] 清理演示标记，但不断掉循环定时器
    this.isDemo = false;
    
    this.ball.classList.remove('charging', 'revealed');
    this.hint.classList.remove('hidden');
    this.result.classList.remove('show');
    this.status.classList.remove('hidden');
    this.chargeRing.classList.remove('visible');
    this.statusText.textContent = crystalTexts[currentLang || 'zh-CN'].holdStatus;
    
    this.isHolding = false;
    this.chargeComplete = false;
    this.nebula.reset();
  }
  
  destroy() {
    // [DEMO] 清理循环，防止内存泄漏
    if (this.demoTimer) {
      clearInterval(this.demoTimer);
      this.demoTimer = null;
    }
    this.nebula.stop();
  }

  // ══════════════════════════════════════════════
  // [DEMO] 演示循环控制
  // ══════════════════════════════════════════════
  
  /** 启动循环演示：首次延迟 800ms，之后每 3s 一次 */
  startDemoLoop() {
    setTimeout(() => this._runDemoCycle(), 800);
    this.demoTimer = setInterval(() => this._runDemoCycle(), this.demoInterval);
  }

  /** 单次演示周期：仅在完全空闲时触发 */
  _runDemoCycle() {
    if (this.isHolding || this.chargeComplete || this.nebula.isRevealed) return;
    this._startDemoPress();
  }

  /** 模拟手指按下 */
  _startDemoPress() {
    if (this.chargeComplete || this.isHolding) return;
    this.isDemo = true;
    this.isHolding = true;
    this.chargeStartTime = Date.now();
    this.chargeComplete = false;

    // UI 状态与真实触摸完全一致
    this.ball.classList.add('charging');
    this.chargeRing.classList.add('visible');
    this.hint.classList.add('hidden');
    this.statusText.textContent = crystalTexts[currentLang || 'zh-CN'].chargingStatus;

    // 【修复抖动】强制移除残留过渡
    this.chargeProgress.style.transition = 'none';
    this.chargeProgress.style.strokeDashoffset = this.circumference;
    
    // 粒子系统进入充能
    this.nebula.startCharging();
    this._chargeLoop();
  }

  /** 模拟手指松开（提前取消，绝不进入 reveal） */
  _endDemoPress() {
    if (!this.isDemo) return;
    this.isDemo = false;
    this.isHolding = false;
    cancelAnimationFrame(this.chargeAnimId);
    this._cancelCharge();   // 走"未充满回退"分支，带动画回弹
  }

  /** 外部调用：强制中断演示（如用户点击星轨按钮） */
  stopDemo() {
    if (this.isDemo) this._endDemoPress();
  }
  
}

// ══════════════════════════════════════════════
// 初始化入口
// ══════════════════════════════════════════════
function initCrystalBall() {
  // 创建 SVG 渐变定义（需要在 HTML 中或动态插入）
  if (!document.getElementById('crystalSvgDefs')) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'crystalSvgDefs';
    svg.style.position = 'absolute';
    svg.style.width = '0';
    svg.style.height = '0';
    svg.innerHTML = `
      <defs>
        <linearGradient id="chargeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00dfd8"/>
          <stop offset="50%" stop-color="#007cf0"/>
          <stop offset="100%" stop-color="#00dfd8"/>
        </linearGradient>
      </defs>
    `;
    document.body.appendChild(svg);
  }
  
  crystalInstance = new CrystalBallController();
  crystalInstance.onSelect = (cat) => selectCategory(cat);

  // [DEMO] 启动自动演示循环
  crystalInstance.startDemoLoop();
}

// ══════════════════════════════════════════════
// 优雅的手动选择器：星轨指引 (Constellation Guidance)
// ══════════════════════════════════════════════
function renderNebulaManualSelector() {
    const crystalContainer = document.getElementById('nebula-crystal');
    if (!crystalContainer) return;

    let existingSelector = document.getElementById('nebula-manual-selector');
    if (existingSelector) existingSelector.remove();

    const selector = document.createElement('div');
    selector.id = 'nebula-manual-selector';
    selector.className = 'nebula-manual-selector';

    const hintText = document.createElement('div');
    hintText.className = 'manual-selector-hint';
    // 【修复文字过长】：精简英文文案，防止撑爆容器
    hintText.textContent = (typeof currentLang !== 'undefined' && currentLang === 'en') 
        ? '— Or, Choose your star —' 
        : '— 或，亲自选择星辰 —';
    selector.appendChild(hintText);

    const chipsWrap = document.createElement('div');
    chipsWrap.className = 'manual-selector-chips';

    NEBULA_CATEGORIES.forEach(cat => {
        // 【修复英文错乱】：这里也统一采用 getCategoryName
        const name = getCategoryName(cat);
        const chip = document.createElement('button');
        chip.className = 'manual-star-chip';
        chip.innerHTML = `<span class="chip-glow"></span><span class="chip-text">${name}</span>`;
        
        chip.onclick = (e) => {
            // 【关键修复】：阻止事件冒泡，防止点击按钮时误触了水晶球引发 "随机选择(Finance)"
            e.stopPropagation(); 
            if (crystalInstance) {
                crystalInstance.stopDemo();          // [DEMO] 中断演示
                selector.classList.add('fading-out');
                crystalInstance.forceSelect(cat);
            }
        };
        chipsWrap.appendChild(chip);
    });

    selector.appendChild(chipsWrap);
    crystalContainer.appendChild(selector);
}

// ══════════════════════════════════════════════
// 语言切换支持
// ══════════════════════════════════════════════
function updateCrystalLanguage() {
  const lang = currentLang || 'zh-CN';
  const texts = crystalTexts[lang];
  
  const hintText = document.querySelector('.crystal-hint .hint-text');
  if (hintText) hintText.textContent = texts.touchHint;
  
  const statusText = document.querySelector('.crystal-status .status-text');
  if (statusText && !crystalInstance?.isHolding) {
    statusText.textContent = texts.holdStatus;
  }

   renderNebulaManualSelector(); // <--- 新增这行，切换语言时重绘星轨
  
}

// 包装语言切换
(function() {
  const orig = window.onLanguageChanged;
  window.onLanguageChanged = function() {
    if (orig) orig();
    updateCrystalLanguage();
    if (crystalInstance?.nebula) {
      // 粒子系统无需重启，但可刷新类别名称
    }
  };
})();

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
    backTooltip: '返回首页',
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
    backTooltip: 'Back to First Page',
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
      
      // 【修复】确保显示时，“缘定”前缀有 span 包裹，方便切换语言
      const destinySpan = infoDiv.querySelector('.i18n-destiny');
      if (destinySpan) {
        destinySpan.textContent = t('destiny');
      } else {
        // 容错：如果 HTML 没写 span，用 JS 强行包一层
        infoDiv.innerHTML = `<span class="i18n-destiny">${t('destiny')}</span>: <span id="selected-category-name">${categoryName}</span>`;
      }
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

    // 【修复】不要直接使用 textContent 覆盖，这会抹杀内部的 span 标签
    const confirmBtn = document.getElementById('btn-confirm-category');
    if (confirmBtn) {
        const confirmSpan = confirmBtn.querySelector('.i18n-confirm');
        if (confirmSpan) {
            confirmSpan.textContent = t('confirm');
        } else {
            // 容错：如果找不到 span，强行植入带有 i18n 标识的 span
            confirmBtn.innerHTML = `<span class="i18n-confirm">${t('confirm')}</span>`;
        }
    }
    
    const spinBtn = document.getElementById('btn-spin');
    if (spinBtn) {
        // ✅ 只替换 span 的内容，保留 ✦ 符号
        const spinSpan = spinBtn.querySelector('.i18n-spin');
        if (spinSpan) spinSpan.textContent = t('spin');
        
        spinBtn.onclick = () => wheelInstance.spin();
    }
    
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

// 新入口
function initNebulaCrystal() {
  initCrystalBall();
  renderNebulaManualSelector(); // <--- 新增这行，初始化时渲染星轨
  
  const nebulaCrystal = document.getElementById('nebula-crystal');
  if (nebulaCrystal) nebulaCrystal.style.display = 'flex';
  
  const wheelSection = document.getElementById('wheel-of-destiny');
  if (wheelSection) wheelSection.style.display = 'none';
  
  const layout = document.getElementById('category-layout-container');
  if (layout) layout.style.display = 'none';
  
  const container = document.querySelector('.container');
  if (container) container.style.display = 'none';
  
  document.querySelectorAll('.tab-content').forEach(tc => {
    tc.style.display = 'none';
  });
}

// ──────────────────────────────────────────────
// 选择大类后：进入左右布局
// ══════════════════════════════════════════════
function selectCategory(category) {
    currentSelectedCategory = category;
    
    // 隐藏水晶球
    const nebulaCrystal = document.getElementById('nebula-crystal');
    if (nebulaCrystal) nebulaCrystal.style.display = 'none';
    
    // 隐藏旧转盘
    const wheelSection = document.getElementById('wheel-of-destiny');
    if (wheelSection) wheelSection.style.display = 'none';
    
    const layout = document.getElementById('category-layout-container');
    if (layout) layout.style.display = 'flex';
    
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
    
    // 【修复】空值检查
    const container = document.querySelector('.container');
    if (container) container.style.display = 'block';
}


// ──────────────────────────────────────────────
// 渲染左右布局
// ──────────────────────────────────────────────
function renderCategoryLayout(category) {
  const container = document.getElementById('category-layout-container');
  const lang = currentLang || 'zh-CN';
  const ambientSrc = categoryImages[category] || 'images/ambient-default.jpg';
  
  const categoryDisplayName = categoryNames[category]?.[lang] || categoryNames[category]?.['zh-CN'] || category;
  const placeholderText = t('searchPlaceholder');
  
  // 【修改】双封面结构：同一张图片，front + back（back 水平镜像模拟背面）
  container.innerHTML = `
    <div class="layout-left" id="layoutLeft">
      <div class="cover-wrapper flipping" id="coverWrapper">
        <img src="${ambientSrc}" alt="${categoryDisplayName}" class="cover-front" id="coverFront">
        <img src="${ambientSrc}" alt="${categoryDisplayName}" class="cover-back" id="coverBack">
      </div>
    </div>
    <div class="layout-right">
      <div class="card-stage">
        <div class="search-and-random">
          <input type="text" class="modern-search-input" id="newUI-search" placeholder="${placeholderText}">
          <button class="magic-btn small" id="btn-random-leader">${t('spin')}</button>
          <button class="back-btn-inline" id="btn-back-inline" title="${t('backTooltip')}">
            <svg viewBox="0 0 24 24">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
        </div>
        <div id="single-northstar-card" class="northstar-single-card"></div>
      </div>
      <div class="card-controls">
        <div class="filter-chips-container" id="chips-${category}" style="
          display: flex;
          flex-wrap: nowrap;
          overflow-x: auto;
          gap: 8px;
          padding: 10px 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        "></div>
      </div>
    </div>
  `;
  
  const chipsContainer = document.getElementById(`chips-${category}`);
  console.log('=== renderCategoryLayout ===');
  console.log('category:', category);
  console.log('chipsContainer:', chipsContainer);
  console.log('generateChipsForCategory exists:', typeof generateChipsForCategory === 'function');
  if (typeof generateChipsForCategory === 'function' && chipsContainer) {
    console.log('calling generateChipsForCategory...');
    generateChipsForCategory(category, chipsContainer);
    console.log('after call, chips HTML:', chipsContainer.innerHTML);
    chipsContainer.querySelectorAll('.chip').forEach(chip => {
      chip.addEventListener('click', function() {
        chipsContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        showFirstCandidate(category);
      });
    });
  } else {
    console.error('cannot call generateChipsForCategory!', {
      hasFunction: typeof generateChipsForCategory === 'function',
      hasContainer: !!chipsContainer
    });
  }
  
  const searchInput = document.getElementById('newUI-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      showFirstCandidate(category);
    });
  }

  const backBtnInline = document.getElementById('btn-back-inline');
  if (backBtnInline) {
    backBtnInline.addEventListener('click', () => {
      backToWheelSelection();
    });
  }

  // ══════════════════════════════════════════════
  // 缘动按钮：暂停翻书 + 随机切换
  // ══════════════════════════════════════════════
  const randomBtn = document.getElementById('btn-random-leader');
  const layoutLeft = document.getElementById('layoutLeft');
  const coverFront = document.getElementById('coverFront');
  const coverWrapper = document.getElementById('coverWrapper');
  
  let isFlipping = false;
  
  if (randomBtn) {
    randomBtn.onclick = () => {
      if (isFlipping) return;
      isFlipping = true;
      
      // 暂停翻书动画
      if (layoutLeft) layoutLeft.classList.add('flipping-paused');
      if (coverFront) coverFront.classList.add('active-flip');
      
      // 随机逻辑
      const candidates = getFilteredCandidates(category);
      if (candidates.length === 0) {
        alert(t('noMatch'));
        setTimeout(() => {
          if (coverFront) coverFront.classList.remove('active-flip');
          if (layoutLeft) layoutLeft.classList.remove('flipping-paused');
          isFlipping = false;
        }, 400);
        return;
      }
      
      const random = candidates[Math.floor(Math.random() * candidates.length)];
      selectLeader(random, category, null);
      updateSingleCard(random);
      
      // 恢复翻书
      setTimeout(() => {
        if (coverFront) coverFront.classList.remove('active-flip');
        if (layoutLeft) layoutLeft.classList.remove('flipping-paused');
        isFlipping = false;
      }, 800);
    };
  }
  
  // ... 初始化第一个领袖 ...
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
// 返回转盘选择界面
// 修改 backToWheelSelection 函数
function backToWheelSelection() {
    const overlay = document.getElementById('pageTransitionOverlay');
    const layout = document.getElementById('category-layout-container');
    const wheelSection = document.getElementById('wheel-of-destiny');
    const mainContainer = document.querySelector('.container');
    
    if (overlay) overlay.classList.add('active');
    
    setTimeout(() => {
        if (layout) {
            layout.style.display = 'none';
            layout.innerHTML = '';
        }
        
        if (mainContainer) {
            mainContainer.style.display = 'none';
        }
        
        document.querySelectorAll('.tab-content').forEach(tc => {
            tc.style.display = 'none';
        });
        
        // 显示水晶球（现代模式）
        const nebulaCrystal = document.getElementById('nebula-crystal');
        if (nebulaCrystal) {
            nebulaCrystal.style.display = 'flex';
        }
        
        // 兼容旧转盘
        if (wheelSection) {
            wheelSection.style.display = 'flex';
            wheelSection.classList.add('wheel-fade-enter');
            setTimeout(() => wheelSection.classList.remove('wheel-fade-enter'), 500);
        }
        
        const tabsBar = document.querySelector('.tabs');
        if (tabsBar) tabsBar.style.display = 'flex';
        
        currentSelectedCategory = null;
        if (wheelInstance) {
            wheelInstance.clearPending();
            wheelInstance.draw();
        }
        
        if (crystalInstance) {
            crystalInstance.reset();
        }

        // 【修复 4】：返回首页时，恢复星轨标签的显示
        const manualSelector = document.getElementById('nebula-manual-selector');
        if (manualSelector) {
            manualSelector.classList.remove('fading-out');
        }
      
        if (overlay) overlay.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }, 300);
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
  
  // ✅ 刷新 Spin 按钮文本
  const spinSpan = document.querySelector('#btn-spin .i18n-spin');
  if (spinSpan) spinSpan.textContent = t('spin');
  
  // ✅ 刷新“缘定”文本，带容错恢复结构
  const infoDiv = document.getElementById('wheel-selection-info');
  const destinySpan = infoDiv ? infoDiv.querySelector('.i18n-destiny') : null;
  if (destinySpan) {
    destinySpan.textContent = t('destiny');
  } else if (infoDiv) {
    const nameSpan = document.getElementById('selected-category-name');
    const catName = nameSpan ? nameSpan.textContent : '';
    infoDiv.innerHTML = `<span class="i18n-destiny">${t('destiny')}</span>: <span id="selected-category-name">${catName}</span>`;
  }
  
  // ✅ 刷新“确认选择”文本，带容错恢复结构
  const confirmBtn = document.getElementById('btn-confirm-category');
  const confirmSpan = confirmBtn ? confirmBtn.querySelector('.i18n-confirm') : null;
  if (confirmSpan) {
    confirmSpan.textContent = t('confirm');
  } else if (confirmBtn) {
    confirmBtn.innerHTML = `<span class="i18n-confirm">${t('confirm')}</span>`;
  }
}

(function() {
    const origLangChanged = window.onLanguageChanged;
    window.onLanguageChanged = function() {
        if (origLangChanged && typeof origLangChanged === 'function') {
            origLangChanged();
        }
        
        // 2. 刷新转盘页面按钮（如果当前显示的是转盘）
        const wheelSection = document.getElementById('wheel-of-destiny');
        if (wheelSection && wheelSection.style.display !== 'none') {
            updateWheelLanguage();
        }
        
        // 3. 刷新左右布局页面（如果当前显示的是布局）
        const layout = document.getElementById('category-layout-container');
        if (layout && layout.style.display !== 'none' && currentSelectedCategory) {
            renderCategoryLayout(currentSelectedCategory);
            if (currentSelectedLeader && currentSelectedLeaderCategory === currentSelectedCategory) {
                updateSingleCard(currentSelectedLeader);
            }
        } else {
            // 如果布局没显示，但至少刷新转盘文字（为下次显示做准备）
            if (typeof updateWheelLanguage === 'function' && wheelInstance) {
                updateWheelLanguage();
            }
        }
    };
})();
