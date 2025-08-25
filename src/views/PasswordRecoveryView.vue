<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="auth-form">
        <img class="auth-logo" src="/img/passrec.png" alt="Password recovery" />
        <h1>Восстановление пароля</h1>
        <form>
          <input type="email" placeholder="Email" required />
          <button type="submit" class="btn btn-lg">Отправить ссылку</button>
        </form>
        <router-link to="/login" class="link">Назад ко входу</router-link>
      </div>
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 32px;
  background: var(--card);
  border-radius: var(--radius);
  text-align: center;
}
.auth-logo {
  width: 120px;
  margin: 0 auto 24px;
}
.auth-form input {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  background-color: #1d1f26;
  border: 1px solid #2a2f3a;
  border-radius: 8px;
  color: var(--text);
}
.auth-form .link {
  display: block;
  margin-top: 8px;
  color: var(--accent);
}
</style>
