import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { LocationDetailSections } from "@/components/sections/location-detail-sections";
import { PageHero } from "@/components/sections/page-hero";
import { formatBoothTypeTitle } from "@/content/catalog";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import {
  loadBoothTypes,
  loadLocation,
  loadLocations,
  loadProjects,
  loadServices,
} from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const items = await loadLocations("en");
  return items.flatMap((item) =>
    (["en", "ar"] as const).map((locale) => ({
      locale,
      slug: item.slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const location = await loadLocation(localeParam, slug);
  if (!location) return {};
  return buildPageMetadata({
    path: `/locations/${slug}`,
    locale: localeParam,
    seo: location.seo,
    fallbackTitle: `CPS — ${location.title}`,
    fallbackDescription: location.excerpt || location.localExperience,
    fallbackOgImage: location.image,
  });
}

export default async function LocationDetailPage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const [location, allLocations, projects, services, boothTypes, dictionary] =
    await Promise.all([
      loadLocation(locale, slug),
      loadLocations(locale),
      loadProjects(locale),
      loadServices(locale),
      loadBoothTypes(locale),
      resolveDictionary(locale),
    ]);
  if (!location) notFound();

  const relatedProjects = projects
    .filter((item) => item.locationSlug === slug)
    .slice(0, 3);
  const otherLocations = allLocations
    .filter((item) => item.slug !== slug)
    .slice(0, 4);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const hubLabel = locale === "ar" ? "مناطق خدمتنا" : "Locations";
  const briefHref = `#location-${slug}-brief`;

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: location.title,
          description: location.localExperience || location.excerpt,
          path: `/locations/${slug}`,
          locale,
          image: location.image,
        })}
      />
      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: hubLabel, href: "/locations" },
          { label: location.title },
        ]}
      />
      <PageHero
        locale={locale}
        eyebrow={hubLabel}
        title={location.title}
        lead={location.excerpt}
        image={location.image}
        imageAlt={location.imageAlt}
        cta={{
          label: dictionary.nav.cta,
          href: briefHref,
        }}
      />

      <LocationDetailSections
        locale={locale}
        location={{
          slug: location.slug,
          title: location.title,
          excerpt: location.excerpt,
          localExperience: location.localExperience,
          countryCode: location.countryCode,
          image: location.image,
          imageAlt: location.imageAlt,
          capabilities: location.capabilities,
        }}
        projects={relatedProjects.map((item) => ({
          slug: item.slug,
          title: item.title,
          summary: item.summary,
          year: item.year,
          category: item.category,
          image: item.image,
          imageAlt: item.imageAlt,
        }))}
        otherLocations={otherLocations.map((item) => ({
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          localExperience: item.localExperience,
          countryCode: item.countryCode,
          image: item.image,
          imageAlt: item.imageAlt,
          capabilities: item.capabilities,
        }))}
        services={services.map((item) => ({
          slug: item.slug,
          title: item.title,
        }))}
        boothTypes={boothTypes.map((item) => ({
          slug: item.slug,
          title: formatBoothTypeTitle(item.title, location.title),
        }))}
        briefHref={briefHref}
        ctaLabel={dictionary.nav.cta}
      />

      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        namespace={`location-${slug}`}
      />
    </>
  );
}
