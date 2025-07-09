<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="text-center mb-5">
          <h1 class="display-4 fw-bold text-primary mb-3">
            <i class="bi bi-file-text me-3"></i>
            Terms of Service
          </h1>
          <p class="lead text-muted">
            Please read these terms carefully before using {{ brandName }}
          </p>
        </div>

        <div class="card shadow-lg border-0 mb-5">
          <div class="card-body p-5">
            <h2 class="h4 text-primary mb-4">1. Acceptance of Terms</h2>
            <p class="mb-4">
              By accessing and using {{ brandName }}, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 class="h4 text-primary mb-4">2. Use License</h2>
            <p class="mb-4">
              Permission is granted to temporarily download one copy of {{ brandName }} for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul class="mb-4">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained in {{ brandName }}</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h2 class="h4 text-primary mb-4">3. Data Storage</h2>
            <p class="mb-4">
              All user data is stored locally in your browser using PouchDB. We do not collect, store, or transmit any personal information to external servers. You are responsible for backing up your data.
            </p>

            <h2 class="h4 text-primary mb-4">4. Privacy</h2>
            <p class="mb-4">
              Your privacy is important to us. Since all data is stored locally in your browser, we have no access to your personal information, venue data, or activity information.
            </p>

            <h2 class="h4 text-primary mb-4">5. Disclaimer</h2>
            <p class="mb-4">
              The materials in {{ brandName }} are provided on an 'as is' basis. Launch Software makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 class="h4 text-primary mb-4">6. Limitations</h2>
            <p class="mb-4">
              In no event shall Launch Software or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use {{ brandName }}, even if Launch Software or its authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 class="h4 text-primary mb-4">7. Accuracy of Materials</h2>
            <p class="mb-4">
              The materials appearing in {{ brandName }} could include technical, typographical, or photographic errors. Launch Software does not warrant that any of the materials are accurate, complete, or current.
            </p>

            <h2 class="h4 text-primary mb-4">8. Links</h2>
            <p class="mb-4">
              Launch Software has not reviewed all of the sites linked to our application and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Launch Software of the site.
            </p>

            <h2 class="h4 text-primary mb-4">9. Modifications</h2>
            <p class="mb-4">
              Launch Software may revise these terms of service at any time without notice. By using {{ brandName }}, you are agreeing to be bound by the then current version of these terms of service.
            </p>

            <h2 class="h4 text-primary mb-4">10. Governing Law</h2>
            <p class="mb-4">
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>

            <div class="alert alert-info mt-5">
              <i class="bi bi-info-circle me-2"></i>
              <strong>Last Updated:</strong> January 2025
            </div>
          </div>
        </div>

        <div class="text-center">
          <router-link to="/" class="btn btn-primary">
            <i class="bi bi-house me-2"></i>
            Return to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '../services/database';

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
.card {
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
}

ul {
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>