"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("admin-auth") === "true";

    if (!isAuth) {
      router.replace("/adminLogin");
    } else {
      setChecked(true);
    }
  }, [router]);

  // ⛔ Evita renderizar antes da verificação
  if (!checked) return null;

  return <>{children}</>;
}
