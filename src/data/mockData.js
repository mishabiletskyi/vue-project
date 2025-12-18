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
  { name: 'Gates of Olympus', image: '/img/rbarimg1.webp' },
  { name: 'Sweet Bonanza', image: '/img/rbarimg2.webp' },
  { name: 'The Dog House', image: '/img/rbarimg3.webp' },
  { name: 'Book Of Ra', image: '/img/BookOfRa.webp' },
  { name: 'Hell Hot 100', image: '/img/HellHot100.webp' },
  { name: 'Sugar Rush', image: '/img/SugarRush.webp' },
  { name: '5 Fruit Invaders', image: '/img/5FruitInvaders.webp' },
  { name: 'Joker Stoker', image: '/img/JokerStoker.webp' },
  { name: 'Crown Coins', image: '/img/CrownCoins.webp' },
  { name: 'Diamond Mines', image: '/img/DiamondMines.webp' },
  { name: 'Legacy Of The Sages', image: '/img/LegacyOfTheSages.webp' },
  { name: 'Gonzo\'s Quest', image: '/img/GonzosQuest.webp' },
  { name: 'Starburst', image: '/img/rbarimg2.webp' },
  { name: 'Tutankhamuns Thomb', image: '/img/TutankhamunsThomb.webp' },
  { name: 'Money Minter', image: '/img/MoneyMinter.webp' },
  { name: 'Neon Roulette', image: '/img/Neon Roulette_300x300.webp' },
  { name: 'Auto Roulette 1', image: '/img/AutoRoulette1.webp' },
  { name: 'Fruit Party 1', image: '/img/FruitParty1.webp' },
  { name: 'Book of Ra Magic', image: '/img/BookofRaMagic.webp' },
  { name: 'Book Of Rebirth', image: '/img/BookOfRebirth.webp' },
  { name: 'The Dog House Multihold', image: '/img/TheDogHouseMultihold.webp' },
  { name: 'Cleocatra', image: '/img/Cleocatra.webp' },
  { name: '100 Super Hot', image: '/img/100SuperHot.webp' },
  { name: 'Shining Crown', image: '/img/ShiningCrown.webp' },
  { name: '888 Bonus Combo', image: '/img/888BonusCombo.webp' },
  { name: 'The Grand Rooster Hold And Win', image: '/img/TheGrandRoosterHoldAndWin.webp' },
  { name: 'Futuristic Fruits', image: '/img/FuturisticFruits.webp' },
  { name: 'Hells Hot 7s', image: '/img/HellsHot7s.webp' },
  { name: 'Johns Book', image: '/img/JohnsBook.webp' },
  { name: 'Oath of Steel', image: '/img/OathofSteel.webp' },
  { name: 'Lucky Hot Coins', image: '/img/LuckyHotCoins.webp' },
  { name: 'Dice Invaders', image: '/img/DiceInvaders.webp' },
  { name: 'Lucky Ladys Charm Deluxe Buy Bonus', image: '/img/LuckyLadysCharmDeluxeBuyBonus.webp' },
  { name: 'Veracruz Wild', image: '/img/VeracruzWild.webp' },
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

// --- Великий список ігор для сторінки "Слоти" та інших ---
// const originalAllGames = [
//   // --- Твої початкові 10 ігор ---
//   { id: 1, 'title': 'Book of Ra Deluxe', provider: 'Novomatic', image: '/img/BookOfRa.webp', demoUrl: 'https://demo.monkeyboxsrv.com/demo/fullstate/html5/novomatic/bookofradeluxe' },
//   { id: 2, 'title': 'Sweet Bonanza', provider: 'Pragmatic Play', image: '/img/SweetBonanza.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitsw' },
//   { id: 3, 'title': 'The Dog House', provider: 'Pragmatic Play', image: '/img/TheDogHouse.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vswaysdogs&websiteUrl=https://demogamesfree.pragmaticplay.net' },
//   { id: 4, 'title': 'Tutankhamuns Thomb', provider: 'NetEnt', image: '/img/TutankhamunsThomb.webp', demoUrl: 'https://api-ire1.25aura.lat/api/brands/launcher/159abb93c9244739a63232604282c710' },
//   { id: 5, 'title': 'Sugar Rush', provider: 'Pragmatic Play', image: '/img/SugarRush.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?jurisdiction=99&lang=en&cur=USD&gameSymbol=vs20sugarrush' },
//   { id: 6, 'title': 'Crown & Coins', provider: 'Endorphina', image: '/img/CrownCoins.webp', demoUrl: 'https://edemo.endorphina.com/session/open/sid/5b5dce8875e66ed7fa998d2cffaa66e6' },
//   { id: 7, 'title': 'Diamond Mines', provider: 'Reflex Gaming', image: '/img/DiamondMines.webp', demoUrl: 'https://api-ire1.25aura.lat/api/brands/launcher/48bed5998fad49698a486e8258f0b2db' },
//   { id: 8, 'title': 'Legacy Of The Sages', provider: 'Play\'n GO', image: '/img/LegacyOfTheSages.webp', demoUrl: 'https://demo.evoplay.games/demo/fullstate/html5/evoplay/legacyofthesagesbb' },
//   { id: 9, 'title': 'Joker Stoker', provider: 'Endorphina', image: '/img/JokerStoker.webp', demoUrl: 'https://edemo.endorphina.com/session/open/sid/072dd47949b69bff290b6db4904b38a4' },
//   { id: 10, 'title': 'Hell Hot 100', provider: 'Endorphina', image: '/img/HellHot100.webp', demoUrl: 'https://edemo.endorphina.com/session/open/sid/c37f0b32913f162ed020f781e6d466a4' },

//   // --- Додані та знайдені посилання (Pragmatic Play та інші статичні) ---
//   // Примітка: Я виправив провайдера на Pragmatic Play там, де впізнав гру, щоб посилання працювало.
  
