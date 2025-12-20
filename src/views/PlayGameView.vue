<!-- <script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Переконайся, що шляхи правильні
import { allGames, popularGames } from '@/data/mockData.js'; 
import GamesCarousel from '@/components/GamesCarousel.vue';

const route = useRoute();
const router = useRouter();

// Змінні стану
const game = ref(null);
const activeGameUrl = ref('');
const connectionStatus = ref('');
const isLoading = ref(true);
const gameContainer = ref(null);

// Таймер
const totalTime = 150;
const timeLeft = ref(totalTime);
const isTimeUp = ref(false);
let timerInterval = null;

// Схожі ігри (обчислюються на основі поточного game.value)
const similarGames = computed(() => {
  if (!game.value) return [];
  return popularGames
    .filter(g => g.id !== game.value.id)
    .slice(0, 10);
});

const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60).toString().padStart(2, '0');
  const s = (timeLeft.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

// Авторизація
const isUserAuthenticated = computed(() => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("user-id");
  }
  return false;
});

function handleFullVersionAction() {
  if (isUserAuthenticated.value) {
    router.push('/deposit');
  } else {
    router.push('/register');
  }
}

function onIframeLoad() {
  isLoading.value = false;
}

function toggleFullscreen() {
  if (!document.fullscreenElement && gameContainer.value) {
    gameContainer.value.requestFullscreen().catch(err => console.error(err));
  } else {
    document.exitFullscreen();
  }
}

// Функція отримання сесії
async function fetchDynamicSession(launchId) {
  try {
    connectionStatus.value = 'Отримання сесії...';
    
    const myWorkerUrl = 'https://patient-pond-7547.mikhailobiletskyi3.workers.dev/'; 
    const response = await fetch(`${myWorkerUrl}?id=${launchId}`);
    
    if (!response.ok) {
        throw new Error(`Proxy error! status: ${response.status}`);
    }

    const casinoData = await response.json();
    console.log("Casino Data:", casinoData);

    let finalUrl = null;
    if (casinoData.data && casinoData.data.url) finalUrl = casinoData.data.url;
    else if (casinoData.data && casinoData.data.game_url) finalUrl = casinoData.data.game_url;
    else if (casinoData.url) finalUrl = casinoData.url;

    if (finalUrl) {
      activeGameUrl.value = finalUrl;
    } else {
      throw new Error("No URL in response");
    }

  } catch (error) {
    console.error("Game Load Error:", error);
    connectionStatus.value = 'Помилка. Спробуйте пізніше.';
  }
}

// --- ГОЛОВНА ФУНКЦІЯ ЗАВАНТАЖЕННЯ ГРИ ---
// Ми винесли це з onMounted, щоб викликати повторно
async function loadGame() {
  // 1. Очищаємо попередні стани
  if (timerInterval) clearInterval(timerInterval);
  timeLeft.value = totalTime;
  isTimeUp.value = false;
  activeGameUrl.value = '';
  isLoading.value = true;
  connectionStatus.value = '';

  // 2. Отримуємо ID з URL
  const gameId = parseInt(route.params.id);
  
  // 3. Знаходимо гру
  const foundGame = allGames.find(g => g.id === gameId);
  
  if (!foundGame) {
    router.push('/games');
    return;
  }
  
  game.value = foundGame; // Оновлюємо реактивну змінну

  // 4. Логіка вибору посилання
  if (foundGame.demoUrl && foundGame.demoUrl.length > 5) {
    console.log("Using Static URL");
    activeGameUrl.value = foundGame.demoUrl;
  } else if (foundGame.launchId) {
    console.log("Fetching Dynamic URL for ID:", foundGame.launchId);
    await fetchDynamicSession(foundGame.launchId);
  } else {
    connectionStatus.value = 'Гра тимчасово недоступна';
    isLoading.value = false; // Щоб показати повідомлення про помилку
  }

  // 5. Запуск таймера
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      isTimeUp.value = true;
      clearInterval(timerInterval);
    }
  }, 1000);
}

// --- Lifecycle & Watchers ---

onMounted(() => {
  loadGame();
});

