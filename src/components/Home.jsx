import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import ContactSection from './ContactSection';
import TestimonialsSection from './TestimonialsSection';
import CollectionsSection from './CollectionsSection';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';

// Slides data - moved from NavbarOnly.jsx
const slides = [
  "/Earing_home.jpg",
  "/Necklace_home.jpg",
  "/Bangles_home.jpg"
];

const slideContent = [
  {
    title: "New Earing Collection",
    subtitle: "Crafted with Love & Tradition",
    primaryButton: "Shop now",
    secondaryButton: "View Necklace",
    primaryNav: "Earrings",
    secondaryNav: "Necklace sets"
  },
  {
    title: "Necklace",
    subtitle: "Traditional Designs, Modern Appeal",
    primaryButton: "Shop now",
    secondaryButton: "View Necklace",
    primaryNav: "Necklace sets",
    secondaryNav: "Necklace sets"
  },
  {
    title: "Bangles",
    subtitle: "At the Best Price",
    primaryButton: "Shop now",
    secondaryButton: "View Products",
    primaryNav: "Gentlemen's items",
    secondaryNav: "Bangles"
  }
];

const Home = ({
  currentSlide,
  countdown,
  prevSlide,
  nextSlide,
  goToSlide,
  handleCategoryClick,
  getRecommendedProducts,
  getTrendingProducts,
  handleProductClick,
  getProductImage,
  viewedProducts,
  handleEyeIconClick,
  wishlistItems,
  handleWishlistClick,
  handleAddToCart,
  navigateToHome,
  navigateToShop,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders
}) => {
  // State for hovered category
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Home Page Category configuration data
  const categoriesRow1 = [
    { id: 'Necklaces', name: 'Necklace sets', image: '/Necklaces.jpg' },
    { id: 'Haram', name: 'Haram', image: '/Haram.jpg' },
    { id: 'Combo set', name: 'Combo set', image: '/combo_set.jpg' },
    { id: 'Wedding collection', name: 'Wedding collection', image: '/Wedding_collection.jpg' },
    { id: 'Earrings', name: 'Earrings', image: '/Earings.jpg' },
    { id: 'Bangles', name: 'Bangles', image: '/Bangles.jpg' },
    { id: 'Hip beads', name: 'Hip beads', image: '/Hip_beads.jpg' }
  ];

  const categoriesRow2 = [
    { id: 'Accessories', name: 'Accessories', image: '/Accessories.jpg' },
    { id: 'Gentlemens items', name: "Gentlemen's items", image: '/Gentlemen_items.jpg' },
    { id: 'Beads', name: 'Beads', image: '/Beads.jpg' },
    { id: 'Mangalsutra', name: 'Mangalsutra', image: '/Mangalsutra.jpg' },
    { id: 'Sarudu', name: 'Sarudu', image: '/Sarudu.jpg' },
    { id: 'Chains', name: 'Chains', image: '/Chains.jpg' },
    { id: 'Choker sets', name: 'Choker sets', image: '/Choker_sets.jpg' }
  ];

  // Newsletter subscription states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Category descriptions
  const categoryDescriptions = {
    'Necklaces': 'Elegant necklaces crafted with precision, featuring traditional and modern designs that complement every occasion.',
    'Earrings': 'Stunning earrings ranging from delicate studs to statement pieces, perfect for adding sparkle to your look.',
    'Bangles': 'Beautiful bangles in various designs and materials, from traditional gold to contemporary styles.',
    'Bridal Sets': 'Complete bridal collections designed to make your special day unforgettable with timeless elegance.'
  };

  // Scroll-triggered fade-in animation for sections
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      }, observerOptions);

      // Observe all sections with fade-in-section class
      const sections = document.querySelectorAll('.fade-in-section');
      sections.forEach((section) => {
        observer.observe(section);
        // Make sections visible immediately if they're already in viewport
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          section.classList.add('fade-in-visible');
        }
      });

      return () => {
        sections.forEach((section) => {
          observer.unobserve(section);
        });
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle newsletter subscription
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();

    // Reset error
    setEmailError('');

    // Validate email
    if (!newsletterEmail.trim()) {
      setEmailError('Please enter a correct email');
      return;
    }

    if (!validateEmail(newsletterEmail)) {
      setEmailError('Please enter a correct email');
      return;
    }

    // If validation passes, show confirmation
    setShowConfirmation(true);
    setNewsletterEmail(''); // Clear the input

    // Hide confirmation after 3 seconds
    setTimeout(() => {
      setShowConfirmation(false);
    }, 3000);
  };

  return (
    <>
      {/* Main Content */}
      <HeroSection />

      <section
        className="bg-gradient-purple"
        style={{
          marginTop: 0,
          marginBottom: 0,
          paddingTop: '56px',
          paddingBottom: '56px',
        }}
      >
        <CollectionsSection handleCategoryClick={handleCategoryClick} />
      </section>

      {/* Designer Drop Event Banner */}
      <section className="designer-drop-banner fade-in-section bg-gradient-purple mt-16">
        <div className="content-width">
          <div className="promo-banner">
            <div className="promo-header">
              <h2 className="promo-title">Designer Drop Event!</h2>
            </div>
            <p className="promo-subtitle">Limited Edition Collection - Up to 40% OFF</p>
            <div className="countdown-container">
              <div className="countdown-box">
                <div className="countdown-value">{String(countdown.hours).padStart(2, '0')}</div>
                <div className="countdown-label">Hours</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-value">{String(countdown.minutes).padStart(2, '0')}</div>
                <div className="countdown-label">Minutes</div>
              </div>
              <div className="countdown-box">
                <div className="countdown-value">{String(countdown.seconds).padStart(2, '0')}</div>
                <div className="countdown-label">Seconds</div>
              </div>
            </div>
            <button className="shop-now-btn" onClick={navigateToShop}>Shop Now</button>
          </div>
        </div>
      </section >

      {/* Trending Products Section */}
      {
        getTrendingProducts().length > 0 && (
          <section className="trending-section fade-in-section bg-gradient-purple">
            <div className="content-width">
              <h2 className="trending-title">Trending Products</h2>
              <div className="trending-products">
                {getTrendingProducts().map((product) => (
                  <div key={product.id} className="trending-product-card">
                    <div className="trending-product-image-wrapper" onClick={() => handleProductClick(product)}>
                      <img src={getProductImage(product)} alt={product.name} className="trending-product-image" />
                      <div className="product-hover-icons">
                        <button
                          className={`product-eye-icon trending-eye-icon ${viewedProducts.has(product.id) ? 'viewed' : ''}`}
                          onClick={(e) => handleEyeIconClick(e, product)}
                          aria-label="View product"
                        >
                          👁
                        </button>
                        <button
                          className={`product-wishlist-icon trending-wishlist-icon ${wishlistItems.has(product.id) ? 'active' : ''}`}
                          onClick={(e) => handleWishlistClick(e, product)}
                          aria-label="Add to wishlist"
                        >
                          {wishlistItems.has(product.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                      {product.badge && (
                        <span className={`product-badge trending-badge ${product.badge.toLowerCase().replace(" ", "-")}`}>
                          {product.badge}
                        </span>
                      )}
                      {product.discount && (
                        <span className="product-discount trending-discount">-{product.discount}%</span>
                      )}
                    </div>
                    <div className="trending-product-info">
                      <h3 className="trending-product-name">{product.name}</h3>
                      <div className="trending-product-rating">
                        {Array(product.rating).fill("★").join("")}{Array(5 - product.rating).fill("☆").join("")} <span className="review-count">({product.reviews})</span>
                      </div>
                      <div className="trending-product-price">
                        <span className="trending-current-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="trending-original-price">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <button className="trending-add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }

      <section className="bg-gradient-purple mt-16">
        <AboutSection />
      </section>

      {/* Because You Liked Section */}
      {
        getRecommendedProducts().length > 0 && (
          <section className="recommended-section fade-in-section bg-gradient-purple mt-16">
            <div className="content-width">
              <h2 className="recommended-title">Because You Liked...</h2>
              <div className="recommended-products">
                {getRecommendedProducts().map((product) => (
                  <div key={product.id} className="recommended-product-card">
                    <div className="recommended-product-image-wrapper" onClick={() => handleProductClick(product)}>
                      <img src={getProductImage(product)} alt={product.name} className="recommended-product-image" />
                      <div className="product-hover-icons">
                        <button
                          className={`product-eye-icon recommended-eye-icon ${viewedProducts.has(product.id) ? 'viewed' : ''}`}
                          onClick={(e) => handleEyeIconClick(e, product)}
                          aria-label="View product"
                        >
                          👁
                        </button>
                        <button
                          className={`product-wishlist-icon recommended-wishlist-icon ${wishlistItems.has(product.id) ? 'active' : ''}`}
                          onClick={(e) => handleWishlistClick(e, product)}
                          aria-label="Add to wishlist"
                        >
                          {wishlistItems.has(product.id) ? '❤️' : '🤍'}
                        </button>
                      </div>
                      {product.badge && (
                        <span className={`product-badge recommended-badge ${product.badge.toLowerCase().replace(" ", "-")}`}>
                          {product.badge}
                        </span>
                      )}
                      {product.discount && (
                        <span className="product-discount recommended-discount">-{product.discount}%</span>
                      )}
                    </div>
                    <div className="recommended-product-info">
                      <h3 className="recommended-product-name">{product.name}</h3>
                      <div className="recommended-product-rating">
                        {Array(product.rating).fill("★").join("")}{Array(5 - product.rating).fill("☆").join("")} <span className="review-count">({product.reviews})</span>
                      </div>
                      <div className="recommended-product-price">
                        <span className="recommended-current-price">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="recommended-original-price">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <button className="recommended-add-to-cart-btn" onClick={(e) => handleAddToCart(e, product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      }

      <section className="bg-[#1a1025] mt-16">
        <TestimonialsSection />
      </section>

      <section className="bg-gradient-purple mt-16">
        <ContactSection />
      </section>

      {/* Gold Shine Line Separator */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#f2c23a] to-transparent opacity-80 shadow-[0_0_15px_#f2c23a] bg-gradient-purple" />

      <Footer
        navigateToHome={navigateToHome}
        navigateToShop={navigateToShop}
        navigateToAbout={navigateToAbout}
        navigateToContact={navigateToContact}
        navigateToAccount={navigateToAccount}
        navigateToOrders={navigateToOrders}
        handleCategoryClick={handleCategoryClick}
        className="fade-in-section bg-gradient-purple"
      />
    </>
  );
};

export default Home;

