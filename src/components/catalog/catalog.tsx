"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/types/CartItem";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();

        setProducts(Array.isArray(json.data) ? json.data : []);
      } catch (error) {
        console.error("Erro ao carregar catálogo", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Carregando produtos...</p>;
  }

  return (
    <section className="py-20 px-6">
      <h1 className="text-3xl font-bold text-center mb-12">
        Catálogo de Produtos
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const cartItem = cart.find(item => item.id === product.id);
          const isMaxStock = cartItem
            ? cartItem.quantity >= product.stock
            : false;

          const inStock = product.stock > 0;

          return (
            <div
              key={product.id}
              className="bg-zinc-900 p-4 rounded-xl flex flex-col"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded mb-3"
                />
              )}

              <h3 className="font-bold text-lg mb-1">
                {product.name}
              </h3>

              <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* PREÇO */}
              <p className="text-xl font-bold text-yellow-400 mb-1">
                R$ {Number(product.price).toFixed(2)}
              </p>

              {/* ESTOQUE */}
              <p
                className={`text-sm mb-4 ${inStock ? "text-green-400" : "text-red-400"
                  }`}
              >
                {inStock
                  ? `${product.stock} em estoque`
                  : "Sem estoque"}
              </p>

              {/* BOTÃO */}
              <button
                disabled={!inStock || isMaxStock}
                onClick={() => addToCart(product)}
                className="
          mt-auto
          bg-yellow-400 text-black
          py-2 rounded font-bold
          hover:bg-yellow-500
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
              >
                {isMaxStock ? "Estoque máximo" : "Adicionar ao carrinho"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
