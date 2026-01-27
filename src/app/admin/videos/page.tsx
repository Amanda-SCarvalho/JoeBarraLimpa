"use client";

import { useEffect, useState } from "react";

type Video = {
  id: string;
  platform: "youtube" | "instagram";
  url: string;
  thumbnail: string;
  active: boolean;
};

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [platform, setPlatform] =
    useState<"youtube" | "instagram">("youtube");
  const [url, setUrl] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  async function loadVideos() {
    const res = await fetch("/api/videos");
    setVideos(await res.json());
  }

  useEffect(() => {
    loadVideos();
  }, []);

  async function toggleActive(video: Video) {
    await fetch("/api/videos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: video.id,
        active: !video.active,
      }),
    });
    loadVideos();
  }

  async function deleteVideo(id: string) {
    if (!confirm("Tem certeza que deseja excluir este vídeo?")) return;

    await fetch(`/api/videos?id=${id}`, {
      method: "DELETE",
    });

    loadVideos();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("platform", platform);
    formData.append("url", url);

    if (platform === "instagram" && thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    await fetch("/api/videos", {
      method: "POST",
      body: formData,
    });

    setUrl("");
    setThumbnailFile(null);
    loadVideos();
  }

  async function saveEdit(video: Video) {
    await fetch("/api/videos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: video.id,
        url: video.url,
      }),
    });

    setEditingId(null);
    loadVideos();
  }

  const instagramVideos = videos.filter(
    (video) => video.platform === "instagram"
  );
  const youtubeVideos = videos.filter(
    (video) => video.platform === "youtube"
  );

  function renderVideos(list: Video[]) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        {list.map((video) => (
          <div
            key={video.id}
            className={`bg-zinc-900 p-4 rounded-xl ${
              video.active ? "" : "opacity-50"
            }`}
          >
            <img
              src={video.thumbnail}
              className="h-40 w-full object-cover rounded mb-3"
            />

            <p className="text-xs text-zinc-400 truncate mb-3">
              {video.url}
            </p>

            <div className="flex gap-2 mb-3">
              <button
                onClick={() =>
                  setEditingId(editingId === video.id ? null : video.id)
                }
                className="flex-1 bg-zinc-700 py-2 rounded text-sm"
              >
                {editingId === video.id ? "Cancelar" : "Editar"}
              </button>

              <button
                onClick={() => deleteVideo(video.id)}
                className="flex-1 bg-red-600 py-2 rounded text-sm font-semibold"
              >
                Excluir
              </button>
            </div>

            {editingId === video.id && (
              <button
                onClick={() => saveEdit(video)}
                className="w-full bg-green-500 text-black py-2 rounded text-sm font-semibold mb-2"
              >
                Salvar alterações
              </button>
            )}

            <button
              onClick={() => toggleActive(video)}
              className={`w-full py-2 rounded font-semibold ${
                video.active
                  ? "bg-red-500 text-black"
                  : "bg-yellow-400 text-black"
              }`}
            >
              {video.active ? "Desativar" : "Ativar"}
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vídeos</h1>

      {/* Criar */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl max-w-xl grid gap-4 mb-10"
      >
        <select
          value={platform}
          onChange={(e) =>
            setPlatform(e.target.value as "youtube" | "instagram")
          }
          className="p-3 rounded bg-zinc-800"
        >
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
        </select>

        <input
          placeholder="Link do vídeo"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-3 rounded bg-zinc-800"
        />

        {platform === "instagram" && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setThumbnailFile(e.target.files?.[0] ?? null)
            }
            className="p-3 rounded bg-zinc-800"
          />
        )}

        <button className="bg-yellow-400 text-black py-3 rounded font-bold">
          Adicionar vídeo
        </button>
      </form>

      {/* Instagram */}
      <h2 className="text-2xl font-bold mb-4">Instagram</h2>
      {renderVideos(instagramVideos)}

      {/* YouTube */}
      <h2 className="text-2xl font-bold mt-10 mb-4">YouTube</h2>
      {renderVideos(youtubeVideos)}
    </div>
  );
}
