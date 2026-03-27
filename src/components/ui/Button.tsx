import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full border px-4 font-medium tracking-tight transition-[color,background-color,border-color,transform,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-100 disabled:pointer-events-none disabled:opacity-60 motion-reduce:transition-colors hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";

const variantClasses: Record<Variant, string> = {
  primary:
    "border-accent-800 bg-accent-800 text-white shadow-[0_1px_0_rgba(15,23,42,0.08)] hover:bg-accent-900 hover:border-accent-900 hover:shadow-[0_6px_20px_rgba(21,74,65,0.22)]",
  secondary:
    "border-ink-300 bg-white text-ink-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] hover:bg-paper-200 hover:border-ink-400 hover:shadow-[0_4px_16px_rgba(20,26,34,0.08)]",
  ghost:
    "border-transparent bg-transparent text-ink-900 hover:bg-paper-200 hover:border-ink-200"
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 text-sm",
  md: "h-11 text-sm sm:text-base"
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}

