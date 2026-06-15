<template>
  <article class="card">
    <div class="card__image-wrap">
      <img
        :src="product.image || fallback"
        :alt="product.name"
        class="card__image"
        @error="onImgError"
        loading="lazy"
      />
      <span class="card__badge">{{ product.category }}</span>
    </div>

    <div class="card__body">
      <h3 class="card__name">{{ product.name }}</h3>
      <p class="card__desc">{{ product.desc }}</p>

      <div class="card__meta">
        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M8 12h8M12 8v8"/>
        </svg>
        <span class="card__weight">{{ product.weight }}</span>
      </div>

      <div class="card__footer">
        <div>
          <span class="card__price">{{ product.price }}</span>
          <span class="card__unit">грн/кг</span>
        </div>
        <button class="card__btn" @click="handleAdd" :disabled="added">
          <template v-if="added">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Додано
          </template>
          <template v-else>
            До кошика
          </template>
        </button>
      </div>
    </div>

    <Transition name="flash">
      <div v-if="added" class="card__flash" aria-live="polite">Додано до кошика</div>
    </Transition>
  </article>
</template>

<script setup>
import { ref } from 'vue'

const fallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23ccfbf1'/%3E%3Cellipse cx='200' cy='150' rx='70' ry='42' fill='%230f766e' opacity='.4'/%3E%3Cpath d='M270 150 L295 128 L295 172 Z' fill='%230f766e' opacity='.4'/%3E%3Ccircle cx='172' cy='140' r='8' fill='%230d4a45' opacity='.5'/%3E%3C/svg%3E"

const props = defineProps({
  product: { type: Object, required: true }
})
const emit = defineEmits(['add'])

const added = ref(false)

function handleAdd() {
  emit('add', props.product)
  added.value = true
  setTimeout(() => { added.value = false }, 1500)
}

function onImgError(e) {
  e.target.src = fallback
}
</script>

<style scoped>
.card {
  position: relative; overflow: hidden;
  background: white; border-radius: 22px;
  box-shadow: var(--shadow);
  transition: transform .25s, box-shadow .25s;
  display: flex; flex-direction: column;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.card__image-wrap {
  position: relative;
  height: 280px;
  overflow: hidden;
  background:
    radial-gradient(circle at center,
      #ffffff 0%,
      #f8fafc 100%);
}
.card__image {
  width: 100%;
  height: 100%;

  object-fit: contain;
  object-position: center;

  padding: 10px;

  transition:
    transform .6s cubic-bezier(.22,1,.36,1),
    filter .4s ease;
}
.card:hover .card__image {
  animation: swim 3s ease-in-out infinite;
}

@keyframes swim {
  0%,100% {
    transform:
      scale(1.1)
      rotate(-1deg);
  }

  50% {
    transform:
      scale(1.14)
      rotate(1deg)
      translateX(5px);
  }
}
.card__badge {
  position: absolute; top: 12px; left: 12px;
  background: rgba(13,74,69,.9);
  color: white; padding: 5px 11px;
  border-radius: 99px; font-size: 12px; font-weight: 600;
}

.card__body {
  padding: 18px 20px 20px;
  display: flex; flex-direction: column; flex: 1;
}
.card__name {
  font-size: 19px; font-weight: 700;
  color: var(--ink); margin-bottom: 7px;
}
.card__desc {
  color: var(--muted); line-height: 1.6;
  font-size: 14px; margin-bottom: 12px; flex: 1;
}
.card__meta {
  display: flex; align-items: center; gap: 5px;
  color: var(--muted); margin-bottom: 16px;
}
.card__weight { font-size: 13px; }

.card__footer {
  display: flex; justify-content: space-between;
  align-items: center; gap: 10px;
}
.card__price { font-size: 26px; font-weight: 800; color: var(--teal-900); }
.card__unit { display: block; color: var(--muted); font-size: 12px; }

.card__btn {
  border: none; cursor: pointer;
  background: var(--teal-700); color: white;
  border-radius: 12px; padding: 11px 16px;
  font-size: 14px; font-weight: 600;
  transition: background .2s, transform .15s;
  display: flex; align-items: center; gap: 6px;
  white-space: nowrap;
}
.card__btn:hover:not(:disabled) { background: var(--teal-900); transform: translateY(-1px); }
.card__btn:disabled { background: var(--teal-500); cursor: default; }

/* Flash banner */
.card__flash {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: var(--teal-700); color: white;
  text-align: center; padding: 10px;
  font-size: 14px; font-weight: 600;
}
.flash-enter-active, .flash-leave-active { transition: opacity .2s, transform .2s; }
.flash-enter-from, .flash-leave-to { opacity: 0; transform: translateY(8px); }
</style>
