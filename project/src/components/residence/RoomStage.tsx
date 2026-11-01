import { useRef, type PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import type { Room } from '@/data/types';
import { EASE_LUX } from '@/lib/motion';

interface RoomStageProps {
  room: Room;
  onHotspot: (roomId: string) => void;
}

export default function RoomStage({ room, onHotspot }: RoomStageProps) {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const shiftX = useSpring(useMotionValue(0), { stiffness: 50, damping: 22 });
  const shiftY = useSpring(useMotionValue(0), { stiffness: 50, damping: 22 });

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse' || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    shiftX.set(((event.clientX - rect.left) / rect.width - 0.5) * -24);
    shiftY.set(((event.clientY - rect.top) / rect.height - 0.5) * -16);
  };

  const origin = `${room.image.focalPoint.x}% ${room.image.focalPoint.y}%`;

  return (
    <div ref={frameRef} onPointerMove={handlePointerMove} className="absolute inset-0 overflow-hidden bg-obsidian">
      <AnimatePresence initial={false}>
        <motion.div
          key={room.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE_LUX }}
          className="absolute -inset-6"
        >
          <motion.div style={reduceMotion ? undefined : { x: shiftX, y: shiftY }} className="absolute inset-0">
            <div
              className={`absolute inset-0 ${reduceMotion ? '' : 'animate-kenburns'}`}
              style={{ transformOrigin: origin }}
            >
              <ResponsiveImage
                image={room.image}
                sizes="100vw"
                loading="eager"
                fetchPriority="high"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {room.hotspots.map((hotspot) => (
          <motion.button
            key={`${room.id}-${hotspot.targetRoom}`}
            type="button"
            aria-label={`Go to ${hotspot.label}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_LUX }}
            onClick={() => onHotspot(hotspot.targetRoom)}
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            className="group absolute z-10 flex min-h-[44px] min-w-[44px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          >
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-champagne/50 [animation-duration:3s]" aria-hidden="true" />
              <span className="relative h-3 w-3 rounded-full border border-ivory bg-champagne shadow-[0_0_0_4px_rgba(23,25,27,0.35)] transition-transform duration-300 ease-lux group-hover:scale-125" />
            </span>
            <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap bg-obsidian/90 px-3 py-1.5 text-xs tracking-wide text-ivory opacity-0 transition-opacity duration-300 ease-lux group-hover:opacity-100 group-focus-visible:opacity-100">
              {hotspot.label}
            </span>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
