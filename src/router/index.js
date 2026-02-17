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
    // If there's a hash (anchor link), scroll to that element with navbar offset
    if (to.hash) {
      // xl breakpoint = 1280px  |  navbar: 95px desktop / 76px mobile
      const navbarHeight = window.innerWidth >= 1280 ? 95 : 76
      const scrollTarget = { el: to.hash, behavior: 'smooth', top: navbarHeight }

      // Same page → element already in DOM, scroll immediately
      if (to.path === from.path) {
        return scrollTarget
      }

      // Different page → wait for the target element to mount (homepage has a loading delay)
      return new Promise((resolve) => {
        const MAX_ATTEMPTS = 30   // 30 × 100ms = 3s max wait
        let attempts = 0
        const poll = () => {
          const el = document.querySelector(to.hash)
          if (el) {
            resolve(scrollTarget)
          } else if (attempts++ < MAX_ATTEMPTS) {
            setTimeout(poll, 100)
          } else {
            resolve(scrollTarget) // give up waiting, let browser try anyway
          }
        }
        setTimeout(poll, 100) // small initial delay before first check
      })
    }
    // If only query params changed (same path), don't scroll — e.g. category filter changes
    if (to.path === from.path) {
      return false
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
