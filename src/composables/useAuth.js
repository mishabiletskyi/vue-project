import { ref } from 'vue'

const isLoggedIn = ref(false)
const user = ref(null)
const balance = ref(0)

function init() {
  const storedUser = localStorage.getItem('authUser')
  const storedLoggedIn = localStorage.getItem('isLoggedIn')
  const storedBalance = localStorage.getItem('balance')
  if (storedUser && storedLoggedIn === 'true') {
    user.value = JSON.parse(storedUser)
    isLoggedIn.value = true
  }
  if (storedBalance) {
    balance.value = parseFloat(storedBalance)
  }
}

init()

function register(credentials) {
  localStorage.setItem('authUser', JSON.stringify(credentials))
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('balance', '0')
  user.value = credentials
  isLoggedIn.value = true
  balance.value = 0
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
}

export default function useAuth() {
  return { isLoggedIn, user, balance, login, register, logout }
}

