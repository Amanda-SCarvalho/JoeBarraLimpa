import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 📥 GET — listar produtos
export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(products);
}

// ➕ POST — criar produto
export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, image, price, stock, category } = body;

  if (!name || !description) {
    return NextResponse.json(
      { error: "Nome e descrição são obrigatórios" },
      { status: 400 }
    );
  }

  const product = await prisma.product.create({
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

// ✏️ PUT — atualizar produto
export async function PUT(request: Request) {
  const body = await request.json();
  const { id, name, description, image, price, stock, category } = body;

  if (!id) {
    return NextResponse.json(
      { error: "ID do produto é obrigatório" },
      { status: 400 }
    );
  }

  const product = await prisma.product.update({
    where: { id: Number(id) },
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(image && { image }),
      ...(price !== undefined && { price: Number(price) }),
      ...(stock !== undefined && { stock: Number(stock) }),
      ...(category && { category }),
    },
  });

  return NextResponse.json(product);
}

// 🗑️ DELETE — excluir produto
export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "ID do produto é obrigatório" },
      { status: 400 }
    );
  }

  await prisma.product.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json({ success: true });
}
