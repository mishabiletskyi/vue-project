<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="payment-status container">
    <div class="card success">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h1>Оплата прошла успешно!</h1>
      <p>Средства скоро будут зачислены на ваш баланс.</p>
      <div class="actions">
        <RouterLink to="/account" class="btn">В кабинет</RouterLink>
        <RouterLink to="/games" class="btn secondary">Играть</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.payment-status {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  text-align: center;
}
.card {
  background: #1e232d;
  padding: 40px;
  border-radius: 16px;
  max-width: 400px;
  width: 100%;
  border: 1px solid #2a2f3a;
}
.icon-wrapper {
  color: #4caf50;
  margin-bottom: 20px;
}
h1 { font-size: 1.5rem; margin-bottom: 10px; color: #fff; }
p { color: #94a3b8; margin-bottom: 30px; }
.actions { display: flex; gap: 10px; flex-direction: column; }
.btn {
  background: #ff4d00;
  color: white;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}
.btn.secondary { background: transparent; border: 1px solid #2a2f3a; }
</style>