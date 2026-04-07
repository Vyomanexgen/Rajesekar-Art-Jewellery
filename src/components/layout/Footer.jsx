import React from 'react';
import './Footer.css';

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
    <footer className={`footer-wrapper ${className}`.trim()}>
      <div className="footer-container">
        {/* Trust Badges Section */}
        <div className="footer-trust-section">
          <div className="trust-badge">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            <div>
              <h4>Authentic Jewellery</h4>
              <p>Certified & Genuine</p>
            </div>
          </div>
          <div className="trust-badge">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 12l2 2 4-4"/>
            </svg>
            <div>
              <h4>Fast Shipping</h4>
              <p>Pan India Delivery</p>
            </div>
          </div>
          <div className="trust-badge">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="1" y="4" width="22" height="16" rx="2"/>
              <path d="M1 6h22M3 11h18"/>
            </svg>
            <div>
              <h4>Secure Payment</h4>
              <p>Safe Transactions</p>
            </div>
          </div>
          <div className="trust-badge">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="11"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <div>
              <h4>24/7 Support</h4>
              <p>Always Available</p>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer-main-content">
          {/* Column 1: Brand */}
          <div className="footer-column">
            <div className="footer-brand-section">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer-logo-svg">
                <circle cx="25" cy="25" r="24" stroke="url(#grad1)" strokeWidth="1.5"/>
                <text x="25" y="33" textAnchor="middle" fill="url(#grad1)" fontSize="30" fontWeight="bold" fontFamily="Georgia">★</text>
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f2c23a"/>
                    <stop offset="100%" stopColor="#d7ab2d"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="footer-brand-text">
                <h3 className="footer-brand-name">RAJASEKHAR</h3>
                <p className="footer-brand-subtitle">Art Jewellery</p>
              </div>
            </div>
            <p className="footer-description">
              Exquisite 1-gram art jewellery crafted with precision, tradition, and timeless elegance. Every piece resonates with authenticity and contemporary artistry.
            </p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Follow on Facebook" className="social-link facebook">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Follow on Instagram" className="social-link instagram">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="18" cy="6" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="Subscribe on YouTube" className="social-link youtube">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="Message on WhatsApp" className="social-link whatsapp">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2.05 22l6.03-1.71C10.04 21.6 11 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2m0 18c-.89 0-1.76-.19-2.6-.49l-.18-.09-1.9.54.55-1.89-.1-.18C4.5 15.77 4 13.95 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8m4.52-4.36c-.25-.12-1.47-.73-1.7-.81-.23-.09-.4-.14-.56.14-.16.28-.61.81-.75.97-.14.17-.28.19-.53.06-1.02-.49-1.69-.72-2.38-1.53-.44-.5-.74-1.12-1.04-1.74.04-.05.09-.12.12-.19.06-.14.03-.26-.03-.37-.07-.11-.6-1.43-.82-1.95-.22-.53-.45-.46-.6-.47-.16 0-.34-.01-.52-.01-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.29 0 1.35.98 2.66 1.11 2.84.13.18 1.86 2.84 4.5 3.98.63.27 1.12.43 1.5.55.63.2 1.21.17 1.67.1.51-.08 1.57-.64 1.79-1.27.22-.62.22-1.16.16-1.28-.07-.11-.24-.18-.49-.31z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Quick Links</h4>
            <ul className="footer-links-list">
              <li><a href="#" onClick={(e) => safeNavigate(navigateToHome, e)}>Home</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToShop, e)}>Shop All</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToAbout, e)}>About Us</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToContact, e)}>Contact</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToAccount, e)}>My Account</a></li>
              <li><a href="#" onClick={(e) => safeNavigate(navigateToOrders, e)}>Track Orders</a></li>
            </ul>
          </div>

          {/* Column 3: Collections */}
          <div className="footer-column">
            <h4 className="footer-column-title">Collections</h4>
            <ul className="footer-links-list">
              <li><a href="#" onClick={(e) => safeCategoryClick('Necklace sets', e)}>Necklace Sets</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Earrings', e)}>Earrings</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Bangles', e)}>Bangles</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Wedding collection', e)}>Bridal Collection</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Hip belts', e)}>Hip Belts</a></li>
              <li><a href="#" onClick={(e) => safeCategoryClick('Accessories', e)}>Accessories</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="footer-column">
            <h4 className="footer-column-title">Contact Info</h4>
            <div className="footer-contact-list">
              <div className="contact-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 1C6.48 1 2 5.48 2 11c0 3.45 1.8 6.46 4.5 8.2.3.2.7.1.9-.2l3.5-5.3c.2-.3.6-.4.9-.2 1.2.8 2.6 1.3 4.2 1.3s3-.5 4.2-1.3c.3-.2.7-.1.9.2l3.5 5.3c.2.3.6.4.9.2 2.7-1.74 4.5-4.75 4.5-8.2 0-5.52-4.48-10-10-10z"/>
                </svg>
                <div>
                  <p className="contact-label">Address</p>
                  <p className="contact-value">Opposite R9000, Trunk Road, Nellore 524001, AP</p>
                </div>
              </div>
              <div className="contact-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <div>
                  <p className="contact-label">Phone</p>
                  <p className="contact-value"><a href="tel:+919876543210">+91 9876543210</a></p>
                </div>
              </div>
              <div className="contact-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 6l10 7 10-7"/>
                </svg>
                <div>
                  <p className="contact-label">Email</p>
                  <p className="contact-value"><a href="mailto:info@rajasekharjewellery.com">info@rajasekharjewellery.com</a></p>
                </div>
              </div>
              <div className="contact-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <div>
                  <p className="contact-label">Business Hours</p>
                  <p className="contact-value">Mon - Sun: 10 AM to 8 PM IST</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">© 2025 Rajasekhar Art Jewellery. All rights reserved. Crafted with passion in India.</p>
          <div className="footer-bottom-links">
            <a href="/privacy-policy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <span className="separator">•</span>
            <a href="/terms-conditions" onClick={(e) => e.preventDefault()}>Terms & Conditions</a>
            <span className="separator">•</span>
            <a href="/return-policy" onClick={(e) => e.preventDefault()}>Return Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

