import React from 'react';
import AboutSection from '../home/AboutSection';
import Footer from '../../layout/Footer';

const About = ({
  navigateToHome,
  navigateToShop,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick,
}) => {
  return (
    <div className="about-page-wrapper">
      <div className="content-width about-page-content">
        <div className="about-page-header">
          <p className="about-page-eyebrow">Craftsmanship and Legacy</p>
          <h1 className="about-page-title">About Rajasekhar Art Jewellery</h1>
        </div>
        <AboutSection />
      </div>

      <Footer
        navigateToHome={navigateToHome}
        navigateToShop={navigateToShop}
        navigateToContact={navigateToContact}
        navigateToAccount={navigateToAccount}
        navigateToOrders={navigateToOrders}
        handleCategoryClick={handleCategoryClick}
      />
    </div>
  );
};

export default About;
