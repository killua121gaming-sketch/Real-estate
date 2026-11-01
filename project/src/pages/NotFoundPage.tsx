import { Link } from 'react-router-dom';
import Wordmark from '@/components/layout/Wordmark';

export default function NotFoundPage() {
  return (
    <main id="main" className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-obsidian px-6 text-center">
      <Wordmark />
      <div className="flex max-w-lg flex-col gap-4">
        <p className="eyebrow">Not Found</p>
        <h1 className="font-display text-4xl md:text-5xl">We could not find that page.</h1>
        <p className="text-ivory/80">The residence or room you were looking for may have moved or never existed.</p>
      </div>
      <Link to="/" className="btn-primary">
        Return to the collection
      </Link>
    </main>
  );
}
