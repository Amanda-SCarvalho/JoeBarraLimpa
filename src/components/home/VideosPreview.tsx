"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export default function VideosPreview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Se o script já existir, só processa
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }

    // Cria o script do Instagram
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    document.body.appendChild(script);
  }, []);

  return (
    <section className="section bg-(--color-bg) text(--color-text)">
      <div className="container">
        {/* Título */}
        <h2 className="section-title text-center">
          Dicas e Conteúdos Técnicos
        </h2>

        <p className="section-subtitle text-center">
          Conteúdo prático sobre elétrica e modificações Scania
        </p>

        {/* =================
            YOUTUBE
           ================= */}
        <h3 className="text-2xl font-semibold mb-6">
          🎥 Vídeos completos
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <iframe
            className="w-full aspect-video rounded-xl"
            src="https://www.youtube.com/embed/ajyGoSXXCIU"
            allowFullScreen
          />

          <iframe
            className="w-full aspect-video rounded-xl"
            src="https://www.youtube.com/embed/5vR0yjJXNCo"
            allowFullScreen
          />
        </div>

        {/* =================
            INSTAGRAM
           ================= */}
        <h3 className="text-2xl font-semibold mb-6">
          ⚡ Dicas rápidas (Instagram)
        </h3>

        {mounted && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            <blockquote
              className="instagram-media rounded-xl overflow-hidden"
              data-instgrm-permalink="https://www.instagram.com/reel/DBw7UClpgCT/"
              data-instgrm-version="14"
            />

            <blockquote
              className="instagram-media rounded-xl overflow-hidden"
              data-instgrm-permalink="https://www.instagram.com/reel/DTAUFkPkZk9/"
              data-instgrm-version="14"
            />

            <blockquote
              className="instagram-media rounded-xl overflow-hidden"
              data-instgrm-permalink="https://www.instagram.com/reel/DR63lmikRbG/"
              data-instgrm-version="14"
            />
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link
            href="https://www.instagram.com/SEU_INSTAGRAM"
            target="_blank"
            className="btn-primary"
          >
            👉 Veja mais dicas no Instagram
          </Link>
        </div>
      </div>
    </section>
  );
}
