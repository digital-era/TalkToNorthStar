/**
 * ═══════════════════════════════════════════════
 * 星语上下文 UI 控制器
 * 职责：侧滑面板、画布按钮注入、浏览交互、Toast
 * ═══════════════════════════════════════════════
 */

const ContextUI = {
  // ...
  _t(key) {
    const lang = window.currentLang || 'zh-CN';
    const dict = window.translations?.[lang] || window.translations?.['zh-CN'] || {};
    return dict[key] || key;
  },
  // ...
};

const ContextUI = {
  panel: null,
  browseModal: null,
  isPanelOpen: false,

  init() {
    this._createPanel();
    this._createBrowseModal();
    this._bindGlobalEvents();
    this._watchCanvas();

    window.starContext.onChange(() => this._renderList());
    this._renderList();
  },

   /* ── 构建侧滑面板（国际化版） ── */
  _createPanel() {
    const panel = document.createElement('div');
    panel.id = 'starContextPanel';
    panel.className = 'star-context-panel';
    panel.innerHTML = `
      <div class="star-context-backdrop" onclick="ContextUI.closePanel()"></div>
      <div class="star-context-sheet">
        <div class="star-context-header">
          <h3><i class="fas fa-star-of-life"></i> ${this._t('contextPanelTitle')}</h3>
          <button class="star-context-close" onclick="ContextUI.closePanel()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="star-context-body">
          <div class="star-context-input-area">
            <div class="star-context-tabs">
              <button class="ctx-tab active" data-tab="paste" onclick="ContextUI.switchTab('paste')">
                <i class="fas fa-paste"></i> ${this._t('contextTabPaste')}
              </button>
              <button class="ctx-tab" data-tab="url" onclick="ContextUI.switchTab('url')">
                <i class="fas fa-link"></i> ${this._t('contextTabUrl')}
              </button>
            </div>
            <div class="ctx-tab-content active" id="ctx-tab-paste">
              <textarea id="ctxPasteInput" placeholder="${this._t('contextPastePlaceholder')}"></textarea>
              <button class="ctx-add-btn" onclick="ContextUI.addFromPaste()">
                <i class="fas fa-plus"></i> ${this._t('contextAddBtn')}
              </button>
            </div>
            <div class="ctx-tab-content" id="ctx-tab-url">
              <input type="text" id="ctxUrlInput" placeholder="${this._t('contextUrlPlaceholder')}" />
              <button class="ctx-add-btn" onclick="ContextUI.addFromUrl()">
                <i class="fas fa-globe"></i> ${this._t('contextParseBtn')}
              </button>
              <div class="ctx-url-hint">${this._t('contextUrlHint')}</div>
            </div>
          </div>
  
          <div class="star-context-list-area">
            <div class="ctx-list-header">
              <span>${this._t('contextSelectedHeader')} <span id="ctxCountBadge" class="ctx-count">0/3</span></span>
              <button class="ctx-clear-btn" onclick="ContextUI.clearAll()" title="${this._t('contextClearTitle')}">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
            <div id="ctxListContainer" class="ctx-list-container">
              <div class="ctx-empty-state">
                <i class="fas fa-wind"></i>
                <p>${this._t('contextEmptyTitle')}</p>
                <span>${this._t('contextEmptyDesc')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(panel);
    this.panel = panel;
  },

  _createBrowseModal() {
    const modal = document.createElement('div');
    modal.id = 'starContextBrowseModal';
    // 【关键】不再使用 .modal 类，避免与项目全局 modal 样式冲突
    modal.className = 'star-context-browse-modal';
    modal.innerHTML = `
      <div class="modal-content star-context-browse-content">
        <span class="close-button" onclick="ContextUI.closeBrowse(event)">×</span>
        <div class="ctx-browse-title"><i class="fas fa-scroll"></i> <span id="ctxBrowseTitleText">上下文内容</span></div>
        <div id="ctxBrowseBody" class="ctx-browse-body"></div>
      </div>`;
    document.body.appendChild(modal);
    this.browseModal = modal;

    // 点击背景关闭
    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeBrowse();
    });

    // ESC 键关闭
    this._escHandler = (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) this.closeBrowse();
    };
    document.addEventListener('keydown', this._escHandler);
  },

  /* ── 绑定原有按钮 ── */
  _bindGlobalEvents() {
    // 接管 HTML 中的 ContextButton
    const btn = document.getElementById('ContextButton');
    if (btn) {
      btn.onclick = () => this.openPanel();
      btn.title = '星语上下文管理';
    }
    // 提供全局句柄供 HTML 内联调用
    window.handleContext = () => this.openPanel();
  },

  /* ── 画布按钮注入（非侵入式） ── */
  _watchCanvas() {
    const container = document.getElementById('thoughtStreamContent');
    if (!container) return;
    const observer = new MutationObserver(() => this._injectCanvasButtons());
    observer.observe(container, { childList: true, subtree: true });
    // 初始注入
    setTimeout(() => this._injectCanvasButtons(), 500);
  },

  /* ── 画布按钮注入（非侵入式，国际化版） ── */
  _injectCanvasButtons() {
    const nodes = document.querySelectorAll('.thought-node');
    const history = (typeof getMergedHistory === 'function')
      ? getMergedHistory(window.importedHistory || null, window.conversationHistory || [])
      : [];
  
    nodes.forEach((node, idx) => {
      if (node.querySelector('.ctx-canvas-btn')) return;
      const data = history[idx];
      if (!data || !data.id) return;
  
      const inCtx = window.starContext.hasDialogueNode(data.id);
      const btn = document.createElement('button');
      btn.className = `ctx-canvas-btn ${inCtx ? 'in-context' : ''}`;
      btn.title = inCtx ? this._t('contextCanvasRemoveTitle') : this._t('contextCanvasAddTitle');
      btn.innerHTML = inCtx ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-plus"></i>';
  
      btn.onclick = (e) => {
        e.stopPropagation();
        const res = window.starContext.addFromDialogue(data);
        if (res.success) {
          const isIn = res.action === 'added';
          btn.classList.toggle('in-context', isIn);
          btn.innerHTML = isIn ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-plus"></i>';
          btn.title = isIn ? this._t('contextCanvasRemoveTitle') : this._t('contextCanvasAddTitle');
          this._renderList();
          this._showToast(isIn ? this._t('contextToastAdded') : this._t('contextToastRemoved'));
        } else {
          alert(res.message);
        }
      };
  
      // 插入到删除按钮之前
      const deleteBtn = node.querySelector('.node-delete-btn');
      if (deleteBtn) {
        node.insertBefore(btn, deleteBtn);
      } else {
        node.appendChild(btn);
      }
    });
  },

  /* ── 标签切换 ── */
  switchTab(name) {
    document.querySelectorAll('.ctx-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    document.querySelectorAll('.ctx-tab-content').forEach(t => t.classList.toggle('active', t.id === 'ctx-tab-' + name));
  },

  /* ── 添加操作 ── */
  addFromPaste() {
    const ta = document.getElementById('ctxPasteInput');
    const text = ta.value.trim();
    if (!text) return;
    const res = window.starContext.addFromText(text, '粘贴文本');
    if (res.success) {
      ta.value = '';
      this._showToast(this._t('contextToastAdded'));   // ✅ 替换硬编码
    } else {
      alert(res.message);
    }
  }

  async addFromUrl() {
    const input = document.getElementById('ctxUrlInput');
    const url = input.value.trim();
    if (!url) return;
    const btn = input.nextElementSibling;
    const html = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 解析中…';
    btn.disabled = true;
  
    const res = await window.starContext.addFromUrl(url);
  
    btn.innerHTML = html;
    btn.disabled = false;
    if (res.success) {
      input.value = '';
      this._showToast(this._t('contextToastUrlAdded'));   // ✅ 替换硬编码
    } else {
      alert(res.message);
    }
  }

  clearAll() {
    if (!window.starContext.getAll().length) return;
    if (!confirm(this._t('contextConfirmClear'))) return;   // ✅ 替换硬编码
    window.starContext.clear();
    this._showToast(this._t('contextToastCleared'));        // ✅ 替换硬编码
    this._refreshCanvasButtons();
  }

  removeContext(id) {
    window.starContext.remove(id);
    this._refreshCanvasButtons();
    this._showToast(this._t('contextToastRemoved'));   // 可选
  }

  /* ── 浏览 ── */
  browseContext(id) {
    // 防重复点击锁
    if (this._browseOpening) return;
    this._browseOpening = true;

    const ctx = window.starContext.getAll().find(c => c.id === id);
    if (!ctx) { this._browseOpening = false; return; }

    document.getElementById('ctxBrowseTitleText').textContent = ctx.title;
    const body = document.getElementById('ctxBrowseBody');
    body.innerHTML = (typeof marked !== 'undefined')
      ? marked.parse(ctx.content)
      : ctx.content.replace(/\n/g, '<br>');

    const modal = this.browseModal;
    // 先设置 display 确保进入文档流
    modal.style.display = 'flex';
    // 双 rAF 确保浏览器已重绘后再添加 open 类，触发动画
    requestAnimationFrame(() => {
      requestAnimationFrame(() => modal.classList.add('open'));
    });

    if (window.MathJax) MathJax.typesetPromise([body]).catch(() => {});

    // 400ms 后解锁（匹配 CSS transition 时长）
    setTimeout(() => { this._browseOpening = false; }, 400);
  },
  
  closeBrowse(e) {
    // 阻止事件冒泡，防止触发背景点击
    if (e) e.stopPropagation();

    const modal = this.browseModal;
    if (!modal || !modal.classList.contains('open')) return;

    modal.classList.remove('open');

    // 等待 CSS 动画（0.4s）完全结束后再移除 display
    // 避免直接 display:none 导致按钮跳闪与动画截断
    setTimeout(() => {
      if (!modal.classList.contains('open')) {
        modal.style.display = 'none';
      }
    }, 400);
  },

  /* ── 面板开关 ── */
  openPanel() {
    this.isPanelOpen = true;
    this.panel.classList.add('open');
    document.body.style.overflow = 'hidden';
    this._renderList();
  },
  closePanel() {
    this.isPanelOpen = false;
    this.panel.classList.remove('open');
    document.body.style.overflow = '';
  },

  /* ── 渲染列表 ── */
  _renderList() {
    const container = document.getElementById('ctxListContainer');
    const items = window.starContext.getAll();
    document.getElementById('ctxCountBadge').textContent = `${items.length}/3`;

    if (!items.length) {
      container.innerHTML = `
        <div class="ctx-empty-state">
          <i class="fas fa-wind"></i>
          <p>暂无上下文</p>
          <span>从上方粘贴文本、输入 URL，或从对话画布中添加</span>
        </div>`;
      return;
    }

    const iconMap = { text: 'fa-file-alt', url: 'fa-globe', dialogue: 'fa-comments' };
    container.innerHTML = items.map((ctx, i) => `
      <div class="ctx-card" style="--i:${i}">
        <div class="ctx-card-header">
          <div class="ctx-card-title">
            <i class="fas ${iconMap[ctx.source]||'fa-star'}"></i>
            <span>${ctx.title}</span>
          </div>
          <div class="ctx-card-actions">
            <button onclick="ContextUI.browseContext('${ctx.id}')" title="浏览全文"><i class="fas fa-eye"></i></button>
            <button onclick="ContextUI.removeContext('${ctx.id}')" title="移除"><i class="fas fa-times"></i></button>
          </div>
        </div>
        <div class="ctx-card-preview">${ctx.preview}</div>
        <div class="ctx-card-meta">
          <span>${new Date(ctx.timestamp).toLocaleString()}</span>
          <span class="ctx-source-tag">${{text:'文本',url:'网页',dialogue:'对话'}[ctx.source]}</span>
        </div>
      </div>`).join('');
  },

  _refreshCanvasButtons() {
    document.querySelectorAll('.ctx-canvas-btn').forEach(b => b.remove());
    this._injectCanvasButtons();
  },

  _showToast(msg) {
    const t = document.createElement('div');
    t.className = 'ctx-toast';
    t.innerHTML = `<i class="fas fa-check-circle"></i> ${msg}`;
    document.body.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add('show')));
    setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2200);
  }
};

/* 初始化 */
document.addEventListener('DOMContentLoaded', () => ContextUI.init());
