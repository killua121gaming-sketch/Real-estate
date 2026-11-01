export interface InquiryValues {
  name: string;
  email: string;
  date: string;
  message: string;
  propertySlug: string;
}

export type InquiryErrors = Partial<Record<keyof InquiryValues, string>>;

export const FORM_ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined)?.trim() || undefined;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInquiry(values: InquiryValues, today: string): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address, such as name@example.com.';
  if (!values.date) errors.date = 'Please choose a preferred viewing date.';
  else if (values.date < today) errors.date = 'Please choose a date today or later.';
  if (!values.message.trim()) errors.message = 'Please tell us a little about your visit.';
  return errors;
}

export function buildMailtoHref(values: InquiryValues, propertyName: string): string {
  const subject = `Private viewing request: ${propertyName}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Preferred date: ${values.date}`,
    `Residence: ${propertyName}`,
    '',
    values.message.trim(),
  ].join('\n');
  return `mailto:private@aurelestates.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function submitInquiry(endpoint: string, values: InquiryValues): Promise<void> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(values),
  });
  if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
}
