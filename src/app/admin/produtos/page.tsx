"use client";

import { useState } from "react";
import { products as initialProducts } from "@/data/products";
import { Product } from "@/types/Product";

export default function AdminProdutos() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [form, setForm] = useState<Product>({
    id: "",
    name: "",
    description: "",
    image: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.id) {
      // UPDATE
      setProducts((prev) =>
        prev.map((p) => (p.id === form.id ? form : p))
      );
    } else {
      // CREATE
      setProducts((prev) => [
        ...prev,
        { ...form, id: Date.now().toString() },
      ]);
    }

    setForm({ id: "", name: "", description: "", image: "" });
  }

  function handleEdit(product: Product) {
    setForm(product);
  }

  function handleDelete(id: string) {
    if (confirm("Remover produto?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Produtos</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 p-6 rounded-xl mb-10 space-y-4"
      >
        <input
          placeholder="Nome"
          className="w-full px-4 py-2 rounded border"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Imagem (URL)"
          className="w-full px-4 py-2 rounded border"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required
        />

        <textarea
          placeholder="Descrição"
          className="w-full px-4 py-2 rounded border"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <button className="bg-yellow-400 px-6 py-2 rounded font-bold">
          {form.id ? "Atualizar" : "Adicionar"}
        </button>
      </form>

      {/* LISTA */}
      <div className="grid md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-zinc-900 p-4 rounded-xl"
          >
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-sm text-zinc-500">{product.description}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-500"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id.toString())}
                className="text-red-500"
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
