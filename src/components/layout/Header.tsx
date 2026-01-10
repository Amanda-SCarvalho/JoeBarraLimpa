"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );


  // Carregar tema salvo
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDark(saved === "dark");
  }, []);

  // Aplicar tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // 👉 FECHAR MENU AO TROCAR DE ROTA
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`
    fixed top-0 w-full
    border-b border-zinc-200 dark:border-zinc-800
    bg-white/80 dark:bg-black/80
    backdrop-blur
    transition-all
    ${menuOpen ? "z-60" : "z-50"}
  `}
      >

        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold">
            <span className="text-yellow-400">Joe</span>{" "}
            <span>BarraLimpa</span>
          </h1>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-yellow-500 transition">
              Início
            </Link>
            <Link href="/catalogo" className="hover:text-yellow-500 transition">
              Catálogo
            </Link>
            <Link href="/videos" className="hover:text-yellow-500 transition">
              Vídeos
            </Link>
          </nav>

          {/* Ações */}
          <div className="flex items-center gap-3">
            {/* 🛒 Carrinho */}
            <Link
              href="/carrinho"
              className="relative flex items-center justify-center
             h-9 w-9 rounded-full
             border border-zinc-300 dark:border-zinc-700
             bg-white dark:bg-zinc-900
             hover:bg-zinc-100 dark:hover:bg-zinc-800
             transition"
            >
              <span className="text-lg">🛒</span>

              {totalItems > 0 && (
                <span
                  className="
        absolute -top-2 -right-2
        bg-yellow-400 text-black
        text-xs font-bold
        h-5 w-5 flex items-center justify-center
        rounded-full
      "
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Dark mode */}
            <button
              onClick={() => setIsDark((prev) => !prev)}
              aria-label="Alternar tema"
              className="
                relative flex items-center justify-center
                h-9 w-9 rounded-full
                border border-zinc-300 dark:border-zinc-700
                bg-white dark:bg-zinc-900
                hover:bg-zinc-100 dark:hover:bg-zinc-800
                transition-all
              "
            >
              <span
                className={`absolute transition-all ${isDark
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 rotate-90"
                  }`}
              >
                ☀️
              </span>
              <span
                className={`absolute transition-all ${!isDark
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 -rotate-90"
                  }`}
              >
                🌙
              </span>
            </button>

            {/* Botão orçamento desktop */}
            <Link
              href="https://wa.me/5511985464418"
              target="_blank"
              className="
                hidden sm:inline-flex
                rounded-xl bg-yellow-400
                px-4 py-2 text-sm font-bold text-black
                hover:bg-yellow-500 transition
              "
            >
              Orçamento
            </Link>

            {/* 🔥 BOTÃO HAMBÚRGUER ANIMADO */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Menu"
              className="
    md:hidden
    flex items-center justify-center
    w-10 h-10
    rounded-lg
    border border-zinc-300 dark:border-zinc-700
    bg-white dark:bg-zinc-900
    hover:bg-zinc-100 dark:hover:bg-zinc-800
    transition
  "
            >
              {menuOpen ? (
                /* ÍCONE X */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-zinc-900 dark:text-zinc-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                /* ÍCONE HAMBÚRGUER */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-zinc-900 dark:text-zinc-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>



          </div>
        </div>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
      )}

      {/* Menu Mobile */}
      <aside
        className={`
    fixed top-0 right-0 z-50 h-full w-72
    bg-white dark:bg-black
    border-l border-zinc-200 dark:border-zinc-800
    transform transition-transform duration-300
    ${menuOpen ? "translate-x-0" : "translate-x-full"}
  `}
      >

        <nav className="flex flex-col gap-6 p-6 mt-16 text-lg font-medium">
          <Link href="/">Início</Link>
          <Link href="/catalogo">Catálogo</Link>
          <Link href="/videos">Vídeos</Link>

          <Link
            href="/carrinho"
            className="flex items-center justify-between"
          >
            <span>Carrinho</span>

            {totalItems > 0 && (
              <span className="bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>


          <Link
            href="https://wa.me/5511985464418"
            target="_blank"
            className="
              mt-6 rounded-xl bg-yellow-400
              px-4 py-3 text-center font-bold text-black
            "
          >
            Solicitar orçamento
          </Link>
        </nav>
      </aside>
    </>
  );
}
