import { ref } from 'vue'
import productService from '../services/productService'

/**
 * Composable for fetching single product detail
 * @param {string|number} productId - Product ID
 * @returns {Object} { product, loading, error, fetchProduct, refresh }
 */
export function useProductDetail(productId) {
  const product = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchProduct = async (id = productId) => {
    if (!id) {
      error.value = 'Product ID is required'
      return
    }

    loading.value = true
    error.value = null
    
    try {
      const data = await productService.getById(id)
      product.value = data
    } catch (e) {
      error.value = e.response?.data?.message || e.message || 'Failed to fetch product'
      console.error('Error fetching product:', e)
      
      // Handle 404
      if (e.response?.status === 404) {
        error.value = 'Product not found'
      }
    } finally {
      loading.value = false
    }
  }

  const refresh = () => {
    fetchProduct()
  }

  return {
    product,
    loading,
    error,
    fetchProduct,
    refresh
  }
}
