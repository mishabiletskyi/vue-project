<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '../composables/useAuth.js'

const router = useRouter()
const { user, logout } = useAuth()

const email = computed(() => user.value?.email || '')

function handleLogout() {
  logout()
  router.push('/')
}
</script>

<template>
  <div class="account-page">
    <div class="account-card">
      <h1>Личный кабинет</h1>
      <p class="email">{{ email }}</p>
      <button class="btn logout" @click="handleLogout">Выйти</button>
    </div>
  </div>
</template>

<style scoped>
.account-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 140px);
}
.account-card {
  width: 100%;
  max-width: 640px;
  background: #14161b;
  padding: 32px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
}
.account-card h1 {
  margin-bottom: 16px;
  font-size: 2rem;
}
.email {
  margin-bottom: 24px;
  color: #ff9a00;
  font-weight: 600;
}
.logout {
  width: 100%;
  padding: 14px;
}
</style>
