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
}
.main-content {
  flex-grow: 1;
  padding-left: 24px; /* Для вирівнювання з LeftSidebar */
}
.bonus-hero-content {
  margin-bottom: 24px;
  text-align: center; /* Центрування тексту заголовка */
}
.bonus-hero-content h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  color: white; /* Білий колір для заголовка */
}
.bonus-hero-content p {
  color: var(--muted);
}
.bonus-content-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  justify-items: center;
  align-items: flex-start; /* Вирівнювання по верхньому краю */
  width: 100%; /* Забезпечуємо, що сітка займає всю доступну ширину */
  max-width: 1200px; /* Обмеження ширини для кращого вигляду */
  margin: 0 auto; /* Центрування сітки */
}
.bonus-card {
  background-color: var(--card);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  position: relative; /* Для позиціонування текстового оверлея */
  width: 100%;
  max-width: 380px; /* Обмеження ширини картки */
}
.bonus-card-img {
  width: 100%;
  height: auto;
  display: block;
}
.bonus-text-overlay {
  position: absolute;
  bottom: 120px; /* Вище кнопки */
  left: 0;
  width: 100%;
  padding: 15px; /* Збільшений відступ для кращого вигляду */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0)); /* Градієнт для кращої читабельності */
  color: white;
  text-align: center;
  box-sizing: border-box; /* Враховуємо padding у розмірах */
}
.bonus-text-overlay h3 {
  font-size: 1.2rem; /* Трохи менший шрифт для заголовка */
  margin-bottom: 5px;
  text-transform: uppercase;
}
.bonus-text-overlay p {
  font-size: 1rem; /* Менший шрифт для опису */
  line-height: 1.3;
}
.bonus-text-overlay .small-text {
  font-size: 0.8rem;
  margin-top: 5px;
  opacity: 0.8;
}
.bonus-card-actions {
  padding: 16px;
  display: flex;
  justify-content: center;
}
.bonus-action-btn {
  width: 100%;
}

/* Адаптивність */
@media (max-width: 1200px) {
  .main-content {
    padding-left: 12px;
  }
  .bonus-content-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .main-content {
    padding-left: 0;
  }
  .bonus-hero-content h1 {
    font-size: 2rem;
  }
  .bonus-hero-content p {
    font-size: 0.9rem;
  }
  .bonus-content-grid {
    grid-template-columns: 1fr;
  }
  .bonus-text-overlay {
    bottom: 50px; /* Регулюємо відступ знизу для менших екранів */
    padding: 10px;
  }
  .bonus-text-overlay h3 {
    font-size: 1rem;
  }
  .bonus-text-overlay p {
    font-size: 0.8rem;
  }
  .bonus-card {
    max-width: 100%; /* На малих екранах картки займають 100% ширини */
  }
}
</style>