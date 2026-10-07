import type { Locale } from "@/lib/i18n";

export type ClientLogo = {
  name: string;
  /** Desktop artwork (136×48 in the supplied set). */
  src: string;
  /** Phone artwork (120×44 in the supplied set); falls back to `src` when absent. */
  srcMobile?: string;
};

const cloudinary = "https://res.cloudinary.com/jivfgunl/image/upload";

/**
 * Client-supplied logo set from the `CPS Website/logos` Cloudinary folders
 * (`Desktop` → `src`, `Mobile` → `srcMobile`), in the client's numbered order.
 */
export const clientLogos: ClientLogo[] = [
  { name: "stc", src: `${cloudinary}/v1791323214/1STCCC.png`, srcMobile: `${cloudinary}/v1791323235/1STCS.png` },
  { name: "Hikma", src: `${cloudinary}/v1791323215/2HIKM.png`, srcMobile: `${cloudinary}/v1791323237/2HIK..png` },
  { name: "Almarai", src: `${cloudinary}/v1791323217/3ALMA.png`, srcMobile: `${cloudinary}/v1791323239/3AL..png` },
  { name: "SAB", src: `${cloudinary}/v1791323219/4ONESAB.png`, srcMobile: `${cloudinary}/v1791323241/4SAB..png` },
  { name: "Riyad Bank", src: `${cloudinary}/v1791323222/5BANKRIY.png`, srcMobile: `${cloudinary}/v1791323243/5RIYA..png` },
  { name: "mobily", src: `${cloudinary}/v1791323223/6MOBI.png`, srcMobile: `${cloudinary}/v1791323245/6MOB..png` },
  { name: "Aramco", src: `${cloudinary}/v1791323225/7SAARAMCO.png`, srcMobile: `${cloudinary}/v1791323247/7ARAM..png` },
  { name: "NEOM", src: `${cloudinary}/v1791323227/8NEOM.png`, srcMobile: `${cloudinary}/v1791323249/8NEO..png` },
  { name: "SNB", src: `${cloudinary}/v1791323229/9SNBA.png`, srcMobile: `${cloudinary}/v1791323250/9SNB..png` },
  { name: "Sirar by STC", src: `${cloudinary}/v1791323210/10SIRA.png`, srcMobile: `${cloudinary}/v1791323231/10SIR..png` },
  { name: "Al Hilal", src: `${cloudinary}/v1791323211/11HILAL.png`, srcMobile: `${cloudinary}/v1791323233/11HILAL..png` },
  // Not part of the supplied set yet, so it keeps the local wordmark.
  { name: "Ajlan & Bros", src: "/clients/ajlan-bros.svg" },
];

/** Blueprint Trusted By list (confirm with client before publish). */
export const blueprintClientLogos: ClientLogo[] = [
  "Ajlan & Bros",
  "SNB",
  "SAB",
  "Sirar by STC",
  "Al Hilal",
]
  .map((name) => clientLogos.find((logo) => logo.name === name))
  .filter((logo): logo is ClientLogo => Boolean(logo));

export function logosEyebrow(locale: Locale) {
  return locale === "ar" ? "عملاؤنا" : "Trusted by";
}

export function logosSupport(locale: Locale) {
  return locale === "ar"
    ? "نخبة من الجهات التي نفّذت CPS مشاريعها."
    : "A selection of clients CPS has produced for.";
}
