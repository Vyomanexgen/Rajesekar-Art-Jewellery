import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import Navigation from './components/navigation';
import Home from './components/Home';
import Cart from './components/cart';
import Wishlist from './components/wishlist';
import Order from './components/order';
import About from './components/About';
import Contact from './components/contact';
import Arrivals from './components/arrivals';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import SearchResults from './components/SearchResults';
import TermsPage from './components/TermsPage';
import NotFound from './components/NotFound';
import Offer from './components/offer';
import TermsPrivacyPopup from './components/TermsPrivacyPopup';
import ProductModal from './components/ProductModal';
import Account from './components/account';
import Shop from './components/Shop';
import SuccessAnimation from './components/SuccessAnimation';
import { useAppHandlers } from './hooks/useAppHandlers';

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
  } = useApp();

  const handlers = useAppHandlers();

  // Initialize page state based on URL
  useEffect(() => {
    const path = window.location.pathname;
    
    // Don't interfere if we're in checkout mode
    if (showCheckout && (path === '/checkout' || path === '/signin')) {
      return;
    }
    
    if (path === '/signin') {
      handlers.setShowSignIn(true);
      handlers.setShowSignUp(false);
      // Preserve checkout state if user is coming from checkout
      const wasInCheckout = showCheckout;
      if (!wasInCheckout) {
        handlers.closeAllPages();
      } else {
        // Only close pages that aren't related to checkout
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
        // Keep checkout state
        handlers.setShowCheckout(true);
        handlers.setCheckoutStep('address');
      }
      handlers.setShowNotFound(false);
    } else if (path === '/shop') {
      handlers.setShowShopPage(true);
      handlers.setShowSignIn(false);
      handlers.setShowNewArrivals(false);
      handlers.setShowAboutPage(false);
      handlers.setShowContactPage(false);
      handlers.setShowNotFound(false);
    } else if (path === '/new-arrivals') {
      handlers.setShowNewArrivals(true);
      handlers.setShowSignIn(false);
      handlers.setShowShopPage(false);
      handlers.setShowAboutPage(false);
      handlers.setShowContactPage(false);
    } else if (path === '/about') {
      handlers.setShowAboutPage(true);
      handlers.setShowSignIn(false);
      handlers.setShowShopPage(false);
      handlers.setShowNewArrivals(false);
      handlers.setShowContactPage(false);
    } else if (path === '/contact') {
      handlers.setShowContactPage(true);
      handlers.setShowSignIn(false);
      handlers.setShowShopPage(false);
      handlers.setShowNewArrivals(false);
      handlers.setShowAboutPage(false);
    } else if (path === '/account') {
      if (isLoggedIn) {
        handlers.closeAllPages();
        handlers.setShowAccountPage(true);
        handlers.setShowSignIn(false);
      } else {
        handlers.setShowSignIn(true);
        handlers.setShowAccountPage(false);
        handlers.closeAllPages();
      }
      handlers.setShowNotFound(false);
    } else if (path === '/orders') {
      if (isLoggedIn) {
        handlers.setShowOrdersPage(true);
        handlers.setShowSignIn(false);
      } else {
        handlers.setShowSignIn(true);
        handlers.setShowOrdersPage(false);
      }
      handlers.closeAllPages();
      handlers.setShowNotFound(false);
    } else if (path === '/cart') {
      handlers.setShowCartModal(true);
      handlers.closeAllPages();
      handlers.setShowNotFound(false);
    } else if (path === '/wishlist') {
      handlers.setShowWishlist(true);
      handlers.closeAllPages();
    } else if (path === '/checkout') {
      // Handle checkout route
      if (isLoggedIn) {
        handlers.setShowCheckout(true);
        handlers.setCheckoutStep('address');
        handlers.setShowSignIn(false);
        handlers.setShowSignUp(false);
        handlers.setShowAccountPage(false);
        handlers.setShowNotFound(false);
      } else {
        // User not logged in, redirect to signin but preserve checkout intent
        handlers.setShowCheckout(true);
        handlers.setCheckoutStep('address');
        handlers.setShowSignIn(true);
        if (window?.history?.pushState) {
          window.history.pushState({}, '', '/signin');
        }
      }
    } else if (path.startsWith('/shop/')) {
      const categorySlug = path.replace('/shop/', '');
      const categoryMap = {
        'necklace': 'Necklaces',
        'earring': 'Earrings',
        'bangle': 'Bangles',
        'ring': 'Rings',
        'bridal-set': 'Bridal Sets',
        'temple-jewellery': 'Temple Jewellery'
      };
      const category = categoryMap[categorySlug];
      if (category) {
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
    } else if (path !== '/' && path !== '/signin' && path !== '/checkout') {
      handlers.setShowNotFound(true);
      handlers.closeAllPages();
    } else {
      handlers.closeAllPages();
      handlers.setShowNotFound(false);
      handlers.setCurrentCategory(null);
      handlers.setIsSearching(false);
      handlers.setSearchQuery('');
      if (path !== '/' && !path.startsWith('/shop/')) {
        window.history.replaceState({}, '', '/');
      }
    }
  }, [isLoggedIn, showCheckout]);

  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
  const isOnSignInRoute = currentPath === '/signin';

  return (
    <div className="page-wrapper">
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

      {showCartModal ? (
        <Cart
          cartItems={handlers.cartItems}
          couponCode={handlers.couponCode}
          couponApplied={handlers.couponApplied}
          setShowCartModal={handlers.setShowCartModal}
          setCouponCode={handlers.setCouponCode}
          getCartProducts={handlers.getCartProducts}
          getCartCount={handlers.getCartCount}
          getCartTotal={handlers.getCartTotal}
          getCartSubtotal={handlers.getCartSubtotal}
          getCouponDiscount={handlers.getCouponDiscount}
          getShippingCost={handlers.getShippingCost}
          getFreeShippingThreshold={handlers.getFreeShippingThreshold}
          getTaxAmount={handlers.getTaxAmount}
          getFinalTotal={handlers.getFinalTotal}
          getProductImage={handlers.getProductImage}
          getProductAttributes={handlers.getProductAttributes}
          handleDeleteFromCart={handlers.handleDeleteFromCart}
          handleRemoveFromCart={handlers.handleRemoveFromCart}
          handleQuantityChange={handlers.handleQuantityChange}
          handleAddToCart={handlers.handleAddToCart}
          handleApplyCoupon={handlers.handleApplyCoupon}
          handleCheckout={handlers.handleCheckout}
          navigateToShop={handlers.navigateToShop}
          navigateToHome={handlers.navigateToHome}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
        />
      ) : (showSignIn && isOnSignInRoute) ? (
        <SignIn
          signInForm={handlers.signInForm}
          setSignInForm={handlers.setSignInForm}
          handleSignIn={handlers.handleSignIn}
          handleGoogleSignIn={handlers.handleGoogleSignIn}
          setShowSignIn={handlers.setShowSignIn}
          setShowSignUp={handlers.setShowSignUp}
          setShowCheckout={handlers.setShowCheckout}
          setCheckoutStep={handlers.setCheckoutStep}
          setShowTermsPrivacyPopup={handlers.setShowTermsPrivacyPopup}
        />
      ) : (showSignUp && currentPath !== '/') ? (
        <SignUp
          signUpForm={handlers.signUpForm}
          setSignUpForm={handlers.setSignUpForm}
          signUpShippingAddress={handlers.signUpShippingAddress}
          setSignUpShippingAddress={handlers.setSignUpShippingAddress}
          showShippingAddressForm={handlers.showShippingAddressForm}
          handleToggleShippingAddress={handlers.handleToggleShippingAddress}
          handleSignUp={handlers.handleSignUp}
          handleGoogleSignIn={handlers.handleGoogleSignIn}
          setShowSignIn={handlers.setShowSignIn}
          setShowSignUp={handlers.setShowSignUp}
          setShowTermsPrivacyPopup={handlers.setShowTermsPrivacyPopup}
        />
      ) : showTermsPage ? (
        <TermsPage setShowTermsPage={handlers.setShowTermsPage} />
      ) : showCheckout ? (
        <Checkout
          checkoutStep={handlers.checkoutStep}
          addresses={handlers.addresses}
          selectedAddressId={handlers.selectedAddressId}
          setSelectedAddressId={handlers.setSelectedAddressId}
          showAddAddressForm={handlers.showAddAddressForm}
          newAddress={handlers.newAddress}
          setNewAddress={handlers.setNewAddress}
          handleAddAddress={handlers.handleAddAddress}
          handleCancelAddAddress={handlers.handleCancelAddAddress}
          handleSaveAddress={handlers.handleSaveAddress}
          handleContinueToDelivery={handlers.handleContinueToDelivery}
          selectedDeliveryOption={handlers.selectedDeliveryOption}
          setSelectedDeliveryOption={handlers.setSelectedDeliveryOption}
          giftWrapping={handlers.giftWrapping}
          setGiftWrapping={handlers.setGiftWrapping}
          jewelleryInsurance={handlers.jewelleryInsurance}
          setJewelleryInsurance={handlers.setJewelleryInsurance}
          handleBackToAddress={handlers.handleBackToAddress}
          handleContinueToPayment={handlers.handleContinueToPayment}
          selectedPaymentMethod={handlers.selectedPaymentMethod}
          setSelectedPaymentMethod={handlers.setSelectedPaymentMethod}
          cardDetails={handlers.cardDetails}
          setCardDetails={handlers.setCardDetails}
          handleBackToDelivery={handlers.handleBackToDelivery}
          handleReviewOrder={handlers.handleReviewOrder}
          getSelectedAddress={handlers.getSelectedAddress}
          getDeliveryMethodName={handlers.getDeliveryMethodName}
          getPaymentMethodName={handlers.getPaymentMethodName}
          setCheckoutStep={handlers.setCheckoutStep}
          handleBackToPayment={handlers.handleBackToPayment}
          orderTriggered={handlers.orderTriggered}
          setOrderTriggered={handlers.setOrderTriggered}
          handlePlaceOrder={handlers.handlePlaceOrder}
          getCartSubtotal={handlers.getCartSubtotal}
          getDeliveryCost={handlers.getDeliveryCost}
          getOrderTotal={handlers.getOrderTotal}
          navigateToHome={handlers.navigateToHome}
          navigateToShop={handlers.navigateToShop}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
        />
      ) : showOrderConfirmation ? (
        <OrderConfirmation
          orderId={handlers.orderId}
          cartItems={handlers.cartItems}
          products={handlers.products}
          getEstimatedDeliveryDate={handlers.getEstimatedDeliveryDate}
          getOrderTotal={handlers.getOrderTotal}
          handleContinueShopping={handlers.handleContinueShopping}
          navigateToHome={handlers.navigateToHome}
          navigateToShop={handlers.navigateToShop}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
        />
      ) : showAccountPage ? (
        <Account
          userDetails={handlers.userDetails}
          isDragging={handlers.isDragging}
          accountPageSection={handlers.accountPageSection}
          userOrders={handlers.userOrders}
          addresses={handlers.addresses}
          showAddAddressForm={handlers.showAddAddressForm}
          newAddress={handlers.newAddress}
          isLoggedIn={handlers.isLoggedIn}
          setAccountPageSection={handlers.setAccountPageSection}
          setIsDragging={handlers.setIsDragging}
          setShowAccountPage={handlers.setShowAccountPage}
          setShowWishlist={handlers.setShowWishlist}
          setShowLogoutConfirm={handlers.setShowLogoutConfirm}
          setShowAddAddressForm={handlers.setShowAddAddressForm}
          setNewAddress={handlers.setNewAddress}
          setAddresses={handlers.setAddresses}
          setSelectedAddressId={handlers.setSelectedAddressId}
          setUserDetails={handlers.setUserDetails}
          handleDragOver={(e) => { e.preventDefault(); e.stopPropagation(); handlers.setIsDragging(true); }}
          handleDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); handlers.setIsDragging(false); }}
          handleAccountProfileDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlers.setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
              const reader = new FileReader();
              reader.onloadend = () => {
                handlers.setProfilePhotoPreview(reader.result);
                handlers.setUserDetails(prev => ({ ...prev, profilePhoto: reader.result }));
              };
              reader.readAsDataURL(file);
            }
          }}
          handleAccountProfilePhotoChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
              const reader = new FileReader();
              reader.onloadend = () => {
                handlers.setProfilePhotoPreview(reader.result);
                handlers.setUserDetails(prev => ({ ...prev, profilePhoto: reader.result }));
              };
              reader.readAsDataURL(file);
            }
          }}
          handleEditProfileOpen={() => {
            handlers.setEditProfileForm({
              fullName: handlers.userDetails?.fullName || '',
              email: handlers.userDetails?.email || '',
              phone: handlers.userDetails?.phone || ''
            });
            handlers.setProfilePhotoPreview(handlers.userDetails?.profilePhoto || null);
            handlers.setShowEditProfile(true);
          }}
          handleAddAddress={handlers.handleAddAddress}
          handleCancelAddAddress={handlers.handleCancelAddAddress}
          handleSaveAddress={handlers.handleSaveAddress}
          navigateToHome={handlers.navigateToHome}
          navigateToShop={handlers.navigateToShop}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
          closeAllPages={handlers.closeAllPages}
          setShowSignIn={handlers.setShowSignIn}
        />
      ) : showOrdersPage ? (
        <Order
          userOrders={handlers.userOrders}
          isLoggedIn={handlers.isLoggedIn}
          setShowOrdersPage={handlers.setShowOrdersPage}
          setShowShopPage={handlers.setShowShopPage}
          getProductImage={handlers.getProductImage}
          navigateToHome={handlers.navigateToHome}
          navigateToShop={handlers.navigateToShop}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
        />
      ) : showWishlist ? (
        <Wishlist
          wishlistItems={handlers.wishlistItems}
          setWishlistItems={handlers.setWishlistItems}
          getWishlistProducts={handlers.getWishlistProducts}
          getProductImage={handlers.getProductImage}
          handleAddToCart={handlers.handleAddToCart}
          closeAllPages={handlers.closeAllPages}
          navigateToShop={handlers.navigateToShop}
          navigateToHome={handlers.navigateToHome}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
        />
      ) : showShopPage || currentCategory ? (
        <Shop handlers={handlers} />
      ) : isSearching && searchQuery.trim() ? (
        <SearchResults
          searchQuery={handlers.searchQuery}
          getSearchResults={handlers.getSearchResults}
          handleProductClick={handlers.handleProductClick}
          viewedProducts={handlers.viewedProducts}
          handleEyeIconClick={handlers.handleEyeIconClick}
          wishlistItems={handlers.wishlistItems}
          handleWishlistClick={handlers.handleWishlistClick}
          handleAddToCart={handlers.handleAddToCart}
        />
      ) : showNewArrivals ? (
        <Arrivals
          selectedNewArrivalsCategory={handlers.selectedNewArrivalsCategory}
          setSelectedNewArrivalsCategory={handlers.setSelectedNewArrivalsCategory}
          getFilteredNewArrivalsProducts={handlers.getFilteredNewArrivalsProducts}
          getProductImage={handlers.getProductImage}
          handleProductClick={handlers.handleProductClick}
          viewedProducts={handlers.viewedProducts}
          handleEyeIconClick={handlers.handleEyeIconClick}
          wishlistItems={handlers.wishlistItems}
          handleWishlistClick={handlers.handleWishlistClick}
          handleAddToCart={handlers.handleAddToCart}
          navigateToShop={handlers.navigateToShop}
          navigateToHome={handlers.navigateToHome}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
        />
      ) : showAboutPage ? (
        <About
          navigateToHome={handlers.navigateToHome}
          navigateToShop={handlers.navigateToShop}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
          setShowAboutPage={handlers.setShowAboutPage}
          closeAllPages={handlers.closeAllPages}
          showAboutPage={handlers.showAboutPage}
        />
      ) : showContactPage ? (
        <Contact
          handleContactFormSubmit={handlers.handleContactFormSubmit}
          navigateToHome={handlers.navigateToHome}
          navigateToShop={handlers.navigateToShop}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
        />
      ) : showNotFound ? (
        <NotFound
          navigateToHome={handlers.navigateToHome}
          navigateToShop={handlers.navigateToShop}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
          handleCategoryClick={handlers.handleCategoryClick}
        />
      ) : (
        <Home
          currentSlide={handlers.currentSlide}
          countdown={handlers.countdown}
          prevSlide={handlers.prevSlide}
          nextSlide={handlers.nextSlide}
          goToSlide={handlers.goToSlide}
          handleCategoryClick={handlers.handleCategoryClick}
          getRecommendedProducts={handlers.getRecommendedProducts}
          getTrendingProducts={handlers.getTrendingProducts}
          handleProductClick={handlers.handleProductClick}
          getProductImage={handlers.getProductImage}
          viewedProducts={handlers.viewedProducts}
          handleEyeIconClick={handlers.handleEyeIconClick}
          wishlistItems={handlers.wishlistItems}
          handleWishlistClick={handlers.handleWishlistClick}
          handleAddToCart={handlers.handleAddToCart}
          navigateToHome={handlers.navigateToHome}
          navigateToShop={handlers.navigateToShop}
          navigateToAbout={handlers.navigateToAbout}
          navigateToContact={handlers.navigateToContact}
          navigateToAccount={handlers.navigateToAccount}
          navigateToOrders={handlers.navigateToOrders}
        />
      )}

      <ProductModal
        selectedProduct={selectedProduct}
        closeModal={handlers.closeModal}
        handleAddToCart={handlers.handleAddToCart}
        handleBuyNow={handlers.handleBuyNow}
      />

      {/* Cart Toast Notification */}
      {showCartToast && (
        <div className="cart-toast">
          <div className="cart-toast-content">
            <span className="cart-toast-icon">✓</span>
            <span className="cart-toast-message">The product added to the cart</span>
          </div>
        </div>
      )}

      {/* Generic Toast Notification */}
      {showToast && (
        <div className="cart-toast">
          <div className="cart-toast-content">
            <span className="cart-toast-icon">✓</span>
            <span className="cart-toast-message">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay" onClick={() => handlers.setShowLogoutConfirm(false)}>
          <div className="logout-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="logout-confirm-title">Confirm Logout</h3>
            <p className="logout-confirm-message">Are you sure you want to log out? You'll need to sign in again to access your account.</p>
            <div className="logout-confirm-buttons">
              <button
                className="logout-confirm-cancel"
                onClick={() => handlers.setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="logout-confirm-logout"
                onClick={() => {
                  handlers.setIsLoggedIn(false);
                  handlers.setUserDetails(null);
                  handlers.setShowLogoutConfirm(false);
                  handlers.setShowAccountPage(false);
                  handlers.setShowCheckout(false);
                  handlers.setShowCartModal(false);
                  handlers.setShowWishlist(false);
                  handlers.setShowOrdersPage(false);
                  // Close all pages and show sign-in page
                  handlers.closeAllPages();
                  handlers.setShowSignIn(true);
                  handlers.setShowSignUp(false);
                  // Navigate to sign-in page
                  if (window?.history?.pushState) {
                    window.history.pushState({}, '', '/signin');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Animation */}
      {showSuccessAnimation && (
        <SuccessAnimation
          message={successAnimationMessage}
          onComplete={() => setShowSuccessAnimation(false)}
        />
      )}
    </div>
  );
};

export default AppRouter;

