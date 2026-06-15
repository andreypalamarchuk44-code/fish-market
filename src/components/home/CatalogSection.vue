<template>
  <section id="catalog" class="catalog">
    <div class="container">
      <div class="catalog__head">
        <div>
          <span class="section-eyebrow">Наш асортимент</span>
          <h2 class="section-title">Каталог риби</h2>
          <div class="catalog__meta">Знайдено {{ filtered.length }} товарів</div>
        </div>
        <div class="catalog__filters" role="group" aria-label="Фільтр за категорією">
          <button
            v-for="cat in categories"
            :key="cat"
            class="filter-btn"
            :class="{ active: activeCategory === cat }"
            :aria-pressed="activeCategory === cat"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>
      </div>

      <TransitionGroup name="cards" tag="div" class="catalog__grid" v-if="filtered.length">
        <ProductCard
          v-for="product in filtered"
          :key="product.id"
          :product="product"
          @add="add"
        />
      </TransitionGroup>

      <div v-else class="catalog__empty">
        Товарів у цій категорії поки немає
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import products from '../../data/products'
import ProductCard from './ProductCard.vue'
import { useCart } from '../../composables/useCart'

const { add } = useCart()

const categories = ['Усі', 'Свіжа', 'Копчена', "В'ялена"]
const activeCategory = ref('Усі')

const filtered = computed(() => {
  if (activeCategory.value === 'Усі') return products
  return products.filter(p => p.category === activeCategory.value)
})
</script>

<style scoped>
.catalog { padding: 90px 0; background: var(--sand); }

.catalog__head {
  display: flex; justify-content: space-between;
  align-items: flex-end; gap: 24px; flex-wrap: wrap;
  margin-bottom: 40px;
}
.section-eyebrow {
  display: block; color: var(--teal-700);
  font-size: 13px; font-weight: 700;
  letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px;
}
.section-title {
  font-family: var(--font-display); color: var(--ink);
  font-size: clamp(2rem, 4vw, 2.8rem); line-height: 1.15;
}
.catalog__meta { margin-top: 10px; color: var(--muted); font-size: 14px; }

.catalog__filters { display: flex; flex-wrap: wrap; gap: 10px; }
.filter-btn {
  padding: 10px 18px; border-radius: 999px;
  border: 1.5px solid var(--sand-dark);
  background: white; color: var(--muted);
  font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: transform .2s, background .2s, color .2s, border-color .2s;
}
.filter-btn:hover { border-color: var(--teal-500); color: var(--teal-700); }
.filter-btn.active {
  background: var(--teal-700); border-color: var(--teal-700);
  color: white; transform: translateY(-2px);
}

.catalog__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 24px;
}
.catalog__empty {
  text-align: center; padding: 60px 20px;
  border-radius: 20px; background: white;
  color: var(--muted); font-size: 16px;
}

/* Card transition */
.cards-enter-active, .cards-leave-active { transition: opacity .25s, transform .25s; }
.cards-enter-from { opacity: 0; transform: scale(.95); }
.cards-leave-to { opacity: 0; transform: scale(.95); }

@media (max-width: 768px) {
  .catalog { padding: 70px 0; }
  .catalog__head { align-items: flex-start; }
}
@media (max-width: 480px) {
  .catalog__grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
}
</style>
