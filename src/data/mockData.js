// --- ВАЖЛИВО! Вставте сюди ваш URL ---
const SUPABASE_URL = 'https://vngvrmbpffrtfhkauous.supabase.co/storage/v1/object/public';
// Допоміжна функція для перетворення локального шляху на повний URL
const createImageUrl = (localPath) => `${SUPABASE_URL}${localPath}`;

// --- Генератор нікнеймів для бічної панелі ---
// --- БАЗОВІ СЛОВА ДЛЯ ГЕНЕРАЦІЇ ---

// Англійською мовою
const prefixes = ['Lucky', 'Ace', 'Royal', 'Grand', 'Mega', 'Poker', 'Slot', 'Cash', 'Gold', 'Dr', 'Mr', 'Big', 'Mad', 'Spin'];
const nouns = ['Shark', 'Joker', 'King', 'Queen', 'Spade', 'Heart', 'Chip', 'Spinner', 'Whale', 'Hunter', 'Wolf', 'Lion', 'Dragon', 'Winner', 'Player', 'Bet'];
const names = ['Alex', 'Mike', 'Anna', 'Kate', 'John', 'Chris', 'Steve', 'Jack', 'Lana', 'Maria', 'Ivan', 'Serg', 'Den', 'Max', 'Olga'];
const coolWords = ['Shadow', 'Phantom', 'Blaze', 'Vortex', 'Spectre', 'Ronin', 'Zenith', 'Cipher', 'Matrix', 'Gamble', 'Winner', 'Raptor', 'Cobra'];

// Російською мовою
const cyrillicPrefixes = ['Король', 'Туз', 'Фартовый', 'Император', 'Мега', 'Царь', 'Капитан', 'Лорд'];
const cyrillicNouns = ['Карт', 'Фишек', 'Спинов', 'Удачи', 'Джoкeр', 'Джекпот', 'Охотник', 'Волк', 'Дракон', 'Победы'];
const cyrillicNames = ['Дима', 'Олег', 'Иван', 'Анна', 'Лена', 'Макс', 'Сергей', 'Юрий', 'Катя', 'Света'];
const cyrillicCoolWords = ['Фантом', 'Удача', 'Профи', 'Легенда', 'Счастливчик', 'Призрак', 'Зенит', 'Магнат', 'Миллион'];

// --- ЛОГІКА ГЕНЕРАЦІЇ ---

const generatedNames = new Set();

// Шаблон 1: Префікс + Іменник (напр. LuckyShark, MegaSpinner)
for (const prefix of prefixes) {
  for (const noun of nouns) {
    generatedNames.add(`${prefix}${noun}`);
  }
}

// Шаблон 2: Ім'я + Числа (напр. Alex777, Kate_88)
for (const name of names) {
  const number = Math.floor(Math.random() * 900) + 100; // 100-999
  const year = Math.floor(Math.random() * (2005 - 1980 + 1)) + 1980; // 1980-2005
  generatedNames.add(`${name}${number}`);
  generatedNames.add(`${name}_${year}`);
}

// Шаблон 3: Одиночні круті слова + числа (напр. Shadow21, xPhantomx)
for (const word of coolWords) {
    const number = Math.floor(Math.random() * 99) + 1; // 1-99
    generatedNames.add(`${word}${number}`);
    if (Math.random() > 0.7) {
        generatedNames.add(`x${word}x`);
    }
}

// Шаблон 4: Кириличні ніки (напр. КорольФишек, Дима_777)
for (const prefix of cyrillicPrefixes) {
    for (const noun of cyrillicNouns) {
        generatedNames.add(`${prefix}${noun}`);
    }
}
for (const name of cyrillicNames) {
    const number = ['77', '88', '99', '777', '888'][Math.floor(Math.random() * 5)];
    generatedNames.add(`${name}${number}`);
    generatedNames.add(`${name}_${number}`);
}
for (const word of cyrillicCoolWords) {
    generatedNames.add(word); // Деякі ніки без чисел
    generatedNames.add(`${word}${Math.floor(Math.random() * 99) + 1}`);
}

// --- ФІНАЛІЗАЦІЯ ---

// Перетворюємо Set в масив, щоб гарантувати унікальність
let allPossibleNames = Array.from(generatedNames);

// Перемішуємо масив для випадкового порядку
for (let i = allPossibleNames.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [allPossibleNames[i], allPossibleNames[j]] = [allPossibleNames[j], allPossibleNames[i]];
}

// Експортуємо фінальний список
export const playerNamesArray = allPossibleNames;


// --- Дані про ігри для бічної панелі ---
const originalGameData = [
  // --- Оригінальний список ---
  { title: 'Gates of Olympus', image: '/img/rbarimg1.webp' },
  { title: 'Sweet Bonanza', image: '/img/rbarimg2.webp' },
  { title: 'The Dog House', image: '/img/rbarimg3.webp' },
  { title: 'Book Of Ra', image: '/img/BookOfRa.webp' },
  { title: 'Hell Hot 100', image: '/img/HellHot100.webp' },
  { title: 'Sugar Rush', image: '/img/SugarRush.webp' },
  { title: '5 Fruit Invaders', image: '/img/5FruitInvaders.webp' },
  { title: 'Joker Stoker', image: '/img/JokerStoker.webp' },
  { title: 'Crown Coins', image: '/img/CrownCoins.webp' },
  { title: 'Diamond Mines', image: '/img/DiamondMines.webp' },
  { title: 'Legacy Of The Sages', image: '/img/LegacyOfTheSages.webp' },
  { title: 'Gonzo\'s Quest', image: '/img/GonzosQuest.webp' },
  { title: 'Starburst', image: '/img/rbarimg2.webp' },
  { title: 'Tutankhamuns Thomb', image: '/img/TutankhamunsThomb.webp' },
  { title: 'Money Minter', image: '/img/MoneyMinter.webp' },
  { title: 'Neon Roulette', image: '/img/Neon Roulette_300x300.webp' },
  { title: 'Auto Roulette 1', image: '/img/AutoRoulette1.webp' },
  { title: 'Fruit Party 1', image: '/img/FruitParty1.webp' },
  { title: 'Book of Ra Magic', image: '/img/BookofRaMagic.webp' },
  { title: 'Book Of Rebirth', image: '/img/BookOfRebirth.webp' },
  { title: 'The Dog House Multihold', image: '/img/TheDogHouseMultihold.webp' },
  { title: 'Cleocatra', image: '/img/Cleocatra.webp' },
  { title: '100 Super Hot', image: '/img/100SuperHot.webp' },
  { title: 'Shining Crown', image: '/img/ShiningCrown.webp' },
  { title: '888 Bonus Combo', image: '/img/888BonusCombo.webp' },
  { title: 'The Grand Rooster Hold And Win', image: '/img/TheGrandRoosterHoldAndWin.webp' },
  { title: 'Futuristic Fruits', image: '/img/FuturisticFruits.webp' },
  { title: 'Hells Hot 7s', image: '/img/HellsHot7s.webp' },
  { title: 'Johns Book', image: '/img/JohnsBook.webp' },
  { title: 'Oath of Steel', image: '/img/OathofSteel.webp' },
  { title: 'Lucky Hot Coins', image: '/img/LuckyHotCoins.webp' },
  { title: 'Dice Invaders', image: '/img/DiceInvaders.webp' },
  { title: 'Lucky Ladys Charm Deluxe Buy Bonus', image: '/img/LuckyLadysCharmDeluxeBuyBonus.webp' },
  { title: 'Veracruz Wild', image: '/img/VeracruzWild.webp' },
];
export const gameData = originalGameData.map(game => ({
  ...game,
  image: createImageUrl(game.image)
}));


// --- Дані для таблиці лідерів ---
function generateLeaderboardData() {
  const leaderboard = [];
  let score = 120904;
  const nicknames = [...playerNamesArray].sort(() => 0.5 - Math.random());
  for (let i = 0; i < 100; i++) {
    leaderboard.push({ place: i + 1, player: nicknames[i] || `Player${i + 1}`, score });
    score -= Math.floor(Math.random() * 800) + 200;
  }
  return leaderboard;
}
export const leaderboardData = generateLeaderboardData();

// https://casino.ua/service/ihub-sw/api/launcher/4370?is_demo=1&locale=uk-UA&lobby_url=https%3A%2F%2Fcasino.ua%2F&deposit_url=https%3A%2F%2Fcasino.ua%2Fpersonal-office%2Fbalance%2Fdeposit&platform=desktop





