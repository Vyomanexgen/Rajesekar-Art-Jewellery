import React from 'react';
import Footer from './Footer';

const Cart = ({
  cartItems,
  couponCode,
  couponApplied,
  setShowCartModal,
  setCouponCode,
  getCartProducts,
  getCartCount,
  getCartTotal,
  getCartSubtotal,
  getCouponDiscount,
  getShippingCost,
  getFreeShippingThreshold,
  getTaxAmount,
  getFinalTotal,
  getProductImage,
  getProductAttributes,
  handleDeleteFromCart,
  handleRemoveFromCart,
  handleQuantityChange,
  handleAddToCart,
  handleApplyCoupon,
  handleCheckout,
  navigateToShop,
  navigateToHome,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick
}) => {
  return (
    <div className="cart-page-wrapper">
      <div className="cart-page-container">
        <div className="cart-page-header">
          <div className="cart-breadcrumbs">
            <a href="#" onClick={(e) => { e.preventDefault(); setShowCartModal(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Home</a>
            <span> &gt; </span>
            <span>Shopping Cart</span>
          </div>
        </div>
        
        {getCartProducts().length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon">🛒</div>
            <h2 className="cart-empty-title">Your Cart is Empty</h2>
            <p className="cart-empty-text">Add items to your cart to continue shopping</p>
            <button className="cart-continue-shopping-btn" onClick={(e) => {
              e.preventDefault();
              setShowCartModal(false);
              navigateToShop(e);
            }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-page-content">
            <div className="cart-items-section">
              <h2 className="cart-section-title">Shopping Cart ({getCartCount()} item{getCartCount() !== 1 ? 's' : ''})</h2>
              <div className="cart-items-list">
                {getCartProducts().map((item) => (
                  <div key={item.id} className="cart-item-card">
                    <button 
                      className="cart-item-delete"
                      onClick={() => handleDeleteFromCart(item.id)}
                      aria-label="Remove from cart"
                    >
                      🗑️
                    </button>
                    <div className="cart-item-image-wrapper">
                      <img src={getProductImage(item)} alt={item.name} className="cart-item-image" />
                    </div>
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <div className="cart-item-attributes">
                        {getProductAttributes(item).map((attr, index) => (
                          <span key={index} className="cart-item-attribute">{attr}</span>
                        ))}
                      </div>
                      <div className="cart-item-pricing">
                        <div className="cart-item-price">
                          <span className="cart-current-price">₹{item.price.toLocaleString()}</span>
                          {item.originalPrice && (
                            <span className="cart-original-price">₹{item.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                        <div className="cart-quantity-section">
                          <div className="cart-quantity-controls-horizontal">
                            <button 
                              className="cart-qty-btn"
                              onClick={() => handleRemoveFromCart(item.id)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              className="cart-qty-value"
                              value={item.quantity}
                              min="1"
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              onBlur={(e) => {
                                const value = parseInt(e.target.value);
                                if (isNaN(value) || value < 1) {
                                  handleQuantityChange(item.id, 1);
                                }
                              }}
                              aria-label="Quantity"
                            />
                            <button 
                              className="cart-qty-btn"
                              onClick={() => handleAddToCart({ stopPropagation: () => {} }, item)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <div className="cart-item-total-price">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cart-order-summary">
              <h2 className="order-summary-title">Order Summary</h2>
              
              <div className="coupon-section">
                <p className="coupon-label">Have a coupon code?</p>
                <div className="coupon-input-group">
                  <input 
                    type="text" 
                    className="coupon-input" 
                    placeholder="Enter code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={couponApplied}
                  />
                  <button 
                    className="coupon-apply-btn"
                    onClick={handleApplyCoupon}
                    disabled={couponApplied}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p style={{ color: '#22c55e', fontSize: '14px', marginTop: '8px', fontWeight: '500' }}>
                    ✓ Coupon "Raja33" applied! 20% discount applied.
                  </p>
                )}
              </div>

              <div className="order-summary-details">
                <div className="summary-row">
                  <span>Subtotal ({getCartCount()} item{getCartCount() !== 1 ? 's' : ''})</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                {couponApplied && (
                  <div className="summary-row" style={{ color: '#22c55e' }}>
                    <span>Coupon Discount (20%)</span>
                    <span>-₹{getCouponDiscount().toLocaleString()}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Subtotal After Discount</span>
                  <span>₹{getCartSubtotal().toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{getShippingCost() === 0 ? 'Free' : `₹${getShippingCost().toLocaleString()}`}</span>
                </div>
                {getFreeShippingThreshold() > 0 && (
                  <div className="free-shipping-message">
                    Add ₹{getFreeShippingThreshold().toLocaleString()} more for free shipping!
                  </div>
                )}
                <div className="summary-row">
                  <span>Taxes (GST 3%)</span>
                  <span>₹{getTaxAmount().toLocaleString()}</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Estimated Total</span>
                  <span>₹{getFinalTotal().toLocaleString()}</span>
                </div>
              </div>

              {/* Desktop: Checkout button in order summary */}
              <button className="checkout-btn checkout-btn-desktop" onClick={handleCheckout}>
                Proceed to Checkout &gt;
              </button>

              <div className="cart-guarantees">
                <div className="guarantee-item">✓ Secure checkout with SSL encryption</div>
                <div className="guarantee-item">✓ 30-day return policy</div>
                <div className="guarantee-item">✓ Certified jewellery with hallmark</div>
              </div>
            </div>
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

export default Cart;

