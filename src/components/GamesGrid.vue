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
  gap: 48px;
  padding: 0;
  margin: 0;
  list-style: none;

  /* --- Ось і вся магія адаптації --- */

  /* Mobile First: 2 колонки за замовчуванням */
  /* Картки будуть гнучкими і завжди заповнюватимуть простір */
  grid-template-columns: repeat(2, 1fr);
}

/* Маленькі планшети та великі телефони: 3 колонки */
@media (min-width: 540px) {
  .games-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
}

/* Планшети: 4 колонки */
@media (min-width: 768px) {
  .games-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
}

/* Десктопи: гнучка сітка з картками фіксованого розміру */
@media (min-width: 1024px) {
  .games-grid {
    /* Створюємо колонки фіксованої ширини (150px) */
    grid-template-columns: repeat(auto-fill, 175px);
    
    /* Ця властивість центрує всі картки, якщо залишається вільне місце. */
    /* Саме це вирішує проблему з однією карткою в пошуку! */
    justify-content: center;
    gap: 35px;
  }
}

.no-games {
  text-align: center;
  padding: 48px;
  background: var(--card);
  border-radius: var(--radius);
  color: var(--muted);
}
</style>

