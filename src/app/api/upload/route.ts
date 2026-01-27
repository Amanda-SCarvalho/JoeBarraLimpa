import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { writeFile } from "node:fs/promises";
import path from "node:path";

/* =========================
   GET → listar vídeos
========================= */
export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(videos);
}

/* =========================
   POST → criar vídeo + upload
========================= */
export async function POST(req: Request) {
  const formData = await req.formData();

  const platform = formData.get("platform") as string;
  const url = formData.get("url") as string;
  const file = formData.get("thumbnail") as File | null;

  let thumbnailPath = "";

  // upload da capa (somente Instagram)
  if (platform === "instagram" && file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(
      process.cwd(),
      "public/uploads",
      fileName
    );

    await writeFile(filePath, buffer);
    thumbnailPath = `/uploads/${fileName}`;
  }

  const video = await prisma.video.create({
    data: {
      platform,
      url,
      thumbnail: thumbnailPath,
      active: true,
    },
  });

  return NextResponse.json(video);
}

/* =========================
   PUT → editar / ativar / desativar
========================= */
export async function PUT(req: Request) {
  const body = await req.json();

  const { id, active, url, platform } = body;

  const video = await prisma.video.update({
    where: { id },
    data: {
      ...(active !== undefined && { active }),
      ...(url && { url }),
      ...(platform && { platform }),
    },
  });

  return NextResponse.json(video);
}
