<template>
  <div class="flex gap-5 w-full flex-col xl:flex-row">
    <!-- Thumbnail Gallery -->
    <div class="thumbnail-gallery">
      <button v-for="(image, index) in images" :key="index" class="thumbnail-btn"
        :class="{ active: selectedImageIndex === index }"
        :aria-label="t('productDetail.image.thumbnailAlt', { index: index + 1 })" @click="selectImage(index)">
        <img :src="image" :alt="t('productDetail.image.thumbnailAlt', { index: index + 1 })" />
      </button>
    </div>

    <!-- Main Image Display -->
    <div class="main-image-container">
      <div class="main-image">
        <img :src="images[selectedImageIndex]" :alt="t('productDetail.image.mainImageAlt')"
          class="w-full h-auto object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Configuration ====================
const images = ref([
  '/images/pd-dummy-image.svg.png',
  '/images/pd-dummy-image.svg.png',
  '/images/pd-dummy-image.svg.png'
])

// ==================== State ====================
const selectedImageIndex = ref(0)

// ==================== Methods ====================
const selectImage = (index) => {
  selectedImageIndex.value = index
}
</script>

<style scoped>
/* ==================== Thumbnail Gallery ==================== */
.thumbnail-gallery {
  @apply flex gap-3 flex-row xl:flex-col justify-center xl:justify-start overflow-x-auto xl:overflow-visible;
}

.thumbnail-btn {
  @apply w-[60px] h-[60px] xl:w-20 xl:h-20 bg-transparent border-none p-0 cursor-pointer;
  @apply opacity-70 hover:opacity-100 transition-opacity duration-300;
  @apply flex-shrink-0;
}

.thumbnail-btn.active {
  @apply opacity-100;
}

.thumbnail-btn img {
  @apply w-full h-full object-contain;
}

/* ==================== Main Image Container ==================== */
.main-image-container {
  @apply relative flex-1 flex items-center justify-center bg-transparent p-0;
}

.main-image {
  @apply w-full flex items-center justify-center;
}

.main-image img {
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15));
}
</style>
