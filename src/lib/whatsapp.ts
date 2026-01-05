// whatsapp.ts
export function createWhatsAppLink(message: string) {
  return `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(message)}`;
}
