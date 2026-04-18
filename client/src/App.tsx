// QuizRipple 地球探險家 — 主應用程式
// 設計哲學：彩虹地球儀科普樂園風格
// 單頁應用，透過 GameContext 管理畫面切換

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { GameProvider, useGame } from "./contexts/GameContext";
import HomeScreen from "./pages/HomeScreen";
import CategoryScreen from "./pages/CategoryScreen";
import PlayingScreen from "./pages/PlayingScreen";
import ResultScreen from "./pages/ResultScreen";
import LeaderboardScreen from "./pages/LeaderboardScreen";

function GameRouter() {
  const { state } = useGame();

  switch (state.screen) {
    case 'home':
      return <HomeScreen />;
    case 'category':
      return <CategoryScreen />;
    case 'playing':
      return <PlayingScreen />;
    case 'result':
      return <ResultScreen />;
    case 'leaderboard':
      return <LeaderboardScreen />;
    default:
      return <HomeScreen />;
  }
}

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <GameProvider>
          <Toaster />
          <GameRouter />
        </GameProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
