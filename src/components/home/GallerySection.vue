<template>
  
<section id="gallery" class="gallery">
  <div class="container">

    <div class="gallery__head">
      <span class="gallery__eyebrow"> 
        Наше господарство
      </span>

      <h2 class="gallery__title">
        Від ставка до столу
      </h2>
    </div>

    <div class="gallery__grid">

      <article
        v-for="(item,index) in items"
        :key="index"
        :class="['gallery__item', item.size]"
        @click="open(index)"
      >
        <img
          :src="item.image"
          :alt="item.label"
        >

        <div class="gallery__label">
          {{ item.label }}
        </div>
      </article>

    </div>

    <Transition name="fade">

      <div
        v-if="active !== null"
        class="gallery-modal"
        @click.self="close"
      >

        <button
          class="gallery-modal__close"
          @click="close"
        >
          ×
        </button>

        <button
          class="gallery-modal__nav prev"
          @click="prev"
        >
          ‹
        </button>

        <img
          :src="items[active].image"
          :alt="items[active].label"
          class="gallery-modal__image"
        >

        <div class="gallery-modal__caption">
          {{ items[active].label }}
        </div>

        <button
          class="gallery-modal__nav next"
          @click="next"
        >
          ›
        </button>

      </div>

    </Transition>

  </div>
</section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import riverImg from '../../assets/styles/images/river.jpg'
import fish13Img from '../../assets/styles/images/fish13.jpg'
import fish15Img from '../../assets/styles/images/fish15.jpg'
import fish16Img from '../../assets/styles/images/fish16.jpg'
import fish17Img from '../../assets/styles/images/fish17.jpg'
import fish18Img from '../../assets/styles/images/fish18.jpg'






const active = ref(null)

const items = [
  {
    label: 'Ставки',
    size: 'large',
    image: riverImg
  
 },
  {
    label: 'Вилов',
    image: fish13Img
  },
  {
    label: 'Доставка',
    image: fish18Img
  },
  {
    label: 'Коптильня',
    size: 'wide',
    image: fish15Img
  },
  {
    label: 'Охолодження',
    image: fish16Img
  },
  {
    label: 'Пакування',
    image: fish17Img
  }
]

const open = (index) => {
  active.value = index
}

const close = () => {
  active.value = null
}

const next = () => {
  active.value =
    (active.value + 1) % items.length
}

const prev = () => {
  active.value =
    (active.value - 1 + items.length) %
    items.length
}

const handleKey = (e) => {
  if (active.value === null) return

  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => {
  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})
</script>

<style scoped>

.gallery {
  padding: 120px 0;
}

.gallery__head {
  text-align: center;
  margin-bottom: 60px;
}

.gallery__eyebrow {
  display: block;
  color: var(--teal-700);
  text-transform: uppercase;
  letter-spacing: .12em;
  font-size: 13px;
  font-weight: 700;
  margin-bottom: 10px;
}

.gallery__title {
  font-size: clamp(2rem,5vw,4rem);
}

.gallery__grid {
  display: grid;

  grid-template-columns:
    repeat(3,1fr);

  grid-auto-rows: 260px;

  gap: 18px;
}

.gallery__item {
  position: relative;

  overflow: hidden;

  border-radius: 28px;

  cursor: pointer;

  box-shadow:
    0 15px 40px rgba(0,0,0,.08);

  transition:
    transform .5s;
}

.gallery__item:hover {
  transform:
    translateY(-8px);
}

.gallery__item img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition:
    transform .8s;
}

.gallery__item:hover img {
  transform: scale(1.08);
}

.large {
  grid-column: span 2;
  grid-row: span 2;
}

.wide {
  grid-column: span 2;
}

.gallery__label {
  position: absolute;

  left: 20px;
  right: 20px;
  bottom: 20px;

  padding: 14px 18px;

  color: white;

  backdrop-filter: blur(20px);

  background:
    rgba(255,255,255,.12);

  border:
    1px solid rgba(255,255,255,.15);

  border-radius: 18px;
}

.gallery-modal {
  position: fixed;

  inset: 0;

  z-index: 999;

  background:
    rgba(0,0,0,.92);

  display: flex;

  justify-content: center;
  align-items: center;
}

.gallery-modal__image {
  max-width: 90vw;
  max-height: 85vh;

  border-radius: 24px;
}

.gallery-modal__caption {
  position: absolute;

  bottom: 40px;

  color: white;

  font-size: 18px;
}

.gallery-modal__close {
  position: absolute;

  top: 30px;
  right: 30px;

  border: none;
  background: none;

  color: white;

  font-size: 50px;

  cursor: pointer;
}

.gallery-modal__nav {
  position: absolute;

  top: 50%;

  transform: translateY(-50%);

  border: none;

  background:
    rgba(255,255,255,.08);

  color: white;

  width: 60px;
  height: 60px;

  border-radius: 50%;

  cursor: pointer;

  font-size: 34px;
}

.prev {
  left: 30px;
}

.next {
  right: 30px;
}

.fade-enter-active,
.fade-leave-active {
  transition: .3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {

  .gallery__grid {
    grid-template-columns: 1fr;
  }

  .large,
  .wide {
    grid-column: span 1;
    grid-row: span 1;
  }

}
</style>
