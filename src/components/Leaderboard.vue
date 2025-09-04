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
            <th class="place-column"></th> <th>Место</th>
            <th>ID Игрока</th> <th>Очки</th>
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
  display: flex; /* Розміщує іконку та текст в один рядок */
  align-items: center;
  gap: 8px; /* Відстань між іконкою та текстом */
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 24px;
}
.heading-icon {
  width: 54px; /* Розмір іконки kub0 */
  height: 54px;
  vertical-align: middle; /* Вирівнює іконку по центру тексту */
}

/* Колір для перших трьох місць */
.gold-place {
  color: #f65c21;
  font-weight: 700;
}

/* Стилі для іконок кубків у таблиці */
.place-icon-cell {
  width: 100px; /* Фіксована ширина для колонки з іконками */
  padding-right: 0; /* Прибираємо зайвий відступ */
  text-align: center; /* Центруємо іконки в колонці */
}
.place-icon {
  width: 50px; /* Розмір кубків kub1 та kub2 */
  height: 50px;
  display: inline-block; /* Щоб можна було застосовувати margin */
  /* background-color: transparent; */ /* Додайте це, якщо іконки мають фон, але не повинні */
}

/* Стилі для таблиці */
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
/* Заголовок для іконки кубка */
.leaderboard th.place-column {
  width: 40px; /* Ширина колонки для іконки */
  padding-left: 16px; /* Відступ зліва для вирівнювання */
}
.leaderboard th {
  background: #151821;
}
.leaderboard tbody tr:hover {
  background: #1a1e26;
}

/* Стилі для пагінації */
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
</style>