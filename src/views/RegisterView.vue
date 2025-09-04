<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth.js'

const router = useRouter()
const { register } = useAuth()

const email = ref('')
const password = ref('')
const message = ref('')
const error = ref(null)
const isLoading = ref(false)

// Стан для видимості нового бонусного модального вікна
const isBonusModalVisible = ref(false)

async function onSubmit() {
  isLoading.value = true
  message.value = ''
  error.value = null

  try {
    // 👇 ГОЛОВНЕ ВИПРАВЛЕННЯ: Реєстрація тепер виконується
    await register({ email: email.value, password: password.value })
    
    // ✅ Реєстрація успішна! Показуємо бонусне вікно
    isBonusModalVisible.value = true

  } catch (err) {
    error.value = err
    message.value = err.message || 'Произошла неизвестная ошибка.'
  } finally {
    isLoading.value = false
  }
}

// Функції для кнопок у модальному вікні
function claimBonus() {
  // 👇 ВИПРАВЛЕННЯ: Використовуємо window.location для повного перезавантаження сторінки,
  // щоб хедер та інші компоненти оновилися.
  window.location.assign('/bonuses');
}

function skipBonus() {
  // 👇 ВИПРАВЛЕННЯ: Аналогічно, перезавантажуємо сторінку при переході в акаунт.
  window.location.assign('/account');
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
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            placeholder="Введите e-mail" 
            required 
            :disabled="isLoading" 
          />

          <label for="password">Пароль</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Введите пароль" 
            required 
            :disabled="isLoading" 
          />

          <button type="submit" :disabled="isLoading">
            {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>
          
          <p v-if="message" :class="{ 'error': error }">{{ message }}</p>
        </form>
        <div class="extra">
          <p>Уже есть аккаунт? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
      <div class="terms-text">
        <p>
          Я подтверждаю, что достиг(-ла) возраста 18 лет... Я также ознакомлен(-на) и согласен(-на) с <a href="#">Политикой конфиденциальности</a>.
        </p>
      </div>
    </div>
    <div class="bonus-section">
      <img src="/img/lodgincard.png" alt="lodgincard" />
    </div>

    <!-- НОВИЙ ІНТЕРАКТИВНИЙ БАНЕР -->
    <Transition name="modal-fade">
      <div v-if="isBonusModalVisible" class="bonus-modal-overlay">
        <div class="bonus-modal-content">
          <div class="bonus-image">
            <!-- Тут можна розмістити яскраву картинку -->
          </div>
          <div class="bonus-text">
            <h2 class="bonus-title">РЕГИСТРАЦИЯ УСПЕШНА!</h2>
            <p class="bonus-subtitle">Ваш эксклюзивный приветственный пакет активирован:</p>
            <div class="bonus-offer">
              <div class="offer-item">
                <span class="offer-value">150%</span>
                <span class="offer-desc">БОНУС НА ПЕРВЫЙ ДЕПОЗИТ</span>
              </div>
              <div class="offer-item">
                <span class="offer-value">150</span>
                <span class="offer-desc">ФРИСПИНОВ В ПОДАРОК</span>
              </div>
            </div>
            <button @click="claimBonus" class="cta-button">ЗАБРАТЬ МЕГА БОНУС</button>
            <button @click="skipBonus" class="skip-button">Нет, спасибо</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.auth-container { display: flex; width: 100%; height: 100vh; }
.login-box { width: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.login-form { width: 640px; background: #14161b; padding: 32px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.35); position: relative; }
.login-form h1 { margin: 0 0 24px; font-size: 2rem; text-align: center; }
.login-form label { display: block; margin-bottom: 8px; }
.login-form input { width: 100%; padding: 12px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #2a2f3a; background: #0b0c10; color: #f1f5f9; }
.login-form input:focus { outline: none; border-color: #ff4d00; }
.login-form button { width: 100%; padding: 14px; background: #ff4d00; border: none; border-radius: 8px; color: #fff; font-weight: 700; cursor: pointer; transition: background .3s; }
.login-form button:hover { background: #ff1a1a; }
button:disabled { background: #555; cursor: not-allowed; }
.login-form .extra { margin-top: 16px; text-align: center; }
.login-form .extra a { color: #ff9a00; }
.terms-text { width: 640px; font-size: 0.8rem; color: #94a3b8; margin-top: 24px; line-height: 1.4; text-align: center; }
.terms-text a { color: #ff9a00; text-decoration: underline; }
.bonus-section { width: 50%; height: 100vh; }
.bonus-section img { width: 100%; height: 100%; object-fit: cover; }
.close-btn { position: absolute; top: 16px; right: 20px; font-size: 1.8rem; font-weight: bold; color: #f1f5f9; text-decoration: none; }
.error { color: #f87171; margin-top: 16px; text-align: center; }

/* --- СТИЛІ ДЛЯ НОВОГО БОНУСНОГО БАНЕРА --- */

.bonus-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.bonus-modal-content {
  display: flex;
  width: 90%;
  max-width: 900px;
  height: 550px;
  background-color: #1a1e28;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid #ff9a00;
  box-shadow: 0 0 40px rgba(255, 154, 0, 0.5);
}

.bonus-image {
  width: 45%;
  background-image: url('https://images.unsplash.com/photo-1615807713086-bfc497584513?q=80&w=1887&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
}

.bonus-text {
  width: 55%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

/* Анімації появи тексту */
.bonus-title, .bonus-subtitle, .bonus-offer, .cta-button, .skip-button {
  opacity: 0;
  animation: slide-up 0.6s ease-out forwards;
}

.bonus-title {
  font-size: 2.5rem;
  color: #ff9a00;
  margin: 0;
  text-transform: uppercase;
  animation-delay: 0.2s;
}

.bonus-subtitle {
  font-size: 1.1rem;
  color: #f1f5f9;
  margin: 16px 0 24px;
  animation-delay: 0.4s;
}

.bonus-offer {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  animation-delay: 0.6s;
}

.offer-item {
  background-color: #14161b;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
}

.offer-value {
  display: block;
  font-size: 2.2rem;
  font-weight: bold;
  color: #ff4d00;
}

.offer-desc {
  display: block;
  font-size: 0.8rem;
  color: #94a3b8;
  text-transform: uppercase;
}

.cta-button {
  width: 100%;
  padding: 18px;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-transform: uppercase;
  background: linear-gradient(45deg, #ff4d00, #ff9a00, #ff4d00);
  background-size: 200% 200%;
  box-shadow: 0 0 20px rgba(255, 154, 0, 0.6);
  transition: all 0.3s ease;
  animation: slide-up 0.6s 0.8s ease-out forwards, shimmer 3s infinite;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 30px rgba(255, 154, 0, 0.8);
}

.skip-button {
  margin-top: 16px;
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  text-decoration: underline;
  animation-delay: 1s;
}

/* Анімація появи */
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.4s ease;
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active .bonus-modal-content {
  animation: zoom-in 0.4s ease-out;
}

@keyframes zoom-in {
  from { transform: scale(0.8); }
  to { transform: scale(1); }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}


@media (max-width: 768px) {
  .auth-container { flex-direction: column; height: auto; }
  .login-box, .bonus-section { width: 100%; }
  .bonus-section { display: none; }
  .login-form, .terms-text { width: auto; margin: 24px; }
  
  .bonus-modal-content {
    flex-direction: column;
    width: 95%;
    height: auto;
    max-height: 90vh;
  }
  .bonus-image { display: none; }
  .bonus-text { width: 100%; padding: 24px; }
  .bonus-title { font-size: 1.8rem; }
  .bonus-offer { flex-direction: column; }
}
</style>

