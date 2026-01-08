"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { products as initialProducts } from "@/data/products";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("admin-products");

    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) {
        setProducts(parsed);
        return;
      }
    }

    setProducts(initialProducts);
  }, []);

  return (
    <section className="section">
      <div className="container grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="card">
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
