<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="h3 text-success fw-bold">
              <i class="bi bi-building me-2"></i>
              Venues
            </h1>
            <p class="text-muted">Manage your venues and locations</p>
          </div>
          <button @click="showCreateModal" class="btn btn-success">
            <i class="bi bi-plus-circle me-2"></i>
            Add Venue
          </button>
        </div>

        <div class="row g-4" v-if="venues.length > 0">
          <div class="col-md-6 col-lg-4" v-for="venue in venues" :key="venue._id">
            <div class="card h-100 shadow-sm hover-shadow">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-3">
                  <h5 class="card-title text-success">{{ venue.name }}</h5>
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary" type="button" data-bs-toggle="dropdown">
                      <i class="bi bi-three-dots-vertical"></i>
                    </button>
                    <ul class="dropdown-menu">
                      <li><button class="dropdown-item" @click="editVenue(venue)">
                        <i class="bi bi-pencil me-2"></i>Edit
                      </button></li>
                      <li><button class="dropdown-item text-danger" @click="deleteVenue(venue)">
                        <i class="bi bi-trash me-2"></i>Delete
                      </button></li>
                    </ul>
                  </div>
                </div>
                
                <p class="card-text text-muted small mb-2">{{ venue.description }}</p>
                
                <div class="mb-2">
                  <small class="text-muted">
                    <i class="bi bi-geo-alt me-1"></i>
                    {{ venue.address }}, {{ venue.city }}, {{ venue.state }}
                  </small>
                </div>
                
                <div class="mb-2">
                  <small class="text-muted">
                    <i class="bi bi-people me-1"></i>
                    Capacity: {{ venue.capacity }}
                  </small>
                </div>
                
                <div class="mb-3">
                  <small class="text-muted">
                    <i class="bi bi-telephone me-1"></i>
                    {{ venue.phone }}
                  </small>
                </div>

                <!-- Amenities Section -->
                <div v-if="venue.amenities && venue.amenities.length > 0" class="amenities-section">
                  <div class="d-flex flex-wrap gap-1">
                    <span 
                      v-for="(amenity, index) in venue.amenities.slice(0, 3)" 
                      :key="`${venue._id}-amenity-${index}`" 
                      class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                      style="font-size: 0.75rem;"
                    >
                      {{ amenity }}
                    </span>
                    <span 
                      v-if="venue.amenities.length > 3" 
                      class="badge bg-secondary"
                      style="font-size: 0.75rem;"
                    >
                      +{{ venue.amenities.length - 3 }} more
                    </span>
                  </div>
                </div>
                
                <!-- No amenities message -->
                <div v-else class="text-muted small">
                  <i class="bi bi-info-circle me-1"></i>
                  No amenities listed
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-5">
          <i class="bi bi-building text-muted" style="font-size: 4rem;"></i>
          <h3 class="text-muted mt-3">No venues yet</h3>
          <p class="text-muted">Create your first venue to get started</p>
          <button @click="showCreateModal" class="btn btn-success">
            <i class="bi bi-plus-circle me-2"></i>
            Add Your First Venue
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div class="modal fade" id="venueModal" tabindex="-1">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              <i class="bi bi-building me-2"></i>
              {{ editingVenue ? 'Edit Venue' : 'Create New Venue' }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <form @submit.prevent="saveVenue">
            <div class="modal-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="name" class="form-label fw-semibold">Venue Name</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.name }"
                    id="name"
                    v-model="form.name"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
                </div>
                
                <div class="col-md-6">
                  <label for="capacity" class="form-label fw-semibold">Capacity</label>
                  <input
                    type="number"
                    class="form-control"
                    :class="{ 'is-invalid': errors.capacity }"
                    id="capacity"
                    v-model.number="form.capacity"
                    min="1"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.capacity">{{ errors.capacity }}</div>
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
                  <label for="address" class="form-label fw-semibold">Address</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.address }"
                    id="address"
                    v-model="form.address"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.address">{{ errors.address }}</div>
                </div>

                <div class="col-md-4">
                  <label for="city" class="form-label fw-semibold">City</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.city }"
                    id="city"
                    v-model="form.city"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.city">{{ errors.city }}</div>
                </div>

                <div class="col-md-4">
                  <label for="state" class="form-label fw-semibold">State</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.state }"
                    id="state"
                    v-model="form.state"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.state">{{ errors.state }}</div>
                </div>

                <div class="col-md-4">
                  <label for="zipCode" class="form-label fw-semibold">ZIP Code</label>
                  <input
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.zipCode }"
                    id="zipCode"
                    v-model="form.zipCode"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.zipCode">{{ errors.zipCode }}</div>
                </div>

                <div class="col-md-6">
                  <label for="phone" class="form-label fw-semibold">Phone</label>
                  <input
                    type="tel"
                    class="form-control"
                    :class="{ 'is-invalid': errors.phone }"
                    id="phone"
                    v-model="form.phone"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.phone">{{ errors.phone }}</div>
                </div>

                <div class="col-md-6">
                  <label for="email" class="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email }"
                    id="email"
                    v-model="form.email"
                    required
                  >
                  <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
                </div>

                <div class="col-12">
                  <label for="website" class="form-label fw-semibold">Website (Optional)</label>
                  <input
                    type="url"
                    class="form-control"
                    id="website"
                    v-model="form.website"
                    placeholder="https://"
                  >
                </div>

                <div class="col-12">
                  <label for="amenities" class="form-label fw-semibold">Amenities</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="newAmenity"
                      placeholder="Add amenity (e.g., WiFi, Parking, AC)"
                      @keyup.enter="addAmenity"
                    >
                    <button type="button" class="btn btn-outline-success" @click="addAmenity">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  <div class="mt-2" v-if="form.amenities.length > 0">
                    <span v-for="(amenity, index) in form.amenities" :key="`form-amenity-${index}`" 
                          class="badge bg-success me-2 mb-2">
                      {{ amenity }}
                      <button type="button" class="btn-close btn-close-white ms-2" 
                              @click="removeAmenity(index)" style="font-size: 0.7em;"></button>
                    </span>
                  </div>
                  <small class="text-muted">Press Enter or click + to add amenities</small>
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
                {{ loading ? 'Saving...' : 'Save Venue' }}
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
import { venueService } from '../services/venueService';
import { db } from '../services/database';
import type { Venue, VenueFormData } from '../types/venue';

