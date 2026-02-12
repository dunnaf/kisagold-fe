<template>
  <!-- Global Loading Component -->
  <GlobalLoading />

  <!-- Responsive container wrapper -->
  <div class="min-h-screen bg-gray-100">
    <!-- < 600px: full width mobile -->
    <!-- 600px - 1200px: max-w-[600px] centered mobile view -->
    <!-- >= 1200px: full width desktop -->
    <div class="mx-auto bg-white min-h-screen md:max-w-[600px] xl:max-w-none">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import GlobalLoading from '@/components/common/GlobalLoading.vue'

// Main app component - renders router views with responsive container
</script>
