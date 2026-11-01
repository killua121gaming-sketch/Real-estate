import { useSearchParams } from 'react-router-dom';
import InquiryForm from '@/components/home/InquiryForm';
import Reveal from '@/components/ui/Reveal';
import { properties } from '@/data/properties';

export default function PrivateViewing() {
  const [searchParams] = useSearchParams();
  const requested = searchParams.get('property');
  const initialPropertySlug = properties.some((property) => property.slug === requested) ? requested ?? undefined : undefined;

  return (
    <section id="private-viewing" aria-labelledby="private-viewing-title" className="border-t border-champagne/15 bg-charcoal py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-12 lg:px-12">
        <Reveal className="lg:col-span-5">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">Private Viewing</p>
            <h2 id="private-viewing-title" className="font-display text-4xl leading-tight heading-tint md:text-5xl">
              See the house before anyone else does.
            </h2>
            <p className="max-w-md text-base leading-relaxed text-ivory/80">
              Request a private, unhurried viewing with one of our advisers. Tell us the residence and a date that suits
              you, and we will arrange the rest.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-7">
          <InquiryForm key={initialPropertySlug ?? 'default'} initialPropertySlug={initialPropertySlug} />
        </Reveal>
      </div>
    </section>
  );
}
