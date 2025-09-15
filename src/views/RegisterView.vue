<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth.js'


// --- ЗМІНИ ТУТ ---
// 1. Додаємо базовий URL до вашого сховища
const SUPABASE_URL = 'https://vngvrmbpffrtfhkauous.supabase.co/storage/v1/object/public/img';

// 2. Створюємо константи для зображень
const registrationCardImage = `${SUPABASE_URL}/lodgincard.png`;
// ЗАМІНІТЬ 'bonus-background.png' НА НАЗВУ ФАЙЛУ ВАШОГО ЗОБРАЖЕННЯ ДЛЯ МОДАЛЬНОГО ВІКНА
const bonusModalImage = `${SUPABASE_URL}/bonus-background.png`;
// --- КІНЕЦЬ ЗМІН ---

const router = useRouter()
const { register } = useAuth()

const email = ref('')
const password = ref('')
const nickname = ref('')
const message = ref('')
const error = ref(null)
const isLoading = ref(false)
const isBonusModalVisible = ref(false)

// --- НОВАЯ ЛОГИКА: Состояние для чекбокса подтверждения ---
const termsAccepted = ref(false)

// --- ЛОГИКА ДЛЯ ПАРОЛЯ ---
const isPasswordVisible = ref(false)
const passwordFieldType = computed(() => isPasswordVisible.value ? 'text' : 'password')

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value
}

const hasMinLength = computed(() => password.value.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(password.value))
const hasLowercase = computed(() => /[a-z]/.test(password.value))
const hasNumber = computed(() => /\d/.test(password.value))

const isFormValid = computed(() => {
  return email.value &&
         nickname.value &&
         hasMinLength.value &&
         hasUppercase.value &&
         hasLowercase.value &&
         hasNumber.value &&
         termsAccepted.value
})
// --- КОНЕЦ ЛОГИКИ ПАРОЛЯ ---

async function onSubmit() {
  if (!isFormValid.value) return

  isLoading.value = true
  message.value = ''
  error.value = null

  try {
    await register({ email: email.value, password: password.value })
    localStorage.setItem('user_nickname', nickname.value)
    isBonusModalVisible.value = true
  } catch (err) {
    error.value = err
    message.value = err.message || 'Произошла неизвестная ошибка.'
  } finally {
    isLoading.value = false
  }
}

function claimBonus() {
  window.location.assign('/bonuses');
}

