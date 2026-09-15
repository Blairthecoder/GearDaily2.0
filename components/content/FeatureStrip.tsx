const FEATURES = [
  {
    title: "Free Shipping",
    body: "Free shipping on U.S. orders over $75",
    icon: ShippingIcon,
  },
  {
    title: "Faith-Driven Design",
    body: "Every piece built around Scripture and meaning",
    icon: ScriptureIcon,
  },
  {
    title: "Easy Returns",
    body: "Hassle-free returns within 30 days",
    icon: ReturnsIcon,
  },
  {
    title: "G.E.A.R.ed 4 Gain",
    body: "A portion of every order gives back",
    icon: GiveBackIcon,
  },
];

export function FeatureStrip() {
  return (
    <section className="border-y border-line bg-canvas">
      <div className="container-content grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex items-start gap-3">
            <feature.icon className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold" />
            <div>
              <p className="font-display text-lg">{feature.title}</p>
              <p className="mt-1 text-sm text-ink/60">{feature.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ShippingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 7h11v9H3V7Zm11 3h4l3 3v3h-7v-6ZM6 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ScriptureIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 5.5A2.5 2.5 0 0 1 6.5 3H12v18H6.5A2.5 2.5 0 0 1 4 18.5v-13Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M20 5.5A2.5 2.5 0 0 0 17.5 3H12v18h5.5a2.5 2.5 0 0 0 2.5-2.5v-13Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ReturnsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 12a8 8 0 1 1 2.34 5.66"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 17v-4h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GiveBackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20s-7-4.35-9.2-8.6C1.3 8.4 3 5.5 6 5.5c2 0 3.4 1.2 4 2.3.6-1.1 2-2.3 4-2.3 3 0 4.7 2.9 3.2 5.9C19 15.65 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
