<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="payment-status container">
    <div class="card fail">
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      </div>
      <h1>Ошибка оплаты</h1>
      <p>К сожалению, платеж не был завершен. Попробуйте снова или свяжитесь с поддержкой.</p>
      <div class="actions">
        <RouterLink to="/deposit" class="btn">Попробовать снова</RouterLink>
        <RouterLink to="/support" class="btn secondary">Поддержка</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Використовуйте ті ж стилі, що і в SuccessView, тільки змініть колір іконки */
.payment-status { display: flex; justify-content: center; align-items: center; min-height: 60vh; text-align: center; }
.card { background: #1e232d; padding: 40px; border-radius: 16px; max-width: 400px; width: 100%; border: 1px solid #2a2f3a; }
.icon-wrapper { color: #ef4444; margin-bottom: 20px; } /* Червоний колір */
h1 { font-size: 1.5rem; margin-bottom: 10px; color: #fff; }
p { color: #94a3b8; margin-bottom: 30px; }
.actions { display: flex; gap: 10px; flex-direction: column; }
.btn { background: #ff4d00; color: white; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: bold; }
.btn.secondary { background: transparent; border: 1px solid #2a2f3a; }
</style>