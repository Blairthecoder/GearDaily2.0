import type { Metadata } from "next";
import { EmailSignup } from "@/components/content/EmailSignup";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Devotions, design stories, and updates from G.E.A.R. — faith-driven apparel rooted in Scripture.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <div>
      <div className="container-content max-w-2xl py-12 text-center">
        <p className="eyebrow">The Journal</p>
        <h1 className="mt-2 font-display text-3xl lg:text-4xl">
          Devotions & Stories, Straight From G.E.A.R.
        </h1>
        <p className="mt-3 text-ink/70">
          Reflections, Scripture, and the meaning behind every design —
          published here as we write them.
        </p>
      </div>

      <EmailSignup
        heading="Never Miss a Devotion"
        description="Subscribe and we'll email you the moment a new post goes live, plus discount codes and new releases."
        showJournalLink={false}
      />

      <div className="container-content max-w-2xl py-16 text-center">
        <p className="font-display text-xl">No posts yet</p>
        <p className="mt-2 text-ink/70">
          We&apos;re writing the first entry now. Subscribe above and it&apos;ll
          land in your inbox the moment it&apos;s published.
        </p>
      </div>
    </div>
  );
}
