<script setup>
const navItems = [
  { id: 'popular', text: 'Популярные', path: '/games/popular' },
  { id: 'new', text: 'Новинки', path: '/games/new' },
  { id: 'slots', text: 'Слоты', path: '/games/slots' },
  { id: 'live', text: 'Live Казино', path: '/games/live' }, 
  { id: 'drops-wins', text: 'Drops & Wins', path: '/drops-wins' }, 
  { id: 'roulette', text: 'Рулетка', path: '/games/roulette' },
  { id: 'table', text: 'Столы', path: '/games/table' },
];
</script>

<template>
  <aside class="sidebar left-sidebar">
    <nav class="nav-vertical" aria-label="Игровая навигация">
      <ul class="nav-list">
        <li v-for="item in navItems" :key="item.id">
          <RouterLink :to="item.path">
            <span class="text">{{ item.text }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
/* Стили для десктопа (вертикальный сайдбар) */
.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-list a {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.2s, color 0.2s;
  white-space: nowrap; /* Важно для десктопа, чтобы текст не переносился */
}
.nav-list a:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text);
}
.router-link-exact-active {
  background: var(--accent);
  color: white;
  font-weight: 700;
}

/* ▼▼▼ СТИЛИ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ ▼▼▼ */
@media (max-width: 768px) {
  .left-sidebar {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-bottom: 1px solid #2a2f3a;
    /* ▼▼▼ ИЗМЕНЕНИЕ №1: Добавляем центрирование для дочерних элементов ▼▼▼ */
    text-align: center;
  }

  .left-sidebar::-webkit-scrollbar {
    display: none;
  }

  .nav-list {
    /* ▼▼▼ ИЗМЕНЕНИЕ №2: Делаем список встроенным, чтобы он подчинялся text-align ▼▼▼ */
    display: inline-flex; 
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 8px;
  }

  .nav-list li {
    flex-shrink: 0;
  }
  .nav-list a {
    padding: 8px 16px;
  }
}
</style>