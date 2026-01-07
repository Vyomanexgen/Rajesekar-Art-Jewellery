import React from 'react';
import OrderSummary from './OrderSummary';

const Review = ({
  getSelectedAddress,
  getDeliveryMethodName,
  getPaymentMethodName,
  setCheckoutStep,
  handleBackToPayment,
  orderTriggered,
  setOrderTriggered,
  handlePlaceOrder,
  getCartSubtotal,
  getDeliveryCost,
  getOrderTotal,
  giftWrapping,
  jewelleryInsurance
}) => {
  return (
    <>
      {/* Order Animation Overlay */}
      {orderTriggered && (
        <div className="order-animation-overlay">
          <div className="order-animation-content">
            <div className="order-background"></div>
            <div className="order-package-container">
              <div className="order-package">
                <div className="order-package-details"></div>
                <div className="order-package-text">📦</div>
              </div>
            </div>
            <div className="order-car-container">
              <div className="order-car-part1">
                <div className="order-wheels"></div>
                <div className="order-details"></div>
              </div>
              <div className="order-car-part2"></div>
            </div>
            <div className="order-text">Order Placed</div>
            <div className="order-done">Done!</div>
          </div>
        </div>
      )}

      {/* Left Column - Review Your Order */}
      <div className="checkout-left-column">
        <h2 className="checkout-section-title">Review Your Order</h2>

        {/* Delivery Address Card */}
        <div className="review-card">
          <div className="review-card-header">
            <h3 className="review-card-title">Delivery Address</h3>
            <a href="#" className="review-change-link" onClick={(e) => { e.preventDefault(); setCheckoutStep('address'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Change</a>
          </div>
          <div className="review-card-content">
            {getSelectedAddress() && (
              <>
                <p className="review-address-name">{getSelectedAddress().name}</p>
                <p className="review-address-line">{getSelectedAddress().addressLine1}</p>
                <p className="review-address-line">{getSelectedAddress().addressLine2}</p>
                <p className="review-address-phone">{getSelectedAddress().phone}</p>
              </>
            )}
          </div>
        </div>

        {/* Delivery Method Card */}
        <div className="review-card">
          <div className="review-card-header">
            <h3 className="review-card-title">Delivery Method</h3>
            <a href="#" className="review-change-link" onClick={(e) => { e.preventDefault(); setCheckoutStep('delivery'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Change</a>
          </div>
          <div className="review-card-content">
            <p className="review-method-text">{getDeliveryMethodName()}</p>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="review-card">
          <div className="review-card-header">
            <h3 className="review-card-title">Payment Method</h3>
            <a href="#" className="review-change-link" onClick={(e) => { e.preventDefault(); setCheckoutStep('payment'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Change</a>
          </div>
          <div className="review-card-content">
            <p className="review-method-text">{getPaymentMethodName()}</p>
          </div>
        </div>

        <div className="review-navigation-buttons">
          <button className="back-to-payment-btn" onClick={handleBackToPayment}>
            &lt; Back
          </button>
          <div className="order-button-container">
            <input 
              type="checkbox" 
              id="order-trigger" 
              checked={orderTriggered}
              onChange={(e) => {
                setOrderTriggered(true);
                handlePlaceOrder({ target: { checked: true } });
              }}
            />
            <label htmlFor="order-trigger" className="order-button">
              <div className="order-stars"></div>
              <div className="order-background"></div>
              <span className="order-text">Place Order</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right Column - Order Summary */}
      <OrderSummary
        getCartSubtotal={getCartSubtotal}
        getDeliveryCost={getDeliveryCost}
        getOrderTotal={getOrderTotal}
        giftWrapping={giftWrapping}
        jewelleryInsurance={jewelleryInsurance}
      />
    </>
  );
};

export default Review;

