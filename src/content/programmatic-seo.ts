import {
  boothTypes,
  formatBoothTypeTitle,
  getBoothType,
  getLocation,
  getService,
  localizeBoothType,
  localizeLocation,
  localizeService,
  locations,
  services,
} from "@/content/catalog";
import {
  getServiceArchitecture,
  localizeText,
  serviceArchitecture,
} from "@/content/service-architecture";
import type { Locale } from "@/lib/i18n";

export type ProgrammaticKind = "service" | "boothType";

export type ProgrammaticPageData = {
  kind: ProgrammaticKind;
  locationSlug: string;
  entitySlug: string;
  locationTitle: string;
  entityTitle: string;
  countryCode: string;
  path: string;
  title: string;
  lead: string;
  overview: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  highlights: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedServices: { slug: string; title: string; href: string }[];
  relatedBoothTypes: { slug: string; title: string; href: string }[];
  otherLocations: { slug: string; title: string; href: string }[];
};

function servicePath(locationSlug: string, serviceSlug: string) {
  return `/locations/${locationSlug}/services/${serviceSlug}`;
}

function boothTypePath(locationSlug: string, boothTypeSlug: string) {
  return `/locations/${locationSlug}/booth-types/${boothTypeSlug}`;
}

export function getAllProgrammaticServiceParams() {
  return locations.flatMap((location) =>
    serviceArchitecture.map((service) => ({
      slug: location.slug,
      serviceSlug: service.slug,
    })),
  );
}

export function getAllProgrammaticBoothTypeParams() {
  return locations.flatMap((location) =>
    boothTypes.map((boothType) => ({
      slug: location.slug,
      boothTypeSlug: boothType.slug,
    })),
  );
}

/** CMS-first static params (falls back inside loaders when Sanity is empty). */
export async function getAllProgrammaticServiceParamsAsync() {
  const { loadLocations, loadServices } = await import(
    "@/sanity/load-collections"
  );
  const [cmsLocations, cmsServices] = await Promise.all([
    loadLocations("en"),
    loadServices("en"),
  ]);
  return cmsLocations.flatMap((location) =>
    cmsServices.map((service) => ({
      slug: location.slug,
      serviceSlug: service.slug,
    })),
  );
}

export async function getAllProgrammaticBoothTypeParamsAsync() {
  const { loadLocations, loadBoothTypes } = await import(
    "@/sanity/load-collections"
  );
  const [cmsLocations, cmsBoothTypes] = await Promise.all([
    loadLocations("en"),
    loadBoothTypes("en"),
  ]);
  return cmsLocations.flatMap((location) =>
    cmsBoothTypes.map((boothType) => ({
      slug: location.slug,
      boothTypeSlug: boothType.slug,
    })),
  );
}

