import type { Locale } from "@/lib/i18n";

export type QuoteFormOption = { value: string; label: string };

export type QuoteFormCopy = {
  eyebrow: string;
  title: string;
  support: string;
  labels: {
    name: string;
    company: string;
    email: string;
    phone: string;
    item: string;
    projectName: string;
    details: string;
    references: string;
  };
  placeholders: {
    name: string;
    company: string;
    email: string;
    phone: string;
    item: string;
    projectName: string;
    details: string;
    references: string;
  };
  submit: string;
  submitting: string;
  success: {
    eyebrow: string;
    title: string;
    message: string;
  };
  errors: {
    required: string;
    email: string;
    submit: string;
    fileTooLarge: string;
    tooManyFiles: string;
  };
};

const en: QuoteFormCopy = {
  eyebrow: "Get a Quote",
  title: "Ready to start your project?",
  support: "Tell us what you need and we'll follow up with next steps.",
  labels: {
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    item: "Item / Type",
    projectName: "Project or exhibition name",
    details: "Project details",
    references: "Reference files",
  },
  placeholders: {
    name: "Your full name",
    company: "Company or organization",
    email: "name@company.com",
    phone: "+966 5X XXX XXXX",
    item: "Select an option",
    projectName: "Optional — e.g. LEAP 2026 booth",
    details: "Scope, venue, dates, size, and anything we should know…",
    references: "PDF, images or drawings — optional, up to 5 files",
  },
  submit: "Request My Quote",
  submitting: "Sending…",
  success: {
    eyebrow: "Get a Quote",
    title: "Quote request received",
    message: "Our team will follow up with the next step.",
  },
  errors: {
    required: "This field is required.",
    email: "Enter a valid email address.",
    submit: "We could not send your request. Try again or contact us directly.",
    fileTooLarge: "Each file must be under 10MB.",
    tooManyFiles: "You can upload up to 5 files.",
  },
};

const ar: QuoteFormCopy = {
  eyebrow: "اطلب عرض سعر",
  title: "جاهز لبدء مشروعك؟",
  support: "أخبرنا بما تحتاجه، وسيتواصل معك فريقنا بالخطوة التالية.",
  labels: {
    name: "الاسم الكامل",
    company: "اسم الشركة / الجهة",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    item: "العنصر / النوع",
    projectName: "اسم المشروع أو المعرض",
    details: "تفاصيل المشروع",
    references: "ملفات مرجعية",
  },
  placeholders: {
    name: "اسمك الكامل",
    company: "اسم الشركة أو الجهة",
    email: "name@company.com",
    phone: "+966 5X XXX XXXX",
    item: "اختر من القائمة",
    projectName: "اختياري — مثل: جناح LEAP 2026",
    details: "نطاق العمل، المكان، التواريخ، المساحة، وأي تفاصيل ينبغي أن نعرفها…",
    references: "ملفات PDF أو صور أو مخططات — اختياري، حتى 5 ملفات",
  },
  submit: "اطلب عرض سعر",
  submitting: "جارٍ الإرسال…",
  success: {
    eyebrow: "اطلب عرض سعر",
    title: "استلمنا طلب عرض السعر",
    message: "شكراً لك. سيراجع فريقنا طلبك ويتواصل معك بالخطوة التالية.",
  },
  errors: {
    required: "هذا الحقل مطلوب.",
    email: "يرجى إدخال بريد إلكتروني صحيح.",
    submit: "تعذّر إرسال الطلب. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.",
    fileTooLarge: "يجب ألا يتجاوز حجم الملف الواحد 10MB.",
    tooManyFiles: "يمكنك رفع 5 ملفات كحد أقصى.",
  },
};

