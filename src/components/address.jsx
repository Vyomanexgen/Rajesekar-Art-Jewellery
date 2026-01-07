import React from 'react';
import OrderSummary from './OrderSummary';

const Address = ({
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
  getCartSubtotal,
  getDeliveryCost,
  getOrderTotal
}) => {
  return (
    <>
      {/* Left Column - Address Selection */}
      <div className="checkout-left-column">
        <h2 className="checkout-section-title">Select Delivery Address</h2>

        {/* Saved Addresses */}
        {addresses.length > 0 && !showAddAddressForm && (
          <div className="saved-addresses">
            {addresses.map((address) => (
              <div key={address.id} className="address-card">
                <div className="address-card-header">
                  <label className="address-radio">
                    <input
                      type="radio"
                      name="delivery-address"
                      checked={selectedAddressId === address.id}
                      onChange={() => setSelectedAddressId(address.id)}
                    />
                    <span className="address-name">{address.name}</span>
                    {address.isDefault && <span className="address-default-badge">Default</span>}
                  </label>
                  <button className="edit-address-btn">
                    ✏️ Edit Address
                  </button>
                </div>
                <div className="address-details">
                  <p>{address.addressLine1}</p>
                  <p>{address.addressLine2}</p>
                  <p>{address.phone}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Address Button */}
        {!showAddAddressForm && (
          <button className="add-address-btn" onClick={handleAddAddress}>
            + Add New Address
          </button>
        )}

        {/* New Address Form */}
        {showAddAddressForm && (
          <div className="new-address-form">
            <h3 className="new-address-title">New Address</h3>
            <div className="address-form-fields">
              <div className="form-field">
                <label>Full Name</label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-field">
                <label>Pincode</label>
                <input
                  type="text"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                  placeholder="Enter pincode"
                />
              </div>
              <div className="form-field">
                <label>Address</label>
                <textarea
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  placeholder="Enter address"
                  rows="3"
                />
              </div>
              <div className="form-field">
                <label>City</label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  placeholder="Enter city"
                />
              </div>
              <div className="form-field">
                <label>State</label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  placeholder="Enter state"
                />
              </div>
            </div>
            <div className="address-form-buttons">
              <button className="cancel-address-btn" onClick={handleCancelAddAddress}>
                Cancel
              </button>
              <button className="save-address-btn" onClick={handleSaveAddress}>
                Save Address
              </button>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {!showAddAddressForm && (
          <button className="continue-delivery-btn" onClick={handleContinueToDelivery}>
            Continue to Delivery Options &gt;
          </button>
        )}
      </div>

      {/* Right Column - Order Summary */}
      <OrderSummary
        getCartSubtotal={getCartSubtotal}
        getDeliveryCost={getDeliveryCost}
        getOrderTotal={getOrderTotal}
        giftWrapping={false}
        jewelleryInsurance={false}
      />
    </>
  );
};

export default Address;

