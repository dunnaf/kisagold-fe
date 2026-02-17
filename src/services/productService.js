import api from './api'
import { getProducts, getProductById } from '@/temp-data/db.js'

const productService = {
  /**
   * Get all products.
   * Falls back to local temp-data if the API is unavailable.
   * @returns {Promise} Array of products
   */
  getAll() {
    return api.get('/products')
      .then(res => res.data)
      .catch(() => getProducts())
  },

  /**
   * Get single product by ID.
   * Falls back to local temp-data if the API is unavailable.
   * @param {string|number} id - Product ID
   * @returns {Promise} Product object
   */
  getById(id) {
    return api.get(`/products/${id}`)
      .then(res => res.data)
      .catch(() => getProductById(id) ?? null)
  },

  /**
   * Search products (future implementation).
   * Falls back to a client-side filter over temp-data if the API is unavailable.
   * @param {string} query - Search query
   * @returns {Promise} Array of products
   */
  search(query) {
    return api.get('/products/search', { params: { q: query } })
      .then(res => res.data)
      .catch(() => {
        const q = query.toLowerCase()
        return getProducts().filter(p => p.name.toLowerCase().includes(q))
      })
  }
}

export default productService
