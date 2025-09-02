<script setup>
import { ref, computed } from 'vue';
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import GamesGrid from '../components/GamesGrid.vue';
import { allGames } from '@/data/mockData.js';

const searchQuery = ref('');

const filteredGames = computed(() => {
  if (!searchQuery.value) {
    return allGames;
  }
  return allGames.filter(game => 
    game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="page-header">
        <h1>Слоты</h1>
        <p>Ищи свои любимые игры среди сотен слотов.</p>
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Наприклад, Book of Ra...">
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
  .page-header h1 {
    font-size: 2rem;
  }
  .search-bar input {
    max-width: 100%;
    padding: 14px 16px;
  }
}
@media (max-width: 480px) {
  .search-bar input {
    padding: 16px;
    font-size: 1.1rem;
  }
}
</style>