export function buildServiceLocationPage(
  locale: Locale,
  locationSlug: string,
  serviceSlug: string,
): ProgrammaticPageData | null {
  const locationRecord = getLocation(locationSlug);
  const serviceRecord = getServiceArchitecture(serviceSlug);
  if (!locationRecord || !serviceRecord) return null;

  const location = localizeLocation(locationRecord, locale);
  const isArabic = locale === "ar";
  const serviceTitle = localizeText(serviceRecord.title, locale);
  const serviceSupport = localizeText(serviceRecord.hero.support, locale);

  const title = isArabic
    ? `${serviceTitle} في ${location.title}`
    : `${serviceTitle} in ${location.title}`;

  const lead = isArabic
    ? `${serviceSupport} ننفّذ ذلك في ${location.title} بفريق CPS، من التصميم حتى التركيب.`
    : `${serviceSupport} Available in ${location.title}, designed, built, and delivered by CPS.`;

  const overview = isArabic
    ? `${localizeText(serviceRecord.excerpt, locale)} نقدّم هذه الخدمة في ${location.title} مع تنسيق محلي للخدمات اللوجستية والموقع ومواعيد التركيب. ${location.localExperience}`
    : `${localizeText(serviceRecord.excerpt, locale)} We deliver this service in ${location.title} with local logistics, venue coordination, and install planning. ${location.localExperience}`;

  const firstBenefit = serviceRecord.benefits[0]
    ? localizeText(serviceRecord.benefits[0], locale)
    : "";

  const highlights = [
    {
      title: isArabic ? "تنفيذ محلي" : "Local delivery",
      description: isArabic
        ? `فرق عمل وتنسيق ميداني في ${location.title} للالتزام بمواعيد التركيب والجاهزية يوم الافتتاح.`
        : `Crews and coordination in ${location.title} to protect install windows and show-day readiness.`,
    },
    {
      title: isArabic ? "معايير CPS" : "CPS standards",
      description: isArabic
        ? "جودة التصميم والتصنيع نفسها في جميع مدن المملكة."
        : "The same design and fabrication quality across Saudi cities.",
    },
    ...(firstBenefit
      ? [
          {
            title: firstBenefit,
            description: serviceSupport,
          },
        ]
      : []),
  ];

  const faqs = [
    {
      question: isArabic
        ? `هل تقدّمون خدمات ${serviceTitle} في ${location.title}؟`
        : `Do you offer ${serviceTitle} in ${location.title}?`,
      answer: isArabic
        ? `نعم، تنفّذ CPS خدمات ${serviceTitle} في ${location.title}، مع تخطيط لوجستي ودعم للتركيب في الموقع.`
        : `Yes. CPS delivers ${serviceTitle} in ${location.title} with logistics planning and on-site install support.`,
    },
    {
      question: isArabic
        ? "ما المدة المعتادة من استلام متطلبات المشروع حتى التسليم؟"
        : "What is a typical timeline from brief to delivery?",
      answer: isArabic
        ? "تعتمد على حجم المشروع وموعد المعرض أو الفعالية، ونحدد منذ اليوم الأول مراحل واضحة للتصميم والتصنيع والتركيب."
        : "It depends on footprint and the show calendar. We lock clear stages for design, fabrication, and install from day one.",
    },
    ...(serviceRecord.faq[0]
      ? [{
          question: localizeText(serviceRecord.faq[0].question, locale),
          answer: localizeText(serviceRecord.faq[0].answer, locale),
        }]
      : []),
  ];

  return {
    kind: "service",
    locationSlug,
    entitySlug: serviceSlug,
    locationTitle: location.title,
    entityTitle: serviceTitle,
    countryCode: location.countryCode,
    path: servicePath(locationSlug, serviceSlug),
    title,
    lead,
    overview,
    image: serviceRecord.image || location.image,
    imageAlt: `${serviceTitle} in ${location.title}`,
    keywords: isArabic
      ? [
          serviceTitle,
          location.title,
          `أجنحة معارض ${location.title}`,
          `${serviceTitle} ${location.title}`,
          "CPS",
        ]
      : [
          serviceTitle,
          location.title,
          `exhibition booths ${location.title}`,
          `${serviceTitle} ${location.title}`,
          "CPS",
        ],
    highlights,
    faqs,
    relatedServices: serviceArchitecture
      .filter((item) => item.slug !== serviceSlug)
      .slice(0, 4)
      .map((item) => {
        return {
          slug: item.slug,
          title: localizeText(item.title, locale),
          href: servicePath(locationSlug, item.slug),
        };
      }),
    relatedBoothTypes: boothTypes.slice(0, 4).map((item) => {
      const localized = localizeBoothType(item, locale);
      return {
        slug: item.slug,
        title: formatBoothTypeTitle(localized.title),
        href: boothTypePath(locationSlug, item.slug),
      };
    }),
    otherLocations: locations
      .filter((item) => item.slug !== locationSlug)
      .slice(0, 6)
      .map((item) => {
        const localized = localizeLocation(item, locale);
        return {
          slug: item.slug,
          title: localized.title,
          href: servicePath(item.slug, serviceSlug),
        };
      }),
  };
}

