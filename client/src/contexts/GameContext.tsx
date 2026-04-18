// QuizRipple 地球探險家 — 遊戲狀態管理
// 設計哲學：彩虹地球儀科普樂園風格

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import {
  Category,
  Question,
  GAME_CONFIG,
  calculateScore,
  getQuestionsByCategory,
  shuffleQuestions,
} from '@/lib/gameData';

export type GameScreen =
  | 'home'
  | 'category'
  | 'playing'
  | 'result'
  | 'leaderboard'
  | 'certificate';

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  category: Category;
  combo: number;
  date: string;
}

export interface GameState {
  screen: GameScreen;
  category: Category | null;
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  isAnswerRevealed: boolean;
  score: number;
  combo: number;
  maxCombo: number;
  timeLeft: number;
  correctCount: number;
  wrongCount: number;
  playerName: string;
  leaderboard: LeaderboardEntry[];
  lastScoreGained: number;
  animalMood: 'happy' | 'nervous' | 'celebrate' | 'sad' | 'idle';
}

type GameAction =
  | { type: 'SET_SCREEN'; screen: GameScreen }
  | { type: 'SELECT_CATEGORY'; category: Category }
  | { type: 'START_GAME' }
  | { type: 'SELECT_ANSWER'; index: number }
  | { type: 'REVEAL_ANSWER' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'TICK_TIMER' }
  | { type: 'TIME_UP' }
  | { type: 'SET_PLAYER_NAME'; name: string }
  | { type: 'ADD_TO_LEADERBOARD'; entry: LeaderboardEntry }
  | { type: 'SET_ANIMAL_MOOD'; mood: GameState['animalMood'] }
  | { type: 'RESET_GAME' };

