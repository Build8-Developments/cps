import { ClientLogoImage } from "@/components/ui/client-logo";
import {
  logosEyebrow,
  logosSupport,
} from "@/content/clients";
import type { Locale } from "@/lib/i18n";
import { loadClients } from "@/sanity/load-collections";

type LogosSectionProps = {
  locale: Locale;
  /** Prefer Blueprint Trusted By names only (no supporting logos). */
  blueprintOnly?: boolean;
};

export async function LogosSection({
  locale,
  blueprintOnly = false,
}: LogosSectionProps) {
  const label = logosEyebrow(locale);
  const support = logosSupport(locale);
  const all = await loadClients(locale);
  const logos = blueprintOnly
    ? all.filter((logo) =>
        ["Ajlan & Bros", "SNB", "SAB", "Sirar by STC", "Al Hilal"].includes(
          logo.name,
        ),
      )
    : all;
  const items = logos.length ? logos : all;
  const track = [...items, ...items];

  return (
    <section className="logos-section" aria-label={label}>
      <div className="site-container">
        <p className="eyebrow logos-eyebrow">{label}</p>
        <p className="logos-support">{support}</p>
      </div>

      <div className="logos-marquee" role="presentation">
        <ul className="logos-track">
          {track.map((logo, index) => (
            <li
              key={`${logo.name}-${logo.src}-${index}`}
              className="logos-item"
              aria-hidden={index >= items.length}
            >
              <ClientLogoImage
                logo={logo}
                alt={index < items.length ? logo.name : ""}
                className="logos-image"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
