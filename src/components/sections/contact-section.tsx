import type { Dictionary } from "@/content/dictionaries.local";
import type { Locale } from "@/lib/i18n";
import {
  formatSiteAddress,
  getMailtoUrl,
  getSiteConfig,
  getWhatsAppUrl,
} from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { CtaArrow } from "@/components/motion/cta-arrow";

type ContactSectionProps = {
  locale: Locale;
  content: Dictionary["contact"];
};

export function ContactSection({ locale, content }: ContactSectionProps) {
  const config = getSiteConfig();
  const placeLabel = locale === "ar" ? "المقر" : "Studio";
  const emailLabel = locale === "ar" ? "البريد الإلكتروني" : "Email";
  const phoneLabel = locale === "ar" ? "الهاتف" : "Phone";

  return (
    <section id="contact" className="contact-section scroll-mt-24">
      <div className="site-container">
        <Reveal>
          <div className="contact-panel">
            <div className="contact-copy">
              <p className="eyebrow eyebrow-on-dark">{content.eyebrow}</p>
              <h2 className="display display-on-dark">{content.title}</h2>
              <p className="contact-support">{content.support}</p>
              <div className="contact-actions">
                <a
                  href={getMailtoUrl({ subject: "Quote request — CPS" })}
                  className="contact-cta is-primary"
                >
                  <span>{content.emailLabel}</span>
                  <CtaArrow size="md" />
                </a>
                <a
                  href={getWhatsAppUrl()}
                  className="contact-cta is-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.whatsappLabel}
                </a>
              </div>
            </div>

            <div className="contact-aside">
              <div className="contact-cards">
                <a href={`mailto:${config.email}`} className="contact-card">
                  <span className="contact-card-label">{emailLabel}</span>
                  <span className="contact-card-value">{config.email}</span>
                </a>
                <a href={`tel:${config.phone}`} className="contact-card" dir="ltr">
                  <span className="contact-card-label">{phoneLabel}</span>
                  <span className="contact-card-value">{config.phoneDisplay}</span>
                </a>
                <div className="contact-card">
                  <span className="contact-card-label">{placeLabel}</span>
                  <span className="contact-card-value">{formatSiteAddress(locale)}</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
