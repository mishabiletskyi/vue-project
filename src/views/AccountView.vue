<script setup>
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()
</script>

<template>
  <div class="account">
    <h1>Личный кабинет</h1>
    <p v-if="user">Добро пожаловать, {{ user.email }}!</p>
    <p v-else>Нет данных пользователя.</p>
  </div>
</template>
