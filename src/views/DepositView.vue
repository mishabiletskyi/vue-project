<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { saveUser } from '../lib/supabase'
import useAuth from '../composables/useAuth.js'
import AccountTransactions from '../components/account/AccountTransactions.vue'

// Іконки для криптовалют у форматі SVG Data URI
const cryptoIcons = {
  btc: '/imgCripto/bitcoin.svg',
  eth: '/imgCripto/ethereum.svg',
  usdt: '/imgCripto/tether.svg',
  bnb: '/imgCripto/bnb.svg',
  sol: '/imgCripto/solana.svg',
  xrp: '/imgCripto/xrp.svg',
  doge: '/imgCripto/dogecoin.svg',
  ada: '/imgCripto/cardano.svg',
  trx: '/imgCripto/tron.svg',
  ton: '/imgCripto/ton.svg',
};

const { balance, deposit: addDeposit, withdraw: doWithdraw } = useAuth()
const activeTab = ref('deposit')
const tabs = [
  { id: 'deposit', label: 'Пополнение' },
  { id: 'withdraw', label: 'Выплата' },
  { id: 'history', label: 'История транзакций' },
]

// Перемикач способу оплати
const paymentMethod = ref('card') // 'card' або 'crypto'

// --- Поповнення (картою) ---
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

// --- Поповнення (крипто) ---
// 1. Оновлений список ТОП-10 криптовалют + крипто-рубль
const cryptoOptions = [
  { id: 'btc', name: 'Bitcoin (BTC)', network: 'Bitcoin', address: 'bc1qYourBitcoinAddressHereRandomChars', instructions: 'Отправляйте только Bitcoin (BTC) в сети Bitcoin на этот адрес. Зачисление после 2 подтверждений.' },
  { id: 'eth', name: 'Ethereum (ETH)', network: 'ERC20', address: '0xYourEthereumAddressHereRandomChars', instructions: 'Отправляйте только Ethereum (ETH) в сети ERC20 на этот адрес. **Не используйте другие сети (BEP20, Polygon и т.д.)!**' },
  { id: 'usdt', name: 'Tether (USDT TRC20)', network: 'TRC20', address: 'TYourTrc20AddressHereRandomChars', instructions: 'Отправляйте только USDT в сети TRON (TRC20) на этот адрес. Сеть TRC20 обеспечивает низкие комиссии.' },
  { id: 'bnb', name: 'BNB (BNB)', network: 'BEP20', address: '0xYourBnbBEP20AddressHereRandom', instructions: 'Отправляйте только BNB в сети Binance Smart Chain (BEP20). Убедитесь, что выбрали правильную сеть.' },
  { id: 'sol', name: 'Solana (SOL)', network: 'Solana', address: 'SoLYourSolanaAddressHereRandomChars', instructions: 'Отправляйте только SOL в сети Solana. Адреса Solana чувствительны к регистру.' },
  { id: 'xrp', name: 'Ripple (XRP)', network: 'Ripple', address: 'rYourRippleAddressHereDestinationTag', instructions: 'Отправляйте только XRP. Для некоторых кошельков может потребоваться **Destination Tag**. Уточните в поддержке, если он нужен.' },
  { id: 'doge', name: 'Dogecoin (DOGE)', network: 'Dogecoin', address: 'DYourDogecoinAddressHereRandomChars', instructions: 'Отправляйте только DOGE. Wow. Such crypto. Much deposit. Very blockchain.' },
  { id: 'ada', name: 'Cardano (ADA)', network: 'Cardano', address: 'addr1YourCardanoAddressHereRandomCharsLong', instructions: 'Отправляйте только ADA в сети Cardano. Адреса Cardano начинаются с "addr1".' },
  { id: 'trx', name: 'TRON (TRX)', network: 'TRC20', address: 'TYourTronTrxAddressHereRandomChars', instructions: 'Отправляйте только TRX в сети TRON (TRC20). Не путайте с USDT в той же сети.' },
  { id: 'ton', name: 'Toncoin (TON)', network: 'TON', address: 'UQYourToncoinAddressHereRandomChars', instructions: 'Отправляйте только Toncoin (TON). Убедитесь, что ваш кошелек поддерживает переводы в сети TON.' },
].map(option => ({ ...option, icon: cryptoIcons[option.id] }));

