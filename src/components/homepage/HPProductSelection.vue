<template>
  <section class="product-selection">
    <div class="container">
      <!-- Section Title -->
      <h2 class="section-title">
        {{ t('productSelection.title') }}
      </h2>

      <!-- Section Description -->
      <p class="section-description">
        {{ t('productSelection.description') }}
      </p>

      <!-- Category Tabs -->
      <div class="category-tabs-wrapper">
        <div class="category-tabs">
          <button v-for="category in categories" :key="category.id"
            :class="['category-tab', { active: activeCategory === category.id }]"
            :aria-label="`Filter by ${category.name}`" :aria-pressed="activeCategory === category.id"
            @click="setActiveCategory(category.id)">
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Desktop: Product Carousel -->
      <div class="products-carousel-wrapper">
        <!-- Navigation Arrows -->
        <button v-if="canScrollLeft" class="nav-arrow nav-arrow-left" @click="scrollLeft"
          aria-label="Previous products">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Products Container -->
        <div ref="productsContainer" class="products-container" @scroll="handleScroll">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" class="product-item" />
        </div>

        <button v-if="canScrollRight" class="nav-arrow nav-arrow-right" @click="scrollRight" aria-label="Next products">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <!-- View All Button -->
      <div class="button-wrapper">
        <button class="view-all-button" @click="goToProductList" aria-label="View all products">
          {{ t('productSelection.viewAllButton') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'
import ProductCard from '@/components/common/ProductCard.vue'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Router ====================
const router = useRouter()

// ==================== State ====================
const activeCategory = ref('classic-99')
const productsContainer = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

// ==================== Configuration ====================
const categories = computed(() => [
  {
    id: 'all',
    name: t('productSelection.categories.all')
  },
  {
    id: 'classic-99',
    name: t('productSelection.categories.classic99')
  },
  {
    id: 'classic-24k',
    name: t('productSelection.categories.classic24k')
  },
  {
    id: 'custom',
    name: t('productSelection.categories.custom')
  }
])

// ==================== Products Data ====================
// TODO: Replace with API call
const products = ref([
  {
    id: 1,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png',
    category: 'all'
  },
  {
    id: 2,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png',
    category: 'all'
  },
  {
    id: 3,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png',
    category: 'all'
  },
  {
    id: 4,
    name: 'KISA24 50GR',
    price: 131660700,
    image: '/images/dummy-product-image.png',
    category: 'classic-99'
  },
  {
    id: 5,
    name: 'KISA24 100GR',
    price: 263321400,
    image: '/images/dummy-product-image.png',
    category: 'classic-99'
  },
  {
    id: 6,
    name: 'KISA24 250GR',
    price: 658303500,
    image: '/images/dummy-product-image.png',
    category: 'classic-99'
  },
  {
    id: 7,
    name: 'KISA24 50GR 24K',
    price: 130000000,
    image: '/images/dummy-product-image.png',
    category: 'classic-24k'
  },
  {
    id: 8,
    name: 'KISA24 100GR 24K',
    price: 260000000,
    image: '/images/dummy-product-image.png',
    category: 'classic-24k'
  },
  {
    id: 9,
    name: 'KISA24 Custom Gift Set',
    price: 300000000,
    image: '/images/dummy-product-image.png',
    category: 'custom'
  },
  {
    id: 10,
    name: 'KISA24 Custom Hampers',
    price: 350000000,
    image: '/images/dummy-product-image.png',
    category: 'custom'
  }
])

// ==================== Computed ====================
const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products.value.filter(product => product.category === 'all')
  }
  return products.value.filter(product => product.category === activeCategory.value)
})

// ==================== Category Methods ====================
const setActiveCategory = (categoryId) => {
  activeCategory.value = categoryId
  resetScrollPosition()
  updateScrollButtons()
}

// ==================== Scroll Methods ====================
const resetScrollPosition = () => {
  if (productsContainer.value) {
    productsContainer.value.scrollLeft = 0
  }
}

const handleScroll = () => {
  updateScrollButtons()
}

const updateScrollButtons = () => {
  if (!productsContainer.value) return

  const container = productsContainer.value
  const scrollThreshold = 10

  canScrollLeft.value = container.scrollLeft > scrollThreshold
  canScrollRight.value =
    container.scrollLeft < container.scrollWidth - container.clientWidth - scrollThreshold
}

const scrollLeft = () => {
  if (!productsContainer.value) return

  const scrollAmount = productsContainer.value.clientWidth * 0.8
  productsContainer.value.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  })
}

