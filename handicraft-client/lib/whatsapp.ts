export const WHATSAPP_NUMBER = '9779800000000' // replace with actual number

export function buildWhatsAppOrderMessage(
  cart: { name: string; quantity: number; price: number }[],
  total: number
): string {
  const itemDetails = cart
    .map(item => `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
    .join('\n')
  const message = `Namaste A.A. HANDICRAFT! I'd like to place an order:\n\n${itemDetails}\n\n*Total: $${total.toFixed(2)}*\n\nPlease let me know about availability and payment.`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}