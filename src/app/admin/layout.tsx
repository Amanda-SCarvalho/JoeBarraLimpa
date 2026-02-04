"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // 🔹 Carregar tema salvo (client only)
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    setIsDark(saved === "dark");
  }, []);

  // 🔹 Aplicar tema
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // 🔹 Fechar menu ao trocar rota
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/adminLogin");
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40 w-64
          bg-white dark:bg-zinc-950
          border-r border-zinc-200 dark:border-zinc-800
          p-6
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">
            <span className="text-yellow-400">Joe</span> Admin
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-xl"
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-sm">
          <Link href="/admin" className={pathname === "/admin" ? "text-yellow-400" : ""}>
            📊 Dashboard
          </Link>

          <Link
            href="/admin/produtos"
            className={pathname.startsWith("/admin/produtos") ? "text-yellow-400" : ""}
          >
            📦 Produtos
          </Link>

          <Link
            href="/admin/videos"
            className={pathname.startsWith("/admin/videos") ? "text-yellow-400" : ""}
          >
            📹 Vídeos
          </Link>

          <Link
            href="/admin/testimonials"
            className={pathname.startsWith("/admin/testimonials") ? "text-yellow-400" : ""}
          >
            📝 Testimonials
          </Link>

          <Link
            href="/admin/settings"
            className={pathname.startsWith("/admin/settings") ? "text-yellow-400" : ""}
          >
            ⚙️ Settings
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white"
        >
          Sair
        </button>
      </aside>

      {/* Overlay mobile */}
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* ================= CONTENT ================= */}
      <div className="flex-1">
        {/* Header mobile */}
        <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4">
          <span className="font-bold">
            <span className="text-yellow-400">Joe</span> Admin
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark((v) => !v)}
              aria-label="Alternar tema"
              className="h-9 w-9 rounded-full border border-zinc-300 dark:border-zinc-700"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="h-9 w-9 rounded-lg border border-zinc-300 dark:border-zinc-700"
            >
              ☰
            </button>
          </div>
        </header>

        <main className="p-6 pt-20 md:pt-6">{children}</main>
      </div>
    </div>
  );
}
