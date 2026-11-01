import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteHeader from '@/components/layout/SiteHeader';
import Hero from '@/components/home/Hero';
import DetailsGallery from '@/components/home/DetailsGallery';
import Locations from '@/components/home/Locations';
import Philosophy from '@/components/home/Philosophy';
import PrivateViewing from '@/components/home/PrivateViewing';
import PropertyDiscovery from '@/components/home/PropertyDiscovery';

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <PropertyDiscovery />
        <Philosophy />
        <DetailsGallery />
        <Locations />
        <PrivateViewing />
      </main>
      <SiteFooter />
    </>
  );
}
