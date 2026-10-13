import type { Locale } from "@/lib/i18n";
import { media } from "@/content/media";
import { cityRegion, type RegionKey } from "@/content/regions";
import { serviceDetailExtras } from "@/content/service-detail-extras";

export type ContentSeo = {
  title?: string;
  description?: string;
};

export type ServiceCoverItem = { title: string; description: string };

export type ServiceCover = {
  eyebrow: string;
  title: string;
  support: string;
  items: ServiceCoverItem[];
};

export type ServiceDesignItem = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  serviceSlug?: string;
};

export type ServiceDesigns = {
  eyebrow?: string;
  title: string;
  support?: string;
  cta?: { label: string; href: string };
  items: ServiceDesignItem[];
};

export type ServiceWhy = {
  title: string;
  support?: string;
  items: { title: string; description: string }[];
};

export type ServiceRecord = {
  slug: string;
  order: number;
  image: string;
  imageAlt: string;
  en: {
    title: string;
    excerpt: string;
    overview: string;
    overviewTitle?: string;
    overviewBullets?: { title: string; description: string }[];
    heroLead?: string;
    secondaryCta?: { label: string; serviceSlug: string };
    cover?: ServiceCover;
    designs?: ServiceDesigns;
    why?: ServiceWhy;
    benefits: { title: string; description: string }[];
    process: {
      title: string;
      description: string;
      image?: string;
      imageAlt?: string;
    }[];
    faq: { question: string; answer: string }[];
  };
  ar: {
    title: string;
    excerpt: string;
    overview: string;
    overviewTitle?: string;
    overviewBullets?: { title: string; description: string }[];
    heroLead?: string;
    secondaryCta?: { label: string; serviceSlug: string };
    cover?: ServiceCover;
    designs?: ServiceDesigns;
    why?: ServiceWhy;
    benefits: { title: string; description: string }[];
    process: {
      title: string;
      description: string;
      image?: string;
      imageAlt?: string;
    }[];
    faq: { question: string; answer: string }[];
  };
};

export type BoothTypeFeature = {
  title: string;
  description: string;
};

export type BoothTypeRecord = {
  slug: string;
  order: number;
  image: string;
  imageAlt: string;
  model3d?: string;
  en: {
    title: string;
    excerpt: string;
    overviewTitle: string;
    description: string;
    features: BoothTypeFeature[];
    advantages: { title: string; description: string }[];
    useCases: string[];
    faq: { question: string; answer: string }[];
  };
  ar: {
    title: string;
    excerpt: string;
    overviewTitle: string;
    description: string;
    features: BoothTypeFeature[];
    advantages: { title: string; description: string }[];
    useCases: string[];
    faq: { question: string; answer: string }[];
  };
};

export type IndustryRecord = {
  slug: string;
  order: number;
  image: string;
  imageAlt: string;
  recommendedBoothTypeSlugs: string[];
  en: {
    title: string;
    excerpt: string;
    overview: string;
    challenges: { title: string; description: string }[];
    solutions: { title: string; description: string }[];
  };
  ar: {
    title: string;
    excerpt: string;
    overview: string;
    challenges: { title: string; description: string }[];
    solutions: { title: string; description: string }[];
  };
};

export type LocationRecord = {
  slug: string;
  order: number;
  countryCode: string;
  image: string;
  imageAlt: string;
  en: {
    title: string;
    excerpt: string;
    localExperience: string;
    capabilities: { title: string; description: string }[];
  };
  ar: {
    title: string;
    excerpt: string;
    localExperience: string;
    capabilities: { title: string; description: string }[];
  };
};

export type NewsRecord = {
  slug: string;
  publishedAt: string;
  readingTime: number;
  image: string;
  imageAlt: string;
  category: string;
  tags: string[];
  author: string;
  en: {
    title: string;
    excerpt: string;
    body: string[];
  };
  ar: {
    title: string;
    excerpt: string;
    body: string[];
  };
};

