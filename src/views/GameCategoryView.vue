<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import GamesGrid from '../components/GamesGrid.vue';

// Этот компонент принимает данные от роутера
defineProps({
  title: String,
  description: String,
  games: Array
});
</script>

<template>
  <div class="main-layout container">
    <!-- Здесь сайдбары присутствуют, и это правильно -->
    <LeftSidebar />
    <div class="main-content">
      <div class="page-header">
        <h1>{{ title }}</h1>
        <p v-if="description">{{ description }}</p>
      </div>
      <GamesGrid :games="games" />
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
.page-header { margin-bottom: 32px; }
.page-header h1 { font-size: 2.5rem; margin-bottom: 8px; }
.page-header p { color: var(--muted); }
</style>

