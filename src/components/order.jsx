import React from 'react';
import Footer from './Footer';

const Order = ({
  userOrders,
  isLoggedIn,
  setShowOrdersPage,
  setShowShopPage,
  getProductImage,
  navigateToHome,
  navigateToShop,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick,
  setShowTrackOrderPage,
  setSelectedOrderId,
  setShowSignIn,
  setRedirectToOrdersAfterAuth
}) => {
  // If user is not logged in, show login message
  if (!isLoggedIn) {
    return (
      <div className="orders-page-wrapper">
        <div className="content-width">
          <div className="orders-page-header">
            <h1 className="orders-page-title">My Orders</h1>
          </div>
          <div className="orders-empty">
            <div className="orders-empty-icon">🔒</div>
            <h3 className="orders-empty-title">You didn't log in yet! Please sign in.</h3>
            <p className="orders-empty-text">Sign in to view your order history</p>
            <button 
              className="orders-continue-shopping-btn" 
              onClick={(e) => {
                e.preventDefault();
                if (setRedirectToOrdersAfterAuth) setRedirectToOrdersAfterAuth(true);
                if (setShowSignIn) setShowSignIn(true);
                if (window?.history?.pushState) {
                  window.history.pushState({}, '', '/signin');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Login
            </button>
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
  }

  return (
    <div className="orders-page-wrapper">
      <div className="content-width">
        <div className="orders-page-header">
          <h1 className="orders-page-title">My Orders</h1>
          {userOrders.length > 0 && (
            <p className="orders-page-subtitle">{userOrders.length} order(s)</p>
          )}
        </div>

        {userOrders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">📦</div>
            <h3 className="orders-empty-title">No Orders Yet</h3>
            <p className="orders-empty-text">Your order history will appear here</p>
            <button className="orders-continue-shopping-btn" onClick={() => {
              setShowOrdersPage(false);
              setShowShopPage(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {userOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-header-left">
                    <h3 className="order-number">{order.id}</h3>
                    <div className="order-meta">
                      <span className="order-date">Ordered on {order.date}</span>
                      <span className="order-items-count">{order.itemCount} item(s)</span>
                    </div>
                  </div>
                  <div className="order-header-right">
                    <span className={`order-status-badge-header ${order.status === 'Delivery in progress' ? 'delivered' : order.status === 'In Transit' ? 'in-transit' : order.status === 'Delivered' ? 'delivered' : 'pending'}`}>
                      {order.status}
                    </span>
                    <span className="order-total">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="order-items-section">
                  <h4 className="order-items-title">Order Items</h4>
                  <div className="order-items-list-container">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="order-item-card">
                        <div className="order-item-image">
                          <img src={getProductImage(item)} alt={item.name} />
                        </div>
                        <div className="order-item-details">
                          <h5 className="order-item-name">{item.name}</h5>
                          <div className="order-item-meta">
                            <span className="order-item-quantity">Quantity: {item.quantity}</span>
                            <span className="order-item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking Details Card */}
                <div className="order-tracking-card">
                  <div className="order-tracking-header">
                    <h4 className="order-tracking-title">Tracking Details</h4>
                    <span className={`order-status-badge-card ${order.status === 'Delivery in progress' ? 'delivered' : order.status === 'In Transit' ? 'in-transit' : order.status === 'Delivered' ? 'delivered' : 'pending'}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-tracking-info-grid">
                    <div className="order-tracking-info-item">
                      <span className="order-tracking-label">Order Date</span>
                      <span className="order-tracking-value">{order.date}</span>
                    </div>
                    <div className="order-tracking-info-item">
                      <span className="order-tracking-label">Estimated Delivery</span>
                      <span className="order-tracking-value">{order.deliveryDate}</span>
                    </div>
                    <div className="order-tracking-info-item">
                      <span className="order-tracking-label">Order Total</span>
                      <span className="order-tracking-value">₹{order.total.toLocaleString()}</span>
                    </div>
                    <div className="order-tracking-info-item">
                      <span className="order-tracking-label">Items</span>
                      <span className="order-tracking-value">{order.itemCount} item(s)</span>
                    </div>
                  </div>
                  <button 
                    className="order-track-btn-card"
                    onClick={() => {
                      setSelectedOrderId(order.id);
                      setShowTrackOrderPage(true);
                      setShowOrdersPage(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 4H4L5 8H15L16 4H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 8L3 18H17L15 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="6" cy="18" r="1.5" fill="currentColor"/>
                      <circle cx="14" cy="18" r="1.5" fill="currentColor"/>
                    </svg>
                    Track Order
                  </button>
                </div>
              </div>
            ))}
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

export default Order;

