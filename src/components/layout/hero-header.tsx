"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Dictionary } from "@/content/dictionaries.local";
import { localizePath, switchLocalePath, type Locale } from "@/lib/i18n";

type HeroHeaderProps = {
  locale: Locale;
  nav: Dictionary["nav"];
};

function LangFlag({ locale }: { locale: Locale }) {
  const target = locale === "en" ? "ar" : "en";
  const flag = target === "ar" ? "/lang_switch/sa.png" : "/lang_switch/gb.png";
  const label = target === "ar" ? "العربية" : "English";

  return (
    <>
      <Image
        src={flag}
        alt=""
        width={22}
        height={15}
        className="hero-lang-flag"
        unoptimized
      />
      <span className="sr-only">{label}</span>
    </>
  );
}

export function HeroHeader({ locale, nav }: HeroHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${locale}`;

  return (
    <header className="hero-header">
      <div className="site-container hero-header-inner">
        <Link href={localizePath("/", locale)} className="hero-brand" aria-label="CPS">
          <Image
            src="/icon.png"
            alt=""
            width={32}
            height={32}
            priority
            className="hero-brand-icon"
          />
          <span className="hero-brand-text">CPS</span>
        </Link>

        <nav className="hero-nav" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary"}>
          {nav.items.map((item) => {
            const href = localizePath(item.href, locale);
            const active =
              pathname === href ||
              (item.href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={item.href}
                href={href}
                className={`hero-nav-link${active ? " is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hero-header-actions">
          <Link
            href={switchLocalePath(pathname, nav.langHrefLocale)}
            className="hero-lang"
            hrefLang={nav.langHrefLocale}
            aria-label={nav.langLabel}
            title={nav.langLabel}
          >
            <LangFlag locale={locale} />
          </Link>
          <Link href={localizePath("/contact", locale)} className="hero-header-cta">
            {nav.cta}
          </Link>
        </div>

        <div className="hero-header-mobile-tools">
          <Link
            href={switchLocalePath(pathname, nav.langHrefLocale)}
            className="hero-lang"
            hrefLang={nav.langHrefLocale}
            aria-label={nav.langLabel}
            title={nav.langLabel}
          >
            <LangFlag locale={locale} />
          </Link>
          <button
            type="button"
            className="hero-menu-toggle"
            aria-expanded={open}
            aria-controls="hero-mobile-nav"
            aria-label={
              locale === "ar"
                ? open ? "أغلق القائمة" : "افتح القائمة"
                : open ? "Close menu" : "Open menu"
            }
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 top-[7px] h-px bg-current transition ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-current transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="hero-mobile-nav" className="hero-mobile-nav">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.items.map((item) => (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className="hero-mobile-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={localizePath("/contact", locale)}
              className="hero-header-cta mt-2"
              onClick={() => setOpen(false)}
            >
              {nav.cta}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
