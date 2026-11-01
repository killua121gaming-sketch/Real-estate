import type { DetailShot } from '@/data/types';
import { pexelsImage as img } from '@/lib/image';

export const heroImage = img(
  '40090206',
  'A grand mansion illuminated at night, reflected in calm water',
  'Ivan Pozdnyakov',
  { x: 50, y: 40 },
);

export const philosophyImage = img(
  '37989319',
  'A garden with vibrant green plants and a modern house in the background',
  'Gosia K',
  { x: 50, y: 50 },
);

export const detailShots: DetailShot[] = [
  {
    id: 'marble',
    caption: 'Honed Carrara marble, book-matched across the wall.',
    image: img('5623203', 'Elegant white marble texture with soft veining', 'Piyapong Sayduang', { x: 50, y: 50 }),
  },
  {
    id: 'oak',
    caption: 'Wide-plank oak, brushed to show the grain.',
    image: img('13668353', 'Close-up of sunlit wooden stairs with shadow play', 'Jan van der Wolf', { x: 50, y: 50 }),
  },
  {
    id: 'glass',
    caption: 'Low-iron glass that disappears into the landscape.',
    image: img('19107852', 'Contemporary glass facade reflecting a blue sky', 'Ramon Perucho', { x: 50, y: 40 }),
  },
  {
    id: 'lighting',
    caption: 'Hand-blown pendants hung at varying heights over the table.',
    image: img('15029042', 'Close-up of a contemporary spherical pendant lamp with warm light', 'Marta Dzedyshko', { x: 50, y: 50 }),
  },
  {
    id: 'stone',
    caption: 'Limestone walls, left rough at the base of the house.',
    image: img('12106848', 'Detailed close-up of a beige stone surface with natural texture', 'Engin Akyurt', { x: 50, y: 50 }),
  },
  {
    id: 'timber',
    caption: 'Reclaimed timber panels, cut and set by hand.',
    image: img('911820', 'Detailed close-up of wooden steps showing the grain and texture of the wood', 'Steve A Johnson', { x: 50, y: 50 }),
  },
];
