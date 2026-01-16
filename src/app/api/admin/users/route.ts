import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  const users = await prisma.admin.findMany();
  return NextResponse.json(users);
}


/* export async function GET() {
const users = await prisma.admin.findMany({
  select: {
    id: true,
    username: true,
    role: true,
    active: true,
    createdAt: true,
  } satisfies Prisma.AdminSelect,
});

  return NextResponse.json(users);
} */
