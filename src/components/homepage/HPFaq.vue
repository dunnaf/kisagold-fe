<template>
  <section class="faq-section">
    <div class="content-container">
      <!-- Title Section (Left Side on Desktop) -->
      <div class="title-section">
        <!-- Flower Logo -->
        <img src="/images/flower.svg" :alt="flowerLogoAlt" class="flower-logo" />

        <!-- Main Title -->
        <h2 class="main-title">
          {{ title }}
        </h2>
      </div>

      <!-- FAQ Accordion (Right Side on Desktop) -->
      <div class="faq-accordion">
        <div v-for="(faq, index) in faqs" :key="index" class="faq-item"
          :class="{ 'is-expanded': expandedIndex === index }">
          <!-- Question Button -->
          <button class="faq-question" @click="toggleFaq(index)" :aria-expanded="expandedIndex === index">
            <span class="question-text">{{ faq.question }}</span>
            <span class="chevron-icon" :class="{ 'is-expanded': expandedIndex === index }">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </span>
          </button>

          <!-- Answer Panel -->
          <transition name="faq-expand" @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
            <div v-if="expandedIndex === index" class="faq-answer-wrapper">
              <div class="faq-answer">
                {{ faq.answer }}
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== State ====================
const expandedIndex = ref(null)

// ==================== Computed Properties ====================
const flowerLogoAlt = computed(() => t('faq.flowerLogo.alt'))
const title = computed(() => t('faq.title'))

const faqs = computed(() => {
  const faqItems = []
  let index = 1

  // Get all FAQs dynamically
  while (true) {
    const question = t(`faq.items.${index}.question`)
    if (question === `faq.items.${index}.question`) break // Translation not found

    const answer = t(`faq.items.${index}.answer`)
    faqItems.push({ question, answer })
    index++
  }

  return faqItems
})

// ==================== Methods ====================
/**
 * Toggle FAQ item - only one can be expanded at a time
 */
const toggleFaq = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}

/**
 * Animation hooks for smooth height transition
 */
const onEnter = (element) => {
  const targetHeight = element.scrollHeight + 'px'
  element.style.height = '0'
  element.style.opacity = '0'

  // Force reflow so the browser registers the starting values before transitioning
  void element.offsetHeight

  element.style.height = targetHeight
  element.style.opacity = '1'
}

const onAfterEnter = (element) => {
  // Remove fixed height so the panel can resize naturally (e.g. font scaling)
  element.style.height = 'auto'
}

const onLeave = (element) => {
  // Pin current height so the transition has an explicit start value
  element.style.height = element.scrollHeight + 'px'
  element.style.opacity = '1'

  // Force reflow
  void element.offsetHeight

  element.style.height = '0'
  element.style.opacity = '0'
}
</script>

<style scoped>
/* ==================== Section Container ==================== */
.faq-section {
  @apply relative w-full bg-[#EBDFCC] py-12 xl:py-32;
}

/* ==================== Content Container ==================== */
.content-container {
  @apply relative flex flex-col xl:flex-row xl:items-start xl:gap-20;
  @apply px-4 xl:px-8 max-w-[1536px] mx-auto;
}

/* ==================== Title Section ==================== */
.title-section {
  @apply flex flex-col xl:flex-shrink-0 xl:items-start xl:mb-0;
  @apply xl:sticky xl:top-[120px];
  @apply xl:w-1/2;
}

/* ==================== Flower Logo ==================== */
.flower-logo {
  @apply w-16 h-16 xl:w-24 xl:h-24 mb-6 xl:mb-8;
}

/* ==================== Main Title ==================== */
.main-title {
  @apply font-trajan font-bold text-2xl xl:text-5xl uppercase xl:text-left;
  @apply mb-8 xl:mb-0;
  color: #173760;
  line-height: 1.2;
}

/* ==================== FAQ Accordion ==================== */
.faq-accordion {
  @apply w-full flex flex-col gap-4 xl:w-1/2;
}

/* ==================== FAQ Item ==================== */
.faq-item {
  @apply w-full border-b border-[#173760]/20 transition-all duration-300;
}

.faq-item:last-child {
  @apply border-b-0;
}

/* ==================== FAQ Question Button ==================== */
.faq-question {
  @apply w-full flex items-center justify-between py-4;
  @apply text-left cursor-pointer transition-all duration-300 outline-none;
  background: transparent;
  border: none;
}

.faq-question:hover {
  @apply opacity-80;
}

.faq-question:focus-visible {
  @apply outline-2 outline-offset-2;
  outline-color: #173760;
}

.question-text {
  @apply font-trajan font-normal text-sm xl:text-lg flex-1 pr-4;
  color: #173760;
}

/* ==================== Chevron Icon ==================== */
.chevron-icon {
  @apply flex-shrink-0 transition-transform duration-300;
  color: #173760;
}

.chevron-icon.is-expanded {
  @apply rotate-180;
}

/* ==================== FAQ Answer ==================== */
.faq-answer-wrapper {
  overflow: hidden;
}

.faq-answer {
  @apply font-assistant text-sm xl:text-base pb-4 xl:pb-8 pr-8;
  color: #173760;
}

/* ==================== Animation Classes ==================== */
.faq-expand-enter-active,
.faq-expand-leave-active {
  overflow: hidden;
  will-change: height, opacity;
  transition: height 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
</style>