const originalAllGames = [
  // --- 1. PRAGMATIC PLAY (Залишаємо статичні URL - вони працюють ідеально) ---
  { id: 2, title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: '/img/SweetBonanza.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitsw', launchId: null },
  { id: 3, title: 'The Dog House', provider: 'Pragmatic Play', image: '/img/TheDogHouse.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vswaysdogs&websiteUrl=https://demogamesfree.pragmaticplay.net', launchId: null },
  { id: 5, title: 'Sugar Rush', provider: 'Pragmatic Play', image: '/img/SugarRush.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?jurisdiction=99&lang=en&cur=USD&gameSymbol=vs20sugarrush', launchId: null },
  { id: 13, title: 'Gates of Olympus', provider: 'Pragmatic Play', image: '/img/rbarimg1.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20olympgate', launchId: null },
 
  { id: 58, title: 'Fruit Party', provider: 'Pragmatic Play', image: '/img/FruitParty1.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitparty', launchId: null },
  { id: 61, title: 'The Dog House Multihold', provider: 'Pragmatic Play', image: '/img/TheDogHouseMultihold.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20doghousemh', launchId: null },
  { id: 62, title: 'Cleocatra', provider: 'Pragmatic Play', image: '/img/Cleocatra.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20cleocatra', launchId: null },
  { id: 111, title: 'Glow Dig (Big Bass Bonanza)', provider: 'Pragmatic Play', image: '/img/GlowDig.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs10bbbonanza', launchId: null },
  { id: 184, title: 'Forge of Olympus', provider: 'Pragmatic Play', image: '/img/ForgeofOlympus.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20forge', launchId: null },
  { id: 219, title: 'Wild West Gold', provider: 'Pragmatic Play', image: '/img/WildWestGold.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs40wildwest', launchId: null },
  { id: 221, title: 'Wisdom of Athena', provider: 'Pragmatic Play', image: '/img/WisdomofAthena.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20procount', launchId: null },
  
  { id: 235, title: 'The Dog House Megaways', provider: 'Pragmatic Play', image: '/img/TheDogHouseMegaways.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vswaysdogs', launchId: null },
  { id: 242, title: 'Sugar Rush 1000', provider: 'Pragmatic Play', image: '/img/SugarRush1000..webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20sugarrushx', launchId: null },
  { id: 244, title: 'Gates Of Olympus 1000', provider: 'Pragmatic Play', image: '/img/GatesOfOlympus1.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20olympx', launchId: null },
  { id: 261, title: 'Sweet Bonanza 1000', provider: 'Pragmatic Play', image: '/img/Sweet Bonanza_1000_200x200 (1).webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitswx', launchId: null },

  // --- 2. ЗНАЙДЕНІ В new2.txt (Всі провайдери: Novomatic, Endorphina, NetEnt і т.д.) ---
  { id: 1, title: 'Book of Ra Deluxe', provider: 'Novomatic', image: '/img/BookOfRa.webp', demoUrl: '', launchId: 8836 },
  { id: 224, title: 'Book Of Ra Classic', provider: 'Novomatic', image: '/img/BookOfRa.webp', demoUrl: '', launchId: 8835 },
  { id: 59, title: 'Book of Ra Magic', provider: 'Novomatic', image: '/img/BookofRaMagic.webp', demoUrl: '', launchId: 8841 },
  { id: 250, title: 'Sizzling Hot Deluxe', provider: 'Novomatic', image: '/img/SizzlingHotDeluxe (1).webp', demoUrl: '', launchId: 8936 },
  { id: 73, title: 'Lucky Lady\'s Charm Deluxe', provider: 'Novomatic', image: '/img/LuckyLadysCharmDeluxeBuyBonus.webp', demoUrl: '', launchId: 13876 },
  { id: 144, title: 'Dolphin\'s Pearl Deluxe', provider: 'Novomatic', image: '/img/DolphinsPearlDeluxe.webp', demoUrl: '', launchId: 8957 },
  { id: 122, title: 'Power Stars', provider: 'Novomatic', image: '/img/PowerStars.webp', demoUrl: '', launchId: 8921 },
  { id: 172, title: 'Roaring Forties', provider: 'Novomatic', image: '/img/RoaringForties.webp', demoUrl: '', launchId: 8928 },
  { id: 171, title: 'Charming Ladys Boom', provider: 'Novomatic', image: '/img/CharmingLadysBoom.webp', demoUrl: '', launchId: 8853 },
  { id: 173, title: 'Plenty of Fruit 40', provider: 'Novomatic', image: '/img/PlentyofFruit40.webp', demoUrl: '', launchId: 8917 }, // Знайдено як "Plenty on Twenty", спробуємо
  
  { id: 9, title: 'Joker Stoker', provider: 'Endorphina', image: '/img/JokerStoker.webp', demoUrl: '', launchId: 4370 },
  { id: 10, title: 'Hell Hot 100', provider: 'Endorphina', image: '/img/HellHot100.webp', demoUrl: '', launchId: 4378 },
  { id: 226, title: 'Hell Hot 40', provider: 'Endorphina', image: '/img/HellHot40.webp', demoUrl: '', launchId: 4380 },
  { id: 204, title: 'Hell Hot 20', provider: 'Endorphina', image: '/img/HellHot20.webp', demoUrl: '', launchId: 4376 },
  { id: 6, title: 'Crown & Coins', provider: 'Endorphina', image: '/img/CrownCoins.webp', demoUrl: '', launchId: 9183 },
  { id: 160, title: 'Royal Xmass 2', provider: 'Endorphina', image: '/img/RoyalXmass2.webp', demoUrl: '', launchId: 4273 },
  { id: 268, title: 'Ultra Fresh', provider: 'Endorphina', image: '/img/UltraFresh.webp', demoUrl: '', launchId: 4404 },
  { id: 210, title: 'Lucky Streak 1000', provider: 'Endorphina', image: '/img/LuckyStreak1000.webp', demoUrl: '', launchId: 14561 },
  { id: 193, title: 'Buffalo 50', provider: 'Endorphina', image: '/img/YoungBuffaloSong.webp', demoUrl: '', launchId: 4361 },
  
  { id: 11, title: 'Gonzo\'s Quest', provider: 'NetEnt', image: '/img/GonzosQuest.webp', demoUrl: '', launchId: 344 },
  { id: 105, title: 'Secrets Of Atlantis', provider: 'NetEnt', image: '/img/SecretsOfAtlantis.webp', demoUrl: '', launchId: 298 },
  { id: 16, title: 'Blackjack', provider: 'NetEnt', image: '/img/Blackjack.webp', demoUrl: '', launchId: 386 },
  
  { id: 65, title: '888 Bonus Combo', provider: 'Big Time Gaming', image: '/img/888BonusCombo.webp', demoUrl: '', launchId: 20330 },
  { id: 80, title: 'Prestige Crown', provider: 'Microgaming', image: '/img/PrestigeCrown.webp', demoUrl: '', launchId: 20038 },
  { id: 130, title: 'Carnival Cat Bonus Combo', provider: 'Playtech', image: '/img/CarnivalCatBonusCombo.webp', demoUrl: '', launchId: 16601 },
  { id: 157, title: 'Bunnys Bounty Hold N Link', provider: 'NetGame', image: '/img/BunnysBountyHoldNlink.webp', demoUrl: '', launchId: 16638 },
  { id: 180, title: 'Big Catch Bonanza Perfect Haul', provider: 'Evolution', image: '/img/BigCatchBonanzaPerfectHaul.webp', demoUrl: '', launchId: 16640 },
  { id: 187, title: 'Luck of Panda Bonus Combo', provider: 'Playtech', image: '/img/LuckofPandaBonusCombo.webp', demoUrl: '', launchId: 16639 },
  { id: 191, title: 'Luck of Tiger', provider: 'Microgaming', image: '/img/LuckofTiger.webp', demoUrl: '', launchId: 16620 },
  { id: 201, title: 'Elephants Gold Bonus Combo', provider: 'NetGame', image: '/img/ElephantsGoldBonusCombo.webp', demoUrl: '', launchId: 16605 },
  { id: 265, title: 'Burning Coins 20', provider: 'Microgaming', image: '/img/BurningCoins20.webp', demoUrl: '', launchId: 19013 },
  { id: 266, title: 'Baba Yaga GGBET', provider: 'Spinomenal', image: '/img/BabaYagaGGBET.webp', demoUrl: '', launchId: 17264 }, // Спробуємо підставити схожу Piggy Prizes (просто для тесту, якщо ні - прибери)

  // --- 3. РЕШТА ІГОР (Для яких немає ID, або треба шукати) ---
  { id: 4, title: 'Tutankhamuns Tomb', provider: 'NetEnt', image: '/img/TutankhamunsThomb.webp', demoUrl: '', launchId: 18973 },

  { id: 8, title: 'Legacy Of The Sages', provider: 'Play\'n GO', image: '/img/LegacyOfTheSages.webp', demoUrl: 'https://demo.evoplay.games/demo/fullstate/html5/evoplay/legacyofthesagesbb', launchId: null },
  { id: 12, title: '5 Fruit Invaders', provider: 'Amigo Gaming', image: '/img/5FruitInvaders.webp', demoUrl: '', launchId: 5964 },
  { id: 14, title: 'Tutankhamuns Tomb', provider: 'Play\'n GO', image: '/img/TutankhamunsThomb.webp', demoUrl: '', launchId: 18973 },
  { id: 15, title: 'Money Minter', provider: 'Relax Gaming', image: '/img/MoneyMinter.webp', demoUrl: '', launchId: 1299 },
  { id: 18, title: 'Goal', provider: 'NetEnt', image: '/img/Goal.webp', demoUrl: '', launchId: 14258 },
  { id: 19, title: 'Turbo Mines', provider: 'Microgaming', image: '/img/TurboMines.webp', demoUrl: '', launchId: 13696 },
  { id: 20, title: 'Plinko', provider: 'Playtech', image: '/img/plinko.webp', demoUrl: '', launchId: 8275 },
  { id: 21, title: 'Cosmo X', provider: 'IGT', image: '/img/CosmoX.webp', demoUrl: '', launchId: 14107 },
  { id: 22, title: 'Aviator', provider: 'Spribe', image: '/img/Aviator.webp', demoUrl: '', launchId: 22818 },

  { id: 24, title: 'FruitsonIce', provider: 'Red Tiger Gaming', image: '/img/FruitsonIce.webp', demoUrl: '', launchId: 19426 },
  { id: 25, title: '100JuicyFruits', provider: 'Big Time Gaming', image: '/img/100JuicyFruits.webp', demoUrl: '', launchId: 16941 },
  { id: 26, title: 'European Roulette VIP', provider: 'Blueprint Gaming', image: '/img/EuropeanRouletteVIP.webp', demoUrl: '', launchId: 1270 },
  { id: 28, title: 'American Blackjack', provider: 'Thunderkick', image: '/img/AmericanBlackjack(1).webp', demoUrl: '', launchId: 4575 },
  // { id: 29, title: 'Texas Holdem', provider: 'Relax Gaming', image: '/img/TexasHoldem.webp', demoUrl: '', launchId: null },
  // { id: 30, title: 'Vegas Holdem', provider: 'Wazdan', image: '/img/VegasHoldem.webp', demoUrl: '', launchId: null },
  { id: 31, title: 'Romanian Blackjack X3', provider: 'Endorphina', image: '/img/RomanianBlackjackX3.webp', demoUrl: '', launchId: 2841 },
  { id: 32, title: 'Auto Roulette', provider: 'Hacksaw Gaming', image: '/img/AutoRoulette (1).webp', demoUrl: '', launchId: 6022 },
  { id: 33, title: 'Vip European Roulette', provider: 'Push Gaming', image: '/img/VipEuropeanRoulette.webp', demoUrl: '', launchId: 4146 },
  { id: 34, title: 'American Blackjack', provider: 'Nolimit City', image: '/img/AmericanBlackjack.webp', demoUrl: '', launchId: 4575 },
  { id: 35, title: 'European Roulette', provider: 'BGaming', image: '/img/EuropeanRoulette.webp', demoUrl: '', launchId: 15647 },
  { id: 36, title: 'Sevens Joy', provider: 'Amatic', image: '/img/SevensJoy.webp', demoUrl: '', launchId: 1268 },
  { id: 37, title: 'Mummys Jewels', provider: 'EvoPlay', image: '/img/MummysJewels.webp', demoUrl: '', launchId: 19571 },
  { id: 39, title: 'BoxofRa', provider: 'Booongo', image: '/img/BoxofRa.webp', demoUrl: '', launchId: 1320 },
  { id: 40, title: 'Majestic Cleopatra', provider: 'Tom Horn Gaming', image: '/img/MajesticCleopatra.webp', demoUrl: '', launchId: 17128 },
  { id: 41, title: 'Book Of Winners Lotto', provider: 'Spinomenal', image: '/img/BookOfWinnersLotto.webp', demoUrl: '', launchId: 12111 },
  { id: 42, title: 'Demi Gods VI', provider: 'Pariplay', image: '/img/DemiGodsVI.webp', demoUrl: '', launchId: 16722 },
  { id: 43, title: 'CrownCoins', provider: 'Betsoft', image: '/img/CrownCoins.webp', demoUrl: '', launchId: 9183 },
  { id: 56, title: 'Neon Roulette', provider: 'Spinomenal', image: '/img/Neon Roulette_300x300.webp', demoUrl: '', launchId: 22446 },
  { id: 57, title: 'Auto Roulette 1', provider: 'Playtech', image: '/img/AutoRoulette1.webp', demoUrl: '', launchId: 5995 },
  { id: 60, title: 'Book Of Rebirth', provider: 'Spinomenal', image: '/img/BookOfRebirth.webp', demoUrl: '', launchId: 16731 },
  { id: 63, title: '100 Super Hot', provider: 'EGT (Amusnet)', image: '/img/100SuperHot.webp', demoUrl: '', launchId: 5135 },
  { id: 64, title: 'Shining Crown', provider: 'EGT (Amusnet)', image: '/img/ShiningCrown.webp', demoUrl: '', launchId: 5005 },
  { id: 66, title: 'The Grand Rooster Hold And Win', provider: 'EvoPlay', image: '/img/TheGrandRoosterHoldAndWin.webp', demoUrl: '', launchId: 12448 },
  { id: 67, title: 'Futuristic Fruits', provider: 'Betsoft', image: '/img/FuturisticFruits.webp', demoUrl: '', launchId: 14610 },
  { id: 68, title: 'Hells Hot 7s', provider: 'Nolimit City', image: '/img/HellsHot7s.webp', demoUrl: '', launchId: 19700 },


  { id: 71, title: 'Lucky Hot Coins', provider: 'Red Tiger Gaming', image: '/img/LuckyHotCoins.webp', demoUrl: '', launchId: 20340 },
  { id: 72, title: 'Dice Invaders', provider: 'Evolution', image: '/img/DiceInvaders.webp', demoUrl: '', launchId: 2285 },
  { id: 74, title: 'Veracruz Wild', provider: 'Relax Gaming', image: '/img/VeracruzWild.webp', demoUrl: '', launchId: 23353 },
  { id: 75, title: 'Ultimate Golden Dragon Inferno', provider: 'Evolution', image: '/img/UltimateGoldenDragonInferno.webp', demoUrl: '', launchId: 21416 },
  { id: 76, title: 'Queen of Sirens', provider: 'BGaming', image: '/img/QueenofSirens.webp', demoUrl: '', launchId: 14792 },
  { id: 77, title: 'Bounty Expand 25', provider: 'Evolution', image: '/img/BountyExpand25.webp', demoUrl: '', launchId: 15841 },
  { id: 78, title: '4 Horsemen 3 Inferno', provider: 'Betsoft', image: '/img/4Horsemen3Inferno.webp', demoUrl: '', launchId: 20366 },
  { id: 79, title: 'Fortune Bags', provider: 'ELK Studios', image: '/img/FortuneBags.webp', demoUrl: '', launchId: 15534 },
  { id: 81, title: 'Hades Infernal Blaze', provider: 'Microgaming', image: '/img/HadesInfernalBlaze.webp', demoUrl: '', launchId: 20133 },
  { id: 82, title: '3 Pots of Lunar Wolf Hold Win', provider: 'Quickspin', image: '/img/3PotsofLunarWolfHoldWin.webp', demoUrl: '', launchId: 14253 },
  { id: 83, title: '3x5 Hold The Spin', provider: 'Playtech', image: '/img/3x5 Hold The Spin..webp', demoUrl: '', launchId: 20433 },
  { id: 84, title: 'Bastet', provider: 'Champion', image: '/img/Bastet.webp', demoUrl: '', launchId: 19155 },
  { id: 85, title: 'Bonbon Pop', provider: 'Yggdrasil', image: '/img/BonbonPop.webp', demoUrl: '', launchId: 19313 },
  { id: 86, title: 'Plinko', provider: 'BGaming', image: '/img/Plinko.webp', demoUrl: '', launchId: 8968 },
  { id: 87, title: 'Sweet Bonanza Super Scatter', provider: 'Pragmatic Play', image: '/img/SweetBonanzaSuperScatter.webp', demoUrl: '', launchId: 20336 },
  { id: 88, title: 'Moon Guardians', provider: 'Wazdan', image: '/img/MoonGuardians.webp', demoUrl: '', launchId: 5033 },
  { id: 89, title: 'Magnify Man', provider: 'Fugaso', image: '/img/MagnifyMan.webp', demoUrl: '', launchId: 19035 },
  { id: 90, title: 'Jungle Stripes', provider: 'Betsoft', image: '/img/JungleStripes.webp', demoUrl: '', launchId: 2806 },
  { id: 91, title: '7 Fortune Frenzy', provider: 'Betsoft', image: '/img/7FortuneFrenzy.webp', demoUrl: '', launchId: 4021 },
  { id: 92, title: 'Joker Coins Megaways', provider: 'Evolution', image: '/img/JokerCoinsMegaways.webp', demoUrl: '', launchId: 5567 },
  { id: 93, title: 'Book of Bamboo', provider: 'Big Time Gaming', image: '/img/BookofBamboo.webp', demoUrl: '', launchId: 5605 },
  { id: 94, title: 'Doctor Winstein Buy Bonus', provider: 'Endorphina', image: '/img/DoctorWinsteinBuyBonus.webp', demoUrl: '', launchId: 5281 },
  { id: 95, title: 'Golden Dragon Inferno', provider: 'Betsoft', image: '/img/GoldenDragonInferno.webp', demoUrl: '', launchId: 3993 },

  { id: 97, title: 'Clover Wheel', provider: 'Blueprint Gaming', image: '/img/CloverWheel.webp', demoUrl: '', launchId: 5487 },
  { id: 98, title: '20 Mega Star', provider: 'Yggdrasil', image: '/img/20MegaStar.webp', demoUrl: '', launchId: 14735 },
  { id: 99, title: 'Poseidons Rising', provider: 'Spinomenal', image: '/img/PoseidonsRising.webp', demoUrl: '', launchId: 15595 },
  { id: 100, title: 'The Great Cabaret', provider: 'Pragmatic Play', image: '/img/TheGreatCabaret.webp', demoUrl: '', launchId: 5453 },
  { id: 101, title: 'Royal Treasures', provider: 'BGaming', image: '/img/RoyalTreasures.webp', demoUrl: '', launchId: 5336 },
  { id: 102, title: 'Story Of Hercules', provider: 'Spinomenal', image: '/img/StoryOfHercules.webp', demoUrl: '', launchId: 16686 },
  { id: 103, title: 'Rags to Witches', provider: 'Betsoft', image: '/img/RagstoWitches.webp', demoUrl: '', launchId: 15286 },
  { id: 104, title: 'Wild Double Up', provider: 'Betsoft', image: '/img/WildDoubleUp.webp', demoUrl: '', launchId: 7180 },
  { id: 106, title: '2500xRush', provider: 'Playtech', image: '/img/2500xRush.webp', demoUrl: '', launchId: 13435 },
  { id: 107, title: 'Coin Galactic', provider: 'Quickspin', image: '/img/CoinGalactic.webp', demoUrl: '', launchId: 19441 },

  { id: 109, title: 'Good Luck Spell', provider: 'Playson', image: '/img/GoodLuckSpell.webp', demoUrl: '', launchId: 5873 },
  { id: 110, title: 'Fruit Boost', provider: 'Pariplay', image: '/img/FruitBoost.webp', demoUrl: '', launchId: 2817 },
  { id: 112, title: 'Demi Gods 5 Hold & Hit', provider: 'Spinomenal', image: '/img/DemiGods5Hold&Hit.webp', demoUrl: '', launchId: 16734 },
  { id: 113, title: 'Rise Of Triton', provider: 'Betsoft', image: '/img/RiseOfTriton.webp', demoUrl: '', launchId: 5011 },
  { id: 114, title: 'Joker Coins', provider: 'Yggdrasil', image: '/img/JokerCoins.webp', demoUrl: '', launchId: 5598 },
  { id: 115, title: 'Wild Spin', provider: 'Platipus', image: '/img/WildSpin.webp', demoUrl: '', launchId: 2766 },
  { id: 116, title: 'Lucky Numbers x12', provider: 'Hacksaw', image: '/img/LuckyNumbersx12.webp', demoUrl: '', launchId: 12146 },
  { id: 117, title: 'Kitchen Hot', provider: 'Pariplay', image: '/img/KitchenHot.webp', demoUrl: '', launchId: 17403 },
  { id: 118, title: 'Book Of Sirens', provider: 'Spinomenal', image: '/img/BookOfSirens.webp', demoUrl: '', launchId: 16983 },
  { id: 119, title: 'King Kong Cashpots', provider: 'Blueprint', image: '/img/KingKongCashpots.webp', demoUrl: '', launchId: 4591 },
  { id: 120, title: 'The Book Of Patagonia', provider: 'Betsoft', image: '/img/TheBookOfPatagonia.webp', demoUrl: '', launchId: null },
  { id: 121, title: 'Majestic King Ice Kingdom', provider: 'Spinomenal', image: '/img/MajesticKingIceKingdom.webp', demoUrl: '', launchId: 17031 },
  { id: 123, title: '20 Shining Coins', provider: 'Push Gaming', image: '/img/20ShiningCoins.webp', demoUrl: '', launchId: 5322 },

  { id: 125, title: 'April Fury and the Chamber of Scarabs', provider: 'Betsoft', image: '/img/AprilFuryandtheChamberofScarabs.webp', demoUrl: '', launchId: 19374 },
  { id: 126, title: 'Sizzling Super Sevens', provider: 'BGaming', image: '/img/SizzlingSuperSevens.webp', demoUrl: '', launchId: 6204 },
  { id: 127, title: 'Royal Harvest', provider: 'Wazdan', image: '/img/RoyalHarvest.webp', demoUrl: '', launchId: 7451 },

  { id: 129, title: 'Coininfinity Surge Reel', provider: 'Nolimit City', image: '/img/CoininfinitySurgeReel.webp', demoUrl: '', launchId: 15541 },
  { id: 131, title: 'Hot Triple Sevens', provider: 'EvoPlay', image: '/img/Hot Triple Sevens .webp', demoUrl: '', launchId: 1325 },
  { id: 132, title: 'Book Of Demi Gods 2', provider: 'Spinomenal', image: '/img/BookOfDemiGods2.webp', demoUrl: '', launchId: 16960 },
  { id: 133, title: 'Wolf Fang', provider: 'Spinomenal', image: '/img/WolfFang.webp', demoUrl: '', launchId: 17086 },
  { id: 134, title: 'Book Hotfire Buy Bonus', provider: 'Spinomenal', image: '/img/BookHotfireBuyBonus.webp', demoUrl: '', launchId: 1983 },
  { id: 135, title: 'Take The Bank', provider: 'Betsoft', image: '/img/TakeTheBank.webp', demoUrl: '', launchId: 4681 },
  { id: 136, title: 'Sunny Coin Hold The Spin', provider: 'Gamzix', image: '/img/SunnyCoinHoldTheSpin.webp', demoUrl: '', launchId: 1695 },
  { id: 137, title: 'Majestic King', provider: 'Spinomenal', image: '/img/340x340_MajesticKing_EN.webp', demoUrl: '', launchId: 15945 },
  { id: 138, title: 'Diamonds Hunt', provider: 'Pragmatic Play', image: '/img/DiamondsHunt.webp', demoUrl: '', launchId: 2825 },
  { id: 139, title: 'The Easter Catch', provider: 'Playtech', image: '/img/TheEasterCatch.webp', demoUrl: '', launchId: 23412 },
  { id: 140, title: 'Wild Witches', provider: 'NetEnt', image: '/img/WildWitches.webp', demoUrl: '', launchId: 23358 },

  { id: 142, title: 'Fairytale Beauties', provider: 'Spinomenal', image: '/img/FairytaleBeauties.webp', demoUrl: '', launchId: 16999 },
  { id: 143, title: 'Sizzling Sevens Hold & Win', provider: 'Pragmatic Play', image: '/img/sizzlingsevenshold&win.webp', demoUrl: '', launchId: 7404 },
  { id: 145, title: 'Take The Vault', provider: 'Betsoft', image: '/img/TakeTheVault.webp', demoUrl: '', launchId: 23208 },
  { id: 146, title: 'Cossacks', provider: 'Big Time Gaming', image: '/img/Cossacks.webp', demoUrl: '', launchId: 7359 },
  { id: 147, title: 'Aztec Spell Forgotten Empire 1', provider: 'Spinomenal', image: '/img/AztecSpellForgottenEmpire-1.webp', demoUrl: '', launchId: 16953 },
  { id: 148, title: 'Ultra Luck', provider: 'Gamzix', image: '/img/UltraLuck.webp', demoUrl: '', launchId: 1690 },
  { id: 149, title: 'Striking Diamond Link', provider: 'Relax Gaming', image: '/img/StrikingDiamondLink.webp', demoUrl: '', launchId: 13935 },
  { id: 150, title: 'The Big Chili', provider: 'Pragmatic Play', image: '/img/TheBigChili.webp', demoUrl: '', launchId: 5285 },
  { id: 151, title: 'Book Of Demi Gods V', provider: 'Spinomenal', image: '/img/BookOfDemiGodsV.webp', demoUrl: '', launchId: 16965 },
  { id: 152, title: 'Sun Crown', provider: 'Push Gaming', image: '/img/SunCrown.webp', demoUrl: '', launchId: 15439 },
  { id: 153, title: 'Wolf Fang Supermoon', provider: 'Spinomenal', image: '/img/WolfFangSupermoon.webp', demoUrl: '', launchId: 17090 },
  { id: 154, title: 'Wild Crowns', provider: 'Platipus', image: '/img/WildCrowns.webp', demoUrl: '', launchId: 2768 },
  { id: 155, title: 'Gates Of Anubis', provider: 'Betsoft', image: '/img/GatesOfAnubis.webp', demoUrl: '', launchId: 23322 },
  { id: 156, title: 'Detective Donut', provider: 'Popiplay', image: '/img/DetectiveDonut.webp', demoUrl: '', launchId: 23313 },
  { id: 158, title: 'Coins Of Zeus', provider: 'Betsoft', image: '/img/CoinsOfZeus.webp', demoUrl: '', launchId: 22438 },
  { id: 159, title: 'Big Joker', provider: 'Yggdrasil', image: '/img/BigJoker.webp', demoUrl: '', launchId: 5337 },
  { id: 161, title: 'Tap Craze', provider: 'Evolution', image: '/img/TapCraze.webp', demoUrl: '', launchId: 14562 },
  { id: 162, title: 'Fruit Salsa', provider: 'Evolution', image: '/img/FruitSalsa.webp', demoUrl: '', launchId: 351 },
  { id: 163, title: 'Golden Piggy Bank', provider: 'Spinomenal', image: '/img/GoldenPiggyBank.webp', demoUrl: '', launchId: 17008 },
  { id: 164, title: 'Area 69', provider: 'Popiplay', image: '/img/Area69.webp', demoUrl: '', launchId: 23300 },
  { id: 165, title: 'Coins Of Ra', provider: 'Betsoft', image: '/img/CoinsOfRa.webp', demoUrl: '', launchId: 6153 },
  { id: 166, title: 'Hot Volcano', provider: 'Evoplay', image: '/img/HotVolcano.webp', demoUrl: '', launchId: 12646 },
  { id: 167, title: 'Tap The Pot', provider: 'Blueprint Gaming', image: '/img/TapThePot.webp', demoUrl: '', launchId: 14305 },
  { id: 168, title: 'Fruits and Bells', provider: 'Fazi', image: '/img/FruitsandBells.webp', demoUrl: '', launchId: 5331 },
  { id: 169, title: 'Sunny Coin 2', provider: 'Gamzix', image: '/img/SunnyCoin2.webp', demoUrl: '', launchId: 1695 },
  { id: 170, title: 'Cassiopeia', provider: 'Blueprint Gaming', image: '/img/Cassiopeia.webp', demoUrl: '', launchId: 1278 },
  { id: 174, title: 'Sevens Heat 20', provider: 'Push Gaming', image: '/img/SevensHeat20.webp', demoUrl: '', launchId: 1265 },
  { id: 175, title: 'Wild Spin Deluxe', provider: 'Platipus', image: '/img/WildSpinDeluxe.webp', demoUrl: '', launchId: 2764 },
  { id: 176, title: '7 Hot Fruits', provider: 'Playson', image: '/img/7HotFruits.webp', demoUrl: '', launchId: 2851 },
  { id: 177, title: 'Pome Race Sun Link 10', provider: 'Blueprint Gaming', image: '/img/PomeRaceSunLink10.webp', demoUrl: '', launchId: 17159 },
  { id: 178, title: '25 Coins', provider: 'Wazdan', image: '/img/25Coins.webp', demoUrl: '', launchId: 7064 },
  { id: 179, title: 'Piggy Coins', provider: 'Relax Gaming', image: '/img/PiggyCoins.webp', demoUrl: '', launchId: 21616 },
  { id: 181, title: 'Dinopolis', provider: 'Push Gaming', image: '/img/Dinopolis.webp', demoUrl: '', launchId: 5599 },
  { id: 182, title: 'Hot and Spicy Jackpot', provider: 'Onlyplay', image: '/img/HotandSpicyJackpot.webp', demoUrl: '', launchId: null },
  { id: 183, title: 'Chaos Crew', provider: 'Hacksaw Gaming', image: '/img/ChaosCrew.webp', demoUrl: '', launchId: 7062 },
  { id: 185, title: 'A Big Catch', provider: 'Nolimit City', image: '/img/ABigCatch.webp', demoUrl: '', launchId: 20456 },
  { id: 186, title: 'Majestic White Rhino', provider: 'Spinomenal', image: '/img/MajesticWhiteRhin.webp', demoUrl: '', launchId: 17035 },
  { id: 188, title: 'Hot Slot Lotto', provider: 'Evolution', image: '/img/HotSlotLotto.webp', demoUrl: '', launchId: 12121 },
  { id: 189, title: 'Sevens Heat 40', provider: 'Relax Gaming', image: '/img/SevensHeat40.webp', demoUrl: '', launchId: 1266 },
  { id: 190, title: 'Scratch Match', provider: 'Evoplay', image: '/img/ScratchMatch.webp', demoUrl: '', launchId: 21547 },
  { id: 192, title: 'Hot Sevens', provider: 'Playson', image: '/img/HotSevens.webp', demoUrl: '', launchId: 1325 },
  { id: 193, title: 'Young Buffalo Song', provider: 'Pragmatic Play', image: '/img/YoungBuffaloSong.webp', demoUrl: '', launchId: 4715 },

  { id: 195, title: 'Fruits Coins', provider: 'Playson', image: '/img/FruitsCoins.webp', demoUrl: '', launchId: 12451 },
  { id: 196, title: 'Dogmasons Mega WOOF', provider: 'Popiplay', image: '/img/DogmasonsMegaWOOF.webp', demoUrl: '', launchId: 23316 },
  { id: 197, title: 'Mega Wild Fruits', provider: 'Spinomenal', image: '/img/MegaWildFruits.webp', demoUrl: '', launchId: 17036 },
  { id: 198, title: 'Super Chili', provider: 'Evoplay', image: '/img/SuperChili.webp', demoUrl: '', launchId: 23193 },
  { id: 199, title: 'Dice Club', provider: 'Relax Gaming', image: '/img/DiceClub.webp', demoUrl: '', launchId: 2285 },
  { id: 200, title: 'Aztec Gold 20', provider: 'Pragmatic Play', image: '/img/AztecGold20.webp', demoUrl: '', launchId: 5295 },
  { id: 202, title: 'Lucky Ladys Charm Deluxe', provider: 'Novomatic', image: '/img/LuckyLadysCharmDeluxe (1).webp', demoUrl: '', launchId: 13876 },

  { id: 205, title: '40 Chilli Fruits', provider: 'Gamzix', image: '/img/40ChilliFruits.webp', demoUrl: '', launchId: 5836 },
  { id: 206, title: '40 Chilli Fruits Superior', provider: 'Gamzix', image: '/img/40ChilliFruitsSuperior.webp', demoUrl: '', launchId: 19713 },
  { id: 207, title: 'Regal Fruits 1000', provider: 'Betsoft', image: '/img/RegalFruits1000 .webp', demoUrl: '', launchId: 13913 },
  { id: 208, title: 'Xmas Invaders', provider: 'Pragmatic Play', image: '/img/XmasInvaders.webp', demoUrl: '', launchId: 19394 },
  { id: 209, title: 'Demi Gods V', provider: 'Spinomenal', image: '/img/DemiGodsV.webp', demoUrl: '', launchId: 16712 },
  { id: 211, title: 'Aztec Century', provider: 'Pragmatic Play', image: '/img/AztecCentury.webp', demoUrl: '', launchId: 1283 },
  { id: 212, title: 'Hot Sevens Lotto', provider: 'Betsoft', image: '/img/HotSevensLotto.webp', demoUrl: '', launchId: 12120 },
  { id: 213, title: 'Gold Nugget Rush', provider: 'Evolution', image: '/img/GoldNuggetRush.webp', demoUrl: '', launchId: 4759 },
  { id: 214, title: 'Vault Lock Crackit Big', provider: 'Evolution', image: '/img/VaultLockCrackitBig.webp', demoUrl: '', launchId: 2069 },

  { id: 216, title: 'Lucky Clover', provider: 'iSoftBet', image: '/img/LuckyClover.webp', demoUrl: '', launchId: 5407 },
  { id: 217, title: 'Blazing Crown Deluxe', provider: 'Blueprint Gaming', image: '/img/BlazingCrownDeluxe.webp', demoUrl: '', launchId: 22177 },
  { id: 218, title: 'mrfirst', provider: 'Evolution', image: '/img/mrfirst.webp', demoUrl: '', launchId: 1242 },

  { id: 222, title: 'Sticky Coin Hold The Spin', provider: 'Gamzix', image: '/img/StickyCoinHoldTheSpin.webp', demoUrl: '', launchId: 16681 },
  { id: 223, title: 'Winstorm', provider: 'EGT (Amusnet)', image: '/img/Winstorm.webp', demoUrl: '', launchId: 5363 },
  { id: 225, title: 'Arctic Coins Running Wins', provider: 'Fugaso', image: '/img/ArcticCoinsRunningWins.webp', demoUrl: '', launchId: 13944 },
  { id: 227, title: 'Gates of Olympus Xmas 1000', provider: 'Pragmatic Play', image: '/img/GatesofOlympusXmas1000.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20olympx', launchId: 14484 },
  { id: 228, title: 'Kong of the Jungle', provider: 'BGaming', image: '/img/KongoftheJungle.webp', demoUrl: '', launchId: 8559 },
  { id: 230, title: 'Celtic Bless', provider: 'Evolution', image: '/img/CelticBless.webp', demoUrl: '', launchId: 19483 },

  { id: 232, title: 'Fruit Party Deluxe', provider: 'Pragmatic Play', image: '/img/FruitPartyDeluxe.webp', demoUrl: '', launchId: 1284 },
  { id: 233, title: 'Regal Spins Sun Link 10', provider: 'Evolution', image: '/img/RegalSpinsSunLink10.webp', demoUrl: '', launchId: 14092 },
  { id: 234, title: 'Jackpot Joker', provider: 'Pragmatic Play', image: '/img/JackpotJoker.webp', demoUrl: '', launchId: 15566 },
  { id: 236, title: 'Bonbon Pop 1000', provider: 'Playtech', image: '/img/BonbonPop1000.webp', demoUrl: '', launchId: 19313 },
  { id: 237, title: 'Joker Win', provider: 'Spinomenal', image: '/img/JokerWin.webp', demoUrl: '', launchId: 16727 },
  { id: 238, title: 'Coin Win Hold The Spin', provider: 'Gamzix', image: '/img/CoinWinHoldTheSpin.webp', demoUrl: '', launchId: 1686 },
  { id: 239, title: 'Joker Stoker', provider: 'Endorphina', image: '/img/JokerStoker.webp', demoUrl: '', launchId: 4370 },
  { id: 240, title: 'Sweet Bonanza 300x300 (1)', provider: 'Pragmatic Play', image: '/img/Sweet Bonanza_300x300 (1).webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitsw', launchId: null },


  { id: 245, title: 'Hell Hot 100', provider: 'Endorphina', image: '/img/HellHot100.webp', demoUrl: '', launchId: 4378 },
  { id: 246, title: 'Pirate Gold Hold And Win', provider: 'Playson', image: '/img/PirateGoldHoldAndWin.webp', demoUrl: '', launchId: 19027 },
  { id: 247, title: 'Purple Hot 2', provider: 'Platipus', image: '/img/PurpleHot2.webp', demoUrl: '', launchId: 5377 },

  { id: 249, title: '3 Fortune Souls', provider: 'Playson', image: '/img/3FortuneSouls.webp', demoUrl: '', launchId: 3876 },
  { id: 251, title: 'Pyro Joker', provider: 'Wazdan', image: '/img/PyroJoker.webp', demoUrl: '', launchId: 328 },
  { id: 252, title: 'Golden Fate', provider: 'Evolution', image: '/img/GoldenFate .webp', demoUrl: '', launchId: 16198 },
  { id: 253, title: 'Cleos Gold', provider: 'Platipus', image: '/img/CleosGold.webp', demoUrl: '', launchId: 2831 },
  { id: 254, title: 'Moneyfest', provider: 'Popiplay', image: '/img/Moneyfest.webp', demoUrl: '', launchId: 23331 },

  { id: 256, title: 'Anubis Spell', provider: 'Spinomenal', image: '/img/AnubisSpell.webp', demoUrl: '', launchId: 13750 },
 
  { id: 258, title: 'Book Of Ra Deluxe', provider: 'Novomatic', image: '/img/BookOfRaDeluxe.webp', demoUrl: 'https://demo.monkeyboxsrv.com/demo/fullstate/html5/novomatic/bookofradeluxe', launchId: 8836 },
  { id: 259, title: '3 Tombs', provider: 'Microgaming', image: '/img/3Tombs.webp', demoUrl: '', launchId: 5330 },
  { id: 260, title: 'Ultra 7 Hot', provider: 'Wazdan', image: '/img/Ultra7Hot.webp', demoUrl: '', launchId: 1289 },
  { id: 262, title: 'Egypt Sphere Hold The Spin', provider: 'Gamzix', image: '/img/EgyptSphereHoldTheSpin.webp', demoUrl: '', launchId: 8805 },
  { id: 263, title: 'Pure Ecstasy', provider: 'Playtech', image: '/img/PureEcstasy.webp', demoUrl: '', launchId: 1247 },

  { id: 267, title: 'Gates of Olympus Super Scatter', provider: 'Pragmatic Play', image: '/img/GatesofOlympusSuperScatter.webp', demoUrl: '', launchId: 18195 },
  { id: 269, title: 'Bacons Bank', provider: 'Microgaming', image: '/img/BaconsBank .webp', demoUrl: '', launchId: 18478 },
  { id: 270, title: 'Red 27', provider: 'Fazi', image: '/img/Red27.webp', demoUrl: '', launchId: 1248 },
  { id: 271, title: 'Hot Triple Sevens Hold And Win', provider: 'Evoplay', image: '/img/HotTripleSevensHoldAndWin.webp', demoUrl: '', launchId: 7404 }
];





