import { ref, computed } from 'vue'

// ==================== Global Loading State ====================
const isLoading = ref(false)
const progress = ref(0)
const progressInterval = ref(null)

// ==================== Composable ====================
export function useLoading() {
  /**
   * Start the loading animation with progress bar
   * @param {number} duration - Duration in milliseconds for the progress to complete (default: 2000ms)
   */
  const startLoading = (duration = 2000) => {
    isLoading.value = true
    progress.value = 0

    // Clear any existing interval
    if (progressInterval.value) {
      clearInterval(progressInterval.value)
    }

    // Calculate increment based on duration
    const increment = 100 / (duration / 50) // Update every 50ms
    
    progressInterval.value = setInterval(() => {
      if (progress.value < 90) {
        // Slow down as we approach 90%
        const slowdownFactor = 1 - (progress.value / 100) * 0.5
        progress.value += increment * slowdownFactor
        progress.value = Math.min(progress.value, 90)
      }
    }, 50)
  }

  /**
   * Complete the loading animation
   * @param {number} delay - Delay before hiding the loader (default: 300ms)
   */
  const finishLoading = (delay = 300) => {
    // Complete the progress bar
    progress.value = 100

    // Clear the interval
    if (progressInterval.value) {
      clearInterval(progressInterval.value)
      progressInterval.value = null
    }

    // Hide the loader after a delay
    setTimeout(() => {
      isLoading.value = false
      // Reset progress after transition
      setTimeout(() => {
        progress.value = 0
      }, 500)
    }, delay)
  }

  /**
   * Stop loading immediately
   */
  const stopLoading = () => {
    if (progressInterval.value) {
      clearInterval(progressInterval.value)
      progressInterval.value = null
    }
    isLoading.value = false
    progress.value = 0
  }

  /**
   * Manually set progress
   * @param {number} value - Progress value (0-100)
   */
  const setProgress = (value) => {
    progress.value = Math.min(Math.max(value, 0), 100)
  }

  return {
    isLoading: computed(() => isLoading.value),
    progress: computed(() => Math.round(progress.value)),
    startLoading,
    finishLoading,
    stopLoading,
    setProgress
  }
}
