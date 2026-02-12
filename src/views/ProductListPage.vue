<template>
  <AppLayout>
    <template v-if="isLoaded">
      <PLHeroSection />
      <PLProductListSection />
      <PLLuxurySection />
    </template>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { withLoading } from '@/utils/loading'
import AppLayout from '../components/layout/AppLayout.vue'
import PLHeroSection from '../components/productlist/PLHeroSection.vue'
import PLLuxurySection from '../components/productlist/PLLuxurySection.vue'
import PLProductListSection from '../components/productlist/PLProductListSection.vue'

// ==================== State ====================
const isLoaded = ref(false)

// ==================== Data Loading ====================
/**
 * Simulates fetching product list data
 * In a real application, this would fetch products from an API
 */
const loadProductListData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 900))

  // In a real app, you would fetch data here:
  // const response = await fetch('/api/products')
  // const data = await response.json()

  return true
}

// ==================== Lifecycle ====================
onMounted(async () => {
  try {
    // Load product list data with loading animation
    await withLoading(loadProductListData, {
      duration: 1500,    // Progress bar duration
      delay: 300,        // Delay before hiding
      minDisplayTime: 1000 // Minimum display time for smooth UX
    })

    isLoaded.value = true
  } catch (error) {
    console.error('Failed to load product list data:', error)
    // Even on error, show the page (with fallback/cached data)
    isLoaded.value = true
  }
})
</script>
