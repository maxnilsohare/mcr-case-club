import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/components/site/TeamCard";
import { CredentialGroups } from "@/components/site/team/credentials";
import { getMemberSlugByName } from "@/data/members";
import { cn } from "@/lib/cn";

function hasCredentials(member: TeamMember) {
  return (
    (member.experience && member.experience.length > 0) ||
    (member.competitions && member.competitions.length > 0)
  );
}

function PhotoLayer({ member, sizes }: { member: TeamMember; sizes: string }) {
  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="absolute inset-0 z-0 bg-ink-900">
      {member.photoSrc ? (
        <Image
          src={member.photoSrc}
          alt={member.name}
          fill
          sizes={sizes}
          quality={90}
          className="object-cover object-[center_32%]"
        />
      ) : (
        <InitialsBackdrop initials={initials} />
      )}
    </div>
  );
}

function InitialsBackdrop({ initials }: { initials: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-900 to-ink-950"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.07), transparent 55%)"
        }}
      />
      <div className="relative flex h-full w-full items-center justify-center px-6">
        <span
          className="select-none font-serif text-[1.65rem] font-medium tracking-[0.14em] text-white/90 sm:text-[2rem]"
          aria-hidden
        >
          {initials || "—"}
        </span>
      </div>
    </div>
  );
}

function LinkedInIcon({
  href,
  className
}: {
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={`${href === "#" ? "LinkedIn (link pending)" : "LinkedIn profile"}`}
      className={cn(
        "absolute z-30 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/22 bg-black/35 text-white shadow-sm backdrop-blur-sm transition-colors hover:border-white/35 hover:bg-black/45",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
        className
      )}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452H16.89v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.345V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.27 2.37 4.27 5.455v6.286zM5.337 7.433a1.984 1.984 0 1 1 0-3.968 1.984 1.984 0 0 1 0 3.968zM6.956 20.452H3.717V9h3.239v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.727v20.545C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.273V1.727C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    </Link>
  );
}

export function LeaderCard({ member }: { member: TeamMember }) {
  const creds = hasCredentials(member);
  const experience = member.experience ?? [];
  const competitions = member.competitions ?? [];
  const slug = getMemberSlugByName(member.name);
  const profileHref = slug ? `/team/${slug}` : null;

  return (
    <article
      className={cn(
        "group relative isolate aspect-[3/4] w-full overflow-hidden rounded-2xl border border-ink-200/65 bg-ink-900",
        "shadow-[0_8px_28px_rgba(11,15,20,0.08)] transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-[0_18px_44px_rgba(11,15,20,0.12)]",
        "focus-within:-translate-y-0.5 focus-within:border-ink-200 focus-within:shadow-[0_18px_44px_rgba(11,15,20,0.12)]"
      )}
    >
      <p className="sr-only">
        {member.name}, {member.role}. {member.meta} {member.bio}
      </p>

      <PhotoLayer member={member} sizes="(min-width: 1024px) 340px, 45vw" />

      {/* Extra dim on hover (banner below already uses black/45 for text) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/0 transition-colors duration-300 ease-out group-hover:bg-black/25 group-focus-within:bg-black/25"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink-950/80 via-ink-900/35 to-transparent"
        aria-hidden
      />

      <LinkedInIcon href={member.linkedinHref} className="right-4 top-4" />

      {profileHref ? (
        <Link
          href={profileHref}
          aria-label={`View profile — ${member.name}`}
          className="absolute inset-0 z-20"
        >
          <span className="sr-only">View profile</span>
        </Link>
      ) : null}

      {/* Bottom read area: soft blend, not a heavy framed panel */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-2.5 pb-2.5 pt-12 sm:px-3 sm:pb-3">
        <div
          className={cn(
            "rounded-t-xl bg-black/38 backdrop-blur-[2px]",
            "border-t border-white/[0.09]",
            "px-3 pb-3 pt-2.5 sm:px-3.5 sm:pb-3 sm:pt-3",
            "shadow-[0_-4px_24px_rgba(0,0,0,0.22)]"
          )}
        >
          {creds ? (
            <div
              className={cn(
                "mb-2.5 md:mb-0",
                "md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-[max-height,opacity,margin] md:duration-300",
                "md:group-hover:mb-2.5 md:group-hover:max-h-[200px] md:group-hover:opacity-100",
                "md:group-focus-within:mb-2.5 md:group-focus-within:max-h-[200px] md:group-focus-within:opacity-100"
              )}
            >
              <CredentialGroups
                experience={experience}
                competitions={competitions}
                variant="onDark"
                maxExperience={1}
                maxCompetitions={4}
                compact
              />
            </div>
          ) : null}

          <div className="text-left text-white">
            <h3 className="font-serif text-base font-semibold leading-[1.2] tracking-tight text-white sm:text-[1.0625rem]">
              {member.name}
            </h3>
            <p className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.16em] text-white/72">
              {member.role}
            </p>
            <p className="mt-1 text-[0.6875rem] leading-snug text-white/58">{member.meta}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
