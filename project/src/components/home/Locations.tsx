import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { locations } from '@/data/locations';
import { properties } from '@/data/properties';
import { EASE_LUX } from '@/lib/motion';
import Reveal from '@/components/ui/Reveal';

export default function Locations() {
  return (
    <section id="locations" aria-labelledby="locations-title" className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <header className="mb-16 flex max-w-2xl flex-col gap-6">
            <p className="eyebrow">Exceptional Locations</p>
            <h2 id="locations-title" className="font-display text-4xl leading-tight heading-tint md:text-5xl">
              Four places, each with its own pace.
            </h2>
          </header>
        </Reveal>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {locations.map((location, index) => {
            const property = properties.find((item) => item.slug === location.propertySlug);
            return (
              <motion.li
                key={location.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE_LUX, delay: index * 0.08 }}
              >
                <Link
                  to={`/residence/${location.propertySlug}`}
                  aria-label={`${location.name}: view ${property?.name ?? 'residence'}`}
                  className="group flex h-full flex-col overflow-hidden border border-champagne/20 bg-obsidian transition-colors duration-300 ease-lux hover:border-champagne/60"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <div className="h-full w-full animate-kenburns">
                      <ResponsiveImage
                        image={location.image}
                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                        className="transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-2xl transition-colors duration-500 ease-lux group-hover:text-champagne">{location.name}</h3>
                      <ArrowUpRight className="h-5 w-5 text-champagne transition-transform duration-300 ease-lux group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </div>
                    <p className="text-sm leading-relaxed text-ivory/75">{location.tagline}</p>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
