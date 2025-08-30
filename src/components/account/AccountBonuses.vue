<script setup>
const bonuses = [
  { title: 'Приветственный бонус', description: '100% на первый депозит', active: true },
  { title: 'Кешбэк', description: '10% каждую неделю', active: false }
]
</script>

<template>
  <div class="bonuses">
    <h2>Бонусы</h2>
    <div class="bonus-list">
      <div v-for="(b, i) in bonuses" :key="i" class="bonus-card" :class="{ inactive: !b.active }">
        <h3>{{ b.title }}</h3>
        <p>{{ b.description }}</p>
        <span v-if="b.active" class="status active">Активен</span>
        <span v-else class="status">Неактивен</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bonus-list {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.bonus-card {
  width: 260px;
  background: #14161b;
  padding: 20px;
  border-radius: 12px;
  position: relative;
}
.bonus-card.inactive {
  opacity: .6;
}
.bonus-card h3 {
  margin-bottom: 8px;
}
.status {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #1e232d;
  font-size: 0.75rem;
  color: #94a3b8;
}
.status.active {
  background: #ff4d00;
  color: #fff;
}
</style>
