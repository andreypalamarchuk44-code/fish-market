<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="#top" class="footer__logo">
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <ellipse cx="13" cy="14" rx="10" ry="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
            <path d="M23 14c2-2 4-1 5 0-1 1-3 2-5 0z" fill="rgba(255,255,255,0.7)"/>
            <circle cx="10" cy="12.5" r="1.2" fill="white"/>
          </svg>
          Рибний Ринок
        </a>
        <p>Свіжа риба просто зі ставка<br>до вашого столу</p>
      </div>
      <div class="footer__col">
        <h4>Меню</h4>
        <a href="#catalog">Каталог</a>
        <a href="#about">Про нас</a>
        <a href="#gallery">Галерея</a>
        <a href="#contact">Контакти</a>
      </div>
      <div class="footer__col">
        <h4>Категорії</h4>
        <span>Свіжа риба</span>
        <span>Копчена риба</span>
        <span>В'ялена риба</span>
      </div>
      <div class="footer__col">
        <h4>Контакти</h4>
        <a href="tel:+380971234567">+38 (097) 123-45-67</a>
        <a href="mailto:info@rybnyj-rynok.ua">info@rybnyj-rynok.ua</a>
        <span>Пн–Нд: 7:00 – 19:00</span>
      </div>
    </div>
    <div class="footer__copy container">
      © 2026 Рибний Ринок · Всі права захищено
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--teal-900); color: rgba(255,255,255,.75);
  padding: 60px 0 0;
}
.footer__inner {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr 1fr;
  gap: 40px; padding-bottom: 48px;
  border-bottom: 1px solid rgba(255,255,255,.1);
}
.footer__logo {
  font-family: var(--font-display); font-size: 20px;
  color: #fff; display: flex; align-items: center; gap: 8px;
  margin-bottom: 10px; text-decoration: none;
  transition: color .2s;
}
.footer__logo:hover { color: var(--teal-100); }
.footer__brand p { font-size: 14px; line-height: 1.7; }
.footer__col { display: flex; flex-direction: column; gap: 10px; }
.footer__col h4 { color: #fff; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.footer__col a, .footer__col span { font-size: 14px; color: rgba(255,255,255,.65); text-decoration: none; }
.footer__col a:hover { color: var(--teal-100); }
.footer__copy {
  text-align: center; padding: 20px 0;
  font-size: 13px; color: rgba(255,255,255,.4);
}
@media (max-width: 768px) {
  .footer__inner { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .footer__inner { grid-template-columns: 1fr; }
}
</style>
