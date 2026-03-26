import React from 'react';

const OrderSummary = ({
  getCartSubtotal,
  getDeliveryCost,
  getOrderTotal,
  giftWrapping,
  jewelleryInsurance
}) => {
  return (
    <div className="checkout-order-summary">
      <h2 className="checkout-section-title">Order Summary</h2>
      <div className="checkout-summary-details">
        <div className="summary-row">
          <span>Cart Total</span>
          <span>₹{getCartSubtotal().toLocaleString()}</span>
        </div>
        <div className="summary-row">
          <span>Delivery</span>
          <span>{getDeliveryCost ? (getDeliveryCost() === 0 ? 'FREE' : `₹${getDeliveryCost().toLocaleString()}`) : 'FREE'}</span>
        </div>
        {giftWrapping && (
          <div className="summary-row">
            <span>Gift Wrapping</span>
            <span>₹250</span>
          </div>
        )}
        {jewelleryInsurance && (
          <div className="summary-row">
            <span>Jewellery Insurance</span>
            <span>₹500</span>
          </div>
        )}
        <div className="summary-row checkout-total">
          <span>Total</span>
          <span>₹{(getOrderTotal ? getOrderTotal() : getCartSubtotal()).toLocaleString()}</span>
        </div>
      </div>
      <div className="checkout-guarantees">
        <div className="guarantee-item">✓ Secure SSL encrypted checkout</div>
        <div className="guarantee-item">✓ Certified hallmarked jewellery</div>
        <div className="guarantee-item">✓ 30-day return policy</div>
      </div>
    </div>
  );
};

export default OrderSummary;

