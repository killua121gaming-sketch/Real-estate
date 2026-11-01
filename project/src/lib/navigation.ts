export const NAV_ITEMS = [
  { label: 'Residences', id: 'residences' },
  { label: 'Philosophy', id: 'philosophy' },
  { label: 'Details', id: 'details' },
  { label: 'Locations', id: 'locations' },
  { label: 'Private Viewing', id: 'private-viewing' },
] as const;

export function scrollToSection(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
