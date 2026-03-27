import { CTASection } from "@/components/site/CTASection";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { Card } from "@/components/ui/Card";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { contactContent } from "@/content/contact";

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={contactContent.hero.title}
        subtitle={contactContent.hero.subtitle}
        primaryCta={{ href: "mailto:hello@manchestercaseclub.com", label: "Email us" }}
        secondaryCta={{ href: "/join", label: "Apply" }}
      />

      <Section title={contactContent.intro.title}>
        <Reveal variant="fadeUp" className="block">
          <div className="max-w-3xl">
            <p className="text-base leading-relaxed text-ink-800 sm:text-lg">
              {contactContent.intro.body}
            </p>
          </div>
        </Reveal>
      </Section>

      <Section title="Reach the right place" intro="Two simple routes, depending on what you need.">
        <StaggerContainer className="grid gap-4 md:grid-cols-2">
          <StaggerItem>
            <Card meta="Students" title={contactContent.student.title} description={contactContent.student.body} />
          </StaggerItem>
          <StaggerItem variant="scale">
            <Card
              meta="Partners"
              title={contactContent.partner.title}
              description={contactContent.partner.body}
              tone="feature"
            />
          </StaggerItem>
        </StaggerContainer>
      </Section>

      <Section title="Contact form" intro="Frontend-only for now. Swap in your backend or form provider later.">
        <StaggerContainer className="grid gap-6 lg:grid-cols-12">
          <StaggerItem className="lg:col-span-7">
            <ContactForm />
          </StaggerItem>
          <StaggerItem className="lg:col-span-5">
            <div className="rounded-2xl border border-ink-200 bg-white px-5 py-6 sm:px-6">
              <div className="eyebrow">Direct</div>
              <h3 className="heading mt-2 text-lg font-semibold">Email</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-800 sm:text-base">
                If you prefer, email us with a short subject line and any timelines.
              </p>
              <div className="mt-4">
                <a
                  className="inline-flex items-center rounded-full border border-ink-200 bg-white px-3 py-2 text-sm font-medium tracking-tight text-ink-900 hover:bg-paper-200"
                  href="mailto:hello@manchestercaseclub.com"
                >
                  hello@manchestercaseclub.com
                </a>
              </div>
              <div className="mt-8">
                <div className="eyebrow">Social</div>
                <ul className="mt-3 grid gap-2 text-sm">
                  {contactContent.socials.items.map((s) => (
                    <li key={s.label}>
                      <a className="text-ink-800 hover:text-ink-950" href={s.href}>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </Section>

      <CTASection
        title="Considering joining? Apply early."
        description="It helps us plan training groups and keep sessions high-quality."
        primaryCta={{ href: "/join#apply", label: "Apply Now" }}
        secondaryCta={{ href: "/about", label: "About" }}
      />
    </>
  );
}
