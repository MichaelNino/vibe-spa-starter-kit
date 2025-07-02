<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow-lg border-0">
          <div class="card-body p-5">
            <div class="text-center mb-4">
              <h1 class="h3 text-primary fw-bold">
                <i class="bi bi-box-arrow-in-right me-2"></i>
                Sign In
              </h1>
              <p class="text-muted">Welcome back! Please sign in to your account.</p>
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label fw-semibold">Username</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-person"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.username }"
                    id="username"
                    v-model="form.username"
                    placeholder="Enter your username"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.username">
                    {{ errors.username }}
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label for="password" class="form-label fw-semibold">Password</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock"></i>
                  </span>
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    class="form-control"
                    :class="{ 'is-invalid': errors.password }"
                    id="password"
                    v-model="form.password"
                    placeholder="Enter your password"
                    required
                  >
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="showPassword = !showPassword"
                  >
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                  <div class="invalid-feedback" v-if="errors.password">
                    {{ errors.password }}
                  </div>
                </div>
              </div>

              <div class="alert alert-danger" v-if="loginError" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ loginError }}
              </div>

              <div class="d-grid mb-4">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="bi bi-box-arrow-in-right me-2"></i>
                  {{ loading ? 'Signing in...' : 'Sign In' }}
                </button>
              </div>

              <div class="text-center">
                <p class="text-muted">
                  Don't have an account?
                  <router-link to="/register" class="text-decoration-none text-primary">
                    Create one here
                  </router-link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../services/database';
import type { UserCredentials } from '../types/user';

const router = useRouter();

const form = reactive<UserCredentials>({
  username: '',
  password: ''
});

const errors = reactive({
  username: '',
  password: ''
});

const loginError = ref('');
const loading = ref(false);
const showPassword = ref(false);

const validateForm = (): boolean => {
  let isValid = true;
  
  // Reset errors
  errors.username = '';
  errors.password = '';
  
  if (!form.username.trim()) {
    errors.username = 'Username is required';
    isValid = false;
  }
  
  if (!form.password) {
    errors.password = 'Password is required';
    isValid = false;
  }
  
  return isValid;
};

const handleLogin = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  loginError.value = '';
  
  try {
    const result = await db.loginUser(form);
    
    if (result.success) {
      router.push('/profile');
    } else {
      loginError.value = result.message;
    }
  } catch (error) {
    loginError.value = 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
}

.form-control:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}

.input-group-text {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}
</style>