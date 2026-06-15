<template>
  <section id="contact" class="contact">
    <div class="container contact__inner">
      <div class="contact__info">
        <span class="section-eyebrow">Зв'яжіться з нами</span>
        <h2 class="section-title">Замовте рибу<br>сьогодні</h2>
        <p>Зателефонуйте або напишіть нам. Відповімо протягом 15 хвилин у робочий час.</p>
        <div class="contact__cards">
          <a href="tel:+380971234567" class="contact__card">
            <div class="contact__card-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.02 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
            </div>
            <div>
              <strong>Телефон</strong>
              <span>0939430016</span>
            </div>
          </a>
          <a href="https://t.me/rybnyjrynok" target="_blank" rel="noopener" class="contact__card contact__card--tg">
            <div class="contact__card-icon tg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.331l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.228z"/>
              </svg>
            </div>
            <div>
              <strong>Telegram</strong>
              <span>@rybnyjrynok</span>
            </div>
          </a>
          <div class="contact__card">
            <div class="contact__card-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div>
              <strong>Графік роботи</strong>
              <span>Пн–Нд: 7:00 – 19:00</span>
            </div>
          </div>
          <div class="contact__card">
            <div class="contact__card-icon">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <strong>Адреса</strong>
              <span>м. Ладижин, Вінницька обл.</span>
            </div>
          </div>
        </div>
      </div>

      <form class="contact__form" @submit.prevent="submit" novalidate>
        <h3>Замовлення онлайн</h3>
        <div class="form__group" :class="{ error: errors.name }">
          <label for="c-name">Ваше ім'я *</label>
          <input id="c-name" v-model.trim="form.name" type="text" placeholder="Крутий рибак" @input="errors.name=''" />
          <span class="form__error" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div class="form__group" :class="{ error: errors.phone }">
          <label for="c-phone">Телефон *</label>
          <input id="c-phone" v-model.trim="form.phone" type="tel" placeholder="+38 (097) 123-45-67" @input="errors.phone=''" />
          <span class="form__error" v-if="errors.phone">{{ errors.phone }}</span>
        </div>
        <div class="form__group">
          <label for="c-product">Що цікавить?</label>
          <select id="c-product" v-model="form.product">
            <option value="">Оберіть продукт</option>
            <option>Свіжа риба</option>
            <option>Копчена риба</option>
            <option>В'ялена риба</option>
            <option>Асорті</option>
          </select>
        </div>
        <div class="form__group">
          <label for="c-msg">Повідомлення</label>
          <textarea id="c-msg" v-model="form.message" rows="3" placeholder="Побажання, кількість, адреса доставки..."></textarea>
        </div>

        <button type="submit" class="form__submit" :class="{ sent }">
          <template v-if="sent">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
            Відправлено!
          </template>
          <template v-else>
            Надіслати запит
          </template>
        </button>

        <a :href="telegramLink" target="_blank" rel="noopener" class="form__tg-alt">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.331l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.228z"/>
          </svg>
          Або напишіть нам напряму в Telegram
        </a>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const TELEGRAM_USERNAME = 'rybnyjrynok'

const sent = ref(false)
const form = reactive({ name: '', phone: '', product: '', message: '' })
const errors = reactive({ name: '', phone: '' })

const telegramLink = computed(() => `https://t.me/${TELEGRAM_USERNAME}`)

function validate() {
  let ok = true
  if (!form.name || form.name.length < 2) {
    errors.name = "Введіть ім'я"
    ok = false
  }
  const ph = form.phone.replace(/\D/g, '')
  if (!ph || ph.length < 10) {
    errors.phone = 'Введіть коректний телефон'
    ok = false
  }
  return ok
}

function submit() {
  if (!validate()) return
  // Формуємо посилання і відкриваємо Telegram
  const text = [
    '📬 Запит з контактної форми',
    '',
    `👤 Ім'я: ${form.name}`,
    `📞 Телефон: ${form.phone}`,
    form.product ? `🐟 Продукт: ${form.product}` : '',
    form.message ? `💬 Повідомлення: ${form.message}` : '',
  ].filter(Boolean).join('\n')

  window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(text)}`, '_blank')

  sent.value = true
  setTimeout(() => {
    sent.value = false
    Object.assign(form, { name: '', phone: '', product: '', message: '' })
  }, 3000)
}
</script>

<style scoped>
.contact { padding: 80px 0; background: var(--sand); }
.contact__inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start;
}
.section-eyebrow {
  display: block; color: var(--teal-700); font-weight: 600;
  font-size: 13px; text-transform: uppercase; letter-spacing: .1em; margin-bottom: 8px;
}
.section-title {
  font-family: var(--font-display); font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: var(--ink); margin-bottom: 16px; line-height: 1.2;
}
.section-title em { font-style: italic; color: var(--teal-700); }
.contact__info > p { color: var(--muted); line-height: 1.7; margin-bottom: 28px; }

.contact__cards { display: flex; flex-direction: column; gap: 12px; }
.contact__card {
  display: flex; align-items: center; gap: 14px;
  background: var(--white); border-radius: 14px;
  padding: 16px 18px; text-decoration: none;
  box-shadow: var(--shadow); transition: transform .2s, box-shadow .2s;
}
.contact__card:hover { transform: translateX(4px); box-shadow: var(--shadow-lg); }
.contact__card--tg { border: 1.5px solid rgba(42,171,238,.2); }
.contact__card-icon {
  width: 40px; height: 40px; border-radius: 10px;
  background: var(--teal-100); color: var(--teal-700);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.contact__card-icon.tg { background: #e8f5fd; color: #2AABEE; }
.contact__card strong { display: block; font-size: 13px; color: var(--muted); font-weight: 500; }
.contact__card span { font-size: 15px; font-weight: 600; color: var(--ink); }

/* Form */
.contact__form {
  background: var(--white); border-radius: 24px;
  padding: 36px; box-shadow: var(--shadow-lg);
}
.contact__form h3 { font-family: var(--font-display); font-size: 22px; margin-bottom: 24px; color: var(--ink); }
.form__group { margin-bottom: 16px; }
.form__group label { display: block; font-size: 13px; font-weight: 600; color: var(--ink); margin-bottom: 6px; }
.form__group input,
.form__group select,
.form__group textarea {
  width: 100%; padding: 12px 14px;
  border: 1.5px solid var(--sand-dark);
  border-radius: 12px; font-size: 15px;
  background: var(--sand); color: var(--ink);
  transition: border-color .2s; resize: vertical;
  font-family: inherit;
}
.form__group input:focus,
.form__group select:focus,
.form__group textarea:focus {
  outline: none; border-color: var(--teal-500); background: var(--white);
}
.form__group.error input,
.form__group.error select { border-color: var(--error); }
.form__error { display: block; font-size: 12px; color: var(--error); margin-top: 4px; }

.form__submit {
  width: 100%; padding: 14px;
  background: var(--teal-700); color: #fff;
  border: none; border-radius: 14px; font-size: 16px;
  font-weight: 600; cursor: pointer; transition: all .2s;
  margin-top: 8px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.form__submit:hover { background: var(--teal-900); }
.form__submit.sent { background: var(--success); }

.form__tg-alt {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  margin-top: 14px; font-size: 13px; color: #2AABEE;
  text-decoration: none; font-weight: 500;
  transition: opacity .2s;
}
.form__tg-alt:hover { opacity: .8; }

@media (max-width: 900px) {
  .contact__inner { grid-template-columns: 1fr; gap: 40px; }
  .contact__form { padding: 24px; }
}
@media (max-width: 480px) {
  .contact { padding: 60px 0; }
}
</style>
