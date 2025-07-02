<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="text-center mb-5">
          <h1 class="display-4 fw-bold text-success mb-3">
            <i class="bi bi-info-circle me-3"></i>
            About King of the Hill
          </h1>
          <p class="lead text-muted">
            A comprehensive venue and activity management platform built with modern web technologies
          </p>
        </div>

        <div class="card shadow-lg border-0 mb-5">
          <div class="card-body p-5">
            <h2 class="h3 text-success mb-4">
              <i class="bi bi-gear me-2"></i>
              Technology Stack
            </h2>
            
            <div class="row g-4 mb-5">
              <div class="col-md-4">
                <div class="text-center">
                  <div class="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                    <i class="bi bi-bootstrap text-success" style="font-size: 2rem;"></i>
                  </div>
                  <h5 class="mt-3">Vue 3</h5>
                  <p class="text-muted small">Progressive JavaScript framework with Composition API</p>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="text-center">
                  <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                    <i class="bi bi-palette text-primary" style="font-size: 2rem;"></i>
                  </div>
                  <h5 class="mt-3">Bootstrap 5</h5>
                  <p class="text-muted small">Responsive CSS framework with modern components</p>
                </div>
              </div>
              
              <div class="col-md-4">
                <div class="text-center">
                  <div class="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style="width: 80px; height: 80px;">
                    <i class="bi bi-database text-warning" style="font-size: 2rem;"></i>
                  </div>
                  <h5 class="mt-3">PouchDB</h5>
                  <p class="text-muted small">Client-side database for offline-first applications</p>
                </div>
              </div>
            </div>

            <h3 class="h4 text-success mb-3">
              <i class="bi bi-list-check me-2"></i>
              Key Features
            </h3>
            
            <div class="row">
              <div class="col-md-6">
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <i class="bi bi-check-circle text-success me-2"></i>
                    Venue management with CRUD operations
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle text-success me-2"></i>
                    Activity planning and scheduling
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle text-success me-2"></i>
                    User registration & authentication
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle text-success me-2"></i>
                    Local data persistence
                  </li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul class="list-unstyled">
                  <li class="mb-2">
                    <i class="bi bi-check-circle text-success me-2"></i>
                    Mobile-responsive design
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle text-success me-2"></i>
                    Form validation and error handling
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle text-success me-2"></i>
                    TypeScript support
                  </li>
                  <li class="mb-2">
                    <i class="bi bi-check-circle text-success me-2"></i>
                    Modern ES6+ JavaScript
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <div class="col-md-6">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <h4 class="card-title text-success">
                  <i class="bi bi-shield-check me-2"></i>
                  Privacy First
                </h4>
                <p class="card-text">
                  All user data is stored locally in your browser. No server-side storage means your information stays private and secure.
                </p>
              </div>
            </div>
          </div>
          
          <div class="col-md-6">
            <div class="card h-100 border-0 shadow-sm">
              <div class="card-body">
                <h4 class="card-title text-success">
                  <i class="bi bi-wifi-off me-2"></i>
                  Offline Ready
                </h4>
                <p class="card-text">
                  Built with offline-first principles using PouchDB. Access your data even when you're not connected to the internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic would go here if needed
</script>

<style scoped>
.card {
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
}
</style>