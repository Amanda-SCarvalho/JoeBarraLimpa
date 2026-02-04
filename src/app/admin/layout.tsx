"use client";
export const dynamic = "force-dynamic";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/adminLogin");
  }

  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">
      <aside
        className={`
    fixed md:static inset-y-0 left-0 z-40 w-64 bg-zinc-950 border-r border-zinc-800 p-6
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

          <button onClick={() => setOpen(false)} className="md:hidden text-xl">
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-sm">
          <Link
            onClick={() => setOpen(false)}
            href="/admin"
            className={pathname === "/admin" ? "text-yellow-400" : ""}
          >
            📊 Dashboard
          </Link>

          <Link
            onClick={() => setOpen(false)}
            href="/admin/produtos"
            className={
              pathname.startsWith("/admin/produtos") ? "text-yellow-400" : ""
            }
          >
            📦 Produtos
          </Link>

          <Link
            onClick={() => setOpen(false)}
            href="/admin/videos"
            className={
              pathname.startsWith("/admin/videos") ? "text-yellow-400" : ""
            }
          >
            📹 Videos
          </Link>

          <Link
            onClick={() => setOpen(false)}
            href="/admin/testimonials"
            className={
              pathname.startsWith("/admin/testimonials")
                ? "text-yellow-400"
                : ""
            }
          >
            📝 Testimonials
          </Link>

          <Link
            onClick={() => setOpen(false)}
            href="/admin/settings"
            className={
              pathname.startsWith("/admin/settings") ? "text-yellow-400" : ""
            }
          >
            ⚙️ Settings
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded-lg"
        >
          Sair
        </button>
      </aside>

      {/* Header mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4">
        <span className="font-bold">
          <span className="text-yellow-400">Joe</span> Admin
        </span>

        <button onClick={() => setOpen(true)} className="text-2xl">
          ☰
        </button>
      </div>

      <main className="flex-1 p-6 pt-20 md:pt-6">{children}</main>
    </div>
  );
}
