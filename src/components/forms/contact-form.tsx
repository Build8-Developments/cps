"use client";

import { useState, type FormEvent } from "react";
import { getContactFormCopy, type ContactInquiryOption } from "@/content/contact-form.copy";
import type { Locale } from "@/lib/i18n";

const PARTNER_FILES = [
  "nationalAddressCertificate",
  "companyProfile",
  "commercialRegisterFile",
  "vatCertificate",
] as const;

export function ContactForm({ locale }: { locale: Locale }) {
  const copy = getContactFormCopy(locale);
  const [inquiryOption, setInquiryOption] = useState<ContactInquiryOption>("client");
  const [eventType, setEventType] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status !== "idle") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const country = String(data.get("country") ?? "").trim();
    const cvUrl = String(data.get("cvUrl") ?? "").trim();
    const otherEventType = String(data.get("otherEventType") ?? "").trim();
    const resolvedEventType = eventType === copy.other ? otherEventType : eventType;

    if (
      !name ||
      !country ||
      phone.replace(/\D/g, "").length < 6 ||
      (inquiryOption === "client" && !resolvedEventType) ||
      (inquiryOption === "recruitment" && !cvUrl)
    ) {
      setError(
        phone && phone.replace(/\D/g, "").length < 6
          ? copy.errors.phone
          : copy.errors.required,
      );
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(copy.errors.email);
      return;
    }

    const oversized = PARTNER_FILES.some((field) => {
      const file = data.get(field);
      return file instanceof File && file.size > 10 * 1024 * 1024;
    });
    if (oversized) {
      setError(copy.errors.fileTooLarge);
      return;
    }

    data.set("inquiryOption", inquiryOption);
    data.set("eventType", resolvedEventType);
    data.set("locale", locale);
    data.set("source", "contact");

    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", { method: "POST", body: data });
      if (!response.ok) throw new Error("submit_failed");
      form.reset();
      setEventType("");
      setStatus("done");
    } catch {
      setStatus("idle");
      setError(copy.errors.submit);
    }
  }

  if (status === "done") {
    return (
      <div className="contact-form-success" role="status">
        <div>
          <h3>{copy.successTitle}</h3>
          <p>{copy.successMessage}</p>
        </div>
      </div>
    );
  }

  const isClient = inquiryOption === "client";
  const isRecruitment = inquiryOption === "recruitment";
  const isPartner = inquiryOption === "partner";

  return (
    <form className="brief-form contact-role-form" onSubmit={submit} noValidate>
      <input
        className="brief-honeypot"
        name="websiteAlt"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <fieldset className="brief-fieldset brief-field--full">
        <legend className="brief-label">{copy.inquiryLabel}</legend>
        <div className="brief-chip-group contact-role-options">
          {copy.inquiryOptions.map((option) => (
            <label className="brief-chip" key={option.value}>
              <input
                type="radio"
                name="inquiryOptionChoice"
                value={option.value}
                checked={inquiryOption === option.value}
                onChange={() => {
                  setInquiryOption(option.value);
                  setEventType("");
                  setError("");
                }}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="brief-form-grid contact-role-fields">
        <label className="brief-field">
          <span className="brief-label">
            {isPartner ? copy.labels.companyName : copy.labels.name}
          </span>
          <input
            className="brief-control"
            name="name"
            placeholder={isPartner ? copy.placeholders.companyName : copy.placeholders.name}
            required
          />
        </label>
        <label className="brief-field">
          <span className="brief-label">{copy.labels.phone}</span>
          <input
            className="brief-control"
            name="phone"
            type="tel"
            dir="ltr"
            autoComplete="tel"
            placeholder={copy.placeholders.phone}
            required
          />
        </label>
        <label className="brief-field">
          <span className="brief-label">
            {copy.labels.email} <small>{copy.optional}</small>
          </span>
          <input
            className="brief-control"
            name="email"
            type="email"
            dir="ltr"
            autoComplete="email"
            placeholder={copy.placeholders.email}
          />
        </label>
        <label className="brief-field">
          <span className="brief-label">{copy.labels.country}</span>
          <select className="brief-control" name="country" defaultValue="" required>
            <option value="" disabled>{copy.placeholders.country}</option>
            {copy.countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </label>

        {isClient ? (
          <fieldset className="brief-fieldset brief-field--full contact-role-panel">
            <legend className="brief-label">{copy.labels.eventType}</legend>
            <div className="brief-chip-group">
              {[...copy.eventTypes, copy.other].map((option) => (
                <label className="brief-chip" key={option}>
                  <input
                    type="radio"
                    name="eventTypeChoice"
                    value={option}
                    checked={eventType === option}
                    onChange={() => setEventType(option)}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {eventType === copy.other ? (
              <label className="brief-field contact-role-other">
                <span className="brief-label">{copy.labels.otherEventType}</span>
                <input
                  className="brief-control"
                  name="otherEventType"
                  placeholder={copy.placeholders.otherEventType}
                />
              </label>
            ) : null}
          </fieldset>
        ) : null}

        {isRecruitment ? (
          <label className="brief-field brief-field--full contact-role-panel">
            <span className="brief-label">{copy.labels.cvUrl}</span>
            <input
              className="brief-control"
              name="cvUrl"
              type="url"
              autoComplete="url"
              placeholder={copy.placeholders.cvUrl}
              required
            />
          </label>
        ) : null}

        {isPartner ? (
          <>
            <fieldset className="brief-fieldset brief-field--full contact-role-panel">
              <legend className="contact-role-panel-title">{copy.labels.commercial}</legend>
              <div className="brief-form-grid">
                <ContactField name="commercialRegister" label={copy.labels.commercialRegister} />
                <ContactField name="vatNumber" label={copy.labels.vatNumber} />
                <ContactField name="websiteSocial" label={copy.labels.websiteSocial} full />
                <ContactField name="nationalAddress" label={copy.labels.nationalAddress} full />
                <ContactField name="authorizedPersonName" label={copy.labels.authorizedPersonName} full />
              </div>
            </fieldset>
            <fieldset className="brief-fieldset brief-field--full contact-role-panel">
              <legend className="contact-role-panel-title">{copy.labels.documents}</legend>
              <div className="contact-file-grid">
                {PARTNER_FILES.map((name) => (
                  <label className="quote-file contact-file" key={name}>
                    <span>
                      <strong>{copy.labels[name]}</strong>
                      <small>{copy.chooseFile} · {copy.optional}</small>
                    </span>
                    <input
                      className="quote-file-input"
                      name={name}
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="brief-fieldset brief-field--full contact-role-panel">
              <legend className="contact-role-panel-title">{copy.labels.bank}</legend>
              <div className="brief-form-grid">
                <ContactField name="bankName" label={copy.labels.bankName} />
                <ContactField name="iban" label={copy.labels.iban} dir="ltr" />
                <ContactField name="beneficiaryName" label={copy.labels.beneficiaryName} full />
              </div>
            </fieldset>
          </>
        ) : null}

        {!isPartner ? (
          <label className="brief-field brief-field--full">
            <span className="brief-label">
              {copy.labels.notes} <small>{copy.optional}</small>
            </span>
            <textarea
              className="brief-control brief-control--area"
              name="note"
              rows={4}
              placeholder={copy.placeholders.notes}
            />
          </label>
        ) : null}
      </div>

      {error ? <p className="brief-submit-error" role="alert">{error}</p> : null}
      <div className="brief-form-actions quote-form-actions">
        <button className="btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? copy.submitting : copy.submit}
        </button>
      </div>
    </form>
  );
}

function ContactField({
  name,
  label,
  full = false,
  dir,
}: {
  name: string;
  label: string;
  full?: boolean;
  dir?: "ltr";
}) {
  return (
    <label className={`brief-field${full ? " brief-field--full" : ""}`}>
      <span className="brief-label">{label}</span>
      <input className="brief-control" name={name} dir={dir} />
    </label>
  );
}
