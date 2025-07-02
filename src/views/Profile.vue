<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="text-center mb-4">
          <div class="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 100px; height: 100px;">
            <i class="bi bi-person-circle text-primary" style="font-size: 4rem;"></i>
          </div>
          <h1 class="h3 text-primary fw-bold">User Profile</h1>
          <p class="text-muted">Manage your account information</p>
        </div>

        <div class="card shadow-lg border-0 mb-4">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h2 class="h5 mb-0">
                <i class="bi bi-person-gear me-2"></i>
                Profile Information
              </h2>
              <button
                v-if="!editMode"
                @click="enableEdit"
                class="btn btn-outline-primary btn-sm"
              >
                <i class="bi bi-pencil me-1"></i>
                Edit
              </button>
            </div>

            <form @submit.prevent="handleUpdate" v-if="editMode">
              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label for="firstName" class="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.firstName }"
                    id="firstName"
                    v-model="form.firstName"
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
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.lastName">
                    {{ errors.lastName }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="username" class="form-label fw-semibold">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="form.username"
                  readonly
                  style="background-color: #f8f9fa;"
                >
                <small class="text-muted">Username cannot be changed</small>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label fw-semibold">Email Address</label>
                <input
                  type="email"
                  class="form-control"
                  :class="{ 'is-invalid': errors.email }"
                  id="email"
                  v-model="form.email"
                  required
                >
                <div class="invalid-feedback" v-if="errors.email">
                  {{ errors.email }}
                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-md-6">
                  <label for="phone" class="form-label fw-semibold">Phone Number</label>
                  <input
                    type="tel"
                    class="form-control"
                    :class="{ 'is-invalid': errors.phone }"
                    id="phone"
                    v-model="form.phone"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.phone">
                    {{ errors.phone }}
                  </div>
                </div>

                <div class="col-md-6">
                  <label for="gender" class="form-label fw-semibold">Gender</label>
                  <select
                    class="form-select"
                    :class="{ 'is-invalid': errors.gender }"
                    id="gender"
                    v-model="form.gender"
                    @change="updateBrandPreview"
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.gender">
                    {{ errors.gender }}
                  </div>
                </div>
              </div>

              <div class="mb-4">
                <label for="theme" class="form-label fw-semibold">Theme</label>
                <select
                  class="form-select"
                  :class="{ 'is-invalid': errors.theme }"
                  id="theme"
                  v-model="form.theme"
                  @change="previewTheme"
                  required
                >
                  <option value="Green">Green</option>
                  <option value="Blue">Blue</option>
                  <option value="Pink">Pink</option>
                  <option value="Purple">Purple</option>
                  <option value="Red">Red</option>
                </select>
                <div class="invalid-feedback" v-if="errors.theme">
                  {{ errors.theme }}
                </div>
                <small class="text-muted">Changes will be applied immediately</small>
              </div>

              <div class="mb-3" v-if="form.gender">
                <div class="alert alert-info">
                  <i class="bi bi-info-circle me-2"></i>
                  Your app will be branded as: <strong>{{ getBrandPreview() }}</strong>
                </div>
              </div>

              <div class="alert alert-danger" v-if="updateError" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ updateError }}
              </div>

              <div class="alert alert-success" v-if="updateSuccess" role="alert">
                <i class="bi bi-check-circle me-2"></i>
                {{ updateSuccess }}
              </div>

              <div class="d-flex gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="loading"
                >
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="bi bi-check me-2"></i>
                  {{ loading ? 'Updating...' : 'Update Profile' }}
                </button>
                <button
                  type="button"
                  @click="cancelEdit"
                  class="btn btn-secondary"
                  :disabled="loading"
                >
                  <i class="bi bi-x me-2"></i>
                  Cancel
                </button>
              </div>
            </form>

            <div v-else>
              <div class="row g-3">
                <div class="col-md-6">
                  <strong class="text-muted d-block small">First Name</strong>
                  <p class="mb-2">{{ user?.firstName }}</p>
                </div>
                <div class="col-md-6">
                  <strong class="text-muted d-block small">Last Name</strong>
                  <p class="mb-2">{{ user?.lastName }}</p>
                </div>
                <div class="col-md-6">
                  <strong class="text-muted d-block small">Username</strong>
                  <p class="mb-2">{{ user?.username }}</p>
                </div>
                <div class="col-md-6">
                  <strong class="text-muted d-block small">Email</strong>
                  <p class="mb-2">{{ user?.email }}</p>
                </div>
                <div class="col-md-6">
                  <strong class="text-muted d-block small">Phone</strong>
                  <p class="mb-2">{{ user?.phone }}</p>
                </div>
                <div class="col-md-6">
                  <strong class="text-muted d-block small">Gender</strong>
                  <p class="mb-2">{{ user?.gender }}</p>
                </div>
                <div class="col-12">
                  <strong class="text-muted d-block small">Theme</strong>
                  <div class="d-flex align-items-center">
                    <div 
                      class="rounded-circle me-2" 
                      :style="{ backgroundColor: getThemeColor(user?.theme), width: '20px', height: '20px' }"
                    ></div>
                    <span>{{ user?.theme }}</span>
                  </div>
                </div>
                <div class="col-12">
                  <strong class="text-muted d-block small">App Branding</strong>
                  <p class="mb-0">{{ getBrandName() }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow-sm border-0">
          <div class="card-body p-4">
            <h3 class="h5 text-danger mb-3">
              <i class="bi bi-box-arrow-right me-2"></i>
              Account Actions
            </h3>
            <p class="text-muted mb-3">
              Need to sign out? Click the button below to securely log out of your account.
            </p>
            <button @click="handleLogout" class="btn btn-outline-danger">
              <i class="bi bi-box-arrow-right me-2"></i>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '../services/database';
import type { User } from '../types/user';

const router = useRouter();

const user = ref<User | null>(null);
const editMode = ref(false);
const loading = ref(false);
const updateError = ref('');
const updateSuccess = ref('');

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  gender: 'Male',
  theme: 'Green'
});

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  gender: '',
  theme: ''
});

