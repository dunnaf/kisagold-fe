import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * Composable for language management
 * Provides language switching with localStorage persistence
 */
export function useLanguage() {
  const { locale, t } = useI18n()
  
  /**
   * Current language in uppercase (ID/EN)
   */
  const currentLanguage = computed(() => locale.value.toUpperCase())
  
  /**
   * Available languages
   */
  const availableLanguages = [
    { code: 'ID', name: 'Indonesia' },
    { code: 'EN', name: 'English' }
  ]
  
  /**
   * Change the current language
   * @param {string} langCode - Language code (id/en or ID/EN)
   */
  const changeLanguage = (langCode) => {
    const normalizedCode = langCode.toLowerCase()
    locale.value = normalizedCode
    
    // Persist to localStorage
    localStorage.setItem('kisagold-language', normalizedCode)
    
    // Update document language attribute for SEO
    document.documentElement.lang = normalizedCode
    
    console.log(`Language changed to: ${normalizedCode.toUpperCase()}`)
  }
  
  /**
   * Get translation with fallback
   * @param {string} key - Translation key
   * @param {object} params - Translation parameters
   */
  const translate = (key, params = {}) => {
    return t(key, params)
  }
  
  return {
    locale,
    currentLanguage,
    availableLanguages,
    changeLanguage,
    t: translate
  }
}
