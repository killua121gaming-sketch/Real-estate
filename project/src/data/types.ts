export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint: { x: number; y: number };
  photographer: string;
}

export interface Hotspot {
  x: number;
  y: number;
  targetRoom: string;
  label: string;
}

export interface Room {
  id: string;
  title: string;
  description: string;
  image: ImageAsset;
  hotspots: Hotspot[];
}

export interface Property {
  slug: string;
  name: string;
  location: string;
  region: string;
  style: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  summary: string;
  cardImage: ImageAsset;
  rooms: Room[];
}

export interface Location {
  id: string;
  name: string;
  propertySlug: string;
  tagline: string;
  image: ImageAsset;
}

export interface DetailShot {
  id: string;
  caption: string;
  image: ImageAsset;
}
