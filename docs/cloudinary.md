# Cloudinary portfolio media

The production portfolio media is sourced from the `cps` asset folder in the
Cloudinary product environment `jivfgunl`.

## Content flow

1. `src/content/cloudinary-projects.ts` is the checked-in media manifest and
   bilingual local fallback.
2. `src/content/projects.ts` exports that manifest as the public project collection.
3. `npm run seed:sanity` creates the matching English and Arabic `project`
   documents using `heroUrl`, `gallery[].imageUrl`, and `motionVideo`.
4. Sanity remains CMS-first. Editors can change copy, ordering, taxonomy, hero
   selection, and gallery order without moving the Cloudinary originals.
5. `src/lib/image-loader.ts` adds Cloudinary `c_limit,w_*`, `f_auto`, and `q_auto`
   delivery transformations for responsive images. Videos are delivered directly.
6. Detail-page galleries use an adaptive editorial grid: a single image is wide,
   two images form a balanced pair, and larger sets lead with one wide frame.
7. Project videos are requested only when their section approaches the viewport and
   use Cloudinary `c_limit,w_1280`, `q_auto`, and `f_auto` delivery transformations.

The previous five stock-photo demo projects remain in source history but are not
exported to the public collection. Legacy seeded demo documents without a CPS
project code or Cloudinary folder are also excluded by the collection loader.

## Folder convention

Each populated first-level folder under `cps/` maps to one project. The stable
`projectCode` and full `cloudinaryFolder` are stored on the Sanity project so the
source can be traced without depending on a mutable title or slug.

There are currently 19 populated project folders containing 94 source assets
(86 JPG images and 8 MP4 videos). Four source folders are empty and are not
published until media is added:

- `CFTO-1001 SNB Lounge renovation at Boulevard Riyadh`
- `CST-1001 SNB Backdrop Mawasem Bank`
- `CEV-1002 Riyad Bank Groundbreaking Ceremony Dec 2025`
- `CEV-1005 SNB Stage for SNB Talks Oct 2025`

## Updating the portfolio

Cloudinary Admin credentials must remain server-only. Do not expose an API secret
through a `NEXT_PUBLIC_` variable. When the manifest changes, run the normal
non-destructive seed. Set `SANITY_SEED_REPLACE=true` only when an intentional
editorial overwrite has been approved.

The source library currently contains one exact duplicate in the Ajlan project:
`WhatsApp_Image_2026-01-09_at_3.27.31_AM` and `IMG-20260109-WA0021`. Both are
retained in the manifest so it represents every Cloudinary source asset.

## Service catalogue product media

The `CPS Website/Our Services (Products)` folder supplies the product-level
images used by the service catalogue cards and catalogue detail pages. Content
for those pages comes from `CPS_Catalogue_Detail_Page_Content.xlsx` and is
checked into `src/content/catalogue-detail-content.generated.ts` so production
builds do not need to read an Excel workbook or call the Cloudinary Admin API.

The workbook defines 122 catalogue items. Cloudinary currently supplies 119
matching product images. These three Custom Fabrication items intentionally use
their service image until matching assets are uploaded:

- `custom-fabrication:display-units`
- `custom-fabrication:decorative-structures`
- `custom-fabrication:product-displays`

## Client logos

The `CPS Website/logos` folder holds the client-supplied Trusted By set in two
sizes: `Desktop` (136×48) and `Mobile` (120×44). `src/content/clients.ts` is the
local fallback, and the Sanity `client` documents carry the same links in
`logoUrl` (desktop) and `logoMobileUrl` (phone). `ClientLogoImage` renders a
`<picture>` that swaps to the phone artwork below 768px.
