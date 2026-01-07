import React from 'react';
import Footer from './Footer';

const Wishlist = ({
  wishlistItems,
  setWishlistItems,
  getWishlistProducts,
  getProductImage,
  handleAddToCart,
  closeAllPages,
  navigateToShop,
  navigateToHome,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick
}) => {
  return (
    <div className="wishlist-page-wrapper">
      <div className="content-width">
        <div className="wishlist-page-header">
          <h1 className="wishlist-page-title">My Wishlist</h1>
          {getWishlistProducts().length > 0 && (
            <p className="wishlist-page-subtitle">{getWishlistProducts().length} items saved</p>
          )}
        </div>

        {getWishlistProducts().length === 0 ? (
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">❤️</div>
            <h3 className="wishlist-empty-title">Your Wishlist is Empty</h3>
            <p className="wishlist-empty-text">Save your favorite items here to buy them later</p>
            <button className="wishlist-continue-shopping-btn" onClick={(e) => {
              e.preventDefault();
              closeAllPages();
              navigateToShop(e);
            }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="wishlist-items-grid">
            {getWishlistProducts().map((product) => (
              <div key={product.id} className="wishlist-item-card">
                <div className="wishlist-item-image-wrapper">
                  <img src={getProductImage(product)} alt={product.name} className="wishlist-item-image" />
                  {product.badge && (
                    <span className={`wishlist-item-badge ${product.badge.toLowerCase().replace(" ", "-")}`}>
                      {product.badge}
                    </span>
                  )}
                  <button 
                    className="wishlist-delete-btn"
                    onClick={() => {
                      const newWishlist = new Set(wishlistItems);
                      newWishlist.delete(product.id);
                      setWishlistItems(newWishlist);
                    }}
                    aria-label="Remove from wishlist"
                  >
                    🗑️
                  </button>
                </div>
                <div className="wishlist-item-info">
                  <h3 className="wishlist-item-name">{product.name}</h3>
                  <p className="wishlist-item-material">1 Gram Gold Plated</p>
                  <div className="wishlist-item-price">
                    <span className="wishlist-current-price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="wishlist-original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button className="wishlist-add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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

export default Wishlist;

