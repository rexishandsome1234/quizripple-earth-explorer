// QuizRipple 地球探險家 — 遊戲進行畫面（含音效）
// 設計哲學：彩虹地球儀科普樂園風格
// 限時答題、連擊加分、動物情緒反應、音效反饋

import { useEffect, useRef, useState, useCallback } from 'react';
import { useGame } from '@/contexts/GameContext';
import { CATEGORIES, getComboName, GAME_CONFIG } from '@/lib/gameData';
import AnimalGuide from '@/components/AnimalGuide';
import TimerRing from '@/components/TimerRing';
import StarBurst, { ScoreFloat } from '@/components/StarBurst';
import { useSound } from '@/hooks/useSound';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const OPTION_COLORS = [
  { bg: '#FEF3C7', border: '#F59E0B', hover: '#FDE68A', text: '#92400E' },
  { bg: '#DBEAFE', border: '#3B82F6', hover: '#BFDBFE', text: '#1E3A8A' },
  { bg: '#DCFCE7', border: '#22C55E', hover: '#BBF7D0', text: '#166534' },
  { bg: '#FCE7F3', border: '#EC4899', hover: '#FBCFE8', text: '#831843' },
];

export default function PlayingScreen() {
  const { state, dispatch, selectAnswer, nextQuestion, goToScreen } = useGame();
  const { playSound } = useSound();
  const {
    questions,
    currentQuestionIndex,
    selectedAnswer,
    isAnswerRevealed,
    score,
    combo,
    timeLeft,
    category,
    animalMood,
    lastScoreGained,
  } = state;

  const [showStars, setShowStars] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [questionKey, setQuestionKey] = useState(0);
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevTimeRef = useRef(timeLeft);
  const prevRevealedRef = useRef(isAnswerRevealed);

  const currentQ = questions[currentQuestionIndex];
  const catInfo = CATEGORIES.find((c) => c.id === category);
  const animalType = category === 'earth' ? 'molly' : 'albie';
  const comboName = getComboName(category!, combo);

  // 計時器
  useEffect(() => {
    if (!isAnswerRevealed && state.screen === 'playing') {
      timerRef.current = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAnswerRevealed, currentQuestionIndex, state.screen, dispatch]);

  // 計時音效（最後5秒）
  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0 && !isAnswerRevealed && prevTimeRef.current !== timeLeft) {
      playSound('tick');
    }
    if (timeLeft === 0 && !isAnswerRevealed) {
      playSound('timeout');
    }
    prevTimeRef.current = timeLeft;
  }, [timeLeft, isAnswerRevealed, playSound]);

  // 答題揭曉音效
  useEffect(() => {
    if (isAnswerRevealed && !prevRevealedRef.current) {
      if (lastScoreGained > 0) {
        if (combo >= 3) {
          playSound('combo');
        } else {
          playSound('correct');
        }
        setShowStars(true);
        setShowScore(true);
        setTimeout(() => setShowScore(false), 1200);
      } else {
        playSound('wrong');
      }
    }
    prevRevealedRef.current = isAnswerRevealed;
  }, [isAnswerRevealed, lastScoreGained, combo, playSound]);

  // 換題動畫
  useEffect(() => {
    setQuestionKey((k) => k + 1);
  }, [currentQuestionIndex]);

  const handleOptionClick = useCallback(
    (index: number) => {
      if (isAnswerRevealed) return;
      playSound('click');
      selectAnswer(index);
    },
    [isAnswerRevealed, playSound, selectAnswer]
  );

  const handleNextQuestion = useCallback(() => {
    playSound('whoosh');
    nextQuestion();
  }, [playSound, nextQuestion]);

  if (!currentQ) return null;

  const getOptionStyle = (index: number) => {
    const base = OPTION_COLORS[index % OPTION_COLORS.length];
    if (!isAnswerRevealed) {
      const isHovered = hoveredOption === index;
      const isSelected = selectedAnswer === index;
      return {
        background: isSelected ? base.hover : isHovered ? base.hover + 'AA' : base.bg,
        borderColor: isSelected ? base.border : isHovered ? base.border + '80' : 'transparent',
        color: base.text,
        transform: isHovered && !isSelected ? 'translateY(-3px) scale(1.01)' : 'scale(1)',
      };
    }
    if (index === currentQ.correctIndex) {
      return { background: '#DCFCE7', borderColor: '#22C55E', color: '#166534', transform: 'scale(1)' };
    }
    if (index === selectedAnswer && index !== currentQ.correctIndex) {
      return { background: '#FEE2E2', borderColor: '#EF4444', color: '#991B1B', transform: 'scale(1)' };
    }
    return { background: '#F9FAFB', borderColor: 'transparent', color: '#9CA3AF', transform: 'scale(1)' };
  };

  const getOptionClass = (index: number) => {
    let cls = 'option-card p-4 w-full text-left';
    if (isAnswerRevealed) {
      cls += ' revealed';
      if (index === currentQ.correctIndex) cls += ' correct';
      else if (index === selectedAnswer) cls += ' wrong';
    }
    return cls;
  };

  const bgGradient =
    category === 'earth'
      ? 'linear-gradient(180deg, #FEF3C7 0%, #FFF9F0 100%)'
      : category === 'world'
      ? 'linear-gradient(180deg, #E0F2FE 0%, #F0F9FF 100%)'
      : 'linear-gradient(180deg, #DCFCE7 0%, #F0FFF4 100%)';

  const accentColor =
    category === 'earth' ? '#D97706' : category === 'world' ? '#0284C7' : '#16A34A';

  const progressPercent =
    ((currentQuestionIndex + (isAnswerRevealed ? 1 : 0)) / questions.length) * 100;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: bgGradient, fontFamily: 'Nunito, sans-serif' }}
    >
      {/* 星星特效 */}
      <StarBurst
        active={showStars}
        x={50}
        y={35}
        count={combo >= 3 ? 22 : 12}
        onComplete={() => setShowStars(false)}
      />

      {/* 分數浮動 */}
      {showScore && <ScoreFloat score={lastScoreGained} active={showScore} combo={combo} />}

      {/* 頂部狀態列 */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2 gap-3">
        <button
          className="bg-white rounded-2xl px-3 py-2 shadow-md font-bold text-sm transition-all hover:scale-105 active:scale-95"
          style={{ color: '#6B7280', border: '2px solid #E5E7EB' }}
          onClick={() => {
            playSound('click');
            goToScreen('category');
          }}
        >
          ✕
        </button>

        {/* 進度條 */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-xs font-bold" style={{ color: accentColor }}>
            <span>第 {currentQuestionIndex + 1} 題</span>
            <span>共 {questions.length} 題</span>
          </div>
          <div className="h-3 bg-white/80 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)`,
              }}
            />
          </div>
        </div>

        {/* 分數 */}
        <div
          className="bg-white rounded-2xl px-3 py-2 shadow-md text-center min-w-[70px]"
          style={{ border: `2px solid ${accentColor}` }}
        >
          <p className="text-xs font-bold" style={{ color: '#9CA3AF' }}>分數</p>
          <p className="text-lg font-black" style={{ color: accentColor }}>{score}</p>
        </div>

        {/* 計時器 */}
        <TimerRing timeLeft={timeLeft} />
      </div>

      {/* 連擊標籤 */}
      {combo >= 3 && (
        <div className="flex justify-center px-4 mb-1">
          <div
            key={combo}
            className="combo-badge text-sm"
          >
            {comboName}
          </div>
        </div>
      )}

      {/* 主要內容區 */}
      <div className="flex-1 flex flex-col lg:flex-row gap-3 px-4 pb-4 max-w-4xl mx-auto w-full">

        {/* 動物嚮導（左側/頂部） */}
        <div className="flex lg:flex-col items-center lg:items-center gap-3 lg:w-36 lg:shrink-0 lg:pt-4">
          <AnimalGuide
            animal={animalType}
            mood={animalMood}
            size="xl"
            showBubble={isAnswerRevealed || timeLeft <= 5}
          />
          <div
            className="rounded-2xl px-3 py-2 shadow-md text-center"
            style={{ background: 'white', border: `2px solid ${accentColor}` }}
          >
            <p className="text-xs font-black" style={{ color: accentColor }}>
              {catInfo?.emoji} {catInfo?.name}
            </p>
            <p className="text-xs font-bold mt-0.5" style={{ color: '#9CA3AF' }}>
              🔥 連擊 x{combo}
            </p>
          </div>
        </div>

        {/* 題目與選項 */}
        <div className="flex-1 flex flex-col gap-3">
          {/* 題目卡片 */}
          <div
            key={`q-${questionKey}`}
            className="rounded-3xl p-5 shadow-lg animate-slide-in-right"
            style={{
              background: 'white',
              border: `3px solid ${accentColor}25`,
              boxShadow: `0 8px 24px ${accentColor}15`,
            }}
          >
            <div className="text-4xl text-center mb-3">{currentQ.emoji}</div>
            <p
              className="text-center font-bold leading-relaxed"
              style={{
                color: '#1A3A5C',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)',
                fontWeight: 700,
              }}
            >
              {currentQ.question}
            </p>
          </div>

          {/* 選項按鈕 */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.options.map((option, index) => {
              const style = getOptionStyle(index);
              return (
                <button
                  key={index}
                  className={getOptionClass(index)}
                  style={{
                    background: style.background,
                    borderColor: style.borderColor,
                    borderWidth: '3px',
                    borderStyle: 'solid',
                    color: style.color,
                    transform: style.transform,
                    transition: 'all 0.15s ease',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    padding: '0.8rem 1rem',
                  }}
                  onMouseEnter={() => !isAnswerRevealed && setHoveredOption(index)}
                  onMouseLeave={() => setHoveredOption(null)}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswerRevealed}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                      style={{
                        background: style.borderColor + '25',
                        color: style.borderColor === 'transparent' ? '#9CA3AF' : style.borderColor,
                      }}
                    >
                      {OPTION_LABELS[index]}
                    </span>
                    <span className="flex-1 text-left">{option}</span>
                    {isAnswerRevealed && index === currentQ.correctIndex && (
                      <span className="text-xl shrink-0">✅</span>
                    )}
                    {isAnswerRevealed && index === selectedAnswer && index !== currentQ.correctIndex && (
                      <span className="text-xl shrink-0">❌</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 解說區 */}
          {isAnswerRevealed && (
            <div
              className="rounded-3xl p-4 animate-slide-in-bottom"
              style={{
                background:
                  selectedAnswer === currentQ.correctIndex
                    ? 'linear-gradient(135deg, #DCFCE7, #BBF7D0)'
                    : 'linear-gradient(135deg, #FEE2E2, #FECACA)',
                border: `2px solid ${selectedAnswer === currentQ.correctIndex ? '#22C55E' : '#EF4444'}`,
              }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">
                  {selectedAnswer === currentQ.correctIndex ? '🎉' : '💡'}
                </span>
                <div>
                  <p
                    className="font-black mb-1"
                    style={{
                      color: selectedAnswer === currentQ.correctIndex ? '#166534' : '#991B1B',
                    }}
                  >
                    {selectedAnswer === currentQ.correctIndex
                      ? '答對了！太棒了！⭐'
                      : selectedAnswer === -1
                      ? '時間到了！沒關係！⏰'
                      : '沒關係！學到了！💪'}
                  </p>
                  <p className="text-sm font-bold" style={{ color: '#374151' }}>
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 下一題按鈕 */}
          {isAnswerRevealed && (
            <button
              className="btn-game text-white animate-bounce-in"
              style={{
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}CC)`,
                boxShadow: `0 6px 20px ${accentColor}50`,
              }}
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex + 1 >= questions.length
                ? '🏁 查看結果！'
                : '下一題 →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
