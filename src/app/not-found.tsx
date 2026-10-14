import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cx-bg px-6 text-center">
      <p className="font-mono2 text-xs tracking-[0.2em] text-cx-text-3">404</p>
      <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-cx-text md:text-5xl">
        Nothing lives at this address.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-cx-text-2">
        The route you followed does not exist. The portfolio itself is one
        page deep — start there.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-11 items-center rounded-full bg-cx-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-cx-accent-deep"
      >
        Back to ConsoleX
      </Link>
    </div>
  );
}
