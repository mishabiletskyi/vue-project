import { ref } from 'vue'

const isLoggedIn = ref(false)
const user = ref(null)
const balance = ref(0)
const transactions = ref([])

function persist() {
  localStorage.setItem('balance', String(balance.value))
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

function init() {
  const storedUser = localStorage.getItem('authUser')
  const storedLoggedIn = localStorage.getItem('isLoggedIn')
  const storedBalance = localStorage.getItem('balance')
  const storedTx = localStorage.getItem('transactions')
  if (storedUser && storedLoggedIn === 'true') {
    user.value = JSON.parse(storedUser)
    isLoggedIn.value = true
  }
  if (storedBalance) {
    balance.value = parseFloat(storedBalance)
  }
  if (storedTx) {
    try {
      transactions.value = JSON.parse(storedTx)
    } catch (e) {
      transactions.value = []
    }
  }
}

init()

function register(credentials) {
  localStorage.setItem('authUser', JSON.stringify(credentials))
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('balance', '0')
  localStorage.setItem('transactions', '[]')
  user.value = credentials
  isLoggedIn.value = true
  balance.value = 0
  transactions.value = []
}

function login(credentials) {
  const stored = localStorage.getItem('authUser')
  if (!stored) return false
  const storedUser = JSON.parse(stored)
  const valid =
    credentials.email === storedUser.email &&
    credentials.password === storedUser.password
  if (valid) {
    localStorage.setItem('isLoggedIn', 'true')
    user.value = storedUser
    isLoggedIn.value = true
    return true
  }
  isLoggedIn.value = false
  return false
}

function logout() {
  localStorage.setItem('isLoggedIn', 'false')
  user.value = null
  isLoggedIn.value = false
  balance.value = 0
  transactions.value = []
}

function deposit(amount) {
  const amt = parseFloat(amount)
  if (isNaN(amt) || amt <= 0) return false
  balance.value += amt
  transactions.value.unshift({ type: 'deposit', amount: amt, date: new Date().toISOString() })
  persist()
  return true
}

function withdraw(amount) {
  const amt = parseFloat(amount)
  if (isNaN(amt) || amt <= 0 || amt > balance.value) return false
  balance.value -= amt
  transactions.value.unshift({ type: 'withdraw', amount: amt, date: new Date().toISOString() })
  persist()
  return true
}

export default function useAuth() {
  return {
    isLoggedIn,
    user,
    balance,
    transactions,
    login,
    register,
    logout,
    deposit,
    withdraw
  }
}

