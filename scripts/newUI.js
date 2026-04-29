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
        this.spinning = false;
        this.animId = null;
        this.targetAngle = 0;
        this.spinSpeed = 0;
        this.maxSpeed = 0.35;
        this.minSpeed = 0.02;
        this.deceleration = 0.0005;
        this.onSelect = null;
        this.onPendingSelect = null;
        this.pendingCategory = null;
        this.dragging = false;
        this.lastMouseAngle = 0;
        this.alignDuration = 400;  // 对齐动画时长，保留但未启用

        this.dragThreshold = 5;   // 移动超过 5px 才算拖拽
        this.touchStartX = 0;
        this.touchStartY = 0;
        
        this.locked = false;   // 手动选择后锁定转盘        

        // 【方案3】动态设置 Canvas 物理尺寸
        this._resizeCanvas();
        this.draw();
        this._bindDragEvents();
        this._bindConfirmButton();
    }

    // 新增：根据容器宽度动态调整画布大小
    _resizeCanvas() {
        const parent = this.canvas.parentElement;
        const containerWidth = parent ? parent.clientWidth : window.innerWidth;
        const size = Math.min(400, Math.max(280, containerWidth - 20)); // 两侧留白
        this.canvas.width = size;
        this.canvas.height = size;
        this._radius = size / 2 - 10; // 半径留边距
    }

    // 获取当前实际半径（供 draw 使用）
    get radius() {
        return this._radius || 180;
    }

    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width / 2;
        const h = this.canvas.height / 2;
        const r = this.radius;
        const slice = (2 * Math.PI) / this.categories.length;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.categories.length; i++) {
            const start = this.angle + i * slice;
            const end = start + slice;
            ctx.beginPath();
            ctx.moveTo(w, h);
            ctx.arc(w, h, r, start, end);
            // 待确认扇区高亮
            if (this.pendingCategory === this.categories[i]) {
                ctx.fillStyle = '#3a5a7c';
            } else {
                ctx.fillStyle = i % 2 === 0 ? '#1e2b3c' : '#2c3e50';
            }
            ctx.fill();
            ctx.strokeStyle = '#00dfd8';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.save();
            ctx.translate(w, h);
            ctx.rotate(start + slice / 2);
            ctx.textAlign = 'center';
            ctx.fillStyle = '#fff';
            // 字体大小根据半径动态缩放
            const fontSize = Math.max(12, r * 0.09);
            ctx.font = `bold ${fontSize}px "Noto Serif SC", "Poppins"`;
            ctx.fillText(this.namesMap[this.categories[i]] || '', r * 0.65, 6);
            ctx.restore();
        }

        // 中心装饰圆
        ctx.beginPath();
        ctx.arc(w, h, r * 0.08, 0, 2 * Math.PI);
        ctx.fillStyle = '#050a14';
        ctx.fill();
        ctx.strokeStyle = '#00dfd8';
        ctx.stroke();
    }

    spin() {
        if (this.spinning) return;
        this.locked = false;      // 解锁，允许重新拖拽
        this.clearPending();
        this.spinning = true;
        this.targetAngle = this.angle + Math.random() * 30 + 50;
        this.spinSpeed = this.maxSpeed;
        this.animate();
    }

    animate() {
        if (!this.spinning) return;
        if (this.spinSpeed > this.minSpeed) {
            this.spinSpeed -= this.deceleration;
        }
        this.angle += this.spinSpeed;
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
        this.clearPending();
        this.selectByAngle();
    }

    selectByAngle() {
        const norm = ((this.angle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const slice = (2 * Math.PI) / this.categories.length;
        const pointerAngle = 3 * Math.PI / 2; // 顶部指针
        const relative = (pointerAngle - norm + 2 * Math.PI) % (2 * Math.PI);
        const idx = Math.floor(relative / slice) % this.categories.length;
        const selectedCat = this.categories[idx];
        this.pendingCategory = selectedCat;
        this.draw();
        if (this.onPendingSelect) this.onPendingSelect(selectedCat);
    }

    // 手动拖拽方法 (已包含缩放换算)
    _bindDragEvents() {
        this.canvas.addEventListener('mousedown', (e) => this._onDragStart(e));
        window.addEventListener('mousemove', (e) => this._onDragMove(e));
        window.addEventListener('mouseup', (e) => this._onDragEnd(e));
        this.canvas.addEventListener('touchstart', (e) => this._onDragStart(e), { passive: false });
        window.addEventListener('touchmove', (e) => this._onDragMove(e), { passive: false });
        window.addEventListener('touchend', (e) => this._onDragEnd(e));
        this.canvas.style.touchAction = 'none';
        this.canvas.style.userSelect = 'none';
    }

    _getMouseAngle(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
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
        const dx = (clientX - centerX) * scaleX;
        const dy = (clientY - centerY) * scaleY;
        return Math.atan2(dy, dx);
    }

    _isInsideWheel(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
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
        const dx = (clientX - centerX) * scaleX;
        const dy = (clientY - centerY) * scaleY;
        return Math.sqrt(dx*dx + dy*dy) <= this._radius;
    }

    _onDragStart(e) {
        // 仅当触摸/点击发生在画布上才处理
        if (e.target !== this.canvas) return;
        if (!this._isInsideWheel(e)) return;   // 不在圆形内，忽略
         if (this.locked) return;   // 锁定时禁止任何拖拽
        
        e.preventDefault();
        if (this.spinning) {
            this.spinning = false;
            cancelAnimationFrame(this.animId);
        }
        const pt = this._getClientPoint(e);   // 复用已有的 _getMouseAngle 中的坐标提取，我们简化：直接用 e.touches ? e.touches[0] : e
        this.touchStartX = e.touches ? e.touches[0].clientX : e.clientX;
        this.touchStartY = e.touches ? e.touches[0].clientY : e.clientY;
        this.dragging = false;
        this.lastMouseAngle = null;
        this.clearPending();
    }

    _onDragMove(e) {
        if (e.target !== this.canvas) return;  // 新增
        if (!this._isInsideWheel(e)) return;
        
        if (this.dragging) {
            e.preventDefault();
            const currentAngle = this._getMouseAngle(e);
            let delta = currentAngle - this.lastMouseAngle;
            if (delta > Math.PI) delta -= 2 * Math.PI;
            if (delta < -Math.PI) delta += 2 * Math.PI;
            this.angle += delta;
            this.lastMouseAngle = currentAngle;
            this.draw();
        } else {
            e.preventDefault();
            // 检查是否超过阈值
            const x = e.touches ? e.touches[0].clientX : e.clientX;
            const y = e.touches ? e.touches[0].clientY : e.clientY;
            const dx = x - this.touchStartX;
            const dy = y - this.touchStartY;
            if (dx*dx + dy*dy > this.dragThreshold * this.dragThreshold) {
                this.dragging = true;
                e.preventDefault();               // 此刻才阻止滚动
                this.canvas.style.cursor = 'grabbing';
                this.lastMouseAngle = this._getMouseAngle(e);
            }
        }
    }

    _onDragEnd(e) {
        if (e.target !== this.canvas) return;  // 新增
        
        if (!this.dragging) return;
        this.dragging = false;
        this.canvas.style.cursor = 'grab';
        this.selectByAngle();
        this.locked = true;   // 锁定转盘，禁止再次拖拽
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
// ──────────────────────────────────────────────
function initWheelUI() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;

    const namesMap = {};
    categories.forEach(cat => { namesMap[cat] = getCategoryName(cat); });

    wheelInstance = new DestinyWheel(canvas, categories, namesMap);
    wheelInstance.onSelect = (cat) => {
        selectCategory(cat);   // 确认后进入下一代
    };
    wheelInstance.onPendingSelect = (cat) => {
        wheelInstance.showPendingUI(getCategoryName(cat));
    };

    document.getElementById('btn-spin').onclick = () => wheelInstance.spin();
    //document.getElementById('btn-stop').onclick = () => wheelInstance.stop();

    // 如果转盘已经显示，确保初始状态无 pending
    wheelInstance.clearPending();

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

    // 隐藏原有的标签页按钮
    const tabsBar = document.querySelector('.tabs');
    if (tabsBar) tabsBar.style.display = 'none';
    openTab(null, category);
    document.querySelectorAll('.tab-content').forEach(tc => tc.style.display = 'none');

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
    const ambientSrc = `images/ambient-${category}.jpg`;
    const placeholderText = (window.translations && window.translations[lang]?.search) || '搜索...';

    container.innerHTML = `
        <div class="layout-left">
            <img src="${ambientSrc}" alt="${getCategoryName(category)}">
        </div>
        <div class="layout-right">
            <div class="card-stage">
                <div class="search-and-random">
                    <input type="text" class="modern-search-input" id="newUI-search" placeholder="${placeholderText}">
                    <button class="magic-btn small" id="btn-random-leader">✦ 缘动</button>
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
                alert(translations[lang]?.noMatchingLeader || '无匹配的北极星');
                return;
            }
            const random = candidates[Math.floor(Math.random() * candidates.length)];
            selectLeader(random, category, null);
            updateSingleCard(random);
        };
    }

    // 默认显示第一个
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
    const t = (window.translations && window.translations[lang]) ? window.translations[lang] : {};
    const contrib = leader.contribution ? (leader.contribution[lang] || leader.contribution['zh-CN'] || '') : '';
    const field = leader.field ? (leader.field[lang] || leader.field['zh-CN'] || '') : '';
    const remarks = leader.remarks ? (leader.remarks[lang] || leader.remarks['zh-CN'] || '') : '';

    card.innerHTML = `
        <h2>${leader.name}</h2>
        <p class="contribution"><strong>${t.labelContribution || '贡献'}</strong> ${contrib}</p>
        <p class="field"><strong>${t.labelField || '领域'}</strong> ${field}</p>
        ${remarks ? `<p class="remarks"><strong>${t.labelRemarks || '评注'}</strong> ${remarks}</p>` : ''}
    `;
}


// 获取当前 category 过滤后的候选人数组（结合子类激活胶囊 + 搜索框文本）
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

// 在文件末尾或初始化部分添加：
(function() {
    const origLangChanged = window.onLanguageChanged;
    window.onLanguageChanged = function() {
        if (origLangChanged && typeof origLangChanged === 'function') {
            origLangChanged();
        }
        // 如果当前是新 UI 并且已经进入北极星选择界面，重新绘制
        const layout = document.getElementById('category-layout-container');
        if (layout && layout.style.display !== 'none' && currentSelectedCategory) {
            renderCategoryLayout(currentSelectedCategory);
            // 重新高亮当前已选中的北极星（如果存在）
            if (currentSelectedLeader && currentSelectedLeaderCategory === currentSelectedCategory) {
                updateSingleCard(currentSelectedLeader);
            }
        }
        // 如果在转盘页面，更新转盘文字
        if (typeof updateWheelLanguage === 'function' && wheelInstance) {
            updateWheelLanguage();
        }
    };
})();
