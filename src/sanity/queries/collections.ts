import type { Locale } from "@/lib/i18n";

const seoProjection = `{
  title,
  description,
  keywords,
  ogImage{ asset, alt },
  twitterTitle,
  twitterDescription,
  canonicalUrl,
  noIndex,
  robots,
  structuredDataType
}`;

const imageProjection = `{ asset, alt }`;

export const SERVICE_LOCATION_VARIANT_QUERY = `*[
  _type == "serviceLocation" &&
  language == $locale &&
  status != "archived" &&
  coalesce(locationSlug, location->slug.current) == $locationSlug &&
  coalesce(serviceSlug, service->slug.current) == $serviceSlug
][0] {
  title,
  eyebrow,
  lead,
  overview,
  "locationSlug": coalesce(locationSlug, location->slug.current),
  "serviceSlug": coalesce(serviceSlug, service->slug.current),
  hero${imageProjection},
  heroUrl,
  highlights[]{ title, description },
  faq[]{ question, answer },
  cta{ label, href },
  seo${seoProjection}
}`;

export const SERVICES_QUERY = `*[_type == "service" && language == $locale && status != "archived"] | order(order asc) {
  title,
  "slug": slug.current,
  excerpt,
  blueprintVersion,
  overview,
  overviewTitle,
  overviewBullets[]{ title, description },
  heroLead,
  secondaryCta{ label, serviceSlug },
  order,
  hero${imageProjection},
  heroUrl,
  cover{
    eyebrow,
    title,
    support,
    items[]{ title, description, image${imageProjection}, imageUrl, imageAlt, serviceSlug }
  },
  designs{
    eyebrow,
    title,
    support,
    cta{ label, href },
    items[]{ title, description, image${imageProjection}, imageUrl, imageAlt, serviceSlug }
  },
  why{
    eyebrow,
    title,
    support,
    items[]{ title, description }
  },
  benefits[]{ title, description },
  process[]{ title, description, image${imageProjection}, imageUrl, imageAlt },
  faq[]{ question, answer },
  cta{ label, href },
  seo${seoProjection}
}`;

