import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import GlobalContextProvider from './features/contexts/global';
import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
);

console.log('👋 This message is being logged by "renderer.tsx", included via Vite');
