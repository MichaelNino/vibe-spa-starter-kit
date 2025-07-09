<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="h3 text-success fw-bold">
              <i class="bi bi-calendar-event me-2"></i>
              Activities
            </h1>
            <p class="text-muted">Manage your activities and events</p>
          </div>
          <button @click="showCreateModal" class="btn btn-success" :disabled="venues.length === 0">
            <i class="bi bi-plus-circle me-2"></i>
            Add Activity
          </button>
        </div>

        <div class="alert alert-info" v-if="venues.length === 0" role="alert">
          <i class="bi bi-info-circle me-2"></i>
          You need to create at least one venue before you can add activities.
          <router-link to="/venues" class="alert-link">Create a venue first</router-link>.
        </div>

        <div class="row g-4" v-if="activities.length > 0">
          <div class="col-md-6 col-lg-4" v-for="activity in activities" :key="activity._id">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <h5 class="card-title text-success">{{ activity.title }}</h5>
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                      <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li><button class="dropdown-item" @click="editActivity(activity)">
                        <i class="bi bi-pencil me-2"></i>Edit
                      </button></li>
                      <li><button class="dropdown-item text-danger" @click="deleteActivity(activity)">
                        <i class="bi bi-trash me-2"></i>Delete
                      </button></li>
                    </ul>
                  </div>
                </div>
                
                <p class="card-text text-muted small mb-3">{{ activity.description }}</p>
                
                <div class="mb-2">
                  <small class="text-muted">
                    <i class="bi bi-building me-1"></i>
                    <span>{{ activity.venueName }}</span>
                  </small>
                </div>
                
                <div class="mb-2">
                  <small class="text-muted">
                    <i class="bi bi-calendar me-1"></i>
                    {{ formatDate(activity.startDate) }} - {{ formatDate(activity.endDate) }}
                  </small>
                </div>
                
                <div class="mb-2">
                  <small class="text-muted">
                    <i class="bi bi-clock me-1"></i>
                    {{ activity.startTime }} - {{ activity.endTime }}
                  </small>
                </div>
                
                <div class="mb-3">
                  <small class="text-muted">
                    <i class="bi bi-people me-1"></i>
                    {{ activity.currentParticipants }}/{{ activity.maxParticipants }} participants
                  </small>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex gap-1">
                    <span class="badge tag-style">{{ activity.category }}</span>
                    <span class="badge" :class="getDifficultyClass(activity.difficulty)">
                      {{ activity.difficulty }}
                    </span>
                  </div>
                  <div class="text-success fw-bold">
                    ${{ activity.price.toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="venues.length > 0" class="text-center py-5">
          <i class="bi bi-calendar-event text-muted" style="font-size: 4rem;"></i>
          <h3 class="text-muted mt-3">No activities yet</h3>
          <p class="text-muted">Create your first activity to get started</p>
          <button @click="showCreateModal" class="btn btn-success">
            <i class="bi bi-plus-circle me-2"></i>
            Add Your First Activity
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div class="modal fade" id="activityModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-calendar-event me-2"></i>
              {{ editingActivity ? 'Edit Activity' : 'Create New Activity' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form @submit.prevent="saveActivity">
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-8">
                  <label for="title" class="form-label fw-semibold">Activity Title</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.title }"
                    id="title"
                    v-model="form.title"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.title">{{ errors.title }}</div>
                </div>
                
                <div class="col-md-4">
                  <label for="price" class="form-label fw-semibold">Price ($)</label>
                  <input
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': errors.price }"
                    id="price"
                    v-model.number="form.price"
                    min="0"
                    step="0.01"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.price">{{ errors.price }}</div>
                </div>

                <div class="col-12">
                  <label for="description" class="form-label fw-semibold">Description</label>
                  <textarea
                    class="form-control"
                    :class="{ 'is-invalid': errors.description }"
                    id="description"
                    v-model="form.description"
                    rows="3"
                    required
                  ></textarea>
                  <div class="invalid-feedback" v-if="errors.description">{{ errors.description }}</div>
                </div>

                <div class="col-12">
                  <label for="venueId" class="form-label fw-semibold">Venue</label>
                  <select
                    class="form-select"
                    :class="{ 'is-invalid': errors.venueId }"
                    id="venueId"
                    v-model="form.venueId"
                    required
                  >
                    <option value="">Select a venue</option>
                    <option v-for="venue in venues" :key="venue._id" :value="venue._id">
                      {{ venue.name }} - {{ venue.city }}, {{ venue.state }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.venueId">{{ errors.venueId }}</div>
                </div>

                <div class="col-md-6">
                  <label for="startDate" class="form-label fw-semibold">Start Date</label>
                  <input
                    type="date"
                    class="form-control"
                    :class="{ 'is-invalid': errors.startDate }"
                    id="startDate"
                    v-model="form.startDate"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.startDate">{{ errors.startDate }}</div>
                </div>

                <div class="col-md-6">
                  <label for="endDate" class="form-label fw-semibold">End Date</label>
                  <input
                    type="date"
                    class="form-control"
                    :class="{ 'is-invalid': errors.endDate }"
                    id="endDate"
                    v-model="form.endDate"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.endDate">{{ errors.endDate }}</div>
                </div>

                <div class="col-md-6">
                  <label for="startTime" class="form-label fw-semibold">Start Time</label>
                  <input
                    type="time"
                    class="form-control"
                    :class="{ 'is-invalid': errors.startTime }"
                    id="startTime"
                    v-model="form.startTime"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.startTime">{{ errors.startTime }}</div>
                </div>

                <div class="col-md-6">
                  <label for="endTime" class="form-label fw-semibold">End Time</label>
                  <input
                    type="time"
                    class="form-control"
                    :class="{ 'is-invalid': errors.endTime }"
                    id="endTime"
                    v-model="form.endTime"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.endTime">{{ errors.endTime }}</div>
                </div>

                <div class="col-md-4">
                  <label for="maxParticipants" class="form-label fw-semibold">Max Participants</label>
                  <input
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': errors.maxParticipants }"
                    id="maxParticipants"
                    v-model.number="form.maxParticipants"
                    min="1"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.maxParticipants">{{ errors.maxParticipants }}</div>
                </div>

                <div class="col-md-4">
                  <label for="category" class="form-label fw-semibold">Category</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.category }"
                    id="category"
                    v-model="form.category"
                    placeholder="e.g., Sports, Music, Workshop"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.category">{{ errors.category }}</div>
                </div>

                <div class="col-md-4">
                  <label for="difficulty" class="form-label fw-semibold">Difficulty</label>
                  <select
                    class="form-select"
                    :class="{ 'is-invalid': errors.difficulty }"
                    id="difficulty"
                    v-model="form.difficulty"
                    required
                  >
                    <option value="">Select difficulty</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <div class="invalid-feedback" v-if="errors.difficulty">{{ errors.difficulty }}</div>
                </div>

                <div class="col-12">
                  <label for="requirements" class="form-label fw-semibold">Requirements</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="newRequirement"
                      placeholder="Add requirement"
                      @keyup.enter="addRequirement"
                    >
                    <button type="button" class="btn btn-outline-success" @click="addRequirement">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  <div class="mt-2" v-if="form.requirements.length > 0">
                    <span v-for="(requirement, index) in form.requirements" :key="index" 
                          class="badge tag-style me-2 mb-2">
                      {{ requirement }}
                      <button type="button" class="btn-close btn-close-white ms-2" 
                              @click="removeRequirement(index)" style="font-size: 0.7em;"></button>
                    </span>
                  </div>
                </div>
              </div>

              <div class="alert alert-danger mt-3" v-if="saveError" role="alert">
                <i class="bi bi-exclamation-triangle me-2"></i>
                {{ saveError }}
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-success" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                <i v-else class="bi bi-check me-2"></i>
                {{ loading ? 'Saving...' : 'Save Activity' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { activityService } from '../services/activityService';
import { venueService } from '../services/venueService';
import { db } from '../services/database';
import type { Activity, ActivityFormData } from '../types/activity';
import type { Venue } from '../types/venue';

const activities = ref<Activity[]>([]);
const venues = ref<Venue[]>([]);
const editingActivity = ref<Activity | null>(null);
const loading = ref(false);
const saveError = ref('');
const newRequirement = ref('');

const form = reactive<ActivityFormData>({
  title: '',
  description: '',
  venueId: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  maxParticipants: 1,
  price: 0,
  category: '',
  difficulty: 'Beginner',
  requirements: []
});

const errors = reactive({
  title: '',
  description: '',
  venueId: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  maxParticipants: '',
  price: '',
  category: '',
  difficulty: ''
});

const loadData = async () => {
  const currentUser = db.getCurrentUser();
  if (currentUser) {
    activities.value = await activityService.getActivitiesByUser(currentUser.username);
    venues.value = await venueService.getVenuesByUser(currentUser.username);
  }
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString();
};

const getDifficultyClass = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-success';
    case 'Intermediate': return 'bg-warning';
    case 'Advanced': return 'bg-danger';
    default: return 'bg-secondary';
  }
};

const resetForm = () => {
  Object.assign(form, {
    title: '',
    description: '',
    venueId: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    maxParticipants: 1,
    price: 0,
    category: '',
    difficulty: 'Beginner',
    requirements: []
  });
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  saveError.value = '';
  editingActivity.value = null;
};

const showCreateModal = () => {
  resetForm();
  const modal = new (window as any).bootstrap.Modal(document.getElementById('activityModal'));
  modal.show();
};

const editActivity = (activity: Activity) => {
  editingActivity.value = activity;
  Object.assign(form, {
    title: activity.title,
    description: activity.description,
    venueId: activity.venueId,
    startDate: new Date(activity.startDate).toISOString().split('T')[0],
    endDate: new Date(activity.endDate).toISOString().split('T')[0],
    startTime: activity.startTime,
    endTime: activity.endTime,
    maxParticipants: activity.maxParticipants,
    price: activity.price,
    category: activity.category,
    difficulty: activity.difficulty,
    requirements: [...activity.requirements]
  });
  
  const modal = new (window as any).bootstrap.Modal(document.getElementById('activityModal'));
  modal.show();
};

const addRequirement = () => {
  if (newRequirement.value.trim() && !form.requirements.includes(newRequirement.value.trim())) {
    form.requirements.push(newRequirement.value.trim());
    newRequirement.value = '';
  }
};

const removeRequirement = (index: number) => {
  form.requirements.splice(index, 1);
};

const validateForm = (): boolean => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  if (!form.title.trim()) {
    errors.title = 'Title is required';
    isValid = false;
  }
  
  if (!form.description.trim()) {
    errors.description = 'Description is required';
    isValid = false;
  }
  
  if (!form.venueId) {
    errors.venueId = 'Venue is required';
    isValid = false;
  }
  
  if (!form.startDate) {
    errors.startDate = 'Start date is required';
    isValid = false;
  }
  
  if (!form.endDate) {
    errors.endDate = 'End date is required';
    isValid = false;
  }
  
  if (form.startDate && form.endDate && new Date(form.startDate) > new Date(form.endDate)) {
    errors.endDate = 'End date must be after start date';
    isValid = false;
  }
  
  if (!form.startTime) {
    errors.startTime = 'Start time is required';
    isValid = false;
  }
  
  if (!form.endTime) {
    errors.endTime = 'End time is required';
    isValid = false;
  }
  
  if (!form.category.trim()) {
    errors.category = 'Category is required';
    isValid = false;
  }
  
  if (!form.difficulty) {
    errors.difficulty = 'Difficulty is required';
    isValid = false;
  }
  
  if (form.maxParticipants < 1) {
    errors.maxParticipants = 'Max participants must be at least 1';
    isValid = false;
  }
  
  if (form.price < 0) {
    errors.price = 'Price cannot be negative';
    isValid = false;
  }
  
  return isValid;
};

const saveActivity = async () => {
  if (!validateForm()) return;
  
  loading.value = true;
  saveError.value = '';
  
  try {
    const currentUser = db.getCurrentUser();
    if (!currentUser) {
      saveError.value = 'User not logged in';
      return;
    }
    
    let result;
    if (editingActivity.value) {
      result = await activityService.updateActivity(editingActivity.value._id!, form);
    } else {
      result = await activityService.createActivity(form, currentUser.username);
    }
    
    if (result.success) {
      await loadData();
      const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('activityModal'));
      modal.hide();
      resetForm();
    } else {
      saveError.value = result.message;
    }
  } catch (error) {
    saveError.value = 'An unexpected error occurred';
  } finally {
    loading.value = false;
  }
};

const deleteActivity = async (activity: Activity) => {
  if (confirm(`Are you sure you want to delete "${activity.title}"?`)) {
    const result = await activityService.deleteActivity(activity._id!);
    if (result.success) {
      await loadData();
    } else {
      alert(result.message);
    }
  }
};

onMounted(loadData);
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

/* Fix for small screens */
@media (max-width: 576px) {
   .amenities-section .badge {
     font-size: 0.7rem !important;
     margin-bottom: 0.25rem;
   }
 }
</style>