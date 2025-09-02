<script setup>
import { reactive, ref, onMounted, computed, watch } from 'vue';

// --- Конфигурация лимитов ---
// Выносим все опции сюда для лёгкого управления
const limitsConfig = {
  money: {
    options: [
      { value: 1000, label: '1,000 ₽' },
      { value: 5000, label: '5,000 ₽' },
      { value: 10000, label: '10,000 ₽' },
      { value: 25000, label: '25,000 ₽' },
      { value: -1, label: 'Безлимитно' } // -1 означает безлимитный
    ]
  },
  dailyTime: {
    options: [
      { value: 60, label: '1 час' },    // Храним значения в минутах
      { value: 120, label: '2 часа' },
      { value: 240, label: '4 часа' },
      { value: 360, label: '6 часов' },
      { value: -1, label: 'Безлимитно' }
    ]
  },
  weeklyTime: {
    options: [
      { value: 300, label: '5 часов' },
      { value: 600, label: '10 часов' },
      { value: 1200, label: '20 часов' },
      { value: 2400, label: '40 часов' },
      { value: -1, label: 'Безлимитно' }
    ]
  }
};

// --- Состояния компонента ---
const form = reactive({
  moneyPeriod: 'day',
  moneyAmount: -1,
  dailyTime: -1,
  weeklyTime: -1
});

const message = ref('');
let messageTimeout = null;

// --- Логика ---

// Загружаем сохранённые лимиты из localStorage
onMounted(() => {
  try {
    const savedLimits = JSON.parse(localStorage.getItem('limits'));
    if (savedLimits) {
      Object.assign(form, savedLimits);
    }
  } catch (e) {
    console.error("Не удалось загрузить лимиты из localStorage:", e);
    // В случае ошибки сбрасываем до дефолтных
    localStorage.removeItem('limits');
  }
});

// Сохраняем лимиты в localStorage
function saveLimits() {
  localStorage.setItem('limits', JSON.stringify(form));
  message.value = 'Лимиты успешно сохранены!';
  
  // Убираем сообщение через 3 секунды
  clearTimeout(messageTimeout);
  messageTimeout = setTimeout(() => {
    message.value = '';
  }, 3000);
}

// --- Вспомогательные функции для слайдеров ---
// Находим индекс опции по её значению
const findIndexByValue = (options, value) => options.findIndex(opt => opt.value === value);

// Находим опцию по её индексу
const findOptionByIndex = (options, index) => options[index];

</script>

