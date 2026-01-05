import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative
        flex
        items-center
        justify-center
        text-center
        px-6
        min-h-screen
        bg-cover
        bg-position-[center_60%]
        transition-colors
      "
      style={{
        backgroundImage: "url('/images/hero/hero-scania.jpg')",
      }}
    >
      {/* Overlay adaptável */}
      <div className="absolute inset-0 bg-white/60 dark:bg-black/70 transition-colors" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-yellow-400 transition-colors">
          Especialista em Elétrica e Modificações Scania
        </h1>

        <p className="mt-6 text-lg text-zinc-700 dark:text-gray-200 transition-colors">
          Qualidade, experiência e soluções personalizadas para o seu caminhão.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://wa.me/5511985464418"
            target="_blank"
            className="btn-primary"
          >
            Solicitar Orçamento
          </Link>

          <Link href="/catalogo" className="btn-outline">
            Ver Catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
