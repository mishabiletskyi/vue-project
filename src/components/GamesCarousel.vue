<script setup>
import { computed } from 'vue';
import GameCard from './GameCard.vue';

const props = defineProps({
  title: { type: String, required: true },
  games: { type: Array, required: true },
  viewAllLink: { type: String, default: '' },
  // Нова властивість для передачі назви іконки
  icon: { type: String, default: null }
});

// Словник, що зіставляє назви іконок з SVG-шляхами
const iconPaths = {
  fire: 'M9.98 2.05c-1.74-.48-3.66.38-4.63 1.8C3.26 6.79 4.6 9.35 6.99 10.51c2.39 1.16 5.11.36 6.3-1.79.8-1.44.57-3.29-.53-4.42-.9-1-2.12-1.38-3.32-1.38-.28 0-.56.03-.83.09zM12 0c-4.24 0-7.9 2.53-9.52 6.27-.72 1.67-.93 3.48-.68 5.25.32 2.32 1.63 4.39 3.48 5.86 3.7 2.93 9.07 2.93 12.77 0 1.85-1.47 3.16-3.54 3.48-5.86.25-1.77-.04-3.58-.68-5.25C19.9 2.53 16.24 0 12 0z',
  star: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z',
  live: 'M12 6a6 6 0 100 12 6 6 0 000-12zM12 4C7.39 4 3.53 7.31.96 11.5c-.09.14-.09.32 0 .46C3.53 16.19 7.39 19.5 12 19.5s8.47-3.31 11.04-7.54c.09-.14.09-.32 0-.46C20.47 7.31 16.61 4 12 4zm0 13.5c-3.8 0-7.16-2.24-9.5-5.5 2.34-3.26 5.7-5.5 9.5-5.5s7.16 2.24 9.5 5.5c-2.34 3.26-5.7 5.5-9.5 5.5z',
  roulette: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v5h-2V7zm5.25-1.22l-1.42 1.42C15.45 7.82 16 8.86 16 10h2c0-1.5-.7-2.85-1.75-3.22zM8.17 7.2c.62-.62 1.42-1 2.28-1.06L10 4.26C8.84 4.5 7.82 5.25 7.2 6.17l1.42 1.42c-.4-.63-.18-1.42.45-2.39zM7.2 16.83l-1.42-1.42C5.15 14.79 4.5 13.75 4.5 12.5H2.5c0 1.5.7 2.85 1.75 3.22l1.42-1.42c.63.4 1.42.18 2.39-.45zM16.83 16.8l-1.42-1.42c.4-.63.18-1.42-.45-2.39l1.42-1.42c.62.62 1 1.42 1.06 2.28L18.74 14c-.24 1.16-1 2.18-1.91 2.8z'
};

const currentIconPath = computed(() => {
  return iconPaths[props.icon] || null;
});
</script>

<template>
  <div class="games-section">
    <div class="section-header">
      <h2 class="section-title">
        <!-- Вставляємо SVG-іконку перед заголовком -->
        <svg v-if="currentIconPath" class="title-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path :d="currentIconPath"></path>
        </svg>
        <span>{{ title }}</span>
      </h2>
      <router-link v-if="viewAllLink" :to="viewAllLink" class="view-all-link">
        Смотреть все &rarr;
      </router-link>
    </div>
    <div class="games-carousel">
      <GameCard v-for="game in games" :key="game.id || game.name" :game="game" />
    </div>
  </div>
</template>

<style scoped>
.games-section { margin-bottom: 48px; }
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
/* Нові стилі для заголовка з іконкою */
.section-title {
  font-size: 1.8rem;
  color: var(--text, #fff);
  display: flex;
  align-items: center;
  gap: 12px; /* Відступ між іконкою та текстом */
}
.title-icon {
  width: 28px;
  height: 28px;
  fill: var(--accent, #5a67d8); /* Іконка буде в кольорі акценту */
}
.view-all-link {
  color: var(--accent, #5a67d8);
  text-decoration: none;
  font-weight: 600;
}
.view-all-link:hover { opacity: 0.8; }
.games-carousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 16px;
  scrollbar-width: thin;
  scrollbar-color: var(--accent, #5a67d8) transparent;
}
.games-carousel::-webkit-scrollbar { height: 8px; }
.games-carousel::-webkit-scrollbar-track { background: transparent; }
.games-carousel::-webkit-scrollbar-thumb {
  background-color: var(--accent, #5a67d8);
  border-radius: 10px;
}
.games-carousel > * { flex-shrink: 0; }
</style>
