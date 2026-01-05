import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="
        border-t
        transition-colors
      "
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderColor: "var(--color-text-muted)",
      }}
    >
      <div className="container py-10 text-center">

        <p
          className="text-sm"
          style={{ color: "var(--color-text-muted)" }}
        >
          © {new Date().getFullYear()} Elétrica e Modificações Scania.
          <br />
          Todos os direitos reservados.
        </p>

        <div className="mt-4 flex justify-center gap-6 text-sm">
          <Link href="/" className="hover:text-(--color-primary) transition">
            Início
          </Link>
          <Link href="/catalogo" className="hover:text-(--color-primary) transition">
            Catálogo
          </Link>
          <Link href="/videos" className="hover:text-(--color-primary) transition">
            Vídeos
          </Link>
        </div>
      </div>
    </footer>
  );
}
