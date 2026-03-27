import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-200/70 bg-paper-100">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="relative h-8 w-[180px]">
                <Image
                  src="/brand/logo.png"
                  alt={siteConfig.name}
                  fill
                  sizes="180px"
                  className="object-contain object-left"
                />
              </div>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-800">
                {siteConfig.tagline}
              </p>
            </div>
            <div className="md:col-span-4">
              <div className="eyebrow">Navigate</div>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {siteConfig.nav.map((l) => (
                  <li key={l.href}>
                    <Link className="text-ink-800 hover:text-ink-950" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <div className="eyebrow">Contact</div>
              <ul className="mt-3 grid gap-2 text-sm">
                <li>
                  <a className="text-ink-800 hover:text-ink-950" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a className="text-ink-800 hover:text-ink-950" href={siteConfig.socials.linkedin}>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a className="text-ink-800 hover:text-ink-950" href={siteConfig.socials.instagram}>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-ink-200/70 pt-6 text-xs text-ink-700 sm:flex-row sm:items-center sm:justify-between">
            <div>
              © {new Date().getFullYear()} {siteConfig.name}. Student-led.
            </div>
            <div className="text-ink-700">Structured practice. Thoughtful teams.</div>
          </div>
        </div>
    </footer>
  );
}
