<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold text-primary" to="/">
        <i class="bi bi-mountain me-2"></i>
        King of the Hill
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ 'active fw-semibold text-primary': $route.name === 'Home' }"
              to="/"
            >
              <i class="bi bi-house-door me-1"></i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ 'active fw-semibold text-primary': $route.name === 'About' }"
              to="/about"
            >
              <i class="bi bi-info-circle me-1"></i>
              About
            </router-link>
          </li>
          <template v-if="isLoggedIn">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ 'active fw-semibold text-primary': $route.name === 'Venues' }"
                to="/venues"
              >
                <i class="bi bi-building me-1"></i>
                Venues
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ 'active fw-semibold text-primary': $route.name === 'Activities' }"
                to="/activities"
              >
                <i class="bi bi-calendar-event me-1"></i>
                Activities
              </router-link>
            </li>
          </template>
        </ul>

        <ul class="navbar-nav">
          <template v-if="!isLoggedIn">
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ 'active fw-semibold text-primary': $route.name === 'Login' }"
                to="/login"
              >
                <i class="bi bi-box-arrow-in-right me-1"></i>
                Sign In
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link btn btn-primary text-white ms-2 px-3"
                :class="{ 'active': $route.name === 'Register' }"
                to="/register"
              >
                <i class="bi bi-person-plus me-1"></i>
                Sign Up
              </router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="bi bi-person-circle me-2"></i>
                {{ currentUser?.firstName }} {{ currentUser?.lastName }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <router-link class="dropdown-item" to="/profile">
                    <i class="bi bi-person me-2"></i>
                    My Profile
                  </router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button class="dropdown-item text-danger" @click="handleLogout">
                    <i class="bi bi-box-arrow-right me-2"></i>
                    Sign Out
                  </button>
                </li>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { db } from '../services/database';
import type { User } from '../types/user';

const route = useRoute();
const router = useRouter();

const isLoggedIn = ref(false);
const currentUser = ref<User | null>(null);

const checkAuthStatus = async () => {
  currentUser.value = await db.loadCurrentUser();
  isLoggedIn.value = db.isLoggedIn();
};

const handleLogout = () => {
  db.logout();
  isLoggedIn.value = false;
  currentUser.value = null;
  router.push('/');
};

onMounted(checkAuthStatus);

// Watch for route changes to update auth status
watch(route, checkAuthStatus);
</script>

<style scoped>
.navbar-brand:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out;
}

.nav-link {
  transition: all 0.2s ease-in-out;
}

.nav-link:hover {
  transform: translateY(-1px);
  color: var(--primary-color) !important;
}

.nav-link.active {
  color: var(--primary-color) !important;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  border-radius: 0.5rem;
}
</style>