<script setup>
import { ref, computed } from 'vue';
// Імпортуємо оригінальні дані, як і було у вашому файлі.
// Тепер колонка "Очки" буде мати правильні, оригінальні значення.
import { leaderboardData } from '../data/mockData.js';

// Дані про виграші з вашого .txt файлу
const winningsData = [
    500000, 300000, 200000, 120000, 100000, 80000, 60000, 50000, 40000, 30000,
    12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000, 12000,
    9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000,
    7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000,
    5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000,
    3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800,
    3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800,
    3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800,
    3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800,
    3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800
];

// Поєднуємо оригінальні дані гравців з даними про виграші,
// НЕ ЗМІНЮЮЧИ оригінальні `score` (очки).
const combinedData = leaderboardData.map((player, index) => {
  return {
    ...player, // Копіюємо всі оригінальні дані гравця (place, player, score)
    winnings: winningsData[index] || 0 // Додаємо нове поле з виграшем
  };
});

const players = ref(combinedData);
const currentPage = ref(1);
const itemsPerPage = 10;

// Обчислюємо загальну кількість сторінок
const totalPages = computed(() => Math.ceil(players.value.length / itemsPerPage));

// Обчислюємо, яких саме гравців показувати на поточній сторінці
const paginatedPlayers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return players.value.slice(start, end);
});

// Функції для перемикання сторінок
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

// Функція для генерації трьох випадкових цифр
function generateRandomId() {
  return Math.floor(100 + Math.random() * 900);
}
</script>

<template>
  <div class="leaderboard-widget">
    <h3 class="leaderboard-heading">
      <img src="/imgnew/kub0.png" alt="Іконка кубка" class="heading-icon">
      Таблица лидеров
    </h3>

    <div class="table-wrap" role="region" aria-label="Таблица лидеров">
      <table class="leaderboard">
        <thead>
          <tr>
            <th class="place-column"></th>
            <th>Место</th>
            <th>ID Игрока</th>
            <th>Очки</th>
            <th class="winnings-column">Выигрыш</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in paginatedPlayers" :key="player.place">
            <td class="place-icon-cell">
              <img 
                v-if="player.place <= 3"
                src="/imgnew/kub1.png" 
                alt="Кубок" 
                class="place-icon gold"
              />
              <img 
                v-else
                src="/imgnew/kub2.png" 
                alt="Кубок" 
                class="place-icon gray"
              />
            </td>
            <td>
              <span :class="{ 'gold-place': player.place <= 3 }">
                {{ player.place }}
              </span>
            </td>
            <td>ID Игрока: ***{{ player.player.split('***')[1] }} {{ generateRandomId() }}</td>
            <td>{{ new Intl.NumberFormat('ru-RU').format(player.score) }}</td>
            <td class="winnings-column">{{ new Intl.NumberFormat('ru-RU').format(player.winnings) }} руб.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        ‹
      </button>
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">
        ›
      </button>
    </div>
  </div>
</template>

<style scoped>
.leaderboard-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 24px;
}
.heading-icon {
  width: 54px;
  height: 54px;
  vertical-align: middle;
}
.gold-place {
  color: #f65c21;
  font-weight: 700;
}
.place-icon-cell {
  width: 100px;
  padding-right: 0;
  text-align: center;
}
.place-icon {
  width: 50px;
  height: 50px;
  display: inline-block;
}
.table-wrap {
  overflow-x: auto;
}
.leaderboard {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.leaderboard th, .leaderboard td {
  padding: 12px 16px;
  border-bottom: 1px solid #1c202a;
}
.leaderboard th.place-column {
  width: 40px;
  padding-left: 16px;
}
.leaderboard th {
  background: #151821;
}
.leaderboard tbody tr:hover {
  background: #1a1e26;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}
.pagination button {
  background: var(--card);
  border: 1px solid #2a2f3a;
  color: var(--text);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 👇 НОВИЙ СТИЛЬ ТУТ: для вирівнювання колонки по правому краю */
.winnings-column {
  text-align: right;
}
</style>