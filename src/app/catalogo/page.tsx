import Catalog from "@/components/catalog/catalog";
import { products } from "@/data/products";

export default function CatalogPage() {
  return <Catalog products={products} />;
}