//   { id: 11, 'title': 'Gonzo\'s Quest', provider: 'NetEnt', image: '/img/GonzosQuest.webp', demoUrl: '' }, // NetEnt вимагає сесійний лаунчер
//   { id: 12, 'title': '5 Fruit Invaders', provider: 'Amigo Gaming', image: '/img/5FruitInvaders.webp', demoUrl: '' },
//   { id: 13, 'title': 'Gates of Olympus', provider: 'Pragmatic Play', image: '/img/rbarimg1.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20olympgate' },
//   { id: 14, 'title': 'Tutankhamuns Thomb', provider: 'Play\'n GO', image: '/img/TutankhamunsThomb.webp', demoUrl: '' },
//   { id: 15, 'title': 'Money Minter', provider: 'Relax Gaming', image: '/img/MoneyMinter.webp', demoUrl: '' },
//   { id: 16, 'title': 'Blackjack', provider: 'Evolution', image: '/img/Blackjack.webp', demoUrl: '' }, // Evolution не має відкритих демо-посилань без казино
//   { id: 17, 'title': 'One Hand Blackjack', provider: 'Pragmatic Play', image: '/img/OneHandBlackjack.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=bj_one_hand' },
//   { id: 18, 'title': 'Goal', provider: 'NetEnt', image: '/img/Goal.webp', demoUrl: '' },
//   { id: 19, 'title': 'Turbo Mines', provider: 'Microgaming', image: '/img/TurboMines.webp', demoUrl: '' },
//   { id: 20, 'title': 'Plinko', provider: 'Playtech', image: '/img/plinko.webp', demoUrl: '' },
//   { id: 21, 'title': 'Cosmo X', provider: 'IGT', image: '/img/CosmoX.webp', demoUrl: '' },
//   { id: 22, 'title': 'Aviator', provider: 'Spribe', image: '/img/Aviator.webp', demoUrl: 'https://aviator-demo.spribe.io/' }, // Провайдер Spribe, посилання пряме
//   { id: 23, 'title': 'Dice Twice', provider: 'Quickspin', image: '/img/DiceTwice.webp', demoUrl: '' },
//   { id: 24, 'title': 'FruitsonIce', provider: 'Red Tiger Gaming', image: '/img/FruitsonIce.webp', demoUrl: '' },
//   { id: 25, 'title': '100JuicyFruits', provider: 'Big Time Gaming', image: '/img/100JuicyFruits.webp', demoUrl: '' },
//   { id: 26, 'title': 'European Roulette VIP', provider: 'Blueprint Gaming', image: '/img/EuropeanRouletteVIP.webp', demoUrl: '' },
//   { id: 28, 'title': 'American Blackjack', provider: 'Thunderkick', image: '/img/AmericanBlackjack(1).webp', demoUrl: '' },
//   { id: 29, 'title': 'Texas Holdem', provider: 'Relax Gaming', image: '/img/TexasHoldem.webp', demoUrl: '' },
//   { id: 30, 'title': 'Vegas Holdem', provider: 'Wazdan', image: '/img/VegasHoldem.webp', demoUrl: '' },
//   { id: 31, 'title': 'Romanian Blackjack X3', provider: 'Endorphina', image: '/img/RomanianBlackjackX3.webp', demoUrl: '' },
//   { id: 32, 'title': 'Auto Roulette (1)', provider: 'Hacksaw Gaming', image: '/img/AutoRoulette (1).webp', demoUrl: '' },
//   { id: 33, 'title': 'Vip European Roulette', provider: 'Push Gaming', image: '/img/VipEuropeanRoulette.webp', demoUrl: '' },
//   { id: 34, 'title': 'American Blackjack', provider: 'Nolimit City', image: '/img/AmericanBlackjack.webp', demoUrl: '' },
//   { id: 35, 'title': 'European Roulette', provider: 'BGaming', image: '/img/EuropeanRoulette.webp', demoUrl: 'https://demo.bgaming-network.com/games/EuropeanRoulette/FUN?play_token=TOKEN' },
//   { id: 36, 'title': 'Sevens Joy', provider: 'Amatic', image: '/img/SevensJoy.webp', demoUrl: '' },
//   { id: 37, 'title': 'Mummys Jewels', provider: 'EvoPlay', image: '/img/MummysJewels.webp', demoUrl: '' },
//   { id: 38, 'title': 'Coins Of Alkemor Extreme Magic', provider: 'Playson', image: '/img/CoinsOfAlkemorExtremeMagic.webp', demoUrl: '' },
//   { id: 39, 'title': 'BoxofRa', provider: 'Booongo', image: '/img/BoxofRa.webp', demoUrl: '' },
//   { id: 40, 'title': 'Majestic Cleopatra', provider: 'Tom Horn Gaming', image: '/img/MajesticCleopatra.webp', demoUrl: '' },
//   { id: 41, 'title': 'Book Of Winners Lotto', provider: 'Spinomenal', image: '/img/BookOfWinnersLotto.webp', demoUrl: '' },
//   { id: 42, 'title': 'Demi Gods VI', provider: 'Pariplay', image: '/img/DemiGodsVI.webp', demoUrl: '' },
//   { id: 43, 'title': 'CrownCoins', provider: 'Betsoft', image: '/img/CrownCoins.webp', demoUrl: '' },
//   { id: 56, 'title': 'Neon Roulette', provider: 'Spinomenal', image: '/img/Neon Roulette_300x300.webp', demoUrl: '' },
//   { id: 57, 'title': 'Auto Roulette 1', provider: 'Playtech', image: '/img/AutoRoulette1.webp', demoUrl: '' },
//   { id: 58, 'title': 'Fruit Party 1', provider: 'Pragmatic Play', image: '/img/FruitParty1.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitparty' },
//   { id: 59, 'title': 'Book of Ra Magic', provider: 'Novomatic', image: '/img/BookofRaMagic.webp', demoUrl: '' },
//   { id: 60, 'title': 'Book Of Rebirth', provider: 'Spinomenal', image: '/img/BookOfRebirth.webp', demoUrl: '' },
//   { id: 61, 'title': 'The Dog House Multihold', provider: 'Pragmatic Play', image: '/img/TheDogHouseMultihold.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20doghousemh' },
//   { id: 62, 'title': 'Cleocatra', provider: 'Pragmatic Play', image: '/img/Cleocatra.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20cleocatra' },
//   { id: 63, 'title': '100 Super Hot', provider: 'EGT (Amusnet)', image: '/img/100SuperHot.webp', demoUrl: '' },
//   { id: 64, 'title': 'Shining Crown', provider: 'EGT (Amusnet)', image: '/img/ShiningCrown.webp', demoUrl: '' },
//   { id: 65, 'title': '888 Bonus Combo', provider: 'Big Time Gaming', image: '/img/888BonusCombo.webp', demoUrl: '' },
//   { id: 66, 'title': 'The Grand Rooster Hold And Win', provider: 'EvoPlay', image: '/img/TheGrandRoosterHoldAndWin.webp', demoUrl: '' },
//   { id: 67, 'title': 'Futuristic Fruits', provider: 'Betsoft', image: '/img/FuturisticFruits.webp', demoUrl: '' },
//   { id: 68, 'title': 'Hells Hot 7s', provider: 'Nolimit City', image: '/img/HellsHot7s.webp', demoUrl: '' },
//   { id: 69, 'title': 'Johns Book', provider: 'Quickspin', image: '/img/JohnsBook.webp', demoUrl: '' },
//   { id: 70, 'title': 'Oath of Steel', provider: 'Push Gaming', image: '/img/OathofSteel.webp', demoUrl: '' },
//   { id: 71, 'title': 'Lucky Hot Coins', provider: 'Red Tiger Gaming', image: '/img/LuckyHotCoins.webp', demoUrl: '' },
//   { id: 72, 'title': 'Dice Invaders', provider: 'Evolution', image: '/img/DiceInvaders.webp', demoUrl: '' },
//   { id: 73, 'title': 'Lucky Ladys Charm Deluxe Buy Bonus', provider: 'Novomatic', image: '/img/LuckyLadysCharmDeluxeBuyBonus.webp', demoUrl: '' },
//   { id: 74, 'title': 'Veracruz Wild', provider: 'Relax Gaming', image: '/img/VeracruzWild.webp', demoUrl: '' },
//   { id: 75, 'title': 'Ultimate Golden Dragon Inferno', provider: 'Evolution', image: '/img/UltimateGoldenDragonInferno.webp', demoUrl: '' },
//   { id: 76, 'title': 'Queen of Sirens', provider: 'BGaming', image: '/img/QueenofSirens.webp', demoUrl: '' },
//   { id: 77, 'title': 'Bounty Expand 25', provider: 'Evolution', image: '/img/BountyExpand25.webp', demoUrl: '' },
//   { id: 78, 'title': '4 Horsemen 3 Inferno', provider: 'Betsoft', image: '/img/4Horsemen3Inferno.webp', demoUrl: '' },
//   { id: 79, 'title': 'Fortune Bags', provider: 'ELK Studios', image: '/img/FortuneBags.webp', demoUrl: '' },
//   { id: 80, 'title': 'Prestige Crown', provider: 'Microgaming', image: '/img/PrestigeCrown.webp', demoUrl: '' },
//   { id: 81, 'title': 'Hades Infernal Blaze', provider: 'Microgaming', image: '/img/HadesInfernalBlaze.webp', demoUrl: '' },
//   { id: 82, 'title': '3 Pots of Lunar Wolf Hold Win', provider: 'Quickspin', image: '/img/3PotsofLunarWolfHoldWin.webp', demoUrl: '' },
//   { id: 83, 'title': '3x5 Hold The Spin', provider: 'Playtech', image: '/img/3x5 Hold The Spin..webp', demoUrl: '' },
//   { id: 84, 'title': 'Bastet', provider: 'Endorphina', image: '/img/Bastet.webp', demoUrl: '' },
//   { id: 85, 'title': 'Bonbon Pop', provider: 'Yggdrasil', image: '/img/BonbonPop.webp', demoUrl: '' },
//   { id: 86, 'title': 'Plinko', provider: 'BGaming', image: '/img/Plinko.webp', demoUrl: 'https://demo.bgaming-network.com/games/Plinko/FUN?play_token=TOKEN' },
//   { id: 87, 'title': 'Sweet Bonanza Super Scatter', provider: 'Pragmatic Play', image: '/img/SweetBonanzaSuperScatter.webp', demoUrl: '' },
//   { id: 88, 'title': 'Moon Guardians', provider: 'Wazdan', image: '/img/MoonGuardians.webp', demoUrl: '' },
//   { id: 89, 'title': 'Magnify Man', provider: 'Fugaso', image: '/img/MagnifyMan.webp', demoUrl: '' },
//   { id: 90, 'title': 'Jungle Stripes', provider: 'Betsoft', image: '/img/JungleStripes.webp', demoUrl: '' },
//   { id: 91, 'title': '7 Fortune Frenzy', provider: 'Betsoft', image: '/img/7FortuneFrenzy.webp', demoUrl: '' },
//   { id: 92, 'title': 'Joker Coins Megaways', provider: 'Evolution', image: '/img/JokerCoinsMegaways.webp', demoUrl: '' },
//   { id: 93, 'title': 'Book of Bamboo', provider: 'Big Time Gaming', image: '/img/BookofBamboo.webp', demoUrl: '' },
//   { id: 94, 'title': 'Doctor Winstein Buy Bonus', provider: 'Endorphina', image: '/img/DoctorWinsteinBuyBonus.webp', demoUrl: '' },
//   { id: 95, 'title': 'Golden Dragon Inferno', provider: 'Betsoft', image: '/img/GoldenDragonInferno.webp', demoUrl: '' },
//   { id: 96, 'title': 'Hearts Desire NJP', provider: 'Betsoft', image: '/img/HeartsDesireNJP.webp', demoUrl: '' },
//   { id: 97, 'title': 'Clover Wheel', provider: 'Blueprint Gaming', image: '/img/CloverWheel.webp', demoUrl: '' },
//   { id: 98, 'title': '20 Mega Star', provider: 'Yggdrasil', image: '/img/20MegaStar.webp', demoUrl: '' },
//   { id: 99, 'title': 'Poseidons Rising', provider: 'Spinomenal', image: '/img/PoseidonsRising.webp', demoUrl: '' },
//   { id: 100, 'title': 'The Great Cabaret', provider: 'Pragmatic Play', image: '/img/TheGreatCabaret.webp', demoUrl: '' }, // Ймовірно помилка в назві, у Pragmatic немає такої популярної гри з такою точною назвою
//   { id: 101, 'title': 'Royal Treasures', provider: 'BGaming', image: '/img/RoyalTreasures.webp', demoUrl: '' },
//   { id: 102, 'title': 'Story Of Hercules', provider: 'Spinomenal', image: '/img/StoryOfHercules.webp', demoUrl: '' },
//   { id: 103, 'title': 'Rags to Witches', provider: 'Betsoft', image: '/img/RagstoWitches.webp', demoUrl: '' },
//   { id: 104, 'title': 'Wild Double Up', provider: 'Betsoft', image: '/img/WildDoubleUp.webp', demoUrl: '' },
//   { id: 105, 'title': 'Secrets Of Atlantis', provider: 'NetEnt', image: '/img/SecretsOfAtlantis.webp', demoUrl: '' },
//   { id: 106, 'title': '2500xRush', provider: 'Playtech', image: '/img/2500xRush.webp', demoUrl: '' },
//   { id: 107, 'title': 'Coin Galactic', provider: 'Quickspin', image: '/img/CoinGalactic.webp', demoUrl: '' },
//   { id: 108, 'title': 'Pho Sho', provider: 'Betsoft', image: '/img/PhoSho.webp', demoUrl: '' },
//   { id: 109, 'title': 'Good Luck Spell', provider: 'Playson', image: '/img/GoodLuckSpell.webp', demoUrl: '' },
//   { id: 110, 'title': 'Fruit Boost', provider: 'Pariplay', image: '/img/FruitBoost.webp', demoUrl: '' },
//   { id: 111, 'title': 'Glow Dig', provider: 'Pragmatic Play', image: '/img/GlowDig.webp', demoUrl: '' },
//   { id: 112, 'title': 'Demi Gods 5 Hold & Hit', provider: 'Spinomenal', image: '/img/DemiGods5Hold&Hit.webp', demoUrl: '' },
//   { id: 113, 'title': 'Rise Of Triton', provider: 'Betsoft', image: '/img/RiseOfTriton.webp', demoUrl: '' },
//   { id: 114, 'title': 'Joker Coins', provider: 'Yggdrasil', image: '/img/JokerCoins.webp', demoUrl: '' },
//   { id: 115, 'title': 'Wild Spin', provider: 'Platipus', image: '/img/WildSpin.webp', demoUrl: '' },
//   { id: 116, 'title': 'Lucky Numbers x12', provider: 'Hacksaw', image: '/img/LuckyNumbersx12.webp', demoUrl: '' },
//   { id: 117, 'title': 'Kitchen Hot', provider: 'Pariplay', image: '/img/KitchenHot.webp', demoUrl: '' },
//   { id: 118, 'title': 'Book Of Sirens', provider: 'Spinomenal', image: '/img/BookOfSirens.webp', demoUrl: '' },
//   { id: 119, 'title': 'King Kong Cashpots', provider: 'Blueprint', image: '/img/KingKongCashpots.webp', demoUrl: '' },
//   { id: 120, 'title': 'The Book Of Patagonia', provider: 'Betsoft', image: '/img/TheBookOfPatagonia.webp', demoUrl: '' },
//   { id: 121, 'title': 'Majestic King Ice Kingdom', provider: 'Spinomenal', image: '/img/MajesticKingIceKingdom.webp', demoUrl: '' },
//   { id: 122, 'title': 'Power Stars', provider: 'Novomatic', image: '/img/PowerStars.webp', demoUrl: '' },
//   { id: 123, 'title': '20 Shining Coins', provider: 'Push Gaming', image: '/img/20ShiningCoins.webp', demoUrl: '' },
//   { id: 124, 'title': 'Gryphons Gold', provider: 'Novomatic', image: '/img/GryphonsGold.webp', demoUrl: '' },
//   { id: 125, 'title': 'April Fury and the Chamber of Scarabs', provider: 'Betsoft', image: '/img/AprilFuryandtheChamberofScarabs.webp', demoUrl: '' },
//   { id: 126, 'title': 'Sizzling Super Sevens', provider: 'BGaming', image: '/img/SizzlingSuperSevens.webp', demoUrl: '' },
//   { id: 127, 'title': 'Royal Harvest', provider: 'Wazdan', image: '/img/RoyalHarvest.webp', demoUrl: '' },
//   { id: 128, 'title': 'Sweets Hot', provider: 'Nolimit City', image: '/img/SweetsHot.webp', demoUrl: '' },
//   { id: 129, 'title': 'Coininfinity Surge Reel', provider: 'Nolimit City', image: '/img/CoininfinitySurgeReel.webp', demoUrl: '' },
//   { id: 130, 'title': 'Carnival Cat Bonus Combo', provider: 'Playtech', image: '/img/CarnivalCatBonusCombo.webp', demoUrl: '' },
//   { id: 131, 'title': 'Hot Triple Sevens', provider: 'EvoPlay', image: '/img/Hot Triple Sevens .webp', demoUrl: '' },
//   { id: 132, 'title': 'Book Of Demi Gods 2', provider: 'Spinomenal', image: '/img/BookOfDemiGods2.webp', demoUrl: '' },
//   { id: 133, 'title': 'Wolf Fang', provider: 'Spinomenal', image: '/img/WolfFang.webp', demoUrl: '' },
//   { id: 134, 'title': 'Book Hotfire Buy Bonus', provider: 'Spinomenal', image: '/img/BookHotfireBuyBonus.webp', demoUrl: '' },
//   { id: 135, 'title': 'Take The Bank', provider: 'Betsoft', image: '/img/TakeTheBank.webp', demoUrl: '' },
//   { id: 136, 'title': 'Sunny Coin Hold The Spin', provider: 'Gamzix', image: '/img/SunnyCoinHoldTheSpin.webp', demoUrl: '' },
//   { id: 137, 'title': 'Majestic King', provider: 'Spinomenal', image: '/img/340x340_MajesticKing_EN.webp', demoUrl: '' },
//   { id: 138, 'title': 'Diamonds Hunt', provider: 'Pragmatic Play', image: '/img/DiamondsHunt.webp', demoUrl: '' },
//   { id: 139, 'title': 'The Easter Catch', provider: 'Playtech', image: '/img/TheEasterCatch.webp', demoUrl: '' },
//   { id: 140, 'title': 'Wild Witches', provider: 'NetEnt', image: '/img/WildWitches.webp', demoUrl: '' },
//   { id: 141, 'title': 'Cats Blessing', provider: 'Playtech', image: '/img/CatsBlessing.webp', demoUrl: '' },
//   { id: 142, 'title': 'Fairytale Beauties', provider: 'Spinomenal', image: '/img/FairytaleBeauties.webp', demoUrl: '' },
//   { id: 143, 'title': 'Sizzling Sevens Hold & Win', provider: 'Pragmatic Play', image: '/img/sizzlingsevenshold&win.webp', demoUrl: '' },
//   { id: 144, 'title': 'Dolphins Pearl Deluxe', provider: 'Novomatic', image: '/img/DolphinsPearlDeluxe.webp', demoUrl: '' },
//   { id: 145, 'title': 'Take The Vault', provider: 'Betsoft', image: '/img/TakeTheVault.webp', demoUrl: '' },
//   { id: 146, 'title': 'Cossacks', provider: 'Big Time Gaming', image: '/img/Cossacks.webp', demoUrl: '' },
//   { id: 147, 'title': 'Aztec Spell Forgotten Empire 1', provider: 'Spinomenal', image: '/img/AztecSpellForgottenEmpire-1.webp', demoUrl: '' },
//   { id: 148, 'title': 'Ultra Luck', provider: 'Gamzix', image: '/img/UltraLuck.webp', demoUrl: '' },
//   { id: 149, 'title': 'Striking Diamond Link', provider: 'Relax Gaming', image: '/img/StrikingDiamondLink.webp', demoUrl: '' },
//   { id: 150, 'title': 'The Big Chili', provider: 'Pragmatic Play', image: '/img/TheBigChili.webp', demoUrl: '' },
//   { id: 151, 'title': 'Book Of Demi Gods V', provider: 'Spinomenal', image: '/img/BookOfDemiGodsV.webp', demoUrl: '' },
//   { id: 152, 'title': 'Sun Crown', provider: 'Push Gaming', image: '/img/SunCrown.webp', demoUrl: '' },
//   { id: 153, 'title': 'Wolf Fang Supermoon', provider: 'Spinomenal', image: '/img/WolfFangSupermoon.webp', demoUrl: '' },
//   { id: 154, 'title': 'Wild Crowns', provider: 'Platipus', image: '/img/WildCrowns.webp', demoUrl: '' },
//   { id: 155, 'title': 'Gates Of Anubis', provider: 'Betsoft', image: '/img/GatesOfAnubis.webp', demoUrl: '' },
//   { id: 156, 'title': 'Detective Donut', provider: 'Popiplay', image: '/img/DetectiveDonut.webp', demoUrl: '' },
//   { id: 157, 'title': 'Bunnys Bounty Hold N Link', provider: 'NetGame', image: '/img/BunnysBountyHoldNlink.webp', demoUrl: '' },
//   { id: 158, 'title': 'Coins Of Zeus', provider: 'Betsoft', image: '/img/CoinsOfZeus.webp', demoUrl: '' },
//   { id: 159, 'title': 'Big Joker', provider: 'Yggdrasil', image: '/img/BigJoker.webp', demoUrl: '' },
//   { id: 160, 'title': 'Royal Xmass 2', provider: 'Endorphina', image: '/img/RoyalXmass2.webp', demoUrl: '' },
//   { id: 161, 'title': 'Tap Craze', provider: 'Evolution', image: '/img/TapCraze.webp', demoUrl: '' },
//   { id: 162, 'title': 'Fruit Salsa', provider: 'Evolution', image: '/img/FruitSalsa.webp', demoUrl: '' },
//   { id: 163, 'title': 'Golden Piggy Bank', provider: 'Spinomenal', image: '/img/GoldenPiggyBank.webp', demoUrl: '' },
//   { id: 164, 'title': 'Area 69', provider: 'Popiplay', image: '/img/Area69.webp', demoUrl: '' },
//   { id: 165, 'title': 'Coins Of Ra', provider: 'Betsoft', image: '/img/CoinsOfRa.webp', demoUrl: '' },
//   { id: 166, 'title': 'Hot Volcano', provider: 'Evoplay', image: '/img/HotVolcano.webp', demoUrl: '' },
//   { id: 167, 'title': 'Tap The Pot', provider: 'Blueprint Gaming', image: '/img/TapThePot.webp', demoUrl: '' },
//   { id: 168, 'title': 'Fruits and Bells', provider: 'Fazi', image: '/img/FruitsandBells.webp', demoUrl: '' },
//   { id: 169, 'title': 'Sunny Coin 2', provider: 'Gamzix', image: '/img/SunnyCoin2.webp', demoUrl: '' },
//   { id: 170, 'title': 'Cassiopeia', provider: 'Blueprint Gaming', image: '/img/Cassiopeia.webp', demoUrl: '' },
//   { id: 171, 'title': 'Charming Ladys Boom', provider: 'Novomatic', image: '/img/CharmingLadysBoom.webp', demoUrl: '' },
//   { id: 172, 'title': 'Roaring Forties', provider: 'Novomatic', image: '/img/RoaringForties.webp', demoUrl: '' },
//   { id: 173, 'title': 'Plenty of Fruit 40', provider: 'Novomatic', image: '/img/PlentyofFruit40.webp', demoUrl: '' },
//   { id: 174, 'title': 'Sevens Heat 20', provider: 'Push Gaming', image: '/img/SevensHeat20.webp', demoUrl: '' },
//   { id: 175, 'title': 'Wild Spin Deluxe', provider: 'Platipus', image: '/img/WildSpinDeluxe.webp', demoUrl: '' },
//   { id: 176, 'title': '7 Hot Fruits', provider: 'Playson', image: '/img/7HotFruits.webp', demoUrl: '' },
//   { id: 177, 'title': 'Pome Race Sun Link 10', provider: 'Blueprint Gaming', image: '/img/PomeRaceSunLink10.webp', demoUrl: '' },
//   { id: 178, 'title': '25 Coins', provider: 'Wazdan', image: '/img/25Coins.webp', demoUrl: '' },
//   { id: 179, 'title': 'Piggy Coins', provider: 'Relax Gaming', image: '/img/PiggyCoins.webp', demoUrl: '' },
//   { id: 180, 'title': 'Big Catch Bonanza Perfect Haul', provider: 'Evolution', image: '/img/BigCatchBonanzaPerfectHaul.webp', demoUrl: '' },
//   { id: 181, 'title': 'Dinopolis', provider: 'Push Gaming', image: '/img/Dinopolis.webp', demoUrl: '' },
//   { id: 182, 'title': 'Hot and Spicy Jackpot', provider: 'Onlyplay', image: '/img/HotandSpicyJackpot.webp', demoUrl: '' },
//   { id: 183, 'title': 'Chaos Crew', provider: 'Hacksaw Gaming', image: '/img/ChaosCrew.webp', demoUrl: '' },
//   { id: 184, 'title': 'Forge of Olympus', provider: 'Pragmatic Play', image: '/img/ForgeofOlympus.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20forge' },
//   { id: 185, 'title': 'A Big Catch', provider: 'Nolimit City', image: '/img/ABigCatch.webp', demoUrl: '' },
//   { id: 186, 'title': 'Majestic White Rhino', provider: 'Spinomenal', image: '/img/MajesticWhiteRhin.webp', demoUrl: '' },
//   { id: 187, 'title': 'Luck of Panda Bonus Combo', provider: 'Playtech', image: '/img/LuckofPandaBonusCombo.webp', demoUrl: '' },
//   { id: 188, 'title': 'Hot Slot Lotto', provider: 'Evolution', image: '/img/HotSlotLotto.webp', demoUrl: '' },
//   { id: 189, 'title': 'Sevens Heat 40', provider: 'Relax Gaming', image: '/img/SevensHeat40.webp', demoUrl: '' },
//   { id: 190, 'title': 'Scratch Match', provider: 'Evoplay', image: '/img/ScratchMatch.webp', demoUrl: '' },
//   { id: 191, 'title': 'Luck of Tiger', provider: 'Microgaming', image: '/img/LuckofTiger.webp', demoUrl: '' },
//   { id: 192, 'title': 'Hot Sevens', provider: 'Playson', image: '/img/HotSevens.webp', demoUrl: '' },
//   { id: 193, 'title': 'Young Buffalo Song', provider: 'Pragmatic Play', image: '/img/YoungBuffaloSong.webp', demoUrl: '' },
//   { id: 194, 'title': 'The Greatest Catch Bonus Buy', provider: 'Evoplay', image: '/img/TheGreatestCatchBonusBuy.webp', demoUrl: '' },
//   { id: 195, 'title': 'Fruits Coins', provider: 'Playson', image: '/img/FruitsCoins.webp', demoUrl: '' },
//   { id: 196, 'title': 'Dogmasons Mega WOOF', provider: 'Popiplay', image: '/img/DogmasonsMegaWOOF.webp', demoUrl: '' },
//   { id: 197, 'title': 'Mega Wild Fruits', provider: 'Spinomenal', image: '/img/MegaWildFruits.webp', demoUrl: '' },
//   { id: 198, 'title': 'Super Chili', provider: 'Evoplay', image: '/img/SuperChili.webp', demoUrl: '' },
//   { id: 199, 'title': 'Dice Club', provider: 'Relax Gaming', image: '/img/DiceClub.webp', demoUrl: '' },
//   { id: 200, 'title': 'Aztec Gold 20', provider: 'Pragmatic Play', image: '/img/AztecGold20.webp', demoUrl: '' },
//   { id: 201, 'title': 'Elephants Gold Bonus Combo', provider: 'NetGame', image: '/img/ElephantsGoldBonusCombo.webp', demoUrl: '' },
//   { id: 202, 'title': 'Lucky Ladys Charm Deluxe (1)', provider: 'Novomatic', image: '/img/LuckyLadysCharmDeluxe (1).webp', demoUrl: '' },
//   { id: 203, 'title': 'Coin-Blaze thumbnail', provider: 'Pragmatic Play', image: '/img/Coin-Blaze_thumbnail.webp', demoUrl: '' },
//   { id: 204, 'title': 'Hell Hot 20', provider: 'Endorphina', image: '/img/HellHot20.webp', demoUrl: '' },
//   { id: 205, 'title': '40 Chilli Fruits', provider: 'Gamzix', image: '/img/40ChilliFruits.webp', demoUrl: '' },
//   { id: 206, 'title': '40 Chilli Fruits Superior', provider: 'Gamzix', image: '/img/40ChilliFruitsSuperior.webp', demoUrl: '' },
//   { id: 207, 'title': 'Regal Fruits 1000', provider: 'Betsoft', image: '/img/RegalFruits1000 .webp', demoUrl: '' },
//   { id: 208, 'title': 'Xmas Invaders', provider: 'Pragmatic Play', image: '/img/XmasInvaders.webp', demoUrl: '' },
//   { id: 209, 'title': 'Demi Gods V', provider: 'Spinomenal', image: '/img/DemiGodsV.webp', demoUrl: '' },
//   { id: 210, 'title': 'Lucky Streak 1000', provider: 'EGT (Amusnet)', image: '/img/LuckyStreak1000.webp', demoUrl: '' },
//   { id: 211, 'title': 'Aztec Century', provider: 'Pragmatic Play', image: '/img/AztecCentury.webp', demoUrl: '' },
//   { id: 212, 'title': 'Hot Sevens Lotto', provider: 'Betsoft', image: '/img/HotSevensLotto.webp', demoUrl: '' },
//   { id: 213, 'title': 'Gold Nugget Rush', provider: 'Evolution', image: '/img/GoldNuggetRush.webp', demoUrl: '' },
//   { id: 214, 'title': 'Vault Lock Crackit Big', provider: 'Evolution', image: '/img/VaultLockCrackitBig.webp', demoUrl: '' },
//   { id: 215, 'title': 'Fruit Invaders', provider: 'Evolution', image: '/img/FruitInvaders.webp', demoUrl: '' },
//   { id: 216, 'title': 'Lucky Clover', provider: 'iSoftBet', image: '/img/LuckyClover.webp', demoUrl: '' },
//   { id: 217, 'title': 'Blazing Crown Deluxe', provider: 'Blueprint Gaming', image: '/img/BlazingCrownDeluxe.webp', demoUrl: '' },
//   { id: 218, 'title': 'mrfirst', provider: 'Evolution', image: '/img/mrfirst.webp', demoUrl: '' },
//   { id: 219, 'title': 'Wild West Gold', provider: 'Pragmatic Play', image: '/img/WildWestGold.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs40wildwest' },
//   { id: 220, 'title': '5 Fruit Invaders', provider: 'Pragmatic Play', image: '/img/5FruitInvaders.webp', demoUrl: '' },
//   { id: 221, 'title': 'Wisdom of Athena', provider: 'Pragmatic Play', image: '/img/WisdomofAthena.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20procount' },
//   { id: 222, 'title': 'Sticky Coin Hold The Spin', provider: 'Gamzix', image: '/img/StickyCoinHoldTheSpin.webp', demoUrl: '' },
//   { id: 223, 'title': 'Winstorm', provider: 'EGT (Amusnet)', image: '/img/Winstorm.webp', demoUrl: '' },
//   { id: 224, 'title': 'BookOfRa', provider: 'Novomatic', image: '/img/BookOfRa.webp', demoUrl: 'https://demo.monkeyboxsrv.com/demo/fullstate/html5/novomatic/bookofradeluxe' }, // Виправлено провайдера на Novomatic
//   { id: 225, 'title': 'Arctic Coins Running Wins', provider: 'Fugaso', image: '/img/ArcticCoinsRunningWins.webp', demoUrl: '' },
//   { id: 226, 'title': 'Hell Hot 40', provider: 'Endorphina', image: '/img/HellHot40.webp', demoUrl: '' },
//   { id: 227, 'title': 'Gates of Olympus Xmas 1000', provider: 'Pragmatic Play', image: '/img/GatesofOlympusXmas1000.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20olympx' },
//   { id: 228, 'title': 'Kong of the Jungle', provider: 'BGaming', image: '/img/KongoftheJungle.webp', demoUrl: '' },
//   { id: 229, 'title': 'Big Bass Splash', provider: 'Pragmatic Play', image: '/img/BigBassSplash.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs10bbsplash' }, // Виправлено провайдера на Pragmatic
//   { id: 230, 'title': 'Celtic Bless', provider: 'Evolution', image: '/img/CelticBless.webp', demoUrl: '' },
//   { id: 231, 'title': 'GGBET White Rhino', provider: 'Spinomenal', image: '/img/GGBETWhiteRhino..webp', demoUrl: '' },
//   { id: 232, 'title': 'Fruit Party Deluxe', provider: 'Pragmatic Play', image: '/img/FruitPartyDeluxe.webp', demoUrl: '' }, // Швидше за все це просто Fruit Party 2: vs20fparty2
//   { id: 233, 'title': 'Regal Spins Sun Link 10', provider: 'Evolution', image: '/img/RegalSpinsSunLink10.webp', demoUrl: '' },
//   { id: 234, 'title': 'Jackpot Joker', provider: 'Pragmatic Play', image: '/img/JackpotJoker.webp', demoUrl: '' },
//   { id: 235, 'title': 'The Dog House Megaways', provider: 'Pragmatic Play', image: '/img/TheDogHouseMegaways.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vswaysdogs' }, // Виправлено провайдера
//   { id: 236, 'title': 'Bonbon Pop 1000', provider: 'Playtech', image: '/img/BonbonPop1000.webp', demoUrl: '' },
//   { id: 237, 'title': 'Joker Win', provider: 'Spinomenal', image: '/img/JokerWin.webp', demoUrl: '' },
//   { id: 238, 'title': 'Coin Win Hold The Spin', provider: 'Gamzix', image: '/img/CoinWinHoldTheSpin.webp', demoUrl: '' },
//   { id: 239, 'title': 'Joker Stoker', provider: 'Endorphina', image: '/img/JokerStoker.webp', demoUrl: '' },
//   { id: 240, 'title': 'Sweet Bonanza 300x300 (1)', provider: 'Pragmatic Play', image: '/img/Sweet Bonanza_300x300 (1).webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitsw' },
//   { id: 241, 'title': 'Aviatrix (1)', provider: 'Aviatrix', image: '/img/Aviatrix (1).webp', demoUrl: '' },
//   { id: 242, 'title': 'Sugar Rush 1000', provider: 'Pragmatic Play', image: '/img/SugarRush1000..webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20sugarrushx' }, // Виправлено провайдера
//   { id: 243, 'title': 'Sevens On Fire+', provider: 'Evolution', image: '/img/SevensOnFire+.webp', demoUrl: '' },
//   { id: 244, 'title': 'Gates Of Olympus 1', provider: 'Pragmatic Play', image: '/img/GatesOfOlympus1.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20olympgate' },
//   { id: 245, 'title': 'Hell Hot 100', provider: 'Endorphina', image: '/img/HellHot100.webp', demoUrl: '' },
//   { id: 246, 'title': 'Pirate Gold Hold And Win', provider: 'Playson', image: '/img/PirateGoldHoldAndWin.webp', demoUrl: '' },
//   { id: 247, 'title': 'Purple Hot 2', provider: 'Platipus', image: '/img/PurpleHot2.webp', demoUrl: '' },
//   { id: 248, 'title': '3 Energy Diamonds Hold And Win', provider: 'Playson', image: '/img/3EnergyDiamondsHoldAndWin.webp', demoUrl: '' },
//   { id: 249, 'title': '3 Fortune Souls', provider: 'Playson', image: '/img/3FortuneSouls.webp', demoUrl: '' },
//   { id: 250, 'title': 'Sizzling Hot Deluxe (1)', provider: 'Novomatic', image: '/img/SizzlingHotDeluxe (1).webp', demoUrl: 'https://demo.monkeyboxsrv.com/demo/fullstate/html5/novomatic/sizzlinghotdeluxe' },
//   { id: 251, 'title': 'Pyro Joker', provider: 'Wazdan', image: '/img/PyroJoker.webp', demoUrl: '' },
//   { id: 252, 'title': 'Golden Fate', provider: 'Evolution', image: '/img/GoldenFate .webp', demoUrl: '' },
//   { id: 253, 'title': 'Cleos Gold', provider: 'Platipus', image: '/img/CleosGold.webp', demoUrl: '' },
//   { id: 254, 'title': 'Moneyfest', provider: 'Popiplay', image: '/img/Moneyfest.webp', demoUrl: '' },
//   { id: 255, 'title': 'Coins Of Ra Power', provider: 'Yggdrasil', image: '/img/CoinsOfRaPower.webp', demoUrl: '' },
//   { id: 256, 'title': 'Anubis Spell', provider: 'Spinomenal', image: '/img/AnubisSpell.webp', demoUrl: '' },
//   { id: 257, 'title': 'Baba Yaga Tales', provider: 'Spinomenal', image: '/img/BabaYagaTales.webp', demoUrl: '' },
//   { id: 258, 'title': 'Book Of Ra Deluxe', provider: 'Novomatic', image: '/img/BookOfRaDeluxe.webp', demoUrl: 'https://demo.monkeyboxsrv.com/demo/fullstate/html5/novomatic/bookofradeluxe' },
//   { id: 259, 'title': '3 Tombs', provider: 'Microgaming', image: '/img/3Tombs.webp', demoUrl: '' },
//   { id: 260, 'title': 'Ultra 7 Hot', provider: 'Wazdan', image: '/img/Ultra7Hot.webp', demoUrl: '' },
//   { id: 261, 'title': 'Sweet Bonanza 1000', provider: 'Pragmatic Play', image: '/img/Sweet Bonanza_1000_200x200 (1).webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitswx' }, // Виправлено
//   { id: 262, 'title': 'Egypt Sphere Hold The Spin', provider: 'Gamzix', image: '/img/EgyptSphereHoldTheSpin.webp', demoUrl: '' },
//   { id: 263, 'title': 'Pure Ecstasy', provider: 'Playtech', image: '/img/PureEcstasy.webp', demoUrl: '' },
//   { id: 264, 'title': 'Fire Rage+', provider: 'Evolution', image: '/img/FireRage+.webp', demoUrl: '' },
//   { id: 265, 'title': 'Burning Coins 20', provider: 'Microgaming', image: '/img/BurningCoins20.webp', demoUrl: '' },
//   { id: 266, 'title': 'Baba Yaga GGBET', provider: 'Spinomenal', image: '/img/BabaYagaGGBET.webp', demoUrl: '' },
//   { id: 267, 'title': 'Gates of Olympus Super Scatter', provider: 'Pragmatic Play', image: '/img/GatesofOlympusSuperScatter.webp', demoUrl: '' },
//   { id: 268, 'title': 'Ultra Fresh', provider: 'Endorphina', image: '/img/UltraFresh.webp', demoUrl: '' },
//   { id: 269, 'title': 'Bacons Bank', provider: 'Microgaming', image: '/img/BaconsBank .webp', demoUrl: '' },
//   { id: 270, 'title': 'Red 27', provider: 'Fazi', image: '/img/Red27.webp', demoUrl: '' },
//   { id: 271, 'title': 'Hot Triple Sevens Hold And Win', provider: 'Evoplay', image: '/img/HotTripleSevensHoldAndWin.webp', demoUrl: '' }
// ];

