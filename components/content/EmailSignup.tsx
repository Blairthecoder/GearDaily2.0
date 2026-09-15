"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { subscribeToNewsletter } from "@/lib/wix/subscribe";

type Status = "idle" | "submitting" | "success" | "error";

const VALUE_PROPS = ["Exclusive Discounts", "Weekly Devotions", "New Releases First"];

export function EmailSignup({
  heading = "Join the G.E.A.R. Community",
  description = "Subscribe for early access to drops, exclusive discount codes, and devotions that pair with each design.",
  showJournalLink = true,
}: {
  heading?: string;
  description?: string;
  showJournalLink?: boolean;
}) {
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
    <section className="bg-ink py-16 text-paper">
      <div className="container-content max-w-2xl text-center">
        <p className="eyebrow">Discounts, Devotions & More</p>
        <h2 className="mt-2 font-display text-3xl lg:text-4xl">{heading}</h2>
        <p className="mt-3 text-paper/70">
          {description}
          {showJournalLink && (
            <>
              {" "}
              <Link href="/journal" className="underline underline-offset-2 hover:text-gold">
                Read the Journal
              </Link>
              .
            </>
          )}
        </p>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wide text-gold">
          {VALUE_PROPS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          {status === "success" ? (
            <p className="w-full max-w-md text-sm font-semibold" role="status">
              You&apos;re in! Check your inbox soon.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
              <label htmlFor="email-signup" className="sr-only">
                Email address
              </label>
              <input
                id="email-signup"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                disabled={status === "submitting"}
                className="w-full border border-paper/30 bg-paper px-4 py-3 text-base text-ink placeholder:text-ink/40 disabled:opacity-60 sm:text-sm"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-solid whitespace-nowrap bg-gold text-ink hover:bg-paper disabled:opacity-60"
              >
                {status === "submitting" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          )}
        </div>
        {status === "error" && (
          <p className="mt-3 text-sm text-rust" role="alert">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}
