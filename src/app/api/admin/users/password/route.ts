import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, password } = body;

    if (!id || !password) {
      return NextResponse.json(
        { error: "ID e nova senha são obrigatórios" },
        { status: 400 }
      );
    }

    // 🔒 Validação simples de senha
    if (password.length < 6) {
      return NextResponse.json(
        { error: "A senha deve ter no mínimo 6 caracteres" },
        { status: 400 }
      );
    }

    const user = await prisma.admin.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    // 🔐 Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro interno ao alterar senha" },
      { status: 500 }
    );
  }
}
