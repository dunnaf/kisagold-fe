<template>
  <section class="hero-section">
    <!-- Background Images -->
    <div class="absolute inset-0">
      <!-- Mobile Background -->
      <img :src="images.mobile" :alt="t('productList.hero.images.background')" class="hero-bg-image xl:hidden" />

      <!-- Desktop Background -->
      <img :src="images.desktop" :alt="t('productList.hero.images.background')" class="hero-bg-image hidden xl:block" />
    </div>

    <!-- Gradient Overlay -->
    <div class="gradient-overlay xl:hidden" />
    <div class="gradient-overlay-desktop hidden xl:block" />

    <!-- Content -->
    <div class="relative h-full px-4 xl:px-8">
      <div class="content-container">
        <div class="content-wrapper">
          <!-- Hero Title -->
          <h1 class="hero-title">
            {{ t('productList.hero.title') }}
          </h1>

          <!-- Hero Description -->
          <p class="hero-description">
            {{ t('productList.hero.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Configuration ====================
const images = {
  mobile: '/images/pl-hero-bg-mobile.png',
  desktop: '/images/pl-hero-bg-desktop.png'
}
</script>

<style scoped>
/* ==================== Hero Section ==================== */
.hero-section {
  @apply relative overflow-hidden bg-[#050401] h-[350px] xl:h-[700px];
}

/* ==================== Background Image ==================== */
.hero-bg-image {
  @apply w-full h-full object-cover;
}

.hero-bg-image.xl\:hidden {
  object-position: 70%;
}

.hero-bg-image.xl\:block {
  object-position: 20vw;
}

/* ==================== Gradient Overlay ==================== */
.gradient-overlay {
  @apply absolute w-full h-full;
  background: linear-gradient(to right, rgba(5, 4, 1, 1) 15%, rgba(5, 4, 1, 0.5) 50%, rgba(5, 4, 1, 0.2) 100%);
}

.gradient-overlay-desktop {
  @apply absolute w-full h-full;
  background: linear-gradient(to right, rgba(5, 4, 1, 1) 15%, rgba(5, 4, 1, 0.5) 30%, rgba(5, 4, 1, 0) 100%);
}

/* ==================== Content Layout ==================== */
.content-container {
  @apply max-w-[1536px] mx-auto h-full;
}

.content-wrapper {
  @apply flex flex-col justify-end xl:justify-center h-full pb-6 xl:pb-0;
}

/* ==================== Typography ==================== */
.hero-title {
  @apply font-trajan font-bold text-2xl xl:text-6xl leading-[1.2];
  @apply mb-4 xl:mb-8 xl:max-w-4xl text-left;
  @apply text-white xl:text-[#D0BA8E];
}

.hero-description {
  @apply font-assistant font-normal text-base xl:text-xl;
  @apply leading-5 xl:leading-8 xl:max-w-3xl text-left text-white;
}
</style>
