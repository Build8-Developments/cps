# Sanity CMS (optional)

The site runs fully without Sanity using local dictionaries, `src/content/catalog.ts`, `projects.ts`, and `site-config` defaults. CMS content merges on top when configured.

## Seed (EN + AR)

Idempotent seed from local content into Sanity:

```bash
# .env.local needs project id, dataset, and a write token
SANITY_API_WRITE_TOKEN=...

npm run seed:sanity
```

The default seed is non-destructive: it creates missing documents and fills missing
top-level fields without overwriting editor changes. To intentionally replace all
seeded documents with local defaults, run:

```bash
SANITY_SEED_REPLACE=true npm run seed:sanity
```

Stable IDs include `service-exhibitions-booths-en`, `homePage-ar`,
`navigation-en`, and `client-neom-en`.

Seeded image fields use URL fallbacks so pages stay complete before assets are
uploaded. Editors can replace those fallbacks in Studio with Sanity-hosted images.
Project motion sections accept either an MP4/WebM URL or an uploaded video file.
Booth types accept uploaded/external GLB or GLTF models and editable galleries.

## Navigation (mega menus)

Primary navigation is CMS-managed via the `navigation` singleton (`language: en|ar`).

| Field | Purpose |
| --- | --- |
| `items[]` (`navPrimaryItem`) | Primary menu — reorderable; kinds: `link`, `mega`, `dropdown` |
| `navMega` | Section title, description, columns, featured panel, CTA |
| `navFeatured` | Featured image + copy; optional `service` / `boothType` refs auto-fill |
| `footer[]` | Legacy footer links (prefer `siteFooter`) |
| `ctaLabel` / `ctaHref` | Header CTA |

Local fallback: `src/content/navigation.ts` via `resolveNavigation(locale)`.

## Footer

CMS singleton `siteFooter` (`siteFooter-en` / `siteFooter-ar`):

| Field | Purpose |
| --- | --- |
| Company column | Logo, description, certifications, badges, CTA |
| Services / Work | Eight service-family links plus Projects and industry-filter entry points; location links are not part of the blueprint footer |
| Company links | About, portfolio, news, legal, etc. |
| Contact | Address, phone, email, WhatsApp, hours, maps, social |
| Newsletter | Optional strip above footer |
| Trust strip | Optional badges above footer |
| Bottom bar | Rights, legal links, created-by |

Local fallback: `src/content/footer.ts` via `resolveFooter(locale)`. Contact falls back to Site Settings when empty.

**Where We Deliver** (service × city directory) sits under the footer menu: one tab per service, each listing every
city linked to `/locations/{city}/services/{service}`. Its copy (`areasTitle`, `areasSupport`, `areasAllLabel`,
`showAreas`) is local-only in `footer.ts`. Cities come from `loadLocations`, which merges Sanity `location` docs with
any local `catalog.ts` cities not yet seeded, so a new city appears in the footer, sitemap and pages before re-seeding.

Revalidate tags: `siteFooter`, `siteFooter-{locale}`.

## Document model

### Singletons

| Document | Purpose |
| --- | --- |
| `siteSettings` | Company, contact, brand, analytics, default SEO |
| `globalSeo` | Default SEO / org name / Twitter handle |
| `homePage` | Home hero + section JSON overlay + SEO (wired via `resolveDictionary`) |
| `aboutPageDoc` | About page copy, five-step workflow, industries grid + SEO (wired via `loadAboutPage`) |
| `contactPageDoc` | Contact page + brief form JSON + SEO (wired via `loadContactPage`) |
| `hubPage` | Index hubs (services, booth types, work, industries, locations, news) — chrome + SEO |
| `navigation` | Primary + footer menus |
| `dictionary` | Residual UI chrome / full JSON fallback |
| `notFoundPage` | 404 copy + SEO |

Every collection document (`service`, `boothType`, `project`, …) and page singleton has an `seo` (`seoMeta`) field. Seed fills title/description/keywords from local content; override freely in Studio.

### Collections

| Type | Routes |
| --- | --- |
| `service` | Seeded from the eight-service architecture; detail at `/services/[slug]`; `blueprintVersion: 5` authorizes CMS copy overrides |
| `boothType` | Legacy collection retained for redirect compatibility |
| `project` | `/work`, `/work/[slug]`; supports primary `serviceSlug` plus multiple `services[]` references |
| `industry` | Project metadata; standalone public routes redirect to `/work` |
| `location` | `/locations`, `/locations/[slug]` |
| `serviceLocation` | City-specific service variations at `/locations/[city]/services/[service]` |
| `newsArticle` | `/news`, `/news/[slug]` |
| `client` | Logo marquee (`loadClients`) |
| `category`, `author`, `faq`, `testimonial`, `redirect` | Taxonomies / redirects |

Document-level i18n: each content doc has `language: en | ar`.

### Media ownership

- Services, booth types, projects, industries, locations, and news support uploaded
  hero media with seeded URL fallbacks.
- Project and booth-type galleries can use uploaded images or URL fallbacks. The
  production project fallbacks point at the CPS Cloudinary library; see
  [cloudinary.md](cloudinary.md).
