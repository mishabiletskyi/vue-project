<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import GameCard from '../components/GameCard.vue'; 
// Імпортуємо ваш новий масив Table
import { Table } from '@/data/mockData.js'; 
</script>

<template>
  <div>
    <div class="hero">
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
/* Стилі залишаються без змін */
.hero {
  height: 45vh;
  background-image: linear-gradient(rgba(11, 12, 16, 0.8), rgba(11, 12, 16, 0.8)), url('/img/card10.png');
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