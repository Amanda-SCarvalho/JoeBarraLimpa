// app/videos/[id]/page.tsx

export default function VideoPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section className="container py-20">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Vídeo Educativo
      </h1>

      <div className="max-w-5xl mx-auto">
        <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${params.id}?rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
