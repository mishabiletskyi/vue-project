<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// --- ВАЖЛИВО! Вставте сюди ваш URL до бакету 'img' ---
const SUPABASE_URL = 'https://vngvrmbpffrtfhkauous.supabase.co/storage/v1/object/public/img';

// --- Константа для зображення ---
const recoveryImage = `${SUPABASE_URL}/passrec.png`;


const router = useRouter()
const email = ref('')
const message = ref('')

function onSubmit() {
  message.value = 'Если такой e-mail существует, мы отправили инструкцию по восстановлению.'
  setTimeout(() => router.push('/login'), 1000)
}
</script>

<template>
  <div class="auth-container">
    <router-link to="/login" class="nav-btn back-btn" aria-label="Назад">‹</router-link>
    <router-link to="/" class="nav-btn close-btn" aria-label="Закрыть">×</router-link>
    <div class="recovery-box">
      <div class="recovery-form">
        <h1>Восстановление пароля</h1>
        <p>Пожалуйста, введи свои данные ниже, чтобы сбросить пароль.</p>
        <form @submit.prevent="onSubmit">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" placeholder="Введите e-mail" required />
          <button type="submit">Подтвердить</button>
          <p v-if="message" class="success">{{ message }}</p>
        </form>
      </div>
    </div>
    <div class="image-section">
      <img :src="recoveryImage" alt="passrec" />
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
}
.recovery-box {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.recovery-form {
  width: 640px;
  background: #14161b;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
}
.recovery-form h1 {
  margin: 0 0 24px;
  font-size: 2rem;
}
.recovery-form p {
  margin: 0 0 24px;
  color: #94a3b8;
}
.recovery-form label {
  display: block;
  margin-bottom: 8px;
}
.recovery-form input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
}
.recovery-form input:focus {
  outline: none;
  border-color: #ff4d00;
}
.recovery-form button {
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
.recovery-form button:hover {
  background: #ff1a1a;
}
.image-section {
  width: 50%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0b0c10;
}
.image-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.nav-btn {
  position: absolute;
  top: 20px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #f1f5f9;
  text-decoration: none;
  transition: color .2s;
  padding: 8px;
}
.nav-btn.close-btn {
  right: 20px;
}
.nav-btn.back-btn {
  left: 20px;
}
.nav-btn:hover {
  color: #ff4d00;
}
.success {
  color: #ff9a00;
  margin-top: 8px;
  text-align: center;
}
@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
    height: auto;
  }
  .recovery-box, .image-section {
    width: 100%;
  }
  .image-section {
    height: 200px;
  }
  .recovery-form {
    width: 100%;
    margin: 24px;
  }
}
</style>