const selectedCryptoOption = ref(cryptoOptions[0])
const isUpdatingCrypto = ref(false)
const copyMessage = ref('')
const dropdownRef = ref(null)
const isDropdownOpen = ref(false)

// Логіка для кастомного випадаючого списку
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function selectOption(option) {
  if (selectedCryptoOption.value.id === option.id) {
    isDropdownOpen.value = false;
    return;
  }
  
  isUpdatingCrypto.value = true;
  isDropdownOpen.value = false;
  
  setTimeout(() => {
    selectedCryptoOption.value = option;
    isUpdatingCrypto.value = false;
  }, 1200);
}

// Закриття списку при кліку поза ним
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

// Обчислювані властивості для поточної обраної опції
const currentCryptoAddress = computed(() => selectedCryptoOption.value.address)
const currentQrCodeUrl = computed(() => {
  if (selectedCryptoOption.value.id === 'rub') return ''
  return `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentCryptoAddress.value)}`
})
const currentCryptoInstructions = computed(() => selectedCryptoOption.value.instructions)

// Оновлена функція копіювання
function copyAddress() {
  if (copyMessage.value) return 
  navigator.clipboard.writeText(currentCryptoAddress.value)
    .then(() => {
      copyMessage.value = 'Адрес скопирован!'
      setTimeout(() => { copyMessage.value = '' }, 3000) 
    })
    .catch(err => {
      console.error('Не удалось скопировать текст: ', err)
      copyMessage.value = 'Ошибка копирования'
      setTimeout(() => { copyMessage.value = '' }, 3000)
    });
}

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
        <div class="form-group">
          <label for="crypto-select">Выберите способ оплаты</label>
          <div class="custom-dropdown" ref="dropdownRef">
            <div class="dropdown-selected" @click="toggleDropdown">
              <img :src="selectedCryptoOption.icon" :alt="selectedCryptoOption.name" class="crypto-icon">
              <span>{{ selectedCryptoOption.name }}</span>
              <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen }"></span>
            </div>
            <transition name="dropdown-fade">
              <div v-if="isDropdownOpen" class="dropdown-options">
                <div 
                  v-for="option in cryptoOptions" 
                  :key="option.id" 
                  class="dropdown-item" 
                  @click="selectOption(option)"
                >
                  <img :src="option.icon" :alt="option.name" class="crypto-icon">
                  <span>{{ option.name }}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>
        
        <div class="crypto-content-wrapper">
          <div v-if="isUpdatingCrypto" class="qr-update-overlay">
            <div class="spinner"></div>
            <p>Генерируем новый адрес...</p>
          </div>

          <div v-else class="crypto-details">
             <transition name="toast-fade">
              <div v-if="copyMessage" class="copy-success-toast">
                {{ copyMessage }}
              </div>
            </transition>

            <div v-if="currentQrCodeUrl" class="qr-code">
              <img :src="currentQrCodeUrl" alt="QR Code" />
            </div>
            
            <div class="address-container">
              <p class="address">{{ currentCryptoAddress }}</p>
              <button @click="copyAddress" class="copy-btn">Копировать</button>
            </div>

            <p class="instructions" v-html="currentCryptoInstructions"></p>
          </div>
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
        <p class="balance">Доступно: {{ balance.toFixed(2) }}₽</p>
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
  flex-grow: 1; 
  min-width: 120px;
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
  padding: 0 16px; 
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
  width: 100%;
  box-sizing: border-box;
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
  flex-wrap: wrap;
}
.form-row > .form-group {
  flex: 1 1 0;
  min-width: 120px;
}
.form-group {
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left; /* Для лейблів */
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
  padding: 0 20px;
}
.modal-content {
  background: var(--card);
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  text-align: center;
}
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

