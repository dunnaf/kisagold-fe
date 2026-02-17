<template>
  <section class="recommended-section">
    <div class="container">
      <div class="content-wrapper">
        <div>
          <!-- Decorative Flower -->
          <div class="flower-icon">
            <img :src="flowerIcon" :alt="t('productDetail.recommended.flowerAlt')" />
          </div>

          <!-- Section Title -->
          <h2 class="section-title">{{ t('productDetail.recommended.title') }}</h2>
        </div>
        <!-- View All Button -->
        <div class="button-wrapper-desktop">
          <button class="view-all-btn" @click="goToProductList">
            {{ t('productDetail.recommended.viewAllButton') }}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>


      <!-- Desktop Carousel Version -->
      <div class="desktop-only">
        <div class="carousel-wrapper">
          <button class="carousel-btn prev-btn" :disabled="currentSlide === 0"
            :aria-label="t('productDetail.recommended.navigation.previous')" @click="prevSlide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>

          <div ref="carouselRef" class="carousel-container">
            <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * slideWidth}px)` }">
              <div v-for="product in recommendedProducts" :key="product.id" class="carousel-slide">
                <ProductCard :product="product" />
              </div>
            </div>
          </div>

          <button class="carousel-btn next-btn" :disabled="currentSlide >= maxSlide"
            :aria-label="t('productDetail.recommended.navigation.next')" @click="nextSlide">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Grid Version -->
      <div class="mobile-only">
        <div class="products-grid">
          <ProductCard v-for="product in recommendedProducts.slice(0, 3)" :key="product.id" :product="product" />
        </div>
      </div>

      <!-- View All Button -->
      <div class="button-wrapper-mobile">
        <button class="view-all-btn" @click="goToProductList">
          {{ t('productDetail.recommended.viewAllButton') }}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'
import ProductCard from '../common/ProductCard.vue'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Router ====================
const router = useRouter()

// ==================== Configuration ====================
const flowerIcon = '/images/flower.svg'
const CAROUSEL_GAP = 24 // Gap between carousel items in pixels
const MOBILE_DISPLAY_LIMIT = 3 // Number of products to show on mobile

// ==================== Carousel State ====================
const currentSlide = ref(0)
const carouselRef = ref(null)
const slideWidth = ref(0)
const itemsPerSlide = ref(3)

// ==================== Sample Data ====================
// TODO: Replace with actual API call or props
const recommendedProducts = ref([
  {
    id: 1,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png'
  },
  {
    id: 2,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png'
  },
  {
    id: 3,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png'
  },
  {
    id: 4,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png'
  },
  {
    id: 5,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png'
  },
  {
    id: 6,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png'
  }
])

// ==================== Computed ====================
const maxSlide = computed(() => {
  return Math.max(0, Math.ceil(recommendedProducts.value.length / itemsPerSlide.value) - 1)
})

// ==================== Carousel Methods ====================
const calculateSlideWidth = () => {
  if (carouselRef.value) {
    const containerWidth = carouselRef.value.offsetWidth
    slideWidth.value = containerWidth + CAROUSEL_GAP
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

const nextSlide = () => {
  if (currentSlide.value < maxSlide.value) {
    currentSlide.value++
  }
}

// ==================== Navigation Methods ====================
const goToProductList = () => {
  router.push('/products')
}

// ==================== Lifecycle Hooks ====================
onMounted(() => {
  calculateSlideWidth()
  window.addEventListener('resize', calculateSlideWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateSlideWidth)
})
</script>

<style scoped>
/* ==================== Section Container ==================== */
.recommended-section {
  @apply bg-[#EBDFCC] py-10 xl:py-20;
}

.container {
  @apply max-w-[1400px] mx-auto px-5 xl:px-10;
}

.content-wrapper {
  @apply flex flex-col xl:flex-row items-center xl:items-end mb-8 xl:mb-10;
  @apply w-full;
  @apply justify-between;
}

/* ==================== Decorative Flower ==================== */
.flower-icon {
  @apply w-full flex justify-center xl:justify-start mb-8 xl:mb-6;
}

.flower-icon img {
  @apply w-[100px] h-[100px];
}

/* ==================== Section Title ==================== */
.section-title {
  @apply font-trajan font-bold text-3xl xl:text-5xl text-center xl:text-left;
  @apply text-[#173760];
  letter-spacing: 0.05em;
}

/* ==================== Desktop Carousel ==================== */
.desktop-only {
  @apply hidden xl:block;
}

.carousel-wrapper {
  @apply relative flex items-center gap-4 mb-8 w-full;
}

.carousel-container {
  @apply flex-1 overflow-hidden;
  min-width: 0;
}

.carousel-track {
  @apply flex gap-6 transition-transform duration-500 ease-in-out;
  will-change: transform;
}

.carousel-slide {
  @apply flex-shrink-0;
  width: calc(33.333% - 16px);
  min-width: 0;
}

/* ==================== Carousel Buttons ==================== */
.carousel-btn {
  @apply flex items-center justify-center w-12 h-12 rounded-full;
  @apply bg-[#173760] text-white flex-shrink-0;
  @apply transition-all duration-300;
  @apply hover:bg-[#1f4978] focus:outline-none focus:ring-2 focus:ring-[#173760] focus:ring-offset-2;
  @apply disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#173760] disabled:pointer-events-none;
}

/* ==================== Mobile Grid ==================== */
.mobile-only {
  @apply block xl:hidden;
}

.products-grid {
  @apply grid grid-cols-1 gap-6 mb-8;
}

/* ==================== View All Button ==================== */
.button-wrapper-mobile {
  @apply flex justify-center mt-8 xl:mt-10 xl:hidden;
}

.button-wrapper-desktop {
  @apply justify-end hidden xl:flex;
}

.view-all-btn {
  @apply flex items-center justify-center gap-2;
  @apply px-8 py-3 xl:px-10 xl:py-4 rounded-full;
  @apply font-trajan font-bold text-sm xl:text-base;
  @apply text-[#FCFDF5] bg-[#173760];
  @apply transition-all duration-300;
  @apply hover:bg-[#1f4978] hover:scale-105;
  @apply active:scale-95;
  letter-spacing: 0.05em;
}

.view-all-btn svg {
  @apply w-5 h-5 transition-transform duration-300;
}

.view-all-btn:hover svg {
  @apply translate-x-1;
}
</style>
