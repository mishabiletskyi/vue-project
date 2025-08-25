<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// Імпортуємо дані з центрального файлу
import { playerNamesArray, gameData } from '@/data/mockData.js';

// Лічильник для унікальних імен, щоб вони не повторювались
let currentNameIndex = 0; 

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
    playerName: uniquePlayerName,
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
  // Плавне початкове завантаження списку
  let initialFillCount = 0;
  const initialFillInterval = setInterval(() => {
    if (initialFillCount < maxWinnersInList) {
      winners.value.push(generateRandomWinner());
      initialFillCount++;
    } else {
      clearInterval(initialFillInterval);
      // Запускаємо основний інтервал оновлення після заповнення
      mainUpdateInterval = setInterval(updateWinnersList, 3000);
    }
  }, 300);
});

onUnmounted(() => {
  // Очищуємо інтервал при зникненні компонента
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
/* Плавна анімація */
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
  transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.winner-list-leave-active {
  position: absolute;
  width: 100%;
}
.winner-list-move {
  transition: transform 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>