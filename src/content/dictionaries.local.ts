import type { Locale } from "@/lib/i18n";
import { getLocalizedProject, projects } from "@/content/projects";
import { media } from "@/content/media";
import { getBriefFormCopy, type BriefFormCopy } from "@/content/brief-form.copy";

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  slug?: string;
}

export interface BoothTypeItem {
  title: string;
  image: string;
  imageAlt: string;
  slug?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface WorkItem {
  title: string;
  category: string;
  year: string;
  slug: string;
  image: string;
  imageAlt: string;
  summary: string;
}

export interface Dictionary {
  nav: {
    items: NavItem[];
    cta: string;
    langLabel: string;
    langHrefLocale: Locale;
  };
  hero: {
    badge?: string;
    headline: string;
    support: string;
    primaryCta: string;
    secondaryCta: string;
    reviews?: string;
  };
  lifecycle: {
    eyebrow: string;
    title: string;
    support: string;
    imageAlt: string;
    items: { title: string; description: string }[];
  };
  stats: {
    eyebrow: string;
    title: string;
    support?: string;
    items: {
      value: number;
      prefix?: string;
      suffix?: string;
      label: string;
      detail?: string;
    }[];
  };
  clients: {
    eyebrow: string;
    title: string;
    support: string;
    items: {
      quote: string;
      name: string;
      role: string;
      image: string;
      imageAlt: string;
    }[];
  };
  about: {
    eyebrow: string;
    title: string;
    body: string;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    lead: string;
    storyImage?: string;
    storyImageAlt?: string;
    studioImage?: string;
    studioImageAlt?: string;
    industriesImage?: string;
    industriesImageAlt?: string;
    storyTitle: string;
    storyHeadline: string;
    story: string;
    storySecond: string;
    valuesTitle: string;
    valuesSupport: string;
    values: { title: string; description: string }[];
    studioTitle: string;
    studioSupport: string;
    studioItems: { title: string; description: string }[];
    workflowEyebrow: string;
    workflowTitle: string;
    workflowSupport: string;
    workflowSteps: { title: string; description: string }[];
    closingLine?: string;
    industriesEyebrow: string;
    industriesTitle: string;
    industriesSupport: string;
    industriesItems: string[];
    industriesCta: string;
    industriesMore: string;
    industriesLogosTitle: string;
    faqItems: { question: string; answer: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    support: string;
    cta?: string;
    items: ServiceItem[];
  };
  boothTypes: {
    eyebrow: string;
    title: string;
    support: string;
    cta: string;
    items: BoothTypeItem[];
  };
  boothTypesPage: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  whyCps: {
    eyebrow: string;
    title: string;
    support?: string;
    clientsLine?: string;
    reasons?: { title: string; description: string }[];
    primary: { title: string; description: string; cta: string; href: string };
    secondary: { title: string; description: string; cta: string; href: string };
    images: {
      wideAlt: string;
      leftAlt: string;
      rightAlt: string;
    };
  };
  beforeAfter: {
    enabled?: boolean;
    eyebrow: string;
    title: string;
    subtitle: string;
    beforeItems: string[];
    afterItems: string[];
    beforeImage: string;
    afterImage: string;
    beforeVideo?: string;
    afterVideo?: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    support: string;
    items: { question: string; answer: string }[];
  };
  servicesPage: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    detailTitle: string;
    faqItems: { question: string; answer: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    support: string;
    steps: ProcessStep[];
  };
  work: {
    eyebrow: string;
    title: string;
    support: string;
    items: WorkItem[];
    viewAll: string;
  };
  workPage: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  industriesPage: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  locationsPage: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  newsPage: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  projectPage: {
    challenge: string;
    approach: string;
    outcome: string;
    gallery: string;
    next: string;
    back: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    support: string;
    emailLabel: string;
    whatsappLabel: string;
  };
  briefForm: BriefFormCopy;
  contactPage: {
    eyebrow: string;
    title: string;
    lead: string;
    businessHours?: string;
    info: {
      emailLabel: string;
      phoneLabel: string;
      whatsappLabel: string;
      addressLabel: string;
      socialLabel: string;
    };
    map: {
      eyebrow: string;
      title: string;
      support: string;
      openMaps: string;
      hqLabel: string;
    };
  };
  projectLaunch: {
    eyebrow: string;
    title: string;
    support: string;
    ctaLabel: string;
  };
  footer: {
    tagline: string;
    rights: string;
    locationsTitle: string;
    locations: NavItem[];
  };
  /** @deprecated kept for Sanity CMS merge compatibility */
  comingSoon: { title: string; subtitle: string };
}

function workItems(locale: Locale): WorkItem[] {
  return projects.map((project) => {
    const localized = getLocalizedProject(project, locale);
    return {
      title: localized.title,
      category: localized.category,
      year: localized.year,
      slug: localized.slug,
      image: localized.image,
      imageAlt: localized.imageAlt,
      summary: localized.summary,
    };
  });
}

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      items: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Booth Types", href: "/booth-types" },
        { label: "Our Work", href: "/our-work" },
        { label: "News & Insights", href: "/news" },
        { label: "Contact", href: "/contact" },
      ],
      cta: "Request a Quote",
      langLabel: "العربية",
      langHrefLocale: "ar",
    },
    hero: {
      badge: "Production. Fabrication. Fit-Out.",
      headline: "Exhibitions. Events.\nInteriors. Displays.\nBuilt under one roof.",
      support:
        "One production facility. Eight services. Built and installed in-house.",
      primaryCta: "Start a Project",
      secondaryCta: "See What We Build",
    },
    lifecycle: {
      eyebrow: "Who We Are",
      title: "One production partner. Multiple capabilities.",
      support: "One team carries every project from technical drawing to final install.",
      imageAlt: "CPS production and installation craft",
      items: [
        {
          title: "Multiple environments",
          description:
            "Exhibition booths, event structures, branded interiors, retail displays, signage and custom fabrication — all under one roof",
        },
        {
          title: "In-house production",
          description:
            "In-house production across wood, metal, acrylic, printing and installation",
        },
        {
          title: "One point of contact",
          description: "One point of contact from concept through handover",
        },
      ],
    },
    stats: {
      eyebrow: "Track record",
      title: "Built at show-floor scale",
      support:
        "Years of in-house production across Saudi Arabia and the GCC — one team from brief to build.",
      items: [
        {
          value: 500,
          suffix: "+",
          label: "Booths delivered",
          detail: "Custom, modular & pavilion builds",
        },
        {
          value: 15,
          suffix: "+",
          label: "Years in exhibitions",
          detail: "Design through dismantle",
        },
        {
          value: 12,
          suffix: "+",
          label: "Cities covered in Saudi Arabia",
          detail: "Riyadh, Jeddah, Dammam and beyond",
        },
        {
          value: 100,
          suffix: "%",
          label: "In-house production",
          detail: "No subcontractor handoffs",
        },
      ],
    },
    clients: {
      eyebrow: "Clients",
      title: "Built to impress. Trusted to deliver.",
      support:
        "From the first sketch to show day, our clients count on one team to make every detail work.",
      items: [
        {
          quote:
            "I've never felt more confident walking up to our booth than I do now. CPS understood our brand from the first brief.",
          name: "Sarah Mitchell",
          role: "Marketing Director",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Sarah Mitchell",
        },
        {
          quote:
            "The booth landed on time and the quality on the floor beat the renders. One team handled everything.",
          name: "Omar Al-Rashid",
          role: "Events Lead",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Omar Al-Rashid",
        },
        {
          quote:
            "One crew from design to dismantle. That alone saved us weeks of coordination across vendors.",
          name: "Adrian Cole",
          role: "Brand Strategist",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Adrian Cole",
        },
        {
          quote:
            "Visitors actually stopped. Our custom build pulled foot traffic we had not seen at previous shows.",
          name: "Lina Hassan",
          role: "VP Marketing",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Lina Hassan",
        },
        {
          quote:
            "Modular rebuild for the next city worked flawlessly. Storage and reinstall were completely painless.",
          name: "Marco Silva",
          role: "Trade Show Manager",
          image:
            "https://images.unsplash.com/photo-1519081909018-445c88991a1d?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "Marco Silva",
        },
      ],
    },
    about: {
      eyebrow: "Who we are",
      title: "Creatives Professionals",
      body: "CPS is a production, fabrication and fit-out company delivering exhibitions, events, interiors, displays and signage across Saudi Arabia.",
    },
    aboutPage: {
      eyebrow: "About CPS",
      title: "We build ideas into reality.",
      lead: "A production, fabrication and fit-out company working across Saudi Arabia.",
      storyImage: media.about.studio,
      storyImageAlt: "CPS fabrication workshop in action",
      studioImage: media.about.studio,
      studioImageAlt: "CPS fabrication workshop",
      industriesImage: media.about.industries,
      industriesImageAlt: "A CPS project delivered for a cross-industry client",
      storyTitle: "Our story",
      storyHeadline: "One production partner. Multiple capabilities.",
      story:
        "Exhibition booths, event structures, branded environments, retail displays, signage and custom-built solutions — all under one roof. CPS connects technical development, fabrication and final on-site execution through one accountable team.",
      storySecond:
        "Our in-house capabilities span wood, metal, acrylic, printing and installation, giving every project tighter quality control and a clearer path to handover.",
      valuesTitle: "Key differentiators",
      valuesSupport: "What stays consistent across every CPS project.",
      values: [
        {
          title: "In-house production",
          description: "In-house production across every major discipline.",
        },
        {
          title: "One accountable team",
          description:
            "One team from technical drawing through installation and handover.",
        },
        {
          title: "Nationwide delivery",
          description: "Nationwide site survey, delivery and dismantling.",
        },
        {
          title: "Proven with leading brands",
          description:
            "Confirmed KSA clients across banking, telecom and retail sectors.",
        },
      ],
      studioTitle: "Where every project gets built",
      studioSupport: "Our own production floor and team, from raw material to finished installation.",
      studioItems: [
        {
          title: "Fully Equipped Workshop",
          description: "Everything needed to fabricate in-house, start to finish.",
        },
        {
          title: "Skilled In-House Team",
          description: "Craftsmen and technicians, not subcontracted labor.",
        },
        {
          title: "Quality Control at Every Stage",
          description: "Checked before it ever leaves the factory.",
        },
        {
          title: "Built for Scale",
          description: "Capable of handling multiple projects at once.",
        },
      ],
      workflowEyebrow: "How We Work",
      workflowTitle: "From brief to handover",
      workflowSupport:
        "The same five-step process behind every project, whatever the service.",
      workflowSteps: [
        {
          title: "Brief & Site Assessment",
          description:
            "We review your brief, site conditions and technical constraints before design starts.",
        },
        {
          title: "Design & Technical Drawing",
          description:
            "Concepts developed into approved, production-ready drawings.",
        },
        {
          title: "In-House Production",
          description:
            "Fabricated on our own floor: wood, metal, acrylic, printing and signage.",
        },
        {
          title: "Installation & Delivery",
          description:
            "Site delivery, installation and dismantling handled by our own crews nationwide.",
        },
        {
          title: "Handover & Support",
          description:
            "Final walkthrough, snagging and ongoing support if the piece needs maintenance or redeployment.",
        },
      ],
      closingLine:
        "One production partner. Multiple capabilities. Built around your project.",
      industriesEyebrow: "Industries",
      industriesTitle: "Sectors we work with",
      industriesSupport:
        "Projects delivered across sectors that need precision execution.",
      industriesItems: [
        "Government & Public Sector",
        "Banking & Financial Services",
        "Healthcare & Pharmaceutical",
        "FMCG",
        "Beauty & Cosmetics",
        "Technology & Electronics",
        "Automotive",
        "Retail & Shopping Malls",
        "Real Estate",
        "Hospitality",
        "Sports & Entertainment",
      ],
      industriesCta: "View Projects by Industry",
      industriesMore: "+15 others",
      industriesLogosTitle: "Trusted Across Industries",
      faqItems: [
        {
          question: "Is CPS a design company, a production company, or both?",
          answer:
            "Both. We handle design, fabrication, branding, installation and handover in-house across exhibitions, events, interiors, displays and signage.",
        },
        {
          question: "Do you work with clients outside Saudi Arabia?",
          answer:
            "Our current focus is delivering across Saudi Arabia. If your project is elsewhere, reach out and we'll confirm what's possible.",
        },
        {
          question: "What industries do you typically work with?",
          answer:
            "We work across a wide range of sectors, including finance, government, real estate, telecom, energy, healthcare, and retail.",
        },
        {
          question: "How is CPS different from other production companies?",
          answer:
            "Everything is handled by one in-house team — no subcontractors, no handoffs between vendors. What you approve is exactly what gets built.",
        },
        {
          question: "Can CPS handle projects of any size?",
          answer:
            "Yes — from single displays and kiosks to large-scale interiors, events and pavilions. Our team and facilities are built for scale.",
        },
        {
          question: "How do I start a project with CPS?",
          answer:
            "Reach out through our contact form — we'll schedule a brief to understand your goals, scope and timeline.",
        },
      ],
    },
    services: {
      eyebrow: "What We Do",
      title: "Eight services. One production floor.",
      support: "Browse by service to see featured work — or jump straight to the full catalogue.",
      cta: "See All Services",
      items: [
        {
          title: "Exhibitions & Booths",
          description: "Custom exhibition environments, modular solutions and large-scale pavilions.",
          image: media.services.exhibitions,
          imageAlt: "Custom exhibition environment",
          slug: "exhibitions-booths",
        },
        {
          title: "Event Fabrication",
          description: "Stages, scenic structures, branded environments and experiential builds.",
          image: media.services.events,
          imageAlt: "Event fabrication",
          slug: "event-fabrication",
        },
        {
          title: "Fit-Out & Interiors",
          description: "Commercial interiors, offices, showrooms, retail and branded spaces.",
          image: media.services.fitOut,
          imageAlt: "Commercial interior fit-out",
          slug: "fit-out-interiors",
        },
        {
          title: "Retail Displays",
          description: "Gondolas, product displays, POS/POP units, kiosks and window displays.",
          image: media.services.retail,
          imageAlt: "Retail display",
          slug: "retail-displays",
        },
        {
          title: "Custom Fabrication",
          description: "Wood, metal, acrylic, CNC and mixed-material bespoke fabrication.",
          image: media.services.fabrication,
          imageAlt: "Custom fabrication workshop",
          slug: "custom-fabrication",
        },
        { title: "Printing & Signage", description: "Large-format graphics, environmental branding and signage systems.", image: media.services.printing, imageAlt: "Printing and signage", slug: "printing-signage" },
        { title: "Rental Solutions", description: "Reusable event, exhibition and display assets.", image: media.services.rental, imageAlt: "Rental inventory", slug: "rental-solutions" },
        { title: "Installation & Project Delivery", description: "Technical planning, logistics, installation, storage and maintenance.", image: media.services.installation, imageAlt: "On-site installation", slug: "installation-project-delivery" },
      ],
    },
    boothTypes: {
      eyebrow: "Booth types",
      title: "From small stands to national pavilions",
      support: "From small stands to big pavilions — built to fit your needs.",
      cta: "Explore booth types",
      items: [
        {
          title: "Custom-Built Booths",
          image: media.boothTypes.custom,
          imageAlt: "Custom-built exhibition booth",
          slug: "custom",
        },
        {
          title: "Modular / System Booths",
          image: media.boothTypes.modular,
          imageAlt: "Modular system booth",
          slug: "modular",
        },
        {
          title: "Double-Deck Booths",
          image: media.boothTypes.doubleDeck,
          imageAlt: "Double-deck exhibition booth",
          slug: "double-deck",
        },
        {
          title: "Portable & Pop-Up Displays",
          image: media.boothTypes.portable,
          imageAlt: "Portable pop-up display",
          slug: "portable",
        },
        {
          title: "Kiosks & Small Footprint Stands",
          image: media.boothTypes.kiosk,
          imageAlt: "Small footprint kiosk stand",
          slug: "kiosks",
        },
        {
          title: "Outdoor Structures & Activations",
          image: media.boothTypes.outdoor,
          imageAlt: "Outdoor activation structure",
          slug: "outdoor",
        },
        {
          title: "Country / National Pavilions",
          image: media.boothTypes.pavilion,
          imageAlt: "Country pavilion booth",
          slug: "pavilions",
        },
        {
          title: "Sustainable / Eco Booths",
          image: media.boothTypes.sustainable,
          imageAlt: "Sustainable eco booth",
          slug: "sustainable",
        },
      ],
    },
    boothTypesPage: {
      eyebrow: "Booth types",
      title: "Built for every footprint and format.",
      lead: "Whether you need a compact kiosk or a double-deck pavilion, CPS designs and builds in-house.",
    },
    whyCps: {
      eyebrow: "Why CPS",
      title: "One team, from concept to final install",
      support:
        "Everything stays in-house, so nothing gets lost between subcontractors.",
      clientsLine: "Delivered for Ajlan & Bros, SNB, SAB, Sirar by STC, Al Hilal",
      reasons: [
        {
          title: "In-house production",
          description: "Wood, metal, acrylic, printing and signage are produced by one accountable team.",
        },
        {
          title: "Nationwide delivery",
          description: "Site survey, installation and dismantling are coordinated across Saudi Arabia.",
        },
        {
          title: "One point of contact",
          description: "One team owns the work from technical drawing through installation and handover.",
        },
        {
          title: "Proven delivery",
          description: "Delivered for leading Saudi brands across banking, telecom, sports and retail.",
        },
      ],
      primary: {
        title: "In-house production",
        description:
          "In-house production across wood, metal, acrylic, printing and signage — one accountable floor.",
        cta: "Start a Project",
        href: "/contact",
      },
      secondary: {
        title: "Nationwide delivery",
        description:
          "Site survey, installation and dismantling — with a single point of contact from technical drawing to handover.",
        cta: "See our capabilities",
        href: "/production-capabilities",
      },
      images: {
        wideAlt: "Exhibition hall with branded booth presence",
        leftAlt: "Custom booth fabrication in the CPS workshop",
        rightAlt: "Finished custom exhibition booth on the show floor",
      },
    },
    beforeAfter: {
      eyebrow: "Before & After",
      title: "See the booth difference",
      subtitle:
        "From a generic shell to a branded presence that pulls visitors in — one team, one process.",
      beforeImage: media.beforeAfter.before,
      afterImage: media.beforeAfter.after,
      beforeItems: [
        "Generic shell booth",
        "Scattered vendors",
        "Last-minute fixes",
        "Weak brand presence",
      ],
      afterItems: [
        "Custom branded build",
        "One CPS team",
        "On-time install",
        "Show-floor impact",
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions about CPS",
      support: "Straight answers on services, timelines and coverage — before the brief.",
      items: [
        {
          question: "What does CPS do?",
          answer:
            "We produce exhibitions, events, interiors and retail displays from our own facility — design, fabrication, printing, installation and storage, all in-house.",
        },
        {
          question: "Do I need to use every service, or can I choose just one?",
          answer:
            "Every service is available individually. You can book a single service — such as exhibition booths, custom fabrication or printing — or hand us the full project from design to install.",
        },
        {
          question: "What cities do you cover?",
          answer:
            "We deliver across major cities in Saudi Arabia. Let us know your event location and we'll confirm coverage.",
        },
        {
          question: "How do I get a quote?",
          answer:
            "Use the Start a Project form with your event details, or contact us directly — we'll follow up to discuss your project.",
        },
        {
          question: "How far in advance should I book?",
          answer:
            "We recommend reaching out as soon as your event date is confirmed, ideally a few weeks ahead for custom builds — though we can accommodate tighter timelines depending on the project.",
        },
        {
          question: "Can you handle a booth for a one-time event, not just recurring exhibitors?",
          answer:
            "Yes, we work with both first-time exhibitors and companies attending events regularly.",
        },
      ],
    },
    servicesPage: {
      eyebrow: "Services",
      title: "#1 Exhibition Booth Design & Production in {City}",
      lead:
        "Full-lifecycle exhibition booth production across Saudi Arabia — design, build, install, dismantle, and storage, all in-house.",
      primaryCta: "Request a Quote",
      secondaryCta: "View Our Work",
      detailTitle: "Where we go deep",
      faqItems: [
        {
          question: "What happens if I need changes during the event?",
          answer:
            "Our team stays reachable during your event for any on-site adjustments or urgent fixes, so you're never left without support.",
        },
        {
          question: "Can you handle multiple booths across different cities at the same time?",
          answer:
            "Yes. Our production and installation teams operate across major cities in Saudi Arabia, so we can manage multiple builds in parallel.",
        },
        {
          question:
            "What if I only need part of the process, like design and fabrication, but want to handle installation myself?",
          answer:
            "That's fine — the A to Z Solution is flexible. We can scope the package around exactly what you need done and what you'd rather manage yourself.",
        },
        {
          question: "Is my booth reusable for future events?",
          answer:
            "In most cases, yes. We design with reusability in mind where possible, and our storage service keeps your booth ready for reinstallation at your next event.",
        },
        {
          question: "What materials do you use for fabrication?",
          answer:
            "We select materials based on your design, budget, and durability needs — including sustainable and eco-friendly options where suitable.",
        },
        {
          question: "Who owns the booth after the event?",
          answer:
            "The booth is yours. We simply offer storage and reinstallation as a convenience so you don't have to manage logistics between events.",
        },
        {
          question: "Do you provide insurance or liability coverage during transport and installation?",
          answer:
            "Yes, our logistics and installation processes include coverage to protect your booth throughout transport, setup, and dismantling.",
        },
      ],
    },
    process: {
      eyebrow: "How we work",
      title: "A clear path from brief to launch",
      support: "Simple stages. Tight collaboration. No wasted motion.",
      steps: [
        {
          title: "Discover",
          description: "We dig into the brand, audience, and constraints until the real problem is clear.",
        },
        {
          title: "Define",
          description: "Strategy and creative direction lock the north star before production starts.",
        },
        {
          title: "Design",
          description: "Concepts become systems — identity, layouts, motion, and content frameworks.",
        },
        {
          title: "Deliver",
          description: "We produce, refine, and hand over assets ready to ship and scale.",
        },
      ],
    },
    work: {
      eyebrow: "Our Work",
      title: "Recent work",
      support: "A look at what has gone out the door recently.",
      items: workItems("en"),
      viewAll: "View Our Work",
    },
    workPage: {
      eyebrow: "Our Work",
      title: "Selected work",
      lead: "Exhibitions, events, interiors and displays produced across services and sectors.",
    },
    industriesPage: {
      eyebrow: "Sectors",
      title: "Industries",
      lead: "Booth solutions shaped around the realities of each sector.",
    },
    locationsPage: {
      eyebrow: "Cities",
      title: "Locations",
      lead: "Presence across Saudi Arabia’s key exhibition cities.",
    },
    newsPage: {
      eyebrow: "Insights",
      title: "Insights",
      lead: "Practical thinking from the show floor and the production floor.",
    },
    projectPage: {
      challenge: "Challenge",
      approach: "CPS Solution",
      outcome: "Outcome",
      gallery: "Gallery",
      next: "Next project",
      back: "All work",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's plan your next project",
      support:
        "Share what you're building — booth, event, fit-out, display or fabrication — and we'll reply with a clear next step.",
      emailLabel: "Start a Project",
      whatsappLabel: "WhatsApp",
    },
    briefForm: getBriefFormCopy("en"),
    contactPage: {
      eyebrow: "Contact",
      title: "Start with a conversation.",
      lead: "Share your project details — we’ll reply with a clear next step.",
      businessHours: "Sun–Thu, 9:00–18:00 AST",
      info: {
        emailLabel: "Email",
        phoneLabel: "Phone",
        whatsappLabel: "WhatsApp",
        addressLabel: "Studio",
        socialLabel: "Follow",
      },
      map: {
        eyebrow: "Location",
        title: "Find our studio.",
        support: "Based in Riyadh — delivering exhibitions across Saudi Arabia, the GCC, and Egypt.",
        openMaps: "Open in Google Maps",
        hqLabel: "Headquarters",
      },
    },
    projectLaunch: {
      eyebrow: "New Project",
      title: "Have a project in mind?",
      support:
        "Share what you want to build, and we’ll turn it into a clear plan and a confident first step.",
      ctaLabel: "Start a Project",
    },
    footer: {
      tagline: "Creatives Professionals",
      rights: "All rights reserved.",
      locationsTitle: "Locations",
      locations: [
        { label: "Riyadh", href: "/locations/riyadh" },
        { label: "Jeddah", href: "/locations/jeddah" },
        { label: "Dammam", href: "/locations/dammam" },
        { label: "Khobar", href: "/locations/khobar" },
        { label: "Makkah", href: "/locations/makkah" },
        { label: "Madinah", href: "/locations/madinah" },
        { label: "NEOM", href: "/locations/neom" },
      ],
    },
    comingSoon: {
      title: "CPS",
      subtitle: "Creatives Professionals",
    },
  },
  ar: {
    nav: {
      items: [
        { label: "الرئيسية", href: "/" },
        { label: "من نحن", href: "/about" },
        { label: "خدماتنا", href: "/services" },
        { label: "أنواع الأجنحة", href: "/booth-types" },
        { label: "أعمالنا", href: "/our-work" },
        { label: "الأخبار والمقالات", href: "/news" },
        { label: "تواصل معنا", href: "/contact" },
      ],
      cta: "اطلب عرض سعر",
      langLabel: "English",
      langHrefLocale: "en",
    },
    hero: {
      badge: "إنتاج وتصنيع وتجهيز داخلي",
      headline: "معارض وفعاليات.\nمساحات داخلية ووحدات عرض.\nنصمّمها وننفّذها تحت سقف واحد.",
      support:
        "ثماني خدمات يجمعها مصنع واحد، ونتولى التصنيع والتركيب بفرقنا دون مقاول من الباطن.",
      primaryCta: "ابدأ مشروعك",
      secondaryCta: "تعرّف على ما ننفّذه",
    },
    lifecycle: {
      eyebrow: "من نحن",
      title: "شريك إنتاج واحد بقدرات متعددة",
      support: "من الرسم الفني حتى التركيب النهائي، يتابع مشروعك فريق يعرف كل تفاصيله.",
      imageAlt: "فنيو CPS أثناء أعمال التصنيع والتركيب",
      items: [
        {
          title: "مجالات عمل متنوعة",
          description:
            "أجنحة المعارض، وهياكل الفعاليات، والمساحات الداخلية بهوية علامتك، ووحدات العرض في المتاجر، واللافتات، والتصنيع حسب الطلب — كلها لدى جهة واحدة",
        },
        {
          title: "إنتاج في مصنعنا",
          description: "أعمال الخشب والمعدن والأكريليك والطباعة والتركيب ننفّذها بكوادرنا الخاصة",
        },
        {
          title: "جهة تواصل واحدة",
          description: "مسؤول واحد يتابع مشروعك من الفكرة حتى التسليم",
        },
      ],
    },
    stats: {
      eyebrow: "سجلّ أعمالنا",
      title: "خبرة صقلتها قاعات المعارض",
      support:
        "سنوات من الإنتاج في مصنعنا لمشاريع في المملكة ودول الخليج — من الموجز حتى التنفيذ.",
      items: [
        {
          value: 500,
          suffix: "+",
          label: "جناح منفّذ",
          detail: "أجنحة مخصصة ومعيارية وأجنحة وطنية",
        },
        {
          value: 15,
          suffix: "+",
          label: "عاماً في قطاع المعارض",
          detail: "من التصميم حتى التفكيك",
        },
        {
          value: 12,
          suffix: "+",
          label: "مدينة نغطيها في المملكة",
          detail: "الرياض وجدة والدمام وغيرها",
        },
        {
          value: 100,
          suffix: "%",
          label: "إنتاج في مصنعنا",
          detail: "دون مقاولين من الباطن",
        },
      ],
    },
    clients: {
      eyebrow: "عملاؤنا",
      title: "حضور يلفت الأنظار، والتزام يُعتمد عليه.",
      support:
        "من أول رسم تخطيطي حتى يوم الافتتاح، يعتمد عملاؤنا على فريق يتقن كل تفصيل.",
      items: [
        {
          quote:
            "لم أشعر بثقة كهذه من قبل وأنا أقترب من جناحنا. فهمت CPS علامتنا التجارية منذ الموجز الأول.",
          name: "سارة العتيبي",
          role: "مديرة التسويق",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "سارة العتيبي",
        },
        {
          quote:
            "وصل الجناح في موعده، وجاءت جودته في المعرض أفضل من التصاميم ثلاثية الأبعاد. تولّى فريق واحد كل شيء.",
          name: "عمر الراشد",
          role: "مسؤول الفعاليات",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "عمر الراشد",
        },
        {
          quote:
            "جهة واحدة من التصميم حتى التفكيك، وهذا وحده وفّر علينا أسابيع من التنسيق بين الموردين.",
          name: "أدريان كول",
          role: "استراتيجي علامات تجارية",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "أدريان كول",
        },
        {
          quote:
            "توقّف الزوار فعلاً عند جناحنا. جذب التصميم المخصص إقبالاً لم نشهده في مشاركاتنا السابقة.",
          name: "لينا حسن",
          role: "نائبة الرئيس للتسويق",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "لينا حسن",
        },
        {
          quote:
            "أعدنا تركيب الجناح المعياري في المدينة التالية دون أي عقبة، وكان التخزين وإعادة التركيب سلسين تماماً.",
          name: "ماركو سيلفا",
          role: "مدير المشاركات في المعارض",
          image:
            "https://images.unsplash.com/photo-1519081909018-445c88991a1d?auto=format&fit=crop&w=200&h=200&q=80",
          imageAlt: "ماركو سيلفا",
        },
      ],
    },
    about: {
      eyebrow: "من نحن",
      title: "مبدعون في الفكرة، محترفون في التنفيذ",
      body: "CPS شركة إنتاج وتصنيع وتجهيز داخلي، تنفّذ المعارض والفعاليات والمساحات الداخلية ووحدات العرض واللافتات في مختلف مناطق المملكة.",
    },
    aboutPage: {
      eyebrow: "عن CPS",
      title: "نحوّل الأفكار إلى واقع ملموس.",
      lead: "شركة إنتاج وتصنيع وتجهيز داخلي تعمل في جميع مناطق المملكة العربية السعودية.",
      storyImage: media.about.studio,
      storyImageAlt: "ورشة التصنيع في CPS أثناء العمل",
      studioImage: media.about.studio,
      studioImageAlt: "ورشة التصنيع في CPS",
      industriesImage: media.about.industries,
      industriesImageAlt: "مشروع نفّذته CPS لأحد عملائها",
      storyTitle: "قصتنا",
      storyHeadline: "شريك إنتاج واحد بقدرات متعددة.",
      story:
        "أجنحة المعارض، وهياكل الفعاليات، والمساحات التي تعكس هوية العلامة، ووحدات العرض، واللافتات، والحلول المصنّعة حسب الطلب — كلها لدى CPS. نربط التطوير الفني بالتصنيع والتنفيذ النهائي في الموقع، ويتحمّل فريق واحد مسؤولية النتيجة كاملة.",
      storySecond:
        "ننفّذ أعمال الخشب والمعدن والأكريليك والطباعة والتركيب بأنفسنا، فنضبط الجودة عن قرب ونختصر الطريق إلى التسليم.",
      valuesTitle: "ما يميّزنا",
      valuesSupport: "ثوابت نلتزم بها في كل مشروع.",
      values: [
        {
          title: "إنتاج في مصنعنا",
          description: "ننفّذ جميع التخصصات الرئيسية بكوادرنا.",
        },
        {
          title: "فريق مسؤول عن النتيجة",
          description: "الفريق نفسه من الرسم الفني حتى التركيب والتسليم.",
        },
        {
          title: "تغطية جميع مناطق المملكة",
          description: "معاينة الموقع والتوصيل والتفكيك في أي مدينة بالمملكة.",
        },
        {
          title: "ثقة علامات رائدة",
          description: "عملاء في المملكة من قطاعات البنوك والاتصالات والتجزئة.",
        },
      ],
      studioTitle: "هنا يُصنع كل مشروع",
      studioSupport: "مصنعنا وفريقنا، من المادة الخام حتى التركيب النهائي.",
      studioItems: [
        {
          title: "ورشة مجهّزة بالكامل",
          description: "كل ما يلزم لتصنيع المشروع من أوله إلى آخره.",
        },
        {
          title: "كوادر فنية ماهرة",
          description: "حرفيون وفنيون من فريقنا، لا عمالة من مقاولين.",
        },
        {
          title: "رقابة جودة في كل مرحلة",
          description: "نفحص كل قطعة قبل أن تغادر المصنع.",
        },
        {
          title: "جاهزية للمشاريع الكبيرة",
          description: "قدرة على تنفيذ عدة مشاريع في وقت واحد.",
        },
      ],
      workflowEyebrow: "كيف نعمل",
      workflowTitle: "من الموجز إلى التسليم",
      workflowSupport:
        "خمس خطوات ثابتة نتبعها في كل مشروع، أياً كانت الخدمة.",
      workflowSteps: [
        {
          title: "الموجز ومعاينة الموقع",
          description:
            "ندرس موجز المشروع وظروف الموقع والقيود الفنية قبل البدء في التصميم.",
        },
        {
          title: "التصميم والرسومات الفنية",
          description:
            "نطوّر الأفكار إلى رسومات معتمدة جاهزة للتصنيع.",
        },
        {
          title: "التصنيع في مصنعنا",
          description:
            "نصنّع كل العناصر في منشأتنا: الخشب والمعدن والأكريليك والطباعة واللافتات.",
        },
        {
          title: "التوصيل والتركيب",
          description:
            "تتولى فرقنا التوصيل والتركيب والتفكيك في جميع مناطق المملكة.",
        },
        {
          title: "التسليم والدعم",
          description:
            "جولة استلام نهائية ومعالجة الملاحظات، ودعم مستمر عند الحاجة إلى الصيانة أو إعادة الاستخدام.",
        },
      ],
      closingLine: "شريك إنتاج واحد، وقدرات متعددة، في خدمة مشروعك.",
      industriesEyebrow: "القطاعات",
      industriesTitle: "القطاعات التي نخدمها",
      industriesSupport:
        "مشاريع نفّذناها لقطاعات لا تقبل إلا الدقة في التنفيذ.",
      industriesItems: [
        "الحكومة والقطاع العام",
        "البنوك والخدمات المالية",
        "الرعاية الصحية والأدوية",
        "السلع الاستهلاكية سريعة التداول",
        "التجميل ومستحضرات العناية",
        "التقنية والإلكترونيات",
        "السيارات",
        "التجزئة ومراكز التسوق",
        "العقارات",
        "الضيافة",
        "الرياضة والترفيه",
      ],
      industriesCta: "استعرض المشاريع حسب القطاع",
      industriesMore: "+١٥ قطاعاً آخر",
      industriesLogosTitle: "ثقة عملاء من مختلف القطاعات",
      faqItems: [
        {
          question: "هل CPS شركة تصميم أم شركة إنتاج؟",
          answer:
            "كلاهما. نتولى التصميم والتصنيع وتطبيق الهوية والتركيب والتسليم بفريقنا، في المعارض والفعاليات والمساحات الداخلية ووحدات العرض واللافتات.",
        },
        {
          question: "هل تعملون مع عملاء خارج المملكة؟",
          answer:
            "نركّز حالياً على تنفيذ المشاريع داخل المملكة. وإن كان مشروعك في بلد آخر، فتواصل معنا لنؤكد لك ما يمكننا تقديمه.",
        },
        {
          question: "ما القطاعات التي تعملون معها عادةً؟",
          answer:
            "نخدم قطاعات متنوعة، منها المال والبنوك، والجهات الحكومية، والعقارات، والاتصالات، والطاقة، والرعاية الصحية، والتجزئة.",
        },
        {
          question: "ما الذي يميّز CPS عن شركات الإنتاج الأخرى؟",
          answer:
            "يتولى فريقنا كل مراحل العمل — دون مقاولين من الباطن ودون تنقّل المشروع بين الموردين. وما تعتمده في التصميم هو ما يُنفَّذ فعلاً.",
        },
        {
          question: "هل تنفّذ CPS مشاريع بأي حجم؟",
          answer:
            "نعم — من وحدة عرض أو كشك واحد إلى المساحات الداخلية الكبيرة والفعاليات والأجنحة الكبرى. فريقنا ومنشآتنا مهيّأة للمشاريع الكبيرة.",
        },
        {
          question: "كيف أبدأ مشروعي مع CPS؟",
          answer:
            "تواصل معنا عبر نموذج التواصل، وسنحدد اجتماعاً لمناقشة موجز المشروع وفهم أهدافك ونطاق العمل والجدول الزمني.",
        },
      ],
    },
    services: {
      eyebrow: "ما نقدّمه",
      title: "ثماني خدمات ومصنع واحد.",
      support: "تصفّح أبرز أعمالنا حسب الخدمة، أو انتقل مباشرة إلى الكتالوج الكامل.",
      cta: "استعرض جميع الخدمات",
      items: [
        {
          title: "المعارض والأجنحة",
          description: "أجنحة معارض مصمّمة حسب الطلب، وحلول معيارية، وأجنحة كبرى.",
          image: media.services.exhibitions,
          imageAlt: "جناح معرض مصمّم حسب الطلب",
          slug: "exhibitions-booths",
        },
        {
          title: "تصنيع وتجهيز الفعاليات",
          description: "منصات ومسارح وهياكل ديكور ومساحات بهوية العلامة وتجارب تفاعلية.",
          image: media.services.events,
          imageAlt: "تجهيزات فعالية من تصنيع CPS",
          slug: "event-fabrication",
        },
        {
          title: "التجهيز الداخلي",
          description: "مساحات تجارية ومكاتب وصالات عرض ومتاجر ومساحات بهوية العلامة.",
          image: media.services.fitOut,
          imageAlt: "تجهيز داخلي لمساحة تجارية",
          slug: "fit-out-interiors",
        },
        {
          title: "وحدات العرض ونقاط البيع",
          description: "أرفف عرض (جندولات)، وحوامل منتجات، ووحدات نقاط البيع، وأكشاك، وواجهات عرض.",
          image: media.services.retail,
          imageAlt: "وحدة عرض في متجر",
          slug: "retail-displays",
        },
        {
          title: "التصنيع حسب الطلب",
          description: "تصنيع بالخشب والمعدن والأكريليك وماكينات CNC والمواد المتعددة.",
          image: media.services.fabrication,
          imageAlt: "ورشة التصنيع حسب الطلب",
          slug: "custom-fabrication",
        },
        { title: "الطباعة واللافتات", description: "طباعة كبيرة الحجم، وهوية بصرية للمساحات، وأنظمة لوحات إرشادية.", image: media.services.printing, imageAlt: "أعمال الطباعة واللافتات", slug: "printing-signage" },
        { title: "حلول التأجير", description: "عناصر قابلة لإعادة الاستخدام للفعاليات والمعارض ووحدات العرض.", image: media.services.rental, imageAlt: "عناصر متاحة للتأجير", slug: "rental-solutions" },
        { title: "التركيب وتسليم المشاريع", description: "تخطيط فني وخدمات لوجستية وتركيب وتخزين وصيانة.", image: media.services.installation, imageAlt: "أعمال التركيب في الموقع", slug: "installation-project-delivery" },
      ],
    },
    boothTypes: {
      eyebrow: "أنواع الأجنحة",
      title: "من الأكشاك الصغيرة إلى الأجنحة الوطنية",
      support: "من الأجنحة الصغيرة إلى الأجنحة الكبرى — نصمّم كل جناح وفق احتياجك.",
      cta: "استكشف أنواع الأجنحة",
      items: [
        {
          title: "أجنحة مصمّمة حسب الطلب",
          image: media.boothTypes.custom,
          imageAlt: "جناح معرض مصمّم حسب الطلب",
          slug: "custom",
        },
        {
          title: "أجنحة معيارية",
          image: media.boothTypes.modular,
          imageAlt: "جناح معياري قابل لإعادة التركيب",
          slug: "modular",
        },
        {
          title: "أجنحة بطابقين",
          image: media.boothTypes.doubleDeck,
          imageAlt: "جناح معرض بطابقين",
          slug: "double-deck",
        },
        {
          title: "وحدات عرض متنقلة ومؤقتة",
          image: media.boothTypes.portable,
          imageAlt: "وحدة عرض متنقلة",
          slug: "portable",
        },
        {
          title: "أكشاك وأجنحة صغيرة المساحة",
          image: media.boothTypes.kiosk,
          imageAlt: "كشك صغير المساحة",
          slug: "kiosks",
        },
        {
          title: "منشآت خارجية وتفعيلات",
          image: media.boothTypes.outdoor,
          imageAlt: "منشأة خارجية لتفعيل علامة تجارية",
          slug: "outdoor",
        },
        {
          title: "أجنحة الدول والأجنحة الوطنية",
          image: media.boothTypes.pavilion,
          imageAlt: "جناح وطني في معرض",
          slug: "pavilions",
        },
        {
          title: "أجنحة مستدامة",
          image: media.boothTypes.sustainable,
          imageAlt: "جناح مستدام صديق للبيئة",
          slug: "sustainable",
        },
      ],
    },
    boothTypesPage: {
      eyebrow: "أنواع الأجنحة",
      title: "جناح يناسب كل مساحة وكل صيغة.",
      lead: "من الكشك الصغير إلى الجناح الوطني بطابقين، تصمّم CPS جناحك وتصنعه في مصنعها.",
    },
    whyCps: {
      eyebrow: "لماذا CPS",
      title: "فريق واحد من الفكرة حتى التركيب النهائي",
      support: "تبقى كل مراحل العمل في أيدينا، فلا تضيع التفاصيل بين المقاولين.",
      clientsLine: "نفّذنا مشاريع لـ Ajlan & Bros وSNB وSAB وSirar by STC وAl Hilal",
      reasons: [
        {
          title: "إنتاج في مصنعنا",
          description: "أعمال الخشب والمعدن والأكريليك والطباعة واللافتات يتولاها فريق واحد مسؤول عن النتيجة.",
        },
        {
          title: "تغطية جميع مناطق المملكة",
          description: "ننسّق معاينة الموقع والتركيب والتفكيك في أي مدينة بالمملكة.",
        },
        {
          title: "جهة تواصل واحدة",
          description: "مسؤول واحد يتابع العمل من الرسم الفني حتى التركيب والتسليم.",
        },
        {
          title: "خبرة مثبتة",
          description: "نفّذنا مشاريع لعلامات سعودية رائدة في البنوك والاتصالات والرياضة والتجزئة.",
        },
      ],
      primary: {
        title: "إنتاج في مصنعنا",
        description:
          "الخشب والمعدن والأكريليك والطباعة واللافتات — كلها تُصنع في منشأة واحدة تتحمّل مسؤولية الجودة.",
        cta: "ابدأ مشروعك",
        href: "/contact",
      },
      secondary: {
        title: "تغطية جميع مناطق المملكة",
        description:
          "معاينة الموقع والتركيب والتفكيك، مع جهة تواصل واحدة من الرسم الفني حتى التسليم.",
        cta: "تعرّف على قدراتنا",
        href: "/production-capabilities",
      },
      images: {
        wideAlt: "قاعة معرض يبرز فيها جناح بهوية العلامة",
        leftAlt: "تصنيع جناح مخصص في ورشة CPS",
        rightAlt: "جناح معرض مخصص مكتمل في قاعة العرض",
      },
    },
    beforeAfter: {
      eyebrow: "قبل وبعد",
      title: "شاهد الفرق بنفسك",
      subtitle:
        "من جناح نمطي إلى حضور بهوية علامتك يجذب الزوار — بفريق واحد ومسار عمل واحد.",
      beforeImage: media.beforeAfter.before,
      afterImage: media.beforeAfter.after,
      beforeItems: [
        "جناح نمطي جاهز من المنظّم",
        "موردون متفرقون",
        "تعديلات اللحظة الأخيرة",
        "حضور باهت للعلامة",
      ],
      afterItems: [
        "جناح مخصص بهوية العلامة",
        "فريق CPS واحد",
        "تركيب في الموعد",
        "حضور لافت في المعرض",
      ],
    },
    faq: {
      eyebrow: "الأسئلة الشائعة",
      title: "أسئلة عن CPS",
      support: "إجابات واضحة عن الخدمات والمدد الزمنية ومناطق التغطية — قبل أن ترسل الموجز.",
      items: [
        {
          question: "ماذا تقدّم CPS؟",
          answer:
            "ننفّذ المعارض والفعاليات والمساحات الداخلية ووحدات العرض للتجزئة من مصنعنا — التصميم والتصنيع والطباعة والتركيب والتخزين، وكل ذلك بفريقنا.",
        },
        {
          question: "هل يلزمني طلب جميع الخدمات، أم يمكنني اختيار خدمة واحدة؟",
          answer:
            "كل خدمة متاحة منفردة. يمكنك طلب خدمة واحدة — مثل أجنحة المعارض أو التصنيع حسب الطلب أو الطباعة — أو أن تسلّمنا المشروع كاملاً من التصميم حتى التركيب.",
        },
        {
          question: "ما المدن التي تغطّونها؟",
          answer:
            "ننفّذ مشاريعنا في المدن الرئيسية بالمملكة العربية السعودية. أخبرنا بموقع فعاليتك وسنؤكد لك التغطية.",
        },
        {
          question: "كيف أحصل على عرض سعر؟",
          answer:
            "استخدم نموذج «ابدأ مشروعك» وأدخل تفاصيل فعاليتك، أو تواصل معنا مباشرة، وسنعود إليك لمناقشة مشروعك.",
        },
        {
          question: "كم من الوقت يلزم للحجز قبل الفعالية؟",
          answer:
            "ننصح بالتواصل فور تأكيد موعد الفعالية، ويُفضّل قبل عدة أسابيع للأجنحة المصمّمة حسب الطلب، ويمكننا التعامل مع جداول أضيق بحسب طبيعة المشروع.",
        },
        {
          question: "هل تنفّذون أجنحة لمشاركة واحدة، لا للعارضين الدائمين فقط؟",
          answer:
            "نعم، نعمل مع من يشارك في المعارض لأول مرة ومع الشركات التي تشارك فيها بانتظام.",
        },
      ],
    },
    servicesPage: {
      eyebrow: "الخدمات",
      title: "تصميم وتنفيذ أجنحة المعارض في {City}",
      lead:
        "إنتاج متكامل لأجنحة المعارض في جميع مناطق المملكة: التصميم والتصنيع والتركيب والتفكيك والتخزين، وكلها بفريق CPS.",
      primaryCta: "اطلب عرض سعر",
      secondaryCta: "شاهد أعمالنا",
      detailTitle: "مجالات تخصصنا",
      faqItems: [
        {
          question: "ماذا لو احتجت إلى تعديلات أثناء الفعالية؟",
          answer:
            "يبقى فريقنا على تواصل معك طوال الفعالية لأي تعديل في الموقع أو إصلاح عاجل، فلن تكون وحدك في أي لحظة.",
        },
        {
          question: "هل يمكنكم تنفيذ عدة أجنحة في مدن مختلفة في الوقت نفسه؟",
          answer:
            "نعم. تعمل فرق الإنتاج والتركيب لدينا في المدن الرئيسية بالمملكة، ما يتيح لنا تنفيذ عدة أجنحة بالتوازي.",
        },
        {
          question:
            "ماذا لو احتجت إلى جزء من العمل فقط، كالتصميم والتصنيع، وأردت تولّي التركيب بنفسي؟",
          answer:
            "لا مانع — الحل المتكامل مرن. نحدّد نطاق العمل وفق ما تحتاج إليه بالضبط، ونترك لك ما تفضّل إدارته بنفسك.",
        },
        {
          question: "هل يمكن إعادة استخدام جناحي في فعاليات لاحقة؟",
          answer:
            "في أغلب الحالات، نعم. نراعي قابلية إعادة الاستخدام في التصميم متى أمكن، وتحافظ خدمة التخزين على جناحك جاهزاً لإعادة التركيب في فعاليتك التالية.",
        },
        {
          question: "ما المواد التي تستخدمونها في التصنيع؟",
          answer:
            "نختار المواد بحسب التصميم والميزانية ومتطلبات المتانة، ومنها خيارات مستدامة وصديقة للبيئة حيثما كانت مناسبة.",
        },
        {
          question: "لمن تعود ملكية الجناح بعد الفعالية؟",
          answer:
            "الجناح ملكك بالكامل. أما التخزين وإعادة التركيب فخدمة نقدّمها لنخفف عنك عبء اللوجستيات بين الفعاليات.",
        },
        {
          question: "هل توفّرون تأميناً أو تغطية للمسؤولية أثناء النقل والتركيب؟",
          answer:
            "نعم، تشمل عمليات النقل والتركيب لدينا تغطية تحمي جناحك خلال النقل والتركيب والتفكيك.",
        },
      ],
    },
    process: {
      eyebrow: "كيف نعمل",
      title: "مسار واضح من الموجز إلى الإطلاق",
      support: "مراحل واضحة، وتعاون وثيق، ووقت لا يُهدر.",
      steps: [
        {
          title: "الاستكشاف",
          description: "ندرس العلامة والجمهور والقيود حتى تتضح المشكلة الحقيقية.",
        },
        {
          title: "التحديد",
          description: "نحسم الاستراتيجية والتوجه الإبداعي قبل أن يبدأ الإنتاج.",
        },
        {
          title: "التصميم",
          description: "تتحول الأفكار إلى منظومة متكاملة: هوية وتخطيطات وحركة وأطر محتوى.",
        },
        {
          title: "التسليم",
          description: "ننتج ونراجع ونسلّم مواد جاهزة للإطلاق والتوسّع.",
        },
      ],
    },
    work: {
      eyebrow: "أعمالنا",
      title: "أحدث الأعمال",
      support: "لمحة عن أحدث ما خرج من مصنعنا.",
      items: workItems("ar"),
      viewAll: "شاهد أعمالنا",
    },
    workPage: {
      eyebrow: "أعمالنا",
      title: "أعمال مختارة",
      lead: "معارض وفعاليات ومساحات داخلية ووحدات عرض نفّذناها لقطاعات متعددة.",
    },
    industriesPage: {
      eyebrow: "القطاعات",
      title: "القطاعات",
      lead: "حلول أجنحة تراعي متطلبات كل قطاع وطبيعته.",
    },
    locationsPage: {
      eyebrow: "المدن",
      title: "المواقع",
      lead: "حضور في أبرز مدن المعارض بالمملكة العربية السعودية.",
    },
    newsPage: {
      eyebrow: "مقالات",
      title: "مقالات ورؤى",
      lead: "أفكار عملية من قاعات المعارض ومن داخل المصنع.",
    },
    projectPage: {
      challenge: "التحدي",
      approach: "حل CPS",
      outcome: "النتيجة",
      gallery: "معرض الصور",
      next: "المشروع التالي",
      back: "كل الأعمال",
    },
    contact: {
      eyebrow: "تواصل معنا",
      title: "لنخطّط لمشروعك القادم",
      support:
        "أخبرنا بما تخطط له — جناح أو فعالية أو تجهيز داخلي أو وحدة عرض أو تصنيع — وسنعود إليك بخطوة تالية واضحة.",
      emailLabel: "ابدأ مشروعك",
      whatsappLabel: "واتساب",
    },
    briefForm: getBriefFormCopy("ar"),
    contactPage: {
      eyebrow: "تواصل معنا",
      title: "كل مشروع يبدأ بمحادثة.",
      lead: "شاركنا تفاصيل مشروعك، وسنعود إليك بخطوة تالية واضحة.",
      businessHours: "الأحد–الخميس، 9:00–18:00 بتوقيت السعودية",
      info: {
        emailLabel: "البريد الإلكتروني",
        phoneLabel: "الهاتف",
        whatsappLabel: "واتساب",
        addressLabel: "العنوان",
        socialLabel: "تابعنا",
      },
      map: {
        eyebrow: "الموقع",
        title: "زُر مقرنا.",
        support: "مقرنا في الرياض، وننفّذ المعارض في المملكة ودول الخليج ومصر.",
        openMaps: "افتح في خرائط Google",
        hqLabel: "المقر الرئيسي",
      },
    },
    projectLaunch: {
      eyebrow: "مشروع جديد",
      title: "هل لديك مشروع تفكر فيه؟",
      support:
        "أخبرنا بما تريد تنفيذه، وسنحوّله إلى خطة واضحة وخطوة أولى تنطلق منها بثقة.",
      ctaLabel: "ابدأ مشروعك",
    },
    footer: {
      tagline: "إبداع في الفكرة، احتراف في التنفيذ",
      rights: "جميع الحقوق محفوظة.",
      locationsTitle: "المواقع",
      locations: [
        { label: "الرياض", href: "/locations/riyadh" },
        { label: "جدة", href: "/locations/jeddah" },
        { label: "الدمام", href: "/locations/dammam" },
        { label: "الخبر", href: "/locations/khobar" },
        { label: "مكة المكرمة", href: "/locations/makkah" },
        { label: "المدينة المنورة", href: "/locations/madinah" },
        { label: "نيوم", href: "/locations/neom" },
      ],
    },
    comingSoon: {
      title: "CPS",
      subtitle: "إبداع في الفكرة، احتراف في التنفيذ",
    },
  },
};

export function getDictionaryLocal(locale: Locale): Dictionary {
  return dictionaries[locale];
}
