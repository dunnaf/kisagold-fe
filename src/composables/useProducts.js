import { ref } from 'vue'
import productService from '../services/productService'

/**
 * Composable for fetching products list
 * @returns {Object} { products, loading, error, fetchProducts, refresh }
 */
export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    
    try {
      const data = await productService.getAll()
      products.value = data
    } catch (e) {
      error.value = e.response?.data?.message || e.message || 'Failed to fetch products'
      console.error('Error fetching products:', e)
    } finally {
      loading.value = false
    }
  }

  const refresh = () => {
    fetchProducts()
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    refresh
  }
}
