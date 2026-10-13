import { media } from "@/content/media";
import {
  catalogueDetailContent,
  type CatalogueDetailContent,
} from "@/content/catalogue-detail-content.generated";
import type { Locale } from "@/lib/i18n";

export type LocalizedText = { en: string; ar: string };

export type CatalogueItem = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  image?: string;
  detail?: CatalogueDetailContent;
  cityAnchors?: {
    slug: string;
    title: LocalizedText;
    seoTitle: LocalizedText;
    seoDescription: LocalizedText;
  }[];
};

export type CatalogueCategory = {
  slug: string;
  title: LocalizedText;
  items: CatalogueItem[];
};

export type ServiceArchitecture = {
  slug: string;
  image: string;
  /** Wide photo behind the service page hero. */
  banner: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  hero: {
    headline: LocalizedText;
    support: LocalizedText;
    bullets: LocalizedText[];
    catalogueCta: LocalizedText;
  };
  showcase: {
    title: LocalizedText;
    items: {
      catalogueItemSlug?: string;
      title: LocalizedText;
      description: LocalizedText;
    }[];
  };
  catalogue: {
    title: LocalizedText;
    support: LocalizedText;
    categories: CatalogueCategory[];
    layoutFilters?: LocalizedText[];
    searchable?: boolean;
  };
  why: {
    headline: LocalizedText;
    support: LocalizedText;
    items: LocalizedText[];
  };
  benefits: LocalizedText[];
  industries: LocalizedText[];
  related: string[];
  faq: { question: LocalizedText; answer: LocalizedText }[];
  closingNoun: LocalizedText;
};

const t = (en: string, ar: string): LocalizedText => ({ en, ar });

export const serviceLandingHeroes: Record<
  string,
  {
    eyebrow: LocalizedText;
    headline: LocalizedText;
    subheadline: LocalizedText;
  }
