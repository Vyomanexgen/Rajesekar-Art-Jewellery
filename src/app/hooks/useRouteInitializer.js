import { useEffect, useRef } from 'react';
import { handleRouteChange } from '../utils/routeHandler';

/**
 * Custom hook to handle route initialization based on URL path
 * Encapsulates all route-related side effects.
 *
 * IMPORTANT: handlers must NOT be in the deps array — it's a new object
 * every render. We store it in a ref so the effect always uses the latest
 * version while only triggering on actual state changes (isLoggedIn /
 * showCheckout), exactly matching the original AppRouter behavior.
 *
 * @param {object} handlers - Handler functions from context
 * @param {boolean} isLoggedIn - User login status
 * @param {boolean} showCheckout - Checkout modal state
 */
export const useRouteInitializer = (handlers, isLoggedIn, showCheckout) => {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    const path = window.location.pathname;
    handleRouteChange(path, handlersRef.current, { isLoggedIn, showCheckout });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, showCheckout]);
};
