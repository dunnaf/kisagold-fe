/**
 * temp-data/db.js
 * Local data-access layer that reads from the temp-data JSON files.
 * Acts as a lightweight in-memory "database" while a real API is not available.
 * Replace individual methods with real API calls as the backend is ready.
 */

import productsData from './products.json'
import categoriesData from './categories.json'
// ==================== Categories ====================

/**
 * Returns all main categories.
 * @returns {Array} List of category objects
 */
export const getCategories = () => categoriesData.categories

/**
 * Returns a single category by ID.
 * @param {string} id
 * @returns {Object|undefined}
 */
export const getCategoryById = (id) => categoriesData.categories.find(c => c.id === id)

/**
 * Returns all sub-categories, optionally filtered by parent category ID.
 * @param {string|null} parentCategoryId
 * @returns {Array}
 */
export const getSubCategories = (parentCategoryId = null) => {
  if (parentCategoryId) {
    return categoriesData.subCategories.filter(s => s.parentCategoryId === parentCategoryId)
  }
  return categoriesData.subCategories
}

// ==================== Products ====================

/**
 * Returns all products.
 * @returns {Array}
 */
export const getProducts = () => productsData.products

/**
 * Returns a single product by ID.
 * @param {number|string} id
 * @returns {Object|undefined}
 */
export const getProductById = (id) => productsData.products.find(p => p.id === Number(id))

/**
 * Returns products filtered by category ID.
 * Passing 'all' or no argument returns all products.
 * @param {string} categoryId
 * @returns {Array}
 */
export const getProductsByCategory = (categoryId) => {
  if (!categoryId || categoryId === 'all') return productsData.products
  return productsData.products.filter(p => p.categoryId === categoryId)
}

/**
 * Returns products filtered by sub-category ID.
 * Passing 'all-custom' or no argument returns all custom products.
 * @param {string} subCategoryId
 * @returns {Array}
 */
export const getProductsBySubCategory = (subCategoryId) => {
  if (!subCategoryId || subCategoryId === 'all-custom') {
    return productsData.products.filter(p => p.categoryId === 'custom')
  }
  return productsData.products.filter(p => p.subCategoryId === subCategoryId)
}

/**
 * Returns featured products (isFeatured: true), capped at `limit`.
 * Used for homepage spotlights and recommended sections.
 * @param {number} limit - Maximum items to return (default 4)
 * @returns {Array}
 */
export const getFeaturedProducts = (limit = 4) =>
  productsData.products.filter(p => p.isFeatured).slice(0, limit)

/**
 * Returns products recommended relative to a given product.
 * Excludes the current product and prefers same category, then others.
 * @param {number|string} currentProductId
 * @param {number} limit - max items to return (default 6)
 * @returns {Array}
 */
export const getRecommendedProducts = (currentProductId, limit = 6) => {
  const current = getProductById(currentProductId)
  const others = productsData.products.filter(p => p.id !== Number(currentProductId))

  if (!current) return others.slice(0, limit)

  const sameCategory = others.filter(p => p.categoryId === current.categoryId)
  const rest = others.filter(p => p.categoryId !== current.categoryId)

  return [...sameCategory, ...rest].slice(0, limit)
}
