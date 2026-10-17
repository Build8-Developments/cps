import type { Locale } from "@/lib/i18n";

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterBadge = {
  label: string;
  image?: string;
  imageAlt?: string;
};

export type FooterSocial = {
  platform: string;
  url: string;
  label?: string;
};

export type FooterConfig = {
  logo: string;
  logoAlt: string;
  description: string;
  certifications: FooterBadge[];
  qualityBadges: FooterBadge[];
  cta: { label: string; href: string };
  servicesTitle: string;
  showServices: boolean;
  workTitle: string;
  showWork: boolean;
  areasTitle: string;
  areasSupport: string;
  areasAllLabel: string;
  areasSearchPlaceholder: string;
  areasEmpty: string;
  areasServiceLink: string;
  showAreas: boolean;
  companyLinksTitle: string;
  companyLinks: FooterLink[];
  contactTitle: string;
  officeAddress: string;
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  whatsappLabel: string;
  businessHours: string;
  mapsLabel: string;
  mapsUrl: string;
  socialLinks: FooterSocial[];
  newsletter: {
    enabled: boolean;
    headline: string;
    description: string;
    placeholder: string;
    buttonLabel: string;
    mailto?: string;
  };
  trust: {
    enabled: boolean;
    items: { label: string }[];
  };
  rights: string;
  bottomLinks: FooterLink[];
  createdBy?: string;
};

function footerEn(): FooterConfig {
  return {
    logo: "/logo.png",
    logoAlt: "CPS — Creatives Professionals",
    description: "Exhibitions. Events. Interiors. Displays. Built under one roof.",
    certifications: [],
    qualityBadges: [],
    cta: { label: "Start a Project", href: "/contact" },
    servicesTitle: "Services",
    showServices: true,
    workTitle: "Work",
    showWork: true,
    areasTitle: "Where We Deliver",
    areasSupport: "Eight services, built in Riyadh and installed across the Kingdom.",
    areasAllLabel: "Explore all locations",
    areasSearchPlaceholder: "Find your city",
    areasEmpty: "We don't list that city yet — get in touch and we'll confirm coverage.",
    areasServiceLink: "View service",
    showAreas: true,
    companyLinksTitle: "Company",
    companyLinks: [
      { label: "About CPS", href: "/about" },
      { label: "Production Capabilities", href: "/production-capabilities" },
      { label: "Insights", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
    contactTitle: "Get in Touch",
    officeAddress: "Riyadh, Saudi Arabia",
    phoneDisplay: "+966 56 084 6520",
    phoneHref: "+966560846520",
    email: "inquiry@creativesprofessionals.com",
    whatsappLabel: "WhatsApp",
    businessHours: "Sun–Thu, 9:00–18:00 AST",
    mapsLabel: "Open in Google Maps",
    mapsUrl: "https://maps.app.goo.gl/jHYVBC2qY3WxZH9z6",
    socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/", label: "LinkedIn" },
      { platform: "instagram", url: "https://www.instagram.com/", label: "Instagram" },
      { platform: "x", url: "https://x.com/", label: "X" },
    ],
    newsletter: {
      enabled: false,
      headline: "Exhibition insights, delivered.",
      description: "Occasional notes on booth strategy, production, and show-floor craft.",
      placeholder: "Work email",
      buttonLabel: "Subscribe",
      mailto: "inquiry@creativesprofessionals.com",
    },
    trust: {
      enabled: true,
      items: [
        { label: "Design" },
        { label: "Fabrication" },
        { label: "Installation" },
        { label: "Storage" },
      ],
    },
    rights: "All rights reserved.",
    bottomLinks: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
    ],
  };
}

function footerAr(): FooterConfig {
  return {
    logo: "/logo.png",
    logoAlt: "شعار CPS",
    description: "المعارض والفعاليات والتجهيز الداخلي ووحدات العرض، ننفّذها جميعاً تحت سقف واحد.",
    certifications: [],
    qualityBadges: [],
    cta: { label: "ابدأ مشروعك", href: "/contact" },
    servicesTitle: "الخدمات",
    showServices: true,
    workTitle: "أعمالنا",
    showWork: true,
    areasTitle: "مناطق خدمتنا",
    areasSupport: "ثماني خدمات، بإنتاج في الرياض وتركيب في أنحاء المملكة.",
    areasAllLabel: "استكشف جميع مناطق خدمتنا",
    areasSearchPlaceholder: "ابحث عن مدينة أو منطقة",
    areasEmpty: "لم نُدرج هذه المدينة بعد، تواصل معنا وسنؤكد لك إمكانية التنفيذ فيها.",
    areasServiceLink: "تفاصيل الخدمة",
    showAreas: true,
    companyLinksTitle: "الشركة",
    companyLinks: [
      { label: "من نحن", href: "/about" },
      { label: "قدرات الإنتاج", href: "/production-capabilities" },
      { label: "الأخبار والمقالات", href: "/news" },
      { label: "تواصل معنا", href: "/contact" },
    ],
    contactTitle: "تواصل معنا",
    officeAddress: "الرياض، المملكة العربية السعودية",
    phoneDisplay: "+966 56 084 6520",
    phoneHref: "+966560846520",
    email: "inquiry@creativesprofessionals.com",
    whatsappLabel: "واتساب",
    businessHours: "الأحد–الخميس، 9:00–18:00 (بتوقيت الرياض)",
    mapsLabel: "افتح في خرائط Google",
    mapsUrl: "https://maps.app.goo.gl/jHYVBC2qY3WxZH9z6",
    socialLinks: [
      { platform: "linkedin", url: "https://www.linkedin.com/", label: "LinkedIn" },
      { platform: "instagram", url: "https://www.instagram.com/", label: "Instagram" },
      { platform: "x", url: "https://x.com/", label: "X" },
    ],
    newsletter: {
      enabled: false,
      headline: "أحدث رؤى المعارض في بريدك",
      description: "رسائل دورية عن تخطيط الأجنحة والإنتاج وأفضل الممارسات في المعارض.",
      placeholder: "البريد الإلكتروني للعمل",
      buttonLabel: "اشترك",
      mailto: "inquiry@creativesprofessionals.com",
    },
    trust: {
      enabled: true,
      items: [
        { label: "التصميم" },
        { label: "التصنيع" },
        { label: "التركيب" },
        { label: "التخزين" },
      ],
    },
    rights: "جميع الحقوق محفوظة.",
    bottomLinks: [
      { label: "الخصوصية", href: "/privacy" },
      { label: "الشروط", href: "/terms" },
      { label: "ملفات تعريف الارتباط", href: "/cookies" },
    ],
  };
}

export function getFooterLocal(locale: Locale): FooterConfig {
  return locale === "ar" ? footerAr() : footerEn();
}
