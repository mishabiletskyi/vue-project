<script setup>
import GameCard from './GameCard.vue';

defineProps({
  games: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="games-grid-container">
    <ul v-if="games.length > 0" class="games-grid" aria-live="polite">
      <GameCard v-for="game in games" :key="game.id" :game="game" />
    </ul>
    <div v-else class="no-games">
      <p>Ігри не знайдено.</p>
    </div>
  </div>
</template>

<style scoped>
.no-games {
  text-align: center;
  padding: 48px;
  background: var(--card);
  border-radius: var(--radius);
  color: var(--muted);
}
</style>