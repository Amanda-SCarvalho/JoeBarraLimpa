"use client";

import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return <p className="text-center py-20">Carrinho vazio 🛒</p>;
  }

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-10">Carrinho</h1>

      {cart.map(item => (
        <div
          key={item.id}
          className="flex justify-between items-center bg-zinc-900 p-4 rounded mb-4"
        >
          <div>
            <p className="font-bold">{item.name}</p>
            <p className="text-sm text-zinc-400">
              {item.quantity} x R$ {item.price.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-400"
          >
            Remover
          </button>
        </div>
      ))}

      <p className="text-2xl font-bold mt-6">
        Total: R$ {total.toFixed(2)}
      </p>

      <a
        href={`https://wa.me/55SEUNUMERO?text=${encodeURIComponent(
          `Pedido:\n${cart
            .map(p => `${p.quantity}x ${p.name}`)
            .join("\n")}\n\nTotal: R$ ${total.toFixed(2)}`
        )}`}
        target="_blank"
        className="block mt-6 bg-green-500 text-black text-center py-3 rounded font-bold"
      >
        Finalizar pelo WhatsApp
      </a>
    </section>
  );
}
