// --- Генератор нікнеймів для бічної панелі ---
const adjectives = ['Silent', 'Golden', 'Crystal', 'Shadow', 'Rapid', 'Cosmic', 'Quantum', 'Phantom', 'Electric', 'Frozen', 'Crimson', 'Azure', 'Solar', 'Lunar', 'Iron'];
const subjects = ['Gambler', 'Saca', 'Spectre', 'Pioneer', 'Voyager', 'Phoenix', 'Oracle', 'Striker', 'Guardian', 'Reaper', 'Nomad', 'Paladin', 'Viper', 'Titan', 'Wizard'];
const allPossibleNames = [];
for (const adj of adjectives) {
  for (const subj of subjects) {
    allPossibleNames.push(`${adj}${subj}`);
  }
}
for (let i = allPossibleNames.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [allPossibleNames[i], allPossibleNames[j]] = [allPossibleNames[j], allPossibleNames[i]];
}
export const playerNamesArray = allPossibleNames;

// --- Дані про ігри для бічної панелі ---
export const gameData = [
  { name: 'Gates of Olympus', image: '/img/rbarimg1.png' },
  { name: 'Sweet Bonanza', image: '/img/rbarimg2.png' },
  { name: 'The Dog House', image: '/img/rbarimg3.png' },
  { name: 'Book of Dead', image: '/img/BookofRa.gif' },
  { name: 'Sugar Rush', image: '/img/SugarRush.gif' },
];

// --- Дані для таблиці лідерів ---
function generateLeaderboardData() {
  const leaderboard = [];
  let score = 120000;
  const nicknames = [...playerNamesArray].sort(() => 0.5 - Math.random());
  for (let i = 0; i < 100; i++) {
    leaderboard.push({ place: i + 1, player: nicknames[i] || `Player${i + 1}`, score });
    score -= Math.floor(Math.random() * 800) + 200;
  }
  return leaderboard;
}
export const leaderboardData = generateLeaderboardData();

// --- Великий список ігор для сторінки "Слоти" та інших ---
export const allGames = [
  { id: 1, title: 'Book of Ra Deluxe', provider: 'Novomatic', image: '/img/BookofRa.gif' },
  { id: 2, 'title': 'Sweet Bonanza', provider: 'Pragmatic Play', image: '/img/SweetBonanza.gif' },
  { id: 3, 'title': 'Joker Stoker', provider: 'Endorphina', image: '/img/JokerStoker.gif' },
  { id: 4, 'title': '5 Fruit Invaders', provider: 'Amigo Gaming', image: '/img/5FruitInvaders.gif' },
  { id: 5, 'title': 'Sugar Rush', provider: 'Pragmatic Play', image: '/img/SugarRush.gif' },
  { id: 6, 'title': 'Crown & Coins', provider: 'Endorphina', image: '/img/CrownCoins.gif' },
  { id: 7, 'title': 'Diamond Mines', provider: 'Reflex Gaming', image: '/img/DiamondMines.gif' },
  { id: 8, 'title': 'Hell Hot 100', provider: 'Endorphina', image: '/img/HellHot100.gif' },
  { id: 9, title: 'The Dog House', provider: 'Pragmatic Play', image: '/img/rbarimg3.png' },
  { id: 10, title: 'Legacy of Dead', provider: 'Play\'n GO', image: '/img/SugarRush.gif' },
  { id: 11, title: 'Gonzo\'s Quest', provider: 'NetEnt', image: '/img/rbarimg1.png' },
  { id: 12, title: 'Starburst', provider: 'NetEnt', image: '/img/rbarimg2.png' },
  { id: 13, title: 'Gates of Olympus', provider: 'Pragmatic Play', image: '/img/rbarimg1.png' },
  { id: 14, title: 'Reactoonz', provider: 'Play\'n GO', image: '/img/CrownCoins.gif' },
  { id: 15, title: 'Money Train 2', provider: 'Relax Gaming', image: '/img/JokerStoker.gif' },
];

// --- Список популярних ігор для головної сторінки ---
export const popularGames = allGames.slice(0, 8);