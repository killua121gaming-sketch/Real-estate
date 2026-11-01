import { larkspurRooms, solenneRooms, villaLucernaRooms, aureliaRooms } from '@/data/rooms';
import type { Property } from '@/data/types';
import { pexelsImage as img } from '@/lib/image';

export const properties: Property[] = [
  {
    slug: 'aurelia-residence',
    name: 'The Aurelia Residence',
    location: 'Beverly Hills, California',
    region: 'Beverly Hills',
    style: 'Contemporary Estate',
    price: 8_500_000,
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 7200,
    summary:
      'A stone and glass estate set behind clipped hedges, with a grand staircase, a marble kitchen, and an infinity pool that lights up after dark.',
    cardImage: img('40090206', 'A grand mansion illuminated at night, reflected in calm water', 'Ivan Pozdnyakov', { x: 50, y: 40 }),
    rooms: aureliaRooms,
  },
  {
    slug: 'solenne-cliff-house',
    name: 'The Solenne Cliff House',
    location: 'Malibu, California',
    region: 'Malibu',
    style: 'Cliffside Modern',
    price: 12_400_000,
    bedrooms: 4,
    bathrooms: 5,
    squareFeet: 5400,
    summary:
      'A cantilevered house on a rocky headland, with glass walls that hold the Pacific at every hour of the day.',
    cardImage: img('19764219', 'Architectural house perched on a cliff with an ocean view under a clear sky', 'Sean Gallagher', { x: 50, y: 50 }),
    rooms: solenneRooms,
  },
  {
    slug: 'larkspur-chalet',
    name: 'The Larkspur Chalet',
    location: 'Aspen, Colorado',
    region: 'Aspen',
    style: 'Mountain Modern',
    price: 6_750_000,
    bedrooms: 5,
    bathrooms: 6,
    squareFeet: 6100,
    summary:
      'Timber, stone, and mountain glass combine in a chalet set into a snowfield, with a great room built around a stone hearth.',
    cardImage: img('7746555', 'Snow-covered chalet nestled in the winter mountains', 'Max Vakhtbovych', { x: 50, y: 45 }),
    rooms: larkspurRooms,
  },
  {
    slug: 'villa-lucerna',
    name: 'Villa Lucerna',
    location: 'Lake Como, Italy',
    region: 'Lake Como',
    style: 'Lakeside Villa',
    price: 15_900_000,
    bedrooms: 6,
    bathrooms: 7,
    squareFeet: 9800,
    summary:
      'A classical villa of pale stone and green shutters, with a private lawn that runs down to the water.',
    cardImage: img('20412791', 'Classical villa on the shore of Lake Como surrounded by lush mountains', 'Alejandro Aznar', { x: 50, y: 50 }),
    rooms: villaLucernaRooms,
  },
];
