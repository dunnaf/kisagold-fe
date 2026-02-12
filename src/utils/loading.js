import { useLoading } from '@/composables/useLoading'

/**
 * Loading utility functions for global loading state management
 * Use these functions to show/hide loading screen globally
 */

const { startLoading, finishLoading, stopLoading, setProgress } = useLoading()

/**
 * Wrap an async function with loading animation
 * @param {Function} asyncFn - Async function to execute
 * @param {Object} options - Options for loading behavior
 * @param {number} options.duration - Progress bar duration (default: 2000ms)
 * @param {number} options.delay - Delay before hiding loader (default: 300ms)
 * @param {number} options.minDisplayTime - Minimum display time (default: 1000ms)
 * @returns {Promise} Result of the async function
 * 
 * @example
 * // Basic usage
 * const data = await withLoading(async () => {
 *   return await fetchData()
 * })
 * 
 * // With custom options
 * const data = await withLoading(
 *   async () => await fetchData(),
 *   { duration: 3000, delay: 500, minDisplayTime: 1500 }
 * )
 */
export async function withLoading(asyncFn, options = {}) {
  const { duration = 2000, delay = 300, minDisplayTime = 1000 } = options

  try {
    const startTime = Date.now()
    startLoading(duration)
    
    const result = await asyncFn()
    
    // Ensure minimum display time
    const elapsedTime = Date.now() - startTime
    if (elapsedTime < minDisplayTime) {
      await new Promise(resolve => setTimeout(resolve, minDisplayTime - elapsedTime))
    }
    
    finishLoading(delay)
    return result
  } catch (error) {
    stopLoading()
    throw error
  }
}

/**
 * Show loading screen
 * @param {number} duration - Progress bar duration in milliseconds (default: 2000ms)
 * 
 * @example
 * showLoading(1500)
 */
export function showLoading(duration = 2000) {
  startLoading(duration)
}

/**
 * Hide loading screen
 * @param {number} delay - Delay before hiding in milliseconds (default: 300ms)
 * 
 * @example
 * hideLoading(500)
 */
export function hideLoading(delay = 300) {
  finishLoading(delay)
}

/**
 * Stop loading immediately without animation
 * 
 * @example
 * cancelLoading()
 */
export function cancelLoading() {
  stopLoading()
}

/**
 * Manually set progress value
 * @param {number} value - Progress value (0-100)
 * 
 * @example
 * updateProgress(50) // Set progress to 50%
 */
export function updateProgress(value) {
  setProgress(value)
}

/**
 * Example: Simulate a multi-step process with manual progress updates
 * 
 * @example
 * async function multiStepProcess() {
 *   showLoading(5000) // 5 second duration
 *   
 *   await step1()
 *   updateProgress(25)
 *   
 *   await step2()
 *   updateProgress(50)
 *   
 *   await step3()
 *   updateProgress(75)
 *   
 *   await step4()
 *   hideLoading()
 * }
 */

export default {
  withLoading,
  showLoading,
  hideLoading,
  cancelLoading,
  updateProgress
}
