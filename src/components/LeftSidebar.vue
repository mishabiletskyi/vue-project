<script setup>
import { ref } from 'vue';

const navItems = ref([
  { id: 'popular', text: 'Популярные', active: true },
  { id: 'new', text: 'Новинки' },
  { id: 'slots', text: 'Слоты' },
  { id: 'live', text: 'Live Казино' },
  { id: 'drops-wins', text: 'Drops & Wins' },
  { id: 'roulette', text: 'Рулетка' },
]);
</script>

<template>
  <aside class="sidebar left-sidebar">
    <nav class="nav-vertical" aria-label="Игровая навигация">
      <ul class="nav-list">
        <li v-for="item in navItems" :key="item.id">
          <a :href="`#${item.id}`" :class="{ active: item.active }">
            <i class="icon"></i>
            <span class="text">{{ item.text }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>