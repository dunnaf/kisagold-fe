<template>
  <section class="why-choose-section">
    <!-- Background -->
    <div class="background-image" />

    <div class="content-container">
      <!-- Flower Logo - Only visible on mobile -->
      <img src="/images/flower.svg" :alt="flowerLogoAlt" class="flower-logo xl:hidden" />

      <!-- Main Title -->
      <h2 class="main-title">
        {{ title }}
      </h2>

      <!-- Description -->
      <!-- <p class="description">
        {{ description }}
      </p> -->

      <!-- Features List -->
      <div class="features-container">
        <div v-for="feature in features" :key="feature.id" class="feature-item">
          <img :src="feature.icon" :alt="feature.iconAlt" class="feature-icon" />
          <div class="feature-content">
            <h3 class="feature-title">
              {{ feature.title }}
            </h3>
            <div class="feature-separator" />
            <p class="feature-description">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Computed Properties ====================
const flowerLogoAlt = computed(() => t('whyChoose.flowerLogo.alt'))
const title = computed(() => t('whyChoose.title'))
const description = computed(() => t('whyChoose.description'))

const features = computed(() => [
  {
    id: 1,
    icon: '/images/htp-list-1.svg',
    iconAlt: t('whyChoose.features.1.iconAlt'),
    title: t('whyChoose.features.1.title'),
    description: t('whyChoose.features.1.description')
  },
  {
    id: 2,
    icon: '/images/htp-list-2.svg',
    iconAlt: t('whyChoose.features.2.iconAlt'),
    title: t('whyChoose.features.2.title'),
    description: t('whyChoose.features.2.description')
  },
  {
    id: 3,
    icon: '/images/htp-list-3.svg',
    iconAlt: t('whyChoose.features.3.iconAlt'),
    title: t('whyChoose.features.3.title'),
    description: t('whyChoose.features.3.description')
  },
  {
    id: 4,
    icon: '/images/htp-list-4.svg',
    iconAlt: t('whyChoose.features.4.iconAlt'),
    title: t('whyChoose.features.4.title'),
    description: t('whyChoose.features.4.description')
  }
])
</script>

<style scoped>
/* ==================== Section Container ==================== */
.why-choose-section {
  @apply relative w-full overflow-hidden;
  @apply py-12 xl:py-20;
  background-color: #FCFDF5;
}

/* ==================== Background ==================== */
.background-image {
  @apply absolute inset-0 w-full h-full;
  background-image: url('/images/bg-radial-gradient.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* ==================== Content Container ==================== */
.content-container {
  @apply relative z-10 flex flex-col items-center;
  @apply px-4 xl:px-8;
  @apply max-w-[1536px] mx-auto;
}

/* ==================== Flower Logo ==================== */
.flower-logo {
  @apply w-24 h-24 mb-6;
}

/* ==================== Main Title ==================== */
.main-title {
  @apply font-trajan font-bold text-4xl xl:text-6xl text-center;
  @apply mb-6 xl:mb-8;
  color: #173760;
  line-height: 1.2;
}

/* ==================== Description ==================== */
.description {
  @apply font-assistant font-normal text-base xl:text-2xl xl:text-center;
  @apply mb-12 xl:mb-16 max-w-5xl;
  color: #000000;
}

/* ==================== Features Container ==================== */
.features-container {
  @apply w-full flex flex-col xl:grid xl:grid-cols-4 gap-8 xl:gap-12;
  @apply max-w-[1536px];
}

/* ==================== Feature Item ==================== */
.feature-item {
  @apply flex flex-col items-start;
}

.feature-icon {
  @apply w-12 h-12 xl:w-8 xl:h-8 mb-4 xl:mb-6;
}

.feature-content {
  @apply w-full flex flex-col items-start;
}

.feature-title {
  @apply font-trajan font-bold text-lg xl:text-xl text-left;
  @apply mb-3 xl:mb-4;
  color: #173760;
  line-height: 1.3;
}

.feature-separator {
  @apply w-full mb-3 xl:mb-4 xl:opacity-25;
  height: 1px;
  background-color: #000000;
}

.feature-description {
  @apply font-assistant font-normal text-sm xl:text-base text-left;
  color: #173760;
}
</style>
