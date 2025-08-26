<script setup>
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import Intercom from '@intercom/messenger-js-sdk';

const stored = localStorage.getItem('authUser');
const user = stored ? JSON.parse(stored) : {};

Intercom({
  app_id: 'qw07u5uo',
  user_id: user.id,
  name: user.name,
  email: user.email,
  created_at: user.createdAt,
});
</script>

<template>
  <SiteHeader />
  <main>
    <RouterView />
  </main>
  <SiteFooter />
</template>
