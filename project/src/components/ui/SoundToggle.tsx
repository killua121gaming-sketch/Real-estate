import { Volume2, VolumeX } from 'lucide-react';
import { useAmbientSound } from '@/hooks/useAmbientSound';

export default function SoundToggle() {
  const { playing, toggle } = useAmbientSound();
  const label = playing ? 'Mute ambient sound' : 'Play ambient sound';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={label}
      title={label}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center transition-colors duration-300 ease-lux hover:text-champagne focus-visible:outline-champagne ${
        playing ? 'text-champagne' : 'text-ivory/70'
      }`}
    >
      {playing ? <Volume2 className="h-4 w-4" aria-hidden="true" /> : <VolumeX className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
