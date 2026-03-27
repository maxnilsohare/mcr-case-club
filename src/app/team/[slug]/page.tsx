import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/site/CTASection";
import { Section } from "@/components/site/Section";
import { getMemberProfile } from "@/data/members";
import { getCompetitionPhotos } from "@/lib/competitionPhotosFromPublic";
import { cn } from "@/lib/cn";

function StatBar({ label, value }: { label: string; value: number }) {
  const pct = Math.max(0, Math.min(100, value));

  const tier =
    pct >= 91 ? "Elite" : pct >= 88 ? "High impact" : pct >= 85 ? "Strong" : null;

  // Slight richness scaling by score (kept subtle + brand-aligned).
  const richness = 0.55 + (pct / 100) * 0.35; // 0.55 → 0.90
  const gradient = `linear-gradient(90deg,
    rgba(15, 118, 110, ${richness}) 0%,
    rgba(21, 74, 65, ${Math.min(0.95, richness + 0.08)}) 55%,
    rgba(11, 15, 20, ${Math.max(0.18, richness - 0.42)}) 100%)`;

  return (
    <div className="rounded-xl border border-ink-200/80 bg-white px-4 py-3 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium tracking-tight text-ink-950">{label}</p>
          {tier ? (
            <p className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-ink-500">
              {tier}
            </p>
          ) : null}
        </div>
        <p className="text-sm font-semibold tabular-nums tracking-tight text-ink-950">
          {pct}
        </p>
      </div>
      <div className="mt-2.5 h-2 w-full rounded-full bg-paper-200 shadow-inner shadow-black/[0.06]">
        <div
          className="relative h-2 rounded-full shadow-[0_0_0_1px_rgba(21,74,65,0.10)]"
          style={{ width: `${pct}%` }}
          aria-hidden
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundImage: gradient }}
            aria-hidden
          />
          <div
            className="absolute inset-0 rounded-full opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(255,255,255,0.26), rgba(255,255,255,0) 60%)"
            }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

function MetaPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink-200/80 bg-white px-3 py-1 text-xs font-medium tracking-tight text-ink-800 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
      {children}
    </span>
  );
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const profile = getMemberProfile(params.slug);
  if (!profile) notFound();

  const archive = getCompetitionPhotos();

  return (
    <>
      <section className="relative border-b border-ink-200/70 bg-paper-100">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          aria-hidden
        >
          <div
            className={cn(
              "absolute inset-0",
              "bg-[linear-gradient(to_right,rgba(20,26,34,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,26,34,0.06)_1px,transparent_1px)]",
              "bg-[size:56px_56px]"
            )}
          />
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              href="/team"
              className="text-sm font-medium text-ink-700 underline underline-offset-4 hover:text-ink-950"
            >
              Back to Team
            </Link>
            {profile.linkedinHref ? (
              <Link
                href={profile.linkedinHref}
                className="inline-flex h-9 items-center justify-center rounded-full border border-ink-200 bg-white px-4 text-sm font-medium tracking-tight text-ink-900 shadow-sm hover:bg-paper-200"
              >
                LinkedIn
              </Link>
            ) : null}
          </div>

          <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <div className="relative overflow-hidden rounded-2xl border border-ink-200/80 bg-paper-200 shadow-[0_2px_34px_rgba(20,26,34,0.10)]">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={profile.imageSrc}
                    alt={profile.name}
                    fill
                    sizes="(min-width: 1024px) 340px, 88vw"
                    className="object-cover object-center"
                    priority
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
                  aria-hidden
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2.5">
                <p className="eyebrow text-ink-600">Player profile</p>
                <span className="hidden h-px w-10 bg-ink-200/80 sm:block" aria-hidden />
                <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-ink-500">
                  {profile.archetype}
                </p>
              </div>

              <h1 className="heading mt-3 font-serif text-balance text-4xl font-semibold leading-[1.02] sm:text-5xl">
                {profile.name}
              </h1>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <MetaPill>{profile.primaryRole}</MetaPill>
                <MetaPill>{profile.course}</MetaPill>
              </div>

              <div className="mt-5 max-w-2xl rounded-2xl border border-ink-200/75 bg-white/80 px-5 py-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-sm">
                <p className="text-pretty text-base leading-relaxed text-ink-800">
                  {profile.summary}
                </p>
              </div>

              {profile.stats?.length ? (
                <div className="mt-8">
                  <div className="mb-3 flex items-baseline justify-between">
                    <h2 className="heading text-lg font-semibold tracking-tight text-ink-950">
                      Player stats
                    </h2>
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-500">
                      Analytical snapshot
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {profile.stats.map((s) => (
                      <StatBar key={s.label} label={s.label} value={s.value} />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <Section title="Signature strengths" intro="The traits that show up most consistently in team settings.">
        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
          {profile.strengths.map((s) => (
            (() => {
              const tone =
                s.title === "Brainstorm Driver"
                  ? {
                      // soft amber / pale gold
                      tint: "bg-[rgba(176,132,53,0.035)]",
                      chip: "border-[rgba(176,132,53,0.30)] bg-[rgba(176,132,53,0.10)] text-[rgba(94,67,15,0.92)]",
                      tag: "border-[rgba(176,132,53,0.28)] bg-[rgba(176,132,53,0.07)] text-[rgba(94,67,15,0.78)]",
                      rule: "via-[rgba(176,132,53,0.55)]",
                      accentGlow: "bg-[rgba(176,132,53,0.10)]"
                    }
                  : s.title === "Strategic Aligner"
                    ? {
                        // muted navy / slate blue
                        tint: "bg-[rgba(42,60,92,0.028)]",
                        chip: "border-[rgba(42,60,92,0.26)] bg-[rgba(42,60,92,0.09)] text-[rgba(25,38,62,0.92)]",
                        tag: "border-[rgba(42,60,92,0.22)] bg-[rgba(42,60,92,0.06)] text-[rgba(25,38,62,0.74)]",
                        rule: "via-[rgba(42,60,92,0.45)]",
                        accentGlow: "bg-[rgba(42,60,92,0.08)]"
                      }
                    : s.title === "Story Builder"
                      ? {
                          // dusty teal
                          tint: "bg-[rgba(21,120,124,0.03)]",
                          chip: "border-[rgba(21,120,124,0.26)] bg-[rgba(21,120,124,0.09)] text-[rgba(12,74,78,0.92)]",
                          tag: "border-[rgba(21,120,124,0.22)] bg-[rgba(21,120,124,0.06)] text-[rgba(12,74,78,0.74)]",
                          rule: "via-[rgba(21,120,124,0.45)]",
                          accentGlow: "bg-[rgba(21,120,124,0.08)]"
                        }
                      : {
                          // sage / forest green
                          tint: "bg-[rgba(46,102,78,0.03)]",
                          chip: "border-[rgba(46,102,78,0.26)] bg-[rgba(46,102,78,0.09)] text-[rgba(21,74,65,0.92)]",
                          tag: "border-[rgba(46,102,78,0.22)] bg-[rgba(46,102,78,0.06)] text-[rgba(21,74,65,0.74)]",
                          rule: "via-[rgba(46,102,78,0.45)]",
                          accentGlow: "bg-[rgba(46,102,78,0.08)]"
                        };

              const isSignature = s.title === "Brainstorm Driver";

              return (
            <div
              key={s.title}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white px-5 py-5",
                tone.tint,
                "shadow-[0_1px_0_rgba(15,23,42,0.04)] transition-[box-shadow,border-color,transform] duration-300",
                isSignature &&
                  "ring-1 ring-[rgba(176,132,53,0.14)] shadow-[0_1px_0_rgba(15,23,42,0.04),0_18px_44px_rgba(20,26,34,0.06)]",
                "hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-[0_12px_32px_rgba(20,26,34,0.10)] motion-reduce:hover:translate-y-0"
              )}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              >
                <div
                  className={cn(
                    "absolute -right-20 -top-16 h-40 w-40 rounded-full blur-2xl",
                    tone.accentGlow
                  )}
                />
              </div>

              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-serif text-lg font-semibold leading-tight tracking-tight text-ink-950">
                    {s.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800">{s.description}</p>
                </div>

                <div className="shrink-0 text-right">
                  <div
                    className={cn(
                      "inline-flex h-10 w-10 items-center justify-center rounded-2xl border text-[0.7rem] font-semibold tracking-[0.12em]",
                      tone.chip
                    )}
                  >
                    {s.marker ?? "—"}
                  </div>
                  {s.tag ? (
                    <p
                      className={cn(
                        "mt-2 inline-flex rounded-full border px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em]",
                        tone.tag
                      )}
                    >
                      {s.tag}
                    </p>
                  ) : null}
                </div>
              </div>

              <div
                className={cn(
                  "mt-5 h-px w-full bg-gradient-to-r from-transparent to-transparent",
                  tone.rule
                )}
              />
              <p className="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-500">
                Trait note
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-800">
                {s.title === "Brainstorm Driver"
                  ? "Most valuable in the first 10–15 minutes: unlock options, widen the aperture, then help converge."
                  : s.title === "Strategic Aligner"
                    ? "Brings decision-making discipline: what matters, what to cut, and what the recommendation really is."
                    : s.title === "Story Builder"
                      ? "Turns raw thinking into a clean narrative: structure, slide logic, and flow under time pressure."
                      : "Raises the room’s tempo without noise: confidence, clarity, and forward motion in the team."}
              </p>
            </div>
              );
            })()
          ))}
        </div>
      </Section>

      <Section title="Competition record" intro="Recent environments where she’s competed and trained.">
        <div className="grid gap-4 sm:grid-cols-2">
          {profile.competitions.map((c) => {
            const matches = c.photoMatch.map((m) => m.toLowerCase());
            const photos = archive
              .filter((p) => {
                const src = p.src.toLowerCase();
                const alt = p.alt.toLowerCase();
                return matches.some((m) => src.includes(m) || alt.includes(m));
              })
              .slice(0, 6);

            return (
            <div
              key={c.name}
              className="overflow-hidden rounded-2xl border border-ink-200/80 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]"
            >
              <div className="px-5 py-4">
                <p className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-500">
                  Competition
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-ink-950">
                  {c.name}
                </p>
              </div>

              {photos.length > 0 ? (
                <div className="border-t border-ink-200/60 bg-paper-100/40 p-4">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {photos.slice(0, 4).map((p) => (
                      <figure
                        key={p.src}
                        className="group relative overflow-hidden rounded-xl border border-ink-200/55 bg-paper-200 shadow-[0_1px_0_rgba(15,23,42,0.04)]"
                      >
                        <div className="relative aspect-[16/10]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.src}
                            alt={p.alt}
                            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            );
          })}
        </div>
      </Section>

      <Section title="Fun fact" intro="A small detail that makes the profile human.">
        <div className="max-w-2xl rounded-2xl border border-ink-200/80 bg-white px-6 py-5 shadow-[0_1px_0_rgba(15,23,42,0.04)]">
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 bg-paper-100 text-ink-700"
              aria-hidden
            >
              ✦
            </span>
            <p className="text-sm leading-relaxed text-ink-800">{profile.funFact}</p>
          </div>
        </div>
      </Section>

      <CTASection
        title="Want to join the roster?"
        description="Apply, show up consistently, and we’ll help you build the habits that translate under pressure."
        primaryCta={{ href: "/join", label: "Apply Now" }}
        secondaryCta={{ href: "/team", label: "Back to Team" }}
      />
    </>
  );
}

