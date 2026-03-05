import React, { useRef, useState, useEffect } from 'react';

const shopCategories = [
  {
    name: 'Necklace sets',
    image: '/Necklaces.jpg',
    subcategories: ['Temple collection', 'Antique sets', 'Cz Necklace sets', 'Kundan sets', 'Victorian sets', 'Pendent Necklace set', 'Plain Sets', 'Painted sets', 'Silver sets', 'Ganga jamuna', 'Kanti Sets', 'Kasula sets', 'Step Necklace sets', 'Stone Sets']
  },
  { name: 'Haram', image: '/Haram.jpg', subcategories: [] },
  { name: 'Combo set', image: '/combo_set.jpg', subcategories: [] },
  { name: 'Wedding collection', image: '/Wedding_collection.jpg', subcategories: [] },
  {
    name: 'Earrings',
    image: '/Earings.jpg',
    subcategories: ['Antique', 'Studs', 'Jhumka', 'Cz Earrings', 'Tops', 'Hanging', 'Chandbali', 'Ear Cuffs', 'Kundan', 'Victorian']
  },
  {
    name: 'Bangles',
    image: '/Bangles.jpg',
    subcategories: ['Temple Bangles', 'Antique', 'Cz Bangles', 'Kundan', 'C Bangles', 'Plain Bangles', 'Kada', 'Bracelet']
  },
  {
    name: 'Hip belts',
    image: '/Hip_beads.jpg',
    subcategories: ['Temple Hip Belt', 'Antique Hip Belt', 'Pendent Hip Belt', 'Kundan Hip Belt', 'Chain Hip Belt', 'Pearl Hip Belt', 'Ganga Jamuna Hip Belt', 'Silver Hip Belt', 'Victorian Hip Belt']
  },
  {
    name: 'Accessories',
    image: '/Accessories.jpg',
    subcategories: ['Hair Accessories (Big Tika)', 'Jada', 'Jada Billalu', 'Tika', 'Chepaswaralu', 'Pendent sets', 'Surya Chandrulu', "God Idol's", 'Kunkumabarina', 'Hair Clips', 'Saree pins', 'Matilu', 'Anklets', 'Nose Pin', 'Nath', 'Lockets', 'Finger Rings', 'Hand panja', 'Hand Chocker', 'Jada Kuchulu']
  },
  {
    name: "Gentlemen's items",
    image: '/Gentlemen_items.jpg',
    subcategories: ['Chains', 'Braclets', 'Finger Rings', 'Kada', 'Puligoru']
  },
  { name: 'Beads', image: '/Beads.jpg', subcategories: [] },
  { name: 'Mangalsutra', image: '/Mangalsutra.jpg', subcategories: [] },
  { name: 'Sarudu', image: '/Sarudu.jpg', subcategories: [] },
  { name: 'Chains', image: '/Chains.jpg', subcategories: [] },
  { name: 'Choker sets', image: '/Choker_sets.jpg', subcategories: [] }
];

