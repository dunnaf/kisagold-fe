import { createRouter, createWebHistory } from 'vue-router'
import { useLoading } from '@/composables/useLoading'
import HomePage from '../views/HomePage.vue'
import ProductListPage from '../views/ProductListPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductListPage
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetailPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // If there's a saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }
    // If there's a hash (anchor link), scroll to that element
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    // Otherwise, scroll to top
    return { top: 0, behavior: 'smooth' }
  }
})

// ==================== Global Navigation Guards ====================
const { startLoading, finishLoading } = useLoading()

// Track loading start time for minimum display duration
let loadingStartTime = null

// Start loading before each route navigation
router.beforeEach((to, from, next) => {
  // Only show loading if navigating between different routes
  if (to.path !== from.path) {
    loadingStartTime = Date.now()
    startLoading(1500) // 1.5 seconds duration for progress bar
  }
  next()
})

// Finish loading after route is loaded
router.afterEach(() => {
  if (loadingStartTime) {
    const elapsedTime = Date.now() - loadingStartTime
    const minDisplayTime = 1000 // 1 second minimum
    
    if (elapsedTime < minDisplayTime) {
      // Wait for remaining time to reach 1 second minimum
      setTimeout(() => {
        finishLoading(300) // 300ms delay before hiding
      }, minDisplayTime - elapsedTime)
    } else {
      finishLoading(300) // 300ms delay before hiding
    }
    
    loadingStartTime = null
  }
})

export default router
