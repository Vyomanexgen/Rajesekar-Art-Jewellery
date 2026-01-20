import { useCallback, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getProductImage, getProductDescription } from '../utils/productUtils';
import emailjs from '@emailjs/browser';
import productsData from '../../db.json';

const products = (productsData && Array.isArray(productsData.products)) 
  ? productsData.products 
  : (Array.isArray(productsData) ? productsData : []);

export const useAppHandlers = () => {
  const app = useApp();

  // Navigation handlers
  const navigateToHome = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    app.closeAllPages();
    app.setShowNotFound(false);
    app.setCurrentCategory(null);
    app.setIsSearching(false);
    app.setSearchQuery('');
    app.setMenuOpen(false);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  const navigateToShop = useCallback((e) => {
    if (e) e.preventDefault();
    app.closeAllPages();
    app.setShowShopPage(true);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/shop');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  const navigateToNewArrivals = useCallback((e) => {
    if (e) e.preventDefault();
    app.closeAllPages();
    app.setShowNewArrivals(true);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/new-arrivals');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  const navigateToAbout = useCallback((e) => {
    if (e) e.preventDefault();
    app.closeAllPages();
    app.setShowAboutPage(true);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/about');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  const navigateToContact = useCallback((e) => {
    if (e) e.preventDefault();
    app.closeAllPages();
    app.setShowContactPage(true);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/contact');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  const navigateToAccount = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    app.closeAllPages();
    if (!app.isLoggedIn) {
      app.setShowSignIn(true);
      if (window?.history?.pushState) {
        window.history.pushState({}, '', '/signin');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    app.setShowAccountPage(true);
    app.setAccountPageSection('overview');
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/account');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  const navigateToOrders = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    app.closeAllPages();
    if (!app.isLoggedIn) {
      app.setShowSignIn(true);
      if (window?.history?.pushState) {
        window.history.pushState({}, '', '/signin');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    app.setShowOrdersPage(true);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/orders');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  const navigateToWishlist = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    app.closeAllPages();
    app.setShowWishlist(true);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/wishlist');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  const navigateToCart = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    app.closeAllPages();
    app.setShowCartModal(true);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/cart');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  const handleCategoryClick = useCallback((category) => {
    app.closeAllPages();
    app.setCurrentCategory(category);
    app.setShowShopPage(true); // Ensure shop page is shown
    app.setIsSearching(false);
    app.setSearchQuery('');
    const categoryMap = {
      'Necklaces': 'necklace',
      'Earrings': 'earring',
      'Bangles': 'bangle',
      'Rings': 'ring',
      'Bridal Sets': 'bridal-set',
      'Temple Jewellery': 'temple-jewellery'
    };
    const categorySlug = categoryMap[category] || category.toLowerCase().replace(/\s+/g, '-');
    if (window?.history?.pushState) {
      window.history.pushState({}, '', `/shop/${categorySlug}`);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  // Product handlers
  const handleProductClick = useCallback((product) => {
    app.setSelectedProduct(product);
  }, [app]);

  const handleEyeIconClick = useCallback((e, product) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    // Add to viewed products
    const newViewed = new Set(app.viewedProducts);
    newViewed.add(product.id);
    app.setViewedProducts(newViewed);
    // Open product modal
    app.setSelectedProduct(product);
  }, [app]);

  const handleWishlistClick = useCallback((e, product) => {
    e.stopPropagation();
    const newWishlist = new Set(app.wishlistItems);
    if (newWishlist.has(product.id)) {
      newWishlist.delete(product.id);
    } else {
      newWishlist.add(product.id);
      // Show success notification when adding to wishlist
      app.setToastMessage('Product added to Wishlist');
      app.setShowToast(true);
      setTimeout(() => {
        app.setShowToast(false);
      }, 3000);
    }
    app.setWishlistItems(newWishlist);
  }, [app]);

  const handleAddToCart = useCallback((e, product) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    app.setCartItems(prev => {
      const newCart = new Map(prev);
      const currentQuantity = newCart.get(product.id) || 0;
      newCart.set(product.id, currentQuantity + 1);
      return newCart;
    });
    app.setShowCartToast(true);
    setTimeout(() => {
      app.setShowCartToast(false);
    }, 3000);
  }, [app]);

  const handleBuyNow = useCallback((e, product) => {
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    // Add product to cart with quantity 1
    app.setCartItems(new Map([[product.id, 1]]));
    app.setSelectedProduct(null);
    app.closeAllPages();
    
    if (!app.isLoggedIn) {
      // User not logged in - set checkout state and show sign in
      app.setShowCheckout(true);
      app.setCheckoutStep('address');
      app.setShowSignIn(true);
      app.setShowSignUp(false);
      // Update URL to signin but preserve checkout intent
      if (window?.history?.pushState) {
        window.history.pushState({}, '', '/signin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // User is logged in - proceed directly to checkout
      app.setShowCheckout(true);
      app.setCheckoutStep('address');
      app.setShowSignIn(false);
      app.setShowSignUp(false);
      // Update URL to checkout
      if (window?.history?.pushState) {
        window.history.pushState({}, '', '/checkout');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [app]);

  const closeModal = useCallback(() => {
    app.setSelectedProduct(null);
  }, [app]);

  // Cart calculation functions
  const getCartProducts = useCallback(() => {
    const cartProducts = [];
    app.cartItems.forEach((quantity, productId) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        cartProducts.push({ ...product, quantity });
      }
    });
    return cartProducts;
  }, [app.cartItems]);

  const getCartTotal = useCallback(() => {
    let total = 0;
    app.cartItems.forEach((quantity, productId) => {
      const product = products.find(p => p.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    });
    return total;
  }, [app.cartItems]);

  const getCartCount = useCallback(() => {
    let count = 0;
    app.cartItems.forEach(quantity => {
      count += quantity;
    });
    return count;
  }, [app.cartItems]);

  const getCartSubtotal = useCallback(() => {
    const total = getCartTotal();
    if (app.couponApplied) {
      return Math.round(total * 0.8);
    }
    return total;
  }, [getCartTotal, app.couponApplied]);

  const getCouponDiscount = useCallback(() => {
    if (app.couponApplied) {
      return Math.round(getCartTotal() * 0.2);
    }
    return 0;
  }, [getCartTotal, app.couponApplied]);

  const getShippingCost = useCallback(() => {
    const subtotal = getCartSubtotal();
    if (subtotal >= 5000) {
      return 0;
    }
    return 200;
  }, [getCartSubtotal]);

  const getFreeShippingThreshold = useCallback(() => {
    const subtotal = getCartSubtotal();
    const threshold = 5000;
    const remaining = threshold - subtotal;
    return remaining > 0 ? remaining : 0;
  }, [getCartSubtotal]);

  const getTaxAmount = useCallback(() => {
    const subtotal = getCartSubtotal();
    return Math.round(subtotal * 0.03);
  }, [getCartSubtotal]);

  const getFinalTotal = useCallback(() => {
    return getCartSubtotal() + getShippingCost() + getTaxAmount();
  }, [getCartSubtotal, getShippingCost, getTaxAmount]);

  const getProductAttributes = useCallback((product) => {
    const attributes = [];
    if (product.name.toLowerCase().includes("kundan")) {
      attributes.push("1 Gram Gold Plated with Kundan");
    } else {
      attributes.push("1 Gram Gold Plated");
    }
    if (product.name.toLowerCase().includes("diamond") || product.name.toLowerCase().includes("solitaire")) {
      attributes.push("Diamond");
    }
    attributes.push("Size: Adjustable");
    attributes.push("✓ BIS Hallmark");
    return attributes;
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    app.setCartItems(prev => {
      const newCart = new Map(prev);
      const currentQuantity = newCart.get(productId) || 0;
      if (currentQuantity > 1) {
        newCart.set(productId, currentQuantity - 1);
      } else {
        newCart.delete(productId);
      }
      if (newCart.size === 0 || (app.couponApplied && newCart.size !== prev.size)) {
        app.setCouponApplied(false);
        app.setCouponCode('');
      }
      return newCart;
    });
  }, [app]);

  const handleDeleteFromCart = useCallback((productId) => {
    app.setCartItems(prev => {
      const newCart = new Map(prev);
      newCart.delete(productId);
      if (newCart.size === 0 || app.couponApplied) {
        app.setCouponApplied(false);
        app.setCouponCode('');
      }
      return newCart;
    });
  }, [app]);

  const handleQuantityChange = useCallback((productId, newQuantity) => {
    const quantity = parseInt(newQuantity);
    if (isNaN(quantity) || quantity < 1) {
      return;
    }
    app.setCartItems(prev => {
      const newCart = new Map(prev);
      if (quantity === 0) {
        newCart.delete(productId);
        if (app.couponApplied) {
          app.setCouponApplied(false);
          app.setCouponCode('');
        }
      } else {
        newCart.set(productId, quantity);
      }
      if (newCart.size === 0 && app.couponApplied) {
        app.setCouponApplied(false);
        app.setCouponCode('');
      }
      return newCart;
    });
  }, [app]);

  const handleApplyCoupon = useCallback((e) => {
    e.preventDefault();
    if (app.couponCode.trim().toUpperCase() === 'RAJA33') {
      app.setCouponApplied(true);
    } else {
      alert('Invalid coupon code');
      app.setCouponCode('');
    }
  }, [app]);

  const handleCheckout = useCallback(() => {
    app.setShowCartModal(false);
    app.setIsSearching(false);
    
    if (!app.isLoggedIn) {
      // Set checkout state first (before navigation)
      app.setShowCheckout(true);
      app.setCheckoutStep('address');
      
      // Close other pages but preserve checkout state
      app.setShowShopPage(false);
      app.setCurrentCategory(null);
      app.setShowNewArrivals(false);
      app.setShowAboutPage(false);
      app.setShowContactPage(false);
      app.setShowWishlist(false);
      app.setShowOrdersPage(false);
      app.setShowAccountPage(false);
      app.setShowOrderConfirmation(false);
      app.setShowNotFound(false);
      
      // Navigate to sign-in page but keep checkout state
      app.setShowSignIn(true);
      app.setShowSignUp(false);
      if (window?.history?.pushState) {
        window.history.pushState({}, '', '/signin');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // User is logged in, proceed to checkout normally
      app.closeAllPages();
      app.setShowCheckout(true);
      app.setCheckoutStep('address');
      // Update URL to checkout
      if (window?.history?.pushState) {
        window.history.pushState({}, '', '/checkout');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [app]);

  // Checkout handlers
  const handleContinueToDelivery = useCallback(() => {
    if (app.addresses.length === 0) {
      alert('Please add an address before proceeding with checkout.');
      return;
    }
    if (!app.selectedAddressId) {
      alert('Please select an address before proceeding with checkout.');
      return;
    }
    app.setCheckoutStep('delivery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app]);

  const handleBackToAddress = useCallback(() => {
    app.setCheckoutStep('address');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app]);

  const handleContinueToPayment = useCallback(() => {
    if (app.addresses.length === 0) {
      alert('Please add an address before proceeding with checkout.');
      app.setCheckoutStep('address');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!app.selectedAddressId) {
      alert('Please select an address before proceeding with checkout.');
      app.setCheckoutStep('address');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!app.isLoggedIn) {
      app.setShowSignIn(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Ensure checkout is visible and set step to payment
    app.setShowCheckout(true);
    app.setCheckoutStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app]);

  const handleBackToDelivery = useCallback(() => {
    app.setCheckoutStep('delivery');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app]);

  const handleReviewOrder = useCallback(() => {
    // Validate address
    if (app.addresses.length === 0) {
      alert('Please add an address before proceeding with checkout.');
      app.setCheckoutStep('address');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!app.selectedAddressId) {
      alert('Please select an address before proceeding with checkout.');
      app.setCheckoutStep('address');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Validate payment method
    if (!app.selectedPaymentMethod) {
      alert('Please select a payment method before proceeding.');
      return;
    }
    
    // Validate card details if card payment is selected
    if (app.selectedPaymentMethod === 'card') {
      if (!app.cardDetails.cardNumber || !app.cardDetails.cardholderName || !app.cardDetails.expiryDate || !app.cardDetails.cvv) {
        alert('Please fill in all card details before proceeding.');
        return;
      }
    }
    
    // Proceed to review step
    app.setCheckoutStep('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app]);

  const handleBackToPayment = useCallback(() => {
    app.setCheckoutStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app]);

  const getDeliveryCost = useCallback(() => {
    switch (app.selectedDeliveryOption) {
      case 'express':
        return 500;
      case 'premium':
        return 1000;
      default:
        return 0;
    }
  }, [app.selectedDeliveryOption]);

  const getAdditionalOptionsCost = useCallback(() => {
    let cost = 0;
    if (app.giftWrapping) cost += 250;
    if (app.jewelleryInsurance) cost += 500;
    return cost;
  }, [app.giftWrapping, app.jewelleryInsurance]);

  const getOrderTotal = useCallback(() => {
    return getCartSubtotal() + getDeliveryCost() + getAdditionalOptionsCost();
  }, [getCartSubtotal, getDeliveryCost, getAdditionalOptionsCost]);

  const getSelectedAddress = useCallback(() => {
    return app.addresses.find(addr => addr.id === app.selectedAddressId);
  }, [app.addresses, app.selectedAddressId]);

  const getDeliveryMethodName = useCallback(() => {
    switch (app.selectedDeliveryOption) {
      case 'express':
        return 'Express Delivery - 2-3 business days';
      case 'premium':
        return 'Premium Delivery - 1 business day';
      default:
        return 'Standard Delivery - 5-7 business days';
    }
  }, [app.selectedDeliveryOption]);

  const getPaymentMethodName = useCallback(() => {
    switch (app.selectedPaymentMethod) {
      case 'card':
        return 'Credit / Debit Card';
      case 'upi':
        return 'UPI';
      case 'netbanking':
        return 'Net Banking';
      case 'cod':
        return 'Cash on Delivery';
      default:
        return 'Credit / Debit Card';
    }
  }, [app.selectedPaymentMethod]);

  const getEstimatedDeliveryDate = useCallback(() => {
    const today = new Date();
    let daysToAdd = 0;
    switch (app.selectedDeliveryOption) {
      case 'express':
        daysToAdd = 3;
        break;
      case 'premium':
        daysToAdd = 2;
        break;
      default:
        daysToAdd = 7;
    }
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[deliveryDate.getMonth()];
    const day = deliveryDate.getDate();
    const year = deliveryDate.getFullYear();
    const endDate = new Date(deliveryDate);
    endDate.setDate(deliveryDate.getDate() + 2);
    const endDay = endDate.getDate();
    const endMonth = monthNames[endDate.getMonth()];
    return `${month} ${day}-${endDay}, ${year}`;
  }, [app.selectedDeliveryOption]);

  const handlePlaceOrder = useCallback((e) => {
    if (e && e.target && e.target.checked) {
      app.setOrderTriggered(true);
      setTimeout(() => {
        const newOrderId = 'ORD' + Date.now();
        app.setOrderId(newOrderId);
        if (app.isLoggedIn) {
          const orderItems = Array.from(app.cartItems.entries()).map(([productId, quantity]) => {
            const product = products.find(p => p.id === productId);
            return product ? { ...product, quantity } : null;
          }).filter(Boolean);
          const newOrder = {
            id: newOrderId,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            items: orderItems,
            itemCount: orderItems.reduce((sum, item) => sum + item.quantity, 0),
            total: getOrderTotal(),
            status: app.userOrders.length === 0 ? 'Delivery in progress' : 'In Transit',
            deliveryDate: getEstimatedDeliveryDate()
          };
          app.setUserOrders(prev => [newOrder, ...prev]);
        }
        app.setCartItems(new Map());
        app.setShowOrderConfirmation(true);
        app.setShowCheckout(false);
        app.setOrderTriggered(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 6000);
    }
  }, [app, getOrderTotal, getEstimatedDeliveryDate]);

  const handleContinueShopping = useCallback(() => {
    app.setCartItems(new Map());
    app.setShowOrderConfirmation(false);
    app.setShowCheckout(false);
    app.setCheckoutStep('address');
    app.setCurrentCategory(null);
    app.setSelectedCategoryButton(null);
    app.setShowNewArrivals(false);
    app.setShowContactPage(false);
    app.setShowAccountPage(false);
    app.setShowWishlist(false);
    app.setShowCartModal(false);
    app.setShowOrdersPage(false);
    app.setIsSearching(false);
    app.setSearchQuery('');
    app.setShowSearchDropdown(false);
    app.setShowShopDropdown(false);
    app.setSelectedProduct(null);
    app.setMenuOpen(false);
    app.setShowShopPage(true);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/shop');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [app]);

  // Address handlers
  const handleAddAddress = useCallback(() => {
    app.setShowAddAddressForm(true);
  }, [app]);

  const handleCancelAddAddress = useCallback(() => {
    app.setShowAddAddressForm(false);
    app.setNewAddress({
      name: '',
      phone: '',
      pincode: '',
      address: '',
      city: '',
      state: ''
    });
  }, [app]);

  const handleSaveAddress = useCallback(() => {
    if (!app.newAddress.name || !app.newAddress.phone || !app.newAddress.pincode || !app.newAddress.address || !app.newAddress.city || !app.newAddress.state) {
      alert('Please fill in all fields');
      return;
    }
    const addressParts = app.newAddress.address.split(',');
    const addressLine1 = addressParts[0] || app.newAddress.address;
    const addressLine2 = addressParts.slice(1).join(',') || `${app.newAddress.city}, ${app.newAddress.state} - ${app.newAddress.pincode}`;
    const newAddressObj = {
      id: app.addresses.length + 1,
      name: app.newAddress.name,
      phone: app.newAddress.phone,
      addressLine1: addressLine1.trim(),
      addressLine2: addressLine2.trim() || `${app.newAddress.city}, ${app.newAddress.state} - ${app.newAddress.pincode}`,
      pincode: app.newAddress.pincode,
      city: app.newAddress.city,
      state: app.newAddress.state,
      isDefault: app.addresses.length === 0
    };
    app.setAddresses([...app.addresses, newAddressObj]);
    if (app.addresses.length === 0) {
      app.setSelectedAddressId(newAddressObj.id);
    }
    app.setShowAddAddressForm(false);
    app.setNewAddress({
      name: '',
      phone: '',
      pincode: '',
      address: '',
      city: '',
      state: ''
    });
  }, [app]);

  // Sign in/up handlers
  const handleSignIn = useCallback((e) => {
    e.preventDefault();
    if (!app.signInForm.termsAgreed) {
      alert('Please agree to the Terms and Services before signing in.');
      return;
    }
    
    // Store checkout state before closing modals
    const wasInCheckout = app.showCheckout;
    
    app.setIsLoggedIn(true);
    const newUserDetails = {
      email: app.signInForm.email,
      fullName: app.signInForm.email.split('@')[0],
      name: app.signInForm.email.split('@')[0],
      phone: '',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    app.setUserDetails(newUserDetails);
    app.setShowSignIn(false);
    app.setShowSignUp(false);
    app.setShowCartModal(false);
    app.setShowWishlist(false);
    app.setCurrentCategory(null);
    app.setShowShopPage(false);
    app.setShowNewArrivals(false);
    app.setIsSearching(false);
    
    // Show success animation
    app.setSuccessAnimationMessage('Welcome Back!');
    app.setShowSuccessAnimation(true);
    
    // If user was in checkout flow, redirect to checkout address step
    if (wasInCheckout) {
      // Update URL first to prevent AppRouter useEffect from interfering
      if (window?.history?.replaceState) {
        window.history.replaceState({}, '', '/checkout');
      } else if (window?.history?.pushState) {
        window.history.pushState({}, '', '/checkout');
      }
      // Close sign-in/sign-up pages first
      app.setShowSignIn(false);
      app.setShowSignUp(false);
      app.setShowAccountPage(false);
      // Then set checkout state
      app.setShowCheckout(true);
      app.setCheckoutStep('address');
      app.setShowNotFound(false);
      app.setToastMessage('Signed in successfully.');
      app.setShowToast(true);
      setTimeout(() => {
        app.setShowToast(false);
      }, 3000);
    } else if (app.showAccountPage) {
      // User is already on Account page, keep them there
      app.setShowAccountPage(true);
    } else {
      // Redirect to Account page - set URL first using replaceState to ensure it's set before state updates
      if (window?.history?.replaceState) {
        window.history.replaceState({}, '', '/account');
      } else if (window?.history?.pushState) {
        window.history.pushState({}, '', '/account');
      }
      // Close other pages manually (without closing account page)
      app.setShowShopPage(false);
      app.setCurrentCategory(null);
      app.setShowNewArrivals(false);
      app.setShowAboutPage(false);
      app.setShowContactPage(false);
      app.setShowCheckout(false);
      app.setShowCartModal(false);
      app.setShowWishlist(false);
      app.setShowOrdersPage(false);
      app.setShowOrderConfirmation(false);
      app.setShowNotFound(false);
      // Now set account page to true - this must happen after URL is set
      app.setShowAccountPage(true);
      app.setAccountPageSection('overview');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app]);

  const handleSignUp = useCallback((e) => {
    e.preventDefault();
    
    // Store checkout state before closing modals
    const wasInCheckout = app.showCheckout;
    
    app.setIsLoggedIn(true);
    if (app.showShippingAddressForm && app.signUpShippingAddress.name && app.signUpShippingAddress.address) {
      const addressParts = app.signUpShippingAddress.address.split(',');
      const addressLine1 = addressParts[0] || app.signUpShippingAddress.address;
      const addressLine2 = addressParts.slice(1).join(',') || `${app.signUpShippingAddress.city}, ${app.signUpShippingAddress.state} - ${app.signUpShippingAddress.pincode}`;
      const newAddressObj = {
        id: app.addresses.length + 1,
        name: app.signUpShippingAddress.name || app.signUpForm.fullName,
        phone: app.signUpShippingAddress.phone || app.signUpForm.phone,
        addressLine1: addressLine1.trim(),
        addressLine2: addressLine2.trim() || `${app.signUpShippingAddress.city}, ${app.signUpShippingAddress.state} - ${app.signUpShippingAddress.pincode}`,
        pincode: app.signUpShippingAddress.pincode,
        city: app.signUpShippingAddress.city,
        state: app.signUpShippingAddress.state,
        isDefault: app.addresses.length === 0
      };
      app.setAddresses([...app.addresses, newAddressObj]);
      if (app.addresses.length === 0) {
        app.setSelectedAddressId(newAddressObj.id);
      }
    }
    const newUserDetails = {
      fullName: app.signUpForm.fullName,
      email: app.signUpForm.email,
      phone: app.signUpForm.phone,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    app.setUserDetails(newUserDetails);
    app.setShowSignUp(false);
    app.setShowSignIn(false);
    app.setShowShippingAddressForm(false);
    app.setSignUpShippingAddress({
      name: '',
      phone: '',
      pincode: '',
      address: '',
      city: '',
      state: ''
    });
    app.setShowCartModal(false);
    app.setShowWishlist(false);
    app.setCurrentCategory(null);
    app.setShowShopPage(false);
    app.setShowNewArrivals(false);
    app.setIsSearching(false);
    
    // If user was in checkout flow, redirect to checkout address step
    if (wasInCheckout) {
      // Update URL first to prevent AppRouter useEffect from interfering
      if (window?.history?.replaceState) {
        window.history.replaceState({}, '', '/checkout');
      } else if (window?.history?.pushState) {
        window.history.pushState({}, '', '/checkout');
      }
      // Close sign-in/sign-up pages first
      app.setShowSignIn(false);
      app.setShowSignUp(false);
      app.setShowAccountPage(false);
      // Then set checkout state
      app.setShowCheckout(true);
      app.setCheckoutStep('address');
      app.setShowNotFound(false);
      app.setToastMessage('Account created successfully.');
      app.setShowToast(true);
      setTimeout(() => {
        app.setShowToast(false);
      }, 3000);
    } else {
      // Redirect to Account page - set URL first using replaceState to ensure it's set before state updates
      if (window?.history?.replaceState) {
        window.history.replaceState({}, '', '/account');
      } else if (window?.history?.pushState) {
        window.history.pushState({}, '', '/account');
      }
      // Close other pages manually (without closing account page)
      app.setShowShopPage(false);
      app.setCurrentCategory(null);
      app.setShowNewArrivals(false);
      app.setShowAboutPage(false);
      app.setShowContactPage(false);
      app.setShowCheckout(false);
      app.setShowCartModal(false);
      app.setShowWishlist(false);
      app.setShowOrdersPage(false);
      app.setShowOrderConfirmation(false);
      app.setShowNotFound(false);
      // Now set account page to true - this must happen after URL is set
      app.setShowAccountPage(true);
      app.setAccountPageSection('overview');
    }
    // Show success notification
    app.setToastMessage('Account created successfully.');
    app.setShowToast(true);
    setTimeout(() => {
      app.setShowToast(false);
    }, 3000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app]);

  const handleToggleShippingAddress = useCallback(() => {
    app.setShowShippingAddressForm(!app.showShippingAddressForm);
    if (!app.showShippingAddressForm) {
      app.setSignUpShippingAddress({
        ...app.signUpShippingAddress,
        name: app.signUpForm.fullName,
        phone: app.signUpForm.phone
      });
    }
  }, [app]);

  const handleSelectGoogleAccount = useCallback((account) => {
    // Store checkout state before closing modals
    const wasInCheckout = app.showCheckout;
    
    app.setIsLoggedIn(true);
    app.setUserDetails({
      fullName: account.name,
      email: account.email,
      name: account.name,
      phone: '',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    });
    app.setShowSignIn(false);
    app.setShowSignUp(false);
    app.setShowCartModal(false);
    app.setShowWishlist(false);
    app.setCurrentCategory(null);
    app.setShowShopPage(false);
    app.setShowNewArrivals(false);
    app.setIsSearching(false);
    
    // Show success animation
    app.setSuccessAnimationMessage('Welcome!');
    app.setShowSuccessAnimation(true);
    
    // If user was in checkout flow, redirect to checkout address step
    if (wasInCheckout) {
      // Update URL first to prevent AppRouter useEffect from interfering
      if (window?.history?.replaceState) {
        window.history.replaceState({}, '', '/checkout');
      } else if (window?.history?.pushState) {
        window.history.pushState({}, '', '/checkout');
      }
      // Close sign-in/sign-up pages first
      app.setShowSignIn(false);
      app.setShowSignUp(false);
      app.setShowAccountPage(false);
      // Then set checkout state
      app.setShowCheckout(true);
      app.setCheckoutStep('address');
      app.setShowNotFound(false);
      app.setToastMessage('Signed in successfully.');
      app.setShowToast(true);
      setTimeout(() => {
        app.setShowToast(false);
      }, 3000);
    } else if (app.showAccountPage) {
      // User is already on Account page, keep them there
      app.setShowAccountPage(true);
    } else {
      // Redirect to Account page - set URL first using replaceState to ensure it's set before state updates
      if (window?.history?.replaceState) {
        window.history.replaceState({}, '', '/account');
      } else if (window?.history?.pushState) {
        window.history.pushState({}, '', '/account');
      }
      // Close other pages manually (without closing account page)
      app.setShowShopPage(false);
      app.setCurrentCategory(null);
      app.setShowNewArrivals(false);
      app.setShowAboutPage(false);
      app.setShowContactPage(false);
      app.setShowCheckout(false);
      app.setShowCartModal(false);
      app.setShowWishlist(false);
      app.setShowOrdersPage(false);
      app.setShowOrderConfirmation(false);
      app.setShowNotFound(false);
      // Now set account page to true - this must happen after URL is set
      app.setShowAccountPage(true);
      app.setAccountPageSection('overview');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [app]);

  const triggerGoogleAccountButton = useCallback(() => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      try {
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'temp-google-signin-button';
        buttonContainer.style.position = 'fixed';
        buttonContainer.style.left = '-9999px';
        buttonContainer.style.opacity = '0';
        document.body.appendChild(buttonContainer);
        window.google.accounts.id.renderButton(buttonContainer, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'signin_with',
          shape: 'rectangular',
          logo_alignment: 'left',
          width: '300'
        });
        setTimeout(() => {
          const button = buttonContainer.querySelector('div[role="button"]');
          if (button) {
            button.click();
          }
          setTimeout(() => {
            if (buttonContainer.parentNode) {
              buttonContainer.parentNode.removeChild(buttonContainer);
            }
          }, 1000);
        }, 100);
      } catch (error) {
        console.error('Error triggering Google account button:', error);
      }
    }
  }, []);

  const handleGoogleCredentialResponse = useCallback((response) => {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const account = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture || '👤',
        isDefault: true
      };
      handleSelectGoogleAccount(account);
    } catch (error) {
      console.error('Error processing Google credential:', error);
      triggerGoogleAccountButton();
    }
  }, [handleSelectGoogleAccount, triggerGoogleAccountButton]);

  const handleGoogleSignIn = useCallback((source = null) => {
    if (app.showSignIn) {
      app.setGoogleSignInSource('signin');
    } else if (app.showSignUp) {
      app.setGoogleSignInSource('signup');
    } else {
      app.setGoogleSignInSource(source || 'signin');
    }
    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        try {
          const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: true
          });
          window.google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment() || notification.isDismissedMoment()) {
              triggerGoogleAccountButton();
            }
          });
        } catch (error) {
          console.error('Error initializing Google Sign-In:', error);
          triggerGoogleAccountButton();
        }
      } else {
        setTimeout(() => {
          if (window.google && window.google.accounts && window.google.accounts.id) {
            initializeGoogleSignIn();
          } else {
            console.error('Google Identity Services not available.');
            alert('Google Sign-In is not available. Please check your internet connection and try again.');
          }
        }, 500);
      }
    };
    initializeGoogleSignIn();
  }, [app, handleGoogleCredentialResponse, triggerGoogleAccountButton]);

  // Search handlers
  const handleSearchChange = useCallback((e) => {
    const query = e.target.value;
    app.setSearchQuery(query);
    app.setShowSearchDropdown(true);
    if (query.trim().length > 0) {
      app.setIsSearching(true);
      app.setCurrentCategory(null);
      app.setShowShopPage(false);
      app.setShowNewArrivals(false);
    } else {
      app.setIsSearching(false);
    }
  }, [app]);

  const clearSearch = useCallback(() => {
    app.setSearchQuery('');
    app.setIsSearching(false);
    app.setShowSearchDropdown(false);
  }, [app]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (app.searchQuery.trim()) {
      const newRecentSearches = [app.searchQuery.trim(), ...app.recentSearches.filter(s => s !== app.searchQuery.trim())].slice(0, 5);
      app.setRecentSearches(newRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
      app.setIsSearching(true);
      app.setShowSearchDropdown(false);
      app.setCurrentCategory(null);
    }
  }, [app]);

  const handleSearchClick = useCallback((searchTerm) => {
    app.setSearchQuery(searchTerm);
    app.setIsSearching(true);
    app.setShowSearchDropdown(false);
    app.setCurrentCategory(null);
    const newRecentSearches = [searchTerm, ...app.recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    app.setRecentSearches(newRecentSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newRecentSearches));
  }, [app]);

  const getSearchResults = useCallback(() => {
    if (!app.searchQuery.trim()) return [];
    const query = app.searchQuery.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.material?.toLowerCase().includes(query)
    );
  }, [app.searchQuery]);

  const trendingSearches = ['Jhumka Earrings', 'Bangles', 'Diamond Rings', 'Choker'];

  // Filter handlers
  const toggleFilter = useCallback((category) => {
    app.setFiltersOpen(prev => {
      const newState = {
        price: false,
        material: false,
        gemstone: false,
        designStyle: false,
        designer: false,
        collection: false
      };
      newState[category] = !prev[category];
      return newState;
    });
  }, [app]);

  const handleCheckboxChange = useCallback((category, value) => {
    app.setSelectedFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  }, [app]);

  const clearAllFilters = useCallback(() => {
    app.setSelectedFilters({
      material: [],
      gemstone: [],
      designStyle: [],
      designer: [],
      collection: []
    });
    app.setPriceRange([0, 50000]);
  }, [app]);

  const handlePriceChange = useCallback((index, value) => {
    const newRange = [...app.priceRange];
    newRange[index] = parseInt(value);
    if (index === 0 && newRange[0] > newRange[1]) newRange[1] = newRange[0];
    if (index === 1 && newRange[1] < newRange[0]) newRange[0] = newRange[1];
    app.setPriceRange(newRange);
  }, [app]);

  const getFilteredProducts = useCallback((productList) => {
    return productList.filter(product => {
      // Price range filter
      if (product.price < app.priceRange[0] || product.price > app.priceRange[1]) {
        return false;
      }

      // Material filter
      if (app.selectedFilters.material.length > 0) {
        const productMaterial = (product.material || '').toLowerCase();
        const matchesMaterial = app.selectedFilters.material.some(filter => 
          productMaterial.includes(filter.toLowerCase())
        );
        if (!matchesMaterial) return false;
      }

      // Gemstone filter - check tags
      if (app.selectedFilters.gemstone.length > 0) {
        const productTags = (product.tags || []).map(tag => tag.toLowerCase());
        const matchesGemstone = app.selectedFilters.gemstone.some(filter => 
          productTags.includes(filter.toLowerCase()) || 
          productTags.some(tag => tag.includes(filter.toLowerCase()))
        );
        if (!matchesGemstone) return false;
      }

      // Design Style filter - check tags and name
      if (app.selectedFilters.designStyle.length > 0) {
        const productTags = (product.tags || []).map(tag => tag.toLowerCase());
        const productName = (product.name || '').toLowerCase();
        const matchesStyle = app.selectedFilters.designStyle.some(filter => {
          const filterLower = filter.toLowerCase();
          return productTags.includes(filterLower) || 
                 productName.includes(filterLower) ||
                 productTags.some(tag => tag.includes(filterLower));
        });
        if (!matchesStyle) return false;
      }

      // Designer filter - check tags
      if (app.selectedFilters.designer.length > 0) {
        const productTags = (product.tags || []).map(tag => tag.toLowerCase());
        const matchesDesigner = app.selectedFilters.designer.some(filter => 
          productTags.includes(filter.toLowerCase())
        );
        if (!matchesDesigner) return false;
      }

      // Collection filter - check tags and category
      if (app.selectedFilters.collection.length > 0) {
        const productTags = (product.tags || []).map(tag => tag.toLowerCase());
        const productCategory = (product.category || '').toLowerCase();
        const matchesCollection = app.selectedFilters.collection.some(filter => {
          const filterLower = filter.toLowerCase();
          return productTags.includes(filterLower) || 
                 productCategory.includes(filterLower) ||
                 (filterLower.includes('bridal') && productCategory.includes('bridal')) ||
                 (filterLower.includes('new') && product.badge === 'New');
        });
        if (!matchesCollection) return false;
      }

      return true;
    });
  }, [app.priceRange, app.selectedFilters]);

  // Category handlers
  const getCategoryInfo = useCallback((category) => {
    const categoryMap = {
      'Necklaces': {
        title: 'Necklaces',
        description: 'Exquisite handcrafted necklaces featuring traditional and contemporary designs. From delicate chains to statement pieces, each necklace is crafted with precision and adorned with the finest gemstones.',
        bgImage: '/Necklace_bg.jpg',
        styles: ['Temple Necklaces', 'Choker Necklaces', 'Long Haar', 'Pendant Sets', 'Layered Necklaces', 'Antique Necklaces', 'Diamond Necklaces', 'Pearl Necklaces']
      },
      'Earrings': {
        title: 'Earrings',
        description: 'Beautiful earrings that complement your style. From elegant studs to statement jhumkas, discover our collection of handcrafted earrings.',
        bgImage: '/Earings_bg.jpg',
        styles: ['Jhumkas', 'Studs', 'Hoops', 'Danglers', 'Chandbalis', 'Temple Earrings']
      },
      'Bangles': {
        title: 'Bangles',
        description: 'Traditional and modern bangles that add elegance to your wrist. Crafted with attention to detail and premium materials.',
        bgImage: '/Bangles_bg.jpg',
        styles: ['Traditional Bangles', 'Kadas', 'Churis', 'Stackable Bangles', 'Antique Bangles']
      },
      'Rings': {
        title: 'Rings',
        description: 'Stunning rings for every occasion. From engagement rings to statement pieces, find the perfect ring to express your style.',
        bgImage: '/Rings_bg.jpg',
        styles: ['Solitaire Rings', 'Cocktail Rings', 'Stackable Rings', 'Antique Rings', 'Temple Rings']
      },
      'Bridal Sets': {
        title: 'Bridal Sets',
        description: 'Complete bridal jewellery sets that make your special day unforgettable. Exquisite designs crafted for the modern bride.',
        bgImage: '/Bridal_set_bg.jpg',
        styles: ['Traditional Sets', 'Contemporary Sets', 'Antique Sets', 'Temple Sets']
      },
      'Temple Jewellery': {
        title: 'Temple Jewellery',
        description: 'Sacred and elegant temple jewellery inspired by traditional designs. Perfect for special occasions and ceremonies.',
        bgImage: '/Temple_Jewellery_bg.jpg',
        styles: ['Temple Necklaces', 'Temple Earrings', 'Temple Sets', 'Antique Temple']
      }
    };
    return categoryMap[category] || categoryMap['Necklaces'];
  }, []);

  const getCategoryProducts = useCallback((category) => {
    if (!category || !products || products.length === 0) {
      return [];
    }
    
    let filteredProducts = products.filter(product => {
      if (!product || !product.name) return false;
      const name = product.name.toLowerCase();
      if (category === 'Necklaces') {
        return name.includes('necklace');
      } else if (category === 'Earrings') {
        return name.includes('earring') || name.includes('earing');
      } else if (category === 'Bangles') {
        return name.includes('bangle');
      } else if (category === 'Rings') {
        return name.includes('ring') && !name.includes('earring') && !name.includes('earing');
      } else if (category === 'Bridal Sets') {
        return name.includes('bridal') || (name.includes('set') && !name.includes('temple'));
      } else if (category === 'Temple Jewellery') {
        return name.includes('temple');
      }
      return false;
    }).filter(product => {
      // Apply price filter
      if (product.price < app.priceRange[0] || product.price > app.priceRange[1]) {
        return false;
      }
      return true;
    });

    // Apply sorting
    const sortedProducts = [...filteredProducts];
    switch (app.sortOption) {
      case 'Price: Low to High':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Newest First':
        sortedProducts.sort((a, b) => b.id - a.id);
        break;
      case 'Most Popular':
        sortedProducts.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'Featured':
      default:
        sortedProducts.sort((a, b) => {
          const aHasBadge = a.badge ? 1 : 0;
          const bHasBadge = b.badge ? 1 : 0;
          if (aHasBadge !== bHasBadge) {
            return bHasBadge - aHasBadge;
          }
          if (a.rating !== b.rating) {
            return b.rating - a.rating;
          }
          return (b.reviews || 0) - (a.reviews || 0);
        });
        break;
    }
    return sortedProducts;
  }, [app.priceRange, app.sortOption]);

  // New Arrivals handlers
  const getNewArrivalsProducts = useCallback(() => {
    const necklaceProducts = products.filter(p => p.name.toLowerCase().includes('necklace')).slice(0, 1);
    const bangleProducts = products.filter(p => p.name.toLowerCase().includes('bangle')).slice(0, 1);
    const antiqueGoldRing = products.find(p => p.name === "Antique Gold Ring");
    const otherRingProducts = products.filter(p => 
      p.name.toLowerCase().includes('ring') && p.name !== "Antique Gold Ring"
    ).slice(0, 1);
    const newArrivals = [
      ...necklaceProducts,
      ...bangleProducts,
      antiqueGoldRing,
      ...otherRingProducts
    ].filter(Boolean);
    return newArrivals;
  }, []);

  const getFilteredNewArrivalsProducts = useCallback(() => {
    const allNewArrivals = getNewArrivalsProducts();
    if (!app.selectedNewArrivalsCategory) {
      return allNewArrivals;
    }
    return allNewArrivals.filter(product => {
      const name = product.name.toLowerCase();
      switch (app.selectedNewArrivalsCategory) {
        case 'Necklaces':
          return name.includes('necklace');
        case 'Rings':
          return name.includes('ring');
        case 'Earrings':
          return name.includes('earring');
        case 'Bangles':
          return name.includes('bangle');
        default:
          return true;
      }
    });
  }, [getNewArrivalsProducts, app.selectedNewArrivalsCategory]);

  // Wishlist handlers
  const getWishlistProducts = useCallback(() => {
    return products.filter(product => app.wishlistItems.has(product.id));
  }, [app.wishlistItems]);

  // Recommended products for home page
  const getRecommendedProducts = useCallback(() => {
    const wishlistProducts = getWishlistProducts();
    if (wishlistProducts.length > 0) {
      const wishlistCategories = new Set();
      wishlistProducts.forEach(product => {
        const name = product.name.toLowerCase();
        if (name.includes('necklace')) wishlistCategories.add('necklace');
        if (name.includes('earring')) wishlistCategories.add('earring');
        if (name.includes('ring')) wishlistCategories.add('ring');
        if (name.includes('bangle')) wishlistCategories.add('bangle');
        if (name.includes('bridal')) wishlistCategories.add('bridal');
        if (name.includes('temple')) wishlistCategories.add('temple');
      });
      const recommended = products.filter(product => {
        if (app.wishlistItems.has(product.id)) return false;
        const name = product.name.toLowerCase();
        for (const category of wishlistCategories) {
          if (name.includes(category)) return true;
        }
        return false;
      });
      return recommended.slice(0, 4);
    }
    return [];
  }, [getWishlistProducts, app.wishlistItems]);

  // Trending products for home page
  const getTrendingProducts = useCallback(() => {
    const recommendedProducts = getRecommendedProducts();
    const recommendedIds = new Set(recommendedProducts.map(p => p.id));
    
    // Get trending products (sorted by reviews and rating, excluding recommended products)
    const trending = products
      .filter(product => !recommendedIds.has(product.id))
      .sort((a, b) => {
        // Sort by reviews first, then by rating
        const reviewDiff = (b.reviews || 0) - (a.reviews || 0);
        if (reviewDiff !== 0) return reviewDiff;
        return (b.rating || 0) - (a.rating || 0);
      })
      .slice(0, 4);
    
    return trending;
  }, [getRecommendedProducts]);

  // Contact form handler
  const handleContactFormSubmit = useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone') || 'Not provided';
    const subject = formData.get('subject');
    const message = formData.get('message');
    const serviceLabels = {
      'general': 'General Enquiry',
      'custom': 'Custom Jewellery Design',
      'order': 'Order / Delivery',
      'support': 'After-Sales Support'
    };
    const serviceLabel = serviceLabels[subject] || subject;
    const formattedMessage = `Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${serviceLabel}\nMessage: ${message}`;
    const whatsappMessage = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/911234567890?text=${whatsappMessage}`, '_blank');
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
    let emailSent = false;
    try {
      if (EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        const emailParams = {
          from_name: name,
          from_email: email,
          phone: phone,
          service: serviceLabel,
          message: message,
          formatted_message: formattedMessage,
          to_email: 'info@rajasekharjewellery.com',
          subject: `Contact Form: ${serviceLabel} - ${name}`,
          reply_to: email
        };
        const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams);
        if (response && response.status === 200) {
          emailSent = true;
        }
      }
    } catch (error) {
      console.error('EmailJS Error Details:', error);
      emailSent = false;
    }
    if (emailSent) {
      alert('Thank you for your message! Your details have been sent via WhatsApp and email. We will get back to you soon.');
    } else if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      alert('Thank you for your message! Your details have been sent via WhatsApp. We will get back to you soon.\n\nNote: EmailJS is not configured yet. Please configure EmailJS credentials in the code to enable email delivery.');
    } else {
      alert('Thank you for your message! Your details have been sent via WhatsApp. We will get back to you soon.\n\nNote: There was an issue sending the email. Please check the console for details or contact us directly.');
    }
    e.target.reset();
  }, []);

  // Navigation helpers
  const handleShopDropdownToggle = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    app.setShowShopDropdown(!app.showShopDropdown);
  }, [app]);

  const handleNewArrivalsClick = useCallback((e) => {
    navigateToNewArrivals(e);
  }, [navigateToNewArrivals]);

  // Home page slide handlers
  const goToSlide = useCallback((index) => {
    app.setCurrentSlide(index);
  }, [app]);

  const prevSlide = useCallback(() => {
    app.setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  }, [app]);

  const nextSlide = useCallback(() => {
    app.setCurrentSlide((prev) => (prev + 1) % 3);
  }, [app]);

  // Return all handlers and state as individual properties
  return {
    ...app,
    products,
    getProductImage,
    getProductDescription,
    navigateToHome,
    navigateToShop,
    navigateToNewArrivals,
    navigateToAbout,
    navigateToContact,
    navigateToAccount,
    navigateToOrders,
    navigateToWishlist,
    navigateToCart,
    handleCategoryClick,
    handleProductClick,
    handleEyeIconClick,
    handleWishlistClick,
    handleAddToCart,
    handleBuyNow,
    closeModal,
    getCartProducts,
    getCartTotal,
    getCartCount,
    getCartSubtotal,
    getCouponDiscount,
    getShippingCost,
    getFreeShippingThreshold,
    getTaxAmount,
    getFinalTotal,
    getProductAttributes,
    handleRemoveFromCart,
    handleDeleteFromCart,
    handleQuantityChange,
    handleApplyCoupon,
    handleCheckout,
    handleContinueToDelivery,
    handleBackToAddress,
    handleContinueToPayment,
    handleBackToDelivery,
    handleReviewOrder,
    handleBackToPayment,
    getDeliveryCost,
    getAdditionalOptionsCost,
    getOrderTotal,
    getSelectedAddress,
    getDeliveryMethodName,
    getPaymentMethodName,
    getEstimatedDeliveryDate,
    handlePlaceOrder,
    handleContinueShopping,
    handleAddAddress,
    handleCancelAddAddress,
    handleSaveAddress,
    handleSignIn,
    handleSignUp,
    handleToggleShippingAddress,
    handleGoogleSignIn,
    handleSearchChange,
    clearSearch,
    handleSearchSubmit,
    handleSearchClick,
    getSearchResults,
    trendingSearches,
    toggleFilter,
    handleCheckboxChange,
    clearAllFilters,
    handlePriceChange,
    getFilteredProducts,
    getCategoryInfo,
    getCategoryProducts,
    getNewArrivalsProducts,
    getFilteredNewArrivalsProducts,
    getWishlistProducts,
    getRecommendedProducts,
    getTrendingProducts,
    handleContactFormSubmit,
    handleShopDropdownToggle,
    handleNewArrivalsClick,
    goToSlide,
    prevSlide,
    nextSlide,
  };
};
