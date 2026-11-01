import { useParams } from 'react-router-dom';
import ResidenceExperience from '@/components/residence/ResidenceExperience';
import NotFoundPage from '@/pages/NotFoundPage';
import { properties } from '@/data/properties';

export default function ResidencePage() {
  const { slug } = useParams();
  const property = properties.find((item) => item.slug === slug);
  if (!property) return <NotFoundPage />;
  return <ResidenceExperience key={property.slug} property={property} />;
}
