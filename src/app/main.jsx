import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../styles/tailwind-theme-overrides.css'
import App from './App.jsx'
import ErrorBoundary from '../components/common/ErrorBoundary'

// Handle unhandled errors gracefully (no console output to keep console clean)
window.addEventListener('error', (event) => {
  if (import.meta.env.DEV) {
    event.preventDefault();
    return false;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (import.meta.env.DEV) {
    event.preventDefault();
    return false;
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
