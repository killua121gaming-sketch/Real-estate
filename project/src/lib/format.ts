import type { Property } from '@/data/types';

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

export const formatSquareFeet = (value: number) =>
  `${new Intl.NumberFormat('en-US').format(value)} Sq Ft`;

export const formatFacts = (property: Pick<Property, 'bedrooms' | 'bathrooms' | 'squareFeet'>) =>
  [
    `${property.bedrooms} Bedrooms`,
    `${property.bathrooms} Bathrooms`,
    formatSquareFeet(property.squareFeet),
  ].join(' | ');
