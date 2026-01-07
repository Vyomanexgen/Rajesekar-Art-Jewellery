import React, { useEffect } from 'react';
import Footer from './Footer';

const About = ({
  navigateToHome,
  navigateToShop,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick,
  setShowAboutPage,
  closeAllPages,
  showAboutPage
}) => {
  // Handle navigation to About page
  const handleNavigateToAbout = (e) => {
    if (e) e.preventDefault();
    
    // If already on About page, just scroll to top
    if (showAboutPage && window.location.pathname === '/about') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    
    // Close other pages first
    if (closeAllPages) closeAllPages();
    
    // Use setTimeout to ensure closeAllPages completes before setting About page
    setTimeout(() => {
      // Set About page to true after closing others
      if (setShowAboutPage) setShowAboutPage(true);
      // Update URL for About section
      if (window?.history?.pushState) {
        window.history.pushState({}, '', '/about');
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 10);
  };

  // Initialize page on mount - this should not be needed if NavbarOnly handles routing
  // But keeping it as a safety net
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/about' && setShowAboutPage) {
      // Ensure About page is shown when URL is /about
      setShowAboutPage(true);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [setShowAboutPage]);

  return (
    <>
      {/* About Us Page Section */}
      <section className="about-section">
        <div className="content-width">
          <div className="about-header">
            <h1 className="about-title">About Rajasekhar Art Jewellery</h1>
            <div className="about-underline"></div>
          </div>
          <div className="about-content">
            <p className="about-text">
              Rajasekhar Art Jewellery is a celebration of timeless beauty, traditional craftsmanship, and refined elegance. 
              Rooted in India's rich cultural heritage, our jewellery is thoughtfully designed and meticulously handcrafted by 
              skilled artisans who bring generations of expertise into every piece. We blend classic artistry with modern 
              sensibilities to create jewellery that complements every occasion, from everyday grace to grand celebrations. 
              Using high-quality materials and premium finishes, we ensure each creation reflects authenticity, durability, 
              and aesthetic excellence.
            </p>
            <p className="about-text">
              Each jewellery piece is thoughtfully designed and meticulously crafted by skilled artisans who carry forward 
              age-old techniques passed down through generations. From delicate patterns to bold statement designs, our 
              collections reflect precision, patience, and perfection. We use high-quality materials and premium finishes 
              to ensure our jewellery not only looks exquisite but also lasts long, making every purchase a cherished investment.
            </p>
          </div>
          <div className="about-bottom-line"></div>
        </div>
      </section>
      <Footer 
        navigateToHome={navigateToHome}
        navigateToShop={navigateToShop}
        navigateToAbout={handleNavigateToAbout}
        navigateToContact={navigateToContact}
        navigateToAccount={navigateToAccount}
        navigateToOrders={navigateToOrders}
        handleCategoryClick={handleCategoryClick}
      />
    </>
  );
};

export default About;

