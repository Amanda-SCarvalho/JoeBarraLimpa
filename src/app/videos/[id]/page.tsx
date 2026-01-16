// app/videos/[id]/page.tsx
import { prisma } from "@/lib/prisma";

export default async function VideoPage({
  params,
}: {
  readonly params: { readonly id: string };
}) {
  // Buscar vídeo no banco
  const video = await prisma.video.findUnique({
    where: { id: Number.parseInt(params.id) },
  });

  if (!video) {
    return (
      <section className="container py-20">
        <h1 className="text-2xl font-bold text-center">Vídeo não encontrado</h1>
      </section>
    );
  }

  return (
    <section className="container py-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Vídeo Educativo</h1>

      <div className="max-w-5xl mx-auto">
        <div className="aspect-video rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-black">
          {video.platform === "youtube" ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${params.id}?rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <img
                src={video.thumbnail}
                alt="Instagram video thumbnail"
                className="w-full h-full object-cover"
              />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