const originalAllGames = [
  // --- PRAGMATIC PLAY (Працюють одразу) ---
  { id: 2, title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: '/img/SweetBonanza.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitsw', launchId: null },
  { id: 3, title: 'The Dog House', provider: 'Pragmatic Play', image: '/img/TheDogHouse.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vswaysdogs&websiteUrl=https://demogamesfree.pragmaticplay.net', launchId: null },
  { id: 5, title: 'Sugar Rush', provider: 'Pragmatic Play', image: '/img/SugarRush.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?jurisdiction=99&lang=en&cur=USD&gameSymbol=vs20sugarrush', launchId: null },
  { id: 13, title: 'Gates of Olympus', provider: 'Pragmatic Play', image: '/img/rbarimg1.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20olympgate', launchId: null },
  { id: 58, title: 'Fruit Party', provider: 'Pragmatic Play', image: '/img/FruitParty1.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitparty', launchId: null },
  { id: 61, title: 'The Dog House Multihold', provider: 'Pragmatic Play', image: '/img/TheDogHouseMultihold.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20doghousemh', launchId: null },
  { id: 62, title: 'Cleocatra', provider: 'Pragmatic Play', image: '/img/Cleocatra.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20cleocatra', launchId: null },
  { id: 229, title: 'Big Bass Splash', provider: 'Pragmatic Play', image: '/img/BigBassSplash.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs10bbsplash', launchId: null },
  { id: 242, title: 'Sugar Rush 1000', provider: 'Pragmatic Play', image: '/img/SugarRush1000..webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20sugarrushx', launchId: null },
  { id: 261, title: 'Sweet Bonanza 1000', provider: 'Pragmatic Play', image: '/img/Sweet Bonanza_1000_200x200 (1).webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20fruitswx', launchId: null },
  { id: 244, title: 'Gates Of Olympus 1000', provider: 'Pragmatic Play', image: '/img/GatesOfOlympus1.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20olympx', launchId: null },
  { id: 184, title: 'Forge of Olympus', provider: 'Pragmatic Play', image: '/img/ForgeofOlympus.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20forge', launchId: null },
  { id: 219, title: 'Wild West Gold', provider: 'Pragmatic Play', image: '/img/WildWestGold.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs40wildwest', launchId: null },
  { id: 221, title: 'Wisdom of Athena', provider: 'Pragmatic Play', image: '/img/WisdomofAthena.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs20procount', launchId: null },
  { id: 17, title: 'One Hand Blackjack', provider: 'Pragmatic Play', image: '/img/OneHandBlackjack.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=bj_one_hand', launchId: null },
  { id: 111, title: 'Glow Dig (Big Bass Bonanza)', provider: 'Pragmatic Play', image: '/img/GlowDig.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vs10bbbonanza', launchId: null },
  { id: 235, title: 'The Dog House Megaways', provider: 'Pragmatic Play', image: '/img/TheDogHouseMegaways.webp', demoUrl: 'https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?lang=en&cur=EUR&gameSymbol=vswaysdogs', launchId: null },
  
  // --- NOVOMATIC (Знайдено в new2.txt) ---
  { id: 1, title: 'Book of Ra Deluxe', provider: 'Novomatic', image: '/img/BookOfRa.webp', demoUrl: '', launchId: 8836 },
  { id: 224, title: 'Book Of Ra Classic', provider: 'Novomatic', image: '/img/BookOfRa.webp', demoUrl: '', launchId: 8835 },
  { id: 59, title: 'Book of Ra Magic', provider: 'Novomatic', image: '/img/BookofRaMagic.webp', demoUrl: '', launchId: 8841 },
  { id: 258, title: 'Book of Ra Deluxe 6', provider: 'Novomatic', image: '/img/BookOfRaDeluxe.webp', demoUrl: '', launchId: 8839 }, // new2.txt
  { id: 144, title: "Dolphin's Pearl Deluxe", provider: 'Novomatic', image: '/img/DolphinsPearlDeluxe.webp', demoUrl: '', launchId: 8957 },
  { id: 73, title: "Lucky Lady's Charm Deluxe", provider: 'Novomatic', image: '/img/LuckyLadysCharmDeluxeBuyBonus.webp', demoUrl: '', launchId: 13876 },
  { id: 250, title: 'Sizzling Hot Deluxe', provider: 'Novomatic', image: '/img/SizzlingHotDeluxe (1).webp', demoUrl: '', launchId: 8936 },
  { id: 124, title: 'Gryphons Gold (Columbus)', provider: 'Novomatic', image: '/img/GryphonsGold.webp', demoUrl: '', launchId: 8858 }, // Використовуємо Columbus ID
  { id: 122, title: 'Power Stars', provider: 'Novomatic', image: '/img/PowerStars.webp', demoUrl: '', launchId: 8921 },
  { id: 172, title: 'Roaring Forties', provider: 'Novomatic', image: '/img/RoaringForties.webp', demoUrl: '', launchId: 8928 },
  { id: 173, title: 'Plenty of Fruit 40', provider: 'Novomatic', image: '/img/PlentyofFruit40.webp', demoUrl: '', launchId: 8917 }, // new2.txt
  { id: 202, title: "Lucky Lady's Charm Deluxe (1)", provider: 'Novomatic', image: '/img/LuckyLadysCharmDeluxe (1).webp', demoUrl: '', launchId: 8909 },
  { id: 268, title: 'Ultra Hot Deluxe', provider: 'Novomatic', image: '/img/UltraFresh.webp', demoUrl: '', launchId: 8947 }, // new2.txt
  { id: 171, title: 'Charming Ladys Boom', provider: 'Novomatic', image: '/img/CharmingLadysBoom.webp', demoUrl: '', launchId: 8853 }, // new2.txt
  
  // --- ENDORPHINA (Знайдено в new2.txt) ---
  { id: 9, title: 'Joker Stoker', provider: 'Endorphina', image: '/img/JokerStoker.webp', demoUrl: '', launchId: 4370 },
  { id: 10, title: 'Hell Hot 100', provider: 'Endorphina', image: '/img/HellHot100.webp', demoUrl: '', launchId: 4378 },
  { id: 245, title: 'Hell Hot 100 (Alt)', provider: 'Endorphina', image: '/img/HellHot100.webp', demoUrl: '', launchId: 4378 },
  { id: 226, title: 'Hell Hot 40', provider: 'Endorphina', image: '/img/HellHot40.webp', demoUrl: '', launchId: 4380 },
  { id: 204, title: 'Hell Hot 20', provider: 'Endorphina', image: '/img/HellHot20.webp', demoUrl: '', launchId: 4376 },
  { id: 6, title: 'Crown & Coins', provider: 'Endorphina', image: '/img/CrownCoins.webp', demoUrl: '', launchId: 9183 }, // new2.txt "Crown Coins"
  { id: 239, title: 'Joker Stoker (Alt)', provider: 'Endorphina', image: '/img/JokerStoker.webp', demoUrl: '', launchId: 4370 },
  { id: 210, title: 'Lucky Streak 3', provider: 'Endorphina', image: '/img/LuckyStreak1000.webp', demoUrl: '', launchId: 4384 },
  { id: 193, title: 'Buffalo 50', provider: 'Endorphina', image: '/img/YoungBuffaloSong.webp', demoUrl: '', launchId: 4361 },
  { id: 160, title: 'Royal Xmass 2', provider: 'Endorphina', image: '/img/RoyalXmass2.webp', demoUrl: '', launchId: 4273 },
  { id: 46, title: 'Voodoo', provider: 'Endorphina', image: '/img/BoxofRa.webp', demoUrl: '', launchId: 4333 }, // new2.txt
  { id: 45, title: 'Minotaur', provider: 'Endorphina', image: '/img/HellHot100.webp', demoUrl: '', launchId: 4397 }, // new2.txt
  { id: 47, title: 'Cyber Wolf', provider: 'Endorphina', image: '/img/WolfFang.webp', demoUrl: '', launchId: 4317 }, // new2.txt
  { id: 268, title: 'Ultra Fresh', provider: 'Endorphina', image: '/img/UltraFresh.webp', demoUrl: '', launchId: 4404 }, // new2.txt
  { id: 84, title: 'Bastet', provider: 'Endorphina', image: '/img/Bastet.webp', demoUrl: '', launchId: null }, // Треба знайти ID
  { id: 94, title: 'Doctor Winstein', provider: 'Endorphina', image: '/img/DoctorWinsteinBuyBonus.webp', demoUrl: '', launchId: null },
  { id: 205, title: 'Chance Machine 100', provider: 'Endorphina', image: '/img/40ChilliFruits.webp', demoUrl: '', launchId: 4392 }, // new2.txt
  { id: 173, title: '2024 Hit Slot', provider: 'Endorphina', image: '/img/PlentyofFruit40.webp', demoUrl: '', launchId: 6959 }, // new2.txt

  // --- ІГРИ БЕЗ ID (ТРЕБА ЗНАЙТИ В КАЗИНО) ---
  // Якщо ти знайдеш для них ID, просто допиши launchId: ЧИСЛО
  { id: 4, title: 'Tutankhamuns Thomb', provider: 'NetEnt', image: '/img/TutankhamunsThomb.webp', demoUrl: '', launchId: null },
  { id: 7, title: 'Diamond Mines', provider: 'Reflex Gaming', image: '/img/DiamondMines.webp', demoUrl: '', launchId: null },
  { id: 8, title: 'Legacy Of The Sages', provider: 'Play\'n GO', image: '/img/LegacyOfTheSages.webp', demoUrl: 'https://demo.evoplay.games/demo/fullstate/html5/evoplay/legacyofthesagesbb', launchId: null }, // Це евоплей посилання робоче
  { id: 11, title: 'Gonzo\'s Quest', provider: 'NetEnt', image: '/img/GonzosQuest.webp', demoUrl: '', launchId: null },
  { id: 12, title: '5 Fruit Invaders', provider: 'Amigo Gaming', image: '/img/5FruitInvaders.webp', demoUrl: '', launchId: null },
  { id: 14, title: 'Tutankhamuns Thomb', provider: 'Play\'n GO', image: '/img/TutankhamunsThomb.webp', demoUrl: '', launchId: null },
  { id: 15, title: 'Money Minter', provider: 'Relax Gaming', image: '/img/MoneyMinter.webp', demoUrl: '', launchId: null },
  { id: 16, title: 'Blackjack', provider: 'Evolution', image: '/img/Blackjack.webp', demoUrl: '', launchId: null },
  { id: 18, title: 'Goal', provider: 'NetEnt', image: '/img/Goal.webp', demoUrl: '', launchId: null },
  { id: 19, title: 'Turbo Mines', provider: 'Microgaming', image: '/img/TurboMines.webp', demoUrl: '', launchId: null },
  { id: 20, title: 'Plinko (Playtech)', provider: 'Playtech', image: '/img/plinko.webp', demoUrl: '', launchId: null },
  { id: 21, title: 'Cosmo X', provider: 'IGT', image: '/img/CosmoX.webp', demoUrl: '', launchId: null },
  { id: 23, title: 'Dice Twice', provider: 'Quickspin', image: '/img/DiceTwice.webp', demoUrl: '', launchId: null },
  { id: 24, title: 'FruitsonIce', provider: 'Red Tiger Gaming', image: '/img/FruitsonIce.webp', demoUrl: '', launchId: null },
  { id: 25, title: '100JuicyFruits', provider: 'Big Time Gaming', image: '/img/100JuicyFruits.webp', demoUrl: '', launchId: null },
  { id: 26, title: 'European Roulette VIP', provider: 'Blueprint Gaming', image: '/img/EuropeanRouletteVIP.webp', demoUrl: '', launchId: null },
  { id: 28, title: 'American Blackjack', provider: 'Thunderkick', image: '/img/AmericanBlackjack(1).webp', demoUrl: '', launchId: null },
  { id: 29, title: 'Texas Holdem', provider: 'Relax Gaming', image: '/img/TexasHoldem.webp', demoUrl: '', launchId: null },
  { id: 30, title: 'Vegas Holdem', provider: 'Wazdan', image: '/img/VegasHoldem.webp', demoUrl: '', launchId: null },
  { id: 31, title: 'Romanian Blackjack X3', provider: 'Endorphina', image: '/img/RomanianBlackjackX3.webp', demoUrl: '', launchId: null },
  { id: 32, title: 'Auto Roulette (1)', provider: 'Hacksaw Gaming', image: '/img/AutoRoulette (1).webp', demoUrl: '', launchId: null },
  { id: 33, title: 'Vip European Roulette', provider: 'Push Gaming', image: '/img/VipEuropeanRoulette.webp', demoUrl: '', launchId: null },
  { id: 34, title: 'American Blackjack', provider: 'Nolimit City', image: '/img/AmericanBlackjack.webp', demoUrl: '', launchId: null },
  { id: 36, title: 'Sevens Joy', provider: 'Amatic', image: '/img/SevensJoy.webp', demoUrl: '', launchId: null },
  { id: 37, title: 'Mummys Jewels', provider: 'EvoPlay', image: '/img/MummysJewels.webp', demoUrl: '', launchId: null },
  { id: 38, title: 'Coins Of Alkemor', provider: 'Playson', image: '/img/CoinsOfAlkemorExtremeMagic.webp', demoUrl: '', launchId: null },
  { id: 39, title: 'BoxofRa', provider: 'Booongo', image: '/img/BoxofRa.webp', demoUrl: '', launchId: null },
  { id: 40, title: 'Majestic Cleopatra', provider: 'Tom Horn Gaming', image: '/img/MajesticCleopatra.webp', demoUrl: '', launchId: null },
  { id: 41, title: 'Book Of Winners Lotto', provider: 'Spinomenal', image: '/img/BookOfWinnersLotto.webp', demoUrl: '', launchId: null },
  { id: 42, title: 'Demi Gods VI', provider: 'Pariplay', image: '/img/DemiGodsVI.webp', demoUrl: '', launchId: null },
  { id: 43, title: 'CrownCoins (Betsoft)', provider: 'Betsoft', image: '/img/CrownCoins.webp', demoUrl: '', launchId: null },
  { id: 56, title: 'Neon Roulette', provider: 'Spinomenal', image: '/img/Neon Roulette_300x300.webp', demoUrl: '', launchId: null },
  { id: 57, title: 'Auto Roulette 1', provider: 'Playtech', image: '/img/AutoRoulette1.webp', demoUrl: '', launchId: null },
  { id: 60, title: 'Book Of Rebirth', provider: 'Amatic', image: '/img/BookOfRebirth.webp', demoUrl: '', launchId: null },
  { id: 63, title: '100 Super Hot', provider: 'Pariplay', image: '/img/100SuperHot.webp', demoUrl: '', launchId: null },
  { id: 64, title: 'Shining Crown', provider: 'Pragmatic Play', image: '/img/ShiningCrown.webp', demoUrl: '', launchId: null },
  { id: 65, title: '888 Bonus Combo', provider: 'Big Time Gaming', image: '/img/888BonusCombo.webp', demoUrl: '', launchId: 20330 }, // new2.txt "888: Bonus Combo"
  { id: 66, title: 'The Grand Rooster', provider: 'EvoPlay', image: '/img/TheGrandRoosterHoldAndWin.webp', demoUrl: '', launchId: null },
  { id: 67, title: 'Futuristic Fruits', provider: 'Betsoft', image: '/img/FuturisticFruits.webp', demoUrl: '', launchId: null },
  { id: 68, title: 'Hells Hot 7s', provider: 'Nolimit City', image: '/img/HellsHot7s.webp', demoUrl: '', launchId: null },
  { id: 69, title: 'Johns Book', provider: 'Quickspin', image: '/img/JohnsBook.webp', demoUrl: '', launchId: null },
  { id: 70, title: 'Oath of Steel', provider: 'Push Gaming', image: '/img/OathofSteel.webp', demoUrl: '', launchId: null },
  { id: 71, title: 'Lucky Hot Coins', provider: 'Red Tiger Gaming', image: '/img/LuckyHotCoins.webp', demoUrl: '', launchId: null },
  { id: 72, title: 'Dice Invaders', provider: 'Evolution', image: '/img/DiceInvaders.webp', demoUrl: '', launchId: null },
  { id: 74, title: 'Veracruz Wild', provider: 'Relax Gaming', image: '/img/VeracruzWild.webp', demoUrl: '', launchId: null },
  { id: 75, title: 'Ultimate Golden Dragon', provider: 'Evolution', image: '/img/UltimateGoldenDragonInferno.webp', demoUrl: '', launchId: null },
  { id: 76, title: 'Queen of Sirens', provider: 'BGaming', image: '/img/QueenofSirens.webp', demoUrl: '', launchId: null },
  { id: 77, title: 'Bounty Expand 25', provider: 'Evolution', image: '/img/BountyExpand25.webp', demoUrl: '', launchId: null },
  { id: 78, title: '4 Horsemen 3 Inferno', provider: 'Betsoft', image: '/img/4Horsemen3Inferno.webp', demoUrl: '', launchId: null },
  { id: 79, title: 'Fortune Bags', provider: 'ELK Studios', image: '/img/FortuneBags.webp', demoUrl: '', launchId: null },
  { id: 80, title: 'Prestige Crown', provider: 'Microgaming', image: '/img/PrestigeCrown.webp', demoUrl: '', launchId: 20038 }, // new2.txt "Prestige Crown"
  { id: 81, title: 'Hades Infernal Blaze', provider: 'Microgaming', image: '/img/HadesInfernalBlaze.webp', demoUrl: '', launchId: null },
  { id: 82, title: '3 Pots of Lunar Wolf', provider: 'Quickspin', image: '/img/3PotsofLunarWolfHoldWin.webp', demoUrl: '', launchId: null },
  { id: 83, title: '3x5 Hold The Spin', provider: 'Playtech', image: '/img/3x5 Hold The Spin..webp', demoUrl: '', launchId: null },
  { id: 85, title: 'Bonbon Pop', provider: 'Yggdrasil', image: '/img/BonbonPop.webp', demoUrl: '', launchId: null },
  { id: 86, title: 'Plinko', provider: 'BGaming', image: '/img/Plinko.webp', demoUrl: 'https://demo.bgaming-network.com/games/Plinko/FUN?play_token=TOKEN', launchId: null },
  { id: 87, title: 'Sweet Bonanza Scatter', provider: 'Playtech', image: '/img/SweetBonanzaSuperScatter.webp', demoUrl: '', launchId: null },
  { id: 88, title: 'Moon Guardians', provider: 'Wazdan', image: '/img/MoonGuardians.webp', demoUrl: '', launchId: null },
  { id: 89, title: 'Magnify Man', provider: 'Playtech', image: '/img/MagnifyMan.webp', demoUrl: '', launchId: null },
  { id: 90, title: 'Jungle Stripes', provider: 'Wazdan', image: '/img/JungleStripes.webp', demoUrl: '', launchId: null },
  { id: 91, title: '7 Fortune Frenzy', provider: 'Playtech', image: '/img/7FortuneFrenzy.webp', demoUrl: '', launchId: null },
  { id: 92, title: 'Joker Coins Megaways', provider: 'Evolution', image: '/img/JokerCoinsMegaways.webp', demoUrl: '', launchId: null },
  { id: 93, title: 'Book of Bamboo', provider: 'Big Time Gaming', image: '/img/BookofBamboo.webp', demoUrl: '', launchId: null },
  { id: 95, title: 'Golden Dragon Inferno', provider: 'Push Gaming', image: '/img/GoldenDragonInferno.webp', demoUrl: '', launchId: null },
  { id: 96, title: 'Hearts Desire NJP', provider: 'Evolution', image: '/img/HeartsDesireNJP.webp', demoUrl: '', launchId: null },
  { id: 97, title: 'Clover Wheel', provider: 'Blueprint Gaming', image: '/img/CloverWheel.webp', demoUrl: '', launchId: null },
  { id: 98, title: '20 Mega Star', provider: 'Yggdrasil', image: '/img/20MegaStar.webp', demoUrl: '', launchId: null },
  { id: 99, title: 'Poseidons Rising', provider: 'Big Time Gaming', image: '/img/PoseidonsRising.webp', demoUrl: '', launchId: null },
  { id: 100, title: 'The Great Cabaret', provider: 'Pragmatic Play', image: '/img/TheGreatCabaret.webp', demoUrl: '', launchId: null },
  { id: 101, title: 'Royal Treasures', provider: 'BGaming', image: '/img/RoyalTreasures.webp', demoUrl: '', launchId: null },
  { id: 102, title: 'Story Of Hercules', provider: 'Evolution', image: '/img/StoryOfHercules.webp', demoUrl: '', launchId: null },
  { id: 103, title: 'Rags to Witches', provider: 'Betsoft', image: '/img/RagstoWitches.webp', demoUrl: '', launchId: null },
  { id: 104, title: 'Wild Double Up', provider: 'Betsoft', image: '/img/WildDoubleUp.webp', demoUrl: '', launchId: null },
  { id: 105, title: 'Secrets Of Atlantis', provider: 'Playtech', image: '/img/SecretsOfAtlantis.webp', demoUrl: '', launchId: null },
  { id: 106, title: '2500xRush', provider: 'Playtech', image: '/img/2500xRush.webp', demoUrl: '', launchId: null },
  { id: 107, title: 'Coin Galactic', provider: 'Quickspin', image: '/img/CoinGalactic.webp', demoUrl: '', launchId: null },
  { id: 108, title: 'Pho Sho', provider: 'Pragmatic Play', image: '/img/PhoSho.webp', demoUrl: '', launchId: null },
  { id: 109, title: 'Good Luck Spell', provider: 'Playson', image: '/img/GoodLuckSpell.webp', demoUrl: '', launchId: null },
  { id: 110, title: 'Fruit Boost', provider: 'Pariplay', image: '/img/FruitBoost.webp', demoUrl: '', launchId: null },
  { id: 112, title: 'Demi Gods 5 Hold & Hit', provider: 'Playtech', image: '/img/DemiGods5Hold&Hit.webp', demoUrl: '', launchId: null },
  { id: 113, title: 'Rise Of Triton', provider: 'Tom Horn Gaming', image: '/img/RiseOfTriton.webp', demoUrl: '', launchId: null },
  { id: 114, title: 'Joker Coins', provider: 'Yggdrasil', image: '/img/JokerCoins.webp', demoUrl: '', launchId: null },
  { id: 115, title: 'Wild Spin', provider: 'Blueprint Gaming', image: '/img/WildSpin.webp', demoUrl: '', launchId: null },
  { id: 116, title: 'Lucky Numbers x12', provider: 'Blueprint Gaming', image: '/img/LuckyNumbersx12.webp', demoUrl: '', launchId: null },
  { id: 117, title: 'Kitchen Hot', provider: 'Pariplay', image: '/img/KitchenHot.webp', demoUrl: '', launchId: null },
  { id: 118, title: 'Book Of Sirens', provider: 'Big Time Gaming', image: '/img/BookOfSirens.webp', demoUrl: '', launchId: null },
  { id: 119, title: 'King Kong Cashpots', provider: 'Evolution', image: '/img/KingKongCashpots.webp', demoUrl: '', launchId: null },
  { id: 120, title: 'The Book Of Patagonia', provider: 'Betsoft', image: '/img/TheBookOfPatagonia.webp', demoUrl: '', launchId: null },
  { id: 121, title: 'Majestic King Ice Kingdom', provider: 'Microgaming', image: '/img/MajesticKingIceKingdom.webp', demoUrl: '', launchId: null },
  { id: 123, title: '20 Shining Coins', provider: 'Push Gaming', image: '/img/20ShiningCoins.webp', demoUrl: '', launchId: null },
  { id: 125, title: 'April Fury and Scarabs', provider: 'Playtech', image: '/img/AprilFuryandtheChamberofScarabs.webp', demoUrl: '', launchId: null },
  { id: 126, title: 'Sizzling Super Sevens', provider: 'BGaming', image: '/img/SizzlingSuperSevens.webp', demoUrl: '', launchId: null },
  { id: 127, title: 'Royal Harvest', provider: 'Wazdan', image: '/img/RoyalHarvest.webp', demoUrl: '', launchId: null },
  { id: 128, title: 'Sweets Hot', provider: 'Nolimit City', image: '/img/SweetsHot.webp', demoUrl: '', launchId: null },
  { id: 129, title: 'Coininfinity Surge Reel', provider: 'Nolimit City', image: '/img/CoininfinitySurgeReel.webp', demoUrl: '', launchId: null },
  { id: 130, title: 'Carnival Cat Bonus', provider: 'Playtech', image: '/img/CarnivalCatBonusCombo.webp', demoUrl: '', launchId: 16601 }, // new2.txt
  { id: 131, title: 'Hot Triple Sevens', provider: 'Wazdan', image: '/img/Hot Triple Sevens .webp', demoUrl: '', launchId: null },
  { id: 132, title: 'Book Of Demi Gods 2', provider: 'Evolution', image: '/img/BookOfDemiGods2.webp', demoUrl: '', launchId: null },
  { id: 133, title: 'Wolf Fang', provider: 'Hacksaw Gaming', image: '/img/WolfFang.webp', demoUrl: '', launchId: null },
  { id: 134, title: 'Book Hotfire Buy Bonus', provider: 'Spinomenal', image: '/img/BookHotfireBuyBonus.webp', demoUrl: '', launchId: null },
  { id: 135, title: 'Take The Bank', provider: 'Blueprint Gaming', image: '/img/TakeTheBank.webp', demoUrl: '', launchId: null },
  { id: 136, title: 'Sunny Coin Hold The Spin', provider: 'Nolimit City', image: '/img/SunnyCoinHoldTheSpin.webp', demoUrl: '', launchId: null },
  { id: 137, title: 'Majestic King', provider: 'Quickspin', image: '/img/340x340_MajesticKing_EN.webp', demoUrl: '', launchId: null },
  { id: 138, title: 'Diamonds Hunt', provider: 'Pragmatic Play', image: '/img/DiamondsHunt.webp', demoUrl: '', launchId: null },
  { id: 139, title: 'The Easter Catch', provider: 'Playtech', image: '/img/TheEasterCatch.webp', demoUrl: '', launchId: null },
  { id: 140, title: 'Wild Witches', provider: 'Playtech', image: '/img/WildWitches.webp', demoUrl: '', launchId: null },
  { id: 141, title: 'Cats Blessing', provider: 'Playtech', image: '/img/CatsBlessing.webp', demoUrl: '', launchId: null },
  { id: 142, title: 'Fairytale Beauties', provider: 'Yggdrasil', image: '/img/FairytaleBeauties.webp', demoUrl: '', launchId: null },
  { id: 143, 'title': 'Sizzling Sevens Hold & Win', provider: 'Pragmatic Play', image: '/img/sizzlingsevenshold&win.webp', demoUrl: '', launchId: null },
  { id: 145, title: 'Take The Vault', provider: 'BGaming', image: '/img/TakeTheVault.webp', demoUrl: '', launchId: null },
  { id: 146, title: 'Cossacks', provider: 'Big Time Gaming', image: '/img/Cossacks.webp', demoUrl: '', launchId: null },
  { id: 147, title: 'Aztec Spell', provider: 'Pragmatic Play', image: '/img/AztecSpellForgottenEmpire-1.webp', demoUrl: '', launchId: null },
  { id: 148, title: 'Ultra Luck', provider: 'Nolimit City', image: '/img/UltraLuck.webp', demoUrl: '', launchId: null },
  { id: 149, title: 'Striking Diamond Link', provider: 'Relax Gaming', image: '/img/StrikingDiamondLink.webp', demoUrl: '', launchId: null },
  { id: 150, title: 'The Big Chili', provider: 'Playtech', image: '/img/TheBigChili.webp', demoUrl: '', launchId: null },
  { id: 151, title: 'Book Of Demi Gods V', provider: 'Playson', image: '/img/BookOfDemiGodsV.webp', demoUrl: '', launchId: null },
  { id: 152, title: 'Sun Crown', provider: 'Push Gaming', image: '/img/SunCrown.webp', demoUrl: '', launchId: null },
  { id: 153, title: 'Wolf Fang Supermoon', provider: 'Quickspin', image: '/img/WolfFangSupermoon.webp', demoUrl: '', launchId: null },
  { id: 154, title: 'Wild Crowns', provider: 'Spinomenal', image: '/img/WildCrowns.webp', demoUrl: '', launchId: null },
  { id: 155, title: 'Gates Of Anubis', provider: 'Betsoft', image: '/img/GatesOfAnubis.webp', demoUrl: '', launchId: null },
  { id: 156, title: 'Detective Donut', provider: 'Evolution', image: '/img/DetectiveDonut.webp', demoUrl: '', launchId: null },
  { id: 157, title: 'Bunnys Bounty', provider: 'Evolution', image: '/img/BunnysBountyHoldNlink.webp', demoUrl: '', launchId: 16638 }, // new2.txt
  { id: 158, title: 'Coins Of Zeus', provider: 'Evolution', image: '/img/CoinsOfZeus.webp', demoUrl: '', launchId: null },
  { id: 159, title: 'Big Joker', provider: 'Yggdrasil', image: '/img/BigJoker.webp', demoUrl: '', launchId: null },
  { id: 161, title: 'Tap Craze', provider: 'Evolution', image: '/img/TapCraze.webp', demoUrl: '', launchId: null },
  { id: 162, title: 'Fruit Salsa', provider: 'Evolution', image: '/img/FruitSalsa.webp', demoUrl: '', launchId: null },
  { id: 163, title: 'Golden Piggy Bank', provider: 'Betsoft', image: '/img/GoldenPiggyBank.webp', demoUrl: '', launchId: null },
  { id: 164, title: 'Area 69', provider: 'Playtech', image: '/img/Area69.webp', demoUrl: '', launchId: null },
  { id: 165, title: 'Coins Of Ra', provider: 'Playson', image: '/img/CoinsOfRa.webp', demoUrl: '', launchId: null },
  { id: 166, title: 'Hot Volcano', provider: 'Betsoft', image: '/img/HotVolcano.webp', demoUrl: '', launchId: null },
  { id: 167, title: 'Tap The Pot', provider: 'Blueprint Gaming', image: '/img/TapThePot.webp', demoUrl: '', launchId: null },
  { id: 168, title: 'Fruits and Bells', provider: 'Playtech', image: '/img/FruitsandBells.webp', demoUrl: '', launchId: null },
  { id: 169, title: 'Sunny Coin 2', provider: 'Evolution', image: '/img/SunnyCoin2.webp', demoUrl: '', launchId: null },
  { id: 170, title: 'Cassiopeia', provider: 'Blueprint Gaming', image: '/img/Cassiopeia.webp', demoUrl: '', launchId: null },
  { id: 174, title: 'Sevens Heat 20', provider: 'Push Gaming', image: '/img/SevensHeat20.webp', demoUrl: '', launchId: null },
  { id: 175, title: 'Wild Spin Deluxe', provider: 'Playtech', image: '/img/WildSpinDeluxe.webp', demoUrl: '', launchId: null },
  { id: 176, title: '7 Hot Fruits', provider: 'Quickspin', image: '/img/7HotFruits.webp', demoUrl: '', launchId: null },
  { id: 177, title: 'Pome Race Sun Link 10', provider: 'Blueprint Gaming', image: '/img/PomeRaceSunLink10.webp', demoUrl: '', launchId: null },
  { id: 178, title: '25 Coins', provider: 'Playson', image: '/img/25Coins.webp', demoUrl: '', launchId: null },
  { id: 179, title: 'Piggy Coins', provider: 'Relax Gaming', image: '/img/PiggyCoins.webp', demoUrl: '', launchId: null },
  { id: 180, title: 'Big Catch Bonanza', provider: 'Evolution', image: '/img/BigCatchBonanzaPerfectHaul.webp', demoUrl: '', launchId: 16640 }, // new2.txt
  { id: 181, title: 'Dinopolis', provider: 'Microgaming', image: '/img/Dinopolis.webp', demoUrl: '', launchId: null },
  { id: 182, title: 'Hot and Spicy Jackpot', provider: 'Evolution', image: '/img/HotandSpicyJackpot.webp', demoUrl: '', launchId: null },
  { id: 183, title: 'Chaos Crew', provider: 'Pragmatic Play', image: '/img/ChaosCrew.webp', demoUrl: '', launchId: null },
  { id: 185, title: 'A Big Catch', provider: 'Nolimit City', image: '/img/ABigCatch.webp', demoUrl: '', launchId: null },
  { id: 186, title: 'Majestic White Rhino', provider: 'Push Gaming', image: '/img/MajesticWhiteRhin.webp', demoUrl: '', launchId: null },
  { id: 187, title: 'Luck of Panda', provider: 'Playtech', image: '/img/LuckofPandaBonusCombo.webp', demoUrl: '', launchId: 16639 }, // new2.txt
  { id: 188, title: 'Hot Slot Lotto', provider: 'Evolution', image: '/img/HotSlotLotto.webp', demoUrl: '', launchId: null },
  { id: 189, title: 'Sevens Heat 40', provider: 'Relax Gaming', image: '/img/SevensHeat40.webp', demoUrl: '', launchId: null },
  { id: 190, title: 'Scratch Match', provider: 'Evolution', image: '/img/ScratchMatch.webp', demoUrl: '', launchId: null },
  { id: 191, title: 'Luck of Tiger', provider: 'Microgaming', image: '/img/LuckofTiger.webp', demoUrl: '', launchId: 16620 }, // new2.txt
  { id: 192, title: 'Hot Sevens', provider: 'Hacksaw Gaming', image: '/img/HotSevens.webp', demoUrl: '', launchId: null },
  { id: 194, title: 'The Greatest Catch', provider: 'Evolution', image: '/img/TheGreatestCatchBonusBuy.webp', demoUrl: '', launchId: null },
  { id: 195, title: 'Fruits Coins', provider: 'Playson', image: '/img/FruitsCoins.webp', demoUrl: '', launchId: null },
  { id: 196, title: 'Dogmasons Mega WOOF', provider: 'Yggdrasil', image: '/img/DogmasonsMegaWOOF.webp', demoUrl: '', launchId: null },
  { id: 197, title: 'Mega Wild Fruits', provider: 'Playtech', image: '/img/MegaWildFruits.webp', demoUrl: '', launchId: null },
  { id: 198, title: 'Super Chili', provider: 'Quickspin', image: '/img/SuperChili.webp', demoUrl: '', launchId: null },
  { id: 199, title: 'Dice Club', provider: 'Relax Gaming', image: '/img/DiceClub.webp', demoUrl: '', launchId: null },
  { id: 200, title: 'Aztec Gold 20', provider: 'Pragmatic Play', image: '/img/AztecGold20.webp', demoUrl: '', launchId: null },
  { id: 201, title: 'Elephants Gold', provider: 'Quickspin', image: '/img/ElephantsGoldBonusCombo.webp', demoUrl: '', launchId: 16605 }, // new2.txt
  { id: 203, title: 'Coin-Blaze', provider: 'Pragmatic Play', image: '/img/Coin-Blaze_thumbnail.webp', demoUrl: '', launchId: null },
  { id: 206, title: '40 Chilli Fruits Superior', provider: 'Relax Gaming', image: '/img/40ChilliFruitsSuperior.webp', demoUrl: '', launchId: null },
  { id: 207, title: 'Regal Fruits 1000', provider: 'Betsoft', image: '/img/RegalFruits1000 .webp', demoUrl: '', launchId: null },
  { id: 208, title: 'Xmas Invaders', provider: 'Pragmatic Play', image: '/img/XmasInvaders.webp', demoUrl: '', launchId: null },
  { id: 209, title: 'Demi Gods V', provider: 'Yggdrasil', image: '/img/DemiGodsV.webp', demoUrl: '', launchId: null },
  { id: 211, title: 'Aztec Century', provider: 'Pragmatic Play', image: '/img/AztecCentury.webp', demoUrl: '', launchId: null },
  { id: 212, title: 'Hot Sevens Lotto', provider: 'Betsoft', image: '/img/HotSevensLotto.webp', demoUrl: '', launchId: null },
  { id: 213, title: 'Gold Nugget Rush', provider: 'Evolution', image: '/img/GoldNuggetRush.webp', demoUrl: '', launchId: null },
  { id: 214, title: 'Vault Lock Crackit Big', provider: 'Evolution', image: '/img/VaultLockCrackitBig.webp', demoUrl: '', launchId: null },
  { id: 215, title: 'Fruit Invaders', provider: 'Evolution', image: '/img/FruitInvaders.webp', demoUrl: '', launchId: null },
  { id: 216, title: 'Lucky Clover', provider: 'Relax Gaming', image: '/img/LuckyClover.webp', demoUrl: '', launchId: null },
  { id: 217, title: 'Blazing Crown Deluxe', provider: 'Blueprint Gaming', image: '/img/BlazingCrownDeluxe.webp', demoUrl: '', launchId: null },
  { id: 218, title: 'mrfirst', provider: 'Evolution', image: '/img/mrfirst.webp', demoUrl: '', launchId: null },
  { id: 220, title: '5 Fruit Invaders', provider: 'Pragmatic Play', image: '/img/5FruitInvaders.webp', demoUrl: '', launchId: null },
  { id: 222, title: 'Sticky Coin Hold The Spin', provider: 'Pragmatic Play', image: '/img/StickyCoinHoldTheSpin.webp', demoUrl: '', launchId: null },
  { id: 223, title: 'Winstorm', provider: 'Playson', image: '/img/Winstorm.webp', demoUrl: '', launchId: null },
  { id: 225, title: 'Arctic Coins Running Wins', provider: 'Evolution', image: '/img/ArcticCoinsRunningWins.webp', demoUrl: '', launchId: null },
  { id: 227, title: 'Gates of Olympus Xmas 1000', provider: 'Relax Gaming', image: '/img/GatesofOlympusXmas1000.webp', demoUrl: '', launchId: null },
  { id: 228, title: 'Kong of the Jungle', provider: 'Yggdrasil', image: '/img/KongoftheJungle.webp', demoUrl: '', launchId: null },
  { id: 230, title: 'Celtic Bless', provider: 'Evolution', image: '/img/CelticBless.webp', demoUrl: '', launchId: null },
  { id: 231, title: 'GGBET White Rhino', provider: 'Relax Gaming', image: '/img/GGBETWhiteRhino..webp', demoUrl: '', launchId: null },
  { id: 232, title: 'Fruit Party Deluxe', provider: 'Yggdrasil', image: '/img/FruitPartyDeluxe.webp', demoUrl: '', launchId: null },
  { id: 233, title: 'Regal Spins Sun Link 10', provider: 'Evolution', image: '/img/RegalSpinsSunLink10.webp', demoUrl: '', launchId: null },
  { id: 234, title: 'Jackpot Joker', provider: 'Pragmatic Play', image: '/img/JackpotJoker.webp', demoUrl: '', launchId: null },
  { id: 236, title: 'Bonbon Pop 1000', provider: 'Playtech', image: '/img/BonbonPop1000.webp', demoUrl: '', launchId: null },
  { id: 237, title: 'Joker Win', provider: 'Microgaming', image: '/img/JokerWin.webp', demoUrl: '', launchId: null },
  { id: 238, title: 'Coin Win Hold The Spin', provider: 'Pragmatic Play', image: '/img/CoinWinHoldTheSpin.webp', demoUrl: '', launchId: null },
  { id: 240, title: 'Sweet Bonanza 300x300', provider: 'Evolution', image: '/img/Sweet Bonanza_300x300 (1).webp', demoUrl: '', launchId: null },
  { id: 241, title: 'Aviatrix', provider: 'Evolution', image: '/img/Aviatrix (1).webp', demoUrl: '', launchId: null },
  { id: 243, title: 'Sevens On Fire+', provider: 'Evolution', image: '/img/SevensOnFire+.webp', demoUrl: '', launchId: null },
  { id: 246, title: 'Pirate Gold Hold And Win', provider: 'Playtech', image: '/img/PirateGoldHoldAndWin.webp', demoUrl: '', launchId: null },
  { id: 247, title: 'Purple Hot 2', provider: 'Playtech', image: '/img/PurpleHot2.webp', demoUrl: '', launchId: null },
  { id: 248, title: '3 Energy Diamonds', provider: 'Evolution', image: '/img/3EnergyDiamondsHoldAndWin.webp', demoUrl: '', launchId: null },
  { id: 249, title: '3 Fortune Souls', provider: 'Evolution', image: '/img/3FortuneSouls.webp', demoUrl: '', launchId: null },
  { id: 251, title: 'Pyro Joker', provider: 'Yggdrasil', image: '/img/PyroJoker.webp', demoUrl: '', launchId: null },
  { id: 252, title: 'Golden Fate', provider: 'Evolution', image: '/img/GoldenFate .webp', demoUrl: '', launchId: null },
  { id: 253, title: 'Cleos Gold', provider: 'Relax Gaming', image: '/img/CleosGold.webp', demoUrl: '', launchId: null },
  { id: 254, title: 'Moneyfest', provider: 'Microgaming', image: '/img/Moneyfest.webp', demoUrl: '', launchId: null },
  { id: 255, title: 'Coins Of Ra Power', provider: 'Yggdrasil', image: '/img/CoinsOfRaPower.webp', demoUrl: '', launchId: null },
  { id: 256, title: 'Anubis Spell', provider: 'Evolution', image: '/img/AnubisSpell.webp', demoUrl: '', launchId: null },
  { id: 257, title: 'Baba Yaga Tales', provider: 'Yggdrasil', image: '/img/BabaYagaTales.webp', demoUrl: '', launchId: null },
  { id: 259, title: '3 Tombs', provider: 'Microgaming', image: '/img/3Tombs.webp', demoUrl: '', launchId: null },
  { id: 260, title: 'Ultra 7 Hot', provider: 'Yggdrasil', image: '/img/Ultra7Hot.webp', demoUrl: '', launchId: null },
  { id: 262, title: 'Egypt Sphere Hold The Spin', provider: 'Relax Gaming', image: '/img/EgyptSphereHoldTheSpin.webp', demoUrl: '', launchId: null },
  { id: 263, title: 'Pure Ecstasy', provider: 'Playtech', image: '/img/PureEcstasy.webp', demoUrl: '', launchId: null },
  { id: 264, title: 'Fire Rage+', provider: 'Evolution', image: '/img/FireRage+.webp', demoUrl: '', launchId: null },
  { id: 265, title: 'Burning Coins 20', provider: 'Microgaming', image: '/img/BurningCoins20.webp', demoUrl: '', launchId: 19013 }, // new2.txt
  { id: 266, title: 'Baba Yaga GGBET', provider: 'Yggdrasil', image: '/img/BabaYagaGGBET.webp', demoUrl: '', launchId: null },
  { id: 267, title: 'Gates of Olympus Scatter', provider: 'Playtech', image: '/img/GatesofOlympusSuperScatter.webp', demoUrl: '', launchId: null },
  { id: 269, title: 'Bacons Bank', provider: 'Microgaming', image: '/img/BaconsBank .webp', demoUrl: '', launchId: null },
  { id: 270, title: 'Red 27', provider: 'Evolution', image: '/img/Red27.webp', demoUrl: '', launchId: null },
  { id: 271, title: 'Hot Triple Sevens', provider: 'Yggdrasil', image: '/img/HotTripleSevensHoldAndWin.webp', demoUrl: '', launchId: null }
];



