"use client";

import { useEffect, useState } from "react";

type Video = {
  id: string;
  platform: "youtube" | "instagram";
  url: string;
  thumbnail: string;
};

export default function Videos() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch("/api/videos")
      .then(res => res.json())
      .then(data => setVideos(data));
  }, []);

  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        Dicas e Explicações
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {videos.map(video => {
          // ▶️ YOUTUBE → iframe
          if (video.platform === "youtube") {
            return (
              <div
                key={video.id}
                className="aspect-video rounded-xl overflow-hidden shadow"
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.url}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          }

          // 📸 INSTAGRAM → capa + link
          return (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900 rounded-xl overflow-hidden hover:scale-[1.02] transition"
            >
              <img
                src={video.thumbnail}
                alt="Instagram vídeo"
                className="w-full h-64 object-cover"
              />

              <div className="p-4 flex items-center justify-between">
                <span className="text-sm text-zinc-400">
                  Ver no Instagram
                </span>
                <span className="text-yellow-400 text-sm font-semibold">
                  Abrir →
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
