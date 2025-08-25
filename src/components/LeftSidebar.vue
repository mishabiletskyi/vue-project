<script setup>
const navItems = [
  { id: 'popular', text: 'Популярные', path: '/popular' },
  { id: 'new', text: 'Новинки', path: '/new' },
  { id: 'slots', text: 'Слоты', path: '/slots' },
  { id: 'live', text: 'Live Казино', path: '/live-casino' },
  { id: 'drops-wins', text: 'Drops & Wins', path: '/drops-wins' },
  { id: 'roulette', text: 'Рулетка', path: '/roulette' },
];
</script>

<template>
  <aside class="sidebar left-sidebar">
    <nav class="nav-vertical" aria-label="Игровая навигация">
      <ul class="nav-list">
        <li v-for="item in navItems" :key="item.id">
          <RouterLink :to="item.path">
            <i class="icon"></i>
            <span class="text">{{ item.text }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
/* Vue Router автоматично додає цей клас до активного посилання */
.router-link-exact-active {
  background: var(--accent);
  color: #111;
  font-weight: 700;
}
</style>