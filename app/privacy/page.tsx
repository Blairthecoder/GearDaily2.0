import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="container-content max-w-2xl py-12">
      <h1 className="font-display text-3xl">Privacy Policy</h1>
      <p className="mt-6 text-ink/70">
        Full privacy policy content to be provided by GearDaily and inserted
        here prior to launch.
      </p>
    </div>
  );
}
