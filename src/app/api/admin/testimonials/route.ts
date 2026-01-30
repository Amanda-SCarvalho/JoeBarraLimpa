import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { id: "desc" },
  });

  return NextResponse.json(testimonials);
}


export async function PUT(req: Request) {
  const { id, approved } = await req.json();

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: { approved },
  });

  return NextResponse.json(testimonial);
}


export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.testimonial.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
