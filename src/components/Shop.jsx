import React, { useEffect } from 'react';
import Footer from './Footer';

const Shop = ({ handlers }) => {
  // Add safety checks
  if (!handlers) {
    console.error('Shop component: handlers prop is missing');
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
    console.error('Shop component: Required functions are missing', {
      getCategoryProducts: !!getCategoryProducts,
      getFilteredProducts: !!getFilteredProducts,
      getProductImage: !!getProductImage
    });
    return <div>Error: Shop component is missing required functions</div>;
  }

  // Get products to display
  const getDisplayProducts = () => {
    try {
      if (currentCategory) {
        // Show products for specific category
        if (!getCategoryProducts) {
          console.error('getCategoryProducts function is missing');
          return [];
        }
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
    } catch (error) {
      console.error('Error in getDisplayProducts:', error);
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
  } catch (error) {
    console.error('Error getting category info:', error);
    categoryInfo = null;
  }

  // Category buttons - include "All Products" option
  const categories = ['All Products', 'Necklaces', 'Earrings', 'Bangles', 'Rings', 'Bridal Sets', 'Temple Jewellery'];
  
  // Handle "All Products" click
  const handleAllProductsClick = (e) => {
    if (e) e.preventDefault();
    setCurrentCategory(null);
    setSelectedCategoryButton(null);
    if (window?.history?.pushState) {
      window.history.pushState({}, '', '/shop');
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', margin: '0', padding: '0' }}>
      <section className="shop-page-section" style={{ padding: '0', margin: '0', background: '#fff', width: '100%' }}>
        {currentCategory ? (
          categoryInfo ? (
            <>
              {/* Category Page Header - Full Width with Breadcrumbs */}
              <div className="category-page-header" style={{ backgroundImage: `url(${categoryInfo.bgImage || ''})` }}>
                <div className="content-width" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px' }}>
                  {/* Breadcrumbs inside header */}
                  <div className="category-breadcrumbs">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToHome(); }}>Home</a>
                    <span>›</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateToShop(); }}>Categories</a>
                    <span>›</span>
                    <span>{categoryInfo.title || currentCategory}</span>
                  </div>
                  <div className="category-header-content">
                    <h1 className="category-title">{categoryInfo.title || currentCategory}</h1>
                    <p className="category-description">{categoryInfo.description || `Browse our ${currentCategory} collection`}</p>
                  </div>
                </div>
              </div>

              {/* Category Styles Section */}
              <div className="content-width" style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 16px', background: '#fff' }}>
                {categoryInfo.styles && categoryInfo.styles.length > 0 && (
                  <div className="category-styles-section">
                    {/* Back Button - Above Popular Styles */}
                    <button 
                      className="category-back-btn"
                      onClick={() => {
                        handleAllProductsClick();
                      }}
                    >
                      ← Back
                    </button>
                    <div className="category-styles-content">
                      <h2 className="category-styles-title">Popular {categoryInfo.title || currentCategory} Styles</h2>
                      <div className="category-styles-buttons">
                        {categoryInfo.styles.map((style, index) => (
                          <button
                            key={index}
                            className={`category-style-btn ${selectedCategoryButton === style ? 'active' : ''}`}
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
              {/* All Products Page - No Header */}
            </>
          )}

          {/* Filters and Products Section */}
          <div className="content-width" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 16px', background: '#fff' }}>
            <div className="shop-container" style={{ display: 'flex', margin: '20px auto 0', gap: '20px', minHeight: '600px' }}>
            {/* Mobile Filters Button */}
            <button
              className="mobile-filters-btn shop-page-filters-btn"
              onClick={() => setShowMobileFilters(true)}
            >
              🔍 Filters
            </button>

            {/* Desktop Filters Sidebar */}
            <aside className="filter-sidebar desktop-filters" style={{ width: '300px', background: '#fff', border: '1px solid #e5e5e5', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', position: 'sticky', top: '20px' }}>
              <div className="filter-header" style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e5e5e5' }}>
                <h2 style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: '32px', fontWeight: '700', color: '#1f1230', marginBottom: '4px' }}>Filters</h2>
              </div>

              <div className="filter-content" style={{ flex: '0 1 auto', overflowY: 'visible', marginBottom: '0' }}>
                {/* Price Range - Always visible, no arrow */}
                <div className="filter-section" style={{ marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
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
                <div className="filter-section" style={{ marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
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
                <div className="filter-section" style={{ marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
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
                <div className="filter-section" style={{ marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
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
                <div className="filter-section" style={{ marginBottom: '20px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}>
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
                <div className="filter-section" style={{ marginBottom: '0', borderBottom: 'none', paddingBottom: '0' }}>
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

              <div className="filter-buttons" style={{ marginTop: '16px', paddingTop: '16px' }}>
                <button className="clear-all-btn" onClick={clearAllFilters}>
                  Reset All
                </button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="products-container" style={{ flex: '1', paddingRight: '10px', overflow: 'visible', height: 'auto' }}>
              {/* Sort and View Options */}
              <div className="products-header">
                <div className="products-count">
                  {currentCategory ? (
                    <span>{allDisplayProducts.length} out of {totalAllProducts} products</span>
                  ) : (
                    <span>{allDisplayProducts.length} Products</span>
                  )}
                </div>
                <div className="products-controls">
                  <div className="view-mode-buttons">
                    <button
                      className={`view-mode-btn ${productViewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setProductViewMode('grid')}
                      aria-label="Grid view"
                    >
                      ⊞
                    </button>
                    <button
                      className={`view-mode-btn ${productViewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setProductViewMode('list')}
                      aria-label="List view"
                    >
                      ☰
                    </button>
                  </div>
                  <div className="sort-dropdown-wrapper">
                    <button
                      className="sort-btn"
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                    >
                      {sortOption} {showSortDropdown ? '▲' : '▼'}
                    </button>
                    {showSortDropdown && (
                      <div className="sort-dropdown">
                        {['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest First', 'Most Popular'].map((option) => (
                          <button
                            key={option}
                            className={`sort-option ${sortOption === option ? 'active' : ''}`}
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
              <div className={`products-grid ${productViewMode === 'list' ? 'list-view' : 'grid-view'}`}>
                {Array.isArray(displayProducts) && displayProducts.length > 0 ? displayProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-image-wrapper" onClick={() => handleProductClick(product)}>
                      <img src={getProductImage(product)} alt={product.name} className="product-image" />
                      <div className="product-hover-icons">
                        <button 
                          className={`product-eye-icon ${viewedProducts.has(product.id) ? 'viewed' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEyeIconClick(e, product);
                          }}
                          aria-label="View product"
                        >
                          👁
                        </button>
                        <button 
                          className={`product-wishlist-icon ${wishlistItems.has(product.id) ? 'active' : ''}`}
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
                        <span className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
                          {product.badge}
                        </span>
                      )}
                      {product.discount && (
                        <span className="product-discount">-{product.discount}%</span>
                      )}
                    </div>
                    <div className="product-info">
                      <h3 className="product-name">{product.name}</h3>
                      <div className="product-rating">
                        {Array(product.rating || 0).fill('★').join('')}
                        {Array(5 - (product.rating || 0)).fill('☆').join('')} ({product.reviews || 0})
                      </div>
                      <div className="product-price">
                        <span className="current-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <button
                        className="add-to-cart-btn"
                        onClick={(e) => handleAddToCart(e, product)}
                      >
                        🛒 Add to Cart
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="no-products-message">
                    <p>No products found in this category.</p>
                  </div>
                )}
              </div>

              {displayProducts.length === 0 && (
                <div className="no-products-message">
                  <p>No products found. Try adjusting your filters.</p>
                </div>
              )}

              {/* Pagination Controls - Always show if there are products */}
              {/* Pagination Controls - Always show for category pages */}
              {(currentCategory || showShopPage) && (
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
                    color: '#4b5563',
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
  );
};

export default Shop;

