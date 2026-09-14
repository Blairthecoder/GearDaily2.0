import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="container-content max-w-2xl py-12">
      <h1 className="font-display text-3xl">Terms of Service</h1>
      <p className="mt-6 text-ink/70">
        Full terms of service content to be provided by GearDaily and
        inserted here prior to launch.
      </p>
    </div>
  );
}
