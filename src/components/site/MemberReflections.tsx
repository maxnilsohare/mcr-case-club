import Image from "next/image";
import { cn } from "@/lib/cn";
import { teamContent } from "@/content/team";
import { CredentialGroups } from "@/components/site/team/credentials";

type Reflection = {
  name: string;
  label?: string;
  roleLine: string;
  metaLine?: string;
  photoSrc?: string;
  experience?: { name: string; logoSrc: string }[];
  competitions?: { name: string; logoSrc: string }[];
  text: React.ReactNode;
};

function getMemberByName(name: string) {
  const pools = [
    teamContent.leadership.members,
    teamContent.committee.members,
    teamContent.advisors.members,
    teamContent.mentors.members
  ];
  for (const group of pools) {
    const found = group.find((m) => m.name === name);
    if (found) return found;
  }
  return null;
}

function getMemberProfile(name: string) {
  const m = getMemberByName(name);
  if (!m) return null;

  const photoSrc = "photoSrc" in m ? (m as { photoSrc?: string }).photoSrc : undefined;
  const experience =
    "experience" in m ? (m as { experience?: { name: string; logoSrc: string }[] }).experience : undefined;
  const competitions =
    "competitions" in m
      ? (m as { competitions?: { name: string; logoSrc: string }[] }).competitions
      : undefined;

  return {
    role: m.role,
    meta: m.meta,
    photoSrc,
    experience,
    competitions
  };
}

const nayan = getMemberProfile("Nayan Higgins");
const jonathan = getMemberProfile("Jonathan Miller");
const nancy = getMemberProfile("Nancy Foxall");

const REFLECTIONS: Reflection[] = [
  {
    name: "Nayan Higgins",
    label: "On confidence",
    roleLine: nayan?.role ?? "Member",
    metaLine: nayan?.meta,
    photoSrc: nayan?.photoSrc,
    experience: nayan?.experience,
    competitions: nayan?.competitions,
    text: (
      <>
        Before I joined, I could talk through ideas, but under pressure my{" "}
        <strong className="font-semibold text-ink-950">structure fell apart</strong>. What
        changed wasn’t a trick — it was{" "}
        <strong className="font-semibold text-ink-950">weekly practice</strong>,{" "}
        <strong className="font-semibold text-ink-950">direct feedback</strong>, and being
        around people who take getting better seriously. Now I start cases with a clearer
        framework and I’m{" "}
        <strong className="font-semibold text-ink-950">calmer presenting</strong>.
      </>
    )
  },
  {
    name: "Jonathan Miller",
    label: "On consistency",
    roleLine: jonathan?.role ?? "Member",
    metaLine: jonathan?.meta,
    photoSrc: jonathan?.photoSrc,
    experience: jonathan?.experience,
    competitions: jonathan?.competitions,
    text: (
      <>
        The biggest difference for me was having{" "}
        <strong className="font-semibold text-ink-950">a place to practise</strong>, not
        just prep alone and hope it works. Training with people who care about{" "}
        <strong className="font-semibold text-ink-950">standards</strong> changed how I
        think on my feet and how I{" "}
        <strong className="font-semibold text-ink-950">take feedback</strong>. That{" "}
        <strong className="font-semibold text-ink-950">consistency carried</strong> into
        comps, interviews, and day‑to‑day problem solving.
      </>
    )
  },
  {
    name: "Nancy Foxall",
    label: "On team culture",
    roleLine: nancy?.role ?? "Member",
    metaLine: nancy?.meta,
    photoSrc: nancy?.photoSrc,
    experience: nancy?.experience,
    competitions: nancy?.competitions,
    text: (
      <>
        What I noticed first was the{" "}
        <strong className="font-semibold text-ink-950">environment</strong>. People are
        ambitious, but they’re{" "}
        <strong className="font-semibold text-ink-950">generous with time</strong> and{" "}
        <strong className="font-semibold text-ink-950">honest in debriefs</strong> — in a
        helpful way. Over time that’s made me{" "}
        <strong className="font-semibold text-ink-950">more composed</strong> in teams,
        more disciplined in preparation, and more comfortable speaking when it actually
        matters.
      </>
    )
  }
];

