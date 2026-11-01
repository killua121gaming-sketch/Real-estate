import { properties } from '@/data/properties';
import { locations } from '@/data/locations';
import { detailShots, heroImage, philosophyImage } from '@/data/details';
import type { ImageAsset } from '@/data/types';

const allImages = (): ImageAsset[] => [
  heroImage,
  philosophyImage,
  ...properties.flatMap((property) => [property.cardImage, ...property.rooms.map((room) => room.image)]),
  ...locations.map((location) => location.image),
  ...detailShots.map((shot) => shot.image),
];

export const credits: string[] = [...new Set(allImages().map((image) => image.photographer))].sort();
