import React from 'react';

/**
 * CartToast component - Shows cart notification toasts
 */
export const CartToast = ({ showCartToast, showToast, toastMessage }) => {
  if (!showCartToast && !showToast) {
    return null;
  }

  return (
    <div className="cart-toast">
      <div className="cart-toast-content">
        <span className="cart-toast-icon">✓</span>
        <span className="cart-toast-message">
          {showToast ? toastMessage : 'The product added to the cart'}
        </span>
      </div>
    </div>
  );
};

export default CartToast;
