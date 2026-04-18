// QuizRipple 地球探險家 — 星星爆炸特效元件
// 設計哲學：彩虹地球儀科普樂園風格

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  color: string;
  emoji: string;
}

const STAR_COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
const STAR_EMOJIS = ['⭐', '✨', '🌟', '💫', '⚡'];

interface StarBurstProps {
  active: boolean;
  x?: number;
  y?: number;
  count?: number;
  onComplete?: () => void;
}

export default function StarBurst({
  active,
  x = 50,
  y = 50,
  count = 12,
  onComplete,
}: StarBurstProps) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    if (!active) {
      setStars([]);
      return;
    }

    const newStars: Star[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x,
      y,
      angle: (i / count) * 360,
      speed: 60 + Math.random() * 80,
      size: 16 + Math.random() * 16,
      color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      emoji: STAR_EMOJIS[Math.floor(Math.random() * STAR_EMOJIS.length)],
    }));

    setStars(newStars);

    const timer = setTimeout(() => {
      setStars([]);
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timer);
  }, [active, x, y, count, onComplete]);

  if (!stars.length) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {stars.map((star) => {
        const rad = (star.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * star.speed;
        const ty = Math.sin(rad) * star.speed;

        return (
          <div
            key={star.id}
            className="absolute"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: star.size,
              animation: `starBurst 1s ease-out forwards`,
              '--tx': `${tx}px`,
              '--ty': `${ty}px`,
            } as React.CSSProperties}
          >
            {star.emoji}
          </div>
        );
      })}
      <style>{`
        @keyframes starBurst {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// 分數浮動顯示
interface ScoreFloatProps {
  score: number;
  active: boolean;
  combo?: number;
}

export function ScoreFloat({ score, active, combo = 0 }: ScoreFloatProps) {
  if (!active || score <= 0) return null;

  return (
    <div
      className="fixed top-1/3 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-score-float"
      style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 900 }}
    >
      <div
        className="text-4xl"
        style={{
          color: combo >= 3 ? '#FFD700' : '#4CAF50',
          textShadow: '2px 2px 0 rgba(0,0,0,0.2)',
          filter: combo >= 3 ? 'drop-shadow(0 0 8px #FFD700)' : 'none',
        }}
      >
        +{score}
        {combo >= 3 && <span className="text-2xl ml-2">🔥</span>}
      </div>
    </div>
  );
}