const Navigation = ({
  // State
  menuOpen = false,
  setMenuOpen,
  showShopSubmenu = false,
  setShowShopSubmenu,
  showShopDropdown = false,
  setShowShopDropdown,
  searchQuery = '',
  setSearchQuery,
  showSearchDropdown = false,
  setShowSearchDropdown,
  recentSearches = [],
  isSearching = false,
  wishlistItems = new Set(),
  cartItems = new Map(),
  isLoggedIn = false,
  userDetails = null,
  showAccountDropdown = false,
  setShowAccountDropdown,
  userOrders = [],
  // Functions
  navigateToHome,
  navigateToShop,
  navigateToAbout,
  navigateToContact,
  handleShopDropdownToggle,
  handleCategoryClick,
  handleNewArrivalsClick,
  handleSearchChange,
  handleSearchSubmit,
  handleSearchClick,
  getSearchResults,
  navigateToOrders,
  navigateToWishlist,
  navigateToCart,
  navigateToAccount,
  getCartCount,
  closeAllPages,
  navigateToNewArrivals,
  setIsLoggedIn,
  setUserDetails,
  setShowCheckout,
  setShowCartModal,
  setShowWishlist,
  setShowLogoutConfirm,
  // Constants
  trendingSearches = []
}) => {
  const hamburgerRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const [currentPath, setCurrentPath] = useState(typeof window !== 'undefined' ? window.location.pathname : '');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [activeMegaCategory, setActiveMegaCategory] = useState(shopCategories[0]);

  // Listen to URL changes to update active state
  useEffect(() => {
    const updatePath = () => {
      if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname);
      }
    };

    // Update on initial load
    updatePath();

    // Listen to popstate events (back/forward button)
    window.addEventListener('popstate', updatePath);

    // Override pushState and replaceState to detect navigation
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      setTimeout(updatePath, 0);
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      setTimeout(updatePath, 0);
    };

    // Also check periodically (fallback for programmatic navigation)
    const interval = setInterval(updatePath, 200);

    return () => {
      window.removeEventListener('popstate', updatePath);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      clearInterval(interval);
    };
  }, []);

  // Determine active page from URL – Home only when path is exactly /
  const getActivePage = () => {
    const path = (currentPath || '').replace(/\/$/, '') || '/';
    if (path === '/shop' || path.startsWith('/shop/')) return 'shop';
    if (path === '/new-arrivals') return 'new-arrivals';
    if (path === '/about') return 'about';
    if (path === '/contact') return 'contact';
    if (path === '/account' || path === '/signin') return 'account'; /* sign-in = account flow, highlight Account */
    if (path === '/orders') return 'orders';
    if (path === '/wishlist') return 'wishlist';
    if (path === '/cart') return 'cart';
    if (path === '/' || path === '') return 'home';
    return null; /* checkout, etc. – no nav item active */
  };

  const activePage = getActivePage();

  return (
    <>
      {/* Main Header - Navigation Bar */}
      <header className="main-header">
        <div className="content-width main-header-inner">
          <div className="logo-area">
            <img src="/logo.jpg.jpeg" alt="Rajasekhar Art Jewellery Logo" className="logo-icon" style={{ objectFit: 'cover', padding: 0 }} />
            <div className="logo-text">
              <h1>Rajasekhar Art Jewellery</h1>
            </div>
          </div>

          <div className="nav-and-search">
            <nav className="nav-links">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  if (navigateToHome) navigateToHome(e);
                }}
                className={activePage === 'home' ? 'active' : ''}
              >
                Home
              </a>
              <div className="nav-dropdown-wrapper">
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    if (handleShopDropdownToggle) handleShopDropdownToggle(e);
                  }}
                  className={activePage === 'shop' || showShopDropdown ? 'active' : ''}
                >
                  Shop ▾
                </a>
                {showShopDropdown && (
                  <div className="shop-dropdown mega-menu-container">
                    <div className="mega-menu-top-row">
                      {shopCategories.map((category) => (
                        <a
                          key={category.name}
                          href={`/shop/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                          onMouseEnter={() => setActiveMegaCategory(category)}
                          onClick={(e) => {
                            e.preventDefault();
                            if (handleCategoryClick) handleCategoryClick(category.name);
                          }}
                          className={activeMegaCategory?.name === category.name ? 'active-mega-category' : ''}
                        >
                          <div className="dropdown-icon">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="dropdown-image"
                            />
                          </div>
                          <span className="dropdown-text">{category.name}</span>
                        </a>
                      ))}
                    </div>

                    {activeMegaCategory && activeMegaCategory.subcategories && activeMegaCategory.subcategories.length > 0 && (
                      <div className="mega-menu-bottom-row">
                        {activeMegaCategory.subcategories.map((sub) => (
                          <a
                            key={sub}
                            href={`/shop/${activeMegaCategory.name.toLowerCase().replace(/\s+/g, '-')}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={(e) => {
                              e.preventDefault();
                              if (handleCategoryClick) handleCategoryClick(sub); // Reusing handleCategoryClick for subcategories
                            }}
                            className="subcategory-link"
                          >
                            <span className="sub-text">{sub}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <a
                href="/new-arrivals"
                onClick={(e) => {
                  e.preventDefault();
                  if (handleNewArrivalsClick) handleNewArrivalsClick(e);
                }}
                className={activePage === 'new-arrivals' ? 'active' : ''}
              >
                New Arrivals
              </a>
            </nav>

            <div className="search-box-wrapper">
              <form
                className="search-box"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (handleSearchSubmit) {
                    handleSearchSubmit(e);
                  }
                }}
              >
                <input
                  ref={searchInputRef}
                  className="search-input"
                  placeholder="Search for jewellery, categories, materials..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSearchDropdown(true)}
                />
                <button
                  type="submit"
                  className="search-button"
                  aria-label="Search"
                  onClick={(e) => {
                    // If input is not focused, focus it instead of submitting
                    if (searchInputRef.current && document.activeElement !== searchInputRef.current) {
                      e.preventDefault();
                      e.stopPropagation();
                      searchInputRef.current.focus();
                      // Show dropdown when focusing
                      if (setShowSearchDropdown) {
                        setShowSearchDropdown(true);
                      }
                    }
                    // If input is already focused and has text, let form submit naturally
                    // If input is focused but empty, prevent submit and keep focus
                    if (searchInputRef.current && document.activeElement === searchInputRef.current && !searchQuery.trim()) {
                      e.preventDefault();
                    }
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ pointerEvents: 'none' }}>
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#5C3E90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }} />
                  </svg>
                </button>
              </form>
              {showSearchDropdown && (
                <div className="search-dropdown">
                  {searchQuery && searchQuery.trim() ? (
                    <div className="search-results">
                      {getSearchResults && getSearchResults().length > 0 ? (
                        getSearchResults().slice(0, 5).map((product) => (
                          <div
                            key={product.id}
                            className="search-result-item"
                            onClick={() => handleSearchClick && handleSearchClick(product.name)}
                          >
                            <span className="search-icon">🔍</span>
                            <span>{product.name}</span>
                          </div>
                        ))
                      ) : (
                        <div className="search-no-results">No results found</div>
                      )}
                    </div>
                  ) : (
                    <>
                      {recentSearches && recentSearches.length > 0 && (
                        <div className="search-section">
                          <div className="search-section-header">
                            <span className="search-section-icon">🕐</span>
                            <h3 className="search-section-title">Recent Searches</h3>
                          </div>
                          <div className="search-tags">
                            {recentSearches && recentSearches.map((search, index) => (
                              <button
                                key={index}
                                className="search-tag"
                                onClick={() => handleSearchClick && handleSearchClick(search)}
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="search-section">
                        <div className="search-section-header">
                          <h3 className="search-section-title">Trending Searches</h3>
                        </div>
                        <div className="search-tags">
                          {trendingSearches && trendingSearches.map((search, index) => (
                            <button
                              key={index}
                              className="search-tag"
                              onClick={() => handleSearchClick && handleSearchClick(search)}
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Search, Wishlist, Cart, and Hamburger icons - all in one row on the left */}
          <div className="header-icons-mobile">
            <div className="icon-item mobile-search-icon">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowMobileSearch(true);
                  // Focus search input after modal opens
                  setTimeout(() => {
                    if (mobileSearchInputRef.current) {
                      mobileSearchInputRef.current.focus();
                    }
                  }, 100);
                }}
                aria-label="Search"
              >
                🔍
              </button>
            </div>
            <div className="icon-item">
              <button onClick={(e) => navigateToWishlist(e)}>
                {wishlistItems.size > 0 && <span className="wishlist-badge">{wishlistItems.size}</span>}
                <span className="wishlist-heart">🤍</span>
              </button>
            </div>
            <div className="icon-item">
              <button onClick={(e) => navigateToCart(e)}>
                {getCartCount() > 0 && <span className="wishlist-badge">{getCartCount()}</span>}
                🛒
              </button>
            </div>
            <button
              ref={hamburgerRef}
              className="hamburger mobile-hamburger"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Open menu"
              type="button"
              data-testid="hamburger-button"
            >
              ☰
            </button>
          </div>

          {/* Desktop: Header icons */}
          <div className="header-icons">
            <div className={`icon-item${activePage === 'orders' ? ' active' : ''}`}>
              <button onClick={(e) => navigateToOrders(e)}>
                {isLoggedIn && userOrders.length > 0 && <span className="wishlist-badge">{userOrders.length}</span>}
                📦
              </button>
              <span>Order</span>
            </div>
            <div className={`icon-item${activePage === 'wishlist' ? ' active' : ''}`}>
              <button onClick={(e) => navigateToWishlist(e)}>
                {wishlistItems.size > 0 && <span className="wishlist-badge">{wishlistItems.size}</span>}
                <span className="wishlist-heart">🤍</span>
              </button>
              <span>Wishlist</span>
            </div>
            <div className={`icon-item${activePage === 'cart' ? ' active' : ''}`}>
              <button onClick={(e) => navigateToCart(e)}>
                {getCartCount() > 0 && <span className="wishlist-badge">{getCartCount()}</span>}
                🛒
              </button>
              <span>Cart</span>
            </div>
            <div className={`icon-item account-dropdown-wrapper${activePage === 'account' ? ' active' : ''}`}>
              <button onClick={(e) => navigateToAccount(e)}>
                <span className="account-icon">👤</span>
              </button>
              <span>Account</span>
              {isLoggedIn && showAccountDropdown && (
                <div className="account-dropdown">
                  <div className="account-dropdown-header">
                    <div className="account-avatar">👤</div>
                    <div className="account-info">
                      <div className="account-name">{userDetails?.fullName || userDetails?.name || 'User'}</div>
                      <div className="account-email">{userDetails?.email || ''}</div>
                    </div>
                  </div>
                  <div className="account-dropdown-divider"></div>
                  <div className="account-details">
                    <div className="account-detail-item">
                      <span className="account-detail-label">Full Name:</span>
                      <span className="account-detail-value">{userDetails?.fullName || 'Not provided'}</span>
                    </div>
                    <div className="account-detail-item">
                      <span className="account-detail-label">Email:</span>
                      <span className="account-detail-value">{userDetails?.email || 'Not provided'}</span>
                    </div>
                    <div className="account-detail-item">
                      <span className="account-detail-label">Phone:</span>
                      <span className="account-detail-value">{userDetails?.phone || 'Not provided'}</span>
                    </div>
                  </div>
                  <div className="account-dropdown-divider"></div>
                  <button
                    className="account-logout-btn"
                    onClick={() => {
                      setShowAccountDropdown(false);
                      if (setShowLogoutConfirm) {
                        setShowLogoutConfirm(true);
                      }
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Desktop hamburger - hidden on mobile */}
          <button
            ref={hamburgerRef}
            className="hamburger desktop-hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Open menu"
            type="button"
            data-testid="hamburger-button"
          >
            ☰
          </button>
        </div>
      </header>

      {/* Mobile Menu - Always render at root level to ensure it works from any page */}
      {menuOpen ? (
        <div
          className="mobile-menu-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMenuOpen(false);
              setShowShopSubmenu(false);
            }
          }}
          style={{
            position: 'fixed',
            zIndex: 999999,
            pointerEvents: 'auto'
          }}
        >
          <div
            className="mobile-menu"
            onClick={(e) => e.stopPropagation()}
            onScroll={(e) => {
              e.stopPropagation();
              // Prevent scroll from propagating to background
            }}
            onWheel={(e) => {
              // Allow scrolling inside menu, prevent background scroll
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              // Allow touch scrolling inside menu, prevent background scroll
              e.stopPropagation();
            }}
            style={{
              pointerEvents: 'auto',
              position: 'relative',
              overflowY: 'auto',
              maxHeight: '100vh'
            }}
          >
            <button
              onClick={() => {
                setMenuOpen(false);
                setShowShopSubmenu(false);
              }}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'transparent',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px',
                color: '#351845',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
              aria-label="Close menu"
            >
              ✕
            </button>
            <div style={{ position: 'relative', borderBottom: "1px solid #f0e5ff", paddingBottom: "12px", marginBottom: "16px", paddingTop: '0' }}>
              <div className="logo-area" style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '16px' }}>
                <img src="/logo.jpg.jpeg" alt="Rajasekhar Art Jewellery Logo" className="logo-icon" style={{ objectFit: 'cover', padding: 0 }} />
                <div className="logo-text">
                  <h1 style={{ fontWeight: 'bold', margin: 0, padding: 0, color: '#5f2b7f' }}>Rajasekhar Art Jewellery</h1>
                </div>
              </div>
            </div>

            {!showShopSubmenu ? (
              <nav>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMenuOpen(false);
                    if (closeAllPages) closeAllPages();
                    if (navigateToHome) navigateToHome(e);
                  }}
                >
                  Home
                </a>
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowShopSubmenu(true);
                  }}
                >
                  Shop →
                </a>
                <a
                  href="/new-arrivals"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMenuOpen(false);
                    if (closeAllPages) closeAllPages();
                    if (navigateToNewArrivals) navigateToNewArrivals(e);
                  }}
                >
                  New Arrivals
                </a>
                <a
                  href="/orders"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMenuOpen(false);
                    if (closeAllPages) closeAllPages();
                    if (navigateToOrders) navigateToOrders(e);
                  }}
                >
                  Orders {isLoggedIn && userOrders.length > 0 && <span style={{ marginLeft: '8px', color: '#5f2b7f' }}>({userOrders.length})</span>}
                </a>
                <a
                  href="/account"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMenuOpen(false);
                    if (closeAllPages) closeAllPages();
                    if (navigateToAccount) navigateToAccount(e);
                  }}
                >
                  Account
                </a>
              </nav>
            ) : (
              <nav>
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowShopSubmenu(false);
                  }}
                  style={{ fontWeight: 'bold', color: '#351845' }}
                >
                  ← Back
                </a>
                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMenuOpen(false);
                    setShowShopSubmenu(false);
                    if (closeAllPages) closeAllPages();
                    if (navigateToShop) navigateToShop(e);
                  }}
                >
                  All product
                </a>
                {shopCategories.map((category) => (
                  <React.Fragment key={category.name}>
                    <a
                      href={`/shop/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setMenuOpen(false);
                        setShowShopSubmenu(false);
                        if (closeAllPages) closeAllPages();
                        if (handleCategoryClick) handleCategoryClick(category.name);
                      }}
                    >
                      {category.name}
                    </a>
                    {category.subcategories && category.subcategories.length > 0 && (
                      <div className="mobile-subcategories" style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                        {category.subcategories.map((sub) => (
                          <a
                            key={sub}
                            href={`/shop/${category.name.toLowerCase().replace(/\s+/g, '-')}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setMenuOpen(false);
                              setShowShopSubmenu(false);
                              if (closeAllPages) closeAllPages();
                              if (handleCategoryClick) handleCategoryClick(sub);
                            }}
                            style={{ fontSize: '14px', padding: '8px 0', color: '#666' }}
                          >
                            - {sub}
                          </a>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            )}

            <div className="contact-block">
              <p>📍 Opposite R9000, Trunk Road, Nellore 524001</p>
              <p style={{ marginTop: "8px" }}>📞 +91 1234567890</p>
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div
          className="mobile-search-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowMobileSearch(false);
              setShowSearchDropdown(false);
            }
          }}
        >
          <div
            className="mobile-search-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-search-header">
              <button
                className="mobile-search-close"
                onClick={() => {
                  setShowMobileSearch(false);
                  setShowSearchDropdown(false);
                }}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
            <div className="mobile-search-content">
              <form
                className="mobile-search-box"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (handleSearchSubmit) {
                    handleSearchSubmit(e);
                    setShowMobileSearch(false);
                  }
                }}
              >
                <input
                  ref={mobileSearchInputRef}
                  className="mobile-search-input"
                  placeholder="Search for jewellery, categories, materials..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSearchDropdown(true)}
                />
                <button
                  type="submit"
                  className="mobile-search-button"
                  aria-label="Search"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
              {showSearchDropdown && (
                <div className="mobile-search-dropdown">
                  {searchQuery && searchQuery.trim() ? (
                    <div className="search-results">
                      {getSearchResults && getSearchResults().length > 0 ? (
                        getSearchResults().slice(0, 5).map((product) => (
                          <div
                            key={product.id}
                            className="search-result-item"
                            onClick={() => {
                              if (handleSearchClick) {
                                handleSearchClick(product.name);
                                setShowMobileSearch(false);
                              }
                            }}
                          >
                            <span className="search-icon">🔍</span>
                            <span>{product.name}</span>
                          </div>
                        ))
                      ) : (
                        <div className="search-no-results">No results found</div>
                      )}
                    </div>
                  ) : (
                    <>
                      {recentSearches && recentSearches.length > 0 && (
                        <div className="search-section">
                          <div className="search-section-header">
                            <span className="search-section-icon">🕐</span>
                            <h3 className="search-section-title">Recent Searches</h3>
                          </div>
                          <div className="search-tags">
                            {recentSearches.map((search, index) => (
                              <button
                                key={index}
                                className="search-tag"
                                onClick={() => {
                                  if (handleSearchClick) {
                                    handleSearchClick(search);
                                    setShowMobileSearch(false);
                                  }
                                }}
                              >
                                {search}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="search-section">
                        <div className="search-section-header">
                          <h3 className="search-section-title">Trending Searches</h3>
                        </div>
                        <div className="search-tags">
                          {trendingSearches && trendingSearches.map((search, index) => (
                            <button
                              key={index}
                              className="search-tag"
                              onClick={() => {
                                if (handleSearchClick) {
                                  handleSearchClick(search);
                                  setShowMobileSearch(false);
                                }
                              }}
                            >
                              {search}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

