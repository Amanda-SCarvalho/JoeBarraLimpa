"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  // 🔄 BUSCAR PRODUTOS
  async function loadProducts() {
  try {
    const res = await fetch("/api/products");

    if (!res.ok) {
      throw new Error("Erro ao buscar produtos");
    }

    const json = await res.json();
    setProducts(Array.isArray(json.data) ? json.data : []);
  } catch (error) {
    console.error(error);
    setProducts([]);
  }
}


  useEffect(() => {
    loadProducts();
  }, []);

  // 📸 Preview local
  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      setImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  // ➕ / ✏️ SALVAR
  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (loading) return;

  if (!name || !description || !price || !stock) {
    alert("Preencha todos os campos obrigatórios");
    return;
  }

  setLoading(true);

  const payload = {
    name,
    description,
    image,
    price: Number.parseFloat(price),
    stock: Number.parseInt(stock),
    category,
  };

  if (editingId === null) {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } else {
    await fetch(`/api/products/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  setName("");
  setDescription("");
  setImage("");
  setPrice("");
  setStock("");
  setCategory("");
  setEditingId(null);
  setLoading(false);

  loadProducts();
}


  // ✏️ EDITAR
  function handleEdit(product: Product) {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
    setImage(product.image ?? "");
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setCategory(product.category ?? "");
  }

  // 🗑️ EXCLUIR
  async function handleDelete(id: number) {
    if (!confirm("Deseja excluir este produto?")) return;

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gerenciar Produtos</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl mb-10 grid gap-4 max-w-xl"
      >
        <input
          placeholder="Nome do produto"
          value={name}
          onChange={e => setName(e.target.value)}
          className="p-3 rounded bg-zinc-800"
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="p-3 rounded bg-zinc-800"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="p-3 rounded bg-zinc-800"
        />

        <input
          type="number"
          placeholder="Preço (R$)"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="p-3 rounded bg-zinc-800"
        />

        <input
          type="number"
          placeholder="Estoque"
          value={stock}
          onChange={e => setStock(e.target.value)}
          className="p-3 rounded bg-zinc-800"
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-3 rounded bg-zinc-800"
        >
          <option value="">Categoria</option>
          <option value="farol-led">Faróis LED</option>
          <option value="multimidia">Multimídia</option>
          <option value="eletrica">Elétrica</option>
          <option value="acabamento">Acabamento</option>
        </select>

        {image && (
          <img
            src={image}
            alt="Preview"
            className="h-32 w-full object-cover rounded"
          />
        )}

        <button
          disabled={loading}
          className="bg-yellow-400 text-black py-3 rounded font-bold disabled:opacity-50"
        >
          {editingId ? "Salvar alterações" : "Adicionar produto"}
        </button>
      </form>

      {/* LISTA */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-zinc-900 p-4 rounded-xl">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
            )}

            <h3 className="font-bold">{product.name}</h3>
            <p className="text-sm text-zinc-400 mb-4">{product.description}</p>

            <p className="text-sm text-zinc-400">
              R$ {product.price.toFixed(2)}
            </p>

            <p
              className={`text-sm ${product.stock > 0 ? "text-green-400" : "text-red-400"
                }`}
            >
              {product.stock > 0
                ? `${product.stock} em estoque`
                : "Sem estoque"}
            </p>

            <span className="text-xs text-yellow-400">{product.category}</span>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-zinc-700 py-2 rounded"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-600 py-2 rounded"
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
