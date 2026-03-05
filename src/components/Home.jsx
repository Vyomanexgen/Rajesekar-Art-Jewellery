import React, { useEffect, useState } from 'react';
import Footer from './Footer';

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
      <section className="hero-section" id="home">
        <div className="hero-container">
          <div className="hero-frame">
            <div
              className="hero-image"
              style={{ backgroundImage: `url(${slides[currentSlide]})` }}
            >
              <div className="hero-overlay">
                <div className="hero-content">
                  <h2>{slideContent[currentSlide].title}</h2>
                  <p>{slideContent[currentSlide].subtitle}</p>
                  <div className="hero-buttons">
                    <button
                      className="primary"
                      onClick={(e) => {
                        e.preventDefault();
                        if (handleCategoryClick && slideContent[currentSlide].primaryNav) {
                          handleCategoryClick(slideContent[currentSlide].primaryNav);
                        } else {
                          navigateToShop(e);
                        }
                      }}
                    >
                      {slideContent[currentSlide].primaryButton}
                    </button>
                    <button
                      className="secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        if (handleCategoryClick && slideContent[currentSlide].secondaryNav) {
                          handleCategoryClick(slideContent[currentSlide].secondaryNav);
                        }
                      }}
                    >
                      {slideContent[currentSlide].secondaryButton}
                    </button>
                  </div>
                </div>
              </div>

              <div className="hero-arrows">
                <button className="hero-arrow" onClick={prevSlide} aria-label="Previous slide">
                  ‹
                </button>
                <button className="hero-arrow" onClick={nextSlide} aria-label="Next slide">
                  ›
                </button>
              </div>

              {/* Pagination dots at the bottom of the sliding image */}
              <div className="hero-dots">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`hero-dot ${currentSlide === index ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop-category-section fade-in-section">
        <div className="content-width">
          <div className="category-header">
            <h2 className="category-title">Shop by Category</h2>
            <p className="category-subtitle">Discover our exclusive collections</p>
          </div>

          <div className="category-grid-row">
            {categoriesRow1.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setHoveredCategory(hoveredCategory === cat.id ? null : cat.id)}
              >
                <div className="category-image-wrapper">
                  <img src={cat.image} alt={cat.name} className="category-image" />
                  <div className="category-content">
                    <div className="category-label">{cat.name}</div>
                    {hoveredCategory === cat.id && (
                      <button
                        className="category-explore-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(cat.name);
                        }}
                      >
                        Explore Now
                        <span className="btn-arrow">→</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="category-grid-row">
            {categoriesRow2.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                onMouseEnter={() => setHoveredCategory(cat.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setHoveredCategory(hoveredCategory === cat.id ? null : cat.id)}
              >
                <div className="category-image-wrapper">
                  <img src={cat.image} alt={cat.name} className="category-image" />
                  <div className="category-content">
                    <div className="category-label">{cat.name}</div>
                    {hoveredCategory === cat.id && (
                      <button
                        className="category-explore-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(cat.name);
                        }}
                      >
                        Explore Now
                        <span className="btn-arrow">→</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Designer Drop Event Banner */}
      < section className="designer-drop-banner fade-in-section" >
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
          <section className="trending-section fade-in-section">
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

      {/* Because You Liked Section */}
      {
        getRecommendedProducts().length > 0 && (
          <section className="recommended-section fade-in-section">
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

      {/* What Our Customers Say Section */}
      <section className="testimonials-section fade-in-section">
        <div className="content-width">
          <h2 className="testimonials-title">What Our Customers Say</h2>
          <p className="testimonials-subtitle">Real reviews from real customers</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                ★★★★★
              </div>
              <p className="testimonial-text">
                "Absolutely beautiful jewellery! The quality is amazing and the designs are stunning. Highly recommend!"
              </p>
              <div className="testimonial-footer">
                <span className="testimonial-name">Priya Sharma</span>
                <span className="testimonial-date">Nov 2025</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                ★★★★★
              </div>
              <p className="testimonial-text">
                "Bought a bridal set for my sister's wedding. She loved it! Great quality at an affordable price."
              </p>
              <div className="testimonial-footer">
                <span className="testimonial-name">Rajesh Kumar</span>
                <span className="testimonial-date">Oct 2025</span>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-stars">
                ★★★★☆
              </div>
              <p className="testimonial-text">
                "Great collection and excellent customer service. Fast delivery to Nellore. Will definitely shop again!"
              </p>
              <div className="testimonial-footer">
                <span className="testimonial-name">Lakshmi Devi</span>
                <span className="testimonial-date">Sep 2025</span>
              </div>
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
        className="fade-in-section"
      />
    </>
  );
};

export default Home;

