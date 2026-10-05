import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content/dictionaries.local";
import { media } from "@/content/media";
import { localizePath, type Locale } from "@/lib/i18n";
import { getSiteConfig } from "@/lib/site-config";
import { HeroCityRotator } from "@/components/motion/hero-city-rotator";
import { CtaArrow } from "@/components/motion/cta-arrow";

type HomeHeroProps = {
  locale: Locale;
  content: Dictionary["hero"];
};

const GALLERY_COLUMNS = 3;

/** One drifting column — the shots render twice so the loop has no seam. */
function HeroGalleryColumn({ images }: { images: string[] }) {
  return (
    <div className="home-hero-column">
      <div className="home-hero-track">
        {[...images, ...images].map((src, index) => (
          <div key={`${index}-${src}`} className="home-hero-shot">
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 1023px) 36vw, 20vw"
              loading="eager"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function headlineLines(headline: string): string[] {
  if (headline.includes("\n")) {
    return headline.split("\n").map((line) => line.trim()).filter(Boolean);
  }

  const comma = headline.lastIndexOf(", ");
  if (comma !== -1) {
    return [headline.slice(0, comma + 1), headline.slice(comma + 2).trim()];
  }

  const dash = headline.lastIndexOf(" — ");
  if (dash !== -1) {
    return [`${headline.slice(0, dash)} —`, headline.slice(dash + 3).trim()];
  }

  return [headline];
}

export function HomeHero({ locale, content }: HomeHeroProps) {
  const lines = headlineLines(content.headline);
  // CMS images lead; local photography fills the wall. Each column needs
  // enough unique shots that half its track is taller than the hero.
  const cmsImages = (getSiteConfig().homeFloatingImages ?? []).filter(Boolean);
  const images = [...new Set([...cmsImages, ...media.homeHeroGallery])].slice(
    0,
    media.homeHeroGallery.length,
  );
  const columns = Array.from({ length: GALLERY_COLUMNS }, (_, column) =>
    images.filter((_, index) => index % GALLERY_COLUMNS === column),
  );

  return (
    <section className="home-hero">
      <div className="home-hero-gallery" aria-hidden="true">
        <div className="home-hero-tilt">
          {columns.map((column, index) => (
            <HeroGalleryColumn key={index} images={column} />
          ))}
        </div>
      </div>

      <div className="site-container home-hero-inner">
        <div className="home-hero-copy">
          <HeroCityRotator locale={locale} template={content.badge} />
          <h1 className="home-hero-headline">
            {lines.map((line, index) => (
              <span key={`${index}-${line}`} className="home-hero-headline-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="home-hero-support">{content.support}</p>
          <div className="home-hero-actions">
            <Link href={localizePath("/contact", locale)} className="hero-cta">
              {content.primaryCta}
              <CtaArrow tone="white" size="lg" />
            </Link>
            <Link href={localizePath("/our-work", locale)} className="hero-cta-ghost">
              {content.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
