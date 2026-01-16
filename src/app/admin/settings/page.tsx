"use client";

import { useEffect, useState } from "react";
import { CreateAdminForm } from "@/components/admin/CreateAdminForm";

type AdminUser = {
  id: string;
  username: string;
  role: "OWNER" | "ADMIN";
  active: boolean;
};

type NewAdmin = {
  username: string;
  password: string;
  role: "ADMIN" | "OWNER";
};

export default function AdminSettingsPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [newUser, setNewUser] = useState<NewAdmin>({
    username: "",
    password: "",
    role: "ADMIN",
  });

  async function loadUsers() {
  const res = await fetch("/api/admin/users");

  if (!res.ok) {
    console.error("Erro ao carregar admins");
    return;
  }

  const data = await res.json();
  setUsers(data);
}


  useEffect(() => {
    loadUsers();
  }, []);

  async function createUser() {
    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

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

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Admins</h1>

      {/* Criar admin */}
      <CreateAdminForm
        value={newUser}
        onChange={setNewUser}
        onSubmit={createUser}
      />

      {/* Lista */}
      <div className="grid gap-4">
        {users.map(user => (
          <div
            key={user.id}
            className={`bg-zinc-900 p-4 rounded-xl flex justify-between items-center ${
              !user.active && "opacity-50"
            }`}
          >
            <div>
              <p className="font-semibold">{user.username}</p>
              <p className="text-xs text-zinc-400">{user.role}</p>
            </div>

            <button
              onClick={() => toggleActive(user)}
              className={`px-4 py-2 rounded text-sm font-semibold ${
                user.active
                  ? "bg-red-500 text-black"
                  : "bg-green-500 text-black"
              }`}
            >
              {user.active ? "Desativar" : "Ativar"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
