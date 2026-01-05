import Link from "next/link";
import { products } from "@/data/products";

export default function CatalogPreview() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Catálogo de Produtos</h2>
        <p className="section-subtitle">
          Produtos e modificações para caminhões Scania.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {products.slice(0, 3).map((product) => (
            <Link
              key={product.id}
              href="/catalogo"
              className="card hover:scale-[1.02] transition flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded mb-4"
              />

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
