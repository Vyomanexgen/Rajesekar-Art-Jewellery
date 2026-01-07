import React from 'react';
import { getProductImage } from '../utils/productUtils';

const SearchResults = ({
  searchQuery,
  getSearchResults,
  handleProductClick,
  viewedProducts,
  handleEyeIconClick,
  wishlistItems,
  handleWishlistClick,
  handleAddToCart
}) => {
  const results = getSearchResults();

  return (
    <section className="search-results-section">
      <div className="content-width">
        <div className="search-results-header">
          <h2 className="search-results-title">Search Results for "{searchQuery}"</h2>
          <p className="search-results-count">{results.length} products found</p>
        </div>
        <div className="products-grid">
          {results.map((product) => (
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
                    {wishlistItems.has(product.id) ? '♥' : '♡'}
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
      </div>
    </section>
  );
};

export default SearchResults;

