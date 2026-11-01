import { createContext, useContext } from 'react';

export interface AmbientSoundValue {
  playing: boolean;
  toggle: () => void;
}

export const AmbientSoundContext = createContext<AmbientSoundValue | null>(null);

export function useAmbientSound(): AmbientSoundValue {
  const value = useContext(AmbientSoundContext);
  if (!value) throw new Error('useAmbientSound must be used within AmbientSoundProvider');
  return value;
}
