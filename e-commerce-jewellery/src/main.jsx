import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'

// Handle unhandled errors gracefully
window.addEventListener('error', (event) => {
  // Prevent default error display but still allow logging for debugging
  if (event.error) {
    // Log to console for debugging but don't show to user
    console.error('Unhandled error:', event.error);
  }
  event.preventDefault();
  return false;
});

window.addEventListener('unhandledrejection', (event) => {
  // Prevent default error display but still allow logging for debugging
  if (event.reason) {
    console.error('Unhandled promise rejection:', event.reason);
  }
  event.preventDefault();
  return false;
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
