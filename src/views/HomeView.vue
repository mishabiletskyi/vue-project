<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import ImageSlider from '../components/ImageSlider.vue';
import GamesGrid from '../components/GamesGrid.vue';
import Leaderboard from '../components/Leaderboard.vue';
import { popularGames } from '@/data/mockData.js';
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <ImageSlider />
      
      <section id="bonuses" class="section section-accent">
        <div class="promo">
          <div class="promo-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-gift"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
          </div>
          <div class="promo-copy">
            <h2>Бонусы для новых игроков</h2>
            <p>150% на первый депозит + 150 FS.</p>
          </div>
          <router-link to="/bonuses" class="btn btn-lg">Забрать бонус</router-link>
        </div>
      </section>

      <section id="games" class="section" style="padding: 0px;">
        <header class="section-head">
          <h2>Популярные игры</h2>
        </header>
        <GamesGrid :games="popularGames" />
      </section>

      <section id="tournaments" class="section">
        <header class="section-head">
          <h2>Еженедельные турниры</h2>
        </header>
        <Leaderboard />
      </section>
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  gap: 24px;
}
.main-content {
  flex: 1;
  min-width: 0;
}
.section {
  /* margin-top: 48px; Стандартний відступ для інших секцій */
}

/* 👇 Ще більше зменшені відступи */
#bonuses.section,
#games.section {
  margin-top: 16px;
}

.section-head {
  margin-bottom: 24px;
}

/* 👇 Повністю перероблений стиль для акцентної секції */
.section-accent {
    /* Градієнтний фон для кращого вигляду */
    background: linear-gradient(90deg, rgba(45,55,77,1) 0%, rgba(26,30,40,1) 100%);
    border-radius: var(--radius, 12px);
    /* Компактний padding */
    padding: 16px 24px;
    border: 1px solid #2a2f3a;
}

.promo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap; 
}

.promo-icon {
    color: var(--accent, #00bfff);
    flex-shrink: 0; /* Щоб іконка не стискалася */
}

.promo-copy {
    /* Займає весь доступний простір, відсуваючи кнопку вправо */
    flex-grow: 1;
}

.promo-copy h2 {
    font-size: 1.25rem; /* Компактніший заголовок */
    margin: 0 0 4px 0;
    color: #fff;
    font-weight: 600;
}
.promo-copy p {
    font-size: 0.9rem; /* Компактніший текст */
    margin: 0;
    color: var(--text-secondary, #8a99b2);
}

.btn {
    text-decoration: none;
    background-color: var(--accent, #00bfff);
    color: #fff;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s ease;
    white-space: nowrap; /* Щоб текст кнопки не переносився */
}
.btn:hover {
    background-color: #00aadd;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 191, 255, 0.3);
}

.btn.btn-lg {
    padding: 12px 24px;
    font-size: 0.9rem;
}

/* Адаптивність для промо-блока */
@media (max-width: 768px) {
    .promo {
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
    .btn.btn-lg {
        width: 100%;
        text-align: center;
    }
}

/* --- ▼▼▼ ВОТ ГЛАВНОЕ ИСПРАВЛЕНИЕ ▼▼▼ --- */
/* Адаптивность для основного лейаута */
@media (max-width: 768px) {
  .main-layout {
    /* Заставляем сайдбар и контент встать друг под друга */
    flex-direction: column;
  }
}
</style>