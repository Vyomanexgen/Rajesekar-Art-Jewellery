import React from 'react';

const TermsPrivacyPopup = ({ showTermsPrivacyPopup, setShowTermsPrivacyPopup }) => {
  if (!showTermsPrivacyPopup) return null;

  return (
    <div 
      className="terms-privacy-popup-overlay" 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setShowTermsPrivacyPopup(false);
        }
      }}
    >
      <div className="terms-privacy-popup-container">
        <div className="terms-privacy-popup-content">
          <button 
            className="terms-privacy-popup-close"
            onClick={() => setShowTermsPrivacyPopup(false)}
            aria-label="Close popup"
          >
            ×
          </button>
          
          <h2 className="terms-privacy-popup-title">Terms and Privacy Policies</h2>
          
          <div className="terms-privacy-popup-body">
            <p className="terms-privacy-popup-text">
              Our website is for users aged 18+ and you agree to provide accurate information while using it. All jewellery designs, photos, and content belong to us and cannot be copied or misused. Prices, products, and descriptions may change without prior notice, and orders are confirmed only after successful payment. Delivery timelines are estimates, and we are not responsible for delays caused by courier or external factors. Returns or exchanges are accepted only for damaged or wrong items reported within the given timeline, along with complete unboxing video proof; change-of-mind returns are not allowed. Refunds, replacements, or repairs will be processed as per policy, and custom orders cannot be cancelled once started. Our liability is limited to the product value paid. These Terms are governed by Indian law, and by using the site or placing an order, you agree to all the above points.
            </p>
          </div>

          <div className="terms-privacy-popup-actions">
            <button 
              className="terms-privacy-popup-close-btn"
              onClick={() => setShowTermsPrivacyPopup(false)}
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPrivacyPopup;

