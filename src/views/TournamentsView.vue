<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';

const tournaments = ref([
  { id: 1, name: 'Poker Masters', game: 'Poker', date: '2025-06-01' },
  { id: 2, name: 'Holdem Championship', game: 'Poker', date: '2025-07-15' },
  { id: 3, name: 'Omaha Cup', game: 'Poker', date: '2025-08-10' },
  { id: 4, name: 'Speed Poker Open', game: 'Poker', date: '2025-09-05' }
]);

const searchQuery = ref('');
const filteredTournaments = computed(() =>
  tournaments.value.filter(t =>
    t.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const participantCount = ref(1000);
let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    const increments = [1, 5, 4, 8, 9];
    const random = increments[Math.floor(Math.random() * increments.length)];
    participantCount.value += random;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="page-header">
        <h1>Турниры</h1>
        <p>Покерные соревнования для всех игроков.</p>
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Поиск турниров..." />
        </div>
        <div class="counter">Участников: {{ participantCount }}</div>
      </div>
      <ul class="tournament-list">
        <li v-for="t in filteredTournaments" :key="t.id" class="tournament-card">
          <h3>{{ t.name }}</h3>
          <p>Игра: {{ t.game }}</p>
          <p>Дата: {{ t.date }}</p>
        </li>
      </ul>
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 32px; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 8px; }
.search-bar { margin-top: 16px; }
.search-bar input {
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  background-color: var(--card);
  border: 1px solid #2a2f3a;
  border-radius: 8px;
  color: var(--text);
  font-size: 1rem;
  transition: border-color 0.2s;
}
.search-bar input:focus {
  outline: none;
  border-color: var(--accent);
}
.counter { margin-top: 16px; font-weight: bold; }
.tournament-list { display: grid; gap: 16px; margin-top: 24px; }
.tournament-card {
  background-color: var(--card);
  padding: 16px;
  border-radius: var(--radius);
}
@media (max-width: 768px) {
  .page-header h1 { font-size: 2rem; }
  .search-bar input { max-width: 100%; padding: 14px 16px; }
}
@media (max-width: 480px) {
  .search-bar input { padding: 16px; font-size: 1.1rem; }
}
</style>
