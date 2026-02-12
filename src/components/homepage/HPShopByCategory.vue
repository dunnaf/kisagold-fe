<template>
  <section class="shop-by-category">
    <div class="container">
      <!-- Text Section -->
      <div class="text-section">
        <img src="/images/flower.svg" :alt="t('shopByCategory.flowerAlt')" class="logo-flower" />
        <h2 class="section-title">{{ t('shopByCategory.title') }}</h2>
        <p class="section-description">
          {{ t('shopByCategory.description') }}
        </p>
      </div>

      <!-- Cards Section -->
      <div class="cards-section">
        <!-- Mobile Carousel -->
        <div class="mobile-carousel xl:hidden">
          <div class="carousel-wrapper">
            <div class="carousel-track" :style="carouselTransform">
              <div v-for="(card, index) in categoryCards" :key="index" class="carousel-slide">
                <div class="product-card" :style="{ backgroundImage: `url(${card.bgImage})` }">
                  <div class="card-content">
                    <h3 class="card-title">{{ card.title }}</h3>
                    <p class="card-description">{{ card.description }}</p>
                    <button class="card-button" @click="handleCardClick(card.type)">
                      {{ card.buttonText }}
                      <svg class="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Previous Arrow -->
            <button 
              class="carousel-arrow carousel-arrow-prev" 
              @click="prevSlide" 
              :disabled="isAtStart"
              :aria-label="t('shopByCategory.navigation.previous')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>

            <!-- Next Arrow -->
            <button 
              class="carousel-arrow carousel-arrow-next" 
              @click="nextSlide"
              :disabled="isAtEnd" 
              :aria-label="t('shopByCategory.navigation.next')">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Desktop Grid -->
        <div class="desktop-grid hidden xl:grid">
          <div 
            v-for="(card, index) in categoryCards" 
            :key="index" 
            class="product-card"
            :style="{ backgroundImage: `url(${card.bgImage})` }">
            <div class="card-content">
              <h3 class="card-title">{{ card.title }}</h3>
              <p class="card-description">{{ card.description }}</p>
              <button class="card-button" @click="handleCardClick(card.type)">
                {{ card.buttonText }}
                <svg class="arrow-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Configuration ====================
const CARD_WIDTH = 250 // Static card width in pixels
const CARD_GAP = 8 // Gap between cards in pixels
const CATEGORY_IMAGES = {
  classic99: '/images/pl-hero-bg-desktop.png',
  classic24k: '/images/pl-hero-bg-desktop.png',
  custom: '/images/pl-hero-bg-desktop.png',
  comingSoon: '/images/pl-hero-bg-desktop.png'
}

// ==================== State ====================
const currentIndex = ref(0)

// ==================== Computed ====================
const categoryCards = computed(() => [
  {
    type: 'classic99',
    title: t('shopByCategory.cards.classic99.title'),
    description: t('shopByCategory.cards.classic99.description'),
    buttonText: t('shopByCategory.cards.classic99.buttonText'),
    bgImage: CATEGORY_IMAGES.classic99
  },
  {
    type: 'classic24k',
    title: t('shopByCategory.cards.classic24k.title'),
    description: t('shopByCategory.cards.classic24k.description'),
    buttonText: t('shopByCategory.cards.classic24k.buttonText'),
    bgImage: CATEGORY_IMAGES.classic24k
  },
  {
    type: 'custom',
    title: t('shopByCategory.cards.custom.title'),
    description: t('shopByCategory.cards.custom.description'),
    buttonText: t('shopByCategory.cards.custom.buttonText'),
    bgImage: CATEGORY_IMAGES.custom
  },
  {
    type: 'comingSoon',
    title: t('shopByCategory.cards.comingSoon.title'),
    description: t('shopByCategory.cards.comingSoon.description'),
    buttonText: t('shopByCategory.cards.comingSoon.buttonText'),
    bgImage: CATEGORY_IMAGES.comingSoon
  }
])

const carouselTransform = computed(() => {
  const offset = currentIndex.value * (CARD_WIDTH + CARD_GAP)
  return { transform: `translateX(-${offset}px)` }
})

const isAtStart = computed(() => currentIndex.value === 0)

const isAtEnd = computed(() => currentIndex.value >= categoryCards.value.length - 1)

// ==================== Carousel Methods ====================
const nextSlide = () => {
  if (!isAtEnd.value) {
    currentIndex.value++
  }
}

const prevSlide = () => {
  if (!isAtStart.value) {
    currentIndex.value--
  }
}

