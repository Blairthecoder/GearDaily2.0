export function EmailSignup() {
  return (
    <section className="bg-forest py-16 text-paper">
      <div className="container-content text-center">
        <h2 className="font-display text-2xl">Get New Releases & Design Stories First</h2>
        <p className="mx-auto mt-2 max-w-md text-paper/80">
          Early access to drops, the meaning behind each design, and a little
          encouragement along the way.
        </p>
        <form className="mx-auto mt-6 flex max-w-md gap-2">
          <label htmlFor="email-signup" className="sr-only">
            Email address
          </label>
          <input
            id="email-signup"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full border border-paper/30 bg-transparent px-4 py-3 text-sm placeholder:text-paper/50"
          />
          <button
            type="submit"
            className="whitespace-nowrap bg-paper px-5 py-3 text-sm font-medium text-ink hover:bg-brass"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
