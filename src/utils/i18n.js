import { createI18n } from 'vue-i18n'
import id from '@/locales/id.json'
import en from '@/locales/en.json'

// Get saved language from localStorage or default to Indonesian
const getSavedLanguage = () => {
  const saved = localStorage.getItem('kisagold-language')
  return saved || 'id'
}

// Create i18n instance
const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: getSavedLanguage(),
  fallbackLocale: 'en',
  messages: {
    id,
    en
  },
  // Global options
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false
})

export default i18n
