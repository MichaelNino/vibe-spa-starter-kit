<template>
  <footer class="bg-dark text-light py-4 mt-auto">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="d-flex align-items-center">
            <i class="bi bi-app text-primary me-2" style="font-size: 1.5rem;"></i>
            <div>
              <h6 class="mb-0">Vue Bootstrap PouchDB SPA</h6>
              <small class="text-muted">Built with modern web technologies</small>
            </div>
          </div>
        </div>
        <div class="col-md-6 text-md-end mt-3 mt-md-0">
          <div class="d-flex justify-content-md-end justify-content-center align-items-center">
            <span class="me-3">Powered by:</span>
            <div class="d-flex gap-2">
              <span class="badge bg-success">Vue 3</span>
              <span class="badge bg-primary">Bootstrap 5</span>
              <span class="badge bg-warning text-dark">PouchDB</span>
            </div>
          </div>
        </div>
      </div>
      <hr class="my-3">
      <div class="row">
        <div class="col-12 text-center">
          <small class="text-muted">
            © {{ currentYear }} Vue SPA Demo. All data stored locally in your browser.
          </small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
footer {
  background: linear-gradient(135deg, #343a40 0%, #495057 100%);
}

.badge {
  font-size: 0.75rem;
}
</style>