const scrollRight = () => {
  if (!productsContainer.value) return

  const scrollAmount = productsContainer.value.clientWidth * 0.8
  productsContainer.value.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  })
}

// ==================== Navigation Methods ====================
const goToProductList = () => {
  router.push('/products')
}

// ==================== Lifecycle Hooks ====================
onMounted(() => {
  // Initialize scroll buttons after DOM is ready
  setTimeout(() => {
    updateScrollButtons()
  }, 100)

  // Listen to window resize events
  window.addEventListener('resize', updateScrollButtons)
})

onUnmounted(() => {
  // Cleanup event listeners
  window.removeEventListener('resize', updateScrollButtons)
})
</script>

<style scoped>
/* ==================== Section Container ==================== */
.product-selection {
  @apply py-12 xl:py-20;
  background: #EBDFCC;
}

.container {
  @apply max-w-[1536px] mx-auto px-4 xl:px-8;
}

/* ==================== Section Title ==================== */
.section-title {
  @apply font-trajan font-bold text-center;
  @apply text-3xl xl:text-6xl mb-6 xl:mb-8;
  color: #173760;
}

/* ==================== Section Description ==================== */
.section-description {
  @apply font-assistant font-normal text-left xl:text-center;
  @apply text-base xl:text-xl mb-8 xl:mb-12 mx-auto;
  @apply max-w-4xl xl:max-w-7xl;
  color: #000000;
  line-height: 1.6;
}

/* ==================== Category Tabs ==================== */
.category-tabs-wrapper {
  @apply mb-8 xl:mb-12;
}

.category-tabs {
  @apply flex gap-3 xl:gap-4;
  @apply overflow-x-auto xl:overflow-x-visible;
  @apply xl:flex-wrap xl:justify-center;
  @apply pb-2 xl:pb-0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tab {
  @apply font-trajan font-bold;
  @apply text-xs xl:text-base;
  @apply px-4 xl:px-8 py-2 xl:py-3.5;
  @apply rounded-full;
  @apply transition-all duration-300;
  @apply cursor-pointer;
  @apply flex-shrink-0 whitespace-nowrap;
  color: #173760;
  background: rgba(0, 0, 0, 0.1);
}

.category-tab:hover:not(.active) {
  background: rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.category-tab:active:not(.active) {
  transform: translateY(0);
}

.category-tab.active {
  color: #FFFFFF;
  background: #173760;
  box-shadow: 0 4px 12px rgba(23, 55, 96, 0.2);
}

/* ==================== Products Carousel ==================== */
.products-carousel-wrapper {
  @apply relative mb-8 xl:mb-12;
}

.products-container {
  @apply flex gap-4 xl:gap-6;
  @apply pb-4;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.products-container::-webkit-scrollbar {
  display: none;
}

/* Mobile: 2-column grid layout */
@media (max-width: 1199px) {
  .products-container {
    @apply grid grid-cols-2;
    @apply overflow-visible;
  }
}

/* Desktop: horizontal carousel with 3 visible items */
@media (min-width: 1200px) {
  .products-container {
    @apply flex-row;
    @apply overflow-x-auto;
  }

  .product-item {
    @apply flex-shrink-0;
    width: calc(33.333% - 16px);
  }
}

/* ==================== Navigation Arrows ==================== */
.nav-arrow {
  @apply hidden xl:flex;
  @apply absolute top-1/2 -translate-y-1/2;
  @apply w-12 h-12;
  @apply bg-white rounded-full;
  @apply items-center justify-center;
  @apply transition-all duration-300;
  @apply cursor-pointer;
  @apply shadow-md;
  color: #173760;
  z-index: 10;
}

.nav-arrow:hover {
  @apply shadow-lg;
  transform: translateY(-50%) scale(1.05);
}

.nav-arrow:active {
  transform: translateY(-50%) scale(0.95);
}

.nav-arrow-left {
  @apply -left-6;
}

.nav-arrow-right {
  @apply -right-6;
}

/* ==================== View All Button ==================== */
.button-wrapper {
  @apply flex justify-center;
}

.view-all-button {
  @apply font-trajan font-bold;
  @apply text-base xl:text-base;
  @apply px-8 xl:px-12 py-3 xl:py-4;
  @apply rounded-full;
  @apply transition-all duration-300;
  color: #FCFDF5;
  background: #173760;
}

.view-all-button:hover {
  @apply shadow-lg;
  transform: scale(1.05);
  filter: brightness(1.1);
}

.view-all-button:active {
  transform: scale(0.95);
}
</style>
