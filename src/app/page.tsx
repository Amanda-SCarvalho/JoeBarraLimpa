import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import CatalogPreview from "@/components/home/CatalogPreview";
import VideosPreview from "@/components/home/VideosPreview";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/shared/CTA";

export default function Home() {
  return (
    <>
      {/* Seção Hero */}
      <Hero />

      {/* Serviços */}
      <Services />

      {/* Prévia do Catálogo */}
      <CatalogPreview />

      {/* Prévia dos Vídeos */}
      <VideosPreview />

      {/* Depoimentos */}
      <Testimonials />

      {/* Chamada final para orçamento */}
      <CTA
        title="Precisa de um orçamento personalizado?"
        description="Entre em contato agora mesmo pelo WhatsApp ou Instagram."
        buttonText="Solicitar orçamento"
      />
    </>
  );
}
