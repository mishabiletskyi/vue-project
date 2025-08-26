<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  game: {
    type: Object,
    required: true,
  },
})

function openDeposit() {
  router.push('/deposit')
}
</script>

<template>
  <li class="game-card">
    <a href="#" class="game-link" @click.prevent="openDeposit">
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