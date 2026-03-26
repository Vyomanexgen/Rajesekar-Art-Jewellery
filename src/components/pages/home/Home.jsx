import React, { useEffect, useState } from 'react';
import Footer from '../../layout/Footer';
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

const homeGradientClass = 'bg-[linear-gradient(180deg,#140923_0%,#261042_100%)]';
const homePanelClass = 'relative z-[2] border-y border-white/10 bg-[linear-gradient(130deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(10,6,28,0.45)] backdrop-blur-[2px] max-md:backdrop-blur-[1px]';
const homeProductCardClass = 'border border-[rgba(215,200,255,0.58)] bg-[linear-gradient(135deg,rgba(255,255,255,0.94)_0%,rgba(246,243,255,0.88)_100%)] shadow-[0_16px_34px_rgba(24,14,52,0.22)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_rgba(20,12,44,0.3)]';
const homeGoldTitleClass = 'bg-[linear-gradient(135deg,#a56608_0%,#d7ab2d_48%,#f2d97e_100%)] bg-clip-text text-transparent [text-shadow:0_6px_20px_rgba(0,0,0,0.34)]';
const promoBannerClass = 'border border-white/20 bg-[linear-gradient(130deg,rgba(28,18,62,0.85)_0%,rgba(49,25,94,0.7)_48%,rgba(31,82,128,0.62)_100%)] shadow-[0_26px_60px_rgba(8,5,22,0.38)]';

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
    <div
      className="relative isolate overflow-x-hidden overflow-y-visible text-[#f3ebff]"
      style={{
        background:
          'radial-gradient(60% 45% at 14% 8%, rgba(252, 160, 210, 0.2), transparent 70%), radial-gradient(45% 38% at 88% 16%, rgba(118, 195, 255, 0.22), transparent 72%), radial-gradient(55% 48% at 48% 86%, rgba(196, 135, 255, 0.22), transparent 70%), linear-gradient(145deg, #100a2a 0%, #211043 46%, #140b30 100%)'
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 blur-[42px]"
        style={{
          background:
            'radial-gradient(24rem 18rem at 8% 22%, rgba(255, 132, 192, 0.22), transparent 78%), radial-gradient(24rem 18rem at 92% 16%, rgba(78, 175, 255, 0.22), transparent 76%), radial-gradient(28rem 20rem at 52% 82%, rgba(180, 120, 255, 0.25), transparent 78%)'
        }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-[-7rem] top-[34rem] z-[1] h-[18rem] w-[18rem] rounded-full bg-[rgba(244,100,176,0.45)] opacity-40 blur-[54px] max-md:opacity-25 max-md:blur-[44px]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-8rem] top-[68rem] z-[1] h-[21rem] w-[21rem] rounded-full bg-[rgba(96,154,255,0.45)] opacity-40 blur-[54px] max-md:opacity-25 max-md:blur-[44px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-[12rem] left-[36%] z-[1] h-[20rem] w-[20rem] rounded-full bg-[rgba(162,106,255,0.4)] opacity-40 blur-[54px] max-md:opacity-25 max-md:blur-[44px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] opacity-10 mix-blend-soft-light [background-image:radial-gradient(rgba(255,255,255,0.3)_0.6px,transparent_0.6px)] [background-size:3px_3px]" />

      {/* Main Content */}
      <HeroSection />

      <section
        className={`${homeGradientClass} ${homePanelClass}`}
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
      <section className={`designer-drop-banner fade-in-section !opacity-100 !translate-y-0 ${homeGradientClass} ${homePanelClass} mt-16`}>
        <div className="content-width">
          <div className={`promo-banner ${promoBannerClass}`}>
            <div className="promo-header">
              <h2 className={`promo-title ${homeGoldTitleClass}`}>Designer Drop Event!</h2>
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
          <section className={`trending-section fade-in-section !opacity-100 !translate-y-0 ${homeGradientClass} ${homePanelClass}`}>
            <div className="content-width">
              <h2 className={`trending-title ${homeGoldTitleClass}`}>Trending Products</h2>
              <div className="trending-products">
                {getTrendingProducts().map((product) => (
                  <div key={product.id} className={`trending-product-card ${homeProductCardClass}`}>
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

      <section className={`${homeGradientClass} ${homePanelClass} mt-16`}>
        <AboutSection />
      </section>

      {/* Because You Liked Section */}
      {
        getRecommendedProducts().length > 0 && (
          <section className={`recommended-section fade-in-section !opacity-100 !translate-y-0 ${homeGradientClass} ${homePanelClass} mt-16`}>
            <div className="content-width">
              <h2 className={`recommended-title ${homeGoldTitleClass}`}>Because You Liked...</h2>
              <div className="recommended-products">
                {getRecommendedProducts().map((product) => (
                  <div key={product.id} className={`recommended-product-card ${homeProductCardClass}`}>
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

      <section className={`bg-[#1a1025] ${homePanelClass} mt-16`}>
        <TestimonialsSection />
      </section>

      <section className={`${homeGradientClass} ${homePanelClass} mt-16`}>
        <ContactSection />
      </section>

      {/* Gold Shine Line Separator */}
      <div className={`relative z-[2] h-[1px] w-full ${homeGradientClass} bg-gradient-to-r from-transparent via-[#f2c23a] to-transparent opacity-80 shadow-[0_0_15px_#f2c23a]`} />

      <Footer
        navigateToHome={navigateToHome}
        navigateToShop={navigateToShop}
        navigateToAbout={navigateToAbout}
        navigateToContact={navigateToContact}
        navigateToAccount={navigateToAccount}
        navigateToOrders={navigateToOrders}
        handleCategoryClick={handleCategoryClick}
        className={`fade-in-section !opacity-100 !translate-y-0 ${homeGradientClass} relative z-[2]`}
      />
    </div>
  );
};

export default Home;

