<template>
  <section class="pd-hero-section">
    <!-- Header Spacer Overlay -->
    <div class="spacer-overlay" />

    <!-- Main Container -->
    <div class="container">
      <div class="content-wrapper">
        <PDImageView />
        <PDProductInfo />
      </div>
    </div>
  </section>
</template>

<script setup>
// ==================== Component Imports ====================
import PDImageView from './PDImageView.vue'
import PDProductInfo from './PDProductInfo.vue'
</script>

<style scoped>
/* ==================== Hero Section ==================== */
.pd-hero-section {
  @apply bg-[#EBDFCC] pb-10 xl:pb-[60px] min-h-screen;
}

/* ==================== Header Spacer Overlay ==================== */
.spacer-overlay {
  @apply fixed top-0 left-0 w-full h-[75px] xl:h-[94px];
  @apply bg-black opacity-50;
}

/* ==================== Container ==================== */
.container {
  @apply max-w-[1400px] mx-auto pt-[95px] pb-0 xl:pt-[140px] xl:pb-10;
}

/* ==================== Content Wrapper ==================== */
.content-wrapper {
  @apply grid grid-cols-1 xl:grid-cols-2 gap-[30px] xl:gap-[60px] items-start;
}
</style>
