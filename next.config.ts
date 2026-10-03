import type { NextConfig } from "next";

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const legacyBoothTypeMap = [
  ["custom", "exhibitions-booths", "custom-built-exhibition-booths"],
  ["modular", "exhibitions-booths", "modular-exhibition-booths"],
  ["double-deck", "exhibitions-booths", "double-decker-booths"],
  ["portable", "exhibitions-booths", "portable-and-pop-up-displays"],
  ["pavilions", "exhibitions-booths", "pavilions-and-large-scale-exhibition-spaces"],
  ["sustainable", "exhibitions-booths", "custom-built-exhibition-booths"],
  ["kiosks", "retail-displays", "promotional-kiosks"],
  ["outdoor", "event-fabrication", "branded-event-structures"],
] as const;

const nextConfig: NextConfig = {
  // Self-contained server bundle in .next/standalone: CI ships only that
  // (plus .next/static and public/) to the server, never the source. See DEPLOY.md.
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/studio",
        destination: "/studio",
        permanent: false,
      },
      {
        source: "/:locale(en|ar)/studio/:path*",
        destination: "/studio/:path*",
        permanent: false,
      },
      {
        source: "/:locale(en|ar)/portfolio",
        destination: "/:locale/work",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/blog",
        destination: "/:locale/news",
        permanent: true,
      },
      { source: "/:locale(en|ar)/services/full-booth-management", destination: "/:locale/services/exhibitions-booths", permanent: true },
      { source: "/:locale(en|ar)/services/booth-design", destination: "/:locale/services/exhibitions-booths", permanent: true },
      { source: "/:locale(en|ar)/services/installation-dismantling", destination: "/:locale/services/installation-project-delivery", permanent: true },
      { source: "/:locale(en|ar)/services/storage-reinstallation", destination: "/:locale/services/installation-project-delivery", permanent: true },
      { source: "/:locale(en|ar)/services/visual-branding-print", destination: "/:locale/services/printing-signage", permanent: true },
      { source: "/:locale(en|ar)/services/lightbox-retail-display", destination: "/:locale/services/printing-signage", permanent: true },
      ...legacyBoothTypeMap.flatMap(([legacySlug, serviceSlug, itemSlug]) => [
        {
          source: `/:locale(en|ar)/booth-types/${legacySlug}`,
          destination: `/:locale/services/${serviceSlug}/catalogue?item=${itemSlug}`,
          permanent: true,
        },
        {
          source: `/:locale(en|ar)/locations/:city/booth-types/${legacySlug}`,
          destination: `/:locale/services/${serviceSlug}/catalogue?item=${itemSlug}&city=:city`,
          permanent: true,
        },
      ]),
      { source: "/:locale(en|ar)/locations/:city/services/full-booth-management", destination: "/:locale/locations/:city/services/exhibitions-booths", permanent: true },
      { source: "/:locale(en|ar)/locations/:city/services/booth-design", destination: "/:locale/locations/:city/services/exhibitions-booths", permanent: true },
      { source: "/:locale(en|ar)/locations/:city/services/installation-dismantling", destination: "/:locale/locations/:city/services/installation-project-delivery", permanent: true },
      { source: "/:locale(en|ar)/locations/:city/services/storage-reinstallation", destination: "/:locale/locations/:city/services/installation-project-delivery", permanent: true },
      { source: "/:locale(en|ar)/locations/:city/services/visual-branding-print", destination: "/:locale/locations/:city/services/printing-signage", permanent: true },
      { source: "/:locale(en|ar)/locations/:city/services/lightbox-retail-display", destination: "/:locale/locations/:city/services/printing-signage", permanent: true },
      { source: "/:locale(en|ar)/booth-types", destination: "/:locale/services/exhibitions-booths/catalogue", permanent: true },
      { source: "/:locale(en|ar)/booth-types/:slug", destination: "/:locale/services/exhibitions-booths/catalogue", permanent: true },
      { source: "/:locale(en|ar)/locations/:city/booth-types/:slug", destination: "/:locale/services/exhibitions-booths/catalogue", permanent: true },
      { source: "/:locale(en|ar)/industries", destination: "/:locale/work", permanent: true },
      { source: "/:locale(en|ar)/industries/:slug", destination: "/:locale/work", permanent: true },
      {
        source: "/:locale(en|ar)/locations/saudi-arabia/:path*",
        destination: "/:locale/locations/riyadh/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/uae/:path*",
        destination: "/:locale/locations/jeddah/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/qatar/:path*",
        destination: "/:locale/locations/dammam/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/kuwait/:path*",
        destination: "/:locale/locations/khobar/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/bahrain/:path*",
        destination: "/:locale/locations/makkah/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/oman/:path*",
        destination: "/:locale/locations/madinah/:path*",
        permanent: true,
      },
      {
        source: "/:locale(en|ar)/locations/egypt/:path*",
        destination: "/:locale/locations/neom/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    remotePatterns: [
      ...(sanityProjectId
        ? [
            {
              protocol: "https" as const,
              hostname: "cdn.sanity.io",
              pathname: `/images/${sanityProjectId}/${sanityDataset}/**`,
            },
          ]
        : []),
      {
        protocol: "https" as const,
        hostname: "placehold.co",
      },
      {
        protocol: "https" as const,
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https" as const,
        hostname: "res.cloudinary.com",
        pathname: "/jivfgunl/image/upload/**",
      },
      {
        protocol: "https" as const,
        hostname: "res.cloudinary.com",
        pathname: "/jivfgunl/video/upload/**",
      },
    ],
  },
};

export default nextConfig;
