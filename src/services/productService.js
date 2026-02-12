import api from './api'

const productService = {
  /**
   * Get all products
   * @returns {Promise} Array of products
   */
  getAll() {
    return api.get('/products').then(res => res.data)
  },

  /**
   * Get single product by ID
   * @param {string|number} id - Product ID
   * @returns {Promise} Product object
   */
  getById(id) {
    return api.get(`/products/${id}`).then(res => res.data)
  },

  /**
   * Search products (future implementation)
   * @param {string} query - Search query
   * @returns {Promise} Array of products
   */
  search(query) {
    return api.get('/products/search', { params: { q: query } }).then(res => res.data)
  }
}

export default productService
