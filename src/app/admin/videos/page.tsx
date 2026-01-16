"use client";

import { useEffect, useState } from "react";

type Video = {
  id: string;
  platform: "youtube" | "instagram";
  url: string;
  thumbnail: string;
  active: boolean;
};

function updateVideoField(
  videos: Video[],
  videoId: string,
  updates: Partial<Video>
): Video[] {
  return videos.map((item) =>
    item.id === videoId ? { ...item, ...updates } : item
  );
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // estados do formulário de criação
  const [platform, setPlatform] = useState<"youtube" | "instagram">("youtube");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

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

  async function saveEdit(video: Video) {
    await fetch("/api/videos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video),
    });
    setEditingId(null);
    loadVideos();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let finalUrl = url;
    if (platform === "youtube") {
      if (finalUrl.includes("watch?v=")) {
        finalUrl = finalUrl.replace("watch?v=", "embed/");
      }
      if (finalUrl.includes("youtu.be/")) {
        const videoId = finalUrl.split("youtu.be/")[1];
        finalUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    await fetch("/api/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, url: finalUrl, thumbnail }),
    });

    setUrl("");
    setThumbnail("");
    loadVideos();
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Vídeos</h1>

      {/* Formulário de criação */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-6 rounded-xl max-w-xl grid gap-4 mb-10"
      >
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value as "youtube" | "instagram")}
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
            placeholder="URL da imagem de capa"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="p-3 rounded bg-zinc-800"
          />
        )}

        <button className="bg-yellow-400 text-black py-3 rounded font-bold">
          Adicionar vídeo
        </button>
      </form>

      {/* Listagem e edição */}
      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((video) => {
          const isEditing = editingId === video.id;
          return (
            <div
              key={video.id}
              className={`bg-zinc-900 p-4 rounded-xl ${
                !video.active && !isEditing ? "opacity-50" : ""
              }`}
            >
              <img
                src={video.thumbnail}
                alt={`Capa do vídeo ${video.platform}`}
                className="h-40 w-full object-cover rounded mb-3"
              />

              {isEditing ? (
                <>
                  {/* edição */}
                  <select
                    value={video.platform}
                    onChange={(e) =>
                      setVideos((v) =>
                        updateVideoField(v, video.id, {
                          platform: e.target.value as any,
                        })
                      )
                    }
                    className="w-full p-2 bg-zinc-800 rounded mb-2"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="instagram">Instagram</option>
                  </select>

                  <input
                    value={video.url}
                    onChange={(e) =>
                      setVideos((v) =>
                        updateVideoField(v, video.id, { url: e.target.value })
                      )
                    }
                    className="w-full p-2 bg-zinc-800 rounded mb-2"
                  />

                  {video.platform === "instagram" && (
                    <input
                      value={video.thumbnail}
                      onChange={(e) =>
                        setVideos((v) =>
                          updateVideoField(v, video.id, {
                            thumbnail: e.target.value,
                          })
                        )
                      }
                      className="w-full p-2 bg-zinc-800 rounded mb-2"
                    />
                  )}

                  <button
                    onClick={() => saveEdit(video)}
                    className="w-full bg-green-500 text-black py-2 rounded mb-2"
                  >
                    Salvar
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm capitalize">{video.platform}</p>
                  <p className="text-xs text-zinc-400 truncate">{video.url}</p>
                </>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setEditingId(isEditing ? null : video.id)}
                  className="flex-1 bg-zinc-700 py-2 rounded text-sm"
                >
                  {isEditing ? "Cancelar" : "Editar"}
                </button>

                <button
                  onClick={() => toggleActive(video)}
                  className={`flex-1 py-2 rounded text-sm font-semibold ${
                    video.active
                      ? "bg-red-500 text-black"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {video.active ? "Desativar" : "Ativar"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
