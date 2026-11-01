import type { ImageAsset } from '@/data/types';

const SRCSET_WIDTHS = [640, 1024, 1600] as const;

export function pexelsImage(
  id: string,
  alt: string,
  photographer: string,
  focalPoint = { x: 50, y: 50 },
): ImageAsset {
  return {
    src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb`,
    alt,
    width: 1600,
    height: 1067,
    focalPoint,
    photographer,
  };
}

export function buildSrcSet(src: string): string {
  return SRCSET_WIDTHS.map((w) => `${imageUrl(src, w)} ${w}w`).join(', ');
}

export function imageUrl(src: string, width: number): string {
  return `${src}&w=${width}`;
}
