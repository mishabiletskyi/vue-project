import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameCategoryView from '../views/GameCategoryView.vue'
import DropsAndWinsView from '../views/DropsAndWinsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PasswordRecoveryView from '../views/PasswordRecoveryView.vue'
import DepositView from '../views/DepositView.vue'
import AccountView from '../views/AccountView.vue'
import useAuth from '../composables/useAuth.js'
import { allGames, rouletteGames, newGames } from '@/data/mockData.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/popular', redirect: '/' },
    { path: '/slots', name: 'slots', component: () => import('../views/SlotsView.vue') },
    { path: '/live-casino', name: 'live-casino', component: () => import('../views/LiveCasinoView.vue') },
    { path: '/new', name: 'new', component: GameCategoryView, props: { title: 'Новинки', description: 'Новейшие игры от ведущих провайдеров.', games: newGames } },
    { path: '/drops-wins', name: 'drops-wins', component: DropsAndWinsView },
    { path: '/roulette', name: 'roulette', component: GameCategoryView, props: { title: 'Рулетка', description: 'Все виды рулетки: европейская, американская и другие.', games: rouletteGames } },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/password-recovery', name: 'password-recovery', component: PasswordRecoveryView },
    { path: '/deposit', name: 'deposit', component: DepositView },
    { path: '/account', name: 'account', component: AccountView, meta: { requiresAuth: true } }
  ]
})

const { isLoggedIn } = useAuth()

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn.value) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
