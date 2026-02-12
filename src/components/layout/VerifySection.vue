<template>
  <section class="relative overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0">
      <img :src="images.background" :alt="t('verify.images.background')" class="w-full h-full object-cover" />
    </div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 gradient-overlay-mobile xl:hidden" />
    <div class="hidden xl:block absolute inset-0 gradient-overlay-desktop" />

    <!-- Content -->
    <div class="relative px-4 xl:px-8 py-12 xl:py-0">
      <div class="max-w-[1536px] mx-auto">
        <div class="flex flex-col xl:flex-row xl:min-h-[80vh] items-center gap-12">
          <!-- Left: Image (Mobile: Top, Desktop: Left Full Height) -->
          <div class="image-container">
            <img :src="images.gold" :alt="t('verify.images.gold')" class="gold-image" />
            <!-- Gradient overlay for smooth transition - only bottom 10% (Mobile only) -->
            <div class="image-gradient-overlay" />
          </div>

          <!-- Right: Form Content -->
          <div class="flex-1 w-full xl:w-1/2 max-w-2xl mx-auto xl:mx-0 xl:py-16">
            <!-- Flower Icon -->
            <div class="flex justify-center mb-8">
              <img :src="images.flower" :alt="t('verify.images.flower')"
                class="w-20 h-20 xl:w-24 xl:h-24 object-contain" />
            </div>

            <!-- Title -->
            <h2 class="verify-title text-center mb-6" v-html="t('verify.title')" />

            <!-- Description -->
            <p class="verify-description text-center mb-8">
              {{ t('verify.description') }}
            </p>

            <!-- Form -->
            <form @submit.prevent="handleVerify" class="space-y-4" aria-label="Verification form">
              <!-- Serial Number Input -->
              <div>
                <input v-model="formData.serialNumber" type="text" :placeholder="t('verify.form.serialNumber')"
                  class="verify-input" :aria-label="t('verify.form.serialNumber')" required />
              </div>

              <!-- Private Key Input -->
              <div>
                <input v-model="formData.privateKey" type="text" :placeholder="t('verify.form.privateKey')"
                  class="verify-input" :aria-label="t('verify.form.privateKey')" required />
              </div>

              <!-- Submit Button -->
              <div class="pt-4">
                <button type="submit" :disabled="!isFormValid" class="verify-button"
                  :class="{ 'disabled': !isFormValid }" :aria-label="t('verify.form.submit')">
                  {{ t('verify.form.submit') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Configuration ====================
const images = {
  background: '/images/bg-verify.jpg',
  gold: '/images/gold-in-hand.png',
  flower: '/images/flower.svg'
}

// ==================== State ====================
const formData = reactive({
  serialNumber: '',
  privateKey: ''
})

// ==================== Computed ====================
const isFormValid = computed(() => {
  return formData.serialNumber.trim() !== '' && formData.privateKey.trim() !== ''
})

// ==================== Form Methods ====================
const handleVerify = () => {
  if (!isFormValid.value) return

  console.log('Verifying:', {
    serialNumber: formData.serialNumber,
    privateKey: formData.privateKey
  })
  // Add verification logic here
}
</script>

<style scoped>
/* ==================== Layout Classes ==================== */
.image-container {
  @apply flex-shrink-0 w-full xl:w-1/2 xl:h-[80vh];
  @apply flex justify-center xl:justify-start items-center xl:items-end;
  @apply relative xl:py-0;
}

.gold-image {
  @apply w-full xl:w-full xl:max-w-lg h-auto object-contain xl:object-bottom;
}

.image-gradient-overlay {
  @apply absolute -inset-1 pointer-events-none xl:hidden;
  background: linear-gradient(to top, #000000 0%, transparent 30%);
}

/* ==================== Gradient Overlays ==================== */
.gradient-overlay-mobile {
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 50%,
      rgba(23, 55, 96, 1) 90%,
      rgba(23, 55, 96, 0.5) 100%);
}

.gradient-overlay-desktop {
  background: linear-gradient(90deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 1) 45%,
      rgba(23, 55, 96, 1) 80%,
      rgba(23, 55, 96, 0.8) 90%,
      rgba(23, 55, 96, 0.7) 100%);
}

/* ==================== Typography Classes ==================== */
.verify-title {
  @apply font-trajan font-bold text-[32px] xl:text-[42px] leading-[1.3] text-[#D0BA8E];
}

.verify-description {
  @apply font-assistant font-normal text-base leading-relaxed text-[#FCFDF5];
}

/* ==================== Form Elements ==================== */
.verify-input {
  @apply w-full px-5 py-3.5 bg-transparent border-none outline-none;
  @apply font-assistant font-normal text-base text-[#FCFDF5];
  @apply transition-colors duration-300;
  border-bottom: 1px solid rgba(252, 253, 245, 0.3);
}

.verify-input::placeholder {
  color: rgba(252, 253, 245, 0.6);
}

.verify-input:focus {
  border-bottom-color: #D0BA8E;
}

.verify-button {
  @apply w-full px-8 py-4 rounded-[50px] border-none cursor-pointer;
  @apply font-trajan font-bold text-base text-[#FCFDF5] bg-[#D0BA8E];
  @apply transition-all duration-300;
}

.verify-button:hover:not(.disabled) {
  @apply bg-[#c0aa7e] -translate-y-0.5;
}

.verify-button:active:not(.disabled) {
  @apply translate-y-0;
}

.verify-button.disabled {
  @apply bg-[#929292] cursor-not-allowed opacity-60;
}
</style>
