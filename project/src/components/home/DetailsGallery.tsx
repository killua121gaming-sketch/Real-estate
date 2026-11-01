import { motion } from 'framer-motion';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import Reveal from '@/components/ui/Reveal';
import { detailShots } from '@/data/details';
import { EASE_LUX } from '@/lib/motion';

const SPANS = [
  'md:col-span-7 md:row-span-2 aspect-[4/5] md:aspect-auto',
  'md:col-span-5 aspect-[4/3]',
  'md:col-span-4 aspect-square',
  'md:col-span-4 aspect-[4/5]',
  'md:col-span-4 aspect-[4/3]',
  'md:col-span-6 aspect-[16/9]',
];

export default function DetailsGallery() {
  return (
    <section id="details" aria-labelledby="details-title" className="bg-obsidian py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <header className="mb-16 flex max-w-2xl flex-col gap-6">
            <p className="eyebrow">Architecture and Details</p>
            <h2 id="details-title" className="font-display text-4xl leading-tight heading-tint md:text-5xl">
              The materials that carry the light.
            </h2>
          </header>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {detailShots.map((shot, index) => (
            <motion.figure
              key={shot.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE_LUX, delay: index * 0.05 }}
              tabIndex={0}
              className={`group relative overflow-hidden bg-charcoal focus-visible:outline-champagne ${SPANS[index]}`}
            >
              <div className="absolute inset-0 animate-kenburns">
                <ResponsiveImage
                  image={shot.image}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="transition-transform duration-[1200ms] ease-lux group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-obsidian/90 to-transparent px-6 pb-6 pt-16 text-sm leading-relaxed text-ivory opacity-0 transition-all duration-500 ease-lux group-hover:translate-y-0 group-hover:text-champagne group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:text-champagne group-focus-visible:opacity-100">
                {shot.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
