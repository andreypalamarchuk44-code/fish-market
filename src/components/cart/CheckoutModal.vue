<template>
  <Transition name="modal-fade">
    <div v-if="open" class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">

        <button class="modal__close" @click="$emit('close')" aria-label="Закрити">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Крок 1: форма -->
        <template v-if="step === 'form'">
          <div class="modal__header">
            <div class="modal__icon">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>
              </svg>
            </div>
            <h2 id="modal-title" class="modal__title">Оформлення замовлення</h2>
            <p class="modal__subtitle">Заповніть дані — ми зв'яжемося з вами в Telegram</p>
          </div>

          <!-- Короткий підсумок -->
          <div class="modal__summary">
            <div class="summary__row" v-for="item in cart" :key="item.id">
              <span class="summary__name">{{ item.name }} × {{ item.qty }} кг</span>
              <span class="summary__price">{{ item.price * item.qty }} грн</span>
            </div>
            <div class="summary__total">
              <span>Разом:</span>
              <strong>{{ totalPrice }} грн</strong>
            </div>
          </div>

          <div class="modal__form">
            <div class="form-field" :class="{ error: errors.name }">
              <label for="checkout-name">Ваше ім'я *</label>
              <input
                id="checkout-name"
                v-model.trim="form.name"
                type="text"
                placeholder="Іван Петренко"
                autocomplete="name"
                @input="errors.name = ''"
              />
              <span class="form-field__error" v-if="errors.name">{{ errors.name }}</span>
            </div>

            <div class="form-field" :class="{ error: errors.phone }">
              <label for="checkout-phone">Телефон *</label>
              <input
                id="checkout-phone"
                v-model.trim="form.phone"
                type="tel"
                placeholder="+38 (097) 123-45-67"
                autocomplete="tel"
                @input="errors.phone = ''"
              />
              <span class="form-field__error" v-if="errors.phone">{{ errors.phone }}</span>
            </div>

            <div class="form-field">
              <label for="checkout-comment">Коментар до замовлення</label>
              <textarea
                id="checkout-comment"
                v-model="form.comment"
                rows="2"
                placeholder="Адреса доставки, час, побажання..."
              ></textarea>
            </div>

            <button class="btn-telegram" @click="handleSubmit">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.331l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.228z"/>
              </svg>
              Відправити замовлення в Telegram
            </button>

            <p class="modal__note">
              Натискаючи кнопку, відкриється Telegram з вашим замовленням — просто надішліть повідомлення.
            </p>
          </div>
        </template>

        <!-- Крок 2: успіх -->
        <template v-else>
          <div class="modal__success">
            <div class="success__icon">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#16a34a" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2>Дякуємо!</h2>
            <p>Замовлення передано в Telegram. Ми зв'яжемося з вами найближчим часом.</p>
            <button class="btn-close-success" @click="finish">Закрити</button>
          </div>
        </template>

      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useCart } from '../../composables/useCart'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const { cart, totalPrice, sendToTelegram, clear } = useCart()

const step = ref('form')
const form = reactive({ name: '', phone: '', comment: '' })
const errors = reactive({ name: '', phone: '' })

// Reset on open
watch(() => props.open, (val) => {
  if (val) {
    step.value = 'form'
    Object.assign(form, { name: '', phone: '', comment: '' })
    Object.assign(errors, { name: '', phone: '' })
  }
})

function validate() {
  let ok = true
  if (!form.name || form.name.length < 2) {
    errors.name = 'Введіть ім\'я (мін. 2 символи)'
    ok = false
  }
  const phoneClean = form.phone.replace(/\D/g, '')
  if (!phoneClean || phoneClean.length < 10) {
    errors.phone = 'Введіть коректний номер телефону'
    ok = false
  }
  return ok
}

function handleSubmit() {
  if (!validate()) return
  sendToTelegram(form.name, form.phone, form.comment)
  step.value = 'success'
}

