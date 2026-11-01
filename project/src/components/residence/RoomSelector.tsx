import { ChevronLeft, ChevronRight } from 'lucide-react';
import ResponsiveImage from '@/components/ui/ResponsiveImage';
import type { Room } from '@/data/types';

interface RoomSelectorProps {
  rooms: Room[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const arrowClass =
  'inline-flex h-11 w-11 shrink-0 items-center justify-center border border-ivory/40 bg-obsidian/40 text-ivory backdrop-blur-sm transition-colors duration-300 ease-lux hover:border-champagne hover:text-champagne';

export default function RoomSelector({ rooms, activeIndex, onSelect }: RoomSelectorProps) {
  const count = rooms.length;
  return (
    <nav aria-label="Rooms" className="flex items-center gap-3">
      <button
        type="button"
        aria-label="Previous room"
        onClick={() => onSelect((activeIndex - 1 + count) % count)}
        className={arrowClass}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <ul className="flex min-w-0 flex-1 snap-x gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {rooms.map((room, index) => {
          const active = index === activeIndex;
          return (
            <li key={room.id} className="snap-start">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={active ? 'true' : undefined}
                className={`group flex min-h-[44px] w-[104px] flex-col gap-2 text-left transition-opacity duration-300 ease-lux md:w-[128px] ${
                  active ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span
                  className={`block aspect-[16/10] overflow-hidden border ${
                    active ? 'border-champagne' : 'border-ivory/20 group-hover:border-champagne/60'
                  } transition-colors duration-300 ease-lux`}
                >
                  <ResponsiveImage image={room.image} sizes="128px" className="h-full w-full" />
                </span>
                <span
                  className={`truncate text-[11px] uppercase tracking-eyebrow ${active ? 'text-champagne' : 'text-ivory'}`}
                >
                  {room.title}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        aria-label="Next room"
        onClick={() => onSelect((activeIndex + 1) % count)}
        className={arrowClass}
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  );
}
