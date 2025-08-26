import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameCategoryView from '../views/GameCategoryView.vue'

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
      props: { title: 'Новинки', description: 'Найновіші ігри від провідних провайдерів.' }
    },
    {
      path: '/drops-wins',
      name: 'drops-wins',
      component: GameCategoryView,
      props: { title: 'Drops & Wins', description: 'Бери участь у щоденних розіграшах призів.' }
    },
    {
      path: '/roulette',
      name: 'roulette',
      component: GameCategoryView,
      props: { title: 'Рулетка', description: 'Всі види рулетки: Європейська, Американська та інші.' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/password-recovery',
      name: 'password-recovery',
      component: () => import('../views/PasswordRecoveryView.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue')
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: () => import('../views/DepositView.vue')
    }
  ]
})
 
export default router
