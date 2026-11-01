import { Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-3 text-ivory ${className}`}>
      <Landmark className="h-5 w-5 text-champagne transition-transform duration-500 ease-lux group-hover:-translate-y-0.5" aria-hidden="true" />
      <span className="font-display text-lg font-medium tracking-[0.32em]">AUREL ESTATES</span>
    </Link>
  );
}
