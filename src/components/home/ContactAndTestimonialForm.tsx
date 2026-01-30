"use client";

import { useState } from "react";

export default function ContactCard() {
  const [activeTab, setActiveTab] = useState<"email" | "testimonial">("email");
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitTestimonial(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        service,
        comment,
      }),
    });

    setName("");
    setService("");
    setComment("");
    setLoading(false);

    alert("Elogio enviado para aprovação 🙌");
  }

  return (
    <section className="py-20 px-6 flex justify-center">
      <div
        className="
          w-full max-w-2xl
          rounded-2xl shadow-xl overflow-hidden
          border
          bg-(--color-bg-secondary)
    text-(--color-text)
        "
        style={{ borderColor: "var(--color-text-muted)" }}
      >
        {/* 🔝 Cabeçalho */}
        <div className="flex bg-transparent">
  <button
    onClick={() => setActiveTab("email")}
    className={`rounded-tl-2xl flex-1 py-4 font-semibold transition
      ${
        activeTab === "email"
          ? "bg-(--color-primary) text-black"
          : "bg-transparent text-(--color-text-muted) hover:text-(--color-text)"
      }`}
  >
    Me mande um email
  </button>

  <button
    onClick={() => setActiveTab("testimonial")}
    className={`rounded-tr-2xl flex-1 py-4 font-semibold transition
      ${
        activeTab === "testimonial"
          ? "bg-(--color-primary) text-black"
          : "bg-transparent text-(--color-text-muted) hover:text-(--color-text)"
      }`}
  >
    Deixe um elogio
  </button>
</div>


        {/* 🔄 Conteúdo */}
        <div className="relative h-[380px]">
          {/* ✉️ FORM EMAIL */}
          <div
            className={`absolute inset-0 p-8 transition-all duration-300 ${
              activeTab === "email"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-6 pointer-events-none"
            }`}
          >
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Seu nome"
                className="
  w-full p-3 rounded-lg
  border
  bg-(--color-bg)
  text-(--color-text)
  placeholder:text-(--color-text-muted)
  focus:outline-none focus:ring-2 focus:ring-(--color-primary)
  my-2
"
                style={{ borderColor: "var(--color-text-muted)" }}
              />

              <input
                type="tel"
                placeholder="Telefone / WhatsApp"
                className="
  w-full p-3 rounded-lg
  border
  bg-(--color-bg)
  text-(--color-text)
  placeholder:text-(--color-text-muted)
  focus:outline-none focus:ring-2 focus:ring-(--color-primary)
  my-2
"
                style={{ borderColor: "var(--color-text-muted)" }}
              />

              <textarea
                placeholder="Mensagem"
                rows={4}
                className="
  w-full p-3 rounded-lg
  border
  bg-(--color-bg)
  text-(--color-text)
  placeholder:text-(--color-text-muted)
  focus:outline-none focus:ring-2 focus:ring-(--color-primary)
  my-2
"
                style={{ borderColor: "var(--color-text-muted)" }}
              />

              <button
                type="submit"
                className="
    w-full
    bg-(--color-primary)
    text-black
    py-3 rounded-lg font-bold
    hover:brightness-90
    hover:scale-[1.02]
    transition
  "
              >
                Enviar mensagem
              </button>
            </form>
          </div>

          {/* ⭐ FORM TESTEMUNHO */}
          <div
            className={`absolute inset-0 p-8 transition-all duration-300 ${
              activeTab === "testimonial"
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-6 pointer-events-none"
            }`}
          >
            <form onSubmit={submitTestimonial} className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Nome e sobrenome"
                className="
  w-full p-3 rounded-lg
  border
  bg-(--color-bg)
  text-(--color-text)
  placeholder:text-(--color-text-muted)
  focus:outline-none focus:ring-2 focus:ring-(--color-primary)
  my-2
"
                style={{ borderColor: "var(--color-text-muted)" }}
              />

              <input
                value={service}
                onChange={(e) => setService(e.target.value)}
                type="text"
                placeholder="Caminhão ou serviço realizado"
                className="
  w-full p-3 rounded-lg
  border
  bg-(--color-bg)
  text-(--color-text)
  placeholder:text-(--color-text-muted)
  focus:outline-none focus:ring-2 focus:ring-(--color-primary)
  my-2
"
                style={{ borderColor: "var(--color-text-muted)" }}
              />

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escreva seu elogio"
                rows={4}
                className="
  w-full p-3 rounded-lg
  border
  bg-(--color-bg)
  text-(--color-text)
  placeholder:text-(--color-text-muted)
  focus:outline-none focus:ring-2 focus:ring-(--color-primary)
  my-2
"
                style={{ borderColor: "var(--color-text-muted)" }}
              />

              <button
                type="submit"
                disabled={loading}
                className="
    w-full
    bg-(--color-primary)
    text-black
    py-3 rounded-lg font-bold
    hover:brightness-90
    hover:scale-[1.02]
    transition
  "
              >
                {loading ? "Enviando..." : "Enviar elogio"}
              </button>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                Seu comentário será analisado antes de aparecer no site.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
