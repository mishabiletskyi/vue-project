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
        <img :src="game.image" :alt="game.title || game.name" />
        <div class="overlay">
          <button class="play-btn">ИГРАТЬ</button>
        </div>
      </div>
      <div class="meta">
        <h3 class="title">{{ game.title || game.name }}</h3>
        <p v-if="game.provider" class="provider">{{ game.provider }}</p>
      </div>
    </a>
  </li>
</template>

<style scoped>
/* ЭТО ИСПРАВЛЕНИЕ УБИРАЕТ ТОЧКУ (маркер списка) */
.game-card {
  list-style-type: none;
  
  /* ГЛАВНОЕ ИСПРАВЛЕНИЕ:
    Задаем фиксированную ширину карточке. 
    Теперь она будет одинакового размера и в сетке, и в карусели.
    `flex-shrink: 0` нужен, чтобы карточка не сжималась в карусели.
  */
  width: 180px; 
  flex-shrink: 0;
}

.game-link {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  background: var(--card);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.game-link:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.thumb {
  position: relative;
}

.thumb img {
  width: 100%;
  height: auto;
  display: block;
  aspect-ratio: 1 / 1; /* Делаем изображение квадратным */
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: -5px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.game-link:hover .overlay {
  opacity: 1;
}

.play-btn {
  /* Стили для кнопки "ИГРАТЬ" */
  background: var(--accent);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
}

.meta {
  padding: 12px;
}

.title {
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.provider {
  font-size: 0.8rem;
  color: var(--muted);
  margin: 4px 0 0;
}
</style>

