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
  handleCategoryClick
}) => {
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
                    <span className={`order-status-badge ${order.status === 'Delivery in progress' ? 'delivered' : order.status === 'In Transit' ? 'in-transit' : ''}`}>
                      {order.status}
                    </span>
                    <span className="order-total">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="order-items-section">
                  <h4 className="order-items-title">Order Items</h4>
                  <div className="order-items-grid">
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

                <div className="order-card-footer">
                  <div className="order-footer-info">
                    <span className="order-delivery-label">Estimated Delivery:</span>
                    <span className="order-delivery-date">{order.deliveryDate}</span>
                  </div>
                  <button className="order-track-btn">
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

