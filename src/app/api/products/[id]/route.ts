import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// 📥 GET PRODUTO
export async function GET(
  _: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

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

// ✏️ ATUALIZAR PRODUTO
export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        description: body.description,
        image: body.image || null,
        price: body.price,
        stock: body.stock,
        category: body.category || null,
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
  _: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

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
