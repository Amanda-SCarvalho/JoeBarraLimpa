"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Product } from "@/types/Product";
import { useCart } from "@/contexts/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    }
    loadProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center py-20">Carregando...</p>;
  }

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl"
        />
      )}

      <div>
        <h1 className="text-3xl font-bold mb-4">
          {product.name}
        </h1>

        <p className="text-zinc-400 mb-6">
          {product.description}
        </p>

        <p className="text-3xl font-bold text-yellow-400 mb-4">
          R$ {product.price.toFixed(2)}
        </p>

        <button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="bg-yellow-400 text-black px-6 py-3 rounded font-bold hover:bg-yellow-500 disabled:opacity-50"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </section>
  );
}
