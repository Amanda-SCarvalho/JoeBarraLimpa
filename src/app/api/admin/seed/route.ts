// app/api/admin/seed/route.ts
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import {prisma} from "@/lib/prisma";

export async function GET() {
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
