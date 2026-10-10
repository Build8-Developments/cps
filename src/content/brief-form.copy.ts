import type { Locale } from "@/lib/i18n";

export type BriefFormOption = { value: string; label: string };

export type BriefFormCopy = {
  eyebrow: string;
  title: string;
  support: string;
  steps: { title: string; description: string }[];
  labels: Record<string, string>;
  placeholders: Record<string, string>;
  options: {
    userTypes: BriefFormOption[];
    preferredContact: BriefFormOption[];
    industries: BriefFormOption[];
    companySizes: BriefFormOption[];
    boothTypes: BriefFormOption[];
    services: BriefFormOption[];
    hasExistingDesign: BriefFormOption[];
    budgetRanges: BriefFormOption[];
    timelines: BriefFormOption[];
    heardFrom: BriefFormOption[];
  };
  actions: {
    next: string;
    back: string;
    submit: string;
    submitting: string;
  };
  consent: string;
  updatesOptIn: string;
  success: {
    title: string;
    message: string;
    cta: string;
  };
  errors: {
    required: string;
    email: string;
    submit: string;
  };
  reviewTitle: string;
};

const en: BriefFormCopy = {
  eyebrow: "Project brief",
  title: "Tell us about your project",
  support:
    "Four quick steps — booths, events, fit-outs, displays, fabrication, print or delivery. We use this to scope the work accurately.",
  steps: [
    {
      title: "Contact details",
      description: "Who we should reach and how you prefer to be contacted.",
    },
    {
      title: "Company details",
      description: "Organization context that helps us scope the project correctly.",
    },
    {
      title: "Project details",
      description: "What you're building, where, and which CPS services you need.",
    },
    {
      title: "Budget & notes",
      description: "Timeline, budget range, and anything else we should know.",
    },
  ],
  labels: {
    userType: "I am a",
    fullName: "Full name",
    jobTitle: "Job title / role",
    email: "Work email (optional)",
    phone: "Phone / WhatsApp",
    preferredContact: "Preferred contact",
    companyName: "Company / organization",
    website: "Website",
    industry: "Industry",
    companySize: "Team size",
    country: "Country",
    city: "City",
    eventName: "Project or exhibition name",
    eventLocation: "Location / venue / city",
    eventDate: "Target date or window",
    boothSize: "Size / footprint (optional)",
    boothType: "Project type",
    services: "Services needed",
    hasExistingDesign: "Existing design or drawings?",
    budgetRange: "Estimated budget (SAR)",
    timeline: "When do you need it ready?",
    description: "Project goals & notes",
    referenceUrl: "Reference link (optional)",
    heardFrom: "How did you hear about CPS?",
  },
  placeholders: {
    fullName: "Your name",
    jobTitle: "Marketing Director, Procurement…",
    email: "name@company.com",
    phone: "+966 …",
    companyName: "Legal or trading name",
    website: "https://",
    country: "Saudi Arabia",
    city: "Riyadh",
    eventName: "GITEX, LEAP, showroom fit-out, retail rollout…",
    eventLocation: "Riyadh Front, DWTC, mall / office address…",
    eventDate: "March 2026 or 12–15 Apr 2026",
    boothSize: "36 sqm / 6×6 m / store count…",
    description:
      "Brand goals, must-haves, locations, materials, AV needs, delivery constraints…",
    referenceUrl: "Past project, moodboard, RFP link…",
  },
  options: {
    userTypes: [
      { value: "company", label: "Brand / company" },
      { value: "agency", label: "Agency / partner" },
      { value: "individual", label: "Individual / freelancer" },
      { value: "government", label: "Government entity" },
      { value: "association", label: "Association / NGO" },
      { value: "other", label: "Other" },
    ],
    preferredContact: [
      { value: "email", label: "Email" },
      { value: "phone", label: "Phone call" },
      { value: "whatsapp", label: "WhatsApp" },
    ],
    industries: [
      { value: "technology", label: "Technology" },
      { value: "healthcare", label: "Healthcare & pharma" },
      { value: "energy", label: "Energy & industrial" },
      { value: "retail", label: "Retail & FMCG" },
      { value: "finance", label: "Finance" },
      { value: "government", label: "Government" },
      { value: "education", label: "Education" },
      { value: "hospitality", label: "Hospitality & F&B" },
      { value: "other", label: "Other" },
    ],
    companySizes: [
      { value: "1-10", label: "1–10" },
      { value: "11-50", label: "11–50" },
      { value: "51-200", label: "51–200" },
      { value: "201-1000", label: "201–1,000" },
      { value: "1000+", label: "1,000+" },
    ],
    boothTypes: [
      { value: "custom", label: "Exhibition booth" },
      { value: "modular", label: "Event structure / stage" },
      { value: "double-deck", label: "Fit-out / interior" },
      { value: "kiosk", label: "Retail display / kiosk" },
      { value: "pavilion", label: "Custom fabrication" },
      { value: "portable", label: "Print & signage" },
      { value: "unsure", label: "Rental / delivery / not sure yet" },
    ],
    services: [
      { value: "exhibitions-booths", label: "Exhibitions & Booths" },
      { value: "event-fabrication", label: "Event Fabrication" },
      { value: "fit-out-interiors", label: "Fit-Out & Interiors" },
      { value: "retail-displays", label: "Retail Displays" },
      { value: "custom-fabrication", label: "Custom Fabrication" },
      { value: "printing-signage", label: "Printing & Signage" },
      { value: "rental-solutions", label: "Rental Solutions" },
      { value: "installation-project-delivery", label: "Installation & Project Delivery" },
    ],
    hasExistingDesign: [
      { value: "yes", label: "Yes — we have drawings" },
      { value: "no", label: "No — need CPS to design" },
      { value: "unsure", label: "Not sure yet" },
    ],
    budgetRanges: [
      { value: "under-100k", label: "Under SAR 100k" },
      { value: "100k-250k", label: "SAR 100k – 250k" },
      { value: "250k-500k", label: "SAR 250k – 500k" },
      { value: "500k-1m", label: "SAR 500k – 1M" },
      { value: "1m+", label: "SAR 1M+" },
      { value: "undisclosed", label: "Prefer not to say" },
    ],
    timelines: [
      { value: "urgent", label: "Under 4 weeks" },
      { value: "1-2-months", label: "1–2 months" },
      { value: "2-3-months", label: "2–3 months" },
      { value: "3plus", label: "3+ months / planning ahead" },
      { value: "flexible", label: "Flexible" },
    ],
    heardFrom: [
      { value: "search", label: "Search engine" },
      { value: "referral", label: "Referral" },
      { value: "social", label: "Social media" },
      { value: "event", label: "Saw our work at a show" },
      { value: "partner", label: "Agency / partner" },
      { value: "other", label: "Other" },
    ],
  },
  actions: {
    next: "Continue",
    back: "Back",
    submit: "Send Your Project Details",
    submitting: "Sending…",
  },
  consent:
    "I agree CPS may contact me about this inquiry and store these details to prepare a quote.",
  updatesOptIn: "Keep me posted on CPS news and project tips (optional).",
  success: {
    title: "Details received",
    message:
      "Thanks — our team will review your project and reply with a clear next step, usually within one business day.",
    cta: "Back to top",
  },
  errors: {
    required: "This field is required.",
    email: "Enter a valid email address.",
    submit: "Something went wrong. Please try again or email us directly.",
  },
  reviewTitle: "Almost done — check your details and send.",
};

