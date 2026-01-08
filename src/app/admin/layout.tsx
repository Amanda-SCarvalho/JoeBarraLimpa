"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth") === "true";
    if (!isAuth) router.replace("/adminLogin");
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("admin-auth");
    router.push("/adminLogin");
  }

  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:flex flex-col">
        <h2 className="text-xl font-bold mb-8">
          <span className="text-yellow-400">Joe</span> Admin
        </h2>

        <nav className="flex flex-col gap-4 text-sm">
          <Link
            href="/admin"
            className={`hover:text-yellow-400 ${
              pathname === "/admin" && "text-yellow-400"
            }`}
          >
            📊 Dashboard
          </Link>

          <Link
            href="/admin/produtos"
            className={`hover:text-yellow-400 ${
              pathname.startsWith("/admin/produtos") && "text-yellow-400"
            }`}
          >
            📦 Produtos
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
        >
          Sair
        </button>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
