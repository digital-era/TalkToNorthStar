/**
 * 思想画布语音合成
 * 支持中文/英文自动检测，自动分段（避免超长文本截断）
 */
class CanvasTTS {
    constructor() {
        this.synth = window.speechSynthesis;
        this.currentUtterance = null;
        this.isPlaying = false;
        this.isPaused = false;      // 新增：暂停状态
        this._chunks = [];          // 新增：记录分段
        this._chunkIndex = 0;       // 新增：记录当前段
    }

    speak(text) {
        if (!this.synth) {
            console.warn('[TTS] 浏览器不支持语音合成');
            return;
        }

        // 如果已暂停，继续播放
        if (this.isPaused) {
            this.resume();
            return;
        }

        // 停止当前播放
        this.stop();

        // 清理 Markdown 标记（原有逻辑）
        const cleanText = this._stripMarkdown(text);

        // 按段落拆分，避免单条 utterance 过长被截断（原有逻辑）
        this._chunks = this._splitText(cleanText, 200);
        this._chunkIndex = 0;

        const playNext = () => {
            if (this._chunkIndex >= this._chunks.length) {
                this.isPlaying = false;
                this.isPaused = false;
                return;
            }

            const utterance = new SpeechSynthesisUtterance(this._chunks[this._chunkIndex]);
            
            // 自动语言检测（原有逻辑）
            utterance.lang = this._detectLang(this._chunks[this._chunkIndex]);
            
            // 选择最佳语音（原有逻辑）
            utterance.voice = this._selectBestVoice(utterance.lang);

            // 语速语调优化（原有逻辑）
            utterance.rate = 0.95;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            utterance.onend = () => {
                this._chunkIndex++;
                playNext();
            };

            utterance.onerror = (e) => {
                // 用户主动停止，不报错（原有逻辑）
                if (e.error === 'interrupted' || e.error === 'canceled') {
                    return;
                }
                console.error('[TTS] error:', e.error);
            };

            this.currentUtterance = utterance;
            this.synth.speak(utterance);
            this.isPlaying = true;
            this.isPaused = false;
        };

        playNext();
    }

    // 新增：暂停
    pause() {
        if (this.synth && this.isPlaying && !this.isPaused) {
            this.synth.pause();
            this.isPaused = true;
            this.isPlaying = false;
        }
    }

    // 新增：继续
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
        this._chunks = [];
        this._chunkIndex = 0;
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
    
        // 严格优先级列表
        const preferred = {
            'zh-CN': [
                'Microsoft Xiaoxiao Online',  // Edge/Win11 最佳
                'Microsoft Xiaoxiao',          // Win10
                'Ting-Ting',                   // macOS
                'Google 普通话',                // Chrome
                'zh-CN'                        // 任意中文
            ],
            'en-US': [
                'Microsoft Zira',              // Win
                'Samantha',                     // macOS
                'Google US English',            // Chrome
                'en-US'                         // 任意英文
            ]
        };
    
        const candidates = preferred[lang] || [];
        
        for (const name of candidates) {
            const found = voices.find(v => 
                v.name.includes(name) || v.lang === name
            );
            if (found) return found;
        }
    
        // 最终兜底：该语言第一个可用语音
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
        icon.className = 'fas fa-play';
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

    // 全新播放（原有逻辑，不改动文本处理）
    const allHistory = getMergedHistory(importedHistory, conversationHistory);
    const lastAI = [...allHistory].reverse().find(item => 
        item.role === 'assistant' || item.role === 'ai'
    );

    if (!lastAI) {
        showToast(lang === 'zh-CN' ? '没有可朗读的内容' : 'No content to read', 'info');
        return;
    }

    // 直接传入原文，由 CanvasTTS 内部清理 Markdown
    window.canvasTTS.speak(lastAI.text);
    
    icon.className = 'fas fa-stop';
    btn.classList.add('tts-active');
    btn.title = lang === 'zh-CN' ? '停止朗读' : 'Stop Reading';
}
