<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    
    <main class="flex-grow">
      <slot />
    </main>
    
    <VerifySection />
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import VerifySection from './VerifySection.vue'
</script>
