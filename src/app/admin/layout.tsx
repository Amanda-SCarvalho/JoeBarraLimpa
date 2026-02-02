"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/adminLogin");
  }

  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">
      <aside className="w-64 border-r border-zinc-800 p-6 hidden md:flex flex-col">
        <h2 className="text-xl font-bold mb-8">
          <span className="text-yellow-400">Joe</span> Admin
        </h2>

        <nav className="flex flex-col gap-4 text-sm">
          <Link
            href="/admin"
            className={pathname === "/admin" ? "text-yellow-400" : ""}
          >
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
            📹 Videos
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
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 rounded-lg"
        >
          Sair
        </button>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