onMounted(async () => {
  user.value = await db.loadCurrentUser();
  if (user.value) {
    populateForm();
  } else {
    router.push('/login');
  }
});

const populateForm = () => {
  if (user.value) {
    form.firstName = user.value.firstName;
    form.lastName = user.value.lastName;
    form.username = user.value.username;
    form.email = user.value.email;
    form.phone = user.value.phone;
    form.gender = user.value.gender || 'Male';
    form.theme = user.value.theme || 'Green';
  }
};

const enableEdit = () => {
  editMode.value = true;
  updateError.value = '';
  updateSuccess.value = '';
};

const cancelEdit = () => {
  editMode.value = false;
  populateForm();
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
};

const previewTheme = () => {
  if (form.theme) {
    const themeColor = db.getThemeColor(form.theme);
    document.documentElement.style.setProperty('--primary-color', themeColor);
  }
};

const updateBrandPreview = () => {
  // This will trigger the brand preview in the template
};

const getBrandPreview = () => {
  return form.gender === 'Female' ? 'Queen of the Hill' : 'King of the Hill';
};

const getBrandName = () => {
  return user.value?.gender === 'Female' ? 'Queen of the Hill' : 'King of the Hill';
};

const getThemeColor = (theme?: string) => {
  return db.getThemeColor(theme || 'Green');
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
  
  return isValid;
};

const handleUpdate = async () => {
  if (!validateForm()) {
    return;
  }
  
  loading.value = true;
  updateError.value = '';
  updateSuccess.value = '';
  
  try {
    const result = await db.updateUser({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      gender: form.gender as 'Male' | 'Female',
      theme: form.theme as 'Green' | 'Blue' | 'Pink' | 'Purple' | 'Red'
    });
    
    if (result.success) {
      updateSuccess.value = result.message;
      user.value = result.user || null;
      editMode.value = false;
    } else {
      updateError.value = result.message;
    }
  } catch (error) {
    updateError.value = 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};

const handleLogout = () => {
  db.logout();
  router.push('/');
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
</style>