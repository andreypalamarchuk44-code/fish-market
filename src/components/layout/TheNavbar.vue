<template>
  <header class="nav" :class="{ scrolled: isScrolled }">
    <div class="container nav__inner">
      <a href="#top" class="nav__logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <ellipse cx="13" cy="14" rx="10" ry="6" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.7)" stroke-width="1.5"/>
          <path d="M23 14c2-2 4-1 5 0-1 1-3 2-5 0z" fill="rgba(255,255,255,0.8)"/>
          <circle cx="10" cy="12.5" r="1.2" fill="white"/>
        </svg>
        <span class="nav__logo-text">Рибний<br><strong>Ринок</strong></span>
      </a>

      <nav class="nav__links" :class="{ open: menuOpen }" aria-label="Основне меню">
        <a href="#catalog" @click="menuOpen = false">Каталог</a>
        <a href="#about" @click="menuOpen = false">Про нас</a>
        <a href="#gallery" @click="menuOpen = false">Галерея</a>
        <a href="#contact" @click="menuOpen = false">Контакти</a>
      </nav>

      <div class="nav__actions">
        <button class="nav__cart" @click="$emit('open-cart')" aria-label="Відкрити кошик">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span v-if="cartCount" class="nav__badge" aria-label="Товарів у кошику">{{ cartCount }}</span>
        </button>

        <button
          class="nav__burger"
          :class="{ open: menuOpen }"
          @click="menuOpen = !menuOpen"
          :aria-expanded="menuOpen"
          aria-label="Відкрити меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile overlay -->
    <div v-if="menuOpen" class="nav__mobile-overlay" @click="menuOpen = false"></div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '../../composables/useCart'

defineEmits(['open-cart'])
const { totalCount: cartCount } = useCart()

const isScrolled = ref(false)
const menuOpen = ref(false)

const onScroll = () => { isScrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  padding: 16px 0;
  transition: background .3s, box-shadow .3s, padding .3s;
}
.nav.scrolled {
  background: rgba(13,74,69,.97);
  box-shadow: 0 2px 20px rgba(0,0,0,.2);
  backdrop-filter: blur(12px);
  padding: 12px 0;
}
.nav__inner {
  display: flex; align-items: center; gap: 32px;
}
.nav__logo {
  display: flex; align-items: center; gap: 10px;
  text-decoration: none; color: #fff;
  font-family: var(--font-display);
  line-height: 1.2; font-size: 14px;
  flex-shrink: 0;
}
.nav__logo strong { font-size: 18px; display: block; }
.nav__links {
  display: flex; gap: 28px; margin-left: auto;
}
.nav__links a {
  color: rgba(255,255,255,.82); text-decoration: none;
  font-size: 15px; font-weight: 500;
  transition: color .2s;
  position: relative;
}
.nav__links a::after {
  content: '';
  position: absolute; bottom: -2px; left: 0; right: 0;
  height: 2px; background: var(--teal-100);
  transform: scaleX(0); transition: transform .2s;
}
.nav__links a:hover { color: var(--teal-100); }
.nav__links a:hover::after { transform: scaleX(1); }

.nav__actions {
  display: flex; align-items: center; gap: 12px; margin-left: auto;
}
.nav__links + .nav__actions { margin-left: 0; }
/* When links are visible, push actions to right */
@media (min-width: 641px) {
  .nav__actions { margin-left: 0; }
  .nav__links { margin-left: auto; }
}

.nav__cart {
  position: relative;
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.25);
  color: #fff; border-radius: 12px;
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background .2s;
}
.nav__cart:hover { background: rgba(255,255,255,.25); }
.nav__badge {
  position: absolute; top: -6px; right: -6px;
  background: var(--gold); color: #fff;
  font-size: 11px; font-weight: 700;
  border-radius: 99px; min-width: 18px; height: 18px;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px; line-height: 1;
}
.nav__burger {
  display: none;
  flex-direction: column; justify-content: center; align-items: center;
  gap: 5px;
  width: 44px; height: 44px;
  background: rgba(255,255,255,.15);
  border: 1px solid rgba(255,255,255,.25);
  border-radius: 12px;
  cursor: pointer;
}
.nav__burger span {
  display: block; width: 20px; height: 2px;
  background: white; border-radius: 2px;
  transition: transform .25s, opacity .25s;
  transform-origin: center;
}
.nav__burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav__burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav__burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.nav__mobile-overlay {
  position: fixed; inset: 0; z-index: 98;
}

@media (max-width: 640px) {
  .nav__links {
    display: none;
    position: fixed; top: 68px; left: 0; right: 0;
    flex-direction: column; gap: 0;
    background: rgba(13,74,69,.98);
    backdrop-filter: blur(12px);
    z-index: 99;
    padding: 8px 0;
    box-shadow: 0 8px 32px rgba(0,0,0,.25);
  }
  .nav__links.open { display: flex; }
  .nav__links a {
    padding: 16px 24px;
    font-size: 17px;
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  .nav__links a::after { display: none; }
  .nav__burger { display: flex; }
  .nav__actions { margin-left: auto; }
}
</style>
