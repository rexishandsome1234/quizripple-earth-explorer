// QuizRipple 地球探險家 — 排行榜畫面（含音效）
// 設計哲學：彩虹地球儀科普樂園風格

import { useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { CATEGORIES, getRankTier } from '@/lib/gameData';
import { MeerkatCrowd } from '@/components/AnimalGuide';
import { useSound } from '@/hooks/useSound';

const CATEGORY_LABELS: Record<string, string> = {
  earth: '⛏️ 地心',
  world: '✈️ 環球',
  animals: '🦁 動物',
};

export default function LeaderboardScreen() {
  const { state, goToScreen, resetGame } = useGame();
  const { playSound } = useSound();
  const { leaderboard } = state;

  const sortedBoard = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 10);

  useEffect(() => {
    playSound('levelup');
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #1A3A5C 0%, #0F2A45 50%, #0A1F35 100%)',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      {/* 頂部導航 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          className="flex items-center gap-2 rounded-2xl px-4 py-2 shadow-md font-bold text-sm transition-all hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(255,255,255,0.15)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
          }}
          onClick={() => {
            playSound('click');
            goToScreen('home');
          }}
        >
          ← 回首頁
        </button>
        <div
          className="rounded-2xl px-4 py-2"
          style={{ background: 'rgba(255,215,0,0.2)', border: '2px solid #FFD700' }}
        >
          <p className="text-sm font-black" style={{ color: '#FFD700' }}>
            🏆 排行榜
          </p>
        </div>
      </div>

      {/* 標題 */}
      <div className="text-center px-4 py-4 animate-slide-in-bottom">
        <h2
          className="font-black mb-2"
          style={{
            fontWeight: 900,
            fontSize: 'clamp(1.8rem, 6vw, 3rem)',
            color: '#FFD700',
            textShadow: '0 0 20px rgba(255,215,0,0.4)',
          }}
        >
          🏆 探險家名人堂
        </h2>

        {/* 狐獴群鼓掌 */}
        <div className="flex justify-center my-4 animate-bounce-in">
          <MeerkatCrowd count={7} />
        </div>

        <p className="font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Mark 和夥伴們在幫你鼓掌！📣
        </p>
      </div>

      {/* 前三名特別展示 */}
      {sortedBoard.length >= 3 && (
        <div className="flex items-end justify-center gap-3 px-4 mb-4">
          {/* 第 2 名 */}
          <div className="flex flex-col items-center animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <div
              className="rounded-2xl px-3 py-3 text-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #C0C0C0, #A8A8A8)',
                minWidth: '90px',
                border: '3px solid #D4D4D4',
              }}
            >
              <div className="text-2xl mb-1">🥈</div>
              <p className="text-xs font-black text-white truncate max-w-[80px]">
                {sortedBoard[1]?.name}
              </p>
              <p className="text-sm font-black text-white">{sortedBoard[1]?.score}</p>
            </div>
            <div
              className="w-full h-14 rounded-b-2xl flex items-center justify-center"
              style={{ background: 'rgba(192,192,192,0.25)', border: '2px solid rgba(192,192,192,0.4)' }}
            >
              <span className="text-xl font-black text-white">2</span>
            </div>
          </div>

          {/* 第 1 名 */}
          <div className="flex flex-col items-center animate-bounce-in" style={{ animationDelay: '0.1s' }}>
            <div
              className="rounded-2xl px-4 py-4 text-center shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                minWidth: '100px',
                border: '3px solid #FFE44D',
                boxShadow: '0 0 24px rgba(255,215,0,0.5)',
              }}
            >
              <div className="text-3xl mb-1">👑</div>
              <p className="text-xs font-black text-white truncate max-w-[90px]">
                {sortedBoard[0]?.name}
              </p>
              <p className="text-lg font-black text-white">{sortedBoard[0]?.score}</p>
            </div>
            <div
              className="w-full h-20 rounded-b-2xl flex items-center justify-center"
              style={{ background: 'rgba(255,215,0,0.25)', border: '2px solid rgba(255,215,0,0.4)' }}
            >
              <span className="text-2xl font-black text-yellow-300">1</span>
            </div>
          </div>

          {/* 第 3 名 */}
          <div className="flex flex-col items-center animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            <div
              className="rounded-2xl px-3 py-3 text-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #CD7F32, #A0522D)',
                minWidth: '90px',
                border: '3px solid #D4956A',
              }}
            >
              <div className="text-2xl mb-1">🥉</div>
              <p className="text-xs font-black text-white truncate max-w-[80px]">
                {sortedBoard[2]?.name}
              </p>
              <p className="text-sm font-black text-white">{sortedBoard[2]?.score}</p>
            </div>
            <div
              className="w-full h-10 rounded-b-2xl flex items-center justify-center"
              style={{ background: 'rgba(205,127,50,0.25)', border: '2px solid rgba(205,127,50,0.4)' }}
            >
              <span className="text-xl font-black" style={{ color: '#CD7F32' }}>3</span>
            </div>
          </div>
        </div>
      )}

      {/* 完整排行榜 */}
      <div className="flex-1 px-4 pb-6 max-w-lg mx-auto w-full">
        <div
          className="rounded-3xl overflow-hidden shadow-xl"
          style={{ background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.12)' }}
        >
          {sortedBoard.map((entry, idx) => {
            const tier = getRankTier(idx + 1);
            const isTop3 = idx < 3;

            return (
              <div
                key={entry.id}
                className="leaderboard-row flex items-center gap-3 px-4 py-3 animate-slide-in-bottom"
                style={{
                  borderBottom: idx < sortedBoard.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  background: isTop3 ? 'rgba(255,215,0,0.06)' : 'transparent',
                  animationDelay: `${idx * 0.06}s`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0"
                  style={{
                    background: isTop3 ? tier.color : 'rgba(255,255,255,0.12)',
                    color: isTop3 ? (idx === 0 ? '#1A3A5C' : 'white') : 'rgba(255,255,255,0.6)',
                  }}
                >
                  {idx === 0 ? '👑' : idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-black text-white truncate">{entry.name}</p>
                  <p className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {CATEGORY_LABELS[entry.category]} · 最高連擊 x{entry.combo}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-black text-lg" style={{ color: tier.color }}>
                    {entry.score}
                  </p>
                  <p className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {entry.date}
                  </p>
                </div>
              </div>
            );
          })}

          {sortedBoard.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-4xl mb-3">🌍</p>
              <p className="font-bold" style={{ color: 'rgba(255,255,255,0.55)' }}>
                還沒有探險家！快去挑戰吧！
              </p>
            </div>
          )}
        </div>

        {/* 獎勵等級說明 */}
        <div
          className="rounded-3xl p-4 mt-4"
          style={{ background: 'rgba(255,255,255,0.07)', border: '2px solid rgba(255,255,255,0.12)' }}
        >
          <p className="text-xs font-black mb-3 text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
            🏅 獎勵等級說明
          </p>
          <div className="flex flex-col gap-2">
            {[
              { icon: '💎', name: '鑽石地核探險家', desc: '第 1 名', color: '#00D4FF' },
              { icon: '🥇', name: '黃金地函守護者', desc: '第 2-5 名', color: '#FFD700' },
              { icon: '🥈', name: '白銀地殼漫遊者', desc: '第 6-10 名', color: '#C0C0C0' },
              { icon: '🌱', name: '地球新探險家', desc: '第 11 名以後', color: '#6BBF59' },
            ].map((t) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="text-xl">{t.icon}</span>
                <span className="text-sm font-black flex-1" style={{ color: t.color }}>{t.name}</span>
                <span className="text-xs font-bold" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {t.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 按鈕 */}
        <div className="flex flex-col gap-3 mt-4">
          <button
            className="btn-game text-white"
            style={{
              background: 'linear-gradient(135deg, #FF8C00, #FFD700)',
              boxShadow: '0 6px 20px rgba(255,140,0,0.4)',
            }}
            onClick={() => {
              playSound('whoosh');
              resetGame();
              goToScreen('category');
            }}
          >
            🚀 開始挑戰！
          </button>
          <button
            className="btn-game"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.25)',
            }}
            onClick={() => {
              playSound('click');
              goToScreen('home');
            }}
          >
            🏠 回首頁
          </button>
        </div>
      </div>
    </div>
  );
}
