import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Profile from '../views/Profile.vue';
import Venues from '../views/Venues.vue';
import Activities from '../views/Activities.vue';
import TermsOfService from '../views/TermsOfService.vue';
import { db } from '../services/database';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  },
  {
    path: '/venues',
    name: 'Venues',
    component: Venues,
    meta: { requiresAuth: true }
  },
  {
    path: '/activities',
    name: 'Activities',
    component: Activities,
    meta: { requiresAuth: true }
  },
  {
    path: '/terms',
    name: 'TermsOfService',
    component: TermsOfService
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guards
router.beforeEach(async (to, from, next) => {
  await db.loadCurrentUser();
  
  if (to.meta.requiresAuth && !db.isLoggedIn()) {
    next('/login');
  } else if (to.meta.requiresGuest && db.isLoggedIn()) {
    next('/profile');
  } else {
    next();
  }
});

export default router;