import React from 'react';

const TermsPage = ({ setShowTermsPage }) => {
  return (
    <div className="terms-page-wrapper">
      <div className="content-width">
        <div className="terms-page-container">
          <button 
            className="terms-back-btn"
            onClick={() => setShowTermsPage(false)}
          >
            ← Back
          </button>
          
          <h1 className="terms-page-title">Terms and Conditions</h1>
          <p className="terms-page-updated">Last Updated: January 2025</p>

          <div className="terms-content">
            <section className="terms-section">
              <h2 className="terms-section-title">1. Acceptance of Terms</h2>
              <p className="terms-text">
                By accessing and using the Rajasekhar Art Jewellery website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">2. Use License</h2>
              <p className="terms-text">
                Permission is granted to temporarily access the materials on Rajasekhar Art Jewellery's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="terms-list">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">3. Product Information</h2>
              <p className="terms-text">
                We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free. All jewellery is handcrafted, and slight variations may occur.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">4. Pricing and Payment</h2>
              <p className="terms-text">
                All prices are listed in Indian Rupees (₹) and are subject to change without notice. We reserve the right to modify prices at any time. Payment must be made in full before order processing. We accept various payment methods as displayed during checkout.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">5. Orders and Delivery</h2>
              <p className="terms-text">
                All orders are subject to product availability. We reserve the right to refuse or cancel any order for any reason. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">6. Returns and Refunds</h2>
              <p className="terms-text">
                We offer a 30-day return policy on unworn items in their original packaging. Custom-made or personalized items are not eligible for return unless defective. Refunds will be processed to the original payment method within 7-10 business days after we receive the returned item.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">7. User Accounts</h2>
              <p className="terms-text">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">8. Privacy Policy</h2>
              <p className="terms-text">
                Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">9. Intellectual Property</h2>
              <p className="terms-text">
                All content on this website, including text, graphics, logos, images, and software, is the property of Rajasekhar Art Jewellery and is protected by copyright and trademark laws. You may not use our content without our express written permission.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">10. Limitation of Liability</h2>
              <p className="terms-text">
                Rajasekhar Art Jewellery shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">11. Changes to Terms</h2>
              <p className="terms-text">
                We reserve the right to modify these terms at any time. Your continued use of the website after any changes constitutes your acceptance of the new terms.
              </p>
            </section>

            <section className="terms-section">
              <h2 className="terms-section-title">12. Contact Information</h2>
              <p className="terms-text">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <p className="terms-contact">
                <strong>Email:</strong> info@rajasekharjewellery.com<br />
                <strong>Phone:</strong> +91 1234567890<br />
                <strong>Address:</strong> Opposite R9000, Trunk Road, Nellore 524001, Andhra Pradesh, India
              </p>
            </section>
          </div>

          <div className="terms-actions">
            <button 
              className="terms-close-btn"
              onClick={() => setShowTermsPage(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;

