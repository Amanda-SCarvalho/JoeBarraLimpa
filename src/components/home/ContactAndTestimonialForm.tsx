"use client";

import { useState } from "react";

export default function ContactCard() {
  const [activeTab, setActiveTab] = useState<"email" | "testimonial">("email");

  return (
    <section className="py-20 px-6 flex justify-center">
      <div
        className="
          w-full max-w-2xl
          rounded-2xl shadow-xl overflow-hidden
          bg-white dark:bg-zinc-900
          text-zinc-900 dark:text-zinc-100
          border border-zinc-200 dark:border-zinc-800
        "
      >
        {/* 🔝 Cabeçalho */}
        <div className="flex">
          <button
            onClick={() => setActiveTab("email")}
            className={`flex-1 py-4 font-semibold transition ${
              activeTab === "email"
                ? "bg-yellow-400 text-black"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Me mande um email
          </button>

          <button
            onClick={() => setActiveTab("testimonial")}
            className={`flex-1 py-4 font-semibold transition ${
              activeTab === "testimonial"
                ? "bg-yellow-400 text-black"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
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
                  bg-zinc-100 dark:bg-zinc-800
                  border border-zinc-300 dark:border-zinc-700
                  placeholder:text-zinc-500
                  focus:outline-none focus:ring-2 focus:ring-yellow-400
                "
              />

              <input
                type="tel"
                placeholder="Telefone / WhatsApp"
                className="
                  w-full p-3 rounded-lg
                  bg-zinc-100 dark:bg-zinc-800
                  border border-zinc-300 dark:border-zinc-700
                  placeholder:text-zinc-500
                  focus:outline-none focus:ring-2 focus:ring-yellow-400
                "
              />

              <textarea
                placeholder="Mensagem"
                rows={4}
                className="
                  w-full p-3 rounded-lg
                  bg-zinc-100 dark:bg-zinc-800
                  border border-zinc-300 dark:border-zinc-700
                  placeholder:text-zinc-500
                  focus:outline-none focus:ring-2 focus:ring-yellow-400
                "
              />

              <button
                type="submit"
                className="
                  w-full bg-yellow-400 text-black
                  py-3 rounded-lg font-bold
                  hover:bg-yellow-500
                  hover:scale-[1.02] transition
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
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nome e sobrenome"
                className="
                  w-full p-3 rounded-lg
                  bg-zinc-100 dark:bg-zinc-800
                  border border-zinc-300 dark:border-zinc-700
                  placeholder:text-zinc-500
                  focus:outline-none focus:ring-2 focus:ring-yellow-400
                "
              />

              <input
                type="text"
                placeholder="Caminhão ou serviço realizado"
                className="
                  w-full p-3 rounded-lg
                  bg-zinc-100 dark:bg-zinc-800
                  border border-zinc-300 dark:border-zinc-700
                  placeholder:text-zinc-500
                  focus:outline-none focus:ring-2 focus:ring-yellow-400
                "
              />

              <textarea
                placeholder="Escreva seu elogio"
                rows={4}
                className="
                  w-full p-3 rounded-lg
                  bg-zinc-100 dark:bg-zinc-800
                  border border-zinc-300 dark:border-zinc-700
                  placeholder:text-zinc-500
                  focus:outline-none focus:ring-2 focus:ring-yellow-400
                "
              />

              <button
                type="submit"
                className="
                  w-full bg-yellow-400 text-black
                  py-3 rounded-lg font-bold
                  hover:bg-yellow-500
                  hover:scale-[1.02] transition
                "
              >
                Enviar elogio
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
