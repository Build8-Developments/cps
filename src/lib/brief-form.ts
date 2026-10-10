export type UserType =
  | "company"
  | "agency"
  | "individual"
  | "government"
  | "association"
  | "other";

export type PreferredContact = "email" | "phone" | "whatsapp";

export type BoothType =
  | "custom"
  | "modular"
  | "double-deck"
  | "kiosk"
  | "pavilion"
  | "portable"
  | "unsure";

export type ServiceNeed =
  | "exhibitions-booths"
  | "event-fabrication"
  | "fit-out-interiors"
  | "retail-displays"
  | "custom-fabrication"
  | "printing-signage"
  | "rental-solutions"
  | "installation-project-delivery"
  | "installation-delivery"
  // Legacy values kept so older submitted briefs still type-check.
  | "design"
  | "fabrication"
  | "install"
  | "dismantle"
  | "storage"
  | "graphics"
  | "av"
  | "furniture"
  | "project-management";

export type BriefFormData = {
  userType: UserType | "";
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  preferredContact: PreferredContact | "";
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  country: string;
  city: string;
  eventName: string;
  eventLocation: string;
  eventDate: string;
  boothSize: string;
  boothType: BoothType | "";
  services: ServiceNeed[];
  hasExistingDesign: "yes" | "no" | "unsure" | "";
  budgetRange: string;
  timeline: string;
  description: string;
  referenceUrl: string;
  heardFrom: string;
  updatesOptIn: boolean;
  consent: boolean;
  websiteAlt: string;
};

export const INITIAL_BRIEF_FORM: BriefFormData = {
  userType: "",
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  preferredContact: "",
  companyName: "",
  website: "",
  industry: "",
  companySize: "",
  country: "",
  city: "",
  eventName: "",
  eventLocation: "",
  eventDate: "",
  boothSize: "",
  boothType: "",
  services: [],
  hasExistingDesign: "",
  budgetRange: "",
  timeline: "",
  description: "",
  referenceUrl: "",
  heardFrom: "",
  updatesOptIn: false,
  consent: false,
  websiteAlt: "",
};

export type BriefFormErrors = Partial<Record<keyof BriefFormData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateBriefStep(
  step: number,
  data: BriefFormData,
): BriefFormErrors {
  const errors: BriefFormErrors = {};

  if (step === 0) {
    if (!data.userType) errors.userType = "required";
    if (!data.fullName.trim()) errors.fullName = "required";
    if (!data.email.trim()) {
      if (data.preferredContact === "email") errors.email = "required";
    } else if (!EMAIL_RE.test(data.email.trim())) errors.email = "email";
    if (!data.phone.trim()) errors.phone = "required";
    if (!data.preferredContact) errors.preferredContact = "required";
  }

  if (step === 1) {
    if (data.userType !== "individual" && !data.companyName.trim()) {
      errors.companyName = "required";
    }
    if (!data.country.trim()) errors.country = "required";
    if (!data.city.trim()) errors.city = "required";
  }

  if (step === 2) {
    if (!data.eventName.trim()) errors.eventName = "required";
    if (!data.boothType) errors.boothType = "required";
    if (data.services.length === 0) errors.services = "required";
    if (!data.hasExistingDesign) errors.hasExistingDesign = "required";
  }

  if (step === 3) {
    if (!data.budgetRange) errors.budgetRange = "required";
    if (!data.timeline) errors.timeline = "required";
    if (!data.description.trim()) errors.description = "required";
    if (!data.consent) errors.consent = "required";
  }

  return errors;
}

export function validateBriefForm(data: BriefFormData): BriefFormErrors {
  return [0, 1, 2, 3].reduce<BriefFormErrors>((acc, step) => {
    return { ...acc, ...validateBriefStep(step, data) };
  }, {});
}

export function formatBriefPlainText(data: BriefFormData, locale: string): string {
  const lines = [
    `CPS Project Brief — ${locale.toUpperCase()}`,
    "",
    "— Contact —",
    `Type: ${data.userType}`,
    `Name: ${data.fullName}`,
    `Title: ${data.jobTitle || "—"}`,
    `Email: ${data.email || "—"}`,
    `Phone: ${data.phone}`,
    `Preferred contact: ${data.preferredContact}`,
    "",
    "— Organization —",
    `Company: ${data.companyName || "—"}`,
    `Website: ${data.website || "—"}`,
    `Industry: ${data.industry || "—"}`,
    `Size: ${data.companySize || "—"}`,
    `Location: ${data.city}, ${data.country}`,
    "",
    "— Project —",
    `Project / exhibition: ${data.eventName}`,
    `Venue / city: ${data.eventLocation || "—"}`,
    `Date: ${data.eventDate || "—"}`,
    `Size / footprint: ${data.boothSize || "—"}`,
    `Project type: ${data.boothType}`,
    `Services: ${data.services.join(", ")}`,
    `Existing design: ${data.hasExistingDesign}`,
    "",
    "— Scope —",
    `Budget: ${data.budgetRange}`,
    `Timeline: ${data.timeline}`,
    `Reference: ${data.referenceUrl || "—"}`,
    `Heard from: ${data.heardFrom || "—"}`,
    `Updates opt-in: ${data.updatesOptIn ? "yes" : "no"}`,
    "",
    "— Brief —",
    data.description,
  ];

  return lines.join("\n");
}
