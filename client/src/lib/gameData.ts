// QuizRipple 地球探險家 — 題庫資料與遊戲設定
// 設計哲學：彩虹地球儀科普樂園風格，高飽和度、圓潤、兒童友善

export type Category = 'earth' | 'world' | 'animals';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  category: Category;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  emoji: string;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  subtitle: string;
  emoji: string;
  guide: 'molly' | 'albie' | 'both';
  bgGradient: string;
  accentColor: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'earth',
    name: '地心大冒險',
    subtitle: '跟著 Molly 鑽進地球！',
    emoji: '⛏️',
    guide: 'molly',
    bgGradient: 'from-amber-400 to-orange-500',
    accentColor: '#D4873C',
    description: '地球結構知識',
  },
  {
    id: 'world',
    name: '飛越七大洲',
    subtitle: '跟著 Albie 環遊世界！',
    emoji: '✈️',
    guide: 'albie',
    bgGradient: 'from-sky-400 to-blue-600',
    accentColor: '#1A6B9A',
    description: '國家與文化知識',
  },
  {
    id: 'animals',
    name: '動物冷知識',
    subtitle: '發現地球上的神奇動物！',
    emoji: '🦁',
    guide: 'both',
    bgGradient: 'from-emerald-400 to-green-600',
    accentColor: '#1A7A4A',
    description: '動物棲息地知識',
  },
];

