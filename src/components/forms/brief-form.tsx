"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import type { BriefFormCopy } from "@/content/brief-form.copy";
import {
  INITIAL_BRIEF_FORM,
  validateBriefStep,
  formatBriefPlainText,
  type BriefFormData,
  type BriefFormErrors,
  type ServiceNeed,
} from "@/lib/brief-form";
import { getMailtoUrl } from "@/lib/site-config";
import type { Locale } from "@/lib/i18n";

type BriefFormProps = {
  locale: Locale;
  copy: BriefFormCopy;
  /** Prefill services (e.g. current service page slug). */
  initialServices?: ServiceNeed[];
  /** Prefill project notes (e.g. catalogue item from URL). */
  initialDescription?: string;
};

type BriefFieldProps = {
  id: string;
  label: string;
  className?: string;
  error?: string;
  children: ReactNode;
};

type BriefChoiceGroupProps = {
  label: string;
  className?: string;
  error?: string;
  children: ReactNode;
};

function BriefField({ id, label, className, error, children }: BriefFieldProps) {
  return (
    <div className={`brief-field${className ? ` ${className}` : ""}`}>
      <label className="brief-label" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? <span className="brief-error">{error}</span> : null}
    </div>
  );
}

function BriefChoiceGroup({ label, className, error, children }: BriefChoiceGroupProps) {
  return (
    <div className={`brief-field${className ? ` ${className}` : ""}`}>
      <fieldset className="brief-fieldset">
        <legend className="brief-label">{label}</legend>
        {children}
      </fieldset>
      {error ? <span className="brief-error">{error}</span> : null}
    </div>
  );
}

function errorMessage(copy: BriefFormCopy, code?: string) {
  if (code === "email") return copy.errors.email;
  if (code === "required") return copy.errors.required;
  return undefined;
}

