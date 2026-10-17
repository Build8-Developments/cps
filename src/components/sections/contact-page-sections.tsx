import { ContactForm } from "@/components/forms/contact-form";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { SocialIcon } from "@/components/ui/social-icon";
import { getContactFormCopy } from "@/content/contact-form.copy";
import type { Locale } from "@/lib/i18n";
import {
  CPS_MAPS_EMBED_URL,
  CPS_MAPS_URL,
  formatSiteAddress,
  getMailtoUrl,
  getWhatsAppUrl,
  type SiteConfigShape,
} from "@/lib/site-config";

type ContactInfoCopy = {
  emailLabel: string;
  phoneLabel: string;
  whatsappLabel: string;
  addressLabel: string;
  socialLabel: string;
};

type ContactMapCopy = {
  eyebrow: string;
  title: string;
  support: string;
  openMaps: string;
  hqLabel: string;
};

export type ContactPageCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  businessHours?: string;
  info: ContactInfoCopy;
  map: ContactMapCopy;
};

type ContactPageSectionsProps = {
  locale: Locale;
  copy: ContactPageCopy;
  config: SiteConfigShape;
};

function mapsOpenUrl(config: SiteConfigShape) {
  const configured = config.googleMapsUrl?.trim();
  if (configured && !configured.includes("/maps/embed")) return configured;
  return CPS_MAPS_URL;
}

function mapsEmbedUrl(config: SiteConfigShape) {
  const configured = config.googleMapsUrl?.trim();
  if (configured?.includes("/maps/embed")) return configured;
  return CPS_MAPS_EMBED_URL;
}

export function ContactPageSections({
  locale,
  copy,
  config,
}: ContactPageSectionsProps) {
  const isArabic = locale === "ar";
  const embedUrl = mapsEmbedUrl(config);
  const formCopy = getContactFormCopy(locale);

  return (
    <>
      <section id="contact-brief" className="contact-main scroll-mt-24">
        <div className="site-container contact-main-grid">
          <Reveal>
            <div className="contact-info">
              <h2 className="contact-info-heading">
                {isArabic ? "بيانات التواصل" : "Contact details"}
              </h2>

              <ul className="contact-info-list">
                <li>
                  <span className="contact-info-label">{copy.info.emailLabel}</span>
                  <a href={`mailto:${config.email}`}>{config.email}</a>
                </li>
                <li>
                  <span className="contact-info-label">{copy.info.phoneLabel}</span>
                  <a href={`tel:${config.phone}`} dir="ltr">
                    {config.phoneDisplay}
                  </a>
                </li>
                <li>
                  <span className="contact-info-label">{copy.info.whatsappLabel}</span>
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    {isArabic ? "راسلنا على واتساب" : "Message on WhatsApp"}
                  </a>
                </li>
                <li>
                  <span className="contact-info-label">{copy.info.addressLabel}</span>
                  <span>{formatSiteAddress(locale)}</span>
                </li>
                {copy.businessHours ? (
                  <li>
                    <span className="contact-info-label">
                      {isArabic ? "ساعات العمل" : "Business hours"}
                    </span>
                    <span>{copy.businessHours}</span>
                  </li>
                ) : null}
              </ul>

              <div className="contact-info-social">
                <span className="contact-info-label">{copy.info.socialLabel}</span>
                <div className="contact-info-social-links">
                  <a
                    href={config.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-social-link"
                    aria-label="Instagram"
                  >
                    <SocialIcon platform="instagram" />
                  </a>
                  <a
                    href={config.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-social-link"
                    aria-label="LinkedIn"
                  >
                    <SocialIcon platform="linkedin" />
                  </a>
                  <a
                    href={config.social.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-social-link"
                    aria-label="X"
                  >
                    <SocialIcon platform="x" />
                  </a>
                </div>
              </div>

              <a
                href={getMailtoUrl({ subject: "Project inquiry — CPS" })}
                className="contact-info-quick"
              >
                {isArabic ? "أو راسلنا مباشرة عبر البريد الإلكتروني" : "Or email us directly"}
                <CtaArrow size="sm" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="brief-form-shell contact-brief-shell">
              <div className="quote-form-intro">
                <p className="eyebrow">{formCopy.eyebrow}</p>
                <h2 className="display">{formCopy.title}</h2>
                <p className="lede">{formCopy.support}</p>
              </div>
              <ContactForm locale={locale} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="contact-map">
        <div className="site-container">
          <Reveal>
            <div className="contact-map-head">
              <p className="eyebrow">{copy.map.eyebrow}</p>
              <h2 className="contact-map-title">{copy.map.title}</h2>
              <p className="contact-map-support">{copy.map.support}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="contact-map-embed">
              <iframe
                src={embedUrl}
                title={
                  isArabic
                    ? `موقع ${config.name} على الخريطة`
                    : `${config.name} on Google Maps`
                }
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="contact-map-foot">
              <p className="contact-map-address">
                <span>{copy.map.hqLabel}</span>
                {formatSiteAddress(locale)}
              </p>
              <a
                href={mapsOpenUrl(config)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-open"
              >
                {copy.map.openMaps}
                <CtaArrow size="sm" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
