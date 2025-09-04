// src/eventBus.js
import mitt from 'mitt';

// Створюємо екземпляр посередника, який будемо використовувати у всьому додатку
export const eventBus = mitt();