export function BriefForm({
  locale,
  copy,
  initialServices,
  initialDescription,
}: BriefFormProps) {
  const fieldPrefix = useId();
  const fieldId = (name: string) => `${fieldPrefix}-${name}`;

  const [step, setStep] = useState(0);
  const [data, setData] = useState<BriefFormData>(() => ({
    ...INITIAL_BRIEF_FORM,
    ...(initialServices?.length ? { services: initialServices } : {}),
    ...(initialDescription?.trim()
      ? { description: initialDescription.trim() }
      : {}),
  }));
  const [errors, setErrors] = useState<BriefFormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const progress = ((step + 1) / copy.steps.length) * 100;
  const isLastStep = step === copy.steps.length - 1;

  const setField = <K extends keyof BriefFormData>(key: K, value: BriefFormData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const toggleService = (service: ServiceNeed) => {
    setData((current) => {
      const exists = current.services.includes(service);
      const services = exists
        ? current.services.filter((item) => item !== service)
        : [...current.services, service];
      return { ...current, services };
    });
    setErrors((current) => {
      if (!current.services) return current;
      const next = { ...current };
      delete next.services;
      return next;
    });
  };

  const goNext = () => {
    const stepErrors = validateBriefStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep((current) => Math.min(current + 1, copy.steps.length - 1));
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 0));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLastStep) {
      goNext();
      return;
    }

    const stepErrors = validateBriefStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!response.ok) {
        throw new Error("submit failed");
      }

      setDone(true);
    } catch {
      const mailto = getMailtoUrl({
        subject: `CPS Brief — ${data.eventName || data.fullName}`,
        body: formatBriefPlainText(data, locale),
      });
      setSubmitError(copy.errors.submit);
      window.location.href = mailto;
    } finally {
      setSubmitting(false);
    }
  };

  const fieldError = (key: keyof BriefFormData) =>
    errorMessage(copy, errors[key] as string | undefined);

  const renderStepFields = () => {
    switch (step) {
      case 0:
        return (
          <div className="brief-form-grid">
            <BriefField
              id={fieldId("userType")}
              label={copy.labels.userType}
              className="brief-field--full"
              error={fieldError("userType")}
            >
              <select
                id={fieldId("userType")}
                className="brief-control"
                value={data.userType}
                onChange={(event) =>
                  setField("userType", event.target.value as BriefFormData["userType"])
                }
                required
              >
                <option value="" disabled>
                  —
                </option>
                {copy.options.userTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BriefField>

            <BriefField
              id={fieldId("fullName")}
              label={copy.labels.fullName}
              error={fieldError("fullName")}
            >
              <input
                id={fieldId("fullName")}
                className="brief-control"
                value={data.fullName}
                onChange={(event) => setField("fullName", event.target.value)}
                placeholder={copy.placeholders.fullName}
                autoComplete="name"
                required
              />
            </BriefField>

            <BriefField id={fieldId("jobTitle")} label={copy.labels.jobTitle}>
              <input
                id={fieldId("jobTitle")}
                className="brief-control"
                value={data.jobTitle}
                onChange={(event) => setField("jobTitle", event.target.value)}
                placeholder={copy.placeholders.jobTitle}
                autoComplete="organization-title"
              />
            </BriefField>

            <BriefField id={fieldId("email")} label={copy.labels.email} error={fieldError("email")}>
              <input
                id={fieldId("email")}
                className="brief-control"
                type="email"
                value={data.email}
                onChange={(event) => setField("email", event.target.value)}
                placeholder={copy.placeholders.email}
                autoComplete="email"
                required={data.preferredContact === "email"}
              />
            </BriefField>

            <BriefField id={fieldId("phone")} label={copy.labels.phone} error={fieldError("phone")}>
              <input
                id={fieldId("phone")}
                className="brief-control"
                type="tel"
                value={data.phone}
                onChange={(event) => setField("phone", event.target.value)}
                placeholder={copy.placeholders.phone}
                autoComplete="tel"
                dir="ltr"
                required
              />
            </BriefField>

            <BriefChoiceGroup
              label={copy.labels.preferredContact}
              className="brief-field--full"
              error={fieldError("preferredContact")}
            >
              <div className="brief-chip-group">
                {copy.options.preferredContact.map((option) => (
                  <label key={option.value} className="brief-chip">
                    <input
                      type="radio"
                      name="preferredContact"
                      value={option.value}
                      checked={data.preferredContact === option.value}
                      onChange={() =>
                        setField(
                          "preferredContact",
                          option.value as BriefFormData["preferredContact"],
                        )
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </BriefChoiceGroup>
          </div>
        );

      case 1:
        return (
          <div className="brief-form-grid">
            <BriefField
              id={fieldId("companyName")}
              label={copy.labels.companyName}
              className="brief-field--full"
              error={fieldError("companyName")}
            >
              <input
                id={fieldId("companyName")}
                className="brief-control"
                value={data.companyName}
                onChange={(event) => setField("companyName", event.target.value)}
                placeholder={copy.placeholders.companyName}
                autoComplete="organization"
              />
            </BriefField>

            <BriefField id={fieldId("website")} label={copy.labels.website}>
              <input
                id={fieldId("website")}
                className="brief-control"
                type="url"
                value={data.website}
                onChange={(event) => setField("website", event.target.value)}
                placeholder={copy.placeholders.website}
                autoComplete="url"
                dir="ltr"
              />
            </BriefField>

            <BriefField id={fieldId("industry")} label={copy.labels.industry}>
              <select
                id={fieldId("industry")}
                className="brief-control"
                value={data.industry}
                onChange={(event) => setField("industry", event.target.value)}
              >
                <option value="">—</option>
                {copy.options.industries.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BriefField>

            <BriefField id={fieldId("companySize")} label={copy.labels.companySize}>
              <select
                id={fieldId("companySize")}
                className="brief-control"
                value={data.companySize}
                onChange={(event) => setField("companySize", event.target.value)}
              >
                <option value="">—</option>
                {copy.options.companySizes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BriefField>

            <BriefField id={fieldId("country")} label={copy.labels.country} error={fieldError("country")}>
              <input
                id={fieldId("country")}
                className="brief-control"
                value={data.country}
                onChange={(event) => setField("country", event.target.value)}
                placeholder={copy.placeholders.country}
                autoComplete="country-name"
                required
              />
            </BriefField>

            <BriefField id={fieldId("city")} label={copy.labels.city} error={fieldError("city")}>
              <input
                id={fieldId("city")}
                className="brief-control"
                value={data.city}
                onChange={(event) => setField("city", event.target.value)}
                placeholder={copy.placeholders.city}
                autoComplete="address-level2"
                required
              />
            </BriefField>
          </div>
        );

      case 2:
        return (
          <div className="brief-form-grid">
            <BriefField
              id={fieldId("eventName")}
              label={copy.labels.eventName}
              className="brief-field--full"
              error={fieldError("eventName")}
            >
              <input
                id={fieldId("eventName")}
                className="brief-control"
                value={data.eventName}
                onChange={(event) => setField("eventName", event.target.value)}
                placeholder={copy.placeholders.eventName}
                required
              />
            </BriefField>

            <BriefField
              id={fieldId("eventLocation")}
              label={copy.labels.eventLocation}
              error={fieldError("eventLocation")}
            >
              <input
                id={fieldId("eventLocation")}
                className="brief-control"
                value={data.eventLocation}
                onChange={(event) => setField("eventLocation", event.target.value)}
                placeholder={copy.placeholders.eventLocation}
              />
            </BriefField>

            <BriefField
              id={fieldId("eventDate")}
              label={copy.labels.eventDate}
              error={fieldError("eventDate")}
            >
              <input
                id={fieldId("eventDate")}
                className="brief-control"
                value={data.eventDate}
                onChange={(event) => setField("eventDate", event.target.value)}
                placeholder={copy.placeholders.eventDate}
              />
            </BriefField>

            <BriefField
              id={fieldId("boothSize")}
              label={copy.labels.boothSize}
              error={fieldError("boothSize")}
            >
              <input
                id={fieldId("boothSize")}
                className="brief-control"
                value={data.boothSize}
                onChange={(event) => setField("boothSize", event.target.value)}
                placeholder={copy.placeholders.boothSize}
              />
            </BriefField>

            <BriefField
              id={fieldId("boothType")}
              label={copy.labels.boothType}
              error={fieldError("boothType")}
            >
              <select
                id={fieldId("boothType")}
                className="brief-control"
                value={data.boothType}
                onChange={(event) =>
                  setField("boothType", event.target.value as BriefFormData["boothType"])
                }
                required
              >
                <option value="" disabled>
                  —
                </option>
                {copy.options.boothTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BriefField>

            <BriefChoiceGroup
              label={copy.labels.services}
              className="brief-field--full"
              error={fieldError("services")}
            >
              <div className="brief-check-grid">
                {copy.options.services.map((option) => (
                  <label key={option.value} className="brief-check">
                    <input
                      type="checkbox"
                      checked={data.services.includes(option.value as ServiceNeed)}
                      onChange={() => toggleService(option.value as ServiceNeed)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </BriefChoiceGroup>

            <BriefChoiceGroup
              label={copy.labels.hasExistingDesign}
              className="brief-field--full"
              error={fieldError("hasExistingDesign")}
            >
              <div className="brief-chip-group">
                {copy.options.hasExistingDesign.map((option) => (
                  <label key={option.value} className="brief-chip">
                    <input
                      type="radio"
                      name="hasExistingDesign"
                      value={option.value}
                      checked={data.hasExistingDesign === option.value}
                      onChange={() =>
                        setField(
                          "hasExistingDesign",
                          option.value as BriefFormData["hasExistingDesign"],
                        )
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </BriefChoiceGroup>
          </div>
        );

      default:
        return (
          <div className="brief-form-grid">
            <p className="brief-review-lede brief-field--full">{copy.reviewTitle}</p>

            <BriefField
              id={fieldId("budgetRange")}
              label={copy.labels.budgetRange}
              error={fieldError("budgetRange")}
            >
              <select
                id={fieldId("budgetRange")}
                className="brief-control"
                value={data.budgetRange}
                onChange={(event) => setField("budgetRange", event.target.value)}
                required
              >
                <option value="" disabled>
                  —
                </option>
                {copy.options.budgetRanges.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BriefField>

            <BriefField
              id={fieldId("timeline")}
              label={copy.labels.timeline}
              error={fieldError("timeline")}
            >
              <select
                id={fieldId("timeline")}
                className="brief-control"
                value={data.timeline}
                onChange={(event) => setField("timeline", event.target.value)}
                required
              >
                <option value="" disabled>
                  —
                </option>
                {copy.options.timelines.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BriefField>

            <BriefField
              id={fieldId("description")}
              label={copy.labels.description}
              className="brief-field--full"
              error={fieldError("description")}
            >
              <textarea
                id={fieldId("description")}
                className="brief-control brief-control--area"
                value={data.description}
                onChange={(event) => setField("description", event.target.value)}
                placeholder={copy.placeholders.description}
                rows={5}
                required
              />
            </BriefField>

            <BriefField id={fieldId("referenceUrl")} label={copy.labels.referenceUrl} className="brief-field--full">
              <input
                id={fieldId("referenceUrl")}
                className="brief-control"
                type="url"
                value={data.referenceUrl}
                onChange={(event) => setField("referenceUrl", event.target.value)}
                placeholder={copy.placeholders.referenceUrl}
                dir="ltr"
              />
            </BriefField>

            <BriefField id={fieldId("heardFrom")} label={copy.labels.heardFrom} className="brief-field--full">
              <select
                id={fieldId("heardFrom")}
                className="brief-control"
                value={data.heardFrom}
                onChange={(event) => setField("heardFrom", event.target.value)}
              >
                <option value="">—</option>
                {copy.options.heardFrom.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </BriefField>

            <label
              className="brief-check brief-check--consent brief-field--full"
              htmlFor={fieldId("consent")}
            >
              <input
                id={fieldId("consent")}
                type="checkbox"
                checked={data.consent}
                onChange={(event) => setField("consent", event.target.checked)}
              />
              <span>{copy.consent}</span>
            </label>
            {fieldError("consent") ? (
              <span className="brief-error brief-field--full">{fieldError("consent")}</span>
            ) : null}

            <label className="brief-check brief-field--full" htmlFor={fieldId("updatesOptIn")}>
              <input
                id={fieldId("updatesOptIn")}
                type="checkbox"
                checked={data.updatesOptIn}
                onChange={(event) => setField("updatesOptIn", event.target.checked)}
              />
              <span>{copy.updatesOptIn}</span>
            </label>

            <input
              type="text"
              name="websiteAlt"
              value={data.websiteAlt}
              onChange={(event) => setField("websiteAlt", event.target.value)}
              className="brief-honeypot"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
          </div>
        );
    }
  };

  if (done) {
    return (
      <div className="brief-success">
        <p className="brief-success-eyebrow">{copy.eyebrow}</p>
        <h3 className="brief-success-title">{copy.success.title}</h3>
        <p className="brief-success-copy">{copy.success.message}</p>
        <button
          type="button"
          className="btn-primary brief-success-cta"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {copy.success.cta}
        </button>
      </div>
    );
  }

  return (
    <form className="brief-form" onSubmit={onSubmit} noValidate>
      <div className="brief-form-head">
        <div className="brief-head-meta">
          <span className="brief-step-count">
            {locale === "ar"
              ? `الخطوة ${step + 1} من ${copy.steps.length}`
              : `Step ${step + 1} of ${copy.steps.length}`}
          </span>
          <div
            className="brief-progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span className="brief-progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav className="brief-step-nav" aria-label={locale === "ar" ? "خطوات النموذج" : "Form steps"}>
          {copy.steps.map((item, index) => (
            <span
              key={item.title}
              className={`brief-step-chip${index === step ? " is-active" : ""}${index < step ? " is-done" : ""}`}
            >
              <span className="brief-step-chip-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="brief-step-chip-label">{item.title}</span>
            </span>
          ))}
        </nav>

        <div className="brief-step-copy">
          <h3 className="brief-step-title">{copy.steps[step]?.title}</h3>
          <p className="brief-step-desc">{copy.steps[step]?.description}</p>
        </div>
      </div>

      {renderStepFields()}

      {submitError ? <p className="brief-submit-error">{submitError}</p> : null}

      <div className="brief-form-actions">
        {step > 0 ? (
          <button type="button" className="btn-secondary brief-back" onClick={goBack}>
            {copy.actions.back}
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn-primary brief-next" disabled={submitting}>
          {submitting
            ? copy.actions.submitting
            : isLastStep
              ? copy.actions.submit
              : copy.actions.next}
        </button>
      </div>
    </form>
  );
}
