<script setup>
import { ref, computed } from 'vue';
import { leaderboardData } from '../data/mockData.js'; // Імпортуємо дані

const players = ref(leaderboardData);
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
</script>

<template>
  <div class="leaderboard-widget">
    <div class="table-wrap" role="region" aria-label="Таблица лидеров">
      <table class="leaderboard">
        <thead>
          <tr>
            <th>Место</th>
            <th>Игрок</th>
            <th>Очки</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in paginatedPlayers" :key="player.place">
            <td>{{ player.place }}</td>
            <td>{{ player.player }}</td>
            <td>{{ new Intl.NumberFormat('ru-RU').format(player.score) }}</td>
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
  border-radius: 8px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s;
}
.pagination button:hover:not(:disabled) {
  background: var(--accent);
  border-color: var(--accent);
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>