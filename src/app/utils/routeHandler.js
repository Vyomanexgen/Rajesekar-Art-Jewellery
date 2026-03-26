import { getCategoryFromSlug } from '../config/categoryMap';

/**
 * Handles route-based page state initialization
 * Extracts the complex route switching logic from AppRouter
 */
export const handleRouteChange = (path, handlers, { isLoggedIn, showCheckout }) => {
  // Don't interfere with admin routes
  if (path === '/admin' || path.startsWith('/admin/')) {
    handlers.closeAllPages();
    handlers.setShowNotFound(false);
    return;
  }

  // Don't interfere if we're in checkout mode
  if (showCheckout && (path === '/checkout' || path === '/signin')) {
    return;
  }

  switch (true) {
    case path === '/signin':
      handlers.setShowSignUp(false);
      if (!showCheckout) {
        handlers.closeAllPages();
        handlers.setShowSignIn(true);
      } else {
        handlers.setShowShopPage(false);
        handlers.setCurrentCategory(null);
        handlers.setShowNewArrivals(false);
        handlers.setShowAboutPage(false);
        handlers.setShowContactPage(false);
        handlers.setShowWishlist(false);
        handlers.setShowOrdersPage(false);
        handlers.setShowAccountPage(false);
        handlers.setShowCartModal(false);
        handlers.setShowOrderConfirmation(false);
        handlers.setIsSearching(false);
        handlers.setSearchQuery('');
        handlers.setShowNotFound(false);
        handlers.setShowCheckout(true);
        handlers.setCheckoutStep('address');
      }
      handlers.setShowNotFound(false);
      break;

    case path === '/shop':
      handlers.closeAllPages();
      handlers.setShowShopPage(true);
      handlers.setShowSignIn(false);
      handlers.setShowNewArrivals(false);
      handlers.setShowAboutPage(false);
      handlers.setShowContactPage(false);
      handlers.setShowNotFound(false);
      break;

    case path === '/new-arrivals':
      handlers.closeAllPages();
      handlers.setShowNewArrivals(true);
      handlers.setShowSignIn(false);
      handlers.setShowShopPage(false);
      handlers.setShowAboutPage(false);
      handlers.setShowContactPage(false);
      handlers.setShowNotFound(false);
      break;

    case path === '/about':
      handlers.closeAllPages();
      handlers.setShowAboutPage(true);
      handlers.setShowSignIn(false);
      handlers.setShowShopPage(false);
      handlers.setShowNewArrivals(false);
      handlers.setShowContactPage(false);
      handlers.setShowNotFound(false);
      break;

    case path === '/contact':
      handlers.closeAllPages();
      handlers.setShowContactPage(true);
      handlers.setShowSignIn(false);
      handlers.setShowShopPage(false);
      handlers.setShowNewArrivals(false);
      handlers.setShowAboutPage(false);
      handlers.setShowNotFound(false);
      break;

    case path === '/account':
      if (isLoggedIn) {
        handlers.closeAllPages();
        handlers.setShowAccountPage(true);
        handlers.setShowSignIn(false);
      } else {
        handlers.closeAllPages();
        handlers.setShowAccountPage(false);
        handlers.setShowSignIn(true);
      }
      handlers.setShowNotFound(false);
      break;

    case path === '/orders':
      handlers.closeAllPages();
      handlers.setShowOrdersPage(true);
      handlers.setShowSignIn(false);
      handlers.setShowNotFound(false);
      break;

    case path === '/order-confirmation':
      handlers.closeAllPages();
      handlers.setShowOrderConfirmation(true);
      handlers.setShowCheckout(false);
      handlers.setShowSignIn(false);
      handlers.setShowNotFound(false);
      break;

    case path === '/cart':
      handlers.closeAllPages();
      handlers.setShowCartModal(true);
      handlers.setShowNotFound(false);
      break;

    case path === '/wishlist':
      handlers.closeAllPages();
      handlers.setShowWishlist(true);
      handlers.setShowNotFound(false);
      break;

    case path === '/checkout':
      handlers.closeAllPages();
      handlers.setShowCheckout(true);
      handlers.setCheckoutStep('address');
      handlers.setShowSignIn(!isLoggedIn);
      handlers.setShowSignUp(false);
      handlers.setShowAccountPage(false);
      handlers.setShowNotFound(false);
      if (!isLoggedIn && window?.history?.pushState) {
        window.history.pushState({}, '', '/signin');
      }
      break;

    case path.startsWith('/shop/'):
      handleCategoryRoute(path, handlers);
      break;

    case path === '/' || path === '/order-confirmation':
      handlers.closeAllPages();
      handlers.setShowNotFound(false);
      handlers.setCurrentCategory(null);
      handlers.setIsSearching(false);
      handlers.setSearchQuery('');
      break;

    default:
      // Invalid route - show 404
      handlers.setShowNotFound(true);
      handlers.closeAllPages();
  }
};

/**
 * Handles category-based routing
 * @param {string} path - The current path
 * @param {object} handlers - Handler functions from context
 */
const handleCategoryRoute = (path, handlers) => {
  const categorySlug = path.replace('/shop/', '');
  const category = getCategoryFromSlug(categorySlug);

  if (category) {
    handlers.closeAllPages();
    handlers.setCurrentCategory(category);
    handlers.setShowShopPage(true);
    handlers.setShowSignIn(false);
    handlers.setShowNewArrivals(false);
    handlers.setShowAboutPage(false);
    handlers.setShowContactPage(false);
    handlers.setShowNotFound(false);
  } else {
    handlers.setShowNotFound(true);
    handlers.closeAllPages();
  }
};
