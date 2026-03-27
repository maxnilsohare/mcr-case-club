import Image from "next/image";
import Link from "next/link";
import { CredentialGroups } from "@/components/site/team/credentials";
import { cn } from "@/lib/cn";

export type TeamMember = {
  name: string;
  role: string;
  meta: string;
  bio: string;
  linkedinHref: string;
  photoSrc?: string;
  competitions?: { name: string; logoSrc: string }[];
  experience?: { name: string; logoSrc: string }[];
};

/** First sentence excerpt + optional remainder (avoids duplicating bio when CSS hover is unavailable). */
function splitBioParagraphs(text: string) {
  const full = text.trim();
  const dotSpace = full.indexOf(". ");
  if (dotSpace === -1) {
    const excerpt = full.endsWith(".") ? full : `${full}.`;
    return { excerpt, continuation: "" as string };
  }
  const excerpt = full.slice(0, dotSpace + 1);
  const continuation = full.slice(dotSpace + 2).trim();
  return { excerpt, continuation };
}

export function TeamCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  const { excerpt, continuation } = splitBioParagraphs(member.bio);
  const hasMoreBio = continuation.length > 0;

  const experience = member.experience ?? [];
  const competitions = member.competitions ?? [];

  return (
    <article
      className={cn(
        "group rounded-2xl border border-ink-200/80 bg-white",
        "shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-all duration-300",
        "hover:border-ink-300 hover:shadow-[0_8px_28px_rgba(11,15,20,0.07)]",
        "focus-within:border-ink-300 focus-within:shadow-[0_8px_28px_rgba(11,15,20,0.07)]"
      )}
    >
      <div className="flex items-start gap-5 p-5 sm:gap-6 sm:p-6">
        <div className="shrink-0">
          <div
            className={cn(
              "relative h-[4.25rem] w-[4.25rem] overflow-hidden rounded-2xl border border-ink-200/90 sm:h-[4.5rem] sm:w-[4.5rem]",
              member.photoSrc ? "bg-paper-200" : "bg-gradient-to-br from-ink-800 to-ink-950"
            )}
          >
            {member.photoSrc ? (
              <Image
                src={member.photoSrc}
                alt={member.name}
                fill
                sizes="72px"
                quality={92}
                className="object-cover object-center"
              />
            ) : (
              <div className="grid h-full w-full place-items-center">
                <span className="font-serif text-lg font-medium tracking-[0.08em] text-white/90">
                  {initials || "—"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0">
              <h3 className="heading text-lg font-semibold leading-tight tracking-tight text-ink-950">
                {member.name}
              </h3>
              <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-600">
                {member.role}
              </p>
              <p className="mt-2 text-sm leading-snug text-ink-700">{member.meta}</p>
            </div>

            <div className="shrink-0">
              <Link
                href={member.linkedinHref}
                aria-label={`LinkedIn — ${member.name}`}
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-900 shadow-sm",
                  "transition-colors hover:border-ink-300 hover:bg-paper-100",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/35"
                )}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.345V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.27 2.37 4.27 5.455v6.286zM5.337 7.433a1.984 1.984 0 1 1 0-3.968 1.984 1.984 0 0 1 0 3.968zM6.956 20.452H3.717V9h3.239v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-4 border-t border-ink-200/60 pt-4">
            <p className="text-sm leading-relaxed text-ink-800">{excerpt}</p>

            {(experience.length > 0 || competitions.length > 0) && (
              <div className="mt-5">
                <CredentialGroups
                  experience={experience}
                  competitions={competitions}
                  variant="onLight"
                  maxExperience={3}
                  maxCompetitions={4}
                />
              </div>
            )}

            {hasMoreBio ? (
              <div
                className={cn(
                  "mt-4 overflow-hidden transition-[max-height,opacity] duration-300 ease-out",
                  "max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100",
                  "group-focus-within:max-h-48 group-focus-within:opacity-100"
                )}
              >
                <div className="rounded-xl border border-ink-200/80 bg-paper-100/90 px-4 py-3">
                  <p className="text-sm leading-relaxed text-ink-800">{continuation}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
