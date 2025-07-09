<template>
  <footer class="bg-dark text-light py-4 mt-auto">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="d-flex align-items-center">
            <i class="bi bi-mountain text-primary me-2" style="font-size: 1.5rem;"></i>
            <div>
              <h6 class="mb-0">{{ brandName }}</h6>
              <small class="text-white">Your ultimate social, venue and activity management platform</small>
            </div>
          </div>
        </div>
        <div class="col-md-6 text-md-end mt-3 mt-md-0">
          <div class="d-flex justify-content-md-end justify-content-center align-items-center">
            <router-link to="/terms" class="text-white text-decoration-underline">
              Terms of Service
            </router-link>
          </div>
        </div>
      </div>
      <hr class="my-3">
      <div class="row">
        <div class="col-12 text-center">
          <small class="text-warning">
            Created by Launch Software © 2025 - All Rights Reserved.
          </small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { db } from '../services/database';

const currentYear = computed(() => new Date().getFullYear());
const brandName = ref('King of the Hill');

const handleBrandNameChange = (event: CustomEvent) => {
  brandName.value = event.detail;
};

onMounted(() => {
  brandName.value = db.getBrandName();
  // Listen for brand name changes
  window.addEventListener('brandNameChanged', handleBrandNameChange as EventListener);
});
</script>

<style scoped>
footer {
  background: linear-gradient(135deg, #343a40 0%, #495057 100%);
}

.badge {
  font-size: 0.75rem;
}
</style>