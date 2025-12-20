<!-- 
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, RouterView } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
// Імпортуємо нашого посередника
import { eventBus } from './eventBus.js';


const router = useRouter();

// --- Існуюча логіка ---
const stored = localStorage.getItem('authUser');
const user = stored ? JSON.parse(stored) : null;

if (user && window.Intercom) {
  window.Intercom('update', {
    user_id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt,
  });
}

// --- НОВА ГЛОБАЛЬНА ЛОГІКА МОДАЛЬНОГО ВІКНА ---
const isAuthModalVisible = ref(false);

function showAuthModal() {
  isAuthModalVisible.value = true;
}

function closeModal() {
  isAuthModalVisible.value = false;
}

function redirectToRegister() {
  closeModal();
  router.push('/register');
}

// Коли App.vue завантажується, він починає слухати подію 'require-auth'
onMounted(() => {
  eventBus.on('require-auth', showAuthModal);
});

// Коли App.vue знищується, він припиняє слухати, щоб уникнути витоків пам'яті
onUnmounted(() => {
  eventBus.off('require-auth', showAuthModal);
});
</script>

<template>
  <div class="app-container">
    <SiteHeader :user="user" />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>

  <div v-if="isAuthModalVisible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="modal-close-btn" @click="closeModal">&times;</button>
      <div class="modal-state-centered">
        <h2>Требуется авторизация</h2>
        <p class="modal-text">Пожалуйста, войдите в систему или зарегистрируйтесь, чтобы начать игру.</p>
        <button @click="redirectToRegister" class="cta-button">Регистрация</button>
      </div>
    </div>
  </div>
</template>

<style>
/* === НОВІ СТИЛІ ДЛЯ "ПРИТИСНУТОГО" ФУТЕРА === */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1; /* Змушує основний контент займати весь доступний простір */
}
/* ============================================= */


/* Глобальні стилі для модального вікна.
  Вони НЕ повинні бути 'scoped', щоб працювати коректно з App.vue.
*/
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Високий z-index для перекриття всього */
}

.modal-content {
  background-color: var(--card, #1a1a1a);
  padding: 24px 32px;
  border-radius: var(--radius, 12px);
  border: 1px solid #2a2f3a;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.modal-close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: var(--muted, #888);
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
}

.modal-state-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 0;
}

.modal-state-centered h2 {
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 16px;
  color: #fff;
}

