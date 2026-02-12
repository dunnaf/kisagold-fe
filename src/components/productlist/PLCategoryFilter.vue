<template>
  <div class="category-filter">
    <!-- Mobile: Horizontal Scrollable Pills -->
    <div class="xl:hidden">
      <!-- Main Categories -->
      <div class="overflow-x-auto scrollbar-hide">
        <div class="flex gap-3 pb-2">
          <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)"
            class="category-pill" :class="{ 'active': activeCategory === category.id }">
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Subcategories (shown when custom is selected) -->
      <div v-if="activeCategory === 'custom'" class="overflow-x-auto scrollbar-hide mt-3">
        <div class="flex gap-2 pb-2">
          <button v-for="subCategory in subCategories" :key="subCategory.id"
            @click="selectSubCategory(subCategory.id)" class="sub-category-pill"
            :class="{ 'active': activeSubCategory === subCategory.id }">
            {{ subCategory.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop: Vertical List with Dropdown -->
    <div class="hidden xl:block">
      <div class="category-sidebar">
        <button v-for="category in categories" :key="category.id" @click="selectCategory(category.id)"
          class="category-item" :class="{ 'active': activeCategory === category.id }">
          <span>{{ category.name }}</span>
          <svg v-if="category.hasDropdown" class="category-arrow" width="12" height="8" viewBox="0 0 12 8"
            fill="none" aria-hidden="true">
            <path d="M1 1L6 6L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <!-- Nested Subcategories -->
        <div v-if="activeCategory === 'custom'" class="nested-categories">
          <button v-for="subCategory in subCategories" :key="subCategory.id"
            @click="selectSubCategory(subCategory.id)" class="nested-item"
            :class="{ 'active': activeSubCategory === subCategory.id }">
            {{ subCategory.name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Props ====================
const props = defineProps({
  modelValue: {
    type: String,
    default: 'all'
  }
})

// ==================== Emits ====================
const emit = defineEmits(['update:modelValue', 'update:subCategory'])

// ==================== State ====================
const activeCategory = ref(props.modelValue)
const activeSubCategory = ref('all-custom')

// ==================== Computed ====================
const categories = computed(() => [
  { id: 'all', name: t('productList.categories.all'), hasDropdown: false },
  { id: 'classic-99', name: t('productList.categories.classic99'), hasDropdown: false },
  { id: 'classic-24k', name: t('productList.categories.classic24k'), hasDropdown: false },
  { id: 'custom', name: t('productList.categories.custom'), hasDropdown: true }
])

const subCategories = computed(() => [
  { id: 'all-custom', name: t('productList.subCategories.all') },
  { id: 'lunar-new-year', name: t('productList.subCategories.lunarNewYear') },
  { id: 'eid', name: t('productList.subCategories.eid') },
  { id: 'hampers', name: t('productList.subCategories.hampers') },
  { id: 'gift-box', name: t('productList.subCategories.giftBox') }
])

// ==================== Category Methods ====================
const selectCategory = (categoryId) => {
  activeCategory.value = categoryId
  if (categoryId === 'custom') {
    activeSubCategory.value = 'all-custom'
    emit('update:subCategory', 'all-custom')
  }
  emit('update:modelValue', categoryId)
}

const selectSubCategory = (subCategoryId) => {
  activeSubCategory.value = subCategoryId
  emit('update:subCategory', subCategoryId)
}
</script>

<style scoped>
/* ==================== Mobile Category Pills ==================== */
.category-pill {
  @apply flex-shrink-0 px-6 py-2.5 rounded-full border-none cursor-pointer whitespace-nowrap;
  @apply font-assistant font-normal text-sm transition-all duration-300;
  background-color: transparent;
  color: #223422;
}

.category-pill.active {
  @apply font-semibold;
  background-color: #173760;
  color: #FFFFFF;
}

.category-pill:hover:not(.active) {
  background-color: rgba(23, 55, 96, 0.1);
}

/* ==================== Mobile Subcategory Pills ==================== */
.sub-category-pill {
  @apply flex-shrink-0 px-5 py-2 rounded-full border-none cursor-pointer whitespace-nowrap;
  @apply font-assistant font-normal text-xs transition-all duration-300;
  background-color: rgba(255, 255, 255, 0.5);
  color: #223422;
}

.sub-category-pill.active {
  @apply font-semibold;
  background-color: #D0BA8E;
  color: #173760;
}

.sub-category-pill:hover:not(.active) {
  background-color: rgba(208, 186, 142, 0.3);
}

/* ==================== Scrollbar Hide ==================== */
.scrollbar-hide::-webkit-scrollbar {
  @apply hidden;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* ==================== Desktop Category Sidebar ==================== */
.category-sidebar {
  @apply space-y-2;
}

.category-item {
  @apply w-full flex items-center justify-between px-4 py-3 rounded-lg border-none cursor-pointer text-left;
  @apply font-assistant font-normal text-base transition-all duration-300;
  background-color: transparent;
  color: #223422;
}

.category-item.active {
  @apply font-semibold;
  background-color: transparent;
  color: #173760;
}

.category-item:hover:not(.active) {
  background-color: rgba(23, 55, 96, 0.1);
}

.category-arrow {
  @apply transition-transform duration-300;
  color: currentColor;
}

.category-item.active .category-arrow {
  transform: rotate(180deg);
}

/* ==================== Nested Subcategories ==================== */
.nested-categories {
  @apply mt-2 ml-4 space-y-1;
}

.nested-item {
  @apply w-full px-4 py-2 rounded-lg border-none cursor-pointer text-left;
  @apply font-assistant font-normal text-sm transition-all duration-300;
  background-color: transparent;
  color: #223422;
}

.nested-item.active {
  @apply font-semibold;
  background-color: transparent;
  color: #173760;
}

.nested-item:hover:not(.active) {
  background-color: rgba(23, 55, 96, 0.1);
}
</style>
