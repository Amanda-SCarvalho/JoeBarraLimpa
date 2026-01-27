"use client";

import { useEffect, useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  service: string;
  comment: string;
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);

  async function load() {
    const res = await fetch("/api/admin/testimonials");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function approve(id: number) {
    await fetch("/api/admin/testimonials", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  async function remove(id: number) {
    await fetch("/api/admin/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Testemunhos pendentes
      </h1>

      <div className="grid gap-4">
        {items.map((t) => (
          <div key={t.id} className="bg-zinc-900 p-6 rounded-xl">
            <p className="italic mb-2">"{t.comment}"</p>
            <p className="text-sm opacity-70">
              {t.name} · {t.service}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => approve(t.id)}
                className="bg-green-500 text-black px-4 py-2 rounded"
              >
                Aprovar
              </button>

              <button
                onClick={() => remove(t.id)}
                className="bg-red-500 text-black px-4 py-2 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
