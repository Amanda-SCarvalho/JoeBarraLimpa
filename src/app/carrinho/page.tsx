"use client";

import { useCart } from "@/contexts/CartContext";
import { generateWhatsAppMessage } from "@/utils/whatsappCheckout";

const phone = "5511985464418"; // Substitua pelo número de telefone desejado

export default function CarrinhoPage() {
    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
    } = useCart();

    function checkout() {
        const message = generateWhatsAppMessage(cart);
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">Carrinho</h1>
                <p className="text-zinc-400">Seu carrinho está vazio</p>
            </div>
        );
    }

    return (
        <section className="py-20 px-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Carrinho</h1>

            <div className="space-y-4">
                {cart.map(item => (
                    <div
                        key={item.id}
                        className="flex justify-between items-center bg-zinc-900 p-4 rounded-xl"
                    >
                        <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-sm text-zinc-400">
                                R$ {item.price.toFixed(2)}
                            </p>

                            {/* CONTROLE DE QUANTIDADE */}
                            <div className="flex items-center gap-3 mt-2">
                                <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="px-3 py-1 bg-zinc-800 rounded text-lg"
                                >
                                    −
                                </button>

                                <span className="min-w-[20px] text-center">
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() => increaseQuantity(item.id)}
                                    disabled={item.quantity >= item.stock}
                                    className="
      px-3 py-1 rounded text-lg
      bg-zinc-800
      disabled:opacity-40
      disabled:cursor-not-allowed
    "
                                >
                                    +
                                </button>
                            </div>

                            <p className="text-xs text-zinc-500 mt-1">
                                Estoque disponível: {item.stock}
                            </p>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-500 font-bold"
                        >
                            Remover
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-t border-zinc-800 pt-6">
                <p className="text-xl font-bold mb-4">
                    Total: R$ {total.toFixed(2)}
                </p>

                <button
                    onClick={checkout}
                    className="bg-green-500 text-black font-bold py-3 rounded w-full"
                >
                    Finalizar pedido no WhatsApp
                </button>

                <button
                    onClick={clearCart}
                    className="mt-3 text-zinc-400 underline w-full"
                >
                    Limpar carrinho
                </button>
            </div>
        </section>
    );
}
