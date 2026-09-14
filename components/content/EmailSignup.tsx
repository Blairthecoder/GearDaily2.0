export function EmailSignup() {
  return (
    <section className="bg-mist py-14 text-ink">
      <div className="container-content flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
        <div>
          <h2 className="font-display text-2xl">
            Get New Releases & Design Stories First
          </h2>
          <p className="mt-2 max-w-md text-ink/70">
            Early access to drops, the meaning behind each design, and a little
            encouragement along the way.
          </p>
        </div>
        <form className="flex w-full max-w-md gap-2">
          <label htmlFor="email-signup" className="sr-only">
            Email address
          </label>
          <input
            id="email-signup"
            type="email"
            required
            placeholder="Enter your email"
            className="w-full border border-ink/20 bg-paper px-4 py-3 text-sm placeholder:text-ink/40"
          />
          <button type="submit" className="btn-solid whitespace-nowrap">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
