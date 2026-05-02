import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-32 text-center">
      <p className="text-xs tracking-[0.35em] text-white/55 uppercase">404</p>
      <h1 className="mt-4 text-4xl font-extrabold text-white">Page not found</h1>
      <p className="mt-3 text-white/65 max-w-md mx-auto">
        The page you’re looking for doesn’t exist or was moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl px-6 py-3 font-semibold text-white bg-gradient-to-r from-primary to-secondary"
      >
        Back to home
      </Link>
    </main>
  );
}
