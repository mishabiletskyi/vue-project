<script setup>
import { ref, computed } from 'vue';
import { popularGames, newGames, LiveGames, rouletteGames, allGames } from '@/data/mockData.js';
import GamesGrid from '../components/GamesGrid.vue';
import GamesCarousel from '../components/GamesCarousel.vue';

const searchQuery = ref('');

const searchResults = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) {
    return [];
  }
  return allGames.filter(game =>
    (game.title || game.name).toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="container">
    <div class="main-content-full">
      <div class="page-header">
        <h1>Игровой центр</h1>
        <div class="search-bar">
          <input type="text" v-model="searchQuery" placeholder="Найти игру..." />
        </div>
      </div>

      <div v-if="!searchQuery" class="game-lobby">
        <GamesCarousel 
          title="🔥 Популярные" 
          :games="popularGames" 
          viewAllLink="/games/popular" 
        />
        <GamesCarousel 
          title="✨ Новинки" 
          :games="newGames" 
          viewAllLink="/games/new"
        />
        <GamesCarousel 
          title="🔴 Live Казино" 
          :games="LiveGames" 
          viewAllLink="/games/live" 
        />
        <GamesCarousel 
          title="🎲 Рулетка" 
          :games="rouletteGames" 
          viewAllLink="/games/roulette" 
        />
      </div>

      <div v-else class="search-results">
        <h2 v-if="searchResults.length > 0">Результаты поиска “{{ searchQuery }}”</h2>
        <h2 v-else>По запросу “{{ searchQuery }}” ничего не найдено</h2>
        <GamesGrid :games="searchResults" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content-full {
  width: 100%;
}

.page-header { margin-bottom: 32px; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 8px; color: var(--text, #fff); }
.search-bar { margin-top: 16px; }
.search-bar input {
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  background-color: var(--card, #2a2f3a);
  border: 1px solid #3b414f;
  border-radius: 8px;
  color: var(--text, #fff);
  font-size: 1rem;
}
.search-bar input:focus {
  outline: none;
  border-color: var(--accent, #5a67d8);
}
.search-results h2 {
  font-size: 1.8rem;
  margin-bottom: 24px;
}
</style>