> = {
  "exhibitions-booths": {
    eyebrow: t("Custom-Built & Modular", "أجنحة مخصصة ومعيارية"),
    headline: t("Top Exhibition Booths in {City}", "تصميم وتنفيذ أجنحة المعارض في {City}"),
    subheadline: t(
      "Custom exhibition booths, engineered and installed in-house.",
      "أجنحة معارض مخصصة نهندسها ونركّبها بفريقنا، دون مقاول من الباطن.",
    ),
  },
  "event-fabrication": {
    eyebrow: t("Stages, Scenic & Branded Builds", "منصات وديكورات مسرحية وهياكل بهوية علامتك"),
    headline: t("Leading Event Fabrication in {City}", "تصنيع وتجهيز الفعاليات في {City}"),
    subheadline: t(
      "Stages, scenic builds and branded event structures.",
      "منصات وديكورات مسرحية وهياكل فعاليات بهوية علامتك.",
    ),
  },
  "fit-out-interiors": {
    eyebrow: t("Offices, Showrooms & Retail Spaces", "مكاتب وصالات عرض ومتاجر"),
    headline: t("Trusted Fit-Out & Interiors in {City}", "التجهيز الداخلي للمكاتب والمتاجر في {City}"),
    subheadline: t(
      "Commercial interiors built and finished end-to-end.",
      "مساحات تجارية ننفّذها ونشطّبها بالكامل حتى التسليم.",
    ),
  },
  "retail-displays": {
    eyebrow: t("Gondolas, POS & Window Displays", "جندولات ووحدات نقاط البيع وواجهات العرض"),
    headline: t("Premier Retail Displays in {City}", "وحدات عرض للمتاجر ونقاط البيع في {City}"),
    subheadline: t(
      "Custom displays built for visibility and sales.",
      "وحدات عرض مخصصة تُبرز منتجك وتدعم مبيعاتك.",
    ),
  },
  "custom-fabrication": {
    eyebrow: t("Wood, Metal & Acrylic Production", "تصنيع بالخشب والمعدن والأكريليك"),
    headline: t("Expert Custom Fabrication in {City}", "التصنيع حسب الطلب في {City}"),
    subheadline: t(
      "Wood, metal, acrylic and CNC production, in-house.",
      "أعمال الخشب والمعدن والأكريليك والقطع بتقنية CNC في مصنعنا.",
    ),
  },
  "printing-signage": {
    eyebrow: t(
      "Large-Format Print & Illuminated Signs",
      "الطباعة كبيرة الحجم واللافتات المضيئة",
    ),
    headline: t("Professional Printing & Signage in {City}", "الطباعة واللافتات التجارية في {City}"),
    subheadline: t(
      "Print and signage production, installed nationwide.",
      "نطبع وننتج اللافتات ونركّبها في جميع مناطق المملكة.",
    ),
  },
  "rental-solutions": {
    eyebrow: t("Furniture, Counters & Décor", "أثاث وكاونترات وديكور"),
    headline: t("Reliable Rental Solutions in {City}", "تأجير أثاث وتجهيزات الفعاليات في {City}"),
    subheadline: t(
      "Furniture, counters and displays for any event.",
      "أثاث وكاونترات ووحدات عرض تناسب أي فعالية.",
    ),
  },
  "installation-project-delivery": {
    eyebrow: t("Nationwide Site Delivery", "تنفيذ ميداني في جميع مناطق المملكة"),
    headline: t(
      "Specialist Installation & Project Delivery in {City}",
      "التركيب وتسليم المشاريع في {City}",
    ),
    subheadline: t(
      "From production floor to finished site, nationwide.",
      "من منشأة الإنتاج حتى الموقع المكتمل، في جميع مناطق المملكة.",
    ),
  },
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const item = (
  en: string,
  ar: string,
  enDescription: string,
  arDescription: string,
  slug?: string,
): CatalogueItem => ({
  slug: slug ?? slugify(en),
  title: t(en, ar),
  description: t(enDescription, arDescription),
});
const category = (en: string, ar: string, items: CatalogueItem[]): CatalogueCategory => ({
  slug: slugify(en),
  title: t(en, ar),
  items,
});

const boothCityAnchors: NonNullable<CatalogueItem["cityAnchors"]> = [
  ["riyadh", "Riyadh", "الرياض"],
  ["jeddah", "Jeddah", "جدة"],
  ["dammam", "Dammam", "الدمام"],
  ["khobar", "Khobar", "الخبر"],
  ["makkah", "Makkah", "مكة المكرمة"],
  ["madinah", "Madinah", "المدينة المنورة"],
  ["neom", "NEOM", "نيوم"],
].map(([slug, en, ar]) => ({
  slug,
  title: t(en, ar),
  seoTitle: t(`Custom-Built Exhibition Booths in ${en}`, `أجنحة معارض مخصصة في ${ar}`),
  seoDescription: t(
    `Custom exhibition booth design, fabrication and installation in ${en}, delivered by CPS from one in-house production floor.`,
    `تصميم أجنحة المعارض المخصصة وتصنيعها وتركيبها في ${ar}، بفريق واحد ومن مصنع CPS مباشرة.`,
  ),
}));

const industries = {
  government: t("Government & Public Sector", "الجهات الحكومية والقطاع العام"),
  banking: t("Banking & Financial Services", "البنوك والخدمات المالية"),
  healthcare: t("Healthcare & Pharmaceutical", "الرعاية الصحية والأدوية"),
  fmcg: t("FMCG", "السلع الاستهلاكية سريعة الدوران"),
  beauty: t("Beauty & Cosmetics", "الجمال ومستحضرات التجميل"),
  technology: t("Technology & Electronics", "التقنية والإلكترونيات"),
  automotive: t("Automotive", "السيارات"),
  retail: t("Retail & Shopping Malls", "التجزئة ومراكز التسوق"),
  realEstate: t("Real Estate", "العقارات"),
  hospitality: t("Hospitality", "الضيافة"),
  sports: t("Sports & Entertainment", "الرياضة والترفيه"),
  fashion: t("Fashion", "الأزياء"),
  food: t("Food & Beverage", "الأغذية والمشروبات"),
};

export const projectIndustryOptions = [
  { slug: "government-public-sector", title: industries.government },
  { slug: "banking-financial-services", title: industries.banking },
  { slug: "healthcare-pharmaceutical", title: industries.healthcare },
  { slug: "fmcg", title: industries.fmcg },
  { slug: "beauty-cosmetics", title: industries.beauty },
  { slug: "technology-electronics", title: industries.technology },
  { slug: "automotive", title: industries.automotive },
  { slug: "retail-shopping-malls", title: industries.retail },
  { slug: "real-estate", title: industries.realEstate },
  { slug: "hospitality", title: industries.hospitality },
  { slug: "sports-entertainment", title: industries.sports },
];

export function industrySlug(value: LocalizedText) {
  const aliases: Record<string, string> = {
    Electronics: "technology-electronics",
    Pharmaceutical: "healthcare-pharmaceutical",
    Fashion: "retail-shopping-malls",
    "Food & Beverage": "hospitality",
  };
  return (
    aliases[value.en] ??
    projectIndustryOptions.find((option) => option.title.en === value.en)?.slug ??
    slugify(value.en)
  );
}

const faq = (
  qEn: string,
  qAr: string,
  aEn: string,
  aAr: string,
) => ({ question: t(qEn, qAr), answer: t(aEn, aAr) });

export const sharedProcess = [
  {
    title: t("Brief & Site Assessment", "الموجز ومعاينة الموقع"),
    description: t(
      "we review your brief, site conditions and technical constraints before design starts",
      "نراجع موجز مشروعك وظروف الموقع والقيود الفنية قبل البدء بالتصميم",
    ),
  },
  {
    title: t("Design & Technical Drawing", "التصميم والرسومات الفنية"),
    description: t(
      "concepts developed into approved, production-ready drawings",
      "نحوّل الأفكار إلى رسومات تنفيذية معتمدة وجاهزة للإنتاج",
    ),
  },
  {
    title: t("In-House Production", "الإنتاج في مصنعنا"),
    description: t(
      "fabricated on our own floor: wood, metal, acrylic, printing and signage",
      "نصنّع أعمال الخشب والمعدن والأكريليك والطباعة واللافتات في مصنعنا",
    ),
  },
  {
    title: t("Installation & Delivery", "التوصيل والتركيب"),
    description: t(
      "site delivery, installation and dismantling handled by our own crews nationwide",
      "تتولى فرقنا التوصيل والتركيب والفك في جميع مناطق المملكة",
    ),
  },
  {
    title: t("Handover & Support", "التسليم والدعم"),
    description: t(
      "final walkthrough, snagging and ongoing support if the piece needs maintenance or redeployment",
      "معاينة نهائية ومعالجة الملاحظات، مع دعم مستمر إن احتاج العمل إلى صيانة أو إعادة تركيب في موقع آخر",
    ),
  },
];

export const serviceArchitecture: ServiceArchitecture[] = [
  {
    slug: "exhibitions-booths",
    image: media.services.exhibitions,
    banner: media.serviceBanners.exhibitions,
    title: t("Exhibitions & Booths", "المعارض والأجنحة"),
    excerpt: t(
      "Custom exhibition environments, modular solutions and large-scale pavilions.",
      "أجنحة معارض مخصصة وحلول معيارية وأجنحة كبرى.",
    ),
    showcase: {
      title: t("Featured Booth Types", "أبرز أنواع الأجنحة"),
      items: [
        {
          title: t("Custom-Built Exhibition Booths", "أجنحة معارض مخصصة"),
          description: t("Bespoke booths developed around your brand, visitor journey and functional requirements. Nothing off a shelf.", "نصمّم كل جناح حول علامتك ومسار الزائر واحتياجاتك التشغيلية، ولا نعتمد على تصاميم جاهزة."),
        },
        {
          title: t("Modular Exhibition Booths", "أجنحة معارض معيارية"),
          description: t("Flexible framework systems built for efficient installation, reconfiguration and reuse across multiple shows.", "أنظمة هياكل مرنة يسهل تركيبها وإعادة تشكيلها واستخدامها في أكثر من معرض."),
        },
        {
          title: t("Double-Decker Booths", "أجنحة بطابقين"),
          description: t("Two-level structures with meeting areas, hospitality or lounge space built into a working upper floor.", "هياكل من مستويين، يُستثمر طابقها العلوي للاجتماعات أو الضيافة أو الاستراحة."),
        },
        {
          title: t("Pavilions & Large-Scale Exhibition Spaces", "الأجنحة الكبرى ومساحات العرض الواسعة"),
          description: t("Government, country and multi-brand pavilions requiring coordinated, large-format production.", "أجنحة حكومية ووطنية ومتعددة العلامات تتطلب إنتاجاً واسعاً بتنسيق دقيق."),
        },
        {
          title: t("Shell Scheme Upgrades", "تطوير أجنحة المنظّم الجاهزة"),
          description: t("Cladding, graphics, lighting and counters that turn a standard organizer shell into a fully branded stand.", "كسوات ورسومات وإضاءة وكاونترات تحوّل الجناح الجاهز الذي يوفّره المنظّم (shell scheme) إلى جناح متكامل بهوية علامتك."),
        },
      ],
    },
    hero: {
      headline: t("Built to stand out. Engineered to perform.", "جناح يلفت الأنظار، وهندسة يُعتمد عليها."),
      support: t("Custom exhibition environments, engineered and finished in-house.", "أجنحة معارض مخصصة نهندسها ونشطّبها بالكامل في مصنعنا."),
      bullets: [
        t("Bespoke booths built around your brand and visitor journey", "أجنحة مخصصة تُصمَّم حول علامتك ومسار الزائر"),
        t("Modular systems built for reuse across multiple shows", "أنظمة معيارية يُعاد استخدامها في أكثر من معرض"),
        t("Double-decker and large-scale pavilions for major exhibitions", "أجنحة بطابقين وأجنحة كبرى للمعارض الرئيسية"),
        t("One team from technical drawing to on-site installation", "فريق واحد من الرسومات الفنية حتى التركيب في الموقع"),
      ],
      catalogueCta: t("See All Booth Types", "استعرض جميع أنواع الأجنحة"),
    },
    catalogue: {
      title: t("All Booth Types", "جميع أنواع الأجنحة"),
      support: t("Every booth format we build, from a single inline stand to a multi-brand pavilion.", "كل أنواع الأجنحة التي ننفّذها، من الجناح الخطي الصغير إلى الأجنحة الكبرى متعددة العلامات."),
      layoutFilters: [t("Inline Booth", "جناح خطي"), t("Corner Booth", "جناح زاوية"), t("Peninsula Booth", "جناح شبه جزيرة"), t("Island Booth", "جناح جزيرة")],
      categories: [category("Booth Types", "أنواع الأجنحة", [
        {
          ...item("Custom-Built Exhibition Booths", "أجنحة معارض مخصصة", "Bespoke booths designed around the brand, visitor flow and functional needs — built and finished in-house.", "أجنحة تُصمَّم حول العلامة وحركة الزوار والاحتياجات التشغيلية، ثم نصنّعها ونشطّبها في مصنعنا."),
          cityAnchors: boothCityAnchors,
        },
        item("Modular Exhibition Booths", "أجنحة معارض معيارية", "Reusable framework systems that reconfigure across show sizes without a full rebuild each time.", "أنظمة هياكل قابلة لإعادة الاستخدام تتكيّف مع مساحات المعارض المختلفة، دون إعادة بناء كاملة في كل مرة."),
        item("Double-Decker Booths", "أجنحة بطابقين", "Two-level structures with a working upper floor for meetings, hospitality or storage.", "هياكل من مستويين بطابق علوي مستخدَم للاجتماعات أو الضيافة أو التخزين."),
        item("Pavilions & Large-Scale Exhibition Spaces", "الأجنحة الكبرى ومساحات العرض الواسعة", "Government, country and multi-brand pavilions built for coordinated, large-format production.", "أجنحة حكومية ووطنية ومتعددة العلامات، تُنفَّذ بإنتاج واسع وتنسيق دقيق."),
        item("Shell Scheme Upgrades", "تطوير أجنحة المنظّم الجاهزة", "Cladding, graphics, lighting and counters that upgrade a standard organizer shell.", "كسوات ورسومات وإضاءة وكاونترات ترتقي بالجناح الجاهز الذي يوفّره المنظّم."),
        item("Portable & Pop-Up Displays", "العروض المحمولة والمنصات المؤقتة", "Lightweight, transportable backdrops and counters for shows you'll set up and strike quickly.", "خلفيات وكاونترات خفيفة سهلة النقل، للمعارض التي تتطلب تركيباً وفكاً سريعين."),
      ])],
    },
    why: {
      headline: t("Why brands choose CPS for exhibition booths", "لماذا تختار العلامات التجارية CPS لأجنحة المعارض؟"),
      support: t("One team, one production floor, no subcontracted surprises.", "فريق واحد ومصنع واحد، دون مفاجآت المقاولين من الباطن."),
      items: [t("In-house wood, metal, acrylic and print production — no subcontracted panels", "نصنّع الخشب والمعدن والأكريليك والطباعة في مصنعنا — لا ألواح من مقاولين من الباطن"), t("Experience across major KSA exhibition halls", "خبرة في أبرز قاعات المعارض بالمملكة"), t("Nationwide installation and dismantling crews", "فرق تركيب وفك تغطي جميع مناطق المملكة"), t("Every layout covered: inline, corner, peninsula, island", "ننفّذ جميع المخططات: خطي وزاوية وشبه جزيرة وجزيرة")],
    },
    benefits: [t("Faster turnaround since design, production and install sit under one roof", "تنفيذ أسرع لأن التصميم والإنتاج والتركيب تحت سقف واحد"), t("Consistent finish quality across every booth type", "جودة تشطيب ثابتة في جميع أنواع الأجنحة"), t("Single point of contact from concept to teardown", "مسؤول واحد عن مشروعك من الفكرة حتى التفكيك"), t("Reusable modular options to cut costs across multiple shows", "خيارات معيارية قابلة لإعادة الاستخدام تخفّض تكلفة مشاركاتك المتكررة")],
    industries: [industries.beauty, industries.food, t("Electronics", "الإلكترونيات"), t("Pharmaceutical", "الأدوية"), industries.fashion, industries.automotive],
    related: ["event-fabrication", "custom-fabrication", "installation-project-delivery"],
    faq: [
      faq("How long does a custom booth take to build?", "كم يستغرق تنفيذ جناح مخصص؟", "Timelines depend on size and complexity — request a quote for a schedule specific to your show.", "تختلف المدة بحسب حجم الجناح ودرجة تعقيده؛ اطلب عرض سعر لتحصل على جدول زمني خاص بمعرضك."),
      faq("Can you build for shows outside Riyadh or Jeddah?", "هل تنفّذون أجنحة لمعارض خارج الرياض وجدة؟", "Yes — installation crews cover exhibitions nationwide.", "نعم، تغطي فرق التركيب لدينا المعارض في جميع مناطق المملكة."),
      faq("Do you offer reusable modular options?", "هل تقدّمون خيارات معيارية قابلة لإعادة الاستخدام؟", "Yes, modular booths are designed for redeployment across multiple shows.", "نعم، نصمّم الأجنحة المعيارية ليُعاد تركيبها في أكثر من معرض."),
      faq("Can you upgrade a standard organizer shell scheme?", "هل يمكن تطوير الجناح الجاهز الذي يوفّره المنظّم؟", "Yes — see Shell Scheme Upgrades in the catalogue.", "نعم، اطّلع على «تطوير أجنحة المنظّم الجاهزة» في الكتالوج."),
    ],
    closingNoun: t("booth", "جناح"),
  },
  {
    slug: "event-fabrication",
    image: media.services.events,
    banner: media.serviceBanners.events,
    title: t("Event Fabrication", "تصنيع وتجهيز الفعاليات"),
    excerpt: t("Stages, scenic structures, branded environments and experiential builds.", "منصات وديكورات مسرحية ومساحات بهوية علامتك وتجارب تفاعلية."),
    showcase: {
      title: t("Featured Event Structures", "أبرز هياكل الفعاليات"),
      items: [
        {
          title: t("Stage & Scenic Fabrication", "المنصات والديكورات المسرحية"),
          description: t("Stages, scenic structures, backdrops and stage surrounds built to your rigging and run-of-show requirements.", "منصات وهياكل مسرحية وخلفيات وإطارات للمسرح، تُنفَّذ وفق متطلبات التعليق وبرنامج الفعالية."),
        },
        {
          title: t("Branded Event Structures", "هياكل الفعاليات بهوية العلامة"),
          description: t("Entrances, registration counters and branded walls that set the tone before guests reach the main event.", "مداخل وكاونترات تسجيل وجدران بهوية علامتك تصنع الانطباع الأول قبل أن يصل الضيوف إلى القاعة الرئيسية."),
        },
        {
          title: t("VIP & Hospitality Areas", "مناطق كبار الزوار والضيافة"),
          description: t("Lounges, majlis-style seating and premium guest zones finished to hospitality standard.", "صالات وجلسات على طراز المجلس ومناطق لكبار الضيوف بتشطيب يليق بمعايير الضيافة."),
        },
        {
          title: t("Interactive & Activation Zones", "مناطق التفاعل والتفعيل"),
          description: t("Engagement spaces and product-experience zones built around a specific activation concept.", "مساحات تفاعلية لتجربة المنتجات، تُصمَّم لفكرة تفعيل محددة."),
        },
        {
          title: t("Experience Centers", "مراكز التجارب"),
          description: t("Immersive or semi-permanent spaces that communicate a product or brand story through the space itself.", "مساحات غامرة أو شبه دائمة تروي قصة المنتج أو العلامة من خلال تصميم المكان نفسه."),
        },
      ],
    },
    hero: {
      headline: t("We build the spaces where experiences happen.", "نبني المكان الذي تحدث فيه التجربة."),
      support: t("Structural, scenic and branded builds for events and activations.", "أعمال إنشائية وديكورات مسرحية وهياكل بهوية العلامة للفعاليات والتفعيلات."),
      bullets: [t("Stages, scenic structures and branded entrances", "منصات وهياكل مسرحية ومداخل بهوية علامتك"), t("VIP lounges and hospitality areas", "صالات كبار الزوار ومناطق الضيافة"), t("Interactive zones and experience centers", "مناطق تفاعلية ومراكز تجارب"), t("Custom one-off installations", "تركيبات مخصصة تُنفَّذ لمرة واحدة")],
      catalogueCta: t("See All Event Structures", "استعرض جميع هياكل الفعاليات"),
    },
    catalogue: {
      title: t("All Event Structures", "جميع هياكل الفعاليات"),
      support: t("Every structure CPS fabricates for corporate events, activations and conferences.", "كل ما تصنّعه CPS للفعاليات المؤسسية والتفعيلات والمؤتمرات."),
      categories: [category("Event Structures", "هياكل الفعاليات", [
        item("Stage & Scenic Fabrication", "المنصات والديكورات المسرحية", "Stages, scenic backdrops and podiums built to your run-of-show and rigging requirements.", "منصات وخلفيات مسرحية ومنابر تُنفَّذ وفق برنامج الفعالية ومتطلبات التعليق."),
        item("Branded Event Structures", "هياكل الفعاليات بهوية العلامة", "Entrances, registration counters and branded walls for a coordinated event arrival.", "مداخل وكاونترات تسجيل وجدران بهوية علامتك لاستقبال منظّم ومتناسق."),
        item("VIP & Hospitality Areas", "مناطق كبار الزوار والضيافة", "Lounges, majlis-style seating and premium guest zones.", "صالات وجلسات على طراز المجلس ومناطق مميزة لكبار الضيوف."),
        item("Photo & Content Experiences", "تجارب التصوير وصناعة المحتوى", "Branded photo backdrops and social-media corners built for shareable content.", "خلفيات تصوير وزوايا بهوية علامتك، صُمّمت لمحتوى يتشاركه الزوار على منصات التواصل."),
        item("Interactive & Activation Zones", "مناطق التفاعل والتفعيل", "Product-experience and engagement zones built around a specific activation.", "مناطق لتجربة المنتجات والتفاعل معها، تُصمَّم لتفعيل محدد."),
        item("Experience Centers", "مراكز التجارب", "Immersive or semi-permanent spaces that communicate a brand story through the space.", "مساحات غامرة أو شبه دائمة تروي قصة العلامة من خلال المكان."),
        item("Custom Event Installations", "تركيبات فعاليات مخصصة", "One-off structures for a concept that doesn't fit a standard category.", "هياكل خاصة لأفكار لا تندرج تحت فئة قياسية."),
      ])],
    },
    why: { headline: t("Why brands choose CPS for event builds", "لماذا تختار العلامات التجارية CPS لتجهيز الفعاليات؟"), support: t("Structural, scenic and branded work handled by one crew.", "فريق واحد يتولى الأعمال الإنشائية والديكور المسرحي والهوية."), items: [t("Structural, scenic and branding built by the same team", "الإنشاء والديكور والهوية ينفّذها الفريق نفسه"), t("Rigging and technical build experience for stage work", "خبرة في أعمال التعليق والتنفيذ الفني للمنصات"), t("Fast turnaround for activation-driven timelines", "تنفيذ سريع يواكب المواعيد الضيقة للتفعيلات"), t("One crew from fabrication through on-site install", "فريق واحد من التصنيع حتى التركيب في الموقع")] },
    benefits: [t("Consistent brand execution across every touchpoint", "تطبيق متسق لهوية علامتك في كل نقاط التواصل مع الضيوف"), t("On-site technical support during the event", "دعم فني في الموقع طوال الفعالية"), t("Custom builds for one-off concepts", "تنفيذات مخصصة للأفكار التي تُقدَّم لمرة واحدة"), t("Coordinated logistics for multi-structure events", "لوجستيات منسقة للفعاليات متعددة الهياكل")],
    industries: [industries.government, industries.banking, industries.fmcg, industries.retail, industries.hospitality, industries.sports],
    related: ["exhibitions-booths", "rental-solutions", "installation-project-delivery"],
    faq: [faq("How far in advance should we brief an event build?", "متى ينبغي أن نرسل موجز تجهيز الفعالية؟", "The earlier the better for stage or rigging-heavy builds — get in touch as soon as the venue and date are set.", "كلما كان مبكراً كان أفضل، خصوصاً للأعمال التي تتضمن منصات أو أعمال تعليق كبيرة؛ تواصل معنا بمجرد تحديد المكان والموعد."), faq("Can you build stages with specific rigging or load requirements?", "هل تنفّذون منصات بمتطلبات تعليق أو أحمال محددة؟", "Yes, stage and scenic fabrication is built to your technical and rigging specs.", "نعم، نصنّع المنصات والعناصر المسرحية وفق مواصفاتك الفنية ومتطلبات التعليق."), faq("Do you handle teardown the same night?", "هل تتولون التفكيك في الليلة نفسها؟", "Yes — dismantling is coordinated around the event's move-out schedule.", "نعم، ننسّق أعمال الفك وفق جدول إخلاء موقع الفعالية."), faq("Can VIP or hospitality areas be added to an existing structure?", "هل يمكن إضافة مناطق لكبار الزوار أو الضيافة إلى هيكل قائم؟", "Yes, these can be built as an extension of an existing stage or event structure.", "نعم، يمكن تنفيذها امتداداً لمنصة أو هيكل قائم في الفعالية.")],
    closingNoun: t("event structure", "هيكل فعالية"),
  },
  {
    slug: "fit-out-interiors",
    image: media.services.fitOut,
    banner: media.serviceBanners.fitOut,
    title: t("Fit-Out & Interiors", "التجهيزات الداخلية"),
    excerpt: t("Commercial interiors, offices, showrooms, retail and branded spaces.", "مساحات تجارية ومكاتب وصالات عرض ومتاجر ومساحات بهوية العلامة."),
    showcase: {
      title: t("Featured Fit-Out Types", "أبرز أعمال التجهيز الداخلي"),
      items: [
        {
          title: t("Office Fit-Out", "تجهيز المكاتب"),
          description: t("Workspaces, meeting rooms and executive environments finished end-to-end, from partitioning to furniture.", "مساحات عمل وغرف اجتماعات ومكاتب إدارية نجهّزها بالكامل، من القواطع حتى الأثاث."),
        },
        {
          title: t("Showroom Fit-Out", "تجهيز صالات العرض"),
          description: t("Corporate, product and sales showrooms built to hold up under daily foot traffic and repeated demos.", "صالات عرض للشركات والمنتجات والمبيعات، تتحمل حركة الزوار اليومية والعروض التوضيحية المتكررة."),
        },
        {
          title: t("Retail Fit-Out", "تجهيز المتاجر"),
          description: t("Full stores, shop-in-shop concepts and branded corners inside a host retailer.", "متاجر متكاملة، ومتاجر داخل متاجر (shop-in-shop)، وزوايا بهوية علامتك داخل متاجر الشركاء."),
        },
        {
          title: t("Reception & Corporate Areas", "مناطق الاستقبال والمساحات المؤسسية"),
          description: t("Front-of-house spaces built as the first physical impression of the brand.", "مساحات استقبال تُصمَّم لتكون أول انطباع يلمسه زوارك عن علامتك."),
        },
        {
          title: t("Brand Corners", "زوايا العلامة التجارية"),
          description: t("Dedicated branded zones inside offices, retail floors, exhibitions or partner sites.", "مساحات مخصصة لعلامتك داخل المكاتب أو المتاجر أو المعارض أو مواقع الشركاء."),
        },
      ],
    },
    hero: { headline: t("From empty space to branded environment.", "من مساحة فارغة إلى مكان يعبّر عن علامتك."), support: t("Commercial interiors built and finished end-to-end.", "نجهّز المساحات التجارية ونشطّبها بالكامل، من المخطط حتى التسليم."), bullets: [t("Office, showroom and retail fit-outs", "تجهيز المكاتب وصالات العرض والمتاجر"), t("Reception and corporate front-of-house spaces", "مناطق الاستقبال والواجهات المؤسسية"), t("Branded corners and custom interior elements", "زوايا للعلامة التجارية وعناصر داخلية مخصصة"), t("One team from drawing to final finishing", "فريق واحد من المخططات حتى التشطيب النهائي")], catalogueCta: t("See All Fit-Out Types", "استعرض جميع أنواع التجهيز") },
    catalogue: { title: t("All Fit-Out Types", "جميع أنواع التجهيز الداخلي"), support: t("Every interior environment CPS delivers, from a single counter to a full fit-out.", "كل ما تنفّذه CPS من تجهيزات داخلية، من كاونتر واحد إلى تجهيز مساحة كاملة."), categories: [category("Fit-Out Types", "أنواع التجهيز", [
      item("Office Fit-Out", "تجهيز المكاتب", "Workspaces, meeting rooms and executive offices finished end-to-end.", "مساحات عمل وغرف اجتماعات ومكاتب إدارية نجهّزها بالكامل."),
      item("Showroom Fit-Out", "تجهيز صالات العرض", "Corporate, product, experience and sales showrooms.", "صالات عرض للشركات والمنتجات والتجارب والمبيعات."),
      item("Retail Fit-Out", "تجهيز المتاجر", "Retail stores, shop-in-shop concepts, branded corners and kiosks.", "متاجر، ومتاجر داخل متاجر، وزوايا بهوية العلامة، وأكشاك."),
      item("Reception & Corporate Areas", "مناطق الاستقبال والمساحات المؤسسية", "Front-of-house spaces and client-facing corporate environments.", "مساحات استقبال ومساحات مؤسسية مهيّأة لاستقبال العملاء."),
      item("Brand Corners", "زوايا العلامة التجارية", "Dedicated branded spaces inside offices, retail, exhibitions or partner sites.", "مساحات مخصصة للعلامة داخل المكاتب أو المتاجر أو المعارض أو مواقع الشركاء."),
      item("Custom Interior Elements", "عناصر داخلية مخصصة", "Counters, cabinetry, feature walls and display units built to match the space.", "كاونترات وخزائن وجدران مميزة ووحدات عرض تُصنع على مقاس المساحة."),
    ])] },
    why: { headline: t("Why brands choose CPS for fit-outs", "لماذا تختار العلامات التجارية CPS للتجهيز الداخلي؟"), support: t("One contractor for partitioning, finishes, branding and furniture.", "مقاول واحد للقواطع والتشطيبات والهوية والأثاث."), items: [t("One team for partitioning, finishes, branding and furniture", "فريق واحد يتولى القواطع والتشطيبات والهوية والأثاث"), t("Coordinated site works with minimal downtime", "أعمال موقع منسقة بأقل قدر من تعطيل العمل"), t("In-house joinery and metalwork for custom elements", "نجارة وأعمال معدنية في مصنعنا للعناصر المخصصة"), t("Fit-outs built to daily-use durability standards", "تجهيزات مصممة لتتحمل الاستخدام اليومي")] },
    benefits: [t("Single contractor across design, fabrication and install", "مقاول واحد للتصميم والتصنيع والتركيب"), t("Consistent brand application throughout the space", "هوية متسقة في كل أرجاء المساحة"), t("Reduced coordination overhead versus multiple contractors", "جهد تنسيق أقل مقارنة بالتعامل مع عدة مقاولين"), t("Custom elements matched to existing interiors", "عناصر مخصصة تنسجم مع التصميم الداخلي القائم")],
    industries: [industries.banking, industries.realEstate, industries.retail, industries.healthcare, industries.technology, industries.hospitality],
    related: ["retail-displays", "custom-fabrication", "printing-signage"],
    faq: [faq("Can you fit out an occupied office without disrupting work?", "هل يمكن تجهيز مكتب قائم دون تعطيل العمل؟", "Yes, phased fit-out schedules can be planned around business hours.", "نعم، يمكننا التنفيذ على مراحل وفق جدول يراعي ساعات العمل."), faq("Do you handle permits and approvals?", "هل تتولون استخراج التصاريح والموافقات؟", "Site survey and technical drawing stages flag what's needed — let's discuss your specific site.", "تحدد معاينة الموقع ومرحلة الرسومات الفنية ما يلزم من تصاريح؛ تواصل معنا لنناقش متطلبات موقعك."), faq("Can a retail fit-out be replicated across multiple stores?", "هل يمكن تكرار تجهيز المتجر في عدة فروع؟", "Yes, retail fit-outs can be standardized and rolled out across locations.", "نعم، يمكن توحيد مواصفات التجهيز وتنفيذه في جميع فروعك."), faq("What's the typical timeline for an office fit-out?", "ما المدة المعتادة لتجهيز مكتب؟", "Depends on scope and site condition — request a quote for a schedule specific to your space.", "تعتمد على نطاق العمل وحالة الموقع؛ اطلب عرض سعر لتحصل على جدول زمني خاص بمساحتك.")],
    closingNoun: t("fit-out", "تجهيز داخلي"),
  },
  {
    slug: "retail-displays",
    image: media.services.retail,
    banner: media.serviceBanners.retail,
    title: t("Retail Displays", "وحدات العرض ونقاط البيع"),
    excerpt: t("Gondolas, product displays, POS/POP units, kiosks and window displays.", "جندولات وحوامل منتجات ووحدات نقاط البيع وأكشاك وواجهات عرض."),
    showcase: {
      title: t("Featured Display Types", "أبرز وحدات العرض"),
      items: [
        {
          title: t("Gondolas", "جندولات"),
          description: t("Freestanding or wall-adjacent units built for organized, high-volume product merchandising.", "وحدات مستقلة أو ملاصقة للجدار، لعرض كميات كبيرة من المنتجات بترتيب واضح."),
        },
        {
          title: t("Product Display Stands", "حوامل عرض المنتجات"),
          description: t("Structures sized and shaped around a specific product line and how shoppers interact with it.", "هياكل تُصمَّم مقاساتها وأشكالها حول خط منتجات محدد وطريقة تعامل المتسوق معه."),
        },
        {
          title: t("POS Displays", "وحدات نقاط البيع"),
          description: t("Point-of-sale units placed to convert attention into purchase right at the till.", "وحدات توضع عند نقطة الدفع لتحوّل اهتمام المتسوق إلى قرار شراء."),
        },
        {
          title: t("Promotional Kiosks", "أكشاك ترويجية"),
          description: t("Compact branded structures for sampling, sales and short-run promotions.", "هياكل صغيرة بهوية علامتك لتوزيع العينات والبيع والحملات الترويجية القصيرة."),
        },
        {
          title: t("Window Displays", "واجهات العرض"),
          description: t("Storefront visual merchandising built to stop foot traffic from the street.", "عروض مرئية لواجهات المتاجر تستوقف المارة من الشارع."),
        },
      ],
    },
    hero: { headline: t("Designed to be seen. Built to sell.", "عرض يلفت النظر ويدفع إلى الشراء."), support: t("Custom retail displays built for visibility and merchandising.", "وحدات عرض مخصصة تمنح منتجك حضوراً أوضح وعرضاً أكثر تنظيماً."), bullets: [t("Gondolas and product display stands", "جندولات وحوامل عرض منتجات"), t("POS/POP units for promotions and campaigns", "وحدات نقاط البيع والشراء للعروض والحملات"), t("Kiosks, window and countertop displays", "أكشاك وواجهات عرض ووحدات للكاونتر"), t("One-off units or multi-location rollouts", "وحدة واحدة أو تنفيذ موحّد في عدة فروع")], catalogueCta: t("See All Display Types", "استعرض جميع وحدات العرض") },
    catalogue: { title: t("All Display Types", "جميع وحدات العرض"), support: t("Every retail display format CPS produces, as a one-off unit or scaled across locations.", "كل أنواع وحدات العرض التي تنتجها CPS، وحدةً واحدة أو بكميات تغطي عدة فروع."), categories: [category("Display Types", "أنواع وحدات العرض", [
      item("Gondolas", "جندولات", "Freestanding or wall-adjacent units for organized, high-volume merchandising.", "وحدات مستقلة أو ملاصقة للجدار، لعرض كميات كبيرة من المنتجات بترتيب واضح."),
      item("Product Display Stands", "حوامل عرض المنتجات", "Structures sized and shaped around a specific product line.", "هياكل تُصمَّم مقاساتها وأشكالها حول خط منتجات محدد."),
      item("POS Displays", "وحدات نقاط البيع", "Point-of-sale units placed to convert attention into purchase.", "وحدات عند نقطة الدفع تحوّل اهتمام المتسوق إلى شراء."),
      item("POP Displays", "وحدات نقاط الشراء (POP)", "Campaign-led point-of-purchase units for promotional and seasonal pushes.", "وحدات ترويجية في مواقع الشراء تدعم الحملات والمواسم."),
      item("Promotional Kiosks", "أكشاك ترويجية", "Compact branded structures for sampling, sales and short-run promotions.", "هياكل صغيرة بهوية علامتك لتوزيع العينات والبيع والحملات الترويجية القصيرة."),
      item("Window Displays", "واجهات العرض", "Storefront visual merchandising built to stop foot traffic from the street.", "عروض مرئية لواجهات المتاجر تستوقف المارة من الشارع."),
      item("Countertop Displays", "وحدات عرض للكاونتر", "Small-format branded units for counters, shelves and high-traffic touchpoints.", "وحدات صغيرة بهوية علامتك للكاونترات والأرفف والمواقع الأكثر ازدحاماً."),
      item("Free-Standing Display Units", "وحدات عرض قائمة بذاتها", "Standalone structures for retail floors, malls and temporary placements.", "هياكل مستقلة لصالات المتاجر ومراكز التسوق والمواقع المؤقتة."),
      item("Custom Brand Displays", "وحدات عرض مخصصة لعلامتك", "Bespoke concepts combining wood, metal, acrylic, print and lighting as required.", "تصاميم خاصة تجمع الخشب والمعدن والأكريليك والطباعة والإضاءة حسب الحاجة."),
    ])] },
    why: { headline: t("Why brands choose CPS for retail displays", "لماذا تختار العلامات التجارية CPS لوحدات العرض؟"), support: t("Displays engineered to hold up under daily retail traffic.", "وحدات عرض مصممة لتتحمل حركة المتسوقين اليومية."), items: [t("Displays engineered for durability under daily foot traffic", "وحدات متينة تتحمل حركة المتسوقين اليومية"), t("In-house acrylic, wood and metal production", "إنتاج الأكريليك والخشب والمعدن في مصنعنا"), t("Multi-location rollout capability", "قدرة على التنفيذ الموحّد في فروع متعددة"), t("Fast production for promotional and seasonal campaigns", "إنتاج سريع للحملات الترويجية والموسمية")] },
    benefits: [t("Consistent quality across multi-store rollouts", "جودة ثابتة في جميع الفروع"), t("Materials matched to product and brand requirements", "مواد تناسب طبيعة المنتج ومتطلبات العلامة"), t("Scalable from one-off units to national rollouts", "من وحدة واحدة إلى تنفيذ يغطي المملكة"), t("Coordinated delivery and installation across locations", "توصيل وتركيب منسقان في جميع المواقع")],
    industries: [industries.retail, industries.fmcg, industries.beauty, industries.technology, industries.automotive, industries.fashion],
    related: ["fit-out-interiors", "printing-signage", "custom-fabrication"],
    faq: [faq("Can you produce and install across multiple store locations?", "هل يمكنكم الإنتاج والتركيب في عدة فروع؟", "Yes, display rollouts are coordinated across as many locations as needed.", "نعم، ننسّق تنفيذ وحدات العرض في أي عدد تحتاجه من المواقع."), faq("What materials do you typically use?", "ما المواد التي تستخدمونها عادةً؟", "Wood, metal and acrylic, matched to the product and the brand's finish requirements.", "الخشب والمعدن والأكريليك، بحسب طبيعة المنتج ومتطلبات التشطيب لدى العلامة."), faq("Can displays be updated or rebranded later?", "هل يمكن تحديث وحدات العرض أو تغيير هويتها لاحقاً؟", "Yes — see Rebranding under Installation & Project Delivery.", "نعم، اطّلع على خدمة «تحديث الهوية» ضمن التركيب وتسليم المشاريع."), faq("Is there a minimum order for a display rollout?", "هل يوجد حد أدنى للطلب؟", "No fixed minimum — one-off units and multi-location rollouts are both handled.", "لا يوجد حد أدنى ثابت؛ ننفّذ الوحدة الواحدة كما ننفّذ المشاريع الموزعة على عدة مواقع.")],
    closingNoun: t("display rollout", "مشروع وحدات عرض"),
  },
  {
    slug: "custom-fabrication",
    image: media.services.fabrication,
    banner: media.serviceBanners.fabrication,
    title: t("Custom Fabrication", "التصنيع المخصص"),
    excerpt: t("Wood, metal, acrylic, CNC and mixed-material bespoke fabrication.", "تصنيع حسب الطلب بالخشب والمعدن والأكريليك وتقنية CNC وبمواد متعددة."),
    showcase: {
      title: t("Featured Fabrication Capabilities", "أبرز قدرات التصنيع"),
      items: [
        {
          title: t("Custom Wood Fabrication", "التصنيع الخشبي المخصص"),
          description: t("Bespoke joinery built to drawing, from structural frames to finished cabinetry.", "أعمال نجارة وفق الرسومات، من الهياكل الإنشائية حتى الخزائن بتشطيبها النهائي."),
        },
        {
          title: t("Metal Frames", "الإطارات المعدنية"),
          description: t("Structural framing for booths, stages and fit-out builds.", "هياكل معدنية إنشائية للأجنحة والمنصات وأعمال التجهيز الداخلي."),
        },
        {
          title: t("Acrylic Displays", "وحدات عرض من الأكريليك"),
          description: t("Clear or coloured acrylic structures built for product presentation.", "هياكل من الأكريليك الشفاف أو الملوّن لعرض المنتجات."),
        },
        {
          title: t("CNC Routing", "التفريز بتقنية CNC"),
          description: t("Automated precision routing for wood, acrylic and composite materials.", "تفريز آلي دقيق للخشب والأكريليك والمواد المركّبة."),
        },
        {
          title: t("Integrated Mixed-Material Builds", "تنفيذات متكاملة متعددة المواد"),
          description: t("Wood, metal, acrylic, print and lighting combined into a single structure when the brief calls for it.", "نجمع الخشب والمعدن والأكريليك والطباعة والإضاءة في هيكل واحد عندما يتطلب المشروع ذلك."),
        },
      ],
    },
    hero: { headline: t("If it can be engineered, we can build it.", "إن أمكن هندسته، أمكننا تصنيعه."), support: t("Multi-discipline fabrication under one roof.", "تخصصات تصنيع متعددة تحت سقف واحد."), bullets: [t("Wood & joinery, CNC-cut and finished in-house", "نجارة وقطع CNC وتشطيب في مصنعنا"), t("Metal fabrication, framing and powder coating", "تصنيع معدني وهياكل ودهان بالبودرة"), t("Acrylic fabrication and custom structures", "تصنيع الأكريليك وهياكل مخصصة"), t("Mixed-material builds combining several disciplines", "تنفيذات متعددة المواد تجمع أكثر من تخصص")], catalogueCta: t("See All Fabrication Capabilities", "استعرض جميع قدرات التصنيع") },
    catalogue: { title: t("All Fabrication Capabilities", "جميع قدرات التصنيع"), support: t("Every discipline and item CPS produces in-house, by material and process.", "كل ما تصنّعه CPS في مصنعها، مصنّفاً حسب المادة وطريقة التصنيع."), categories: [
      category("Wood & Joinery", "الخشب والنجارة", [item("Custom Wood Fabrication", "التصنيع الخشبي المخصص", "Bespoke joinery built to drawing, from structural frames to finished cabinetry.", "أعمال نجارة وفق الرسومات، من الهياكل الإنشائية حتى الخزائن بتشطيبها النهائي."), item("CNC Wood Cutting", "قطع الخشب بتقنية CNC", "Precision-cut wood components with repeatable accuracy across a full production run.", "مكونات خشبية مقطوعة بدقة ثابتة على امتداد دفعة الإنتاج كاملة."), item("Cabinets & Counters", "الخزائن والكاونترات", "Storage and service counters built to fit the exact footprint of the space.", "خزائن وكاونترات خدمة تُصنع على مقاس المساحة بدقة."), item("Display Units", "وحدات العرض", "Wood-based display structures sized around the product or brand requirement.", "وحدات عرض خشبية بمقاسات تناسب المنتج أو متطلبات العلامة."), item("Decorative Structures", "هياكل زخرفية", "Feature elements built for visual impact rather than pure function.", "عناصر جمالية تُصمَّم لأثرها البصري لا لوظيفتها فقط.")]),
      category("Metal Fabrication", "التصنيع المعدني", [item("Metal Frames", "الإطارات المعدنية", "Structural framing for booths, stages and fit-out builds.", "هياكل معدنية إنشائية للأجنحة والمنصات وأعمال التجهيز الداخلي."), item("Structural Frames", "هياكل إنشائية", "Load-bearing frameworks engineered for double-decker and large-format structures.", "هياكل حاملة مصممة هندسياً للأجنحة ذات الطابقين والهياكل الكبيرة."), item("Custom Metal Works", "أعمال معدنية مخصصة", "Bespoke metal components fabricated to spec for non-standard builds.", "مكونات معدنية تُصنع وفق المواصفات للأعمال غير القياسية."), item("Laser Cutting", "القطع بالليزر", "Precision-cut metal parts and panels for signage, displays and structural detail.", "أجزاء وألواح معدنية مقطوعة بدقة للافتات ووحدات العرض والتفاصيل الإنشائية.", "metal-laser-cutting"), item("Powder Coating", "الدهان بالبودرة", "Durable, colour-matched metal finishing for a consistent brand palette.", "تشطيب معدني متين بألوان مطابقة لهوية علامتك.")]),
      category("Acrylic Fabrication", "تصنيع الأكريليك", [item("Acrylic Displays", "وحدات عرض من الأكريليك", "Clear or coloured acrylic structures built for product presentation.", "هياكل من الأكريليك الشفاف أو الملوّن لعرض المنتجات."), item("Acrylic Boxes", "صناديق أكريليك", "Custom-sized acrylic enclosures for retail, display or protective use.", "صناديق أكريليك بمقاسات خاصة للمتاجر أو العرض أو الحماية."), item("Product Displays", "حوامل المنتجات", "Acrylic mounts and stands shaped around a specific product line.", "قواعد وحوامل أكريليك تُشكَّل حول خط منتجات محدد."), item("Acrylic Signage", "لافتات أكريليك", "Cut and finished acrylic signage, illuminated or static.", "لافتات أكريليك مقطوعة ومشطّبة، مضيئة أو غير مضيئة."), item("Custom Acrylic Structures", "هياكل أكريليك مخصصة", "One-off acrylic builds for non-standard display or branding needs.", "أعمال أكريليك خاصة لاحتياجات عرض أو هوية غير قياسية.")]),
      category("CNC & Precision Cutting", "القطع الدقيق وتقنية CNC", [item("CNC Routing", "التفريز بتقنية CNC", "Automated precision routing for wood, acrylic and composite materials.", "تفريز آلي دقيق للخشب والأكريليك والمواد المركّبة."), item("CNC Cutting", "القطع بتقنية CNC", "Repeatable, high-accuracy cutting across production runs of any size.", "قطع عالي الدقة بنتائج ثابتة في دفعات الإنتاج مهما كان حجمها."), item("Laser Cutting", "القطع بالليزر", "Fine-detail cutting for signage, displays and decorative components.", "قطع دقيق للتفاصيل الصغيرة في اللافتات ووحدات العرض والعناصر الزخرفية.", "cnc-laser-cutting"), item("Custom Shapes & Components", "أشكال ومكونات مخصصة", "Non-standard shapes and parts cut to a specific technical drawing.", "أشكال وأجزاء غير قياسية تُقطع وفق رسم فني محدد.")]),
      category("Mixed-Material Fabrication", "التصنيع متعدد المواد", [item("Integrated Mixed-Material Builds", "تنفيذات متكاملة متعددة المواد", "Wood, metal, acrylic, print and lighting combined into a single structure when the brief calls for it.", "نجمع الخشب والمعدن والأكريليك والطباعة والإضاءة في هيكل واحد عندما يتطلب المشروع ذلك.")]),
    ] },
    why: { headline: t("Why brands choose CPS for custom fabrication", "لماذا تختار العلامات التجارية CPS للتصنيع المخصص؟"), support: t("Every major discipline sits under one roof, not spread across subcontractors.", "كل التخصصات الرئيسية في مصنع واحد، لا موزعة على مقاولين من الباطن."), items: [t("Multiple disciplines under one roof — no subcontracted trades", "تخصصات متعددة في مصنع واحد — دون مقاولين من الباطن"), t("CNC precision with in-house finishing", "دقة CNC مع تشطيب في مصنعنا"), t("Built to technical drawing, not approximate spec", "تنفيذ وفق الرسومات الفنية، لا وفق مواصفات تقريبية"), t("Capacity for both one-off and production-run quantities", "قدرة على تنفيذ القطع الفردية ودفعات الإنتاج الكاملة")] },
    benefits: [t("Tighter quality control across every material", "رقابة أدق على الجودة في كل المواد"), t("Faster iteration since fabrication stays in-house", "تعديلات أسرع لأن التصنيع يتم في مصنعنا"), t("Mixed-material builds without coordinating separate vendors", "تنفيذ متعدد المواد دون تنسيق مع موردين منفصلين"), t("Scales from prototypes to full production runs", "من النموذج الأولي حتى الإنتاج الكامل")],
    industries: [industries.retail, industries.fmcg, industries.beauty, industries.realEstate, industries.hospitality, industries.technology],
    related: ["printing-signage", "exhibitions-booths", "fit-out-interiors"],
    faq: [faq("Can you fabricate from a 3D file or technical drawing?", "هل يمكنكم التصنيع من ملف ثلاثي الأبعاد أو رسم فني؟", "Yes — production runs from approved technical drawings, CAD or 3D files.", "نعم، ننتج وفق الرسومات الفنية أو ملفات CAD أو الملفات ثلاثية الأبعاد بعد اعتمادها."), faq("What materials can you combine in one build?", "ما المواد التي يمكن الجمع بينها في قطعة واحدة؟", "Wood, metal, acrylic, print and lighting can all be combined in a single mixed-material build.", "يمكن الجمع بين الخشب والمعدن والأكريليك والطباعة والإضاءة في تنفيذ واحد."), faq("Do you handle small production runs, not just one-offs?", "هل تنفّذون دفعات إنتاج صغيرة، لا القطع الفردية فقط؟", "Yes, CNC and cutting capacity supports both prototypes and full production runs.", "نعم، تستوعب قدراتنا في CNC والقطع النماذج الأولية ودفعات الإنتاج الكاملة."), faq("Can you match an existing finish or colour?", "هل يمكن مطابقة تشطيب أو لون قائم؟", "Yes — powder coating and finishing are colour-matched to your brand or an existing sample.", "نعم، نطابق ألوان الدهان بالبودرة والتشطيبات مع هوية علامتك أو مع عينة لديك.")],
    closingNoun: t("fabrication project", "مشروع تصنيع"),
  },
  {
    slug: "printing-signage",
    image: media.services.printing,
    banner: media.serviceBanners.printing,
    title: t("Printing & Signage", "الطباعة واللافتات"),
    excerpt: t("Large-format graphics, environmental branding and signage systems.", "طباعة كبيرة الحجم، وهوية بصرية للمساحات، وأنظمة لافتات متكاملة."),
    showcase: {
      title: t("Featured Print & Signage Products", "أبرز منتجات الطباعة واللافتات"),
      items: [
        {
          title: t("Vinyl Printing", "طباعة الفينيل"),
          description: t("Durable vinyl prints for walls, floors, vehicles and large-format graphics.", "مطبوعات فينيل متينة للجدران والأرضيات والمركبات والرسومات كبيرة الحجم."),
        },
        {
          title: t("Illuminated Letters", "حروف مضيئة"),
          description: t("Halo- or face-lit dimensional letters for premium brand presence.", "حروف بارزة بإضاءة خلفية أو أمامية تمنح علامتك حضوراً راقياً."),
        },
        {
          title: t("Roll-Up Banners", "بانرات رول أب"),
          description: t("Portable pull-up banners for quick setup at any event.", "بانرات محمولة سريعة التركيب تناسب أي فعالية."),
        },
        {
          title: t("Wall Graphics", "رسومات الجدران"),
          description: t("Large-format wall applications for offices, retail and exhibition interiors.", "رسومات كبيرة الحجم لجدران المكاتب والمتاجر وأجنحة المعارض."),
        },
        {
          title: t("Light Boxes", "صناديق الإضاءة"),
          description: t("Illuminated signage boxes for retail, corporate and exhibition use.", "لوحات مضيئة للمتاجر ومقرات الشركات والمعارض."),
        },
      ],
    },
    hero: { headline: t("Branding that moves from screen to space.", "هوية تنتقل من الشاشة إلى المكان."), support: t("Print and signage production, coordinated with installation.", "إنتاج الطباعة واللافتات بتنسيق كامل مع التركيب."), bullets: [t("Large-format and environmental graphics", "طباعة كبيرة الحجم ورسومات للمساحات"), t("Indoor, outdoor and illuminated signage", "لافتات داخلية وخارجية ومضيئة"), t("Wayfinding and safety signage", "لافتات إرشادية ولافتات السلامة"), t("Digital signage structures", "هياكل للشاشات الرقمية")], catalogueCta: t("See All Print & Signage Products", "استعرض جميع منتجات الطباعة واللافتات") },
    catalogue: { title: t("All Print & Signage Products", "جميع منتجات الطباعة واللافتات"), support: t("Every product CPS produces, from a single banner to full building signage.", "كل ما تنتجه CPS، من بانر واحد إلى لافتات مبنى كامل."), searchable: true, categories: [
      category("Large Format Printing", "الطباعة كبيرة الحجم", [item("Vinyl Printing", "طباعة الفينيل", "Durable vinyl prints for walls, floors, vehicles and large-format graphics.", "مطبوعات فينيل متينة للجدران والأرضيات والمركبات والرسومات كبيرة الحجم."), item("Fabric Printing", "طباعة الأقمشة", "Soft-signage fabric prints for backdrops, tension frames and stretch displays.", "طباعة قماشية للخلفيات وإطارات الشد ووحدات العرض القماشية."), item("Banner Printing", "طباعة البانرات", "Weather-ready banners for indoor and outdoor use.", "بانرات تتحمل الظروف الجوية للاستخدام الداخلي والخارجي."), item("Backdrop Printing", "طباعة الخلفيات", "Full-scale printed backdrops for stages, photo walls and booths.", "خلفيات مطبوعة بالحجم الكامل للمنصات وجدران التصوير والأجنحة."), item("Foam Boards", "ألواح الفوم", "Lightweight rigid boards for short-run signage and display graphics.", "ألواح خفيفة وصلبة للافتات والرسومات قصيرة الاستخدام.")]),
      category("Environmental Graphics", "رسومات المساحات", [item("Wall Graphics", "رسومات الجدران", "Large-format wall applications for offices, retail and exhibition interiors.", "رسومات كبيرة الحجم لجدران المكاتب والمتاجر وأجنحة المعارض."), item("Window Graphics", "رسومات النوافذ", "Vinyl window applications for branding, privacy or promotions.", "ملصقات فينيل للنوافذ لإبراز الهوية أو توفير الخصوصية أو الترويج."), item("Interior Branding", "الهوية البصرية الداخلية", "Coordinated graphic branding applied across an entire interior space.", "رسومات هوية منسقة تغطي المساحة الداخلية بالكامل."), item("Applied Vinyl Graphics", "ملصقات الفينيل", "Cut and printed vinyl applied directly to surfaces and structures.", "فينيل مقطوع أو مطبوع يُلصق مباشرة على الأسطح والهياكل.")]),
      category("Event & Exhibition Graphics", "رسومات الفعاليات والمعارض", [item("Booth Graphics", "رسومات الأجنحة", "Printed graphics fitted to booth structures and panels.", "رسومات مطبوعة تُركب على هياكل الأجنحة وألواحها."), item("Exhibition Graphics", "رسومات المعارض", "Large-format graphics produced for exhibition halls and stands.", "رسومات كبيرة الحجم لقاعات المعارض وأجنحتها."), item("Branded Panels", "ألواح بهوية العلامة", "Printed panels used as structural or decorative branding elements.", "ألواح مطبوعة تؤدي دوراً إنشائياً أو زخرفياً وتُبرز هوية العلامة."), item("Event Branding Applications", "تطبيقات هوية الفعالية", "Graphics applied across an event's structures, signage and touchpoints.", "رسومات تغطي هياكل الفعالية ولافتاتها وكل نقاط التواصل مع الحضور.")]),
      category("Promotional Printing", "الطباعة الترويجية", [item("Roll-Up Banners", "بانرات رول أب", "Portable pull-up banners for quick setup at any event.", "بانرات محمولة سريعة التركيب تناسب أي فعالية."), item("Flags", "الأعلام", "Branded feather and teardrop flags for outdoor visibility.", "أعلام بشكل الريشة أو القطرة بهوية علامتك، لحضور أوضح في الأماكن المفتوحة."), item("Portable Branding", "عناصر هوية محمولة", "Lightweight, reusable branding pieces for repeat deployment.", "عناصر هوية خفيفة يُعاد استخدامها في مناسبات متكررة.")]),
      category("Indoor Signage", "اللافتات الداخلية", [item("Reception Signs", "لافتات الاستقبال", "Branded signage for front-of-house and reception areas.", "لافتات بهوية العلامة لمناطق الاستقبال والواجهة."), item("Office Signs", "لافتات المكاتب", "Interior signage for meeting rooms, departments and general wayfinding.", "لافتات لغرف الاجتماعات والأقسام والإرشاد العام داخل المكاتب."), item("Room Identification", "تعريف الغرف", "Door and room-ID signage for offices and facilities.", "لافتات تعريف الأبواب والغرف في المكاتب والمنشآت."), item("Directory Signs", "لوحات الدليل", "Building directory signage for multi-tenant or multi-department sites.", "لوحات دليل للمباني التي تضم عدة مستأجرين أو أقسام.")]),
      category("Outdoor Signage", "اللافتات الخارجية", [item("Building Signs", "لافتات المباني", "Exterior signage sized and engineered for building façades.", "لافتات خارجية بمقاسات وتصميم هندسي يناسبان واجهات المباني."), item("Entrance Signs", "لافتات المداخل", "Signage marking entrances, drop-offs and site access points.", "لافتات تحدد المداخل ومواقع إنزال الركاب ومنافذ الدخول إلى الموقع."), item("Outdoor Branding", "الهوية الخارجية", "Weather-rated branding applications for external environments.", "تطبيقات هوية مقاومة للعوامل الجوية للمساحات الخارجية."), item("Pylon Structures", "لوحات البايلون", "Freestanding pylon signage for roadside and site-entrance visibility.", "لوحات عمودية قائمة بذاتها تُرى من الطريق وعند مداخل المواقع.")]),
      category("Illuminated & 3D Signage", "اللافتات المضيئة وثلاثية الأبعاد", [item("Light Boxes", "صناديق الإضاءة", "Illuminated signage boxes for retail, corporate and exhibition use.", "لوحات مضيئة للمتاجر ومقرات الشركات والمعارض."), item("Illuminated Letters", "حروف مضيئة", "Halo- or face-lit dimensional letters for premium brand presence.", "حروف بارزة بإضاءة خلفية أو أمامية تمنح علامتك حضوراً راقياً."), item("3D Letters", "حروف ثلاثية الأبعاد", "Dimensional lettering, lit or unlit, for reception and façade branding.", "حروف مجسمة، مضيئة أو غير مضيئة، لهوية الاستقبال والواجهات."), item("Logo Signs", "لافتات الشعار", "Custom-fabricated logo signage sized for interior or exterior placement.", "لافتات شعار مصنّعة خصيصاً بمقاسات تناسب المواقع الداخلية أو الخارجية.")]),
      category("Wayfinding Systems", "أنظمة اللافتات الإرشادية", [item("Directional Signs", "لافتات التوجيه", "Directional signage guiding movement through a site or venue.", "لافتات توجّه الحركة داخل الموقع أو مكان الفعالية."), item("Directory Systems", "أنظمة الدليل", "Structured directory signage for larger multi-zone sites.", "لافتات دليل منظمة للمواقع الكبيرة متعددة المناطق."), item("Parking Signs", "لافتات المواقف", "Parking identification and directional signage.", "لافتات تعريف المواقف وتوجيه المركبات."), item("Navigation Systems", "أنظمة الإرشاد المتكاملة", "Coordinated wayfinding systems across a full facility.", "منظومة لافتات إرشادية منسقة تغطي المنشأة بالكامل.")]),
      category("Safety & Regulatory Signage", "لافتات السلامة والتنظيم", [item("Safety & Regulatory Signage", "لافتات السلامة والتنظيم", "Required safety identification and operational signage to code.", "لافتات السلامة والتشغيل المطلوبة وفق الأنظمة والاشتراطات.")]),
      category("Digital Signage Structures", "هياكل الشاشات الرقمية", [item("Screen Enclosures", "أغلفة الشاشات", "Enclosures built to house and protect digital display screens.", "أغلفة تحتضن شاشات العرض الرقمية وتحميها."), item("Freestanding Digital Structures", "هياكل رقمية قائمة بذاتها", "Standalone structures designed around a digital display.", "هياكل مستقلة مصممة حول شاشة عرض رقمية."), item("Digital Display Support Structures", "هياكل تثبيت الشاشات الرقمية", "Mounting and support structures for fixed or mobile digital signage.", "هياكل تثبيت ودعم للشاشات الرقمية الثابتة أو المتنقلة.")]),
    ] },
    why: { headline: t("Why brands choose CPS for print & signage", "لماذا تختار العلامات التجارية CPS للطباعة واللافتات؟"), support: t("Production and installation come from the same team.", "الفريق الذي ينتج لافتتك هو من يركّبها."), items: [t("Production and installation coordinated by one team", "فريق واحد ينسّق الإنتاج والتركيب"), t("In-house large-format printing, not outsourced", "طباعة كبيرة الحجم في مصنعنا، دون إسناد خارجي"), t("Illuminated and dimensional signage fabricated in-house", "لافتات مضيئة ومجسمة نصنّعها بأنفسنا"), t("Nationwide installation for indoor and outdoor signage", "تركيب اللافتات الداخلية والخارجية في جميع مناطق المملكة")] },
    benefits: [t("Faster turnaround from print to installed signage", "وقت أقصر من الطباعة حتى تركيب اللافتة"), t("Consistent brand colour and finish across formats", "ألوان وتشطيبات مطابقة لهوية علامتك في كل المواد"), t("One quote covers production and installation", "عرض سعر واحد يشمل الإنتاج والتركيب"), t("Scales from a single banner to full building signage", "من بانر واحد إلى لافتات مبنى كامل")],
    industries: [industries.retail, industries.banking, industries.realEstate, industries.government, industries.hospitality, industries.technology],
    related: ["custom-fabrication", "exhibitions-booths", "installation-project-delivery"],
    faq: [faq("Can you match our brand's exact colours?", "هل يمكن مطابقة ألوان علامتنا بدقة؟", "Yes, colour-matching is part of production for both print and painted/powder-coated signage.", "نعم، مطابقة الألوان جزء أساسي من إنتاج المطبوعات واللافتات المدهونة أو المطلية بالبودرة."), faq("Do you install what you print, or is that separate?", "هل تتولون تركيب ما تطبعونه، أم أن التركيب خدمة منفصلة؟", "Installation is coordinated as part of the same project — see Installation & Project Delivery.", "نُنسّق التركيب ضمن المشروع نفسه؛ اطّلع على خدمة التركيب وتسليم المشاريع."), faq("What's the lead time for large-format signage?", "ما مدة تنفيذ اللافتات كبيرة الحجم؟", "Depends on size and finish — request a quote for a schedule specific to your job.", "تعتمد على الحجم والتشطيب؛ اطلب عرض سعر لتحصل على جدول زمني خاص بطلبك."), faq("Can you produce outdoor-rated signage for façades?", "هل تنتجون لافتات واجهات مقاومة للعوامل الخارجية؟", "Yes — see Building Signs and Outdoor Branding in the catalogue.", "نعم، اطّلع على «لافتات المباني» و«الهوية الخارجية» في الكتالوج.")],
    closingNoun: t("signage project", "مشروع لافتات"),
  },
  {
    slug: "rental-solutions",
    image: media.services.rental,
    banner: media.serviceBanners.rental,
    title: t("Rental Solutions", "حلول التأجير"),
    excerpt: t("Reusable event, exhibition and display assets.", "أثاث وتجهيزات ووحدات عرض قابلة لإعادة الاستخدام للفعاليات والمعارض."),
    showcase: {
      title: t("Featured Rental Items", "أبرز عناصر التأجير"),
      items: [
        {
          title: t("Lounge Furniture", "أثاث الصالات"),
          description: t("Modular sofas and lounge seating for hospitality and VIP zones.", "أرائك معيارية وجلسات مريحة لمناطق الضيافة وكبار الزوار."),
        },
        {
          title: t("Registration Counters", "كاونترات التسجيل"),
          description: t("Counters built for event check-in and registration flow.", "كاونترات مصممة لتسجيل الحضور وتنظيم دخولهم إلى الفعالية."),
        },
        {
          title: t("Display Units", "وحدات العرض"),
          description: t("Reusable display structures available for short-term deployment.", "وحدات عرض قابلة لإعادة الاستخدام ومتاحة للتأجير قصير المدى."),
        },
        {
          title: t("Branded Props", "مجسمات بهوية العلامة"),
          description: t("Branded rental props for activations and photo moments.", "مجسمات للتأجير بهوية علامتك للتفعيلات وزوايا التصوير."),
        },
      ],
    },
    hero: { headline: t("Flexible assets for events and exhibitions.", "تجهيزات مرنة للفعاليات والمعارض."), support: t("Reusable furniture, counters and display assets.", "أثاث وكاونترات ووحدات عرض قابلة لإعادة الاستخدام."), bullets: [t("Event furniture and lounge seating", "أثاث فعاليات وجلسات صالات"), t("Registration and reception counters", "كاونترات تسجيل واستقبال"), t("Reusable display units", "وحدات عرض قابلة لإعادة الاستخدام"), t("Décor and branded props", "ديكور ومجسمات بهوية علامتك")], catalogueCta: t("See All Rental Items", "استعرض جميع عناصر التأجير") },
    catalogue: { title: t("All Rental Items", "جميع عناصر التأجير"), support: t("Everything available for short-term rental across furniture, counters, display and décor.", "كل ما نوفّره للتأجير قصير المدى: أثاث وكاونترات ووحدات عرض وديكور."), categories: [
      category("Event Furniture", "أثاث الفعاليات", [item("Lounge Furniture", "أثاث الصالات", "Modular sofas and lounge seating for hospitality and VIP zones.", "أرائك معيارية وجلسات مريحة لمناطق الضيافة وكبار الزوار."), item("Tables", "طاولات", "Event and exhibition tables in a range of sizes and finishes.", "طاولات للفعاليات والمعارض بمقاسات وتشطيبات متعددة."), item("Chairs", "كراسي", "Event seating for conferences, lounges and hospitality areas.", "مقاعد للمؤتمرات والصالات ومناطق الضيافة."), item("High Tables", "طاولات مرتفعة", "Standing-height tables for networking and reception areas.", "طاولات بارتفاع الوقوف لمناطق التعارف والاستقبال.")]),
      category("Counters", "الكاونترات", [item("Registration Counters", "كاونترات التسجيل", "Counters built for event check-in and registration flow.", "كاونترات مصممة لتسجيل الحضور وتنظيم دخولهم إلى الفعالية."), item("Reception Counters", "كاونترات الاستقبال", "Front-of-house counters for temporary or event reception.", "كاونترات لمناطق الاستقبال المؤقتة أو لاستقبال ضيوف الفعاليات."), item("Promotional Counters", "كاونترات ترويجية", "Compact counters for sampling, sales or promotional staff.", "كاونترات صغيرة لفرق الترويج والبيع وتوزيع العينات.")]),
      category("Display Solutions", "حلول العرض", [item("Display Units", "وحدات العرض", "Reusable display structures available for short-term deployment.", "وحدات عرض قابلة لإعادة الاستخدام ومتاحة للتأجير قصير المدى."), item("Product Displays", "وحدات عرض المنتجات", "Rental display units sized around specific product categories.", "وحدات عرض للتأجير بمقاسات تناسب فئات منتجات محددة.")]),
      category("Exhibition Accessories", "إكسسوارات المعارض", [item("Decorative Elements", "عناصر ديكور", "Rental décor pieces to finish out a stand or event space.", "قطع ديكور للتأجير تكمل الجناح أو مساحة الفعالية."), item("Decorative Structures", "هياكل ديكور", "Larger rental structures used for décor or spatial definition.", "هياكل أكبر للتأجير تُستخدم للزينة أو لتقسيم المساحات."), item("Branded Props", "مجسمات بهوية العلامة", "Branded rental props for activations and photo moments.", "مجسمات للتأجير بهوية علامتك للتفعيلات وزوايا التصوير."), item("Event Décor Elements", "عناصر ديكور الفعاليات", "General décor rental items for event styling.", "عناصر ديكور عامة للتأجير لتنسيق أجواء الفعالية.")]),
    ] },
    why: { headline: t("Why brands choose CPS for rental", "لماذا تختار العلامات التجارية CPS للتأجير؟"), support: t("Owned inventory, not a subcontracted rental house.", "مخزون نملكه بالكامل، لا نستأجره من طرف ثالث."), items: [t("Own inventory — not subcontracted through a third-party rental house", "مخزون نملكه، لا نستأجره من شركة تأجير أخرى"), t("Delivery, installation and collection handled by one team", "فريق واحد يتولى التوصيل والتركيب والاستلام"), t("Furniture and displays maintained to a consistent standard", "أثاث ووحدات عرض نحافظ على حالتها بمعيار ثابت"), t("Available alongside any other CPS service for the same event", "يمكن حجزه مع أي خدمة أخرى من CPS للفعالية نفسها")] },
    benefits: [t("One vendor for rental plus any custom builds needed", "جهة واحدة للتأجير ولأي تنفيذ مخصص تحتاجه"), t("Consistent quality and condition across items", "جودة وحالة متسقة في جميع العناصر"), t("Flexible short-term terms for single events", "مدد تأجير قصيرة ومرنة للفعاليات الفردية"), t("Coordinated delivery and collection around your schedule", "توصيل واستلام وفق جدولك")],
    industries: [industries.government, industries.banking, industries.fmcg, industries.hospitality, industries.sports, industries.realEstate],
    related: ["event-fabrication", "exhibitions-booths", "installation-project-delivery"],
    faq: [faq("How far in advance should we book rental items?", "كم من الوقت قبل الفعالية ينبغي حجز عناصر التأجير؟", "Booking early secures availability, especially around peak exhibition season.", "الحجز المبكر يضمن توفر العناصر، خصوصاً في ذروة موسم المعارض."), faq("Can rental furniture be branded for our event?", "هل يمكن إضافة هوية فعاليتنا إلى الأثاث المستأجر؟", "Yes — branded props and décor elements can be added to a rental package.", "نعم، يمكن إضافة مجسمات وعناصر ديكور بهوية علامتك إلى باقة التأجير."), faq("Do you deliver and collect, or is that separate?", "هل تتولون التوصيل والاستلام، أم أنهما خدمة منفصلة؟", "Delivery, installation and collection are coordinated as part of the same booking.", "نُنسّق التوصيل والتركيب والاستلام ضمن الحجز نفسه."), faq("Can we rent alongside a custom booth or stage build?", "هل يمكن الجمع بين التأجير وتنفيذ جناح أو منصة مخصصة؟", "Yes, rental items are commonly booked alongside an Exhibitions & Booths or Event Fabrication project.", "نعم، كثيراً ما تُحجز عناصر التأجير مع مشاريع المعارض والأجنحة أو تصنيع وتجهيز الفعاليات.")],
    closingNoun: t("rental package", "باقة تأجير"),
  },
  {
    slug: "installation-project-delivery",
    image: media.services.installation,
    banner: media.serviceBanners.installation,
    title: t("Installation & Project Delivery", "التركيب وتسليم المشاريع"),
    excerpt: t("Technical planning, logistics, installation, storage and maintenance.", "تخطيط فني ولوجستيات وتركيب وتخزين وصيانة."),
    showcase: {
      title: t("Featured Delivery Services", "أبرز خدمات التنفيذ والتسليم"),
      items: [
        {
          title: t("Site Surveys & Technical Preparation", "معاينات الموقع والتحضير الفني"),
          description: t("On-site assessment and technical drawings prepared before production begins.", "معاينة الموقع وإعداد الرسومات الفنية قبل بدء الإنتاج."),
        },
        {
          title: t("Nationwide Installation", "التركيب في جميع مناطق المملكة"),
          description: t("Installation crews covering exhibitions, events, retail and signage across Saudi Arabia.", "فرق تركيب تغطي المعارض والفعاليات والمتاجر واللافتات في مختلف مدن المملكة."),
        },
        {
          title: t("Transportation & Logistics", "النقل واللوجستيات"),
          description: t("Coordinated transport and site delivery timed to your installation window.", "نقل وتوصيل منسقان يتوافقان مع موعد التركيب المحدد."),
        },
        {
          title: t("Storage & Warehousing", "التخزين والمستودعات"),
          description: t("Storage for booth panels, structures and reusable assets between uses.", "تخزين ألواح الأجنحة والهياكل والتجهيزات القابلة لإعادة الاستخدام بين المشاركات."),
        },
        {
          title: t("Maintenance & Refurbishment", "الصيانة والتجديد"),
          description: t("Repair, rebranding and refurbishment for structures being redeployed.", "إصلاح الهياكل وتحديث هويتها وتجديدها قبل إعادة استخدامها."),
        },
      ],
    },
    hero: { headline: t("Produced. Delivered. Installed.", "ننتج وننقل ونركّب."), support: t("The delivery path from production floor to finished site.", "من مصنعنا إلى موقع مكتمل وجاهز للتسليم."), bullets: [t("Site surveys and technical preparation", "معاينات الموقع والتحضير الفني"), t("Nationwide installation crews", "فرق تركيب في جميع مناطق المملكة"), t("Transportation, logistics and dismantling", "النقل واللوجستيات والفك"), t("Storage, refurbishment and quality control", "التخزين والتجديد وضبط الجودة")], catalogueCta: t("See All Delivery Services", "استعرض جميع خدمات التنفيذ") },
    catalogue: { title: t("All Delivery Services", "جميع خدمات التنفيذ والتسليم"), support: t("Every service that gets a finished build from the production floor to a working site.", "كل ما يلزم لنقل العمل المكتمل من مصنعنا إلى موقع جاهز للتشغيل."), categories: [
      category("Site Survey & Technical Preparation", "معاينة الموقع والتحضير الفني", [item("Site Surveys", "معاينات الموقع", "On-site assessment before production begins, so the build fits the space and constraints.", "نعاين الموقع قبل بدء الإنتاج لنضمن أن التنفيذ يناسب المساحة وقيودها."), item("Technical Drawings", "الرسومات الفنية", "Detailed technical drawings prepared for approval and production.", "رسومات فنية تفصيلية تُعدّ للاعتماد ثم للإنتاج."), item("Production Coordination", "تنسيق الإنتاج", "Coordination between design, production and site teams across the project timeline.", "تنسيق بين فرق التصميم والإنتاج والموقع طوال مدة المشروع."), item("Installation Planning", "تخطيط التركيب", "Scheduling and sequencing for a clean, on-time on-site build.", "جدولة أعمال التركيب وترتيب مراحلها لتنفيذ منظّم في الموعد المحدد.")]),
      category("Nationwide Installation", "التركيب في جميع مناطق المملكة", [item("Exhibition Installation", "تركيب المعارض", "On-site installation crews for exhibition stands nationwide.", "فرق تركيب ميدانية لأجنحة المعارض في جميع مناطق المملكة."), item("Event Installation", "تركيب الفعاليات", "Installation coverage for event structures and branded environments.", "تركيب هياكل الفعاليات والمساحات المصممة بهوية العلامة."), item("Retail Installation", "تركيب تجهيزات المتاجر", "Fit-out and display installation across retail locations.", "تركيب التجهيزات الداخلية ووحدات العرض في فروع المتاجر."), item("Signage Installation", "تركيب اللافتات", "Professional installation for indoor and outdoor signage.", "تركيب احترافي للافتات الداخلية والخارجية.")]),
      category("Transportation & Logistics", "النقل واللوجستيات", [item("Project Transportation", "نقل المشروع", "Coordinated transport of production output to site.", "نقل منسّق للأعمال المنتَجة إلى الموقع."), item("Site Delivery", "التوصيل للموقع", "Scheduled delivery timed to the installation window.", "توصيل مجدول يتوافق مع موعد التركيب."), item("Material Handling", "مناولة المواد", "On-site handling of materials, structures and equipment.", "مناولة المواد والهياكل والمعدات داخل الموقع.")]),
      category("Dismantling", "التفكيك", [item("Event Dismantling", "تفكيك الفعاليات", "Post-event teardown and site clearance.", "تفكيك الهياكل وإخلاء الموقع بعد انتهاء الفعالية."), item("Exhibition Dismantling", "تفكيك المعارض", "Stand dismantling coordinated with hall move-out schedules.", "تفكيك الأجنحة وفق جداول إخلاء قاعات المعرض."), item("Asset Collection", "استرجاع التجهيزات", "Collection of reusable assets after teardown.", "استرجاع التجهيزات القابلة لإعادة الاستخدام بعد التفكيك.")]),
      category("Storage & Warehousing", "التخزين والمستودعات", [item("Asset Storage", "تخزين التجهيزات", "Storage for booth panels, structures and reusable assets between uses.", "تخزين ألواح الأجنحة والهياكل والتجهيزات القابلة لإعادة الاستخدام بين المشاركات."), item("Exhibition Storage", "تخزين تجهيزات المعارض", "Dedicated storage for exhibition-specific assets.", "مساحات تخزين مخصصة لتجهيزات المعارض."), item("Event Asset Storage", "تخزين تجهيزات الفعاليات", "Storage coordination for event furniture, décor and structures.", "تنسيق تخزين أثاث الفعاليات وديكورها وهياكلها.")]),
      category("Maintenance & Refurbishment", "الصيانة والتجديد", [item("Repair", "الإصلاح", "Repair service for damaged panels, structures or fixtures.", "إصلاح الألواح أو الهياكل أو التجهيزات المتضررة."), item("Rebranding", "تحديث الهوية", "Updating an existing structure with new branding rather than rebuilding.", "تحديث هيكل قائم بهوية جديدة بدلاً من بنائه من جديد."), item("Refurbishment", "التجديد", "Refresh and repair for structures being redeployed.", "تجديد الهياكل وإصلاحها قبل إعادة استخدامها."), item("Reuse & Redeployment", "إعادة الاستخدام والتركيب", "Preparing existing assets for a new project or location.", "تجهيز العناصر القائمة لاستخدامها في مشروع أو موقع جديد.")]),
      category("Project Management & Quality Control", "إدارة المشروع وضبط الجودة", [item("Production Management", "إدارة الإنتاج", "End-to-end management of the production process.", "إدارة عملية الإنتاج من البداية إلى النهاية."), item("Installation Supervision", "الإشراف على التركيب", "On-site supervision through the installation window.", "إشراف ميداني طوال فترة التركيب."), item("Quality Control", "ضبط الجودة", "Quality checks at production and installation stages.", "فحوص جودة في مرحلتي الإنتاج والتركيب."), item("Handover & Snagging", "التسليم ومعالجة الملاحظات", "Final walkthrough and issue resolution before handover.", "معاينة نهائية ومعالجة الملاحظات قبل التسليم.")]),
    ] },
    why: { headline: t("Why brands choose CPS for delivery", "لماذا تختار العلامات التجارية CPS للتركيب والتسليم؟"), support: t("Nationwide crews, not subcontracted labour.", "فرق تركيب تابعة لنا في جميع مناطق المملكة، لا عمالة من الباطن."), items: [t("Nationwide crews, not subcontracted labour", "فرق CPS الخاصة تغطي المملكة — دون عمالة من الباطن"), t("Site surveys and technical prep reduce on-site surprises", "معاينة الموقع والتحضير الفني يقللان مفاجآت التنفيذ"), t("Storage and redeployment options for reusable assets", "خيارات لتخزين التجهيزات وإعادة استخدامها"), t("Quality control and snagging built into every handover", "ضبط الجودة ومعالجة الملاحظات جزء من كل تسليم")] },
    benefits: [t("One team from planning through final handover", "فريق واحد من التخطيط حتى التسليم النهائي"), t("Reduced risk from miscommunication between vendors", "مخاطر أقل لسوء التنسيق بين الموردين"), t("Storage options between exhibitions or events", "خيارات تخزين بين المعارض والفعاليات"), t("Maintenance and refurbishment extend asset life", "الصيانة والتجديد يطيلان عمر التجهيزات")],
    industries: [industries.government, industries.retail, industries.banking, industries.fmcg, industries.hospitality, industries.healthcare],
    related: ["exhibitions-booths", "event-fabrication", "rental-solutions"],
    faq: [faq("Can you install a structure another company fabricated?", "هل يمكنكم تركيب هيكل صنّعته شركة أخرى؟", "This is assessed case by case — get in touch with the structure's specs.", "نقيّم كل حالة على حدة؛ تواصل معنا وأرسل مواصفات الهيكل."), faq("Do you offer storage between events?", "هل توفرون التخزين بين الفعاليات؟", "Yes — see Asset Storage and Exhibition Storage in the catalogue.", "نعم، اطّلع على «تخزين التجهيزات» و«تخزين تجهيزات المعارض» في الكتالوج."), faq("What happens if something needs repair after installation?", "ماذا لو احتاج أحد العناصر إلى إصلاح بعد التركيب؟", "Repair and refurbishment are available — see Maintenance & Refurbishment.", "نوفّر خدمات الإصلاح والتجديد؛ اطّلع على «الصيانة والتجديد»."), faq("Can you handle multi-city rollouts?", "هل تنفّذون مشاريع موزعة على عدة مدن؟", "Yes, installation crews and logistics are coordinated nationwide.", "نعم، ننسّق فرق التركيب واللوجستيات في جميع مناطق المملكة.")],
    closingNoun: t("installation", "مشروع تركيب"),
  },
];

const showcaseCatalogueItemOverrides: Partial<Record<string, string[]>> = {
  "installation-project-delivery": [
    "site-surveys",
    "exhibition-installation",
    "project-transportation",
    "asset-storage",
    "refurbishment",
  ],
};

for (const service of serviceArchitecture) {
  const showcaseOverrides = showcaseCatalogueItemOverrides[service.slug];

  for (const [index, showcaseItem] of service.showcase.items.entries()) {
    showcaseItem.catalogueItemSlug ??=
      showcaseOverrides?.[index] ?? slugify(showcaseItem.title.en);
  }

  for (const category of service.catalogue.categories) {
    for (const catalogueItem of category.items) {
      const detail = catalogueDetailContent[`${service.slug}:${catalogueItem.slug}`];
      if (!detail) continue;
      catalogueItem.detail = detail;
      catalogueItem.image = detail.image;
    }
  }
}

export function localizeText(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export function getServiceArchitecture(slug: string) {
  return serviceArchitecture.find((service) => service.slug === slug);
}

export function servicePath(slug: string) {
  return `/services/${slug}`;
}

export function cataloguePath(slug: string) {
  return `/services/${slug}/catalogue`;
}
