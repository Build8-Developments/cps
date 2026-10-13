import Image from "next/image";
import Link from "next/link";
import type { FooterConfig, FooterSocial } from "@/content/footer";
import { localizePath, type Locale } from "@/lib/i18n";
import { getSiteConfig, getWhatsAppUrl } from "@/lib/site-config";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { FooterServiceAreas, type AreaRegion } from "@/components/layout/footer-service-areas";
import { SocialIcon } from "@/components/ui/social-icon";

type FooterColumnLink = { label: string; href: string };

type SiteFooterProps = {
  locale: Locale;
  footer: FooterConfig;
  serviceLinks: FooterColumnLink[];
  workLinks: FooterColumnLink[];
  areaServices: { slug: string; label: string; href: string }[];
  areaRegions: AreaRegion[];
}

function socialLabel(link: FooterSocial) {
  return link.label || link.platform;
}

function FooterNavColumn({
  locale,
  title,
  links,
  maxLinks,
  viewAllHref,
  viewAllLabel,
  className = "",
}: {
  locale: Locale;
  title: string;
  links: FooterColumnLink[];
  maxLinks?: number;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}) {
  const visible = maxLinks ? links.slice(0, maxLinks) : links;
  const showViewAll = Boolean(viewAllHref && viewAllLabel);

  return (
    <nav className={`footer-col ${className}`.trim()} aria-label={title}>
      <h3 className="footer-col-title">{title}</h3>
      <ul className="footer-link-list">
        {visible.map((link) => (
          <li key={link.href + link.label}>
            <Link href={localizePath(link.href, locale)} className="footer-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {showViewAll && viewAllHref && viewAllLabel ? (
        <Link href={localizePath(viewAllHref, locale)} className="footer-view-all">
          {viewAllLabel}
        </Link>
      ) : null}
    </nav>
  );
}

export function SiteFooter({
  locale,
  footer,
  serviceLinks,
  workLinks,
  areaServices,
  areaRegions,
}: SiteFooterProps) {
  const config = getSiteConfig();
  const year = new Date().getFullYear();
  const whatsappHref = getWhatsAppUrl();

  return (
    <footer className="site-footer">
      <div className="site-container footer-main">
        <div className="footer-brand">
          <div className="footer-brand-copy">
            <Link href={localizePath("/", locale)} className="footer-logo" aria-label={config.name}>
              <Image
                src={footer.logo}
                alt={footer.logoAlt}
                width={360}
                height={128}
                className="footer-logo-image"
              />
            </Link>
          </div>
          <div className="footer-brand-actions">
            <Link href={localizePath(footer.cta.href, locale)} className="footer-cta">
              <span>{footer.cta.label}</span>
              <CtaArrow size="md" />
            </Link>
            {footer.socialLinks.length ? (
              <ul className="footer-social">
                {footer.socialLinks.map((link) => (
                  <li key={link.platform + link.url}>
                    <a
                      href={link.url}
                      className="footer-social-link"
                      target="_blank"
                      rel="noreferrer"
                      aria-label={socialLabel(link)}
                      title={socialLabel(link)}
                    >
                      <SocialIcon platform={link.platform} className="footer-social-icon" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="footer-menu">
          <FooterNavColumn
            locale={locale}
            title={footer.companyLinksTitle}
            links={footer.companyLinks}
          />

          {footer.showServices && serviceLinks.length ? (
            <FooterNavColumn
              locale={locale}
              title={footer.servicesTitle}
              links={serviceLinks}
              className="footer-col-services"
            />
          ) : null}

          {footer.showWork && workLinks.length ? (
            <FooterNavColumn
              locale={locale}
              title={footer.workTitle}
              links={workLinks}
            />
          ) : null}

          <section className="footer-col" aria-label={footer.contactTitle}>
            <h3 className="footer-col-title">{footer.contactTitle}</h3>
            <div className="footer-contact">
              {footer.officeAddress ? (
                <p className="footer-contact-block">{footer.officeAddress}</p>
              ) : null}
              {footer.phoneDisplay ? (
                <a href={`tel:${footer.phoneHref}`} className="footer-link" dir="ltr">
                  {footer.phoneDisplay}
                </a>
              ) : null}
              {footer.email ? (
                <a href={`mailto:${footer.email}`} className="footer-link">
                  {footer.email}
                </a>
              ) : null}
              <a href={whatsappHref} className="footer-link" target="_blank" rel="noreferrer">
                {footer.whatsappLabel}
              </a>
            </div>
          </section>
        </div>

        {footer.showAreas ? (
          <FooterServiceAreas
            locale={locale}
            title={footer.areasTitle}
            support={footer.areasSupport}
            allCitiesLabel={footer.areasAllLabel}
            searchPlaceholder={footer.areasSearchPlaceholder}
            emptyLabel={footer.areasEmpty}
            contactLabel={footer.contactTitle}
            servicePageLabel={footer.areasServiceLink}
            services={areaServices}
            regions={areaRegions}
          />
        ) : null}
      </div>

      <div className="footer-closing-line">
        <div className="site-container">
          <p>{footer.description}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="site-container footer-bottom-inner">
          <p>
            © {year} {config.legalName || config.name}. {footer.rights}
          </p>
          <nav className="footer-bottom-links" aria-label={locale === "ar" ? "السياسات والشروط" : "Legal"}>
            {footer.bottomLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={
                  link.href.endsWith(".xml")
                    ? link.href
                    : localizePath(link.href, locale)
                }
                className="footer-bottom-link"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
