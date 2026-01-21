import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import productsData from '../../db.json';

const AppContext = createContext();

// Import products from db.json with validation
const products = (productsData && Array.isArray(productsData.products)) 
  ? productsData.products 
  : (Array.isArray(productsData) ? productsData : []);

export const AppProvider = ({ children }) => {
  // Navigation states
  const [menuOpen, setMenuOpen] = useState(false);
  const [showShopSubmenu, setShowShopSubmenu] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const mobileMenuRef = useRef(null);

  // Home page states
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countdown, setCountdown] = useState({ hours: 23, minutes: 45, seconds: 12 });

  // Product states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewedProducts, setViewedProducts] = useState(new Set());
  const [wishlistItems, setWishlistItems] = useState(new Set());

  // Page visibility states
  const [showWishlist, setShowWishlist] = useState(false);
  const [showOrdersPage, setShowOrdersPage] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showCartToast, setShowCartToast] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [successAnimationMessage, setSuccessAnimationMessage] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showShopPage, setShowShopPage] = useState(false);
  const [showNewArrivals, setShowNewArrivals] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const [showAccountPage, setShowAccountPage] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showTermsPage, setShowTermsPage] = useState(false);
  const [showTermsPrivacyPopup, setShowTermsPrivacyPopup] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [showOfferPopup, setShowOfferPopup] = useState(true);

  // Cart states
  const [cartItems, setCartItems] = useState(new Map());
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  // Shop/Category states
  const [currentCategory, setCurrentCategory] = useState(null);
  const [selectedCategoryButton, setSelectedCategoryButton] = useState(null);
  const [selectedNewArrivalsCategory, setSelectedNewArrivalsCategory] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());

  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Checkout states
  const [checkoutStep, setCheckoutStep] = useState('address');
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('standard');
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [jewelleryInsurance, setJewelleryInsurance] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: ''
  });

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [filtersOpen, setFiltersOpen] = useState({
    price: false,
    material: false,
    gemstone: false,
    designStyle: false,
    designer: false,
    collection: false
  });
  const [selectedFilters, setSelectedFilters] = useState({
    material: [],
    gemstone: [],
    designStyle: [],
    designer: [],
    collection: []
  });
  const [sortOption, setSortOption] = useState('Featured');
  const [productViewMode, setProductViewMode] = useState('list');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // User states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [accountPageSection, setAccountPageSection] = useState('overview');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editProfileForm, setEditProfileForm] = useState({ fullName: '', email: '', phone: '' });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Sign in/up states
  const [signInForm, setSignInForm] = useState({ 
    email: '', 
    password: '', 
    showPassword: false, 
    rememberDevice: false, 
    termsAgreed: false 
  });
  const [signUpForm, setSignUpForm] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    password: '', 
    showPassword: false,
    rememberDevice: false,
    productUpdates: false,
    termsAgreed: false
  });
  const [showShippingAddressForm, setShowShippingAddressForm] = useState(false);
  const [signUpShippingAddress, setSignUpShippingAddress] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: ''
  });
  const [googleSignInSource, setGoogleSignInSource] = useState(null);

  // Order states
  const [orderTriggered, setOrderTriggered] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Auto-slide timer for home page
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(countdownTimer);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShopDropdown && !event.target.closest('.nav-dropdown-wrapper')) {
        setShowShopDropdown(false);
      }
      if (showSearchDropdown && !event.target.closest('.search-box-wrapper')) {
        setShowSearchDropdown(false);
      }
      if (showSortDropdown && !event.target.closest('.sort-dropdown-wrapper')) {
        setShowSortDropdown(false);
      }
      if (showAccountDropdown && !event.target.closest('.account-dropdown-wrapper')) {
        setShowAccountDropdown(false);
      }
    };

    if (showShopDropdown || showSearchDropdown || showSortDropdown || showAccountDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showShopDropdown, showSearchDropdown, showSortDropdown, showAccountDropdown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [menuOpen]);

  // Offer popup scroll prevention
  useEffect(() => {
    if (showOfferPopup) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [showOfferPopup]);

  // Helper function to close all pages
  const closeAllPages = useCallback(() => {
    setShowShopPage(false);
    setCurrentCategory(null);
    setSelectedCategoryButton(null);
    setShowNewArrivals(false);
    setShowAboutPage(false);
    setSelectedNewArrivalsCategory(null);
    setShowContactPage(false);
    setShowCheckout(false);
    setShowCartModal(false);
    setShowWishlist(false);
    setShowOrdersPage(false);
    setShowAccountPage(false);
    setShowOrderConfirmation(false);
    setShowSignIn(false);
    setShowSignUp(false);
    setShowEditProfile(false);
    setShowShopDropdown(false);
    setShowSearchDropdown(false);
    setIsSearching(false);
    setSearchQuery('');
    setShowLogoutConfirm(false);
    setSelectedProduct(null);
  }, []);

  const value = {
    // Products
    products,
    
    // Navigation states
    menuOpen, setMenuOpen,
    showShopSubmenu, setShowShopSubmenu,
    showShopDropdown, setShowShopDropdown,
    showSearchDropdown, setShowSearchDropdown,
    showAccountDropdown, setShowAccountDropdown,
    showSortDropdown, setShowSortDropdown,
    mobileMenuRef,

    // Home page states
    currentSlide, setCurrentSlide,
    countdown, setCountdown,

    // Product states
    selectedProduct, setSelectedProduct,
    viewedProducts, setViewedProducts,
    wishlistItems, setWishlistItems,

    // Page visibility states
    showWishlist, setShowWishlist,
    showOrdersPage, setShowOrdersPage,
    showCartModal, setShowCartModal,
    showCartToast, setShowCartToast,
    showToast, setShowToast,
    toastMessage, setToastMessage,
    showSuccessAnimation, setShowSuccessAnimation,
    successAnimationMessage, setSuccessAnimationMessage,
    showCheckout, setShowCheckout,
    showShopPage, setShowShopPage,
    showNewArrivals, setShowNewArrivals,
    showAboutPage, setShowAboutPage,
    showContactPage, setShowContactPage,
    showAccountPage, setShowAccountPage,
    showSignIn, setShowSignIn,
    showSignUp, setShowSignUp,
    showTermsPage, setShowTermsPage,
    showTermsPrivacyPopup, setShowTermsPrivacyPopup,
    showNotFound, setShowNotFound,
    showOrderConfirmation, setShowOrderConfirmation,
    showOfferPopup, setShowOfferPopup,

    // Cart states
    cartItems, setCartItems,
    couponCode, setCouponCode,
    couponApplied, setCouponApplied,

    // Shop/Category states
    currentCategory, setCurrentCategory,
    selectedCategoryButton, setSelectedCategoryButton,
    selectedNewArrivalsCategory, setSelectedNewArrivalsCategory,
    selectedStyle, setSelectedStyle,
    visibleSections, setVisibleSections,

    // Search states
    searchQuery, setSearchQuery,
    recentSearches, setRecentSearches,
    isSearching, setIsSearching,

    // Checkout states
    checkoutStep, setCheckoutStep,
    selectedDeliveryOption, setSelectedDeliveryOption,
    giftWrapping, setGiftWrapping,
    jewelleryInsurance, setJewelleryInsurance,
    selectedPaymentMethod, setSelectedPaymentMethod,
    cardDetails, setCardDetails,
    addresses, setAddresses,
    selectedAddressId, setSelectedAddressId,
    showAddAddressForm, setShowAddAddressForm,
    newAddress, setNewAddress,

    // Filter states
    priceRange, setPriceRange,
    filtersOpen, setFiltersOpen,
    selectedFilters, setSelectedFilters,
    sortOption, setSortOption,
    productViewMode, setProductViewMode,
    showMobileFilters, setShowMobileFilters,
    currentPage, setCurrentPage,

    // User states
    isLoggedIn, setIsLoggedIn,
    userDetails, setUserDetails,
    userOrders, setUserOrders,
    accountPageSection, setAccountPageSection,
    showLogoutConfirm, setShowLogoutConfirm,
    showEditProfile, setShowEditProfile,
    editProfileForm, setEditProfileForm,
    profilePhoto, setProfilePhoto,
    profilePhotoPreview, setProfilePhotoPreview,
    isDragging, setIsDragging,

    // Sign in/up states
    signInForm, setSignInForm,
    signUpForm, setSignUpForm,
    showShippingAddressForm, setShowShippingAddressForm,
    signUpShippingAddress, setSignUpShippingAddress,
    googleSignInSource, setGoogleSignInSource,

    // Order states
    orderTriggered, setOrderTriggered,
    orderId, setOrderId,

    // Helper functions
    closeAllPages,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

