"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  function handleLogin() {
    if (password === "admin123") {
      localStorage.setItem("admin-auth", "true");
      router.push("/admin");
    } else {
      alert("Senha incorreta");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="w-full max-w-sm rounded-xl bg-zinc-900 p-6 space-y-4">
        <h1 className="text-xl font-bold text-center">Admin Login</h1>

        <input
          type="password"
          placeholder="Senha"
          className="w-full rounded-md px-3 py-2 bg-zinc-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-md bg-yellow-400 py-2 font-bold text-black hover:bg-yellow-500"
        >
          Entrar
        </button>
      </div>
    </main>
  );
}
