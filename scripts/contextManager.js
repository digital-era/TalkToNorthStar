/**
 * ═══════════════════════════════════════════════
 * 星语上下文管理器 (StarContextManager)
 * 职责：状态管理、持久化、格式转换、API注入格式生成
 * ═══════════════════════════════════════════════
 */
class StarContextManager {
  constructor() {
    this.contexts = [];
    this.maxContexts = 3;
    this.storageKey = 'northstar_contexts_v1';
    this.listeners = [];
    this.load();
  }

  // ── 内部翻译辅助方法 ──
  _t(key) {
    const lang = window.currentLang || 'zh-CN';
    const dict = window.translations?.[lang] || {};
    return dict[key] || key;
  }

  /* ── 订阅机制 ── */
  onChange(callback) { this.listeners.push(callback); }
  _notify() { this.listeners.forEach(cb => cb([...this.contexts])); }

  /* ── 持久化 ── */
  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) this.contexts = JSON.parse(raw);
    } catch (e) {
      console.warn('[StarContext] Load failed:', e);
      this.contexts = [];
    }
  }
  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.contexts));
    } catch (e) {
      console.warn('[StarContext] Save failed:', e);
    }
    this._notify();
  }

  getAll() { return [...this.contexts]; }
  isFull() { return this.contexts.length >= this.maxContexts; }

  /* ── 对话节点检测 ── */
  hasDialogueNode(nodeId) {
    return this.contexts.some(c => c.source === 'dialogue' && c.sourceMeta?.nodeId === nodeId);
  }

  /* ── 1. 文本输入 ── */
  addFromText(text, title) {
    // 若未传 title，使用翻译中的“文本片段”
    const defaultTitle = title || this._t('ctxDefaultTextTitle');
    
    if (this.isFull()) return { success: false, message: this._t('ctxErrorFull') };
    if (!text || !text.trim()) return { success: false, message: this._t('ctxErrorEmpty') };

    const id = 'ctx_text_' + Date.now();
    const cleanText = this._toMarkdown(text);

    this.contexts.push({
      id, title: this._clip(defaultTitle, 40),
      content: cleanText,
      source: 'text',
      sourceMeta: { originalLength: text.length },
      timestamp: Date.now(),
      preview: this._makePreview(cleanText)
    });
    this.save();
    return { success: true, id };
  }

  /* ── 2. URL 解析 ── */
  async addFromUrl(url) {
    if (this.isFull()) return { success: false, message: this._t('ctxErrorFull') };
    if (!this._isValidUrl(url)) return { success: false, message: this._t('ctxErrorUrlInvalid') };

    try {
      const cleanUrl = url.replace(/^https?:\/\//, '');
      const jinaUrl = `https://r.jina.ai/http://${cleanUrl}`;

      const res = await fetch(jinaUrl, {
        method: 'GET',
        headers: { 'Accept': 'text/plain' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const text = await res.text();
      if (!text.trim()) throw new Error('Empty content');

      const title = this._extractTitle(text) || this._t('ctxDefaultWebTitle');
      const id = 'ctx_url_' + Date.now();

      this.contexts.push({
        id, title: this._clip(title, 40),
        content: text.trim(),
        source: 'url',
        sourceMeta: { url: cleanUrl, jinaUrl },
        timestamp: Date.now(),
        preview: this._makePreview(text)
      });
      this.save();
      return { success: true, id };
    } catch (e) {
      console.error('[StarContext] URL Parse Error:', e);
      return { success: false, message: this._t('ctxErrorUrlFail') };
    }
  }

  /* ── 3. 对话节点 Toggle ── */
  addFromDialogue(nodeData) {
    
    // 【限制】仅 AI 回答节点可作为上下文
    if (nodeData.role === 'user') {
      return { success: false, message: '用户提问暂不支持加入星语上下文' };
    }
    const nodeId = nodeData.id || ('node_' + Date.now());

    if (this.isFull()) {
      return { success: false, message: this._t('ctxErrorFullCleanup') };
    }

    const explorerLabel = this._t('ctxRoleUser');
    const northStarLabel = this._t('ctxRoleNorthStar');

    const roleName = nodeData.role === 'user'
      ? explorerLabel
      : (nodeData.leaderInfo?.name || northStarLabel);
    
    // 使用模板：对话 · 角色名
    const titleTemplate = this._t('ctxDialogueTitleTemplate');
    const title = titleTemplate.replace('${role}', roleName);
    
    const content = `### ${roleName}\n\n${nodeData.text}`;

    const id = 'ctx_dlg_' + Date.now();
    this.contexts.push({
      id, title: this._clip(title, 40),
      content,
      source: 'dialogue',
      sourceMeta: { nodeId, role: nodeData.role, leaderName: nodeData.leaderInfo?.name },
      timestamp: Date.now(),
      preview: this._makePreview(nodeData.text)
    });
    this.save();
    return { success: true, id, action: 'added' };
  }

  remove(id) {
    const idx = this.contexts.findIndex(c => c.id === id);
    if (idx >= 0) {
      this.contexts.splice(idx, 1);
      this.save();
      return true;
    }
    return false;
  }

  clear() {
    this.contexts = [];
    this.save();
  }

  /* ── 6. API 注入格式 ── */
  getContextMessages() {
    if (this.contexts.length === 0) return [];

    const headerLabel = this._t('ctxInjectionHeader'); // "上下文"
    const combined = this.contexts.map((c, i) =>
      `--- ${headerLabel} ${i + 1}：${c.title} ---\n${c.content}`
    ).join('\n\n');

    return [{
      role: 'system',
      content: `${this._t('ctxInjectionTitle')}\n\n${combined}\n\n--- ${this._t('ctxInjectionFooter')} ---`
    }];
  }

  /* ── 工具方法保持不变 ── */
  _toMarkdown(text) {
    if (/^#{1,6}\s/m.test(text) || /^[-*]\s/m.test(text)) return text.trim();
    return text.trim().split('\n').map(l => l.trim()).filter(l => l).join('\n\n');
  }
  _makePreview(text, max = 90) {
    const plain = text.replace(/[#*`>\[\]\(\)!]/g, ' ').replace(/\s+/g, ' ').trim();
    return plain.slice(0, max) + (plain.length > max ? ' …' : '');
  }
  _isValidUrl(str) {
    try { new URL(str); return true; } catch { return false; }
  }
  _extractTitle(text) {
    const m = text.match(/^#\s+(.+)$/m) || text.match(/^(.+?)[\n\r]/);
    return m ? m[1].trim() : null;
  }
  _clip(s, n) { return s.length > n ? s.slice(0, n) + '…' : s; }
}

window.starContext = new StarContextManager();
