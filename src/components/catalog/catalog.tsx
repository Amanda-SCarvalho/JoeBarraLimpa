"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
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
        {products.map(product => (
          <div
            key={product.id}
            className="bg-zinc-900 p-4 rounded-xl"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
            )}

            <h3 className="font-bold">{product.name}</h3>
            <p className="text-sm text-zinc-400">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