export const allGames = originalAllGames.map(game => ({
  ...game,
  image: createImageUrl(game.image)
}));


// --- Список популярних ігор для головної сторінки ---
export const popularGames = allGames.slice(0, 15);


// --- Список популярних ігор для LiveGames ---
const originalLiveGames = [
  { id: 333, name: 'Live ONE Blackjack', image: '/img/LiveONEBlackjack.webp' },
  { id: 334, name: 'Live Mega Wheel', image: '/img/LiveMegaWheel.webp' },
  { id: 335, name: 'Live Blackjack 21', image: '/img/LiveBlackjack21.webp' },
  { id: 336, name: 'Live Blackjack 30 Azure', image: '/img/LiveBlackjack30Azure.webp' },
  { id: 337, name: 'Live Power Up Roulette', image: '/img/LivePowerUpRoulette.webp' },
  { id: 338, name: 'Live Blackjack 17', image: '/img/LiveBlackjack17.webp' },
  { id: 339, name: 'Live Roulette Azure', image: '/img/LiveRouletteAzure.webp' },
  { id: 340, name: 'Live Roulette Macao', image: '/img/LiveRouletteMacao.webp' },
  { id: 341, name: 'Live Sweet Bonanza CandyLand', image: '/img/LiveSweetBonanzaCandyLand.jpeg' },
  { id: 342, name: 'Blackjack 11', image: '/img/Blackjack11.webp' },
  { id: 343, name: 'Blackjack 12', image: '/img/Blackjack12.webp' },
  { id: 344, name: 'Blackjack 14', image: '/img/Blackjack14.webp' },
  { id: 345, name: 'Blackjack 16', image: '/img/Blackjack16.webp' },
  { id: 346, name: 'Blackjack 25 Azure', image: '/img/Blackjack25Azure.webp' },
  { id: 347, name: 'Blackjack 99 Azure', image: '/img/Blackjack99Azure.webp' },
  { id: 348, name: 'Blackjack 101 Azure', image: '/img/Blackjack101Azure.webp' },
  { id: 349, name: 'Blackjack Bonus Wheel 1000', image: '/img/BlackjackBonusWheel1000.webp' },
  { id: 350, name: 'Blackjack VIP', image: '/img/BlackjackVIP.webp' },
  { id: 351, name: 'Casino Holdem', image: '/img/CasinoHoldem.webp' },
  { id: 352, name: 'Crazy Time', image: '/img/CrazyTime.webp' },
  { id: 353, name: 'Speed Baccarat 1', image: '/img/SpeedBaccarat1.webp' },
  { id: 354, name: 'Live Blackjack 30 Azure', image: '/img/LiveBlackjack30Azure.webp' },
  { id: 355, name: 'Speed Baccarat 2', image: '/img/SpeedBaccarat2.webp' },
  { id: 356, name: 'Caribbean Stud Poker', image: '/img/CaribbeanStudPoker.webp' },
  { id: 357, name: 'Texas Holdem Bonus Poker', image: '/img/TexasHoldemBonusPoker.webp' },
  { id: 358, name: 'Infinite Free Bet Blackjack', image: '/img/InfiniteFreeBetBlackjack.webp' },
  { id: 359, name: 'Speed Baccarat', image: '/img/SpeedBaccarat.webp' },
  { id: 360, name: 'Dream Catcher', image: '/img/DreamCatcher.webp' },
  { id: 361, name: 'Lightning Baccarat', image: '/img/Lightning_Baccarat.webp' },
  { id: 362, name: 'Monopoly Big Baller', image: '/img/MonopolyBigBaller.webp' },
];
export const LiveGames = originalLiveGames.map(game => ({
    ...game,
    image: createImageUrl(game.image)
}));


