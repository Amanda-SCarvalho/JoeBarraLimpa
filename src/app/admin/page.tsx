"use client";

import { products } from "@/data/products";

export default function AdminDashboard() {
  const totalProducts = products.length;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* PRODUTOS */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-sm text-zinc-400">
            Produtos cadastrados
          </h3>
          <p className="text-4xl font-bold mt-2 text-yellow-400">
            {totalProducts}
          </p>
        </div>

        {/* VÍDEOS */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-sm text-zinc-400">
            Vídeos
          </h3>
          <p className="text-4xl font-bold mt-2">🎥</p>
        </div>

        {/* CONTATOS */}
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-sm text-zinc-400">
            Leads / Contato
          </h3>
          <p className="text-4xl font-bold mt-2">📞</p>
        </div>
      </div>
    </div>
  );
}