export function buildBoothTypeLocationPage(
  locale: Locale,
  locationSlug: string,
  boothTypeSlug: string,
): ProgrammaticPageData | null {
  const locationRecord = getLocation(locationSlug);
  const boothTypeRecord = getBoothType(boothTypeSlug);
  if (!locationRecord || !boothTypeRecord) return null;

  const location = localizeLocation(locationRecord, locale);
  const boothType = localizeBoothType(boothTypeRecord, locale);
  const isArabic = locale === "ar";
  const boothTitle = formatBoothTypeTitle(boothType.title, location.title);

  const title = boothType.title.includes("{City}")
    ? boothTitle
    : isArabic
      ? `${boothTitle} في ${location.title}`
      : `${boothTitle} in ${location.title}`;

  const lead = boothType.excerpt
    ? boothType.excerpt
    : isArabic
      ? `${boothTitle} لمعارض ${location.title}، بتصميم يراعي مساحتك وهوية علامتك وموعد المعرض.`
      : `${boothTitle} for shows in ${location.title} — built around footprint, brand, and the event calendar.`;

  const overview = isArabic
    ? `${boothType.description} ننفّذ هذا النوع من الأجنحة في ${location.title} مع التنسيق مع إدارات المعارض، وفرق التركيب، والدعم اللوجستي. ${location.localExperience}`
    : `${boothType.description} We deliver this format in ${location.title} with venue coordination, install crews, and logistics support. ${location.localExperience}`;

  const highlights = [
    {
      title: isArabic ? "خبرة بالسوق المحلي" : "Local market fit",
      description: isArabic
        ? `تصميم وتنفيذ يراعيان اشتراطات المعارض في ${location.title}.`
        : `Design and delivery tuned to exhibition requirements in ${location.title}.`,
    },
    ...(boothType.advantages[0]
      ? [
          {
            title: boothType.advantages[0].title,
            description: boothType.advantages[0].description,
          },
        ]
      : []),
    {
      title: isArabic ? "من الفكرة إلى التركيب" : "From concept to install",
      description: isArabic
        ? "فريق واحد مسؤول عن التصميم والتصنيع والتنفيذ في الموقع."
        : "One team owns design, fabrication, and on-site execution.",
    },
  ];

  const faqs = [
    {
      question: isArabic
        ? `هل يمكن تنفيذ ${boothTitle} في ${location.title}؟`
        : `Can you build ${boothTitle} in ${location.title}?`,
      answer: isArabic
        ? `نعم، تنفّذ CPS ${boothTitle} في ${location.title}، ونخطط للدخول والتركيب وفق أنظمة موقع المعرض.`
        : `Yes. CPS builds ${boothTitle} in ${location.title}, planning access and install around venue rules.`,
    },
    {
      question: isArabic
        ? "هل يصلح هذا النوع لأكثر من معرض؟"
        : "Is this format suitable for multiple shows?",
      answer: isArabic
        ? boothType.useCases.length
          ? `نعم، ويُستخدم عادةً في: ${boothType.useCases.join("، ")}.`
          : "نعم، بحسب المساحة وأهداف علامتك."
        : boothType.useCases.length
          ? `Yes — commonly used for: ${boothType.useCases.join(", ")}.`
          : "Yes, depending on footprint and brand goals.",
    },
  ];

  return {
    kind: "boothType",
    locationSlug,
    entitySlug: boothTypeSlug,
    locationTitle: location.title,
    entityTitle: boothTitle,
    countryCode: location.countryCode,
    path: boothTypePath(locationSlug, boothTypeSlug),
    title,
    lead,
    overview,
    image: boothType.image || location.image,
    imageAlt: boothType.imageAlt || location.imageAlt,
    keywords: isArabic
      ? [
          boothTitle,
          location.title,
          `أجنحة ${location.title}`,
          `${boothTitle} ${location.title}`,
          "CPS",
        ]
      : [
          boothTitle,
          location.title,
          `exhibition booths ${location.title}`,
          `${boothTitle} ${location.title}`,
          "CPS",
        ],
    highlights,
    faqs,
    relatedServices: services.slice(0, 4).map((item) => {
      const localized = localizeService(item, locale);
      return {
        slug: item.slug,
        title: localized.title,
        href: servicePath(locationSlug, item.slug),
      };
    }),
    relatedBoothTypes: boothTypes
      .filter((item) => item.slug !== boothTypeSlug)
      .slice(0, 4)
      .map((item) => {
        const localized = localizeBoothType(item, locale);
        return {
          slug: item.slug,
          title: formatBoothTypeTitle(localized.title),
          href: boothTypePath(locationSlug, item.slug),
        };
      }),
    otherLocations: locations
      .filter((item) => item.slug !== locationSlug)
      .slice(0, 6)
      .map((item) => {
        const localized = localizeLocation(item, locale);
        return {
          slug: item.slug,
          title: localized.title,
          href: boothTypePath(item.slug, boothTypeSlug),
        };
      }),
  };
}
