<template>
  <section class="how-to-purchase-section">
    <!-- Background Images -->
    <div class="background-radial" />
    <div class="background-flower" />

    <div class="content-container">
      <!-- Main Title -->
      <h2 class="main-title">
        {{ title }}
      </h2>

      <!-- Description -->
      <p class="description">
        {{ description }}
      </p>

      <!-- Steps List -->
      <ol class="steps-container">
        <li v-for="(step, index) in steps" :key="step.id" class="step-item-wrapper">
          <!-- Step Card -->
          <div class="step-card">
            <!-- Flower Icon -->
            <div class="flower-icon-wrapper">
              <img src="/images/flower.svg" :alt="step.iconAlt" class="flower-icon" />
            </div>

            <!-- Step Content -->
            <div class="step-content">
              <h3 class="step-title">
                {{ step.number }}. {{ step.title }}
              </h3>
              <p class="step-description">
                {{ step.description }}
              </p>
            </div>
          </div>

          <!-- Separator Arrow (not shown after last item) -->
          <div v-if="index < steps.length - 1" class="separator-wrapper">
            <div class="separator-icon">
              <!-- Double Chevron SVG -->
              <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4L16 12L8 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
                <path d="M4 4L12 12L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </li>
      </ol>
    </div>

    <!-- Hand Image -->
    <img src="/images/hand.png" :alt="handImageAlt" class="hand-image" />
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Computed Properties ====================
const title = computed(() => t('howToPurchase.title'))
const description = computed(() => t('howToPurchase.description'))
const handImageAlt = computed(() => t('howToPurchase.handImage.alt'))

const steps = computed(() => [
  {
    id: 1,
    number: 1,
    iconAlt: t('howToPurchase.steps.1.iconAlt'),
    title: t('howToPurchase.steps.1.title'),
    description: t('howToPurchase.steps.1.description')
  },
  {
    id: 2,
    number: 2,
    iconAlt: t('howToPurchase.steps.2.iconAlt'),
    title: t('howToPurchase.steps.2.title'),
    description: t('howToPurchase.steps.2.description')
  },
  {
    id: 3,
    number: 3,
    iconAlt: t('howToPurchase.steps.3.iconAlt'),
    title: t('howToPurchase.steps.3.title'),
    description: t('howToPurchase.steps.3.description')
  },
  {
    id: 4,
    number: 4,
    iconAlt: t('howToPurchase.steps.4.iconAlt'),
    title: t('howToPurchase.steps.4.title'),
    description: t('howToPurchase.steps.4.description')
  }
])
</script>

<style scoped>
/* ==================== Section Container ==================== */
.how-to-purchase-section {
  @apply relative w-full overflow-hidden;
  @apply pt-20 pb-60 xl:pt-40 xl:pb-96;
  background-color: #EBDFCC;
}

/* ==================== Background Images ==================== */
.background-radial {
  @apply absolute inset-0 w-full h-full;
  background-image: url('/images/bg-radial-gradient.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.background-flower {
  @apply absolute inset-0 w-full h-full hidden xl:block;
  background-image: url('/images/bg-flower.png');
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.2;
  z-index: 2;
}

/* ==================== Content Container ==================== */
.content-container {
  @apply relative z-10 flex flex-col items-center;
  @apply px-4 xl:px-8;
  @apply max-w-[1536px] mx-auto;
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
  @apply font-assistant font-normal text-base xl:text-2xl text-center;
  @apply mb-20 xl:mb-24 max-w-3xl xl:max-w-5xl;
  color: #000000;
}

/* ==================== Steps Container ==================== */
.steps-container {
  @apply w-full flex flex-col xl:grid xl:grid-cols-4 gap-11 xl:gap-0;
  @apply max-w-[1536px];
  list-style: none;
  padding: 0;
  margin: 0;
}

/* ==================== Step Item Wrapper ==================== */
.step-item-wrapper {
  @apply flex flex-col xl:flex-row items-center;
}

/* ==================== Step Card ==================== */
.step-card {
  @apply relative w-full h-full flex flex-col items-center;
  @apply p-6 xl:p-4;
  @apply rounded-lg xl:rounded-xl;
  border: 1px solid #A56D2B;
  background-color: rgba(235, 223, 204, 0.6);
  backdrop-filter: blur(4px);
}

/* ==================== Flower Icon ==================== */
.flower-icon-wrapper {
  @apply absolute -top-11 left-1/2 -translate-x-1/2;
  @apply w-24 h-24;
  @apply flex items-center justify-center;
  @apply rounded-full;
  border: 7px solid #BF9F78;
  background-color: #EBDFCC;
  z-index: 10;
}

.flower-icon {
  @apply w-14 h-14;
}

/* ==================== Step Content ==================== */
.step-content {
  @apply w-full h-full flex flex-col items-center text-center py-12;
  @apply mt-4;
}

.step-title {
  @apply font-trajan font-bold text-xl xl:text-xl uppercase underline;
  @apply mb-4;
  color: #173760;
  line-height: 1.3;
}

.step-description {
  @apply font-assistant font-normal text-lg xl:text-base text-left opacity-75;
  color: #173760;
}

/* ==================== Separator ==================== */
.separator-wrapper {
  @apply flex items-center justify-center;
  @apply my-4 xl:mx-4;
}

.separator-icon {
  @apply w-12 h-12;
  @apply flex items-center justify-center;
  @apply rounded-full;
  border: 0.5px solid #A56D2B;
  background-color: rgba(235, 223, 204, 0.8);
  z-index: 5;
}

.chevron-icon {
  @apply w-6 h-6;
  @apply rotate-90 xl:rotate-0 opacity-75;
  color: #A56D2B;
}

/* ==================== Hand Image ==================== */
.hand-image {
  @apply absolute bottom-0 left-1/2 -translate-x-1/2;
  @apply w-full h-auto xl:w-[700px];
  @apply pointer-events-none;
  z-index: 3;
}
</style>
