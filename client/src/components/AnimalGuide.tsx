// QuizRipple 地球探險家 — 動物嚮導元件
// 設計哲學：彩虹地球儀科普樂園風格
// 三隻動物夥伴：Molly（地心）、Albie（環球）、Mark（排行榜）

import { useEffect, useState } from 'react';

type AnimalType = 'molly' | 'albie' | 'mark';
type Mood = 'happy' | 'nervous' | 'celebrate' | 'sad' | 'idle';

interface AnimalGuideProps {
  animal: AnimalType;
  mood?: Mood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBubble?: boolean;
  bubbleText?: string;
  className?: string;
}

const ANIMAL_IMAGES = {
  molly: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663571320430/KKUPBKCuj8ZPmqDE9esPhM/molly-mole-nmiiByx8AYSCyZjco8XgNR.webp',
  albie: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663571320430/KKUPBKCuj8ZPmqDE9esPhM/albie-albatross-WNcBmA5ZXpEWEoD2zsn5T7.webp',
  mark: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663571320430/KKUPBKCuj8ZPmqDE9esPhM/mark-meerkat-76mNbNt6h9fxxPxpRnN5k9.webp',
};

const ANIMAL_NAMES = {
  molly: 'Molly 鼴鼠',
  albie: 'Albie 信天翁',
  mark: 'Mark 狐獴',
};

const SIZE_CLASSES = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48',
};

const MOOD_ANIMATIONS: Record<Mood, string> = {
  happy: 'animal-happy',
  celebrate: 'animal-celebrate',
  sad: 'animal-sad',
  nervous: 'animal-nervous',
  idle: '',
};

const MOOD_EMOJIS: Record<Mood, string> = {
  happy: '⭐',
  celebrate: '🎉',
  sad: '😢',
  nervous: '😰',
  idle: '',
};

// 情緒泡泡文字
const DEFAULT_BUBBLE_TEXT: Record<AnimalType, Record<Mood, string>> = {
  molly: {
    happy: '答對了！太厲害！⭐',
    celebrate: '哇！連擊！轟隆隆！🌟',
    sad: '沒關係，再試試！💪',
    nervous: '快快快！時間不多了！😰',
    idle: '跟我一起探索地球吧！⛏️',
  },
  albie: {
    happy: '正確！你真是地理達人！✈️',
    celebrate: '信天翁氣流！咻～🌬️',
    sad: '下次一定可以的！🗺️',
    nervous: '加油！快點選！😅',
    idle: '準備飛越七大洲了嗎？🌍',
  },
  mark: {
    happy: '耶！加分！🎊',
    celebrate: '哇哇哇！超厲害！🥳',
    sad: '繼續努力！🌟',
    nervous: '緊張緊張！😬',
    idle: '我在幫你加油！📣',
  },
};

export default function AnimalGuide({
  animal,
  mood = 'idle',
  size = 'md',
  showBubble = false,
  bubbleText,
  className = '',
}: AnimalGuideProps) {
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (mood !== 'idle') {
      setAnimKey((k) => k + 1);
    }
  }, [mood]);

  const displayText = bubbleText || DEFAULT_BUBBLE_TEXT[animal][mood];

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* 情緒泡泡 */}
      {showBubble && mood !== 'idle' && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-10 animate-bounce-in"
          style={{ minWidth: '140px', maxWidth: '200px' }}
        >
          <div
            className="relative bg-white rounded-2xl px-3 py-2 shadow-lg border-2 border-yellow-300 text-center"
            style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 800, fontSize: '0.8rem' }}
          >
            <span className="text-gray-700 leading-tight block">{displayText}</span>
            {/* 泡泡尾巴 */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
              style={{
                width: 0,
                height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '10px solid #FDE68A',
              }}
            />
          </div>
        </div>
      )}

      {/* 動物圖片 */}
      <div
        key={animKey}
        className={`${SIZE_CLASSES[size]} ${MOOD_ANIMATIONS[mood]} relative`}
        title={ANIMAL_NAMES[animal]}
      >
        <img
          src={ANIMAL_IMAGES[animal]}
          alt={ANIMAL_NAMES[animal]}
          className="w-full h-full object-contain drop-shadow-lg"
          style={{ imageRendering: 'crisp-edges' }}
        />
        {/* 情緒表情疊加 */}
        {mood !== 'idle' && (
          <span
            className="absolute -top-1 -right-1 text-xl animate-bounce-in"
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
          >
            {MOOD_EMOJIS[mood]}
          </span>
        )}
      </div>
    </div>
  );
}

// 狐獴群組（排行榜用）
export function MeerkatCrowd({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-end justify-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="animate-meerkat-wave"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '1s',
          }}
        >
          <img
            src={ANIMAL_IMAGES.mark}
            alt="Mark 狐獴"
            className="w-10 h-10 object-contain"
            style={{ transform: `scale(${0.8 + i * 0.05})` }}
          />
        </div>
      ))}
    </div>
  );
}
