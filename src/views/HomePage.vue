<template>
  <AppLayout>
    <HPHeroCarousel v-if="isLoaded" />
    <HPShopByCategory id="category" v-if="isLoaded" />
    <HPProductSelection id="products" v-if="isLoaded" />
    <HPArchipelago id="about" v-if="isLoaded" />
    <HPWhyChoose v-if="isLoaded" />
    <HPPriceTable id="price" v-if="isLoaded" />
    <HowToPurchase v-if="isLoaded" />
    <HPFaq v-if="isLoaded" />
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { withLoading } from '@/utils/loading'
import AppLayout from '../components/layout/AppLayout.vue'
import HPHeroCarousel from '../components/homepage/HPHeroCarousel.vue'
import HPShopByCategory from '../components/homepage/HPShopByCategory.vue'
import HPProductSelection from '../components/homepage/HPProductSelection.vue'
import HPArchipelago from '../components/homepage/HPArchipelago.vue'
import HPWhyChoose from '../components/homepage/HPWhyChoose.vue'
import HPPriceTable from '../components/homepage/HPPriceTable.vue'
import HowToPurchase from '../components/common/HowToPurchase.vue'
import HPFaq from '../components/homepage/HPFaq.vue'

// ==================== State ====================
const isLoaded = ref(false)

// ==================== Data Loading ====================
/**
 * Simulates fetching homepage data (carousel, featured products, etc.)
 * In a real application, this would fetch from an API
 */
const loadHomePageData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // In a real app, you would fetch data here:
  // const response = await fetch('/api/homepage')
  // const data = await response.json()
  
  return true
}

// ==================== Lifecycle ====================
onMounted(async () => {
  try {
    // Load homepage data with loading animation
    await withLoading(loadHomePageData, {
      duration: 1500,    // Progress bar duration
      delay: 300,        // Delay before hiding
      minDisplayTime: 1000 // Minimum display time for smooth UX
    })
    
    isLoaded.value = true
  } catch (error) {
    console.error('Failed to load homepage data:', error)
    // Even on error, show the page (with fallback/cached data)
    isLoaded.value = true
  }
})
</script>
