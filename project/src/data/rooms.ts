import type { Room } from '@/data/types';
import { pexelsImage as img } from '@/lib/image';

export const aureliaRooms: Room[] = [
  {
    id: 'exterior',
    title: 'Exterior',
    description:
      'A composed stone and glass facade, lit at dusk so the house reads as a single calm form against the sky.',
    image: img('40090206', 'A grand mansion illuminated at night, reflected in calm water', 'Ivan Pozdnyakov', { x: 50, y: 40 }),
    hotspots: [
      { x: 30, y: 60, targetRoom: 'entrance', label: 'Entrance' },
      { x: 70, y: 45, targetRoom: 'garden', label: 'Gardens' },
    ],
  },
  {
    id: 'entrance',
    title: 'Entrance',
    description:
      'Limestone steps and a tall oak door open onto a hall that is bright, quiet, and deliberately uncluttered.',
    image: img('16501684', 'Luxury mansion entryway with a checkered marble floor and curved staircase', 'Curtis Adams', { x: 50, y: 50 }),
    hotspots: [{ x: 60, y: 55, targetRoom: 'grand-foyer', label: 'Grand Foyer' }],
  },
  {
    id: 'grand-foyer',
    title: 'Grand Foyer',
    description:
      'A sculptural staircase rises under a crystal chandelier, the house’s first gesture of scale and light.',
    image: img('8092431', 'Spacious interior with a grand staircase and elegant chandelier', 'Max Vakhtbovych', { x: 50, y: 30 }),
    hotspots: [
      { x: 20, y: 65, targetRoom: 'living-room', label: 'Living Room' },
      { x: 80, y: 65, targetRoom: 'dining-room', label: 'Dining Room' },
    ],
  },
  {
    id: 'living-room',
    title: 'Living Room',
    description:
      'Deep sofas in warm neutrals face a fireplace wall, with linen drapes softening the light from tall windows.',
    image: img('8135492', 'Spacious modern living room with elegant chandeliers and a plush sofa', 'Max Vakhtbovych', { x: 50, y: 50 }),
    hotspots: [{ x: 75, y: 70, targetRoom: 'kitchen', label: 'Kitchen' }],
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    description:
      'A honed black marble island anchors a kitchen of dark walnut cabinetry and quiet, professional-grade fittings.',
    image: img('7587858', 'Contemporary kitchen with a large marble island and natural light', 'Max Vakhtbovych', { x: 40, y: 50 }),
    hotspots: [{ x: 65, y: 60, targetRoom: 'dining-room', label: 'Dining Room' }],
  },
  {
    id: 'dining-room',
    title: 'Dining Room',
    description:
      'A marble table seats twelve beneath a low pendant, set for long dinners that run past midnight.',
    image: img('6587894', 'Contemporary dining room with a marble table and comfortable chairs', 'Max Vakhtbovych', { x: 50, y: 55 }),
    hotspots: [{ x: 35, y: 35, targetRoom: 'terrace', label: 'Terrace' }],
  },
  {
    id: 'bedrooms',
    title: 'Bedrooms',
    description:
      'The principal suite is wrapped in soft, indirect light, with a tufted headboard and a view held back by linen.',
    image: img('3144580', 'Luxurious modern bedroom with elegant design, soft lighting and cozy bedding', 'Jonathan Borba', { x: 50, y: 50 }),
    hotspots: [{ x: 70, y: 40, targetRoom: 'bathrooms', label: 'Bathrooms' }],
  },
  {
    id: 'bathrooms',
    title: 'Bathrooms',
    description:
      'Book-matched marble walls, a freestanding tub, and a rain shower sit inside a room built for slow mornings.',
    image: img('6587852', 'Contemporary bathroom with marble walls and a glass shower under warm light', 'Max Vakhtbovych', { x: 50, y: 50 }),
    hotspots: [{ x: 30, y: 60, targetRoom: 'bedrooms', label: 'Bedrooms' }],
  },
  {
    id: 'garden',
    title: 'Garden',
    description:
      'Clipped hedges, lawn terraces, and mature trees frame the estate, designed to be seen from every window.',
    image: img('8082322', 'Beautiful mansion surrounded by lush greenery and a clear blue sky', 'Max Vakhtbovych', { x: 50, y: 40 }),
    hotspots: [{ x: 60, y: 70, targetRoom: 'infinity-pool', label: 'Infinity Pool' }],
  },
  {
    id: 'infinity-pool',
    title: 'Infinity Pool',
    description:
      'The pool is lit from below and seems to dissolve into the garden, with loungers set just far enough apart.',
    image: img('19075395', 'Elegant luxury villa with a beautifully lit pool at night', 'Ahmet ÇÖTÜR', { x: 50, y: 60 }),
    hotspots: [{ x: 80, y: 40, targetRoom: 'terrace', label: 'Terrace' }],
  },
  {
    id: 'terrace',
    title: 'Terrace',
    description:
      'A covered terrace with wicker seating and a long view over the water, made for afternoons that never quite end.',
    image: img('19084169', 'Luxury terrace with infinity pool and a breathtaking sea view', 'Ahmet ÇÖTÜR', { x: 60, y: 50 }),
    hotspots: [{ x: 25, y: 65, targetRoom: 'exterior', label: 'Exterior' }],
  },
];

