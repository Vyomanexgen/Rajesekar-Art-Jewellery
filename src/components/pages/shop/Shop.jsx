import React, { useEffect, useState, useMemo } from 'react';
import Footer from '../../layout/Footer';

const Shop = ({ handlers }) => {
  // State for selected product in All Products view
  const [selectedProductId, setSelectedProductId] = useState(null);
  // State for selected category in All Products view
  const [selectedAllProductsCategory, setSelectedAllProductsCategory] = useState('Necklaces');
  // Add safety checks
  if (!handlers) {
    return <div>Error: Shop component is missing required handlers</div>;
  }

  const {
    currentCategory,
    showShopPage,
    priceRange = [0, 50000],
    filtersOpen = { price: false, material: false, gemstone: false, designStyle: false, designer: false, collection: false },
    selectedFilters = { material: [], gemstone: [], designStyle: [], designer: [], collection: [] },
    sortOption = 'Featured',
    productViewMode = 'list',
    showMobileFilters = false,
    selectedCategoryButton,
    products = [],
    getCategoryInfo,
    getCategoryProducts,
    getFilteredProducts,
    getProductDescription,
    toggleFilter,
    handleCheckboxChange,
    clearAllFilters,
    handlePriceChange,
    setSortOption,
    setShowSortDropdown,
    showSortDropdown = false,
    setProductViewMode,
    setShowMobileFilters,
    setSelectedCategoryButton,
    setCurrentCategory,
    currentPage,
    setCurrentPage,
    handleProductClick,
    viewedProducts = new Set(),
    handleEyeIconClick,
    wishlistItems = new Set(),
    handleWishlistClick,
    handleAddToCart,
    handleBuyNow,
    getProductImage,
    navigateToHome,
    navigateToShop,
    navigateToAbout,
    navigateToContact,
    navigateToAccount,
    navigateToOrders,
    handleCategoryClick,
  } = handlers;

  // Safety check for required functions
  if (!getCategoryProducts || !getFilteredProducts || !getProductImage) {
    return <div>Error: Shop component is missing required functions</div>;
  }

  // Get products to display
  const getDisplayProducts = () => {
    try {
      if (currentCategory) {
        // Show products for specific category
        if (!getCategoryProducts) return [];
        const categoryProducts = getCategoryProducts(currentCategory);
        return Array.isArray(categoryProducts) ? categoryProducts : [];
      } else if (showShopPage) {
        // Show all products (All Products page)
        const allProducts = getFilteredProducts(products || []);
        // Apply sorting
        const sortedProducts = [...allProducts];
        switch (sortOption) {
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
      }
      return [];
    } catch (_err) {
      return [];
    }
  };

  const allDisplayProducts = getDisplayProducts() || [];

  // Get total products count from All Products page (unfiltered, all categories)
  const totalAllProducts = Array.isArray(products) ? products.length : 0;

  // Pagination logic - apply to all category pages
  const productsPerPage = 15;
  const totalPages = Math.ceil(allDisplayProducts.length / productsPerPage);

  // Reset to page 1 when category or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [currentCategory, priceRange, selectedFilters, sortOption, setCurrentPage]);

  // Get paginated products
  const displayProducts = allDisplayProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  let categoryInfo = null;
  try {
    categoryInfo = currentCategory && getCategoryInfo ? getCategoryInfo(currentCategory) : null;
  } catch (_err) {
    categoryInfo = null;
  }

  // Category buttons - include "All Products" option (Rings & Temple Jewellery removed)
  const categories = ['All Products', 'Necklaces', 'Earrings', 'Bangles', 'Bridal Sets'];

  // Handle "All Products" click
  const handleAllProductsClick = (e) => {
    if (e) e.preventDefault();
    setCurrentCategory(null);
    setSelectedCategoryButton(null);
    setSelectedProductId(null); // Reset selected product
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/shop');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Get all products for All Products page
  const allProductsForDisplay = useMemo(() => {
    if (!showShopPage || currentCategory) return [];
    return products || [];
  }, [products, showShopPage, currentCategory]);

  // Get the center product based on selected category (default: Necklaces)
  const centerProduct = useMemo(() => {
    if (!showShopPage || currentCategory) return null;
    const categoryProducts = (products || []).filter(p => p.category === selectedAllProductsCategory);
    if (selectedProductId) {
      // If a product is selected, use that
      const selected = categoryProducts.find(p => p.id === selectedProductId);
      if (selected) return selected;
    }
    // Otherwise, return first product from selected category
    return categoryProducts.length > 0 ? categoryProducts[0] : null;
  }, [products, showShopPage, currentCategory, selectedAllProductsCategory, selectedProductId]);

  // Category list for left sidebar with images and emojis
  const allProductsCategories = [
    { name: 'Bangles', image: '/Bangles.jpg', emoji: '⭕' },
    { name: 'Necklaces', image: '/Necklaces.jpg', emoji: '📿' },
    { name: 'Bridal Sets', image: '/Bridal_set.jpg', emoji: '👰' },
    { name: 'Earrings', image: '/Earings.jpg', emoji: '💎' }
  ];

  // Get category info helper for All Products page
  const getAllProductsCategoryInfo = (categoryName) => {
    return allProductsCategories.find(cat => cat.name === categoryName) || allProductsCategories[1]; // Default to Necklaces
  };

  // Pagination order for category pages starting from Necklace sets
  const categoryPaginationOrder = [
    'Necklace sets',
    'Haram',
    'Combo set',
    'Wedding collection',
    'Earrings',
    'Bangles',
    'Hip beads',
    'Accessories',
    "Gentlemen's items",
    'Beads',
    'Mangalsutra',
    'Sarudu',
    'Chains',
    'Choker sets'
  ];

  // Get related products (always 6 products: same category first, then fill from other categories)
  const relatedProducts = useMemo(() => {
    if (!centerProduct) return [];

    const allProducts = products || [];
    const currentCategory = centerProduct.category;
    const targetCount = 6;

    // Step 1: Get products from same category (excluding center product)
    let related = allProducts.filter(p =>
      p.category === currentCategory && p.id !== centerProduct.id
    );

    // Step 2: If we have fewer than targetCount, add products from other categories
    if (related.length < targetCount) {
      const usedIds = new Set([centerProduct.id, ...related.map(p => p.id)]);
      const allCategories = ['Earrings', 'Bangles', 'Necklaces', 'Bridal Sets'];
      const otherCategories = allCategories.filter(cat => cat !== currentCategory);

      // Get products from other categories, excluding already used ones
      const additionalProducts = [];
      for (const category of otherCategories) {
        if (related.length >= targetCount) break;

        const categoryProducts = allProducts.filter(p =>
          p.category === category && !usedIds.has(p.id)
        );

        // Add products from this category until we reach targetCount total
        for (const product of categoryProducts) {
          if (related.length >= targetCount) break;
          related.push(product);
          usedIds.add(product.id);
        }
      }
    }

    // Step 3: Limit to exactly targetCount products
    return related.slice(0, targetCount);
  }, [centerProduct, products]);

  // Get recommended products (one product from each category except current product's category, then fill to 6)
  const recommendedProducts = useMemo(() => {
    if (!centerProduct) return [];
    const targetCount = 6;
    const currentCategory = centerProduct.category;
    const allCategories = ['Earrings', 'Bangles', 'Necklaces', 'Bridal Sets'];
    const otherCategories = allCategories.filter(cat => cat !== currentCategory);

    const recommended = [];
    otherCategories.forEach(category => {
      const categoryProducts = (products || []).filter(p => p.category === category);
      if (categoryProducts.length > 0) {
        // Get first product from this category that's not already in recommended
        const product = categoryProducts.find(p => !recommended.some(rp => rp.id === p.id)) || categoryProducts[0];
        if (product) {
          recommended.push(product);
        }
      }
    });

    // If we still have fewer than targetCount, fill from remaining products
    if (recommended.length < targetCount) {
      const usedIds = new Set(recommended.map(p => p.id).concat(centerProduct.id));
      const allProducts = products || [];
      for (const product of allProducts) {
        if (recommended.length >= targetCount) break;
        if (usedIds.has(product.id)) continue;
        recommended.push(product);
        usedIds.add(product.id);
      }
    }

    return recommended.slice(0, targetCount);
  }, [centerProduct, products]);

  // Handle product click in All Products view
  const handleProductSelect = (product) => {
    setSelectedProductId(product.id);
    setSelectedAllProductsCategory(product.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category click in All Products view: redirect to the respective category page
  const handleAllProductsCategoryClick = (categoryName, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (handleCategoryClick) {
      handleCategoryClick(categoryName);
    } else {
      setSelectedAllProductsCategory(categoryName);
      setSelectedProductId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent">
      <section className="shop-page-section min-h-screen bg-transparent pt-28 pb-12 md:pt-32">
        {currentCategory ? (
          categoryInfo ? (
            <>
              {/* Category Page Header - Full Width with Breadcrumbs */}
              <div className="category-page-header relative overflow-hidden border-b border-white/20" style={{ backgroundImage: `url(${categoryInfo.bgImage || ''})` }}>
                <div className="content-width" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px' }}>
                  {/* Breadcrumbs inside header */}
                  <div className="category-breadcrumbs flex flex-wrap items-center gap-2 pt-6 text-sm text-white/90">
                    <a className="transition hover:text-amber-300" href="#" onClick={(e) => { e.preventDefault(); navigateToHome(); }}>Home</a>
                    <span>›</span>
                    <a className="transition hover:text-amber-300" href="#" onClick={(e) => { e.preventDefault(); navigateToShop(); }}>Categories</a>
                    <span>›</span>
                    <span>{categoryInfo.title || currentCategory}</span>
                  </div>
                  <div className="category-header-content pb-8 pt-3 md:pb-10">
                    <h1 className="category-title text-3xl font-semibold text-white drop-shadow md:text-4xl">{categoryInfo.title || currentCategory}</h1>
                    <p className="category-description mt-2 max-w-3xl text-sm text-white/90 md:text-base">{categoryInfo.description || `Browse our ${currentCategory} collection`}</p>
                  </div>
                </div>
              </div>

              {/* Main Content Area with glass-theme overlay on global background image */}
              <div className="category-main-content-wrapper" style={{ position: 'relative', width: '100%', overflow: 'visible', padding: '40px 0 80px', marginTop: 0, marginBottom: 0 }}>
                {/* Glassmorphism Overlay */}
                {/* No extra overlay - glass theme from .shop-page-section::before only (same as New Arrivals) */}
                <div className="category-content-glassmorphism-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'transparent',
                  backdropFilter: 'none',
                  WebkitBackdropFilter: 'none',
                  zIndex: 1,
                  pointerEvents: 'none'
                }} />

                <div className="content-width" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 16px', position: 'relative', zIndex: 2 }}>
                  {/* Category pagination/navigation - visible on Necklace sets and other category pages */}
                  {(() => {
                    const currentLabel = categoryInfo.title || currentCategory;
                    const currentIndex = categoryPaginationOrder.indexOf(currentLabel);
                    const nextLabel = currentIndex >= 0 && currentIndex < categoryPaginationOrder.length - 1
                      ? categoryPaginationOrder[currentIndex + 1]
                      : null;

                    // Only show when we're on one of the defined category pages (starting from Necklace sets)
                    if (currentIndex === -1) return null;

                    return (
                      <div
                        className="category-pagination-nav"
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          marginBottom: '24px'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px'
                          }}
                        >
                          {categoryPaginationOrder.map((label) => (
                            <button
                              key={label}
                              type="button"
                              onClick={() => handleCategoryClick && handleCategoryClick(label)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '999px',
                                border: label === currentLabel ? '1px solid #f4e4bc' : '1px solid rgba(255,255,255,0.4)',
                                background: label === currentLabel ? '#f4e4bc' : 'rgba(255,255,255,0.12)',
                                color: label === currentLabel ? '#3b153a' : '#ffffff',
                                fontSize: '12px',
                                fontWeight: 500,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                              }}
                            >
                              {label}
                            </button>
                          ))}
                        </div>

                        {nextLabel && (
                          <button
                            type="button"
                            onClick={() => handleCategoryClick && handleCategoryClick(nextLabel)}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '999px',
                              border: 'none',
                              background: '#f4e4bc',
                              color: '#3b153a',
                              fontSize: '12px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            Next
                            <span style={{ fontSize: '14px' }}>→</span>
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  {/* Category Styles Section */}
                  {categoryInfo.styles && categoryInfo.styles.length > 0 && (
                    <div className="category-styles-section rounded-2xl border border-white/25 bg-white/85 p-4 shadow-lg backdrop-blur md:p-5">
                      {/* All product Button - Above Popular Styles (navigate back to all products) */}
                      <button
                        className="category-back-btn inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        onClick={() => {
                          handleAllProductsClick();
                        }}
                      >
                        All product
                      </button>
                      <div className="category-styles-content">
                        <h2 className="category-styles-title text-lg font-semibold text-slate-900 md:text-xl">Popular {categoryInfo.title || currentCategory} Styles</h2>
                        <div className="category-styles-buttons mt-3 flex flex-wrap gap-2">
                          {categoryInfo.styles.map((style, index) => (
                            <button
                              key={index}
                              className={`category-style-btn rounded-full border px-3 py-1.5 text-sm font-medium transition ${selectedCategoryButton === style ? 'active border-amber-500 bg-amber-500 text-slate-900' : 'border-slate-300 bg-white text-slate-700 hover:border-amber-400 hover:text-amber-700'}`}
                              onClick={() => setSelectedCategoryButton(style)}
                            >
                              {style}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Filters and Products Section - Only show for category pages */}
                <div className="content-width" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', position: 'relative', zIndex: 2 }}>
                  <div className="shop-container mt-5 flex flex-col gap-5 lg:flex-row" style={{ display: 'flex', margin: '20px auto 0', gap: '20px', minHeight: '600px' }}>
                    {/* Mobile Filters Button */}
                    <button
                      className="mobile-filters-btn shop-page-filters-btn inline-flex items-center justify-center self-start rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 lg:hidden"
                      onClick={() => setShowMobileFilters(true)}
                    >
                      🔍 Filters
                    </button>

                    {/* Desktop Filters Sidebar */}
                    <aside className="filter-sidebar desktop-filters hidden rounded-2xl border border-white/30 bg-white/90 p-4 shadow-lg backdrop-blur lg:flex" style={{ width: '300px', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '12px', display: 'flex', flexDirection: 'column', position: 'sticky', top: '20px', maxHeight: 'calc(100vh - 40px)', overflowY: 'auto' }}>
                      <div className="filter-header">
                        <h2 style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: '32px', fontWeight: '700', color: '#1f1230', marginBottom: '4px' }}>Filters</h2>
                      </div>

                      <div className="filter-content">
                        {/* Price Range - Always visible, no arrow */}
                        <div className="filter-section">
                          <div className="filter-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                            <span>Price Range</span>
                          </div>
                          <div className="filter-options">
                            <div className="price-slider-container">
                              <div
                                className="price-slider-wrapper"
                                style={{
                                  '--min-percent': `${(priceRange[0] / 50000) * 100}`,
                                  '--max-percent': `${(priceRange[1] / 50000) * 100}`
                                }}
                              >
                                <input
                                  type="range"
                                  min="0"
                                  max="50000"
                                  value={priceRange[0]}
                                  onChange={(e) => handlePriceChange(0, e.target.value)}
                                  className="price-slider price-slider-min"
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="50000"
                                  value={priceRange[1]}
                                  onChange={(e) => handlePriceChange(1, e.target.value)}
                                  className="price-slider price-slider-max"
                                />
                              </div>
                              <div className="price-display">
                                <span>₹{priceRange[0].toLocaleString()}</span>
                                <span>₹{priceRange[1].toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Material Filter */}
                        <div className="filter-section">
                          <div className="filter-title" onClick={() => toggleFilter('material')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                            <span>Material</span>
                            <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.material ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                          </div>
                          {filtersOpen.material && (
                            <div className="filter-options">
                              {['14K Gold', '18K Gold', '22K Gold', 'Silver', 'Platinum', 'Rose Gold'].map((option) => (
                                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters.material.includes(option)}
                                    onChange={() => handleCheckboxChange('material', option)}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                  />
                                  <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Gemstone Type Filter */}
                        <div className="filter-section">
                          <div className="filter-title" onClick={() => toggleFilter('gemstone')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                            <span>Gemstone Type</span>
                            <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.gemstone ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                          </div>
                          {filtersOpen.gemstone && (
                            <div className="filter-options">
                              {['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'Kundan', 'Polki'].map((option) => (
                                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters.gemstone.includes(option)}
                                    onChange={() => handleCheckboxChange('gemstone', option)}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                  />
                                  <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Design Style Filter */}
                        <div className="filter-section">
                          <div className="filter-title" onClick={() => toggleFilter('designStyle')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                            <span>Design Style</span>
                            <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.designStyle ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                          </div>
                          {filtersOpen.designStyle && (
                            <div className="filter-options">
                              {['Traditional', 'Contemporary', 'Art Nouveau', 'Vintage', 'Minimalist', 'Temple'].map((option) => (
                                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters.designStyle.includes(option)}
                                    onChange={() => handleCheckboxChange('designStyle', option)}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                  />
                                  <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Designer Filter */}
                        <div className="filter-section">
                          <div className="filter-title" onClick={() => toggleFilter('designer')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                            <span>Designer</span>
                            <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.designer ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                          </div>
                          {filtersOpen.designer && (
                            <div className="filter-options">
                              {['Designer A', 'Designer B', 'Designer C', 'Designer D'].map((option) => (
                                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters.designer.includes(option)}
                                    onChange={() => handleCheckboxChange('designer', option)}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                  />
                                  <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Collection Filter */}
                        <div className="filter-section filter-section-last">
                          <div className="filter-title" onClick={() => toggleFilter('collection')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                            <span>Collection</span>
                            <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.collection ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                          </div>
                          {filtersOpen.collection && (
                            <div className="filter-options">
                              {['Bridal Collection', 'Festive Special', 'Limited Edition', 'New Arrivals'].map((option) => (
                                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters.collection.includes(option)}
                                    onChange={() => handleCheckboxChange('collection', option)}
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                  />
                                  <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="filter-buttons">
                        <button className="clear-all-btn" onClick={clearAllFilters}>
                          Reset All
                        </button>
                      </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="products-container flex-1" style={{ flex: '1', paddingRight: '10px', overflow: 'visible', height: 'auto' }}>
                      {/* Sort and View Options */}
                      <div className="products-header mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/30 bg-white/85 p-3 shadow backdrop-blur">
                        <div className="products-count">
                          <span>{allDisplayProducts.length} out of {totalAllProducts} products</span>
                        </div>
                        <div className="products-controls">
                          <div className="view-mode-buttons flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
                            <button
                              className={`view-mode-btn rounded-md px-2 py-1 text-sm transition ${productViewMode === 'grid' ? 'active bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                              onClick={() => setProductViewMode('grid')}
                              aria-label="Grid view"
                            >
                              ⊞
                            </button>
                            <button
                              className={`view-mode-btn rounded-md px-2 py-1 text-sm transition ${productViewMode === 'list' ? 'active bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                              onClick={() => setProductViewMode('list')}
                              aria-label="List view"
                            >
                              ☰
                            </button>
                          </div>
                          <div className="sort-dropdown-wrapper">
                            <button
                              className="sort-btn inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                              onClick={() => setShowSortDropdown(!showSortDropdown)}
                            >
                              {sortOption} {showSortDropdown ? '▲' : '▼'}
                            </button>
                            {showSortDropdown && (
                              <div className="sort-dropdown absolute right-0 z-20 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
                                {['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest First', 'Most Popular'].map((option) => (
                                  <button
                                    key={option}
                                    className={`sort-option flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${sortOption === option ? 'active bg-amber-100 text-amber-800' : 'text-slate-700 hover:bg-slate-100'}`}
                                    onClick={() => {
                                      setSortOption(option);
                                      setShowSortDropdown(false);
                                    }}
                                  >
                                    {option}
                                    {sortOption === option && <span className="sort-checkmark">✓</span>}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Products Grid */}
                      <div className={`products-grid gap-4 ${productViewMode === 'list' ? 'list-view grid grid-cols-1' : 'grid-view grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
                        {Array.isArray(displayProducts) && displayProducts.length > 0 ? displayProducts.map((product) => (
                          <div key={product.id} className="product-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                            <div className="product-image-wrapper group relative cursor-pointer overflow-hidden bg-slate-100" onClick={() => handleProductClick(product)}>
                              <img src={getProductImage(product)} alt={product.name} className="product-image h-72 w-full object-cover transition duration-300 group-hover:scale-105" />
                              <div className="product-hover-icons absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
                                <button
                                  className={`product-eye-icon inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/95 text-lg shadow ${viewedProducts.has(product.id) ? 'viewed text-amber-700' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEyeIconClick(e, product);
                                  }}
                                  aria-label="View product"
                                >
                                  👁
                                </button>
                                <button
                                  className={`product-wishlist-icon inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/95 text-lg shadow ${wishlistItems.has(product.id) ? 'active text-rose-600' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleWishlistClick(e, product);
                                  }}
                                  aria-label="Add to wishlist"
                                >
                                  {wishlistItems.has(product.id) ? '♥' : '♡'}
                                </button>
                              </div>
                              {product.badge && (
                                <span className={`product-badge absolute left-2 top-2 rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white ${product.badge.toLowerCase().replace(' ', '-')}`}>
                                  {product.badge}
                                </span>
                              )}
                              {product.discount && (
                                <span className="product-discount absolute right-2 top-2 rounded-full bg-rose-600 px-2 py-1 text-xs font-semibold text-white">-{product.discount}%</span>
                              )}
                            </div>
                            <div className="product-info space-y-2 p-4">
                              <h3 className="product-name line-clamp-2 text-base font-medium text-slate-900">{product.name}</h3>
                              <div className="product-rating text-sm text-amber-600">
                                {Array(product.rating || 0).fill('★').join('')}
                                {Array(5 - (product.rating || 0)).fill('☆').join('')} ({product.reviews || 0})
                              </div>
                              <div className="product-price flex items-center gap-2">
                                <span className="current-price text-base font-semibold text-amber-700">₹{product.price.toLocaleString()}</span>
                                {product.originalPrice && (
                                  <span className="original-price text-sm text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                )}
                              </div>
                              <button
                                className="add-to-cart-btn inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-amber-400"
                                onClick={(e) => handleAddToCart(e, product)}
                              >
                                🛒 Add to Cart
                              </button>
                            </div>
                          </div>
                        )) : (
                          <div className="no-products-message rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-600">
                            <p>No products found in this category.</p>
                          </div>
                        )}
                      </div>

                      {displayProducts.length === 0 && (
                        <div className="no-products-message mt-3 rounded-xl border border-dashed border-slate-300 bg-white/80 p-8 text-center text-slate-600">
                          <p>No products found. Try adjusting your filters.</p>
                        </div>
                      )}

                      {/* Pagination Controls - Only show for category pages */}
                      {currentCategory && (
                        <div className="pagination-controls" style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '16px',
                          marginTop: '40px',
                          padding: '20px 0',
                          borderTop: '1px solid #e5e5e5'
                        }}>
                          {/* Previous button - only show if not on first page */}
                          {currentPage > 1 && (
                            <button
                              className="pagination-btn"
                              onClick={handlePreviousPage}
                              style={{
                                padding: '10px 24px',
                                border: '1px solid #5f2b7f',
                                borderRadius: '8px',
                                background: '#fff',
                                color: '#5f2b7f',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = '#5f2b7f';
                                e.target.style.color = '#fff';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = '#fff';
                                e.target.style.color = '#5f2b7f';
                              }}
                            >
                              ← Previous
                            </button>
                          )}

                          <span style={{
                            fontSize: '14px',
                            color: '#000000',
                            fontWeight: '500'
                          }}>
                            Page {currentPage} of {totalPages}
                          </span>

                          {/* Next button - only show if not on last page */}
                          {currentPage < totalPages && (
                            <button
                              className="pagination-btn"
                              onClick={handleNextPage}
                              style={{
                                padding: '10px 24px',
                                border: '1px solid #5f2b7f',
                                borderRadius: '8px',
                                background: '#fff',
                                color: '#5f2b7f',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.background = '#5f2b7f';
                                e.target.style.color = '#fff';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.background = '#fff';
                                e.target.style.color = '#5f2b7f';
                              }}
                            >
                              Next →
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* End of Main Content Area with Video Background */}
              </div>
            </>
          ) : (
            <>
              {/* Fallback category header if getCategoryInfo fails */}
              <div className="content-width" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px' }}>
                <div className="shop-page-header">
                  <h1 className="shop-page-title">{currentCategory}</h1>
                  <p className="shop-page-subtitle">Browse our {currentCategory} collection</p>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            {/* All Products Page - glass-theme overlay on global background image */}
            <div className="all-products-page-wrapper" style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '40px 16px 80px', boxSizing: 'border-box', marginTop: 0, marginBottom: 0 }}>
              {/* Glassmorphism Overlay */}
              {/* No extra overlay - glass theme from section ::before only (same as New Arrivals) */}
              <div className="all-products-glassmorphism-overlay" style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'transparent',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
                zIndex: 1,
                pointerEvents: 'none'
              }} />
              <div className="content-width" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box', position: 'relative', zIndex: 2 }}>
                {/* Category Buttons */}
                <div className="all-products-top-category-buttons" style={{
                  display: 'flex',
                  gap: '16px',
                  marginBottom: '30px',
                  flexWrap: 'nowrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  overflowX: 'auto',
                  WebkitOverflowScrolling: 'touch'
                }}>
                  {['Bangles', 'Necklaces', 'Bridal Sets', 'Earrings'].map((category) => {
                    const isActive = selectedAllProductsCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={(e) => handleAllProductsCategoryClick(category, e)}
                        style={{
                          padding: '12px 32px',
                          background: isActive ? '#5f2b7f' : '#fff',
                          color: isActive ? '#fff' : '#5f2b7f',
                          border: `1px solid #5f2b7f`,
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap',
                          fontFamily: "'Poppins', 'Segoe UI', sans-serif",
                          flex: '0 0 auto',
                          minWidth: '120px',
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.target.style.background = '#f5f5f5';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.target.style.background = '#fff';
                          }
                        }}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>

                {/* All Products Title */}
                <h2 className="all-products-title" style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#ffffff',
                  marginBottom: '30px',
                  textAlign: 'left'
                }}>
                  All product
                </h2>

                {/* Main Layout: Left Categories + Center Product + Right Details */}
                {centerProduct ? (
                  <div className="all-products-detail-view" style={{
                    display: 'flex',
                    gap: '30px',
                    flexWrap: 'nowrap',
                    alignItems: 'flex-start',
                    overflowX: 'auto',
                    WebkitOverflowScrolling: 'touch',
                    width: '100%'
                  }}>
                    {/* Left Sidebar - Category List with Images */}
                    <div className="all-products-categories-sidebar" style={{
                      width: '220px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      flexShrink: 0,
                      maxHeight: '504px', // Height for 3 items (160px each + 2 gaps of 12px = 504px)
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      paddingRight: '8px',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#5f2b7f #f5f5f5'
                    }}>
                      {allProductsCategories.map((category) => {
                        const isSelected = selectedAllProductsCategory === category.name;
                        return (
                          <div
                            key={category.name}
                            className="all-products-category-card"
                            onClick={(e) => handleAllProductsCategoryClick(category.name, e)}
                            style={{
                              position: 'relative',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              border: isSelected ? '3px solid #5f2b7f' : '2px solid transparent',
                              boxShadow: isSelected ? '0 4px 12px rgba(95, 43, 127, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
                              minHeight: '160px'
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                              }
                            }}
                          >
                            <div style={{
                              position: 'relative',
                              width: '100%',
                              height: '160px',
                              overflow: 'hidden',
                              background: '#f5f5f5',
                              margin: 0,
                              padding: 0
                            }}>
                              <img
                                src={category.image}
                                alt={category.name}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                  transition: 'transform 0.3s ease',
                                  margin: 0,
                                  padding: 0
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) {
                                    e.target.style.transform = 'scale(1.05)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) {
                                    e.target.style.transform = 'scale(1)';
                                  }
                                }}
                              />
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: isSelected
                                  ? 'linear-gradient(to bottom, rgba(95, 43, 127, 0.4), rgba(95, 43, 127, 0.6))'
                                  : 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4))',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1
                              }}>
                                <div style={{
                                  color: '#fff',
                                  fontSize: '14px',
                                  fontWeight: '600',
                                  textAlign: 'center',
                                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                  padding: '0 8px',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}>
                                  {category.name}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Center - Product Image */}
                    <div className="selected-product-center" style={{
                      flex: '1',
                      minWidth: '400px',
                      maxWidth: '500px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      flexShrink: 0
                    }}>
                      <div
                        className="product-image-wrapper all-products-center-image"
                        onClick={() => handleProductClick && handleProductClick(centerProduct)}
                        style={{
                          position: 'relative',
                          background: '#f5f5f5',
                          borderRadius: '12px',
                          padding: '0',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: '400px',
                          width: '100%',
                          overflow: 'hidden',
                          cursor: 'pointer'
                        }}
                      >
                        <img
                          src={getProductImage(centerProduct)}
                          alt={centerProduct.name}
                          className="product-image"
                          style={{
                            width: '100%',
                            height: 'auto',
                            minHeight: '400px',
                            objectFit: 'contain',
                            objectPosition: 'center',
                            borderRadius: '12px',
                            display: 'block'
                          }}
                        />
                        <div className="product-hover-icons center-product-icons" style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          display: 'flex',
                          gap: '12px',
                          zIndex: 10
                        }}>
                          <button
                            className={`product-eye-icon ${viewedProducts.has(centerProduct.id) ? 'viewed' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEyeIconClick(e, centerProduct);
                            }}
                            aria-label="View product"
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: viewedProducts.has(centerProduct.id) ? '#f2c23a' : 'rgba(255, 255, 255, 0.95)',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '20px',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                              transition: 'all 0.3s ease',
                              color: viewedProducts.has(centerProduct.id) ? '#3b153a' : 'inherit'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.1)';
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.background = viewedProducts.has(centerProduct.id) ? '#f2c23a' : 'rgba(255, 255, 255, 0.95)';
                            }}
                          >
                            👁
                          </button>
                          <button
                            className={`product-wishlist-icon ${wishlistItems.has(centerProduct.id) ? 'active' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleWishlistClick(e, centerProduct);
                            }}
                            aria-label="Add to wishlist"
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: wishlistItems.has(centerProduct.id) ? '#f2c23a' : 'rgba(255, 255, 255, 0.95)',
                              border: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '20px',
                              cursor: 'pointer',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                              transition: 'all 0.3s ease',
                              color: wishlistItems.has(centerProduct.id) ? '#ff0000' : 'inherit'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'scale(1.1)';
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'scale(1)';
                              e.currentTarget.style.background = wishlistItems.has(centerProduct.id) ? '#f2c23a' : 'rgba(255, 255, 255, 0.95)';
                            }}
                          >
                            {wishlistItems.has(centerProduct.id) ? '♥' : '♡'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Side - Product Details */}
                    <div className="selected-product-details" style={{
                      width: '400px',
                      minWidth: '350px',
                      flexShrink: 0
                    }}>
                      <h1 style={{
                        fontSize: '32px',
                        fontWeight: '700',
                        color: '#ffffff',
                        marginBottom: '12px'
                      }}>
                        {centerProduct.name}
                      </h1>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '16px'
                      }}>
                        <div style={{ color: '#fbbf24', fontSize: '18px' }}>
                          {Array(centerProduct.rating || 0).fill('★').join('')}
                          {Array(5 - (centerProduct.rating || 0)).fill('☆').join('')}
                        </div>
                        <span style={{ color: '#000000', fontSize: '14px' }}>
                          ({centerProduct.reviews || 0} review{centerProduct.reviews !== 1 ? 's' : ''})
                        </span>
                      </div>
                      {/* Product Description */}
                      {getProductDescription && (
                        <div style={{ marginBottom: '24px', fontSize: '14px', color: '#000000', lineHeight: '1.8' }}>
                          {getProductDescription(centerProduct)}
                        </div>
                      )}

                      {/* Product Specifications Table */}
                      <div style={{ marginTop: '24px', marginBottom: '24px', background: 'transparent' }}>
                        <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse', background: 'transparent', color: '#000000' }}>
                          <tbody style={{ background: 'transparent' }}>
                            {centerProduct.material && (
                              <tr style={{ borderBottom: '1px solid #e5e5e5', background: 'transparent' }}>
                                <td style={{ padding: '8px 0', fontWeight: '600', color: '#000000', background: 'transparent' }}>Material:</td>
                                <td style={{ padding: '8px 0', color: '#000000', background: 'transparent' }}>{centerProduct.material}</td>
                              </tr>
                            )}
                            {centerProduct.category && (
                              <tr style={{ borderBottom: '1px solid #e5e5e5', background: 'transparent' }}>
                                <td style={{ padding: '8px 0', fontWeight: '600', color: '#000000', background: 'transparent' }}>Category:</td>
                                <td style={{ padding: '8px 0', color: '#000000', background: 'transparent' }}>{centerProduct.category}</td>
                              </tr>
                            )}
                            {centerProduct.inStock !== undefined && (
                              <tr style={{ borderBottom: '1px solid #e5e5e5', background: 'transparent' }}>
                                <td style={{ padding: '8px 0', fontWeight: '600', color: '#000000', background: 'transparent' }}>Stock:</td>
                                <td style={{ padding: '8px 0', color: '#000000', background: 'transparent' }}>
                                  {centerProduct.inStock ? `In Stock (${centerProduct.stock || 'Available'})` : 'Out of Stock'}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                      <div style={{ marginBottom: '24px' }}>
                        <div style={{ fontSize: '28px', fontWeight: '700', color: '#5f2b7f' }}>
                          ₹{centerProduct.price.toLocaleString()}
                          {centerProduct.originalPrice && (
                            <span style={{
                              fontSize: '18px',
                              color: '#999',
                              textDecoration: 'line-through',
                              marginLeft: '12px'
                            }}>
                              ₹{centerProduct.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {centerProduct.discount && (
                          <div style={{ fontSize: '14px', color: '#e74c3c', marginTop: '4px' }}>
                            Save {centerProduct.discount}%
                          </div>
                        )}
                      </div>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                        <button
                          onClick={(e) => handleAddToCart(e, centerProduct)}
                          style={{
                            flex: 1,
                            padding: '14px 24px',
                            background: '#5f2b7f',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#4a1f62';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#5f2b7f';
                          }}
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={(e) => handleBuyNow && handleBuyNow(e, centerProduct)}
                          style={{
                            flex: 1,
                            padding: '14px 24px',
                            background: '#fff',
                            color: '#5f2b7f',
                            border: '2px solid #5f2b7f',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = '#5f2b7f';
                            e.target.style.color = '#fff';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = '#fff';
                            e.target.style.color = '#5f2b7f';
                          }}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '60px',
                    color: '#666'
                  }}>
                    <p style={{ fontSize: '18px' }}>No products available in this category.</p>
                  </div>
                )}

                {/* Related Products Section - Always show 5 products */}
                {centerProduct && relatedProducts.length > 0 && (
                  <div className="related-products-section" style={{ marginTop: '60px', width: '100%', boxSizing: 'border-box' }}>
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#ffffff',
                      marginBottom: '24px',
                      textAlign: 'left'
                    }}>
                      Related Products
                    </h2>
                    <div style={{
                      display: 'block',
                      width: '100%',
                      boxSizing: 'border-box',
                      overflow: 'hidden'
                    }}>
                      <div className="related-products-scroll" style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'auto',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        paddingBottom: '20px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#5f2b7f #f5f5f5',
                        WebkitOverflowScrolling: 'touch',
                        justifyContent: 'flex-start',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}>
                        {relatedProducts.map((product) => (
                          <div
                            key={product.id}
                            className="related-product-card"
                            onClick={() => handleProductSelect(product)}
                            style={{
                              width: '220px',
                              minWidth: '220px',
                              maxWidth: '220px',
                              cursor: 'pointer',
                              background: '#fff',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              border: '1px solid #e5e5e5',
                              transition: 'all 0.2s ease',
                              flexShrink: 0
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-4px)';
                              e.currentTarget.style.boxShadow = '0 8px 24px rgba(95, 43, 127, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <div style={{ width: '100%', paddingTop: '100%', position: 'relative', background: '#f5f5f5' }}>
                              <img
                                src={getProductImage(product)}
                                alt={product.name}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            </div>
                            <div style={{ padding: '12px' }}>
                              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f1230', marginBottom: '4px' }}>
                                {product.name}
                              </div>
                              <div style={{ fontSize: '16px', fontWeight: '700', color: '#5f2b7f' }}>
                                ₹{product.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Recommended Products Section */}
                {centerProduct && recommendedProducts.length > 0 && (
                  <div className="recommended-products-section" style={{ marginTop: '60px', width: '100%', boxSizing: 'border-box' }}>
                    <h2 style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#ffffff',
                      marginBottom: '30px',
                      textAlign: 'left'
                    }}>
                      Recommended Products
                    </h2>
                    <div style={{
                      display: 'block',
                      width: '100%',
                      boxSizing: 'border-box',
                      overflow: 'hidden'
                    }}>
                      <div className="recommended-products-scroll" style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'auto',
                        paddingLeft: '8px',
                        paddingRight: '8px',
                        paddingBottom: '20px',
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#5f2b7f #f5f5f5',
                        WebkitOverflowScrolling: 'touch',
                        justifyContent: 'flex-start',
                        width: '100%',
                        boxSizing: 'border-box'
                      }}>
                        {recommendedProducts.map((product) => (
                          <div
                            key={product.id}
                            className="recommended-product-card"
                            onClick={() => handleProductSelect(product)}
                            style={{
                              width: '220px',
                              minWidth: '220px',
                              maxWidth: '220px',
                              cursor: 'pointer',
                              background: '#fff',
                              borderRadius: '8px',
                              overflow: 'hidden',
                              border: '1px solid #e5e5e5',
                              transition: 'all 0.2s ease',
                              flexShrink: 0
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-4px)';
                              e.currentTarget.style.boxShadow = '0 8px 24px rgba(95, 43, 127, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <div style={{ width: '100%', paddingTop: '100%', position: 'relative', background: '#f5f5f5' }}>
                              <img
                                src={getProductImage(product)}
                                alt={product.name}
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover'
                                }}
                              />
                            </div>
                            <div style={{ padding: '12px' }}>
                              <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f1230', marginBottom: '4px' }}>
                                {product.name}
                              </div>
                              <div style={{ fontSize: '16px', fontWeight: '700', color: '#5f2b7f' }}>
                                ₹{product.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </section>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="mobile-filter-modal-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="mobile-filter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filter-header">
              <h2>Filters</h2>
              <button className="mobile-filter-close" onClick={() => setShowMobileFilters(false)}>
                ×
              </button>
            </div>
            <div className="mobile-filter-content">
              {/* Price Range - Always visible, no arrow */}
              <div className="filter-section">
                <div className="filter-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Price Range</span>
                </div>
                <div className="filter-options">
                  <div className="price-slider-container">
                    <div
                      className="price-slider-wrapper"
                      style={{
                        '--min-percent': `${(priceRange[0] / 50000) * 100}`,
                        '--max-percent': `${(priceRange[1] / 50000) * 100}`
                      }}
                    >
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        className="price-slider price-slider-min"
                      />
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        className="price-slider price-slider-max"
                      />
                    </div>
                    <div className="price-display">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Material Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('material')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Material</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.material ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.material && (
                  <div className="filter-options">
                    {['14K Gold', '18K Gold', '22K Gold', 'Silver', 'Platinum', 'Rose Gold'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.material.includes(option)}
                          onChange={() => handleCheckboxChange('material', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Gemstone Type Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('gemstone')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Gemstone Type</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.gemstone ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.gemstone && (
                  <div className="filter-options">
                    {['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'Kundan', 'Polki'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.gemstone.includes(option)}
                          onChange={() => handleCheckboxChange('gemstone', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Design Style Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('designStyle')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Design Style</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.designStyle ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.designStyle && (
                  <div className="filter-options">
                    {['Traditional', 'Contemporary', 'Art Nouveau', 'Vintage', 'Minimalist', 'Temple'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.designStyle.includes(option)}
                          onChange={() => handleCheckboxChange('designStyle', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Designer Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('designer')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Designer</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.designer ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.designer && (
                  <div className="filter-options">
                    {['Designer A', 'Designer B', 'Designer C', 'Designer D'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.designer.includes(option)}
                          onChange={() => handleCheckboxChange('designer', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Collection Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('collection')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Collection</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.collection ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.collection && (
                  <div className="filter-options">
                    {['Bridal Collection', 'Festive Special', 'Limited Edition', 'New Arrivals'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.collection.includes(option)}
                          onChange={() => handleCheckboxChange('collection', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mobile-filter-footer">
              <button className="clear-all-btn" onClick={clearAllFilters}>
                Reset All
              </button>
              <button className="apply-filters-btn" onClick={() => setShowMobileFilters(false)}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="mobile-filter-modal-overlay" onClick={() => setShowMobileFilters(false)}>
          <div className="mobile-filter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filter-header">
              <h2>Filters</h2>
              <button className="mobile-filter-close" onClick={() => setShowMobileFilters(false)}>
                ×
              </button>
            </div>
            <div className="mobile-filter-content">
              {/* Price Range - Always visible, no arrow */}
              <div className="filter-section">
                <div className="filter-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Price Range</span>
                </div>
                <div className="filter-options">
                  <div className="price-slider-container">
                    <div
                      className="price-slider-wrapper"
                      style={{
                        '--min-percent': `${(priceRange[0] / 50000) * 100}`,
                        '--max-percent': `${(priceRange[1] / 50000) * 100}`
                      }}
                    >
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        className="price-slider price-slider-min"
                      />
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        className="price-slider price-slider-max"
                      />
                    </div>
                    <div className="price-display">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Material Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('material')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Material</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.material ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.material && (
                  <div className="filter-options">
                    {['14K Gold', '18K Gold', '22K Gold', 'Silver', 'Platinum', 'Rose Gold'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.material.includes(option)}
                          onChange={() => handleCheckboxChange('material', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Gemstone Type Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('gemstone')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Gemstone Type</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.gemstone ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.gemstone && (
                  <div className="filter-options">
                    {['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'Kundan', 'Polki'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.gemstone.includes(option)}
                          onChange={() => handleCheckboxChange('gemstone', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Design Style Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('designStyle')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Design Style</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.designStyle ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.designStyle && (
                  <div className="filter-options">
                    {['Traditional', 'Contemporary', 'Art Nouveau', 'Vintage', 'Minimalist', 'Temple'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.designStyle.includes(option)}
                          onChange={() => handleCheckboxChange('designStyle', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Designer Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('designer')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Designer</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.designer ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.designer && (
                  <div className="filter-options">
                    {['Designer A', 'Designer B', 'Designer C', 'Designer D'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.designer.includes(option)}
                          onChange={() => handleCheckboxChange('designer', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Collection Filter */}
              <div className="filter-section">
                <div className="filter-title" onClick={() => toggleFilter('collection')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontWeight: '500', color: '#1f1230', fontSize: '15px', marginBottom: '12px' }}>
                  <span>Collection</span>
                  <span className="filter-arrow" style={{ fontSize: '12px', color: '#6b5b7d', transition: 'transform 0.3s ease', transform: filtersOpen.collection ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                </div>
                {filtersOpen.collection && (
                  <div className="filter-options">
                    {['Bridal Collection', 'Festive Special', 'Limited Edition', 'New Arrivals'].map((option) => (
                      <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={selectedFilters.collection.includes(option)}
                          onChange={() => handleCheckboxChange('collection', option)}
                          style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', color: '#4b5563' }}>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mobile-filter-footer">
              <button className="clear-all-btn" onClick={clearAllFilters}>
                Reset All
              </button>
              <button className="apply-filters-btn" onClick={() => setShowMobileFilters(false)}>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <Footer
          navigateToHome={navigateToHome}
          navigateToShop={navigateToShop}
          navigateToAbout={navigateToAbout}
          navigateToContact={navigateToContact}
          navigateToAccount={navigateToAccount}
          navigateToOrders={navigateToOrders}
          handleCategoryClick={handleCategoryClick}
        />
      </div>
    </div>
  );
};

export default Shop;

