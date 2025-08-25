<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import GamesGrid from '../components/GamesGrid.vue';
import { allGames } from '@/data/mockData.js';

defineProps({
  title: String,
  description: String
});
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="page-header">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </div>
      <GamesGrid :games="allGames" />
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 32px; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 8px; }
.page-header p { color: var(--muted); }
</style>