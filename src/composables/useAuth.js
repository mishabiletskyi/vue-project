import { ref } from 'vue'

const storedUser = ref(JSON.parse(localStorage.getItem('user')) || null)

export function useAuth() {
  const user = storedUser
  const register = async ({ email, password }) => {
    const newUser = { email, password }
    localStorage.setItem('user', JSON.stringify(newUser))
    user.value = { email }
    return true
  }
  const login = async ({ email, password }) => {
    const saved = JSON.parse(localStorage.getItem('user'))
    if (saved && saved.email === email && saved.password === password) {
      user.value = { email }
      return true
    }
    throw new Error('Неверные учетные данные')
  }
  return { user, register, login }
}