// СЛІДКУЄМО ЗА ЗМІНОЮ ID В URL
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      loadGame(); // Перезавантажуємо гру при зміні ID
    }
  }
);

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<template>
  <div class="play-page">
    <div class="top-bar">
      <div class="left-controls">
        <button @click="router.back()" class="control-btn back-btn">
          ❮ <span class="desktop-text">Назад</span>
        </button>
        <h1 class="game-title" v-if="game">{{ game.title }}</h1>
      </div>
      
      <div class="right-controls">
        <div class="timer-badge" :class="{ 'warning': timeLeft < 30 }">
          <span class="icon">⏱</span> ДЕМО: {{ formattedTime }}
        </div>
        
        <button class="control-btn full-version-btn" @click="handleFullVersionAction">
          Полная версия
        </button>
      </div>
    </div>

    <div class="game-wrapper" ref="gameContainer">
      
      <div v-if="isLoading || !activeGameUrl" class="loader-overlay">
        <div class="spinner"></div>
        <p>{{ connectionStatus || 'Загрузка...' }}</p>
      </div>

      <iframe 
        v-if="activeGameUrl"
        :src="activeGameUrl" 
        class="game-iframe"
        allowfullscreen
        @load="onIframeLoad"
      ></iframe>
      
      <button class="fullscreen-fab" @click="toggleFullscreen" title="На весь экран">
        ⛶
      </button>

      <div v-if="isTimeUp" class="limit-overlay">
        <div class="limit-modal">
          <div class="modal-icon">⌛</div>
          <h2>Пробный период завершен</h2>
          <p>Время ознакомительной сессии истекло.</p>
          
          <button class="action-btn" @click="handleFullVersionAction">
            {{ isUserAuthenticated ? 'Пополнить баланс' : 'Регистрация' }}
          </button>
          
          <button class="home-btn" @click="router.push('/')">
            Вернуться в лобби
          </button>
        </div>
      </div>
    </div>

    <div class="similar-games-section">
      <GamesCarousel 
        title="Похожие игры" 
        icon="fire" 
        :games="similarGames" 
      />
    </div>
  </div>
</template>

