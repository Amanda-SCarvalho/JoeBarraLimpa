"use client";

import { useEffect, useState } from "react";

type Video = {
  id: number;
  platform: "youtube" | "instagram";
  url?: string;
  thumbnail: string;
};

function getYoutubeEmbed(input?: string) {
  if (!input) return "";

  if (!input.includes("http")) {
    return `https://www.youtube.com/embed/${input}`;
  }

  const regex =
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;

  const match = regex.exec(input);

  return match
    ? `https://www.youtube.com/embed/${match[1]}?rel=0`
    : "";
}

export default function VideosPreview() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  // 👉 ordem correta
  const orderedVideos = [
    ...videos.filter((v) => v.platform === "youtube"),
    ...videos.filter((v) => v.platform === "instagram"),
  ];

  // 👉 limite do preview
  const previewVideos = orderedVideos.slice(0, 2);

  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        Dicas e Explicações
      </h2>

      {/* loading */}
      {loading && (
        <p className="text-center text-zinc-400">
          Carregando vídeos...
        </p>
      )}

      {/* nenhum vídeo */}
      {!loading && videos.length === 0 && (
        <div className="text-center text-zinc-400 bg-zinc-900 p-8 rounded-xl max-w-xl mx-auto">
          <p className="text-lg font-semibold mb-2">
            Vídeos em manutenção
          </p>
          <p className="text-sm">
            Em breve novos conteúdos estarão disponíveis.
          </p>
        </div>
      )}

      {/* preview */}
      {!loading && previewVideos.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {previewVideos.map((video) => (
            <div
              key={video.id}
              className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg"
            >
              {/* ▶️ YouTube */}
              {video.platform === "youtube" && (
                <iframe
                  className="w-full h-64"
                  src={getYoutubeEmbed(video.url)}
                  title={`Vídeo YouTube ${video.id}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {/* 📸 Instagram */}
              {video.platform === "instagram" && (
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block"
                >
                  <img
                    src={video.thumbnail}
                    alt="Capa do Reel"
                    className="w-full h-64 object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition">
                    <span className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold">
                      Ver no Instagram →
                    </span>
                  </div>
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* botão ver todos */}
      {!loading && videos.length > previewVideos.length && (
        <div className="mt-12 text-center">
          <a
            href="/videos"
            className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Ver todos os vídeos
          </a>
        </div>
      )}
    </section>
  );
}
