<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
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
        <a href="#" class="btn btn-ghost">Войти</a>
        <a href="#" class="btn btn-ghost">Регистрация</a>
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
           <a href="#" class="btn btn-ghost">Войти</a>
           <a href="#" class="btn">Регистрация</a>
        </div>
    </nav>
  </header>
</template>