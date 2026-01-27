import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// futuramente: nodemailer

export async function POST(req: Request) {
  const data = await req.json();

  // salvar testemunho se existir
  if (data.testimonialName && data.comment) {
    await prisma.testimonial.create({
      data: {
        name: data.testimonialName,
        service: data.service,
        comment: data.comment,
      },
    });
  }

  // 👉 aqui você pode integrar EMAIL depois (nodemailer / resend)

  return NextResponse.json({ success: true });
}
