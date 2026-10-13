"use client";

import Link from "next/link";
import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { arabicCount } from "@/lib/arabic-format";
import { localizePath, type Locale } from "@/lib/i18n";
import { locationServicePath } from "@/lib/locations";
import "./footer-service-areas.css";

type AreaOption = { slug: string; label: string };
export type AreaRegion = { key: string; label: string; cities: AreaOption[] };

type FooterServiceAreasProps = {
  locale: Locale;
  title: string;
  support: string;
  allCitiesLabel: string;
  searchPlaceholder: string;
  emptyLabel: string;
  contactLabel: string;
  servicePageLabel: string;
  services: (AreaOption & { href: string })[];
  regions: AreaRegion[];
};

/** Loose match: ignores case, the Arabic article and common letter variants. */
function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[ً-ْـ]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/(^|\s)ال/g, "$1")
    .replace(/^al[\s-]?/, "")
    .replace(/[\s-]+/g, "");
}

function formatCityCount(count: number, total: number, locale: Locale) {
  if (!count) return locale === "ar" ? "لا توجد نتائج" : "No matches";
  if (locale === "en") {
    return count === total
      ? `${total} ${total === 1 ? "city" : "cities"}`
      : `${count} of ${total} cities`;
  }
  if (count !== total) return `${count} من ${total}`;
  return arabicCount(total, {
    one: "مدينة أو منطقة واحدة",
    two: "مدينتان أو منطقتان",
    few: "مدن ومناطق",
    many: "مدينة ومنطقة",
  });
}

/**
 * Service × city directory. Every service panel is rendered (inactive ones are
 * `hidden`) so all service-location links stay in the HTML for crawlers.
 */
export function FooterServiceAreas({
  locale,
  title,
  support,
  allCitiesLabel,
  searchPlaceholder,
  emptyLabel,
  contactLabel,
  servicePageLabel,
  services,
  regions,
}: FooterServiceAreasProps) {
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const total = useMemo(
    () => regions.reduce((sum, region) => sum + region.cities.length, 0),
    [regions],
  );
  const needle = normalize(query.trim());
  const matches = (city: AreaOption) =>
    !needle || normalize(city.label).includes(needle) || normalize(city.slug).includes(needle);
  const visibleCount = regions.reduce(
    (sum, region) => sum + region.cities.filter(matches).length,
    0,
  );

  if (!services.length || !total) return null;

  const isRtl = locale === "ar";
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextKeys = ["ArrowDown", isRtl ? "ArrowLeft" : "ArrowRight"];
    const prevKeys = ["ArrowUp", isRtl ? "ArrowRight" : "ArrowLeft"];
    let next: number | null = null;
    if (nextKeys.includes(event.key)) next = (index + 1) % services.length;
    if (prevKeys.includes(event.key)) next = (index - 1 + services.length) % services.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = services.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="footer-areas" aria-labelledby={`${baseId}-title`}>
      <header className="footer-areas-head">
        <div className="footer-areas-intro">
          <p className="footer-areas-eyebrow">{title}</p>
          <h3 id={`${baseId}-title`} className="footer-areas-title">
            {support}
          </h3>
        </div>
        <label className="footer-areas-search">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="footer-areas-search-icon">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="m16 16 4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span className="sr-only">{searchPlaceholder}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="footer-areas-search-input"
            autoComplete="off"
          />
        </label>
      </header>

      <div className="footer-areas-body">
        <div
          className="footer-areas-tabs"
          role="tablist"
          aria-label={title}
          aria-orientation="vertical"
        >
          {services.map((service, index) => (
            <button
              key={service.slug}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${service.slug}`}
              aria-selected={index === active}
              aria-controls={`${baseId}-panel-${service.slug}`}
              tabIndex={index === active ? 0 : -1}
              className="footer-areas-tab"
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              <span className="footer-areas-tab-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="footer-areas-tab-label">{service.label}</span>
              <span className="footer-areas-tab-arrow" aria-hidden="true">
                {isRtl ? "←" : "→"}
              </span>
            </button>
          ))}
        </div>

        {services.map((service, index) => (
          <div
            key={service.slug}
            role="tabpanel"
            id={`${baseId}-panel-${service.slug}`}
            aria-labelledby={`${baseId}-tab-${service.slug}`}
            hidden={index !== active}
            className="footer-areas-panel"
          >
            <div className="footer-areas-panel-head">
              <div>
                <h4 className="footer-areas-panel-title">{service.label}</h4>
                <p className="footer-areas-count" aria-live="polite">
                  <span className="footer-areas-count-dot" aria-hidden="true" />
                  {formatCityCount(visibleCount, total, locale)}
                </p>
              </div>
              <Link href={localizePath(service.href, locale)} className="footer-areas-service-link">
                {servicePageLabel}
                <span aria-hidden="true">{isRtl ? "←" : "→"}</span>
              </Link>
            </div>

            {visibleCount ? (
              <div className="footer-areas-regions">
                {regions.map((region) => {
                  const cities = region.cities.filter(matches);
                  return (
                    <div key={region.key} className="footer-areas-region" hidden={!cities.length}>
                      <p className="footer-areas-region-title">
                        {region.label}
                        <span className="footer-areas-region-count">{cities.length}</span>
                      </p>
                      <ul className="footer-areas-list">
                        {region.cities.map((city) => (
                          <li key={city.slug} hidden={!matches(city)}>
                            <Link
                              href={localizePath(locationServicePath(service.slug, city.slug), locale)}
                              className="footer-areas-link"
                              title={
                                isRtl
                                  ? `${service.label} في ${city.label}`
                                  : `${service.label} in ${city.label}`
                              }
                            >
                              <span>{city.label}</span>
                              <span className="footer-areas-link-arrow" aria-hidden="true">
                                {isRtl ? "←" : "→"}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="footer-areas-empty">
                <p>{emptyLabel}</p>
                <Link href={localizePath("/contact", locale)} className="footer-areas-service-link">
                  {contactLabel}
                  <span aria-hidden="true">{isRtl ? "←" : "→"}</span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      <Link href={localizePath("/locations", locale)} className="footer-view-all footer-areas-all">
        {allCitiesLabel}
      </Link>
    </section>
  );
}
