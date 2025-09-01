import { ref } from 'vue'
import { supabase } from '../supabaseClient'

// --- Реактивний стан ---
const user = ref(null) // Тут буде користувач з Supabase Auth
const isLoggedIn = ref(false)
const balance = ref(0) // ЦЕ ЗНАЧЕННЯ ТІЛЬКИ З LOCALSTORAGE
const transactions = ref([]) // ЦЕ ЗНАЧЕННЯ ТІЛЬКИ З LOCALSTORAGE

// --- Логіка localStorage ---

/**
 * Зберігає баланс та транзакції в localStorage.
 */
function persist() {
  localStorage.setItem('balance', String(balance.value))
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

/**
 * Завантажує баланс та транзакції з localStorage.
 */
function loadLocalData() {
  const storedBalance = localStorage.getItem('balance')
  const storedTx = localStorage.getItem('transactions')
  
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

// --- Логіка автентифікації Supabase ---

/**
 * Слухач, який відстежує стан входу/виходу користувача через Supabase.
 */
supabase.auth.onAuthStateChange((event, session) => {
  const authUser = session?.user || null
  user.value = authUser
  isLoggedIn.value = !!authUser

  if (event === 'SIGNED_IN') {
    if (authUser) {
      localStorage.setItem('user-id', authUser.id)
    }
    loadLocalData()
  }
  
  if (event === 'SIGNED_OUT') {
    // Коли користувач вийшов, очищуємо все
    localStorage.removeItem('balance')
    localStorage.removeItem('transactions')
    localStorage.removeItem('user-id')
    balance.value = 0
    transactions.value = []
  }
})


/**
 * Реєструє користувача в Supabase і створює для нього профіль ТІЛЬКИ з id та email.
 * Потім ініціалізує локальні дані.
 */
async function register(credentials) {
  // 1. Безпечно створюємо користувача в Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
  })
  if (error) throw error

  // 2. Створюємо профіль в базі ТІЛЬКИ з id та email
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: data.user.id,
      email: credentials.email,
      password: credentials.password,
    })
  if (profileError) throw profileError

  // 3. Ініціалізуємо баланс/транзакції в localStorage
  localStorage.setItem('balance', '0')
  localStorage.setItem('transactions', '[]')
  balance.value = 0
  transactions.value = []

  return data
}

/**
 * Авторизує існуючого користувача. onAuthStateChange подбає про завантаження даних.
 */
async function login(credentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })
  if (error) throw error
  return data
}

/**
 * Виконує вихід користувача з системи.
 */
async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// --- Логіка фінансів (ТІЛЬКИ localStorage) ---

function deposit(amount) {
  const amt = parseFloat(amount)
  if (isNaN(amt) || amt <= 0) return false
  balance.value += amt
  transactions.value.unshift({ type: 'deposit', amount: amt, date: new Date().toISOString() })
  persist() // Зберігаємо в localStorage
  return true
}

function withdraw(amount) {
  const amt = parseFloat(amount)
  if (isNaN(amt) || amt <= 0 || amt > balance.value) return false
  balance.value -= amt
  transactions.value.unshift({ type: 'withdraw', amount: amt, date: new Date().toISOString() })
  persist() // Зберігаємо в localStorage
  return true
}

// --- Експорт Composable ---
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