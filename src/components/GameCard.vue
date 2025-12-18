<!-- <script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
// Імпортуємо посередника
import { eventBus } from "../eventBus.js"; // Переконайтесь, що шлях правильний

const router = useRouter();

defineProps({
  game: {
    type: Object,
    required: true,
  },
});

const isUserAuthenticated = computed(() => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("user-id");
  }
  return false;
});

function handlePlayClick() {
  if (isUserAuthenticated.value) {
    router.push("/deposit");
  } else {
    // Просто надсилаємо подію в eventBus. App.vue її зловить.
    eventBus.emit("require-auth");
  }
}
</script>

<template>
  <li class="game-card">
    <a href="#" class="game-link" @click.prevent="handlePlayClick">
      <div class="thumb" aria-hidden="true">
        <img
          :src="game.image"
          :alt="game.title || game.name"
          loading="lazy"
          decoding="async"
        />
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
.game-card {
  list-style-type: none;
  /* Стандартна ширина для десктопів */
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
  aspect-ratio: 1 / 1;
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

/* 👇 ОСЬ ВИРІШЕННЯ ПРОБЛЕМИ 👇 */
/* Медіа-запит для маленьких екранів (телефони) */
@media (max-width: 480px) {
  .game-card {
    /*
      Розраховуємо ширину так, щоб дві картки завжди вміщалися в ряд.
      Логіка: (100% ширини екрана - 16px відступу) / 2 картки.
      Це дорівнює 50% - 8px.
    */
    width: calc(90% - 8px);
  }
}
</style> -->



<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
});

function handlePlayClick() {
  // Просто перекидаємо на сторінку гри. Логіка таймера і реєстрації буде там.
  router.push({ name: 'play-game', params: { id: props.game.id } });
}
</script>

<template>
  <li class="game-card">
    <a href="#" class="game-link" @click.prevent="handlePlayClick">
      <div class="thumb">
        <img
          :src="game.image"
          :alt="game.title"
          loading="lazy"
        />
        <div class="overlay">
          <button class="play-btn">ИГРАТЬ</button>
        </div>
      </div>
      <div class="meta">
        <h3 class="title">{{ game.title }}</h3>
        <p v-if="game.provider" class="provider">{{ game.provider }}</p>
      </div>
    </a>
  </li>
</template>

<style scoped>
/* Твій існуючий CSS залишаємо без змін */
.game-card { width: 180px; flex-shrink: 0; list-style: none; }
.game-link { display: block; text-decoration: none; color: inherit; border-radius: 8px; overflow: hidden; background: var(--card); position: relative; }
.thumb img { width: 100%; aspect-ratio: 1/1; object-fit: cover; display: block; }
.overlay { position: absolute; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: 0.2s; }
.game-link:hover .overlay { opacity: 1; }
.play-btn { background: var(--accent, #ffbd13); border: none; padding: 8px 16px; border-radius: 50px; cursor: pointer; font-weight: bold; color: black; }
.meta { padding: 10px; }
.title { font-size: 0.9rem; margin: 0; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.provider { font-size: 0.75rem; color: #888; margin: 0; }

@media (max-width: 480px) {
  .game-card { width: calc(50% - 8px); }
}
</style>