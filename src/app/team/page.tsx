import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { LeaderCard } from "@/components/site/LeadershipCards";
import { TeamCard } from "@/components/site/TeamCard";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { teamContent } from "@/content/team";

export default function TeamPage() {
  const president = teamContent.leadership.members.find((m) => m.role === "President");
  const otherLeaders = teamContent.leadership.members.filter((m) => m.role !== "President");
  /** Same portrait card for everyone; President listed first. */
  const leadershipOrdered = president ? [president, ...otherLeaders] : teamContent.leadership.members;

  return (
    <>
      <PageHero
        title={teamContent.hero.title}
        subtitle={teamContent.hero.subtitle}
        primaryCta={{ href: "/join", label: "Apply Now" }}
        secondaryCta={{ href: "/contact", label: "Contact" }}
      />

      <Section title={teamContent.leadership.title} intro={teamContent.leadership.intro}>
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {leadershipOrdered.map((m) => (
            <StaggerItem key={m.name}>
              <LeaderCard member={m} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section title={teamContent.committee.title} intro={teamContent.committee.intro}>
        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          {teamContent.committee.members.map((m) => (
            <StaggerItem key={m.name}>
              <TeamCard member={m} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section title={teamContent.advisors.title} intro={teamContent.advisors.intro}>
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {teamContent.advisors.members.map((m) => (
            <StaggerItem key={m.name}>
              <LeaderCard member={m} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <Section title={teamContent.mentors.title} intro={teamContent.mentors.intro}>
        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          {teamContent.mentors.members.map((m) => (
            <StaggerItem key={m.name}>
              <TeamCard member={m} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <CTASection
        title="Want to help build the club?"
        description="If you’re reliable and want to contribute—training, operations, or competitions—apply and tell us what you’d like to take ownership of."
        primaryCta={{ href: "/join", label: "Apply Now" }}
        secondaryCta={{ href: "/contact", label: "Message us" }}
      />
    </>
  );
}
