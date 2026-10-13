import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd, serviceJsonLd } from "@/components/seo/json-ld";
import { BoothTypeDetailSections } from "@/components/sections/booth-type-detail-sections";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { formatBoothTypeTitle } from "@/content/catalog";
import { BOOTH_COMPARISON_ROWS } from "@/content/booth-comparison";
import {
  buildBoothTypeLocationPage,
} from "@/content/programmatic-seo";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import {
  loadBoothType,
  loadBoothTypes,
  loadLocation,
  loadLocations,
  loadProjects,
} from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string; boothTypeSlug: string }>;
};

export async function generateStaticParams() {
  const [locations, boothTypes] = await Promise.all([
    loadLocations("en"),
    loadBoothTypes("en"),
  ]);

  return locations.flatMap((location) =>
    boothTypes.flatMap((boothType) =>
      (["en", "ar"] as const).map((locale) => ({
        locale,
        slug: location.slug,
        boothTypeSlug: boothType.slug,
      })),
    ),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam, slug, boothTypeSlug } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const [page, boothType] = await Promise.all([
    Promise.resolve(
      buildBoothTypeLocationPage(localeParam, slug, boothTypeSlug),
    ),
    loadBoothType(localeParam, boothTypeSlug),
  ]);
  if (!page) return {};
  return buildPageMetadata({
    path: page.path,
    locale: localeParam,
    seo: boothType?.seo,
    fallbackTitle: `CPS — ${page.title}`,
    fallbackDescription: page.lead,
    fallbackOgImage: page.image,
    keywords: boothType?.seo?.keywords ?? page.keywords,
  });
}

export default async function LocationBoothTypePage({ params }: PageProps) {
  const { locale: localeParam, slug, boothTypeSlug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const [page, boothType, allBoothTypes, projects, location, dictionary] =
    await Promise.all([
      Promise.resolve(buildBoothTypeLocationPage(locale, slug, boothTypeSlug)),
      loadBoothType(locale, boothTypeSlug),
      loadBoothTypes(locale),
      loadProjects(locale),
      loadLocation(locale, slug),
      resolveDictionary(locale),
    ]);
  if (!page || !boothType || !location) notFound();

  const related = allBoothTypes
    .filter((item) => item.slug !== boothTypeSlug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      overviewTitle: item.overviewTitle,
      description: item.description,
      image: item.image,
      imageAlt: item.imageAlt,
      model3d: item.model3d,
      gallery: item.gallery,
      features: item.features,
      advantages: item.advantages,
      useCases: item.useCases,
    }));

  const matchedProjects = projects.filter(
    (item) => item.boothTypeSlug === boothTypeSlug,
  );
  const fillerProjects = projects.filter(
    (item) => item.boothTypeSlug !== boothTypeSlug,
  );
  const caseStudies = [...matchedProjects, ...fillerProjects]
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      summary: item.summary,
      year: item.year,
      category: item.category,
      image: item.image,
      imageAlt: item.imageAlt,
    }));

  const comparisonRows = allBoothTypes.map((item) => {
    const fallback = BOOTH_COMPARISON_ROWS.find((row) => row.slug === item.slug);
    return {
      slug: item.slug,
      label: {
        en: item.compareLabel || fallback?.label.en || item.title,
        ar: item.compareLabel || fallback?.label.ar || item.title,
      },
      indoor: item.indoor ?? fallback?.indoor ?? false,
      outdoor: item.outdoor ?? fallback?.outdoor ?? false,
      reusable: item.reusable ?? fallback?.reusable ?? false,
      highCustomization:
        item.highCustomization ?? fallback?.highCustomization ?? false,
      fastSetup: item.fastSetup ?? fallback?.fastSetup ?? false,
    };
  });

  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const locationsLabel = locale === "ar" ? "مناطق خدمتنا" : "Locations";
  const hubLabel = locale === "ar" ? "أنواع الأجنحة" : "Booth Types";
  const briefHref = `#location-booth-${slug}-${boothTypeSlug}-brief`;
  const overviewTitle =
    boothType.overviewTitle ||
    (locale === "ar"
      ? "صُمّم هذا النوع من الأجنحة ليمنح علامتك حضوراً أقوى في المعرض."
      : "Built for stronger presence on the show floor.");
  const plainTitle = formatBoothTypeTitle(boothType.title, location.title);

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: page.title,
          description: page.lead,
          path: page.path,
          locale,
          image: boothType.image,
        })}
      />

      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: locationsLabel, href: "/locations" },
          { label: location.title, href: `/locations/${slug}` },
          { label: hubLabel, href: "/booth-types" },
          { label: plainTitle },
        ]}
      />

      <PageHero
        eyebrow={`${location.title} · ${hubLabel}`}
        title={boothType.title.includes("{City}") ? boothType.title : page.title}
        lead={boothType.excerpt || page.lead}
        image={boothType.image}
        imageAlt={boothType.imageAlt}
        locale={locale}
        cta={{
          label: dictionary.servicesPage.primaryCta,
          href: briefHref,
        }}
        secondaryCta={{
          label: dictionary.servicesPage.secondaryCta,
          href: localizePath("/our-work", locale),
        }}
      />

      <BoothTypeDetailSections
        locale={locale}
        locationSlug={slug}
        boothType={{
          slug: boothType.slug,
          title: boothType.title,
          excerpt: boothType.excerpt,
          overviewTitle,
          description: boothType.description,
          image: boothType.image,
          imageAlt: boothType.imageAlt,
          model3d: boothType.model3d,
          gallery: boothType.gallery,
          features: boothType.features,
          advantages: boothType.advantages,
          useCases: boothType.useCases,
        }}
        related={related}
        caseStudies={caseStudies}
        comparisonRows={comparisonRows}
        briefHref={briefHref}
        ctaLabel={dictionary.servicesPage.primaryCta}
      />

      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        faqItems={boothType.faq.length ? boothType.faq : page.faqs}
        faqTitle={
          locale === "ar"
            ? `أسئلة عن ${plainTitle}`
            : `Questions about ${plainTitle}`
        }
        namespace={`location-booth-${slug}-${boothTypeSlug}`}
      />
    </>
  );
}
