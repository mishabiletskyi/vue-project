import { ref } from 'vue'

const isLoggedIn = ref(false)
const user = ref(null)

function init() {
  const storedUser = localStorage.getItem('authUser')
  const storedLoggedIn = localStorage.getItem('isLoggedIn')
  if (storedUser && storedLoggedIn === 'true') {
    user.value = JSON.parse(storedUser)
    isLoggedIn.value = true
  }
}

init()

function register(credentials) {
  localStorage.setItem('authUser', JSON.stringify(credentials))
  localStorage.setItem('isLoggedIn', 'true')
  user.value = credentials
  isLoggedIn.value = true
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
}

export default function useAuth() {
  return { isLoggedIn, user, login, register, logout }
}

