<script setup>
const props = defineProps({
  active: { type: String, default: 'overview' },
  email: { type: String, default: '' }
})
const emit = defineEmits(['change', 'logout'])

const links = [
  { id: 'overview', label: 'Обзор' },
  { id: 'transactions', label: 'Транзакции' },
  { id: 'bonuses', label: 'Бонусы' },
  { id: 'settings', label: 'Настройки' }
]
</script>

<template>
  <aside class="sidebar">
    <div class="profile">
      <p class="email">{{ email }}</p>
    </div>
    <nav>
      <ul>
        <li v-for="l in links" :key="l.id">
          <button :class="{ active: l.id === active }" @click="$emit('change', l.id)">
            {{ l.label }}
          </button>
        </li>
      </ul>
    </nav>
    <button class="logout" @click="$emit('logout')">Выйти</button>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background: #14161b;
  padding: 24px;
  display: flex;
  flex-direction: column;
}
.profile {
  margin-bottom: 24px;
}
.email {
  color: #ff9a00;
  font-weight: 600;
}
nav ul {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}
nav li {
  margin-bottom: 8px;
}
nav button {
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: #f1f5f9;
  cursor: pointer;
  transition: background .3s;
}
nav button:hover,
nav button.active {
  background: #1e232d;
}
.logout {
  margin-top: auto;
  padding: 12px;
  background: #ff4d00;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  transition: background .3s;
}
.logout:hover {
  background: #ff1a1a;
}
</style>
