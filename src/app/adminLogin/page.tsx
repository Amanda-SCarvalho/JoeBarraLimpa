"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (password === "admin123") {
      localStorage.setItem("admin-auth", "true");
      router.replace("/admin");
    } else {
      alert("Senha incorreta");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-xl w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login Admin
        </h1>

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-zinc-800 mb-4"
        />

        <button className="w-full bg-yellow-400 text-black py-3 rounded font-bold">
          Entrar
        </button>
      </form>
    </div>
  );
}
