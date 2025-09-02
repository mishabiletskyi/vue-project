import { supabase } from '../supabaseClient'; 

/**
 * Оновлює дані профілю для поточного авторизованого користувача.
 * @param {object} data - Об'єкт з даними для оновлення (напр., { nameCard: '...', cardNumber: '...' }).
 */
export async function saveUser(data) {
  try {
    // 1. Отримуємо ID користувача з localStorage, щоб знати, кого оновлювати
    const userId = localStorage.getItem('user-id');
    if (!userId) {
      throw new Error("ID користувача не знайдено. Неможливо оновити профіль.");
    }

    // 2. Використовуємо клієнт Supabase для оновлення даних, як у вашому прикладі
    const { error } = await supabase
      .from('profiles')    // Вказуємо правильну таблицю 'profiles'
      .update(data)        // Передаємо дані, які потрібно оновити
      .eq('id', userId);   // Вказуємо, який саме запис оновити

    // 3. Якщо Supabase повернув помилку, обробляємо її
    if (error) {
      throw error;
    }

    console.log('Дані профілю успішно збережено!');

  } catch (err) {
    console.error('Помилка при збереженні даних:', err.message);
    // Тут можна додатково обробити помилку, наприклад, показати сповіщення
  }
}

export default {
  saveUser
};