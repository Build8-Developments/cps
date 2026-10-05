import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { QuoteForm } from "@/components/forms/quote-form";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { FaqSection } from "@/components/sections/faq-section";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ProjectLaunchSection } from "@/components/sections/project-launch-section";
import { getQuoteFormCopy } from "@/content/quote-form.copy";
import {
  industrySlug,
  localizeText,
  serviceArchitecture,
  serviceLandingHeroes,
  cataloguePath,
  servicePath,
  sharedProcess,
  type ServiceArchitecture,
} from "@/content/service-architecture";
import { localizePath, type Locale } from "@/lib/i18n";
import { locationServicePath } from "@/lib/locations";
import type { Dictionary } from "@/content/dictionaries.local";
import type { CmsProject } from "@/sanity/transformers/collections";

const industriesHeadline: Record<string, { en: string; ar: string }> = {
  "exhibitions-booths": {
    en: "Sectors we build exhibition booths for",
    ar: "القطاعات التي نصمّم لها أجنحة المعارض",
  },
  "event-fabrication": {
    en: "Sectors we build event structures for",
    ar: "القطاعات التي ننفّذ لها هياكل الفعاليات",
  },
  "fit-out-interiors": {
    en: "Sectors we fit out for",
    ar: "القطاعات التي نجهّز مساحاتها",
  },
  "retail-displays": {
    en: "Sectors we produce displays for",
    ar: "القطاعات التي ننتج لها وحدات العرض",
  },
  "custom-fabrication": {
    en: "Sectors we fabricate for",
    ar: "القطاعات التي نصنّع لها حسب الطلب",
  },
  "printing-signage": {
    en: "Sectors we produce signage for",
    ar: "القطاعات التي ننتج لها المطبوعات واللافتات",
  },
  "rental-solutions": {
    en: "Sectors we rent to",
    ar: "القطاعات التي نوفّر لها حلول التأجير",
  },
  "installation-project-delivery": {
    en: "Sectors we deliver for",
    ar: "القطاعات التي ننفّذ لها التركيب والتسليم",
  },
};

const projectsHeadline: Record<string, { en: string; ar: string }> = {
  "exhibitions-booths": {
    en: "Recent exhibitions & booths work",
    ar: "أحدث مشاريع المعارض والأجنحة",
  },
  "event-fabrication": {
    en: "Recent event fabrication work",
    ar: "أحدث مشاريع الفعاليات",
  },
  "fit-out-interiors": {
    en: "Recent fit-out & interiors work",
    ar: "أحدث مشاريع التجهيز الداخلي",
  },
  "retail-displays": {
    en: "Recent retail displays work",
    ar: "أحدث مشاريع وحدات العرض في المتاجر",
  },
  "custom-fabrication": {
    en: "Recent custom fabrication work",
    ar: "أحدث مشاريع التصنيع حسب الطلب",
  },
  "printing-signage": {
    en: "Recent printing & signage work",
    ar: "أحدث مشاريع الطباعة واللافتات",
  },
  "rental-solutions": {
    en: "Recent rental solutions work",
    ar: "أحدث مشاريع التأجير",
  },
  "installation-project-delivery": {
    en: "Recent installation & project delivery work",
    ar: "أحدث مشاريع التركيب والتسليم",
  },
};

