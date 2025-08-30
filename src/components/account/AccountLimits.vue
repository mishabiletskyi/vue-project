<script setup>
import { reactive, ref, onMounted } from 'vue'

const form = reactive({
  moneyPeriod: 'day',
  moneyAmount: 'Максимальный',
  dailyTime: 'Максимальный',
  weeklyTime: 'Максимальный'
})

const message = ref('')

onMounted(() => {
  const saved = JSON.parse(localStorage.getItem('limits') || '{}')
  Object.assign(form, saved)
})

function save() {
  localStorage.setItem('limits', JSON.stringify(form))
  message.value = 'Лимиты сохранены'
}
</script>

<template>
  <form class="limits" @submit.prevent="save">
    <div class="block">
      <h3>Лимит средств, которые игрок желает тратить</h3>
      <div class="row">
        <label><input type="radio" value="day" v-model="form.moneyPeriod" /> На день</label>
        <label><input type="radio" value="week" v-model="form.moneyPeriod" /> На неделю</label>
        <label><input type="radio" value="month" v-model="form.moneyPeriod" /> На месяц</label>
      </div>
      <select v-model="form.moneyAmount">
        <option>Максимальный</option>
        <option>1000</option>
        <option>5000</option>
        <option>10000</option>
      </select>
    </div>

    <div class="block">
      <h3>Лимит времени участия в азартных играх в сутки</h3>
      <select v-model="form.dailyTime">
        <option>Максимальный</option>
        <option>1 час</option>
        <option>2 часа</option>
        <option>3 часа</option>
      </select>
    </div>

    <div class="block">
      <h3>Лимит времени участия в азартных играх в неделю</h3>
      <select v-model="form.weeklyTime">
        <option>Максимальный</option>
        <option>5 часов</option>
        <option>10 часов</option>
        <option>20 часов</option>
      </select>
    </div>

    <button type="submit">Сохранить</button>
    <p v-if="message" class="message">{{ message }}</p>
  </form>
</template>

<style scoped>
.limits {
  max-width: 600px;
}

.block {
  background: #14161b;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.row {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #2a2f3a;
  background: #0b0c10;
  color: #f1f5f9;
}

button {
  width: 100%;
  padding: 12px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #ff1a1a;
}

.message {
  margin-top: 12px;
  color: #ff9a00;
  text-align: center;
}
</style>

