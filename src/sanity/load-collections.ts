import { getBoothComparisonRow } from "@/content/booth-comparison";
import { getDictionaryLocal } from "@/content/dictionaries.local";
import {
  getServiceArchitecture,
  localizeText,
} from "@/content/service-architecture";
import {
  boothTypes,
  getBoothType,
  getIndustry,
  getLocation,
  getNewsArticle,
  getService,
  industries,
  localizeBoothType,
  localizeIndustry,
  localizeLocation,
  localizeNews,
  localizeService,
  locations,
  newsArticles,
  services,
} from "@/content/catalog";
import {
  getLocalizedProject,
  getProject,
  legacyDemoProjectSlugs,
  projects as localProjects,
  type Project,
} from "@/content/projects";
import type { Locale } from "@/lib/i18n";
import { sanityFetch } from "@/sanity/fetch";
import type { ClientLogo } from "@/content/clients";
import { clientLogos } from "@/content/clients";
import {
  BOOTH_TYPE_BY_SLUG_QUERY,
  BOOTH_TYPES_QUERY,
  CLIENTS_QUERY,
  INDUSTRIES_QUERY,
  INDUSTRY_BY_SLUG_QUERY,
  LOCATION_BY_SLUG_QUERY,
  LOCATIONS_QUERY,
  NAVIGATION_QUERY,
  NEWS_BY_SLUG_QUERY,
  NEWS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECTS_QUERY,
  REDIRECTS_QUERY,
  SERVICE_BY_SLUG_QUERY,
  SERVICE_LOCATION_VARIANT_QUERY,
  SERVICES_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/queries/collections";
import {
  mapBoothType,
  mapIndustry,
  mapLocation,
  mapNewsArticle,
  mapProject,
  mapService,
  mapServiceLocation,
  type CmsBoothType,
  type CmsIndustry,
  type CmsLocation,
  type CmsNewsArticle,
  type CmsProject,
  type CmsService,
  type CmsServiceLocation,
} from "@/sanity/transformers/collections";
import { sanitizeText, toImageSrc } from "@/sanity/transformers/shared";
import { mergeProjectFallback } from "@/sanity/transformers/project-fallback";

function localService(slug: string, locale: Locale): CmsService | null {
  const canonical = getServiceArchitecture(slug);
  if (canonical) {
    return {
      slug: canonical.slug,
      title: localizeText(canonical.title, locale),
      excerpt: localizeText(canonical.excerpt, locale),
      blueprintVersion: 5,
      overview: localizeText(canonical.hero.support, locale),
      overviewTitle: localizeText(canonical.hero.headline, locale),
      overviewBullets: canonical.hero.bullets.map((item) => ({
        title: localizeText(item, locale),
        description: "",
      })),
      heroLead: localizeText(canonical.hero.support, locale),
      image: canonical.image,
      imageAlt: localizeText(canonical.title, locale),
      designs: {
        title: localizeText(canonical.showcase.title, locale),
        support: localizeText(canonical.catalogue.support, locale),
        cta: {
          label: localizeText(canonical.hero.catalogueCta, locale),
          href: `/services/${canonical.slug}/catalogue`,
        },
        items: canonical.showcase.items.map((item) => ({
          title: localizeText(item.title, locale),
          description: localizeText(item.description, locale),
          image: canonical.image,
          imageAlt: localizeText(item.title, locale),
        })),
      },
      why: {
        title: localizeText(canonical.why.headline, locale),
        support: localizeText(canonical.why.support, locale),
        items: canonical.why.items.map((item) => ({
          title: localizeText(item, locale),
          description: "",
        })),
      },
      benefits: canonical.benefits.map((item) => ({
        title: localizeText(item, locale),
        description: "",
      })),
      process: [],
      faq: canonical.faq.map((item) => ({
        question: localizeText(item.question, locale),
        answer: localizeText(item.answer, locale),
      })),
    };
  }

  const record = getService(slug);
  if (!record) return null;
  const localized = localizeService(record, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    overview: localized.overview,
    overviewTitle: localized.overviewTitle,
    overviewBullets: localized.overviewBullets,
    order: record.order,
    image: localized.image,
    imageAlt: localized.imageAlt,
    heroLead: localized.heroLead,
    secondaryCta: localized.secondaryCta,
    cover: localized.cover,
    designs: localized.designs,
    why: localized.why,
    benefits: localized.benefits,
    process: localized.process,
    faq: localized.faq,
  };
}

function localBoothType(slug: string, locale: Locale): CmsBoothType | null {
  const record = getBoothType(slug);
  if (!record) return null;
  const localized = localizeBoothType(record, locale);
  const compare = getBoothComparisonRow(slug);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    overviewTitle: localized.overviewTitle,
    description: localized.description,
    order: record.order,
    image: localized.image,
    imageAlt: localized.imageAlt,
    model3d: record.model3d,
    features: localized.features,
    advantages: localized.advantages,
    useCases: localized.useCases,
    faq: localized.faq,
    gallery: [{ src: localized.image, alt: localized.imageAlt }],
    compareLabel: compare
      ? locale === "ar"
        ? compare.label.ar
        : compare.label.en
      : undefined,
    indoor: compare?.indoor,
    outdoor: compare?.outdoor,
    reusable: compare?.reusable,
    highCustomization: compare?.highCustomization,
    fastSetup: compare?.fastSetup,
  };
}

