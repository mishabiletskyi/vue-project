<script setup>
import { useRouter } from 'vue-router';
import LeftSidebar from '../components/LeftSidebar.vue';

const router = useRouter();

// Функція для переходу на сторінку поповнення
function goToDeposit() {
  router.push('/deposit');
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
            <p class="small-text">вейджер х10</p>
          </div>
          <div class="bonus-card-actions">
            <button @click="goToDeposit" class="btn bonus-action-btn">Получить бонус с кодом</button>
          </div>
        </div>
        <div class="bonus-card">
          <img src="/imgnew/bon2.png" alt="Бонус 2" class="bonus-card-img" />
          <div class="bonus-text-overlay">
            <h3>СУПЕР БОНУС</h3>
            <p>сделай депозит от 10000 рублей и получи бонус 100% к депозиту и 100 ФС</p>
            <p class="small-text">вейджер х5</p>
          </div>
          <div class="bonus-card-actions">
            <button @click="goToDeposit" class="btn bonus-action-btn">Получить бонус</button>
          </div>
        </div>
        <div class="bonus-card">
          <img src="/imgnew/bon3.png" alt="Бонус 3" class="bonus-card-img" />
          <div class="bonus-text-overlay">
            <h3>ПОЛУЧИ БОНУС</h3>
            <p>сделай депозит от 5000 рублей и получи 50% к депозиту 50 ФС</p>
            <p class="small-text">вейджер х1</p>
          </div>
          <div class="bonus-card-actions">
            <button @click="goToDeposit" class="btn bonus-action-btn">Получить бонус</button>
          </div>
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
  /* 3 колонки для десктопів */
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  margin: 0 auto;
  /* Додано відступ знизу, щоб не торкатись футера */
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
  /* Трохи зменшив максимальну ширину для кращого вигляду */
  max-width: 360px; 
  justify-self: center; /* Центруємо картку в комірці гріда */
}

.bonus-card-img {
  width: 100%;
  height: auto;
  display: block;
}

.bonus-text-overlay {
  position: absolute;
  bottom: 80px; /* Оптимальна висота над кнопкою */
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
  /* Цей блок тепер знаходиться в самому низу картки */
  margin-top: auto; 
  padding: 16px;
  display: flex;
  justify-content: center;
  background-color: var(--card); /* Додано фон для перекриття градієнта */
}

.bonus-action-btn {
  width: 100%;
}

/* --- Адаптивність --- */

/* Планшети (<= 1024px) */
@media (max-width: 1024px) {
  .bonus-content-grid {
    /* 2 колонки */
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Мобільні пристрої (<= 768px) */
@media (max-width: 768px) {
  .main-layout {
    /* Сайдбар і контент стають один під одним */
    flex-direction: column;
    padding: 0 16px; /* Додаємо бічні відступи для всього контенту */
  }

  .bonus-hero-content h1 {
    font-size: 2rem;
  }
  
  .bonus-content-grid {
    /* 1 колонка */
    grid-template-columns: 1fr;
  }

  .bonus-card {
    /* Картка займає всю доступну ширину */
    max-width: 100%;
  }

  .bonus-text-overlay {
    bottom: 70px; /* Коригуємо позицію для мобільних */
    padding: 15px 10px;
  }

  .bonus-text-overlay h3 {
    font-size: 1.1rem;
  }

  .bonus-text-overlay p {
    font-size: 0.85rem;
  }
}
</style>