function skipBonus() {
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

          <label for="nickname">Никнейм</label>
          <input
            type="text"
            id="nickname"
            v-model="nickname"
            placeholder="Введите ваш никнейм"
            required
            :disabled="isLoading"
          />

          <label for="password">Пароль</label>
          <div class="password-wrapper">
            <input
              :type="passwordFieldType"
              id="password"
              v-model="password"
              placeholder="Введите пароль"
              required
              :disabled="isLoading"
            />
            <span
              class="password-toggle-icon"
              :class="{ 'is-visible': isPasswordVisible }"
              @click="togglePasswordVisibility"
              title="Показать/скрыть пароль"
            ></span>
          </div>

          <div class="password-requirements">
            <p :class="{ 'valid': hasMinLength }">Минимум 8 символов</p>
            <p :class="{ 'valid': hasUppercase }">Одна заглавная буква</p>
            <p :class="{ 'valid': hasLowercase }">Одна строчная буква</p>
            <p :class="{ 'valid': hasNumber }">Одна цифра</p>
          </div>

          <button type="submit" :disabled="!isFormValid || isLoading">
            {{ isLoading ? 'Регистрация...' : 'Зарегистрироваться' }}
          </button>

          <p v-if="message" :class="{ 'error': error }">{{ message }}</p>
        </form>
        <div class="extra">
          <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
        </div>
      </div>

      <div class="terms-text">
        <label for="terms">
          <input type="checkbox" id="terms" v-model="termsAccepted" />
          <span>
            Я подтверждаю, что достиг(-ла) возраста 18 лет... Я также ознакомлен(-на) и согласен(-на) с <a href="#">Политикой конфиденциальности</a>.
          </span>
        </label>
      </div>
      </div>
    <div class="bonus-section">
      <img :src="registrationCardImage" alt="lodgincard" />
    </div>

    <Transition name="modal-fade">
      <div v-if="isBonusModalVisible" class="bonus-modal-overlay">
        <div class="bonus-modal-content">
          <!-- <div class="bonus-image"></div> -->
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
/* ... Ваши предыдущие стили ... */
.auth-container { display: flex; width: 100%; height: 100vh; }
.login-box { width: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; }
.login-form { width: 640px; background: #14161b; padding: 32px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,.35); position: relative; }
.login-form h1 { margin: 0 0 24px; font-size: 2rem; text-align: center; }
.login-form label { display: block; margin-bottom: 8px; }
.login-form input { width: 100%; padding: 12px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #2a2f3a; background: #0b0c10; color: #f1f5f9; }
.login-form input:focus { outline: none; border-color: #ff4d00; }
.login-form button { width: 100%; padding: 14px; background: #ff4d00; border: none; border-radius: 8px; color: #fff; font-weight: 700; cursor: pointer; transition: background .3s; }
.login-form button:hover { background: #ff1a1a; }
button:disabled { background: #555; cursor: not-allowed; opacity: 0.6; }
.login-form .extra { margin-top: 16px; text-align: center; }
.login-form .extra a { color: #ff9a00; }
.bonus-section { width: 50%; height: 100vh; }
.bonus-section img { width: 100%; height: 100%; object-fit: cover; }
.close-btn { position: absolute; top: 16px; right: 20px; font-size: 1.8rem; font-weight: bold; color: #f1f5f9; text-decoration: none; }
.error { color: #f87171; margin-top: 16px; text-align: center; }

/* --- СТИЛИ ДЛЯ БЛОКА ПОДТВЕРЖДЕНИЯ --- */
.terms-text { width: 640px; font-size: 0.8rem; color: #94a3b8; margin-top: 24px; line-height: 1.4; text-align: center; }
.terms-text a { color: #ff9a00; text-decoration: underline; }
.terms-text label {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  text-align: left;
}
.terms-text input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  margin-right: 10px;
  flex-shrink: 0;
  accent-color: #ff4d00;
}
/* --- КОНЕЦ СТИЛЕЙ ПОДТВЕРЖДЕНИЯ --- */

/* --- СТИЛИ ДЛЯ ПАРОЛЯ --- */
.password-wrapper { position: relative; width: 100%; }
.password-wrapper input { padding-right: 45px; }
.password-toggle-icon { position: absolute; top: 13px; right: 15px; width: 20px; height: 20px; cursor: pointer; background-repeat: no-repeat; background-position: center; opacity: 0.7; transition: opacity 0.2s ease; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'%3E%3C/path%3E%3Cline x1='1' y1='1' x2='23' y2='23'%3E%3C/line%3E%3C/svg%3E"); }
.password-toggle-icon:hover { opacity: 1; }
.password-toggle-icon.is-visible { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'%3E%3C/path%3E%3Ccircle cx='12' cy='12' r='3'%3E%3C/circle%3E%3C/svg%3E"); }
.password-requirements { margin-top: -10px; margin-bottom: 20px; font-size: 0.8rem; color: #94a3b8; }
.password-requirements p { margin: 4px 0; transition: color 0.3s ease; }
.password-requirements p.valid { color: #4ade80; }
.password-requirements p.valid::before { content: '✓ '; font-weight: bold; }
/* --- КОНЕЦ СТИЛЕЙ ПАРОЛЯ --- */

/* --- СТИЛИ ДЛЯ БОНУСНОГО БАНЕРА --- */
.bonus-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.9); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.bonus-modal-content { display: flex; width: 90%; max-width: 900px; height: 550px; background-color: #1a1e28; border-radius: 16px; overflow: hidden; border: 2px solid #ff9a00; box-shadow: 0 0 40px rgba(255, 154, 0, 0.5); justify-content: center; }
.bonus-image { width: 45%; background-image: url('https://images.unsplash.com/photo-1615807713086-bfc497584513?q=80&w=1887&auto=format&fit=crop'); background-size: cover; background-position: center; }
.bonus-text { width: 55%; padding: 40px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
.bonus-title, .bonus-subtitle, .bonus-offer, .cta-button, .skip-button { opacity: 0; animation: slide-up 0.6s ease-out forwards; }
.bonus-title { font-size: 2.5rem; color: #ff9a00; margin: 0; text-transform: uppercase; animation-delay: 0.2s; }
.bonus-subtitle { font-size: 1.1rem; color: #f1f5f9; margin: 16px 0 24px; animation-delay: 0.4s; }
.bonus-offer { display: flex; gap: 24px; margin-bottom: 32px; animation-delay: 0.6s; }
.offer-item { background-color: #14161b; padding: 16px; border-radius: 8px; border: 1px solid #2a2f3a; }
.offer-value { display: block; font-size: 2.2rem; font-weight: bold; color: #ff4d00; }
.offer-desc { display: block; font-size: 0.8rem; color: #94a3b8; text-transform: uppercase; }
.cta-button { width: 100%; padding: 18px; font-size: 1.2rem; font-weight: bold; color: #fff; border: none; border-radius: 8px; cursor: pointer; text-transform: uppercase; background: linear-gradient(45deg, #ff4d00, #ff9a00, #ff4d00); background-size: 200% 200%; box-shadow: 0 0 20px rgba(255, 154, 0, 0.6); transition: all 0.3s ease; animation: slide-up 0.6s 0.8s ease-out forwards, shimmer 3s infinite; }
.cta-button:hover { transform: translateY(-3px); box-shadow: 0 0 30px rgba(255, 154, 0, 0.8); }
.skip-button { margin-top: 16px; background: none; border: none; color: #94a3b8; cursor: pointer; text-decoration: underline; animation-delay: 1s; }
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.4s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-fade-enter-active .bonus-modal-content { animation: zoom-in 0.4s ease-out; }
@keyframes zoom-in { from { transform: scale(0.8); } to { transform: scale(1); } }
@keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

/* --- АДАПТАЦИЯ --- */
@media (max-width: 1024px) {
  .auth-container {
    flex-direction: column;
    height: auto;
  }
  .login-box {
    width: 100%;
    min-height: 100vh;
  }
  .bonus-section {
    display: none;
  }
  .login-form, .terms-text {
    width: 100%;
    max-width: 500px;
  }
}

@media (max-width: 768px) {
  .login-box {
    min-height: initial;
    padding: 0;
  }
  .login-form, .terms-text {
    width: auto;
    margin: 24px;
    max-width: 100%;
  }
  .bonus-modal-content { flex-direction: column; width: 80%; max-width: 500px; height: auto; max-height: 90vh; }
  .bonus-image { display: none; }
  .bonus-text { width: 100%; padding: 32px; }
  .bonus-title { font-size: 2rem; }
  .bonus-offer { flex-direction: column; width: 100%; }
}

@media (max-width: 480px) {
  .login-form { padding: 24px; }
  .bonus-text { padding: 24px; }
  .bonus-title { font-size: 1.6rem; }
  .bonus-subtitle { font-size: 1rem; }
  .offer-value { font-size: 2rem; }
  .cta-button { padding: 16px; font-size: 1rem; }
}
</style>