function localProject(project: Project, locale: Locale): CmsProject {
  const localized = getLocalizedProject(project, locale);
  return {
    projectCode: project.projectCode,
    cloudinaryFolder: project.cloudinaryFolder,
    slug: localized.slug,
    title: sanitizeText(localized.title),
    year: sanitizeText(localized.year),
    summary: sanitizeText(localized.summary),
    scopeOfWork: sanitizeText(localized.scopeOfWork),
    challenge: sanitizeText(localized.challenge),
    solution: sanitizeText(localized.approach),
    result: sanitizeText(localized.outcome),
    image: localized.image,
    imageAlt: sanitizeText(localized.imageAlt),
    gallery: localized.gallery,
    motionVideo: project.motionVideo,
    technologies: project.technologies ?? [],
    event: sanitizeText(project.event),
    size: project.size,
    industrySlug: project.industrySlug,
    serviceSlug: project.serviceSlug,
    serviceSlugs: project.serviceSlugs ?? (project.serviceSlug ? [project.serviceSlug] : []),
    boothTypeSlug: project.boothTypeSlug,
    locationSlug: project.locationSlug,
    category: sanitizeText(localized.category),
    clientName: sanitizeText(localized.clientName) || sanitizeText(localized.title),
    featured: project.featured,
  };
}