const originalRouletteGames = [
  { id: 272, name: 'Mini Roulette', image: '/img/MiniRoulette.webp' },
  { id: 273, name: 'P Roulette', image: '/img/P_Roulette.webp' },
  { id: 275, name: 'Prive Lounge Roulette Deluxe', image: '/img/PriveLoungeRouletteDeluxe.webp' },
  { id: 276, name: 'Roulette Auto', image: '/img/Roulette Auto_TableID229_250x250.webp' },
  { id: 277, name: 'Roulette (1)', image: '/img/Roulette(1).webp' },
  { id: 278, name: 'Roulette (2)', image: '/img/Roulette(2).webp' },
  { id: 279, name: 'Roulette', image: '/img/Roulette.webp' },
  { id: 280, name: 'Roulette 1', image: '/img/Roulette1.webp' },
  { id: 281, name: 'Roulette 2', image: '/img/Roulette2.webp' },
  { id: 282, name: 'Roulette Advanced', image: '/img/RouletteAdvanced.webp' },
  { id: 283, name: 'Roulette American', image: '/img/RouletteAmerican.webp' },
  { id: 284, name: 'Roulette Classic', image: '/img/RouletteClassic.webp' },
  { id: 285, name: 'Roulette EU', image: '/img/RouletteEU.webp' },
  { id: 286, name: 'Roulette Spanish 1', image: '/img/RouletteSpanish1.webp' },
  { id: 287, name: 'Roulette Spanish 2', image: '/img/RouletteSpanish2.webp' },
  { id: 288, name: 'Roulette X', image: '/img/RouletteX.webp' },
  { id: 289, name: 'Royal Riches Roulette', image: '/img/RoyalRichesRoulette.webp' },
  { id: 290, name: 'Royal Riches Spanish Roulette', image: '/img/RoyalRichesSpanishRoulette.webp' },
  { id: 291, name: 'Speed Roulette', image: '/img/SpeedRoulette.webp' },
  { id: 292, name: 'Speed Roulette 1', image: '/img/SpeedRoulette1.webp' },
  { id: 293, name: 'Speed Roulette 2', image: '/img/SpeedRoulette2.webp' },
  { id: 294, name: 'Turkish Roulette', image: '/img/TurkishRoulette.webp' },
  { id: 295, name: 'Oracle Blaze Roulette', image: '/img/VGL-oracleblazeroulette.200x200squareEN.webp' },
  { id: 296, name: 'Vip American Roulette', image: '/img/VipAmericanRoulette.webp' },
  { id: 297, name: 'VIP Auto Roulette', image: '/img/VIPAutoRoulette.webp' },
  { id: 298, name: 'Vip European Roulette', image: '/img/VipEuropeanRoulette.webp' },
  { id: 299, name: 'Vulcano Roulette', image: '/img/VulcanoRoulette.webp' },
  { id: 300, name: 'XXXtreme Lighting Roulette', image: '/img/XXXtremeLightingRoulette.webp' },
  { id: 301, name: 'Zoom Roulette', image: '/img/ZoomRoulette.webp' },
  { id: 302, name: 'Classic Roulette', image: '/img/ClassicRoulette.webp' },
  { id: 303, name: 'Live Roulette', image: '/img/LiveRoulette.webp' },
  { id: 304, name: 'N1 Roulette', image: '/img/N1Roulette.webp' },
  { id: 305, name: 'Neon Roulette', image: '/img/Neon Roulette_300x300.webp' },
  { id: 306, name: 'Racing Roulette Horses', image: '/img/RacingRouletteHorses.webp' },
  { id: 307, name: 'S1 Roulette', image: '/img/S1Roulette.webp' },
  { id: 308, name: 'S2 Roulette', image: '/img/S2Roulette.webp' },
  { id: 309, name: 'Bulgaria Roulette', image: '/img/VGL-bulgariaroulette.400x400squareEN.webp' },
  { id: 310, name: 'Oracle 360 Roulette', image: '/img/VGL-oracle360roulette.200x200squareEN.webp' },
  { id: 311, name: 'Portomaso Roulette', image: '/img/VGL-portomasoroulette.200x200squareEN.webp' },
  { id: 312, name: '3D Roulette 2066', image: '/img/3DRoulette2066.webp' },
  { id: 313, name: '500x Auto Roulette Imperial', image: '/img/500xAutoRouletteImperial.webp' },
  { id: 314, name: '500x Turkish Roulette', image: '/img/500xTurkishRoulette.webp' },
  { id: 315, name: '777x Galaxy Roulette', image: '/img/777xGalaxyRoulette.webp' },
  { id: 316, name: 'American Roulette (1)', image: '/img/AmericanRoulette(1).webp' },
  { id: 317, name: 'American Roulette (2)', image: '/img/AmericanRoulette(2).webp' },
  { id: 318, name: 'American Roulette', image: '/img/AmericanRoulette.webp' },
  { id: 319, name: 'Auto Lightning Roulette', image: '/img/AutoLightningRoulette.webp' },
  { id: 320, name: 'Auto Roulette', image: '/img/AutoRoulette.webp' },
  { id: 321, name: 'Auto Roulette 1 (1)', image: '/img/AutoRoulette1(1).webp' },
  { id: 322, name: 'Auto Roulette 1', image: '/img/AutoRoulette1.webp' },
  { id: 323, name: 'Auto Roulette Noir', image: '/img/AutoRouletteNoir.webp' },
  { id: 324, name: 'Bucharest Roulette', image: '/img/BucharestRoulette.webp' },
  { id: 325, name: 'Casino Malta Dual Play Roulette', image: '/img/CasinoMaltaDualPlayRoulette.webp' },
  { id: 326, name: 'Casino Roulette', image: '/img/CasinoRoulette.webp' },
  { id: 327, name: 'C Roulette', image: '/img/CRoulette.webp' },
  { id: 328, name: 'Diamond VIP Roulette', image: '/img/DiamondVIPRoulette.webp' },
  { id: 329, name: 'Double Ball Roulette', image: '/img/DoubleBallRoulette.webp' },
  { id: 330, name: 'Dragonara Dual Play Roulette', image: '/img/DragonaraDualPlayRoulette.webp' },
  { id: 331, name: 'D Roulette', image: '/img/DRoulette.webp' },
  { id: 332, name: 'European Roulette (1)', image: '/img/EuropeanRoulette(1).webp' },
];
export const rouletteGames = originalRouletteGames.map(game => ({
    ...game,
    image: createImageUrl(game.image)
}));


