import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: products });
  } catch (error) {
    console.error("GET /products error:", error);
    return NextResponse.json(
      { data: [], error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        image: body.image || null,
        price: body.price,
        stock: body.stock,
        category: body.category || null,
      },
    });

    return NextResponse.json({ data: product }, { status: 201 });
  } catch (error) {
    console.error("POST /products error:", error);
    return NextResponse.json(
      { error: "Erro ao criar produto" },
      { status: 500 }
    );
  }
}
