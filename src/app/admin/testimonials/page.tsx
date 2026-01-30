"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  service: string;
  comment: string;
  approved: boolean;
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");

  async function load() {
    const res = await fetch("/api/admin/testimonials");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleStatus(id: number, approved: boolean) {
    await fetch("/api/admin/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    load();
  }

  const filteredItems = items.filter((t) => {
    if (filter === "active") return t.approved;
    if (filter === "inactive") return !t.approved;
    return true;
  });

  async function remove(id: number) {
    const ok = confirm("Tem certeza que deseja excluir este comentário?");
    if (!ok) return;

    await fetch("/api/admin/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    load();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Testemunhos</h1>

      {/* 🔍 Filtros */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-yellow-400 text-black" : "bg-zinc-800"
          }`}
        >
          Todos
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded ${
            filter === "active" ? "bg-green-500 text-black" : "bg-zinc-800"
          }`}
        >
          Ativos
        </button>

        <button
          onClick={() => setFilter("inactive")}
          className={`px-4 py-2 rounded ${
            filter === "inactive" ? "bg-red-500 text-black" : "bg-zinc-800"
          }`}
        >
          Inativos
        </button>
      </div>

      {/* 📋 Lista */}
      <div className="grid gap-4">
        {filteredItems.map((t) => (
          <div
            key={t.id}
            className={`p-6 rounded-xl border ${
              t.approved
                ? "bg-zinc-900 border-green-500/40"
                : "bg-zinc-800 border-red-500/40 opacity-80"
            }`}
          >
            <p className="italic mb-2">"{t.comment}"</p>

            <p className="text-sm opacity-70">
              {t.name} · {t.service}
            </p>

            <div className="flex items-center justify-between mt-4 gap-2">
              <span
                className={`text-xs font-semibold ${
                  t.approved ? "text-green-400" : "text-red-400"
                }`}
              >
                {t.approved ? "ATIVO" : "INATIVO"}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleStatus(t.id, !t.approved)}
                  className={`px-4 py-2 rounded font-semibold ${
                    t.approved
                      ? "bg-red-500 text-black"
                      : "bg-green-500 text-black"
                  }`}
                >
                  {t.approved ? "Desativar" : "Ativar"}
                </button>

                <button
                  onClick={() => remove(t.id)}
                  className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
