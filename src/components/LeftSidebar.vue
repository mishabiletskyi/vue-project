<script setup>
// Ми оновили шляхи (path), щоб вони відповідали новій структурі /games/:category
// Тепер всі посилання на категорії ігор починаються з /games/
const navItems = [
  { id: 'popular', text: 'Популярные', path: '/games/popular' },
  { id: 'new', text: 'Новинки', path: '/games/new' },
  { id: 'slots', text: 'Слоты', path: '/games/slots' },
  // Для 'Live Казино' ми використовуємо ключ 'live', як визначили в роутері
  { id: 'live', text: 'Live Казино', path: '/games/live' }, 
  // Цей маршрут залишився без змін, бо це окрема сторінка
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
          <!-- RouterLink тепер буде використовувати правильні шляхи -->
          <RouterLink :to="item.path">
            <i class="icon"></i> <!-- Сюди можна додати іконки, якщо вони є -->
            <span class="text">{{ item.text }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
/* Ваші стилі тут залишаються без змін */
.nav-vertical {
  /* ... ваші стилі ... */
}
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
}
.nav-list a:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text);
}
.nav-list a .text {
  margin-left: 12px; /* Відступ для іконки */
}

/* Vue Router автоматично додає цей клас до активного посилання */
.router-link-exact-active {
  background: var(--accent);
  color: white; /* або #111, залежно від вашого дизайну */
  font-weight: 700;
}
</style>