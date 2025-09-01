import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameCategoryView from '../views/GameCategoryView.vue'
import DropsAndWinsView from '../views/DropsAndWinsView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import PasswordRecoveryView from '../views/PasswordRecoveryView.vue';
import DepositView from '../views/DepositView.vue';
import BonusView from '../views/BonusView.vue';
import { allGames,rouletteGames, newGames } from '@/data/mockData.js';
import AccountView from '../views/AccountView.vue'

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
      props: { title: 'Новинки', description: 'Найновіші ігри від провідних провайдерів.', games: newGames }
    },
    {
      path: '/drops-wins',
      name: 'drops-wins',
      component: DropsAndWinsView
    },
    {
      path: '/roulette',
      name: 'roulette',
      component: GameCategoryView,
      props: { title: 'Рулетка', description: 'Всі види рулетки: Європейська, Американська та інші.', games: rouletteGames }
    },
    {
      path: '/bonuses',
      name: 'bonuses',
      component: BonusView
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/GamesView.vue')
    },
    {
      path: '/tournaments',
      name: 'tournaments',
      component: () => import('../views/TournamentsView.vue')
    },
    {
      path: '/support',
      name: 'support',
      component: () => import('../views/SupportView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/password-recovery',
      name: 'password-recovery',
      component: PasswordRecoveryView
    },
    {
      path: '/deposit',
      name: 'deposit',
      component: DepositView
    },
    { path: '/account', name: 'account', component: AccountView, meta: { requiresAuth: true } },
    { path: '/terms', name: 'terms', component: () => import('../views/TermsView.vue') },
    { path: '/privacy', name: 'privacy', component: () => import('../views/PrivacyView.vue') }
  ]
})

export default router
