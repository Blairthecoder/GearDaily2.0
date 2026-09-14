const FEATURES = [
  {
    title: "Free Shipping",
    body: "Free shipping on U.S. orders over $75",
  },
  {
    title: "Faith-Driven Design",
    body: "Every piece built around Scripture and meaning",
  },
  {
    title: "Easy Returns",
    body: "Hassle-free returns within 30 days",
  },
  {
    title: "G.E.A.R.ed 4 Gain",
    body: "A portion of every order gives back",
  },
];

export function FeatureStrip() {
  return (
    <section className="border-y border-line bg-canvas">
      <div className="container-content grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="text-center sm:text-left">
            <p className="font-display text-lg">{feature.title}</p>
            <p className="mt-1 text-sm text-ink/60">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
