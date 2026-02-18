<template>
  <header class="header-wrapper">
    <!-- Scrolled Background (gradient) -->
    <div class="header-scrolled-bg" :style="{ opacity: isScrolled ? 1 : 0 }" />

    <!-- Background Blur Effect (only when not scrolled) -->
    <div class="header-blur-bg" :style="{ opacity: isScrolled ? 0 : 1 }">
      <div class="absolute top-0 left-0 w-full h-full bg-white opacity-20 blur-[6px] scale-150" />
    </div>

    <!-- Main Navigation Bar -->
    <nav class="relative px-4 py-4 xl:px-8 z-50">
      <div class="flex items-center justify-between">
        <!-- Left Section: Logo + Desktop Navigation -->
        <div class="flex items-center space-x-12">
          <!-- Logo -->
          <router-link to="/" class="inline-block logo-container">
            <img src="/images/logo-white.png" alt="Kisagold" class="logo-image"
              :style="{ opacity: isScrolled ? 0 : 1 }" />
            <img src="/images/logo-dark.png" alt="Kisagold" class="logo-image logo-dark"
              :style="{ opacity: isScrolled ? 1 : 0 }" />
          </router-link>

          <!-- Desktop Navigation Links -->
          <nav class="hidden xl:flex items-center space-x-8">
            <router-link v-for="item in navItems" :key="item.to.hash" :to="item.to" class="nav-link"
              :style="{ color: isScrolled ? '#173760' : '#FCFDF5' }">
              {{ item.label }}
            </router-link>
          </nav>
        </div>

        <!-- Right Section: Language Selector + Mobile Menu -->
        <div class="flex items-center space-x-6">
          <!-- Language Dropdown -->
          <div class="relative">
            <button @click="toggleLanguageDropdown" class="nav-link flex items-center space-x-2"
              :style="{ color: isScrolled ? '#173760' : '#FCFDF5' }" aria-label="Select language">
              <span>{{ currentLanguage }}</span>
              <svg class="w-4 h-4 transition-transform duration-200" :class="{ 'rotate-180': isDropdownOpen }"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Language Dropdown Menu -->
            <transition name="dropdown">
              <div v-if="isDropdownOpen" class="language-dropdown">
                <button v-for="lang in languages" :key="lang.code" @click="selectLanguage(lang.code)"
                  class="language-option" :class="{ 'language-option-active': currentLanguage === lang.code }">
                  <span class="language-option-text">{{ lang.code }}</span>
                  <span v-if="currentLanguage === lang.code" class="language-option-check">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </transition>
          </div>

          <!-- Mobile Menu Button -->
          <button @click="toggleMobileMenu" class="xl:hidden flex flex-col space-y-1.5 p-2"
            aria-label="Toggle mobile menu">
            <span class="hamburger-line" :style="{ backgroundColor: isScrolled ? '#173760' : '#FCFDF5' }" />
            <span class="hamburger-line-short" :style="{ backgroundColor: isScrolled ? '#173760' : '#FCFDF5' }" />
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile Full-Screen Menu -->
    <transition name="slide">
      <div v-if="isMobileMenuOpen" class="mobile-menu-overlay">
        <!-- Background Gradient -->
        <div class="mobile-menu-gradient" />

        <!-- Decorative Pattern -->
        <div class="mobile-menu-pattern" />

        <!-- Menu Content -->
        <div class="mobile-menu-content">
          <!-- Header with Logo and Close Button -->
          <div class="mobile-menu-header">
            <img :src="'/images/logo-dark.png'" alt="Kisagold" class="mobile-menu-logo" />
            <button @click="closeMobileMenu" class="mobile-close-btn" aria-label="Close menu">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Navigation Links -->
          <nav class="mobile-nav-wrapper">
            <router-link v-for="item in navItems" :key="item.to.hash" :to="item.to" @click="closeMobileMenu"
              class="mobile-nav-link">
              <span class="mobile-nav-link-text">{{ item.label }}</span>
              <svg class="mobile-nav-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </router-link>
          </nav>

          <!-- Decorative Flower Icon -->
          <div class="mobile-menu-flower">
            <img src="/images/flower.svg" alt="" class="w-16 h-16 opacity-30" />
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { currentLanguage, availableLanguages, changeLanguage, t } = useLanguage()

// ==================== Configuration ====================
const navItems = computed(() => [
  { to: { path: '/', hash: '#about' }, label: t('nav.about') },
  { to: { path: '/products' }, label: t('nav.products') },
  { to: { path: '/', hash: '#category' }, label: t('nav.category') },
  { to: { path: '/', hash: '#price' }, label: t('nav.price') }
])

// ==================== State ====================
const isDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)
const isScrolled = ref(typeof window !== 'undefined' ? window.scrollY > 0 : false)

// ==================== Computed ====================
const languages = computed(() => availableLanguages)

const logoSrc = computed(() => {
  return isScrolled.value ? '/images/logo-dark.png' : '/images/logo-white.png'
})

// ==================== Scroll Methods ====================
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

// ==================== Language Methods ====================
const toggleLanguageDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectLanguage = (langCode) => {
  changeLanguage(langCode.toLowerCase())
  isDropdownOpen.value = false
}

const closeDropdownOnClickOutside = (event) => {
  const dropdownElement = event.target.closest('.relative')
  if (!dropdownElement) {
    isDropdownOpen.value = false
  }
}

