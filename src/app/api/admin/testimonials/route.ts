import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const data = await prisma.testimonial.findMany({
    where: { approved: false },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  const { id } = await req.json();

  await prisma.testimonial.update({
    where: { id },
    data: { approved: true },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.testimonial.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
