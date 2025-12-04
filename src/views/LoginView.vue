<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth.js'

// --- ВАЖЛИВО! Вставте сюди ваш URL до бакету 'img' ---
const SUPABASE_URL = 'https://vngvrmbpffrtfhkauous.supabase.co/storage/v1/object/public/img';

// --- Константа для зображення ---
const loginCardImage = `${SUPABASE_URL}/lodgincard.webp`;

const router = useRouter()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const error = ref('')

function onSubmit() {
  const success = login({ email: email.value, password: password.value })
  if (success) {
    router.push('/account')
  } else {
    error.value = 'Неверный e-mail или пароль'
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="login-box">
      <div class="login-form">
        <router-link to="/" class="close-btn" aria-label="Закрыть">×</router-link>
        <h1>Вход</h1>
        <form @submit.prevent="onSubmit">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" placeholder="Введите e-mail" required />

          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" placeholder="Введите пароль" required />

          <button type="submit">Войти</button>
          <p v-if="error" class="error">{{ error }}</p>
        </form>
        <div class="extra">
          <p>Нет аккаунта? <router-link to="/register">Регистрация</router-link></p>
          <p><router-link to="/password-recovery">Забыли пароль?</router-link></p>
        </div>
      </div>
    </div>
    <div class="bonus-section">
      <img :src="loginCardImage" alt="lodgincard" />
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  width: 100%;
  height: 100vh;
}
.login-box {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 640px;
  background: #14161b;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
  position: relative;
}
.login-form h1 {
  margin: 0 0 24px;
  font-size: 2rem;
  text-align: center;
}
.login-form label {
  display: block;
  margin-bottom: 8px;
}
.login-form input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
}
.login-form input:focus {
  outline: none;
  border-color: #ff4d00;
}
.login-form button {
  width: 100%;
  padding: 14px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  transition: background .3s;
}
.login-form button:hover {
  background: #ff1a1a;
}
.login-form .extra {
  margin-top: 16px;
  text-align: center;
}
.login-form .extra a {
  color: #ff9a00;
}
.login-form .extra a:hover {
  text-decoration: underline;
}
.bonus-section {
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0b0c10;
}
.bonus-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #f1f5f9;
  text-decoration: none;
  transition: color .2s;
}
.close-btn:hover {
  color: #ff4d00;
}
.error {
  color: #ff4d00;
  margin-top: 8px;
  text-align: center;
}
@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
    height: auto;
  }
  .login-box, .bonus-section {
    width: 100%;
  }
  .bonus-section {
    height: 200px;
  }
  .login-form {
    width: 100%;
    margin: 24px;
  }
}
</style>