const ar: BriefFormCopy = {
  eyebrow: "موجز المشروع",
  title: "أخبرنا عن مشروعك",
  support:
    "أربع خطوات قصيرة تغطي الأجنحة والفعاليات والتجهيز الداخلي ووحدات العرض والتصنيع والطباعة والتركيب. تساعدنا إجاباتك على تحديد نطاق العمل وتقديره بدقة.",
  steps: [
    {
      title: "بيانات التواصل",
      description: "من نتواصل معه، وما الطريقة التي تفضّلها.",
    },
    {
      title: "بيانات الجهة",
      description: "معلومات عن شركتك أو جهتك تساعدنا على فهم المشروع بشكل صحيح.",
    },
    {
      title: "تفاصيل المشروع",
      description: "ما الذي تريد تنفيذه، وأين، وما الخدمات التي تحتاجها من CPS.",
    },
    {
      title: "الميزانية والملاحظات",
      description: "الموعد المطلوب والميزانية التقديرية وأي معلومات أخرى ينبغي أن نعرفها.",
    },
  ],
  labels: {
    userType: "صفتك",
    fullName: "الاسم الكامل",
    jobTitle: "المسمى الوظيفي",
    email: "البريد الإلكتروني للعمل (اختياري)",
    phone: "رقم الجوال / واتساب",
    preferredContact: "طريقة التواصل المفضّلة",
    companyName: "اسم الشركة / الجهة",
    website: "الموقع الإلكتروني",
    industry: "القطاع",
    companySize: "عدد الموظفين",
    country: "الدولة",
    city: "المدينة",
    eventName: "اسم المشروع أو المعرض",
    eventLocation: "المكان / القاعة / المدينة",
    eventDate: "التاريخ أو الفترة المستهدفة",
    boothSize: "المساحة أو الأبعاد (اختياري)",
    boothType: "نوع المشروع",
    services: "الخدمات المطلوبة",
    hasExistingDesign: "هل لديك تصميم أو مخططات جاهزة؟",
    budgetRange: "الميزانية التقديرية (ريال سعودي)",
    timeline: "متى تحتاج إلى التسليم؟",
    description: "أهداف المشروع وملاحظاتك",
    referenceUrl: "رابط مرجعي (اختياري)",
    heardFrom: "كيف تعرّفت على CPS؟",
  },
  placeholders: {
    fullName: "اسمك الكامل",
    jobTitle: "مدير التسويق، مسؤول المشتريات…",
    email: "name@company.com",
    phone: "+966 …",
    companyName: "الاسم التجاري أو الاسم في السجل",
    website: "https://",
    country: "المملكة العربية السعودية",
    city: "الرياض",
    eventName: "GITEX، LEAP، تجهيز صالة عرض، وحدات عرض لعدة فروع…",
    eventLocation: "واجهة الرياض، مركز دبي التجاري العالمي، عنوان المتجر أو المكتب…",
    eventDate: "مارس 2026 أو 12–15 أبريل 2026",
    boothSize: "36 م² / 6×6 م / عدد الفروع…",
    description:
      "أهداف العلامة، المتطلبات الأساسية، المواقع، المواد، الأنظمة السمعية والبصرية (AV)، قيود التسليم…",
    referenceUrl: "مشروع سابق، لوحة إلهام (moodboard)، رابط كراسة الشروط (RFP)…",
  },
  options: {
    userTypes: [
      { value: "company", label: "علامة تجارية / شركة" },
      { value: "agency", label: "وكالة / شريك" },
      { value: "individual", label: "فرد / مستقل" },
      { value: "government", label: "جهة حكومية" },
      { value: "association", label: "جمعية / منظمة غير ربحية" },
      { value: "other", label: "أخرى" },
    ],
    preferredContact: [
      { value: "email", label: "البريد الإلكتروني" },
      { value: "phone", label: "اتصال هاتفي" },
      { value: "whatsapp", label: "واتساب" },
    ],
    industries: [
      { value: "technology", label: "التقنية" },
      { value: "healthcare", label: "الرعاية الصحية والأدوية" },
      { value: "energy", label: "الطاقة والصناعة" },
      { value: "retail", label: "التجزئة والسلع الاستهلاكية" },
      { value: "finance", label: "الخدمات المالية" },
      { value: "government", label: "القطاع الحكومي" },
      { value: "education", label: "التعليم" },
      { value: "hospitality", label: "الضيافة والأغذية والمشروبات" },
      { value: "other", label: "أخرى" },
    ],
    companySizes: [
      { value: "1-10", label: "1–10" },
      { value: "11-50", label: "11–50" },
      { value: "51-200", label: "51–200" },
      { value: "201-1000", label: "201–1,000" },
      { value: "1000+", label: "1,000+" },
    ],
    boothTypes: [
      { value: "custom", label: "جناح معرض" },
      { value: "modular", label: "هيكل فعالية / منصة" },
      { value: "double-deck", label: "تجهيز داخلي" },
      { value: "kiosk", label: "وحدة عرض في متجر / كشك" },
      { value: "pavilion", label: "تصنيع حسب الطلب" },
      { value: "portable", label: "طباعة ولافتات" },
      { value: "unsure", label: "تأجير / تركيب / لم أحدد بعد" },
    ],
    services: [
      { value: "exhibitions-booths", label: "المعارض والأجنحة" },
      { value: "event-fabrication", label: "تصنيع وتجهيز الفعاليات" },
      { value: "fit-out-interiors", label: "التجهيزات الداخلية" },
      { value: "retail-displays", label: "وحدات العرض ونقاط البيع" },
      { value: "custom-fabrication", label: "التصنيع المخصص" },
      { value: "printing-signage", label: "الطباعة واللافتات" },
      { value: "rental-solutions", label: "حلول التأجير" },
      { value: "installation-project-delivery", label: "التركيب وتسليم المشاريع" },
    ],
    hasExistingDesign: [
      { value: "yes", label: "نعم، لدينا مخططات" },
      { value: "no", label: "لا، نحتاج أن تتولى CPS التصميم" },
      { value: "unsure", label: "لم نحدد بعد" },
    ],
    budgetRanges: [
      { value: "under-100k", label: "أقل من 100 ألف ريال" },
      { value: "100k-250k", label: "100 – 250 ألف ريال" },
      { value: "250k-500k", label: "250 – 500 ألف ريال" },
      { value: "500k-1m", label: "500 ألف – 1 مليون ريال" },
      { value: "1m+", label: "أكثر من 1 مليون ريال" },
      { value: "undisclosed", label: "أفضّل عدم الإفصاح" },
    ],
    timelines: [
      { value: "urgent", label: "خلال أقل من 4 أسابيع" },
      { value: "1-2-months", label: "خلال شهر إلى شهرين" },
      { value: "2-3-months", label: "خلال 2–3 أشهر" },
      { value: "3plus", label: "بعد 3 أشهر أو أكثر" },
      { value: "flexible", label: "الموعد مرن" },
    ],
    heardFrom: [
      { value: "search", label: "محركات البحث" },
      { value: "referral", label: "توصية من أحد" },
      { value: "social", label: "وسائل التواصل الاجتماعي" },
      { value: "event", label: "شاهدت أعمالكم في معرض" },
      { value: "partner", label: "وكالة / شريك" },
      { value: "other", label: "أخرى" },
    ],
  },
  actions: {
    next: "التالي",
    back: "السابق",
    submit: "أرسل تفاصيل مشروعك",
    submitting: "جارٍ الإرسال…",
  },
  consent:
    "أوافق على أن تتواصل معي CPS بشأن هذا الطلب، وأن تحتفظ بهذه البيانات لإعداد عرض السعر.",
  updatesOptIn: "أرغب في تلقي أخبار CPS ونصائح لتخطيط المشاريع (اختياري).",
  success: {
    title: "استلمنا تفاصيل مشروعك",
    message:
      "شكراً لك. سيراجع فريقنا مشروعك ويتواصل معك بالخطوة التالية، غالباً خلال يوم عمل واحد.",
    cta: "العودة إلى الأعلى",
  },
  errors: {
    required: "هذا الحقل مطلوب.",
    email: "يرجى إدخال بريد إلكتروني صحيح.",
    submit: "تعذّر إرسال الطلب. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة عبر البريد الإلكتروني.",
  },
  reviewTitle: "الخطوة الأخيرة: راجع بياناتك ثم أرسلها.",
};

export function getBriefFormCopy(locale: Locale): BriefFormCopy {
  return locale === "ar" ? ar : en;
}
