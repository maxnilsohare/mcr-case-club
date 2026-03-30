import type { TeamMember } from "@/components/site/TeamCard";

export const teamContent = {
  hero: {
    title: "Team",
    subtitle:
      "A small, disciplined group holding the standard—deliberate, professional, and serious about the work."
  },
  leadership: {
    title: "Leadership",
    intro:
      "Accountable for cadence, quality, and the member experience. We keep the bar high and the room calm.",
    members: [
      {
        name: "Isobel Jeffrie",
        role: "Competitions",
        meta: "BA (Hons) Business Management · Year 1",
        bio:
          "Supports competition preparation and member coordination. Student representative at Manchester Metropolitan University; steady on communication and follow-through.",
        linkedinHref: "#",
        photoSrc: "/team/isobel-jeffrie@2x.jpeg",
        competitions: [{ name: "ACC", logoSrc: "/competitions/acc.png" }]
      },
      {
        name: "Veron Charles",
        role: "Competitions",
        meta: "BA Business Management · Year 1",
        bio:
          "Supports competition participation and coordination. Student representative and university student; focused on teamwork, clear communication, and consistent preparation.",
        linkedinHref: "#",
        photoSrc: "/team/veron-charles@2x.jpeg",
        competitions: [{ name: "ACC", logoSrc: "/competitions/acc.png" }]
      },
      {
        name: "Max O'Hare",
        role: "President",
        meta: "Banking & Finance · Year 2",
        bio:
          "Leads the club’s direction and standards. Focused on building a calm, serious practice environment—and turning good preparation into consistent performance.",
        linkedinHref: "#",
        photoSrc: "/team/max-ohare@2x.jpeg",
        experience: [
          { name: "Houlihan Lokey", logoSrc: "/companies/houlihan-lokey.jpg" }
        ],
        competitions: [
          { name: "BBU", logoSrc: "/competitions/bbu.png" },
          { name: "NIBS", logoSrc: "/competitions/nibs.jpg" },
          { name: "RICCA", logoSrc: "/competitions/riccb.webp" },
          { name: "ROCA", logoSrc: "/competitions/roca.png" }
        ]
      },
      {
        name: "Nancy Foxall",
        role: "Head of Training",
        meta: "BA Marketing · Year 2",
        bio:
          "Designs the practice system—drills, cases, and debriefs. Case Strategist for Manchester Case Club; placed 2nd at NIBS Toronto and International Marketing Week Kolding. Course representative; focused on clear standards and calm sessions.",
        linkedinHref: "#",
        photoSrc: "/team/nancy-foxall@2x.jpeg",
        competitions: [
          { name: "RICCB", logoSrc: "/competitions/riccb.webp" },
          { name: "International Marketing", logoSrc: "/competitions/marketing-week.png" },
          { name: "NIBS", logoSrc: "/competitions/nibs.jpg" }
        ]
      },
      {
        name: "Claas Crome",
        role: "Head of Competitions",
        meta: "BSc Business Management · Year 2",
        bio:
          "Builds competition readiness—cadence, roles, and repeatable prep. Internships in shipping operations and chartering (Affinity, Windward, DS NORDEN, German Tanker Shipping). Committee & growth team, Entrepreneur Society.",
        linkedinHref: "#",
        photoSrc: "/team/claas-crome@2x.jpeg",
        experience: [{ name: "Affinity", logoSrc: "/companies/affinity.jpg" }],
        competitions: [
          { name: "International Marketing", logoSrc: "/competitions/marketing-week.png" },
          { name: "ACC", logoSrc: "/competitions/acc.png" }
        ]
      },
      {
        name: "Jonathan Miller",
        role: "Head of Operations",
        meta: "Business Management · Year 2",
        bio:
          "Keeps the club running smoothly—logistics, scheduling, and the small systems that make training consistent. Strong team communicator with a feedback-first mindset.",
        linkedinHref: "#",
        photoSrc: "/team/jonathan-miller@2x.jpeg",
        experience: [
          { name: "Oracle", logoSrc: "/companies/oracle.png" }
        ],
        competitions: [
          { name: "BBU", logoSrc: "/competitions/bbu.png" },
          { name: "International Marketing", logoSrc: "/competitions/marketing-week.png" },
          { name: "NIBS", logoSrc: "/competitions/nibs.jpg" },
          { name: "ROCA", logoSrc: "/competitions/roca.png" }
        ]
      }
    ] satisfies TeamMember[]
  },
  committee: {
    title: "Committee",
    intro:
      "Operations behind the scenes: events, communications, and steady support for members.",
    members: [
      {
        name: "Omar Ahmed",
        role: "Logistics",
        meta: "BSc Computer Science · Year 2",
        bio:
          "Keeps sessions smooth: scheduling, logistics, and a steady cadence so training stays consistent.",
        linkedinHref: "#"
      },
      {
        name: "Sofia Rossi",
        role: "Partnerships",
        meta: "BSc Finance & Economics · Year 2",
        bio:
          "Works on outreach and collaborations—only when it adds practical value for members.",
        linkedinHref: "#"
      },
      {
        name: "Daniel Wu",
        role: "Communications",
        meta: "BA Marketing · Year 2",
        bio:
          "Owns clear communication: schedules, updates, and keeping the club’s tone professional and minimal.",
        linkedinHref: "#"
      },
      {
        name: "Priya Nair",
        role: "Member Experience",
        meta: "BSc Psychology · Year 2",
        bio:
          "Helps new members ramp quickly and keeps expectations clear—supportive, not vague.",
        linkedinHref: "#"
      }
    ] satisfies TeamMember[]
  },
  advisors: {
    title: "Advisors",
    intro:
      "External perspective on practice—experience-led guidance without diluting the club’s standards.",
    members: [
      {
        name: "Dina Litsiou",
        role: "Advisor",
        meta: "Senior Lecturer · Manchester Metropolitan University",
        bio:
          "Senior Lecturer at Manchester Metropolitan University. Supports the club with academic perspective and structured feedback on case practice.",
        linkedinHref: "#",
        photoSrc: "/team/dina-litsiou@2x.png"
      },
      {
        name: "Mark Crowder",
        role: "Advisor",
        meta: "Reader (Associate Professor) · Manchester Metropolitan University",
        bio:
          "Strategic leadership in international business education—global engagement, curriculum innovation, and postgraduate provision. Chairs the Network of International Business Schools (NIBS) David Gillingham Award; Honorary Professor at Heilongjiang University; external examiner at UK universities.",
        linkedinHref: "#",
        photoSrc: "/team/mark-crowder@2x.jpeg",
        competitions: [{ name: "NIBS", logoSrc: "/competitions/nibs.jpg" }]
      },
      {
        name: "Chiranjeewa Atapattu",
        role: "Advisor",
        meta: "Senior Lecturer · MMU · Faculty COIL Lead",
        bio:
          "Leads collaborative online international learning (COIL) at Manchester Metropolitan University. UK Area Consultant for EuroCHRIE (hospitality and tourism education); external examiner for transnational education partnerships. Former Head of Marketing at NSBM Green University, Sri Lanka.",
        linkedinHref: "#",
        photoSrc: "/team/chiranjeewa-atapattu@2x.jpeg"
      },
      {
        name: "Nayan Higgins",
        role: "Advisor",
        meta: "Audit Associate · PwC · MMU graduate",
        bio:
          "First-class BSc (Hons) Accounting & Finance at Manchester Metropolitan University. Audit Associate at PwC UK; former course representative, peer learning leader, and PwC campus ambassador—strong on student voice and professional standards.",
        linkedinHref: "#",
        photoSrc: "/team/nayan-higgins@2x.jpeg",
        experience: [{ name: "PwC", logoSrc: "/companies/pwc.png" }],
        competitions: [{ name: "NIBS", logoSrc: "/competitions/nibs.jpg" }]
      }
    ] satisfies TeamMember[]
  },
  mentors: {
    title: "Mentors & Alumni",
    intro:
      "Coming soon: a small network of advisors for practical feedback and workshops—credible, not decorative.",
    members: [
      {
        name: "Mentor Name",
        role: "Advisor (coming soon)",
        meta: "Advisor · Year 2",
        bio:
          "We’ll add mentors and alumni here as the network formalises. No inflated claims—just real support.",
        linkedinHref: "#"
      }
    ] satisfies TeamMember[]
  }
} as const;