export const allGames = originalAllGames.map(game => ({
  ...game,
  image: createImageUrl(game.image)
}));


// --- Список популярних ігор для головної сторінки ---
export const popularGames = allGames.slice(0, 15);


// --- Список популярних ігор для LiveGames ---
const originalLiveGames = [
  { id: 333, title: 'Live ONE Blackjack', image: '/img/LiveONEBlackjack.webp' },
  { id: 334, title: 'Live Mega Wheel', image: '/img/LiveMegaWheel.webp' },
  { id: 335, title: 'Live Blackjack 21', image: '/img/LiveBlackjack21.webp' },
  { id: 336, title: 'Live Blackjack 30 Azure', image: '/img/LiveBlackjack30Azure.webp' },
  { id: 337, title: 'Live Power Up Roulette', image: '/img/LivePowerUpRoulette.webp' },
  { id: 338, title: 'Live Blackjack 17', image: '/img/LiveBlackjack17.webp' },
  { id: 339, title: 'Live Roulette Azure', image: '/img/LiveRouletteAzure.webp' },
  { id: 340, title: 'Live Roulette Macao', image: '/img/LiveRouletteMacao.webp' },
  { id: 342, title: 'Blackjack 11', image: '/img/Blackjack11.webp' },
  { id: 343, title: 'Blackjack 12', image: '/img/Blackjack12.webp' },
  { id: 344, title: 'Blackjack 14', image: '/img/Blackjack14.webp' },
  { id: 345, title: 'Blackjack 16', image: '/img/Blackjack16.webp' },
  { id: 346, title: 'Blackjack 25 Azure', image: '/img/Blackjack25Azure.webp' },
  { id: 347, title: 'Blackjack 99 Azure', image: '/img/Blackjack99Azure.webp' },
  { id: 348, title: 'Blackjack 101 Azure', image: '/img/Blackjack101Azure.webp' },
  { id: 349, title: 'Blackjack Bonus Wheel 1000', image: '/img/BlackjackBonusWheel1000.webp' },
  { id: 350, title: 'Blackjack VIP', image: '/img/BlackjackVIP.webp' },
  { id: 351, title: 'Casino Holdem', image: '/img/CasinoHoldem.webp' },
  { id: 352, title: 'Crazy Time', image: '/img/CrazyTime.webp' },
  { id: 353, title: 'Speed Baccarat 1', image: '/img/SpeedBaccarat1.webp' },
  { id: 354, title: 'Live Blackjack 30 Azure', image: '/img/LiveBlackjack30Azure.webp' },
  { id: 355, title: 'Speed Baccarat 2', image: '/img/SpeedBaccarat2.webp' },
  { id: 356, title: 'Caribbean Stud Poker', image: '/img/CaribbeanStudPoker.webp' },
  { id: 357, title: 'Texas Holdem Bonus Poker', image: '/img/TexasHoldemBonusPoker.webp' },
  { id: 358, title: 'Infinite Free Bet Blackjack', image: '/img/InfiniteFreeBetBlackjack.webp' },
  { id: 359, title: 'Speed Baccarat', image: '/img/SpeedBaccarat.webp' },
  { id: 360, title: 'Dream Catcher', image: '/img/DreamCatcher.webp' },
  { id: 361, title: 'Lightning Baccarat', image: '/img/Lightning_Baccarat.webp' },
  { id: 362, title: 'Monopoly Big Baller', image: '/img/MonopolyBigBaller.webp' },
];
export const LiveGames = originalLiveGames.map(game => ({
    ...game,
    image: createImageUrl(game.image)
}));


