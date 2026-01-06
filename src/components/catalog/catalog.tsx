import ProductCard from "./productCard";
import { Product } from "@/types/Product";

interface CatalogProps {
  products: Product[];
}

export default function Catalog({ products }: CatalogProps) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Catálogo Completo</h2>
        <p className="section-subtitle">
          Produtos e modificações para caminhões Scania
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
