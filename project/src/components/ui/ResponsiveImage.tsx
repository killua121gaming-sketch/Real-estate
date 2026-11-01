import { useState } from 'react';
import type { ImageAsset } from '@/data/types';
import { buildSrcSet, imageUrl } from '@/lib/image';

interface ResponsiveImageProps {
  image: ImageAsset;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'auto';
  className?: string;
}

export default function ResponsiveImage({
  image,
  sizes = '100vw',
  loading = 'lazy',
  fetchPriority = 'auto',
  className = '',
}: ResponsiveImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  if (failedSrc === image.src) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`flex h-full w-full items-center justify-center bg-charcoal ${className}`}
      >
        <span className="eyebrow">Image unavailable</span>
      </div>
    );
  }

  const loaded = loadedSrc === image.src;

  return (
    <img
      src={imageUrl(image.src, 1024)}
      srcSet={buildSrcSet(image.src)}
      sizes={sizes}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onLoad={() => setLoadedSrc(image.src)}
      onError={() => setFailedSrc(image.src)}
      style={{ objectPosition: `${image.focalPoint.x}% ${image.focalPoint.y}%` }}
      className={`h-full w-full bg-charcoal object-cover transition-opacity duration-700 ease-lux ${
        loaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  );
}
