"use client";

import { useEffect, useState } from "react";

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [platform, setPlatform] = useState("instagram");

  async function loadVideos() {
    const res = await fetch("/api/videos");
    setVideos(await res.json());
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, url, thumbnail }),
    });

    setUrl("");
    setThumbnail("");
    loadVideos();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vídeos</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl max-w-xl grid gap-4 mb-10"
      >
        <select
          value={platform}
          onChange={e => setPlatform(e.target.value)}
          className="p-3 rounded bg-zinc-800"
        >
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube</option>
        </select>

        <input
          placeholder="Link do vídeo"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="p-3 rounded bg-zinc-800"
        />

        <input
          placeholder="URL da imagem de capa"
          value={thumbnail}
          onChange={e => setThumbnail(e.target.value)}
          className="p-3 rounded bg-zinc-800"
        />

        <button className="bg-yellow-400 text-black py-3 rounded font-bold">
          Adicionar vídeo
        </button>
      </form>

      <div className="grid md:grid-cols-3 gap-6">
        {videos.map(video => (
          <div key={video.id} className="bg-zinc-900 p-4 rounded-xl">
            <img
              src={video.thumbnail}
              className="h-40 w-full object-cover rounded mb-3"
            />
            <p className="text-sm">{video.platform}</p>
            <a
              href={video.url}
              target="_blank"
              className="text-yellow-400 text-sm"
            >
              Abrir vídeo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
