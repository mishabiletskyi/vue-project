<script setup>
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

const stored = localStorage.getItem('authUser');
const user = stored ? JSON.parse(stored) : {};

if (window.Intercom) {
  window.Intercom('update', {
    user_id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.createdAt,
  });
}
</script>

<template>
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>
