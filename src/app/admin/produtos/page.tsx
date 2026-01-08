"use client";


import { products as initialProducts } from "@/data/products";
import { Product } from "@/types/Product";
import { useState, useEffect } from "react";


export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const STORAGE_KEY = "admin-products";

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: Product[] = JSON.parse(stored);

        if (parsed.length > 0) {
          setProducts(parsed);
          return;
        }
      }

      // fallback real
      setProducts(initialProducts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    } catch {
      setProducts(initialProducts);
    }
  }, []);


  // 📸 UPLOAD + PREVIEW (local por enquanto)
  function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  }

  // ➕ CRIAR / ✏️ EDITAR
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !description) return;

    if (editingId) {
      setProducts(prev =>
        prev.map(p =>
          p.id === editingId
            ? { ...p, name, description, image }
            : p
        )
      );
      setEditingId(null);
    } else {
      setProducts(prev => [
        ...prev,
        {
          id: Date.now(),
          name,
          description,
          image,
        },
      ]);
    }

    setName("");
    setDescription("");
    setImage("");
  }

  // ✏️ EDITAR
  function handleEdit(product: Product) {
    setEditingId(product.id);
    setName(product.name);
    setDescription(product.description);
    setImage(product.image);
  }

  // 🗑️ EXCLUIR
  function handleDelete(id: number) {
    if (!confirm("Deseja excluir este produto?")) return;
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Gerenciar Produtos
      </h1>

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

        {uploading && (
          <p className="text-sm text-yellow-400">
            Carregando imagem...
          </p>
        )}

        {image && (
          <img
            src={image}
            alt="Preview"
            className="h-32 w-full object-cover rounded"
          />
        )}

        <button className="bg-yellow-400 text-black py-3 rounded font-bold">
          {editingId ? "Salvar alterações" : "Adicionar produto"}
        </button>
      </form>

      {/* LISTA */}
      <div className="grid md:grid-cols-3 gap-6">
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
            <p className="text-sm text-zinc-400 mb-4">
              {product.description}
            </p>

            <div className="flex gap-3">
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
