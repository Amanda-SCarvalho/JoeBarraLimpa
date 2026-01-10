"use client";

import Link from "next/link";
import { Product } from "@/types/Product";

export default function ProductCard({ product }: { product: Product }) {
  const inStock = product.stock > 0;

  return (
    <div className="bg-zinc-900 p-4 rounded-xl flex flex-col">
      <Link href={`/produto/${product.id}`}>
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="h-44 w-full object-cover rounded mb-3"
          />
        )}

        <h3 className="font-bold text-lg mb-1">
          {product.name}
        </h3>

        <p className="text-sm text-zinc-400 line-clamp-2 mb-3">
          {product.description}
        </p>
      </Link>

      <p className="text-xl font-bold text-yellow-400">
        R$ {product.price.toFixed(2)}
      </p>

      <p
        className={`text-sm mb-4 ${
          inStock ? "text-green-400" : "text-red-400"
        }`}
      >
        {inStock ? `${product.stock} em estoque` : "Indisponível"}
      </p>

      <Link
        href={`/produto/${product.id}`}
        className="mt-auto bg-yellow-400 text-black py-2 rounded font-bold text-center hover:bg-yellow-500"
      >
        Ver produto
      </Link>
    </div>
  );
}
