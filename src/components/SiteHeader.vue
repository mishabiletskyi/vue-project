<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth.js'

const router = useRouter()
const { isLoggedIn, logout, balance } = useAuth()

const isMobileMenuOpen = ref(false)

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function handleLogout() {
  logout()
  toggleMobileMenu()
  router.push('/')
}

function goToDeposit() {
  toggleMobileMenu()
  router.push('/deposit')
}
</script>

<template>
  <header class="site-header">
    <div class="container header-inner">
      <router-link to="/" class="logo" aria-label="GG Casino — на главную">
        <span aria-hidden="true">GG</span><span class="accent" aria-hidden="true">•</span>Casino
      </router-link>

      <nav class="nav desktop-nav" aria-label="Основная навигация">
        <ul class="nav-list">
          <li><a href="#games">Игры</a></li>
          <li><router-link to="/bonus-info">Бонусы</router-link></li>
          <li><a href="#tournaments">Турниры</a></li>
          <li><a href="#support">Поддержка</a></li>
        </ul>
      </nav>

      <div class="auth desktop-auth">
        <template v-if="isLoggedIn">
          <button class="btn btn-ghost" @click="goToDeposit">Баланс: {{ balance }} ₽</button>
          <router-link to="/account" class="btn btn-ghost">Мой кабинет</router-link>
          <button class="btn btn-ghost" @click="handleLogout">Выйти</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-ghost">Войти</router-link>
          <router-link to="/register" class="btn btn-ghost">Регистрация</router-link>
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

    <nav class="mobile-nav" :class="{ 'is-open': isMobileMenuOpen }">
      <ul class="nav-list">
        <li><a href="#games" @click="toggleMobileMenu">Игры</a></li>
        <li><a href="#bonuses" @click="toggleMobileMenu">Бонусы</a></li>
        <li><a href="#tournaments" @click="toggleMobileMenu">Турниры</a></li>
        <li><a href="#support" @click="toggleMobileMenu">Поддержка</a></li>
      </ul>
      <div class="auth">
        <template v-if="isLoggedIn">
          <button class="btn btn-ghost" @click="goToDeposit">Баланс: {{ balance }} ₽</button>
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
/* styles remain from global stylesheet; scoped block to ensure buttons in mobile nav */
.mobile-nav .auth {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
}
.mobile-nav .auth .btn {
  width: 100%;
}
</style>
