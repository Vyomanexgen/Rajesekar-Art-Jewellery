import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary'

// Handle unhandled errors gracefully
window.addEventListener('error', (event) => {
  // Log errors for debugging
  if (event.error) {
    console.error('Unhandled error:', event.error);
  }
  // Don't prevent default in production to allow error boundaries to catch errors
  if (process.env.NODE_ENV === 'development') {
    event.preventDefault();
    return false;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  // Log promise rejections for debugging
  if (event.reason) {
    console.error('Unhandled promise rejection:', event.reason);
  }
  // Don't prevent default in production to allow error boundaries to catch errors
  if (process.env.NODE_ENV === 'development') {
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
