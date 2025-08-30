<script setup>
import { ref } from 'vue'
import useAuth from '../../composables/useAuth.js'

const { user } = useAuth()
const email = ref(user.value?.email || '')
const password = ref('')
const message = ref('')

function save() {
  const updated = { ...user.value, email: email.value }
  if (password.value) {
    updated.password = password.value
  }
  localStorage.setItem('authUser', JSON.stringify(updated))
  user.value = updated
  message.value = 'Данные обновлены'
  password.value = ''
}
</script>

<template>
  <div class="settings">
    <h2>Настройки профиля</h2>
    <form @submit.prevent="save" class="settings-form">
      <label>E-mail</label>
      <input v-model="email" type="email" required />
      <label>Новый пароль</label>
      <input v-model="password" type="password" placeholder="Оставьте пустым, чтобы не менять" />
      <button type="submit">Сохранить</button>
      <p v-if="message" class="message">{{ message }}</p>
    </form>
  </div>
</template>

<style scoped>
.settings {
  max-width: 600px;
}
.settings-form {
  background: #14161b;
  padding: 20px;
  border-radius: 12px;
}
.settings-form label {
  display: block;
  margin-bottom: 8px;
}
.settings-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
}
.settings-form button {
  width: 100%;
  padding: 12px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background .3s;
}
.settings-form button:hover {
  background: #ff1a1a;
}
.message {
  margin-top: 12px;
  color: #ff9a00;
}
</style>