<style scoped>
/* Твій CSS залишається тим самим, він гарний */
.play-page {
  min-height: 100vh;
  background-color: #0f0f0f;
  display: flex;
  flex-direction: column;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
  color: white;
  z-index: 10;
}
.left-controls, .right-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}
.game-title {
  font-size: 1.1rem;
  margin: 0;
  color: #ccc;
  display: none;
}
@media (min-width: 768px) {
  .game-title { display: block; }
}
.control-btn {
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;
  padding: 8px 16px;
  transition: all 0.2s;
}
.back-btn { background: #333; color: #fff; }
.back-btn:hover { background: #444; }
.full-version-btn {
  background: linear-gradient(90deg, #5a67d8, #4c51bf);
  color: white;
  box-shadow: 0 0 10px rgba(90, 103, 216, 0.4);
}
.full-version-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(90, 103, 216, 0.6);
}
.timer-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Roboto Mono', monospace;
  font-size: 1.1rem;
  background: #252525;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ffbd13;
  color: #ffbd13;
}
.timer-badge.warning {
  color: #ff4d4d;
  border-color: #ff4d4d;
  animation: pulse 1s infinite;
}
.game-wrapper {
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: #000;
  overflow: hidden;
}
.game-iframe {
  width: 100%;
  height: 100%;
  min-height: 80vh; 
  border: none;
  display: block;
}
.loader-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  color: #888;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #333;
  border-top: 5px solid #ffbd13;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.fullscreen-fab {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 20;
}
.fullscreen-fab:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}
.limit-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fadeIn 0.3s;
}
.limit-modal {
  background: #1e1e1e;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  max-width: 400px;
  border: 1px solid #333;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.modal-icon { font-size: 3rem; margin-bottom: 10px; }
.limit-modal h2 { color: #fff; margin-bottom: 10px; }
.limit-modal p { color: #aaa; margin-bottom: 25px; line-height: 1.5; }
.action-btn {
  display: block;
  width: 100%;
  padding: 16px;
  background: var(--accent, #ffbd13);
  color: #000;
  font-weight: 800;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 15px;
  transition: 0.2s;
}
.action-btn:hover { filter: brightness(1.1); }
.home-btn {
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
}
.home-btn:hover { color: #fff; text-decoration: underline; }
.similar-games-section {
  padding: 40px 24px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}
@media (max-width: 600px) {
  .desktop-text { display: none; }
  .top-bar { padding: 10px; }
  .timer-badge { font-size: 0.9rem; padding: 4px 8px; }
  .full-version-btn { padding: 6px 10px; font-size: 0.8rem; }
}
</style> -->




<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Перевір правильність шляху до даних
import { allGames, popularGames } from '@/data/mockData.js'; 
import GamesCarousel from '@/components/GamesCarousel.vue';

const route = useRoute();
const router = useRouter();

// --- Змінні стану ---
const game = ref(null);
const activeGameUrl = ref('');
const connectionStatus = ref('');
const isLoading = ref(true);
const gameContainer = ref(null);

// --- Таймер ---
const totalTime = 150;
const timeLeft = ref(totalTime);
const isTimeUp = ref(false);
let timerInterval = null;

// --- Схожі ігри ---
const similarGames = computed(() => {
  if (!game.value) return [];
  return popularGames
    .filter(g => g.id !== game.value.id)
    .slice(0, 10);
});

const formattedTime = computed(() => {
  const m = Math.floor(timeLeft.value / 60).toString().padStart(2, '0');
  const s = (timeLeft.value % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
});

// --- Авторизація ---
const isUserAuthenticated = computed(() => {
  if (typeof window !== "undefined") {
    return !!localStorage.getItem("authUser") || !!localStorage.getItem("user-id");
  }
  return false;
});

function handleFullVersionAction() {
  if (isUserAuthenticated.value) {
    router.push('/deposit');
  } else {
    router.push('/register');
  }
}

function onIframeLoad() {
  isLoading.value = false;
}

function toggleFullscreen() {
  if (!document.fullscreenElement && gameContainer.value) {
    gameContainer.value.requestFullscreen().catch(err => console.error(err));
  } else {
    document.exitFullscreen();
  }
}

// --- НОВА ФУНКЦІЯ: Розумна зміна мови (URL + Hash) ---
function enforceLanguage(url, langCode = 'ru') {
  if (!url) return '';
  
  // 1. Груба заміна в рядку
  if (langCode === 'ru') {
    url = url.replace('uk-UA', 'ru-RU')
             .replace('lang=uk', 'lang=ru')
             .replace('language=uk', 'language=ru');
  } else if (langCode === 'en') {
    url = url.replace('uk-UA', 'en-US')
             .replace('lang=uk', 'lang=en')
             .replace('language=uk', 'language=en');
  }

  const base = url.startsWith('http') ? undefined : window.location.origin;
  
  try {
    const urlObj = new URL(url, base);
    
    // 2. Очищення старих параметрів
    urlObj.searchParams.delete('lang');
    urlObj.searchParams.delete('language');
    urlObj.searchParams.delete('locale');

    // 3. Додавання нових параметрів
    urlObj.searchParams.set('language', langCode);
    urlObj.searchParams.set('lang', langCode);
    urlObj.searchParams.set('locale', langCode === 'ru' ? 'ru-RU' : 'en-US');
    
    // 4. Додавання параметрів у HASH
    let hashString = urlObj.hash.startsWith('#') ? urlObj.hash.substring(1) : urlObj.hash;
    const hashParams = new URLSearchParams(hashString);
    
    hashParams.set('language', langCode);
    hashParams.set('lang', langCode);
    
    urlObj.hash = hashParams.toString();

    if (base) {
        return urlObj.pathname + urlObj.search + urlObj.hash;
    }
    return urlObj.toString();
  } catch (e) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}lang=${langCode}&language=${langCode}#lang=${langCode}`;
  }
}

// --- Функція отримання сесії через проксі ---
async function fetchDynamicSession(launchId) {
  try {
    connectionStatus.value = 'Получение сессии...';
    
    const myWorkerUrl = 'https://patient-pond-7547.mikhailobiletskyi3.workers.dev/'; 
    
    // Запитуємо російську мову
    const response = await fetch(`${myWorkerUrl}?id=${launchId}&lang=ru`);
    
    const responseText = await response.text();
    let casinoData;

    try {
      casinoData = JSON.parse(responseText);
    } catch (e) {
      console.error("Помилка: Проксі повернув не JSON.");
      console.log("Вміст відповіді:", responseText);
      throw new Error("Invalid JSON response");
    }

    if (!response.ok) {
        throw new Error(`Proxy error! Status: ${response.status}. Message: ${casinoData.error || 'Unknown'}`);
    }

    console.log("Casino Data:", casinoData);

    let finalUrl = null;
    if (casinoData.data && casinoData.data.url) finalUrl = casinoData.data.url;
    else if (casinoData.data && casinoData.data.game_url) finalUrl = casinoData.data.game_url;
    else if (casinoData.url) finalUrl = casinoData.url;
    else if (casinoData.game_url) finalUrl = casinoData.game_url;

    if (finalUrl) {
      activeGameUrl.value = enforceLanguage(finalUrl, 'ru');
    } else {
      console.error("URL не знайдено в об'єкті:", casinoData);
      throw new Error("No URL in response");
    }

  } catch (error) {
    console.error("Game Load Error:", error);
    connectionStatus.value = 'Ошибка загрузки. Попробуйте позже.';
  }
}

// --- ГОЛОВНА ЛОГІКА ЗАВАНТАЖЕННЯ ГРИ ---
async function loadGame() {
  if (timerInterval) clearInterval(timerInterval);
  timeLeft.value = totalTime;
  isTimeUp.value = false;
  activeGameUrl.value = '';
  isLoading.value = true;
  connectionStatus.value = '';

  const gameId = parseInt(route.params.id);
  const foundGame = allGames.find(g => g.id === gameId);
  
  if (!foundGame) {
    router.push('/games');
    return;
  }
  
  game.value = foundGame;

  if (foundGame.demoUrl && foundGame.demoUrl.length > 5) {
    console.log("Using Static URL");
    activeGameUrl.value = enforceLanguage(foundGame.demoUrl, 'ru');
    
  } else if (foundGame.launchId) {
    console.log("Fetching Dynamic URL for ID:", foundGame.launchId);
    await fetchDynamicSession(foundGame.launchId);
  } else {
    connectionStatus.value = 'Игра временно недоступна';
    isLoading.value = false;
  }

  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      isTimeUp.value = true;
      clearInterval(timerInterval);
    }
  }, 1000);
}

onMounted(() => {
  loadGame();
});

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      loadGame();
    }
  }
);

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<template>
  <div class="play-page">
    <div class="top-bar">
      <div class="left-controls">
        <button @click="router.back()" class="control-btn back-btn">
          ❮ <span class="desktop-text">Назад</span>
        </button>
        <h1 class="game-title" v-if="game">{{ game.title }}</h1>
      </div>
      
      <div class="right-controls">
        <div class="timer-badge" :class="{ 'warning': timeLeft < 30 }">
          <span class="icon">⏱</span> ДЕМО: {{ formattedTime }}
        </div>
        
        <button class="control-btn full-version-btn" @click="handleFullVersionAction">
          Полная версия
        </button>
      </div>
    </div>

    <div class="game-wrapper" ref="gameContainer">
      
      <div v-if="isLoading || !activeGameUrl" class="loader-overlay">
        <div class="spinner"></div>
        <p>{{ connectionStatus || 'Загрузка...' }}</p>
      </div>

      <iframe 
        v-if="activeGameUrl"
        :src="activeGameUrl" 
        class="game-iframe"
        allowfullscreen
        @load="onIframeLoad"
      ></iframe>
      
      <button class="fullscreen-fab" @click="toggleFullscreen" title="На весь экран">
        ⛶
      </button>

      <div v-if="isTimeUp" class="limit-overlay">
        <div class="limit-modal">
          <div class="modal-icon">⌛</div>
          <h2>Пробный период завершен</h2>
          <p>Время ознакомительной сессии истекло.</p>
          
          <button class="action-btn" @click="handleFullVersionAction">
            {{ isUserAuthenticated ? 'Пополнить баланс' : 'Регистрация' }}
          </button>
          
          <button class="home-btn" @click="router.push('/')">
            Вернуться в лобби
          </button>
        </div>
      </div>
    </div>

    <div class="similar-games-section">
      <GamesCarousel 
        title="Похожие игры" 
        icon="fire" 
        :games="similarGames" 
      />
    </div>
  </div>
