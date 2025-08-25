<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
import ImageSlider from '../components/ImageSlider.vue';
import GamesGrid from '../components/GamesGrid.vue';
</script>

<template>
  <main class="main-layout container">
    <LeftSidebar />

    <div class="main-content">
      <ImageSlider />
      <GamesGrid />

      <section id="bonuses" class="section section-accent">
        <div class="container promo">
          <div class="promo-copy">
            <h2>Бонусы для новых игроков</h2>
            <p>100% на первый депозит + 50 FS.</p>
          </div>
          <a href="#" class="btn btn-lg">Забрать бонус</a>
        </div>
      </section>

      <section id="tournaments" class="section">
        <div class="container">
          <header class="section-head">
            <h2>Еженедельные турниры</h2>
            <p>Играй в любимые слоты и попади в таблицу лидеров.</p>
          </header>
          <div class="table-wrap" role="region" aria-label="Таблица лидеров">
            <table class="leaderboard">
              <thead>
                <tr>
                  <th>Место</th>
                  <th>Игрок</th>
                  <th>Очки</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>player_001</td>
                  <td>12 540</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>player_042</td>
                  <td>11 980</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>player_777</td>
                  <td>11 120</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="learn-more" class="section">
        <div class="container">
          <h2>Ответственная игра</h2>
          <p class="muted">Играйте ответственно. Возрастные ограничения применяются.</p>
        </div>
      </section>
    </div>

    <RightSidebar />
  </main>
</template>