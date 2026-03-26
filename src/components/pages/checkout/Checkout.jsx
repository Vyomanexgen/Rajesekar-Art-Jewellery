import React from 'react';
import Footer from '../../layout/Footer';
import Address from './Address';
import Delivery from './Delivery';
import Payment from './Payment';
import Review from './Review';

const Checkout = ({
  checkoutStep,
  addresses,
  selectedAddressId,
  setSelectedAddressId,
  showAddAddressForm,
  newAddress,
  setNewAddress,
  handleAddAddress,
  handleCancelAddAddress,
  handleSaveAddress,
  handleContinueToDelivery,
  selectedDeliveryOption,
  setSelectedDeliveryOption,
  giftWrapping,
  setGiftWrapping,
  jewelleryInsurance,
  setJewelleryInsurance,
  handleBackToAddress,
  handleContinueToPayment,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  cardDetails,
  setCardDetails,
  handleBackToDelivery,
  handleReviewOrder,
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
  navigateToHome,
  navigateToShop,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick
}) => {
  return (
    <div className="checkout-page-wrapper">
      <div className="content-width">
        {/* Checkout Progress Indicator */}
        <div className="checkout-progress">
          <div className={`checkout-step ${checkoutStep === 'address' ? 'active' : checkoutStep === 'delivery' || checkoutStep === 'payment' || checkoutStep === 'review' ? 'completed' : ''}`}>
            <div className="step-icon">{checkoutStep === 'address' ? '📍' : '✓'}</div>
            <span className="step-label">Address</span>
          </div>
          <div className="checkout-step-line"></div>
          <div className={`checkout-step ${checkoutStep === 'delivery' ? 'active' : checkoutStep === 'payment' || checkoutStep === 'review' ? 'completed' : ''}`}>
            <div className="step-icon">{checkoutStep === 'delivery' ? '🚚' : checkoutStep === 'payment' || checkoutStep === 'review' ? '✓' : '🚚'}</div>
            <span className="step-label">Delivery</span>
          </div>
          <div className="checkout-step-line"></div>
          <div className={`checkout-step ${checkoutStep === 'payment' ? 'active' : checkoutStep === 'review' ? 'completed' : ''}`}>
            <div className="step-icon">{checkoutStep === 'payment' ? '💳' : checkoutStep === 'review' ? '✓' : '💳'}</div>
            <span className="step-label">Payment</span>
          </div>
          <div className="checkout-step-line"></div>
          <div className={`checkout-step ${checkoutStep === 'review' ? 'active' : ''}`}>
            <div className="step-icon">✓</div>
            <span className="step-label">Review</span>
          </div>
        </div>

        <div className="checkout-content">
          {checkoutStep === 'address' ? (
            <Address
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              setSelectedAddressId={setSelectedAddressId}
              showAddAddressForm={showAddAddressForm}
              newAddress={newAddress}
              setNewAddress={setNewAddress}
              handleAddAddress={handleAddAddress}
              handleCancelAddAddress={handleCancelAddAddress}
              handleSaveAddress={handleSaveAddress}
              handleContinueToDelivery={handleContinueToDelivery}
              getCartSubtotal={getCartSubtotal}
              getDeliveryCost={getDeliveryCost}
              getOrderTotal={getOrderTotal}
            />
          ) : checkoutStep === 'delivery' ? (
            <Delivery
              selectedDeliveryOption={selectedDeliveryOption}
              setSelectedDeliveryOption={setSelectedDeliveryOption}
              giftWrapping={giftWrapping}
              setGiftWrapping={setGiftWrapping}
              jewelleryInsurance={jewelleryInsurance}
              setJewelleryInsurance={setJewelleryInsurance}
              handleBackToAddress={handleBackToAddress}
              handleContinueToPayment={handleContinueToPayment}
              getCartSubtotal={getCartSubtotal}
              getDeliveryCost={getDeliveryCost}
              getOrderTotal={getOrderTotal}
            />
          ) : checkoutStep === 'payment' ? (
            <Payment
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              cardDetails={cardDetails}
              setCardDetails={setCardDetails}
              handleBackToDelivery={handleBackToDelivery}
              handleReviewOrder={handleReviewOrder}
              getCartSubtotal={getCartSubtotal}
              getDeliveryCost={getDeliveryCost}
              getOrderTotal={getOrderTotal}
              giftWrapping={giftWrapping}
              jewelleryInsurance={jewelleryInsurance}
            />
          ) : checkoutStep === 'review' ? (
            <Review
              getSelectedAddress={getSelectedAddress}
              getDeliveryMethodName={getDeliveryMethodName}
              getPaymentMethodName={getPaymentMethodName}
              setCheckoutStep={setCheckoutStep}
              handleBackToPayment={handleBackToPayment}
              orderTriggered={orderTriggered}
              setOrderTriggered={setOrderTriggered}
              handlePlaceOrder={handlePlaceOrder}
              getCartSubtotal={getCartSubtotal}
              getDeliveryCost={getDeliveryCost}
              getOrderTotal={getOrderTotal}
              giftWrapping={giftWrapping}
              jewelleryInsurance={jewelleryInsurance}
            />
          ) : null}
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

export default Checkout;

