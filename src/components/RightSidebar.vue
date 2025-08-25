<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// --- 1. ВЕЛИЧЕЗНА БАЗА НІКНЕЙМІВ БЕЗ ЦИФР ---
const adjectives = [
  'Silent', 'Golden', 'Crystal', 'Shadow', 'Rapid', 'Cosmic', 'Quantum', 'Phantom', 
  'Electric', 'Frozen', 'Crimson', 'Azure', 'Solar', 'Lunar', 'Iron'
];
const subjects = [
  'Gambler', 'Joker', 'Spectre', 'Pioneer', 'Voyager', 'Phoenix', 'Oracle', 'Striker',
  'Guardian', 'Reaper', 'Nomad', 'Paladin', 'Viper', 'Titan', 'Wizard'
];

// Створюємо всі можливі комбінації (15 * 15 = 225 унікальних імен)
const allPossibleNames = [];
for (const adj of adjectives) {
  for (const subj of subjects) {
    allPossibleNames.push(`${adj}${subj}`);
  }
}

// Перемішуємо масив, щоб порядок був випадковим (алгоритм Fisher-Yates)
for (let i = allPossibleNames.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [allPossibleNames[i], allPossibleNames[j]] = [allPossibleNames[j], allPossibleNames[i]];
}

const playerNamesArray = allPossibleNames;
let currentNameIndex = 0; // Лічильник для унікальних імен

const gameData = [
  { name: 'Gates of Olympus', image: '/img/rbarimg1.png' },
  { name: 'Sweet Bonanza', image: '/img/rbarimg2.png' },
  { name: 'The Dog House', image: '/img/rbarimg3.png' },
  { name: 'Book of Dead', image: '/img/BookofRa.gif' },
  { name: 'Sugar Rush', image: '/img/SugarRush.gif' },
  { name: 'Big Bass Bonanza', image: '/img/SweetBonanza.gif' },
];

// --- Стан компонента ---
const winners = ref([]);
const maxWinnersInList = 10; 
let mainUpdateInterval = null;

// --- Функція для генерації одного випадкового переможця ---
function generateRandomWinner() {
  // Беремо наступне унікальне ім'я зі списку по черзі
  const uniquePlayerName = playerNamesArray[currentNameIndex];
  currentNameIndex = (currentNameIndex + 1) % playerNamesArray.length; // Переходимо до наступного і зациклюємо

  const randomGame = gameData[Math.floor(Math.random() * gameData.length)];
  const randomAmount = Math.floor(Math.random() * 85000) + 15001;
  const formattedAmount = new Intl.NumberFormat('ru-RU').format(randomAmount) + ' RUB';

  return {
    id: Date.now() + Math.random(),
    gameName: randomGame.name,
    playerName: uniquePlayerName, // Використовуємо унікальне ім'я
    amount: formattedAmount,
    image: randomGame.image
  };
}

// --- Логіка оновлення списку ---
function updateWinnersList() {
  if (winners.value.length >= maxWinnersInList) {
    winners.value.pop();
  }
  winners.value.unshift(generateRandomWinner());
}

// --- Життєвий цикл компонента ---
onMounted(() => {
  let initialFillCount = 0;
  const initialFillInterval = setInterval(() => {
    if (initialFillCount < maxWinnersInList) {
      winners.value.push(generateRandomWinner());
      initialFillCount++;
    } else {
      clearInterval(initialFillInterval);
      mainUpdateInterval = setInterval(updateWinnersList, 3000);
    }
  }, 300);
});

onUnmounted(() => {
  clearInterval(mainUpdateInterval);
});
</script>

<template>
  <aside class="sidebar right-sidebar">
    <div class="top-winners">
      <div class="title">Топ переможці сьогодні</div>
      <TransitionGroup name="winner-list" tag="ul" class="winners-list">
        <li class="winner-item" v-for="winner in winners" :key="winner.id">
          <a href="#" class="winner-link">
            <div class="winner-thumb">
              <img :src="winner.image" alt="Картинка гри" />
            </div>
            <div class="winner-info">
              <div class="game-name">{{ winner.gameName }}</div>
              <div class="player-name">{{ winner.playerName }}</div>
              <div class="win-status">ВИГРАВ</div>
              <div class="win-amount">{{ winner.amount }}</div>
            </div>
          </a>
        </li>
      </TransitionGroup>
    </div>
  </aside>
</template>

<style scoped>
/* --- 2. БІЛЬШ ПЛАВНА АНІМАЦІЯ --- */

.winner-list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.winner-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.winner-list-enter-active,
.winner-list-leave-active {
  /* Збільшуємо тривалість і змінюємо функцію для плавності */
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.winner-list-leave-active {
  position: absolute;
  width: 100%;
}
.winner-list-move {
  /* Анімація зсуву також робимо плавнішою */
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>