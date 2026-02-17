<template>
  <div class="product-card" @click="goToProductDetail">
    <!-- Card Image -->
    <div class="card-image-wrapper">
      <img :src="product.image" :alt="product.name" class="card-image" />
    </div>

    <!-- Card Content -->
    <div class="card-content">
      <!-- Product Name -->
      <h3 class="product-name">
        {{ product.name }}
      </h3>

      <!-- Product Price — hidden for custom category (price is inquiry-based) -->
      <p v-if="product.categoryId !== 'custom'" class="product-price">
        {{ formatPrice(product.price) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// ==================== Props ====================
const props = defineProps({
  product: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.id && value.name && value.price && value.image
    }
  }
})

// ==================== Methods ====================
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price).replace('IDR', 'Rp')
}

const goToProductDetail = () => {
  router.push(`/products/${props.product.id}`)
}
</script>

<style scoped>
/* ==================== Card Container ==================== */
.product-card {
  @apply flex flex-col cursor-pointer transition-transform duration-300;
}

.product-card:hover {
  transform: translateY(-4px);
}

/* ==================== Card Image ==================== */
.card-image-wrapper {
  @apply relative w-full h-[150px] xl:h-[250px] rounded-lg overflow-hidden mb-3 flex items-center justify-center;
  background: linear-gradient(180deg, #B98F3A15 40%, #B98F3A15 100%);
}

.card-image {
  @apply w-full h-full object-contain;
}

/* ==================== Card Content ==================== */
.card-content {
  @apply flex flex-col;
}

.product-name {
  @apply font-trajan font-bold text-base xl:text-lg;
  color: #173760;
}

.product-price {
  @apply font-assistant font-normal text-sm xl:text-base;
  color: #000000;
}
</style>