const originalRouletteGames = [
  { id: 272, title: 'Mini Roulette', image: '/img/MiniRoulette.webp' },
  { id: 273, title: 'P Roulette', image: '/img/P_Roulette.webp' },
  { id: 275, title: 'Prive Lounge Roulette Deluxe', image: '/img/PriveLoungeRouletteDeluxe.webp' },
  { id: 276, title: 'Roulette Auto', image: '/img/Roulette Auto_TableID229_250x250.webp' },
  { id: 277, title: 'Roulette (1)', image: '/img/Roulette(1).webp' },
  { id: 278, title: 'Roulette (2)', image: '/img/Roulette(2).webp' },
  { id: 279, title: 'Roulette', image: '/img/Roulette.webp' },
  { id: 280, title: 'Roulette 1', image: '/img/Roulette1.webp' },
  { id: 281, title: 'Roulette 2', image: '/img/Roulette2.webp' },
  { id: 282, title: 'Roulette Advanced', image: '/img/RouletteAdvanced.webp' },
  { id: 283, title: 'Roulette American', image: '/img/RouletteAmerican.webp' },
  { id: 284, title: 'Roulette Classic', image: '/img/RouletteClassic.webp' },
  { id: 285, title: 'Roulette EU', image: '/img/RouletteEU.webp' },
  { id: 286, title: 'Roulette Spanish 1', image: '/img/RouletteSpanish1.webp' },
  { id: 287, title: 'Roulette Spanish 2', image: '/img/RouletteSpanish2.webp' },
  { id: 288, title: 'Roulette X', image: '/img/RouletteX.webp' },
  { id: 289, title: 'Royal Riches Roulette', image: '/img/RoyalRichesRoulette.webp' },
  { id: 290, title: 'Royal Riches Spanish Roulette', image: '/img/RoyalRichesSpanishRoulette.webp' },
  { id: 291, title: 'Speed Roulette', image: '/img/SpeedRoulette.webp' },
  { id: 292, title: 'Speed Roulette 1', image: '/img/SpeedRoulette1.webp' },
  { id: 293, title: 'Speed Roulette 2', image: '/img/SpeedRoulette2.webp' },
  { id: 294, title: 'Turkish Roulette', image: '/img/TurkishRoulette.webp' },
  { id: 295, title: 'Oracle Blaze Roulette', image: '/img/VGL-oracleblazeroulette.200x200squareEN.webp' },
  { id: 296, title: 'Vip American Roulette', image: '/img/VipAmericanRoulette.webp' },
  { id: 297, title: 'VIP Auto Roulette', image: '/img/VIPAutoRoulette.webp' },
  { id: 298, title: 'Vip European Roulette', image: '/img/VipEuropeanRoulette.webp' },
  { id: 299, title: 'Vulcano Roulette', image: '/img/VulcanoRoulette.webp' },
  { id: 300, title: 'XXXtreme Lighting Roulette', image: '/img/XXXtremeLightingRoulette.webp' },
  { id: 301, title: 'Zoom Roulette', image: '/img/ZoomRoulette.webp' },
  { id: 302, title: 'Classic Roulette', image: '/img/ClassicRoulette.webp' },
  { id: 303, title: 'Live Roulette', image: '/img/LiveRoulette.webp' },
  { id: 304, title: 'N1 Roulette', image: '/img/N1Roulette.webp' },
  { id: 305, title: 'Neon Roulette', image: '/img/Neon Roulette_300x300.webp' },
  { id: 306, title: 'Racing Roulette Horses', image: '/img/RacingRouletteHorses.webp' },
  { id: 307, title: 'S1 Roulette', image: '/img/S1Roulette.webp' },
  { id: 308, title: 'S2 Roulette', image: '/img/S2Roulette.webp' },
  { id: 309, title: 'Bulgaria Roulette', image: '/img/VGL-bulgariaroulette.400x400squareEN.webp' },
  { id: 310, title: 'Oracle 360 Roulette', image: '/img/VGL-oracle360roulette.200x200squareEN.webp' },
  { id: 311, title: 'Portomaso Roulette', image: '/img/VGL-portomasoroulette.200x200squareEN.webp' },
  { id: 312, title: '3D Roulette 2066', image: '/img/3DRoulette2066.webp' },
  { id: 313, title: '500x Auto Roulette Imperial', image: '/img/500xAutoRouletteImperial.webp' },
  { id: 314, title: '500x Turkish Roulette', image: '/img/500xTurkishRoulette.webp' },
  { id: 315, title: '777x Galaxy Roulette', image: '/img/777xGalaxyRoulette.webp' },
  { id: 316, title: 'American Roulette (1)', image: '/img/AmericanRoulette(1).webp' },
  { id: 317, title: 'American Roulette (2)', image: '/img/AmericanRoulette(2).webp' },
  { id: 318, title: 'American Roulette', image: '/img/AmericanRoulette.webp' },
  { id: 319, title: 'Auto Lightning Roulette', image: '/img/AutoLightningRoulette.webp' },
  { id: 320, title: 'Auto Roulette', image: '/img/AutoRoulette.webp' },
  { id: 321, title: 'Auto Roulette 1 (1)', image: '/img/AutoRoulette1(1).webp' },
  { id: 322, title: 'Auto Roulette 1', image: '/img/AutoRoulette1.webp' },
  { id: 323, title: 'Auto Roulette Noir', image: '/img/AutoRouletteNoir.webp' },
  { id: 324, title: 'Bucharest Roulette', image: '/img/BucharestRoulette.webp' },
  { id: 325, title: 'Casino Malta Dual Play Roulette', image: '/img/CasinoMaltaDualPlayRoulette.webp' },
  { id: 326, title: 'Casino Roulette', image: '/img/CasinoRoulette.webp' },
  { id: 327, title: 'C Roulette', image: '/img/CRoulette.webp' },
  { id: 328, title: 'Diamond VIP Roulette', image: '/img/DiamondVIPRoulette.webp' },
  { id: 329, title: 'Double Ball Roulette', image: '/img/DoubleBallRoulette.webp' },
  { id: 330, title: 'Dragonara Dual Play Roulette', image: '/img/DragonaraDualPlayRoulette.webp' },
  { id: 331, title: 'D Roulette', image: '/img/DRoulette.webp' },
  { id: 332, title: 'European Roulette (1)', image: '/img/EuropeanRoulette(1).webp' },
];
export const rouletteGames = originalRouletteGames.map(game => ({
    ...game,
    image: createImageUrl(game.image)
}));


