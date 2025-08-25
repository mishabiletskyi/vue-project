<script setup>
import LeftSidebar from '../components/LeftSidebar.vue';
import RightSidebar from '../components/RightSidebar.vue';
</script>

<template>
  <div class="main-layout container">
    <LeftSidebar />
    <div class="main-content">
      <div class="page-header">
        <h1>Аккаунт</h1>
        <p>Управляйте данными своего профиля.</p>
      </div>
      <div class="account-details">
        <p><strong>Имя пользователя:</strong> demo</p>
        <p><strong>Email:</strong> demo@example.com</p>
      </div>
    </div>
    <RightSidebar />
  </div>
</template>

<style scoped>
.page-header { margin-bottom: 32px; }
.account-details {
  background: var(--card);
  padding: 24px;
  border-radius: var(--radius);
}
.account-details p { margin-bottom: 8px; }
</style>