export const QUESTIONS: Question[] = [
  // ===== 地球結構 =====
  {
    id: 'e1',
    category: 'earth',
    question: 'Molly 鑽得太深了！這裡好熱好熱，而且都是融化的金屬，這是哪裡呢？🔥',
    options: ['地殼 🍪（像餅乾皮）', '地函 🧈（像熱奶油）', '地核 🔴（像超級燙的球心）'],
    correctIndex: 2,
    explanation: '地核是地球最深的地方，溫度超過 5000°C，裡面有融化的鐵和鎳！',
    emoji: '🌋',
  },
  {
    id: 'e2',
    category: 'earth',
    question: 'Molly 說：「我們住的地方叫做什麼？就是地球最外面那一層！」🏠',
    options: ['地核', '地函', '地殼'],
    correctIndex: 2,
    explanation: '地殼是地球最外面的一層，我們住的地方就在地殼上面！',
    emoji: '🏔️',
  },
  {
    id: 'e3',
    category: 'earth',
    question: '轟隆隆！Molly 說這是地球在打噴嚏！地震是因為哪一層在移動？🌊',
    options: ['地核在旋轉', '地殼板塊在移動', '地函太熱了'],
    correctIndex: 1,
    explanation: '地球的地殼分成很多塊「板塊」，板塊移動時就會造成地震！',
    emoji: '🌍',
  },
  {
    id: 'e4',
    category: 'earth',
    question: 'Molly 說地函就像熱奶油一樣，會慢慢流動！地函大約有多厚？🧈',
    options: ['約 30 公里', '約 2900 公里', '約 100 公里'],
    correctIndex: 1,
    explanation: '地函厚度約 2900 公里，是地球最厚的一層，佔地球體積的 84%！',
    emoji: '📏',
  },
  {
    id: 'e5',
    category: 'earth',
    question: '咻～火山噴出來的岩漿是從哪裡來的？🌋',
    options: ['從地殼裂縫冒出來', '從地函的熔岩流出來', '從地核飛出來'],
    correctIndex: 1,
    explanation: '岩漿主要來自地函！地函的岩石在高溫高壓下融化，從火山口噴出來！',
    emoji: '🔥',
  },
  {
    id: 'e6',
    category: 'earth',
    question: 'Molly 的礦工帽燈光照到了鑽石！鑽石在地球哪裡形成的？💎',
    options: ['地殼表面', '地函深處的高壓環境', '海洋底部'],
    correctIndex: 1,
    explanation: '鑽石在地函深處，超高溫和超高壓的環境下形成，再透過火山帶到地表！',
    emoji: '💎',
  },
  {
    id: 'e7',
    category: 'earth',
    question: '地球的地殼分成兩種，海洋下面的叫什麼？🌊',
    options: ['陸地地殼', '海洋地殼', '水底地殼'],
    correctIndex: 1,
    explanation: '地殼分為「陸地地殼」和「海洋地殼」，海洋地殼比較薄，只有 5-10 公里！',
    emoji: '🌊',
  },
  {
    id: 'e8',
    category: 'earth',
    question: 'Molly 說地球有一個超強的磁場保護我們！磁場是哪裡產生的？🧲',
    options: ['地殼裡的岩石', '地核裡的液態鐵', '大氣層'],
    correctIndex: 1,
    explanation: '地球的磁場是由地核中流動的液態鐵產生的，保護我們不被太陽風傷害！',
    emoji: '🧲',
  },

  // ===== 國家與文化 =====
  {
    id: 'w1',
    category: 'world',
    question: 'Albie 飛到了一個袋鼠拳擊很厲害的國家！請問這是哪裡？🦘',
    options: ['肯亞 🌍', '澳大利亞 🦘', '加拿大 🍁'],
    correctIndex: 1,
    explanation: '澳大利亞是袋鼠的故鄉！這裡的袋鼠數量比人還多，大約有 5000 萬隻！',
    emoji: '🦘',
  },
  {
    id: 'w2',
    category: 'world',
    question: 'Albie 的地圖上有一個國家的國旗是楓葉！這是哪個國家？🍁',
    options: ['美國', '加拿大', '英國'],
    correctIndex: 1,
    explanation: '加拿大的國旗中間有一片紅色楓葉，楓葉是加拿大的象徵！',
    emoji: '🍁',
  },
  {
    id: 'w3',
    category: 'world',
    question: '咻～Albie 飛到了世界上人口最多的國家！請問是哪裡？👥',
    options: ['印度', '中國', '美國'],
    correctIndex: 0,
    explanation: '印度現在是世界上人口最多的國家，超過 14 億人！',
    emoji: '🇮🇳',
  },
  {
    id: 'w4',
    category: 'world',
    question: 'Albie 飛到了金字塔旁邊！金字塔在哪個國家？🏛️',
    options: ['沙烏地阿拉伯', '埃及', '伊拉克'],
    correctIndex: 1,
    explanation: '金字塔在埃及！最著名的是吉薩大金字塔，已經有 4500 年歷史了！',
    emoji: '🏛️',
  },
  {
    id: 'w5',
    category: 'world',
    question: '哇！Albie 看到了世界上最長的河流！這條河在哪個洲？🌊',
    options: ['亞洲', '非洲', '南美洲'],
    correctIndex: 1,
    explanation: '尼羅河是世界上最長的河流，流經非洲，全長約 6650 公里！',
    emoji: '🌊',
  },
  {
    id: 'w6',
    category: 'world',
    question: 'Albie 飛到了一個到處都是鬱金香花田的國家！這是哪裡？🌷',
    options: ['法國', '荷蘭', '比利時'],
    correctIndex: 1,
    explanation: '荷蘭以鬱金香聞名全世界！每年春天，荷蘭的花田五顏六色，超美的！',
    emoji: '🌷',
  },
  {
    id: 'w7',
    category: 'world',
    question: '碰！Albie 降落在世界上面積最大的國家！這是哪裡？🗺️',
    options: ['中國', '美國', '俄羅斯'],
    correctIndex: 2,
    explanation: '俄羅斯是世界上面積最大的國家，橫跨歐洲和亞洲，面積超過 1700 萬平方公里！',
    emoji: '🗺️',
  },
  {
    id: 'w8',
    category: 'world',
    question: 'Albie 在地圖上找到了世界上最小的國家！這是哪裡？🏙️',
    options: ['摩納哥', '梵蒂岡', '聖馬利諾'],
    correctIndex: 1,
    explanation: '梵蒂岡是世界上最小的國家，面積只有 0.44 平方公里，在義大利首都羅馬裡面！',
    emoji: '🏙️',
  },

  // ===== 動物冷知識 =====
  {
    id: 'a1',
    category: 'animals',
    question: '哪種動物可以在沙漠中好幾天不喝水，靠背上的東西生存？🐪',
    options: ['駱駝 🐪', '大象 🐘', '犀牛 🦏'],
    correctIndex: 0,
    explanation: '駱駝的駝峰裡儲存的是脂肪，可以轉化成水分！駱駝可以一次喝下 100 公升的水！',
    emoji: '🐪',
  },
  {
    id: 'a2',
    category: 'animals',
    question: '企鵝住在哪裡？牠們喜歡超冷的地方！🐧',
    options: ['北極', '南極', '格陵蘭'],
    correctIndex: 1,
    explanation: '大多數企鵝住在南極！南極是地球上最冷的地方，企鵝有厚厚的羽毛保暖！',
    emoji: '🐧',
  },
  {
    id: 'a3',
    category: 'animals',
    question: '哪種動物是世界上跑得最快的陸地動物？咻～💨',
    options: ['獅子 🦁', '獵豹 🐆', '馬 🐴'],
    correctIndex: 1,
    explanation: '獵豹是世界上跑得最快的陸地動物，最快可以達到每小時 120 公里！',
    emoji: '🐆',
  },
  {
    id: 'a4',
    category: 'animals',
    question: '哪種動物住在竹子林裡，只吃竹子？🎋',
    options: ['無尾熊 🐨', '大熊貓 🐼', '浣熊 🦝'],
    correctIndex: 1,
    explanation: '大熊貓住在中國的竹子林裡，每天要吃 12-38 公斤的竹子！',
    emoji: '🐼',
  },
  {
    id: 'a5',
    category: 'animals',
    question: '世界上最大的動物住在哪裡？牠比任何恐龍都還要大！🐋',
    options: ['深海裡', '北極冰原', '熱帶雨林'],
    correctIndex: 0,
    explanation: '藍鯨是世界上最大的動物，住在深海裡！牠的體長可達 30 公尺，比三輛公車還長！',
    emoji: '🐋',
  },
  {
    id: 'a6',
    category: 'animals',
    question: '哪種動物可以改變顏色，偽裝成周圍的環境？🦎',
    options: ['變色龍 🦎', '壁虎 🦎', '蜥蜴 🦎'],
    correctIndex: 0,
    explanation: '變色龍可以改變皮膚顏色！不過牠們改變顏色主要是表達情緒，不只是偽裝喔！',
    emoji: '🦎',
  },
  {
    id: 'a7',
    category: 'animals',
    question: '哪種動物的鼻子超長，可以用來噴水洗澡？🐘',
    options: ['犀牛', '大象', '河馬'],
    correctIndex: 1,
    explanation: '大象的鼻子可以長達 2 公尺，能吸水、搬東西、聞氣味，是超強的多功能工具！',
    emoji: '🐘',
  },
  {
    id: 'a8',
    category: 'animals',
    question: '哪種動物住在澳大利亞，寶寶出生後要在媽媽的育兒袋裡住很久？🦘',
    options: ['無尾熊 🐨', '袋鼠 🦘', '兩種都是！'],
    correctIndex: 2,
    explanation: '無尾熊和袋鼠都是有袋類動物，寶寶出生時很小，要在媽媽的育兒袋裡繼續長大！',
    emoji: '🦘',
  },
];

