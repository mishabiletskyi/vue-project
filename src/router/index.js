// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";

// --- Імпортуємо всі потрібні сторінки (views) ---
import HomeView from "../views/HomeView.vue";
import GamesView from "../views/GamesView.vue"; // Наш новий ігровий хаб
import GameCategoryView from "../views/GameCategoryView.vue"; // Сторінка для відображення конкретної категорії
import DropsAndWinsView from "../views/DropsAndWinsView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import PasswordRecoveryView from "../views/PasswordRecoveryView.vue";
import DepositView from "../views/DepositView.vue";
import BonusView from "../views/BonusView.vue";
import BonusInfoView from "../views/BonusInfoView.vue";
import AccountView from "../views/AccountView.vue";

// --- Імпортуємо ВСІ потрібні дані для ігор ---
import { allGames, popularGames, newGames, LiveGames, rouletteGames } from "@/data/mockData.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Завжди прокручувати сторінку наверх при переході
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    // --- ОСНОВНІ ЗМІНИ ТУТ ---
    {
      // 1. Головна сторінка ігрового розділу (наш хаб)
      path: "/games",
      name: "games",
      component: GamesView,
    },
    {
      // 2. ДИНАМІЧНИЙ маршрут для всіх категорій ігор
      // Він буде обробляти адреси типу /games/popular, /games/new і т.д.
      path: "/games/:category",
      name: "game-category",
      component: GameCategoryView,
      // Використовуємо функцію, щоб динамічно передавати пропси в компонент
      props: route => {
        const category = route.params.category; // Отримуємо назву категорії з URL
        
        // Створюємо об'єкт для пошуку потрібних даних
        const categoryData = {
          'popular': { title: 'Популярные', games: popularGames },
          'new': { title: 'Новинки', games: newGames },
          'live': { title: 'Live Казино', games: LiveGames },
          'roulette': { title: 'Рулетка', games: rouletteGames },
          // Сюди можна додати інші категорії, наприклад 'slots'
          'slots': { title: 'Слоты', games: allGames }, // Наприклад, слоти показують всі ігри
        };
        
        // Повертаємо потрібні дані або дані за замовчуванням, якщо категорію не знайдено
        return categoryData[category] || { title: 'Игры', games: allGames };
      }
    },
    // --- КІНЕЦЬ ОСНОВНИХ ЗМІН ---
    {
      path: "/drops-wins",
      name: "drops-wins",
      component: DropsAndWinsView,
    },
    {
      path: "/bonuses",
      name: "bonuses",
      component: BonusView,
    },
    {
      path: "/bonus-info",
      name: "bonus-info",
      component: BonusInfoView,
    },
    {
      path: "/tournaments",
      name: "tournaments",
      component: () => import("../views/TournamentsView.vue"),
    },
    {
      path: "/support",
      name: "support",
      component: () => import("../views/SupportView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/password-recovery",
      name: "password-recovery",
      component: PasswordRecoveryView,
    },
    {
      path: "/deposit",
      name: "deposit",
      component: DepositView,
    },
    {
      path: "/account",
      name: "account",
      component: AccountView,
      meta: { requiresAuth: true },
    },
    {
      path: "/terms",
      name: "terms",
      component: () => import("../views/TermsView.vue"),
    },
    {
      path: "/privacy",
      name: "privacy",
      component: () => import("../views/PrivacyView.vue"),
    },
    
    // --- Видалені старі маршрути ---
    // Ми видалили окремі /slots, /new, /roulette, бо тепер їх обробляє динамічний маршрут /games/:category
  ],
});

export default router;