<template>
  <section class="archipelago-section">
    <div class="background-container">
      <!-- Background Image with Gradient Overlay -->
      <div class="background-image" />
      <div class="gradient-overlay" />
    </div>

    <div class="content-container">
      <!-- Flower Logo -->
      <img src="/images/flower-white.svg" :alt="flowerLogoAlt" class="flower-logo" />

      <!-- Main Title -->
      <h2 class="main-title">
        {{ title }}
      </h2>

      <!-- Description -->
      <p class="description">
        <span class="description-highlight">{{ descriptionHighlight }}</span> {{ }}
        <span class="description-muted">{{ descriptionMuted }}</span>
      </p>

      <!-- Company Logos and Details -->
      <div class="companies-container">
        <!-- Kristalin -->
        <div class="company-card">
          <img src="/images/logo-kristalin.svg" :alt="kristalinLogoAlt" class="company-logo" />
          <p class="company-description">
            <span class="company-description-highlight">{{ kristalinDescriptionHighlight }}</span> {{ }}
            <span class="company-description-muted"> {{ kristalinDescriptionMuted }}</span>
          </p>
        </div>

        <!-- Atrina -->
        <div class="company-card">
          <img src="/images/logo-atrina.svg" :alt="atrinaLogoAlt" class="company-logo" />
          <p class="company-description">
            <span class="company-description-highlight">{{ atrinaDescriptionHighlight }}</span> {{ }}
            <span class="company-description-muted"> {{ atrinaDescriptionMuted }}</span>
          </p>
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
const flowerLogoAlt = computed(() => t('archipelago.flowerLogo.alt'))
const title = computed(() => t('archipelago.title'))
const descriptionHighlight = computed(() => t('archipelago.description.highlight'))
const descriptionMuted = computed(() => t('archipelago.description.muted'))

const kristalinLogoAlt = computed(() => t('archipelago.companies.kristalin.alt'))
const kristalinDescriptionHighlight = computed(() => t('archipelago.companies.kristalin.descriptionHighlight'))
const kristalinDescriptionMuted = computed(() => t('archipelago.companies.kristalin.descriptionMuted'))

const atrinaLogoAlt = computed(() => t('archipelago.companies.atrina.alt'))
const atrinaDescriptionHighlight = computed(() => t('archipelago.companies.atrina.descriptionHighlight'))
const atrinaDescriptionMuted = computed(() => t('archipelago.companies.atrina.descriptionMuted'))
</script>

<style scoped>
/* ==================== Section Container ==================== */
.archipelago-section {
  @apply relative w-full overflow-hidden;
  height: auto;
}

/* ==================== Background ==================== */
.background-container {
  @apply absolute inset-0 w-full h-full;
}

.background-image {
  @apply absolute inset-0 w-full h-full;
  background-image: url('/images/bg-hero-2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.gradient-overlay {
  @apply absolute inset-0 w-full h-full;
  background: linear-gradient(to bottom,
      rgba(32, 34, 32, 0.4) 0%,
      rgba(32, 34, 32, 0.8) 40%,
      rgba(32, 34, 32, 0.8) 50%,
      rgba(32, 34, 32, 1) 80%,
      #202220 100%);
}

/* ==================== Content Container ==================== */
.content-container {
  @apply relative z-10 flex flex-col items-center;
  @apply px-4 xl:px-8 py-12 xl:py-32;
  @apply max-w-[1536px] mx-auto;
}

/* ==================== Flower Logo ==================== */
.flower-logo {
  @apply w-16 h-16 xl:w-24 xl:h-24 mb-6 xl:mb-8;
}

/* ==================== Main Title ==================== */
.main-title {
  @apply font-trajan font-bold text-2xl xl:text-6xl text-center;
  @apply mb-6 xl:mb-8 uppercase;
  color: #CEB08A;
  line-height: 1.2;
}

/* ==================== Description ==================== */
.description {
  @apply font-assistant font-normal text-sm xl:text-xl text-center;
  @apply mb-48 xl:mb-56 max-w-4xl;
}

.description-highlight {
  color: #EBDFCC;
}

.description-muted {
  color: rgba(235, 223, 204, 0.6);
}

/* ==================== Companies Container ==================== */
.companies-container {
  @apply w-full flex flex-col xl:flex-row gap-8 xl:gap-12;
  @apply items-center xl:items-start justify-between max-w-6xl;
}

/* ==================== Company Card ==================== */
.company-card {
  @apply flex flex-row xl:flex-col items-center gap-4;
  @apply w-full xl:w-1/2 max-w-md;
}

.company-logo {
  @apply w-full max-w-[100px] xl:max-w-[140px] h-auto;
}

.company-description {
  @apply font-assistant font-normal text-xs xl:text-base text-left;
  line-height: 1.6;
}

.company-description-highlight {
  color: #EBDFCC;
}

.company-description-muted {
  color: rgba(235, 223, 204, 0.6);
}
</style>
