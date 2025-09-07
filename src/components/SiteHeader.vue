<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth.js'

const router = useRouter()
const { isLoggedIn, logout, balance } = useAuth()

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// --- ▼▼▼ ИЗМЕНЕНИЕ: Улучшенная логика блокировки скролла для устранения "дерганья" ▼▼▼
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    // Вычисляем ширину скроллбара
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    // Устанавливаем overflow: hidden, чтобы заблокировать прокрутку
    document.body.style.overflow = 'hidden';
    // Добавляем padding-right, равный ширине скроллбара, чтобы компенсировать его исчезновение
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    // Возвращаем стандартные стили
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
})
// --- ▲▲▲ КОНЕЦ ИЗМЕНЕНИЯ ▲▲▲

function handleLogout() {
  logout()
  if (isMobileMenuOpen.value) {
    toggleMobileMenu()
  }
  router.push('/')
}

function goTo(path) {
  if (isMobileMenuOpen.value) {
    toggleMobileMenu()
  }
  router.push(path)
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
       <router-link to="/" class="logo" aria-label="GG Casino — на главную">
        <span aria-hidden="true">GG</span><span class="accent" aria-hidden="true">•</span>Casino
      </router-link>

      <nav class="nav desktop-nav" style="position: relative; left: 100px;" aria-label="Основная навигация">
        <ul class="nav-list">
          <li><RouterLink to="/games">Игры</RouterLink></li>
          <li><RouterLink to="/bonuses">Бонусы</RouterLink></li>
          <li><RouterLink to="/tournaments">Турниры</RouterLink></li>
          <li><RouterLink to="/support">Поддержка</RouterLink></li>
        </ul>
      </nav>

      <div class="auth desktop-auth">
        <template v-if="isLoggedIn">
          <router-link to="/bonuses" class="btn-icon" aria-label="Мои бонусы">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
          </router-link>
          <button class="btn btn-ghost" @click="goTo('/deposit')">Баланс: {{ balance }} ₽</button>
          <router-link to="/account" class="btn btn-ghost">Мой кабинет</router-link>
          <button class="btn btn-ghost" @click="handleLogout">Выйти</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost">Войти</router-link>
          <router-link to="/register" class="btn btn-ghost">Регистрация</router-link>
        </template>
      </div>

      <div class="auth mobile-header-actions">
        <template v-if="isLoggedIn">
           <router-link to="/bonuses" class="btn-icon" aria-label="Мои бонусы">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
           </router-link>
           <router-link to="/deposit" class="balance-link-mobile" aria-label="Баланс">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14a2 2 0 0 1 2 2v4Z"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4Z"></path></svg>
              <span>{{ balance }} ₽</span>
           </router-link>
        </template>
      </div>

      <button
        class="burger-menu"
        @click="toggleMobileMenu"
        aria-label="Открыть меню"
        :class="{ 'is-active': isMobileMenuOpen }"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div
      class="mobile-nav-overlay"
      v-if="isMobileMenuOpen"
      @click="toggleMobileMenu"
    ></div>

    <nav class="mobile-nav" :class="{ 'is-open': isMobileMenuOpen }">
      <ul class="nav-list">
        <li><RouterLink to="/games" @click="toggleMobileMenu">Игры</RouterLink></li>
        <li><RouterLink to="/bonuses" @click="toggleMobileMenu">Бонусы</RouterLink></li>
        <li><RouterLink to="/tournaments" @click="toggleMobileMenu">Турниры</RouterLink></li>
        <li><RouterLink to="/support" @click="toggleMobileMenu">Поддержка</RouterLink></li>
      </ul>
      <div class="auth">
        <template v-if="isLoggedIn">
          <div class="mobile-user-actions-dropdown">
            <router-link to="/bonuses" class="btn-icon" aria-label="Мои бонусы" @click="toggleMobileMenu">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
              <span>Мои Бонусы</span>
            </router-link>
            <button class="btn btn-ghost balance-btn" @click="goTo('/deposit')">Баланс: {{ balance }} ₽</button>
          </div>
          <router-link to="/account" class="btn btn-ghost" @click="toggleMobileMenu">Мой кабинет</router-link>
          <button class="btn btn-ghost" @click="handleLogout">Выйти</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost" @click="toggleMobileMenu">Войти</router-link>
          <router-link to="/register" class="btn" @click="toggleMobileMenu">Регистрация</router-link>
        </template>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* --- Загальні стилі --- */
.site-header {
  position: relative;
  z-index: 1000;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.auth {
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: var(--text-secondary, #94a3b8);
  transition: color 0.2s ease, background-color 0.2s ease;
}
.btn-icon:hover {
  color: var(--accent, #ff4d00);
  background-color: rgba(255, 255, 255, 0.05);
}
.btn-icon svg {
  width: 24px;
  height: 24px;
}

/* --- Логіка відображення для ДЕСКТОПА --- */
.mobile-header-actions, .burger-menu, .mobile-nav, .mobile-nav-overlay {
  display: none;
}

/* --- Логіка відображення для ПЛАНШЕТІВ І МОБІЛЬНИХ --- */
@media (max-width: 1199px) {
  .desktop-nav, .desktop-auth {
    display: none;
  }
  .mobile-header-actions, .burger-menu, .mobile-nav {
    display: flex;
  }
  .mobile-nav-overlay {
    display: block;
  }
}

/* --- Стилі для МОБІЛЬНИХ іконок в хедері --- */
.mobile-header-actions {
  gap: 4px;
}
.balance-link-mobile {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid #2a2f3a;
  border-radius: 20px;
  color: var(--text, #f1f5f9);
  text-decoration: none;
  transition: background-color 0.2s, border-color 0.2s;
}
.balance-link-mobile:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: var(--accent, #ff4d00);
}
.balance-link-mobile svg {
  width: 25px;
  height: 25px;
  color: var(--text-secondary, #94a3b8);
}
.balance-link-mobile span {
  font-weight: 600;
  font-size: 0.9rem;
}

/* --- Стили для выпадающего меню и оверлея --- */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: auto;
  background-color: var(--background-dark, #14161b);
  z-index: 1001;
  flex-direction: column;
  justify-content: flex-start;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top: 1px solid #2a2f3a;
  transform: translateY(-10px);
  opacity: 0;
  visibility: hidden;
  transition: transform 0.3s ease, opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-nav.is-open {
  transform: translateY(0);
  opacity: 1;
  visibility: visible;
}

.mobile-nav-overlay {
  position: fixed;
  top: var(--header-height, 70px);
  left: 0;
  width: 100vw;
  height: calc(100vh - var(--header-height, 70px));
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.mobile-nav.is-open + .mobile-nav-overlay {
  opacity: 1;
  visibility: visible;
}

/* Стили контента внутри меню */
.mobile-nav .nav-list {
  display: flex;
  flex-direction: column;
  align-items: center; /* <-- ИЗМЕНЕНИЕ: Выравнивание по центру */
  gap: 16px;
  padding: 24px;
  width: 100%;
}

.mobile-nav .auth {
  display: flex;
  flex-direction: column;
  align-items: center; /* <-- ИЗМЕНЕНИЕ: Выравнивание по центру */
  gap: 10px;
  padding: 16px 24px 24px 24px;
  border-top: 1px solid #2a2f3a;
}
.mobile-nav .auth .btn {
  width: 100%;
  max-width: 300px; /* Ограничиваем ширину кнопок для эстетики */
  text-align: center;
}
.mobile-user-actions-dropdown {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px; /* Ограничиваем ширину блока */
  margin-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 10px;
}
.mobile-user-actions-dropdown .btn-icon {
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    border-radius: 6px;
    padding: 10px;
}
.mobile-user-actions-dropdown .btn-icon span {
    font-size: 1rem;
    font-weight: 600;
}
.mobile-user-actions-dropdown .balance-btn {
  text-align: left;
  padding: 10px;
}
</style>