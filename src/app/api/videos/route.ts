import { NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

/* =======================
   GET - listar vídeos
======================= */
export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(videos);
}

/* =======================
   POST - criar vídeo
======================= */
export async function POST(req: Request) {
  const formData = await req.formData();

  const platform = formData.get("platform") as "youtube" | "instagram";
  const url = formData.get("url") as string;
  const file = formData.get("thumbnail") as File | null;

  let thumbnail = "";

  // 👉 Instagram precisa de capa
  if (platform === "instagram") {
    if (!file) {
      return NextResponse.json(
        { error: "Thumbnail obrigatória para Instagram" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(uploadPath, buffer);
    thumbnail = `/uploads/${fileName}`;
  }

  // 👉 YouTube usa thumb automática
  if (platform === "youtube") {
    const videoId = url.split("v=")[1]?.split("&")[0];
    thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  const video = await prisma.video.create({
    data: {
      platform,
      url,
      thumbnail,
      active: true,
    },
  });

  return NextResponse.json(video);
}

/* =======================
   PUT - editar / ativar
======================= */
export async function PUT(req: Request) {
  const body = await req.json();

  const video = await prisma.video.update({
    where: { id: body.id },
    data: {
      url: body.url,
      platform: body.platform,
      active: body.active,
    },
  });

  return NextResponse.json(video);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("ID não informado", { status: 400 });
  }

  await prisma.video.delete({
    where: { id: Number.parseInt(id) },
  });

  return new Response(null, { status: 204 });
}
