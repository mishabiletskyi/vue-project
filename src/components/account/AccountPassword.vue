<script setup>
import { ref, onMounted } from 'vue'

const password = ref('')
const message = ref('')

onMounted(() => {
  password.value = localStorage.getItem('accountPassword') || ''
})

function save() {
  localStorage.setItem('accountPassword', password.value)
  message.value = 'Пароль сохранен'
}
</script>

<template>
  <form class="password-form" @submit.prevent="save">
    <label>Новый пароль</label>
    <input type="password" v-model="password" required />
    <button type="submit">Сохранить</button>
    <p v-if="message" class="message">{{ message }}</p>
  </form>
</template>

<style scoped>
.password-form {
  max-width: 400px;
  background: #14161b;
  padding: 20px;
  border-radius: 12px;
}

.password-form label {
  display: block;
  margin-bottom: 8px;
}

.password-form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
}

.password-form button {
  width: 100%;
  padding: 12px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
}

.password-form button:hover {
  background: #ff1a1a;
}

.message {
  margin-top: 12px;
  color: #ff9a00;
  text-align: center;
}
</style>