</template>

<style scoped>
.play-page {
  min-height: 100vh;
  background-color: #0f0f0f;
  display: flex;
  flex-direction: column;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #333;
  color: white;
  z-index: 10;
  
  /* Зміцнюємо верхню панель, щоб вона була липкою */
  position: sticky;
  top: 0;
}
.left-controls, .right-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}
.game-title {
  font-size: 1.1rem;
  margin: 0;
  color: #ccc;
  display: none;
}
@media (min-width: 768px) {
  .game-title { display: block; }
}
.control-btn {
  border: none;
  cursor: pointer;
  border-radius: 6px;
  font-weight: 600;
  padding: 8px 16px;
  transition: all 0.2s;
}
.back-btn { background: #333; color: #fff; }
.back-btn:hover { background: #444; }
.full-version-btn {
  background: linear-gradient(90deg, #5a67d8, #4c51bf);
  color: white;
  box-shadow: 0 0 10px rgba(90, 103, 216, 0.4);
}
.full-version-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(90, 103, 216, 0.6);
}
.timer-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: 'Roboto Mono', monospace;
  font-size: 1.1rem;
  background: #252525;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #ffbd13;
  color: #ffbd13;
}
.timer-badge.warning {
  color: #ff4d4d;
  border-color: #ff4d4d;
  animation: pulse 1s infinite;
}
.game-wrapper {
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: #000;
  overflow: hidden;
}
.game-iframe {
  width: 100%;
  height: 100%;
  min-height: 80vh; 
  border: none;
  display: block;
}
.loader-overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  color: #888;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #333;
  border-top: 5px solid #ffbd13;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.fullscreen-fab {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 20;
}
.fullscreen-fab:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}
.limit-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fadeIn 0.3s;
}
.limit-modal {
  background: #1e1e1e;
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  max-width: 400px;
  border: 1px solid #333;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
}
.modal-icon { font-size: 3rem; margin-bottom: 10px; }
.limit-modal h2 { color: #fff; margin-bottom: 10px; }
.limit-modal p { color: #aaa; margin-bottom: 25px; line-height: 1.5; }
.action-btn {
  display: block;
  width: 100%;
  padding: 16px;
  background: var(--accent, #ffbd13);
  color: #000;
  font-weight: 800;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  text-transform: uppercase;
  margin-bottom: 15px;
  transition: 0.2s;
}
.action-btn:hover { filter: brightness(1.1); }
.home-btn {
  background: transparent;
  border: none;
  color: #666;
  cursor: pointer;
}
.home-btn:hover { color: #fff; text-decoration: underline; }
.similar-games-section {
  padding: 40px 24px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

/* === ВИПРАВЛЕННЯ ДЛЯ МОБІЛЬНИХ === */
@media (max-width: 768px) {
  .desktop-text { display: none; }
  .top-bar { padding: 10px; }
  .timer-badge { font-size: 0.9rem; padding: 4px 8px; }
  .full-version-btn { padding: 6px 10px; font-size: 0.8rem; }
  
  /* Робимо гру вужчою, щоб з боків можна було скролити */
  .game-wrapper {
    width: calc(100% - 24px); /* 12px зліва і справа для пальця */
    margin: 12px auto;
    border-radius: 12px;
    overflow: hidden;
  }
  
  /* Зменшуємо висоту, щоб було видно контент знизу (заохочує скрол) */
  .game-iframe {
    min-height: 55vh; 
  }
}
</style>