export const solenneRooms: Room[] = [
  {
    id: 'exterior',
    title: 'Exterior',
    description: 'A cantilevered cliff house with glass walls that catch the Pacific at every hour.',
    image: img('19764219', 'Architectural house perched on a cliff with an ocean view under a clear sky', 'Sean Gallagher', { x: 50, y: 50 }),
    hotspots: [{ x: 70, y: 60, targetRoom: 'living-room', label: 'Living Room' }],
  },
  {
    id: 'living-room',
    title: 'Living Room',
    description: 'Open-plan living with a full-height window and an uninterrupted horizon.',
    image: img('7546323', 'Sleek and stylish modern living room with luxurious furniture', 'Max Vakhtbovych', { x: 50, y: 50 }),
    hotspots: [{ x: 30, y: 70, targetRoom: 'kitchen', label: 'Kitchen' }],
  },
  {
    id: 'kitchen',
    title: 'Kitchen',
    description: 'Wood-paneled cabinetry and black marble counters, arranged around a single long island.',
    image: img('35021550', 'Sleek modern kitchen with wood paneling and black marble countertops', 'Ajit Singh', { x: 50, y: 50 }),
    hotspots: [{ x: 75, y: 55, targetRoom: 'terrace', label: 'Terrace' }],
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description: 'A bedroom that opens directly to the sea, with pale oak floors and linen throughout.',
    image: img('6920600', 'A sleek bedroom with a gray upholstered bed and elegant lighting', 'Max Vakhtbovych', { x: 50, y: 50 }),
    hotspots: [{ x: 60, y: 60, targetRoom: 'terrace', label: 'Terrace' }],
  },
  {
    id: 'terrace',
    title: 'Terrace',
    description: 'A glass-railed terrace and infinity edge, cantilevered over the rocks below.',
    image: img('24805069', 'Luxurious outdoor terrace with a wooden deck during a beautiful sunset', 'Ahmet ÇÖTÜR', { x: 50, y: 50 }),
    hotspots: [{ x: 20, y: 60, targetRoom: 'exterior', label: 'Exterior' }],
  },
];

export const larkspurRooms: Room[] = [
  {
    id: 'exterior',
    title: 'Exterior',
    description: 'Timber and stone set into a snowfield, with a roofline that holds the winter light.',
    image: img('7746555', 'Snow-covered chalet nestled in the winter mountains', 'Max Vakhtbovych', { x: 50, y: 45 }),
    hotspots: [{ x: 65, y: 60, targetRoom: 'great-room', label: 'Great Room' }],
  },
  {
    id: 'great-room',
    title: 'Great Room',
    description: 'A double-height room with a stone hearth, oak beams, and a wall of mountain glass.',
    image: img('7166640', 'Bright and spacious living room with an elegant chandelier and cozy sofa', 'Max Vakhtbovych', { x: 50, y: 50 }),
    hotspots: [{ x: 30, y: 70, targetRoom: 'dining-room', label: 'Dining Room' }],
  },
  {
    id: 'dining-room',
    title: 'Dining Room',
    description: 'A long timber table set for eight, lit by an iron chandelier and framed by oak.',
    image: img('3935317', 'Bright dining area with dark wood furniture, large windows and a modern chandelier', 'Curtis Adams', { x: 50, y: 50 }),
    hotspots: [{ x: 70, y: 50, targetRoom: 'bedroom', label: 'Bedroom' }],
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description: 'A quiet bedroom with heavy linens, warm wood, and a window that frames the snowline.',
    image: img('6920600', 'Sleek bedroom with a gray upholstered bed and elegant lighting', 'Max Vakhtbovych', { x: 50, y: 50 }),
    hotspots: [{ x: 40, y: 60, targetRoom: 'terrace', label: 'Terrace' }],
  },
  {
    id: 'terrace',
    title: 'Terrace',
    description: 'A covered balcony with fireside seating and a view down the valley.',
    image: img('14286287', 'Contemporary outdoor seating area on a balcony with mountains in the background', 'Atlantic Ambience', { x: 50, y: 50 }),
    hotspots: [{ x: 25, y: 60, targetRoom: 'exterior', label: 'Exterior' }],
  },
];

export const villaLucernaRooms: Room[] = [
  {
    id: 'exterior',
    title: 'Exterior',
    description: 'A lakeside villa of pale stone and green shutters, facing the water across a private lawn.',
    image: img('20412791', 'Classical villa on the shore of Lake Como surrounded by lush mountains', 'Alejandro Aznar', { x: 50, y: 50 }),
    hotspots: [{ x: 70, y: 60, targetRoom: 'hall', label: 'Hall' }],
  },
  {
    id: 'hall',
    title: 'Hall',
    description: 'Stone columns and a marble-topped console welcome guests into a cool, high-ceilinged hall.',
    image: img('6957083', 'Spacious hallway of a classic villa with columns and a spiral staircase', 'Max Vakhtbovych', { x: 50, y: 50 }),
    hotspots: [{ x: 60, y: 60, targetRoom: 'dining-room', label: 'Dining Room' }],
  },
  {
    id: 'dining-room',
    title: 'Dining Room',
    description: 'A long dining room of classic proportions, with an iron chandelier over a timber table.',
    image: img('5998031', 'Cozy dining room in classic design with a wooden table and chairs', 'Max Vakhtbovych', { x: 50, y: 50 }),
    hotspots: [{ x: 30, y: 60, targetRoom: 'bedroom', label: 'Bedroom' }],
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    description: 'A bedroom in soft neutrals with a tall window that opens to the lake breeze.',
    image: img('7061089', 'Bedroom with a big bed with a soft headboard and lamps on nightstands', 'Max Vakhtbovych', { x: 50, y: 50 }),
    hotspots: [{ x: 70, y: 60, targetRoom: 'terrace', label: 'Terrace' }],
  },
  {
    id: 'terrace',
    title: 'Terrace',
    description: 'A stone terrace above the water, set with low seating for long afternoons on the lake.',
    image: img('9584741', 'Cozy terrace with a fireplace, seating and a view across the water', 'Nasim Didar', { x: 50, y: 50 }),
    hotspots: [{ x: 25, y: 60, targetRoom: 'exterior', label: 'Exterior' }],
  },
];
