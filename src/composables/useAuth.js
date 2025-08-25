import { ref } from 'vue';

// Simple auth composable using localStorage to persist user session.
// In a real project this could be replaced with a proper auth provider.
const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
const user = ref(stored ? JSON.parse(stored) : null);

export function useAuth() {
  const login = (email) => {
    user.value = { email };
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user.value));
    }
  };

  const logout = () => {
    user.value = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  return { user, login, logout };
}
