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
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  // 👉 ordenar: YouTube primeiro, Instagram depois
  const sortedVideos = [
    ...videos.filter((v) => v.platform === "youtube"),
    ...videos.filter((v) => v.platform === "instagram"),
  ];

  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        Dicas e Explicações
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {sortedVideos.map((video) => {
          /* ▶️ YOUTUBE */
          if (video.platform === "youtube") {
            return (
              <div
                key={video.id}
                className="aspect-video rounded-xl overflow-hidden shadow-lg bg-black"
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.url}?rel=0`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          }

          /* 📸 INSTAGRAM */
          return (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden shadow-lg bg-zinc-900 hover:scale-[1.02] transition"
            >
              <img
                src={video.thumbnail}
                alt="Vídeo do Instagram"
                className="w-full h-72 object-cover"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 group-hover:bg-black/50 transition">
                <span className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold">
                  Ver no Instagram →
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