// --- Нові дані для Новинок ---
const originalNewGames = [
  { id: 501, title: 'Majestic Spirit', provider: 'Various', image: '/imgnew/MajesticSpirit.webp' },
  { id: 502, title: 'Majestic Jaguar', provider: 'Various', image: '/imgnew/MajesticJaguar.webp' },
  { id: 503, title: 'Luckys Wild Pub', provider: 'Various', image: '/imgnew/LuckysWildPub.webp' },
  { id: 504, title: 'La Dolce Vita Flaming Link', provider: 'Various', image: '/imgnew/LaDolceVitaFlamingLink.webp' },
  { id: 505, title: 'Jokers Mega Fortune', provider: 'Various', image: '/imgnew/JokersMegaFortune.webp' },
  { id: 506, title: 'Jackpot Joker FEVER', provider: 'Various', image: '/imgnew/JackpotJokerFEVER.webp' },
  { id: 507, title: 'Jackpot Blaze', provider: 'Various', image: '/imgnew/JackpotBlaze.webp' },
  { id: 508, title: 'Ice Fishing', provider: 'Various', image: '/imgnew/IceFishing.webp' },
  { id: 509, title: 'Heavenly Sage', provider: 'Various', image: '/imgnew/HeavenlySage.webp' },
  { id: 510, title: 'Gold Gobblers', provider: 'Various', image: '/imgnew/GoldGobblers.webp' },
  { id: 511, title: 'Forged In Fortune', provider: 'Various', image: '/imgnew/ForgedInFortune.webp' },
  { id: 512, title: 'Extra Crown Classic Buy Bonus', provider: 'Various', image: '/imgnew/ExtraCrownClassicBuyBonus.webp' },
  { id: 513, title: 'Dead Mouse Adventures', provider: 'Various', image: '/imgnew/DeadMouseAdventures.webp' },
  { id: 514, title: 'Cats Soup', provider: 'Various', image: '/imgnew/CatsSoup.webp' },
  { id: 515, title: 'Cash Strike Triple Fire', provider: 'Various', image: '/imgnew/CashStrikeTripleFire.webp' },
  { id: 516, title: 'Caribbean Queen', provider: 'Various', image: '/imgnew/CaribbeanQueen.webp' },
  { id: 517, title: 'Burning Coins 20', provider: 'Various', image: '/imgnew/BurningCoins20.webp' },
  { id: 518, title: 'Bivol Beasts', provider: 'Various', image: '/imgnew/BivolBeasts.webp' },
  { id: 519, title: 'Bisonado Prize Match k', provider: 'Various', image: '/imgnew/BisonadoPrizeMatch_k.webp' },
  { id: 520, title: 'Big Tuna Bonanza', provider: 'Various', image: '/imgnew/BigTunaBonanza.webp' },
  { id: 521, title: 'Bigger Bass Splash', provider: 'Various', image: '/imgnew/BiggerBassSplash.webp' },
  { id: 522, title: 'Artic Coins Running Wins', provider: 'Various', image: '/imgnew/ArticCoinsRunningWins.webp' },
  { id: 523, title: 'Arena of Fortune', provider: 'Various', image: '/imgnew/ArenaofFortune.webp' },
  { id: 524, title: 'All Ways Egypt', provider: 'Various', image: '/imgnew/AllWaysEgypt.webp' },
  { id: 525, title: 'Aiko and the Wind Spirit', provider: 'Various', image: '/imgnew/AikoandtheWindSpirit.webp' },
  { id: 526, title: '3 Tombs', provider: 'Various', image: '/imgnew/3Tombs.webp' },
  { id: 527, title: 'Zombie School Megaways', provider: 'Various', image: '/imgnew/ZombieSchoolMegaways.webp' },
  { id: 528, title: 'Zeus Divine Riches', provider: 'Various', image: '/imgnew/ZeusDivineRiches.webp' },
  { id: 529, title: 'Wolf Gold 4Pack', provider: 'Various', image: '/imgnew/WolfGold4Pack.webp' },
  { id: 530, title: 'Wild Classic', provider: 'Various', image: '/imgnew/WildClassic.webp' },
  { id: 531, title: 'Wheel Big Winner Millionaires Life', provider: 'Various', image: '/imgnew/WheelBigWinnerMillionairesLife.webp' },
  { id: 532, title: 'Westside Glory', provider: 'Various', image: '/imgnew/WestsideGlory.webp' },
  { id: 533, title: 'Ultra Xtreme 777', provider: 'Various', image: '/imgnew/UltraXtreme777.webp' },
  { id: 534, title: 'Tutankhamuns Thomb', provider: 'Various', image: '/imgnew/TutankhamunsThomb.webp' },
  { id: 535, title: 'Turkish Blackjack X12', provider: 'Various', image: '/imgnew/TurkishBlackjackX12.webp' },
  { id: 536, title: 'Turkish Blackjack X11', provider: 'Various', image: '/imgnew/TurkishBlackjackX11.webp' },
  { id: 537, title: 'Turkish Blackjack X10', provider: 'Various', image: '/imgnew/TurkishBlackjackX10.webp' },
  { id: 538, title: 'Turkish Blackjack X9', provider: 'Various', image: '/imgnew/TurkishBlackjackX9.webp' },
  { id: 539, title: 'Turkish Blackjack X8', provider: 'Various', image: '/imgnew/TurkishBlackjackX8.webp' },
  { id: 540, title: 'Triple Chili', provider: 'Various', image: '/imgnew/TripleChili.webp' },
  { id: 541, title: 'Titan Clash', provider: 'Various', image: '/imgnew/TitanClash.webp' },
  { id: 542, title: 'Thunder Vault Hold And Win', provider: 'Various', image: '/imgnew/ThunderVaultHoldAndWin.webp' },
  { id: 543, title: 'The Joker Show', provider: 'Various', image: '/imgnew/TheJokerShow.webp' },
  { id: 544, title: 'Sweet Bonanza Super Scatter', provider: 'Various', image: '/imgnew/SweetBonanzaSuperScatter.webp' },
  { id: 545, title: 'Super Flip Deluxe', provider: 'Various', image: '/imgnew/SuperFlipDeluxe.webp' },
  { id: 546, title: 'Spellmaster', provider: 'Various', image: '/imgnew/Spellmaster.webp' },
  { id: 547, title: 'Shoot Happens', provider: 'Various', image: '/imgnew/ShootHappens.webp' },
  { id: 548, title: 'Seven Seven', provider: 'Various', image: '/imgnew/SevenSeven.webp' },
  { id: 549, title: 'Seamen', provider: 'Various', image: '/imgnew/Seamen.webp' },
  { id: 550, title: 'Scandipigs', provider: 'Various', image: '/imgnew/Scandipigs.webp' },
  { id: 551, title: 'Royal Crown 777', provider: 'Various', image: '/imgnew/RoyalCrown777.webp' },
  { id: 552, title: 'Rock Paper Scissors', provider: 'Various', image: '/imgnew/RockPaperScissors.webp' },
  { id: 553, title: 'Roby Dick', provider: 'Various', image: '/imgnew/RobyDick.webp' },
  { id: 554, title: 'Ras Solar Empire', provider: 'Various', image: '/imgnew/RasSolarEmpire.webp' },
  { id: 555, title: 'Rainbow Princess', provider: 'Various', image: '/imgnew/RainbowPrincess.webp' },
  { id: 556, title: 'Queen Of Greece', provider: 'Various', image: '/imgnew/QueenOfGreece.webp' },
  { id: 557, title: 'Quack Squad', provider: 'Various', image: '/imgnew/QuackSquad.webp' },
  { id: 558, title: 'Prestige Crown', provider: 'Various', image: '/imgnew/PrestigeCrown.webp' },
  { id: 559, title: 'Plinko', provider: 'Various', image: '/imgnew/Plinko.webp' },
  { id: 560, title: 'Plinball Machine', provider: 'Various', image: '/imgnew/PlinballMachine.webp' },
  { id: 561, title: 'Piggy Riches 3 Hog Heaven', provider: 'Various', image: '/imgnew/PiggyRiches3HogHeaven.webp' },
  { id: 562, title: 'Piggy Prizes Wish of Riches', provider: 'Various', image: '/imgnew/PiggyPrizesWishofRiches.webp' },
  { id: 563, title: 'Oiran Hearts', provider: 'Various', image: '/imgnew/OiranHearts.webp' },
  { id: 564, title: 'Oath of Steel', provider: 'Various', image: '/imgnew/OathofSteel.webp' },
  { id: 565, title: 'Multihand Blackjack VIP', provider: 'Various', image: '/imgnew/MultihandBlackjackVIP.webp' },
  { id: 566, title: 'Moonstroke', provider: 'Various', image: '/imgnew/Moonstroke.webp' },
  { id: 567, title: 'Mega Wild Fruits And Chillies', provider: 'Various', image: '/imgnew/MegaWildFruitsAndChillies.webp' },
  { id: 568, title: 'Maximum Fish', provider: 'Various', image: '/imgnew/MaximumFish.webp' },
  { id: 569, title: 'Marlin Masters The Big Haul', provider: 'Various', image: '/imgnew/MarlinMastersTheBigHaul.webp' },
  { id: 570, title: 'Majestic Fury Power 5', provider: 'Various', image: '/imgnew/MajesticFuryPower5.webp' },
  { id: 571, title: 'Magic Treasures', provider: 'Various', image: '/imgnew/MagicTreasures.webp' },
  { id: 572, title: 'Lucky Tiger', provider: 'Various', image: '/imgnew/LuckyTiger.webp' },
  { id: 573, title: 'Lucky Shamrock Bingo', provider: 'Various', image: '/imgnew/LuckyShamrockBingo.webp' },
  { id: 574, title: 'Lucky Sakura Hold And Win', provider: 'Various', image: '/imgnew/LuckySakuraHoldAndWin.webp' },
  { id: 575, title: 'Lucky Safari Hold And Win', provider: 'Various', image: '/imgnew/LuckySafariHoldAndWin.webp' },
  { id: 576, title: 'Lucky Hot Coins', provider: 'Various', image: '/imgnew/LuckyHotCoins.webp' },
  { id: 577, title: 'Lucky Fruity Coin', provider: 'Various', image: '/imgnew/LuckyFruityCoin.webp' },
  { id: 578, title: 'Leprechauns Diamond Dig', provider: 'Various', image: '/imgnew/LeprechaunsDiamondDig.webp' },
  { id: 579, title: 'Kung Fu Tiger', provider: 'Various', image: '/imgnew/KungFuTiger.webp' },
  { id: 580, title: 'Johns Book', provider: 'Various', image: '/imgnew/JohnsBook.webp' },
  { id: 581, title: 'Jackpot District City of Fortune', provider: 'Various', image: '/imgnew/JackpotDistrictCityofFortune.webp' },
  { id: 582, title: 'Indonesian Mega Sic Bo', provider: 'Various', image: '/imgnew/IndonesianMegaSicBo.webp' },
  { id: 583, title: 'Ice Mints', provider: 'Various', image: '/imgnew/IceMints.webp' },
  { id: 584, title: 'Gladiator Plus', provider: 'Various', image: '/imgnew/GladiatorPlus.webp' },
  { id: 585, title: 'Gem Trio', provider: 'Various', image: '/imgnew/GemTrio.webp' },
  { id: 586, title: 'Gator Hunters', provider: 'Various', image: '/imgnew/GatorHunters.webp' },
  { id: 587, title: 'Futuristic Fruits', provider: 'Various', image: '/imgnew/FuturisticFruits.webp' },
  { id: 588, title: 'Fruit Punk', provider: 'Various', image: '/imgnew/FruitPunk.webp' },
  { id: 589, title: 'Fishing Bob Ways', provider: 'Various', image: '/imgnew/FishingBobWays.webp' },
  { id: 590, title: 'Fire Stampede 2', provider: 'Various', image: '/imgnew/FireStampede2.webp' },
  { id: 591, title: 'Field of Victory', provider: 'Various', image: '/imgnew/FieldofVictory.webp' },
  { id: 592, title: 'Family Feud', provider: 'Various', image: '/imgnew/FamilyFeud.webp' },
  { id: 593, title: 'Epic Clover 100Booster', provider: 'Various', image: '/imgnew/EpicClover100Booster.webp' },
  { id: 594, title: 'Dragons Glow HoldandWin', provider: 'Various', image: '/imgnew/DragonsGlowHoldandWin.webp' },
  { id: 595, title: 'Dragons Diamonds', provider: 'Various', image: '/imgnew/DragonsDiamonds.webp' },
  { id: 596, title: 'Don Juan Peppers', provider: 'Various', image: '/imgnew/DonJuanPeppers.webp' },
  { id: 597, title: 'Dino Drop', provider: 'Various', image: '/imgnew/DinoDrop.webp' },
  { id: 598, title: 'Dice Invaders', provider: 'Various', image: '/imgnew/DiceInvaders.webp' },
  { id: 599, title: 'Diamond Chest HoldNLink (1)', provider: 'Various', image: '/imgnew/DiamondChestHoldNLink (1).webp' },
  { id: 600, title: 'Dan Marino Hail Mary', provider: 'Various', image: '/imgnew/DanMarinoHailMary.webp' },
  { id: 601, title: 'Cube Guys', provider: 'Various', image: '/imgnew/CubeGuys.webp' },
  { id: 602, title: 'Crystal Clusters', provider: 'Various', image: '/imgnew/CrystalClusters.webp' },
  { id: 603, title: 'Conquer Babylon', provider: 'Various', image: '/imgnew/ConquerBabylon.webp' },
  { id: 604, title: 'Clover Supreme HoldandWin', provider: 'Various', image: '/imgnew/CloverSupremeHoldandWin.webp' },
  { id: 605, title: 'City Heat Hold Hit', provider: 'Various', image: '/imgnew/CityHeatHoldHit.webp' },
  { id: 606, title: 'Carnival Queen 2', provider: 'Various', image: '/imgnew/CarnivalQueen2.webp' },
  { id: 607, title: 'Bullets and Bounty', provider: 'Various', image: '/imgnew/BulletsandBounty.webp' },
  { id: 608, title: 'Book Of The Carpathian Witch', provider: 'Various', image: '/imgnew/BookOfTheCarpathianWitch.webp' },
  { id: 609, title: 'Book Of Majestic Lemur', provider: 'Various', image: '/imgnew/BookOfMajesticLemur.webp' },
  { id: 610, title: 'Book of Flames BuyBonus', provider: 'Various', image: '/imgnew/BookofFlamesBuyBonus.webp' },
  { id: 611, title: 'Bob Marlin Goes Deep', provider: 'Various', image: '/imgnew/BobMarlinGoesDeep.webp' },
  { id: 612, title: 'Blades of Rome', provider: 'Various', image: '/imgnew/BladesofRome.webp' },
  { id: 613, title: 'Bit Vault', provider: 'Various', image: '/imgnew/BitVault.webp' },
  { id: 614, title: 'Big Cat Gold', provider: 'Various', image: '/imgnew/BigCatGold.webp' },
  { id: 615, title: 'Big Bass Reel Repeat', provider: 'Various', image: '/imgnew/BigBassReelRepeat.webp' },
  { id: 616, title: 'Bellmania', provider: 'Various', image: '/imgnew/Bellmania.webp' },
  { id: 617, title: 'Balloons', provider: 'Various', image: '/imgnew/Balloons.webp' },
  { id: 618, title: 'Astro Cash', provider: 'Various', image: '/imgnew/AstroCash.webp' },
  { id: 619, title: 'Arrows Of Hachiman', provider: 'Various', image: '/imgnew/ArrowsOfHachiman.webp' },
  { id: 620, title: 'Argonauts', provider: 'Various', image: '/imgnew/Argonauts.webp' },
  { id: 621, title: 'Anksunamun Deluxe', provider: 'Various', image: '/imgnew/AnksunamunDeluxe.webp' },
  { id: 622, title: 'Angry Crabs', provider: 'Various', image: '/imgnew/AngryCrabs.webp' },
  { id: 623, title: 'Amazons Riches', provider: 'Various', image: '/imgnew/AmazonsRiches.webp' },
  { id: 624, title: 'Allways Egypt Fortune', provider: 'Various', image: '/imgnew/AllwaysEgyptFortune.webp' },
  { id: 625, title: '888 Bonus Combo', provider: 'Various', image: '/imgnew/888BonusCombo.webp' },
  { id: 626, title: '40 Sparkling Crown', provider: 'Various', image: '/imgnew/40SparklingCrown.webp' },
  { id: 627, title: '10 Extra Bank', provider: 'Various', image: '/imgnew/10ExtraBank.webp' },
  { id: 628, title: '4 Horsemen 3 Inferno', provider: 'Various', image: '/imgnew/4Horsemen3Inferno.webp' },
  { id: 629, title: '3 Pots of LunarWolfHoldWin', provider: 'Various', image: '/imgnew/3PotsofLunarWolfHoldWin.webp' },
  { id: 630, title: '3 Coin Wild Horse', provider: 'Various', image: '/imgnew/3CoinWildHorse.webp' },
  { id: 631, title: '1 Reel Wolf Piggies', provider: 'Various', image: '/imgnew/1ReelWolfPiggies.webp' },
  { id: 632, title: 'Ultimate Golden Dragon Inferno', provider: 'Various', image: '/imgnew/UltimateGoldenDragonInferno.webp' },
  { id: 633, title: '3x5 Hold The Spin', provider: 'Various', image: '/imgnew/3x5 Hold The Spin..webp' },
  { id: 634, title: 'You Can Piggy Bank On It', provider: 'Various', image: '/imgnew/YouCanPiggyBankOnIt.webp' },
  { id: 635, title: 'Veracruz Wild', provider: 'Various', image: '/imgnew/VeracruzWild.webp' },
  { id: 636, title: 'Tsar Wars', provider: 'Various', image: '/imgnew/TsarWars.webp' },
  { id: 637, title: 'Trinity PowerLink RunningWins', provider: 'Various', image: '/imgnew/TrinityPowerLinkRunningWins.webp' },
  { id: 638, title: 'Tiki Runner Clusters', provider: 'Various', image: '/imgnew/TikiRunnerClusters.webp' },
  { id: 639, title: 'The Dog Heroes', provider: 'Various', image: '/imgnew/TheDogHeroes.webp' },
  { id: 640, title: 'The Big Race HoldNLink', provider: 'Various', image: '/imgnew/TheBigRaceHoldNLink.webp' },
  { id: 641, title: 'Princess Dwarfs Deluxe', provider: 'Various', image: '/imgnew/PrincessDwarfsDeluxe.webp' },
  { id: 642, title: 'Master Gems', provider: 'Various', image: '/imgnew/MasterGems.webp' },
];
export const newGames = originalNewGames.map(game => ({
    ...game,
    image: createImageUrl(game.image)
}));

