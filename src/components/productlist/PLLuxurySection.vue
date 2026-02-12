<template>
  <section class="relative overflow-hidden luxury-section bg-[#050401]">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img :src="backgroundImage" :alt="t('productList.luxury.images.background')"
        class="w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-black opacity-30" />
    </div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 gradient-overlay" />

    <!-- Content -->
    <div class="relative h-full px-4 xl:px-8">
      <div class="max-w-[1536px] mx-auto h-full">
        <div class="flex flex-col justify-end h-full pb-8 xl:pb-16">
          <!-- Brand Title -->
          <h2 class="luxury-brand">
            {{ t('productList.luxury.brand') }}
          </h2>

          <!-- Section Title -->
          <h3 class="luxury-title mb-4">
            {{ t('productList.luxury.title') }}
          </h3>

          <!-- Description -->
          <p class="luxury-description xl:max-w-3xl">
            {{ t('productList.luxury.description') }}
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
const backgroundImage = '/images/pl-hero-2-bg.jpg'
</script>

<style scoped>
/* ==================== Section Height ==================== */
.luxury-section {
  height: 100vh;
}

/* ==================== Gradient Overlay ==================== */
.gradient-overlay {
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 1) 90%);
}

/* ==================== Typography Classes ==================== */
.luxury-brand {
  @apply font-trajan font-bold text-2xl xl:text-4xl;
  color: #D0BA8E;
  text-align: left;
}

.luxury-title {
  @apply font-trajan font-bold text-xl xl:text-3xl;
  color: #D0BA8E;
  text-align: left;
}

.luxury-description {
  @apply font-assistant font-normal text-sm xl:text-base;
  color: #FFFFFF;
  text-align: left;
}
</style>
