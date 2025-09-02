<script setup>
import { ref, computed } from 'vue';
import { supabase } from '../../supabaseClient'; 




// --- Состояния компонента ---
const newPassword = ref('');
const confirmPassword = ref('');
const message = ref('');
const error = ref('');
const isSaving = ref(false);
const showPasswords = ref(false); // Стан для іконки ока/мавпочки

// --- Логіка компонента ---

// Вичисляемое свойство для оценки надёжности пароля
const passwordStrength = computed(() => {
  const pass = newPassword.value;
  let score = 0;
  if (!pass) return { score: 0, text: '', color: 'transparent' };
  if (pass.length > 7) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  switch (score) {
    case 0: case 1: return { score, text: 'Очень слабый', color: '#ef4444' };
    case 2: return { score, text: 'Слабый', color: '#f97316' };
    case 3: return { score, text: 'Хороший', color: '#eab308' };
    case 4: return { score, text: 'Надёжный', color: '#22c55e' };
    default: return { score: 0, text: '', color: 'transparent' };
  }
});

// Функція, що зберігає пароль в таблицю `profiles`
async function changePasswordInProfile() {
  message.value = '';
  error.value = '';

  if (newPassword.value.length < 6) {
    error.value = 'Пароль должен содержать минимум 6 символов.';
    return;
  }
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Пароли не совпадают.';
    return;
  }

  isSaving.value = true;
  try {
    const userId = localStorage.getItem('user-id');
    if (!userId) {
      throw new Error("ID пользователя не найден. Авторизуйтесь снова.");
    }
    

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ newPassword: newPassword.value })
      .eq('id', userId);

    if (updateError) throw updateError;
    
    message.value = 'Пароль успешно обновлён в профиле!';
    newPassword.value = '';
    confirmPassword.value = '';
  } catch (err) {
    error.value = `Ошибка: ${err.message}`;
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="change-password-container">
    <form class="password-form" @submit.prevent="changePasswordInProfile">
      <h2>Смена пароля</h2>
      
      <div class="input-group">
        <label for="new-password">Новый пароль</label>
        <div class="input-wrapper">
          <input 
            id="new-password"
            :type="showPasswords ? 'text' : 'password'" 
            v-model="newPassword" 
            placeholder="••••••••"
            required 
          />
          <button type="button" @click="showPasswords = !showPasswords" class="toggle-visibility" title="Показать/скрыть пароль">
            {{ showPasswords ? '🙈' : '👁️' }}
          </button>
        </div>
        <div v-if="newPassword" class="strength-meter">
          <div class="strength-bar" :style="{ width: (passwordStrength.score / 4) * 100 + '%', backgroundColor: passwordStrength.color }"></div>
        </div>
        <span v-if="newPassword" class="strength-text" :style="{ color: passwordStrength.color }">
          {{ passwordStrength.text }}
        </span>
      </div>

      <div class="input-group">
        <label for="confirm-password">Подтвердите пароль</label>
        <div class="input-wrapper">
          <input 
            id="confirm-password"
            :type="showPasswords ? 'text' : 'password'" 
            v-model="confirmPassword" 
            placeholder="••••••••"
            required 
          />
        </div>
      </div>
      
      <p v-if="error" class="message error">{{ error }}</p>
      <p v-if="message" class="message success">{{ message }}</p>

      <button type="submit" :disabled="isSaving">
        {{ isSaving ? 'Сохранение...' : 'Сохранить пароль' }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.change-password-container {
  max-width: 420px;
  margin: 40px auto;
  padding: 24px;
}
.password-form {
  background: #14161b;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  border: 1px solid #2a2f3a;
}
h2 {
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
  color: #f1f5f9;
}
.input-group {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-bottom: 8px;
  color: #94a3b8;
  font-weight: 500;
}
.input-wrapper {
  position: relative;
}
input {
  width: 100%;
  padding: 12px 40px 12px 12px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
  font-size: 1rem;
  transition: border-color 0.2s;
}
input:focus {
  outline: none;
  border-color: #ff4d00;
}
.toggle-visibility {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 4px;
  color: #94a3b8;
}
.strength-meter {
  width: 100%;
  height: 6px;
  background: #2a2f3a;
  border-radius: 3px;
  margin-top: 8px;
  overflow: hidden;
}
.strength-bar {
  height: 100%;
  border-radius: 3px;
  transition: width 0.3s ease, background-color 0.3s ease;
}
.strength-text {
  display: block;
  font-size: 0.85rem;
  text-align: right;
  height: 1.2em;
  margin-top: 4px;
}
button[type="submit"] {
  width: 100%;
  padding: 12px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 12px;
}
button[type="submit"]:hover {
  background: #e64400;
}
button[type="submit"]:disabled {
  background-color: #2a2f3a;
  color: #94a3b8;
  cursor: not-allowed;
}
.message {
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  margin: 16px 0 0 0;
  font-weight: 500;
}
.message.error {
  background-color: rgba(220, 38, 38, 0.1);
  color: #ef4444;
}
.message.success {
  background-color: rgba(22, 163, 74, 0.1);
  color: #22c55e;
}
</style>