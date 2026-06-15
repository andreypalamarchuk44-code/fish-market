<template>
  <TheNavbar @open-cart="isCartOpen = true" />

  <HeroSection />
  <FeaturesSection />
  <AboutSection />
  <CatalogSection />
  <GallerySection />
  <ContactSection />

  <CartDrawer
    :open="isCartOpen"
    @close="isCartOpen = false"
    @checkout="isCheckoutOpen = true"
  />

  <CheckoutModal
    :open="isCheckoutOpen"
    @close="isCheckoutOpen = false"
  />

  <TheFooter />
</template>

<script setup>
import { ref } from 'vue'

import TheNavbar from '../components/layout/TheNavbar.vue'
import TheFooter from '../components/layout/TheFooter.vue'

import HeroSection from '../components/home/HeroSection.vue'
import FeaturesSection from '../components/home/FeaturesSection.vue'
import AboutSection from '../components/home/AboutSection.vue'
import CatalogSection from '../components/home/CatalogSection.vue'
import GallerySection from '../components/home/GallerySection.vue'
import ContactSection from '../components/home/ContactSection.vue'

import CartDrawer from '../components/cart/CartDrawer.vue'
import CheckoutModal from '../components/cart/CheckoutModal.vue'

const isCartOpen = ref(false)
const isCheckoutOpen = ref(false)
</script>