<template>
  <div class="flex flex-col gap-8 w-full px-5 xl:px-0 xl:gap-8">
    <!-- Product Header -->
    <div class="flex items-center gap-4">
      <img :src="logoSrc" :alt="t('productDetail.info.logoAlt')" class="logo-flower" />
      <h1 class="product-title">{{ productName }}</h1>
    </div>

    <!-- Product Details Grid -->
    <div class="product-details">
      <!-- Section 1: Basic Specifications -->
      <div class="detail-section">
        <div class="detail-row">
          <span class="detail-label">{{ t('productDetail.info.fields.type') }}</span>
          <span class="detail-value">{{ details.type }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">{{ t('productDetail.info.fields.netWeight') }}</span>
          <span class="detail-value">{{ details.netWeight }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">{{ t('productDetail.info.fields.dimensions') }}</span>
          <span class="detail-value">{{ details.dimensions }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">{{ t('productDetail.info.fields.purity') }}</span>
          <span class="detail-value">{{ details.purity }}</span>
        </div>
      </div>

      <!-- Section 2: Security Features -->
      <div class="detail-section">
        <div class="detail-row">
          <span class="detail-label">{{ t('productDetail.info.fields.caseType') }}</span>
          <span class="detail-value">{{ details.caseType }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">{{ t('productDetail.info.fields.physicalSecurity') }}</span>
          <span class="detail-value">{{ details.physicalSecurity }}</span>
        </div>

        <div class="detail-row">
          <span class="detail-label">{{ t('productDetail.info.fields.digitalSecurity') }}</span>
          <span class="detail-value">{{ details.digitalSecurity }}</span>
        </div>
      </div>

      <!-- Section 3: Quality & Standard -->
      <div class="detail-section">
        <div class="detail-row">
          <span class="detail-label">{{ t('productDetail.info.fields.quality') }}</span>
          <span class="detail-value">{{ details.quality }}</span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <button class="btn-inquire" @click="handleInquire">
        {{ t('productDetail.info.buttons.inquire') }}
      </button>
      <button class="btn-back" @click="goToHomepage">
        {{ t('productDetail.info.buttons.backToHome') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'
import { openWhatsApp } from '@/utils/whatsapp.js'

// ==================== i18n Setup ====================
const { t, locale } = useLanguage()

// ==================== Router ====================
const router = useRouter()

// ==================== Injected Data ====================
// Provided by ProductDetailPage.vue
const currentProduct = inject('currentProduct', null)

// ==================== Computed ====================
const logoSrc = computed(() => '/images/flower.svg')

const productName = computed(() =>
  currentProduct?.value?.name ?? t('productDetail.info.productName')
)

const details = computed(() => {
  const d = currentProduct?.value?.details
  const lang = locale.value

  // Resolve a field that may be a plain string or a { en, id } object
  const loc = (field, fallback) => {
    if (!field) return fallback
    if (typeof field === 'object') return field[lang] ?? field.en ?? fallback
    return field
  }

  return {
    type:             loc(d?.type,             t('productDetail.info.values.type')),
    netWeight:        loc(d?.netWeight,        t('productDetail.info.values.netWeight')),
    dimensions:       loc(d?.dimensions,       t('productDetail.info.values.dimensions')),
    purity:           loc(d?.purity,           t('productDetail.info.values.purity')),
    caseType:         loc(d?.caseType,         t('productDetail.info.values.caseType')),
    physicalSecurity: loc(d?.physicalSecurity, t('productDetail.info.values.physicalSecurity')),
    digitalSecurity:  loc(d?.digitalSecurity,  t('productDetail.info.values.digitalSecurity')),
    quality:          loc(d?.quality,          t('productDetail.info.values.quality'))
  }
})

// ==================== Methods ====================
const handleInquire = () => {
  openWhatsApp()
}

const goToHomepage = () => {
  router.push('/')
}
</script>

<style scoped>
/* ==================== Product Header ==================== */
.logo-flower {
  @apply w-[60px] h-[60px] xl:w-[50px] xl:h-[50px] object-contain;
}

.product-title {
  @apply font-trajan font-bold text-2xl xl:text-[28.82px] text-[#223422] m-0;
}

/* ==================== Product Details ==================== */
.product-details {
  @apply flex flex-col gap-4 xl:grid xl:grid-cols-3 xl:gap-0;
}

.detail-section {
  @apply flex flex-col gap-4 pb-4 border-b border-[#223422];
  @apply -mx-5 px-5;
  @apply xl:border-b-0 xl:border-r xl:px-5 xl:pb-0 xl:mx-0;
}

.detail-section:last-child {
  @apply border-b-0 pb-0 xl:border-r-0;
}

.detail-section:first-child {
  @apply xl:pl-0;
}

.detail-section:last-child {
  @apply xl:pr-0;
}

.detail-row {
  @apply grid grid-cols-1 gap-1 xl:gap-2;
}

.detail-label {
  @apply font-assistant font-bold text-sm xl:text-[15.61px] text-[#173760];
}

.detail-value {
  @apply font-assistant font-normal text-sm xl:text-[15.61px] text-black;
}

/* ==================== Action Buttons ==================== */
.action-buttons {
  @apply flex flex-col xl:flex-row gap-4 mt-2 xl:mt-4;
}

.btn-inquire,
.btn-back {
  @apply font-trajan font-bold text-sm xl:text-base uppercase;
  @apply px-6 py-3.5 xl:px-8 xl:py-4 rounded-full cursor-pointer;
  @apply transition-all duration-300 border-2 border-[#173760];
  @apply xl:flex-1;
}

.btn-inquire {
  @apply text-white bg-[#173760];
}

.btn-inquire:hover {
  @apply bg-[#0f2545] border-[#0f2545] -translate-y-0.5;
  box-shadow: 0 4px 12px rgba(23, 55, 96, 0.3);
}

.btn-back {
  @apply text-[#173760] bg-transparent;
}

.btn-back:hover {
  @apply -translate-y-0.5;
  background-color: rgba(23, 55, 96, 0.05);
  box-shadow: 0 4px 12px rgba(23, 55, 96, 0.15);
}
</style>
