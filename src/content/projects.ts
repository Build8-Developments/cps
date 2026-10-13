import { cloudinaryProjects } from "@/content/cloudinary-projects";
import { media } from "@/content/media";

export type Project = {
  projectCode?: string;
  cloudinaryFolder?: string;
  slug: string;
  year: string;
  image: string;
  imageAlt: string;
  imageAltAr?: string;
  gallery: string[];
  motionVideo?: string;
  industrySlug?: string;
  serviceSlug?: string;
  serviceSlugs?: string[];
  boothTypeSlug?: string;
  locationSlug?: string;
  event?: string;
  eventAr?: string;
  size?: string;
  technologies?: string[];
  featured?: boolean;
  clientName?: {
    en: string;
    ar: string;
  };
  en: {
    title: string;
    category: string;
    summary: string;
    scopeOfWork: string;
    challenge: string;
    approach: string;
    outcome: string;
  };
  ar: {
    title: string;
    category: string;
    summary: string;
    scopeOfWork: string;
    challenge: string;
    approach: string;
    outcome: string;
  };
};

export const demoProjects: Project[] = [
  {
    slug: "northline",
    year: "2025",
    industrySlug: "technology-electronics",
    serviceSlug: "exhibitions-booths",
    serviceSlugs: [
      "exhibitions-booths",
      "custom-fabrication",
      "printing-signage",
      "installation-project-delivery",
    ],
    boothTypeSlug: "custom",
    locationSlug: "riyadh",
    event: "LEAP",
    size: "120 sqm",
    technologies: ["Custom structure", "Integrated AV"],
    featured: true,
    image: media.projects.northline.hero,
    imageAlt: "Custom technology exhibition booth on the show floor",
    gallery: [...media.projects.northline.gallery],
    en: {
      title: "Northline",
      category: "Technology",
      summary: "A flagship custom booth for a mobility platform expanding across the Gulf.",
      scopeOfWork: "Booth design, fabrication, environmental graphics, integrated AV and on-site installation.",
      challenge:
        "Northline needed a show-floor presence that felt technical and human — clear for demos, bold enough to stop traffic.",
      approach:
        "We designed a custom structure with integrated AV, clear visitor flow, and a modular graphic system for multi-show reuse.",
      outcome:
        "A high-impact booth program now redeployed across regional technology events.",
    },
    ar: {
      title: "نورثلاين",
      category: "التقنية",
      summary: "جناح رئيسي مصمّم حسب الطلب لمنصة تنقّل تتوسع في دول الخليج.",
      scopeOfWork: "تصميم الجناح وتصنيعه، والرسومات البيئية، ودمج الأنظمة السمعية والبصرية (AV)، والتركيب في الموقع.",
      challenge:
        "أرادت نورثلاين حضوراً في المعرض يجمع بين الطابع التقني واللمسة الإنسانية: مساحة واضحة لعروض المنتج، وتصميم لافت يستوقف الزوار من بعيد.",
      approach:
        "صمّمنا هيكلاً خاصاً تتكامل فيه الشاشات والصوتيات، ومسار حركة واضحاً للزوار، ونظاماً رسومياً معيارياً يمكن إعادة استخدامه في أكثر من معرض.",
      outcome: "جناح ترك أثراً واضحاً، ويُعاد تركيبه اليوم في فعاليات تقنية أخرى في المنطقة.",
    },
  },
  {
    slug: "aether-labs",
    year: "2025",
    industrySlug: "healthcare-pharmaceutical",
    serviceSlug: "exhibitions-booths",
    serviceSlugs: [
      "exhibitions-booths",
      "custom-fabrication",
      "printing-signage",
      "rental-solutions",
      "installation-project-delivery",
    ],
    boothTypeSlug: "modular",
    locationSlug: "jeddah",
    event: "Arab Health",
    size: "64 sqm",
    technologies: ["Modular system", "Demo stations"],
    featured: true,
    image: media.projects.aetherLabs.hero,
    imageAlt: "Healthcare exhibition environment with clean clinical presence",
    gallery: [...media.projects.aetherLabs.gallery],
    en: {
      title: "Aether Labs",
      category: "Healthcare",
      summary: "A calm modular booth for clinical demos and private conversations.",
      scopeOfWork: "Modular build, demo stations, hospitality area, brand graphics and installation.",
      challenge:
        "Complex offerings were hard to present. The booth needed trust, clarity, and quiet meeting space.",
      approach:
        "We used a modular system with defined demo zones, soft hospitality areas, and precise brand graphics.",
      outcome:
        "Cleaner visitor journeys and a reusable kit for the healthcare calendar.",
    },
    ar: {
      title: "أثير لابز",
      category: "الرعاية الصحية",
      summary: "جناح معياري بأجواء هادئة للعروض السريرية والاجتماعات الخاصة.",
      scopeOfWork: "تنفيذ جناح معياري، ومحطات عرض، ومنطقة ضيافة، ورسومات بهوية العلامة، والتركيب.",
      challenge:
        "كان من الصعب شرح حلول الشركة المعقدة للزوار، لذا احتاج الجناح إلى أن يبعث على الثقة، وأن يقدّم المعلومة بوضوح، ويوفر مساحة هادئة للاجتماعات.",
      approach:
        "اعتمدنا نظاماً معيارياً قسّمنا فيه الجناح إلى مناطق عرض محددة، وجلسات ضيافة مريحة، مع رسومات دقيقة تعكس هوية العلامة.",
      outcome: "تجربة أوضح للزوار، وجناح قابل لإعادة التركيب في معارض الرعاية الصحية طوال العام.",
    },
  },
  {
    slug: "qamar",
    year: "2024",
    industrySlug: "fmcg",
    serviceSlug: "retail-displays",
    serviceSlugs: [
      "retail-displays",
      "custom-fabrication",
      "printing-signage",
      "installation-project-delivery",
    ],
    boothTypeSlug: "kiosks",
    locationSlug: "dammam",
    event: "Hospitality Qatar",
    size: "36 sqm",
    technologies: ["Kiosk system", "Print graphics"],
    image: media.projects.qamar.hero,
    imageAlt: "Branded retail exhibition kiosk with premium lighting",
    gallery: [...media.projects.qamar.gallery],
    en: {
      title: "Qamar",
      category: "FMCG",
      summary: "A high-energy kiosk program for sampling and brand immersion.",
      scopeOfWork: "Kiosk fabrication, sampling counter, large-format graphics and rapid installation.",
      challenge:
        "The brand needed attraction and throughput in a dense hospitality hall.",
      approach:
        "Compact kiosk architecture, large-format graphics, and a sampling counter designed for flow.",
      outcome:
        "Strong stop-rate and a portable kit ready for the next regional date.",
    },
    ar: {
      title: "قمر",
      category: "السلع الاستهلاكية",
      summary: "أكشاك حيوية لتوزيع العينات وتعريف الزوار بالعلامة عن قرب.",
      scopeOfWork: "تصنيع الكشك، وطاولة توزيع العينات، والطباعة كبيرة الحجم، والتركيب السريع.",
      challenge: "في قاعة ضيافة مزدحمة، احتاجت قمر إلى جذب الزوار وخدمة أعداد كبيرة منهم دون تكدّس.",
      approach:
        "صمّمنا كشكاً مدمجاً برسومات كبيرة الحجم تلفت الانتباه، وطاولة عينات تتيح حركة سلسة للزوار.",
      outcome: "توقّفت نسبة عالية من المارّة عند الكشك، وأصبحت لدى العلامة وحدة قابلة للنقل جاهزة لمحطتها التالية في المنطقة.",
    },
  },
  {
    slug: "harbor-co",
    year: "2024",
    industrySlug: "technology-electronics",
    serviceSlug: "exhibitions-booths",
    serviceSlugs: [
      "exhibitions-booths",
      "event-fabrication",
      "custom-fabrication",
      "rental-solutions",
      "installation-project-delivery",
    ],
    boothTypeSlug: "double-deck",
    locationSlug: "riyadh",
    event: "Saudi Energy",
    size: "200 sqm",
    technologies: ["Double-deck", "Meeting suites"],
    image: media.projects.harborCo.hero,
    imageAlt: "Large-scale energy pavilion with architectural presence",
    gallery: [...media.projects.harborCo.gallery],
    en: {
      title: "Harbor & Co.",
      category: "Technology",
      summary: "A double-deck pavilion for technical storytelling and VIP hospitality.",
      scopeOfWork: "Double-deck structure, meeting suites, demo zones, environmental branding and delivery.",
      challenge:
        "A large footprint needed architectural confidence without losing clarity.",
      approach:
        "Two-level structure with upper meeting suites, ground-floor demos, and bold environmental branding.",
      outcome:
        "A landmark presence that hosted clients, media, and technical walkthroughs.",
    },
    ar: {
      title: "هاربر آند كو",
      category: "التقنية",
      summary: "جناح بطابقين لعرض القصة التقنية واستضافة كبار الضيوف.",
      scopeOfWork: "هيكل بطابقين، وغرف اجتماعات، ومناطق عرض، وهوية بصرية للمساحة، وإدارة التنفيذ حتى التسليم.",
      challenge: "مساحة كبيرة تحتاج إلى حضور معماري قوي، دون أن تفقد وضوحها أمام الزائر.",
      approach:
        "وزّعنا الجناح على طابقين: غرف الاجتماعات في الطابق العلوي، والعروض التقنية في الطابق الأرضي، مع هوية بصرية جريئة تغطي المساحة.",
      outcome: "حضور بارز في المعرض استقبل العملاء ووسائل الإعلام والجولات التقنية.",
    },
  },
  {
    slug: "pulse-retail",
    year: "2024",
    industrySlug: "fmcg",
    serviceSlug: "retail-displays",
    serviceSlugs: [
      "retail-displays",
      "printing-signage",
      "rental-solutions",
      "installation-project-delivery",
    ],
    boothTypeSlug: "portable",
    locationSlug: "khobar",
    event: "Cairo Retail Week",
    size: "24 sqm",
    technologies: ["Portable kit", "Lightbox"],
    image: media.projects.pulseRetail.hero,
    imageAlt: "Premium retail display with illuminated branding",
    gallery: [...media.projects.pulseRetail.gallery],
    en: {
      title: "Pulse Retail",
      category: "Retail",
      summary: "A portable lightbox-led display system for fast retail activations.",
      scopeOfWork: "Portable display system, illuminated graphics, transport kit and repeat installation.",
      challenge:
        "Weekly activations needed consistency without a full custom rebuild each time.",
      approach:
        "Lightweight structure, illuminated graphics, and a kit that ships and installs quickly.",
      outcome:
        "Faster redeploy and tighter brand recognition across the retail calendar.",
    },
    ar: {
      title: "بولس ريتيل",
      category: "التجزئة",
      summary: "نظام عرض متنقل بصناديق مضيئة لتفعيلات سريعة في المتاجر.",
      scopeOfWork: "نظام عرض متنقل، ورسومات مضيئة، وحقائب نقل، وتركيب متكرر.",
      challenge:
        "كانت التفعيلات تتكرر أسبوعياً، والمطلوب مظهر ثابت في كل موقع دون تصنيع جديد في كل مرة.",
      approach:
        "صمّمنا هيكلاً خفيفاً برسومات مضيئة، ضمن وحدة متكاملة تُشحن وتُركَّب في وقت قصير.",
      outcome: "تركيب أسرع في كل موقع، وحضور أوضح للعلامة طوال موسم التفعيلات.",
    },
  },
];

/** Production portfolio sourced from the CPS Cloudinary media library. */
export const projects: Project[] = cloudinaryProjects;
export const legacyDemoProjectSlugs = new Set(
  demoProjects.map((project) => project.slug),
);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getLocalizedProject(project: Project, locale: "en" | "ar") {
  return {
    slug: project.slug,
    year: project.year,
    image: project.image,
    imageAlt: (locale === "ar" && project.imageAltAr) || project.imageAlt,
    event: (locale === "ar" && project.eventAr) || project.event,
    gallery: project.gallery,
    clientName: project.clientName?.[locale],
    ...project[locale],
  };
}
