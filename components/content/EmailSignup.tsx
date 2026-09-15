"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { subscribeToNewsletter } from "@/lib/wix/subscribe";

const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL ?? "https://www.geardaily.com/blog";

type Status = "idle" | "submitting" | "success" | "error";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-mist py-14 text-ink">
      <div className="container-content flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
        <div>
          <h2 className="font-display text-2xl">
            Discounts, Devotions & New Releases First
          </h2>
          <p className="mt-2 max-w-md text-ink/70">
            Join the list for early access to drops, exclusive discount codes,
            and devotions that pair with each design.{" "}
            <Link href={BLOG_URL} className="underline underline-offset-2 hover:text-ink">
              Read the blog
            </Link>
            .
          </p>
        </div>

        {status === "success" ? (
          <p className="w-full max-w-md text-sm font-semibold" role="status">
            You&apos;re in! Check your inbox soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
            <label htmlFor="email-signup" className="sr-only">
              Email address
            </label>
            <input
              id="email-signup"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              disabled={status === "submitting"}
              className="w-full border border-ink/20 bg-paper px-4 py-3 text-sm placeholder:text-ink/40 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-solid whitespace-nowrap disabled:opacity-60"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="w-full max-w-md text-sm text-rust" role="alert">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