.modal-text {
  font-size: 1.1rem;
  color: var(--muted, #aaa);
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.6;
}

.cta-button {
  width: 100%;
  max-width: 250px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  background-color: var(--accent, #007bff);
  color: #fff;
}

.cta-button:hover {
  background-color: var(--accent-hover, #0056b3);
}
</style> -->




<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, RouterView } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import { eventBus } from './eventBus.js';

const router = useRouter();

// --- Існуюча логіка користувача ---
const stored = localStorage.getItem('authUser');
const user = stored ? JSON.parse(stored) : null;

if (user && window.Intercom) {
  window.Intercom('update', {
    user_id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt,
  });
}

// --- МОДАЛЬНЕ ВІКНО АВТОРИЗАЦІЇ (стандартне) ---
const isAuthModalVisible = ref(false);

function showAuthModal() {
  isAuthModalVisible.value = true;
}

function closeAuthModal() {
  isAuthModalVisible.value = false;
}

function redirectToRegister() {
  closeAuthModal();
  router.push('/register');
}

// --- НОВЕ УНІВЕРСАЛЬНЕ МОДАЛЬНЕ ВІКНО ---
const isVerificationModalVisible = ref(false);
// Додаємо стан, щоб знати, що показувати: 'need-auth' (треба вхід) або 'need-verify' (треба доки)
const verificationState = ref('need-verify'); 

function showVerificationLogic() {
  // 1. Перевіряємо, чи користувач авторизований прямо зараз
  // (читаємо localStorage, бо змінна user зверху ініціалізується лише раз при завантаженні сторінки)
  const currentUser = localStorage.getItem('authUser');

  if (!currentUser) {
    // Якщо НЕ авторизований -> Ставимо режим "Спочатку реєстрація"
    verificationState.value = 'need-auth';
  } else {
    // Якщо авторизований -> Ставимо режим "Потрібна верифікація"
    verificationState.value = 'need-verify';
  }

  isVerificationModalVisible.value = true;
}

function closeVerificationModal() {
  isVerificationModalVisible.value = false;
}

function handleVerificationAction() {
  closeVerificationModal();
  
  if (verificationState.value === 'need-auth') {
    // Якщо не був авторизований -> ведемо на реєстрацію
    router.push('/register');
  } else {
    // Якщо був авторизований -> ведемо в акаунт на верифікацію
    router.push('/account');
  }
}

// Слухаємо події
onMounted(() => {
  eventBus.on('require-auth', showAuthModal);
  // Тепер викликаємо нашу нову "розумну" функцію
  eventBus.on('require-verification', showVerificationLogic); 
});

onUnmounted(() => {
  eventBus.off('require-auth', showAuthModal);
  eventBus.off('require-verification', showVerificationLogic);
});
</script>

<template>
  <div class="app-container">
    <SiteHeader :user="user" />
    <main>
      <RouterView />
    </main>
    <SiteFooter />
  </div>

  <div v-if="isAuthModalVisible" class="modal-overlay" @click.self="closeAuthModal">
    <div class="modal-content">
      <button class="modal-close-btn" @click="closeAuthModal">&times;</button>
      <div class="modal-state-centered">
        <h2>Требуется авторизация</h2>
        <p class="modal-text">Пожалуйста, войдите в систему или зарегистрируйтесь, чтобы начать игру.</p>
        <button @click="redirectToRegister" class="cta-button">Регистрация</button>
      </div>
    </div>
  </div>

  <div v-if="isVerificationModalVisible" class="modal-overlay" @click.self="closeVerificationModal">
    <div class="modal-content">
      <button class="modal-close-btn" @click="closeVerificationModal">&times;</button>
      
      <div v-if="verificationState === 'need-auth'" class="modal-state-centered">
        <h2>Доступ ограничен</h2>
        <p class="modal-text">
          Для доступа к этому разделу необходимо <strong>авторизоваться или зарегистрироваться</strong>, 
          а затем пройти верификацию аккаунта.
        </p>
        <button @click="handleVerificationAction" class="cta-button">
          Регистрация
        </button>
      </div>

      <div v-else class="modal-state-centered">
        <h2>Требуется верификация</h2>
        <p class="modal-text">
          Необходимо пройти верификацию аккаунта и пополнить счет. Это займет всего 10 минут.
        </p>
        <button @click="handleVerificationAction" class="cta-button">
          Пройти верификацию
        </button>
      </div>

    </div>
  </div>
</template>

<style>
/* Стилі залишаються тими ж самими */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background-color: var(--card, #1a1a1a);
  padding: 24px 32px;
  border-radius: var(--radius, 12px);
  border: 1px solid #2a2f3a;
  width: 100%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.modal-close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: var(--muted, #888);
  font-size: 2rem;
  cursor: pointer;
  line-height: 1;
}

.modal-state-centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px 0;
}

.modal-state-centered h2 {
  font-size: 1.8rem;
  margin-top: 0;
  margin-bottom: 16px;
  color: #fff;
}

.modal-text {
  font-size: 1.1rem;
  color: var(--muted, #aaa);
  text-align: center;
  margin-bottom: 24px;
  line-height: 1.6;
}

.cta-button {
  width: 100%;
  max-width: 250px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  background-color: var(--accent, #007bff);
  color: #fff;
}

.cta-button:hover {
  background-color: var(--accent-hover, #0056b3);
}


/* Коли меню відкрите, застосовуємо ефекти до main та footer */
body.mobile-menu-open main,
body.mobile-menu-open footer, /* Якщо у SiteFooter є тег footer */
body.mobile-menu-open .site-footer { /* Або якщо там клас .site-footer */
  filter: blur(5px) brightness(0.7); /* Розмиття + затемнення */
  pointer-events: none; /* Забороняємо кліки по контенту */
  user-select: none; /* Забороняємо виділення тексту */
  transition: filter 0.3s ease, opacity 0.3s ease;
}

/* Переконаємось, що Хедер залишається чітким */
body.mobile-menu-open .site-header {
  filter: none;
  pointer-events: auto;
}
</style>