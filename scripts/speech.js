/**
 * 思想画布语音合成
 * 支持中文/英文自动检测，自动分段（避免超长文本截断）
 */
class CanvasTTS {
    constructor() {
        this.synth = window.speechSynthesis;
        this.isPlaying = false;
        this.isPaused = false;
        this._utterance = null;
        this._text = '';           // 记录完整文本
        this._charIndex = 0;       // 记录暂停位置
    }

    speak(text) {
        if (!this.synth) return;
        
        // 如果正在暂停，继续播放
        if (this.isPaused) {
            this.resume();
            return;
        }

        this.stop();
        this._text = text;
        this._charIndex = 0;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = /[\u4e00-\u9fa5]/.test(text) ? 'zh-CN' : 'en-US';
        utterance.rate = 0.95;

        // 选语音
        const voices = this.synth.getVoices();
        const voice = utterance.lang === 'zh-CN' 
            ? voices.find(v => v.name.includes('Xiaoxiao') || v.lang === 'zh-CN')
            : voices.find(v => v.lang === 'en-US');
        if (voice) utterance.voice = voice;

        // 记录当前读到哪
        utterance.onboundary = (e) => {
            if (e.name === 'word' || e.name === 'sentence') {
                this._charIndex = e.charIndex;
            }
        };

        utterance.onstart = () => {
            this.isPlaying = true;
            this.isPaused = false;
        };

        utterance.onend = () => {
            this.isPlaying = false;
            this.isPaused = false;
            this._charIndex = 0;
        };

        utterance.onerror = (e) => {
            if (e.error !== 'interrupted' && e.error !== 'canceled') {
                console.error('[TTS] error:', e.error);
            }
            this.isPlaying = false;
        };

        this._utterance = utterance;
        this.synth.speak(utterance);
    }

    pause() {
        if (this.synth && this.isPlaying) {
            this.synth.pause();
            this.isPaused = true;
            this.isPlaying = false;
        }
    }

    resume() {
        if (this.synth && this.isPaused) {
            this.synth.resume();
            this.isPaused = false;
            this.isPlaying = true;
        }
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
        this.isPlaying = false;
        this.isPaused = false;
        this._charIndex = 0;
    }

    // ─── 私有方法 ───

    _stripMarkdown(text) {
        return text
            .replace(/!\[.*?\]\(.*?\)/g, '')      // 图片
            .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接保留文本
            .replace(/[#*`>_~]/g, '')             // Markdown 标记
            .replace(/\n{3,}/g, '\n\n')           // 压缩空行
            .trim();
    }

    _splitText(text, maxLen) {
        const sentences = text.match(/[^。！？.!?]+[。！？.!?]+|[^。！？.!?]+$/g) || [text];
        const chunks = [];
        let current = '';

        for (const s of sentences) {
            if ((current + s).length > maxLen && current) {
                chunks.push(current.trim());
                current = s;
            } else {
                current += s;
            }
        }
        if (current) chunks.push(current.trim());
        return chunks.length ? chunks : [text];
    }

    _detectLang(text) {
        // 简单检测：中文字符占比
        const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
        return chineseChars / text.length > 0.3 ? 'zh-CN' : 'en-US';
    }

    _selectBestVoice(lang) {
        const voices = this.synth.getVoices();
        if (!voices.length) return null;

        // 优先级排序
        const preferred = {
            'zh-CN': ['Xiaoxiao', 'Xiaoyi', 'Yunyang', 'Google 普通话', 'Ting-Ting'],
            'en-US': ['Samantha', 'Google US English', 'Alex']
        };

        const candidates = preferred[lang] || [];
        for (const name of candidates) {
            const found = voices.find(v => v.name.includes(name));
            if (found) return found;
        }

        // 兜底：返回该语言第一个可用语音
        return voices.find(v => v.lang.startsWith(lang.split('-')[0])) || voices[0];
    }
}

// 全局实例
window.canvasTTS = new CanvasTTS();


/**
 * 切换画布语音朗读
 * 自动读取画布中最后一条 AI 回复
 */
function toggleCanvasTTS() {
    const btn = document.getElementById('btn-canvas-tts');
    const icon = document.getElementById('tts-icon');
    const lang = window.currentLang || 'zh-CN';

    // 如果正在播放，暂停
    if (window.canvasTTS?.isPlaying && !window.canvasTTS?.isPaused) {
        window.canvasTTS.pause();
        icon.className = 'fas fa-play';  // 变为继续图标
        btn.classList.remove('tts-active');
        btn.classList.add('tts-paused');
        btn.title = lang === 'zh-CN' ? '继续朗读' : 'Resume';
        return;
    }

    // 如果已暂停，继续
    if (window.canvasTTS?.isPaused) {
        window.canvasTTS.resume();
        icon.className = 'fas fa-stop';
        btn.classList.add('tts-active');
        btn.classList.remove('tts-paused');
        btn.title = lang === 'zh-CN' ? '停止朗读' : 'Stop';
        return;
    }

    // 全新播放
    const allHistory = getMergedHistory(importedHistory, conversationHistory);
    const lastAI = [...allHistory].reverse().find(item => 
        item.role === 'assistant' || item.role === 'ai'
    );

    if (!lastAI) {
        showToast(lang === 'zh-CN' ? '没有可朗读内容' : 'No content', 'info');
        return;
    }

    const prefix = lang === 'zh-CN' ? '北极星说：' : 'North Star: ';
    window.canvasTTS.speak(prefix + lastAI.text);
    
    icon.className = 'fas fa-stop';
    btn.classList.add('tts-active');
    btn.title = lang === 'zh-CN' ? '停止朗读' : 'Stop';
}
