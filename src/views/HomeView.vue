<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import ImageSlider from '../components/ImageSlider.vue';
import GamesGrid from '../components/GamesGrid.vue';
import Leaderboard from '../components/Leaderboard.vue';
import { popularGames } from '@/data/mockData.js';
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <ImageSlider />
      
      <section id="games" class="section">
        <header class="section-head">
          <h2>Популярные игры</h2>
        </header>
        <GamesGrid :games="popularGames" />
      </section>

      <section id="bonuses" class="section section-accent">
        <div class="promo">
          <div class="promo-copy">
            <h2>Бонусы для новых игроков</h2>
            <p>100% на первый депозит + 50 FS.</p>
          </div>
          <router-link to="/bonuses" class="btn btn-lg">Забрать бонус</router-link>
        </div>
      </section>

      <section id="tournaments" class="section">
        <header class="section-head">
          <h2>Еженедельные турниры</h2>
        </header>
        <Leaderboard />
      </section>
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
@media (max-width: 768px) {
  .promo {
    flex-direction: column;
    text-align: center;
  }
  .promo .btn {
    width: 100%;
  }
}
@media (max-width: 480px) {
  .promo .btn {
    padding: 12px 16px;
    font-size: 1rem;
  }
}
</style>