// ==================== Card Click Handler ====================
const handleCardClick = (cardType) => {
  // TODO: Implement navigation or modal logic
  console.log(`Card clicked: ${cardType}`)
}
</script>

<style scoped>
/* ==================== Section Container ==================== */
.shop-by-category {
  @apply py-12 xl:py-20;
  @apply relative;
  background: #EBDFCC;
}

.shop-by-category::before {
  content: '';
  @apply absolute inset-0 pointer-events-none;
  @apply bg-center bg-no-repeat;
  @apply opacity-0 transition-opacity duration-300;
  background-image: url('/images/bg-flower.png');
  background-size: 70%;
}

@media (min-width: 1280px) {
  .shop-by-category::before {
    @apply opacity-20;
  }
}

.container {
  @apply max-w-[1536px] mx-auto flex flex-col xl:flex-row xl:items-start xl:gap-16;
  @apply px-4 xl:px-8;
}

/* ==================== Text Section ==================== */
.text-section {
  @apply xl:w-8/12 text-center xl:text-left mb-12 xl:mb-16;
  @apply max-w-4xl mx-auto;
}

.logo-flower {
  @apply w-20 h-20 xl:w-20 xl:h-20;
  @apply mx-auto xl:mx-0 mb-6;
}

.section-title {
  @apply font-trajan font-bold;
  @apply text-4xl xl:text-5xl;
  @apply mb-4 xl:mb-8;
  color: #173760;
}

.section-description {
  @apply font-assistant font-normal text-left;
  @apply text-base xl:text-lg;
  @apply leading-relaxed;
  color: #000000;
}

/* ==================== Cards Section ==================== */
.cards-section {
  @apply w-full;
}

/* ==================== Mobile Carousel ==================== */
.mobile-carousel {
  @apply relative;
}

.carousel-wrapper {
  @apply overflow-hidden relative;
}

.carousel-track {
  @apply flex gap-2;
  transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.carousel-slide {
  @apply flex-shrink-0;
  width: 250px;
}

.mobile-carousel .product-card {
  @apply w-full h-[300px];
}

/* ==================== Carousel Arrows ==================== */
.carousel-arrow {
  @apply absolute top-1/2 -translate-y-1/2 z-10;
  @apply w-12 h-12 rounded-full;
  @apply flex items-center justify-center;
  @apply cursor-pointer;
  background: rgba(38, 38, 38, 0.5);
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
}

.carousel-arrow:hover:not(:disabled) {
  @apply scale-110;
  background: #262626;
}

.carousel-arrow:disabled {
  @apply opacity-30 cursor-not-allowed;
}

.carousel-arrow-prev {
  @apply left-2;
}

.carousel-arrow-next {
  @apply right-2;
}

/* ==================== Desktop Grid ==================== */
.desktop-grid {
  @apply grid-cols-2 gap-6;
  @apply max-w-[960px] mx-auto;
}

.desktop-grid .product-card {
  @apply h-[500px];
}

/* ==================== Product Card ==================== */
.product-card {
  @apply relative rounded-lg overflow-hidden;
  @apply bg-cover bg-center;
  @apply cursor-pointer;
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card::before {
  content: '';
  @apply absolute inset-0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4), transparent);
  transition: opacity 300ms ease;
}

.product-card:hover {
  @apply xl:scale-[1.02];
}

.product-card:hover::before {
  opacity: 0.9;
}

/* ==================== Card Content ==================== */
.card-content {
  @apply absolute bottom-0 left-0 right-0;
  @apply p-3 xl:p-8;
  @apply z-10;
}

.card-title {
  @apply font-trajan font-bold;
  @apply text-lg xl:text-3xl;
  @apply mb-0 xl:mb-4;
  color: #CEB08A;
}

.card-description {
  @apply font-assistant font-normal;
  @apply text-sm xl:text-base;
  @apply mb-1 xl:mb-6 leading-5;
  @apply text-white opacity-80;
}

.card-button {
  @apply font-assistant font-semibold;
  @apply text-sm xl:text-base;
  @apply text-white;
  @apply flex items-center gap-2;
  transition: gap 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-button:hover {
  @apply gap-3;
}

.arrow-icon {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-button:hover .arrow-icon {
  @apply translate-x-1;
}

/* ==================== Responsive Adjustments ==================== */
@media (min-width: 1280px) {
  .shop-by-category {
    @apply py-24;
  }
}
</style>
