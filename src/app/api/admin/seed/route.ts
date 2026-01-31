// app/api/admin/seed/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Seed desabilitado em produção" },
      { status: 403 }
    );
  }

  const hashedPassword = await hashPassword("admin123");

  await prisma.admin.create({
    data: {
      username: "admin1",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  return NextResponse.json({ ok: true });
}