const projectsCta: Record<string, { en: string; ar: string }> = {
  "exhibitions-booths": {
    en: "View All Exhibitions & Booths Work",
    ar: "عرض كل مشاريع المعارض والأجنحة",
  },
  "event-fabrication": {
    en: "View All Event Fabrication Work",
    ar: "عرض كل مشاريع الفعاليات",
  },
  "fit-out-interiors": {
    en: "View All Fit-Out & Interiors Work",
    ar: "عرض كل مشاريع التجهيز الداخلي",
  },
  "retail-displays": {
    en: "View All Retail Displays Work",
    ar: "عرض كل مشاريع وحدات العرض في المتاجر",
  },
  "custom-fabrication": {
    en: "View All Custom Fabrication Work",
    ar: "عرض كل مشاريع التصنيع حسب الطلب",
  },
  "printing-signage": {
    en: "View All Printing & Signage Work",
    ar: "عرض كل مشاريع الطباعة واللافتات",
  },
  "rental-solutions": {
    en: "View All Rental Solutions Work",
    ar: "عرض كل مشاريع التأجير",
  },
  "installation-project-delivery": {
    en: "View All Installation & Project Delivery Work",
    ar: "عرض كل مشاريع التركيب والتسليم",
  },
};

export function ServiceArchitecturePage({
  locale,
  service,
  projects,
  projectLaunch,
  marketName: marketNameOverride,
  heroHeadline,
  heroLead,
  heroEyebrow,
  image: imageOverride,
  locationSlug,
  faqItems,
}: {
  locale: Locale;
  service: ServiceArchitecture;
  projects: CmsProject[];
  projectLaunch: Dictionary["projectLaunch"];
  marketName?: string;
  heroHeadline?: string;
  heroLead?: string;
  heroEyebrow?: string;
  image?: string;
  locationSlug?: string;
  faqItems?: { question: string; answer: string }[];
}) {
  const ar = locale === "ar";
  const quoteForm = getQuoteFormCopy(
    locale,
    service.slug === "installation-project-delivery" ? "delivery" : "service",
  );
  const catalogueItems = service.catalogue.categories.flatMap((category) =>
    category.items.map((entry) => ({ ...entry, category })),
  );
  const catalogueOptions = catalogueItems.map((entry) => ({
      value: entry.slug,
      label: localizeText(entry.title, locale),
    }));
  const featured = service.showcase.items
    .map((showcaseItem) => {
      const catalogueItem = catalogueItems.find(
        (entry) =>
          entry.slug === showcaseItem.catalogueItemSlug ||
          entry.title.en === showcaseItem.title.en,
      );

      return catalogueItem ? { ...catalogueItem, showcaseItem } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .slice(0, 5);
  const totalCatalogueItems = service.catalogue.categories.reduce(
    (acc, cat) => acc + cat.items.length,
    0,
  );
  const related = service.related
    .map((slug) => serviceArchitecture.find((entry) => entry.slug === slug))
    .filter((entry): entry is ServiceArchitecture => Boolean(entry));
  const filteredProjects = projects
    .filter(
      (project) =>
        (project.serviceSlug === service.slug ||
          project.serviceSlugs?.includes(service.slug)) &&
        (!locationSlug || project.locationSlug === locationSlug),
    )
    .slice(0, 3);
  const industryTitle = industriesHeadline[service.slug];
  const projectTitle = projectsHeadline[service.slug];
  const projectCta = projectsCta[service.slug];
  const allProjectsHref = `/our-work?service=${service.slug}${locationSlug ? `&country=${locationSlug}` : ""}`;
  const serviceNumber = String(
    serviceArchitecture.findIndex((entry) => entry.slug === service.slug) + 1,
  ).padStart(2, "0");
  const landingHero = serviceLandingHeroes[service.slug];
  const marketName = marketNameOverride ?? (ar ? "السعودية" : "Saudi Arabia");
  const landingHeadline = heroHeadline ?? localizeText(landingHero.headline, locale).replace(
    "{City}",
    marketName,
  );
  const landingLead = heroLead ?? localizeText(landingHero.subheadline, locale);
  const displayImage = imageOverride || service.image;
  const resolvedFaq = faqItems ?? service.faq.map((entry) => ({
    question: localizeText(entry.question, locale),
    answer: localizeText(entry.answer, locale),
  }));

  return (
    <>
      <section className="service-architecture-hero">
        <div className="service-architecture-hero-shade" />
        <div className="site-container service-architecture-hero-inner">
          <div className="service-architecture-hero-meta">
            <p className="service-architecture-hero-service">
              <span>{serviceNumber}</span>
              {localizeText(service.title, locale)}
            </p>
            <p className="eyebrow eyebrow-on-dark">
              {heroEyebrow || localizeText(landingHero.eyebrow, locale)}
            </p>
          </div>
          <h1>{landingHeadline}</h1>
          <p className="service-architecture-hero-lead">
            {landingLead}
          </p>
          <div className="service-architecture-hero-actions">
            <Link href="#quote" className="hero-cta">
              {ar ? "ابدأ مشروعك" : "Start a Project"}
              <CtaArrow tone="white" size="sm" />
            </Link>
            <Link
              href={localizePath(allProjectsHref, locale)}
              className="hero-cta-ghost service-architecture-hero-work"
            >
              {ar ? "شاهد أعمالنا" : "View Our Work"}
              <CtaArrow tone="white" size="sm" />
            </Link>
          </div>
        </div>
      </section>

      <section className="service-architecture-overview">
        <div className="site-container service-architecture-overview-grid">
          <Reveal>
            <div className="service-architecture-overview-copy">
              <p className="eyebrow">{localizeText(service.title, locale)}</p>
              <h2 className="display">{localizeText(service.hero.headline, locale)}</h2>
              <p className="service-architecture-overview-lead">
                {localizeText(service.hero.support, locale)}
              </p>
              <ul>
                {service.hero.bullets.map((bullet, index) => (
                  // City pages fill only the active locale, so key on the rendered text.
                  <li key={`${index}-${localizeText(bullet, locale)}`}>{localizeText(bullet, locale)}</li>
                ))}
              </ul>
              <div className="service-architecture-overview-actions">
                <Link href="#quote" className="hero-cta">
                  {ar ? "ابدأ مشروعك" : "Start a Project"}
                  <CtaArrow tone="white" size="sm" />
                </Link>
                <Link
                  href={localizePath(cataloguePath(service.slug), locale)}
                  className="hero-cta-ghost"
                >
                  {localizeText(service.hero.catalogueCta, locale)}
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="service-architecture-overview-media">
              <Image
                src={displayImage}
                alt={localizeText(service.title, locale)}
                fill
                priority
                sizes="(max-width: 700px) 100vw, 38vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="service-showcase">
        <div className="site-container">
          <Reveal>
            <div className="service-showcase-header">
              <div className="service-showcase-header-copy">
                <p className="eyebrow">{localizeText(service.title, locale)}</p>
                <h2 className="display">{localizeText(service.showcase.title, locale)}</h2>
              </div>
              <Link
                href={localizePath(cataloguePath(service.slug), locale)}
                className="service-showcase-header-cta"
              >
                <span>{localizeText(service.hero.catalogueCta, locale)}</span>
                <CtaArrow size="sm" />
              </Link>
            </div>
          </Reveal>

          <div className="service-showcase-grid">
            {featured.map((entry, index) => (
              <Reveal
                key={entry.slug}
                delay={index * 0.04}
                className="service-showcase-item-reveal"
              >
                <Link
                  href={localizePath(
                    `${cataloguePath(service.slug)}/${entry.slug}`,
                    locale,
                  )}
                  className="service-showcase-card"
                >
                  <div className="service-showcase-card-media">
                    <Image
                      src={entry.image || service.image}
                      alt={localizeText(entry.showcaseItem.title, locale)}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <span>{localizeText(entry.category.title, locale)}</span>
                  </div>
                  <div className="service-showcase-card-header">
                    <span className="service-showcase-card-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="service-showcase-card-accent-dot"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="service-showcase-card-body">
                    <h3 className="service-showcase-card-title">
                      {localizeText(entry.showcaseItem.title, locale)}
                    </h3>
                    <p className="service-showcase-card-desc">
                      {localizeText(entry.showcaseItem.description, locale)}
                    </p>
                  </div>
                  <div className="service-showcase-card-footer">
                    <span className="service-showcase-card-link">
                      <span>{ar ? "عرض التفاصيل" : "View details"}</span>
                      <CtaArrow size="sm" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal
              delay={featured.length * 0.04}
              className="service-showcase-item-reveal"
            >
              <Link
                href={localizePath(cataloguePath(service.slug), locale)}
                className="service-showcase-card service-showcase-card-featured"
              >
                <div className="service-showcase-card-header">
                  <span className="service-showcase-badge">
                    {ar ? "الكتالوج الكامل" : "Full Catalogue"}
                  </span>
                  {totalCatalogueItems > 0 ? (
                    <span className="service-showcase-count-pill">
                      +{totalCatalogueItems} {ar ? "عنصراً" : "Capabilities"}
                    </span>
                  ) : null}
                </div>
                <div className="service-showcase-card-body">
                  <h3 className="service-showcase-card-title">
                    {localizeText(service.catalogue.title, locale)}
                  </h3>
                  <p className="service-showcase-card-desc">
                    {localizeText(service.catalogue.support, locale)}
                  </p>
                </div>
                <div className="service-showcase-card-footer">
                  <span className="service-showcase-cta-action">
                    <span>{localizeText(service.hero.catalogueCta, locale)}</span>
                    <CtaArrow tone="cyan" size="sm" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="service-benefits">
        <div className="site-container">
          <Reveal>
            <div className="section-head">
              <p className="eyebrow">{ar ? "المزايا" : "Benefits"}</p>
              <h2 className="display">{ar ? "ما تحصل عليه" : "What you get"}</h2>
            </div>
          </Reveal>
          <div className="service-benefits-grid">
            {service.benefits.map((entry, index) => (
              <Reveal key={entry.en} delay={index * 0.04}>
                <article
                  className={`service-benefit-card${index === 0 ? " is-featured" : ""}`}
                >
                  <div className="service-benefit-card-top">
                    <span
                      className="service-benefit-card-number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="service-benefit-card-check"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 20 20" fill="none">
                        <path
                          d="M4 10.5l4 4L16 6.5"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                  <h3 className="service-benefit-card-text">
                    {localizeText(entry, locale)}
                  </h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="service-why-blueprint">
        <div className="site-container">
          <Reveal>
            <div className="service-why-blueprint-head">
              <p className="eyebrow eyebrow-on-dark">{ar ? "لماذا CPS" : "Why CPS"}</p>
              <h2 className="display display-on-dark">
                {localizeText(service.why.headline, locale)}
              </h2>
              <p className="service-why-blueprint-support">
                {localizeText(service.why.support, locale)}
              </p>
            </div>
          </Reveal>

          <div className="service-why-blueprint-grid">
            {service.why.items.map((entry, index) => (
              <Reveal key={entry.en} delay={index * 0.04}>
                <article className="service-why-blueprint-card">
                  <div className="service-why-blueprint-card-top">
                    <span
                      className="service-why-blueprint-card-number"
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div
                      className="service-why-blueprint-card-icon"
                      aria-hidden="true"
                    >
                      {index === 0 ? (
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M3 21h18M5 21V7l7-4 7 4v14M9 10h2v4H9v-4zm6 0h2v4h-2v-4z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : index === 1 ? (
                        <svg viewBox="0 0 24 24" fill="none">
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M12 3v4M12 17v4M3 12h4M17 12h4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : index === 2 ? (
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path
                            d="M8 4v5M12 4v3M16 4v5M4 13h16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="service-why-blueprint-card-text">
                    {localizeText(entry, locale)}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline
        eyebrow={ar ? "كيف نعمل" : "How We Work"}
        title={ar ? "من الموجز إلى التسليم" : "From brief to handover"}
        support={
          ar
            ? "خمس خطوات ثابتة نتّبعها في كل مشروع، أيّاً كانت الخدمة."
            : "The same five-step process behind every project, whatever the service."
        }
        steps={sharedProcess.map((step) => ({
          title: localizeText(step.title, locale),
          description: localizeText(step.description, locale),
        }))}
      />

      <section className="service-capabilities-link">
        <div className="site-container">
          <div>
            <p className="eyebrow">{ar ? "كيف ننفّذ" : "How We Build"}</p>
            <h2 className="display">
              {ar
                ? "كل مشروع يُنفَّذ في مصنع واحد."
                : "Every project is backed by one production floor."}
            </h2>
          </div>
          <Link
            href={localizePath("/production-capabilities", locale)}
            className="btn-secondary"
          >
            {ar ? "تعرّف على قدرات الإنتاج" : "See Production Capabilities"}
          </Link>
        </div>
      </section>

      <section className="service-industries">
        <div className="site-container">
          <div className="about-industries-shell service-industries-shell">
            <div className="about-industries-intro service-industries-intro">
              <Image
                src={displayImage}
                alt={
                  ar
                    ? `مشاريع ${localizeText(service.title, locale)} لمختلف القطاعات`
                    : `${localizeText(service.title, locale)} projects across industries`
                }
                fill
                sizes="(max-width: 899px) 100vw, 38vw"
                className="object-cover"
              />

              <Reveal className="about-industries-copy">
                <p className="eyebrow eyebrow-on-dark">
                  {ar ? "القطاعات" : "Industries"}
                </p>
                <h2 className="about-industries-title">
                  {industryTitle
                    ? ar
                      ? industryTitle.ar
                      : industryTitle.en
                    : ar
                      ? `القطاعات التي نخدمها في ${localizeText(service.title, locale)}`
                      : `Sectors we build ${localizeText(service.title, locale).toLowerCase()} for`}
                </h2>
                <p className="about-industries-support">
                  {ar
                    ? "خبرة تصنيع تراعي معايير كل قطاع ومتطلبات مساحاته."
                    : "Tailored fabrication expertise engineered to meet specific industry standards and footprints."}
                </p>
                <Link
                  href={`${localizePath("/our-work", locale)}?service=${encodeURIComponent(service.slug)}#work-filters`}
                  className="about-industries-link"
                >
                  <span>{ar ? "شاهد مشاريع القطاعات" : "Explore industry work"}</span>
                  <CtaArrow size="sm" />
                </Link>
              </Reveal>

              <div className="about-industries-count">
                <strong>{service.industries.length}</strong>
                <span>{ar ? "قطاعات نخدمها" : "sectors served"}</span>
              </div>
            </div>

            <div
              className="about-industries-list service-industries-list"
              role="list"
            >
              {service.industries.map((entry, index) => (
                <Reveal key={entry.en} delay={index * 0.035}>
                  <Link
                    href={localizePath(
                      `/our-work?service=${service.slug}&industry=${industrySlug(entry)}#work-filters`,
                      locale,
                    )}
                    className="about-industries-item"
                    role="listitem"
                  >
                    <span className="about-industries-item-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3>{localizeText(entry, locale)}</h3>
                    <span className="about-industries-item-mark" aria-hidden="true" />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {filteredProjects.length ? <section className="service-projects">
        <div className="site-container">
          <Reveal>
            <div className="service-projects-header">
              <div className="service-projects-header-copy">
                <p className="eyebrow">{ar ? "أعمالنا" : "Our Work"}</p>
                <h2 className="display">
                  {localizeText(projectTitle, locale)}
                </h2>
              </div>
              <Link
                href={localizePath(allProjectsHref, locale)}
                className="service-projects-header-cta"
              >
                <span>{localizeText(projectCta, locale)}</span>
                <CtaArrow size="sm" />
              </Link>
            </div>
          </Reveal>

          <div className="service-projects-grid">
              {filteredProjects.map((project, index) => (
                <Reveal key={project.slug} delay={index * 0.05}>
                  <Link
                    href={localizePath(`/our-work/${project.slug}`, locale)}
                    className="service-project-card"
                  >
                    <div className="service-project-card-media">
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="service-project-card-shade" />
                    </div>
                    <div className="service-project-card-content">
                      {project.category ? (
                        <span className="service-project-card-tag">
                          {project.category}
                        </span>
                      ) : null}
                      <h3 className="service-project-card-title">{project.title}</h3>
                      <span className="service-project-card-action">
                        <span>{ar ? "عرض دراسة الحالة" : "View Case Study"}</span>
                        <CtaArrow tone="cyan" size="sm" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section> : null}

      <FaqSection
        eyebrow="FAQ"
        title={
          ar
            ? `أسئلة عن ${localizeText(service.title, locale)}`
            : `Questions about ${localizeText(service.title, locale)}`
        }
        support={
          ar
            ? "إجابات واضحة عن المدد الزمنية ونطاق العمل والتنفيذ قبل أن تبدأ."
            : "Straight answers on timelines, scope, and delivery — before you start."
        }
        items={resolvedFaq}
        className="service-faq"
      />

      <section id="quote" className="service-quote section-pad scroll-mt-24">
        <div className="site-container service-quote-grid">
          <div className="brief-form-intro">
            <p className="eyebrow">{quoteForm.eyebrow}</p>
            <h2 className="display">{quoteForm.title}</h2>
            <p>{quoteForm.support}</p>
          </div>
          <div className="brief-form-shell">
            <Suspense fallback={<div className="quote-form-loading" />}>
              <QuoteForm
                locale={locale}
                copy={quoteForm}
                options={catalogueOptions}
                contextLabel={`${localizeText(service.title, locale)}${marketNameOverride ? ` — ${marketNameOverride}` : ""} (${service.slug})`}
                requestType={
                  service.slug === "installation-project-delivery"
                    ? "service-add-on"
                    : "quote"
                }
              />
            </Suspense>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="service-related-blueprint">
          <div className="site-container">
            <Reveal>
              <div className="service-related-head">
                <p className="eyebrow">{ar ? "خدمات ذات صلة" : "Related Services"}</p>
                <h2 className="display">{ar ? "أكمل مشروعك" : "Complete the build"}</h2>
                <p className="service-related-lead">
                  {ar
                    ? "خدمات تكمّل مشروعك وتحافظ على انسجام التصميم والتنفيذ."
                    : "Integrated capabilities to complement your space with unified fabrication standards."}
                </p>
              </div>
            </Reveal>
            <div className="service-related-blueprint-grid">
              {related.map((entry, index) => (
                <Reveal key={entry.slug} delay={index * 0.04}>
                  <Link
                    href={localizePath(
                      locationSlug
                        ? locationServicePath(entry.slug, locationSlug)
                        : servicePath(entry.slug),
                      locale,
                    )}
                    className="service-related-card"
                  >
                    <div className="service-related-card-media">
                      <Image
                        src={entry.image}
                        alt=""
                        fill
                        sizes="(max-width: 700px) 100vw, 33vw"
                        className="object-cover"
                      />
                      <div className="service-related-card-shade" />
                    </div>
                    <div className="service-related-card-content">
                      <span className="service-related-card-tag">
                        {ar ? "خدمة مكمّلة" : "Complementary"}
                      </span>
                      <h3 className="service-related-card-title">
                        {localizeText(entry.title, locale)}
                      </h3>
                      <span className="service-related-card-action">
                        <span>{ar ? "استكشف الخدمة" : "Explore Service"}</span>
                        <CtaArrow size="sm" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ProjectLaunchSection
        locale={locale}
        eyebrow={projectLaunch.eyebrow}
        title={projectLaunch.title}
        support={projectLaunch.support}
        ctaLabel={projectLaunch.ctaLabel}
      />
    </>
  );
}