function finish() {
  clear()
  emit('close')
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.55);
  backdrop-filter: blur(4px);
  z-index: 1100;
  display: flex; align-items: center; justify-content: center;
  padding: 16px;
}

.modal {
  position: relative;
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0,0,0,.25);
}

.modal__close {
  position: absolute; top: 16px; right: 16px;
  width: 36px; height: 36px;
  border: none; background: #f4f4f4; border-radius: 99px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #666;
  transition: background .2s;
  z-index: 2;
}
.modal__close:hover { background: #e5e5e5; }

.modal__header {
  padding: 32px 32px 0;
  text-align: center;
}
.modal__icon {
  width: 56px; height: 56px;
  background: var(--teal-100); border-radius: 16px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  color: var(--teal-700);
}
.modal__title { font-family: var(--font-display); font-size: 22px; color: var(--ink); margin-bottom: 6px; }
.modal__subtitle { font-size: 14px; color: var(--muted); }

/* Summary */
.modal__summary {
  margin: 20px 32px 0;
  background: var(--sand);
  border-radius: 14px;
  padding: 14px 16px;
}
.summary__row {
  display: flex; justify-content: space-between;
  font-size: 14px; color: var(--muted);
  padding: 3px 0;
}
.summary__name { flex: 1; padding-right: 8px; }
.summary__price { font-weight: 600; color: var(--ink); white-space: nowrap; }
.summary__total {
  display: flex; justify-content: space-between;
  border-top: 1px solid var(--sand-dark);
  margin-top: 10px; padding-top: 10px;
  font-size: 15px; color: var(--ink);
}
.summary__total strong { font-size: 17px; color: var(--teal-900); }

/* Form */
.modal__form { padding: 20px 32px 32px; }

.form-field { margin-bottom: 14px; }
.form-field label {
  display: block; font-size: 13px; font-weight: 600;
  color: var(--ink); margin-bottom: 6px;
}
.form-field input,
.form-field textarea {
  width: 100%; padding: 12px 14px;
  border: 1.5px solid var(--sand-dark);
  border-radius: 12px; font-size: 15px;
  background: var(--sand); color: var(--ink);
  transition: border-color .2s, background .2s;
  resize: vertical; font-family: inherit;
}
.form-field input:focus,
.form-field textarea:focus {
  outline: none; border-color: var(--teal-500); background: white;
}
.form-field.error input { border-color: var(--error); }
.form-field__error { display: block; font-size: 12px; color: var(--error); margin-top: 4px; }

.btn-telegram {
  width: 100%; padding: 15px;
  background: #2AABEE; color: white;
  border: none; border-radius: 14px;
  font-size: 16px; font-weight: 700;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: background .2s, transform .2s;
  margin-top: 8px;
}
.btn-telegram:hover { background: #229ED9; transform: translateY(-1px); }
.btn-telegram:active { transform: translateY(0); }

.modal__note {
  font-size: 12px; color: var(--muted);
  text-align: center; margin-top: 12px; line-height: 1.6;
}

/* Success */
.modal__success {
  padding: 48px 32px;
  text-align: center;
}
.success__icon {
  width: 72px; height: 72px;
  background: #dcfce7; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
}
.modal__success h2 { font-family: var(--font-display); font-size: 26px; color: var(--ink); margin-bottom: 12px; }
.modal__success p { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 28px; }
.btn-close-success {
  padding: 13px 32px;
  background: var(--teal-700); color: white;
  border: none; border-radius: 14px;
  font-size: 16px; font-weight: 600;
  cursor: pointer; transition: background .2s;
}
.btn-close-success:hover { background: var(--teal-900); }

/* Animation */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .25s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }

/* Mobile */
@media (max-width: 520px) {
  .modal { border-radius: 20px 20px 0 0; max-height: 95vh; }
  .modal-backdrop { align-items: flex-end; padding: 0; }
  .modal__header, .modal__form { padding-left: 20px; padding-right: 20px; }
  .modal__summary { margin-left: 20px; margin-right: 20px; }
}
</style>
