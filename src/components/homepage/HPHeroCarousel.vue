<template>
  <section class="hero-carousel">
    <!-- Carousel Slides -->
    <div class="carousel-container">
      <!-- Background Images with Fade Transition -->
      <transition name="fade" mode="out-in">
        <div :key="currentSlide" class="carousel-slide">
          <img :src="currentSlideData.bgImage" :alt="currentSlideData.title" class="bg-image" />
        </div>
      </transition>

      <!-- Bottom Text Section with Slide Animation -->
      <transition name="slide-fade" mode="out-in">
        <div :key="currentSlide" class="bottom-section">
          <!-- Gradient Overlay -->
          <div class="gradient-overlay" :style="{ background: currentSlideData.gradientBg }" />

          <!-- Content -->
          <div class="content-container">
            <div class="content-wrapper">
              <!-- Product Image (only for slide with product) -->
              <div v-if="currentSlideData.productImage" class="product-image-wrapper">
                <img :src="currentSlideData.productImage" :alt="currentSlideData.title" class="product-image" />
              </div>

              <!-- Text Content -->
              <div class="text-content">
                <div class="text-content-wrapper">
                  <!-- Title -->
                  <h1 class="carousel-title" :style="{ color: currentSlideData.titleColor }">
                    {{ currentSlideData.title }}
                  </h1>

                  <!-- Price -->
                  <p class="carousel-price">
                    {{ currentSlideData.price }}
                  </p>
                </div>

                <!-- Description -->
                <p class="carousel-description">
                  {{ currentSlideData.description }}
                </p>

                <!-- CTA Button -->
                <button class="cta-button" :style="{
                  backgroundColor: currentSlideData.buttonBg,
                  color: currentSlideData.buttonTextColor
                }" :aria-label="`${currentSlideData.buttonText} - ${currentSlideData.title}`">
                  {{ currentSlideData.buttonText }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Carousel Indicators -->
    <div class="carousel-indicators">
      <button v-for="(slide, index) in slides" :key="index" :class="['indicator', { active: currentSlide === index }]"
        @click="goToSlide(index)" :aria-label="t('heroCarousel.navigation.goToSlide', { number: index + 1 })" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

// ==================== i18n ====================
const { t } = useI18n()

// ==================== Configuration ====================
const AUTOPLAY_INTERVAL = 5000 // 5 seconds
const SLIDES_CONFIG = [
  {
    bgImage: '/images/homepage-carousel-1.jpg',
    productImage: '/images/dummy-product-image.png',
    gradientBg: 'linear-gradient(to top, rgba(23, 55, 96, 1) 0%, rgba(23, 55, 96, 1) 40%, rgba(23, 55, 96, 0) 80%)',
    titleColor: '#CEB08A',
    buttonBg: '#CEB08A',
    buttonTextColor: '#FCFDF5'
  },
  {
    bgImage: '/images/homepage-carousel-2.jpg',
    productImage: '/images/dummy-product-image.png',
    gradientBg: 'linear-gradient(to top, rgba(41, 32, 16, 1) 0%, rgba(41, 32, 16, 1) 40%, rgba(41, 32, 16, 0) 80%)',
    titleColor: '#FCFDF5',
    buttonBg: '#173760',
    buttonTextColor: '#FCFDF5'
  },
  {
    bgImage: '/images/homepage-carousel-3.png',
    productImage: '/images/dummy-product-image.png',
    gradientBg: 'linear-gradient(to top, rgba(193, 154, 107, 1) 0%, rgba(193, 154, 107, 1) 40%, rgba(193, 154, 107, 0) 80%)',
    titleColor: '#FCFDF5',
    buttonBg: '#173760',
    buttonTextColor: '#FCFDF5'
  }
]

// ==================== State ====================
const currentSlide = ref(0)
let autoPlayInterval = null

// ==================== Computed ====================
const slides = computed(() => SLIDES_CONFIG)

const currentSlideData = computed(() => {
  const slideConfig = slides.value[currentSlide.value]
  return {
    ...slideConfig,
    title: t('heroCarousel.slides.goldenBond.title'),
    price: t('heroCarousel.slides.goldenBond.price'),
    description: t('heroCarousel.slides.goldenBond.description'),
    buttonText: t('heroCarousel.slides.goldenBond.buttonText')
  }
})

// ==================== Carousel Methods ====================
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
  resetAutoPlay()
}

const resetAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
  startAutoPlay()
}

const startAutoPlay = () => {
  autoPlayInterval = setInterval(() => {
    nextSlide()
  }, AUTOPLAY_INTERVAL)
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

// ==================== Lifecycle Hooks ====================
onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
/* ==================== Hero Carousel Container ==================== */
.hero-carousel {
  @apply relative overflow-hidden;
  @apply h-screen;
  background: #EBDFCC;
}

.carousel-container {
  @apply relative w-full h-full;
}

/* ==================== Carousel Slide ==================== */
.carousel-slide {
  @apply absolute inset-0 w-full h-full;
}

.carousel-slide::after {
  content: '';
  @apply absolute inset-0;
  @apply bg-black bg-opacity-20;
  @apply pointer-events-none;
}

.bg-image {
  @apply w-full h-full object-cover object-center;
}

/* ==================== Bottom Section ==================== */
.bottom-section {
  @apply absolute bottom-0 left-0 right-0;
  @apply h-auto xl:h-auto;
  @apply flex items-center justify-center;
}

.gradient-overlay {
  @apply absolute inset-0 pointer-events-none;
}

/* ==================== Content Layout ==================== */
.content-container {
  @apply relative z-10 h-full px-4 xl:px-8;
  @apply max-w-[1536px] mx-auto;
  @apply flex items-center justify-center;
}

.content-wrapper {
  @apply flex flex-col xl:flex-row items-center xl:items-center;
  @apply xl:gap-16;
  @apply pb-8 xl:pb-0;
  @apply pt-12 xl:pt-0;
  @apply w-full;
  @apply justify-center;
}

/* ==================== Product Image ==================== */
.product-image-wrapper {
  @apply flex-shrink-0;
  @apply w-96 h-96 xl:w-[500px] xl:h-[500px] -mb-12 xl:-mb-16;
}

.product-image {
  @apply w-full h-full object-contain;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
  will-change: auto;
}

/* ==================== Text Content ==================== */
.text-content {
  @apply flex flex-col items-center xl:items-start;
  @apply text-center xl:text-left xl:-mb-16;
  @apply flex-1;
}

.text-content-wrapper {
  @apply flex flex-col xl:flex-row xl:items-center xl:gap-4;
  @apply text-center xl:text-left xl:mb-2;
  @apply flex-1;
}

/* ==================== Typography ==================== */
.carousel-title {
  @apply font-trajan font-bold;
  @apply text-4xl xl:text-5xl;
  transition: color 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-price {
  @apply font-assistant font-semibold;
  @apply text-2xl;
  @apply mb-3 xl:mb-0;
  @apply text-white;
}

.carousel-description {
  @apply font-assistant font-normal;
  @apply text-base xl:text-xl;
  @apply mb-6 xl:mb-8;
  @apply max-w-2xl;
  @apply opacity-60 leading-5 xl:leading-6;
  color: #FCFDF5;
}

/* ==================== CTA Button ==================== */
.cta-button {
  @apply font-trajan font-bold;
  @apply text-base xl:text-base;
  @apply px-8 xl:px-12 py-3 xl:py-4;
  @apply rounded-full;
  @apply transition-all duration-300;
  @apply hover:scale-105 active:scale-95;
  transition: background-color 500ms cubic-bezier(0.4, 0, 0.2, 1),
    color 500ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-button:hover {
  @apply shadow-lg;
  filter: brightness(0.9);
}

/* ==================== Carousel Indicators ==================== */
.carousel-indicators {
  @apply absolute z-20;
  @apply hidden xl:flex;
  @apply bottom-8 left-8;
  @apply flex-row gap-2;
}

.indicator {
  @apply w-3 h-3;
  @apply rounded-full;
  @apply transition-all duration-300;
  @apply bg-white bg-opacity-50;
  @apply cursor-pointer;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.indicator.active {
  @apply bg-opacity-100;
  background-color: #CEB08A;
}

.indicator:hover {
  @apply bg-opacity-75;
}

/* ==================== Animations ==================== */
/* Fade Transition (Background) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Slide Fade Transition (Bottom Section) */
.slide-fade-enter-active {
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transition-delay: 0.3s;
  will-change: transform, opacity;
}

.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  will-change: transform, opacity;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translate3d(0, 50px, 0);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
</style>
