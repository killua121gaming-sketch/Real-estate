import { Link } from 'react-router-dom';
import Wordmark from '@/components/layout/Wordmark';
import Reveal from '@/components/ui/Reveal';
import { properties } from '@/data/properties';
import { credits } from '@/data/credits';
import { NAV_ITEMS, scrollToSection } from '@/lib/navigation';

export default function SiteFooter() {
  return (
    <footer className="border-t border-champagne/20 bg-charcoal">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-16 lg:grid-cols-12 lg:px-12">
        <Reveal className="lg:col-span-4">
          <Wordmark />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/80">
            Step inside extraordinary. Fine residences, quietly presented.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-3">
          <nav aria-label="Footer">
            <p className="eyebrow mb-5">Explore</p>
            <ul className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className="inline-flex min-h-[44px] items-center text-sm text-ivory/85 transition-colors duration-300 ease-lux hover:text-champagne"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
        <Reveal delay={0.2} className="lg:col-span-5">
          <p className="eyebrow mb-5">Residences</p>
          <ul className="flex flex-col gap-1">
            {properties.map((property) => (
              <li key={property.slug}>
                <Link
                  to={`/residence/${property.slug}`}
                  className="inline-flex min-h-[44px] items-center text-sm text-ivory/85 transition-colors duration-300 ease-lux hover:text-champagne"
                >
                  {property.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <div className="border-t border-champagne/15">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-6 py-8 text-xs leading-relaxed text-ivory/70 lg:px-12">
          <p>
            Fictional portfolio demo. All properties, prices, locations, and agency details on this site are invented.
          </p>
          <p>
            Photography: {credits.join(', ')}, via{' '}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noreferrer"
              className="text-champagne underline-offset-4 hover:underline"
            >
              Pexels
            </a>
            . Full credits in CREDITS.md.
          </p>
          <p>&copy; {new Date().getFullYear()} Aurel Estates. Demonstration only.</p>
        </div>
      </div>
    </footer>
  );
}
