import React from 'react';
import OrderSummary from './OrderSummary';

const Delivery = ({
  selectedDeliveryOption,
  setSelectedDeliveryOption,
  giftWrapping,
  setGiftWrapping,
  jewelleryInsurance,
  setJewelleryInsurance,
  handleBackToAddress,
  handleContinueToPayment,
  getCartSubtotal,
  getDeliveryCost,
  getOrderTotal
}) => {
  return (
    <>
      {/* Left Column - Delivery Options */}
      <div className="checkout-left-column">
        <h2 className="checkout-section-title">Choose Delivery Option</h2>

        <div className="delivery-options">
          <label className="delivery-option-card">
            <input
              type="radio"
              name="delivery-option"
              value="standard"
              checked={selectedDeliveryOption === 'standard'}
              onChange={(e) => setSelectedDeliveryOption(e.target.value)}
            />
            <div className="delivery-option-content">
              <div className="delivery-option-header">
                <span className="delivery-option-name">Standard Delivery</span>
                <span className="delivery-option-price">FREE</span>
              </div>
              <span className="delivery-option-duration">5-7 business days</span>
            </div>
          </label>

          <label className="delivery-option-card">
            <input
              type="radio"
              name="delivery-option"
              value="express"
              checked={selectedDeliveryOption === 'express'}
              onChange={(e) => setSelectedDeliveryOption(e.target.value)}
            />
            <div className="delivery-option-content">
              <div className="delivery-option-header">
                <span className="delivery-option-name">Express Delivery</span>
                <span className="delivery-option-price">₹500</span>
              </div>
              <span className="delivery-option-duration">2-3 business days</span>
            </div>
          </label>

          <label className="delivery-option-card">
            <input
              type="radio"
              name="delivery-option"
              value="premium"
              checked={selectedDeliveryOption === 'premium'}
              onChange={(e) => setSelectedDeliveryOption(e.target.value)}
            />
            <div className="delivery-option-content">
              <div className="delivery-option-header">
                <span className="delivery-option-name">Premium Delivery</span>
                <span className="delivery-option-price">₹1,000</span>
              </div>
              <span className="delivery-option-duration">1 business day</span>
            </div>
          </label>
        </div>

        <h3 className="additional-options-title">Additional Options</h3>
        <div className="additional-options">
          <label className="additional-option-card">
            <input
              type="checkbox"
              checked={giftWrapping}
              onChange={(e) => setGiftWrapping(e.target.checked)}
            />
            <div className="additional-option-content">
              <span className="additional-option-name">Gift Wrapping</span>
              <span className="additional-option-description">Premium gift box with ribbon</span>
              <span className="additional-option-price">₹250</span>
            </div>
          </label>

          <label className="additional-option-card">
            <input
              type="checkbox"
              checked={jewelleryInsurance}
              onChange={(e) => setJewelleryInsurance(e.target.checked)}
            />
            <div className="additional-option-content">
              <span className="additional-option-name">Jewellery Insurance</span>
              <span className="additional-option-description">Protect your purchase</span>
              <span className="additional-option-price">₹500</span>
            </div>
          </label>
        </div>

        <div className="delivery-navigation-buttons">
          <button className="back-to-address-btn" onClick={handleBackToAddress}>
            &lt; Back
          </button>
          <button className="continue-payment-btn" onClick={handleContinueToPayment}>
            Continue to Payment &gt;
          </button>
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

export default Delivery;

