import { motion } from 'framer-motion';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { philosophyImage } from '@/data/details';
import { EASE_LUX } from '@/lib/motion';

export default function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="bg-charcoal py-24 md:py-32">
      <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-6 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE_LUX }}
          className="flex flex-col gap-8 lg:col-span-5"
        >
          <p className="eyebrow">Our Philosophy</p>
          <h2 id="philosophy-title" className="font-display text-4xl leading-tight heading-tint md:text-5xl">
            Good architecture slows you down in the right way.
          </h2>
          <div className="flex flex-col gap-5 text-base leading-relaxed text-ivory/80">
            <p>
              We believe a great house is measured by how it holds light, how it frames weather, and how quietly it
              receives the people who live in it.
            </p>
            <p>
              Every residence we present is chosen for its proportions, its materials, and the way it meets the ground.
              We show them as they are, without ornament, so you can judge the house itself.
            </p>
          </div>
          <div className="hairline mt-4 grid grid-cols-2 gap-8 p-6">
            <div>
              <p className="font-display text-4xl text-ivory">12</p>
              <p className="eyebrow mt-2 text-[10px]">Years of curation</p>
            </div>
            <div>
              <p className="font-display text-4xl text-ivory">04</p>
              <p className="eyebrow mt-2 text-[10px]">Signature regions</p>
            </div>
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, clipPath: 'inset(8% 8% 8% 8%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: EASE_LUX }}
          className="relative lg:col-span-7"
        >
          <div className="aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-[5/4] lg:aspect-[4/3]">
            <div className="h-full w-full animate-kenburns">
              <ResponsiveImage image={philosophyImage} sizes="(min-width: 1024px) 58vw, 100vw" className="h-full" />
            </div>
          </div>
          <figcaption className="mt-4 text-xs tracking-wide text-ivory/60">{philosophyImage.alt}</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
