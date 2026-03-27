import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Timeline } from "@/components/site/Timeline";
import { Card } from "@/components/ui/Card";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { CompetitionPhotoGrid } from "@/components/site/CompetitionPhotoGrid";
import { getCompetitionPhotos } from "@/lib/competitionPhotosFromPublic";
import { competitionsContent } from "@/content/competitions";

export default function CompetitionsPage() {
  const competitionPhotos = getCompetitionPhotos();

  return (
    <>
      <PageHero
        title={competitionsContent.hero.title}
        subtitle={competitionsContent.hero.subtitle}
        primaryCta={{ href: "/join", label: "Apply Now" }}
        secondaryCta={{ href: "/contact", label: "Contact" }}
      />

      <Section title={competitionsContent.intro.title}>
        <Reveal variant="fadeUp" className="block">
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-ink-800 sm:text-lg">
              {competitionsContent.intro.body}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section title={competitionsContent.gallery.title} intro={competitionsContent.gallery.intro}>
        <Reveal variant="fadeUp" className="block">
          <CompetitionPhotoGrid photos={competitionPhotos} />
        </Reveal>
      </Section>

      <Section title={competitionsContent.why.title} intro="A consulting-oriented environment—without the noise.">
        <StaggerContainer className="grid gap-4 md:grid-cols-3">
          {competitionsContent.why.bullets.map((b) => (
            <StaggerItem key={b.title}>
              <Card title={b.title} description={b.body} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section title={competitionsContent.selection.title} intro={competitionsContent.selection.body}>
        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          <StaggerItem variant="scale">
            <Card
              meta="Selection principles"
              title="Clear and fair"
              description="We select for readiness and reliability. The goal is a strong team experience—not gatekeeping."
              tone="feature"
            />
          </StaggerItem>
          <StaggerItem>
            <Card meta="Selection steps" title="What to expect" description={undefined}>
              <ul className="mt-1 grid gap-2 text-sm text-ink-800 sm:text-base">
                {competitionsContent.selection.steps.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent-700" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        </StaggerContainer>
      </Section>

      <Section title={competitionsContent.process.title} intro={competitionsContent.process.intro}>
        <Timeline items={competitionsContent.process.timeline} />
      </Section>

      <Section title={competitionsContent.calendar.title}>
        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          <StaggerItem>
            <Card
              meta="Publishing soon"
              title="Targets and dates"
              description={competitionsContent.calendar.body}
            />
          </StaggerItem>
          <StaggerItem>
            <Card
              meta="How we’ll share it"
              title="A simple format"
              description="We’ll list targets, timelines, expectations, and how to register interest—without overpromising."
            />
          </StaggerItem>
        </StaggerContainer>
      </Section>

      <Section title={competitionsContent.results.title}>
        <Reveal variant="fadeUp" className="block">
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-ink-800 sm:text-lg">
              {competitionsContent.results.body}
            </p>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title={competitionsContent.cta.title}
        description={competitionsContent.cta.body}
        primaryCta={{ href: "/join", label: "Apply Now" }}
        secondaryCta={{ href: "/contact", label: "Ask a question" }}
      />
    </>
  );
}
