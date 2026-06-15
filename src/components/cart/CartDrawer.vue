<template>
  <Transition name="fade">
    <div v-if="open" class="cart-overlay" @click="$emit('close')" />
  </Transition>

  <Transition name="drawer">
    <aside v-if="open" class="cart" role="dialog" aria-modal="true" aria-label="Кошик">

      <div class="cart__header">
        <div class="cart__header-left">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <h2>Кошик
            <span v-if="totalCount" class="cart__count-pill">{{ totalCount }}</span>
          </h2>
        </div>
        <button class="cart__close" @click="$emit('close')" aria-label="Закрити кошик">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Порожній -->
      <div v-if="cart.length === 0" class="cart__empty">
        <div class="cart__empty-icon" aria-hidden="true">
          <svg width="48" height="48" fill="none" stroke="var(--sand-dark)" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <p>Кошик порожній</p>
        <span>Додайте рибу з каталогу</span>
        <a href="#catalog" class="cart__empty-link" @click="$emit('close')">Перейти до каталогу</a>
      </div>

      <!-- Товари -->
      <div v-else class="cart__items">
        <TransitionGroup name="item-list">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <div class="cart-item__img">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="cart-item__body">
              <div class="cart-item__top">
                <h3 class="cart-item__name">{{ item.name }}</h3>
                <button class="cart-item__del" @click="remove(item.id)" aria-label="Видалити">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
              <span class="cart-item__price-unit">{{ item.price }} грн/кг</span>
              <div class="cart-item__bottom">
                <div class="cart-item__controls">
                  <button @click="changeQty(item.id, -1)" aria-label="Зменшити">−</button>
                  <span>{{ item.qty }} кг</span>
                  <button @click="changeQty(item.id, 1)" aria-label="Збільшити">+</button>
                </div>
                <strong class="cart-item__total">{{ item.price * item.qty }} грн</strong>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- Підсумок -->
      <div v-if="cart.length > 0" class="cart__footer">
        <div class="cart__summary-row">
          <span>Товарів:</span>
          <span>{{ totalCount }} кг</span>
        </div>
        <div class="cart__summary-row total">
          <span>До сплати:</span>
          <strong>{{ totalPrice }} грн</strong>
        </div>

        <button class="cart__checkout" @click="$emit('checkout')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.19 13.331l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.958.228z"/>
          </svg>
          Замовити через Telegram
        </button>

        <button class="cart__clear" @click="clear">
          Очистити кошик
        </button>
      </div>

    </aside>
  </Transition>
</template>

<script setup>
import { useCart } from '../../composables/useCart'

defineProps({ open: { type: Boolean, default: false } })
defineEmits(['close', 'checkout'])

const { cart, totalCount, totalPrice, remove, changeQty, clear } = useCart()
</script>

<style scoped>
.cart-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,.45);
  z-index: 999;
}

.cart {
  position: fixed; top: 0; right: 0;
  width: 400px; max-width: 100vw;
  height: 100dvh;
  background: white;
  z-index: 1000;
  display: flex; flex-direction: column;
  box-shadow: -20px 0 60px rgba(0,0,0,.18);
}

/* Header */
.cart__header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20px 20px;
  border-bottom: 1px solid #f0f0f0;
  flex-shrink: 0;
}
.cart__header-left {
  display: flex; align-items: center; gap: 10px;
  color: var(--teal-900);
}
.cart__header-left h2 {
  font-size: 18px; margin: 0;
  display: flex; align-items: center; gap: 8px;
}
.cart__count-pill {
  background: var(--teal-700); color: white;
  font-size: 12px; font-weight: 700;
  border-radius: 99px; padding: 2px 8px;
}
.cart__close {
  width: 34px; height: 34px;
  border: none; background: #f4f4f4; border-radius: 99px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #888; transition: background .2s;
}
.cart__close:hover { background: #e8e8e8; }

/* Empty */
.cart__empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  padding: 40px 24px; text-align: center; gap: 8px;
}
.cart__empty-icon { margin-bottom: 8px; opacity: .5; }
.cart__empty p { font-size: 16px; font-weight: 600; color: var(--ink); }
.cart__empty span { font-size: 14px; color: var(--muted); }
.cart__empty-link {
  margin-top: 16px; padding: 10px 20px;
  background: var(--teal-700); color: white;
  border-radius: 12px; text-decoration: none;
  font-size: 14px; font-weight: 600;
  transition: background .2s;
}
.cart__empty-link:hover { background: var(--teal-900); }

