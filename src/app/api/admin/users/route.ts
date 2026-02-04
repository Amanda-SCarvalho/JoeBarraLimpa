import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const users = await prisma.admin.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      active: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const { username, password, role } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Usuário e senha obrigatórios" },
        { status: 400 }
      );
    }

    const exists = await prisma.admin.findUnique({
      where: { username },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Usuário já existe" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        role,
        active: true,
      },
    });

    return NextResponse.json({
      id: user.id,
      username: user.username,
      role: user.role,
      active: user.active,
    });
  } catch (error) {
    console.error("POST /api/admin/users", error);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  const { id, active } = await req.json();

  await prisma.admin.update({
    where: { id },
    data: { active },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.admin.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
