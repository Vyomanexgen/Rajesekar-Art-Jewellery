import React from 'react';
import { getProductImage, getProductDescription } from '../utils/productUtils';

const ProductModal = ({
  selectedProduct,
  closeModal,
  handleAddToCart,
  handleBuyNow
}) => {
  if (!selectedProduct) return null;

  return (
    <div className="product-modal-overlay" onClick={closeModal}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="product-modal-close" onClick={closeModal}>×</button>
        <div className="product-modal-content">
          <div className="product-modal-image-section">
            <img src={getProductImage(selectedProduct)} alt={selectedProduct.name} className="product-modal-image" />
            {selectedProduct.discount && (
              <span className="product-modal-discount-badge">{selectedProduct.discount}% OFF</span>
            )}
          </div>
          <div className="product-modal-details">
            <h2 className="product-modal-title">{selectedProduct.name}</h2>
            <div className="product-modal-rating">
              {Array(selectedProduct.rating).fill("★").join("")}{Array(5 - selectedProduct.rating).fill("☆").join("")} 
              <span className="product-modal-review-count">({selectedProduct.reviews} reviews)</span>
            </div>
            <div className="product-modal-price">
              <span className="product-modal-current-price">₹{selectedProduct.price.toLocaleString()}</span>
              {selectedProduct.originalPrice && (
                <span className="product-modal-original-price">₹{selectedProduct.originalPrice.toLocaleString()}</span>
              )}
            </div>
            <p className="product-modal-description">{getProductDescription(selectedProduct)}</p>
            <p className="product-modal-material">Material: 1 Gram Gold Plated</p>
            <div className="product-modal-buttons">
              <button className="product-modal-add-to-cart-btn" onClick={(e) => { handleAddToCart(e, selectedProduct); }}>
                🛒 Add to Cart
              </button>
              <button className="product-modal-buy-now-btn" onClick={(e) => { handleBuyNow(e, selectedProduct); }}>
                Buy Now
              </button>
            </div>
            <div className="product-modal-delivery">
              <span className="delivery-icon">🚚</span>
              <span>Delivery in 2-4 days to Nellore, Andhra Pradesh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

