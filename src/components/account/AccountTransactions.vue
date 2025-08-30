<script setup>
import useAuth from '../../composables/useAuth.js'

const { transactions } = useAuth()
</script>

<template>
  <div class="transactions">
    <h2>История транзакций</h2>
    <table v-if="transactions.length">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Тип</th>
          <th>Сумма</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t, i) in transactions" :key="i">
          <td>{{ new Date(t.date).toLocaleString() }}</td>
          <td>{{ t.type === 'deposit' ? 'Пополнение' : 'Вывод' }}</td>
          <td :class="{ negative: t.type === 'withdraw' }">
            {{ t.type === 'withdraw' ? '-' : '+' }}{{ t.amount.toFixed(2) }}₴
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Транзакций пока нет.</p>
  </div>
</template>

<style scoped>
.transactions {
  max-width: 800px;
}
table {
  width: 100%;
  border-collapse: collapse;
  background: #14161b;
  border-radius: 12px;
  overflow: hidden;
}
th, td {
  padding: 12px 16px;
  text-align: left;
}
th {
  background: #1e232d;
}
tbody tr:nth-child(even) {
  background: #1a1d23;
}
.negative {
  color: #ff4d00;
}
</style>
