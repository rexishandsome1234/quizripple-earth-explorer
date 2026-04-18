// QuizRipple 地球探險家 — 遊戲結果畫面（含音效）
// 設計哲學：彩虹地球儀科普樂園風格

import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { CATEGORIES, getRankTier } from '@/lib/gameData';
import AnimalGuide from '@/components/AnimalGuide';
import { MeerkatCrowd } from '@/components/AnimalGuide';
import StarBurst from '@/components/StarBurst';
import { useSound } from '@/hooks/useSound';

export default function ResultScreen() {
  const { state, goToScreen, resetGame, addToLeaderboard } = useGame();
  const { playSound } = useSound();
  const { score, correctCount, wrongCount, maxCombo, category, questions } = state;

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [subscribe, setSubscribe] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showStars, setShowStars] = useState(true);

  const catInfo = CATEGORIES.find((c) => c.id === category);
  const accuracy = Math.round((correctCount / questions.length) * 100);

  const sortedScores = [...state.leaderboard.map((e) => e.score), score].sort((a, b) => b - a);
  const rank = sortedScores.indexOf(score) + 1;
  const tier = getRankTier(rank);

  const accentColor =
    category === 'earth' ? '#D97706' : category === 'world' ? '#0284C7' : '#16A34A';

  useEffect(() => {
    if (accuracy >= 80) {
      playSound('levelup');
    } else if (accuracy >= 50) {
      playSound('correct');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('correct');
    const name = childName || parentName || '小探險家';
    addToLeaderboard(name);
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
    }, 2500);
  };

  const handleReplay = () => {
    playSound('whoosh');
    resetGame();
    goToScreen('category');
  };

  const handleLeaderboard = () => {
    playSound('click');
    goToScreen('leaderboard');
  };

  const handleHome = () => {
    playSound('click');
    resetGame();
    goToScreen('home');
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: 'linear-gradient(180deg, #FFF9F0 0%, #E8F4FD 100%)',
        fontFamily: 'Nunito, sans-serif',
      }}
    >
      <StarBurst
        active={showStars}
        x={50}
        y={25}
        count={accuracy >= 80 ? 30 : 15}
        onComplete={() => setShowStars(false)}
      />

      <div className="w-full max-w-lg px-4 py-6">
        {/* 狐獴群鼓掌 */}
        <div className="flex justify-center mb-4 animate-bounce-in">
          <MeerkatCrowd count={accuracy >= 80 ? 7 : 5} />
        </div>

        {/* 結果標題 */}
        <div className="text-center mb-5 animate-slide-in-bottom">
          <div className="text-5xl mb-2">
            {accuracy >= 80 ? '🎉' : accuracy >= 50 ? '👍' : '💪'}
          </div>
          <h2
            className="font-black mb-1"
            style={{ fontWeight: 900, fontSize: '2rem', color: '#1A3A5C' }}
          >
            {accuracy >= 80 ? '太厲害了！' : accuracy >= 50 ? '做得很好！' : '繼續加油！'}
          </h2>
          <p className="font-bold" style={{ color: '#4A7C9E' }}>
            {catInfo?.emoji} {catInfo?.name} 完成！
          </p>
        </div>

        {/* 獎勵等級卡 */}
        <div
          className="rounded-3xl p-5 mb-5 text-center shadow-xl animate-fade-in-scale"
          style={{
            background: tier.bgColor,
            border: `4px solid ${tier.color}`,
            boxShadow: `0 8px 32px ${tier.color}40`,
          }}
        >
          <p
            className="text-2xl font-black mb-1"
            style={{ color: tier.color }}
          >
            {tier.name}
          </p>
          <p className="text-sm font-bold" style={{ color: '#6B7280' }}>
            🏆 排行榜第 {rank} 名
          </p>
        </div>

        {/* 成績統計 */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: '總分', value: score, icon: '⭐', color: '#F59E0B' },
            { label: '答對', value: `${correctCount}/${questions.length}`, icon: '✅', color: '#22C55E' },
            { label: '正確率', value: `${accuracy}%`, icon: '🎯', color: accentColor },
            { label: '最高連擊', value: `x${maxCombo}`, icon: '🔥', color: '#EF4444' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-3xl p-4 text-center shadow-md animate-bounce-in"
              style={{
                background: 'white',
                border: `2px solid ${stat.color}30`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <p className="text-xs font-bold" style={{ color: '#9CA3AF' }}>{stat.label}</p>
              <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 動物嚮導慶祝 */}
        <div className="flex justify-center gap-8 mb-5">
          <AnimalGuide
            animal="molly"
            mood="celebrate"
            size="md"
            showBubble
            bubbleText="你太棒了！🌟"
          />
          <AnimalGuide
            animal="albie"
            mood="celebrate"
            size="md"
            showBubble
            bubbleText="繼續探索！✈️"
          />
        </div>

        {/* 貼紙護照收集按鈕 */}
        {!showForm && !submitted && (
          <button
            className="btn-game w-full text-white mb-3 animate-bounce-in"
            style={{
              background: 'linear-gradient(135deg, #FF8C00, #FFD700)',
              boxShadow: '0 6px 20px rgba(255,140,0,0.4)',
            }}
            onClick={() => {
              playSound('click');
              setShowForm(true);
            }}
          >
            🎁 領取動物貼紙護照！
          </button>
        )}

        {/* 貼紙護照表單 */}
        {showForm && !submitted && (
          <div
            className="rounded-3xl p-5 mb-4 shadow-xl animate-slide-in-bottom"
            style={{ background: 'white', border: '3px solid #FFD93D' }}
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🎁</div>
              <h3 className="font-black text-lg mb-2" style={{ color: '#1A3A5C' }}>
                寄送專屬動物貼紙護照！
              </h3>
              <p className="text-sm font-bold" style={{ color: '#4A7C9E' }}>
                你太棒了！Molly 和 Albie 想把你的「地球探險證書」和可愛動物貼紙寄給你，請爸媽幫忙填寫信箱喔！
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-sm font-black mb-1" style={{ color: '#374151' }}>
                  👦 小探險家的名字
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="例如：小明"
                  className="w-full rounded-2xl px-4 py-3 font-bold text-sm outline-none transition-all"
                  style={{ border: '2px solid #E5E7EB', background: '#F9FAFB' }}
                  onFocus={(e) => (e.target.style.borderColor = '#FFD93D')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-black mb-1" style={{ color: '#374151' }}>
                  📧 爸媽的電子信箱
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full rounded-2xl px-4 py-3 font-bold text-sm outline-none transition-all"
                  style={{ border: '2px solid #E5E7EB', background: '#F9FAFB' }}
                  onFocus={(e) => (e.target.style.borderColor = '#FFD93D')}
                  onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
                  required
                />
              </div>

              <label
                className="flex items-start gap-3 rounded-2xl p-3 cursor-pointer transition-all"
                style={{
                  background: subscribe ? '#FEF3C7' : '#F9FAFB',
                  border: `2px solid ${subscribe ? '#F59E0B' : '#E5E7EB'}`,
                }}
              >
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded"
                  style={{ accentColor: '#F59E0B' }}
                />
                <span className="text-sm font-bold" style={{ color: '#374151' }}>
                  🦔 我想要聽更多鼴鼠說的地球秘密！（訂閱電子報）
                </span>
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="btn-game flex-1 text-sm"
                  style={{
                    background: 'white',
                    color: '#9CA3AF',
                    border: '2px solid #E5E7EB',
                  }}
                  onClick={() => setShowForm(false)}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn-game flex-1 text-white text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #FF8C00, #FFD700)',
                  }}
                >
                  🚀 送出！
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 提交成功 */}
        {submitted && (
          <div
            className="rounded-3xl p-5 mb-4 text-center animate-bounce-in"
            style={{ background: 'linear-gradient(135deg, #DCFCE7, #BBF7D0)', border: '3px solid #22C55E' }}
          >
            <div className="text-4xl mb-2">🎉</div>
            <p className="font-black text-lg" style={{ color: '#166534' }}>
              太棒了！護照寄出去了！
            </p>
            <p className="text-sm font-bold mt-1" style={{ color: '#4A7C9E' }}>
              Molly 和 Albie 很快就會把貼紙送到你家！
            </p>
          </div>
        )}

        {/* 操作按鈕 */}
        <div className="flex flex-col gap-3">
          <button
            className="btn-game text-white"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
              boxShadow: `0 6px 20px ${accentColor}50`,
            }}
            onClick={handleReplay}
          >
            🔄 再玩一次！
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              className="btn-game text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #4ECDC4, #2980B9)' }}
              onClick={handleLeaderboard}
            >
              🏆 排行榜
            </button>
            <button
              className="btn-game text-sm"
              style={{ background: 'white', color: '#4A7C9E', border: '2px solid #BAE6FD' }}
              onClick={handleHome}
            >
              🏠 回首頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
