<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-lg border-0">
          <div class="card-body p-5">
            <div class="text-center mb-4">
              <h1 class="h3 text-primary fw-bold">
                <i class="bi bi-person-plus me-2"></i>
                Create Account
              </h1>
              <p class="text-muted">Join us today! Please fill in your information below.</p>
            </div>

            <form @submit.prevent="handleRegister">
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label for="firstName" class="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.firstName }"
                    id="firstName"
                    v-model="form.firstName"
                    placeholder="First name"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.firstName">
                    {{ errors.firstName }}
                  </div>
                </div>
                
                <div class="col-md-6">
                  <label for="lastName" class="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.lastName }"
                    id="lastName"
                    v-model="form.lastName"
                    placeholder="Last name"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.lastName">
                    {{ errors.lastName }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="username" class="form-label fw-semibold">Username</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-at"></i>
                  </span>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.username }"
                    id="username"
                    v-model="form.username"
                    placeholder="Choose a username"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.username">
                    {{ errors.username }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label fw-semibold">Email Address</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    id="email"
                    v-model="form.email"
                    placeholder="your@email.com"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.email">
                    {{ errors.email }}
                  </div>
                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label for="phone" class="form-label fw-semibold">Phone Number</label>
                  <div class="input-group">
                    <span class="input-group-text">
                      <i class="bi bi-telephone"></i>
                    </span>
                    <input
                      type="tel"
                      class="form-control"
                      :class="{ 'is-invalid': errors.phone }"
                      id="phone"
                      v-model="form.phone"
                      placeholder="(555) 123-4567"
                      required
                    >
                    <div class="invalid-feedback" v-if="errors.phone">
                      {{ errors.phone }}
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="gender" class="form-label fw-semibold">Gender</label>
                  <select
                    class="form-select"
                    :class="{ 'is-invalid': errors.gender }"
                    id="gender"
                    v-model="form.gender"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.gender">
                    {{ errors.gender }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="theme" class="form-label fw-semibold">Preferred Theme</label>
                <select
                  class="form-select"
                  :class="{ 'is-invalid': errors.theme }"
                  id="theme"
                  v-model="form.theme"
                  @change="previewTheme"
                  required
                >
                  <option value="">Select theme</option>
                  <option value="Green">Green</option>
                  <option value="Blue">Blue</option>
                  <option value="Pink">Pink</option>
                  <option value="Purple">Purple</option>
                  <option value="Red">Red</option>
                </select>
                <div class="invalid-feedback" v-if="errors.theme">
                  {{ errors.theme }}
                </div>
                <small class="text-muted">This will be your app's primary color theme</small>
              </div>

              <div class="mb-3">
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
                    placeholder="Create a strong password"
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

              <div class="mb-4">
                <label for="confirmPassword" class="form-label fw-semibold">Confirm Password</label>
                <div class="input-group">
                  <span class="input-group-text">
                    <i class="bi bi-lock-fill"></i>
                  </span>
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="form-control"
                    :class="{ 'is-invalid': errors.confirmPassword }"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    placeholder="Confirm your password"
                    required
                  >
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                  >
                    <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                  <div class="invalid-feedback" v-if="errors.confirmPassword">
                    {{ errors.confirmPassword }}
                  </div>
                </div>
              </div>

              <div class="alert alert-danger" v-if="registerError" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ registerError }}
              </div>

              <div class="alert alert-success" v-if="registerSuccess" role="alert">
                <i class="bi bi-check-circle me-2"></i>
                {{ registerSuccess }}
              </div>

              <div class="d-grid mb-4">
                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="bi bi-person-plus me-2"></i>
                  {{ loading ? 'Creating Account...' : 'Create Account' }}
                </button>
              </div>

              <div class="text-center">
                <p class="text-muted">
                  Already have an account?
                  <router-link to="/login" class="text-decoration-none text-primary">
                    Sign in here
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
import type { UserRegistration } from '../types/user';

const router = useRouter();

const form = reactive<UserRegistration>({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  gender: 'Prefer not to say',
  theme: 'Green',
  password: ''
});

const confirmPassword = ref('');

const errors = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  gender: '',
  theme: '',
  password: '',
  confirmPassword: ''
});

const registerError = ref('');
const registerSuccess = ref('');
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const previewTheme = () => {
  if (form.theme) {
    const themeColor = db.getThemeColor(form.theme);
    document.documentElement.style.setProperty('--primary-color', themeColor);
  }
};

const validateForm = (): boolean => {
  let isValid = true;
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  if (!form.firstName.trim()) {
    errors.firstName = 'First name is required';
    isValid = false;
  }
  
  if (!form.lastName.trim()) {
    errors.lastName = 'Last name is required';
    isValid = false;
  }
  
  if (!form.username.trim()) {
    errors.username = 'Username is required';
    isValid = false;
  } else if (form.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
    isValid = false;
  }
  
  if (!form.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  }
  
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required';
    isValid = false;
  }

  if (!form.gender) {
    errors.gender = 'Gender is required';
    isValid = false;
  }

  if (!form.theme) {
    errors.theme = 'Theme is required';
    isValid = false;
  }
  
  if (!form.password) {
    errors.password = 'Password is required';
    isValid = false;
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
    isValid = false;
  }
  
  if (!confirmPassword.value) {
    errors.confirmPassword = 'Please confirm your password';  
    isValid = false;
  } else if (form.password !== confirmPassword.value) {
    errors.confirmPassword = 'Passwords do not match';
    isValid = false;
  }
  
  return isValid;
};

const handleRegister = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  registerError.value = '';
  registerSuccess.value = '';
  
  try {
    const result = await db.registerUser(form);
    
    if (result.success) {
      registerSuccess.value = result.message;
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } else {
      registerError.value = result.message;
    }
  } catch (error) {
    registerError.value = 'An unexpected error occurred';
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
  border-color: var(--primary-color, #198754);
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}

.input-group-text {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}
</style>