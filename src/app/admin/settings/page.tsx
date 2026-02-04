"use client";

import { useEffect, useState } from "react";
import { CreateAdminForm } from "@/components/admin/CreateAdminForm";

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

type ApiError = {
  error: string;
};

export default function AdminSettingsPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [newUser, setNewUser] = useState<NewAdmin>({
    username: "",
    password: "",
    role: "ADMIN",
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
    loadUsers();
  }, []);

  async function createUser() {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    let data: AdminUser | ApiError | null = null;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      if (data && "error" in data) {
        alert(data.error);
      } else {
        alert("Erro ao criar login");
      }
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

  async function deleteUser(user: AdminUser) {
    const firstConfirm = confirm(
      `Tem certeza que deseja excluir o usuário "${user.username}"?`
    );
    if (!firstConfirm) return;

    const secondConfirm = prompt(
      `Digite EXCLUIR para confirmar a exclusão do usuário "${user.username}"`
    );

    if (secondConfirm !== "EXCLUIR") {
      alert("Exclusão cancelada");
      return;
    }

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

  return (
    <div className="max-w-3xl">
      
      <h1 className="text-3xl font-bold mb-6">Admins</h1>

      {/* Lista */}
      <div className="grid gap-4 mt-6">
        {users.map((user) => (
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
                className="px-3 py-2 rounded text-sm font-semibold bg-red-600 text-white"
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
