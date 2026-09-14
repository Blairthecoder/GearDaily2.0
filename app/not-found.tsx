import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-content py-24 text-center">
      <h1 className="font-display text-4xl">Page Not Found</h1>
      <p className="mt-4 text-ink/70">
        That page doesn&apos;t exist, but the collection is still here.
      </p>
      <Link href="/shop" className="mt-6 inline-block underline">
        Shop the collection
      </Link>
    </div>
  );
}
