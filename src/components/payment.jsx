import React from 'react';
import OrderSummary from './OrderSummary';

const Payment = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  cardDetails,
  setCardDetails,
  handleBackToDelivery,
  handleReviewOrder,
  getCartSubtotal,
  getDeliveryCost,
  getOrderTotal,
  giftWrapping,
  jewelleryInsurance
}) => {
  return (
    <>
      {/* Left Column - Payment Method */}
      <div className="checkout-left-column">
        <h2 className="checkout-section-title">Payment Method</h2>

        <div className="payment-methods">
          <label className="payment-method-card">
            <input
              type="radio"
              name="payment-method"
              value="card"
              checked={selectedPaymentMethod === 'card'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <div className="payment-method-content">
              <div className="payment-method-header">
                <span className="payment-method-name">Credit / Debit Card</span>
              </div>
              <span className="payment-method-description">Visa, Mastercard, Amex, RuPay</span>
            </div>
          </label>

          <label className="payment-method-card">
            <input
              type="radio"
              name="payment-method"
              value="upi"
              checked={selectedPaymentMethod === 'upi'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <div className="payment-method-content">
              <div className="payment-method-header">
                <span className="payment-method-name">UPI</span>
              </div>
              <span className="payment-method-description">Google Pay, PhonePe, Paytm</span>
            </div>
          </label>

          <label className="payment-method-card">
            <input
              type="radio"
              name="payment-method"
              value="netbanking"
              checked={selectedPaymentMethod === 'netbanking'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <div className="payment-method-content">
              <div className="payment-method-header">
                <span className="payment-method-name">Net Banking</span>
              </div>
              <span className="payment-method-description">All major banks</span>
            </div>
          </label>

          <label className="payment-method-card">
            <input
              type="radio"
              name="payment-method"
              value="cod"
              checked={selectedPaymentMethod === 'cod'}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <div className="payment-method-content">
              <div className="payment-method-header">
                <span className="payment-method-name">Cash on Delivery</span>
              </div>
              <span className="payment-method-description">Pay when you receive</span>
            </div>
          </label>
        </div>

        {/* Card Details Form - Only show when card is selected */}
        {selectedPaymentMethod === 'card' && (
          <div className="card-details-form">
            <div className="form-field">
              <label>Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                maxLength="19"
              />
            </div>
            <div className="form-field">
              <label>Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={cardDetails.cardholderName}
                onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
              />
            </div>
            <div className="form-field-row">
              <div className="form-field">
                <label>MM/YY</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                  maxLength="5"
                />
              </div>
              <div className="form-field">
                <label>CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  maxLength="4"
                />
              </div>
            </div>
          </div>
        )}

        <div className="payment-navigation-buttons">
          <button className="back-to-delivery-btn" onClick={handleBackToDelivery}>
            &lt; Back
          </button>
          <button className="review-order-btn" onClick={handleReviewOrder}>
            Review Order &gt;
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

export default Payment;

