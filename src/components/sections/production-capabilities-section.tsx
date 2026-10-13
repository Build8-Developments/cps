import Image from "next/image";
import Link from "next/link";
import { CtaArrow } from "@/components/motion/cta-arrow";
import { Reveal } from "@/components/motion/reveal";
import { media } from "@/content/media";
import { localizePath, type Locale } from "@/lib/i18n";
import { getSiteConfig } from "@/lib/site-config";

export const productionCapabilities = [
  ["Carpentry & Joinery", "النجارة والأعمال الخشبية"],
  ["Metal Works", "الأعمال المعدنية"],
  ["Acrylic Fabrication", "تصنيع الأكريليك"],
  ["CNC Routing & Cutting", "التفريز والقطع بتقنية CNC"],
  ["Laser Cutting", "القطع بالليزر"],
  ["Large-Format Printing", "الطباعة كبيرة الحجم"],
  ["Painting & Finishing", "الدهان والتشطيب"],
  ["Assembly & Pre-Build", "التجميع والتركيب التجريبي"],
  ["Signage Production", "إنتاج اللافتات"],
  ["On-Site Installation", "التركيب في الموقع"],
] as const;

/** Blueprint home highlight: five grouped bullets (not the full 10-discipline list). */
export const productionCapabilitiesHighlight = [
  ["Carpentry, joinery & CNC wood cutting", "النجارة وأعمال الخشب والقطع بتقنية CNC"],
  ["Metal fabrication, laser cutting & powder coating", "تصنيع المعادن والقطع بالليزر والطلاء بالمسحوق"],
  ["Acrylic fabrication & signage production", "تصنيع الأكريليك وإنتاج اللافتات"],
  ["Large-format printing & finishing", "الطباعة كبيرة الحجم والتشطيب"],
  ["Assembly, installation & nationwide delivery", "التجميع والتركيب والتسليم في جميع مناطق المملكة"],
] as const;

export function ProductionCapabilitiesSection({
  locale,
  compact = false,
  standalone = false,
  image,
}: {
  locale: Locale;
  compact?: boolean;
  standalone?: boolean;
  image?: string;
}) {
  const ar = locale === "ar";
  const items = compact ? productionCapabilitiesHighlight : productionCapabilities;
  const productionImage = image || getSiteConfig().productionImage || media.about.studio;

  return (
    <section
      className={`production-capabilities${compact ? " production-capabilities--compact" : ""}`}
    >
      <div className="site-container production-capabilities-grid">
        <Reveal className="production-capabilities-media">
          <Image
            src={productionImage}
            alt={
              ar
                ? "أعمال التصنيع داخل منشأة CPS"
                : "Fabrication and craft inside the CPS production facility"
            }
            fill
            sizes="(max-width: 900px) 100vw, 52vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal delay={0.08} className="production-capabilities-copy">
          <p className="eyebrow">{ar ? "كيف ننفّذ" : "How We Build"}</p>
          <h2 className="display display-on-dark">
            {standalone
              ? ar
                ? "عشرة تخصصات في مصنع واحد"
                : "Ten disciplines. One production floor."
              : ar
                ? "جودة ما نسلّمه تبدأ من طريقة تصنيعه."
                : "What we deliver is supported by how we build it."}
          </h2>
          <p>
            {standalone
              ? ar
                ? "قدرات إنتاجية في مصنعنا تخدم جميع خدماتنا، وتضبط الجودة من المادة الخام حتى التركيب النهائي."
                : "The shared in-house capabilities behind every service, from raw material to final installation."
              : ar
                ? "كل مشروع يُنفَّذ في منشأة الإنتاج نفسها."
                : "Every project draws on the same in-house production floor."}
          </p>
          <ul className={compact ? "production-capabilities-list--highlight" : undefined}>
            {items.map(([en, arabic]) => (
              <li key={en}>{ar ? arabic : en}</li>
            ))}
          </ul>
          {!standalone ? (
            <Link
              href={localizePath("/production-capabilities", locale)}
              className="production-capabilities-cta"
            >
              {ar ? "تعرّف على قدرات الإنتاج" : "See Our Production Capabilities"}
              <CtaArrow size="sm" />
            </Link>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
