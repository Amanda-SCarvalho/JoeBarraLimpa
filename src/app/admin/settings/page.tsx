"use client";

import { useEffect, useState } from "react";

type Role = "ADMIN" | "EDITOR";

type AdminUser = {
  id: string;
  username: string;
  role: Role;
  active: boolean;
};

type NewAdmin = {
  username: string;
  password: string;
  role: Role;
};

export default function AdminSettingsPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);

  const [newUser, setNewUser] = useState<NewAdmin>({
    username: "",
    password: "",
    role: "ADMIN",
  });

  const [newPassword, setNewPassword] = useState("");

  // 🔹 Carrega usuário logado
  const [loggedUser] = useState<AdminUser | null>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("admin-user");
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

  async function loadUsers() {
    try {
      const res = await fetch("/api/admin/users");

      if (!res.ok) {
        console.error("Erro ao carregar admins");
        return;
      }

      const data: AdminUser[] = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function init() {
      await loadUsers();
    }
    init();
  }, []);

  async function createUser() {
    if (!newUser.username || !newUser.password) {
      alert("Preencha todos os campos");
      return;
    }

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Erro ao criar usuário");
      return;
    }

    setNewUser({ username: "", password: "", role: "ADMIN" });
    loadUsers();
  }

  async function toggleActive(user: AdminUser) {
    await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.id,
        active: !user.active,
      }),
    });

    loadUsers();
  }

  // 🔒 BLOQUEIO DE EXCLUSÃO DO PRÓPRIO USUÁRIO
  async function deleteUser(user: AdminUser) {
    if (user.id === loggedUser?.id) {
      alert("Você não pode excluir o próprio usuário.");
      return;
    }

    const confirmDelete = confirm(
      `Tem certeza que deseja excluir "${user.username}"?`,
    );
    if (!confirmDelete) return;

    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id }),
    });

    if (!res.ok) {
      alert("Erro ao excluir usuário");
      return;
    }

    loadUsers();
  }

  // 🔐 ALTERAR SENHA DO USUÁRIO LOGADO
  async function changePassword() {
    if (!newPassword) {
      alert("Digite a nova senha");
      return;
    }

    if (!loggedUser) return;

    const res = await fetch("/api/admin/users/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: loggedUser.id,
        password: newPassword,
      }),
    });

    if (!res.ok) {
      alert("Erro ao alterar senha");
      return;
    }

    alert("Senha alterada com sucesso");
    setNewPassword("");
  }

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-3xl font-bold">Admins</h1>

      {/* 👤 Usuário Logado */}
      {loggedUser && (
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Minha Conta</h2>

          <div className="space-y-2 mb-4">
            <p>
              <strong>Username:</strong> {loggedUser.username}
            </p>
            <p>
              <strong>Role:</strong> {loggedUser.role}
            </p>
            <p>
              <strong>Senha:</strong> ********
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="password"
              placeholder="Nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
            />

            <button
              onClick={changePassword}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold"
            >
              Alterar Senha
            </button>
          </div>
        </div>
      )}

      {/* ➕ Criar novo admin */}
      <div className="bg-zinc-900 p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Criar novo admin</h2>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, username: e.target.value }))
            }
            className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
          />

          <input
            type="password"
            placeholder="Senha"
            value={newUser.password}
            onChange={(e) =>
              setNewUser((prev) => ({ ...prev, password: e.target.value }))
            }
            className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
          />

          <select
            value={newUser.role}
            onChange={(e) =>
              setNewUser((prev) => ({
                ...prev,
                role: e.target.value as Role,
              }))
            }
            className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="EDITOR">EDITOR</option>
          </select>

          <button
            onClick={createUser}
            className="bg-green-600 hover:bg-green-700 transition px-4 py-2 rounded font-semibold"
          >
            Criar usuário
          </button>
        </div>
      </div>

      {/* 📋 Lista de Admins */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className={`bg-zinc-900 p-4 rounded-xl flex justify-between items-center ${
              user.active ? "" : "opacity-50"
            }`}
          >
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-xs text-zinc-400">{user.role}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleActive(user)}
                className={`px-3 py-2 rounded text-sm font-semibold ${
                  user.active
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-black"
                }`}
              >
                {user.active ? "Desativar" : "Ativar"}
              </button>

              <button
                onClick={() => deleteUser(user)}
                disabled={user.id === loggedUser?.id}
                className={`px-3 py-2 rounded text-sm font-semibold ${
                  user.id === loggedUser?.id
                    ? "bg-zinc-700 cursor-not-allowed"
                    : "bg-red-600"
                }`}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
