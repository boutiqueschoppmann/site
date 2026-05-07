const testimonials = [
  {
    quote: "C'est beau, c'est solide, c'est québécois. Je recommande !",
    author: "M. L.",
    role: "",
  },
  {
    quote: "C'est donc ben hot sérieux ! Mon chum va capoter.",
    author: "A. D.",
    role: "",
  },
  {
    quote: "Salut j'aime vraiment le crayon merci encore .",
    author: "X. J.",
    role: "",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-charbon/10 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl text-charbon mb-16 text-center">
          Ce qu&apos;ils en disent
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="flex flex-col gap-6 p-8 border border-charbon/10 hover:border-charbon/20 transition-colors"
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#8B5A3C">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote className="text-charbon/70 text-base leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div>
                <p className="text-charbon text-sm font-medium">{t.author}</p>
                <p className="text-charbon/40 text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