export async function loadServices(locale: Locale): Promise<CmsService[]> {
  const remote = await sanityFetch<unknown[]>({
    query: SERVICES_QUERY,
    params: { locale },
    tags: ["service", `service-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapService(doc as Parameters<typeof mapService>[0]))
    .filter((item): item is CmsService => Boolean(item));

  if (mapped.length) return mapped;

  return services.map((item) => localService(item.slug, locale)!);
}

export async function loadService(
  locale: Locale,
  slug: string,
): Promise<CmsService | null> {
  const remote = await sanityFetch<unknown>({
    query: SERVICE_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["service", `service-${locale}`, `service-${slug}`],
  });

  const mapped = mapService(remote as Parameters<typeof mapService>[0]);
  if (mapped) {
    const local = localService(slug, locale);
    if (!local) return mapped;
    const remoteProcessBare =
      mapped.process.length > 0 && mapped.process.every((step) => !step.image);
    const localProcessRich = local.process.some((step) => step.image);
    return {
      ...mapped,
      cover: mapped.cover ?? local.cover,
      designs: mapped.designs ?? local.designs,
      why: mapped.why ?? local.why,
      heroLead: mapped.heroLead ?? local.heroLead,
      secondaryCta: mapped.secondaryCta ?? local.secondaryCta,
      overviewTitle: mapped.overviewTitle ?? local.overviewTitle,
      overviewBullets: mapped.overviewBullets ?? local.overviewBullets,
      faq: mapped.faq.length ? mapped.faq : local.faq,
      process:
        remoteProcessBare && localProcessRich ? local.process : mapped.process,
    };
  }
  return localService(slug, locale);
}

export async function loadServiceLocationVariant(
  locale: Locale,
  locationSlug: string,
  serviceSlug: string,
): Promise<CmsServiceLocation | null> {
  const remote = await sanityFetch<unknown>({
    query: SERVICE_LOCATION_VARIANT_QUERY,
    params: { locale, locationSlug, serviceSlug },
    tags: [
      "serviceLocation",
      `serviceLocation-${locale}`,
      `serviceLocation-${locationSlug}-${serviceSlug}`,
    ],
  });

  return mapServiceLocation(
    remote as Parameters<typeof mapServiceLocation>[0],
  );
}

export async function loadBoothTypes(locale: Locale): Promise<CmsBoothType[]> {
  const remote = await sanityFetch<unknown[]>({
    query: BOOTH_TYPES_QUERY,
    params: { locale },
    tags: ["boothType", `boothType-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapBoothType(doc as Parameters<typeof mapBoothType>[0]))
    .filter((item): item is CmsBoothType => Boolean(item));

  if (mapped.length) {
    return mapped.map((item) => {
      const fallback = getBoothComparisonRow(item.slug);
      const local = localBoothType(item.slug, locale);
      return {
        ...item,
        image: item.image || local?.image || "",
        imageAlt: item.imageAlt || local?.imageAlt || item.title,
        model3d: item.model3d || local?.model3d,
        gallery: item.gallery.length ? item.gallery : (local?.gallery ?? []),
        compareLabel:
          item.compareLabel ||
          (fallback
            ? locale === "ar"
              ? fallback.label.ar
              : fallback.label.en
            : undefined),
        indoor: item.indoor ?? fallback?.indoor,
        outdoor: item.outdoor ?? fallback?.outdoor,
        reusable: item.reusable ?? fallback?.reusable,
        highCustomization:
          item.highCustomization ?? fallback?.highCustomization,
        fastSetup: item.fastSetup ?? fallback?.fastSetup,
      };
    });
  }
  return boothTypes.map((item) => localBoothType(item.slug, locale)!);
}

export async function loadBoothType(
  locale: Locale,
  slug: string,
): Promise<CmsBoothType | null> {
  const remote = await sanityFetch<unknown>({
    query: BOOTH_TYPE_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["boothType", `boothType-${locale}`, `boothType-${slug}`],
  });

  const mapped = mapBoothType(remote as Parameters<typeof mapBoothType>[0]);
  if (mapped) {
    const local = localBoothType(slug, locale);
    const compare = getBoothComparisonRow(slug);
    return {
      ...mapped,
      image: mapped.image || local?.image || "",
      imageAlt: mapped.imageAlt || local?.imageAlt || mapped.title,
      model3d: mapped.model3d || local?.model3d,
      gallery: mapped.gallery.length ? mapped.gallery : (local?.gallery ?? []),
      compareLabel:
        mapped.compareLabel ||
        local?.compareLabel ||
        (compare
          ? locale === "ar"
            ? compare.label.ar
            : compare.label.en
          : undefined),
      indoor: mapped.indoor ?? local?.indoor ?? compare?.indoor,
      outdoor: mapped.outdoor ?? local?.outdoor ?? compare?.outdoor,
      reusable: mapped.reusable ?? local?.reusable ?? compare?.reusable,
      highCustomization:
        mapped.highCustomization ??
        local?.highCustomization ??
        compare?.highCustomization,
      fastSetup: mapped.fastSetup ?? local?.fastSetup ?? compare?.fastSetup,
    };
  }
  return localBoothType(slug, locale);
}

export async function loadProjects(locale: Locale): Promise<CmsProject[]> {
  const remote = await sanityFetch<unknown[]>({
    query: PROJECTS_QUERY,
    params: { locale },
    tags: ["project", `project-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapProject(doc as Parameters<typeof mapProject>[0]))
    .filter((item): item is CmsProject => Boolean(item))
    .filter(
      (item) =>
        !legacyDemoProjectSlugs.has(item.slug) ||
        Boolean(item.projectCode || item.cloudinaryFolder),
    );

  if (mapped.length) {
    const merged = mapped.map((item) => {
      const project = getProject(item.slug);
      const local = project ? localProject(project, locale) : null;
      return mergeProjectFallback(item, local);
    });
    const remoteSlugs = new Set(merged.map((item) => item.slug));
    const localOnly = localProjects
      .filter((item) => !remoteSlugs.has(item.slug))
      .map((item) => localProject(item, locale));
    return [...merged, ...localOnly];
  }
  return localProjects.map((item) => localProject(item, locale));
}

export async function loadProject(
  locale: Locale,
  slug: string,
): Promise<CmsProject | null> {
  const remote = await sanityFetch<unknown>({
    query: PROJECT_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["project", `project-${locale}`, `project-${slug}`],
  });

  const mapped = mapProject(remote as Parameters<typeof mapProject>[0]);
  const project = getProject(slug);
  const isLegacyDemo =
    Boolean(mapped) &&
    legacyDemoProjectSlugs.has(slug) &&
    !mapped?.projectCode &&
    !mapped?.cloudinaryFolder;
  if (isLegacyDemo) return null;
  if (mapped) {
    const local = project ? localProject(project, locale) : null;
    return mergeProjectFallback(mapped, local);
  }

  return project ? localProject(project, locale) : null;
}

export async function loadIndustries(locale: Locale): Promise<CmsIndustry[]> {
  const remote = await sanityFetch<unknown[]>({
    query: INDUSTRIES_QUERY,
    params: { locale },
    tags: ["industry", `industry-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapIndustry(doc as Parameters<typeof mapIndustry>[0]))
    .filter((item): item is CmsIndustry => Boolean(item));

  if (mapped.length) {
    return mapped.map((item) => {
      const record = getIndustry(item.slug);
      const local = record ? localizeIndustry(record, locale) : null;
      return {
        ...item,
        image: item.image || local?.image || "",
        imageAlt: item.imageAlt || local?.imageAlt || item.title,
      };
    });
  }

  return industries.map((item) => {
    const localized = localizeIndustry(item, locale);
    return {
      slug: localized.slug,
      title: localized.title,
      excerpt: localized.excerpt,
      overview: localized.overview,
      order: item.order,
      image: localized.image,
      imageAlt: localized.imageAlt,
      challenges: localized.challenges,
      solutions: localized.solutions,
      recommendedBoothTypeSlugs: localized.recommendedBoothTypeSlugs,
    };
  });
}

export async function loadIndustry(
  locale: Locale,
  slug: string,
): Promise<CmsIndustry | null> {
  const remote = await sanityFetch<unknown>({
    query: INDUSTRY_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["industry", `industry-${locale}`, `industry-${slug}`],
  });

  const mapped = mapIndustry(remote as Parameters<typeof mapIndustry>[0]);
  const record = getIndustry(slug);
  if (mapped) {
    const local = record ? localizeIndustry(record, locale) : null;
    return {
      ...mapped,
      image: mapped.image || local?.image || "",
      imageAlt: mapped.imageAlt || local?.imageAlt || mapped.title,
    };
  }

  if (!record) return null;
  const localized = localizeIndustry(record, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    overview: localized.overview,
    order: record.order,
    image: localized.image,
    imageAlt: localized.imageAlt,
    challenges: localized.challenges,
    solutions: localized.solutions,
    recommendedBoothTypeSlugs: localized.recommendedBoothTypeSlugs,
  };
}

export async function loadLocations(locale: Locale): Promise<CmsLocation[]> {
  const remote = await sanityFetch<unknown[]>({
    query: LOCATIONS_QUERY,
    params: { locale },
    tags: ["location", `location-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapLocation(doc as Parameters<typeof mapLocation>[0]))
    .filter((item): item is CmsLocation => Boolean(item));

  const fromCms = mapped.map((item) => {
    const record = getLocation(item.slug);
    const local = record ? localizeLocation(record, locale) : null;
    return {
      ...item,
      image: item.image || local?.image || "",
      imageAlt: item.imageAlt || local?.imageAlt || item.title,
    };
  });

  // Local cities not yet seeded into Sanity still get pages, links and sitemap entries.
  const cmsSlugs = new Set(fromCms.map((item) => item.slug));
  const fromLocal = locations
    .filter((item) => !cmsSlugs.has(item.slug))
    .map((item) => {
      const localized = localizeLocation(item, locale);
      return {
        slug: localized.slug,
        title: localized.title,
        excerpt: localized.excerpt,
        localExperience: localized.localExperience,
        capabilities: localized.capabilities,
        countryCode: localized.countryCode,
        order: item.order,
        image: localized.image,
        imageAlt: localized.imageAlt,
      };
    });

  return [...fromCms, ...fromLocal];
}

export async function loadLocation(
  locale: Locale,
  slug: string,
): Promise<CmsLocation | null> {
  const remote = await sanityFetch<unknown>({
    query: LOCATION_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["location", `location-${locale}`, `location-${slug}`],
  });

  const mapped = mapLocation(remote as Parameters<typeof mapLocation>[0]);
  const record = getLocation(slug);
  if (mapped) {
    const local = record ? localizeLocation(record, locale) : null;
    return {
      ...mapped,
      image: mapped.image || local?.image || "",
      imageAlt: mapped.imageAlt || local?.imageAlt || mapped.title,
    };
  }

  if (!record) return null;
  const localized = localizeLocation(record, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    localExperience: localized.localExperience,
    capabilities: localized.capabilities,
    countryCode: localized.countryCode,
    order: record.order,
    image: localized.image,
    imageAlt: localized.imageAlt,
  };
}

export async function loadNews(locale: Locale): Promise<CmsNewsArticle[]> {
  const remote = await sanityFetch<unknown[]>({
    query: NEWS_QUERY,
    params: { locale },
    tags: ["newsArticle", `newsArticle-${locale}`],
  });

  const mapped = (remote ?? [])
    .map((doc) => mapNewsArticle(doc as Parameters<typeof mapNewsArticle>[0]))
    .filter((item): item is CmsNewsArticle => Boolean(item));

  if (mapped.length) return mapped;

  return newsArticles.map((item) => {
    const localized = localizeNews(item, locale);
    return {
      slug: localized.slug,
      title: localized.title,
      excerpt: localized.excerpt,
      image: localized.image,
      imageAlt: localized.imageAlt,
      publishedAt: localized.publishedAt,
      readingTime: localized.readingTime,
      category: localized.category,
      tags: localized.tags,
      author: localized.author,
      body: localized.body,
    };
  });
}

export async function loadNewsArticle(
  locale: Locale,
  slug: string,
): Promise<CmsNewsArticle | null> {
  const remote = await sanityFetch<unknown>({
    query: NEWS_BY_SLUG_QUERY,
    params: { locale, slug },
    tags: ["newsArticle", `newsArticle-${locale}`, `newsArticle-${slug}`],
  });

  const mapped = mapNewsArticle(remote as Parameters<typeof mapNewsArticle>[0]);
  const localRecord = getNewsArticle(slug);
  const local = localRecord ? localizeNews(localRecord, locale) : null;
  const withMediaFallback = mapped
    ? {
        ...mapped,
        image: mapped.image || local?.image || "",
        imageAlt: mapped.imageAlt || local?.imageAlt || mapped.title,
      }
    : null;
  if (withMediaFallback?.body?.length) return withMediaFallback;
  if (mapped && !mapped.body.length) {
    if (local) return { ...withMediaFallback!, body: local.body };
    return withMediaFallback;
  }

  const record = localRecord;
  if (!record) return null;
  const localized = localizeNews(record, locale);
  return {
    slug: localized.slug,
    title: localized.title,
    excerpt: localized.excerpt,
    image: localized.image,
    imageAlt: localized.imageAlt,
    publishedAt: localized.publishedAt,
    readingTime: localized.readingTime,
    category: localized.category,
    tags: localized.tags,
    author: localized.author,
    body: localized.body,
  };
}

export async function loadNavigation(locale: Locale) {
  return sanityFetch<{
    items?: unknown[];
    primary?: { label?: string; href?: string }[];
    footer?: { label?: string; href?: string }[];
    ctaLabel?: string;
    ctaHref?: string;
    cta?: { label?: string; href?: string };
  }>({
    query: NAVIGATION_QUERY,
    params: { locale },
    tags: ["navigation", `navigation-${locale}`],
  });
}

export async function loadRedirects() {
  const remote = await sanityFetch<{ from?: string; to?: string; status?: number }[]>({
    query: REDIRECTS_QUERY,
    tags: ["redirect"],
  });
  return (remote ?? [])
    .filter((item) => item.from && item.to)
    .map((item) => ({
      from: item.from!,
      to: item.to!,
      status: item.status === 302 ? 302 : 301,
    }));
}

export async function loadClients(locale: Locale): Promise<ClientLogo[]> {
  const remote = await sanityFetch<
    {
      name?: string;
      logo?: { asset?: unknown; alt?: string };
      logoUrl?: string;
      logoMobile?: { asset?: unknown; alt?: string };
      logoMobileUrl?: string;
    }[]
  >({
    query: CLIENTS_QUERY,
    params: { locale },
    tags: ["client", `client-${locale}`],
  });

  const fromCms =
    remote
      ?.map((item) => {
        const src = toImageSrc(item.logo, item.logoUrl ?? "");
        if (!item.name || !src) return null;
        const srcMobile = toImageSrc(item.logoMobile, item.logoMobileUrl ?? "");
        return { name: item.name, src, ...(srcMobile ? { srcMobile } : {}) };
      })
      .filter((item): item is ClientLogo => Boolean(item)) ?? [];

  return fromCms.length ? fromCms : clientLogos;
}

export async function loadTestimonials(
  locale: Locale,
): Promise<ReturnType<typeof getDictionaryLocal>["clients"]["items"]> {
  const fallback = getDictionaryLocal(locale).clients.items;
  const remote = await sanityFetch<
    {
      quote?: string;
      person?: string;
      role?: string;
      image?: { asset?: unknown; alt?: string };
      imageUrl?: string;
      imageAlt?: string;
    }[]
  >({
    query: TESTIMONIALS_QUERY,
    params: { locale },
    tags: ["testimonial", `testimonial-${locale}`],
  });

  const fromCms =
    remote
      ?.map((item) => {
        if (!item.quote?.trim() || !item.person?.trim()) return null;
        const image = toImageSrc(item.image, item.imageUrl ?? "");
        return {
          quote: item.quote,
          name: item.person,
          role: item.role?.trim() ?? "",
          image,
          imageAlt: item.imageAlt?.trim() || item.image?.alt?.trim() || item.person,
        };
      })
      .filter((item): item is (typeof fallback)[number] => Boolean(item)) ?? [];

  return fromCms.length ? fromCms : fallback;
}
