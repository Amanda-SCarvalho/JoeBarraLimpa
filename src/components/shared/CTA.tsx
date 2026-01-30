interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
}

export default function CTA({ title, description, buttonText }: Readonly<CTAProps>) {
  return (
    <section className="section-alt">
      <div className="container text-center">
        <h2 className="section-title mt-10">{title}</h2>

        <p className="section-subtitle max-w-2xl mx-auto">
          {description}
        </p>

        <a href="https://wa.me/5511985464418" className="btn-primary mb-10 mt-6 inline-block">
          {buttonText}
        </a>
      </div>
    </section>
  );
}
