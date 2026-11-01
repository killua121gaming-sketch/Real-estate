import { useCallback, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import RoomSelector from '@/components/residence/RoomSelector';
import RoomStage from '@/components/residence/RoomStage';
import SoundToggle from '@/components/ui/SoundToggle';
import type { Property } from '@/data/types';
import { formatFacts, formatPrice } from '@/lib/format';
import { EASE_LUX, staggerChildren } from '@/lib/motion';
import { imageUrl } from '@/lib/image';

interface ResidenceExperienceProps {
  property: Property;
}

const lineVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_LUX } },
};

export default function ResidenceExperience({ property }: ResidenceExperienceProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rooms = property.rooms;

  const requestedRoom = searchParams.get('room');
  const activeIndex = Math.max(0, rooms.findIndex((room) => room.id === requestedRoom));
  const room = rooms[activeIndex];
  const nextRoom = rooms[(activeIndex + 1) % rooms.length];

  const selectRoom = useCallback(
    (index: number) => {
      const target = rooms[index];
      if (!target) return;
      setSearchParams(
        (previous) => {
          const params = new URLSearchParams(previous);
          params.set('room', target.id);
          return params;
        },
        { replace: true },
      );
    },
    [rooms, setSearchParams],
  );

  const goBack = useCallback(() => {
    if (location.key !== 'default') navigate(-1);
    else navigate('/');
  }, [location.key, navigate]);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (requestedRoom !== room.id) selectRoom(activeIndex);
  }, [requestedRoom, room.id, activeIndex, selectRoom]);

  useEffect(() => {
    const preload = new Image();
    preload.src = imageUrl(nextRoom.image.src, 1600);
  }, [nextRoom.image.src]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, select')) return;
      if (event.key === 'ArrowRight') selectRoom((activeIndex + 1) % rooms.length);
      else if (event.key === 'ArrowLeft') selectRoom((activeIndex - 1 + rooms.length) % rooms.length);
      else if (event.key === 'Escape') goBack();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, rooms.length, selectRoom, goBack]);

  const handleHotspot = (roomId: string) => {
    selectRoom(rooms.findIndex((item) => item.id === roomId));
  };

  return (
    <motion.main
      id="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_LUX }}
      className="relative h-[100svh] min-h-[680px] overflow-hidden bg-obsidian text-ivory"
    >
      <RoomStage room={room} onHotspot={handleHotspot} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-obsidian/75 via-transparent to-obsidian/90" aria-hidden="true" />

      <header className="absolute inset-x-0 top-0 z-20 flex flex-col gap-6 px-6 pt-8 sm:flex-row sm:items-start sm:justify-between lg:px-12">
        <div className="flex flex-col gap-2">
          <p className="eyebrow">{property.location}</p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-4xl leading-tight heading-tint focus:outline-none md:text-5xl"
          >
            {property.name}
          </h1>
        </div>
        <div className="flex items-center gap-2 self-start">
          <SoundToggle />
          <button
            type="button"
            onClick={goBack}
            className="btn-ghost bg-obsidian/40 backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to collection
          </button>
        </div>
      </header>

      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-8 px-6 pb-8 lg:px-12 lg:pb-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            key={room.id}
            variants={staggerChildren}
            initial="hidden"
            animate="visible"
            className="flex max-w-xl flex-col gap-4 lg:col-span-7"
          >
            <motion.p variants={lineVariants} className="eyebrow">
              Room {String(activeIndex + 1).padStart(2, '0')} of {String(rooms.length).padStart(2, '0')}
            </motion.p>
            <motion.h2 variants={lineVariants} aria-live="polite" className="font-display text-3xl heading-tint md:text-5xl">
              {room.title}
            </motion.h2>
            <motion.p variants={lineVariants} className="text-base leading-relaxed text-ivory/90">
              {room.description}
            </motion.p>
          </motion.div>

          <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end lg:text-right">
            <p className="font-display text-3xl">{formatPrice(property.price)}</p>
            <p className="text-sm tracking-wide text-ivory/80">{formatFacts(property)}</p>
            <Link
              to={`/?property=${property.slug}#private-viewing`}
              className="self-start text-sm uppercase tracking-eyebrow text-champagne underline-offset-8 transition-colors duration-300 ease-lux hover:text-ivory hover:underline lg:self-end"
            >
              Request a private viewing
            </Link>
          </div>
        </div>

        <RoomSelector rooms={rooms} activeIndex={activeIndex} onSelect={selectRoom} />
      </div>
    </motion.main>
  );
}