// ==================== Mobile Menu Methods ====================
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// ==================== Body Scroll Control ====================
watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// ==================== Lifecycle Hooks ====================
onMounted(() => {
  document.addEventListener('click', closeDropdownOnClickOutside)
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdownOnClickOutside)
  window.removeEventListener('scroll', handleScroll)
  // Restore body scroll on unmount
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ==================== Header Wrapper ==================== */
.header-wrapper {
  @apply fixed top-0 z-50;
  @apply left-1/2 -translate-x-1/2 xl:left-0 xl:translate-x-0;
  @apply w-full max-w-[600px] xl:max-w-none mx-auto;
}

/* ==================== Header Backgrounds ==================== */
.header-scrolled-bg {
  @apply absolute inset-0 pointer-events-none;
  background: linear-gradient(135deg, #EBDFCC 0%, #F5EFE3 50%, #EBDFCC 100%);
  box-shadow: 0 4px 12px rgba(23, 55, 96, 0.08), 0 2px 4px rgba(23, 55, 96, 0.06);
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.header-blur-bg {
  @apply absolute inset-0 overflow-hidden pointer-events-none;
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* ==================== Logo Styles ==================== */
.logo-container {
  @apply relative inline-block w-[140px] xl:w-[200px];
  height: auto;
}

.logo-image {
  @apply w-full h-auto;
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.logo-dark {
  @apply absolute top-0 left-0;
}

/* ==================== Typography Classes ==================== */
.nav-link {
  @apply font-assistant font-medium text-lg leading-[85%] tracking-[-0.02em];
  @apply hover:opacity-80;
  transition: color 500ms cubic-bezier(0.4, 0, 0.2, 1), opacity 300ms ease;
}


/* ==================== Mobile Menu Button ==================== */
.hamburger-line {
  @apply block w-6 h-0.5;
  transition: background-color 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.hamburger-line-short {
  @apply block w-3 h-0.5;
  transition: background-color 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* ==================== Mobile Menu Overlay ==================== */
.mobile-menu-overlay {
  @apply fixed h-screen inset-0 z-50 overflow-hidden;
  -webkit-overflow-scrolling: touch;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.mobile-menu-gradient {
  @apply absolute inset-0;
  background: linear-gradient(135deg, #EBDFCC 0%, #F5EFE3 50%, #EBDFCC 100%);
}

.mobile-menu-pattern {
  @apply absolute inset-0 opacity-5 pointer-events-none;
  background-image: radial-gradient(circle at 20px 20px, #D0BA8E 2px, transparent 0);
  background-size: 40px 40px;
  will-change: auto;
}

.mobile-menu-content {
  @apply relative h-full flex flex-col;
}

/* ==================== Mobile Menu Header ==================== */
.mobile-menu-header {
  @apply flex items-center justify-between px-6 py-6;
}

.mobile-menu-logo {
  @apply w-[140px] h-auto;
}

.mobile-close-btn {
  @apply p-2 rounded-full transition-all duration-300;
  @apply text-[#173760] hover:bg-[#173760] hover:text-white;
}

/* ==================== Mobile Navigation ==================== */
.mobile-nav-wrapper {
  @apply flex-1 flex flex-col justify-center px-6 space-y-6;
}

.mobile-nav-link {
  @apply flex items-center justify-between px-6 py-4 rounded-2xl;
  @apply border-2 border-transparent;
}


.mobile-nav-link-text {
  @apply font-trajan font-bold text-2xl tracking-wide;
  @apply text-[#173760];
}

.mobile-nav-arrow {
  @apply text-[#D0BA8E];
}

/* ==================== Mobile Menu Footer ==================== */
.mobile-menu-flower {
  @apply flex justify-center pb-8;
}

/* ==================== Animations ==================== */
/* Mobile Menu Slide Animation */
.slide-enter-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  will-change: transform;
}

.slide-leave-active {
  transition: transform 0.25s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  will-change: transform;
}

.slide-enter-from {
  transform: translate3d(100%, 0, 0);
}

.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.slide-enter-to,
.slide-leave-from {
  transform: translate3d(0, 0, 0);
}

/* Language Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* ==================== Language Dropdown Styles ==================== */
.language-dropdown {
  @apply absolute right-0 mt-3 w-32 rounded-2xl overflow-hidden;
  background: linear-gradient(135deg, #EBDFCC 0%, #F5EFE3 50%, #EBDFCC 100%);
  box-shadow: 0 8px 24px rgba(23, 55, 96, 0.12),
    0 4px 8px rgba(23, 55, 96, 0.08),
    0 0 0 1px rgba(208, 186, 142, 0.2);
  backdrop-filter: blur(8px);
}

.language-option {
  @apply w-full px-5 py-3 flex items-center justify-between;
  @apply transition-all duration-300;
  @apply border-b border-transparent;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.language-option::before {
  content: '';
  @apply absolute inset-0;
  background: linear-gradient(90deg, rgba(208, 186, 142, 0.15), rgba(208, 186, 142, 0.08));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.language-option:hover::before {
  opacity: 1;
}

.language-option:last-child {
  @apply border-b-0;
}

.language-option-text {
  @apply font-assistant font-semibold text-base tracking-wide uppercase;
  @apply text-[#173760];
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
}

.language-option:hover .language-option-text {
  transform: translateX(2px);
}

.language-option-active {
  background: rgba(208, 186, 142, 0.2);
}

.language-option-active::after {
  content: '';
  @apply absolute left-0 top-0 bottom-0 w-1;
  background: linear-gradient(to bottom, #D0BA8E, #B89968);
}

.language-option-active .language-option-text {
  @apply font-bold;
  color: #173760;
}

.language-option-check {
  @apply flex items-center justify-center;
  @apply text-[#D0BA8E];
  position: relative;
  z-index: 1;
  animation: checkIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes checkIn {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-45deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}
</style>
