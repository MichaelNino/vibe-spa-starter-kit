<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="text-center mb-5">
          <h1 class="display-4 fw-bold text-primary mb-3">
            <i class="bi bi-mountain me-3"></i>
            King of the Hill
          </h1>
          <p class="lead text-muted">
            Your ultimate venue and activity management platform
          </p>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center">
                <i class="bi bi-building text-primary" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Venue Management</h5>
                <p class="card-text text-muted">
                  Create and manage your venues with detailed information and amenities
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center">
                <i class="bi bi-calendar-event text-primary" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Activity Planning</h5>
                <p class="card-text text-muted">
                  Organize activities and events with scheduling and participant management
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center">
                <i class="bi bi-database text-primary" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Local Storage</h5>
                <p class="card-text text-muted">
                  All data stored securely in your browser using PouchDB
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body text-center">
                <i class="bi bi-phone text-primary" style="font-size: 3rem;"></i>
                <h5 class="card-title mt-3">Mobile Ready</h5>
                <p class="card-text text-muted">
                  Fully responsive design optimized for all devices
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5" v-if="!isLoggedIn">
          <h3 class="mb-3">Get Started</h3>
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <router-link to="/register" class="btn btn-primary btn-lg">
              <i class="bi bi-person-plus me-2"></i>
              Create Account
            </router-link>
            <router-link to="/login" class="btn btn-outline-primary btn-lg">
              <i class="bi bi-box-arrow-in-right me-2"></i>
              Sign In
            </router-link>
          </div>
        </div>

        <div class="text-center mt-5" v-else>
          <div class="alert alert-success" role="alert">
            <i class="bi bi-check-circle me-2"></i>
            Welcome back, {{ currentUser?.firstName }}!
          </div>
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <router-link to="/venues" class="btn btn-primary btn-lg">
              <i class="bi bi-building me-2"></i>
              Manage Venues
            </router-link>
            <router-link to="/activities" class="btn btn-outline-primary btn-lg">
              <i class="bi bi-calendar-event me-2"></i>
              Plan Activities
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '../services/database';
import type { User } from '../types/user';

const isLoggedIn = ref(false);
const currentUser = ref<User | null>(null);

onMounted(async () => {
  currentUser.value = await db.loadCurrentUser();
  isLoggedIn.value = db.isLoggedIn();
});
</script>

<style scoped>
.hover-shadow {
  transition: box-shadow 0.3s ease-in-out;
}

.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card {
  border: none;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
}
</style>