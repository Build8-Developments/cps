import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FeaturedWork } from "@/components/sections/featured-work";
import { ClientsSection } from "@/components/sections/clients-section";
import { BriefFormSection } from "@/components/sections/brief-form-section";
import { HomeHero } from "@/components/sections/home-hero";
import { LogosSection } from "@/components/sections/logos-section";
import { LifecycleSection } from "@/components/sections/lifecycle-section";
import { ServicesSection } from "@/components/sections/services-section";
import { WhyCpsSection } from "@/components/sections/why-cps-section";
import { ProductionCapabilitiesSection } from "@/components/sections/production-capabilities-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { StatsSection } from "@/components/sections/stats-section";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadHomeFeaturedProjectSlugs, loadHomeSeo } from "@/sanity/load-pages";
import { loadProjects } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";
import { getSiteConfig } from "@/lib/site-config";
import { getSiteIcon } from "@/lib/site-assets";

type PageProps = { params: Promise<{ locale: string }> };

/** Prefer a mix across services, including a clear non-booth retail project. */
function featuredWorkItems<T extends { slug: string }>(items: T[]): T[] {
  const preferred = ["northline", "pulse-retail", "qamar"];
  const selected = preferred
    .map((slug) => items.find((item) => item.slug === slug))
    .filter((item): item is T => Boolean(item));
  if (selected.length >= 3) return selected.slice(0, 3);
  const rest = items.filter((item) => !preferred.includes(item.slug));
  return [...selected, ...rest].slice(0, 3);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const config = getSiteConfig();
  const seo = await loadHomeSeo(localeParam);
  return buildPageMetadata({
    path: "/",
    locale: localeParam,
    seo,
    fallbackTitle: `${config.name} — ${config.tagline}`,
    fallbackDescription: config.description,
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const [featuredProjectSlugs, projects] = await Promise.all([
    loadHomeFeaturedProjectSlugs(locale),
    loadProjects(locale),
  ]);
  const cmsFeatured = featuredProjectSlugs.length
    ? featuredProjectSlugs
        .map((slug) => projects.find((project) => project.slug === slug))
        .filter((project): project is (typeof projects)[number] => Boolean(project))
    : [];
  const featuredProjects = cmsFeatured.length
    ? cmsFeatured.slice(0, 3)
    : featuredWorkItems(dictionary.work.items);

  return (
    <>
      <HomeHero locale={locale} content={dictionary.hero} />
      <ServicesSection locale={locale} content={dictionary.services} />
      <LifecycleSection
        eyebrow={dictionary.lifecycle.eyebrow}
        title={dictionary.lifecycle.title}
        support={dictionary.lifecycle.support}
        imageAlt={dictionary.lifecycle.imageAlt}
        items={dictionary.lifecycle.items}
        centered
      />
      <StatsSection
        id="home-stats"
        eyebrow={dictionary.stats.eyebrow}
        title={dictionary.stats.title}
        support={dictionary.stats.support}
        items={dictionary.stats.items}
      />
      <ProductionCapabilitiesSection locale={locale} compact />
      <LogosSection locale={locale} />
      <FeaturedWork
        locale={locale}
        eyebrow={dictionary.work.eyebrow}
        title={dictionary.work.title}
        support={dictionary.work.support}
        viewAll={dictionary.work.viewAll}
        items={featuredProjects}
      />
      <WhyCpsSection locale={locale} content={dictionary.whyCps} />
      <BeforeAfterSection
        content={dictionary.beforeAfter}
        brandIcon={getSiteIcon()}
      />
      <ClientsSection
        id="testimonials"
        eyebrow={dictionary.clients.eyebrow}
        title={dictionary.clients.title}
        support={dictionary.clients.support}
        items={dictionary.clients.items}
      />
      <BriefFormSection id="home-contact" locale={locale} />
    </>
  );
}
