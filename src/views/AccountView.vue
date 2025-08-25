<script setup>
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { user, logout } = useAuth();

function handleLogout() {
  logout();
  router.push('/');
}
</script>

<template>
  <div class="account container">
    <h1 class="account-title">Личный кабинет</h1>

    <div class="account-info card">
      <p class="email">Вы вошли как <strong>{{ user?.email }}</strong></p>
      <button class="btn btn-lg logout-btn" @click="handleLogout">Выйти</button>
    </div>

    <section class="widgets">
      <div class="widget card">
        <h2>Недавние игры</h2>
        <p>Здесь появятся ваши последние запуски слотов.</p>
      </div>
      <div class="widget card">
        <h2>Бонусы</h2>
        <p>Следите за прогрессом и активируйте бонусы.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.account {
  padding: 48px 0;
}
.account-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 32px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}
.account-info {
  text-align: center;
  margin-bottom: 40px;
}
.email {
  font-size: 1.25rem;
  margin-bottom: 20px;
}
.logout-btn {
  width: 100%;
}
.widgets {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}
.widget h2 {
  margin-bottom: 12px;
}
.widget p {
  color: var(--muted);
}
</style>