// --- Дані для Настільних ігор ---
const originalTableGames = [
  { id: 266, name: "Texas hold 'em", image: '/imgtable/1.webp' },
  { id: 267, name: "Blackjack", image: '/imgtable/2.webp' },
  { id: 268, name: "5-Card Draw", image: '/imgtable/3.webp' },
  { id: 269, name: "Baccarat", image: '/imgtable/4.webp' },
  { id: 270, name: "Omaha Poker", image: '/imgtable/5.webp' },
  { id: 271, name: "Texas hold 'em", image: '/imgtable/6.webp' },
  { id: 272, name: "Blackjack", image: '/imgtable/7.webp' },
  { id: 273, name: "5-Card Draw", image: '/imgtable/8.webp' },
  { id: 274, name: "Baccarat", image: '/imgtable/9.webp' },
  { id: 275, name: "Omaha Poker", image: '/imgtable/10.webp' },
  { id: 276, name: 'Video Poker', image: '/imgtable/VideoPoker.jpeg' },
  { id: 277, name: 'Multihand Blackjack VIP', image: '/imgtable/MultihandBlackjackVIP.webp' },
  { id: 278, name: 'Virtual Burning Roulette', image: '/imgtable/VirtualBurningRoulette.webp' },
  { id: 279, name: '3 Card Poker', image: '/imgtable/3CardPoker.webp' },
  { id: 280, name: '3D Roulette 2066', image: '/imgtable/3DRoulette2066.webp' },
  { id: 281, name: 'Aces And Faces', image: '/imgtable/AcesAndFaces.webp' },
  { id: 282, name: 'American Blackjack', image: '/imgtable/AmericanBlackjack.webp' },
  { id: 283, name: 'Auto Roulette', image: '/imgtable/AutoRoulette (1).webp' },
  { id: 284, name: 'Baccarat', image: '/imgtable/Baccarat(1).webp' },
  { id: 285, name: 'Baccarat', image: '/imgtable/Baccarat(2).webp' },
  { id: 286, name: 'Baccarat', image: '/imgtable/Baccarat(3).webp' },
  { id: 287, name: 'Baccarat', image: '/imgtable/Baccarat.webp' },
  { id: 288, name: 'Baccarat 777', image: '/imgtable/Baccarat777.webp' },
  { id: 289, name: 'Baccarat mini', image: '/imgtable/Baccaratmini.webp' },
  { id: 290, name: 'Baccarat PRO', image: '/imgtable/BaccaratPRO.webp' },
  { id: 291, name: 'Baccarat VIP', image: '/imgtable/BaccaratVIP.webp' },
  { id: 292, name: 'Blackjack', image: '/imgtable/Blackjack.webp' },
  { id: 293, name: 'Blackjack Bonus Wheel 1000', image: '/imgtable/BlackjackBonusWheel1000.webp' },
  { id: 294, name: 'Blackjack Gold', image: '/imgtable/BlackjackGold.webp' },
  { id: 295, name: 'Blackjack Lucky Ladies', image: '/imgtable/BlackjackLuckyLadies.webp' },
  { id: 296, name: 'Blackjack MH213', image: '/imgtable/BlackjackMH213.webp' },
  { id: 297, name: 'Blackjack MH Perfect Pairs', image: '/imgtable/BlackjackMHPerfectPairs.webp' },
  { id: 298, name: 'Blackjack MH VIP', image: '/imgtable/BlackjackMHVIP.webp' },
  { id: 299, name: 'Blackjack Multi Hand', image: '/imgtable/BlackJackMultiHand.webp' },
  { id: 300, name: 'Blackjack SH VIP', image: '/imgtable/BlackjackSHVIP.webp' },
  { id: 301, name: 'Blackjack Single Hand', image: '/imgtable/BlackjackSingleHand.webp' },
  { id: 302, name: 'Blackjack VIP', image: '/imgtable/BlackjackVIP(1).webp' },
  { id: 303, name: 'Blackjack VIP', image: '/imgtable/BlackjackVIP.webp' },
  { id: 304, name: 'Bonus Deuces Wild', image: '/imgtable/BonusDeucesWild.webp' },
  { id: 305, name: 'Bucharest Roulette', image: '/imgtable/BucharestRoulette.webp' },
  { id: 306, name: 'Caribbean Stud Poker', image: '/imgtable/CaribbeanStudPoker.webp' },
  { id: 307, name: 'Casino Holdem', image: '/imgtable/CasinoHoldem.webp' },
  { id: 308, name: 'Casino Roulette', image: '/imgtable/CasinoRoulette.webp' },
  { id: 309, name: 'Choco Reels', image: '/imgtable/ChocoReels.webp' },
  { id: 310, name: 'Christmas Storm', image: '/imgtable/ChristmasStorm.webp' },
  { id: 311, name: 'Cleopatras Gems Bingo', image: '/imgtable/CleopatrasGemsBingo.webp' },
  { id: 312, name: 'Domino Go', image: '/imgtable/DominoGo.webp' },
  { id: 313, name: 'European Roulette', image: '/imgtable/EuropeanRoulette(1).webp' },
  { id: 314, name: 'European Roulette', image: '/imgtable/EuropeanRoulette.webp' },
  { id: 315, name: 'European Roulette VIP', image: '/imgtable/EuropeanRouletteVIP.webp' },
  { id: 316, name: 'Extreme Texas Holdem', image: '/imgtable/ExtremeTexasHoldem.webp' },
  { id: 317, name: 'First Person Deal or No Deal', image: '/imgtable/FirstPersonDealorNoDeal.webp' },
  { id: 318, name: 'Fortune Roulette', image: '/imgtable/FortuneRoulette.webp' },
  { id: 319, name: 'Golden 10', image: '/imgtable/Golden10.webp' },
  { id: 320, name: 'Gold Roulette', image: '/imgtable/GoldRoulette.webp' },
  { id: 321, name: 'Jacks Or Better', image: '/imgtable/JacksOrBetter.webp' },
  { id: 322, name: 'Multihand Blackjack', image: '/imgtable/Multihand Blackjack.webp' },
  { id: 323, name: 'Premium European Blackjack', image: '/imgtable/PremiumEuropeanBlackjack.webp' },
  { id: 324, name: 'Romanian Blackjack X1', image: '/imgtable/RomanianBlackjackX1.webp' },
  { id: 325, name: 'Romanian Blackjack X2', image: '/imgtable/RomanianBlackjackX2.webp' },
  { id: 326, name: 'Romanian Blackjack X3', image: '/imgtable/RomanianBlackjackX3.webp' },
  { id: 327, name: 'Roulette', image: '/imgtable/Roulette.webp' },
  { id: 328, name: 'Roulette Classic', image: '/imgtable/RouletteClassic.webp' },
  { id: 329, name: 'Roulette EU', image: '/imgtable/RouletteEU.webp' },
  { id: 330, name: 'Sic Bo', image: '/imgtable/SicBo(1).webp' },
  { id: 331, name: 'Sic Bo', image: '/imgtable/SicBo.webp' },
  { id: 332, name: 'Single Deck Blackjack', image: '/imgtable/SingleDeckBlackjack.webp' },
  { id: 339, name: 'Video Poker', image: '/imgtable/VideoPoker.webp' },
];
export const Table = originalTableGames.map(game => ({
    ...game,
    image: createImageUrl(game.image)
}));














