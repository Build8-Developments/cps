import Link from "next/link";
import { localizePath, type Locale } from "@/lib/i18n";
import {
  breadcrumbsJsonLd,
  JsonLd,
  type BreadcrumbItem,
} from "@/components/seo/json-ld";

type BreadcrumbsProps = {
  locale: Locale;
  items: BreadcrumbItem[];
  compactOnMobile?: boolean;
};

export function Breadcrumbs({ locale, items, compactOnMobile = false }: BreadcrumbsProps) {
  return (
    <>
      <JsonLd data={breadcrumbsJsonLd(items, locale)} />
      <nav
        aria-label={locale === "ar" ? "مسار التنقل" : "Breadcrumb"}
        className={`page-breadcrumbs${compactOnMobile ? " page-breadcrumbs--compact-mobile" : ""}`}
      >
        <div className="site-container">
          <ol className="page-breadcrumbs-list">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <li key={`${item.label}-${index}`} className="page-breadcrumbs-item">
                  {index > 0 ? (
                    <span className="page-breadcrumbs-sep" aria-hidden="true">
                      /
                    </span>
                  ) : null}
                  {item.href && !isLast ? (
                    <Link href={localizePath(item.href, locale)} className="page-breadcrumbs-link">
                      {item.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "page-breadcrumbs-current" : undefined}>
                      {item.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}
