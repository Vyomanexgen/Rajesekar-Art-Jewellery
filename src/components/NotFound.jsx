import React from 'react';
import Footer from './Footer';

const NotFound = ({
  navigateToHome,
  navigateToShop,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick
}) => {
  return (
    <div className="not-found-page-wrapper">
      <div className="content-width">
        <div className="not-found-container">
          <div className="not-found-content">
            <div className="not-found-icon">🔍</div>
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Page Not Found</h2>
            <p className="not-found-description">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or the URL might be incorrect.
            </p>
            <div className="not-found-actions">
              <button 
                className="not-found-btn not-found-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToHome(e);
                }}
              >
                Go to Home
              </button>
              <button 
                className="not-found-btn not-found-btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToShop(e);
                }}
              >
                Browse Shop
              </button>
            </div>
            <div className="not-found-suggestions">
              <h3 className="not-found-suggestions-title">You might be looking for:</h3>
              <ul className="not-found-links">
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigateToHome(e); }}>Home</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigateToShop(e); }}>Shop</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('Necklaces'); }}>Necklaces</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick('Earrings'); }}>Earrings</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigateToAbout(e); }}>About Us</a>
                </li>
                <li>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigateToContact(e); }}>Contact</a>
                </li>
              </ul>
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

export default NotFound;

