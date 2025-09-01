<script setup>
import { ref, computed } from 'vue';
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import GamesGrid from '../components/GamesGrid.vue';
import { allGames, popularGames, LiveGames, rouletteGames, newGames } from '@/data/mockData.js';

const tabs = [
  { key: 'all', label: 'Все', games: allGames },
  { key: 'popular', label: 'Популярные', games: popularGames },
  { key: 'live', label: 'Live', games: LiveGames },
  { key: 'roulette', label: 'Рулетка', games: rouletteGames },
  { key: 'new', label: 'Новинки', games: newGames }
];

const activeTab = ref(tabs[0].key);
const searchQuery = ref('');

const filteredGames = computed(() => {
  const current = tabs.find(tab => tab.key === activeTab.value);
  if (!current) return [];
  return current.games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="page-header">
        <h1>Игры</h1>
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            :class="['tab-button', { active: tab.key === activeTab }]"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Поиск игр..." />
        </div>
      </div>
      <GamesGrid :games="filteredGames" />
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 32px; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 8px; }
.tabs { display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
.tab-button {
  padding: 8px 16px;
  background-color: var(--card);
  border: 1px solid #2a2f3a;
  border-radius: 8px;
  color: var(--text);
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}
.tab-button.active {
  background-color: var(--accent);
  color: #fff;
}
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
@media (max-width: 768px) {
  .page-header h1 { font-size: 2rem; }
  .search-bar input { max-width: 100%; padding: 14px 16px; }
}
@media (max-width: 480px) {
  .search-bar input { padding: 16px; font-size: 1.1rem; }
}
</style>
