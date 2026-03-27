import { siteConfig } from "@/config/site";

export const contactContent = {
  hero: {
    title: "Contact",
    subtitle:
      "Questions, collaboration ideas, or workshop offers—reach out. We’ll get back to you."
  },
  intro: {
    title: "Intro",
    body:
      "For now, this is a lightweight MVP setup. Use the email below or the form (frontend-only)."
  },
  student: {
    title: "Student Inquiries",
    body:
      "Questions about joining, training sessions, or what to expect. If you’re unsure whether you should apply, start here."
  },
  partner: {
    title: "Partner / Sponsor Inquiries",
    body:
      "We’re open to practical collaborations: workshops, case training, or support that directly improves member learning."
  },
  socials: {
    title: "Social",
    items: [
      { label: "Email", href: `mailto:${siteConfig.email}` },
      { label: "LinkedIn", href: siteConfig.socials.linkedin },
      { label: "Instagram", href: siteConfig.socials.instagram }
    ]
  }
} as const;

