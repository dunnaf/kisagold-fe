<template>
  <AppLayout>
    <template v-if="isLoaded">
      <PDHeroSection />
      <PDRecommendedSection />
      <HowToPurchase />
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, provide, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { withLoading } from '@/utils/loading'
import { getProductById, getProducts } from '@/temp-data/db.js'
import AppLayout from '../components/layout/AppLayout.vue'
import PDHeroSection from '../components/productdetail/PDHeroSection.vue'
import PDRecommendedSection from '../components/productdetail/PDRecommendedSection.vue'
import HowToPurchase from '../components/common/HowToPurchase.vue'

// ==================== State ====================
const route = useRoute()
const isLoaded = ref(false)
const currentProduct = ref(null)

// Provide the current product so child components (PDProductInfo, PDRecommendedSection) can inject it
provide('currentProduct', currentProduct)

// ==================== Data Loading ====================
/**
 * Loads product data from the local temp-data db.
 * Replace this with a real API call when the backend is ready.
 */
const loadProductDetailData = async () => {
  const productId = route.params.id

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 850))

  // Load from temp-data db
  const product = getProductById(productId)
  // Fallback to first product if ID not found (e.g. navigating from mock cards)
  currentProduct.value = product ?? getProducts()[0] ?? null

  return true
}

// ==================== Lifecycle ====================
onMounted(async () => {
  try {
    // Load product detail data with loading animation
    await withLoading(loadProductDetailData, {
      duration: 1500,    // Progress bar duration
      delay: 300,        // Delay before hiding
      minDisplayTime: 1000 // Minimum display time for smooth UX
    })

    isLoaded.value = true
  } catch (error) {
    console.error('Failed to load product detail data:', error)
    // Even on error, show the page (with fallback/cached data)
    isLoaded.value = true
  }
})
</script>
