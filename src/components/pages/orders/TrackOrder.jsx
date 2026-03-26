import React, { useMemo } from 'react';
import Footer from '../../layout/Footer';

const TrackOrder = ({
  selectedOrderId,
  userOrders,
  getProductImage,
  navigateToHome,
  navigateToShop,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick,
  setShowTrackOrderPage
}) => {
  // Find the selected order
  const selectedOrder = useMemo(() => {
    return userOrders.find(order => order.id === selectedOrderId);
  }, [userOrders, selectedOrderId]);

  // Get tracking timeline based on order status
  const getTrackingTimeline = (status) => {
    const timeline = [
      {
        id: 'confirmed',
        title: 'Order Confirmed',
        description: 'Your order has been confirmed and payment received',
        icon: '✓',
        status: 'completed',
        date: selectedOrder?.date || 'N/A'
      },
      {
        id: 'processing',
        title: 'Processing',
        description: 'Your jewellery is being prepared and quality checked',
        icon: '📦',
        status: status === 'Processing' || status === 'In Transit' || status === 'Delivery in progress' || status === 'Delivered' ? 'completed' : 'pending',
        date: status !== 'Confirmed' ? 'In progress' : 'Pending'
      },
      {
        id: 'shipped',
        title: 'Shipped',
        description: 'Your order has been shipped and is on its way',
        icon: '🚚',
        status: status === 'In Transit' || status === 'Delivery in progress' || status === 'Delivered' ? 'completed' : 'pending',
        date: status === 'In Transit' || status === 'Delivery in progress' || status === 'Delivered' ? 'Shipped' : 'Pending'
      },
      {
        id: 'in-transit',
        title: 'In Transit',
        description: 'Your order is on the way to the delivery address',
        icon: '📍',
        status: status === 'Delivery in progress' || status === 'Delivered' ? 'completed' : status === 'In Transit' ? 'active' : 'pending',
        date: status === 'In Transit' ? 'In transit' : status === 'Delivery in progress' || status === 'Delivered' ? 'Completed' : 'Pending'
      },
      {
        id: 'out-for-delivery',
        title: 'Out for Delivery',
        description: 'Your order is out for delivery and will arrive soon',
        icon: '🚛',
        status: status === 'Delivery in progress' ? 'active' : status === 'Delivered' ? 'completed' : 'pending',
        date: status === 'Delivery in progress' ? 'Today' : status === 'Delivered' ? 'Delivered' : 'Pending'
      },
      {
        id: 'delivered',
        title: 'Delivered',
        description: 'Your order has been successfully delivered',
        icon: '🎉',
        status: status === 'Delivered' ? 'completed' : 'pending',
        date: status === 'Delivered' ? selectedOrder?.deliveryDate || 'Delivered' : 'Pending'
      }
    ];
    return timeline;
  };

  const timeline = selectedOrder ? getTrackingTimeline(selectedOrder.status) : [];

  if (!selectedOrder) {
    return (
      <div className="track-order-page-wrapper">
        <div className="content-width">
          <div className="track-order-empty">
            <div className="track-order-empty-icon">📦</div>
            <h2 className="track-order-empty-title">Order Not Found</h2>
            <p className="track-order-empty-text">The order you're looking for doesn't exist or has been removed.</p>
            <button 
              className="track-order-back-btn"
              onClick={() => {
                setShowTrackOrderPage(false);
                navigateToOrders();
              }}
            >
              Back to Orders
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
    <div className="track-order-page-wrapper">
      <div className="content-width">
        {/* Header */}
        <div className="track-order-header">
          <div className="track-order-header-left">
            <button 
              className="track-order-back-button"
              onClick={() => {
                setShowTrackOrderPage(false);
                navigateToOrders();
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Orders
            </button>
            <div>
              <h1 className="track-order-title">Track Your Order</h1>
              <p className="track-order-subtitle">Order ID: {selectedOrder.id}</p>
            </div>
          </div>
          <div className="track-order-status-badge-large">
            <span className={`track-order-status-text ${selectedOrder.status === 'Delivery in progress' ? 'delivered' : selectedOrder.status === 'In Transit' ? 'in-transit' : selectedOrder.status === 'Delivered' ? 'delivered' : 'pending'}`}>
              {selectedOrder.status}
            </span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="track-order-summary-card">
          <h2 className="track-order-section-title">Order Summary</h2>
          <div className="track-order-summary-grid">
            <div className="track-order-summary-item">
              <span className="track-order-summary-label">Order Date</span>
              <span className="track-order-summary-value">{selectedOrder.date}</span>
            </div>
            <div className="track-order-summary-item">
              <span className="track-order-summary-label">Estimated Delivery</span>
              <span className="track-order-summary-value">{selectedOrder.deliveryDate}</span>
            </div>
            <div className="track-order-summary-item">
              <span className="track-order-summary-label">Total Amount</span>
              <span className="track-order-summary-value">₹{selectedOrder.total.toLocaleString()}</span>
            </div>
            <div className="track-order-summary-item">
              <span className="track-order-summary-label">Items</span>
              <span className="track-order-summary-value">{selectedOrder.itemCount} item(s)</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="track-order-items-section">
          <h2 className="track-order-section-title">Order Items</h2>
          <div className="track-order-items-list">
            {selectedOrder.items.map((item, idx) => (
              <div key={idx} className="track-order-item-card">
                <div className="track-order-item-image">
                  <img src={getProductImage(item)} alt={item.name} />
                </div>
                <div className="track-order-item-details">
                  <h3 className="track-order-item-name">{item.name}</h3>
                  <div className="track-order-item-meta">
                    <span className="track-order-item-quantity">Quantity: {item.quantity}</span>
                    <span className="track-order-item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="track-order-timeline-section">
          <h2 className="track-order-section-title">Tracking Timeline</h2>
          <div className="track-order-timeline">
            {timeline.map((step, index) => (
              <div 
                key={step.id} 
                className={`track-order-timeline-step ${step.status}`}
              >
                <div className="track-order-timeline-connector">
                  {index < timeline.length - 1 && (
                    <div className={`track-order-timeline-line ${step.status === 'completed' ? 'completed' : step.status === 'active' ? 'active' : ''}`}></div>
                  )}
                </div>
                <div className={`track-order-timeline-icon ${step.status}`}>
                  <span className="track-order-timeline-icon-text">{step.icon}</span>
                </div>
                <div className="track-order-timeline-content">
                  <div className="track-order-timeline-header">
                    <h3 className="track-order-timeline-title">{step.title}</h3>
                    <span className="track-order-timeline-date">{step.date}</span>
                  </div>
                  <p className="track-order-timeline-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="track-order-delivery-info">
          <h2 className="track-order-section-title">Delivery Information</h2>
          <div className="track-order-delivery-card">
            <div className="track-order-delivery-item">
              <span className="track-order-delivery-icon">📍</span>
              <div className="track-order-delivery-content">
                <span className="track-order-delivery-label">Delivery Address</span>
                <span className="track-order-delivery-value">Your selected delivery address</span>
              </div>
            </div>
            <div className="track-order-delivery-item">
              <span className="track-order-delivery-icon">📞</span>
              <div className="track-order-delivery-content">
                <span className="track-order-delivery-label">Contact Number</span>
                <span className="track-order-delivery-value">Will be used for delivery updates</span>
              </div>
            </div>
          </div>
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

export default TrackOrder;
