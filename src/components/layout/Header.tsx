"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <header className="
      fixed top-0 z-50 w-full
      border-b border-zinc-200 dark:border-zinc-800
      bg-(--color-bg-secondary)
      backdrop-blur
    ">
      <div className="container flex h-16 items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <span className="text-yellow-400">Joe</span>{" "}
          <span>BarraLimpa</span>
        </h1>

        {/* Navegação */}
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark((prev) => !prev)}
            aria-label="Alternar tema"
            className="
    relative flex items-center justify-center
    h-9 w-9
    rounded-full
    border border-zinc-300 dark:border-zinc-700
    bg-white dark:bg-zinc-900
    hover:bg-zinc-100 dark:hover:bg-zinc-800
    transition-all duration-300
  "
          >
            <span
              className={`
      absolute transition-all duration-300
      ${isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-90"}
    `}
            >
              ☀️
            </span>

            <span
              className={`
      absolute transition-all duration-300
      ${!isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-90"}
    `}
            >
              🌙
            </span>
          </button>


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
        </div>
      </div>
    </header>
  );
}
