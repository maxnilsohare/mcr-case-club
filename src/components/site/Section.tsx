import { StaggerContainer, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/cn";

export function Section({
  id,
  eyebrow,
  title,
  titleClassName,
  intro,
  introClassName,
  children,
  className
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  titleClassName?: string;
  intro?: string;
  introClassName?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-b border-ink-200/70 bg-paper-100",
        className
      )}
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-20">
        <StaggerContainer className="mb-7 max-w-2xl sm:mb-10" stagger={0.06} delayChildren={0.02}>
          {eyebrow ? (
            <StaggerItem>
              <p className="eyebrow mb-3 text-ink-600">{eyebrow}</p>
            </StaggerItem>
          ) : null}
          <StaggerItem>
            <h2
              className={cn(
                "heading text-balance text-[1.75rem] font-semibold leading-tight sm:text-3xl",
                titleClassName
              )}
            >
              {title}
            </h2>
          </StaggerItem>
          {intro ? (
            <StaggerItem>
              <p
                className={cn(
                  "mt-2.5 text-pretty text-[0.98rem] leading-relaxed text-ink-800 sm:mt-3 sm:text-base",
                  introClassName
                )}
              >
                {intro}
              </p>
            </StaggerItem>
          ) : null}
        </StaggerContainer>
        {children}
      </div>
    </section>
  );
}
