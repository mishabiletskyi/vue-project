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
      <!-- Карточки игр рендерятся здесь -->
      <GameCard v-for="game in games" :key="game.id || game.name" :game="game" />
    </ul>
    <div v-else class="no-games">
      <p>Игры не найдены.</p>
    </div>
  </div>
</template>

<style scoped>
.games-grid {
  display: grid;
  /* Используем auto-fill для автоматического заполнения */
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  padding: 0;
  margin: 0;
  list-style: none;
  
  /* ЭТА СТРОКА РЕШАЕТ ПРОБЛЕМУ РАСТЯГИВАНИЯ */
  /* Она прижимает элементы к началу сетки, не давая им растягиваться */
  justify-content: start; 
}

.no-games {
  text-align: center;
  padding: 48px;
  background: var(--card);
  border-radius: var(--radius);
  color: var(--muted);
}
</style>

