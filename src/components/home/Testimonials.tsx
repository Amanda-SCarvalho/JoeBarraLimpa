// components/home/Testimonials.tsx
import { prisma } from "@/lib/prisma";

export default async function Testimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });

  if (testimonials.length === 0) return null;

  return (
    <section className="section-alt">
      <div className="container">
        <h2 className="section-title mt-5">O que os clientes dizem</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(item => (
            <div key={item.id} className="card">
              <p className="italic text-(--color-text-muted)">
                &ldquo;{item.comment}&rdquo;
              </p>

              <span className="block mt-4 font-semibold">
                — {item.name} ·{" "}
                <span className="text-sm opacity-70">
                  {item.service}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
