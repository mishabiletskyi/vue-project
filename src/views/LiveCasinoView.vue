<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import GameCard from '../components/GameCard.vue'; 
// Імпортуємо ваш новий масив LiveGames
import { LiveGames } from '@/data/mockData.js'; 
</script>

<template>
  <div>
    <div class="hero">
      <div class="hero-content">
        <h1>Live Казино</h1>
        <p>Почувствуй атмосферу настоящего казино с живыми дилерами</p>
      </div>
    </div>
    <div class="main-layout container">
      <LeftSidebar />
      <div class="main-content">
        <div class="games-grid">
          <GameCard v-for="(game, index) in LiveGames" :key="index" :game="game" />
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
  background-image: linear-gradient(rgba(11, 12, 16, 0.8), rgba(11, 12, 16, 0.8)), url('/img/card10.webp');
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
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 48px;
}
@media (max-width: 1024px) {
  .hero {
    height: 35vh;
  }
  .hero h1 {
    font-size: 2.5rem;
  }
}
@media (max-width: 768px) {
  .hero {
    height: 30vh;
    padding: 0 16px;
  }
  .hero h1 {
    font-size: 2rem;
  }
  .hero p {
    font-size: 1rem;
  }
  .games-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }
}
@media (max-width: 480px) {
  .games-grid {
    grid-template-columns: 1fr;
  }
}
</style>