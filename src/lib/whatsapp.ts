// whatsapp.ts
export function createWhatsAppLink(message: string) {
  return `https://wa.me/5511985464418?text=${encodeURIComponent(message)}`;
}
