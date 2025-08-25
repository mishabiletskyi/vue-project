<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth.js'

const router = useRouter()
const { register } = useAuth()

const email = ref('')
const password = ref('')
const message = ref('')

function onSubmit() {
  register({ email: email.value, password: password.value })
  message.value = 'Регистрация успешна!'
  setTimeout(() => router.push('/account'), 1000)
}
</script>

<template>
  <div class="auth-container">
    <div class="login-box">
      <div class="login-form">
        <router-link to="/" class="close-btn" aria-label="Закрыть">×</router-link>
        <h1>Регистрация</h1>
        <form @submit.prevent="onSubmit">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" placeholder="Введите e-mail" required />

          <label for="password">Пароль</label>
          <input type="password" id="password" v-model="password" placeholder="Введите пароль" required />

          <button type="submit">Зарегистрироваться</button>
          <p v-if="message" class="success">{{ message }}</p>
        </form>
        <div class="extra">
          <p>Уже есть аккаунт? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
      <div class="terms-text">
        <p>
          Я подтверждаю, что достиг(-ла) возраста 18 лет или минимально допустимого возраста для игры в азартные игры, предусмотренного законодательством страны моего проживания, являюсь дееспособным(-ой) и не имею зависимости от азартных игр. Я подтверждаю, что ознакомлен(-на), согласен(-на) и принимаю <a href="#">Условия и положения</a>. Я также ознакомлен(-на) и согласен(-на) с <a href="#">Политикой конфиденциальности</a>.
        </p>
      </div>
    </div>
    <div class="bonus-section">
      <img src="/img/lodgincard.png" alt="lodgincard" />
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
  flex-direction: column;
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
.terms-text {
  width: 640px;
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 24px;
  line-height: 1.4;
  text-align: center;
}
.terms-text a {
  color: #ff9a00;
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
  .login-box, .bonus-section {
    width: 100%;
  }
  .bonus-section {
    height: 200px;
  }
  .login-form, .terms-text {
    width: 100%;
    margin: 24px;
  }
}
</style>
