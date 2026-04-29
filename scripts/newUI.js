// newUI.js —— 新界面：缘动转盘 + 左右布局
// 依赖：全局 allData / translations / selectLeader / openTab / generateChipsForCategory

const categories = ['ai','quantum','universe','humanities','art','finance','sport','chinaEntrepreneurs'];
let currentSelectedCategory = null;   // 当前选中的大类 id
let wheelInstance = null;

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
        this.spinning = false;        // 是否正在自动旋转
        this.animId = null;
        this.targetAngle = 0;
        this.spinSpeed = 0;
        this.maxSpeed = 0.35;
        this.minSpeed = 0.02;
        this.deceleration = 0.0005;
        this.onSelect = null;

        // 手动拖拽相关
        this.dragging = false;
        this.lastMouseAngle = 0;      // 上一次鼠标相对于圆心的极角

        this.draw();
        this._bindDragEvents();       // 绑定拖拽事件
    }

    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width / 2;
        const r = Math.min(w, this.canvas.height / 2) - 10;
        const slice = (2 * Math.PI) / this.categories.length;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.categories.length; i++) {
            const start = this.angle + i * slice;
            const end = start + slice;
            ctx.beginPath();
            ctx.moveTo(w, w);
            ctx.arc(w, w, r, start, end);
            ctx.fillStyle = i % 2 === 0 ? '#1e2b3c' : '#2c3e50';
            ctx.fill();
            ctx.strokeStyle = '#00dfd8';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.save();
            ctx.translate(w, w);
            ctx.rotate(start + slice / 2);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px "Noto Serif SC", "Poppins"';
            ctx.fillText(this.namesMap[this.categories[i]] || '', r * 0.7, 6);
            ctx.restore();
        }

        // 中心圆
        ctx.beginPath();
        ctx.arc(w, w, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#050a14';
        ctx.fill();
        ctx.strokeStyle = '#00dfd8';
        ctx.stroke();
    }

    // 重写 spin()
    spin() {
        if (this.spinning) return;
        this.spinning = true;
        // 随机目标总旋转弧度：至少 50 弧度（约8圈），最多 80 弧度（约13圈）
        this.targetAngle = this.angle + Math.random() * 30 + 50;
        this.spinSpeed = this.maxSpeed;
        this.animate();
    }

    // 重写 animate()，加入减速
    animate() {
        if (!this.spinning) return;

        // 速度递减，直到不低于最小速度
        if (this.spinSpeed > this.minSpeed) {
            this.spinSpeed -= this.deceleration;
        }

        this.angle += this.spinSpeed;

        // 如果已经达到或超过目标角度，精确停到目标角度并结束
        if (this.angle >= this.targetAngle) {
            this.angle = this.targetAngle % (2 * Math.PI);
            this.spinning = false;
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
        this.selectByAngle();
    }

    selectByAngle() {
        // 指针朝上（-π/2 方向）
        const norm = ((this.angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const slice = (2 * Math.PI) / this.categories.length;
        // 指针在顶部，所以需要计算哪个扇区对准12点
        // 扇区边界：从 angle 开始逆时针分布的切片
        const adjusted = (2 * Math.PI - norm + Math.PI / 2) % (2 * Math.PI);
        const idx = Math.floor(adjusted / slice) % this.categories.length;
        if (this.onSelect) this.onSelect(this.categories[idx]);
    }

        // ================= 新增：手动拖拽支持 =================
    _bindDragEvents() {
        const canvas = this.canvas;
        // 鼠标事件
        canvas.addEventListener('mousedown', (e) => this._onDragStart(e));
        window.addEventListener('mousemove', (e) => this._onDragMove(e));
        window.addEventListener('mouseup', (e) => this._onDragEnd(e));
        // 触摸事件
        canvas.addEventListener('touchstart', (e) => this._onDragStart(e), { passive: false });
        window.addEventListener('touchmove', (e) => this._onDragMove(e), { passive: false });
        window.addEventListener('touchend', (e) => this._onDragEnd(e));
        // 防止画布上的默认拖拽行为（如图片拖拽）
        canvas.style.touchAction = 'none';
        canvas.style.userSelect = 'none';
    }

    _getMouseAngle(e) {
        const rect = this.canvas.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let clientX, clientY;
        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        return Math.atan2(dy, dx);   // 返回极角，范围 -PI ~ PI
    }

    _onDragStart(e) {
        e.preventDefault();
        // 如果正在自动旋转，立刻停止
        if (this.spinning) {
            this.spinning = false;
            cancelAnimationFrame(this.animId);
        }
        this.dragging = true;
        this.canvas.style.cursor = 'grabbing';
        this.lastMouseAngle = this._getMouseAngle(e);
    }

    _onDragMove(e) {
        if (!this.dragging) return;
        e.preventDefault();
        const currentAngle = this._getMouseAngle(e);
        // 计算角度差（处理穿越 ±PI 边界的情况）
        let delta = currentAngle - this.lastMouseAngle;
        if (delta > Math.PI) delta -= 2 * Math.PI;
        if (delta < -Math.PI) delta += 2 * Math.PI;
        // 更新转盘角度（注意：转盘顺时针旋转对应角度增加）
        this.angle += delta;
        this.lastMouseAngle = currentAngle;
        this.draw();
    }

    _onDragEnd(e) {
        if (!this.dragging) return;
        this.dragging = false;
        this.canvas.style.cursor = 'grab';
        // 停止拖拽时，立即根据当前角度选中大类
        this.selectByAngle();
    }
}

// ──────────────────────────────────────────────
// 初始化转盘界面
// ──────────────────────────────────────────────
function initWheelUI() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;

    // 准备名称映射
    const namesMap = {};
    categories.forEach(cat => { namesMap[cat] = getCategoryName(cat); });

    wheelInstance = new DestinyWheel(canvas, categories, namesMap);
    wheelInstance.onSelect = (cat) => {
        selectCategory(cat);
    };

    // 绑定按钮
    document.getElementById('btn-spin').onclick = () => wheelInstance.spin();
    document.getElementById('btn-stop').onclick = () => wheelInstance.stop();

    // 显示转盘区域，隐藏左右布局和原有交互区
    document.getElementById('wheel-of-destiny').style.display = 'flex'; // 注意用 flex 以保持内部居中
    document.getElementById('category-layout-container').style.display = 'none';
    document.querySelector('.container').style.display = 'none';
}

// ──────────────────────────────────────────────
// 选择大类后：进入左右布局
// ──────────────────────────────────────────────
function selectCategory(category) {
    currentSelectedCategory = category;

    // 1. 隐藏转盘，显示左右布局
    document.getElementById('wheel-of-destiny').style.display = 'none';
    const layout = document.getElementById('category-layout-container');
    layout.style.display = 'flex';

    // 2. 调用原有 openTab，保证后台状态一致
    openTab(null, category);
    // 强制隐藏所有原有 tab-content（避免网格闪现）
    document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');

    // 3. 渲染左右内容
    renderCategoryLayout(category);

    // 4. 选择第一位北极星
    const leaders = allData[category];
    if (leaders && leaders.length > 0) {
        selectLeader(leaders[0], category, null);
        updateSingleCard(leaders[0]);
    }

    document.getElementById('wheel-of-destiny').style.display = 'none';
    document.getElementById('category-layout-container').style.display = 'flex';
    document.querySelector('.container').style.display = 'block'; // 交互区重新可见
}

// ──────────────────────────────────────────────
// 渲染左右布局
// ──────────────────────────────────────────────
function renderCategoryLayout(category) {
    const container = document.getElementById('category-layout-container');
    const lang = currentLang || 'zh-CN';

    const ambientSrc = `images/ambient-${category}.jpg`;  // 意境图命名规则

    container.innerHTML = `
        <div class="layout-left">
            <img src="${ambientSrc}" alt="${getCategoryName(category)}">
        </div>
        <div class="layout-right">
            <div class="card-stage">
                <button class="magic-btn small" id="btn-random-leader">✦ 缘动</button>
                <div id="single-northstar-card" class="northstar-single-card"></div>
            </div>
            <div class="card-controls">
                <input type="text" class="modern-search-input" placeholder="搜索..." id="newUI-search">
                <div class="filter-chips-container" id="chips-${category}"></div>
            </div>
        </div>
    `;

    // 生成子类胶囊（复用 modernfilterUI 的函数）
    const chipsContainer = document.getElementById(`chips-${category}`);
    if (typeof generateChipsForCategory === 'function' && chipsContainer) {
        generateChipsForCategory(category, chipsContainer);
        // 给每个 chip 添加事件：选中后更新随机候选池，但不自动换人
        chipsContainer.querySelectorAll('.chip').forEach(chip => {
            chip.addEventListener('click', function() {
                chipsContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // 搜索框事件：过滤的是当前可用于“手动翻阅”的候选列表，也可用于随机
    document.getElementById('newUI-search').addEventListener('input', function() {
        // 这里仅用于标记，实际随机选择时会读取搜索框内容
    });

    // 绑定随机按钮
    document.getElementById('btn-random-leader').onclick = () => randomSelectLeader(category);
}

// ──────────────────────────────────────────────
// 更新大卡片
// ──────────────────────────────────────────────
function updateSingleCard(leader) {
    const card = document.getElementById('single-northstar-card');
    if (!card) return;
    const lang = currentLang || 'zh-CN';
    const contrib = leader.contribution ? (leader.contribution[lang] || leader.contribution['zh-CN']) : '';
    const field = leader.field ? (leader.field[lang] || leader.field['zh-CN']) : '';
    const remarks = leader.remarks ? (leader.remarks[lang] || leader.remarks['zh-CN']) : '';

    card.innerHTML = `
        <h2>${leader.name}</h2>
        <p class="contribution"><strong>${translations[lang].labelContribution || '贡献'}</strong> ${contrib}</p>
        <p class="field"><strong>${translations[lang].labelField || '领域'}</strong> ${field}</p>
        ${remarks ? `<p class="remarks"><strong>${translations[lang].labelRemarks || '评注'}</strong> ${remarks}</p>` : ''}
    `;
}

// ──────────────────────────────────────────────
// 随机选择（缘动）
// ──────────────────────────────────────────────
function randomSelectLeader(category) {
    const lang = currentLang || 'zh-CN';
    const chipsContainer = document.getElementById(`chips-${category}`);
    let activeSub = null;
    if (chipsContainer) {
        const activeChip = chipsContainer.querySelector('.chip.active[data-filter!="all"]');
        if (activeChip) activeSub = activeChip.dataset.filter;
    }

    let candidates = allData[category] || [];
    
    // 子类过滤
    if (activeSub) {
        const q = activeSub.toLowerCase();
        candidates = candidates.filter(m => {
            const f = m.field ? (m.field[lang] || m.field['zh-CN'] || '') : '';
            return f.toLowerCase().includes(q);
        });
    }

    // 搜索框文本过滤
    const searchInput = document.getElementById('newUI-search');
    if (searchInput && searchInput.value.trim()) {
        const sq = searchInput.value.trim().toLowerCase();
        candidates = candidates.filter(m => {
            const searchStr = [
                m.name,
                (m.contribution && (m.contribution[lang] || m.contribution['zh-CN'] || '')),
                (m.field && (m.field[lang] || m.field['zh-CN'] || ''))
            ].join(' ').toLowerCase();
            return searchStr.includes(sq);
        });
    }

    if (candidates.length === 0) {
        alert(translations[lang].noMatchingLeader || '无匹配的北极星');
        return;
    }

    const random = candidates[Math.floor(Math.random() * candidates.length)];
    selectLeader(random, category, null);
    updateSingleCard(random);
}

// ──────────────────────────────────────────────
// 语言切换时更新转盘文字（开放接口）
// ──────────────────────────────────────────────
function updateWheelLanguage() {
    if (!wheelInstance) return;
    const namesMap = {};
    categories.forEach(cat => { namesMap[cat] = getCategoryName(cat); });
    wheelInstance.namesMap = namesMap;
    wheelInstance.draw();
}

// 钩子：语言改变时刷新转盘
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