<template>
  <div class="limits-container">
    <div class="limits-header">
      <h1>Лимиты и Ответственная игра</h1>
      <p>Мы поддерживаем принципы ответственной игры. Установите личные лимиты, чтобы контролировать свои расходы и время, проведённое в игре. Эти настройки можно изменить в любой момент.</p>
    </div>

    <form class="limits-form" @submit.prevent="saveLimits">
      <div class="limit-block">
        <div class="block-header">
          <span class="icon">💰</span>
          <div class="block-title">
            <h3>Лимит на расходы</h3>
            <p>Выберите максимальную сумму, которую вы готовы потратить за определённый период.</p>
          </div>
        </div>
        <div class="block-content">
          <div class="period-selector">
            <label :class="{ active: form.moneyPeriod === 'day' }">
              <input type="radio" value="day" v-model="form.moneyPeriod" /> На день
            </label>
            <label :class="{ active: form.moneyPeriod === 'week' }">
              <input type="radio" value="week" v-model="form.moneyPeriod" /> На неделю
            </label>
            <label :class="{ active: form.moneyPeriod === 'month' }">
              <input type="radio" value="month" v-model="form.moneyPeriod" /> На месяц
            </label>
          </div>
          <div class="slider-container">
            <input 
              type="range"
              class="slider"
              min="0"
              :max="limitsConfig.money.options.length - 1"
              step="1"
              :value="findIndexByValue(limitsConfig.money.options, form.moneyAmount)"
              @input="form.moneyAmount = findOptionByIndex(limitsConfig.money.options, $event.target.value).value"
            />
            <div class="slider-value">
              {{ findOptionByIndex(limitsConfig.money.options, findIndexByValue(limitsConfig.money.options, form.moneyAmount)).label }}
            </div>
          </div>
        </div>
      </div>

      <div class="limit-block">
        <div class="block-header">
          <span class="icon">☀️</span>
          <div class="block-title">
            <h3>Дневной лимит времени</h3>
            <p>Максимальное количество времени, которое вы проведёте в игре за одни сутки.</p>
          </div>
        </div>
        <div class="block-content">
           <div class="slider-container">
            <input 
              type="range"
              class="slider"
              min="0"
              :max="limitsConfig.dailyTime.options.length - 1"
              step="1"
              :value="findIndexByValue(limitsConfig.dailyTime.options, form.dailyTime)"
              @input="form.dailyTime = findOptionByIndex(limitsConfig.dailyTime.options, $event.target.value).value"
            />
            <div class="slider-value">
               {{ findOptionByIndex(limitsConfig.dailyTime.options, findIndexByValue(limitsConfig.dailyTime.options, form.dailyTime)).label }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="limit-block">
        <div class="block-header">
          <span class="icon">🗓️</span>
          <div class="block-title">
            <h3>Недельный лимит времени</h3>
            <p>Суммарное время в игре, которое вы не превысите в течение одной недели.</p>
          </div>
        </div>
         <div class="block-content">
           <div class="slider-container">
            <input 
              type="range"
              class="slider"
              min="0"
              :max="limitsConfig.weeklyTime.options.length - 1"
              step="1"
              :value="findIndexByValue(limitsConfig.weeklyTime.options, form.weeklyTime)"
              @input="form.weeklyTime = findOptionByIndex(limitsConfig.weeklyTime.options, $event.target.value).value"
            />
            <div class="slider-value">
               {{ findOptionByIndex(limitsConfig.weeklyTime.options, findIndexByValue(limitsConfig.weeklyTime.options, form.weeklyTime)).label }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="form-footer">
        <button type="submit">Сохранить изменения</button>
        <p v-if="message" class="message success">{{ message }}</p>
      </div>
    </form>
  </div>
</template>


<style scoped>
.limits-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 24px;
}

.limits-header {
  text-align: center;
  margin-bottom: 32px;
}
.limits-header h1 {
  margin-bottom: 8px;
  color: #f1f5f9;
}
.limits-header p {
  color: #94a3b8;
  font-size: 1.1rem;
  line-height: 1.6;
}

.limit-block {
  background: #14161b;
  border: 1px solid #2a2f3a;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.block-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 20px;
}
.block-header .icon {
  font-size: 2rem;
  margin-top: -4px;
}
.block-header h3 {
  margin: 0;
  color: #f1f5f9;
}
.block-header p {
  margin: 4px 0 0 0;
  color: #94a3b8;
  font-size: 0.9rem;
}

.period-selector {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background-color: #0b0c10;
  padding: 6px;
  border-radius: 8px;
}
.period-selector label {
  flex: 1;
  padding: 10px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #94a3b8;
}
.period-selector input {
  display: none;
}
.period-selector label.active {
  background-color: #2a2f3a;
  color: #fff;
  font-weight: bold;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 20px;
}

.slider-value {
  background: #0b0c10;
  color: #f1f5f9;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1.1rem;
  min-width: 120px;
  text-align: center;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  background: #2a2f3a;
  border-radius: 4px;
  outline: none;
  opacity: 0.7;
  transition: opacity .2s;
}
.slider:hover {
  opacity: 1;
}
/* Chrome, Safari, Opera, Edge */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #ff4d00;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid #14161b;
}
/* Firefox */
.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #ff4d00;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid #14161b;
}

.form-footer {
  margin-top: 32px;
}

button {
  width: 100%;
  padding: 14px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
button:hover {
  background: #e64400;
}

.message {
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
  animation: fadeIn 0.5s ease;
}
.message.success {
  background-color: rgba(22, 163, 74, 0.1);
  color: #22c55e;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>