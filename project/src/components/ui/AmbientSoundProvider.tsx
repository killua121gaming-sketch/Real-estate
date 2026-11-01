import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AmbientSoundContext } from '@/hooks/useAmbientSound';

const FADE_SECONDS = 2.5;
const MASTER_LEVEL = 0.06;
const PAD_FREQUENCIES = [110, 164.81, 220, 277.18];

interface AmbientEngine {
  context: AudioContext;
  master: GainNode;
}

function createEngine(): AmbientEngine {
  const context = new AudioContext();
  const now = context.currentTime;

  const master = context.createGain();
  master.gain.setValueAtTime(0, now);
  master.gain.linearRampToValueAtTime(MASTER_LEVEL, now + FADE_SECONDS);
  master.connect(context.destination);

  const filter = context.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 900;
  filter.connect(master);

  PAD_FREQUENCIES.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const voice = context.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    oscillator.detune.value = index % 2 === 0 ? -5 : 5;
    voice.gain.value = 0.25;
    oscillator.connect(voice);
    voice.connect(filter);
    oscillator.start(now);
  });

  const breath = context.createOscillator();
  const breathDepth = context.createGain();
  breath.frequency.value = 0.05;
  breathDepth.gain.value = 0.015;
  breath.connect(breathDepth);
  breathDepth.connect(master.gain);
  breath.start(now);

  return { context, master };
}

export default function AmbientSoundProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<AmbientEngine | null>(null);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engineRef.current = null;
    const now = engine.context.currentTime;
    engine.master.gain.cancelScheduledValues(now);
    engine.master.gain.setValueAtTime(engine.master.gain.value, now);
    engine.master.gain.linearRampToValueAtTime(0, now + FADE_SECONDS);
    window.setTimeout(() => void engine.context.close(), FADE_SECONDS * 1000 + 200);
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (engineRef.current) {
      stop();
      return;
    }
    engineRef.current = createEngine();
    setPlaying(true);
  }, [stop]);

  useEffect(() => stop, [stop]);

  const value = useMemo(() => ({ playing, toggle }), [playing, toggle]);

  return <AmbientSoundContext.Provider value={value}>{children}</AmbientSoundContext.Provider>;
}
