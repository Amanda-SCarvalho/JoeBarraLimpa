// app/videos/[id]/page.tsx
import { prisma } from "@/lib/prisma";

export default async function VideoPage({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  const video = await prisma.video.findUnique({
    where: { id: Number.parseInt(params.id) },
  });

  if (!video) {
    return (
      <section className="container py-20">
        <h1 className="text-2xl font-bold text-center">
          Vídeo não encontrado
        </h1>
      </section>
    );
  }

  return (
    <section className="container py-20">
      <h1 className="text-2xl font-bold mb-10 text-center">
        Vídeo Educativo
      </h1>

      <div className="max-w-5xl mx-auto">
        {/* YOUTUBE */}
        {video.platform === "youtube" && (
          <div className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.url}?rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* INSTAGRAM */}
        {video.platform === "instagram" && (
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden shadow-lg bg-zinc-900 hover:scale-[1.02] transition"
          >
            <div className="relative">
              <img
                src={video.thumbnail}
                alt="Vídeo do Instagram"
                className="w-full h-[420px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold text-lg">
                  Ver no Instagram →
                </span>
              </div>
            </div>
          </a>
        )}
      </div>
    </section>
  );
}