function ProfileHeader({
  name,
  roleLine,
  metaLine,
  photoSrc,
  label
}: Pick<Reflection, "name" | "roleLine" | "metaLine" | "photoSrc" | "label">) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

  return (
    <div className="flex items-start gap-4">
      <div className="shrink-0">
        <div
          className={cn(
            "relative h-14 w-14 overflow-hidden rounded-2xl border border-ink-200/90",
            photoSrc ? "bg-paper-200" : "bg-gradient-to-br from-ink-800 to-ink-950"
          )}
        >
          {photoSrc ? (
            <Image
              src={photoSrc}
              alt={name}
              fill
              sizes="56px"
              quality={92}
              className="object-cover object-center"
            />
          ) : (
            <div className="grid h-full w-full place-items-center">
              <span className="font-serif text-base font-medium tracking-[0.08em] text-white/90">
                {initials || "—"}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="heading text-base font-semibold leading-tight tracking-tight text-ink-950 sm:text-[1.05rem]">
            {name}
          </h3>
          {label ? (
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-500">
              {label}
            </p>
          ) : null}
        </div>
        <p className="mt-1 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-600">
          {roleLine}
        </p>
        {metaLine ? <p className="mt-1 text-sm leading-snug text-ink-700">{metaLine}</p> : null}
      </div>
    </div>
  );
}

export function MemberReflections({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        // Mobile: individual cards. Tablet: editorial stack with dividers. Desktop: 3 refined cards.
        "grid gap-4 sm:gap-5",
        "md:gap-0 md:divide-y md:divide-ink-200/70 md:rounded-2xl md:border md:border-ink-200/80 md:bg-white md:shadow-[0_2px_18px_rgba(20,26,34,0.06)]",
        "lg:grid-cols-3 lg:gap-5 lg:divide-y-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:shadow-none",
        className
      )}
    >
      {REFLECTIONS.map((r) => (
        <article
          key={r.name}
          className={cn(
            // Card mode (mobile + desktop)
            "group rounded-2xl border border-ink-200/80 bg-white p-6 sm:p-7",
            "shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-all duration-300",
            "hover:border-ink-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(11,15,20,0.08)]",
            "focus-within:border-ink-300 focus-within:-translate-y-0.5 focus-within:shadow-[0_10px_30px_rgba(11,15,20,0.08)]",
            // Editorial stack mode (tablet)
            "md:rounded-none md:border-0 md:bg-transparent md:shadow-none md:hover:translate-y-0 md:hover:shadow-none md:focus-within:translate-y-0 md:focus-within:shadow-none",
            // Desktop: return to cards
            "lg:rounded-2xl lg:border lg:bg-white lg:shadow-[0_1px_0_rgba(15,23,42,0.04)]"
          )}
        >
          <ProfileHeader
            name={r.name}
            roleLine={r.roleLine}
            metaLine={r.metaLine}
            photoSrc={r.photoSrc}
            label={r.label}
          />
          <p className={cn("mt-4 text-pretty text-[0.98rem] leading-relaxed text-ink-800")}>
            {r.text}
          </p>

          {((r.experience?.length ?? 0) > 0 || (r.competitions?.length ?? 0) > 0) ? (
            <div
              className={cn(
                "mt-5 overflow-hidden border-t border-ink-200/60 pt-4",
                "transition-[max-height,opacity,transform] duration-300 ease-out",
                "max-h-0 opacity-0 -translate-y-1",
                "group-hover:max-h-48 group-hover:opacity-100 group-hover:translate-y-0",
                "group-focus-within:max-h-48 group-focus-within:opacity-100 group-focus-within:translate-y-0"
              )}
            >
              <CredentialGroups
                experience={r.experience ?? []}
                competitions={r.competitions ?? []}
                variant="onLight"
                maxExperience={3}
                maxCompetitions={4}
              />
            </div>
          ) : null}
        </article>
      ))}
    </div>
  );
}

