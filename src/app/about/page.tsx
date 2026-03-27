import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/site/CTASection";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { aboutContent } from "@/content/about";

export default function AboutPage() {
  return (
    <>
      <PageHero title={aboutContent.hero.title} subtitle={aboutContent.hero.subtitle} />

      <Section title={aboutContent.mission.title}>
        <Reveal variant="fadeUp" className="block">
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-ink-800 sm:text-lg">
              {aboutContent.mission.body}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section title={aboutContent.why.title}>
        <Reveal variant="fadeUp" className="block">
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-ink-800 sm:text-lg">
              {aboutContent.why.body}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section title={aboutContent.different.title} intro="A consulting-oriented culture: calm, structured, and high-signal.">
        <StaggerContainer className="grid gap-4 md:grid-cols-3">
          {aboutContent.different.bullets.map((b) => (
            <StaggerItem key={b.title}>
              <Card title={b.title} description={b.body} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section title={aboutContent.values.title} intro="Three values we use as a filter—for practice, feedback, and how we treat each other.">
        <StaggerContainer className="grid gap-4 md:grid-cols-3">
          {aboutContent.values.items.map((v) => (
            <StaggerItem key={v.title}>
              <Card title={v.title} description={v.body} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section title={aboutContent.thrives.title}>
        <Reveal variant="fadeUp" className="block">
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-ink-800 sm:text-lg">
              {aboutContent.thrives.body}
            </p>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Ready to practice in a high-trust room?"
        description="Apply to join the next cohort. We care more about consistency and coachability than polished jargon."
        primaryCta={{ href: "/join", label: "Apply Now" }}
        secondaryCta={{ href: "/contact", label: "Ask a question" }}
      />
    </>
  );
}
