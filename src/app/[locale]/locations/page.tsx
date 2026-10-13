import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadLocations } from "@/sanity/load-collections";
import { loadHubPage } from "@/sanity/load-pages";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const hub = await loadHubPage(localeParam, "locations");
  return buildPageMetadata({
    path: "/locations",
    locale: localeParam,
    seo: hub.seo,
    fallbackTitle: `CPS — ${hub.title}`,
    fallbackDescription: hub.lead,
  });
}

export default async function LocationsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const items = await loadLocations(locale);
  const page = dictionary.locationsPage;
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: homeLabel, href: "/" },
          { label: page.title },
        ]}
      />
      <PageHero
        locale={locale}
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image={items[0]?.image}
        imageAlt={items[0]?.imageAlt}
        cta={{
          label: locale === "ar" ? "خطّط لمشاركتك القادمة" : "Plan your show",
          href: "#locations-brief",
        }}
      />
      <CollectionGrid
        columns={3}
        eyebrow={locale === "ar" ? "المدن والمناطق التي نخدمها" : "City coverage"}
        title={
          locale === "ar"
            ? "تنفيذ محلي بالمعايير نفسها في كل مدينة"
            : "Local delivery. One consistent standard."
        }
        ctaLabel={locale === "ar" ? "استكشف المدينة" : "Explore city"}
        items={items.map((item) => ({
          href: localizePath(`/locations/${item.slug}`, locale),
          title: item.title,
          excerpt: item.excerpt,
          image: item.image,
          imageAlt: item.imageAlt,
        }))}
      />
      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        namespace="locations"
      />
    </>
  );
}
