import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { properties } from '@/data/properties';
import {
  FORM_ENDPOINT,
  buildMailtoHref,
  submitInquiry,
  validateInquiry,
  type InquiryErrors,
  type InquiryValues,
} from '@/lib/inquiry';

type FormStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'prepared'; mailto: string }
  | { kind: 'sent' }
  | { kind: 'failed' };

interface InquiryFormProps {
  initialPropertySlug?: string;
}

const today = () => {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
};

const fieldClass =
  'w-full min-h-[44px] border border-champagne/40 bg-obsidian/60 px-4 py-3 text-ivory placeholder:text-ivory/40 transition-colors duration-300 ease-lux focus:border-champagne focus:outline-none aria-[invalid=true]:border-[#E4A08A]';

export default function InquiryForm({ initialPropertySlug }: InquiryFormProps) {
  const [values, setValues] = useState<InquiryValues>({
    name: '',
    email: '',
    date: '',
    message: '',
    propertySlug: initialPropertySlug ?? properties[0].slug,
  });
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle' });

  const update = (field: keyof InquiryValues) => (event: { target: { value: string } }) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const selected = properties.find((property) => property.slug === values.propertySlug) ?? properties[0];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.kind === 'submitting') return;

    const nextErrors = validateInquiry(values, today());
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      document.getElementById(`inquiry-${firstInvalid}`)?.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      setStatus({ kind: 'prepared', mailto: buildMailtoHref(values, selected.name) });
      return;
    }

    setStatus({ kind: 'submitting' });
    try {
      await submitInquiry(FORM_ENDPOINT, { ...values, propertySlug: selected.slug });
      setStatus({ kind: 'sent' });
    } catch {
      setStatus({ kind: 'failed' });
    }
  };

  if (status.kind === 'prepared') {
    return (
      <div role="status" className="flex flex-col gap-6 border border-champagne/30 bg-obsidian/60 p-8">
        <CheckCircle2 className="h-8 w-8 text-champagne" aria-hidden="true" />
        <div className="flex flex-col gap-3">
          <h3 className="font-display text-3xl">Your inquiry is prepared.</h3>
          <p className="text-ivory/85">
            This is a demo, so it has not been sent. Nothing has left this browser. To send your request, open it in your
            email app using the button below.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={status.mailto} className="btn-primary">
            Open in email app
          </a>
          <button type="button" className="btn-ghost" onClick={() => setStatus({ kind: 'idle' })}>
            Edit my inquiry
          </button>
        </div>
      </div>
    );
  }

  if (status.kind === 'sent') {
    return (
      <div role="status" className="flex flex-col gap-6 border border-champagne/30 bg-obsidian/60 p-8">
        <CheckCircle2 className="h-8 w-8 text-champagne" aria-hidden="true" />
        <h3 className="font-display text-3xl">Thank you. Your inquiry has been sent.</h3>
        <p className="text-ivory/85">Our private viewing desk will reply to {values.email.trim()} shortly.</p>
      </div>
    );
  }

  const submitting = status.kind === 'submitting';
  const describe = (field: keyof InquiryValues) => (errors[field] ? `inquiry-${field}-error` : undefined);

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2" aria-busy={submitting}>
      {status.kind === 'failed' && (
        <div role="alert" className="flex items-start gap-3 border border-[#E4A08A]/60 bg-obsidian/60 p-4 text-ivory md:col-span-2">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#E4A08A]" aria-hidden="true" />
          <p className="text-sm">
            We could not send your inquiry. Please check your connection and try again, or write to us directly.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-name" className="text-sm font-medium tracking-wide">
          Name
        </label>
        <input
          id="inquiry-name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describe('name')}
          className={fieldClass}
        />
        {errors.name && (
          <p id="inquiry-name-error" className="text-sm text-[#E4A08A]">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-email" className="text-sm font-medium tracking-wide">
          Email
        </label>
        <input
          id="inquiry-email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describe('email')}
          className={fieldClass}
        />
        {errors.email && (
          <p id="inquiry-email-error" className="text-sm text-[#E4A08A]">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-date" className="text-sm font-medium tracking-wide">
          Preferred viewing date
        </label>
        <input
          id="inquiry-date"
          name="date"
          type="date"
          min={today()}
          value={values.date}
          onChange={update('date')}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={describe('date')}
          className={`${fieldClass} [color-scheme:dark]`}
        />
        {errors.date && (
          <p id="inquiry-date-error" className="text-sm text-[#E4A08A]">
            {errors.date}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inquiry-propertySlug" className="text-sm font-medium tracking-wide">
          Residence
        </label>
        <select
          id="inquiry-propertySlug"
          name="propertySlug"
          value={values.propertySlug}
          onChange={update('propertySlug')}
          className={fieldClass}
        >
          {properties.map((property) => (
            <option key={property.slug} value={property.slug} className="bg-obsidian">
              {property.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 md:col-span-2">
        <label htmlFor="inquiry-message" className="text-sm font-medium tracking-wide">
          Message
        </label>
        <textarea
          id="inquiry-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describe('message')}
          className={`${fieldClass} resize-y`}
        />
        {errors.message && (
          <p id="inquiry-message-error" className="text-sm text-[#E4A08A]">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ivory/70">
          {FORM_ENDPOINT ? 'Your request will be sent to our private viewing desk.' : 'Demo form. Nothing is sent until connected.'}
        </p>
        <button type="submit" disabled={submitting} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60">
          {submitting ? 'Sending...' : 'Request viewing'}
        </button>
      </div>
    </form>
  );
}
