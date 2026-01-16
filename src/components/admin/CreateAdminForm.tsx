"use client";

type NewAdmin = {
  username: string;
  password: string;
  role: "ADMIN" | "OWNER";
};

type Props = {
  value: NewAdmin;
  onChange: (value: NewAdmin) => void;
  onSubmit: () => void;
};

export function CreateAdminForm({ value, onChange, onSubmit }: Props) {
  return (
    <div className="bg-zinc-900 p-6 rounded-xl mb-10 grid gap-4">
      <input
        placeholder="Usuário"
        value={value.username}
        onChange={e =>
          onChange({ ...value, username: e.target.value })
        }
        className="p-3 bg-zinc-800 rounded"
      />

      <input
        type="password"
        placeholder="Senha"
        value={value.password}
        onChange={e =>
          onChange({ ...value, password: e.target.value })
        }
        className="p-3 bg-zinc-800 rounded"
      />

      <select
        value={value.role}
        onChange={e =>
          onChange({
            ...value,
            role: e.target.value as "ADMIN" | "OWNER",
          })
        }
        className="p-3 bg-zinc-800 rounded"
      >
        <option value="ADMIN">Admin</option>
        <option value="OWNER">Owner</option>
      </select>

      <button
        onClick={onSubmit}
        className="bg-yellow-400 text-black py-3 rounded font-bold"
      >
        Criar admin
      </button>
    </div>
  );
}
