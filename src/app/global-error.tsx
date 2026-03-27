"use client";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: "2rem", background: "#F7F6F3", color: "#141A22" }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Something went wrong</h1>
        <p style={{ marginTop: "0.75rem", maxWidth: "32rem", lineHeight: 1.5 }}>
          The app hit a fatal error. Stop the dev server, run{" "}
          <code style={{ background: "#ECEFF3", padding: "0.15rem 0.35rem", borderRadius: "0.25rem" }}>
            npm run dev:clean
          </code>{" "}
          (deletes a stale <code style={{ background: "#ECEFF3", padding: "0.15rem 0.35rem" }}>.next</code>{" "}
          folder), then open the site again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: "1.25rem",
            padding: "0.5rem 1rem",
            borderRadius: "9999px",
            border: "1px solid #217A6A",
            background: "#2E9A86",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer"
          }}
        >
          Try again
        </button>
        {process.env.NODE_ENV === "development" ? (
          <pre style={{ marginTop: "1.5rem", fontSize: "0.75rem", overflow: "auto", opacity: 0.85 }}>
            {error.message}
          </pre>
        ) : null}
      </body>
    </html>
  );
}
