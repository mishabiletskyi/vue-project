<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
// У майбутньому можна створити окремий компонент для Live ігор
import GameCard from '../components/GameCard.vue'; 
import { allGames } from '@/data/mockData.js';
</script>

<template>
  <div>
    <div class="hero">
      <div class="hero-content">
        <h1>Live Казино</h1>
        <p>Відчуй атмосферу справжнього казино з живими дилерами</p>
      </div>
    </div>
    <div class="main-layout container">
      <LeftSidebar />
      <div class="main-content">
        <div class="games-grid">
          <GameCard v-for="game in allGames.slice(0, 4)" :key="game.id" :game="game" />
        </div>
      </div>
      <RightSidebar />
    </div>
  </div>
</template>

<style scoped>
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
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
</style>