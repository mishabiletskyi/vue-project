import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameCategoryView from '../views/GameCategoryView.vue'
import { allGames, rouletteGames } from '@/data/mockData.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/popular',
      redirect: '/'
    },
    {
      path: '/slots',
      name: 'slots',
      component: () => import('../views/SlotsView.vue')
    },
    {
      path: '/live-casino',
      name: 'live-casino',
      component: () => import('../views/LiveCasinoView.vue')
    },
    {
      path: '/new',
      name: 'new',
      component: GameCategoryView,
      props: { title: 'Новинки', description: 'Новейшие игры от ведущих провайдеров.', games: allGames }
    },
    {
      path: '/drops-wins',
      name: 'drops-wins',
      component: GameCategoryView,
      props: { title: 'Drops & Wins', description: 'Участвуй в ежедневных розыгрышах призов.', games: allGames }
    },
    {
      path: '/roulette',
      name: 'roulette',
      component: GameCategoryView,
      props: { title: 'Рулетка', description: 'Все виды рулетки: европейская, американская и другие.', games: rouletteGames }
    }
  ]
})

export default router