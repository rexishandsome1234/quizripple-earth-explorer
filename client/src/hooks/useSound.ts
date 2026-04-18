// QuizRipple 地球探險家 — 音效管理 Hook
// 使用 Web Audio API 生成遊戲音效（無需外部音效檔案）
// 設計哲學：彩虹地球儀科普樂園風格

import { useCallback, useRef } from 'react';

type SoundType =
  | 'click'      // 按鈕點擊（彈簧音）
  | 'correct'    // 答對（歡呼音）
  | 'wrong'      // 答錯（低沉音）
  | 'combo'      // 連擊（上升音階）
  | 'timeout'    // 時間到（警示音）
  | 'levelup'    // 升級（勝利音）
  | 'tick'       // 計時滴答
  | 'whoosh';    // 頁面切換（咻～）

export function useSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const playSound = useCallback(
    (type: SoundType) => {
      try {
        const ctx = getCtx();

        switch (type) {
          case 'click': {
            // 彈簧音：快速上升的短音
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.15);
            break;
          }

          case 'correct': {
            // 答對：歡快上升三音
            const notes = [523, 659, 784]; // C5 E5 G5
            notes.forEach((freq, i) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.type = 'triangle';
              osc.frequency.value = freq;
              const t = ctx.currentTime + i * 0.1;
              gain.gain.setValueAtTime(0.4, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
              osc.start(t);
              osc.stop(t + 0.25);
            });
            break;
          }

          case 'wrong': {
            // 答錯：低沉下降音
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(300, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.35);
            break;
          }

          case 'combo': {
            // 連擊：快速上升音階
            const comboNotes = [523, 659, 784, 1047];
            comboNotes.forEach((freq, i) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.type = 'square';
              osc.frequency.value = freq;
              const t = ctx.currentTime + i * 0.07;
              gain.gain.setValueAtTime(0.25, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
              osc.start(t);
              osc.stop(t + 0.2);
            });
            break;
          }

          case 'timeout': {
            // 時間到：警示音
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'square';
            osc.frequency.setValueAtTime(220, ctx.currentTime);
            osc.frequency.setValueAtTime(165, ctx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.4);
            break;
          }

          case 'levelup': {
            // 勝利：上升大和弦
            const winNotes = [523, 659, 784, 1047, 1319];
            winNotes.forEach((freq, i) => {
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.type = 'triangle';
              osc.frequency.value = freq;
              const t = ctx.currentTime + i * 0.12;
              gain.gain.setValueAtTime(0.35, t);
              gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
              osc.start(t);
              osc.stop(t + 0.4);
            });
            break;
          }

          case 'tick': {
            // 計時滴答
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.value = 1000;
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.05);
            break;
          }

          case 'whoosh': {
            // 咻～頁面切換
            const bufferSize = ctx.sampleRate * 0.3;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
              data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
            }
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(2000, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.3);
            const gain = ctx.createGain();
            gain.gain.setValueAtTime(0.4, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
            source.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);
            source.start(ctx.currentTime);
            break;
          }
        }
      } catch (e) {
        // 靜默處理音效錯誤（部分瀏覽器可能限制 AudioContext）
        console.warn('Sound playback failed:', e);
      }
    },
    [getCtx]
  );

  return { playSound };
}
