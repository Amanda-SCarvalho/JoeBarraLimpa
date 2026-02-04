"use client";
export const dynamic = "force-dynamic";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  /* ======================
     THEME (dark / light)
  ====================== */
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (globalThis === undefined) return "dark";
    return (localStorage.getItem("theme") as "light" | "dark") ?? "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  /* ======================
     LOGOUT
  ====================== */
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/adminLogin");
  }

  return (
    <div className="min-h-screen flex bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
      {/* ======================
          SIDEBAR
      ====================== */}
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
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className={pathname === "/admin" ? "text-yellow-400" : ""}
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/produtos"
            onClick={() => setOpen(false)}
            className={
              pathname.startsWith("/admin/produtos")
                ? "text-yellow-400"
                : ""
            }
          >
            📦 Produtos
          </Link>

          <Link
            href="/admin/videos"
            onClick={() => setOpen(false)}
            className={
              pathname.startsWith("/admin/videos")
                ? "text-yellow-400"
                : ""
            }
          >
            📹 Vídeos
          </Link>

          <Link
            href="/admin/testimonials"
            onClick={() => setOpen(false)}
            className={
              pathname.startsWith("/admin/testimonials")
                ? "text-yellow-400"
                : ""
            }
          >
            📝 Testimonials
          </Link>

          <Link
            href="/admin/settings"
            onClick={() => setOpen(false)}
            className={
              pathname.startsWith("/admin/settings")
                ? "text-yellow-400"
                : ""
            }
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

      {/* Overlay mobile (acessível) */}
      {open && (
        <button type="button"
          tabIndex={0}
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* ======================
          CONTENT
      ====================== */}
      <div className="flex-1">
        {/* Header mobile */}
        <header
          className="
            md:hidden fixed top-0 left-0 right-0 z-50 h-14
            bg-white dark:bg-zinc-950
            border-b border-zinc-200 dark:border-zinc-800
            flex items-center justify-between px-4
          "
        >
          <span className="font-bold">
            <span className="text-yellow-400">Joe</span> Admin
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="text-xl"
              aria-label="Alternar tema"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setOpen(true)}
              className="text-2xl"
              aria-label="Abrir menu"
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
