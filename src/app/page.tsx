import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import CatalogPreview from "@/components/home/CatalogPreview";
import VideosPreview from "@/components/home/VideosPreview";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/shared/CTA";
import ContactAndTestimonialForm from "@/components/home/ContactAndTestimonialForm";
export const dynamic = "force-dynamic";


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

      {/* Contato */}
      <ContactAndTestimonialForm />

      {/* Chamada final para orçamento */}
      <CTA
        title="Precisa de um orçamento personalizado?"
        description="Entre em contato agora mesmo pelo WhatsApp ou Instagram."
        buttonText="Solicitar orçamento"
      />
    </>
  );
}
