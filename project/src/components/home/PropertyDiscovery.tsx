import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Reveal from '@/components/ui/Reveal';
import { properties } from '@/data/properties';
import type { Property } from '@/data/types';
import { formatFacts, formatPrice } from '@/lib/format';
import { EASE_LUX } from '@/lib/motion';

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const to = `/residence/${property.slug}`;
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE_LUX }}
      className="grid gap-8 border-t border-champagne/20 pt-12 lg:grid-cols-12 lg:gap-12"
    >
      <Link
        to={to}
        aria-label={`Explore ${property.name}`}
        className={`group relative block aspect-[4/3] overflow-hidden bg-charcoal sm:aspect-[16/10] lg:col-span-8 lg:aspect-[16/9] ${
          index % 2 === 1 ? 'lg:order-2' : ''
        }`}
      >
        <motion.div
          initial={{ clipPath: 'inset(10% 8% 10% 8%)', scale: 1.08 }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: EASE_LUX }}
          className="h-full w-full"
        >
          <div className="h-full w-full animate-kenburns">
            <ResponsiveImage
              image={property.cardImage}
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.03]"
            />
          </div>
        </motion.div>
        <span className="absolute left-5 top-5 bg-obsidian/70 px-3 py-1.5 text-[11px] uppercase tracking-eyebrow text-ivory backdrop-blur-sm">
          {property.style}
        </span>
      </Link>

      <div className={`flex flex-col justify-between gap-8 lg:col-span-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div className="flex flex-col gap-4">
          <p className="eyebrow">{property.location}</p>
          <h3 className="font-display text-4xl leading-[1.1] md:text-5xl">
            <Link to={to} className="heading-tint">
              {property.name}
            </Link>
          </h3>
          <p className="text-base leading-relaxed text-ivory/80">{property.summary}</p>
        </div>
        <div className="flex flex-col gap-6">
          <p className="font-display text-3xl text-ivory">{formatPrice(property.price)}</p>
          <p className="text-sm tracking-wide text-ivory/70">{formatFacts(property)}</p>
          <Link to={to} className="btn-ghost self-start">
            Explore Residence
            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-lux group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function PropertyDiscovery() {
  return (
    <section id="residences" aria-labelledby="residences-title" className="bg-obsidian py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <header className="mb-20 flex max-w-3xl flex-col gap-6">
            <p className="eyebrow">Residences</p>
            <h2 id="residences-title" className="font-display text-4xl leading-tight heading-tint md:text-6xl">
              A collection of houses, each one shaped by its place.
            </h2>
          </header>
        </Reveal>
        <div className="flex flex-col gap-24 md:gap-32">
          {properties.map((property, index) => (
            <PropertyCard key={property.slug} property={property} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
