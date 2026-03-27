"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col justify-center px-4 py-16 text-center">
      <p className="eyebrow text-accent-800">Something went wrong</p>
      <h1 className="heading mt-2 font-serif text-2xl font-semibold text-ink-950">
        This page couldn’t load properly
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-800">
        Try a hard refresh (clear cached scripts). If you were running the dev server, stop it, run{" "}
        <code className="rounded bg-ink-200/60 px-1.5 py-0.5 text-ink-900">npm run dev:clean</code>, then
        reload.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-8 inline-flex items-center justify-center self-center rounded-full border border-accent-800 bg-accent-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-900"
      >
        Try again
      </button>
    </div>
  );
}
