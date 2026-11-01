import { lazy, Suspense, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import { properties } from '@/data/properties';
import { heroImage } from '@/data/details';
import { imageUrl } from '@/lib/image';
import { scrollToSection } from '@/lib/navigation';

const HeroRippleCanvas = lazy(() => import('@/components/home/HeroRippleCanvas'));

const FEATURED = properties[0];

export default function Hero() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [rippleReady, setRippleReady] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = imageUrl(heroImage.src, 1600);
    link.setAttribute('imagesrcset', `${imageUrl(heroImage.src, 1024)} 1024w, ${imageUrl(heroImage.src, 1600)} 1600w`);
    link.setAttribute('imagesizes', '100vw');
    document.head.appendChild(link);
    return () => link.remove();
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative min-h-[calc(100svh-5rem)] w-full overflow-hidden bg-obsidian"
    >
      <div className={`absolute inset-0 ${reduceMotion ? '' : 'animate-kenburns'}`}>
        <ResponsiveImage
          image={heroImage}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0"
        />
        {!reduceMotion && (
          <Suspense fallback={null}>
            <HeroRippleCanvas
              src={heroImage.src}
              onReady={() => setRippleReady(true)}
              className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-lux ${
                rippleReady ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </Suspense>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/40 to-obsidian pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/70 via-obsidian/20 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1440px] flex-col justify-end px-6 pb-24 pt-32 lg:px-12 lg:pb-28">
        <p className="eyebrow mb-6">Residences of Distinction</p>
        <h1 id="hero-title" className="pointer-events-auto max-w-4xl font-display text-5xl leading-[1.05] text-ivory heading-tint md:text-7xl lg:text-8xl">
          Architecture. Atmosphere. Extraordinary Living.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-ivory/90 md:text-lg">
          Discover exceptional residences designed for those who appreciate the art of living.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(`/residence/${FEATURED.slug}`)}
            className="btn-primary pointer-events-auto"
          >
            Explore Residence
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollToSection('residences')} className="btn-ghost pointer-events-auto">
            Discover Our Collection
          </button>
        </div>
      </div>

      <a
        href="#residences"
        onClick={(event) => {
          event.preventDefault();
          scrollToSection('residences');
        }}
        aria-label="Scroll to residences"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/80 transition-colors duration-300 ease-lux hover:text-champagne md:flex"
      >
        <span className="eyebrow text-[10px] text-ivory/70">Scroll</span>
        <span className="block h-10 w-px origin-top animate-cue bg-champagne" aria-hidden="true" />
      </a>
    </section>
  );
}
