import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { CapabilityExplainerSection } from "@/components/sections/capability-explainer-section";
import { BeforeAfterSection } from "@/components/sections/before-after-section";
import { PageHero } from "@/components/sections/page-hero";
import { ProductionCapabilitiesSection } from "@/components/sections/production-capabilities-section";
import { ProjectLaunchSection } from "@/components/sections/project-launch-section";
import { WorkshopSection } from "@/components/sections/workshop-section";
import { media } from "@/content/media";
import { buildPageMetadata } from "@/lib/cms-seo";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { resolveDictionary } from "@/lib/dictionary";
import { getSiteIcon } from "@/lib/site-assets";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  await ensureSiteConfig();
  return buildPageMetadata({
    path: "/production-capabilities",
    locale,
    fallbackTitle:
      locale === "ar"
        ? "CPS — قدرات الإنتاج"
        : "CPS — Production Capabilities",
    fallbackDescription:
      locale === "ar"
        ? "منشأة إنتاج متكاملة تجمع أعمال الخشب والمعادن والأكريليك والطباعة والتركيب."
        : "One integrated production floor for wood, metal, acrylic, print and installation.",
  });
}

export default async function ProductionCapabilitiesPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const ar = locale === "ar";
  const dictionary = await resolveDictionary(locale);

  return (
    <>
      <Breadcrumbs
        locale={locale}
        items={[
          { label: ar ? "الرئيسية" : "Home", href: "/" },
          { label: ar ? "قدرات الإنتاج" : "Production Capabilities" },
        ]}
      />
      <PageHero
        locale={locale}
        eyebrow={ar ? "قدرات الإنتاج" : "Production Capabilities"}
        title={
          ar
            ? "جودة ما نسلّمه تبدأ من طريقة تصنيعه."
            : "What we deliver is supported by how we build it."
        }
        lead={
          ar
            ? "منشأة واحدة تجمع الحرفة اليدوية والتقنيات الحديثة والتجميع والتركيب."
            : "One production floor connects craft, technology, assembly and on-site installation."
        }
        cta={{
          label: ar ? "ابدأ مشروعك" : "Start a Project",
          href: localizePath("/contact", locale),
        }}
      />
      <div className="production-page-flow">
        <ProductionCapabilitiesSection
          locale={locale}
          standalone
          image={media.services.fabrication}
        />
        <WorkshopSection
          locale={locale}
          page={dictionary.aboutPage}
          id="production-workshop"
          className="production-workshop"
          image={media.about.build}
          imageAlt={ar ? "ورشة الإنتاج في CPS" : "CPS workshop and production"}
        />
        <CapabilityExplainerSection locale={locale} />
        <BeforeAfterSection
          content={dictionary.beforeAfter}
          brandIcon={getSiteIcon()}
        />
        <ProjectLaunchSection
          locale={locale}
          eyebrow={dictionary.projectLaunch.eyebrow}
          title={dictionary.projectLaunch.title}
          support={dictionary.projectLaunch.support}
          ctaLabel={dictionary.projectLaunch.ctaLabel}
        />
      </div>
    </>
  );
}