// --- Нові дані для Новинок ---
const originalNewGames = [
  { id: 501, title: 'Majestic Spirit', provider: 'Various', image: '/imgnew/MajesticSpirit.webp', launchId: 17033 },
  { id: 502, title: 'Majestic Jaguar', provider: 'Various', image: '/imgnew/MajesticJaguar.webp', launchId: 20089 },
  { id: 503, title: 'Luckys Wild Pub', provider: 'Various', image: '/imgnew/LuckysWildPub.webp', launchId: 16690 },
  { id: 504, title: 'La Dolce Vita Flaming Link', provider: 'Various', image: '/imgnew/LaDolceVitaFlamingLink.webp', launchId: 19739 },
  { id: 505, title: 'Jokers Mega Fortune', provider: 'Various', image: '/imgnew/JokersMegaFortune.webp', launchId: 19915 },
  { id: 506, title: 'Jackpot Joker FEVER', provider: 'Various', image: '/imgnew/JackpotJokerFEVER.webp', launchId: 20478 },
  { id: 507, title: 'Jackpot Blaze', provider: 'Various', image: '/imgnew/JackpotBlaze.webp', launchId: 20512 },
  { id: 508, title: 'Ice Fishing', provider: 'Various', image: '/imgnew/IceFishing.webp', launchId: 8314 },
  { id: 509, title: 'Heavenly Sage', provider: 'Various', image: '/imgnew/HeavenlySage.webp', launchId: 14677 },
  { id: 510, title: 'Gold Gobblers', provider: 'Various', image: '/imgnew/GoldGobblers.webp', launchId: 11933 },
  { id: 511, title: 'Forged In Fortune', provider: 'Various', image: '/imgnew/ForgedInFortune.webp', launchId: 21363 },
  { id: 512, title: 'Extra Crown Classic Buy Bonus', provider: 'Various', image: '/imgnew/ExtraCrownClassicBuyBonus.webp', launchId: 20319 },
  { id: 513, title: 'Dead Mouse Adventures', provider: 'Various', image: '/imgnew/DeadMouseAdventures.webp', launchId: 20099 },
  { id: 514, title: 'Cats Soup', provider: 'Various', image: '/imgnew/CatsSoup.webp', launchId: 20096 },
  { id: 515, title: 'Cash Strike Triple Fire', provider: 'Various', image: '/imgnew/CashStrikeTripleFire.webp', launchId: 4764 },
  { id: 516, title: 'Caribbean Queen', provider: 'Various', image: '/imgnew/CaribbeanQueen.webp', launchId: 18716 },
  { id: 517, title: 'Burning Coins 20', provider: 'Various', image: '/imgnew/BurningCoins20.webp', launchId: 19013 },
  { id: 518, title: 'Bivol Beasts', provider: 'Various', image: '/imgnew/BivolBeasts.webp', launchId: 19490 },
  { id: 519, title: 'Bisonado Prize Match', provider: 'Various', image: '/imgnew/BisonadoPrizeMatch_k.webp', launchId: 20924 },
  { id: 520, title: 'Big Tuna Bonanza', provider: 'Various', image: '/imgnew/BigTunaBonanza.webp', launchId: 4587 },
  { id: 521, title: 'Bigger Bass Splash', provider: 'Various', image: '/imgnew/BiggerBassSplash.webp', launchId: 15857 },
  { id: 522, title: 'Arctic Coins Running Wins', provider: 'Various', image: '/imgnew/ArticCoinsRunningWins.webp', launchId: 13944 },
  { id: 523, title: 'Arena of Fortune', provider: 'Various', image: '/imgnew/ArenaofFortune.webp', launchId: 19756 },
  { id: 524, title: 'All Ways Egypt', provider: 'Various', image: '/imgnew/AllWaysEgypt.webp', launchId: 12397 },
  { id: 525, title: 'Aiko and the Wind Spirit', provider: 'Various', image: '/imgnew/AikoandtheWindSpirit.webp', launchId: 20138 },
  // Знайдено збіг (ID 259)
  { id: 526, title: '3 Tombs', provider: 'Various', image: '/imgnew/3Tombs.webp', launchId: 5330 },
  // Знайдено збіг (ID 87)
  { id: 544, title: 'Sweet Bonanza Super Scatter', provider: 'Various', image: '/imgnew/SweetBonanzaSuperScatter.webp', launchId: 20336 },

  // Знайдено збіг (ID 80)
  { id: 558, title: 'Prestige Crown', provider: 'Various', image: '/imgnew/PrestigeCrown.webp', launchId: 20038 },
  // Знайдено збіг (ID 86 - BGaming версія)
  { id: 559, title: 'Plinko', provider: 'Various', image: '/imgnew/Plinko.webp', launchId: 8968 },

  // Знайдено збіг (ID 71)
  { id: 576, title: 'Lucky Hot Coins', provider: 'Various', image: '/imgnew/LuckyHotCoins.webp', launchId: 20340 },
  // Знайдено збіг (ID 67)

  // Знайдено збіг (ID 72)
  { id: 598, title: 'Dice Invaders', provider: 'Various', image: '/imgnew/DiceInvaders.webp', launchId: 2285 },

  // Знайдено збіг (ID 65)
  { id: 625, title: '888 Bonus Combo', provider: 'Various', image: '/imgnew/888BonusCombo.webp', launchId: 20330 },
  { id: 626, title: '40 Sparkling Crown', provider: 'Various', image: '/imgnew/40SparklingCrown.webp', launchId: 20593 },
  { id: 627, title: '10 Extra Bank', provider: 'Various', image: '/imgnew/10ExtraBank.webp', launchId: 18986 },
  // Знайдено збіг (ID 78)
  { id: 628, title: '4 Horsemen 3 Inferno', provider: 'Various', image: '/imgnew/4Horsemen3Inferno.webp', launchId: 20366 },
  // Знайдено збіг (ID 82 - виправлено пробіли в назві 'LunarWolf' -> 'Lunar Wolf')
  { id: 629, title: '3 Pots of LunarWolfHoldWin', provider: 'Various', image: '/imgnew/3PotsofLunarWolfHoldWin.webp', launchId: 14253 },
  { id: 630, title: '3 Coin Wild Horse', provider: 'Various', image: '/imgnew/3CoinWildHorse.webp', launchId: 20780 },
  { id: 631, title: '1 Reel Wolf Piggies', provider: 'Various', image: '/imgnew/1ReelWolfPiggies.webp', launchId: 20594 },
  // Знайдено збіг (ID 75)
  { id: 632, title: 'Ultimate Golden Dragon Inferno', provider: 'Various', image: '/imgnew/UltimateGoldenDragonInferno.webp', launchId: 21416 },
  // Знайдено збіг (ID 83)
  { id: 633, title: '3x5 Hold The Spin', provider: 'Various', image: '/imgnew/3x5 Hold The Spin..webp', launchId: 20433 },
  { id: 634, title: 'You Can Piggy Bank On It', provider: 'Various', image: '/imgnew/YouCanPiggyBankOnIt.webp', launchId: 20127 },
  // Знайдено збіг (ID 74)
  { id: 635, title: 'Veracruz Wild', provider: 'Various', image: '/imgnew/VeracruzWild.webp', launchId: 23353 },

  { id: 637, title: 'Trinity PowerLink RunningWins', provider: 'Various', image: '/imgnew/TrinityPowerLinkRunningWins.webp', launchId: 19252 },
  { id: 638, title: 'Tiki Runner Clusters', provider: 'Various', image: '/imgnew/TikiRunnerClusters.webp', launchId: 20106 },
  { id: 639, title: 'The Dog Heroes', provider: 'Various', image: '/imgnew/TheDogHeroes.webp', launchId: 4616 },
  { id: 640, title: 'The Big Race HoldNLink', provider: 'Various', image: '/imgnew/TheBigRaceHoldNLink.webp', launchId: 20603 },
  { id: 642, title: 'Master Gems', provider: 'Various', image: '/imgnew/MasterGems.webp', launchId: 20090 },
];
export const newGames = originalNewGames.map(game => ({
    ...game,
    image: createImageUrl(game.image)
}));

