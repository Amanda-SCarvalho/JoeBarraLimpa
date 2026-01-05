export default function Videos() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-12">
        Dicas e Explicações
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <iframe
          className="w-full h-64 rounded-xl"
          src="https://www.youtube.com/embed/ajyGoSXXCIU"
        />
        <iframe
          className="w-full h-64 rounded-xl"
          src="https://www.youtube.com/embed/5vR0yjJXNCo"
        />
        <iframe
          className="w-full h-64 rounded-xl"
          src="https://www.instagram.com/reel/DBw7UClpgCT/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
        />
      </div>

      
    </section>
  );
}
