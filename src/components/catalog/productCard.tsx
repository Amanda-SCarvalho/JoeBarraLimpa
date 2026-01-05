import Link from "next/link";
import { Product } from "@/types/Product";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const message = encodeURIComponent(
    `Olá! Gostaria de orçamento para o produto: ${product.name}`
  );

  return (
    <div className="card flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded mb-4"
      />

      <h3 className="font-semibold text-lg mb-2">
        {product.name}
      </h3>

      <p className="text-sm text-(--color-text-muted) mb-4">
        {product.description}
      </p>

      <Link
        href={`https://wa.me/5511985464418?text=${message}`}
        target="_blank"
        className="btn-primary mt-auto text-center"
      >
        Solicitar orçamento
      </Link>
    </div>
  );
}
