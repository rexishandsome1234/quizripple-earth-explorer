// QuizRipple 地球探險家 — 圓形計時器元件
// 設計哲學：彩虹地球儀科普樂園風格

import { GAME_CONFIG } from '@/lib/gameData';

interface TimerRingProps {
  timeLeft: number;
  className?: string;
}

export default function TimerRing({ timeLeft, className = '' }: TimerRingProps) {
  const total = GAME_CONFIG.timePerQuestion;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / total;
  const dashOffset = circumference * (1 - progress);

  // 顏色根據剩餘時間變化
  const getColor = () => {
    if (timeLeft > total * 0.6) return '#4CAF50'; // 綠色
    if (timeLeft > total * 0.3) return '#FFD93D'; // 黃色
    return '#FF5252'; // 紅色
  };

  const isUrgent = timeLeft <= 5;

  return (
    <div
      className={`relative flex items-center justify-center ${className} ${isUrgent ? 'animate-timer-pulse' : ''}`}
      style={{ width: 88, height: 88 }}
    >
      <svg width="88" height="88" viewBox="0 0 88 88" style={{ transform: 'rotate(-90deg)' }}>
        {/* 背景圓 */}
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="8"
        />
        {/* 進度圓 */}
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="timer-ring"
          style={{
            filter: isUrgent ? `drop-shadow(0 0 6px ${getColor()})` : 'none',
          }}
        />
      </svg>
      {/* 數字顯示 */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 900,
          fontSize: isUrgent ? '1.6rem' : '1.4rem',
          color: getColor(),
          textShadow: isUrgent ? `0 0 8px ${getColor()}40` : 'none',
        }}
      >
        {timeLeft}
      </div>
    </div>
  );
}