// --- Дані для Настільних ігор ---
const originalTableGames = [
  { id: 266, title: "Texas hold'em", image: '/imgtable/1.webp' },
  { id: 267, title: "Blackjack", image: '/imgtable/2.webp' },
  { id: 268, title: "5-Card Draw", image: '/imgtable/3.webp' },
  { id: 269, title: "Baccarat", image: '/imgtable/4.webp' },
  { id: 270, title: "Omaha Poker", image: '/imgtable/5.webp' },
  { id: 271, title: "Texas hold'em", image: '/imgtable/6.webp' },
  { id: 272, title: "Blackjack", image: '/imgtable/7.webp' },
  { id: 273, title: "5-Card Draw", image: '/imgtable/8.webp' },
  { id: 274, title: "Baccarat", image: '/imgtable/9.webp' },
  { id: 275, title: "Omaha Poker", image: '/imgtable/10.webp' },
  // { id: 276, title: 'Video Poker', image: '/imgtable/VideoPoker.jpeg' },
  { id: 277, title: 'Multihand Blackjack VIP', image: '/imgtable/MultihandBlackjackVIP.webp' },
  { id: 278, title: 'Virtual Burning Roulette', image: '/imgtable/VirtualBurningRoulette.webp' },
  { id: 279, title: '3 Card Poker', image: '/imgtable/3CardPoker.webp' },
  { id: 280, title: '3D Roulette 2066', image: '/imgtable/3DRoulette2066.webp' },
  { id: 281, title: 'Aces And Faces', image: '/imgtable/AcesAndFaces.webp' },
  { id: 282, title: 'American Blackjack', image: '/imgtable/AmericanBlackjack.webp' },
  { id: 283, title: 'Auto Roulette', image: '/imgtable/AutoRoulette (1).webp' },
  { id: 284, title: 'Baccarat', image: '/imgtable/Baccarat(1).webp' },
  { id: 285, title: 'Baccarat', image: '/imgtable/Baccarat(2).webp' },
  { id: 286, title: 'Baccarat', image: '/imgtable/Baccarat(3).webp' },
  { id: 287, title: 'Baccarat', image: '/imgtable/Baccarat.webp' },
  { id: 288, title: 'Baccarat 777', image: '/imgtable/Baccarat777.webp' },
  { id: 289, title: 'Baccarat mini', image: '/imgtable/Baccaratmini.webp' },
  { id: 290, title: 'Baccarat PRO', image: '/imgtable/BaccaratPRO.webp' },
  { id: 291, title: 'Baccarat VIP', image: '/imgtable/BaccaratVIP.webp' },
  { id: 292, title: 'Blackjack', image: '/imgtable/Blackjack.webp' },
  { id: 293, title: 'Blackjack Bonus Wheel 1000', image: '/imgtable/BlackjackBonusWheel1000.webp' },
  { id: 294, title: 'Blackjack Gold', image: '/imgtable/BlackjackGold.webp' },
  { id: 295, title: 'Blackjack Lucky Ladies', image: '/imgtable/BlackjackLuckyLadies.webp' },
  { id: 296, title: 'Blackjack MH213', image: '/imgtable/BlackjackMH213.webp' },
  { id: 297, title: 'Blackjack MH Perfect Pairs', image: '/imgtable/BlackjackMHPerfectPairs.webp' },
  { id: 298, title: 'Blackjack MH VIP', image: '/imgtable/BlackjackMHVIP.webp' },
  { id: 299, title: 'Blackjack Multi Hand', image: '/imgtable/BlackJackMultiHand.webp' },
  { id: 300, title: 'Blackjack SH VIP', image: '/imgtable/BlackjackSHVIP.webp' },
  { id: 301, title: 'Blackjack Single Hand', image: '/imgtable/BlackjackSingleHand.webp' },
  { id: 302, title: 'Blackjack VIP', image: '/imgtable/BlackjackVIP(1).webp' },
  { id: 303, title: 'Blackjack VIP', image: '/imgtable/BlackjackVIP.webp' },
  { id: 304, title: 'Bonus Deuces Wild', image: '/imgtable/BonusDeucesWild.webp' },
  { id: 305, title: 'Bucharest Roulette', image: '/imgtable/BucharestRoulette.webp' },
  { id: 306, title: 'Caribbean Stud Poker', image: '/imgtable/CaribbeanStudPoker.webp' },
  { id: 307, title: 'Casino Holdem', image: '/imgtable/CasinoHoldem.webp' },
  { id: 308, title: 'Casino Roulette', image: '/imgtable/CasinoRoulette.webp' },
  { id: 309, title: 'Choco Reels', image: '/imgtable/ChocoReels.webp' },
  { id: 310, title: 'Christmas Storm', image: '/imgtable/ChristmasStorm.webp' },
  { id: 311, title: 'Cleopatras Gems Bingo', image: '/imgtable/CleopatrasGemsBingo.webp' },
  { id: 312, title: 'Domino Go', image: '/imgtable/DominoGo.webp' },
  { id: 313, title: 'European Roulette', image: '/imgtable/EuropeanRoulette(1).webp' },
  { id: 314, title: 'European Roulette', image: '/imgtable/EuropeanRoulette.webp' },
  { id: 315, title: 'European Roulette VIP', image: '/imgtable/EuropeanRouletteVIP.webp' },
  { id: 316, title: 'Extreme Texas Holdem', image: '/imgtable/ExtremeTexasHoldem.webp' },
  { id: 317, title: 'First Person Deal or No Deal', image: '/imgtable/FirstPersonDealorNoDeal.webp' },
  { id: 318, title: 'Fortune Roulette', image: '/imgtable/FortuneRoulette.webp' },
  { id: 319, title: 'Golden 10', image: '/imgtable/Golden10.webp' },
  { id: 320, title: 'Gold Roulette', image: '/imgtable/GoldRoulette.webp' },
  { id: 321, title: 'Jacks Or Better', image: '/imgtable/JacksOrBetter.webp' },
  { id: 322, title: 'Multihand Blackjack', image: '/imgtable/Multihand Blackjack.webp' },
  { id: 323, title: 'Premium European Blackjack', image: '/imgtable/PremiumEuropeanBlackjack.webp' },
  { id: 324, title: 'Romanian Blackjack X1', image: '/imgtable/RomanianBlackjackX1.webp' },
  { id: 325, title: 'Romanian Blackjack X2', image: '/imgtable/RomanianBlackjackX2.webp' },
  { id: 326, title: 'Romanian Blackjack X3', image: '/imgtable/RomanianBlackjackX3.webp' },
  { id: 327, title: 'Roulette', image: '/imgtable/Roulette.webp' },
  { id: 328, title: 'Roulette Classic', image: '/imgtable/RouletteClassic.webp' },
  { id: 329, title: 'Roulette EU', image: '/imgtable/RouletteEU.webp' },
  { id: 330, title: 'Sic Bo', image: '/imgtable/SicBo(1).webp' },
  { id: 331, title: 'Sic Bo', image: '/imgtable/SicBo.webp' },
  { id: 332, title: 'Single Deck Blackjack', image: '/imgtable/SingleDeckBlackjack.webp' },
  { id: 339, title: 'Video Poker', image: '/imgtable/VideoPoker.webp' },
];
export const Table = originalTableGames.map(game => ({
    ...game,
    image: createImageUrl(game.image)
}));














