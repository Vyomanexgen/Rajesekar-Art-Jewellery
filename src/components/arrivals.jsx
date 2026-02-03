import React, { useMemo } from 'react';
import Footer from './Footer';

const Arrivals = ({
  selectedNewArrivalsCategory,
  setSelectedNewArrivalsCategory,
  getFilteredNewArrivalsProducts,
  getProductImage,
  handleProductClick,
  viewedProducts,
  handleEyeIconClick,
  wishlistItems,
  handleWishlistClick,
  handleAddToCart,
  navigateToShop,
  navigateToHome,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick
}) => {
  // Get the background video based on the last product in new arrivals
  const backgroundVideo = useMemo(() => {
    const products = getFilteredNewArrivalsProducts();
    if (products.length === 0) return null;
    
    // Get the last product
    const lastProduct = products[products.length - 1];
    const productName = lastProduct.name.toLowerCase();
    
    // Determine video based on product type
    if (productName.includes('bangle')) {
      return '/Bangle_video.mp4';
    } else if (productName.includes('necklace')) {
      return '/Necklace_video.mp4';
    } else if (productName.includes('ring')) {
      return '/Ring_video.mp4';
    } else if (productName.includes('earring') || productName.includes('earing')) {
      return '/Earing_video.mp4';
    } else if (productName.includes('bridal')) {
      return '/Bridal_set_video.mp4';
    } else if (productName.includes('temple')) {
      return '/Temple_jewellery_video.mp4';
    }
    
    // Default fallback
    return null;
  }, [getFilteredNewArrivalsProducts, selectedNewArrivalsCategory]);

  return (
    <>
      {/* New Arrivals Section */}
      <section className="new-arrivals-section">
        {/* Background Video */}
        {backgroundVideo && (
          <div className="new-arrivals-background-video">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="new-arrivals-video"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            <div className="new-arrivals-video-overlay"></div>
          </div>
        )}
        <div className="content-width new-arrivals-content">
          <div className="new-arrivals-header">
            <h1 className="new-arrivals-title">New Arrivals</h1>
            <p className="new-arrivals-subtitle">Discover our latest collection of exquisite jewellery</p>
          </div>
          
          {/* Category Buttons */}
          <div className="category-buttons-container">
            <div className="category-buttons">
              <button 
                className={`category-filter-btn ${selectedNewArrivalsCategory === 'Necklaces' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedNewArrivalsCategory(selectedNewArrivalsCategory === 'Necklaces' ? null : 'Necklaces');
                }}
              >
                Necklaces
              </button>
              <button 
                className={`category-filter-btn ${selectedNewArrivalsCategory === 'Rings' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedNewArrivalsCategory(selectedNewArrivalsCategory === 'Rings' ? null : 'Rings');
                }}
              >
                Rings
              </button>
              <button 
                className={`category-filter-btn ${selectedNewArrivalsCategory === 'Earrings' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedNewArrivalsCategory(selectedNewArrivalsCategory === 'Earrings' ? null : 'Earrings');
                }}
              >
                Earrings
              </button>
              <button 
                className={`category-filter-btn ${selectedNewArrivalsCategory === 'Bangles' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedNewArrivalsCategory(selectedNewArrivalsCategory === 'Bangles' ? null : 'Bangles');
                }}
              >
                Bangles
              </button>
              <button 
                className={`category-filter-btn ${selectedNewArrivalsCategory === 'Bridal Sets' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedNewArrivalsCategory(selectedNewArrivalsCategory === 'Bridal Sets' ? null : 'Bridal Sets');
                }}
              >
                Bridal Sets
              </button>
              <button 
                className={`category-filter-btn ${selectedNewArrivalsCategory === 'Temple Jewellery' ? 'active' : ''}`}
                onClick={() => {
                  setSelectedNewArrivalsCategory(selectedNewArrivalsCategory === 'Temple Jewellery' ? null : 'Temple Jewellery');
                }}
              >
                Temple Jewellery
              </button>
            </div>
          </div>

          {/* Back Button - Show when a category is selected */}
          {selectedNewArrivalsCategory && (
            <div className="category-back-button-container">
              <button 
                className="category-back-btn"
                onClick={() => {
                  setSelectedNewArrivalsCategory(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ← Back
              </button>
            </div>
          )}

          <div className="products-grid">
            {getFilteredNewArrivalsProducts().map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper" onClick={() => handleProductClick(product)}>
                  <img src={getProductImage(product)} alt={product.name} className="product-image" />
                  <div className="product-hover-icons">
                    <button 
                      className={`product-eye-icon ${viewedProducts.has(product.id) ? 'viewed' : ''}`}
                      onClick={(e) => handleEyeIconClick(e, product)}
                      aria-label="View product"
                    >
                      👁
                    </button>
                    <button 
                      className={`product-wishlist-icon ${wishlistItems.has(product.id) ? 'active' : ''}`}
                      onClick={(e) => handleWishlistClick(e, product)}
                      aria-label="Add to wishlist"
                    >
                      {wishlistItems.has(product.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  {product.badge && (
                    <span className={`product-badge ${product.badge.toLowerCase().replace(" ", "-")}`}>
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
                    {Array(product.rating).fill("★").join("")}{Array(5 - product.rating).fill("☆").join("")} ({product.reviews})
                  </div>
                  <div className="product-price">
                    <span className="current-price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button className="add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* All Products Button */}
          <div className="new-arrivals-all-products-container">
            <button 
              className="new-arrivals-all-products-btn"
              onClick={(e) => {
                e.preventDefault();
                navigateToShop(e);
              }}
            >
              All Products
            </button>
          </div>
        </div>
      </section>
      <Footer 
        navigateToHome={navigateToHome}
        navigateToShop={navigateToShop}
        navigateToAbout={navigateToAbout}
        navigateToContact={navigateToContact}
        navigateToAccount={navigateToAccount}
        navigateToOrders={navigateToOrders}
        handleCategoryClick={handleCategoryClick}
      />
    </>
  );
};

export default Arrivals;

