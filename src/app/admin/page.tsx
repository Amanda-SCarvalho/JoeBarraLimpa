"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      setProducts(json.data ?? []);

    } catch (error) {
      console.error("Erro ao carregar produtos", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const totalProducts = products.length;
  const inStock = products.filter(p => p.stock > 0).length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  if (loading) {
    return <p className="text-zinc-400">Carregando dashboard...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        {/* TOTAL */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-sm text-zinc-400">
            Produtos cadastrados
          </h3>
          <p className="text-4xl font-bold mt-2 text-yellow-400">
            {totalProducts}
          </p>
        </div>

        {/* EM ESTOQUE */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-sm text-zinc-400">
            Em estoque
          </h3>
          <p className="text-4xl font-bold mt-2 text-green-400">
            {inStock}
          </p>
        </div>

        {/* SEM ESTOQUE */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-sm text-zinc-400">
            Sem estoque
          </h3>
          <p className="text-4xl font-bold mt-2 text-red-400">
            {outOfStock}
          </p>
        </div>

        {/* FUTURO */}
        <div className="bg-zinc-900 p-6 rounded-xl opacity-60">
          <h3 className="text-sm text-zinc-400">
            Faturamento
          </h3>
          <p className="text-lg mt-2">
            Em breve 💰
          </p>
        </div>
      </div>
    </div>
  );
}
