<script setup>
import { ref } from 'vue';
import GameCard from './GameCard.vue';

const games = ref([
  { id: 1, title: 'Book of Ra', provider: 'Novomatic', image: '/img/BookofRa.gif' },
  { id: 2, title: 'Sweet Bonanza', provider: 'Pragmatic Play', image: '/img/SweetBonanza.gif' },
  { id: 3, title: 'Joker Stoker', provider: 'Endorphina', image: '/img/JokerStoker.gif' },
  { id: 4, title: '5FruitInvaders', provider: 'Amigo Gaming', image: '/img/5FruitInvaders.gif' },
  { id: 5, title: 'Sugar Rush', provider: 'Pragmatic Play', image: '/img/SugarRush.gif' },
  { id: 6, title: 'Crown Coins', provider: 'Endorphina', image: '/img/CrownCoins.gif' },
  { id: 7, title: 'Diamond Mines', provider: 'Reflex Gaming', image: '/img/DiamondMines.gif' },
  { id: 8, title: 'Hell Hot 100', provider: 'Endorphina', image: '/img/HellHot100.gif' },
]);
</script>

<template>
  <section id="games" class="section">
    <div class="container">
      <header class="section-head">
        <h2>Популярные игры</h2>
        <div class="filters" role="tablist" aria-label="Фильтры игр">
          <button role="tab" aria-selected="true" class="chip">Все</button>
          <button role="tab" class="chip">Слоты</button>
          <button role="tab" class="chip">Столы</button>
          <button role="tab" class="chip">Live</button>
        </div>
      </header>

      <ul class="games-grid" aria-live="polite">
        <GameCard v-for="game in games" :key="game.id" :game="game" />
      </ul>
    </div>
  </section>
</template>