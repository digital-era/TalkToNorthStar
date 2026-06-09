/**
 * 思想画布语音合成
 * 支持中文/英文自动检测，自动分段（避免超长文本截断）
 */
class CanvasTTS {
    constructor() {
        this.synth = window.speechSynthesis;
        this.currentUtterance = null;
        this.isPlaying = false;
    }

    /**
     * 播放文本
     * @param {string} text - 要朗读的文本（支持 Markdown，会自动清理）
     */
    speak(text) {
        if (!this.synth) {
            console.warn('[TTS] 浏览器不支持语音合成');
            return;
        }

        // 停止当前播放
        this.stop();

        // 清理 Markdown 标记
        const cleanText = this._stripMarkdown(text);

        // 按段落拆分，避免单条 utterance 过长被截断
        const chunks = this._splitText(cleanText, 200);

        let index = 0;
        const playNext = () => {
            if (index >= chunks.length) {
                this.isPlaying = false;
                return;
            }

            const utterance = new SpeechSynthesisUtterance(chunks[index]);
            
            // 自动语言检测
            utterance.lang = this._detectLang(chunks[index]);
            
            // 选择最佳语音（优先微软 Xiaoxiao、Google 中文）
            utterance.voice = this._selectBestVoice(utterance.lang);

            // 语速语调优化
            utterance.rate = 0.95;   // 稍慢，适合阅读
            utterance.pitch = 1.0;   // 自然音高
            utterance.volume = 1.0;

            utterance.onend = () => {
                index++;
                playNext();
            };

            utterance.onerror = (e) => {
                console.error('[TTS] Error:', e);
                this.isPlaying = false;
            };

            this.currentUtterance = utterance;
            this.synth.speak(utterance);
            this.isPlaying = true;
        };

        playNext();
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
        this.isPlaying = false;
    }

    pause() {
        if (this.synth) this.synth.pause();
    }

    resume() {
        if (this.synth) this.synth.resume();
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
    const icon = document.getElementById('tts-icon');
    
    if (window.canvasTTS?.isPlaying) {
        window.canvasTTS.stop();
        icon.className = 'fas fa-volume-high';
        return;
    }

    // 获取画布中最后一条 assistant/ai 回复
    const lastAI = getMergedHistory(importedHistory, conversationHistory)
        .filter(item => item.role === 'assistant' || item.role === 'ai')
        .pop();

    if (!lastAI?.text) {
        showToast('没有可朗读的内容', 'info');
        return;
    }

    // 播放并监听结束
    window.canvasTTS.speak(lastAI.text);
    icon.className = 'fas fa-stop';
    
    // 轮询检测播放结束，恢复图标
    const checkEnd = setInterval(() => {
        if (!window.canvasTTS.isPlaying) {
            icon.className = 'fas fa-volume-high';
            clearInterval(checkEnd);
        }
    }, 500);
}

