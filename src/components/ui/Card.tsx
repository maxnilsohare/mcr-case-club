import { cn } from "@/lib/cn";

export function Card({
  title,
  description,
  tone = "default",
  className,
  children,
  meta
}: {
  title: string;
  description?: string;
  tone?: "default" | "feature";
  className?: string;
  children?: React.ReactNode;
  meta?: string;
}) {
  const isFeature = tone === "feature";

  return (
    <div
      className={cn(
        "group rounded-2xl border border-ink-200 bg-white px-5 py-5 transition-colors hover:border-ink-300 sm:px-6",
        isFeature ? "relative overflow-hidden sm:py-6" : "",
        className
      )}
    >
      {isFeature ? (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent-500/40 to-transparent" />
      ) : null}
      <div className={cn(isFeature ? "sm:flex sm:items-start sm:justify-between sm:gap-8" : "")}>
        <div className={cn(isFeature ? "sm:max-w-3xl" : "")}>
          {meta ? <div className="eyebrow">{meta}</div> : null}
          <h3
            className={cn(
              "heading text-lg font-semibold",
              isFeature ? "mt-2 text-xl sm:text-2xl" : ""
            )}
          >
            {title}
          </h3>
          {description ? (
            <p className="mt-2 text-sm leading-relaxed text-ink-800 sm:text-base">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-4">{children}</div> : null}
        </div>
        {isFeature ? (
          <div className="mt-5 hidden shrink-0 sm:block">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-ink-200 bg-paper-100 text-sm font-semibold text-ink-950">
              ↗
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

