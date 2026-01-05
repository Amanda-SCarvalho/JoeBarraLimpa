const services = [
  "Elétrica Automotiva",
  "Modificações Scania",
  "Diagnóstico Eletrônico",
  "Instalação de Acessórios",
];

export default function Services() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Serviços</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="
                card 
                text-center 
                min-h-[140px]
                flex 
                items-center 
                justify-center
                px-6 
                py-10
                border 
                border-transparent 
                hover:border-(--color-primary) 
                hover:shadow-lg
                transition
              "
            >
              <p className="font-semibold text-lg">
                {service}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
