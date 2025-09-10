<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import LeftSidebar from '../components/LeftSidebar.vue';

const router = useRouter();

// --- Стан для модального вікна ---
const isModalVisible = ref(false);

// --- Логіка авторизації ---
const isUserAuthenticated = computed(() => {
  // Проста перевірка, чи є user-id. У реальному додатку може бути складнішою.
  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('user-id');
  }
  return false;
});

// --- Функції обробники ---

// Показує модальне вікно для неавторизованих
function showAuthModal() {
  isModalVisible.value = true;
}

// Закриває модальне вікно
function closeModal() {
  isModalVisible.value = false;
}

// Перенаправляє на сторінку реєстрації
function redirectToRegister() {
  closeModal();
  router.push('/register'); // Переконайтесь, що у вас є маршрут /register
}

// Головний обробник кліку по кнопці
function handleGetBonusClick() {
  if (isUserAuthenticated.value) {
    // Якщо користувач авторизований, переходимо на сторінку поповнення
    router.push('/deposit');
  } else {
    // Якщо ні - показуємо модальне вікно
    showAuthModal();
  }
}
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="bonus-hero-content">
        <h1>Акции и бонусы</h1>
        <p>Получайте максимум от каждой игры!</p>
      </div>

      <div class="bonus-content-grid">
        <div class="bonus-card">
          <img src="/imgnew/bon1.png" alt="Бонус 1" class="bonus-card-img" />
          <div class="bonus-text-overlay">
            <h3>СУПЕР ПРЕДЛОЖЕНИЕ</h3>
            <p>сделай депозит от 20000 рублей и получи бонус + 150% к депозиту 150 ФС и промод на 10% от суммы пополнения твоих друзей!</p>
            <p class="small-text">вейджер х1</p>
          </div>
          <div class="bonus-card-actions">
            <button @click="handleGetBonusClick" class="btn bonus-action-btn">Получить бонус с кодом</button>
          </div>
        </div>
        <div class="bonus-card">
          <img src="/imgnew/bon2.png" alt="Бонус 2" class="bonus-card-img" />
          <div class="bonus-text-overlay">
            <h3>СУПЕР БОНУС</h3>
            <p>сделай депозит от 10000 рублей и получи бонус 100% к депозиту и 100 ФС</p>
            <p class="small-text">вейджер х3</p>
          </div>
          <div class="bonus-card-actions">
            <button @click="handleGetBonusClick" class="btn bonus-action-btn">Получить бонус</button>
          </div>
        </div>
        <div class="bonus-card">
          <img src="/imgnew/bon3.png" alt="Бонус 3" class="bonus-card-img" />
          <div class="bonus-text-overlay">
            <h3>ПОЛУЧИ БОНУС</h3>
            <p>сделай депозит от 5000 рублей и получи 50% к депозиту 50 ФС</p>
            <p class="small-text">вейджер х5</p>
          </div>
          <div class="bonus-card-actions">
            <button @click="handleGetBonusClick" class="btn bonus-action-btn">Получить бонус</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isModalVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close-btn" @click="closeModal">&times;</button>
        <div class="modal-state-centered">
          <h2>Требуется авторизация</h2>
          <p class="modal-text">Пожалуйста, авторизуйтесь или зарегистрируйте личный аккаунт, чтобы получить бонус.</p>
          <button @click="redirectToRegister" class="cta-button">Регистрация</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  gap: 24px;
}

.main-content {
  flex-grow: 1;
}

.bonus-hero-content {
  margin-bottom: 32px;
  text-align: center;
}

.bonus-hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  color: white;
}

.bonus-hero-content p {
  color: var(--muted);
  font-size: 1.1rem;
}

.bonus-content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px; 
}

.bonus-card {
  background-color: var(--card);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 360px; 
  justify-self: center;
}

.bonus-card-img {
  width: 100%;
  height: auto;
  display: block;
}

.bonus-text-overlay {
  position: absolute;
  bottom: 80px; 
  left: 0;
  width: 100%;
  padding: 20px 15px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  text-align: center;
  box-sizing: border-box;
}

.bonus-text-overlay h3 {
  font-size: 1.25rem;
  margin-bottom: 8px;
  text-transform: uppercase;
}

.bonus-text-overlay p {
  font-size: 0.9rem;
  line-height: 1.4;
  margin: 0;
}

.bonus-text-overlay .small-text {
  font-size: 0.8rem;
  margin-top: 8px;
  opacity: 0.8;
}

.bonus-card-actions {
  margin-top: auto; 
  padding: 16px;
  display: flex;
  justify-content: center;
  background-color: var(--card);
}

.bonus-action-btn {
  width: 100%;
  /* Використовуємо змінні, якщо вони визначені глобально, або можна задати стилі напряму */
  background-color: var(--accent, #007bff);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: var(--radius, 8px);
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.2s;
}
.bonus-action-btn:hover {
    background-color: var(--accent-hover, #0056b3);
}

/* --- Адаптивність --- */
@media (max-width: 1024px) {
  .bonus-content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .main-layout {
    flex-direction: column;
    padding: 0 16px; 
  }

  .bonus-hero-content h1 {
    font-size: 2rem;
  }
  
  .bonus-content-grid {
    grid-template-columns: 1fr;
  }

  .bonus-card {
    max-width: 100%;
  }

  .bonus-text-overlay {
    bottom: 70px;
    padding: 15px 10px;
  }

  .bonus-text-overlay h3 {
    font-size: 1.1rem;
  }

  .bonus-text-overlay p {
    font-size: 0.85rem;
  }
}


/* --- 👇 НОВІ СТИЛІ ДЛЯ МОДАЛЬНОГО ВІКНА 👇 --- */
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
  z-index: 1000;
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

</style>