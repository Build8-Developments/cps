import { Buffer } from "node:buffer";

import { NextResponse } from "next/server";
import { sendContactEmail, type ContactAttachment } from "@/lib/resend";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  locale?: string;
  websiteAlt?: string;
  requestType?: "quote" | "service-add-on";
  inquiryOption?: "client" | "recruitment" | "partner";
  source?: string;
  country?: string;
  eventType?: string;
  cvUrl?: string;
  note?: string;
  commercialRegister?: string;
  vatNumber?: string;
  websiteSocial?: string;
  nationalAddress?: string;
  authorizedPersonName?: string;
  bankName?: string;
  iban?: string;
  beneficiaryName?: string;
};

const MAX_FIELD_LENGTH = 4_000;
const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "jpg",
  "jpeg",
  "png",
  "webp",
  "dwg",
  "zip",
]);
const PARTNER_FILE_FIELDS = [
  "nationalAddressCertificate",
  "companyProfile",
  "commercialRegisterFile",
  "vatCertificate",
] as const;

function clean(value: unknown, maxLength = MAX_FIELD_LENGTH): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function safeFilename(value: string) {
  return value.replace(/[\r\n\\/]+/g, "-").slice(0, 180) || "attachment";
}

async function toAttachments(files: File[]): Promise<ContactAttachment[]> {
  return Promise.all(
    files.map(async (file) => ({
      filename: safeFilename(file.name),
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || undefined,
    })),
  );
}

export async function POST(request: Request) {
  let payload: ContactPayload;
  let files: File[] = [];

  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const form = await request.formData();
      const inquiryOption = clean(form.get("inquiryOption"), 32);
      const requestType = clean(form.get("requestType"), 32);
      payload = {
        name: clean(form.get("name"), 200),
        email: clean(form.get("email"), 254),
        phone: clean(form.get("phone"), 60),
        message: clean(form.get("message")),
        locale: clean(form.get("locale"), 5) || "en",
        websiteAlt: clean(form.get("websiteAlt"), 500),
        requestType:
          requestType === "quote" || requestType === "service-add-on"
            ? requestType
            : undefined,
        inquiryOption:
          inquiryOption === "client" ||
          inquiryOption === "recruitment" ||
          inquiryOption === "partner"
            ? inquiryOption
            : undefined,
        source: clean(form.get("source"), 32),
        country: clean(form.get("country"), 160),
        eventType: clean(form.get("eventType"), 250),
        cvUrl: clean(form.get("cvUrl"), 1_000),
        note: clean(form.get("note")),
        commercialRegister: clean(form.get("commercialRegister"), 200),
        vatNumber: clean(form.get("vatNumber"), 200),
        websiteSocial: clean(form.get("websiteSocial"), 1_000),
        nationalAddress: clean(form.get("nationalAddress"), 1_000),
        authorizedPersonName: clean(form.get("authorizedPersonName"), 200),
        bankName: clean(form.get("bankName"), 200),
        iban: clean(form.get("iban"), 100),
        beneficiaryName: clean(form.get("beneficiaryName"), 200),
      };
      files = [
        ...form.getAll("references"),
        ...PARTNER_FILE_FIELDS.map((field) => form.get(field)),
      ].filter(
        (value): value is File =>
          value instanceof File && value.size > 0 && Boolean(value.name),
      );
    } else {
      payload = (await request.json()) as ContactPayload;
    }
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  if (clean(payload.websiteAlt)) return NextResponse.json({ ok: true });

  const name = clean(payload.name, 200);
  const email = clean(payload.email, 254);
  const phone = clean(payload.phone, 60);
  const message = clean(payload.message);
  const locale = clean(payload.locale, 5) || "en";
  const isRoleInquiry = Boolean(payload.inquiryOption);
  const errors: Record<string, string> = {};

  if (!name) errors.name = "required";
  if (isRoleInquiry) {
    if (phone.replace(/\D/g, "").length < 6) errors.phone = "required";
    if (email && !isValidEmail(email)) errors.email = "email";
    if (!clean(payload.country, 160)) errors.country = "required";
    if (payload.inquiryOption === "client" && !clean(payload.eventType, 250)) {
      errors.eventType = "required";
    }
    if (payload.inquiryOption === "recruitment" && !clean(payload.cvUrl, 1_000)) {
      errors.cvUrl = "required";
    }
  } else {
    if (!email) errors.email = "required";
    else if (!isValidEmail(email)) errors.email = "email";
    if (!message) errors.message = "required";
  }
  if (files.length > MAX_FILES) errors.references = "too_many_files";
  if (files.some((file) => file.size > MAX_FILE_SIZE)) {
    errors.references = "file_too_large";
  }
  if (
    files.some((file) => {
      const extension = file.name.split(".").at(-1)?.toLowerCase() ?? "";
      return !ALLOWED_EXTENSIONS.has(extension);
    })
  ) {
    errors.references = "unsupported_file";
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await sendContactEmail({
      name,
      email: email || undefined,
      phone: phone || undefined,
      message: message || undefined,
      locale,
      requestType: payload.requestType,
      inquiryOption: payload.inquiryOption,
      source: clean(payload.source, 32) || undefined,
      country: clean(payload.country, 160) || undefined,
      eventType: clean(payload.eventType, 250) || undefined,
      cvUrl: clean(payload.cvUrl, 1_000) || undefined,
      note: clean(payload.note) || undefined,
      commercialRegister: clean(payload.commercialRegister, 200) || undefined,
      vatNumber: clean(payload.vatNumber, 200) || undefined,
      websiteSocial: clean(payload.websiteSocial, 1_000) || undefined,
      nationalAddress: clean(payload.nationalAddress, 1_000) || undefined,
      authorizedPersonName: clean(payload.authorizedPersonName, 200) || undefined,
      bankName: clean(payload.bankName, 200) || undefined,
      iban: clean(payload.iban, 100) || undefined,
      beneficiaryName: clean(payload.beneficiaryName, 200) || undefined,
      attachments: await toAttachments(files),
    });
  } catch (error) {
    console.error("[contact] Resend delivery failed", error);
    return NextResponse.json(
      { ok: false, message: "Unable to send inquiry right now" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
