<template>
  <div class="avatar-container" :class="sizeClass">
    <img 
      v-if="user?.avatar" 
      :src="`data:image/png;base64,${user.avatar}`" 
      :alt="`${user.firstName} ${user.lastName}`"
      class="avatar-image"
    />
    <div v-else class="avatar-placeholder" :style="{ fontSize: placeholderFontSize }">
      {{ getInitials() }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { User } from '../types/user';

interface Props {
  user: User | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
});

const sizeClass = computed(() => `avatar-${props.size}`);

const placeholderFontSize = computed(() => {
  switch (props.size) {
    case 'sm': return '0.75rem';
    case 'md': return '1rem';
    case 'lg': return '1.5rem';
    case 'xl': return '2rem';
    default: return '1rem';
  }
});

const getInitials = () => {
  if (!props.user) return '?';
  const first = props.user.firstName?.charAt(0) || '';
  const last = props.user.lastName?.charAt(0) || '';
  return (first + last).toUpperCase() || '?';
};
</script>