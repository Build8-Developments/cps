/**
 * CPS-owned photography from the `CPS Website` Cloudinary folders.
 *
 * Keep the original versioned delivery URLs here. The shared Next image loader
 * adds responsive Cloudinary transformations at render time.
 */

const cps = {
  home: {
    activation: "https://res.cloudinary.com/jivfgunl/image/upload/v1789383564/home_1.png",
    display: "https://res.cloudinary.com/jivfgunl/image/upload/v1789387381/home_2.png",
    booth: "https://res.cloudinary.com/jivfgunl/image/upload/v1789383563/home_4.png",
    about: "https://res.cloudinary.com/jivfgunl/image/upload/v1789399720/about01.png",
    howWeBuild: "https://res.cloudinary.com/jivfgunl/image/upload/v1789387805/How_We_Build.png",
    before: "https://res.cloudinary.com/jivfgunl/image/upload/v1789390407/BEFORE.png",
    after: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398049/AFTER.png",
  },
  about: {
    build: "https://res.cloudinary.com/jivfgunl/image/upload/v1789399364/How_We_Build01.png",
    craft: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398309/about.png",
    workshop: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398314/about_2.png",
  },
  services: {
    exhibitions: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398995/Top_Exhibition_Booths.png",
    events: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398941/pooth.png",
    fitOut: "https://res.cloudinary.com/jivfgunl/image/upload/v1789399007/Trusted_Fit-Out.png",
    retail: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398868/Untitled-1Premier_Retail_Display.png",
    fabrication: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398897/Expert_Custom_Fabrication.png",
    printing: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398911/Professional_Printing.png",
    rental: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398910/Flexible_assets_for_events.png",
    installation: "https://res.cloudinary.com/jivfgunl/image/upload/v1789398885/PRODUC_1.png",
  },
  homeCards: {
    fitOut: "https://res.cloudinary.com/jivfgunl/image/upload/v1789400018/Trusted_Fit-Out01.png",
    installation: "https://res.cloudinary.com/jivfgunl/image/upload/v1789400027/PRODUC_102.png",
    before: "https://res.cloudinary.com/jivfgunl/image/upload/v1789400101/BEFORE01.png",
    rental: "https://res.cloudinary.com/jivfgunl/image/upload/v1789400132/Flexible_assets_for_events01.png",
  },
} as const;

export const media = {
  homeHero: cps.home.booth,
  /** Home hero photo wall — enough shots that no column repeats on screen. */
  homeHeroGallery: [
    cps.services.exhibitions,
    cps.home.booth,
    cps.services.fitOut,
    cps.home.activation,
    cps.services.events,
    cps.homeCards.installation,
    cps.home.display,
    cps.services.retail,
    cps.about.workshop,
    cps.services.fabrication,
    cps.homeCards.rental,
    cps.home.about,
    cps.services.printing,
    cps.homeCards.fitOut,
    cps.about.craft,
    cps.services.rental,
    cps.home.howWeBuild,
    cps.about.build,
    cps.services.installation,
    cps.homeCards.before,
    cps.home.after,
  ],
  homeFloating: [
    cps.home.activation,
    cps.home.display,
    cps.home.booth,
    cps.home.about,
    cps.homeCards.fitOut,
    cps.homeCards.installation,
    cps.homeCards.before,
    cps.homeCards.rental,
    cps.services.exhibitions,
    cps.services.printing,
  ],

  lifecycle: cps.home.howWeBuild,

  whyCps: cps.about.workshop,
  whyCpsWide: cps.services.exhibitions,
  whyCpsLeft: cps.about.craft,
  whyCpsRight: cps.about.build,

  beforeAfter: {
    before: cps.home.before,
    after: cps.home.after,
  },

  about: {
    hero: cps.home.about,
    mission: cps.about.craft,
    studio: cps.about.workshop,
    build: cps.about.build,
    industries: cps.about.build,
  },

  contact: {
    hero: cps.services.fitOut,
  },

  news: {
    hall: cps.services.exhibitions,
    keynote: cps.services.events,
    networking: cps.home.howWeBuild,
  },

  services: {
    exhibitions: cps.services.exhibitions,
    events: cps.services.events,
    fitOut: cps.services.fitOut,
    retail: cps.services.retail,
    management: cps.home.howWeBuild,
    design: cps.home.display,
    fabrication: cps.services.fabrication,
    installation: cps.services.installation,
    storage: cps.services.rental,
    rental: cps.services.rental,
    branding: cps.services.printing,
    printing: cps.services.printing,
    lightbox: cps.services.retail,
  },

  boothTypes: {
    custom: cps.services.exhibitions,
    modular: cps.home.booth,
    doubleDeck: cps.services.exhibitions,
    portable: cps.services.rental,
    kiosk: cps.services.retail,
    outdoor: cps.services.events,
    pavilion: cps.services.exhibitions,
    sustainable: cps.services.fitOut,
  },

  industries: {
    technology: cps.home.display,
    healthcare: cps.home.booth,
    energy: cps.services.exhibitions,
    fmcg: cps.services.retail,
  },

  locations: {
    riyadh: cps.home.activation,
    jeddah: cps.home.booth,
    dammam: cps.services.retail,
    khobar: cps.services.fitOut,
    makkah: cps.services.events,
    madinah: cps.services.exhibitions,
    neom: cps.services.fabrication,
    abha: cps.services.events,
    alAhsa: cps.services.retail,
    alBaha: cps.home.display,
    alKharj: cps.services.fabrication,
    alQassim: cps.home.booth,
    alula: cps.services.exhibitions,
    buraidah: cps.services.retail,
    dhahran: cps.home.activation,
    hail: cps.services.fitOut,
    jazan: cps.services.events,
    jubail: cps.services.fabrication,
    khamisMushait: cps.home.booth,
    qatif: cps.services.fitOut,
    tabuk: cps.services.exhibitions,
    taif: cps.home.display,
    unaizah: cps.home.activation,
    yanbu: cps.services.installation,
  },

  /** Legacy demo records are not published, but retain real CPS imagery. */
  projects: {
    northline: {
      hero: cps.services.exhibitions,
      gallery: [cps.services.exhibitions, cps.home.booth, cps.home.display, cps.home.activation, cps.home.howWeBuild, cps.services.installation],
    },
    aetherLabs: {
      hero: cps.home.booth,
      gallery: [cps.home.booth, cps.services.fitOut, cps.about.workshop, cps.about.craft, cps.services.fabrication, cps.services.installation],
    },
    qamar: {
      hero: cps.services.retail,
      gallery: [cps.services.retail, cps.services.printing, cps.services.rental, cps.home.activation, cps.home.display, cps.services.events],
    },
    harborCo: {
      hero: cps.services.events,
      gallery: [cps.services.events, cps.services.exhibitions, cps.home.howWeBuild, cps.about.build, cps.services.fabrication, cps.services.installation],
    },
    pulseRetail: {
      hero: cps.services.rental,
      gallery: [cps.services.rental, cps.services.retail, cps.services.printing, cps.home.activation, cps.home.display, cps.services.fitOut],
    },
  },
} as const;
