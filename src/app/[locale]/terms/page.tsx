import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/sections/legal-page";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

const copy = {
  en: {
    title: "Terms & Conditions",
    lead: "General terms for using the CPS website and requesting exhibition services.",
    body: [
      "Content on this site is provided for information about CPS exhibition design and manufacturing services.",
      "Project scope, timelines, and commercial terms are confirmed in a written proposal or contract.",
      "Questions about these terms: inquiry@creativesprofessionals.com.",
    ],
  },
  ar: {
    title: "الشروط والأحكام",
    lead: "الشروط العامة لاستخدام موقع CPS وطلب خدماتها في مجال أجنحة المعارض.",
    body: [
      "يُقدَّم محتوى هذا الموقع لأغراض تعريفية بخدمات CPS في تصميم أجنحة المعارض وتصنيعها.",
      "يُؤكَّد نطاق كل مشروع وجدوله الزمني وشروطه التجارية في عرض مكتوب أو عقد.",
      "للاستفسار عن هذه الشروط، راسلنا على inquiry@creativesprofessionals.com.",
    ],
  },
} as const;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  return buildPageMetadata({
    path: "/terms",
    locale: localeParam,
    fallbackTitle: `CPS — ${copy[localeParam].title}`,
    fallbackDescription: copy[localeParam].lead,
  });
}

export default async function TermsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const page = copy[locale];

  return <LegalPage locale={locale} title={page.title} lead={page.lead} body={page.body} />;
}
