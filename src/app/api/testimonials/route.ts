import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, service, comment } = await req.json();

  const testimonial = await prisma.testimonial.create({
    data: {
      name,
      service,
      comment,
      approved: false,
    },
  });

  return NextResponse.json(testimonial);
}
