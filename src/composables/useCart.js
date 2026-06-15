import { ref, computed, watch } from 'vue'

// Telegram bot config — замініть на свій username
export const TELEGRAM_USERNAME = 'rybnyjrynok'

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('fish_cart') || '[]')
  } catch {
    return []
  }
}

const cart = ref(loadCart())

watch(cart, value => {
  localStorage.setItem('fish_cart', JSON.stringify(value))
}, { deep: true })

export function useCart() {
  const totalCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.qty, 0)
  )

  const totalPrice = computed(() =>
    Number(cart.value.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2))
  )

  function add(product) {
    const existing = cart.value.find(item => item.id === product.id)
    if (existing) {
      existing.qty++
      return
    }
    cart.value.push({ ...product, qty: 1 })
  }

  function remove(id) {
    cart.value = cart.value.filter(item => item.id !== id)
  }

  function changeQty(id, delta) {
    const item = cart.value.find(item => item.id === id)
    if (!item) return
    item.qty += delta
    if (item.qty <= 0) remove(id)
  }

  function clear() {
    cart.value = []
  }

  // Формує текст замовлення для Telegram
  const checkoutMessage = computed(() => {
    if (!cart.value.length) return ''
    const lines = cart.value.map(item =>
      `• ${item.name} × ${item.qty} кг = ${item.price * item.qty} грн`
    )
    return [
      '🛒 Замовлення з сайту Рибний Ринок',
      '',
      ...lines,
      '',
      `💰 Разом: ${totalPrice.value} грн`,
    ].join('\n')
  })

  // Відкриває Telegram з готовим повідомленням
  function sendToTelegram(name, phone, comment) {
    const header = [
      '🛒 Нове замовлення — Рибний Ринок',
      '',
      `👤 Ім'я: ${name}`,
      `📞 Телефон: ${phone}`,
      comment ? `💬 Коментар: ${comment}` : '',
      '',
      '─────────────────',
    ].filter(Boolean).join('\n')

    const items = cart.value.map(item =>
      `• ${item.name} × ${item.qty} кг = ${item.price * item.qty} грн`
    ).join('\n')

    const footer = [
      '─────────────────',
      `💰 Разом: ${totalPrice.value} грн`,
    ].join('\n')

    const text = [header, items, footer].join('\n')
    const encoded = encodeURIComponent(text)
    window.open(`https://t.me/${TELEGRAM_USERNAME}?text=${encoded}`, '_blank')
  }

  return {
    cart,
    totalCount,
    totalPrice,
    add,
    remove,
    changeQty,
    clear,
    checkoutMessage,
    sendToTelegram,
  }
}
