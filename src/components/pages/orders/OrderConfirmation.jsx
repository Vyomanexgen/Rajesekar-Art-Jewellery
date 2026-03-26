import React from 'react';
import Footer from '../../layout/Footer';
import { getProductImage } from '../../../utils/productUtils';

const OrderConfirmation = ({
  orderId,
  cartItems,
  products,
  getEstimatedDeliveryDate,
  getOrderTotal,
  handleContinueShopping,
  navigateToHome,
  navigateToShop,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick
}) => {
  return (
    <div className="order-confirmation-wrapper">
      <div className="content-width">
        <div className="order-confirmation-container">
          {/* Success Icon */}
          <div className="order-success-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="30" cy="30" r="30" fill="#22c55e"/>
              <path d="M20 30L27 37L40 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="order-confirmation-title">Order Placed Successfully!</h1>
          <p className="order-confirmation-subtitle">Thank you for your purchase.</p>

          {/* Order Details Card */}
          <div className="order-details-card">
            <div className="order-details-header">
              <h3 className="order-details-title">Order Information</h3>
              <span className="order-status-confirmation">Order Confirmed</span>
            </div>
            <div className="order-details-grid">
              <div className="order-detail-card-item">
                <span className="order-detail-label">Order ID</span>
                <span className="order-detail-value">{orderId}</span>
              </div>
              <div className="order-detail-card-item">
                <span className="order-detail-label">Order Date</span>
                <span className="order-detail-value">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="order-detail-card-item">
                <span className="order-detail-label">Estimated Delivery</span>
                <span className="order-detail-value">{getEstimatedDeliveryDate()}</span>
              </div>
              <div className="order-detail-card-item">
                <span className="order-detail-label">Order Status</span>
                <span className="order-detail-value status-confirmed">Confirmed</span>
              </div>
            </div>
          </div>

          {/* Tracking Information Card */}
          <div className="order-tracking-info-card">
            <div className="order-tracking-info-header">
              <h3 className="order-tracking-info-title">Tracking Information</h3>
            </div>
            <div className="order-tracking-timeline">
              <div className="order-tracking-step active">
                <div className="order-tracking-step-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="order-tracking-step-content">
                  <span className="order-tracking-step-title">Order Confirmed</span>
                  <span className="order-tracking-step-time">Just now</span>
                </div>
              </div>
              <div className="order-tracking-step">
                <div className="order-tracking-step-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="order-tracking-step-content">
                  <span className="order-tracking-step-title">Processing</span>
                  <span className="order-tracking-step-time">Within 24 hours</span>
                </div>
              </div>
              <div className="order-tracking-step">
                <div className="order-tracking-step-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="order-tracking-step-content">
                  <span className="order-tracking-step-title">Shipped</span>
                  <span className="order-tracking-step-time">Within 2-3 days</span>
                </div>
              </div>
              <div className="order-tracking-step">
                <div className="order-tracking-step-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="order-tracking-step-content">
                  <span className="order-tracking-step-title">Out for Delivery</span>
                  <span className="order-tracking-step-time">{getEstimatedDeliveryDate()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="order-items-section">
            <h2 className="order-items-title">Order Items</h2>
            <div className="order-items-list">
              {Array.from(cartItems.entries()).map(([productId, quantity]) => {
                const product = products.find(p => p.id === productId);
                if (!product) return null;
                return (
                  <div key={productId} className="order-item-card">
                    <div className="order-item-image">
                      <img src={getProductImage(product)} alt={product.name} />
                    </div>
                    <div className="order-item-details">
                      <h3 className="order-item-name">{product.name}</h3>
                      <div className="order-item-meta">
                        <span className="order-item-quantity">Quantity: {quantity}</span>
                        <span className="order-item-price">₹{(product.price * quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Total Amount */}
          <div className="order-total-section">
            <div className="order-total-row">
              <span className="order-total-label">Total Amount</span>
              <span className="order-total-value">₹{getOrderTotal().toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons Card */}
          <div className="order-action-buttons-card">
            <button className="track-order-btn-card">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 4H4L5 8H15L16 4H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 8L3 18H17L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="6" cy="18" r="1.5" fill="currentColor"/>
                <circle cx="14" cy="18" r="1.5" fill="currentColor"/>
              </svg>
              Track Your Order
            </button>
            <button className="download-invoice-btn-card">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 13V3M10 13L7 10M10 13L13 10M3 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Invoice
            </button>
          </div>

          {/* What Happens Next Card */}
          <div className="order-next-steps-card">
            <div className="order-next-steps-header">
              <h2 className="order-next-steps-title">What happens next?</h2>
            </div>
            <div className="order-next-steps-grid">
              <div className="order-next-step-item">
                <div className="order-next-step-icon">📧</div>
                <div className="order-next-step-content">
                  <h4 className="order-next-step-title">Confirmation Email</h4>
                  <p className="order-next-step-desc">You'll receive an order confirmation email with order details</p>
                </div>
              </div>
              <div className="order-next-step-item">
                <div className="order-next-step-icon">📦</div>
                <div className="order-next-step-content">
                  <h4 className="order-next-step-title">Packaging & Shipping</h4>
                  <p className="order-next-step-desc">Your jewellery will be carefully packaged and shipped</p>
                </div>
              </div>
              <div className="order-next-step-item">
                <div className="order-next-step-icon">📍</div>
                <div className="order-next-step-content">
                  <h4 className="order-next-step-title">Real-time Tracking</h4>
                  <p className="order-next-step-desc">Track your order status in real-time from your account</p>
                </div>
              </div>
              <div className="order-next-step-item">
                <div className="order-next-step-icon">🚚</div>
                <div className="order-next-step-content">
                  <h4 className="order-next-step-title">Delivery</h4>
                  <p className="order-next-step-desc">Delivery will be made to your selected address</p>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Shopping */}
          <div className="order-continue-shopping">
            <a href="#" className="continue-shopping-link" onClick={(e) => { e.preventDefault(); handleContinueShopping(); }}>
              Continue Shopping &gt;
            </a>
          </div>
        </div>
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

export default OrderConfirmation;

