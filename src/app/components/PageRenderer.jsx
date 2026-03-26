import React from 'react';
import Cart from '../../components/pages/cart/Cart';
import SignIn from '../../components/pages/auth/SignIn';
import SignUp from '../../components/pages/auth/SignUp';
import TermsPage from '../../components/pages/info/TermsPage';
import Checkout from '../../components/pages/checkout/Checkout';
import OrderConfirmation from '../../components/pages/orders/OrderConfirmation';
import Account from '../../components/pages/account/Account';
import TrackOrder from '../../components/pages/orders/TrackOrder';
import Order from '../../components/pages/orders/Order';
import Wishlist from '../../components/pages/wishlist/Wishlist';
import Shop from '../../components/pages/shop/Shop';
import SearchResults from '../../components/common/SearchResults';
import Arrivals from '../../components/pages/arrivals/Arrivals';
import About from '../../components/pages/info/About';
import Contact from '../../components/pages/info/Contact';
import NotFound from '../../components/pages/error/NotFound';
import Home from '../../components/pages/home/Home';

/**
 * PageRenderer component - Handles conditional rendering of all pages
 * Reduces prop drilling by accepting a handlers object
 * 
 * @param {object} props - Component props
 * @param {object} props.appState - Current application state from context
 * @param {object} props.handlers - Handler functions from context
 * @param {string} props.currentPath - Current URL path
 * @returns {React.ReactElement}
 */
const PageRenderer = ({ appState, handlers, currentPath }) => {
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
    isLoggedIn,
  } = appState;

  const isOnSignInRoute = currentPath === '/signin';

  // Cart page rendering
  if (showCartModal) {
    return (
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
    );
  }

  // Sign In page rendering
  if (showSignIn && isOnSignInRoute) {
    return (
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
    );
  }

  // Sign Up page rendering
  if (showSignUp && currentPath !== '/') {
    return (
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
    );
  }

  // Terms page rendering
  if (showTermsPage) {
    return <TermsPage setShowTermsPage={handlers.setShowTermsPage} />;
  }

  // Checkout page rendering
  if (showCheckout) {
    return (
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
    );
  }

  // Order Confirmation page rendering
  if (showOrderConfirmation) {
    return (
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
    );
  }

  // Account page rendering
  if (showAccountPage) {
    return (
      <Account
        userDetails={handlers.userDetails}
        isDragging={handlers.isDragging}
        accountPageSection={handlers.accountPageSection}
        userOrders={handlers.userOrders}
        addresses={handlers.addresses}
        showAddAddressForm={handlers.showAddAddressForm}
        newAddress={handlers.newAddress}
        isLoggedIn={isLoggedIn}
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
    );
  }

  // Track Order page rendering
  if (showTrackOrderPage) {
    return (
      <TrackOrder
        selectedOrderId={selectedOrderId}
        userOrders={handlers.userOrders}
        getProductImage={handlers.getProductImage}
        navigateToHome={handlers.navigateToHome}
        navigateToShop={handlers.navigateToShop}
        navigateToAbout={handlers.navigateToAbout}
        navigateToContact={handlers.navigateToContact}
        navigateToAccount={handlers.navigateToAccount}
        navigateToOrders={handlers.navigateToOrders}
        handleCategoryClick={handlers.handleCategoryClick}
        setShowTrackOrderPage={handlers.setShowTrackOrderPage}
      />
    );
  }

  // Orders page rendering
  if (showOrdersPage) {
    return (
      <Order
        userOrders={handlers.userOrders}
        isLoggedIn={isLoggedIn}
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
        setShowTrackOrderPage={handlers.setShowTrackOrderPage}
        setSelectedOrderId={handlers.setSelectedOrderId}
        setShowSignIn={handlers.setShowSignIn}
        setRedirectToOrdersAfterAuth={handlers.setRedirectToOrdersAfterAuth}
      />
    );
  }

  // Wishlist page rendering
  if (showWishlist) {
    return (
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
    );
  }

  // Shop page rendering
  if (showShopPage || currentCategory) {
    return <Shop handlers={handlers} />;
  }

  // Search results page rendering
  if (isSearching && searchQuery.trim()) {
    return (
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
    );
  }

  // New Arrivals page rendering
  if (showNewArrivals) {
    return (
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
    );
  }

  // About page rendering
  if (showAboutPage) {
    return (
      <About
        navigateToHome={handlers.navigateToHome}
        navigateToShop={handlers.navigateToShop}
        navigateToContact={handlers.navigateToContact}
        navigateToAccount={handlers.navigateToAccount}
        navigateToOrders={handlers.navigateToOrders}
        handleCategoryClick={handlers.handleCategoryClick}
      />
    );
  }

  // Contact page rendering
  if (showContactPage) {
    return (
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
    );
  }

  // Not Found page rendering
  if (showNotFound) {
    return (
      <NotFound
        navigateToHome={handlers.navigateToHome}
        navigateToShop={handlers.navigateToShop}
        navigateToAbout={handlers.navigateToAbout}
        navigateToContact={handlers.navigateToContact}
        navigateToAccount={handlers.navigateToAccount}
        navigateToOrders={handlers.navigateToOrders}
        handleCategoryClick={handlers.handleCategoryClick}
      />
    );
  }

  // Default Home page rendering
  return (
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
  );
};

export default PageRenderer;
