import React from 'react';
import Footer from './Footer';

const Contact = ({
  handleContactFormSubmit,
  navigateToHome,
  navigateToShop,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick
}) => {
  return (
    <>
      {/* Contact Page Section - enhanced layout */}
      <section className="contact-page-section">
        <div className="contact-page-hero-overlay" />
        <div className="content-width contact-page-shell">
          <div className="contact-page-header">
            <p className="contact-page-eyebrow">We are here to help</p>
            <h1 className="contact-page-title">Get in Touch</h1>
            <p className="contact-page-subtitle">
              Reach out to us for any questions about our collections, custom designs, or your existing orders.
            </p>
          </div>

          <div className="contact-page-grid">
            {/* Left column – info card */}
            <div className="contact-card contact-card-left">
              <h2 className="contact-card-heading">Store Details</h2>

              <div className="contact-detail-group">
                <div className="contact-detail-icon contact-detail-icon-company">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 21H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 21V7L13 2L21 7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 9V13H15V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 21V13H15V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <h3 className="contact-detail-label">Company</h3>
                  <p className="contact-detail-value">Rajasekhar Jewellery</p>
                </div>
              </div>

              <div className="contact-detail-group">
                <div className="contact-detail-icon contact-detail-icon-address">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <h3 className="contact-detail-label">Address</h3>
                  <p className="contact-detail-value">
                    Opposite R9000, Trunk Road, Nellore 524001, Andhra Pradesh, India
                  </p>
                </div>
              </div>

              <div className="contact-detail-group">
                <div className="contact-detail-icon contact-detail-icon-phone">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7292C21.7209 20.9842 21.5573 21.2132 21.3518 21.4017C21.1463 21.5902 20.9033 21.7341 20.6371 21.8249C20.3709 21.9157 20.0875 21.9513 19.806 21.929C16.7603 21.5852 13.8002 20.5341 11.12 18.85C8.71982 17.3147 6.68732 15.2822 5.152 12.882C3.46624 10.2022 2.41501 7.24249 2.071 4.196C2.04871 3.91454 2.08426 3.63112 2.17504 3.36493C2.26582 3.09874 2.40974 2.85574 2.59824 2.65024C2.78674 2.44474 3.01576 2.28115 3.27076 2.16955C3.52576 2.05795 3.80146 2.00095 4.08 2.002H7.08C7.61147 1.99522 8.13106 2.16708 8.55523 2.4896C8.97941 2.81212 9.28537 3.26864 9.426 3.786C9.64274 4.60279 9.96617 5.38628 10.386 6.116C10.6306 6.50918 10.8113 6.94017 10.9208 7.39129C11.0303 7.84241 11.0669 8.30764 11.029 8.77C10.9911 9.23236 10.8792 9.68628 10.698 10.112L9.278 12.552C11.1535 16.3265 14.6735 19.8465 18.448 23.722L20.888 22.302C21.3138 22.1208 21.7677 22.0089 22.2301 21.971C22.6924 21.9331 23.1576 21.9697 23.6087 22.0792C24.0598 22.1887 24.4908 22.3694 24.884 22.614C25.6137 23.0338 26.3972 23.3573 27.214 23.574C27.7314 23.7146 28.1879 24.0206 28.5104 24.4448C28.8329 24.8689 29.0048 25.3885 28.998 25.92V28.93H28.998Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <h3 className="contact-detail-label">Phone</h3>
                  <p className="contact-detail-value">
                    <a href="tel:+911234567890" className="contact-link">+91 1234567890</a>
                  </p>
                </div>
              </div>

              <div className="contact-detail-group">
                <div className="contact-detail-icon contact-detail-icon-email">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="contact-detail-text">
                  <h3 className="contact-detail-label">Email</h3>
                  <p className="contact-detail-value">
                    <a href="mailto:info@rajasekharjewellery.com" className="contact-link">info@rajasekharjewellery.com</a>
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="contact-whatsapp-btn"
                onClick={() => {
                  const message = encodeURIComponent("Hello, Rajasekhar Art Jewellery. I'd like to know about your product details and offers. Please guide me with the details.");
                  window.open(`https://wa.me/911234567890?text=${message}`, '_blank');
                }}
              >
                Contact via WhatsApp
              </button>
            </div>

            {/* Right column – form card */}
            <div className="contact-card contact-card-right">
              <h2 className="contact-form-title">Send us a Message</h2>
              <form className="contact-form" onSubmit={handleContactFormSubmit}>
                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="contact-name">Your Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="contact-form-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      placeholder="+91 1234567890"
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="contact-subject">Select a service</label>
                    <select id="contact-subject" name="subject" required>
                      <option value="">Select a service</option>
                      <option value="general">General Enquiry</option>
                      <option value="custom">Custom Jewellery Design</option>
                      <option value="order">Order / Delivery</option>
                      <option value="support">After-Sales Support</option>
                    </select>
                  </div>
                </div>

                <div className="contact-form-group contact-form-group-full">
                  <label htmlFor="contact-message">Tell us about your requirements</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    placeholder="Share details about what you are looking for..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="contact-submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer 
        navigateToHome={navigateToHome}
        navigateToShop={navigateToShop}
        navigateToAbout={navigateToAbout}
        navigateToContact={navigateToContact}
        navigateToAccount={navigateToAccount}
        navigateToOrders={navigateToOrders}
        handleCategoryClick={handleCategoryClick}
      />
    </>
  );
};

export default Contact;

