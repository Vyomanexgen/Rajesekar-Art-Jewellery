import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import AppRouter from './AppRouter';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <AppProvider>
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            {isLoading && <Loading key="loading-screen" onComplete={handleLoadingComplete} />}
          </AnimatePresence>
          {!isLoading && <AppRouter />}
        </ErrorBoundary>
      </AppProvider>
    </ErrorBoundary>
  );
}
