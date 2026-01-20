import React from 'react';
import Footer from './Footer';

const Account = ({
  userDetails,
  isDragging,
  accountPageSection,
  userOrders,
  addresses,
  showAddAddressForm,
  newAddress,
  isLoggedIn,
  setAccountPageSection,
  setIsDragging,
  setShowAccountPage,
  setShowWishlist,
  setShowLogoutConfirm,
  setShowAddAddressForm,
  setNewAddress,
  setAddresses,
  setSelectedAddressId,
  setUserDetails,
  handleDragOver,
  handleDragLeave,
  handleAccountProfileDrop,
  handleAccountProfilePhotoChange,
  handleEditProfileOpen,
  handleAddAddress,
  handleCancelAddAddress,
  handleSaveAddress,
  navigateToHome,
  navigateToShop,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick
}) => {
  return (
    <div className="account-page-wrapper">
      <div className="content-width">
        <h1 className="account-page-title">My Account</h1>
        
        {/* Mobile: Photo upload section at top */}
        <div className="account-profile-header-mobile">
          <div 
            className={`account-avatar-large ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleAccountProfileDrop}
            onClick={() => document.getElementById('account-profile-photo-input-mobile').click()}
            style={{ cursor: 'pointer', position: 'relative' }}
          >
            {userDetails?.profilePhoto ? (
              <>
                <img src={userDetails.profilePhoto} alt="Profile" className="account-avatar-image" />
                <div className="account-avatar-overlay">
                  <span className="account-avatar-upload-icon">📷</span>
                  <span className="account-avatar-upload-text">Click or drag to change</span>
                </div>
              </>
            ) : (
              <>
                <span className="account-avatar-placeholder">👤</span>
                <div className="account-avatar-overlay">
                  <span className="account-avatar-upload-icon">📷</span>
                  <span className="account-avatar-upload-text">Click or drag to upload</span>
                </div>
              </>
            )}
            <input
              type="file"
              id="account-profile-photo-input-mobile"
              accept="image/*"
              onChange={handleAccountProfilePhotoChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className="account-profile-info">
            <h3 className="account-profile-name">{userDetails?.fullName || userDetails?.name || 'User'}</h3>
            <p className="account-profile-email">{userDetails?.email || ''}</p>
          </div>
        </div>

        <div className="account-page-container">
          {/* Left Sidebar */}
          <aside className="account-sidebar">
            <div className="account-profile-header">
              <div 
                className={`account-avatar-large ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleAccountProfileDrop}
                onClick={() => document.getElementById('account-profile-photo-input').click()}
                style={{ cursor: 'pointer', position: 'relative' }}
              >
                {userDetails?.profilePhoto ? (
                  <>
                    <img src={userDetails.profilePhoto} alt="Profile" className="account-avatar-image" />
                    <div className="account-avatar-overlay">
                      <span className="account-avatar-upload-icon">📷</span>
                      <span className="account-avatar-upload-text">Click or drag to change</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="account-avatar-placeholder">👤</span>
                    <div className="account-avatar-overlay">
                      <span className="account-avatar-upload-icon">📷</span>
                      <span className="account-avatar-upload-text">Click or drag to upload</span>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  id="account-profile-photo-input"
                  accept="image/*"
                  onChange={handleAccountProfilePhotoChange}
                  style={{ display: 'none' }}
                />
              </div>
              <div className="account-profile-info">
                <h3 className="account-profile-name">{userDetails?.fullName || userDetails?.name || 'User'}</h3>
                <p className="account-profile-email">{userDetails?.email || ''}</p>
              </div>
            </div>
            <nav className="account-nav">
              <a 
                href="#" 
                className={`account-nav-link ${accountPageSection === 'overview' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setAccountPageSection('overview'); }}
              >
                <span className="account-nav-icon">📦</span>
                <span>My Orders</span>
                <span className="account-nav-arrow">›</span>
              </a>
              <a 
                href="#" 
                className={`account-nav-link ${accountPageSection === 'wishlist' ? 'active' : ''}`}
                onClick={(e) => { 
                  e.preventDefault(); 
                  setShowAccountPage(false);
                  setShowWishlist(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <span className="account-nav-icon">♡</span>
                <span>Wishlist</span>
                <span className="account-nav-arrow">›</span>
              </a>
              <a 
                href="#" 
                className={`account-nav-link ${accountPageSection === 'addresses' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); setAccountPageSection('addresses'); }}
              >
                <span className="account-nav-icon">📍</span>
                <span>Addresses</span>
                <span className="account-nav-arrow">›</span>
              </a>
              <a 
                href="#" 
                className="account-nav-link account-nav-link-logout"
                onClick={(e) => { 
                  e.preventDefault(); 
                  setShowLogoutConfirm(true);
                }}
              >
                <span className="account-nav-icon">🚪</span>
                <span>Log Out</span>
                <span className="account-nav-arrow">›</span>
              </a>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="account-main-content">
            {accountPageSection === 'overview' ? (
              <>
                {/* Account Overview */}
                <div className="account-overview-card">
                  <h2 className="account-section-title">Account Overview</h2>
                  <div className="account-overview-grid">
                    <div className="account-overview-item">
                      <span className="account-overview-label">Full Name</span>
                      <span className="account-overview-value">{userDetails?.fullName || 'Not provided'}</span>
                    </div>
                    <div className="account-overview-item">
                      <span className="account-overview-label">Phone</span>
                      <span className="account-overview-value">{userDetails?.phone || '+91 98765 43210'}</span>
                    </div>
                    <div className="account-overview-item">
                      <span className="account-overview-label">Email</span>
                      <span className="account-overview-value">{userDetails?.email || 'Not provided'}</span>
                    </div>
                    <div className="account-overview-item">
                      <span className="account-overview-label">Member Since</span>
                      <span className="account-overview-value">{userDetails?.memberSince || 'Oct 2025'}</span>
                    </div>
                  </div>
                  <button 
                    className="account-edit-profile-btn"
                    onClick={handleEditProfileOpen}
                  >
                    Edit Profile
                  </button>
                </div>

                {/* Recent Orders */}
                <div className="account-orders-card">
                  <div className="account-orders-header">
                    <h2 className="account-section-title">Recent Orders</h2>
                    {userOrders.length > 3 && (
                      <a href="#" className="account-view-all-link" onClick={(e) => { e.preventDefault(); setAccountPageSection('orders'); }}>View All</a>
                    )}
                  </div>
                  {userOrders.length > 0 ? (
                    <div className="account-orders-list">
                      {userOrders.slice(0, 3).map((order) => (
                        <div key={order.id} className="account-order-item">
                          <div className="account-order-info">
                            <div className="account-order-number">{order.id}</div>
                            <div className="account-order-meta">
                              <span className="account-order-date">{order.date}</span>
                              <span className="account-order-items">{order.itemCount} item(s)</span>
                            </div>
                          </div>
                          <div className="account-order-right">
                            <span className={`account-order-status ${order.status === 'Delivery in progress' ? 'delivered' : order.status === 'In Transit' ? 'in-transit' : ''}`}>
                              {order.status}
                            </span>
                            <span className="account-order-price">₹{order.total.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="account-no-orders">
                      <p>No orders yet. Start shopping to see your orders here!</p>
                    </div>
                  )}
                </div>

                {/* Quick Access Cards */}
                <div className="account-quick-links">
                  <div className="account-quick-link-card" onClick={() => { setAccountPageSection('orders'); }}>
                    <div className="account-quick-link-icon">📦</div>
                    <h3 className="account-quick-link-title">Track Orders</h3>
                    <p className="account-quick-link-desc">View order status and tracking</p>
                  </div>
                  <div className="account-quick-link-card" onClick={() => { 
                    setShowAccountPage(false);
                    setShowWishlist(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>
                    <div className="account-quick-link-icon">♡</div>
                    <h3 className="account-quick-link-title">Wishlist</h3>
                    <p className="account-quick-link-desc">View saved items</p>
                  </div>
                  <div className="account-quick-link-card" onClick={() => { setAccountPageSection('addresses'); }}>
                    <div className="account-quick-link-icon">📍</div>
                    <h3 className="account-quick-link-title">Addresses</h3>
                    <p className="account-quick-link-desc">Manage delivery addresses</p>
                  </div>
                </div>
              </>
            ) : accountPageSection === 'orders' ? (
              <>
                <h1 className="account-page-title">My Orders</h1>
                <div className="account-orders-card">
                  {userOrders.length > 0 ? (
                    <div className="account-orders-list">
                      {userOrders.map((order) => (
                        <div key={order.id} className="account-order-item">
                          <div className="account-order-info">
                            <div className="account-order-number">{order.id}</div>
                            <div className="account-order-meta">
                              <span className="account-order-date">{order.date}</span>
                              <span className="account-order-items">{order.itemCount} item(s)</span>
                            </div>
                            <div className="account-order-items-detail">
                              {order.items.map((item, idx) => (
                                <span key={idx} className="account-order-item-name">{item.name} (Qty: {item.quantity})</span>
                              ))}
                            </div>
                          </div>
                          <div className="account-order-right">
                            <span className={`account-order-status ${order.status === 'Delivery in progress' ? 'delivered' : order.status === 'In Transit' ? 'in-transit' : ''}`}>
                              {order.status}
                            </span>
                            <span className="account-order-price">₹{order.total.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="account-no-orders">
                      <p>No orders yet. Start shopping to see your orders here!</p>
                    </div>
                  )}
                </div>
              </>
            ) : accountPageSection === 'addresses' ? (
              <>
                <h1 className="account-page-title">My Addresses</h1>
                <div className="account-addresses-card">
                  {addresses.length > 0 && !showAddAddressForm && (
                    <div className="account-addresses-list">
                      {addresses.map((address) => (
                        <div key={address.id} className="account-address-item">
                          <div className="account-address-header">
                            <h3 className="account-address-name">{address.name}</h3>
                            {address.isDefault && <span className="account-address-default">Default</span>}
                          </div>
                          <p className="account-address-line">{address.addressLine1}</p>
                          {address.addressLine2 && <p className="account-address-line">{address.addressLine2}</p>}
                          <p className="account-address-phone">Phone: {address.phone}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {!showAddAddressForm && (
                    <button className="account-add-address-btn" onClick={handleAddAddress}>
                      + Add Address
                    </button>
                  )}

                  {showAddAddressForm && (
                    <div className="account-new-address-form">
                      <h3 className="account-new-address-title">Add New Address</h3>
                      <div className="account-address-form-fields">
                        <div className="account-form-field">
                          <label className="account-form-label">Full Name *</label>
                          <input
                            type="text"
                            className="account-form-input"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            placeholder="Enter full name"
                            required
                          />
                        </div>
                        <div className="account-form-field">
                          <label className="account-form-label">Phone Number *</label>
                          <input
                            type="tel"
                            className="account-form-input"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            placeholder="Enter phone number"
                            required
                          />
                        </div>
                        <div className="account-form-field">
                          <label className="account-form-label">Pincode *</label>
                          <input
                            type="text"
                            className="account-form-input"
                            value={newAddress.pincode}
                            onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                            placeholder="Enter pincode"
                            required
                          />
                        </div>
                        <div className="account-form-field address-field-full">
                          <label className="account-form-label">Address *</label>
                          <textarea
                            className="account-form-textarea"
                            value={newAddress.address}
                            onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                            placeholder="Enter address"
                            rows="3"
                            required
                          />
                        </div>
                        <div className="account-form-field">
                          <label className="account-form-label">City *</label>
                          <input
                            type="text"
                            className="account-form-input"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            placeholder="Enter city"
                            required
                          />
                        </div>
                        <div className="account-form-field">
                          <label className="account-form-label">State *</label>
                          <input
                            type="text"
                            className="account-form-input"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            placeholder="Enter state"
                            required
                          />
                        </div>
                      </div>
                      <div className="account-address-form-actions">
                        <button 
                          type="button" 
                          className="account-form-cancel-btn"
                          onClick={handleCancelAddAddress}
                        >
                          Cancel
                        </button>
                        <button 
                          type="button" 
                          className="account-form-save-btn"
                          onClick={handleSaveAddress}
                        >
                          Save Address
                        </button>
                      </div>
                    </div>
                  )}

                  {addresses.length === 0 && !showAddAddressForm && (
                    <div className="account-no-addresses">
                      <p>No addresses saved. Click "Add Address" to add your first address!</p>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {isLoggedIn && (
        <Footer 
          navigateToHome={navigateToHome}
          navigateToShop={navigateToShop}
          navigateToAbout={navigateToAbout}
          navigateToContact={navigateToContact}
          navigateToAccount={navigateToAccount}
          navigateToOrders={navigateToOrders}
          handleCategoryClick={handleCategoryClick}
        />
      )}
    </div>
  );
};

export default Account;

