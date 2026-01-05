import { products } from "@/data/products";
import ProductCard from "./productCard";

export default function Catalog() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="section-title text-center">
          Catálogo de Produtos
        </h1>

        <p className="section-subtitle text-center">
          Confira nossos produtos e modificações para caminhões Scania
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
