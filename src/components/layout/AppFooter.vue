<template>
  <footer class="bg-[#EBE0CC] mt-auto">
    <!-- Main Content - 2 cols mobile, 3 cols desktop -->
    <div>
      <div class="max-w-[1536px] mx-auto">
        <div class="grid grid-cols-2 xl:grid-cols-3">
          <!-- Left Column: Logo and Social Links -->
          <div class="flex flex-col space-y-6 px-4 xl:px-8 py-8 xl:py-12">
            <img src="/images/logo-dark.png" :alt="logoAlt" class="h-16 w-auto object-contain self-start" />
            <div class="flex flex-col space-y-2">
              <a v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank"
                rel="noopener noreferrer" class="footer-link" :aria-label="social.ariaLabel">
                {{ social.label }}
              </a>
            </div>
          </div>

          <!-- Middle Column: Navigation Links -->
          <div class="flex flex-col space-y-2 border-l border-[#333333] px-4 xl:px-8 py-8 xl:py-12">
            <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="footer-link">
              {{ item.label }}
            </router-link>
          </div>

          <!-- Right Column: Contact Us (full width on mobile, column on desktop) -->
          <div
            class="col-span-2 xl:col-span-1 border-t xl:border-t-0 xl:border-l border-[#333333] px-4 xl:px-8 py-8 xl:py-12">
            <h3 class="contact-title">{{ t('footer.contact.title') }}</h3>

            <div class="space-y-4">
              <p class="company-name">{{ t('footer.contact.companyName') }}</p>
              <p class="company-address">{{ t('footer.contact.address') }}</p>

              <div class="contact-details">
                <p class="contact-label">
                  {{ t('footer.contact.email') }}
                  <a :href="`mailto:${contactInfo.email}`" class="contact-value">
                    {{ contactInfo.email }}
                  </a>
                </p>
                <p class="contact-label">
                  {{ t('footer.contact.contactPerson') }}
                  <span class="contact-value">{{ contactInfo.phone }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Width Border -->
    <div class="border-t border-[#333333]" />

    <!-- Bottom Bar -->
    <div class="px-4 xl:px-8 py-6 xl:py-8">
      <div class="max-w-[1536px] mx-auto">
        <div class="flex flex-wrap justify-between items-center gap-4 w-full">
          <router-link v-for="link in bottomLinks" :key="link.path" :to="link.path" class="footer-bottom-link">
            {{ link.label }}
          </router-link>
          <p class="copyright-text">{{ copyrightText }}</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

// ==================== i18n Setup ====================
const { t } = useLanguage()

// ==================== Configuration ====================
const logoAlt = 'KisaGold'

const socialLinks = computed(() => [
  {
    name: 'instagram',
    label: t('footer.social.instagram'),
    url: 'https://www.instagram.com/kisagold.id/',
    ariaLabel: 'Visit our Instagram page'
  },
  {
    name: 'linkedin',
    label: t('footer.social.linkedin'),
    url: 'https://linkedin.com/company/kisagold',
    ariaLabel: 'Visit our LinkedIn page'
  }
])

const navItems = computed(() => [
  { path: '/', label: t('footer.nav.home') },
  { path: '/gold-category', label: t('footer.nav.goldCategory') },
  { path: '/gold-selection', label: t('footer.nav.goldSelection') },
  { path: '/gold-list', label: t('footer.nav.goldList') },
  { path: '/how-to-purchase', label: t('footer.nav.howToPurchase') },
  { path: '/pricing', label: t('footer.nav.pricing') },
  { path: '/faq', label: t('footer.nav.faq') },
  { path: '/verification', label: t('footer.nav.verification') }
])

const bottomLinks = computed(() => [
  { path: '/terms', label: t('footer.bottom.terms') },
  { path: '/privacy', label: t('footer.bottom.privacy') },
  { path: '/contact', label: t('footer.bottom.contactUs') }
])

const contactInfo = {
  email: 'kisamuliaabadi@gmail.com',
  phone: '+628516888 8877'
}

// ==================== Computed ====================
const currentYear = computed(() => new Date().getFullYear())

const copyrightText = computed(() => t('footer.bottom.copyright', { year: currentYear.value }))
</script>

<style scoped>
/* ==================== Typography Classes ==================== */
.footer-link {
  @apply font-trajan font-bold text-lg text-[#333333] no-underline;
  @apply hover:opacity-70 transition-opacity duration-200;
}

.contact-title {
  @apply font-trajan font-bold text-lg text-[#333333] mb-6;
}

.company-name {
  @apply font-assistant font-bold text-lg text-[#333333];
}

.company-address {
  @apply font-assistant font-normal text-base text-[#333333] leading-relaxed;
}

.contact-details {
  @apply font-assistant font-normal text-lg text-[#333333];
}

.contact-label {
  @apply font-assistant font-normal text-base text-[#333333];
}

.contact-value {
  @apply font-assistant font-normal text-base text-[#662121] no-underline;
  @apply hover:underline transition-all duration-200;
}

.footer-bottom-link {
  @apply font-assistant font-normal text-sm text-[#662121] no-underline;
  @apply hover:opacity-70 transition-opacity duration-200;
}

.copyright-text {
  @apply font-assistant font-normal text-sm text-[#662121] text-left;
}
</style>
