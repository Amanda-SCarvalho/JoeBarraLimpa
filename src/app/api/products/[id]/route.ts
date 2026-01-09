import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: { id: string };
};

// ✏️ PUT — editar produto
export async function PUT(request: Request, { params }: Params) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json(
      { error: "ID inválido" },
      { status: 400 }
    );
  }

  const body = await request.json();
  const { name, description, image, price, stock, category } = body;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      image,
      price: Number(price),
      stock: Number(stock),
      category,
    },
  });

  return NextResponse.json(product);
}

// 🗑️ DELETE — excluir produto
export async function DELETE(_: Request, { params }: Params) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json(
      { error: "ID inválido" },
      { status: 400 }
    );
  }

  await prisma.product.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