const initialState: GameState = {
  screen: 'home',
  category: null,
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswer: null,
  isAnswerRevealed: false,
  score: 0,
  combo: 0,
  maxCombo: 0,
  timeLeft: GAME_CONFIG.timePerQuestion,
  correctCount: 0,
  wrongCount: 0,
  playerName: '',
  leaderboard: [
    { id: '1', name: '小明探險家', score: 2450, category: 'earth', combo: 6, date: '2024-04-10' },
    { id: '2', name: '地球小博士', score: 2200, category: 'world', combo: 5, date: '2024-04-11' },
    { id: '3', name: '動物小達人', score: 1980, category: 'animals', combo: 4, date: '2024-04-12' },
    { id: '4', name: '鑽石探險家', score: 1750, category: 'earth', combo: 3, date: '2024-04-13' },
    { id: '5', name: '超級地理王', score: 1600, category: 'world', combo: 4, date: '2024-04-14' },
    { id: '6', name: '森林小冒險', score: 1420, category: 'animals', combo: 2, date: '2024-04-15' },
    { id: '7', name: '地心小英雄', score: 1280, category: 'earth', combo: 3, date: '2024-04-16' },
    { id: '8', name: '環球小旅人', score: 1100, category: 'world', combo: 2, date: '2024-04-17' },
  ],
  lastScoreGained: 0,
  animalMood: 'idle',
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.screen };

    case 'SELECT_CATEGORY':
      return { ...state, category: action.category };

    case 'START_GAME': {
      if (!state.category) return state;
      const allQuestions = getQuestionsByCategory(state.category);
      const shuffled = shuffleQuestions(allQuestions).slice(0, GAME_CONFIG.questionsPerRound);
      return {
        ...state,
        screen: 'playing',
        questions: shuffled,
        currentQuestionIndex: 0,
        selectedAnswer: null,
        isAnswerRevealed: false,
        score: 0,
        combo: 0,
        maxCombo: 0,
        timeLeft: GAME_CONFIG.timePerQuestion,
        correctCount: 0,
        wrongCount: 0,
        lastScoreGained: 0,
        animalMood: 'idle',
      };
    }

    case 'SELECT_ANSWER':
      if (state.isAnswerRevealed || state.selectedAnswer !== null) return state;
      return { ...state, selectedAnswer: action.index };

    case 'REVEAL_ANSWER': {
      if (state.selectedAnswer === null || state.isAnswerRevealed) return state;
      const currentQ = state.questions[state.currentQuestionIndex];
      const isCorrect = state.selectedAnswer === currentQ.correctIndex;
      const newCombo = isCorrect ? state.combo + 1 : 0;
      const gained = calculateScore(isCorrect, state.timeLeft, newCombo - 1, state.category!);
      return {
        ...state,
        isAnswerRevealed: true,
        score: state.score + gained,
        combo: newCombo,
        maxCombo: Math.max(state.maxCombo, newCombo),
        correctCount: isCorrect ? state.correctCount + 1 : state.correctCount,
        wrongCount: !isCorrect ? state.wrongCount + 1 : state.wrongCount,
        lastScoreGained: gained,
        animalMood: isCorrect ? (newCombo >= 3 ? 'celebrate' : 'happy') : 'sad',
      };
    }

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex >= state.questions.length) {
        return { ...state, screen: 'result', animalMood: 'celebrate' };
      }
      return {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        isAnswerRevealed: false,
        timeLeft: GAME_CONFIG.timePerQuestion,
        lastScoreGained: 0,
        animalMood: 'idle',
      };
    }

    case 'TICK_TIMER': {
      if (state.isAnswerRevealed || state.screen !== 'playing') return state;
      const newTime = state.timeLeft - 1;
      const mood = newTime <= 5 ? 'nervous' : state.animalMood === 'nervous' ? 'nervous' : 'idle';
      if (newTime <= 0) {
        // Time up — auto-reveal with no answer
        const currentQ = state.questions[state.currentQuestionIndex];
        return {
          ...state,
          timeLeft: 0,
          selectedAnswer: -1, // -1 means timed out
          isAnswerRevealed: true,
          combo: 0,
          wrongCount: state.wrongCount + 1,
          lastScoreGained: 0,
          animalMood: 'sad',
        };
      }
      return { ...state, timeLeft: newTime, animalMood: mood };
    }

    case 'SET_PLAYER_NAME':
      return { ...state, playerName: action.name };

    case 'ADD_TO_LEADERBOARD': {
      const newBoard = [...state.leaderboard, action.entry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);
      return { ...state, leaderboard: newBoard };
    }

    case 'SET_ANIMAL_MOOD':
      return { ...state, animalMood: action.mood };

    case 'RESET_GAME':
      return {
        ...initialState,
        leaderboard: state.leaderboard,
        playerName: state.playerName,
      };

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  selectCategory: (category: Category) => void;
  startGame: () => void;
  selectAnswer: (index: number) => void;
  nextQuestion: () => void;
  goToScreen: (screen: GameScreen) => void;
  resetGame: () => void;
  addToLeaderboard: (name: string) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const selectCategory = useCallback((category: Category) => {
    dispatch({ type: 'SELECT_CATEGORY', category });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const selectAnswer = useCallback((index: number) => {
    dispatch({ type: 'SELECT_ANSWER', index });
    setTimeout(() => dispatch({ type: 'REVEAL_ANSWER' }), 100);
  }, []);

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' });
  }, []);

  const goToScreen = useCallback((screen: GameScreen) => {
    dispatch({ type: 'SET_SCREEN', screen });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const addToLeaderboard = useCallback(
    (name: string) => {
      if (!state.category) return;
      const entry: LeaderboardEntry = {
        id: Date.now().toString(),
        name,
        score: state.score,
        category: state.category,
        combo: state.maxCombo,
        date: new Date().toISOString().split('T')[0],
      };
      dispatch({ type: 'ADD_TO_LEADERBOARD', entry });
      dispatch({ type: 'SET_PLAYER_NAME', name });
    },
    [state.category, state.score, state.maxCombo]
  );

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        selectCategory,
        startGame,
        selectAnswer,
        nextQuestion,
        goToScreen,
        resetGame,
        addToLeaderboard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
