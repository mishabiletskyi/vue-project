<script setup>
defineProps({
  game: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li class="game-card">
    <a href="#" class="game-link">
      <div class="thumb" aria-hidden="true">
        <img :src="game.image" :alt="game.title" />
        <div class="overlay">
          <button class="play-btn">ИГРАТЬ</button>
        </div>
      </div>
      <div class="meta">
        <h3 class="title">{{ game.title }}</h3>
        <p class="provider">{{ game.provider }}</p>
      </div>
    </a>
  </li>
</template>