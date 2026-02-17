<template>
  <section class="price-table-section">
    <!-- Background Gradient Overlay -->
    <div class="background-overlay" />

    <!-- Main Content Container -->
    <div class="container">
      <!-- Logo Section -->
      <div class="logo-wrapper">
        <img src="/images/logo-dark.png" alt="KISAGOLD" class="logo-image" />
      </div>

      <!-- Section Header -->
      <header class="section-header">
        <h2 class="section-title">
          {{ t('priceTable.title') }}
        </h2>
        <p class="section-description">
          {{ t('priceTable.description') }}
        </p>
      </header>

      <!-- Date Badge -->
      <div v-if="formattedDate" class="date-badge-wrapper">
        <div class="date-badge">
          {{ formattedDate }}
        </div>
      </div>

      <!-- Empty / Error Placeholder -->
      <div v-if="!priceGroups.length" class="empty-placeholder">
        <p class="empty-text">{{ hasError ? t('priceTable.errorData') : t('priceTable.noData') }}</p>
      </div>

      <!-- Price Table -->
      <div v-else class="table-wrapper">
        <table class="price-table-content" role="table" aria-label="Gold price table">
          <!-- Table Header -->
          <thead>
            <tr class="table-header">
              <th scope="col">{{ t('priceTable.weightLabel') }}</th>
              <th scope="col">{{ t('priceTable.buyPriceLabel') }}</th>
              <th scope="col">{{ t('priceTable.buybackPriceLabel') }}</th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody>
            <template v-for="group in priceGroups" :key="group.categoryId">
              <tr class="table-group-header">
                <td colspan="3">{{ group.label }}</td>
              </tr>
              <tr v-for="row in group.rows" :key="`${group.categoryId}-${row.weight}`" class="table-row">
                <td>{{ row.weight }}</td>
                <td>{{ formatPrice(row.buyPrice) }}</td>
                <td>{{ formatPrice(row.buybackPrice) }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Action Button -->
      <div class="button-wrapper">
        <button class="inquire-button" @click="handleInquire" aria-label="Inquire about prices">
          {{ t('priceTable.inquireButton') }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import { fetchPriceData } from '@/services/priceService.js'
import { openWhatsApp } from '@/utils/whatsapp.js'
import { withLoading } from '@/utils/loading'

// ==================== i18n Setup ====================
const { t, locale } = useLanguage()

// ==================== State ====================
const groups     = ref([])
const lastUpdate = ref(null)   // "4 Feb 2026 11.00 WIB" string from API
const hasError   = ref(false)

// ==================== Lifecycle ====================
onMounted(async () => {
  try {
    const data = await withLoading(() => fetchPriceData())
    groups.value     = data.groups
    lastUpdate.value = data.lastUpdate
  } catch (err) {
    console.error('[HPPriceTable] Failed to load prices:', err)
    hasError.value = true
  }
})

// ==================== Computed ====================
const priceGroups = computed(() =>
  groups.value.map(group => ({
    ...group,
    label: typeof group.label === 'object'
      ? (group.label[locale.value] ?? group.label.en)
      : group.label
  }))
)

const formattedDate = computed(() => {
  const label = locale.value === 'id' ? 'Tanggal' : 'Date'
  if (lastUpdate.value) {
    // API returns a ready-made string e.g. "4 Feb 2026 11.00 WIB"
    return `${label}: ${lastUpdate.value}`
  }
  // Fallback: no date available yet (loading or error)
  return ''
})

// ==================== Methods ====================
const formatPrice = (price) => {
  if (price == null) return '—'
  return `Rp ${Number(price).toLocaleString('id-ID')}`
}

const handleInquire = () => {
  openWhatsApp()
}
</script>

<style scoped>
/* ==================== Section Container ==================== */
.price-table-section {
  @apply relative py-12 xl:py-20 bg-cover bg-center xl:bg-bottom bg-no-repeat;
  background-image: url('/images/bg-prices.png');
}

.background-overlay {
  @apply absolute inset-0 pointer-events-none z-0;
  background: linear-gradient(to bottom, rgba(32, 34, 32, 0) 0%, rgba(32, 34, 32, 1) 100%);
}

.container {
  @apply relative max-w-[1536px] mx-auto px-4 xl:px-8 z-[1];
}

/* ==================== Logo ==================== */
.logo-wrapper {
  @apply flex justify-center mb-6 xl:mb-8;
}

.logo-image {
  @apply w-auto h-12 xl:h-16 transition-transform duration-300;
}

.logo-image:hover {
  @apply scale-105;
}

/* ==================== Section Header ==================== */
.section-header {
  @apply text-center mb-8 xl:mb-10;
}

.section-title {
  @apply font-trajan font-bold text-3xl xl:text-6xl mb-4 xl:mb-6 uppercase;
  color: #173760;
}

.section-description {
  @apply font-assistant font-normal text-sm xl:text-lg mx-auto max-w-3xl xl:max-w-5xl leading-relaxed;
  color: #000000;
}

/* ==================== Date Badge ==================== */
.date-badge-wrapper {
  @apply flex justify-center mb-8 xl:mb-10;
}

.date-badge {
  @apply font-trajan font-bold text-sm xl:text-base px-6 xl:px-8 py-3 xl:py-4 rounded-full inline-block transition-all duration-300 text-white;
  background: #173760;
  box-shadow: 0 4px 12px rgba(23, 55, 96, 0.2);
}

.date-badge:hover {
  @apply -translate-y-0.5;
  box-shadow: 0 6px 16px rgba(23, 55, 96, 0.3);
}

/* ==================== Empty / Error Placeholder ==================== */
.empty-placeholder {
  @apply flex justify-center items-center py-12;
}

.empty-text {
  @apply font-assistant text-sm xl:text-base text-center opacity-70;
  color: #FCFDF5;
}

/* ==================== Price Table ==================== */
.table-wrapper {
  @apply -mx-4 px-4 xl:mx-auto mb-8 xl:mb-10 overflow-x-auto max-w-5xl rounded-xl overflow-hidden;
  box-shadow: 0 8px 24px rgba(23, 55, 96, 0.12);
}

.price-table-content {
  @apply w-full border-collapse text-xs xl:text-base min-w-[300px] rounded-xl overflow-hidden;
}

/* ==================== Table Header ==================== */
.table-header {
  background: #173760;
}

.table-header th {
  @apply font-assistant font-bold text-xs xl:text-base px-3 xl:px-6 py-3 xl:py-4 text-center;
  color: #FCFDF5;
}

.table-header th:first-child {
  @apply rounded-tl-xl;
}

.table-header th:last-child {
  @apply rounded-tr-xl;
}

/* ==================== Table Group Header ==================== */
.table-group-header td {
  @apply font-assistant font-bold text-xs xl:text-sm px-3 xl:px-6 py-2 xl:py-3 text-center transition-colors duration-300;
  background: #D0BA8E;
  color: #FCFDF5;
}

/* ==================== Table Row ==================== */
.table-row {
  @apply transition-all duration-300;
}

.table-row:hover {
  background: rgba(208, 186, 142, 0.1);
}

.table-row td {
  @apply font-assistant font-normal text-xs xl:text-base px-3 xl:px-6 py-2.5 xl:py-3.5 text-center border-t transition-colors duration-300;
  color: #223422;
  background: #DEDEDE;
  border-color: rgba(23, 55, 96, 0.2);
}

.table-row:last-child td {
  @apply border-b-0;
}

.table-row:last-child td:first-child {
  @apply rounded-bl-xl;
}

.table-row:last-child td:last-child {
  @apply rounded-br-xl;
}

/* ==================== Action Button ==================== */
.button-wrapper {
  @apply flex justify-center;
}

.inquire-button {
  @apply font-trajan font-bold text-sm xl:text-base px-8 xl:px-12 py-3 xl:py-4 rounded-full transition-all duration-300 text-white hover:shadow-lg hover:scale-105 hover:brightness-110 active:scale-95;
  background: #173760;
  box-shadow: 0 4px 12px rgba(23, 55, 96, 0.2);
}

.inquire-button:hover {
  box-shadow: 0 8px 20px rgba(23, 55, 96, 0.3);
}

.inquire-button:active {
  @apply duration-150;
}
</style>