/* --- ОНОВЛЕНІ ТА НОВІ СТИЛІ ДЛЯ КРИПТО-СЕКЦІЇ --- */
.crypto-section {
  max-width: 480px;
  margin: 0 auto;
  text-align: center;
  padding: 0 16px;
}
/* Змінено: Збільшено відступ під випадаючим списком */
.crypto-section .form-group {
  margin-bottom: 40px;
}
.crypto-content-wrapper { 
  position: relative;
  min-height: 350px;
}
.qr-update-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 12, 16, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 20;
  border-radius: 8px;
  backdrop-filter: blur(4px);
}
.spinner {
  border: 4px solid #f3f3f330;
  border-top: 4px solid #ff4d00;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.crypto-details {
  position: relative; /* Важливо для позиціонування toast */
}

/* Нове сповіщення про копіювання */
.copy-success-toast {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(16, 20, 28, 0.95);
  color: #4caf50;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1.1rem; /* Збільшений шрифт */
  font-weight: 500;
  z-index: 30; /* Поверх всього */
  box-shadow: 0 4px 15px rgba(0,0,0,0.4);
  backdrop-filter: blur(5px);
  border: 1px solid #4caf5030;
}
.toast-fade-enter-active, .toast-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.toast-fade-enter-from, .toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.9);
}

.qr-code {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  display: inline-block;
  box-sizing: border-box;
  margin-bottom: 32px; /* Змінено: Збільшено відступ під QR-кодом */
}
.qr-code img {
  display: block;
}
.address-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1e232d;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 40px; /* Змінено: Збільшено відступ під адресою */
}
.address {
  font-size: 1rem;
  word-break: break-all;
  flex-grow: 1;
  text-align: left;
  margin: 0;
  color: #e2e8f0;
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
  transition: background-color 0.2s;
}
.copy-btn:hover {
  background-color: #e64500;
}
.instructions {
  line-height: 1.6;
  text-align: left;
  background-color: rgba(30, 35, 45, 0.25);
  padding: 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #adb5bd;
  border-left: 3px solid #ff4d00;
}
.instructions strong {
  color: #ffc107;
}

/* Кастомний випадаючий список */
.custom-dropdown {
  position: relative;
  width: 100%;
  cursor: pointer;
  user-select: none;
}
.dropdown-selected {
  display: flex;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
  font-size: 1rem;
  transition: border-color 0.2s;
}
.dropdown-selected:hover {
  border-color: #ff4d00;
}
.crypto-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}
.dropdown-arrow {
  margin-left: auto;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #f1f5f9;
  transition: transform 0.3s ease;
}
.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #1e232d;
  border: 1px solid #2a2f3a;
  border-radius: 8px;
  margin-top: 4px;
  z-index: 100;
  max-height: 250px;
  overflow-y: auto;
}
.dropdown-item {
  display: flex;
  align-items: center;
  padding: 12px;
  color: #f1f5f9;
  transition: background-color 0.2s;
}
.dropdown-item:hover {
  background-color: #ff4d00;
}
.dropdown-item:not(:last-child) {
  border-bottom: 1px solid #2a2f3a;
}
.dropdown-fade-enter-active, .dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-fade-enter-from, .dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Перемикач */
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

@media (max-width: 600px) {
  .form-row {
    flex-direction: column;
  }
}
@media (max-width: 480px) {
  .tabs {
    flex-direction: column;
  }
  .tabs button {
    font-size: 0.9rem;
  }
  .payment-toggle-container {
    gap: 5px;
  }
  .toggle-label-text {
    font-size: 0.8rem;
  }
  .toggle-switch-new {
    width: 150px;
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
  .address {
    font-size: 0.8rem;
  }
}
</style>