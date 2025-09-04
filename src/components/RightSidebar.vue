<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
// Імпортуємо дані з центрального файлу
import { playerNamesArray, gameData } from '@/data/mockData.js';
// 👇 1. Імпортуємо нашого глобального посередника
import { eventBus } from '@/eventBus.js'; // Переконайтесь, що шлях правильний

let currentNameIndex = 0;

const winners = ref([]);
const maxWinnersInList = ref(10);
let mainUpdateInterval = null;
const router = useRouter();

// 👇 2. Додаємо ту саму перевірку авторизації
const isUserAuthenticated = computed(() => {
  if (typeof window !== 'undefined') {
    // Використовуйте 'user-id' або 'authUser', залежно від того, що ви зберігаєте
    return !!localStorage.getItem('user-id') || !!localStorage.getItem('authUser');
  }
  return false;
});

// 👇 3. Створюємо новий обробник кліку для карток переможців
function handleWinnerClick() {
  if (isUserAuthenticated.value) {
    router.push('/deposit');
  } else {
    // Якщо користувач не увійшов, надсилаємо сигнал в App.vue
    eventBus.emit('require-auth');
  }
}


// --- ІСНУЮЧА ЛОГІКА КОМПОНЕНТА (без змін) ---

// --- Адаптація під розмір екрана ---
function checkScreenSize() {
  if (window.innerWidth <= 1024) {
    maxWinnersInList.value = 5;
  } else {
    maxWinnersInList.value = 12;
  }
  if (winners.value.length > maxWinnersInList.value) {
     winners.value = winners.value.slice(0, maxWinnersInList.value);
  }
}

// --- Розрахунок ФІКСОВАНОЇ висоти списку (без скролу) ---
const listHeightPx = computed(() => {
  const itemHeight = 78; // Висота картки + відступ
  return `${maxWinnersInList.value * itemHeight}px`;
});

// --- Генерація переможця ---
function generateRandomWinner() {
  const uniquePlayerName = playerNamesArray[currentNameIndex];
  currentNameIndex = (currentNameIndex + 1) % playerNamesArray.length;

  const randomGame = gameData[Math.floor(Math.random() * gameData.length)];
  const randomAmount = Math.floor(Math.random() * 85000) + 15001;
  const formattedAmount = new Intl.NumberFormat('ru-RU').format(randomAmount) + ' RUB';

  return {
    id: Date.now() + Math.random(),
    gameName: randomGame.name,
    playerName: uniquePlayerName,
    amount: formattedAmount,
    image: randomGame.image
  };
}

// --- Оновлення списку ---
function updateWinnersList() {
  winners.value.unshift(generateRandomWinner());
  if (winners.value.length > maxWinnersInList.value) {
    winners.value.pop();
  }
}

// --- Життєвий цикл компонента ---
onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  let initialFillCount = 0;
  const initialFillInterval = setInterval(() => {
    if (initialFillCount < maxWinnersInList.value) {
      winners.value.push(generateRandomWinner());
      initialFillCount++;
    } else {
      clearInterval(initialFillInterval);
      mainUpdateInterval = setInterval(updateWinnersList, 3000);
    }
  }, 200);
});

onUnmounted(() => {
  clearInterval(mainUpdateInterval);
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <aside class="sidebar right-sidebar">
    <div class="top-winners">
      <div class="title">Топ победителей сегодня</div>
      <TransitionGroup name="winner-list" tag="ul" class="winners-list" :style="{ height: listHeightPx }">
        <li class="winner-item" v-for="winner in winners" :key="winner.id">
          <!-- 👇 Замінюємо прямий редірект на виклик нашої нової функції -->
          <a href="#" class="winner-link" @click.prevent="handleWinnerClick">
            <div class="winner-thumb">
              <img :src="winner.image" :alt="winner.gameName" />
            </div>
            <div class="winner-details">
              <div class="player-name">{{ winner.playerName }}</div>
              <div class="win-info">
                <span class="win-label">выиграл</span>
                <span class="win-amount">{{ winner.amount }}</span>
              </div>
              <div class="game-name">{{ winner.gameName }}</div>
            </div>
          </a>
        </li>
      </TransitionGroup>
    </div>
  </aside>
</template>

<style scoped>
/* Усі ваші стилі залишаються без змін */
.right-sidebar {
  background-color: var(--bg-dark, #12151c);
  padding: 16px;
  border-left: 1px solid var(--border-color, #2a2f3a);
  height: 100%;
}

.title {
  font-size: 0.9rem; /* Менший шрифт */
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text, #fff);
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color, #2a2f3a);
  text-align: center;
}

.winners-list {
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  /* Висота фіксована, скролу немає */
  overflow: hidden;
  transition: height 0.3s ease-in-out;
}

.winner-item {
  height: 70px; /* Менша висота картки */
  margin-bottom: 8px;
}

.winner-link {
  background-color: var(--card, #1a1e28);
  border-radius: var(--radius, 8px);
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px; /* Менший відступ */
  transition: background-color 0.2s ease;
}

.winner-link:hover {
  background-color: #252a36;
}

.winner-thumb {
  width: 50px; /* Менша іконка */
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.winner-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.winner-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Центрування по вертикалі */
  overflow: hidden;
}

.player-name {
  font-size: 0.85rem; /* Менший шрифт */
  font-weight: 600;
  color: var(--text, #fff);
  line-height: 1.2; /* Щільніший рядок */
  white-space: normal;
  word-break: break-word;
}

.win-info {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin: 2px 0; /* Менші відступи */
}

.win-label {
  font-size: 0.7rem; /* Менший шрифт */
  color: var(--text-secondary, #8a99b2);
}

.win-amount {
  font-size: 1rem; /* Менший шрифт */
  font-weight: 700;
  color: var(--accent, #00bfff);
}

.game-name {
  font-size: 0.75rem; /* Менший шрифт */
  color: var(--text-secondary, #8a99b2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* --- АНИМАЦИЯ --- */
.winner-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}
.winner-list-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.winner-list-enter-active,
.winner-list-leave-active {
  transition: all 0.5s ease-in-out;
}
.winner-list-leave-active {
  position: absolute;
  width: calc(100% - 32px);
}
.winner-list-move {
  transition: transform 0.5s ease-in-out;
}
</style>
