<template>
  <section class="features" aria-label="Наші переваги">
    <div class="container">
      <div class="features__grid">
        <div class="feature" v-for="f in features" :key="f.title">
          <div class="feature__icon" aria-hidden="true" v-html="f.icon"></div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: `<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
      <path d="M8 12c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z"/>
      <path d="M12 6V2M12 22v-4M6 12H2M22 12h-4"/>
    </svg>`,
    title: 'Власне господарство',
    desc: 'Ставки без антибіотиків та ГМО. Риба росте в природних умовах.'
  },
  {
    icon: `<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
      <path d="M3 7c0 0 2-2 5-1s4 3 7 2 4-3 4-3"/>
      <path d="M3 12c0 0 2-2 5-1s4 3 7 2 4-3 4-3"/>
      <circle cx="18" cy="8" r="1" fill="currentColor"/>
      <path d="M18 8 L18 4" stroke-linecap="round"/>
    </svg>`,
    title: 'Щоденний вилов',
    desc: 'Замовлення до 14:00 — риба цього ж дня. Свіжіше не буває.'
  },
  {
    icon: `<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
      <path d="M4 20h16M8 20V10M16 20V10M6 10h12M12 4v6M9 7l3-3 3 3"/>
    </svg>`,
    title: 'Власне копчення',
    desc: 'Коптимо на вільхових тирсах за сімейним рецептом без хімії.'
  },
  {
    icon: `<svg width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
      <rect x="1" y="11" width="15" height="8" rx="2"/>
      <path d="M16 15h2l3-3h-5M1 15h2M5 19v2M12 19v2"/>
      <circle cx="5.5" cy="19" r="1.5"/>
      <circle cx="12.5" cy="19" r="1.5"/>
    </svg>`,
    title: 'Доставка по місту',
    desc: 'Привеземо охолодженою до дверей. Упаковка зберігає свіжість 24 год.'
  },
]
</script>

<style scoped>
.features {
  padding: 60px 0;
  background: var(--sand);
}
.features__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.feature {
  background: var(--white);
  border-radius: var(--radius);
  padding: 28px 24px;
  box-shadow: var(--shadow);
  transition: transform .2s, box-shadow .2s;
}
.feature:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
.feature__icon {
  color: var(--teal-700);
  margin-bottom: 14px;
  display: flex;
}
.feature h3 { font-size: 17px; margin-bottom: 8px; color: var(--teal-900); }
.feature p { font-size: 14px; color: var(--muted); line-height: 1.6; }

@media (max-width: 480px) {
  .features__grid { grid-template-columns: 1fr 1fr; gap: 14px; }
  .feature { padding: 20px 16px; }
}
@media (max-width: 360px) {
  .features__grid { grid-template-columns: 1fr; }
}
</style>
