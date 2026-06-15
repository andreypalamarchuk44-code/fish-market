<template>
  <section class="hero" id="top">

    <div class="hero__overlay"></div>

    <div class="hero__glow"></div>

    <div class="container hero__inner">

      <!-- LEFT -->
      <div ref="content" class="hero__content">

        <div class="hero__eyebrow">
          Власне рибне господарство
        </div>

        <h1 class="hero__title">
          Свіжа риба<br>
          прямо з річки
        </h1>

        <p class="hero__sub">
          Натуральне вирощування, щоденний вилов та доставка
          в день замовлення. Без посередників і зайвих націнок.
        </p>

        <div class="hero__actions">
          <a href="#catalog" class="btn btn--primary">Каталог</a>
          <a href="#contact" class="btn btn--secondary">Контакт</a>
        </div>

        <div class="hero__stats">
          <div class="hero__stat">
            <strong>10+</strong>
            <span>років досвіду</span>
          </div>

          <div class="hero__stat">
            <strong>12</strong>
            <span>видів риби</span>
          </div>

          <div class="hero__stat">
            <strong>24/7</strong>
            <span>замовлення</span>
          </div>
        </div>
      </div>

      <!-- RIGHT -->
      <div ref="card" class="hero__visual">
        <div class="hero__image-card">
          <img
            src="../../assets/styles/images/fishing.jpeg"
            alt="Свіжа риба"
            class="hero__image"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const content = ref(null)
const card = ref(null)

onMounted(() => {

  // 🎬 MAIN INTRO TIMELINE (Apple-style reveal)
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

  tl.from(".hero__eyebrow", {
    y: 20,
    opacity: 0,
    duration: 0.6
  })

  .from(".hero__title", {
    y: 40,
    opacity: 0,
    duration: 0.8
  }, "-=0.3")

  .from(".hero__sub", {
    y: 30,
    opacity: 0,
    duration: 0.7
  }, "-=0.4")

  .from(".hero__actions", {
    y: 30,
    opacity: 0,
    duration: 0.7
  }, "-=0.4")

  .from(".hero__stats .hero__stat", {
    y: 20,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6
  }, "-=0.4")

  .from(card.value, {
    scale: 0.85,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  }, "-=0.8")


  // 🌊 subtle floating loop (Apple feel)
  gsap.to(card.value, {
    y: 12,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  })

  // 🧠 mouse parallax (light premium depth)
  window.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2

    gsap.to(card.value, {
      rotateY: x * 8,
      rotateX: -y * 8,
      duration: 0.6,
      ease: "power2.out"
    })

    gsap.to(content.value, {
      x: x * 10,
      y: y * 6,
      duration: 0.6,
      ease: "power2.out"
    })
  })
})
</script>

<style scoped>

/* ================= BASE ================= */

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;

  background:
    radial-gradient(circle at 80% 20%, rgba(20,184,166,.18), transparent 35%),
    linear-gradient(135deg, var(--teal-900), var(--teal-700), var(--teal-600));
}

/* cinematic light */
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 45%);
  pointer-events: none;
}

/* overlay */
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0,0,0,.05), rgba(0,0,0,.2));
}

/* layout */
.hero__inner {
  position: relative;
  z-index: 2;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* ================= TEXT ================= */

.hero__eyebrow {
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 999px;

  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.15);

  color: #bfffea;
  font-size: 14px;
  font-weight: 600;

  margin-bottom: 20px;
}

.hero__title {
  font-size: clamp(3rem, 7vw, 5rem);
  line-height: 1.05;
  color: white;
  margin-bottom: 20px;
}

.hero__sub {
  max-width: 560px;
  color: rgba(255,255,255,.8);
  line-height: 1.7;
  font-size: 18px;
  margin-bottom: 40px;
}

/* ================= BUTTONS ================= */

.hero__actions {
  display: flex;
  gap: 14px;
  margin-bottom: 40px;
}

.btn {
  padding: 14px 26px;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
}

.btn--primary {
  background: white;
  color: #0f2f2a;
}

.btn--secondary {
  color: white;
  border: 1px solid rgba(255,255,255,.25);
  background: rgba(255,255,255,.05);
}

/* ================= STATS ================= */

.hero__stats {
  display: flex;
  gap: 40px;
}

.hero__stat strong {
  color: white;
  font-size: 26px;
}

.hero__stat span {
  color: rgba(255,255,255,.6);
  font-size: 14px;
}

/* ================= IMAGE ================= */
.hero__visual {
  display: flex;
  justify-content: center;
  align-items: center;

  /* 🔥 дає правильну висоту центрування */
  position: relative;
}

.hero__image-card {
  width: min(420px, 90vw);
  height: 520px; /* 🔥 ВАЖЛИВО: фіксована висота для правильного кадру */

  border-radius: 26px;
  overflow: hidden;

  box-shadow: 0 60px 140px rgba(0,0,0,0.5);
   transform: scale(1.03);
  transition: transform 0.3s ease;

  position: relative; 
}

.hero__image {
  width: 120%;
  height: 120%;
  object-fit: cover;
  object-position: 65% center;
  transform: none;
  transform: scale(1.03);
  transition: transform 0.3s ease;
}

/* ================= RESPONSIVE ================= */
@media (max-width: 992px) {
  .hero__inner {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 40px;
  }

  .hero__visual {
    order: -1;
    display: flex;
    justify-content: center;
  }

  .hero__image-card {
    width: min(420px, 90vw);
    max-height: 320px;
    border-radius: 20px;
  }

  .hero__image {
    transform: none;
  }

  .hero__actions,
  .hero__stats {
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero__sub {
    margin-left: auto;
    margin-right: auto;
    max-width: 90%;
  }
}

/* 🔥 ОКРЕМИЙ MEDIA QUERY */
@media (max-width: 576px) {

  .hero__title {
    font-size: 2.4rem;
    line-height: 1.1;
  }

  .hero__stats {
    gap: 18px;
  }

  .hero__image-card {
    width: 92vw;
    max-height: 260px;
  }

  .hero__actions {
    flex-direction: column;
    gap: 10px;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>