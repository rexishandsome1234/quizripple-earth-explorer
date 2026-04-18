// QuizRipple 地球探險家 — 關卡選擇大廳（含音效）
// 設計哲學：彩虹地球儀科普樂園風格

import { useGame } from '@/contexts/GameContext';
import { CATEGORIES, CategoryInfo } from '@/lib/gameData';
import AnimalGuide from '@/components/AnimalGuide';
import { useSound } from '@/hooks/useSound';
import { useState } from 'react';

const CATEGORY_DETAILS = [
  {
    id: 'earth',
    bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #92400E 100%)',
    cardBg: 'linear-gradient(135deg, #FEF9EE, #FDE68A60)',
    borderColor: '#D97706',
    animal: 'molly' as const,
    funFact: '地球有 46 億歲了！',
    icon: '⛏️',
    tags: ['地殼', '地函', '地核', '火山', '地震'],
    sfx: '轟隆隆！',
  },
  {
    id: 'world',
    bg: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #075985 100%)',
    cardBg: 'linear-gradient(135deg, #F0F9FF, #BAE6FD60)',
    borderColor: '#0284C7',
    animal: 'albie' as const,
    funFact: '地球上有 195 個國家！',
    icon: '✈️',
    tags: ['國家', '文化', '地理', '首都', '語言'],
    sfx: '咻～',
  },
  {
    id: 'animals',
    bg: 'linear-gradient(135deg, #22C55E 0%, #16A34A 50%, #166534 100%)',
    cardBg: 'linear-gradient(135deg, #F0FFF4, #BBF7D060)',
    borderColor: '#16A34A',
    animal: 'albie' as const,
    funFact: '地球上有 870 萬種動物！',
    icon: '🦁',
    tags: ['棲息地', '動物', '生態', '海洋', '森林'],
    sfx: '碰！',
  },
];

export default function CategoryScreen() {
  const { selectCategory, startGame, goToScreen } = useGame();
  const { playSound } = useSound();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (cat: CategoryInfo) => {
    if (selectedId) return;
    playSound('whoosh');
    setSelectedId(cat.id);
    selectCategory(cat.id as any);
    setTimeout(() => {
      startGame();
    }, 350);
  };

  const handleBack = () => {
    playSound('click');
    goToScreen('home');
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #E8F4FD 0%, #FFF9F0 100%)',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      {/* 頂部導航 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2 shadow-md font-bold text-sm transition-all hover:scale-105 active:scale-95"
          style={{ color: '#4A7C9E', border: '2px solid #BAE6FD' }}
          onClick={handleBack}
        >
          ← 回首頁
        </button>
        <div
          className="bg-white/90 rounded-2xl px-4 py-2 shadow-md"
          style={{ border: '2px solid #FFD93D' }}
        >
          <p className="text-sm font-black" style={{ color: '#D4873C' }}>
            🌍 QuizRipple
          </p>
        </div>
      </div>

      {/* 標題 */}
      <div className="text-center px-4 py-4 animate-slide-in-bottom">
        <h2
          className="font-black mb-1"
          style={{
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 6vw, 3rem)',
            color: '#1A3A5C',
          }}
        >
          選擇你的冒險！
        </h2>
        <p className="font-bold" style={{ color: '#4A7C9E', fontSize: '1rem' }}>
          🗺️ 你想探索哪個世界呢？
        </p>
      </div>

      {/* 關卡卡片 */}
      <div className="flex-1 px-4 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto w-full">
        {CATEGORIES.map((cat, idx) => {
          const detail = CATEGORY_DETAILS.find((d) => d.id === cat.id)!;
          const isHovered = hoveredId === cat.id;
          const isSelected = selectedId === cat.id;

          return (
            <button
              key={cat.id}
              className="relative rounded-3xl overflow-hidden shadow-xl text-left transition-all duration-200 animate-bounce-in"
              style={{
                animationDelay: `${idx * 0.12}s`,
                border: `4px solid ${isHovered || isSelected ? detail.borderColor : 'transparent'}`,
                transform: isHovered ? 'translateY(-8px) scale(1.02)' : isSelected ? 'scale(0.96)' : 'scale(1)',
                boxShadow: isHovered
                  ? `0 16px 40px ${detail.borderColor}50`
                  : '0 6px 20px rgba(0,0,0,0.1)',
              }}
              onMouseEnter={() => {
                setHoveredId(cat.id);
                playSound('click');
              }}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleSelect(cat)}
            >
              {/* 卡片背景 */}
              <div className="absolute inset-0" style={{ background: detail.cardBg }} />

              {/* 頂部彩色條 */}
              <div className="h-3 w-full" style={{ background: detail.bg }} />

              <div className="relative p-4">
                {/* 動物角色 */}
                <div className="flex justify-center mb-3">
                  <AnimalGuide
                    animal={detail.animal}
                    mood={isHovered ? 'happy' : 'idle'}
                    size="lg"
                  />
                </div>

                {/* 擬聲詞 */}
                {isHovered && (
                  <div
                    className="absolute top-3 right-3 sfx-text text-lg"
                    style={{ color: detail.borderColor }}
                  >
                    {detail.sfx}
                  </div>
                )}

                {/* 關卡名稱 */}
                <div className="text-center mb-2">
                  <span className="text-3xl">{detail.icon}</span>
                  <h3
                    className="font-black mt-1"
                    style={{ fontWeight: 900, fontSize: '1.25rem', color: '#1A3A5C' }}
                  >
                    {cat.name}
                  </h3>
                  <p className="text-sm font-bold mt-1" style={{ color: '#4A7C9E' }}>
                    {cat.subtitle}
                  </p>
                </div>

                {/* 趣味知識 */}
                <div
                  className="rounded-2xl px-3 py-2 mb-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.75)' }}
                >
                  <p className="text-xs font-bold" style={{ color: '#374151' }}>
                    💡 {detail.funFact}
                  </p>
                </div>

                {/* 主題標籤 */}
                <div className="flex flex-wrap gap-1 justify-center">
                  {detail.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
                      style={{ background: detail.borderColor }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 開始按鈕 */}
                <div
                  className="mt-4 rounded-2xl py-3 text-center font-black text-white text-sm"
                  style={{
                    background: detail.bg,
                    boxShadow: `0 4px 12px ${detail.borderColor}50`,
                  }}
                >
                  {isSelected ? '載入中... 🚀' : '出發！→'}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 底部提示 */}
      <div className="text-center pb-4 px-4">
        <p className="text-sm font-bold" style={{ color: '#9CA3AF' }}>
          每關 8 題 · 限時 20 秒 · 連對有加分！⚡
        </p>
      </div>
    </div>
  );
}
