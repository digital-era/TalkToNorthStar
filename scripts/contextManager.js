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

  /* ── 订阅机制 ── */
  onChange(callback) { this.listeners.push(callback); }
  _notify() { this.listeners.forEach(cb => cb([...this.contexts])); }

  /* ── 持久化 ── */
  load() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (raw) this.contexts = JSON.parse(raw);
    } catch (e) {
      console.warn('[StarContext] 加载失败:', e);
      this.contexts = [];
    }
  }
  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.contexts));
    } catch (e) {
      console.warn('[StarContext] 保存失败:', e);
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
  addFromText(text, title = '文本片段') {
    if (this.isFull()) return { success: false, message: '星语上下文已满（最多 3 个）' };
    if (!text || !text.trim()) return { success: false, message: '内容不能为空' };

    const id = 'ctx_text_' + Date.now();
    const cleanText = this._toMarkdown(text);

    this.contexts.push({
      id, title: this._clip(title, 40),
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
    if (this.isFull()) return { success: false, message: '星语上下文已满（最多 3 个）' };
    if (!this._isValidUrl(url)) return { success: false, message: 'URL 格式不正确' };

    try {
      // 使用 jina.ai 读取器提取正文（返回 Markdown）
      const cleanUrl = url.replace(/^https?:\/\//, '');
      const jinaUrl = `https://r.jina.ai/http://${cleanUrl}`;

      const res = await fetch(jinaUrl, {
        method: 'GET',
        headers: { 'Accept': 'text/plain' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const text = await res.text();
      if (!text.trim()) throw new Error('空内容');

      const title = this._extractTitle(text) || '网页内容';
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
      console.error('[StarContext] URL 解析失败:', e);
      return { success: false, message: '网页内容提取失败，建议手动粘贴文本' };
    }
  }

  /* ── 3. 对话节点 Toggle ── */
  addFromDialogue(nodeData) {
    const nodeId = nodeData.id || ('node_' + Date.now());

    // 若已存在则移除（实现 +/- 切换）
    const existIdx = this.contexts.findIndex(
      c => c.source === 'dialogue' && c.sourceMeta?.nodeId === nodeId
    );
    if (existIdx >= 0) {
      this.contexts.splice(existIdx, 1);
      this.save();
      return { success: true, id: null, action: 'removed' };
    }

    if (this.isFull()) return { success: false, message: '星语上下文已满（最多 3 个）' };

    const roleName = nodeData.role === 'user'
      ? '探索者'
      : (nodeData.leaderInfo?.name || '北极星');
    const title = `对话 · ${roleName}`;
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

  /* ── 6. API 注入格式（完全解耦） ── */
  getContextMessages() {
    if (this.contexts.length === 0) return [];
    const combined = this.contexts.map((c, i) =>
      `--- 上下文 ${i + 1}：${c.title} ---\n${c.content}`
    ).join('\n\n');
    return [{
      role: 'system',
      content: `【星语上下文 · 参考资料】\n\n${combined}\n\n--- 上下文结束 · 请结合以上资料回答后续问题 ---`
    }];
  }

  /* ── 工具方法 ── */
  _toMarkdown(text) {
    // 若已有 Markdown 特征则保留
    if (/^#{1,6}\s/m.test(text) || /^[-*]\s/m.test(text)) return text.trim();
    // 简单包装为引用段落
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

/* 全局单例 */
window.starContext = new StarContextManager();
