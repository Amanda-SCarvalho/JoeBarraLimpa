import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_: Request, { params }: Params) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(params.id) },
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

export async function PUT(request: Request, { params }: Params) {
  try {
    const body = await request.json();

    const product = await prisma.product.update({
      where: { id: Number(params.id) },
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

export async function DELETE(_: Request, { params }: Params) {
  try {
    await prisma.product.delete({
      where: { id: Number(params.id) },
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
