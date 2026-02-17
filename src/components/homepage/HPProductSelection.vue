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

      <!-- Empty State (shown when category has no products) -->
      <div v-if="filteredProducts.length === 0" class="empty-state">
        <div class="empty-state-content">
          <svg class="empty-state-icon" width="80" height="80" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <h3 class="empty-state-title">{{ t('productList.noProducts.title') }}</h3>
          <p class="empty-state-description">{{ t('productList.noProducts.description') }}</p>
        </div>
      </div>

      <!-- Products (shown when there is data) -->
      <template v-else>
        <!-- Mobile: 2×2 grid — max 4 products -->
        <div class="xl:hidden grid grid-cols-2 gap-4 mb-8">
          <ProductCard v-for="product in mobileProducts" :key="product.id" :product="product" />
        </div>

        <!-- Desktop: Carousel row — max 3 products -->
        <div class="hidden xl:block products-carousel-wrapper">
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
            <ProductCard v-for="product in desktopProducts" :key="product.id" :product="product" class="product-item" />
          </div>

          <button v-if="canScrollRight" class="nav-arrow nav-arrow-right" @click="scrollRight"
            aria-label="Next products">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </template>

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
import { getProducts, getCategories } from '@/temp-data/db.js'

// ==================== i18n Setup ====================
const { t, locale } = useLanguage()

// ==================== Router ====================
const router = useRouter()

// ==================== Configuration ====================
// Exclude the "all" meta-category — this section shows per-category tabs only
const categories = computed(() =>
  getCategories()
    .filter(cat => cat.id !== 'all')
    .map(cat => ({
      id: cat.id,
      name: cat.name[locale.value] ?? cat.name.en
    }))
)

// ==================== State ====================
// Default to the first real category
const activeCategory = ref(categories.value[0]?.id ?? '')
const productsContainer = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

// ==================== Products Data ====================
const allProducts = getProducts()

// ==================== Computed ====================
const filteredProducts = computed(() =>
  allProducts.filter(product => product.categoryId === activeCategory.value)
)

// Desktop shows max 3 products (fits a 3-column row without scrolling)
const desktopProducts = computed(() => filteredProducts.value.slice(0, 3))

// Mobile shows max 4 products (2×2 grid)
const mobileProducts = computed(() => filteredProducts.value.slice(0, 4))

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
  @apply font-trajan font-bold text-center text-3xl xl:text-6xl mb-6 xl:mb-8;
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
  @apply flex gap-3 xl:gap-4 overflow-x-auto xl:overflow-x-visible;
  @apply xl:flex-wrap xl:justify-center pb-2 xl:pb-0;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tab {
  @apply font-trajan font-bold text-xs xl:text-base;
  @apply px-4 xl:px-8 py-2 xl:py-3.5 rounded-full;
  @apply transition-all duration-300 cursor-pointer;
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
}

/* ==================== Products Carousel ==================== */
.products-carousel-wrapper {
  @apply relative mb-8 xl:mb-12;
}

.products-container {
  @apply grid grid-cols-2 xl:flex gap-4 xl:gap-6 pb-4;
  @apply overflow-visible xl:overflow-x-auto xl:flex-row;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.products-container::-webkit-scrollbar {
  display: none;
}

.product-item {
  @apply xl:flex-shrink-0 xl:w-[calc(33.333%-16px)];
}

/* ==================== Navigation Arrows ==================== */
.nav-arrow {
  @apply hidden xl:flex absolute top-1/2 -translate-y-1/2;
  @apply w-12 h-12 bg-white rounded-full;
  @apply items-center justify-center transition-all duration-300;
  @apply cursor-pointer shadow-md;
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

/* ==================== Empty State ==================== */
.empty-state {
  @apply flex items-center justify-center w-full min-h-[260px] xl:min-h-[320px] mb-8 xl:mb-12;
}

.empty-state-content {
  @apply flex flex-col items-center justify-center text-center max-w-md px-6;
}

.empty-state-icon {
  @apply mb-6 opacity-40;
  color: #173760;
}

.empty-state-title {
  @apply font-trajan font-bold text-xl xl:text-2xl mb-3;
  color: #173760;
}

.empty-state-description {
  @apply font-assistant font-normal text-sm xl:text-base leading-relaxed;
  color: #223422;
  opacity: 0.8;
}

/* ==================== View All Button ==================== */
.button-wrapper {
  @apply flex justify-center;
}

.view-all-button {
  @apply font-trajan font-bold text-base;
  @apply px-8 xl:px-12 py-3 xl:py-4 rounded-full;
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
