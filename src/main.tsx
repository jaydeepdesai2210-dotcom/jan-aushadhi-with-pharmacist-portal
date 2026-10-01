import {StrictMode, lazy, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Private portal is code-split so the public site bundle is unchanged.
const Portal = lazy(() => import('./portal/Portal'));
const isPortal = window.location.pathname.startsWith('/pharmacist');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPortal ? (
      <Suspense fallback={<div style={{padding:24,fontFamily:'sans-serif'}}>Loading…</div>}><Portal /></Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