- Project motion video accepts an upload or URL; an uploaded file wins.
- Booth-type 3D models accept GLB/GLTF upload or URL. Booth pages currently show
  a bilingual production brief in place of the old procedural placeholder; the
  source field remains available for the final approved model.
- Site Settings `homeFloatingImages` lead the home hero's photo wall; local
  `media.homeHeroGallery` fills the rest. The home hero poster/video fields are
  not rendered by the hero.
- Uploaded media is resolved from Sanity's image/file CDN; local URLs remain as a
  safe fallback when CMS media is incomplete.

## Loaders

Under `src/sanity/`:

- `load-site-config.ts` — site settings
- `load-collections.ts` — services, booth types, projects, industries, locations, news, clients, navigation, redirects
- `load-pages.ts` — home overlay, about, contact page docs
- Local fallback always from `src/content/*` when Sanity is empty or unconfigured

Sitemap and `generateStaticParams` use these loaders (CMS-first).

## CMS vs residual dictionary

| Editable in Studio | Residual local / dictionary |
| --- | --- |
| Collections, nav, footer, clients | Form field labels, coming-soon, some chrome |
| `homePage` / `aboutPageDoc` / `contactPageDoc` | Thin button labels if not in page docs |
| Booth comparison flags on `boothType` | Local `booth-comparison.ts` fallback matrix |

## Setup

1. Create a Sanity project
2. Copy `.env.example` → `.env.local` and fill:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=...          # required for draft preview
SANITY_API_WRITE_TOKEN=...         # required for npm run seed:sanity
SANITY_REVALIDATE_SECRET=...       # webhook auth
SANITY_PREVIEW_SECRET=...          # optional; falls back to revalidate secret
RESEND_API_KEY=...                 # contact and quote email delivery
EMAIL_FROM_NAME=CPS
EMAIL_FROM_ADDRESS=noreply@example.com
EMAIL_TO_ADDRESS=hello@example.com
```

To refresh only testimonial documents from the bilingual local dictionary, run:

```bash
SANITY_SEED_ONLY=testimonials npm run seed:sanity
```

To create or fill only the bilingual project documents from the Cloudinary-backed
local manifest, run:

```bash
SANITY_SEED_ONLY=projects npm run seed:sanity
```

Published `testimonial` documents are loaded into the existing client testimonial carousel by locale and ordered by `order`. If Sanity has no valid testimonials for a locale, the local dictionary entries remain the fallback. Publishing through Studio revalidates the shared `testimonial` tag and the locale-specific testimonial cache.

3. Run `npm run setup:sanity`, then `npm run seed:sanity`, then `npm run dev`
4. Open Studio: http://localhost:3000/studio

## Form delivery

Contact and quote submissions are delivered directly by Resend and are not persisted in Sanity. Configure the server-only variables `RESEND_API_KEY`, `EMAIL_FROM_NAME`, `EMAIL_FROM_ADDRESS`, and `EMAIL_TO_ADDRESS`; the sender domain must be verified in Resend. Uploaded reference and partner documents are attached to the email and discarded after delivery.

Brief submissions continue to create Sanity documents:

| Form | Document type | Studio |
| --- | --- | --- |
| `/api/brief` | `briefSubmission` | Inbox → Brief submissions |

Brief persistence requires `SANITY_API_WRITE_TOKEN` on the server (local `.env.local` and Vercel). Optional `BRIEF_WEBHOOK_URL` fires after a successful Sanity save. The existing `contactSubmission` schema remains available only for historical records and receives no new form submissions.

## Revalidation

`POST /api/revalidate`

Tags include: `siteSettings`, `dictionary`, `notFoundPage`, page singletons (`homePage`, `aboutPageDoc`, `contactPageDoc`), and all collection types (`service`, `boothType`, `project`, `industry`, `location`, `newsArticle`, `client`, `redirect`, …) plus locale-scoped variants.

## Draft preview

- Enable: `GET /api/draft?secret=...&slug=/en/services/exhibitions-booths`
- Disable: `GET /api/draft/disable?redirect=/en`
- When draft mode is on, `sanityFetch` uses `perspective=previewDrafts` (needs read token)

## Redirects

Local seed redirects live in `src/content/catalog.ts` (`/portfolio` → `/work`, `/blog` → `/news`) and are applied in `src/proxy.ts` (plus `next.config.ts`). CMS `redirect` documents can be authored in Studio for editorial tracking.

## Merge behavior

Never replace the whole dictionary with a partial CMS payload. Use `resolveDictionary(locale)` so local defaults remain, then structured page docs (`homePage`, `aboutPageDoc`, `contactPageDoc`) win for their fields. Prefer structured collection docs over the deprecated `dictionary.content` JSON blob.

## Blueprint v5 migration

Run the targeted migration as a dry run first. It synchronizes legacy home hero/footer copy, full service v5 copy, project service references, scope, and filter taxonomy. Applying requires a token with dataset `update` permission.

```bash
node --import tsx scripts/migrate-blueprint-content.ts
node --import tsx scripts/migrate-blueprint-content.ts --apply
```

The apply step uses one revision-checked transaction and writes a backup under the operating system temporary directory before committing.
