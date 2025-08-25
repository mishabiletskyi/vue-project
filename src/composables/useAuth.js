import { ref, computed } from 'vue';

// Simple authentication composable used by the header.
// In a real project this would interface with an auth service.
const loggedIn = ref(false);

export function useAuth() {
  function login() {
    loggedIn.value = true;
  }

  function logout() {
    loggedIn.value = false;
  }

  const isLoggedIn = computed(() => loggedIn.value);

  return { isLoggedIn, login, logout };
}
