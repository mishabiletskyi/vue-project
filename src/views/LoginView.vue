<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()
const { login } = useAuth()

const handleSubmit = async () => {
  error.value = ''
  try {
    await login({ email: email.value, password: password.value })
    alert('Подтверждение')
    router.push('/account')
  } catch (e) {
    error.value = 'Неверный логин или пароль'
  }
}
</script>

<template>
  <div class="login">
    <h1>Войти</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="password">Пароль</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit">Войти</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
