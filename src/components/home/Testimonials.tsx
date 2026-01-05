export default function Testimonials() {
  return (
    <section className="section-alt">
      <div className="container">
        <h2 className="section-title">O que os clientes dizem</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <p className="italic text-(--color-text-muted)">
              &ldquo;Serviço excelente, recomendo!&rdquo;
            </p>

            <span className="block mt-4 font-semibold">
              — Carlos · <span className="text-sm opacity-70">Scania R450</span>
            </span>

          </div>
        </div>
      </div>
    </section>
  );
}
