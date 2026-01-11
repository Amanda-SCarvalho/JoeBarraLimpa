import { CartItem } from "../types/CartItem";

export function generateWhatsAppMessage(items: CartItem[]) {
  const lines = items.map(item =>
    `• ${item.name} (${item.quantity}x) - R$ ${(item.price * item.quantity).toFixed(2)}`
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return encodeURIComponent(`
Olá! Gostaria de finalizar meu pedido:

${lines.join("\n")}

Total: R$ ${total.toFixed(2)}
  `.trim());
}