// 遊戲設定
export const GAME_CONFIG = {
  questionsPerRound: 8,
  timePerQuestion: 20, // 秒
  baseScore: 100,
  timeBonus: 5, // 每剩餘1秒加分
  comboMultipliers: [1, 1, 1, 1.5, 2, 2.5, 3], // 連擊倍率
  comboThreshold: 3, // 幾題連對才算連擊
};

// 排行榜獎勵等級
export const RANK_TIERS = [
  { rank: 1, name: '💎 鑽石地核探險家', color: '#00D4FF', bgColor: '#E8F9FF' },
  { rank: 2, name: '🥇 黃金地函守護者', color: '#FFD700', bgColor: '#FFFBE6' },
  { rank: 3, name: '🥇 黃金地函守護者', color: '#FFD700', bgColor: '#FFFBE6' },
  { rank: 4, name: '🥇 黃金地函守護者', color: '#FFD700', bgColor: '#FFFBE6' },
  { rank: 5, name: '🥇 黃金地函守護者', color: '#FFD700', bgColor: '#FFFBE6' },
  { rank: 6, name: '🥈 白銀地殼漫遊者', color: '#C0C0C0', bgColor: '#F5F5F5' },
  { rank: 7, name: '🥈 白銀地殼漫遊者', color: '#C0C0C0', bgColor: '#F5F5F5' },
  { rank: 8, name: '🥈 白銀地殼漫遊者', color: '#C0C0C0', bgColor: '#F5F5F5' },
  { rank: 9, name: '🥈 白銀地殼漫遊者', color: '#C0C0C0', bgColor: '#F5F5F5' },
  { rank: 10, name: '🥈 白銀地殼漫遊者', color: '#C0C0C0', bgColor: '#F5F5F5' },
];

export function getRankTier(rank: number) {
  if (rank === 1) return RANK_TIERS[0];
  if (rank <= 5) return RANK_TIERS[1];
  if (rank <= 10) return RANK_TIERS[5];
  return { rank, name: '🌱 地球新探險家', color: '#6BBF59', bgColor: '#F0FFF0' };
}

export function getComboName(category: Category, combo: number): string {
  if (combo < 3) return '';
  if (category === 'earth') return `⛏️ 鼴鼠衝刺 x${combo}！`;
  if (category === 'world') return `🌬️ 信天翁氣流 x${combo}！`;
  return `🌟 動物爆發 x${combo}！`;
}

export function calculateScore(
  isCorrect: boolean,
  timeLeft: number,
  combo: number,
  category: Category
): number {
  if (!isCorrect) return 0;
  const base = GAME_CONFIG.baseScore;
  const timeBonus = timeLeft * GAME_CONFIG.timeBonus;
  const comboIdx = Math.min(combo, GAME_CONFIG.comboMultipliers.length - 1);
  const multiplier = GAME_CONFIG.comboMultipliers[comboIdx];
  return Math.round((base + timeBonus) * multiplier);
}

export function getQuestionsByCategory(category: Category): Question[] {
  return QUESTIONS.filter((q) => q.category === category);
}

export function shuffleQuestions(questions: Question[]): Question[] {
  return [...questions].sort(() => Math.random() - 0.5);
}
