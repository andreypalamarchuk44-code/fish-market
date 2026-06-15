<template>
  <section id="about" class="about">
    <div class="container">


  <div class="about__header">
    <span class="about__eyebrow">
      Від ставка до столу
    </span>

    <h2 class="about__title">
      Як ми гарантуємо
      <span>свіжість риби</span>
    </h2>

    <p class="about__subtitle">
      Контролюємо кожен етап виробництва —
      від вирощування до доставки покупцю.
    </p>
  </div>

  <div class="about__timeline">

    <div class="step">
      <div class="step__number">01</div>
      <h3>Вирощування</h3>
      <p>
        Риба росте у власних водоймах
        під постійним контролем якості води.
      </p>
    </div>

    <div class="step">
      <div class="step__number">02</div>
      <h3>Вилов</h3>
      <p>
        Виловлюємо лише після отримання замовлень,
        щоб зберегти максимальну свіжість.
      </p>
    </div>

    <div class="step">
      <div class="step__number">03</div>
      <h3>Охолодження</h3>
      <p>
        Використовуємо сучасні методи охолодження
        без заморожування продукції.
      </p>
    </div>

    <div class="step">
      <div class="step__number">04</div>
      <h3>Доставка</h3>
      <p>
        Риба пакується з льодом та швидко
        доставляється до клієнта.
      </p>
    </div>

  </div>

  <div class="about__stats">

    <div class="stat">
      <strong>40 га</strong>
      <span>власних водойм</span>
    </div>

    <div class="stat">
      <strong>12+</strong>
      <span>видів риби</span>
    </div>

    <div class="stat">
      <strong>24 год</strong>
      <span>від вилову до продажу</span>
    </div>

    <div class="stat">
      <strong>100%</strong>
      <span>контроль якості</span>
    </div>

  </div>

  <div class="about__features">

    <div class="feature">
      <h3>Власне господарство</h3>
      <p>
        Повний контроль над усім процесом
        вирощування риби.
      </p>
    </div>

    <div class="feature">
      <h3>Екологічне виробництво</h3>
      <p>
        Натуральна годівля та чисті водойми
        без зайвої хімії.
      </p>
    </div>

    <div class="feature">
      <h3>Власна коптильня</h3>
      <p>
        Традиційні рецепти та натуральне
        копчення на деревині.
      </p>
    </div>

    <div class="feature">
      <h3>Швидка доставка</h3>
      <p>
        Доставляємо продукцію максимально
        швидко та без втрати якості.
      </p>
    </div>

  </div>

</div>

  </section>
</template>

<style scoped>
.about {
  padding: 120px 0;
  background: linear-gradient(
    180deg,
    #ffffff,
    #f8faf9
  );
}

.about__header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 80px;
}

.about__eyebrow {
  display: inline-block;
  color: var(--teal-700);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .15em;
  margin-bottom: 16px;
}

.about__title {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--ink);
}

.about__title span {
  color: var(--teal-700);
}

.about__subtitle {
  max-width: 650px;
  margin: 0 auto;
  color: var(--muted);
  line-height: 1.8;
  font-size: 18px;
}

.about__timeline {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 90px;
}

.step {
  background: white;
  border-radius: 24px;
  padding: 28px;
  box-shadow: var(--shadow);
  transition: .35s ease;
}

.step:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.step__number {
  font-size: 42px;
  font-weight: 800;
  color: rgba(15,118,110,.15);
  margin-bottom: 12px;
}

.step h3 {
  margin-bottom: 12px;
  color: var(--ink);
}

.step p {
  color: var(--muted);
  line-height: 1.7;
}

.about__stats {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 24px;
  margin-bottom: 90px;
}

.stat {
  text-align: center;
  padding: 36px 20px;
  border-radius: 24px;
  background: var(--teal-900);
  color: white;
}

.stat strong {
  display: block;
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 10px;
}

.stat span {
  color: rgba(255,255,255,.8);
  font-size: 14px;
}

.about__features {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 24px;
}

.feature {
  background: white;
  border-radius: 24px;
  padding: 28px;
  box-shadow: var(--shadow);
  transition: .35s ease;
}

.feature:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-lg);
}

.feature h3 {
  margin-bottom: 12px;
  color: var(--ink);
}

.feature p {
  color: var(--muted);
  line-height: 1.7;
}

@media (max-width: 1024px) {
  .about__timeline,
  .about__stats,
  .about__features {
    grid-template-columns: repeat(2,1fr);
  }
}

@media (max-width: 768px) {
  .about {
    padding: 80px 0;
  }

  .about__timeline,
  .about__stats,
  .about__features {
    grid-template-columns: 1fr;
  }

  .about__header {
    margin-bottom: 60px;
  }

  .about__stats {
    gap: 16px;
  }
}
</style>
