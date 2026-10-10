import type { Locale } from "@/lib/i18n";

export type ContactInquiryOption = "client" | "recruitment" | "partner";

export type ContactFormCopy = {
  eyebrow: string;
  title: string;
  support: string;
  inquiryLabel: string;
  inquiryOptions: { value: ContactInquiryOption; label: string }[];
  labels: Record<
    | "name" | "companyName" | "phone" | "email" | "country" | "eventType"
    | "otherEventType" | "cvUrl" | "notes" | "commercial"
    | "commercialRegister" | "vatNumber" | "websiteSocial"
    | "nationalAddress" | "authorizedPersonName" | "documents"
    | "nationalAddressCertificate" | "companyProfile"
    | "commercialRegisterFile" | "vatCertificate" | "bank"
    | "bankName" | "iban" | "beneficiaryName",
    string
  >;
  placeholders: Record<
    "name" | "companyName" | "phone" | "email" | "country" | "otherEventType" | "cvUrl" | "notes",
    string
  >;
  countries: string[];
  eventTypes: string[];
  other: string;
  optional: string;
  chooseFile: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  errors: { required: string; phone: string; email: string; submit: string; fileTooLarge: string };
};

const en: ContactFormCopy = {
  eyebrow: "Contact",
  title: "How can we help?",
  support: "Choose the type of inquiry and share the details relevant to you.",
  inquiryLabel: "I’m contacting CPS as a",
  inquiryOptions: [
    { value: "client", label: "Client" },
    { value: "recruitment", label: "Job applicant" },
    { value: "partner", label: "Partner / supplier" },
  ],
  labels: {
    name: "Full name", companyName: "Company name", phone: "Phone number", email: "Email",
    country: "Country",
    eventType: "What are you planning?", otherEventType: "Tell us what you’re planning",
    cvUrl: "CV / portfolio link", notes: "Notes", commercial: "Commercial details",
    commercialRegister: "Commercial register", vatNumber: "VAT number",
    websiteSocial: "Website / social profile", nationalAddress: "National address",
    authorizedPersonName: "Authorized person name", documents: "Company documents",
    nationalAddressCertificate: "National address certificate", companyProfile: "Company profile",
    commercialRegisterFile: "Commercial register file", vatCertificate: "VAT certificate",
    bank: "Bank details", bankName: "Bank name", iban: "IBAN", beneficiaryName: "Beneficiary name",
  },
  placeholders: {
    name: "Your full name", companyName: "Your company name", phone: "+966 5X XXX XXXX",
    email: "name@company.com", country: "Select a country", otherEventType: "Describe the project or event",
    cvUrl: "https://…", notes: "Anything else we should know?",
  },
  countries: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Oman", "Egypt", "Other"],
  eventTypes: ["Exhibition booth", "Event fabrication", "Fit-out or interior", "Retail display", "Printing or signage"],
  other: "Other",
  optional: "Optional",
  chooseFile: "Choose file",
  submit: "Send inquiry",
  submitting: "Sending…",
  successTitle: "Inquiry received",
  successMessage: "Thank you — our team will review it and get back to you.",
  errors: {
    required: "Complete the required fields.", phone: "Enter a valid phone number.",
    email: "Enter a valid email address.",
    submit: "We could not send your inquiry. Please try again.", fileTooLarge: "Each file must be under 10MB.",
  },
};

const ar: ContactFormCopy = {
  eyebrow: "تواصل معنا",
  title: "كيف يمكننا مساعدتك؟",
  support: "اختر نوع استفسارك، ثم أضف التفاصيل التي تخصّه.",
  inquiryLabel: "أتواصل مع CPS بصفتي",
  inquiryOptions: [
    { value: "client", label: "عميلاً" },
    { value: "recruitment", label: "متقدماً لوظيفة" },
    { value: "partner", label: "شريكاً / مورداً" },
  ],
  labels: {
    name: "الاسم الكامل", companyName: "اسم الشركة", phone: "رقم الجوال", email: "البريد الإلكتروني",
    country: "الدولة",
    eventType: "ما الذي تخطط له؟", otherEventType: "صف ما تخطط له",
    cvUrl: "رابط السيرة الذاتية / نماذج الأعمال", notes: "ملاحظات", commercial: "البيانات التجارية",
    commercialRegister: "السجل التجاري", vatNumber: "الرقم الضريبي",
    websiteSocial: "الموقع الإلكتروني / حساب التواصل الاجتماعي", nationalAddress: "العنوان الوطني",
    authorizedPersonName: "اسم الشخص المفوَّض", documents: "مستندات الشركة",
    nationalAddressCertificate: "شهادة العنوان الوطني", companyProfile: "ملف الشركة",
    commercialRegisterFile: "ملف السجل التجاري", vatCertificate: "شهادة ضريبة القيمة المضافة",
    bank: "البيانات البنكية", bankName: "اسم البنك", iban: "رقم الآيبان", beneficiaryName: "اسم المستفيد",
  },
  placeholders: {
    name: "اسمك الكامل", companyName: "اسم الشركة أو الجهة", phone: "+966 5X XXX XXXX",
    email: "name@company.com", country: "اختر الدولة", otherEventType: "صف المشروع أو الفعالية",
    cvUrl: "https://…", notes: "أي تفاصيل أخرى ينبغي أن نعرفها؟",
  },
  countries: ["المملكة العربية السعودية", "الإمارات العربية المتحدة", "قطر", "الكويت", "البحرين", "عُمان", "مصر", "أخرى"],
  eventTypes: ["جناح معرض", "تصنيع وتجهيز فعالية", "تجهيز داخلي", "وحدات عرض للمتاجر", "طباعة ولافتات"],
  other: "أخرى",
  optional: "اختياري",
  chooseFile: "اختر ملفاً",
  submit: "أرسل الاستفسار",
  submitting: "جارٍ الإرسال…",
  successTitle: "تم استلام استفسارك",
  successMessage: "شكراً لك. سيراجع فريقنا استفسارك ويتواصل معك قريباً.",
  errors: {
    required: "يرجى إكمال الحقول المطلوبة.", phone: "يرجى إدخال رقم جوال صحيح.",
    email: "يرجى إدخال بريد إلكتروني صحيح.",
    submit: "تعذّر إرسال الاستفسار. يرجى المحاولة مرة أخرى.", fileTooLarge: "يجب ألا يتجاوز حجم الملف الواحد 10MB.",
  },
};

export function getContactFormCopy(locale: Locale): ContactFormCopy {
  return locale === "ar" ? ar : en;
}
