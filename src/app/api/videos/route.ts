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

// POST — criar vídeo
function extractYouTubeId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1);
    }

    if (parsedUrl.searchParams.get("v")) {
      return parsedUrl.searchParams.get("v");
    }

    if (parsedUrl.pathname.includes("/embed/")) {
      return parsedUrl.pathname.split("/embed/")[1];
    }

    if (parsedUrl.pathname.includes("/shorts/")) {
      return parsedUrl.pathname.split("/shorts/")[1];
    }

    return null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const { platform, url, thumbnail } = await req.json();

  let finalUrl = url;
  let finalThumbnail = thumbnail;

  if (platform === "youtube") {
    const videoId = extractYouTubeId(url);

    if (!videoId) {
      return NextResponse.json(
        { error: "URL do YouTube inválida" },
        { status: 400 }
      );
    }

    finalUrl = videoId;
    finalThumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  if (platform === "instagram" && !finalThumbnail) {
    return NextResponse.json(
      { error: "Thumbnail obrigatório para Instagram" },
      { status: 400 }
    );
  }

  const video = await prisma.video.create({
    data: {
      platform,
      url: finalUrl,
      thumbnail: finalThumbnail,
    },
  });

  return NextResponse.json(video);
}

// PUT — editar vídeo
export async function PUT(req: Request) {
  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "ID obrigatório" }, { status: 400 });
  }

  const data: any = {};

  if (body.platform) data.platform = body.platform;
  if (body.url) data.url = body.url;
  if (body.thumbnail) data.thumbnail = body.thumbnail;
  if (typeof body.active === "boolean") data.active = body.active;

  const video = await prisma.video.update({
    where: { id },
    data,
  });

  return NextResponse.json(video);
}