export const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && language == $locale && slug.current == $slug && status != "archived"][0] {
  title,
  "slug": slug.current,
  excerpt,
  blueprintVersion,
  overview,
  overviewTitle,
  overviewBullets[]{ title, description },
  heroLead,
  secondaryCta{ label, serviceSlug },
  order,
  hero${imageProjection},
  heroUrl,
  cover{
    eyebrow,
    title,
    support,
    items[]{ title, description, image${imageProjection}, imageUrl, imageAlt, serviceSlug }
  },
  designs{
    eyebrow,
    title,
    support,
    cta{ label, href },
    items[]{ title, description, image${imageProjection}, imageUrl, imageAlt, serviceSlug }
  },
  why{
    eyebrow,
    title,
    support,
    items[]{ title, description }
  },
  benefits[]{ title, description },
  process[]{ title, description, image${imageProjection}, imageUrl, imageAlt },
  faq[]{ question, answer },
  cta{ label, href },
  seo${seoProjection}
}`;

export const BOOTH_TYPES_QUERY = `*[_type == "boothType" && language == $locale && status != "archived"] | order(order asc) {
  title,
  "slug": slug.current,
  excerpt,
  overviewTitle,
  description,
  order,
  hero${imageProjection},
  heroUrl,
  compareLabel,
  indoor,
  outdoor,
  reusable,
  highCustomization,
  fastSetup,
  features[]{ title, description },
  advantages[]{ title, description },
  useCases,
  faq[]{ question, answer },
  gallery[]{ image${imageProjection}, imageUrl, alt, caption },
  "model3d": coalesce(model3dFile.asset->url, model3d),
  cta{ label, href },
  seo${seoProjection}
}`;

export const BOOTH_TYPE_BY_SLUG_QUERY = `*[_type == "boothType" && language == $locale && slug.current == $slug && status != "archived"][0] {
  title,
  "slug": slug.current,
  excerpt,
  overviewTitle,
  description,
  order,
  hero${imageProjection},
  heroUrl,
  compareLabel,
  indoor,
  outdoor,
  reusable,
  highCustomization,
  fastSetup,
  features[]{ title, description },
  advantages[]{ title, description },
  useCases,
  faq[]{ question, answer },
  gallery[]{ image${imageProjection}, imageUrl, alt, caption },
  "model3d": coalesce(model3dFile.asset->url, model3d),
  cta{ label, href },
  seo${seoProjection}
}`;

export const PROJECTS_QUERY = `*[_type == "project" && language == $locale && status != "archived"] | order(year desc, title asc) {
  projectCode,
  cloudinaryFolder,
  title,
  "slug": slug.current,
  year,
  summary,
  scopeOfWork,
  challenge,
  solution,
  result,
  technologies,
  event,
  size,
  featured,
  hero${imageProjection},
  heroUrl,
  gallery[]{ image${imageProjection}, imageUrl, alt, caption },
  "motionVideo": coalesce(motionVideoFile.asset->url, motionVideo),
  "industrySlug": coalesce(industrySlug, industry->slug.current),
  serviceSlug,
  "serviceSlugs": services[]->slug.current,
  "boothTypeSlug": boothType->slug.current,
  "locationSlug": location->slug.current,
  "clientName": coalesce(client->name, clientName),
  seo${seoProjection}
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && language == $locale && slug.current == $slug && status != "archived"][0] {
  projectCode,
  cloudinaryFolder,
  title,
  "slug": slug.current,
  year,
  summary,
  scopeOfWork,
  challenge,
  solution,
  result,
  technologies,
  event,
  size,
  featured,
  hero${imageProjection},
  heroUrl,
  gallery[]{ image${imageProjection}, imageUrl, alt, caption },
  "motionVideo": coalesce(motionVideoFile.asset->url, motionVideo),
  "industrySlug": coalesce(industrySlug, industry->slug.current),
  serviceSlug,
  "serviceSlugs": services[]->slug.current,
  "boothTypeSlug": boothType->slug.current,
  "locationSlug": location->slug.current,
  "clientName": coalesce(client->name, clientName),
  seo${seoProjection}
}`;

export const INDUSTRIES_QUERY = `*[_type == "industry" && language == $locale && status != "archived"] | order(order asc) {
  title,
  "slug": slug.current,
  excerpt,
  overview,
  order,
  hero${imageProjection},
  heroUrl,
  challenges[]{ title, description },
  solutions[]{ title, description },
  "recommendedBoothTypeSlugs": recommendedBoothTypes[]->slug.current,
  cta{ label, href },
  seo${seoProjection}
}`;

export const INDUSTRY_BY_SLUG_QUERY = `*[_type == "industry" && language == $locale && slug.current == $slug && status != "archived"][0] {
  title,
  "slug": slug.current,
  excerpt,
  overview,
  order,
  hero${imageProjection},
  heroUrl,
  challenges[]{ title, description },
  solutions[]{ title, description },
  "recommendedBoothTypeSlugs": recommendedBoothTypes[]->slug.current,
  cta{ label, href },
  seo${seoProjection}
}`;

export const LOCATIONS_QUERY = `*[_type == "location" && language == $locale && status != "archived"] | order(order asc) {
  title,
  "slug": slug.current,
  countryCode,
  excerpt,
  localExperience,
  capabilities[]{ title, description },
  order,
  hero${imageProjection},
  heroUrl,
  cta{ label, href },
  seo${seoProjection}
}`;

export const LOCATION_BY_SLUG_QUERY = `*[_type == "location" && language == $locale && slug.current == $slug && status != "archived"][0] {
  title,
  "slug": slug.current,
  countryCode,
  excerpt,
  localExperience,
  capabilities[]{ title, description },
  order,
  hero${imageProjection},
  heroUrl,
  cta{ label, href },
  seo${seoProjection}
}`;

export const NEWS_QUERY = `*[_type == "newsArticle" && language == $locale && status != "archived"] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,
  tags,
  featuredImage${imageProjection},
  featuredImageUrl,
  "category": category->title,
  "author": author->name,
  seo${seoProjection}
}`;

export const NEWS_BY_SLUG_QUERY = `*[_type == "newsArticle" && language == $locale && slug.current == $slug && status != "archived"][0] {
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readingTime,
  tags,
  body,
  featuredImage${imageProjection},
  featuredImageUrl,
  "category": category->title,
  "author": author->name,
  seo${seoProjection}
}`;

export const NAVIGATION_QUERY = `*[_type == "navigation" && language == $locale][0] {
  items[]{
    enabled,
    label,
    href,
    kind,
    mega{
      enabled,
      layout,
      title,
      description,
      columns[]{
        title,
        links[]{ label, href, description, icon, image{ asset, alt } }
      },
      featured{
        enabled,
        title,
        description,
        href,
        ctaLabel,
        image{ asset, alt },
        "serviceTitle": service->title,
        "serviceExcerpt": service->excerpt,
        "serviceSlug": service->slug.current,
        "serviceImage": service->hero{ asset, alt },
        "boothTitle": boothType->title,
        "boothExcerpt": boothType->excerpt,
        "boothSlug": boothType->slug.current,
        "boothImage": boothType->hero{ asset, alt }
      },
      cta{ label, href }
    },
    dropdown[]{ label, href, description, icon, image{ asset, alt } }
  },
  primary[]{ label, href },
  footer[]{ label, href },
  ctaLabel,
  ctaHref,
  cta{ label, href }
}`;

export const REDIRECTS_QUERY = `*[_type == "redirect"]{ from, to, status }`;

export const CLIENTS_QUERY = `*[_type == "client" && language == $locale && status != "archived"] | order(order asc) {
  name,
  logo${imageProjection},
  logoUrl,
  logoMobile${imageProjection},
  logoMobileUrl,
  order
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && language == $locale && status != "archived"] | order(order asc) {
  quote,
  person,
  role,
  image{ asset, alt },
  imageUrl,
  imageAlt,
  order
}`;

export const FOOTER_QUERY = `*[_type == "siteFooter" && language == $locale][0] {
  logo{ asset, alt },
  description,
  certifications[]{ label, image{ asset, alt } },
  qualityBadges[]{ label, image{ asset, alt } },
  cta{ label, href },
  servicesTitle,
  showServices,
  workTitle,
  showWork,
  companyLinksTitle,
  companyLinks[]{ label, href },
  contactTitle,
  officeAddress,
  phoneDisplay,
  phoneHref,
  email,
  whatsappLabel,
  businessHours,
  mapsLabel,
  mapsUrl,
  socialLinks[]{ platform, url, label },
  newsletter{
    enabled,
    headline,
    description,
    placeholder,
    buttonLabel,
    mailto
  },
  trust{
    enabled,
    items[]{ label }
  },
  rights,
  bottomLinks[]{ label, href },
  createdBy
}`;

export type ContentLocale = Locale;
