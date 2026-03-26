import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Navigation from '../components/layout/Navigation';
import AdminLogin from '../components/pages/admin/AdminLogin';
import AdminDashboard from '../components/pages/admin/AdminDashboard';
import Offer from '../components/common/Offer';
import TermsPrivacyPopup from '../components/common/TermsPrivacyPopup';
import ProductModal from '../components/products/ProductModal';
import SuccessAnimation from '../components/common/SuccessAnimation';
import WhatsAppButton from '../components/common/WhatsAppButton';
import { useAppHandlers } from '../hooks/useAppHandlers';
import { useRouteInitializer } from './hooks/useRouteInitializer';
import PageRenderer from './components/PageRenderer';
import CartToast from './components/CartToast';
import LogoutConfirmDialog from './components/LogoutConfirmDialog';

/**
 * AppRouter - Main application router component
 * 
 * Refactored to be clean and maintainable:
 * - Route initialization extracted to useRouteInitializer hook
 * - Page rendering delegated to PageRenderer component
 * - Dialogs and toasts extracted to separate components
 * - Uses memoization to prevent unnecessary re-renders
 * 
 * Production ready with optimized rendering and separation of concerns
 */
const AppRouter = () => {
  const {
    showCartModal,
    showSignIn,
    showSignUp,
    showCheckout,
    showOrderConfirmation,
    showShopPage,
    showNewArrivals,
    showAboutPage,
    showContactPage,
    showOrdersPage,
    showTrackOrderPage,
    selectedOrderId,
    showWishlist,
    showAccountPage,
    currentCategory,
    isSearching,
    searchQuery,
    showNotFound,
    showTermsPage,
    selectedProduct,
    showOfferPopup,
    showTermsPrivacyPopup,
    showCartToast,
    showToast,
    toastMessage,
    showLogoutConfirm,
    setShowLogoutConfirm,
    isLoggedIn,
    showSuccessAnimation,
    setShowSuccessAnimation,
    successAnimationMessage,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
  } = useApp();

  const handlers = useAppHandlers();

  // Initialize route handlers based on URL and user state
  useRouteInitializer(handlers, isLoggedIn, showCheckout);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isAdminRoute = currentPath === '/admin' || currentPath.startsWith('/admin/');

  // Memoize app state to prevent unnecessary re-renders
  const appState = useMemo(
    () => ({
      showCartModal,
      showSignIn,
      showSignUp,
      showCheckout,
      showOrderConfirmation,
      showShopPage,
      showNewArrivals,
      showAboutPage,
      showContactPage,
      showOrdersPage,
      showTrackOrderPage,
      selectedOrderId,
      showWishlist,
      showAccountPage,
      currentCategory,
      isSearching,
      searchQuery,
      showNotFound,
      showTermsPage,
      isLoggedIn,
    }),
    [
      showCartModal,
      showSignIn,
      showSignUp,
      showCheckout,
      showOrderConfirmation,
      showShopPage,
      showNewArrivals,
      showAboutPage,
      showContactPage,
      showOrdersPage,
      showTrackOrderPage,
      selectedOrderId,
      showWishlist,
      showAccountPage,
      currentCategory,
      isSearching,
      searchQuery,
      showNotFound,
      showTermsPage,
      isLoggedIn,
    ]
  );

  return (
    <div className="page-wrapper">
      {isAdminRoute ? (
        isAdminAuthenticated ? (
          <AdminDashboard setIsAdminAuthenticated={setIsAdminAuthenticated} />
        ) : (
          <AdminLogin onLoginSuccess={() => setIsAdminAuthenticated(true)} />
        )
      ) : (
        <>
          <Offer
            showOfferPopup={showOfferPopup}
            setShowOfferPopup={handlers.setShowOfferPopup}
          />

          <TermsPrivacyPopup 
            showTermsPrivacyPopup={showTermsPrivacyPopup}
            setShowTermsPrivacyPopup={handlers.setShowTermsPrivacyPopup}
          />

          <Navigation
            menuOpen={handlers.menuOpen}
            setMenuOpen={handlers.setMenuOpen}
            showShopSubmenu={handlers.showShopSubmenu}
            setShowShopSubmenu={handlers.setShowShopSubmenu}
            showShopDropdown={handlers.showShopDropdown}
            setShowShopDropdown={handlers.setShowShopDropdown}
            searchQuery={handlers.searchQuery}
            setSearchQuery={handlers.setSearchQuery}
            showSearchDropdown={handlers.showSearchDropdown}
            setShowSearchDropdown={handlers.setShowSearchDropdown}
            recentSearches={handlers.recentSearches}
            isSearching={handlers.isSearching}
            wishlistItems={handlers.wishlistItems}
            cartItems={handlers.cartItems}
            isLoggedIn={handlers.isLoggedIn}
            userDetails={handlers.userDetails}
            showAccountDropdown={handlers.showAccountDropdown}
            setShowAccountDropdown={handlers.setShowAccountDropdown}
            userOrders={handlers.userOrders}
            navigateToHome={handlers.navigateToHome}
            navigateToShop={handlers.navigateToShop}
            navigateToAbout={handlers.navigateToAbout}
            navigateToContact={handlers.navigateToContact}
            handleShopDropdownToggle={handlers.handleShopDropdownToggle}
            handleCategoryClick={handlers.handleCategoryClick}
            handleNewArrivalsClick={handlers.handleNewArrivalsClick}
            handleSearchChange={handlers.handleSearchChange}
            handleSearchSubmit={handlers.handleSearchSubmit}
            handleSearchClick={handlers.handleSearchClick}
            getSearchResults={handlers.getSearchResults}
            navigateToOrders={handlers.navigateToOrders}
            navigateToWishlist={handlers.navigateToWishlist}
            navigateToCart={handlers.navigateToCart}
            navigateToAccount={handlers.navigateToAccount}
            getCartCount={handlers.getCartCount}
            closeAllPages={handlers.closeAllPages}
            navigateToNewArrivals={handlers.navigateToNewArrivals}
            setIsLoggedIn={handlers.setIsLoggedIn}
            setUserDetails={handlers.setUserDetails}
            setShowCheckout={handlers.setShowCheckout}
            setShowCartModal={handlers.setShowCartModal}
            setShowWishlist={handlers.setShowWishlist}
            setShowLogoutConfirm={setShowLogoutConfirm}
            trendingSearches={handlers.trendingSearches}
          />

          {/* Page Rendering - All page content is managed here */}
          <PageRenderer appState={appState} handlers={handlers} currentPath={currentPath} />

          {/* Product Modal */}
          <ProductModal
            selectedProduct={selectedProduct}
            closeModal={handlers.closeModal}
            handleAddToCart={handlers.handleAddToCart}
            handleBuyNow={handlers.handleBuyNow}
          />

          {/* Notifications and Dialogs */}
          <CartToast
            showCartToast={showCartToast}
            showToast={showToast}
            toastMessage={toastMessage}
          />

          <LogoutConfirmDialog
            showLogoutConfirm={showLogoutConfirm}
            handlers={handlers}
          />

          {showSuccessAnimation && (
            <SuccessAnimation
              message={successAnimationMessage}
              onComplete={() => setShowSuccessAnimation(false)}
            />
          )}

          {/* Floating Action Buttons */}
          <WhatsAppButton />
        </>
      )}
    </div>
  );
};

export default AppRouter;
