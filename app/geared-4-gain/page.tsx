import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "G.E.A.R.ed 4 Gain",
  description:
    "G.E.A.R.'s community impact initiative — providing clothing and support to individuals experiencing homelessness, school-aged children, and local communities.",
};

export default function Geared4GainPage() {
  return (
    <div className="container-content max-w-3xl py-16">
      <h1 className="font-display text-4xl">G.E.A.R.ed 4 Gain</h1>
      <p className="mt-6 text-lg text-ink/70">
        G.E.A.R.ed 4 Gain is our commitment to using what we make for more
        than ourselves. Through this initiative, we work to provide clothing
        and improve quality of life for individuals experiencing
        homelessness, school-aged children, and local communities.
      </p>
      <Link href="/about" className="mt-8 inline-block underline text-sm">
        Read our story
      </Link>
    </div>
  );
}
