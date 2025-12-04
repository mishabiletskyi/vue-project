<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import GameCard from '../components/GameCard.vue';
// Імпортуємо ваш новий масив Table
import { Table } from '@/data/mockData.js';

// --- ЗМІНИ ТУТ ---
// 1. Додаємо URL до зображення
const SUPABASE_URL = 'https://vngvrmbpffrtfhkauous.supabase.co/storage/v1/object/public/img';
const heroBackgroundImage = `${SUPABASE_URL}/card10.webp`;
// --- КІНЕЦЬ ЗМІН ---
</script>

<template>
  <div>
    <div
      class="hero"
      :style="{ backgroundImage: `linear-gradient(rgba(11, 12, 16, 0.8), rgba(11, 12, 16, 0.8)), url(${heroBackgroundImage})` }"
    >
      </div>
    <div class="main-layout container">
      <LeftSidebar />
      <div class="main-content">
        <div class="games-grid">
          <GameCard v-for="(game, index) in Table" :key="index" :game="game" />
        </div>
      </div>
      <RightSidebar />
    </div>
  </div>
</template>

<style scoped>
/* Стилі залишаються без змін, окрім hero */
.hero {
  height: 45vh;
  /* ЗМІНА 3: Властивість background-image видалено звідси */
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 24px;
}
.hero-content {
  max-width: 600px;
}
.hero h1 {
  font-size: 3rem;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
}
.hero p {
  font-size: 1.25rem;
  color: var(--muted);
}
</style>