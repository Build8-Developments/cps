import { getSiteConfig } from "@/lib/site-config";
const LOGO_FALLBACK = "/logo.png";
const ICON_FALLBACK = "/icon.png";
const FAVICON_FALLBACK = "/favicon.ico";
const OG_FALLBACK =
  "https://res.cloudinary.com/jivfgunl/image/upload/c_fill,g_auto,w_1200,h_630,q_auto,f_auto/v1791383289/Exhibitions_booths.jpg";

export function getSiteLogo(): string {
  return getSiteConfig().logo || LOGO_FALLBACK;
}

export function getSiteIcon(): string {
  return getSiteConfig().icon || ICON_FALLBACK;
}

export function getSiteFavicon(): string {
  return getSiteConfig().favicon || FAVICON_FALLBACK;
}

export function getDefaultOgImage(): string {
  const config = getSiteConfig();
  return (
    config.defaultOgImage ||
    config.homeHero ||
    config.productionImage ||
    OG_FALLBACK
  );
}

export function getSiteHeroVideo(): string | undefined {
  const config = getSiteConfig();
  return config.homeHeroVideo || process.env.NEXT_PUBLIC_HERO_VIDEO_URL || undefined;
}

export function getSiteHeroPoster(): string | undefined {
  return getSiteConfig().homeHero || undefined;
}
