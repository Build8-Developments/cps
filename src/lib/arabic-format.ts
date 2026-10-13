import type { Locale } from "@/lib/i18n";

type CountForms = {
  zero?: string;
  one: string;
  two: string;
  /** Plural used with 3–10, e.g. «صور». */
  few: string;
  /** Singular used with 11 and above, e.g. «صورة» / «عنصرًا». */
  many: string;
};

/** Arabic counted noun: 1 and 2 drop the numeral, 3–10 take the plural, 11+ the singular. */
export function arabicCount(count: number, forms: CountForms): string {
  if (count === 0 && forms.zero) return forms.zero;
  if (count === 1) return forms.one;
  if (count === 2) return forms.two;
  const tail = count % 100;
  return tail >= 3 && tail <= 10 ? `${count} ${forms.few}` : `${count} ${forms.many}`;
}

/** Project dimensions as stored ("6×6 m and 5×5 m") rendered for the locale, numbers untouched. */
export function localizeProjectSize(size: string | undefined, locale: Locale) {
  if (!size || locale !== "ar") return size;
  return size
    .replace(/(\d)\s*[×x]\s*(\d)/g, "$1 × $2")
    .replace(/\s+and\s+/g, " و")
    .replace(/\bsqm\b/g, "م²")
    .replace(/\bm\b/g, "م");
}

const MONTH_ONLY_EVENT =
  /^(?:January|February|March|April|May|June|July|August|September|October|November|December|يناير|فبراير|مارس|أبريل|مايو|يونيو|يوليو|أغسطس|سبتمبر|أكتوبر|نوفمبر|ديسمبر)\s+\d{4}$/;

/** True when a project's "event" holds only a month and year rather than an event name. */
export function isDateOnlyEvent(event: string | undefined) {
  return Boolean(event && MONTH_ONLY_EVENT.test(event.trim()));
}
