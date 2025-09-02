<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import GamesGrid from '../components/GamesGrid.vue';
import { allGames } from '@/data/mockData.js';

const randomGames = ref([]);

// Функція для перемішування масиву
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Генеруємо 42 випадкові гри, коли компонент завантажується
onMounted(() => {
  const shuffledGames = shuffleArray([...allGames]);
  randomGames.value = shuffledGames.slice(0, 42);
});
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <ImageSlider />

      <div class="page-header">
        <h1>Drops & Wins</h1>
        <p>Участвуй в ежедневных розыгрышах призов.</p>
      </div>

      <GamesGrid :games="randomGames" />
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 32px; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 8px; }
.page-header p { color: var(--muted); }
</style>