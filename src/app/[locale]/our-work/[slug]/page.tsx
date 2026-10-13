import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { creativeWorkJsonLd, JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import {
  ProjectDetailSections,
  type ProjectDetailItem,
} from "@/components/sections/project-detail-sections";
import { formatBoothTypeTitle } from "@/content/catalog";
import { getServiceArchitecture, localizeText, projectIndustryOptions } from "@/content/service-architecture";
import { localizeProjectSize } from "@/lib/arabic-format";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import {
  loadBoothTypes,
  loadLocations,
  loadProject,
  loadProjects,
} from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function toDetailItem(
  project: Awaited<ReturnType<typeof loadProject>>,
  labels: {
    industry?: string;
    boothType?: string;
    location?: string;
    service?: string;
    services?: string[];
    client?: string;
  } = {},
): ProjectDetailItem | null {
  if (!project) return null;
  return {
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    scopeOfWork:
      project.scopeOfWork ||
      [labels.service, labels.boothType].filter(Boolean).join(" · "),
    category: project.category ?? "",
    year: project.year,
    challenge: project.challenge,
    solution: project.solution,
    result: project.result,
    image: project.image,
    imageAlt: project.imageAlt,
    gallery: project.gallery,
    motionVideo: project.motionVideo,
    event: project.event,
    size: project.size,
    technologies: project.technologies,
    industryLabel: labels.industry,
    boothTypeLabel: labels.boothType,
    locationLabel: labels.location,
    serviceLabel: labels.service,
    serviceLabels: labels.services,
    clientName: labels.client || project.clientName || project.title,
  };
}

function projectServiceLabels(
  project: NonNullable<Awaited<ReturnType<typeof loadProject>>>,
  locale: Locale,
) {
  return Array.from(
    new Set(project.serviceSlugs ?? (project.serviceSlug ? [project.serviceSlug] : [])),
  ).map((serviceSlug) => {
    const service = getServiceArchitecture(serviceSlug);
    return service ? localizeText(service.title, locale) : serviceSlug;
  });
}

export async function generateStaticParams() {
  const items = await loadProjects("en");
  return items.flatMap((project) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const project = await loadProject(localeParam, slug);
  if (!project) return {};
  return buildPageMetadata({
    path: `/our-work/${slug}`,
    locale: localeParam,
    seo: project.seo,
    fallbackTitle: `CPS — ${project.title}`,
    fallbackDescription: project.summary,
    fallbackOgImage: project.image,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const [project, dictionary, allProjects, boothTypes, locations] =
    await Promise.all([
      loadProject(locale, slug),
      resolveDictionary(locale),
      loadProjects(locale),
      loadBoothTypes(locale),
      loadLocations(locale),
    ]);

  if (!project) notFound();

  const labels = dictionary.projectPage;
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  const detail = toDetailItem(project, {
    client: project.clientName || project.title,
    industry: projectIndustryOptions.find((item) => item.slug === project.industrySlug)
      ? localizeText(projectIndustryOptions.find((item) => item.slug === project.industrySlug)!.title, locale)
      : project.category,
    boothType: formatBoothTypeTitle(
      boothTypes.find((item) => item.slug === project.boothTypeSlug)?.title ?? "",
    ),
    location: locations.find((item) => item.slug === project.locationSlug)?.title,
    service: project.serviceSlug
      ? (() => {
          const service = getServiceArchitecture(project.serviceSlug!);
          return service ? localizeText(service.title, locale) : project.serviceSlug;
        })()
      : undefined,
    services: projectServiceLabels(project, locale),
  })!;

  const relatedProjects = allProjects
    .filter((entry) => entry.slug !== slug)
    .slice(0, 3)
    .map((entry) =>
      toDetailItem(entry, {
        client: entry.clientName || entry.title,
        industry: projectIndustryOptions.find((item) => item.slug === entry.industrySlug)
          ? localizeText(projectIndustryOptions.find((item) => item.slug === entry.industrySlug)!.title, locale)
          : entry.category,
        boothType: formatBoothTypeTitle(
          boothTypes.find((item) => item.slug === entry.boothTypeSlug)?.title ?? "",
        ),
        location: locations.find((item) => item.slug === entry.locationSlug)?.title,
        service: entry.serviceSlug
          ? (() => {
              const service = getServiceArchitecture(entry.serviceSlug!);
              return service ? localizeText(service.title, locale) : entry.serviceSlug;
            })()
          : undefined,
        services: projectServiceLabels(entry, locale),
      }),
    )
    .filter((item): item is ProjectDetailItem => Boolean(item));

  return (
    <>
      <JsonLd
        data={creativeWorkJsonLd({
          name: project.title,
          description: project.summary,
          path: `/our-work/${slug}`,
          locale,
          image: project.image,
          dateCreated: project.year,
        })}
      />

      <Breadcrumbs
        locale={locale}
        compactOnMobile
        items={[
          { label: homeLabel, href: "/" },
          { label: dictionary.workPage.title, href: "/our-work" },
          { label: project.title },
        ]}
      />

      <PageHero
        locale={locale}
        className="page-hero--project"
        eyebrow={project.category}
        title={project.title}
        lead={project.summary}
        image={project.image}
        imageAlt={project.imageAlt}
        meta={[project.year, project.event, localizeProjectSize(project.size, locale)]
          .filter(Boolean)
          .join(" · ")}
        cta={{
          label: dictionary.nav.cta,
          href: localizePath("/contact", locale),
        }}
      />

      <ProjectDetailSections
        locale={locale}
        project={detail}
        labels={{
          ...labels,
          approach: locale === "ar" ? "الحل والتنفيذ" : "CPS Solution",
        }}
        relatedProjects={relatedProjects}
      />
    </>
  );
}
