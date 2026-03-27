import { CTASection } from "@/components/site/CTASection";
import { FAQAccordion } from "@/components/site/FAQAccordion";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Timeline } from "@/components/site/Timeline";
import { Card } from "@/components/ui/Card";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { joinContent } from "@/content/join";

export default function JoinPage() {
  return (
    <>
      <PageHero
        title={joinContent.hero.title}
        subtitle={joinContent.hero.subtitle}
        primaryCta={{ href: "#apply", label: "Apply Now" }}
        secondaryCta={{ href: "/about", label: "About Us" }}
      />

      <Section title={joinContent.intro.title}>
        <Reveal variant="fadeUp" className="block">
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-ink-800 sm:text-lg">
              {joinContent.intro.body}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section title={joinContent.who.title} intro="If this sounds like you, you’ll probably enjoy the room.">
        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          <StaggerItem>
            <Card meta="Good fit" title="You should apply if…" description={undefined}>
              <ul className="mt-1 grid gap-2 text-sm text-ink-800 sm:text-base">
                {joinContent.who.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-accent-700" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
          <StaggerItem variant="scale">
            <Card
              meta="Not a requirement"
              title="What you don’t need"
              description="You don’t need a polished consulting résumé. You don’t need to already be “good at cases.” You do need to practice deliberately."
              tone="feature"
            />
          </StaggerItem>
        </StaggerContainer>
      </Section>

      <Section title={joinContent.lookFor.title} intro={joinContent.lookFor.intro}>
        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {joinContent.lookFor.traits.map((t) => (
            <StaggerItem key={t.title}>
              <Card title={t.title} description={t.body} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section title={joinContent.timeline.title} intro={joinContent.timeline.intro}>
        <Timeline items={joinContent.timeline.items} />
      </Section>

      <Section title={joinContent.process.title} intro="A simple process designed to respect your time.">
        <StaggerContainer className="grid gap-4 md:grid-cols-3">
          <StaggerItem>
            <Card
              meta="Step 01"
              title="Apply (or register interest)"
              description="Share availability, goals, and what you want to improve. Keep it short and honest."
            />
          </StaggerItem>
          <StaggerItem variant="scale">
            <Card
              meta="Step 02"
              title="Attend training sessions"
              description="Show up prepared, do the reps, and take feedback. This is where fit and commitment show up."
              tone="feature"
            />
          </StaggerItem>
          <StaggerItem>
            <Card
              meta="Step 03"
              title="Cohort confirmation"
              description="We confirm the cohort and expectations, then onboard you into the weekly cadence."
            />
          </StaggerItem>
        </StaggerContainer>
        <Reveal variant="fadeIn" className="mt-4 block">
          <p className="text-sm text-ink-700">
            Note: Replace placeholder dates and steps once you finalize the term plan.
          </p>
        </Reveal>
      </Section>

      <Section title={joinContent.faq.title} intro="Straight answers. No fluff.">
        <FAQAccordion items={joinContent.faq.items} />
      </Section>

      <Section id="apply" title={joinContent.apply.title} intro={joinContent.apply.body}>
        <Reveal variant="scaleUp" className="block">
          <div className="rounded-3xl border border-ink-200 bg-white px-6 py-10 sm:px-10">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="eyebrow">Placeholder</div>
                <h3 className="heading mt-2 text-xl font-semibold sm:text-2xl">
                  Application form embed
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-800 sm:text-base">
                  Swap this area for a Typeform / Google Form embed, or replace the button above
                  with your application link.
                </p>
              </div>
              <div className="rounded-2xl border border-dashed border-ink-300 bg-paper-100 px-5 py-6">
                <div className="text-sm font-medium text-ink-900">Embed area</div>
                <p className="mt-2 text-sm text-ink-700">Coming soon. Add your form here.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Apply if you’re ready to do the reps."
        description="We’re building a serious training environment. Progress is simple: show up, take feedback, repeat."
        primaryCta={{ href: "#apply", label: "Apply Now" }}
        secondaryCta={{ href: "/contact", label: "Ask a question" }}
      />
    </>
  );
}
