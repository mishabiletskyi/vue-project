// src/App.vue

<script setup>
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import { RouterView } from 'vue-router';

// Проста і зрозуміла логіка, як ви хотіли.
// Зчитуємо дані користувача з localStorage при завантаженні.
const stored = localStorage.getItem('authUser');
const user = stored ? JSON.parse(stored) : null;

// Оновлюємо Intercom, якщо користувач існує і Intercom доступний
if (user && window.Intercom) {
  window.Intercom('update', {
    user_id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt,
  });
}
</script>

<template>
  <SiteHeader :user="user" />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>

<style>

</style>