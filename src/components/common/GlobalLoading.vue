<template>
  <transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <!-- Background -->
      <div class="loading-gradient" />

      <!-- Loading Content -->
      <div class="loading-content">
        <!-- Logo -->
        <div class="logo-container">
          <img :src="logoSrc" alt="Kisagold" class="loading-logo" />
        </div>

        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${progress}%` }" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useLoading } from '@/composables/useLoading'

// ==================== Composables ====================
const { isLoading, progress } = useLoading()

// ==================== Computed ====================
const logoSrc = computed(() => '/images/logo-dark.png')

// ==================== Watchers ====================
watch(isLoading, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})
</script>

<style scoped>
/* ==================== Loading Overlay ==================== */
.loading-overlay {
  @apply fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden;
  perspective: 1000px;
}

/* ==================== Background ==================== */
.loading-gradient {
  @apply absolute inset-0;
  background: linear-gradient(135deg, #EBDFCC 0%, #F5EFE3 50%, #EBDFCC 100%);
}

/* ==================== Loading Content ==================== */
.loading-content {
  @apply relative z-10 flex flex-col items-center justify-center space-y-8;
}

/* ==================== Logo Styles ==================== */
.logo-container {
  @apply relative;
}

.loading-logo {
  @apply w-[200px] xl:w-[280px];
  filter: drop-shadow(0 10px 30px rgba(23, 55, 96, 0.15));
  /* Removed fadeIn animation - logo appears instantly */
}

/* ==================== Progress Bar ==================== */
.progress-container {
  @apply w-[280px] xl:w-[400px] space-y-3;
}

.progress-bar {
  @apply relative h-2 bg-white bg-opacity-30 rounded-full overflow-hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08);
}

.progress-fill {
  @apply absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out;
  background: linear-gradient(90deg, #D0BA8E 0%, #C4AD82 100%);
  box-shadow: 0 0 12px rgba(208, 186, 142, 0.4);
}

/* ==================== Animations ==================== */
/* No fade-in animation - loading appears instantly */

/* ==================== Fade Transition ==================== */
.fade-enter-active {
  /* No enter transition - appears immediately */
  transition: none;
}

.fade-leave-active {
  /* Only fade-out transition */
  transition: opacity 0.5s ease-out;
}

.fade-enter-from {
  /* Start fully visible */
  opacity: 1;
}

.fade-leave-to {
  /* End fully transparent */
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

</style>
