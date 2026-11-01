import type { Location } from '@/data/types';
import { pexelsImage as img } from '@/lib/image';

export const locations: Location[] = [
  {
    id: 'beverly-hills',
    name: 'Beverly Hills',
    propertySlug: 'aurelia-residence',
    tagline: 'Tree-lined avenues and quiet estates minutes from the city.',
    image: img('34276901', 'The Beverly Hills sign framed by lush greenery on a sunny day', 'Simon Steiner'),
  },
  {
    id: 'malibu',
    name: 'Malibu',
    propertySlug: 'solenne-cliff-house',
    tagline: 'Headland houses above a coastline that changes colour by the hour.',
    image: img('4601197', 'House perched on rocky cliffs overlooking the Pacific Ocean', 'Jacob O', { x: 50, y: 60 }),
  },
  {
    id: 'aspen',
    name: 'Aspen',
    propertySlug: 'larkspur-chalet',
    tagline: 'Alpine villages, winter light, and chalets at the edge of the forest.',
    image: img('11616132', 'A modern cabin in a snowy forest at twilight, surrounded by mountains', 'Chris F', { x: 50, y: 50 }),
  },
  {
    id: 'lake-como',
    name: 'Lake Como',
    propertySlug: 'villa-lucerna',
    tagline: 'Historic villas and still water between the Lombard hills.',
    image: img('32716815', 'Villas by Lake Como surrounded by lush mountains under a clear blue sky', 'Sam A', { x: 50, y: 55 }),
  },
];
