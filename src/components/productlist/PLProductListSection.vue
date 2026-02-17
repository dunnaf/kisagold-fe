<template>
  <section class="product-list-section">
    <div class="section-container">
      <div class="content-wrapper">
        <!-- Desktop: Sidebar Layout -->
        <div class="hidden xl:flex xl:gap-8">
          <!-- Category Sidebar -->
          <aside class="category-sidebar-wrapper">
            <PLCategoryFilter :model-value="selectedCategory" @update:modelValue="onCategoryChange"
              @update:subCategory="onSubCategoryChange" />
          </aside>

          <!-- Product Grid or Empty State -->
          <div class="product-grid-wrapper">
            <!-- Product Grid -->
            <div v-if="filteredProducts.length > 0" class="product-grid">
              <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
            </div>

            <!-- Empty State -->
            <div v-else class="empty-state">
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
          </div>
        </div>

        <!-- Mobile: Top Filter + Grid -->
        <div class="xl:hidden">
          <!-- Category Filter -->
          <div class="mb-6">
            <PLCategoryFilter :model-value="selectedCategory" @update:modelValue="onCategoryChange"
              @update:subCategory="onSubCategoryChange" />
          </div>

          <!-- Product Grid -->
          <div v-if="filteredProducts.length > 0" class="product-grid">
            <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
          </div>

          <!-- Empty State -->
          <div v-else class="empty-state">
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
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'
import PLCategoryFilter from './PLCategoryFilter.vue'
import ProductCard from '../common/ProductCard.vue'
import { getProducts, getProductsByCategory, getProductsBySubCategory, getCategories } from '@/temp-data/db.js'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Route ====================
const route = useRoute()
const router = useRouter()

// ==================== Helpers ====================
const validCategoryIds = getCategories().map(c => c.id)

const sanitizeCategory = (val) =>
  validCategoryIds.includes(val) ? val : 'all'

// ==================== State ====================
// Derived from URL; falls back to 'all' for unknown values
const selectedCategory = ref(sanitizeCategory(route.query.category))
const selectedSubCategory = ref('all-custom')

// Keep state in sync when URL changes (browser back/forward)
watch(() => route.query.category, (val) => {
  selectedCategory.value = sanitizeCategory(val)
  selectedSubCategory.value = 'all-custom'
})

// ==================== Filter Handlers ====================
const onCategoryChange = (categoryId) => {
  selectedCategory.value = categoryId
  selectedSubCategory.value = 'all-custom'
  router.replace({ query: { category: categoryId } })
}

const onSubCategoryChange = (subCategoryId) => {
  selectedSubCategory.value = subCategoryId
}

// ==================== Data ====================
const allProducts = getProducts()

// ==================== Computed ====================
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'custom' && selectedSubCategory.value !== 'all-custom') {
    return getProductsBySubCategory(selectedSubCategory.value)
  }
  return getProductsByCategory(selectedCategory.value)
})
</script>

<style scoped>
/* ==================== Section Container ==================== */
.product-list-section {
  background-color: #EBDFCC;
  @apply py-12 xl:py-16 min-h-screen;
}

.section-container {
  @apply px-4 xl:px-8;
}

.content-wrapper {
  @apply max-w-[1536px] mx-auto;
}

/* ==================== Desktop Layout ==================== */
.category-sidebar-wrapper {
  @apply flex-shrink-0 w-64;
}

.product-grid-wrapper {
  @apply flex-1;
}

/* ==================== Product Grid ==================== */
.product-grid {
  @apply grid grid-cols-2 gap-4 xl:grid-cols-3 xl:gap-6;
}

/* ==================== Empty State ==================== */
.empty-state {
  @apply flex items-center justify-center w-full min-h-[400px] xl:min-h-[500px];
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
</style>
