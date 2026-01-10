import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 📥 GET — vídeos ativos
export async function GET() {
  const videos = await prisma.video.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(videos);
}

// ➕ POST — criar vídeo
export async function POST(req: Request) {
  const { platform, url, thumbnail } = await req.json();

  if (!platform || !url || !thumbnail) {
    return NextResponse.json(
      { error: "Dados incompletos" },
      { status: 400 }
    );
  }

  const video = await prisma.video.create({
    data: { platform, url, thumbnail },
  });

  return NextResponse.json(video);
}