/* Items */
.cart__items {
  flex: 1; overflow-y: auto;
  padding: 8px 0;
}

.cart-item {
  display: flex; gap: 12px;
  padding: 14px 20px;
  border-bottom: 1px solid #f5f5f5;
  transition: background .15s;
}
.cart-item:hover { background: #fafafa; }

.cart-item__img {
  width: 60px; height: 60px; flex-shrink: 0;
  border-radius: 10px; overflow: hidden;
  background: var(--sand);
}
.cart-item__img img {
  width: 100%; height: 100%; object-fit: cover;
}

.cart-item__body { flex: 1; min-width: 0; }
.cart-item__top {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 6px; margin-bottom: 2px;
}
.cart-item__name {
  font-size: 15px; font-weight: 600; color: var(--ink);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.cart-item__del {
  flex-shrink: 0; width: 24px; height: 24px;
  border: none; background: none; cursor: pointer;
  color: #bbb; display: flex; align-items: center; justify-content: center;
  border-radius: 6px; transition: color .15s, background .15s;
}
.cart-item__del:hover { color: var(--error); background: #fef2f2; }

.cart-item__price-unit { font-size: 12px; color: var(--muted); }

.cart-item__bottom {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 8px;
}
.cart-item__controls {
  display: flex; align-items: center; gap: 8px;
}
.cart-item__controls button {
  width: 28px; height: 28px;
  border: 1.5px solid var(--sand-dark);
  background: white; color: var(--teal-700);
  border-radius: 8px; cursor: pointer;
  font-size: 16px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  transition: border-color .15s, background .15s;
}
.cart-item__controls button:hover {
  border-color: var(--teal-500); background: var(--teal-100);
}
.cart-item__controls span { font-size: 14px; font-weight: 600; min-width: 36px; text-align: center; }
.cart-item__total { font-size: 15px; font-weight: 700; color: var(--teal-900); }

/* Footer */
.cart__footer {
  padding: 20px;
  border-top: 1px solid #f0f0f0;
  flex-shrink: 0;
  background: white;
}
.cart__summary-row {
  display: flex; justify-content: space-between;
  font-size: 14px; color: var(--muted);
  margin-bottom: 8px;
}
.cart__summary-row.total {
  font-size: 16px; color: var(--ink);
  margin-bottom: 16px; padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}
.cart__summary-row.total strong { font-size: 20px; color: var(--teal-900); }

.cart__checkout {
  width: 100%; padding: 14px;
  background: #2AABEE; color: white;
  border: none; border-radius: 14px;
  font-size: 15px; font-weight: 700;
  cursor: pointer; margin-bottom: 10px;
  display: flex; align-items: center; justify-content: center; gap: 9px;
  transition: background .2s, transform .15s;
}
.cart__checkout:hover { background: #229ED9; transform: translateY(-1px); }

.cart__clear {
  width: 100%; padding: 11px;
  border-radius: 12px;
  border: 1.5px solid var(--sand-dark);
  background: white; color: var(--muted);
  font-size: 14px; cursor: pointer;
  transition: border-color .2s, color .2s;
}
.cart__clear:hover { border-color: var(--error); color: var(--error); }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.drawer-enter-active, .drawer-leave-active { transition: transform .3s cubic-bezier(.4,0,.2,1); }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); }

.item-list-enter-active { transition: all .2s ease; }
.item-list-leave-active { transition: all .2s ease; position: absolute; width: 100%; }
.item-list-enter-from { opacity: 0; transform: translateX(20px); }
.item-list-leave-to { opacity: 0; transform: translateX(20px); }

/* Mobile */
@media (max-width: 480px) {
  .cart { width: 100%; }
}
</style>
