"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/Product";

export default function CatalogPreview() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const json = await res.json();

      // ✅ pega o array correto
      setProducts(Array.isArray(json.data) ? json.data.slice(0, 3) : []);
    }

    loadProducts();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Catálogo de Produtos</h2>
        <p className="section-subtitle">
          Produtos e modificações para caminhões Scania.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {products.map(product => (
            <Link
              key={product.id}
              href="/catalogo"
              className="card hover:scale-[1.02] transition flex flex-col"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover rounded mb-4"
                />
              )}

              <h3 className="font-semibold mb-2">
                {product.name}
              </h3>

              <p className="text-sm text-(--color-text-muted)">
                {product.description}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link href="/catalogo" className="btn-primary">
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
}