const venues = ref<Venue[]>([]);
const editingVenue = ref<Venue | null>(null);
const loading = ref(false);
const saveError = ref('');
const newAmenity = ref('');

const form = reactive<VenueFormData>({
  name: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  email: '',
  website: '',
  description: '',
  capacity: 1,
  amenities: []
});

const errors = reactive({
  name: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  phone: '',
  email: '',
  description: '',
  capacity: ''
});

const loadVenues = async () => {
  const currentUser = db.getCurrentUser();
  if (currentUser) {
    venues.value = await venueService.getVenuesByUser(currentUser.username);
  }
};

const resetForm = () => {
  Object.assign(form, {
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    capacity: 1,
    amenities: []
  });
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  saveError.value = '';
  editingVenue.value = null;
};

const showCreateModal = () => {
  resetForm();
  const modal = new (window as any).bootstrap.Modal(document.getElementById('venueModal'));
  modal.show();
};

const editVenue = (venue: Venue) => {
  editingVenue.value = venue;
  Object.assign(form, {
    name: venue.name,
    address: venue.address,
    city: venue.city,
    state: venue.state,
    zipCode: venue.zipCode,
    phone: venue.phone,
    email: venue.email,
    website: venue.website || '',
    description: venue.description,
    capacity: venue.capacity,
    amenities: [...venue.amenities]
  });
  
  const modal = new (window as any).bootstrap.Modal(document.getElementById('venueModal'));
  modal.show();
};

const addAmenity = () => {
  if (newAmenity.value.trim() && !form.amenities.includes(newAmenity.value.trim())) {
    form.amenities.push(newAmenity.value.trim());
    newAmenity.value = '';
  }
};

const removeAmenity = (index: number) => {
  form.amenities.splice(index, 1);
};

const validateForm = (): boolean => {
  let isValid = true;
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = '';
  });
  
  if (!form.name.trim()) {
    errors.name = 'Venue name is required';
    isValid = false;
  }
  
  if (!form.address.trim()) {
    errors.address = 'Address is required';
    isValid = false;
  }
  
  if (!form.city.trim()) {
    errors.city = 'City is required';
    isValid = false;
  }
  
  if (!form.state.trim()) {
    errors.state = 'State is required';
    isValid = false;
  }
  
  if (!form.zipCode.trim()) {
    errors.zipCode = 'ZIP code is required';
    isValid = false;
  }
  
  if (!form.phone.trim()) {
    errors.phone = 'Phone is required';
    isValid = false;
  }
  
  if (!form.email.trim()) {
    errors.email = 'Email is required';
    isValid = false;
  }
  
  if (!form.description.trim()) {
    errors.description = 'Description is required';
    isValid = false;
  }
  
  if (form.capacity < 1) {
    errors.capacity = 'Capacity must be at least 1';
    isValid = false;
  }
  
  return isValid;
};

const saveVenue = async () => {
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
    if (editingVenue.value) {
      result = await venueService.updateVenue(editingVenue.value._id!, form);
    } else {
      result = await venueService.createVenue(form, currentUser.username);
    }
    
    if (result.success) {
      await loadVenues();
      const modal = (window as any).bootstrap.Modal.getInstance(document.getElementById('venueModal'));
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

const deleteVenue = async (venue: Venue) => {
  if (confirm(`Are you sure you want to delete "${venue.name}"?`)) {
    const result = await venueService.deleteVenue(venue._id!);
    if (result.success) {
      await loadVenues();
    } else {
      alert(result.message);
    }
  }
};

onMounted(loadVenues);
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

.amenities-section {
  margin-top: 0.5rem;
}

.badge {
  font-weight: 500;
  letter-spacing: 0.025em;
}

/* Ensure badges are properly sized and spaced */
.badge.bg-success.bg-opacity-10 {
  background-color: rgba(25, 135, 84, 0.1) !important;
  color: #198754 !important;
  border: 1px solid rgba(25, 135, 84, 0.25) !important;
}

/* Fix for small screens */
@media (max-width: 576px) {
  .amenities-section .badge {
    font-size: 0.7rem !important;
    margin-bottom: 0.25rem;
  }
}
</style>