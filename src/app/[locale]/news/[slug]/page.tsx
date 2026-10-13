import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { articleJsonLd, JsonLd } from "@/components/seo/json-ld";
import { InnerPageEngagement } from "@/components/sections/inner-page-engagement";
import { PageHero } from "@/components/sections/page-hero";
import { localizeNewsCategory } from "@/content/catalog";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/cms-seo";
import { resolveDictionary } from "@/lib/dictionary";
import { loadNews, loadNewsArticle } from "@/sanity/load-collections";
import { ensureSiteConfig } from "@/sanity/load-site-config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const items = await loadNews("en");
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
  const article = await loadNewsArticle(localeParam, slug);
  if (!article) return {};
  return buildPageMetadata({
    path: `/news/${slug}`,
    locale: localeParam,
    seo: article.seo,
    fallbackTitle: `CPS — ${article.title}`,
    fallbackDescription: article.excerpt,
    fallbackOgImage: article.image,
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { locale: localeParam, slug } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const article = await loadNewsArticle(locale, slug);
  if (!article) notFound();

  const dictionary = await resolveDictionary(locale);
  const homeLabel = locale === "ar" ? "الرئيسية" : "Home";
  const hubLabel = locale === "ar" ? "رؤى" : "Insights";

  return (
    <>
        <JsonLd
          data={articleJsonLd({
            title: article.title,
            description: article.excerpt,
            path: `/news/${slug}`,
            locale,
            image: article.image,
            datePublished: article.publishedAt,
            author: article.author,
          })}
        />
        <Breadcrumbs
          locale={locale}
          items={[
            { label: homeLabel, href: "/" },
            { label: hubLabel, href: "/news" },
            { label: article.title },
          ]}
        />
        <PageHero
          locale={locale}
          eyebrow={localizeNewsCategory(article.category, locale) || hubLabel}
          title={article.title}
          lead={article.excerpt}
          image={article.image}
          imageAlt={article.imageAlt}
          meta={`${article.author}${article.publishedAt ? ` · ${new Date(article.publishedAt).toLocaleDateString(locale)}` : ""} · ${article.readingTime} ${locale === "ar" ? "دقائق قراءة" : "min read"}`}
        />

        <section className="section-pad">
          <div className="site-container max-w-3xl grid gap-6">
            {article.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-lg leading-8 text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
        <InnerPageEngagement
          locale={locale}
          dictionary={dictionary}
          namespace={`news-${slug}`}
        />
    </>
  );
}
