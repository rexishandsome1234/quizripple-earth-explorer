// QuizRipple 地球探險家 — 首頁歡迎畫面（含音效）
// 設計哲學：彩虹地球儀科普樂園風格
// 全螢幕英雄背景，三隻動物角色展示，超大圓角按鈕

import { useGame } from '@/contexts/GameContext';
import AnimalGuide from '@/components/AnimalGuide';
import { useSound } from '@/hooks/useSound';
import { useState, useEffect } from 'react';

export default function HomeScreen() {
  const { goToScreen } = useGame();
  const { playSound } = useSound();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    playSound('whoosh');
    goToScreen('category');
  };

  const handleLeaderboard = () => {
    playSound('click');
    goToScreen('leaderboard');
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #87CEEB 0%, #B8E4F9 40%, #E8F4FD 70%, #FFF9F0 100%)',
      }}
    >
      {/* 背景英雄圖 */}
      <div
        className="absolute inset-0 bg-cover bg-bottom opacity-55"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663571320430/KKUPBKCuj8ZPmqDE9esPhM/hero-bg-HUvg2wjieTydzDwcQTBuLe.webp)`,
        }}
      />

      {/* 漂浮雲朵 */}
      <div className="absolute top-8 left-8 opacity-80 animate-cloud-float pointer-events-none">
        <div className="bg-white rounded-full w-20 h-10 shadow-sm" />
        <div className="bg-white rounded-full w-14 h-8 -mt-4 ml-4 shadow-sm" />
      </div>
      <div
        className="absolute top-16 right-12 opacity-70 animate-cloud-float pointer-events-none"
        style={{ animationDelay: '1.5s' }}
      >
        <div className="bg-white rounded-full w-28 h-12 shadow-sm" />
        <div className="bg-white rounded-full w-16 h-8 -mt-5 ml-6 shadow-sm" />
      </div>
      <div
        className="absolute top-32 left-1/4 opacity-60 animate-cloud-float pointer-events-none"
        style={{ animationDelay: '3s' }}
      >
        <div className="bg-white rounded-full w-16 h-8 shadow-sm" />
      </div>

      {/* 主要內容 */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-8">

        {/* 標題區塊 */}
        <div
          className={`text-center mb-6 ${mounted ? 'animate-slide-in-bottom' : 'opacity-0'}`}
        >
          <div
            className="inline-block bg-white/90 backdrop-blur-sm rounded-3xl px-6 py-2 mb-4 shadow-lg"
            style={{ border: '3px solid #FFD93D' }}
          >
            <p
              className="text-sm font-black tracking-widest"
              style={{ color: '#D4873C', fontFamily: 'Nunito, sans-serif' }}
            >
              🌍 QuizRipple
            </p>
          </div>

          <h1
            className="font-black leading-tight mb-2"
            style={{
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.2rem, 8vw, 4.5rem)',
              color: '#1A3A5C',
              textShadow: '3px 3px 0 rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.5)',
              lineHeight: 1.1,
            }}
          >
            地球探險家
          </h1>
          <p
            className="text-lg font-bold mt-2"
            style={{
              color: '#2C5F8A',
              fontFamily: 'Nunito, sans-serif',
              textShadow: '1px 1px 0 rgba(255,255,255,0.8)',
            }}
          >
            🔍 探索地球的神奇秘密！
          </p>
        </div>

        {/* 三隻動物角色展示 */}
        <div
          className={`flex items-end justify-center gap-4 md:gap-8 mb-8 ${mounted ? 'animate-bounce-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          {/* Molly */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-white/90 rounded-2xl px-3 py-1 shadow-md"
              style={{ border: '2px solid #D4873C' }}
            >
              <p className="text-xs font-black" style={{ color: '#D4873C', fontFamily: 'Nunito, sans-serif' }}>
                ⛏️ Molly
              </p>
            </div>
            <AnimalGuide animal="molly" mood="happy" size="lg" />
          </div>

          {/* 地球圖示（中間） */}
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-xl mb-2"
              style={{
                background: 'linear-gradient(135deg, #4ECDC4, #2980B9)',
                fontSize: '2.5rem',
                animation: 'earthSpin 20s linear infinite',
                boxShadow: '0 8px 24px rgba(41,128,185,0.4)',
              }}
            >
              🌍
            </div>
            <p
              className="text-xs font-black italic"
              style={{
                color: '#1A6B9A',
                fontFamily: 'Nunito, sans-serif',
                textShadow: '1px 1px 0 rgba(255,255,255,0.8)',
              }}
            >
              轟隆隆！
            </p>
          </div>

          {/* Albie */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="bg-white/90 rounded-2xl px-3 py-1 shadow-md"
              style={{ border: '2px solid #1A6B9A' }}
            >
              <p className="text-xs font-black" style={{ color: '#1A6B9A', fontFamily: 'Nunito, sans-serif' }}>
                ✈️ Albie
              </p>
            </div>
            <AnimalGuide animal="albie" mood="happy" size="lg" />
          </div>
        </div>

        {/* 主要按鈕區 */}
        <div
          className={`flex flex-col items-center gap-4 w-full max-w-sm ${mounted ? 'animate-slide-in-bottom' : 'opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        >
          <button
            className="btn-game w-full text-white text-xl"
            style={{
              background: 'linear-gradient(135deg, #FF8C00, #FFD700)',
              boxShadow: '0 6px 20px rgba(255, 140, 0, 0.45)',
              fontFamily: 'Nunito, sans-serif',
            }}
            onClick={handleStart}
          >
            🚀 開始探險！
          </button>

          <button
            className="btn-game w-full text-white"
            style={{
              background: 'linear-gradient(135deg, #4ECDC4, #2980B9)',
              boxShadow: '0 6px 20px rgba(41, 128, 185, 0.4)',
              fontFamily: 'Nunito, sans-serif',
            }}
            onClick={handleLeaderboard}
          >
            🏆 排行榜
          </button>
        </div>

        {/* 適齡標籤 */}
        <div
          className={`mt-5 flex items-center gap-2 ${mounted ? 'animate-fade-in-scale' : 'opacity-0'}`}
          style={{ animationDelay: '0.6s' }}
        >
          <div
            className="bg-white/85 rounded-full px-4 py-2 shadow-md"
            style={{ border: '2px solid #6BBF59' }}
          >
            <p
              className="text-sm font-bold"
              style={{ color: '#1A7A4A', fontFamily: 'Nunito, sans-serif' }}
            >
              👦 適合 6-10 歲小探險家
            </p>
          </div>
        </div>
      </div>

      {/* Mark 狐獴在底部 */}
      <div className="relative z-10 flex justify-center pb-4">
        <div className="flex flex-col items-center">
          <div
            className="bg-white/85 rounded-2xl px-3 py-1 mb-2 shadow-md"
            style={{ border: '2px solid #FFD700' }}
          >
            <p className="text-xs font-black" style={{ color: '#B8860B', fontFamily: 'Nunito, sans-serif' }}>
              🌟 Mark 在幫你加油！
            </p>
          </div>
          <AnimalGuide animal="mark" mood="celebrate" size="md" />
        </div>
      </div>
    </div>
  );
}