export const services: ServiceRecord[] = [
  {
    slug: "full-booth-management",
    order: 1,
    image: media.services.management,
    imageAlt: "Full booth management",
    en: {
      title: "#1 Exhibition Booth Design & Production",
      excerpt:
        "Full-lifecycle exhibition booth production across Saudi Arabia — design, build, install, dismantle, and storage, all in-house.",
      heroLead:
        "Full-lifecycle exhibition booth production across Saudi Arabia — design, build, install, dismantle, and storage, all in-house.",
      overviewTitle: "Everything Your Booth Needs, Under One Roof",
      overview:
        "From design to teardown, CPS handles the full exhibition booth process in-house — no subcontractors, no delays.",
      overviewBullets: [
        {
          title: "We Design It",
          description: "Custom booth concepts built around your brand",
        },
        {
          title: "We Build It",
          description: "Fabricated in-house, not outsourced",
        },
        {
          title: "We Install It",
          description: "Set up on-site, ready before doors open",
        },
        {
          title: "We Take It Down",
          description: "Dismantling and storage handled too",
        },
      ],
      designs: {
        eyebrow: "Services",
        title: "Full Production, Handled In-House",
        support:
          "Every service your event or space needs — no outsourcing, no gaps.",
        cta: { label: "See All Services", href: "/services" },
        items: [
          {
            title: "Custom Fabrication & Manufacturing",
            description:
              "Built from scratch to match your brand and space.",
            image: media.services.fabrication,
            imageAlt: "Custom booth fabrication",
            serviceSlug: "custom-fabrication",
          },
          {
            title: "Design",
            description:
              "Concepts and layouts designed around your goals.",
            image: media.services.design,
            imageAlt: "Booth design",
            serviceSlug: "booth-design",
          },
          {
            title: "Dismantling, Storage & Reinstallation",
            description:
              "Careful teardown, safe storage, ready for next time.",
            image: media.services.storage,
            imageAlt: "Booth storage and reinstallation",
            serviceSlug: "storage-reinstallation",
          },
          {
            title: "Visual Branding & Print Solutions",
            description:
              "Decals, banners, flags, and window graphics.",
            image: media.services.branding,
            imageAlt: "Visual branding and print",
            serviceSlug: "visual-branding-print",
          },
          {
            title: "Lightbox Signage & Storefront",
            description:
              "LED signage that gets your brand noticed.",
            image: media.services.lightbox,
            imageAlt: "Lightbox signage",
            serviceSlug: "lightbox-retail-display",
          },
        ],
      },
      why: {
        title: "Why CPS",
        support: "Everything handled in-house, from start to finish.",
        items: [
          {
            title: "All In-House",
            description:
              "No subcontractors, full control at every step",
          },
          {
            title: "Full Lifecycle Support",
            description:
              "Design, build, install, store, reinstall",
          },
        ],
      },
      benefits: [
        {
          title: "All In-House",
          description: "No subcontractors, full control at every step",
        },
        {
          title: "Full Lifecycle Support",
          description: "Design, build, install, store, reinstall",
        },
        {
          title: "One Team",
          description: "No vendor handoffs across the booth lifecycle",
        },
      ],
      process: [],
      faq: [
        {
          question: "What happens if I need changes during the event?",
          answer:
            "Our team stays reachable during your event for any on-site adjustments or urgent fixes, so you're never left without support.",
        },
        {
          question:
            "Can you handle multiple booths across different cities at the same time?",
          answer:
            "Yes. Our production and installation teams operate across major cities in Saudi Arabia, so we can manage multiple builds in parallel.",
        },
        {
          question:
            "What if I only need part of the process, like design and fabrication, but want to handle installation myself?",
          answer:
            "That's fine — the A to Z Solution is flexible. We can scope the package around exactly what you need done and what you'd rather manage yourself.",
        },
        {
          question: "Is my booth reusable for future events?",
          answer:
            "In most cases, yes. We design with reusability in mind where possible, and our storage service keeps your booth ready for reinstallation at your next event.",
        },
        {
          question: "What materials do you use for fabrication?",
          answer:
            "We select materials based on your design, budget, and durability needs — including sustainable and eco-friendly options where suitable.",
        },
        {
          question: "Who owns the booth after the event?",
          answer:
            "The booth is yours. We simply offer storage and reinstallation as a convenience so you don't have to manage logistics between events.",
        },
        {
          question:
            "Do you provide insurance or liability coverage during transport and installation?",
          answer:
            "Yes, our logistics and installation processes include coverage to protect your booth throughout transport, setup, and dismantling.",
        },
      ],
    },
    ar: {
      title: "تصميم أجنحة المعارض وإنتاجها من الألف إلى الياء",
      excerpt:
        "نتولى جناحك في جميع مناطق المملكة بكل مراحله: التصميم والتصنيع والتركيب والفك والتخزين، بفريقنا وفي مصنعنا.",
      heroLead:
        "نتولى جناحك في جميع مناطق المملكة بكل مراحله: التصميم والتصنيع والتركيب والفك والتخزين، بفريقنا وفي مصنعنا.",
      overviewTitle: "كل ما يحتاجه جناحك تحت سقف واحد",
      overview:
        "من التصميم حتى الفك، تتولى CPS مراحل جناحك كلها بفريقها ومصنعها — دون مقاول من الباطن، ودون تأخير.",
      overviewBullets: [
        {
          title: "نصمّمه",
          description: "تصاميم مخصصة تنطلق من هوية علامتك",
        },
        {
          title: "نصنّعه",
          description: "في مصنعنا، دون إسناد لجهة خارجية",
        },
        {
          title: "نركّبه",
          description: "في الموقع، وجاهز قبل افتتاح الأبواب",
        },
        {
          title: "نفكّه ونخزّنه",
          description: "الفك والتخزين من مسؤوليتنا أيضاً",
        },
      ],
      designs: {
        eyebrow: "الخدمات",
        title: "إنتاج متكامل بفريق واحد",
        support:
          "كل ما تحتاجه فعاليتك أو مساحتك من خدمات — دون إسناد خارجي ودون ثغرات.",
        cta: { label: "جميع الخدمات", href: "/services" },
        items: [
          {
            title: "التصنيع حسب الطلب",
            description:
              "يُصنع من الصفر ليناسب علامتك ومساحتك.",
            image: media.services.fabrication,
            imageAlt: "تصنيع جناح حسب الطلب",
            serviceSlug: "custom-fabrication",
          },
          {
            title: "التصميم",
            description:
              "أفكار ومخططات تنطلق من أهدافك.",
            image: media.services.design,
            imageAlt: "تصميم الجناح",
            serviceSlug: "booth-design",
          },
          {
            title: "التفكيك والتخزين وإعادة التركيب",
            description:
              "فك بعناية وتخزين آمن، وجاهزية للمشاركة القادمة.",
            image: media.services.storage,
            imageAlt: "تخزين وإعادة تركيب الجناح",
            serviceSlug: "storage-reinstallation",
          },
          {
            title: "الهوية البصرية وحلول الطباعة",
            description:
              "ملصقات ولافتات وأعلام ورسومات للواجهات الزجاجية.",
            image: media.services.branding,
            imageAlt: "الهوية البصرية والطباعة",
            serviceSlug: "visual-branding-print",
          },
          {
            title: "اللوحات المضيئة وواجهات المتاجر",
            description:
              "لوحات LED مضيئة تجعل علامتك مرئية من بعيد.",
            image: media.services.lightbox,
            imageAlt: "لوحات مضيئة",
            serviceSlug: "lightbox-retail-display",
          },
        ],
      },
      why: {
        title: "لماذا CPS",
        support: "نتولى كل شيء بأنفسنا، من البداية إلى النهاية.",
        items: [
          {
            title: "كل شيء بفريقنا",
            description:
              "دون مقاول من الباطن، وتحكّم كامل في كل مرحلة",
          },
          {
            title: "معك في كل المراحل",
            description:
              "التصميم والتصنيع والتركيب والتخزين وإعادة التركيب",
          },
        ],
      },
      benefits: [
        {
          title: "كل شيء بفريقنا",
          description: "دون مقاول من الباطن، وتحكّم كامل في كل مرحلة",
        },
        {
          title: "معك في كل المراحل",
          description: "التصميم والتصنيع والتركيب والتخزين وإعادة التركيب",
        },
        {
          title: "فريق واحد",
          description: "لا يتنقّل جناحك بين موردين طوال مراحله",
        },
      ],
      process: [],
      faq: [
        {
          question: "ماذا لو احتجت إلى تعديلات أثناء الفعالية؟",
          answer:
            "يبقى فريقنا على تواصل معك طوال الفعالية لأي تعديل في الموقع أو إصلاح عاجل، فلا تُترك دون دعم.",
        },
        {
          question:
            "هل يمكنكم تنفيذ عدة أجنحة في مدن مختلفة في الوقت نفسه؟",
          answer:
            "نعم. تعمل فرق الإنتاج والتركيب لدينا في المدن الرئيسية بالمملكة، ما يتيح لنا تنفيذ عدة أجنحة بالتوازي.",
        },
        {
          question:
            "ماذا لو احتجت جزءاً من الخدمة فقط، كالتصميم والتصنيع، وأردت تولّي التركيب بنفسي؟",
          answer:
            "لا مانع، فحلّ الألف إلى الياء مرن. نحدد نطاق العمل وفق ما تحتاجه منا بالضبط، ونترك لك ما تفضّل إدارته بنفسك.",
        },
        {
          question: "هل يمكن إعادة استخدام جناحي في فعاليات قادمة؟",
          answer:
            "في أغلب الحالات، نعم. نراعي إعادة الاستخدام في التصميم متى أمكن، وتحفظ خدمة التخزين جناحك جاهزاً لإعادة تركيبه في فعاليتك التالية.",
        },
        {
          question: "ما المواد التي تستخدمونها في التصنيع؟",
          answer:
            "نختار المواد وفق التصميم والميزانية ومتطلبات المتانة، ومنها خيارات مستدامة وصديقة للبيئة حين تكون مناسبة.",
        },
        {
          question: "لمن تعود ملكية الجناح بعد الفعالية؟",
          answer:
            "الجناح ملكك. أما التخزين وإعادة التركيب فخدمة إضافية نقدّمها لنعفيك من عناء اللوجستيات بين فعالية وأخرى.",
        },
        {
          question:
            "هل توفرون تغطية تأمينية أثناء النقل والتركيب؟",
          answer:
            "نعم، تشمل عمليات النقل والتركيب لدينا تغطية تحمي جناحك خلال النقل والتركيب والفك.",
        },
      ],
    },
  },
  {
    slug: "booth-design",
    order: 2,
    image: media.services.design,
    imageAlt: "Booth design",
    en: {
      title: "Booth Design",
      excerpt: "Concepts and layouts built around your brand and floor plan.",
      heroLead: "Custom concepts built around your brand and space.",
      secondaryCta: {
        label: "A to Z Booth Solution",
        serviceSlug: "full-booth-management",
      },
      overview:
        "From first sketches to build-ready drawings, we design booths that attract, guide, and convert visitors on the show floor.",
      cover: {
        eyebrow: "Design scope",
        title: "What We Cover",
        support:
          "Everything in our booth design service — from first concept to signed-off drawings.",
        items: [
          {
            title: "Concept & Layout Planning",
            description:
              "We map out your booth's structure and flow before a single line is drawn — making sure the space works for your goals, not just your budget.",
          },
          {
            title: "3D Visualization",
            description:
              "See your booth before it's built. Detailed 3D renders let you walk through the design, request changes, and approve with confidence.",
          },
          {
            title: "Brand Integration",
            description:
              "Your colors, materials, and identity, translated into a physical space. Every design decision ties back to how your brand should feel in person.",
          },
          {
            title: "Space Planning",
            description:
              "We plan traffic flow, engagement zones, and sightlines so visitors move naturally through your booth — not just past it.",
          },
          {
            title: "Material & Finish Selection",
            description:
              "From textures to sustainable substrates, we help you choose materials that match your brand and hold up under real event conditions.",
          },
          {
            title: "Design Revisions & Approval",
            description:
              "We refine the concept with you until it's exactly right, so nothing moves forward without your full sign-off.",
          },
        ],
      },
      designs: {
        eyebrow: "Outcomes",
        title: "What we design",
        support:
          "Spatial concepts built for traffic, brand presence, and real fabrication constraints.",
        items: [
          {
            title: "Custom exhibition stands",
            description:
              "One-of-a-kind architecture shaped around your brand story and floor plan.",
            image: media.boothTypes.custom,
            imageAlt: "Custom exhibition stand",
          },
          {
            title: "Modular systems",
            description:
              "Flexible kits that look premium, install fast, and travel show to show.",
            image: media.boothTypes.modular,
            imageAlt: "Modular exhibition booth",
          },
          {
            title: "Double-deck experiences",
            description:
              "Multi-level presence that adds meeting space without losing floor impact.",
            image: media.boothTypes.doubleDeck,
            imageAlt: "Double-deck exhibition booth",
          },
          {
            title: "Demo & product stages",
            description:
              "Focal zones engineered for launches, AV, and hands-on product moments.",
            image: media.boothTypes.kiosk,
            imageAlt: "Product demo stage in a booth",
          },
          {
            title: "Meeting & lounge zones",
            description:
              "Quiet hospitality spaces that turn foot traffic into real conversations.",
            image: media.boothTypes.portable,
            imageAlt: "Booth meeting lounge",
          },
          {
            title: "Brand environments",
            description:
              "Immersive spatial identity — walls, lighting, and finishes that feel on-brand.",
            image: media.boothTypes.pavilion,
            imageAlt: "Branded exhibition environment",
          },
        ],
      },
      benefits: [
      { title: "Brand-led", description: "Layouts that express your identity clearly." },
      { title: "Visitor flow", description: "Circulation planned for engagement and demos." },
      { title: "Buildable", description: "Designs engineered for real fabrication timelines." },
      ],
      process: [
        {
          title: "Brief",
          description:
            "We start by understanding your goals, brand, and event requirements.",
          image: media.about.mission,
          imageAlt: "Brief and discovery workshop",
        },
        {
          title: "Concept",
          description:
            "Our team develops initial design directions based on your brief.",
          image: media.services.design,
          imageAlt: "Booth concept design",
        },
        {
          title: "3D Render",
          description:
            "Your concept comes to life as a detailed 3D visualization.",
          image: media.boothTypes.custom,
          imageAlt: "3D booth visualization",
        },
        {
          title: "Revisions",
          description:
            "We refine the design together until it's exactly right.",
          image: media.about.studio,
          imageAlt: "Design revisions collaboration",
        },
        {
          title: "Final Approval",
          description:
            "Once you're happy, the design is locked and finalized.",
          image: media.boothTypes.modular,
          imageAlt: "Final booth design approval",
        },
        {
          title: "Production",
          description:
            "Your approved design moves straight to our in-house fabrication team.",
          image: media.services.fabrication,
          imageAlt: "In-house booth fabrication",
        },
      ],
      faq: [
        {
          question: "How long does the design process take?",
          answer:
            "Timelines vary by booth complexity, but most concepts move from brief to final approval within a few weeks. We'll confirm a clear timeline once we understand your event date and requirements.",
        },
        {
          question: "Can I request changes after seeing the 3D render?",
          answer:
            "Yes. Revisions are part of the process — we refine the design with you until it's exactly what you want before moving to production.",
        },
        {
          question: "Do you design for all booth types?",
          answer:
            "Yes, from compact kiosks to full pavilions. Whatever format fits your event, our design team can build a concept around it.",
        },
        {
          question: "Will the final booth look exactly like the design?",
          answer:
            "Yes. Because design and production are handled by the same company, what you approve is what gets built — no surprises.",
        },
        {
          question: "Do I need to provide brand guidelines?",
          answer:
            "It helps, but it's not required. If you don't have formal guidelines, our team will work with your existing materials (logo, colors, past marketing) to keep the design on-brand.",
        },
        {
          question:
            "Can you design a booth for a space I don't have measurements for yet?",
          answer:
            "We recommend having your space dimensions or exhibition floor plan first, so the design fits properly from the start — but we can guide you on what to request from the event organizer if needed.",
        },
      ],
    },
    ar: {
      title: "تصميم الأجنحة",
      excerpt: "أفكار ومخططات تنطلق من علامتك ومساحتك في المعرض.",
      heroLead: "تصاميم مخصصة تنطلق من هوية علامتك وطبيعة مساحتك.",
      secondaryCta: {
        label: "حل الجناح من الألف إلى الياء",
        serviceSlug: "full-booth-management",
      },
      overview:
        "من الرسومات الأولى حتى المخططات الجاهزة للتنفيذ، نصمم أجنحة تجذب الزائر وتقوده داخل الجناح وتحوّل اهتمامه إلى فرصة فعلية.",
      cover: {
        eyebrow: "نطاق التصميم",
        title: "ما يشمله التصميم",
        support:
          "كل ما تتضمنه خدمة تصميم الأجنحة — من الفكرة الأولى حتى المخططات المعتمدة.",
        items: [
          {
            title: "الفكرة وتوزيع المساحة",
            description:
              "نحدد بنية الجناح ومسار الحركة فيه قبل أي رسم، ليخدم أهدافك لا ميزانيتك فحسب.",
          },
          {
            title: "التصوّر ثلاثي الأبعاد",
            description:
              "شاهد جناحك قبل تنفيذه. تتيح لك التصاميم ثلاثية الأبعاد التجوّل في الجناح وطلب التعديلات واعتماده بثقة.",
          },
          {
            title: "ترجمة هوية العلامة",
            description:
              "ألوانك وخاماتك وهويتك تتحول إلى مساحة ملموسة، وكل قرار تصميمي ينطلق من الانطباع الذي تريد أن تتركه علامتك لدى الزائر.",
          },
          {
            title: "تخطيط المساحة",
            description:
              "نخطط مسارات الحركة ومناطق التفاعل وزوايا الرؤية ليدخل الزائر جناحك ويتجوّل فيه بسلاسة، لا أن يمرّ بجانبه فقط.",
          },
          {
            title: "اختيار المواد والتشطيبات",
            description:
              "من الملمس إلى الألواح المستدامة، نساعدك على اختيار مواد تنسجم مع علامتك وتصمد أمام ظروف المعرض الفعلية.",
          },
          {
            title: "التعديلات والاعتماد",
            description:
              "نطوّر الفكرة معك حتى تصل إلى ما تريده تماماً، ولا ننتقل إلى أي مرحلة دون اعتمادك الكامل.",
          },
        ],
      },
      designs: {
        eyebrow: "المخرجات",
        title: "ماذا نصمّم",
        support:
          "تصاميم مدروسة لحركة الزوار وحضور العلامة ومتطلبات التصنيع الفعلية.",
        items: [
          {
            title: "أجنحة مخصصة",
            description:
              "تصميم معماري فريد ينطلق من قصة علامتك ومساحتك في المعرض.",
            image: media.boothTypes.custom,
            imageAlt: "جناح معرض مخصص",
          },
          {
            title: "أنظمة معيارية",
            description:
              "أنظمة مرنة بمظهر راقٍ، سريعة التركيب، وتنتقل معك من معرض إلى آخر.",
            image: media.boothTypes.modular,
            imageAlt: "جناح معياري",
          },
          {
            title: "أجنحة بطابقين",
            description:
              "طابق إضافي يوفّر مساحة للاجتماعات دون أن تخسر حضورك في الطابق الأرضي.",
            image: media.boothTypes.doubleDeck,
            imageAlt: "جناح بطابقين",
          },
          {
            title: "منصات العروض والمنتجات",
            description:
              "مساحات محورية مصممة لإطلاق المنتجات والعروض السمعية والبصرية وتجربة المنتج مباشرة.",
            image: media.boothTypes.kiosk,
            imageAlt: "منطقة عرض منتجات",
          },
          {
            title: "مناطق الاجتماع والضيافة",
            description:
              "مساحات ضيافة هادئة تحوّل الزوار العابرين إلى محادثات جادة.",
            image: media.boothTypes.portable,
            imageAlt: "منطقة اجتماع داخل الجناح",
          },
          {
            title: "بيئات تحمل هوية العلامة",
            description:
              "هوية مكانية متكاملة — جدران وإضاءة وتشطيبات تعبّر عن علامتك.",
            image: media.boothTypes.pavilion,
            imageAlt: "بيئة بهوية العلامة في المعرض",
          },
        ],
      },
      benefits: [
      { title: "العلامة أولاً", description: "مخططات تعكس هويتك بوضوح." },
      { title: "حركة الزوار", description: "مسارات مدروسة للتفاعل والعروض." },
      { title: "قابل للتنفيذ", description: "تصاميم مدروسة هندسياً لتناسب جداول التصنيع الفعلية." },
      ],
      process: [
        {
          title: "الموجز",
          description:
            "نبدأ بفهم أهدافك وعلامتك ومتطلبات الفعالية.",
          image: media.about.mission,
          imageAlt: "جلسة الموجز والتعرّف على المشروع",
        },
        {
          title: "الفكرة",
          description:
            "يطوّر فريقنا توجهات تصميم أولية بناءً على الموجز.",
          image: media.services.design,
          imageAlt: "تصميم فكرة الجناح",
        },
        {
          title: "التصوّر ثلاثي الأبعاد",
          description:
            "تتحول الفكرة إلى تصوّر ثلاثي الأبعاد مفصّل.",
          image: media.boothTypes.custom,
          imageAlt: "تصور ثلاثي الأبعاد للجناح",
        },
        {
          title: "التعديلات",
          description:
            "نعدّل التصميم معاً حتى يصبح كما تريده تماماً.",
          image: media.about.studio,
          imageAlt: "مراجعات التصميم",
        },
        {
          title: "الاعتماد النهائي",
          description:
            "بعد موافقتك، يُعتمد التصميم نهائياً.",
          image: media.boothTypes.modular,
          imageAlt: "الاعتماد النهائي للتصميم",
        },
        {
          title: "الإنتاج",
          description:
            "ينتقل التصميم المعتمد مباشرة إلى فريق التصنيع في مصنعنا.",
          image: media.services.fabrication,
          imageAlt: "تصنيع الجناح في مصنع CPS",
        },
      ],
      faq: [
        {
          question: "كم تستغرق مرحلة التصميم؟",
          answer:
            "تختلف المدة حسب تعقيد الجناح، لكن معظم التصاميم تنتقل من الموجز إلى الاعتماد النهائي خلال أسابيع قليلة. ونحدد لك جدولاً زمنياً واضحاً بعد معرفة موعد الفعالية ومتطلباتك.",
        },
        {
          question: "هل يمكنني طلب تعديلات بعد رؤية التصميم ثلاثي الأبعاد؟",
          answer:
            "نعم. التعديلات جزء أساسي من العمل، ونطوّر التصميم معك حتى يصبح كما تريده تماماً قبل الانتقال إلى الإنتاج.",
        },
        {
          question: "هل تصممون جميع أنواع الأجنحة؟",
          answer:
            "نعم، من الأكشاك الصغيرة إلى الأجنحة الكبرى. أياً كانت الصيغة المناسبة لفعاليتك، يبني فريق التصميم الفكرة حولها.",
        },
        {
          question: "هل سيبدو الجناح النهائي مطابقاً للتصميم؟",
          answer:
            "نعم. لأن جهة واحدة تتولى التصميم والإنتاج، فما تعتمده هو ما يُنفَّذ — دون مفاجآت.",
        },
        {
          question: "هل يلزمني تقديم دليل الهوية البصرية؟",
          answer:
            "يفيد وجوده لكنه ليس شرطاً. إن لم يكن لديك دليل رسمي، يعمل فريقنا على موادك الحالية (الشعار والألوان والحملات السابقة) ليبقى التصميم منسجماً مع علامتك.",
        },
        {
          question: "هل يمكنكم تصميم جناح لمساحة لم أحصل على قياساتها بعد؟",
          answer:
            "نوصي بالحصول على أبعاد المساحة أو مخطط المعرض أولاً ليأتي التصميم مناسباً من البداية، ويمكننا إرشادك إلى ما تطلبه من منظّم الفعالية عند الحاجة.",
        },
      ],
    },
  },
  {
    slug: "custom-fabrication",
    order: 3,
    image: media.services.fabrication,
    imageAlt: "Booth manufacturing workshop",
    en: {
      title: "Booth Manufacturing",
      excerpt: "Every booth is fabricated in our own workshop, start to finish.",
      heroLead: "Every booth is fabricated in our own workshop, start to finish.",
      overviewTitle: "Built by Us, Not Outsourced",
      overview:
        "Every booth is fabricated in our own workshop, start to finish.",
      overviewBullets: [
        {
          title: "Fully In-House",
          description: "No subcontractors, full control over quality",
        },
        {
          title: "Built to Spec",
          description: "Every detail matches the approved design, exactly",
        },
        {
          title: "Durable Materials",
          description: "Built to withstand real event conditions",
        },
        {
          title: "Sustainable Options Available",
          description: "Eco-friendly substrates and finishes on request",
        },
      ],
      cover: {
        eyebrow: "Build scope",
        title: "What We Cover",
        support:
          "In-house fabrication from structure to finish — built to the approved design.",
        items: [
          {
            title: "Structural Fabrication",
            description:
              "Frames and structures built to handle repeated use and transport.",
          },
          {
            title: "Custom Finishes",
            description:
              "Textures, colors, and surface treatments matched to your brand.",
          },
          {
            title: "Material Selection",
            description:
              "From standard substrates to sustainable, eco-friendly alternatives.",
          },
          {
            title: "Quality Control",
            description:
              "Every piece checked before it leaves our workshop.",
          },
          {
            title: "Precision Assembly",
            description:
              "Components built and tested for a clean, accurate on-site build.",
          },
          {
            title: "Scalable Production",
            description:
              "From single booths to multi-city rollouts, produced at the scale you need.",
          },
        ],
      },
      benefits: [
        {
          title: "Fully In-House",
          description: "No subcontractors, full control over quality",
        },
        {
          title: "Built to Spec",
          description: "Every detail matches the approved design, exactly",
        },
        {
          title: "Durable Materials",
          description: "Built to withstand real event conditions",
        },
      ],
      process: [
        {
          title: "Design Handoff",
          description:
            "Approved design comes straight to our production team.",
          image: media.services.design,
          imageAlt: "Design handoff to production",
        },
        {
          title: "Material Prep",
          description:
            "Materials sourced and prepared to spec.",
          image: media.about.studio,
          imageAlt: "Material preparation",
        },
        {
          title: "Fabrication",
          description:
            "Built in-house, piece by piece.",
          image: media.services.fabrication,
          imageAlt: "In-house booth fabrication",
        },
        {
          title: "Quality Check",
          description:
            "Every element inspected before completion.",
          image: media.boothTypes.modular,
          imageAlt: "Fabrication quality check",
        },
        {
          title: "Ready for Installation",
          description:
            "Packed and prepared for on-site setup.",
          image: media.services.installation,
          imageAlt: "Booth packed for installation",
        },
      ],
      faq: [
        {
          question:
            "Do you fabricate everything in-house, or use subcontractors?",
          answer:
            "Everything is built in our own workshop — no subcontractors, so quality stays consistent from start to finish.",
        },
        {
          question: "Can you match my brand's exact colors and materials?",
          answer:
            "Yes, we work from your brand guidelines or existing materials to match colors, textures, and finishes as closely as possible.",
        },
        {
          question: "Do you offer sustainable or eco-friendly materials?",
          answer:
            "Yes, we offer eco-friendly substrates and finishes for clients who want a more sustainable build.",
        },
        {
          question: "How long does fabrication take?",
          answer:
            "Timelines depend on booth size and complexity — we'll confirm a clear production schedule once your design is finalized.",
        },
        {
          question:
            "Can you fabricate booths for multiple cities or events at once?",
          answer:
            "Yes, our production capacity supports parallel builds across multiple projects.",
        },
        {
          question:
            "What happens if something needs to be repaired or replaced later?",
          answer:
            "Since we fabricate everything ourselves, repairs and replacements are handled quickly and matched exactly to the original build.",
        },
      ],
    },
    ar: {
      title: "تصنيع الأجنحة",
      excerpt: "نصنّع كل جناح في مصنعنا، من أول قطعة حتى آخر تشطيب.",
      heroLead: "نصنّع كل جناح في مصنعنا، من أول قطعة حتى آخر تشطيب.",
      overviewTitle: "نصنعه بأيدينا، ولا نُسنده لغيرنا",
      overview:
        "نصنّع كل جناح في مصنعنا، من أول قطعة حتى آخر تشطيب.",
      overviewBullets: [
        {
          title: "في مصنعنا بالكامل",
          description: "دون مقاول من الباطن، وتحكّم كامل في الجودة",
        },
        {
          title: "مطابق للمواصفات",
          description: "كل تفصيلة مطابقة للتصميم المعتمد",
        },
        {
          title: "مواد متينة",
          description: "مصنوعة لتتحمل ظروف المعارض الفعلية",
        },
        {
          title: "خيارات مستدامة",
          description: "ألواح وتشطيبات صديقة للبيئة عند الطلب",
        },
      ],
      cover: {
        eyebrow: "نطاق التصنيع",
        title: "ما يشمله التصنيع",
        support:
          "تصنيع في مصنعنا من الهيكل حتى التشطيب، مطابق للتصميم المعتمد.",
        items: [
          {
            title: "تصنيع الهياكل",
            description:
              "إطارات وهياكل متينة تتحمل الاستخدام المتكرر والنقل.",
          },
          {
            title: "تشطيبات مخصصة",
            description:
              "ملمس وألوان ومعالجات للأسطح مطابقة لعلامتك.",
          },
          {
            title: "اختيار المواد",
            description:
              "من الألواح القياسية إلى البدائل المستدامة والصديقة للبيئة.",
          },
          {
            title: "مراقبة الجودة",
            description:
              "تُفحص كل قطعة قبل خروجها من المصنع.",
          },
          {
            title: "تجميع دقيق",
            description:
              "مكونات تُصنع وتُجرَّب مسبقاً ليكون التركيب في الموقع دقيقاً ونظيفاً.",
          },
          {
            title: "إنتاج بأي حجم",
            description:
              "من جناح واحد إلى مشاريع تمتد لعدة مدن، ننتج بالحجم الذي تحتاجه.",
          },
        ],
      },
      benefits: [
        {
          title: "في مصنعنا بالكامل",
          description: "دون مقاول من الباطن، وتحكّم كامل في الجودة",
        },
        {
          title: "مطابق للمواصفات",
          description: "كل تفصيلة مطابقة للتصميم المعتمد",
        },
        {
          title: "مواد متينة",
          description: "مصنوعة لتتحمل ظروف المعارض الفعلية",
        },
      ],
      process: [
        {
          title: "استلام التصميم",
          description:
            "يصل التصميم المعتمد مباشرة إلى فريق الإنتاج.",
          image: media.services.design,
          imageAlt: "استلام التصميم في الإنتاج",
        },
        {
          title: "تجهيز المواد",
          description:
            "توريد المواد وتجهيزها وفق المواصفات.",
          image: media.about.studio,
          imageAlt: "تجهيز المواد",
        },
        {
          title: "التصنيع",
          description:
            "يُصنع في مصنعنا، قطعة قطعة.",
          image: media.services.fabrication,
          imageAlt: "تصنيع الجناح في مصنع CPS",
        },
        {
          title: "فحص الجودة",
          description:
            "يُفحص كل عنصر قبل اعتماد الإنجاز.",
          image: media.boothTypes.modular,
          imageAlt: "فحص جودة التصنيع",
        },
        {
          title: "جاهز للتركيب",
          description:
            "يُغلَّف ويُجهَّز للتركيب في الموقع.",
          image: media.services.installation,
          imageAlt: "الجناح جاهز للتركيب",
        },
      ],
      faq: [
        {
          question: "هل تصنّعون كل شيء بأنفسكم أم تستعينون بمقاولين من الباطن؟",
          answer:
            "نصنّع كل شيء في مصنعنا دون مقاول من الباطن، فتبقى الجودة ثابتة من البداية إلى النهاية.",
        },
        {
          question: "هل يمكنكم مطابقة ألوان علامتي وخاماتها بدقة؟",
          answer:
            "نعم، نعمل وفق دليل هويتك أو موادك الحالية لمطابقة الألوان والخامات والتشطيبات بأعلى دقة ممكنة.",
        },
        {
          question: "هل توفرون مواد مستدامة أو صديقة للبيئة؟",
          answer:
            "نعم، نوفر ألواحاً وتشطيبات صديقة للبيئة لمن يريد جناحاً أكثر استدامة.",
        },
        {
          question: "كم يستغرق التصنيع؟",
          answer:
            "تعتمد المدة على حجم الجناح وتعقيده، ونحدد لك جدول إنتاج واضحاً فور اعتماد التصميم.",
        },
        {
          question: "هل يمكن تصنيع أجنحة لعدة مدن أو فعاليات في وقت واحد؟",
          answer:
            "نعم، تتيح لنا طاقتنا الإنتاجية تنفيذ عدة مشاريع بالتوازي.",
        },
        {
          question: "ماذا لو احتاج جزء من الجناح إلى إصلاح أو استبدال لاحقاً؟",
          answer:
            "لأننا نصنّع كل شيء بأنفسنا، ننجز الإصلاح أو الاستبدال بسرعة وبمطابقة تامة للجناح الأصلي.",
        },
      ],
    },
  },
  {
    slug: "installation-dismantling",
    order: 4,
    image: media.services.installation,
    imageAlt: "Booth installation and dismantling",
    en: {
      title: "Installation & Dismantling",
      excerpt:
        "On-site setup and careful teardown — ready before doors open, protected when the show ends.",
      heroLead:
        "On-site setup and careful teardown — ready before doors open, protected when the show ends.",
      secondaryCta: {
        label: "A to Z Booth Solution",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "Built On-Site. Taken Down Right.",
      overview:
        "Our crews handle install and dismantling with the same precision as the build — so your booth looks right on day one and lasts for the next show.",
      overviewBullets: [
        {
          title: "Venue-Ready Crews",
          description: "Teams who know exhibition logistics, access windows, and show pressure",
        },
        {
          title: "Clean Install",
          description: "Structure, graphics, and AV set up and tested before doors open",
        },
        {
          title: "Careful Teardown",
          description: "Components protected and labeled for reuse, storage, or transport",
        },
        {
          title: "Show-Day Support",
          description: "On-floor coverage when something needs a fast fix",
        },
      ],
      cover: {
        eyebrow: "On-site scope",
        title: "What We Cover",
        support:
          "From site survey to final outbound — install and dismantling handled by one CPS crew.",
        items: [
          {
            title: "Site Survey & Planning",
            description:
              "Access, power, floor load, and schedule constraints checked before the crew arrives.",
          },
          {
            title: "Crew Mobilization",
            description:
              "The right team, tools, and sequencing locked to your venue window — including overnight builds.",
          },
          {
            title: "Booth Installation",
            description:
              "Structure, furniture, graphics, and AV assembled cleanly on the show floor.",
          },
          {
            title: "Systems Check",
            description:
              "Lighting, screens, and power tested so everything works before the hall opens.",
          },
          {
            title: "Show Support",
            description:
              "On-site adjustments during the event when something needs attention fast.",
          },
          {
            title: "Professional Dismantling",
            description:
              "Structured teardown that protects every component for storage, reuse, or shipping.",
          },
        ],
      },
      benefits: [
        {
          title: "Venue-Ready Crews",
          description: "Teams who know exhibition logistics and show pressure",
        },
        {
          title: "Clean Install",
          description: "Set up and tested before doors open",
        },
        {
          title: "Careful Teardown",
          description: "Components protected for the next cycle",
        },
      ],
      process: [
        {
          title: "Brief",
          description:
            "We align drawings, access windows, and crew requirements with the venue plan.",
          image: media.about.mission,
          imageAlt: "Install brief and planning",
        },
        {
          title: "Survey",
          description:
            "Site conditions, power, and logistics are confirmed on the ground.",
          image: media.services.management,
          imageAlt: "Venue site survey",
        },
        {
          title: "Install",
          description:
            "Build, dress, and test before the hall opens.",
          image: media.services.installation,
          imageAlt: "Booth installation in progress",
        },
        {
          title: "Support",
          description:
            "On-floor coverage for adjustments during the show.",
          image: media.boothTypes.modular,
          imageAlt: "Show-floor support",
        },
        {
          title: "Dismantle",
          description:
            "Careful teardown, inventory, and outbound handoff.",
          image: media.services.storage,
          imageAlt: "Booth dismantling",
        },
      ],
      faq: [
        {
          question: "Do you work overnight install windows?",
          answer:
            "Yes. We plan crews around venue access windows, including overnight and early-morning builds when the schedule requires it.",
        },
        {
          question: "Can you install a booth you didn't fabricate?",
          answer:
            "In many cases, yes — as long as we have clear drawings, packing lists, and access to the components. We'll confirm feasibility after reviewing your materials.",
        },
        {
          question: "What happens if something breaks during installation?",
          answer:
            "Our crew flags issues immediately and coordinates with production for a fast fix — because install and fabrication sit under one CPS team when it's our build.",
        },
        {
          question: "Do you handle permits and venue coordination?",
          answer:
            "Yes. We coordinate with organizers and venues on access, power, and install rules as part of the on-site process.",
        },
        {
          question: "Is dismantling included with installation?",
          answer:
            "It can be — most clients book install and dismantling together. You can also book them separately if you only need one side of the process.",
        },
        {
          question: "Can you dismantle and hand off to storage?",
          answer:
            "Yes. After teardown we can transfer components straight into our storage and reinstallation program, or prepare them for outbound shipping.",
        },
      ],
    },
    ar: {
      title: "التركيب والتفكيك",
      excerpt:
        "تركيب في الموقع وفك مدروس — جناحك جاهز قبل الافتتاح، ومحفوظ بعد انتهاء المعرض.",
      heroLead:
        "تركيب في الموقع وفك مدروس — جناحك جاهز قبل الافتتاح، ومحفوظ بعد انتهاء المعرض.",
      secondaryCta: {
        label: "حل الجناح من الألف إلى الياء",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "نركّبه بإتقان ونفكّه بعناية",
      overview:
        "تتولى فرقنا التركيب والفك بالدقة نفسها التي نصنع بها الجناح، ليظهر بالشكل الصحيح من اليوم الأول ويبقى صالحاً للمعرض التالي.",
      overviewBullets: [
        {
          title: "فرق خبيرة بالمعارض",
          description: "فرق تعرف لوجستيات المعارض ومواعيد الدخول إلى الموقع وضغط أيام العرض",
        },
        {
          title: "تركيب متقن",
          description: "الهيكل والرسومات والأنظمة السمعية والبصرية (AV) تُركَّب وتُختبر قبل الافتتاح",
        },
        {
          title: "فك بعناية",
          description: "مكونات محمية ومرقّمة لإعادة الاستخدام أو التخزين أو النقل",
        },
        {
          title: "دعم أيام المعرض",
          description: "فريق حاضر في القاعة لأي إصلاح سريع",
        },
      ],
      cover: {
        eyebrow: "نطاق العمل في الموقع",
        title: "ما يشمله التركيب",
        support:
          "من معاينة الموقع حتى خروج آخر قطعة — التركيب والفك بفريق واحد من CPS.",
        items: [
          {
            title: "معاينة الموقع والتخطيط",
            description:
              "نتحقق من مداخل الموقع والكهرباء وتحمّل الأرضية وقيود الجدول الزمني قبل وصول الفريق.",
          },
          {
            title: "تجهيز الفريق",
            description:
              "الفريق المناسب والأدوات وتسلسل العمل وفق مواعيد الموقع — بما في ذلك التركيب الليلي.",
          },
          {
            title: "تركيب الجناح",
            description:
              "تركيب الهيكل والأثاث والرسومات والصوتيات والشاشات بإتقان في قاعة المعرض.",
          },
          {
            title: "فحص الأنظمة",
            description:
              "نختبر الإضاءة والشاشات والكهرباء ليعمل كل شيء قبل افتتاح القاعة.",
          },
          {
            title: "الدعم أثناء المعرض",
            description:
              "تعديلات في الموقع أثناء الفعالية كلما احتاج أمر إلى تدخل سريع.",
          },
          {
            title: "تفكيك احترافي",
            description:
              "فك منظّم يحمي كل مكوّن للتخزين أو إعادة الاستخدام أو الشحن.",
          },
        ],
      },
      benefits: [
        {
          title: "فرق خبيرة بالمعارض",
          description: "فرق تعرف لوجستيات المعارض وضغط أيام العرض",
        },
        {
          title: "تركيب متقن",
          description: "تركيب واختبار قبل الافتتاح",
        },
        {
          title: "فك بعناية",
          description: "مكونات محمية للمشاركة التالية",
        },
      ],
      process: [
        {
          title: "الموجز",
          description:
            "نطابق المخططات ومواعيد الدخول واحتياجات الفريق مع خطة الموقع.",
          image: media.about.mission,
          imageAlt: "موجز وتخطيط التركيب",
        },
        {
          title: "المعاينة",
          description:
            "نتأكد ميدانياً من ظروف الموقع والكهرباء واللوجستيات.",
          image: media.services.management,
          imageAlt: "معاينة موقع المعرض",
        },
        {
          title: "التركيب",
          description:
            "التركيب والتجهيز والاختبار قبل افتتاح القاعة.",
          image: media.services.installation,
          imageAlt: "أعمال تركيب الجناح",
        },
        {
          title: "الدعم",
          description:
            "حضور في القاعة لأي تعديل أثناء المعرض.",
          image: media.boothTypes.modular,
          imageAlt: "الدعم في قاعة المعرض",
        },
        {
          title: "التفكيك",
          description:
            "فك بعناية وجرد للمكونات وتسليمها للنقل.",
          image: media.services.storage,
          imageAlt: "تفكيك الجناح",
        },
      ],
      faq: [
        {
          question: "هل تعملون في فترات التركيب الليلية؟",
          answer:
            "نعم. نخطط عمل الفرق وفق مواعيد الدخول التي يحددها الموقع، بما في ذلك التركيب ليلاً أو في الساعات الأولى من الصباح عند الحاجة.",
        },
        {
          question: "هل يمكنكم تركيب جناح لم تصنّعوه؟",
          answer:
            "في كثير من الحالات نعم، شرط توفر مخططات واضحة وقوائم تغليف وإمكانية الوصول إلى المكونات. ونؤكد لك إمكانية التنفيذ بعد مراجعة ما لديك.",
        },
        {
          question: "ماذا لو تعرّض جزء من الجناح للتلف أثناء التركيب؟",
          answer:
            "يرصد فريقنا المشكلة فوراً وينسّق مع الإنتاج لإصلاحها بسرعة، فالتركيب والتصنيع لدى فريق CPS نفسه حين يكون الجناح من تصنيعنا.",
        },
        {
          question: "هل تتولون التصاريح والتنسيق مع إدارة الموقع؟",
          answer:
            "نعم. ننسّق مع المنظمين وإدارات المواقع بشأن الدخول والكهرباء واشتراطات التركيب ضمن أعمالنا في الموقع.",
        },
        {
          question: "هل يشمل التركيب الفك أيضاً؟",
          answer:
            "يمكن ذلك، ومعظم العملاء يحجزون الخدمتين معاً. كما يمكنك حجز كل منهما منفصلة إن كنت تحتاج إحداهما فقط.",
        },
        {
          question: "هل يمكنكم فك الجناح ونقله مباشرة إلى التخزين؟",
          answer:
            "نعم. بعد الفك ننقل المكونات مباشرة إلى خدمة التخزين وإعادة التركيب، أو نجهزها للشحن.",
        },
      ],
    },
  },
  {
    slug: "storage-reinstallation",
    order: 5,
    image: media.services.storage,
    imageAlt: "Booth storage and reinstallation",
    en: {
      title: "Booth Dismantling, Storage & Reinstallation",
      excerpt: "Your booth, protected and ready for next time.",
      heroLead: "Your booth, protected and ready for next time.",
      secondaryCta: {
        label: "A to Z Booth Solution",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "Your Booth Doesn't End at the Show",
      overview: "We take care of what happens after the event, too.",
      overviewBullets: [
        {
          title: "Careful Dismantling",
          description: "Handled with the same care as the build",
        },
        {
          title: "Climate-Controlled Storage",
          description: "Protected until your next event",
        },
        {
          title: "Ready When You Are",
          description: "Reinstalled quickly, without starting from scratch",
        },
        {
          title: "One Team, One Responsibility",
          description: "Your booth never changes hands between vendors",
        },
      ],
      cover: {
        eyebrow: "After the show",
        title: "What We Cover",
        support:
          "From careful teardown to climate-controlled storage and the next reinstall.",
        items: [
          {
            title: "Professional Dismantling",
            description:
              "Structured teardown that protects every component for reuse.",
          },
          {
            title: "Transportation",
            description:
              "Safe handling and transport from the event site to storage.",
          },
          {
            title: "Climate-Controlled Storage",
            description:
              "Facilities that keep your booth in ready-to-use condition between events.",
          },
          {
            title: "Inventory Tracking",
            description:
              "Every piece logged and accounted for, so nothing gets lost between events.",
          },
          {
            title: "Reinstallation",
            description:
              "Your booth set up again for the next show, without rebuilding from scratch.",
          },
          {
            title: "Condition Checks",
            description:
              "We inspect your booth before reinstallation and flag anything that needs attention.",
          },
        ],
      },
      benefits: [
        {
          title: "Careful Dismantling",
          description: "Handled with the same care as the build",
        },
        {
          title: "Climate-Controlled Storage",
          description: "Protected until your next event",
        },
        {
          title: "Ready When You Are",
          description: "Reinstalled quickly, without starting from scratch",
        },
      ],
      process: [
        {
          title: "Dismantling",
          description: "Careful teardown once your event ends.",
          image: media.services.installation,
          imageAlt: "Booth dismantling after the show",
        },
        {
          title: "Transport",
          description: "Safe handling to our storage facility.",
          image: media.services.management,
          imageAlt: "Booth transport to storage",
        },
        {
          title: "Storage",
          description: "Climate-controlled, inventory-tracked.",
          image: media.services.storage,
          imageAlt: "Climate-controlled booth storage",
        },
        {
          title: "Condition Check",
          description: "Inspected before your next event.",
          image: media.about.studio,
          imageAlt: "Booth condition check",
        },
        {
          title: "Reinstallation",
          description: "Set up and ready for the next show.",
          image: media.boothTypes.modular,
          imageAlt: "Booth reinstallation",
        },
      ],
      faq: [
        {
          question: "How long can you store my booth?",
          answer:
            "As long as you need — many clients store between seasonal or annual events. We'll confirm storage terms based on your schedule.",
        },
        {
          question: "Is my booth safe in storage?",
          answer:
            "Yes, our facilities are climate-controlled and monitored, keeping materials and finishes in the same condition as when they arrived.",
        },
        {
          question: "Can you reinstall my booth for a different event or city?",
          answer:
            "Yes, we handle reinstallation across major cities in Saudi Arabia, not just the original event location.",
        },
        {
          question: "What if my booth needs repairs before reinstallation?",
          answer:
            "We inspect every booth before reinstallation and flag any wear or damage, so it's addressed before your next event.",
        },
        {
          question: "Do I need to book storage in advance?",
          answer:
            "It helps, especially around busy event seasons, but we can also accommodate short-notice requests depending on availability.",
        },
        {
          question: "What happens if I don't need the booth stored long-term?",
          answer:
            "No problem — dismantling and transport are available as standalone services without ongoing storage.",
        },
      ],
    },
    ar: {
      title: "تفكيك وتخزين وإعادة تركيب الأجنحة",
      excerpt: "نحفظ جناحك بعد المعرض ونجهّزه لمشاركتك القادمة.",
      heroLead: "نحفظ جناحك بعد المعرض ونجهّزه لمشاركتك القادمة.",
      secondaryCta: {
        label: "حل الجناح من الألف إلى الياء",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "جناحك لا ينتهي بانتهاء المعرض",
      overview: "ونتولى أيضاً كل ما يلي انتهاء الفعالية.",
      overviewBullets: [
        {
          title: "فك بعناية",
          description: "بالعناية نفسها التي صُنع بها",
        },
        {
          title: "تخزين في بيئة مكيّفة",
          description: "محفوظ حتى فعاليتك التالية",
        },
        {
          title: "جاهز متى احتجته",
          description: "يُعاد تركيبه بسرعة دون البدء من الصفر",
        },
        {
          title: "فريق واحد ومسؤولية واحدة",
          description: "لا ينتقل جناحك من مورد إلى آخر",
        },
      ],
      cover: {
        eyebrow: "بعد المعرض",
        title: "ما تشمله الخدمة",
        support:
          "من الفك بعناية إلى التخزين في بيئة مكيّفة، ثم إعادة التركيب في مشاركتك التالية.",
        items: [
          {
            title: "فك احترافي",
            description:
              "فك منظّم يحمي كل مكوّن لإعادة استخدامه.",
          },
          {
            title: "النقل",
            description:
              "مناولة ونقل آمن من موقع الفعالية إلى المستودع.",
          },
          {
            title: "تخزين في بيئة مكيّفة",
            description:
              "مستودعات تحفظ جناحك جاهزاً للاستخدام بين فعالية وأخرى.",
          },
          {
            title: "جرد وتتبّع",
            description:
              "كل قطعة مسجّلة ومعروف مكانها، فلا يضيع شيء بين الفعاليات.",
          },
          {
            title: "إعادة التركيب",
            description:
              "نركّب جناحك من جديد للمعرض التالي دون إعادة تصنيعه من الصفر.",
          },
          {
            title: "فحص الحالة",
            description:
              "نفحص جناحك قبل إعادة التركيب وننبّهك إلى أي جزء يحتاج إلى معالجة.",
          },
        ],
      },
      benefits: [
        {
          title: "فك بعناية",
          description: "بالعناية نفسها التي صُنع بها",
        },
        {
          title: "تخزين في بيئة مكيّفة",
          description: "محفوظ حتى فعاليتك التالية",
        },
        {
          title: "جاهز متى احتجته",
          description: "يُعاد تركيبه بسرعة دون البدء من الصفر",
        },
      ],
      process: [
        {
          title: "التفكيك",
          description: "فك بعناية فور انتهاء الفعالية.",
          image: media.services.installation,
          imageAlt: "تفكيك الجناح بعد المعرض",
        },
        {
          title: "النقل",
          description: "نقل آمن إلى مستودعاتنا.",
          image: media.services.management,
          imageAlt: "نقل الجناح إلى المستودع",
        },
        {
          title: "التخزين",
          description: "في بيئة مكيّفة مع جرد دقيق.",
          image: media.services.storage,
          imageAlt: "تخزين الجناح في بيئة مكيّفة",
        },
        {
          title: "فحص الحالة",
          description: "نفحصه قبل فعاليتك التالية.",
          image: media.about.studio,
          imageAlt: "فحص حالة الجناح",
        },
        {
          title: "إعادة التركيب",
          description: "نركّبه ليكون جاهزاً للمعرض التالي.",
          image: media.boothTypes.modular,
          imageAlt: "إعادة تركيب الجناح",
        },
      ],
      faq: [
        {
          question: "ما المدة التي يمكنكم تخزين جناحي خلالها؟",
          answer:
            "طوال المدة التي تحتاجها، فكثير من عملائنا يخزّنون أجنحتهم بين فعاليات موسمية أو سنوية. ونحدد شروط التخزين وفق جدولك.",
        },
        {
          question: "هل جناحي في أمان داخل المستودع؟",
          answer:
            "نعم، مستودعاتنا مكيّفة ومراقبة، وتحافظ على المواد والتشطيبات بالحالة التي وصلت بها.",
        },
        {
          question: "هل يمكن إعادة تركيب جناحي في فعالية أخرى أو مدينة مختلفة؟",
          answer:
            "نعم، نعيد تركيب الأجنحة في المدن الرئيسية بالمملكة، لا في موقع الفعالية الأصلي فقط.",
        },
        {
          question: "ماذا لو احتاج جناحي إلى إصلاح قبل إعادة تركيبه؟",
          answer:
            "نفحص كل جناح قبل إعادة التركيب ونرصد أي تآكل أو تلف لمعالجته قبل فعاليتك التالية.",
        },
        {
          question: "هل يلزم حجز التخزين مسبقاً؟",
          answer:
            "يُستحسن ذلك، خصوصاً في مواسم الفعاليات المزدحمة، ويمكننا أيضاً تلبية الطلبات العاجلة حسب التوفر.",
        },
        {
          question: "ماذا لو لم أحتج إلى تخزين طويل الأمد؟",
          answer:
            "لا مشكلة، فالفك والنقل متاحان كخدمتين مستقلتين دون تخزين مستمر.",
        },
      ],
    },
  },
  {
    slug: "visual-branding-print",
    order: 6,
    image: media.services.branding,
    imageAlt: "Visual branding and print",
    en: {
      title: "Visual Branding & Print Solutions",
      excerpt: "Your brand, printed and applied with precision.",
      heroLead: "Your brand, printed and applied with precision.",
      overviewTitle: "Branding That Gets Noticed",
      overview: "From decals to window graphics, every detail carries your brand.",
      overviewBullets: [
        {
          title: "Print, Produced In-House",
          description: "Full control over quality and turnaround",
        },
        {
          title: "Any Surface, Any Size",
          description: "Walls, windows, banners, flags",
        },
        {
          title: "Built to Last",
          description: "Durable materials for indoor and outdoor use",
        },
        {
          title: "Fast Turnaround",
          description: "Ready when your event needs it",
        },
      ],
      cover: {
        eyebrow: "Print scope",
        title: "What We Cover",
        support:
          "From decals to wall wraps — print and application built around your brand.",
        items: [
          {
            title: "Custom Stickers & Decals",
            description:
              "Precision-cut graphics for surfaces, products, and displays.",
          },
          {
            title: "Roll-Up Banners",
            description:
              "Portable, professional banners ready for any event.",
          },
          {
            title: "Printed Flags",
            description:
              "Branded flags for outdoor visibility and activations.",
          },
          {
            title: "Window & Glass Branding",
            description:
              "Vinyl graphics and frosting for storefronts and booths.",
          },
          {
            title: "Wall Wraps",
            description:
              "Large-format graphics that transform any space.",
          },
          {
            title: "Material Selection",
            description:
              "Finishes chosen for durability, indoors or outdoors.",
          },
        ],
      },
      benefits: [
        {
          title: "Print, Produced In-House",
          description: "Full control over quality and turnaround",
        },
        {
          title: "Any Surface, Any Size",
          description: "Walls, windows, banners, flags",
        },
        {
          title: "Built to Last",
          description: "Durable materials for indoor and outdoor use",
        },
      ],
      process: [
        {
          title: "Brief",
          description:
            "Share your brand assets and where the graphics will go.",
          image: media.about.mission,
          imageAlt: "Brand print brief",
        },
        {
          title: "Design Layout",
          description:
            "We prepare print-ready files for your approval.",
          image: media.services.design,
          imageAlt: "Print layout design",
        },
        {
          title: "Printing",
          description:
            "Produced in-house on the right materials.",
          image: media.services.branding,
          imageAlt: "In-house print production",
        },
        {
          title: "Quality Check",
          description:
            "Every piece inspected before delivery.",
          image: media.about.studio,
          imageAlt: "Print quality check",
        },
        {
          title: "Application",
          description:
            "Installed cleanly on-site if needed.",
          image: media.services.installation,
          imageAlt: "On-site graphics application",
        },
      ],
      faq: [
        {
          question: "Can you match my exact brand colors?",
          answer:
            "Yes, we work from your brand guidelines or existing files to match colors as closely as possible in print.",
        },
        {
          question: "What materials do you print on?",
          answer:
            "It depends on the application — vinyl, fabric, and rigid substrates are all available depending on where the graphics will be used.",
        },
        {
          question: "Can you install the graphics on-site?",
          answer:
            "Yes, we offer on-site application for window graphics, wall wraps, and other surfaces that need professional installation.",
        },
        {
          question: "How long does printing take?",
          answer:
            "Turnaround depends on quantity and complexity — we'll confirm a clear timeline once we understand your order.",
        },
        {
          question: "Are the materials suitable for outdoor use?",
          answer:
            "Yes, we offer weather-resistant options for flags, banners, and outdoor signage.",
        },
        {
          question:
            "Can I order just one item, like a roll-up banner, without a full branding package?",
          answer:
            "Yes, every item is available individually — you don't need a full package to order.",
        },
      ],
    },
    ar: {
      title: "الهوية البصرية وحلول الطباعة",
      excerpt: "علامتك مطبوعة ومنفّذة بدقة على كل سطح.",
      heroLead: "علامتك مطبوعة ومنفّذة بدقة على كل سطح.",
      overviewTitle: "هوية تلفت الأنظار",
      overview: "من الملصقات إلى رسومات الواجهات الزجاجية، كل تفصيلة تحمل هوية علامتك.",
      overviewBullets: [
        {
          title: "طباعة في مصنعنا",
          description: "تحكّم كامل في الجودة ومدة التسليم",
        },
        {
          title: "أي سطح وأي حجم",
          description: "جدران وواجهات زجاجية ولافتات وأعلام",
        },
        {
          title: "مصنوعة لتدوم",
          description: "مواد متينة للاستخدام الداخلي والخارجي",
        },
        {
          title: "تسليم سريع",
          description: "جاهزة في الموعد الذي تحتاجه فعاليتك",
        },
      ],
      cover: {
        eyebrow: "نطاق الطباعة",
        title: "ما تشمله الطباعة",
        support:
          "من الملصقات إلى تغليف الجدران — طباعة وتركيب يعكسان هوية علامتك.",
        items: [
          {
            title: "ملصقات مخصصة",
            description:
              "رسومات مقصوصة بدقة للأسطح والمنتجات ووحدات العرض.",
          },
          {
            title: "لافتات الرول أب (Roll-Up)",
            description:
              "لافتات قابلة للطي وسهلة الحمل، جاهزة لأي فعالية.",
          },
          {
            title: "أعلام مطبوعة",
            description:
              "أعلام بهوية علامتك للظهور في الأماكن المفتوحة والتفعيلات.",
          },
          {
            title: "هوية الواجهات الزجاجية",
            description:
              "ملصقات فينيل وتغشية زجاج لواجهات المتاجر والأجنحة.",
          },
          {
            title: "تغليف الجدران",
            description:
              "طباعة كبيرة الحجم تغيّر شكل أي مساحة.",
          },
          {
            title: "اختيار المواد",
            description:
              "خامات مختارة للمتانة في الأماكن المغلقة والمفتوحة.",
          },
        ],
      },
      benefits: [
        {
          title: "طباعة في مصنعنا",
          description: "تحكّم كامل في الجودة ومدة التسليم",
        },
        {
          title: "أي سطح وأي حجم",
          description: "جدران وواجهات زجاجية ولافتات وأعلام",
        },
        {
          title: "مصنوعة لتدوم",
          description: "مواد متينة للاستخدام الداخلي والخارجي",
        },
      ],
      process: [
        {
          title: "الموجز",
          description:
            "زوّدنا بملفات هويتك وأماكن تركيب الرسومات.",
          image: media.about.mission,
          imageAlt: "موجز مشروع الطباعة",
        },
        {
          title: "إعداد التصميم",
          description:
            "نجهّز ملفات جاهزة للطباعة ونرسلها لاعتمادك.",
          image: media.services.design,
          imageAlt: "إعداد ملفات الطباعة",
        },
        {
          title: "الطباعة",
          description:
            "نطبعها في مصنعنا على الخامة المناسبة.",
          image: media.services.branding,
          imageAlt: "الطباعة في مصنع CPS",
        },
        {
          title: "فحص الجودة",
          description:
            "نفحص كل قطعة قبل التسليم.",
          image: media.about.studio,
          imageAlt: "فحص جودة الطباعة",
        },
        {
          title: "التركيب",
          description:
            "نركّبها بإتقان في الموقع عند الحاجة.",
          image: media.services.installation,
          imageAlt: "تركيب الرسومات في الموقع",
        },
      ],
      faq: [
        {
          question: "هل يمكنكم مطابقة ألوان علامتي بدقة؟",
          answer:
            "نعم، نعمل وفق دليل هويتك أو ملفاتك الحالية لمطابقة الألوان في الطباعة بأعلى دقة ممكنة.",
        },
        {
          question: "على أي خامات تطبعون؟",
          answer:
            "يعتمد ذلك على الاستخدام، فلدينا الفينيل والقماش والألواح الصلبة، ونختار بينها حسب مكان تركيب الرسومات.",
        },
        {
          question: "هل يمكنكم تركيب الرسومات في الموقع؟",
          answer:
            "نعم، نركّب في الموقع رسومات الواجهات الزجاجية وتغليف الجدران وغيرها من الأسطح التي تتطلب تركيباً احترافياً.",
        },
        {
          question: "كم تستغرق الطباعة؟",
          answer:
            "تعتمد المدة على الكمية ودرجة التعقيد، ونحدد لك جدولاً واضحاً بعد الاطلاع على طلبك.",
        },
        {
          question: "هل المواد مناسبة للاستخدام الخارجي؟",
          answer:
            "نعم، نوفر خيارات مقاومة للعوامل الجوية للأعلام واللافتات واللوحات الخارجية.",
        },
        {
          question:
            "هل يمكنني طلب قطعة واحدة فقط، كلافتة رول أب، دون باقة هوية كاملة؟",
          answer:
            "نعم، كل عنصر متاح منفرداً، ولا يلزمك طلب باقة كاملة.",
        },
      ],
    },
  },
  {
    slug: "lightbox-retail-display",
    order: 7,
    image: media.services.lightbox,
    imageAlt: "Lightbox signage and storefront",
    en: {
      title: "Lightbox Signage & Storefront",
      excerpt: "Signage that gets your brand noticed, day and night.",
      heroLead: "Signage that gets your brand noticed, day and night.",
      secondaryCta: {
        label: "A to Z Booth Solution",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "Signage Built to Stand Out",
      overview: "LED lightbox signage designed for visibility and durability.",
      overviewBullets: [
        {
          title: "Built for Visibility",
          description: "Bright, clear branding that stands out day or night",
        },
        {
          title: "Custom Shapes & Sizes",
          description: "Designed to fit your storefront or booth",
        },
        {
          title: "Weather-Resistant",
          description: "Built to last, indoors or outdoors",
        },
        {
          title: "Long-Lasting LED",
          description: "Energy-efficient lighting with a long lifespan",
        },
      ],
      cover: {
        eyebrow: "Signage scope",
        title: "What We Cover",
        support:
          "Illuminated signage built for storefronts, booths, and brand visibility.",
        items: [
          {
            title: "LED Lightbox Signs",
            description:
              "Illuminated signage designed for maximum visibility.",
          },
          {
            title: "Backlit Logos & Posters",
            description:
              "Brand elements that glow, day or night.",
          },
          {
            title: "Custom Shapes & Sizes",
            description:
              "Signage built to match your storefront or booth exactly.",
          },
          {
            title: "Weather-Resistant Materials",
            description:
              "Built to hold up outdoors, in any condition.",
          },
        ],
      },
      benefits: [
        {
          title: "Built for Visibility",
          description: "Bright, clear branding that stands out day or night",
        },
        {
          title: "Custom Shapes & Sizes",
          description: "Designed to fit your storefront or booth",
        },
        {
          title: "Weather-Resistant",
          description: "Built to last, indoors or outdoors",
        },
      ],
      process: [
        {
          title: "Brief",
          description:
            "Share your branding and where the signage will go.",
          image: media.about.mission,
          imageAlt: "Lightbox signage brief",
        },
        {
          title: "Design",
          description:
            "We create a layout matched to your space.",
          image: media.services.design,
          imageAlt: "Lightbox signage design",
        },
        {
          title: "Production",
          description:
            "Built in-house, tested for durability.",
          image: media.services.lightbox,
          imageAlt: "Lightbox production",
        },
        {
          title: "Installation",
          description:
            "Set up and ready to shine.",
          image: media.services.installation,
          imageAlt: "Lightbox installation",
        },
      ],
      faq: [
        {
          question: "How long do LED lightbox signs last?",
          answer:
            "LED signage is built for long-term use and energy efficiency, with a lifespan that far exceeds traditional lighting.",
        },
        {
          question: "Can the signage be custom-shaped to match our logo?",
          answer:
            "Yes, we build lightbox signage in custom shapes and sizes to match your brand exactly.",
        },
        {
          question: "Is the signage suitable for outdoor use?",
          answer:
            "Yes, our materials are weather-resistant and built to withstand outdoor conditions.",
        },
        {
          question: "Can you install the signage on-site?",
          answer:
            "Yes, installation is included as part of the process, so your signage is ready to go once it's delivered.",
        },
        {
          question: "How much does lightbox signage cost?",
          answer:
            "Cost depends on size, shape, and complexity — we'll provide a clear quote once we understand your requirements.",
        },
        {
          question:
            "Can I order signage without a full booth or storefront project?",
          answer:
            "Yes, lightbox signage is available as a standalone service.",
        },
      ],
    },
    ar: {
      title: "اللوحات المضيئة وواجهات المتاجر",
      excerpt: "لوحات تُبقي علامتك ظاهرة ليلاً ونهاراً.",
      heroLead: "لوحات تُبقي علامتك ظاهرة ليلاً ونهاراً.",
      secondaryCta: {
        label: "حل الجناح من الألف إلى الياء",
        serviceSlug: "full-booth-management",
      },
      overviewTitle: "لوحات مصممة لتلفت الأنظار",
      overview: "لوحات مضيئة بتقنية LED (لايت بوكس) مصممة للوضوح والمتانة.",
      overviewBullets: [
        {
          title: "وضوح من بعيد",
          description: "هوية ساطعة وواضحة تبرز ليلاً ونهاراً",
        },
        {
          title: "أشكال وأحجام مخصصة",
          description: "مصممة على مقاس واجهتك أو جناحك",
        },
        {
          title: "مقاومة للعوامل الجوية",
          description: "مصنوعة لتدوم في الأماكن المغلقة والمفتوحة",
        },
        {
          title: "إضاءة LED طويلة العمر",
          description: "إضاءة موفّرة للطاقة تدوم طويلاً",
        },
      ],
      cover: {
        eyebrow: "نطاق اللافتات",
        title: "ما تشمله الخدمة",
        support:
          "لوحات مضيئة لواجهات المتاجر والأجنحة، تمنح علامتك حضوراً واضحاً.",
        items: [
          {
            title: "لوحات LED مضيئة",
            description:
              "لوحات مضيئة مصممة لأعلى درجات الوضوح.",
          },
          {
            title: "شعارات وملصقات بإضاءة خلفية",
            description:
              "عناصر من هويتك تضيء ليلاً ونهاراً.",
          },
          {
            title: "أشكال وأحجام مخصصة",
            description:
              "لوحات تُصنع لتطابق واجهتك أو جناحك تماماً.",
          },
          {
            title: "مواد مقاومة للعوامل الجوية",
            description:
              "مصنوعة لتتحمل الأجواء الخارجية بمختلف ظروفها.",
          },
        ],
      },
      benefits: [
        {
          title: "وضوح من بعيد",
          description: "هوية ساطعة وواضحة تبرز ليلاً ونهاراً",
        },
        {
          title: "أشكال وأحجام مخصصة",
          description: "مصممة على مقاس واجهتك أو جناحك",
        },
        {
          title: "مقاومة للعوامل الجوية",
          description: "مصنوعة لتدوم في الأماكن المغلقة والمفتوحة",
        },
      ],
      process: [
        {
          title: "الموجز",
          description:
            "زوّدنا بهويتك وأماكن تركيب اللوحات.",
          image: media.about.mission,
          imageAlt: "موجز مشروع اللوحات المضيئة",
        },
        {
          title: "التصميم",
          description:
            "نصمم لوحة تناسب مساحتك.",
          image: media.services.design,
          imageAlt: "تصميم اللوحات المضيئة",
        },
        {
          title: "الإنتاج",
          description:
            "نصنعها في مصنعنا ونختبر متانتها.",
          image: media.services.lightbox,
          imageAlt: "تصنيع اللوحات المضيئة",
        },
        {
          title: "التركيب",
          description:
            "نركّبها لتضيء فور التسليم.",
          image: media.services.installation,
          imageAlt: "تركيب اللوحات المضيئة",
        },
      ],
      faq: [
        {
          question: "ما العمر الافتراضي للوحات LED المضيئة؟",
          answer:
            "صُممت لوحات LED للاستخدام الطويل وتوفير الطاقة، ويفوق عمرها الإضاءة التقليدية بكثير.",
        },
        {
          question: "هل يمكن تخصيص شكل اللافتة ليطابق شعارنا؟",
          answer:
            "نعم، نصنع اللوحات المضيئة بأشكال وأحجام مخصصة تطابق علامتك تماماً.",
        },
        {
          question: "هل اللافتات مناسبة للاستخدام الخارجي؟",
          answer:
            "نعم، خاماتنا مقاومة للعوامل الجوية ومصنوعة لتتحمل الأجواء الخارجية.",
        },
        {
          question: "هل يمكنكم تركيب اللافتات في الموقع؟",
          answer:
            "نعم، التركيب جزء من الخدمة، فتكون لوحتك جاهزة للعمل فور تسليمها.",
        },
        {
          question: "كم تكلفة اللوحات المضيئة؟",
          answer:
            "تعتمد التكلفة على الحجم والشكل ودرجة التعقيد، ونقدّم لك عرض سعر واضحاً بعد فهم متطلباتك.",
        },
        {
          question: "هل يمكنني طلب اللوحات دون مشروع جناح أو واجهة متكامل؟",
          answer:
            "نعم، اللوحات المضيئة متاحة كخدمة مستقلة.",
        },
      ],
    },
  },
];

export const boothTypes: BoothTypeRecord[] = [
  {
    slug: "custom",
    order: 1,
    image: media.boothTypes.custom,
    imageAlt: "Custom exhibition booth",
    en: {
      title: "Custom-Built Booths in {City}",
      excerpt: "Fully bespoke booths, designed and built around your brand.",
      overviewTitle: "No Templates. Just Your Booth.",
      description: "Built from scratch, shaped entirely around your goals.",
      features: [
        {
          title: "Fully Bespoke",
          description: "No reused molds or templates, every booth is original.",
        },
        {
          title: "Built for Impact",
          description: "Designed to stand out on a crowded show floor.",
        },
        {
          title: "Any Size, Any Shape",
          description: "Built to fit your space exactly.",
        },
        {
          title: "One Team, Full Control",
          description: "Design and fabrication under one roof.",
        },
      ],
      advantages: [
        {
          title: "Custom Design",
          description: "A concept built entirely around your brand and goals.",
        },
        {
          title: "Structural Fabrication",
          description: "Built from the ground up, not adapted from existing frames.",
        },
        {
          title: "Branding Integration",
          description: "Every surface and detail carries your identity.",
        },
        {
          title: "Premium Finishes",
          description: "Materials and textures chosen to match your brand's positioning.",
        },
      ],
      useCases: [
        "Flagship presence at major exhibitions",
        "Brands wanting a standout, memorable booth",
        "Events where the booth itself is part of the brand statement",
        "Clients with specific space or design requirements standard booths can't meet",
      ],
      faq: [
        {
          question: "How is a custom-built booth different from a modular one?",
          answer:
            "A custom-built booth is designed and fabricated entirely from scratch for your specific brand and space — nothing is reused from a standard system.",
        },
        {
          question: "How long does a custom booth take to build?",
          answer:
            "Timelines depend on size and complexity — we'll confirm a clear schedule once your design is finalized.",
        },
        {
          question: "Can a custom-built booth be reused for future events?",
          answer:
            "Yes, with proper storage and reinstallation, most custom booths can be used again.",
        },
        {
          question: "What's the size range for custom booths?",
          answer:
            "There's no fixed limit — custom booths are built to whatever footprint your event requires.",
        },
        {
          question:
            "Do you handle custom booths for international exhibitions, or only in Saudi Arabia?",
          answer:
            "Our current focus is delivery across Saudi Arabia — let us know your event location and we'll confirm feasibility.",
        },
      ],
    },
    ar: {
      title: "أجنحة مصمَّمة حسب الطلب في {City}",
      excerpt: "أجنحة تُصمَّم وتُصنَّع خصيصاً لعلامتك.",
      overviewTitle: "لا قوالب جاهزة — جناحك وحده",
      description: "يُصنع من الصفر، وينطلق بالكامل من أهدافك.",
      features: [
        {
          title: "مخصص بالكامل",
          description: "لا قوالب ولا نماذج مكررة، فكل جناح تصميم أصيل.",
        },
        {
          title: "حضور لافت",
          description: "مصمم ليبرز في قاعة معرض مزدحمة.",
        },
        {
          title: "أي حجم وأي شكل",
          description: "يُصنع على مقاس مساحتك تماماً.",
        },
        {
          title: "فريق واحد وتحكم كامل",
          description: "التصميم والتصنيع تحت سقف واحد.",
        },
      ],
      advantages: [
        {
          title: "تصميم مخصص",
          description: "فكرة تنطلق بالكامل من علامتك وأهدافك.",
        },
        {
          title: "تصنيع الهيكل",
          description: "يُصنع من الأساس، لا يُعدَّل من هياكل جاهزة.",
        },
        {
          title: "ترجمة الهوية",
          description: "كل سطح وتفصيلة يعكسان هويتك.",
        },
        {
          title: "تشطيبات فاخرة",
          description: "مواد وملامس مختارة لتناسب مكانة علامتك.",
        },
      ],
      useCases: [
        "حضور رئيسي في المعارض الكبرى",
        "علامات تريد جناحاً مميزاً يبقى في الذاكرة",
        "فعاليات يكون فيها الجناح نفسه جزءاً من رسالة العلامة",
        "عملاء لديهم متطلبات مساحة أو تصميم لا تلبيها الأجنحة القياسية",
      ],
      faq: [
        {
          question: "ما الفرق بين الجناح المخصص والجناح المعياري؟",
          answer:
            "الجناح المخصص يُصمَّم ويُصنَّع من الصفر لعلامتك ومساحتك تحديداً، دون الاعتماد على أي نظام جاهز.",
        },
        {
          question: "كم يستغرق تصنيع جناح مخصص؟",
          answer:
            "تعتمد المدة على الحجم ودرجة التعقيد، ونحدد لك جدولاً واضحاً فور اعتماد التصميم.",
        },
        {
          question: "هل يمكن إعادة استخدام الجناح المخصص في فعاليات لاحقة؟",
          answer:
            "نعم، مع التخزين وإعادة التركيب بالشكل الصحيح يمكن استخدام معظم الأجنحة المخصصة مرة أخرى.",
        },
        {
          question: "ما الأحجام المتاحة للأجنحة المخصصة؟",
          answer:
            "لا يوجد حد ثابت، فالجناح المخصص يُصنع بالمساحة التي تتطلبها فعاليتك.",
        },
        {
          question: "هل تنفّذون أجنحة مخصصة للمعارض الدولية أم داخل المملكة فقط؟",
          answer:
            "نركّز حالياً على التنفيذ داخل المملكة. أخبرنا بموقع فعاليتك ونؤكد لك إمكانية التنفيذ.",
        },
      ],
    },
  },
  {
    slug: "modular",
    order: 2,
    image: media.boothTypes.modular,
    imageAlt: "Modular system booth",
    en: {
      title: "Modular / System Booths in {City}",
      excerpt: "Reusable, fast to build, ready for your next event.",
      overviewTitle: "Built to Use Again and Again",
      description:
        "A smart choice for brands attending multiple events a year.",
      features: [
        {
          title: "Fast Setup",
          description: "Quicker to build and install than custom structures.",
        },
        {
          title: "Reusable by Design",
          description: "Built for multiple events, not just one.",
        },
        {
          title: "Cost-Efficient",
          description: "Lower cost per use across repeated events.",
        },
        {
          title: "Consistent Branding",
          description: "The same strong presence, every time.",
        },
      ],
      advantages: [
        {
          title: "System Structure & Framing",
          description:
            "Durable, reusable frames engineered for repeated builds.",
        },
        {
          title: "Branded Panels & Graphics",
          description:
            "Swappable graphics so your booth stays fresh event to event.",
        },
        {
          title: "Layout Configuration",
          description: "Flexible layouts adaptable to different booth sizes.",
        },
        {
          title: "Storage Between Events",
          description: "Kept ready and protected until your next show.",
        },
      ],
      useCases: [
        "Brands exhibiting at multiple events per year",
        "Teams needing a fast, reliable setup without a custom build",
        "Exhibitors looking to reduce cost per event through reuse",
        "Brands wanting consistent presence across different shows",
      ],
      faq: [
        {
          question: "How many times can a modular booth be reused?",
          answer:
            "Modular booths are built for repeated use — with proper storage and care, they can be reused across many events over several years.",
        },
        {
          question: "Can the design change between events?",
          answer:
            "Yes, panels and graphics can be swapped, so your booth can look fresh at each event without rebuilding the structure.",
        },
        {
          question: "Is a modular booth as customizable as a custom-built one?",
          answer:
            "Not entirely — modular systems offer flexible configurations, but full bespoke design is better suited to Custom-Built Booths.",
        },
        {
          question: "How fast can a modular booth be set up?",
          answer:
            "Setup is significantly faster than custom builds, typically within a day depending on size and configuration.",
        },
        {
          question: "Can you store the booth between events?",
          answer:
            "Yes, storage and reinstallation are available so your booth is ready whenever your next event comes up.",
        },
        {
          question: "What sizes are available for modular booths?",
          answer:
            "Modular systems are flexible and can be configured for small stands up to larger footprints, depending on your needs.",
        },
      ],
    },
    ar: {
      title: "أجنحة معيارية قابلة لإعادة التركيب في {City}",
      excerpt: "قابلة لإعادة الاستخدام، سريعة التركيب، وجاهزة لفعاليتك القادمة.",
      overviewTitle: "جناح واحد لمشاركات متعددة",
      description: "خيار ذكي للعلامات التي تشارك في عدة فعاليات خلال العام.",
      features: [
        {
          title: "تركيب سريع",
          description: "أسرع في التصنيع والتركيب من الهياكل المخصصة.",
        },
        {
          title: "مصممة لإعادة الاستخدام",
          description: "مصنوعة لعدة فعاليات، لا لفعالية واحدة.",
        },
        {
          title: "تكلفة أقل",
          description: "تنخفض تكلفة كل مشاركة مع تكرار الاستخدام.",
        },
        {
          title: "هوية ثابتة",
          description: "الحضور القوي نفسه في كل مشاركة.",
        },
      ],
      advantages: [
        {
          title: "الهيكل والإطارات",
          description: "إطارات متينة مصممة لإعادة التركيب مرات عديدة.",
        },
        {
          title: "ألواح ورسومات بهوية علامتك",
          description: "رسومات قابلة للتبديل ليظهر جناحك بحلّة جديدة في كل فعالية.",
        },
        {
          title: "مرونة في التوزيع",
          description: "توزيعات مرنة تتكيّف مع مساحات مختلفة.",
        },
        {
          title: "تخزين بين الفعاليات",
          description: "يُحفظ جاهزاً ومحمياً حتى معرضك القادم.",
        },
      ],
      useCases: [
        "علامات تشارك في عدة فعاليات سنوياً",
        "فرق تحتاج تركيباً سريعاً وموثوقاً دون تصنيع جناح مخصص",
        "عارضون يريدون خفض تكلفة كل مشاركة بإعادة الاستخدام",
        "علامات تريد حضوراً ثابتاً في معارض مختلفة",
      ],
      faq: [
        {
          question: "كم مرة يمكن إعادة استخدام الجناح المعياري؟",
          answer:
            "الأجنحة المعيارية مصممة للاستخدام المتكرر، ومع التخزين والعناية الصحيحين يمكن استخدامها في فعاليات عديدة على مدى سنوات.",
        },
        {
          question: "هل يمكن تغيير التصميم بين الفعاليات؟",
          answer:
            "نعم، يمكن تبديل الألواح والرسومات ليظهر جناحك بحلّة جديدة في كل فعالية دون إعادة تصنيع الهيكل.",
        },
        {
          question: "هل يتيح الجناح المعياري مرونة التخصيص نفسها التي يتيحها الجناح المخصص؟",
          answer:
            "ليس تماماً. تتيح الأنظمة المعيارية توزيعات مرنة، أما التصميم الخاص بالكامل فيناسبه الجناح المصمم حسب الطلب.",
        },
        {
          question: "كم يستغرق تركيب الجناح المعياري؟",
          answer:
            "التركيب أسرع بكثير من الأجنحة المخصصة، ويتم عادة خلال يوم واحد حسب الحجم والتوزيع.",
        },
        {
          question: "هل يمكنكم تخزين الجناح بين الفعاليات؟",
          answer:
            "نعم، نوفر التخزين وإعادة التركيب ليبقى جناحك جاهزاً متى حان موعد فعاليتك التالية.",
        },
        {
          question: "ما الأحجام المتاحة للأجنحة المعيارية؟",
          answer:
            "الأنظمة المعيارية مرنة، ويمكن تهيئتها من الأجنحة الصغيرة حتى المساحات الكبيرة حسب احتياجك.",
        },
      ],
    },
  },
  {
    slug: "double-deck",
    order: 3,
    image: media.boothTypes.doubleDeck,
    imageAlt: "Double-deck booth",
    en: {
      title: "Double-Deck Booths in {City}",
      excerpt: "More space, more impact, on a limited footprint.",
      overviewTitle: "Double the Space, Double the Presence",
      description:
        "A two-level solution when floor space is limited but ambition isn't.",
      features: [
        {
          title: "Maximized Floor Space",
          description:
            "More usable area without expanding your footprint.",
        },
        {
          title: "Elevated Presence",
          description: "Stands out on a crowded show floor.",
        },
        {
          title: "Private Upper Level",
          description: "Ideal for meetings, VIP areas, or lounges.",
        },
        {
          title: "Built for Structural Safety",
          description: "Engineered and certified for multi-level use.",
        },
      ],
      advantages: [
        {
          title: "Structural Engineering",
          description:
            "Two-level structures engineered for safety and stability.",
        },
        {
          title: "Custom Design",
          description: "Layouts tailored to your brand and space needs.",
        },
        {
          title: "Upper-Level Fit-Out",
          description:
            "Meeting rooms, lounges, or VIP areas built to spec.",
        },
        {
          title: "Branding Integration",
          description: "Consistent brand presence across both levels.",
        },
      ],
      useCases: [
        "Brands needing extra space without a larger floor footprint",
        "Exhibitors wanting a private meeting or VIP area on-site",
        "High-traffic events where standing out matters",
        "Companies with strong budgets seeking maximum floor presence",
      ],
      faq: [
        {
          question:
            "Is there a minimum floor space required for a double-deck booth?",
          answer:
            "Yes, structural requirements mean double-deck booths typically need a larger footprint — we'll confirm feasibility based on your available space.",
        },
        {
          question: "How is safety ensured for the upper level?",
          answer:
            "All double-deck structures are engineered and certified to meet safety standards for weight capacity and structural stability.",
        },
        {
          question:
            "Can I use the upper level for meetings or a private lounge?",
          answer:
            "Yes, upper levels are commonly fitted out as meeting rooms, VIP lounges, or private client areas.",
        },
        {
          question: "Are double-deck booths reusable for future events?",
          answer:
            "Yes, with proper dismantling, storage, and reinstallation, double-deck booths can be reused across events.",
        },
        {
          question: "How long does installation take?",
          answer:
            "Installation timelines are longer than single-level booths due to structural complexity — we'll confirm a schedule once your design is finalized.",
        },
        {
          question: "Do all venues allow double-deck structures?",
          answer:
            "Not always — some venues have height restrictions. We recommend confirming with the event organizer, and we can advise based on your venue.",
        },
      ],
    },
    ar: {
      title: "أجنحة بطابقين في {City}",
      excerpt: "مساحة أكبر وحضور أقوى على مساحة أرضية محدودة.",
      overviewTitle: "طابقان لحضور مضاعف",
      description:
        "حل بطابقين حين تكون المساحة محدودة والطموح أكبر منها.",
      features: [
        {
          title: "استثمار أمثل للمساحة",
          description: "مساحة استخدام أكبر دون زيادة المساحة المستأجرة.",
        },
        {
          title: "حضور يُرى من بعيد",
          description: "يرتفع فوق الأجنحة المجاورة في القاعة المزدحمة.",
        },
        {
          title: "طابق علوي خاص",
          description: "مثالي للاجتماعات ومناطق كبار الزوار والصالات.",
        },
        {
          title: "السلامة الإنشائية أولاً",
          description: "مصمم هندسياً ومعتمد للاستخدام بطابقين.",
        },
      ],
      advantages: [
        {
          title: "الهندسة الإنشائية",
          description: "هياكل بطابقين مصممة هندسياً للسلامة والثبات.",
        },
        {
          title: "تصميم مخصص",
          description: "توزيع مصمم وفق علامتك واحتياجات مساحتك.",
        },
        {
          title: "تجهيز الطابق العلوي",
          description: "غرف اجتماعات أو صالات أو مناطق لكبار الزوار وفق المواصفات.",
        },
        {
          title: "ترجمة الهوية",
          description: "حضور متسق لعلامتك في الطابقين.",
        },
      ],
      useCases: [
        "علامات تحتاج مساحة إضافية دون استئجار مساحة أرضية أكبر",
        "عارضون يريدون منطقة اجتماعات خاصة أو لكبار الزوار داخل الجناح",
        "فعاليات كثيفة الحضور يصنع فيها التميّز الفارق",
        "شركات بميزانيات كبيرة تسعى لأقوى حضور في المعرض",
      ],
      faq: [
        {
          question: "هل يلزم حد أدنى من المساحة لجناح بطابقين؟",
          answer:
            "نعم، فالمتطلبات الإنشائية تستلزم عادة مساحة أكبر لهذا النوع من الأجنحة، ونؤكد لك إمكانية التنفيذ وفق المساحة المتاحة لك.",
        },
        {
          question: "كيف تضمنون سلامة الطابق العلوي؟",
          answer:
            "جميع هياكل الأجنحة بطابقين مصممة هندسياً ومعتمدة وفق معايير السلامة الخاصة بقدرة التحميل والثبات الإنشائي.",
        },
        {
          question: "هل يمكن استخدام الطابق العلوي للاجتماعات أو كصالة خاصة؟",
          answer:
            "نعم، يُجهَّز الطابق العلوي عادة كغرف اجتماعات أو صالات لكبار الزوار أو مناطق خاصة للعملاء.",
        },
        {
          question: "هل يمكن إعادة استخدام الجناح بطابقين في فعاليات لاحقة؟",
          answer:
            "نعم، مع الفك والتخزين وإعادة التركيب بالشكل الصحيح يمكن استخدامه في فعاليات متعددة.",
        },
        {
          question: "كم يستغرق التركيب؟",
          answer:
            "يستغرق التركيب وقتاً أطول من الجناح بطابق واحد بسبب تعقيده الإنشائي، ونحدد الجدول الزمني فور اعتماد التصميم.",
        },
        {
          question: "هل تسمح جميع المواقع بالأجنحة بطابقين؟",
          answer:
            "ليس دائماً، فبعض المواقع تفرض قيوداً على الارتفاع. نوصي بالتأكد من منظّم الفعالية، ويمكننا إرشادك حسب اشتراطات موقعك.",
        },
      ],
    },
  },
  {
    slug: "portable",
    order: 4,
    image: media.boothTypes.portable,
    imageAlt: "Portable pop-up display",
    en: {
      title: "Portable & Pop-Up Displays in {City}",
      excerpt: "Quick to set up, easy to move, ready whenever you are.",
      overviewTitle: "Simple, Fast, and Flexible",
      description: "A practical solution for frequent or smaller-scale events.",
      features: [
        {
          title: "Fast Setup",
          description: "Ready in minutes, no complex installation.",
        },
        {
          title: "Lightweight & Portable",
          description: "Easy to transport and store.",
        },
        {
          title: "Budget-Friendly",
          description: "Lower cost without sacrificing brand presence.",
        },
        {
          title: "Reusable",
          description: "Built to travel to multiple events.",
        },
      ],
      advantages: [
        {
          title: "Pop-Up Frames & Backdrops",
          description:
            "Lightweight structures that assemble quickly on-site.",
        },
        {
          title: "Roll-Up & Banner Stands",
          description:
            "Compact, professional displays ready in seconds.",
        },
        {
          title: "Portable Counters & Kiosks",
          description:
            "Functional, branded pieces for product displays or reception areas.",
        },
        {
          title: "Carrying Cases & Storage",
          description: "Built for easy transport between events.",
        },
      ],
      useCases: [
        "Brands attending frequent, smaller-scale events",
        "Teams needing a fast, no-hassle setup",
        "Exhibitors with limited budget or space",
        "Companies wanting a display that travels easily",
      ],
      faq: [
        {
          question: "How quickly can a pop-up display be set up?",
          answer:
            "Most pop-up displays can be assembled in a matter of minutes, without tools or technical expertise.",
        },
        {
          question: "Can I reuse the same display at multiple events?",
          answer:
            "Yes, portable displays are designed for repeated use — just store and transport them between events.",
        },
        {
          question: "How much can I customize a pop-up display?",
          answer:
            "Customization is more limited than custom-built booths, but graphics and branding can still be tailored to your identity.",
        },
        {
          question: "Are these displays suitable for outdoor events?",
          answer:
            "Yes, many portable displays are suitable for both indoor and outdoor use, depending on the format.",
        },
        {
          question: "Do you provide carrying cases for transport?",
          answer:
            "Yes, carrying cases are included to make transport and storage easy between events.",
        },
        {
          question: "What's the typical size of a pop-up display?",
          answer:
            "Sizes vary from small tabletop displays to larger backdrop walls — we'll help you choose based on your space and goals.",
        },
      ],
    },
    ar: {
      title: "وحدات عرض محمولة وسريعة التركيب في {City}",
      excerpt: "سريعة التركيب، سهلة النقل، وجاهزة متى احتجتها.",
      overviewTitle: "بسيطة وسريعة ومرنة",
      description: "حل عملي للفعاليات المتكررة أو محدودة الحجم.",
      features: [
        {
          title: "تركيب سريع",
          description: "جاهزة خلال دقائق دون تركيب معقد.",
        },
        {
          title: "خفيفة ومحمولة",
          description: "سهلة النقل والتخزين.",
        },
        {
          title: "اقتصادية",
          description: "تكلفة أقل دون أن تخسر حضور علامتك.",
        },
        {
          title: "قابلة لإعادة الاستخدام",
          description: "مصممة للتنقل بين فعاليات متعددة.",
        },
      ],
      advantages: [
        {
          title: "إطارات وخلفيات قابلة للطي",
          description: "هياكل خفيفة تُركَّب بسرعة في الموقع.",
        },
        {
          title: "حوامل الرول أب واللافتات",
          description: "وحدات عرض مدمجة واحترافية تُنصب في ثوانٍ.",
        },
        {
          title: "طاولات استقبال وأكشاك متنقلة",
          description: "قطع عملية بهوية علامتك لعرض المنتجات أو الاستقبال.",
        },
        {
          title: "حقائب حمل وتخزين",
          description: "مصممة لتسهيل النقل بين الفعاليات.",
        },
      ],
      useCases: [
        "علامات تشارك في فعاليات متكررة ومحدودة الحجم",
        "فرق تحتاج تركيباً سريعاً دون عناء",
        "عارضون بميزانية أو مساحة محدودة",
        "شركات تريد وحدة عرض سهلة التنقل",
      ],
      faq: [
        {
          question: "كم يستغرق تركيب العرض المتنقل؟",
          answer:
            "يمكن تركيب معظم العروض المتنقلة خلال دقائق، دون أدوات أو خبرة فنية.",
        },
        {
          question: "هل يمكن استخدام العرض نفسه في عدة فعاليات؟",
          answer:
            "نعم، العروض المتنقلة مصممة للاستخدام المتكرر، وكل ما تحتاجه هو تخزينها ونقلها بين الفعاليات.",
        },
        {
          question: "إلى أي مدى يمكن تخصيص العرض المتنقل؟",
          answer:
            "التخصيص هنا أضيق منه في الأجنحة المصممة حسب الطلب، لكن الرسومات والهوية تُصمَّم لتعكس علامتك.",
        },
        {
          question: "هل تناسب هذه العروض الفعاليات في الأماكن المفتوحة؟",
          answer:
            "نعم، كثير من العروض المتنقلة يناسب الأماكن المغلقة والمفتوحة، حسب النوع.",
        },
        {
          question: "هل توفّرون حقائب لنقل العروض؟",
          answer:
            "نعم، نوفر حقائب حمل ضمن الطلب لتسهيل النقل والتخزين بين الفعاليات.",
        },
        {
          question: "ما الحجم المعتاد للعرض المتنقل؟",
          answer:
            "تتراوح الأحجام بين وحدات العرض المكتبية الصغيرة والجدران الخلفية الأكبر، ونساعدك على الاختيار حسب مساحتك وأهدافك.",
        },
      ],
    },
  },
  {
    slug: "kiosks",
    order: 5,
    image: media.boothTypes.kiosk,
    imageAlt: "Exhibition kiosk",
    en: {
      title: "Kiosks & Small Footprint Stands in {City}",
      excerpt: "A compact presence that still makes an impact.",
      overviewTitle: "Small Space, Strong Presence",
      description:
        "Ideal when floor space is limited but visibility still matters.",
      features: [
        {
          title: "Compact Footprint",
          description: "Designed to fit tight or budget-conscious spaces.",
        },
        {
          title: "Product-Focused",
          description: "Built to highlight a single product or offer.",
        },
        {
          title: "Fast Setup",
          description: "Quick to install, quick to pack away.",
        },
        {
          title: "Cost-Efficient",
          description: "Strong presence without a large booth investment.",
        },
      ],
      advantages: [
        {
          title: "Kiosk Structures",
          description:
            "Compact, freestanding units for product displays or reception points.",
        },
        {
          title: "Counter & Storage Integration",
          description:
            "Functional counters with built-in storage where needed.",
        },
        {
          title: "Branded Graphics",
          description:
            "Full branding across a smaller footprint, without losing impact.",
        },
        {
          title: "Lighting & Display Fixtures",
          description:
            "Small-scale lighting to highlight products or key messaging.",
        },
      ],
      useCases: [
        "First-time exhibitors or smaller budgets",
        "Brands showcasing a single product or service",
        "Events with limited floor space",
        "Companies wanting a simple, functional presence",
      ],
      faq: [
        {
          question: "What's the typical size range for a kiosk?",
          answer:
            "Kiosks are generally compact, often ranging from a small tabletop unit to a few square meters — we'll confirm based on your space.",
        },
        {
          question: "Can a kiosk include storage for products or materials?",
          answer:
            "Yes, many kiosk designs include built-in storage or counter space for products and supplies.",
        },
        {
          question: "Is a kiosk suitable for a first-time exhibitor?",
          answer:
            "Yes, kiosks are a practical, cost-effective option for brands new to exhibiting or working with a smaller budget.",
        },
        {
          question: "Can I upgrade to a larger booth later?",
          answer:
            "Yes, if your needs grow, we can scale up to a modular or custom-built booth for future events.",
        },
        {
          question: "Are kiosks reusable across multiple events?",
          answer:
            "Yes, with proper storage, kiosks can be reused for future events.",
        },
        {
          question: "Can kiosks be used outdoors?",
          answer:
            "Yes, depending on the design and materials, kiosks can be built for outdoor use as well.",
        },
      ],
    },
    ar: {
      title: "أكشاك وأجنحة للمساحات الصغيرة في {City}",
      excerpt: "حضور مدمج بأثر واضح.",
      overviewTitle: "مساحة صغيرة، حضور قوي",
      description:
        "الخيار الأمثل حين تكون المساحة محدودة ويبقى الظهور أولوية.",
      features: [
        {
          title: "مساحة مدمجة",
          description: "مصممة للمساحات الضيقة والميزانيات المحدودة.",
        },
        {
          title: "التركيز على المنتج",
          description: "مصممة لإبراز منتج واحد أو عرض واحد.",
        },
        {
          title: "تركيب سريع",
          description: "سريعة التركيب وسريعة الفك.",
        },
        {
          title: "تكلفة أقل",
          description: "حضور قوي دون استثمار في جناح كبير.",
        },
      ],
      advantages: [
        {
          title: "هياكل الأكشاك",
          description:
            "وحدات مستقلة مدمجة لعرض المنتجات أو الاستقبال.",
        },
        {
          title: "طاولة عرض بتخزين مدمج",
          description: "طاولات عملية بمساحات تخزين مدمجة عند الحاجة.",
        },
        {
          title: "رسومات بهوية علامتك",
          description:
            "هوية متكاملة على مساحة أصغر دون أن تفقد أثرها.",
        },
        {
          title: "الإضاءة ووحدات العرض",
          description:
            "إضاءة مركّزة لإبراز المنتجات أو الرسائل الرئيسية.",
        },
      ],
      useCases: [
        "عارضون يشاركون لأول مرة أو بميزانيات محدودة",
        "علامات تعرض منتجاً أو خدمة واحدة",
        "فعاليات بمساحات محدودة",
        "شركات تريد حضوراً بسيطاً وعملياً",
      ],
      faq: [
        {
          question: "ما الأحجام المعتادة للكشك؟",
          answer:
            "الأكشاك مدمجة عادة، وتتراوح غالباً بين وحدة مكتبية صغيرة وبضعة أمتار مربعة، ونحدد الحجم المناسب حسب مساحتك.",
        },
        {
          question: "هل يمكن أن يتضمن الكشك مساحة لتخزين المنتجات أو المواد؟",
          answer:
            "نعم، كثير من تصاميم الأكشاك تتضمن تخزيناً مدمجاً أو طاولة لحفظ المنتجات والمستلزمات.",
        },
        {
          question: "هل يناسب الكشك من يشارك في المعارض لأول مرة؟",
          answer:
            "نعم، الكشك خيار عملي واقتصادي للعلامات الجديدة على المعارض أو لمن يعمل بميزانية محدودة.",
        },
        {
          question: "هل يمكنني الانتقال لاحقاً إلى جناح أكبر؟",
          answer:
            "نعم، إذا توسعت احتياجاتك يمكننا الانتقال بك إلى جناح معياري أو مخصص في فعالياتك القادمة.",
        },
        {
          question: "هل يمكن إعادة استخدام الكشك في عدة فعاليات؟",
          answer:
            "نعم، مع التخزين المناسب يمكن استخدام الكشك في فعاليات لاحقة.",
        },
        {
          question: "هل يمكن استخدام الأكشاك في الأماكن المفتوحة؟",
          answer:
            "نعم، حسب التصميم والخامات يمكن تصنيع الأكشاك للاستخدام في الأماكن المفتوحة أيضاً.",
        },
      ],
    },
  },
  {
    slug: "outdoor",
    order: 6,
    image: media.boothTypes.outdoor,
    imageAlt: "Outdoor activation",
    en: {
      title: "Outdoor Structures & Activations in {City}",
      excerpt: "Bold builds designed to perform outside the show floor.",
      overviewTitle: "Built for Bigger Spaces, Bigger Impact",
      description:
        "Outdoor structures designed for brand activations, launches, and experiential events.",
      features: [
        {
          title: "Built for the Elements",
          description: "Engineered to withstand outdoor conditions.",
        },
        {
          title: "Experience-Focused",
          description: "Designed for engagement, not just visibility.",
        },
        {
          title: "Large-Scale Capability",
          description: "Built for open spaces and bigger footprints.",
        },
        {
          title: "Fully Custom",
          description: "Shaped entirely around your activation concept.",
        },
      ],
      advantages: [
        {
          title: "Structural Design & Engineering",
          description:
            "Outdoor-rated structures built to withstand weather and wind load.",
        },
        {
          title: "Activation Concept Development",
          description: "Spaces designed for interaction, not just display.",
        },
        {
          title: "Weatherproof Materials",
          description:
            "Finishes and materials selected for outdoor durability.",
        },
        {
          title: "On-Site Installation",
          description: "Full setup and safety checks handled on location.",
        },
      ],
      useCases: [
        "Brand launches and experiential marketing campaigns",
        "Outdoor festivals, activations, and public events",
        "Brands wanting an immersive, large-scale presence",
        "Campaigns where the structure itself is part of the experience",
      ],
      faq: [
        {
          question:
            "Can outdoor structures withstand strong wind or weather conditions?",
          answer:
            "Yes, structures are engineered and rated to handle outdoor conditions, with materials selected for durability.",
        },
        {
          question: "Are outdoor activations reusable for future events?",
          answer:
            "Some can be, depending on design — many outdoor activations are built for a single event, but reuse is possible with the right structure. We'll advise based on your goals.",
        },
        {
          question:
            "Do you handle permits or site logistics for outdoor builds?",
          answer:
            "We can guide you on site and structural requirements, but permits are typically coordinated with the event organizer or venue.",
        },
        {
          question:
            "What kind of events are outdoor structures best suited for?",
          answer:
            "Brand launches, festivals, public activations, and any event where an immersive, large-scale presence matters.",
        },
        {
          question: "How long does an outdoor structure take to build?",
          answer:
            "Timelines vary significantly by scale and complexity — we'll confirm a schedule once your concept is finalized.",
        },
        {
          question: "Can outdoor structures include interactive elements?",
          answer:
            "Yes, activations can be designed with interactive features as part of the concept.",
        },
      ],
    },
    ar: {
      title: "هياكل خارجية وتجارب تفاعلية للعلامة التجارية في {City}",
      excerpt: "منشآت لافتة مصممة للأداء خارج قاعات المعارض.",
      overviewTitle: "مساحات أكبر لأثر أكبر",
      description:
        "هياكل خارجية مصممة لتفعيلات العلامات التجارية وإطلاق المنتجات والفعاليات التفاعلية.",
      features: [
        {
          title: "مصممة للأجواء المفتوحة",
          description: "مصممة هندسياً لتتحمل الظروف الخارجية.",
        },
        {
          title: "التجربة أولاً",
          description: "مصممة للتفاعل، لا للظهور فقط.",
        },
        {
          title: "مشاريع بأحجام كبيرة",
          description: "مصممة للمساحات المفتوحة والمواقع الكبيرة.",
        },
        {
          title: "مخصصة بالكامل",
          description: "تنطلق بالكامل من فكرة التفعيل الخاصة بك.",
        },
      ],
      advantages: [
        {
          title: "التصميم والهندسة الإنشائية",
          description:
            "هياكل مخصصة للأماكن المفتوحة تتحمل الطقس وأحمال الرياح.",
        },
        {
          title: "تطوير فكرة التفعيل",
          description: "مساحات مصممة للتفاعل، لا للعرض فقط.",
        },
        {
          title: "خامات مقاومة للطقس",
          description: "خامات وتشطيبات مختارة لتصمد في الأماكن المفتوحة.",
        },
        {
          title: "التركيب في الموقع",
          description: "تركيب كامل وفحوصات سلامة في الموقع.",
        },
      ],
      useCases: [
        "إطلاق العلامات التجارية وحملات التسويق التفاعلي",
        "المهرجانات والتفعيلات والفعاليات العامة في الأماكن المفتوحة",
        "علامات تريد حضوراً واسعاً يعيشه الزائر",
        "حملات يكون فيها الهيكل نفسه جزءاً من التجربة",
      ],
      faq: [
        {
          question: "هل تتحمل الهياكل الخارجية الرياح القوية وتقلبات الطقس؟",
          answer:
            "نعم، الهياكل مصممة هندسياً ومعتمدة لتحمل الظروف الخارجية، وخاماتها مختارة للمتانة.",
        },
        {
          question: "هل يمكن إعادة استخدام التفعيلات الخارجية في فعاليات لاحقة؟",
          answer:
            "بعضها ممكن حسب التصميم. كثير من التفعيلات الخارجية تُنفَّذ لفعالية واحدة، لكن إعادة الاستخدام ممكنة إذا صُمم الهيكل لذلك، وننصحك بما يناسب أهدافك.",
        },
        {
          question: "هل تتولون التصاريح أو لوجستيات الموقع للمنشآت الخارجية؟",
          answer:
            "نرشدك بشأن اشتراطات الموقع والهيكل، أما التصاريح فتُنسَّق عادة مع منظّم الفعالية أو إدارة الموقع.",
        },
        {
          question: "ما الفعاليات الأنسب للهياكل الخارجية؟",
          answer:
            "إطلاق العلامات التجارية والمهرجانات والتفعيلات العامة، وكل فعالية تتطلب حضوراً واسعاً وتجربة متكاملة للزائر.",
        },
        {
          question: "كم يستغرق تنفيذ هيكل خارجي؟",
          answer:
            "تختلف المدة كثيراً حسب الحجم ودرجة التعقيد، ونحدد الجدول الزمني فور اعتماد الفكرة.",
        },
        {
          question: "هل يمكن أن تتضمن الهياكل الخارجية عناصر تفاعلية؟",
          answer:
            "نعم، يمكن تصميم التفعيل بعناصر تفاعلية ضمن الفكرة.",
        },
      ],
    },
  },
  {
    slug: "pavilions",
    order: 7,
    image: media.boothTypes.pavilion,
    imageAlt: "National pavilion",
    en: {
      title: "Country / National Pavilions in {City}",
      excerpt: "Large-scale builds representing a nation on the world stage.",
      overviewTitle: "Built to Represent, Built to Scale",
      description:
        "Pavilions designed for government delegations and multi-brand national presence.",
      features: [
        {
          title: "Large-Scale Capability",
          description: "Built for expansive, high-profile footprints.",
        },
        {
          title: "Multi-Zone Design",
          description:
            "Space for multiple exhibitors, meetings, and public areas.",
        },
        {
          title: "Built to Represent",
          description: "Design reflects national identity and positioning.",
        },
        {
          title: "Full Project Management",
          description:
            "One team coordinating a complex, multi-stakeholder build.",
        },
      ],
      advantages: [
        {
          title: "Pavilion Design & Architecture",
          description:
            "Large-scale concepts designed to represent a national identity.",
        },
        {
          title: "Multi-Zone Layout Planning",
          description:
            "Space allocated for multiple exhibitors, meeting areas, and public zones.",
        },
        {
          title: "Structural Fabrication",
          description: "Built in-house for scale, safety, and durability.",
        },
        {
          title: "Stakeholder Coordination",
          description:
            "Managing the complexity of multi-brand, multi-stakeholder builds.",
        },
      ],
      useCases: [
        "Government delegations and ministries",
        "Multi-brand national pavilions at international exhibitions",
        "Organizations representing a country or region at trade events",
        "Large-scale projects requiring coordinated, multi-party management",
      ],
      faq: [
        {
          question: "How large can a national pavilion be?",
          answer:
            "Pavilion size depends on the event and the number of exhibitors involved — we scale design and fabrication to match your requirements.",
        },
        {
          question:
            "Can a pavilion house multiple exhibitors under one structure?",
          answer:
            "Yes, pavilions are commonly designed with multiple zones to accommodate several exhibitors within a shared national space.",
        },
        {
          question: "Do you coordinate directly with government stakeholders?",
          answer:
            "Yes, we're experienced in managing multi-stakeholder projects, including coordination with government and delegation representatives.",
        },
        {
          question: "How far in advance should a pavilion project start?",
          answer:
            "Given the scale and coordination involved, we recommend starting well ahead of the event — timelines depend on complexity, so early engagement is best.",
        },
        {
          question:
            "Can the pavilion reflect specific national branding or cultural elements?",
          answer:
            "Yes, design is tailored to reflect national identity, branding guidelines, and cultural representation as needed.",
        },
        {
          question: "Is reinstallation available for future events?",
          answer:
            "Yes, with proper dismantling and storage, pavilions can be reinstalled for future exhibitions.",
        },
      ],
    },
    ar: {
      title: "أجنحة وطنية وأجنحة دول في {City}",
      excerpt: "أجنحة كبرى تمثّل الدول على المنصات الدولية.",
      overviewTitle: "حضور يليق بتمثيل الوطن",
      description:
        "أجنحة مصممة للوفود الحكومية والمشاركات الوطنية التي تضم عدة جهات.",
      features: [
        {
          title: "مشاريع بأحجام كبيرة",
          description: "مصممة للمساحات الواسعة والمشاركات رفيعة المستوى.",
        },
        {
          title: "تصميم متعدد المناطق",
          description: "مساحات لعدة عارضين وللاجتماعات والزوار.",
        },
        {
          title: "تمثيل يليق بالهوية",
          description: "تصميم يعكس الهوية الوطنية ومكانة الدولة.",
        },
        {
          title: "إدارة كاملة للمشروع",
          description: "فريق واحد ينسّق مشروعاً معقداً متعدد الأطراف.",
        },
      ],
      advantages: [
        {
          title: "تصميم الجناح وعمارته",
          description: "تصاميم كبرى تعبّر عن الهوية الوطنية.",
        },
        {
          title: "توزيع متعدد المناطق",
          description:
            "مساحات مخصصة لعدة عارضين ومناطق للاجتماعات وأخرى للزوار.",
        },
        {
          title: "تصنيع الهياكل",
          description: "نصنعه في مصنعنا وفق متطلبات الحجم والسلامة والمتانة.",
        },
        {
          title: "التنسيق بين الجهات",
          description: "إدارة مشاريع تضم عدة جهات وعلامات بكل تعقيداتها.",
        },
      ],
      useCases: [
        "وفود حكومية ووزارات",
        "أجنحة وطنية تضم عدة جهات في المعارض الدولية",
        "جهات تمثّل دولة أو منطقة في المعارض التجارية",
        "مشاريع كبرى تتطلب إدارة منسّقة بين أطراف متعددة",
      ],
      faq: [
        {
          question: "ما الحجم الذي يمكن أن يصل إليه الجناح الوطني؟",
          answer:
            "يعتمد حجم الجناح على الفعالية وعدد العارضين المشاركين، ونُكيّف التصميم والتصنيع وفق متطلباتك.",
        },
        {
          question: "هل يمكن أن يضم الجناح عدة عارضين تحت هيكل واحد؟",
          answer:
            "نعم، تُصمَّم الأجنحة الوطنية عادة بمناطق متعددة تستوعب عدة عارضين ضمن مساحة وطنية مشتركة.",
        },
        {
          question: "هل تنسّقون مباشرة مع الجهات الحكومية؟",
          answer:
            "نعم، لدينا خبرة في إدارة المشاريع متعددة الأطراف، ومنها التنسيق مع ممثلي الجهات الحكومية والوفود.",
        },
        {
          question: "متى يُفضَّل بدء العمل على مشروع الجناح؟",
          answer:
            "نظراً لحجم المشروع ومتطلبات التنسيق، نوصي بالبدء قبل الفعالية بوقت كافٍ. تعتمد المدة على درجة التعقيد، لذا كلما تواصلت معنا مبكراً كان أفضل.",
        },
        {
          question: "هل يمكن أن يعكس الجناح هوية وطنية أو عناصر ثقافية محددة؟",
          answer:
            "نعم، نصمم الجناح ليعكس الهوية الوطنية ويلتزم بإرشادات الهوية ويبرز العناصر الثقافية حسب الحاجة.",
        },
        {
          question: "هل يمكن إعادة تركيب الجناح في فعاليات لاحقة؟",
          answer:
            "نعم، مع الفك والتخزين بالشكل الصحيح يمكن إعادة تركيب الجناح في معارض لاحقة.",
        },
      ],
    },
  },
  {
    slug: "sustainable",
    order: 8,
    image: media.boothTypes.sustainable,
    imageAlt: "Sustainable eco booth",
    en: {
      title: "Sustainable / Eco Booths in {City}",
      excerpt: "Strong presence, lighter footprint.",
      overviewTitle: "Built with Purpose, Not Just Presence",
      description:
        "Eco-conscious materials without compromising on design or impact.",
      features: [
        {
          title: "Eco-Friendly Materials",
          description: "Sustainable substrates and finishes.",
        },
        {
          title: "Reusable by Design",
          description: "Built to reduce waste across multiple events.",
        },
        {
          title: "No Compromise on Design",
          description: "Sustainability without sacrificing visual impact.",
        },
        {
          title: "Aligned with ESG Goals",
          description: "Supports brands with sustainability commitments.",
        },
      ],
      advantages: [
        {
          title: "Eco-Friendly Substrates",
          description: "Materials selected to reduce environmental impact.",
        },
        {
          title: "Custom Textures & Finishes",
          description:
            "Sustainable options that still match your brand's look and feel.",
        },
        {
          title: "Reusable Structures",
          description:
            "Designed for repeated use, minimizing waste between events.",
        },
        {
          title: "Responsible Sourcing",
          description:
            "Materials chosen with environmental responsibility in mind.",
        },
      ],
      useCases: [
        "Brands with sustainability or ESG commitments",
        "Companies wanting to align booth presence with brand values",
        "Exhibitors looking to reduce environmental impact without reducing visual impact",
        "Organizations under increasing pressure to demonstrate sustainable practices",
      ],
      faq: [
        {
          question: 'What makes a booth "eco-friendly" specifically?',
          answer:
            "It typically involves sustainable substrates, reduced material waste, responsible sourcing, and designs built for reuse rather than single use.",
        },
        {
          question:
            "Does choosing an eco booth mean a smaller budget or fewer design options?",
          answer:
            "No, sustainable materials can be applied across most design and customization options — it doesn't limit visual impact.",
        },
        {
          question:
            "Can eco booths be as large or custom as a standard custom-built booth?",
          answer:
            "Yes, sustainability is a material and sourcing choice, not a size or design limitation.",
        },
        {
          question:
            "How does an eco booth support our company's ESG reporting?",
          answer:
            "We can provide documentation on materials and practices used, which your team can reference for sustainability reporting.",
        },
        {
          question: "Are eco booths more expensive than standard booths?",
          answer:
            "Costs vary by material and design — we'll provide a clear quote so you can compare based on your specific requirements.",
        },
        {
          question: "Can eco booths be reused across multiple events?",
          answer:
            "Yes, they're specifically designed with reuse in mind to minimize waste.",
        },
      ],
    },
    ar: {
      title: "أجنحة قابلة لإعادة الاستخدام في {City}",
      excerpt: "حضور قوي وأثر بيئي أخف.",
      overviewTitle: "حضور يعكس قيمك",
      description:
        "خامات صديقة للبيئة دون التنازل عن التصميم أو الأثر.",
      features: [
        {
          title: "مواد صديقة للبيئة",
          description: "ألواح وتشطيبات مستدامة.",
        },
        {
          title: "مصممة لإعادة الاستخدام",
          description: "تقلل الهدر عبر استخدامها في عدة فعاليات.",
        },
        {
          title: "دون تنازل في التصميم",
          description: "استدامة لا تنتقص من الأثر البصري.",
        },
        {
          title: "متوافقة مع أهداف الاستدامة والحوكمة (ESG)",
          description: "تدعم العلامات الملتزمة بالاستدامة.",
        },
      ],
      advantages: [
        {
          title: "ألواح صديقة للبيئة",
          description: "خامات مختارة لتقليل الأثر البيئي.",
        },
        {
          title: "ملامس وتشطيبات مخصصة",
          description:
            "خيارات مستدامة تحافظ على مظهر علامتك وطابعها.",
        },
        {
          title: "هياكل قابلة لإعادة الاستخدام",
          description:
            "مصممة للاستخدام المتكرر لتقليل الهدر بين الفعاليات.",
        },
        {
          title: "توريد مسؤول",
          description: "خامات مختارة بمسؤولية تجاه البيئة.",
        },
      ],
      useCases: [
        "علامات ملتزمة بالاستدامة أو بمعايير الحوكمة البيئية والاجتماعية (ESG)",
        "شركات تريد أن يعكس جناحها قيم علامتها",
        "عارضون يريدون تقليل الأثر البيئي دون تقليل الأثر البصري",
        "جهات مطالبة بشكل متزايد بإثبات ممارساتها المستدامة",
      ],
      faq: [
        {
          question: "ما الذي يجعل الجناح «صديقاً للبيئة» تحديداً؟",
          answer:
            "يشمل عادة ألواحاً مستدامة، وتقليل هدر المواد، وتوريداً مسؤولاً، وتصاميم معدّة لإعادة الاستخدام بدلاً من الاستخدام لمرة واحدة.",
        },
        {
          question:
            "هل يعني اختيار جناح مستدام ميزانية أقل أو خيارات تصميم محدودة؟",
          answer:
            "لا، يمكن استخدام الخامات المستدامة مع معظم خيارات التصميم والتخصيص، ولا تحدّ من الأثر البصري.",
        },
        {
          question:
            "هل يمكن أن يكون الجناح المستدام بحجم الجناح المخصص ومرونته في التصميم؟",
          answer:
            "نعم، فالاستدامة خيار يتعلق بالخامات والتوريد، وليست قيداً على الحجم أو التصميم.",
        },
        {
          question: "كيف يدعم الجناح المستدام تقارير الاستدامة (ESG) في شركتنا؟",
          answer:
            "يمكننا تزويدك بوثائق عن الخامات والممارسات المستخدمة ليعتمد عليها فريقك في تقارير الاستدامة.",
        },
        {
          question: "هل الأجنحة المستدامة أعلى تكلفة من الأجنحة التقليدية؟",
          answer:
            "تختلف التكلفة حسب الخامات والتصميم، ونقدّم لك عرض سعر واضحاً لتقارن وفق متطلباتك.",
        },
        {
          question: "هل يمكن إعادة استخدام الجناح المستدام في عدة فعاليات؟",
          answer:
            "نعم، فهو مصمم أصلاً لإعادة الاستخدام وتقليل الهدر.",
        },
      ],
    },
  },
];

export function getService(slug: string) {
  return services.find((item) => item.slug === slug);
}

export function getBoothType(slug: string) {
  return boothTypes.find((item) => item.slug === slug);
}

export function localizeService(service: ServiceRecord, locale: Locale) {
  const localized = {
    ...service,
    ...service[locale],
    image: service.image,
    imageAlt: service.imageAlt,
    slug: service.slug,
  };
  const extras = serviceDetailExtras[service.slug]?.[locale];
  if (!extras) return localized;
  return {
    ...localized,
    cover: extras.cover ?? localized.cover,
    designs: extras.designs ?? localized.designs,
    process: extras.process ?? localized.process,
  };
}

export function localizeBoothType(boothType: BoothTypeRecord, locale: Locale) {
  return {
    ...boothType,
    ...boothType[locale],
    image: boothType.image,
    imageAlt: boothType.imageAlt,
    slug: boothType.slug,
  };
}

/** Replace `{City}` in a booth-type title, or strip it when no city is provided. */
export function formatBoothTypeTitle(title: string, city?: string) {
  if (title.includes("{City}")) {
    if (city) return title.replaceAll("{City}", city);
    return title
      .replace(/\s*in \{City\}/gi, "")
      .replace(/\s*في \{City\}/g, "")
      .trim();
  }
  return title;
}

export const industries: IndustryRecord[] = [
  {
    slug: "technology",
    order: 1,
    image: media.industries.technology,
    imageAlt: "Technology exhibition booth",
    recommendedBoothTypeSlugs: ["custom", "double-deck", "modular"],
    en: {
      title: "Technology & Electronics",
      excerpt: "Booths built for demos, launches, and high-traffic tech shows.",
      overview:
        "Technology exhibitors need clear demo zones, AV reliability, and a presence that reads as innovative without chaos.",
      challenges: [
      { title: "Demo density", description: "Too many products fighting for attention." },
      { title: "AV risk", description: "Power, screens, and lighting must work under show pressure." },
      ],
      solutions: [
      { title: "Zoned storytelling", description: "Clear paths from attraction to conversion." },
      { title: "Integrated tech", description: "AV planned into the structure from day one." },
      ],
    },
    ar: {
      title: "التقنية والإلكترونيات",
      excerpt: "أجنحة مصممة للعروض الحية وإطلاق المنتجات ومعارض التقنية المزدحمة.",
      overview:
        "يحتاج عارضو التقنية إلى مناطق عرض واضحة، وأنظمة سمعية وبصرية (AV) يُعتمد عليها، وحضور يعبّر عن الابتكار دون فوضى.",
      challenges: [
      { title: "كثرة المنتجات المعروضة", description: "منتجات كثيرة تتنافس على انتباه الزائر." },
      { title: "موثوقية الصوتيات والشاشات", description: "الكهرباء والشاشات والإضاءة يجب أن تعمل بلا انقطاع تحت ضغط المعرض." },
      ],
      solutions: [
      { title: "مناطق بتسلسل مدروس", description: "مسار واضح يقود الزائر من لفت الانتباه إلى التواصل الجاد مع فريقك." },
      { title: "تقنية مدمجة", description: "الصوتيات والشاشات جزء من تخطيط الهيكل منذ اليوم الأول." },
      ],
    },
  },
  {
    slug: "healthcare",
    order: 2,
    image: media.industries.healthcare,
    imageAlt: "Healthcare exhibition booth",
    recommendedBoothTypeSlugs: ["modular", "custom", "kiosks"],
    en: {
      title: "Healthcare & Pharma",
      excerpt: "Compliant, calm environments for clinical and commercial conversations.",
      overview:
        "Healthcare brands need trust, privacy for discussions, and materials that feel precise and professional.",
      challenges: [
      { title: "Trust signals", description: "The space must feel clinical and credible." },
      { title: "Private talks", description: "Meeting rooms without losing floor presence." },
      ],
      solutions: [
      { title: "Quiet hospitality", description: "Meeting suites and soft zones for longer conversations." },
      { title: "Clear hierarchy", description: "Messaging that prioritizes science and outcomes." },
      ],
    },
    ar: {
      title: "الرعاية الصحية والأدوية",
      excerpt: "بيئات هادئة تراعي الاشتراطات للنقاشات الطبية والتجارية.",
      overview:
        "تحتاج علامات الرعاية الصحية إلى الثقة، وإلى خصوصية للنقاشات، وإلى خامات تعكس الدقة والاحترافية.",
      challenges: [
      { title: "عناصر الثقة", description: "يجب أن توحي المساحة بالانضباط الطبي والمصداقية." },
      { title: "نقاشات خاصة", description: "غرف اجتماعات دون التفريط في الحضور داخل القاعة." },
      ],
      solutions: [
      { title: "ضيافة هادئة", description: "غرف اجتماعات وزوايا جلوس مريحة للنقاشات المطوّلة." },
      { title: "رسائل مرتبة بوضوح", description: "رسائل تضع العلم والنتائج في المقدمة." },
      ],
    },
  },
  {
    slug: "energy",
    order: 3,
    image: media.industries.energy,
    imageAlt: "Energy sector pavilion",
    recommendedBoothTypeSlugs: ["custom", "pavilions", "outdoor"],
    en: {
      title: "Energy & Industrial",
      excerpt: "Large-scale presence for industrial and energy programs.",
      overview:
        "Energy and industrial exhibitors often need scale, structural confidence, and space for technical storytelling.",
      challenges: [
      { title: "Scale", description: "Large footprints that still feel intentional." },
      { title: "Technical depth", description: "Complex offerings need clear narrative layers." },
      ],
      solutions: [
      { title: "Architectural presence", description: "Structures that signal capability at a distance." },
      { title: "Layered content", description: "From headline impact to deep technical rooms." },
      ],
    },
    ar: {
      title: "الطاقة والصناعة",
      excerpt: "حضور واسع لمشاريع الطاقة والصناعة.",
      overview:
        "يحتاج عارضو الطاقة والصناعة غالباً إلى مساحات كبيرة، وهياكل تبعث على الثقة، ومساحة لعرض المحتوى التقني بوضوح.",
      challenges: [
      { title: "الحجم", description: "مساحات كبيرة يبقى كل جزء منها مدروساً." },
      { title: "العمق التقني", description: "حلول معقدة تحتاج عرضاً متدرجاً وواضحاً." },
      ],
      solutions: [
      { title: "حضور معماري", description: "هياكل تُظهر قدراتك قبل أن يصل الزائر إلى الجناح." },
      { title: "محتوى متدرج", description: "من رسالة رئيسية لافتة إلى غرف متخصصة للنقاش التقني." },
      ],
    },
  },
  {
    slug: "fmcg",
    order: 4,
    image: media.industries.fmcg,
    imageAlt: "FMCG retail booth",
    recommendedBoothTypeSlugs: ["kiosks", "portable", "modular"],
    en: {
      title: "FMCG & Retail",
      excerpt: "High-energy stands for sampling, launches, and retail brands.",
      overview:
        "Retail and FMCG booths win on attraction, sampling flow, and brand immersion that feels shoppable.",
      challenges: [
      { title: "Attraction", description: "Compete with dense neighboring stands." },
      { title: "Throughput", description: "Move visitors through sampling without bottlenecks." },
      ],
      solutions: [
      { title: "Retail logic", description: "Counters, storage, and flow designed like a store." },
      { title: "Graphic punch", description: "Fast-read branding that works in crowded halls." },
      ],
    },
    ar: {
      title: "السلع الاستهلاكية والتجزئة",
      excerpt: "أجنحة حيوية لتوزيع العينات وإطلاق المنتجات وعلامات التجزئة.",
      overview:
        "تنجح أجنحة التجزئة والسلع الاستهلاكية بقدرتها على الجذب، وسلاسة توزيع العينات، وتجربة علامة تشبه تجربة التسوق.",
      challenges: [
      { title: "الجذب", description: "منافسة أجنحة متلاصقة ومزدحمة." },
      { title: "انسيابية الحركة", description: "تنقّل الزوار بين العينات دون تكدّس." },
      ],
      solutions: [
      { title: "منطق المتجر", description: "طاولات وتخزين ومسارات حركة مصممة كأنها متجر." },
      { title: "رسومات قوية", description: "هوية تُقرأ بلمحة وتعمل في القاعات المزدحمة." },
      ],
    },
  },
];

type LocationCapability = LocationRecord["en"]["capabilities"][number];

/** Shared capability copy per region — city records add their own excerpt and local context. */
const regionCapabilities: Record<RegionKey, { en: LocationCapability[]; ar: LocationCapability[] }> = {
  central: {
    en: [
      { title: "Short supply line", description: "Built in our Riyadh facility and delivered by road the same day." },
      { title: "Flexible install windows", description: "Crews scheduled around venue access and client timelines." },
      { title: "Full project scope", description: "Booths, event structures, fit-out and signage from one team." },
    ],
    ar: [
      { title: "قرب من المصنع", description: "يُصنّع المشروع في مصنعنا بالرياض ويصل إلى الموقع براً في اليوم نفسه." },
      { title: "مرونة في مواعيد التركيب", description: "نجدول فرق التركيب وفق مواعيد دخول الموقع وجدول العميل." },
      { title: "نطاق عمل متكامل", description: "أجنحة وهياكل فعاليات وتجهيز داخلي ولافتات من فريق واحد." },
    ],
  },
  eastern: {
    en: [
      { title: "Eastern Province logistics", description: "Planned freight and install for industrial, corporate and exhibition sites." },
      { title: "Energy & industrial standards", description: "Builds that meet the safety and site requirements of large operators." },
      { title: "Multi-city programs", description: "One team covering several Eastern Province venues in the same season." },
    ],
    ar: [
      { title: "لوجستيات المنطقة الشرقية", description: "تخطيط الشحن والتركيب للمواقع الصناعية والمؤسسية وقاعات المعارض." },
      { title: "اشتراطات الطاقة والصناعة", description: "تنفيذ يلتزم باشتراطات السلامة ومتطلبات مواقع الشركات الكبرى." },
      { title: "مشاريع في أكثر من مدينة", description: "فريق واحد يغطي عدة مواقع في المنطقة الشرقية خلال الموسم نفسه." },
    ],
  },
  qassim: {
    en: [
      { title: "Direct road access", description: "Delivered from our Riyadh facility along the Qassim corridor." },
      { title: "Seasonal event support", description: "Builds timed around festivals, exhibitions and seasonal programs." },
      { title: "Retail & brand presence", description: "Displays, kiosks and branded spaces for the region's retail market." },
    ],
    ar: [
      { title: "وصول بري مباشر", description: "ننقل المشاريع من مصنعنا بالرياض عبر طريق القصيم مباشرة." },
      { title: "دعم الفعاليات الموسمية", description: "تنفيذ يواكب المهرجانات والمعارض والمواسم في المنطقة." },
      { title: "حضور في قطاع التجزئة", description: "وحدات عرض وأكشاك ومساحات بهوية العلامة لسوق التجزئة في المنطقة." },
    ],
  },
  western: {
    en: [
      { title: "Western region coverage", description: "Freight and crews planned for sites across the western region." },
      { title: "Tourism & heritage settings", description: "Builds that respect sensitive sites and demanding visitor programs." },
      { title: "Outdoor-ready structures", description: "Materials and fixings chosen for open-air and seasonal events." },
    ],
    ar: [
      { title: "تغطية المنطقة الغربية", description: "تخطيط الشحن وتوزيع فرق التركيب لمواقع المنطقة الغربية." },
      { title: "بيئات سياحية وتراثية", description: "تنفيذ يراعي حساسية المواقع وبرامج الزوار الكبيرة." },
      { title: "هياكل للمواقع المفتوحة", description: "خامات وطرق تثبيت مناسبة للفعاليات الخارجية والموسمية." },
    ],
  },
  southern: {
    en: [
      { title: "Southern region logistics", description: "Long-haul freight and install planned around mountain and coastal access." },
      { title: "Tourism season builds", description: "Event structures and activations ready for the summer season." },
      { title: "Government & public programs", description: "Pavilions and exhibition spaces for regional initiatives." },
    ],
    ar: [
      { title: "لوجستيات المنطقة الجنوبية", description: "تخطيط الشحن والتركيب بما يناسب الطرق الجبلية والساحلية." },
      { title: "تجهيزات موسم السياحة", description: "هياكل فعاليات وتجهيزات لتجارب تفاعلية في موسم الصيف." },
      { title: "برامج حكومية وعامة", description: "أجنحة ومساحات عرض لمبادرات المنطقة وفعالياتها الرسمية." },
    ],
  },
  northern: {
    en: [
      { title: "Long-distance delivery", description: "Freight, crews and schedules planned for northern region sites." },
      { title: "Robust, reusable builds", description: "Structures engineered to travel well and install quickly." },
      { title: "Regional events", description: "Booths and event structures for regional exhibitions and festivals." },
    ],
    ar: [
      { title: "تسليم لمسافات طويلة", description: "نخطط الشحن والفرق والجداول لمواقع المنطقة الشمالية." },
      { title: "هياكل متينة قابلة لإعادة الاستخدام", description: "تصاميم تتحمل النقل وتُركّب بسرعة." },
      { title: "فعاليات المنطقة", description: "أجنحة وهياكل فعاليات للمعارض والمهرجانات الإقليمية." },
    ],
  },
};

function regionalLocations(): LocationRecord[] {
  const cities: {
    slug: string;
    image: string;
    en: [title: string, excerpt: string, localExperience: string];
    ar: [title: string, excerpt: string, localExperience: string];
  }[] = [
    {
      slug: "abha",
      image: media.locations.abha,
      en: ["Abha", "Summer-season events, tourism activations and regional exhibitions.", "Abha projects are planned around the Aseer summer season, with builds that handle mountain access and outdoor conditions."],
      ar: ["أبها", "فعاليات موسم الصيف وأنشطة ترويجية سياحية ومعارض إقليمية.", "نخطط مشاريع أبها وفق موسم صيف عسير، بتنفيذ يراعي الطرق الجبلية وظروف المواقع المفتوحة."],
    },
    {
      slug: "al-ahsa",
      image: media.locations.alAhsa,
      en: ["Al Ahsa", "Heritage festivals, agricultural shows and corporate events.", "In Al Ahsa we deliver exhibition and event builds for heritage, agriculture and corporate programs, coordinated with our Eastern Province crews."],
      ar: ["الأحساء", "مهرجانات تراثية ومعارض زراعية وفعاليات للشركات.", "ننفّذ في الأحساء أجنحة وهياكل فعاليات لبرامج التراث والزراعة والشركات، بالتنسيق مع فرقنا في المنطقة الشرقية."],
    },
    {
      slug: "al-baha",
      image: media.locations.alBaha,
      en: ["Al Baha", "Seasonal festivals and government-led regional events.", "Al Baha builds are scheduled around the summer festival calendar, with freight planned for mountain routes."],
      ar: ["الباحة", "مهرجانات موسمية وفعاليات إقليمية تنظمها الجهات الحكومية.", "نجدول مشاريع الباحة وفق تقويم مهرجانات الصيف، ونخطط الشحن بما يناسب الطرق الجبلية."],
    },
    {
      slug: "al-kharj",
      image: media.locations.alKharj,
      en: ["Al Kharj", "Industrial, agricultural and corporate projects close to Riyadh.", "Al Kharj sits within easy reach of our Riyadh facility, so projects move from fabrication to site with minimal lead time."],
      ar: ["الخرج", "مشاريع صناعية وزراعية وفعاليات للشركات على مقربة من الرياض.", "تقع الخرج على مسافة قريبة من مصنعنا في الرياض، فينتقل المشروع من التصنيع إلى الموقع بأقل وقت ممكن."],
    },
    {
      slug: "al-qassim",
      image: media.locations.alQassim,
      en: ["Al Qassim", "Regional exhibitions, date festivals and retail programs.", "Across the Qassim region we deliver booths, event structures and retail displays for seasonal festivals and regional exhibitions."],
      ar: ["القصيم", "معارض إقليمية ومهرجانات التمور وبرامج التجزئة.", "ننفّذ في منطقة القصيم أجنحة وهياكل فعاليات ووحدات عرض للمهرجانات الموسمية والمعارض الإقليمية."],
    },
    {
      slug: "alula",
      image: media.locations.alula,
      en: ["AlUla", "Cultural festivals, premium activations and heritage-site events.", "AlUla projects demand careful logistics and builds that respect heritage landscapes while meeting premium event standards."],
      ar: ["العلا", "مهرجانات ثقافية وتجارب تفاعلية فاخرة وفعاليات في مواقع تراثية.", "تتطلب مشاريع العلا لوجستيات دقيقة وتنفيذاً يحترم طبيعة المواقع التراثية ويحقق معايير الفعاليات الفاخرة."],
    },
    {
      slug: "buraidah",
      image: media.locations.buraidah,
      en: ["Buraidah", "Trade shows, date festival activations and retail displays.", "Buraidah hosts some of the region's busiest seasonal events; we plan builds to be ready before peak visitor days."],
      ar: ["بريدة", "معارض تجارية وتجارب تفاعلية لمهرجان التمور ووحدات عرض للمتاجر.", "تستضيف بريدة بعضاً من أكثر فعاليات المنطقة الموسمية ازدحاماً، ونخطط التنفيذ ليكون جاهزاً قبل أيام الذروة."],
    },
    {
      slug: "dhahran",
      image: media.locations.dhahran,
      en: ["Dhahran", "Energy-sector exhibitions, conferences and corporate events.", "Dhahran projects often serve the energy sector, with builds that meet corporate safety standards and precise install windows."],
      ar: ["الظهران", "معارض قطاع الطاقة ومؤتمرات وفعاليات للشركات.", "تخدم مشاريع الظهران غالباً قطاع الطاقة، بتنفيذ يلتزم باشتراطات السلامة المؤسسية ومواعيد تركيب دقيقة."],
    },
    {
      slug: "hail",
      image: media.locations.hail,
      en: ["Hail", "Regional festivals, rally events and government exhibitions.", "Hail builds are planned for long-distance delivery, from rally activations to regional exhibition stands."],
      ar: ["حائل", "مهرجانات إقليمية وفعاليات الرالي ومعارض حكومية.", "نخطط نقل تجهيزات مشاريع حائل وتسليمها لمسافات طويلة، من أنشطة الرالي التفاعلية إلى أجنحة المعارض الإقليمية."],
    },
    {
      slug: "jazan",
      image: media.locations.jazan,
      en: ["Jazan", "Winter festivals, industrial projects and regional events.", "In Jazan we deliver event structures and exhibition builds suited to coastal humidity and the winter festival season."],
      ar: ["جازان", "مهرجانات شتوية ومشاريع صناعية وفعاليات إقليمية.", "ننفّذ في جازان هياكل فعاليات وأجنحة معارض تناسب رطوبة الساحل وموسم المهرجانات الشتوية."],
    },
    {
      slug: "jubail",
      image: media.locations.jubail,
      en: ["Jubail", "Industrial exhibitions, corporate facilities and plant events.", "Jubail projects serve one of the Kingdom's largest industrial cities, with builds that meet plant access and safety requirements."],
      ar: ["الجبيل", "معارض صناعية ومنشآت للشركات وفعاليات داخل المصانع.", "تخدم مشاريعنا في الجبيل واحدة من أكبر المدن الصناعية في المملكة، بتنفيذ يلتزم باشتراطات الدخول والسلامة في المصانع."],
    },
    {
      slug: "khamis-mushait",
      image: media.locations.khamisMushait,
      en: ["Khamis Mushait", "Retail displays, commercial fit-outs and regional events.", "Khamis Mushait projects are coordinated with our Abha schedule, covering retail, fit-out and event work in the Aseer region."],
      ar: ["خميس مشيط", "وحدات عرض للمتاجر وتجهيز مساحات تجارية وفعاليات إقليمية.", "ننسّق مشاريع خميس مشيط مع جدول أعمالنا في أبها، لتغطية أعمال التجزئة والتجهيز الداخلي والفعاليات في منطقة عسير."],
    },
    {
      slug: "qatif",
      image: media.locations.qatif,
      en: ["Qatif", "Retail, commercial interiors and community events.", "Qatif work is delivered alongside our Dammam and Khobar programs, from retail displays to event structures."],
      ar: ["القطيف", "مشاريع تجزئة وتجهيز مساحات تجارية وفعاليات مجتمعية.", "ننفّذ أعمال القطيف ضمن برامجنا في الدمام والخبر، من وحدات العرض في المتاجر إلى هياكل الفعاليات."],
    },
    {
      slug: "tabuk",
      image: media.locations.tabuk,
      en: ["Tabuk", "Regional exhibitions and giga-project activations in the northwest.", "Tabuk projects connect to the northwest's giga-project activity, with freight and crews planned for long-distance delivery."],
      ar: ["تبوك", "معارض إقليمية وتجارب تفاعلية للمشاريع الكبرى في الشمال الغربي.", "ترتبط مشاريع تبوك بنشاط المشاريع الكبرى في الشمال الغربي، ونخطط لها الشحن والفرق للتسليم لمسافات طويلة."],
    },
    {
      slug: "taif",
      image: media.locations.taif,
      en: ["Taif", "Summer-season festivals, cultural events and brand activations.", "Taif builds are timed around the summer season and cultural festivals, with outdoor-ready structures and fast installs."],
      ar: ["الطائف", "مهرجانات الصيف وفعاليات ثقافية وتجارب تفاعلية للعلامات التجارية.", "نوقّت مشاريع الطائف وفق موسم الصيف والمهرجانات الثقافية، بهياكل مناسبة للمواقع المفتوحة وتركيب سريع."],
    },
    {
      slug: "unaizah",
      image: media.locations.unaizah,
      en: ["Unaizah", "Heritage festivals, seasonal events and retail programs.", "Unaizah projects are delivered with our Qassim region schedule, covering festival structures, booths and retail displays."],
      ar: ["عنيزة", "مهرجانات تراثية وفعاليات موسمية وبرامج تجزئة.", "ننفّذ مشاريع عنيزة ضمن جدول أعمالنا في منطقة القصيم، من هياكل المهرجانات إلى الأجنحة ووحدات العرض."],
    },
    {
      slug: "yanbu",
      image: media.locations.yanbu,
      en: ["Yanbu", "Industrial exhibitions, coastal festivals and corporate events.", "Yanbu combines industrial and coastal programs; we deliver builds that meet plant requirements and hold up in seaside conditions."],
      ar: ["ينبع", "معارض صناعية ومهرجانات ساحلية وفعاليات للشركات.", "تجمع ينبع بين البرامج الصناعية والساحلية، وننفّذ فيها أعمالاً تلتزم باشتراطات المصانع وتتحمل أجواء الساحل."],
    },
  ];

  return cities.map((city, index) => {
    const shared = regionCapabilities[cityRegion[city.slug] ?? "central"];
    const [enTitle, enExcerpt, enExperience] = city.en;
    const [arTitle, arExcerpt, arExperience] = city.ar;
    return {
      slug: city.slug,
      order: 8 + index,
      countryCode: "SA",
      image: city.image,
      imageAlt: `Exhibition booth delivery in ${enTitle}`,
      en: {
        title: enTitle,
        excerpt: enExcerpt,
        localExperience: enExperience,
        capabilities: shared.en,
      },
      ar: {
        title: arTitle,
        excerpt: arExcerpt,
        localExperience: arExperience,
        capabilities: shared.ar,
      },
    };
  });
}

export const locations: LocationRecord[] = [
  {
    slug: "riyadh",
    order: 1,
    countryCode: "SA",
    image: media.locations.riyadh,
    imageAlt: "Exhibition booth delivery in Riyadh",
    en: {
      title: "Riyadh",
      excerpt: "Capital shows, venues, and year-round exhibition calendars.",
      localExperience:
        "Riyadh is our primary delivery base — in-house production with crews experienced across the city's major venues and national exhibition calendar.",
      capabilities: [
      { title: "Venue-ready crews", description: "Install teams familiar with Riyadh venues, access rules, and show schedules." },
      { title: "In-house production", description: "Design through fabrication under one roof for tighter quality and timelines." },
      { title: "National show support", description: "Flagship programs and recurring exhibitor builds across the Riyadh calendar." },
      ],
    },
    ar: {
      title: "الرياض",
      excerpt: "معارض العاصمة وقاعاتها، وموسم معارض على مدار العام.",
      localExperience:
        "الرياض مقرّنا الرئيسي للتنفيذ، ففيها مصنعنا وفرق تركيب خبيرة بأبرز قاعات المدينة وبرنامج المعارض الوطنية.",
      capabilities: [
      { title: "فرق تعرف مواقع الرياض", description: "فرق تركيب تعرف قاعات الرياض واشتراطات الدخول ومواعيد المعارض." },
      { title: "إنتاج في مصنعنا", description: "من التصميم إلى التصنيع تحت سقف واحد، لجودة أعلى والتزام أدق بالمواعيد." },
      { title: "دعم المعارض الوطنية", description: "مشاريع رئيسية وأجنحة للعارضين الدائمين طوال موسم معارض الرياض." },
      ],
    },
  },
  {
    slug: "jeddah",
    order: 2,
    countryCode: "SA",
    image: media.locations.jeddah,
    imageAlt: "Exhibition booth delivery in Jeddah",
    en: {
      title: "Jeddah",
      excerpt: "Red Sea trade shows, retail activations, and coastal venue programs.",
      localExperience:
        "Jeddah programs combine brand-led design with logistics tuned to Red Sea venues and the western region calendar.",
      capabilities: [
      { title: "Coastal venue logistics", description: "Shipping, access, and install coordinated for Jeddah exhibition sites." },
      { title: "Retail & trade shows", description: "Booths built for visitor flow in busy Jeddah halls." },
      { title: "Western region coverage", description: "Crews and scheduling for shows across the Jeddah market." },
      ],
    },
    ar: {
      title: "جدة",
      excerpt: "معارض تجارية على ساحل البحر الأحمر، وأنشطة ترويجية للمتاجر، ومشاريع في المواقع الساحلية.",
      localExperience:
        "نجمع في مشاريع جدة بين تصميم ينطلق من العلامة ولوجستيات تناسب مواقع البحر الأحمر ومواسم فعاليات المنطقة الغربية.",
      capabilities: [
      { title: "لوجستيات المواقع الساحلية", description: "تنسيق الشحن والدخول والتركيب لمواقع المعارض في جدة." },
      { title: "التجزئة والمعارض التجارية", description: "أجنحة مصممة لحركة الزوار في قاعات جدة المزدحمة." },
      { title: "تغطية المنطقة الغربية", description: "فرق وجداول عمل تغطي معارض جدة." },
      ],
    },
  },
  {
    slug: "dammam",
    order: 3,
    countryCode: "SA",
    image: media.locations.dammam,
    imageAlt: "Exhibition booth delivery in Dammam",
    en: {
      title: "Dammam",
      excerpt: "Eastern Province industrial, energy, and trade exhibition programs.",
      localExperience:
        "Dammam deliveries focus on practical fabrication, install windows, and venues serving the Eastern Province calendar.",
      capabilities: [
      { title: "Eastern Province crews", description: "On-site teams coordinated for Dammam venues and show dates." },
      { title: "Industrial & energy shows", description: "Booths built for technical demos and buyer traffic." },
      { title: "Regional logistics", description: "Freight and install planning across the Eastern corridor." },
      ],
    },
    ar: {
      title: "الدمام",
      excerpt: "معارض الصناعة والطاقة والتجارة في المنطقة الشرقية.",
      localExperience:
        "نركّز في مشاريع الدمام على التصنيع العملي والالتزام بمواعيد التركيب في القاعات التي تستضيف معارض المنطقة الشرقية.",
      capabilities: [
      { title: "فرق المنطقة الشرقية", description: "فرق ميدانية منسّقة وفق مواقع الدمام ومواعيد معارضها." },
      { title: "معارض الصناعة والطاقة", description: "أجنحة مصممة للعروض التقنية واستقبال المشترين." },
      { title: "لوجستيات إقليمية", description: "تخطيط الشحن والتركيب على امتداد المنطقة الشرقية." },
      ],
    },
  },
  {
    slug: "khobar",
    order: 4,
    countryCode: "SA",
    image: media.locations.khobar,
    imageAlt: "Exhibition booth delivery in Khobar",
    en: {
      title: "Khobar",
      excerpt: "Corporate, tech, and brand activations across Khobar venues.",
      localExperience:
        "Khobar projects emphasize polished brand presence with install support across local halls and corporate events.",
      capabilities: [
      { title: "Brand activations", description: "High-finish booths for corporate and tech audiences." },
      { title: "Local venue access", description: "Crews familiar with Khobar site rules and timing." },
      { title: "Reuse-ready builds", description: "Storage and redeploy options for returning exhibitors." },
      ],
    },
    ar: {
      title: "الخبر",
      excerpt: "أنشطة تفاعلية للشركات وقطاع التقنية والعلامات التجارية في مواقع الخبر.",
      localExperience:
        "نركّز في مشاريع الخبر على حضور متقن للعلامة، مع دعم التركيب في القاعات المحلية وفعاليات الشركات.",
      capabilities: [
      { title: "التجارب التفاعلية للعلامة التجارية", description: "أجنحة بتشطيبات عالية لجمهور الشركات وقطاع التقنية." },
      { title: "معرفة بالمواقع المحلية", description: "فرق تعرف اشتراطات مواقع الخبر ومواعيدها." },
      { title: "جاهزة لإعادة الاستخدام", description: "خيارات تخزين وإعادة تركيب للعارضين الدائمين." },
      ],
    },
  },
  {
    slug: "makkah",
    order: 5,
    countryCode: "SA",
    image: media.locations.makkah,
    imageAlt: "Exhibition booth delivery in Makkah",
    en: {
      title: "Makkah",
      excerpt: "Exhibition and event programs with careful venue and schedule planning.",
      localExperience:
        "Makkah deliveries are planned around venue access, local regulations, and clear install windows.",
      capabilities: [
      { title: "Venue coordination", description: "Access, power, and schedule aligned before build day." },
      { title: "Respectful planning", description: "Programs timed carefully around local calendars and constraints." },
      { title: "Reliable install", description: "Crews focused on clean setup and safe teardown." },
      ],
    },
    ar: {
      title: "مكة المكرمة",
      excerpt: "معارض وفعاليات بتخطيط دقيق للموقع والجدول الزمني.",
      localExperience:
        "نخطط مشاريع مكة المكرمة وفق مواعيد الدخول إلى المواقع والأنظمة المحلية، مع فترات تركيب محددة بوضوح.",
      capabilities: [
      { title: "التنسيق مع المواقع", description: "مواءمة الدخول والكهرباء والجدول الزمني قبل يوم التركيب." },
      { title: "تخطيط يراعي خصوصية المكان", description: "جداول مدروسة بعناية وفق المواسم والاشتراطات المحلية." },
      { title: "تركيب موثوق", description: "فرق تركّز على تركيب متقن وفك آمن." },
      ],
    },
  },
  {
    slug: "madinah",
    order: 6,
    countryCode: "SA",
    image: media.locations.madinah,
    imageAlt: "Exhibition booth delivery in Madinah",
    en: {
      title: "Madinah",
      excerpt: "Regional exhibitions and brand presence with local delivery support.",
      localExperience:
        "Madinah projects pair CPS fabrication standards with logistics and install support for the local event calendar.",
      capabilities: [
      { title: "Regional delivery", description: "Production and install coordinated for Madinah shows." },
      { title: "Clear timelines", description: "Design-to-install stages locked early for smaller venue windows." },
      { title: "On-site support", description: "Show-day adjustments when the floor needs them." },
      ],
    },
    ar: {
      title: "المدينة المنورة",
      excerpt: "معارض إقليمية وحضور للعلامات مع دعم تنفيذ محلي.",
      localExperience:
        "نقدّم في مشاريع المدينة المنورة معايير CPS في التصنيع، مع لوجستيات ودعم تركيب يواكب مواسم الفعاليات المحلية.",
      capabilities: [
      { title: "تنفيذ إقليمي", description: "إنتاج وتركيب منسّقان لمعارض المدينة المنورة." },
      { title: "جداول واضحة", description: "نحدد مراحل التصميم والتركيب مبكراً لتناسب فترات الدخول القصيرة في المواقع الأصغر." },
      { title: "دعم في الموقع", description: "تعديلات خلال أيام المعرض كلما دعت الحاجة." },
      ],
    },
  },
  {
    slug: "neom",
    order: 7,
    countryCode: "SA",
    image: media.locations.neom,
    imageAlt: "Exhibition booth delivery in NEOM",
    en: {
      title: "NEOM",
      excerpt: "Future-facing activations and pavilion-scale presence for NEOM programs.",
      localExperience:
        "NEOM projects demand precise logistics, premium finishes, and crews ready for ambitious spatial programs.",
      capabilities: [
      { title: "Premium fabrication", description: "Materials and detailing built for high-visibility environments." },
      { title: "Complex logistics", description: "Freight and install planned for remote and controlled sites." },
      { title: "Pavilion-ready teams", description: "Capability for large-scale and experiential builds." },
      ],
    },
    ar: {
      title: "نيوم",
      excerpt: "تجارب تفاعلية مبتكرة وأجنحة عرض كبرى لمشاريع نيوم.",
      localExperience:
        "تتطلب مشاريع نيوم لوجستيات دقيقة وتشطيبات فاخرة وفرقاً مستعدة لمشاريع طموحة في تصميم المساحات وتنفيذها.",
      capabilities: [
      { title: "تصنيع فاخر", description: "خامات وتفاصيل مصنَّعة لمساحات تحظى باهتمام واسع." },
      { title: "لوجستيات معقّدة", description: "تخطيط الشحن والتركيب للمواقع النائية ومحدودة الدخول." },
      { title: "فرق لتنفيذ الأجنحة الكبرى", description: "قدرة على تنفيذ المنشآت الكبيرة والتجارب التفاعلية." },
      ],
    },
  },
  ...regionalLocations(),
];



export const newsArticles: NewsRecord[] = [
  {
    slug: "in-house-booth-production",
    publishedAt: "2025-11-12",
    readingTime: 4,
    image: media.news.hall,
    imageAlt: "In-house booth production",
    category: "Insights",
    tags: ["production", "process"],
    author: "CPS Studio",
    en: {
      title: "Why in-house booth production changes the outcome",
      excerpt: "Owning design and fabrication under one roof reduces handoffs and protects timelines.",
      body: [
        "Most exhibition delays come from fragmented ownership — design in one place, fabrication in another, install somewhere else.",
        "When CPS keeps the full lifecycle in-house, decisions move faster, quality stays consistent, and the booth that opens on day one matches the approved concept.",
        "That is the difference between a vendor chain and a single accountable atelier.",
      ],
    },
    ar: {
      title: "كيف يؤثر التصنيع المتكامل في نجاح جناحك؟",
      excerpt: "عندما يتولى فريق واحد التصميم والتصنيع، يقل انتقال العمل بين الجهات ويسهل الالتزام بالجدول الزمني.",
      body: [
        "تعود معظم التأخيرات في المعارض إلى تشتت المسؤولية: التصميم لدى جهة، والتصنيع لدى أخرى، والتركيب لدى ثالثة. ومع كل انتقال بين جهتين تضيع معلومة أو يتأخر قرار.",
        "أما حين تتولى CPS مراحل الجناح كلها بفريقها وفي مصنعها، فالقرارات تُتخذ أسرع، والجودة تبقى ثابتة، والجناح الذي يستقبل الزوار يوم الافتتاح هو نفسه التصميم الذي اعتمدته.",
        "وهذا هو الفرق بين سلسلة من الموردين المتعددين، وورشة واحدة تتحمّل المسؤولية كاملة من البداية إلى النهاية.",
      ],
    },
  },
  {
    slug: "modular-vs-custom",
    publishedAt: "2025-09-03",
    readingTime: 5,
    image: media.news.keynote,
    imageAlt: "Modular versus custom booth",
    category: "Booth strategy",
    tags: ["modular", "custom"],
    author: "CPS Studio",
    en: {
      title: "Modular vs custom: choosing the right booth strategy",
      excerpt: "A practical guide to matching booth type to calendar, budget, and brand ambition.",
      body: [
        "Custom booths win when differentiation and experience are the priority. Modular systems win when you need speed and reuse across a season.",
        "The best programs often mix both — a custom hero presence for flagship shows, and modular kits for regional dates.",
        "Start with your calendar and goals, then choose the structure that protects both brand and budget.",
      ],
    },
    ar: {
      title: "الجناح المعياري أم المصمَّم حسب الطلب: أيهما يناسب مشاركتك؟",
      excerpt: "دليل عملي لاختيار نوع الجناح وفق جدول مشاركاتك وميزانيتك وطموح علامتك.",
      body: [
        "الجناح المخصص هو الخيار الأنسب حين يكون التميّز وتجربة الزائر في المقدمة، أما الأنظمة المعيارية فتتفوق حين تحتاج إلى سرعة التنفيذ وإعادة الاستخدام على مدار الموسم.",
        "وكثيراً ما تجمع أنجح الخطط بين الخيارين: جناح مخصص يتصدّر حضورك في المعارض الكبرى، وأنظمة معيارية للمشاركات الإقليمية.",
        "ابدأ بجدول مشاركاتك وأهدافك، ثم اختر التصميم الذي يحقق أهداف علامتك ويلائم ميزانيتك.",
      ],
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((item) => item.slug === slug);
}

export function getLocation(slug: string) {
  return locations.find((item) => item.slug === slug);
}

export function getNewsArticle(slug: string) {
  return newsArticles.find((item) => item.slug === slug);
}

export function localizeIndustry(industry: IndustryRecord, locale: Locale) {
  return {
    ...industry,
    ...industry[locale],
    image: industry.image,
    imageAlt: industry.imageAlt,
    slug: industry.slug,
    recommendedBoothTypeSlugs: industry.recommendedBoothTypeSlugs,
  };
}

export function localizeLocation(location: LocationRecord, locale: Locale) {
  return {
    ...location,
    ...location[locale],
    image: location.image,
    imageAlt: location.imageAlt,
    slug: location.slug,
    countryCode: location.countryCode,
  };
}

/** Display label for an article category; the stored default is the English "Insights". */
export function localizeNewsCategory(category: string | undefined, locale: Locale) {
  if (locale === "ar" && (!category || category === "Insights")) return "رؤى";
  return category ?? "";
}

export function localizeNews(article: NewsRecord, locale: Locale) {
  return {
    ...article,
    ...article[locale],
    image: article.image,
    imageAlt: article.imageAlt,
    slug: article.slug,
    publishedAt: article.publishedAt,
    readingTime: article.readingTime,
    category: article.category,
    tags: article.tags,
    author: article.author,
  };
}

export const redirects = [
  { from: "/portfolio", to: "/our-work", status: 301 as const },
  { from: "/blog", to: "/news", status: 301 as const },
  { from: "/locations/saudi-arabia", to: "/locations/riyadh", status: 301 as const },
  { from: "/locations/uae", to: "/locations/jeddah", status: 301 as const },
  { from: "/locations/qatar", to: "/locations/dammam", status: 301 as const },
  { from: "/locations/kuwait", to: "/locations/khobar", status: 301 as const },
  { from: "/locations/bahrain", to: "/locations/makkah", status: 301 as const },
  { from: "/locations/oman", to: "/locations/madinah", status: 301 as const },
  { from: "/locations/egypt", to: "/locations/neom", status: 301 as const },
];
