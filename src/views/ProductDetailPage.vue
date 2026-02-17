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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { withLoading } from '@/utils/loading'
import AppLayout from '../components/layout/AppLayout.vue'
import PDHeroSection from '../components/productdetail/PDHeroSection.vue'
import PDRecommendedSection from '../components/productdetail/PDRecommendedSection.vue'
import HowToPurchase from '../components/common/HowToPurchase.vue'

// ==================== State ====================
const route = useRoute()
const isLoaded = ref(false)

// ==================== Data Loading ====================
/**
 * Simulates fetching product detail data
 * In a real application, this would fetch product by ID from an API
 */
const loadProductDetailData = async () => {
  const productId = route.params.id
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 850))
  
  // In a real app, you would fetch data here:
  // const response = await fetch(`/api/products/${productId}`)
  // const data = await response.json()
  
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
