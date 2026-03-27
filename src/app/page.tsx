import Link from "next/link";
import { CompanyLogoStrip } from "@/components/site/CompanyLogoStrip";
import { CompetitionHighlights } from "@/components/site/CompetitionHighlights";
import { HomeHero } from "@/components/site/HomeHero";
import { MemberReflections } from "@/components/site/MemberReflections";
import { Section } from "@/components/site/Section";
import { CTASection } from "@/components/site/CTASection";
import { Reveal } from "@/components/motion";
import { competitionHighlights } from "@/content/competitionHighlights";
import { homeContent } from "@/content/home";
import { getCompanyLogosFromPublic } from "@/lib/companyLogos";
import { getHeroMarqueeArchiveImages } from "@/lib/heroMarqueeArchive";

export default function HomePage() {
  const companyLogos = getCompanyLogosFromPublic();
  const marqueeImages = getHeroMarqueeArchiveImages();

  return (
    <>
      <HomeHero
        eyebrow={homeContent.hero.eyebrow}
        title={homeContent.hero.title}
        subtitle={homeContent.hero.subtitle}
        proofItems={homeContent.hero.proof}
        marqueeImages={marqueeImages}
        primaryCta={{
          href: "/join",
          label: "Apply Now"
        }}
        secondaryCta={{
          href: "/about",
          label: "About Us"
        }}
      />

      <Section
        eyebrow={homeContent.competitionHighlights.eyebrow}
        title={homeContent.competitionHighlights.title}
        titleClassName="text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl md:text-[2.35rem]"
        intro={homeContent.competitionHighlights.intro}
        introClassName="max-w-3xl text-ink-700"
      >
        <CompetitionHighlights items={competitionHighlights} />
      </Section>

      <Section title="Where Our Members Go" intro={homeContent.outcomes.intro}>
        <Reveal variant="fadeUp" className="mb-8 block sm:mb-10">
          <CompanyLogoStrip logos={companyLogos} />
        </Reveal>
        <Reveal variant="fadeIn" className="mt-6 block" delay={0.06}>
          <div className="rounded-2xl border border-ink-200 bg-white px-5 py-4">
            <p className="text-sm text-ink-800">
              We’re careful with claims. Our focus is building the habits that create outcomes:
              repetition, feedback, and a high-trust practice culture.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section
        title="What Our Members Say"
        intro="Short reflections on practice, competitions, and steady improvement."
        introClassName="max-w-3xl text-ink-700"
      >
        <Reveal variant="fadeUp" className="block">
          <MemberReflections />
        </Reveal>
      </Section>

      <CTASection
        title={homeContent.finalCta.title}
        description={homeContent.finalCta.description}
        primaryCta={{ href: "/join", label: "Apply Now" }}
        secondaryCta={{ href: "/contact", label: "Contact" }}
      >
        <p className="text-sm text-ink-700">
          Want to see how we think about standards? Read{" "}
          <Link className="underline underline-offset-4 hover:text-ink-900" href="/about">
            our mission
          </Link>{" "}
          and{" "}
          <Link
            className="underline underline-offset-4 hover:text-ink-900"
            href="/competitions"
          >
            how competitions work
          </Link>
          .
        </p>
      </CTASection>
    </>
  );
}
