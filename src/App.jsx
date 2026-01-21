import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import AppRouter from './AppRouter';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <AppProvider>
        <ErrorBoundary>
          {isLoading && <Loading onComplete={handleLoadingComplete} />}
          {!isLoading && <AppRouter />}
        </ErrorBoundary>
      </AppProvider>
    </ErrorBoundary>
  );
}
