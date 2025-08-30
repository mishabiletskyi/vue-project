<script setup>
import { ref } from 'vue'
import useAuth from '../../composables/useAuth.js'

const { balance, deposit, withdraw } = useAuth()

const depositAmount = ref('')
const withdrawAmount = ref('')
const message = ref('')

function handleDeposit() {
  if (deposit(depositAmount.value)) {
    message.value = 'Баланс пополнен'
    depositAmount.value = ''
  } else {
    message.value = 'Некорректная сумма'
  }
}

function handleWithdraw() {
  if (withdraw(withdrawAmount.value)) {
    message.value = 'Вывод выполнен'
    withdrawAmount.value = ''
  } else {
    message.value = 'Недостаточно средств'
  }
}
</script>

<template>
  <div class="overview">
    <h2>Баланс: <span>{{ balance.toFixed(2) }}₴</span></h2>
    <div class="actions">
      <form @submit.prevent="handleDeposit" class="action">
        <label>Сумма пополнения</label>
        <input v-model.number="depositAmount" type="number" min="1" required />
        <button type="submit">Пополнить</button>
      </form>
      <form @submit.prevent="handleWithdraw" class="action">
        <label>Сумма вывода</label>
        <input v-model.number="withdrawAmount" type="number" min="1" required />
        <button type="submit">Вывести</button>
      </form>
    </div>
    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.overview {
  max-width: 600px;
}
h2 {
  margin-bottom: 24px;
}
h2 span {
  color: #ff9a00;
}
.actions {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.action {
  flex: 1;
  background: #14161b;
  padding: 20px;
  border-radius: 12px;
}
.action label {
  display: block;
  margin-bottom: 8px;
}
.action input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
}
.action button {
  width: 100%;
  padding: 12px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background .3s;
}
.action button:hover {
  background: #ff1a1a;
}
.message {
  margin-top: 16px;
  color: #ff9a00;
}
</style>
