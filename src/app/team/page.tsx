import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { LeaderCard } from "@/components/site/LeadershipCards";
import { TeamCard } from "@/components/site/TeamCard";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { teamContent } from "@/content/team";

export default function TeamPage() {
  const leadershipOrdered = [...teamContent.leadership.members].sort((a, b) => {
    const yearFromMeta = (meta: string) => {
      const m = meta.match(/year\s+(\d+)/i);
      return m ? Number(m[1]) : -1;
    };

    const yearA = yearFromMeta(a.meta);
    const yearB = yearFromMeta(b.meta);
    if (yearA !== yearB) return yearB - yearA; // Year 2 before Year 1

    // Within the same year: keep President first, then alphabetical.
    const roleWeight = (role: string) => (role === "President" ? 0 : 1);
    const rw = roleWeight(a.role) - roleWeight(b.role);
    if (rw !== 0) return rw;

    return a.name.localeCompare(b.name);
  });

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
