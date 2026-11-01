import { MotionConfig } from 'framer-motion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AmbientSoundProvider from '@/components/ui/AmbientSoundProvider';
import { useScrollMemory } from '@/hooks/useScrollMemory';
import { EASE_LUX } from '@/lib/motion';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import ResidencePage from '@/pages/ResidencePage';

function AppRoutes() {
  useScrollMemory();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/residence/:slug" element={<ResidencePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AmbientSoundProvider>
        <MotionConfig reducedMotion="user" transition={{ ease: EASE_LUX }}>
          <AppRoutes />
        </MotionConfig>
      </AmbientSoundProvider>
    </BrowserRouter>
  );
}
