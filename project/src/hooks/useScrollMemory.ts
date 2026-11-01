import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export function useScrollMemory() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map<string, number>());
  const currentKey = useRef(location.key);

  useEffect(() => {
    const onScroll = () => positions.current.set(currentKey.current, window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    currentKey.current = location.key;
    if (location.hash) return;
    if (navigationType === 'POP') {
      window.scrollTo(0, positions.current.get(location.key) ?? 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key, location.hash, navigationType]);
}
