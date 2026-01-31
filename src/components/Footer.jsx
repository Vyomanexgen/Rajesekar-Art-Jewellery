import React from 'react';

const Footer = ({ 
  navigateToHome, 
  navigateToShop, 
  navigateToAbout, 
  navigateToContact, 
  navigateToAccount, 
  navigateToOrders,
  handleCategoryClick,
  className = '' 
}) => {
  // Defensive checks to prevent errors if functions are undefined
  const safeNavigate = (fn, e) => {
    if (e) e.preventDefault();
    if (typeof fn === 'function') {
      try {
        fn(e);
      } catch (error) {
        console.error('Navigation error:', error);
      }
    }
  };

  const safeCategoryClick = (category, e) => {
    if (e) e.preventDefault();
    if (typeof handleCategoryClick === 'function') {
      try {
        handleCategoryClick(category);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Category click error:', error);
      }
    }
  };

  return (
    <footer className={`main-footer ${className}`.trim()}>
      <div className="content-width">
        <div className="footer-content">
          {/* Column 1: Rajasekhar */}
          <div className="footer-column">
            <div className="footer-logo-section">
              <div className="footer-logo-icon">★</div>
              <h3 className="footer-company-name">Rajasekhar</h3>
            </div>
            <p className="footer-tagline">Exclusive 1-Gram Art Jewellery at the Best Price. Crafted with love and tradition.</p>
            <div className="footer-social-icons">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon" 
                aria-label="Facebook"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon" 
                aria-label="Instagram"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon" 
                aria-label="YouTube"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://wa.me/911234567890?text=Hello%2C%20Rajasekhar%20Art%20Jewellery.%20I%27d%20like%20to%20know%20about%20your%20product%20details%20and%20offers.%20Please%20guide%20me%20with%20the%20details." 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-icon" 
                aria-label="WhatsApp"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => safeNavigate(navigateToHome, e)}>Home</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToShop, e)}>Shop</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToAbout, e)}>About Us</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToContact, e)}>Contact</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToAccount, e)}>My Account</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToOrders, e)}>Track Order</a></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="footer-column">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => safeCategoryClick('Necklaces', e)}>Necklaces</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Earrings', e)}>Earrings</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Bangles', e)}>Bangles</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Rings', e)}>Rings</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Bridal Sets', e)}>Bridal Sets</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Temple Jewellery', e)}>Temple Jewellery</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="footer-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0C7.589 0 4 3.589 4 8c0 4.245 7.273 15.307 7.583 15.702a1 1 0 0 0 .834.298 1 1 0 0 0 .833-.298C13.727 23.307 20 12.245 20 8c0-4.411-3.589-8-8-8zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/>
                  </svg>
                </span>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Opposite+R9000,+Trunk+Road,+Nellore+524001,+Andhra+Pradesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-contact-link footer-address-link"
                >
                  Opposite R9000, Trunk Road, Nellore 524001, Andhra Pradesh
                </a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </span>
                <a href="tel:+911234567890" className="footer-contact-link">+91 1234567890</a>
              </div>
              <div className="footer-contact-item">
                <span className="footer-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <a href="mailto:info@rajasekharjewellery.com" className="footer-contact-link">info@rajasekharjewellery.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="footer-copyright">© 2025 Rajasekhar Art Jewellery. All rights reserved.</p>
            <div className="footer-policies">
              <a 
                href="/privacy-policy" 
                onClick={(e) => {
                  e.preventDefault();
                  // Could navigate to a privacy policy page if implemented
                }}
              >
                Privacy Policy
              </a>
              <span className="footer-policy-separator">|</span>
              <a 
                href="/terms-conditions" 
                onClick={(e) => {
                  e.preventDefault();
                  // Could navigate to a terms page if implemented
                }}
              >
                Terms & Conditions
              </a>
              <span className="footer-policy-separator">|</span>
              <a 
                href="/return-policy" 
                onClick={(e) => {
                  e.preventDefault();
                  // Could navigate to a return policy page if implemented
                }}
              >
                Return Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

