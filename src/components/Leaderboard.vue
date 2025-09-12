<script setup>
import { ref, computed } from 'vue';
import { leaderboardData } from '../data/mockData.js';

// --- ВАЖЛИВО! Вставте сюди ваш URL до бакету 'imgnew' ---
const SUPABASE_URL = 'https://vngvrmbpffrtfhkauous.supabase.co/storage/v1/object/public/imgnew';

// --- Константи для зображень ---
const headingIcon = `${SUPABASE_URL}/kub0.png`;
const goldCupIcon = `${SUPABASE_URL}/kub1.png`;
const grayCupIcon = `${SUPABASE_URL}/kub2.png`;

// --- РУССКИЕ НИКНЕЙМЫ ---
const nicknames = [
  "ТемныйСтранник", "СтальнойКулак", "ВечныйОхотник", "Призрак_777", "Громовержец", "ЛедянойШторм", "БешеныйХомяк",
  "ЦарьГоры", "Неудержимый", "Волк_Одиночка", "Майор_Боль", "СнежныйБарс", "КрасныйБарон", "Тень_Империи",
  "ЖелезныйФеликс", "Смерч", "Ночной_Кошмар", "Разрушитель", "Агент_Ноль", "Пророк", "ТихийУбийца", "БатяВЗдании",
  "Молот_Рока", "Сержант_Ярость", "Вихрь", "Скала", "Аннигилятор", "Дед_Мороз", "Властелин", "Оракул", "Паладин",
  "Снайпер", "Просто_Царь", "Кочевник", "Берсерк", "Фантом", "Доминатор", "Император", "Легенда_23", "Зверобой",
  "Черный_Лотос", "Капитан_Удача", "Мастер_Игры", "Гладиатор", "Ворон", "ОхотникЗаГоловами", "Терминатор",
  "Костолом", "Пуля", "Спартанец", "Гризли", "Хищник", "Шаман", "Рейнджер", "Циклон", "Мясник", "Ястреб",
  "Диктатор", "Цезарь", "Бульдозер", "Гарпун", "Легион", "Метеор", "Пират", "Скорпион", "Тайфун", "Чародей",
  "Эгида", "Юпитер", "Адмирал", "Багира", "Вулкан", "Гранит", "Дракон", "Егерь", "Жнец", "Зенит", "Ирбис", "Корсар",
  "Линкор", "Мангуст", "Невидимка", "Одиссей", "Питон", "Раптор", "Сокол", "Торнадо", "Ураган", "Феникс",
  "Хан", "Циклоп", "Шмель", "Эльбрус", "Южанин", "Ягуар", "Айсберг", "Боцман", "Витязь", "Гриф", "Демон_Про",
  "Есаул", "Знахарь", "Искатель", "Казак", "Монарх", "Отшельник"
];

const winningsData = [
  500000, 300000, 200000, 120000, 100000, 80000, 60000, 50000, 40000, 30000, 12000, 12000, 12000, 12000,
  12000, 12000, 12000, 12000, 12000, 12000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000,
  7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 7000, 5000, 5000, 5000, 5000, 5000, 5000, 5000,
  5000, 5000, 5000, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800,
  3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800,
  3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800, 3800
];

const combinedData = leaderboardData.map((player, index) => {
  return {
    ...player,
    nickname: nicknames[index] || `Игрок_${index + 1}`,
    winnings: winningsData[index] || 0
  };
});

const players = ref(combinedData);
const currentPage = ref(1);
const itemsPerPage = 10;

const totalPages = computed(() => Math.ceil(players.value.length / itemsPerPage));

const paginatedPlayers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return players.value.slice(start, end);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>

<template>
  <div class="leaderboard-widget">
    <h3 class="leaderboard-heading">
      <img :src="headingIcon" alt="Иконка кубка" class="heading-icon">
      Таблица лидеров
    </h3>

    <div class="table-wrap" role="region" aria-label="Таблица лидеров">
      <table class="leaderboard">
        <thead>
          <tr>
            <th class="place-column"></th>
            <th>Место</th>
            <th>Игрок</th>
            <th>Очки</th>
            <th class="winnings-column">Выигрыш</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in paginatedPlayers" :key="player.place">
            <td class="place-icon-cell" data-label="">
              <img
                v-if="player.place <= 3"
                :src="goldCupIcon"
                alt="Кубок"
                class="place-icon gold"
              />
              <img
                v-else
                :src="grayCupIcon"
                alt="Кубок"
                class="place-icon gray"
              />
            </td>
            <td data-label="Место">
              <span class="place-number" :class="{ 'gold-place': player.place <= 3 }">
                {{ player.place }}
              </span>
            </td>
            <td data-label="Игрок">{{ player.nickname }}</td>
            <td data-label="Очки">{{ new Intl.NumberFormat('ru-RU').format(player.score) }}</td>
            <td class="winnings-column" data-label="Выигрыш">{{ new Intl.NumberFormat('ru-RU').format(player.winnings) }} руб.</td>
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
.place-number {
  font-weight: 700;
}
.place-number.gold-place {
  color: #f65c21;
}
.place-icon-cell {
  width: 60px;
  padding-right: 0;
  text-align: center;
}
.place-icon {
  width: 40px;
  height: 40px;
  display: inline-block;
  object-fit: contain;
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
  vertical-align: middle;
}
.leaderboard th.place-column {
  width: 40px;
  padding-left: 16px;
}
.leaderboard th {
  background: #151821;
  white-space: nowrap;
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
.winnings-column {
  text-align: right;
  white-space: nowrap;
}


/* --- ИЗМЕНЕНИЯ В АДАПТИВНОСТИ ТАБЛИЦЫ --- */
@media (max-width: 768px) {
  .table-wrap {
    overflow-x: hidden;
  }
  .leaderboard thead {
    display: none;
  }
  .leaderboard, .leaderboard tbody, .leaderboard tr, .leaderboard td {
    display: block;
    width: 100%;
  }
  .leaderboard tr {
    position: relative;
    background: #151821;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 10px 15px;
    padding-left: 80px;
    min-height: 85px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .leaderboard td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
    border: none;
    font-size: 0.9rem;
  }
  .leaderboard td:before {
    content: attr(data-label);
    font-weight: 600;
    color: #94a3b8;
    padding-right: 10px;
  }
  
  /* ▼▼▼ ГЛАВНОЕ ИСПРАВЛЕНИЕ ЗДЕСЬ ▼▼▼ */
  .leaderboard tr td:nth-child(1),
  .leaderboard tr td:nth-child(2) {
    position: absolute;
    border: none;
    padding: 0;
    background: none;
    width: 50px;
    left: 15px;
    /* Добавляем flex-центровку к обеим ячейкам */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .leaderboard tr td:nth-child(1) { /* Ячейка с кубком */
    bottom: 10px;
    height: 40px;
  }
  
  .leaderboard tr td:nth-child(2) { /* Ячейка с номером места */
    top: 10px;
    height: 30px;
  }
  /* ▲▲▲ КОНЕЦ ИСПРАВЛЕНИЯ ▲▲▲ */

  .place-number {
    display: inline-block;
    color: white;
    font-size: 1.1rem;
  }
  
  .leaderboard tr td:nth-child(1):before,
  .leaderboard tr td:nth-child(2):before {
    display: none;
  }
  
  .leaderboard tr td:nth-child(3),
  .leaderboard tr td:nth-child(4),
  .leaderboard tr td:nth-child(5) {
    width: 100%;
  }

   .winnings-column {
    text-align: left;
  }
}
</style>