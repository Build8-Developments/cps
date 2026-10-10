import type { BriefFormData } from "@/lib/brief-form";
import { getSanityWriteClient } from "@/sanity/write-client";

export async function createBriefSubmission(input: {
  locale: string;
  data: BriefFormData;
  plainText: string;
}): Promise<{ id: string } | null> {
  const client = getSanityWriteClient();
  if (!client) return null;

  const { data, locale, plainText } = input;

  const optional = (value: string) => {
    const trimmed = value.trim();
    return trimmed ? trimmed : undefined;
  };

  const doc = await client.create({
    _type: "briefSubmission",
    status: "new",
    submittedAt: new Date().toISOString(),
    locale,
    fullName: data.fullName.trim(),
    email: optional(data.email),
    phone: data.phone.trim(),
    jobTitle: optional(data.jobTitle),
    userType: data.userType || undefined,
    preferredContact: data.preferredContact || undefined,
    companyName: optional(data.companyName),
    website: optional(data.website),
    industry: optional(data.industry),
    companySize: optional(data.companySize),
    country: optional(data.country),
    city: optional(data.city),
    eventName: optional(data.eventName),
    eventLocation: optional(data.eventLocation),
    eventDate: optional(data.eventDate),
    boothSize: optional(data.boothSize),
    boothType: data.boothType || undefined,
    services: data.services ?? [],
    hasExistingDesign: data.hasExistingDesign || undefined,
    budgetRange: optional(data.budgetRange),
    timeline: optional(data.timeline),
    description: optional(data.description),
    referenceUrl: optional(data.referenceUrl),
    heardFrom: optional(data.heardFrom),
    updatesOptIn: data.updatesOptIn,
    consent: data.consent,
    plainText,
  });

  return { id: doc._id };
}
