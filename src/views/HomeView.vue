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
            <p>150% на первый депозит + 150 FS.</p>
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
.main-layout {
  display: flex;
  gap: 24px;
}
.main-content {
  flex: 1;
  min-width: 0;
}
.section {
  margin-top: 48px;
}
.section-head {
  margin-bottom: 24px;
}
</style>

