import React, { useEffect, useState, useMemo } from 'react';
import Footer from './Footer';

const Shop = ({ handlers }) => {
  // State for selected product in All Products view
  const [selectedProductId, setSelectedProductId] = useState(null);
  // State for selected category in All Products view
  const [selectedAllProductsCategory, setSelectedAllProductsCategory] = useState('Necklaces');
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
    { name: 'Rings', image: '/Rings.jpg', emoji: '💍' },
    { name: 'Temple Jewellery', image: '/Temple_Jewellery.jpg', emoji: '🛕' },
    { name: 'Bridal Sets', image: '/Bridal_set.jpg', emoji: '👰' },
    { name: 'Earrings', image: '/Earings.jpg', emoji: '💎' }
  ];

  // Get category info helper for All Products page
  const getAllProductsCategoryInfo = (categoryName) => {
    return allProductsCategories.find(cat => cat.name === categoryName) || allProductsCategories[1]; // Default to Necklaces
  };

  // Get related products (all products from same category as center product)
  const relatedProducts = useMemo(() => {
    if (!centerProduct) return [];
    return (products || []).filter(p => p.category === centerProduct.category && p.id !== centerProduct.id);
  }, [centerProduct, products]);

  // Get recommended products (one product from each category except current product's category)
  const recommendedProducts = useMemo(() => {
    if (!centerProduct) return [];
    const currentCategory = centerProduct.category;
    const allCategories = ['Earrings', 'Bangles', 'Rings', 'Necklaces', 'Temple Jewellery', 'Bridal Sets'];
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
    
    return recommended;
  }, [centerProduct, products]);

  // Handle product click in All Products view
  const handleProductSelect = (product) => {
    setSelectedProductId(product.id);
    setSelectedAllProductsCategory(product.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle category click in All Products view
  const handleAllProductsCategoryClick = (categoryName) => {
    setSelectedAllProductsCategory(categoryName);
    setSelectedProductId(null); // Reset selected product to show first from category
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

              {/* Filters and Products Section - Only show for category pages */}
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
                  <span>{allDisplayProducts.length} out of {totalAllProducts} products</span>
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
              {/* All Products Page - New Design */}
              <div className="all-products-page-wrapper" style={{ padding: '40px 16px', background: '#fff', width: '100%', boxSizing: 'border-box' }}>
                <div className="content-width" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
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
                    {['Bangles', 'Rings', 'Necklaces', 'Bridal Sets', 'Temple Jewellery', 'Earrings'].map((category) => {
                      const isActive = selectedAllProductsCategory === category;
                      return (
                        <button
                          key={category}
                          onClick={() => handleAllProductsCategoryClick(category)}
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
                    color: '#1f1230', 
                    marginBottom: '30px',
                    textAlign: 'left'
                  }}>
                    All Products
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
                              onClick={() => handleAllProductsCategoryClick(category.name)}
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
                                  <span style={{
                                    fontSize: '32px',
                                    marginBottom: '8px',
                                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                                  }}>
                                    {category.emoji}
                                  </span>
                                  <div style={{
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                    padding: '0 8px'
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
                            padding: '40px',
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
                              maxWidth: '100%',
                              maxHeight: '500px',
                              objectFit: 'contain',
                              borderRadius: '8px'
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
                          color: '#1f1230', 
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
                          <span style={{ color: '#666', fontSize: '14px' }}>
                            ({centerProduct.reviews || 0} review{centerProduct.reviews !== 1 ? 's' : ''})
                          </span>
                        </div>
                        {/* Product Description */}
                        {getProductDescription && (
                          <div style={{ marginBottom: '24px', fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
                            {getProductDescription(centerProduct)}
                          </div>
                        )}
                        
                        {/* Product Specifications Table */}
                        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
                          <table style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse' }}>
                            <tbody>
                              {centerProduct.material && (
                                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#333' }}>Material:</td>
                                  <td style={{ padding: '8px 0', color: '#666' }}>{centerProduct.material}</td>
                                </tr>
                              )}
                              {centerProduct.category && (
                                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#333' }}>Category:</td>
                                  <td style={{ padding: '8px 0', color: '#666' }}>{centerProduct.category}</td>
                                </tr>
                              )}
                              {centerProduct.inStock !== undefined && (
                                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                                  <td style={{ padding: '8px 0', fontWeight: '600', color: '#333' }}>Stock:</td>
                                  <td style={{ padding: '8px 0', color: '#666' }}>
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

                  {/* Related Products Section */}
                  {centerProduct && relatedProducts.length > 0 && (
                    <div className="related-products-section" style={{ marginTop: '60px', width: '100%', boxSizing: 'border-box' }}>
                      <h2 style={{ 
                        fontSize: '24px', 
                        fontWeight: '700', 
                        color: '#1f1230', 
                        marginBottom: '24px',
                        textAlign: 'left'
                      }}>
                        Related Products
                      </h2>
                      <div style={{ 
                        display: 'flex', 
                        width: '100%',
                        boxSizing: 'border-box',
                        overflow: 'hidden'
                      }}>
                        <div className="related-products-scroll" style={{
                          display: 'flex',
                          gap: '20px',
                          overflowX: 'auto',
                          paddingLeft: '16px',
                          paddingRight: '16px',
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
                              width: '200px',
                              minWidth: '200px',
                              maxWidth: '200px',
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
                        color: '#1f1230',
                        marginBottom: '30px',
                        textAlign: 'left'
                      }}>
                        Recommended Products
                      </h2>
                      <div style={{ 
                        display: 'flex', 
                        width: '100%',
                        boxSizing: 'border-box',
                        overflow: 'hidden'
                      }}>
                        <div className="recommended-products-scroll" style={{
                          display: 'flex',
                          gap: '20px',
                          overflowX: 'auto',
                          paddingLeft: '16px',
                          paddingRight: '16px',
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
                              width: '200px',
                              minWidth: '200px',
                              maxWidth: '200px',
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