/** Contact page: same fields, Blueprint submit CTA. */
export function getQuoteFormCopy(
  locale: Locale,
  variant: "service" | "contact" | "delivery" = "service",
): QuoteFormCopy {
  const base = locale === "ar" ? ar : en;
  if (variant === "delivery") {
    return {
      ...base,
      eyebrow: locale === "ar" ? "دعم مشروع قائم" : "Existing project support",
      title: locale === "ar" ? "ما الذي يحتاجه مشروعك القائم؟" : "What does your existing project need?",
      support: locale === "ar"
        ? "أخبرنا بحالة الهيكل أو المعدات، وموقع العمل، والموعد المطلوب، لنضع خطة التركيب أو النقل أو التخزين أو الصيانة."
        : "Share the structure or asset condition, location and required date so we can plan installation, logistics, storage or maintenance.",
      labels: {
        ...base.labels,
        item: locale === "ar" ? "الخدمة المطلوبة" : "Delivery service needed",
        projectName: locale === "ar" ? "المشروع أو الهيكل القائم (اختياري)" : "Existing project or structure (optional)",
        details: locale === "ar" ? "حالة المشروع ومتطلبات الموقع" : "Project condition and site requirements",
      },
      placeholders: {
        ...base.placeholders,
        item: locale === "ar" ? "اختر خدمة التركيب أو التسليم" : "Select an installation or delivery service",
        projectName: locale === "ar" ? "اسم المشروع أو نوع الهيكل" : "Project name or structure type",
        details: locale === "ar"
          ? "الموقع، الموعد، الأبعاد، حالة الهيكل، قيود الدخول إلى الموقع، وأي مخططات متاحة…"
          : "Site, required date, dimensions, structure condition, access constraints and available drawings…",
      },
    };
  }
  if (variant === "contact") {
    return {
      ...base,
      eyebrow: locale === "ar" ? "تفاصيل المشروع" : "Project details",
      title:
        locale === "ar" ? "أخبرنا عن مشروعك" : "Tell us about your project",
      support:
        locale === "ar"
          ? "نموذج قصير، ونعود إليك بالخطوة التالية بوضوح."
          : "A short form — we'll reply with a clear next step.",
      labels: {
        ...base.labels,
        item: locale === "ar" ? "الخدمة / النوع" : "Service / Type",
        projectName:
          locale === "ar" ? "اسم المشروع (اختياري)" : "Project name (optional)",
        references:
          locale === "ar"
            ? "ملفات مرجعية (اختياري)"
            : "Reference files (optional)",
      },
      placeholders: {
        ...base.placeholders,
        item: locale === "ar" ? "اختر الخدمة" : "Select a service",
        projectName:
          locale === "ar"
            ? "اختياري — اسم المعرض أو المشروع"
            : "Optional — exhibition or project name",
      },
      submit:
        locale === "ar" ? "أرسل تفاصيل مشروعك" : "Send Your Project Details",
      success: {
        eyebrow: locale === "ar" ? "تواصل معنا" : "Contact",
        title: locale === "ar" ? "استلمنا تفاصيل مشروعك" : "Details received",
        message:
          locale === "ar"
            ? "شكراً لك. سيراجع فريقنا طلبك ويتواصل معك قريباً."
            : "Thanks — our team will review this and reply shortly.",
      },
    };
  }
  return {
    ...base,
    labels: {
      ...base.labels,
      projectName:
        locale === "ar"
          ? "اسم المشروع أو المعرض (اختياري)"
          : "Project or exhibition name (optional)",
      references:
        locale === "ar"
          ? "ملفات مرجعية (اختياري)"
          : "Reference files (optional)",
    },
  };
}

export const contactServiceOptions: Record<Locale, QuoteFormOption[]> = {
  en: [
    { value: "exhibitions-booths", label: "Exhibitions & Booths" },
    { value: "event-fabrication", label: "Event Fabrication" },
    { value: "fit-out-interiors", label: "Fit-Out & Interiors" },
    { value: "retail-displays", label: "Retail Displays" },
    { value: "custom-fabrication", label: "Custom Fabrication" },
    { value: "printing-signage", label: "Printing & Signage" },
    { value: "rental-solutions", label: "Rental Solutions" },
    {
      value: "installation-project-delivery",
      label: "Installation & Project Delivery",
    },
  ],
  ar: [
    { value: "exhibitions-booths", label: "المعارض والأجنحة" },
    { value: "event-fabrication", label: "تصنيع تجهيزات الفعاليات" },
    { value: "fit-out-interiors", label: "التجهيزات الداخلية" },
    { value: "retail-displays", label: "وحدات عرض المنتجات" },
    { value: "custom-fabrication", label: "التصنيع حسب الطلب" },
    { value: "printing-signage", label: "الطباعة واللافتات" },
    { value: "rental-solutions", label: "حلول التأجير" },
    {
      value: "installation-project-delivery",
      label: "التركيب وتسليم المشاريع",
    },
  ],
};
