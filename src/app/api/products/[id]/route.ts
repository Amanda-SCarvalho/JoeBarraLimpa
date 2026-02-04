import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

// 📥 GET PRODUTO POR ID (admin)
export async function GET(
  _request: Request,
  context: Context
) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error("GET /products/[id] error:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}

// ✏️ ATUALIZAR PRODUTO / PUBLICAR / DESPUBLICAR
export async function PUT(
  request: Request,
  context: Context
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    // (opcional) impedir publicação sem estoque
    if (body.published === true && body.stock === 0) {
      return NextResponse.json(
        { error: "Não é possível publicar produto sem estoque" },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.image !== undefined && { image: body.image }),
        ...(body.price !== undefined && { price: body.price }),
        ...(body.stock !== undefined && { stock: body.stock }),
        ...(body.category !== undefined && { category: body.category }),
        ...(body.published !== undefined && { published: body.published }),
      },
    });

    return NextResponse.json({ data: product });
  } catch (error) {
    console.error("PUT /products/[id] error:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar produto" },
      { status: 500 }
    );
  }
}

// 🗑️ DELETAR PRODUTO
export async function DELETE(
  _request: Request,
  context: Context
) {
  try {
    const { id } = await context.params;

    await prisma.product.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /products/[id] error:", error);
    return NextResponse.json(
      { error: "Erro ao deletar produto" },
      { status: 500 }
    );
  }
}
