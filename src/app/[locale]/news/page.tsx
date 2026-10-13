import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionGrid } from "@/components/sections/collection-grid";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { localizeNewsCategory } from "@/content/catalog";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadNews } from "@/sanity/load-collections";
import { loadHubPage } from "@/sanity/load-pages";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  await ensureSiteConfig();
  const hub = await loadHubPage(localeParam, "news");
  return buildPageMetadata({
    path: "/news",
    locale: localeParam,
    seo: hub.seo,
    fallbackTitle: `CPS — ${hub.title}`,
    fallbackDescription: hub.lead,
  });
}

export default async function NewsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const dictionary = await resolveDictionary(locale);
  const articles = await loadNews(locale);
  const page = dictionary.newsPage;
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
        image={articles[0]?.image}
        imageAlt={articles[0]?.imageAlt}
        cta={{
          label: locale === "ar" ? "ابدأ مشروعك" : "Start your project",
          href: "#news-brief",
        }}
      />
      <CollectionGrid
        eyebrow={locale === "ar" ? "من قلب المعارض" : "From the show floor"}
        title={
          locale === "ar"
            ? "أفكار عملية لمساحات أكثر تأثيراً"
            : "Practical ideas for more powerful spaces"
        }
        ctaLabel={locale === "ar" ? "اقرأ المقال" : "Read article"}
        items={articles.map((article) => ({
          href: localizePath(`/news/${article.slug}`, locale),
          title: article.title,
          excerpt: article.excerpt,
          image: article.image,
          imageAlt: article.imageAlt,
          meta: `${localizeNewsCategory(article.category, locale)}${article.publishedAt ? ` · ${new Date(article.publishedAt).toLocaleDateString(locale)}` : ""}`,
        }))}
      />
      <InnerPageEngagement
        locale={locale}
        dictionary={dictionary}
        namespace="news"
      />
    </>
  );
}
