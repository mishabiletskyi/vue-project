<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { isLoggedIn, logout } = useAuth();
const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function goToLogin() {
  router.push('/login');
}

function goToRegister() {
  router.push('/register');
}

function goToCabinet() {
  router.push('/cabinet');
}

function handleLogout() {
  logout();
  router.push('/');
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <a href="#" class="logo" aria-label="GG Casino — на главную">
        <span aria-hidden="true">GG</span><span class="accent" aria-hidden="true">•</span>Casino
      </a>

      <nav class="nav desktop-nav" aria-label="Основная навигация">
        <ul class="nav-list">
          <li><a href="#games">Игры</a></li>
          <li><a href="#bonuses">Бонусы</a></li>
          <li><a href="#tournaments">Турниры</a></li>
          <li><a href="#support">Поддержка</a></li>
        </ul>
      </nav>

      <div class="auth desktop-auth">
        <template v-if="isLoggedIn">
          <button class="btn btn-ghost" @click="goToCabinet">Мой кабинет</button>
          <button class="btn btn-ghost" @click="handleLogout">Выйти</button>
        </template>
        <template v-else>
          <button class="btn btn-ghost" @click="goToLogin">Войти</button>
          <button class="btn btn-ghost" @click="goToRegister">Регистрация</button>
        </template>
      </div>

      <button class="burger-menu" @click="toggleMobileMenu" aria-label="Открыть меню" :class="{ 'is-active': isMobileMenuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <nav class="mobile-nav" :class="{ 'is-open': isMobileMenuOpen }">
       <ul class="nav-list">
          <li><a href="#games" @click="toggleMobileMenu">Игры</a></li>
          <li><a href="#bonuses" @click="toggleMobileMenu">Бонусы</a></li>
          <li><a href="#tournaments" @click="toggleMobileMenu">Турниры</a></li>
          <li><a href="#support" @click="toggleMobileMenu">Поддержка</a></li>
        </ul>
        <div class="auth">
           <template v-if="isLoggedIn">
             <button class="btn btn-ghost" @click="() => { goToCabinet(); toggleMobileMenu(); }">Мой кабинет</button>
             <button class="btn btn-ghost" @click="() => { handleLogout(); toggleMobileMenu(); }">Выйти</button>
           </template>
           <template v-else>
             <button class="btn btn-ghost" @click="() => { goToLogin(); toggleMobileMenu(); }">Войти</button>
             <button class="btn" @click="() => { goToRegister(); toggleMobileMenu(); }">Регистрация</button>
           </template>
        </div>
    </nav>
  </header>
</template>
