import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import MobileMenu from '@/components/layout/MobileMenu';
import Wordmark from '@/components/layout/Wordmark';
import SoundToggle from '@/components/ui/SoundToggle';
import { NAV_ITEMS, scrollToSection } from '@/lib/navigation';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-lux ${
          scrolled ? 'border-champagne/25 bg-obsidian' : 'border-champagne/15 bg-obsidian'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          <Wordmark />
          <div className="flex items-center gap-2 md:gap-6 lg:gap-8">
            <nav aria-label="Primary" className="hidden md:block">
              <ul className="flex items-center gap-8 lg:gap-10">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className="link-underline text-sm tracking-wide text-ivory/85 transition-colors duration-300 ease-lux hover:text-champagne"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <SoundToggle />
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center text-ivory transition-colors duration-300 ease-lux hover:text-champagne md:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
