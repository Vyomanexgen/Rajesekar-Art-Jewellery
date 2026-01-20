import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import AppRouter from './AppRouter';
import Loading from './components/Loading';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <AppProvider>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}
      {!isLoading && <AppRouter />}
    </AppProvider>
  );
}
