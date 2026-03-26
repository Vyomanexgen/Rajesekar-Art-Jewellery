import React from 'react';
import Footer from '../../layout/Footer';

const Arrivals = ({
  selectedNewArrivalsCategory,
  setSelectedNewArrivalsCategory,
  getFilteredNewArrivalsProducts,
  getProductImage,
  handleProductClick,
  viewedProducts,
  handleEyeIconClick,
  wishlistItems,
  handleWishlistClick,
  handleAddToCart,
  navigateToShop,
  navigateToHome,
  navigateToAbout,
  navigateToContact,
  navigateToAccount,
  navigateToOrders,
  handleCategoryClick
}) => {
  // Use the same 14 category labels as the main shop/category pages
  const newArrivalsCategories = [
    'Necklace sets',
    'Haram',
    'Combo set',
    'Wedding collection',
    'Earrings',
    'Bangles',
    'Hip beads',
    'Accessories',
    "Gentlemen's items",
    'Beads',
    'Mangalsutra',
    'Sarudu',
    'Chains',
    'Choker sets'
  ];

  return (
    <>
      {/* New Arrivals Section */}
      <section className="new-arrivals-section min-h-screen bg-transparent">
        <div className="content-width new-arrivals-content">
          <div className="new-arrivals-header mb-6 rounded-2xl border border-amber-200/50 bg-white/85 p-5 shadow-lg backdrop-blur">
            <h1 className="new-arrivals-title text-2xl font-semibold text-slate-900 md:text-3xl">New Arrivals</h1>
            <p className="new-arrivals-subtitle mt-2 text-sm text-slate-600 md:text-base">Discover our latest collection of exquisite jewellery</p>
          </div>
          
          {/* Category Buttons - 14 category pages (same structure as shop) */}
          <div className="category-buttons-container mb-6">
            <div className="category-buttons flex flex-wrap gap-2">
              {newArrivalsCategories.map((category) => (
                <button
                  key={category}
                  className={`category-filter-btn rounded-full border px-3 py-1.5 text-sm font-medium transition ${selectedNewArrivalsCategory === category ? 'active border-amber-500 bg-amber-500 text-slate-900' : 'border-slate-300 bg-white/90 text-slate-700 hover:border-amber-400 hover:text-amber-700'}`}
                  onClick={() => {
                    setSelectedNewArrivalsCategory(
                      selectedNewArrivalsCategory === category ? null : category
                    );
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Back Button - Show when a category is selected */}
          {selectedNewArrivalsCategory && (
            <div className="category-back-button-container mb-4">
              <button 
                className="category-back-btn inline-flex items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                onClick={() => {
                  setSelectedNewArrivalsCategory(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Back
              </button>
            </div>
          )}

          <div className="products-grid grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {getFilteredNewArrivalsProducts().map((product) => (
              <div key={product.id} className="product-card overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className="product-image-wrapper group relative cursor-pointer overflow-hidden bg-slate-100" onClick={() => handleProductClick(product)}>
                  <img src={getProductImage(product)} alt={product.name} className="product-image h-72 w-full object-cover transition duration-300 group-hover:scale-105" />
                  <div className="product-hover-icons absolute inset-0 flex items-center justify-center gap-2 bg-black/0 opacity-0 transition group-hover:bg-black/20 group-hover:opacity-100">
                    <button 
                      className={`product-eye-icon inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/95 text-lg shadow ${viewedProducts.has(product.id) ? 'viewed text-amber-700' : ''}`}
                      onClick={(e) => handleEyeIconClick(e, product)}
                      aria-label="View product"
                    >
                      👁
                    </button>
                    <button 
                      className={`product-wishlist-icon inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/95 text-lg shadow ${wishlistItems.has(product.id) ? 'active text-rose-600' : ''}`}
                      onClick={(e) => handleWishlistClick(e, product)}
                      aria-label="Add to wishlist"
                    >
                      {wishlistItems.has(product.id) ? '❤️' : '🤍'}
                    </button>
                  </div>
                  {product.badge && (
                    <span className={`product-badge absolute left-2 top-2 rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white ${product.badge.toLowerCase().replace(" ", "-")}`}>
                      {product.badge}
                    </span>
                  )}
                  {product.discount && (
                    <span className="product-discount absolute right-2 top-2 rounded-full bg-rose-600 px-2 py-1 text-xs font-semibold text-white">-{product.discount}%</span>
                  )}
                </div>
                <div className="product-info space-y-2 p-4">
                  <h3 className="product-name line-clamp-2 text-base font-medium text-slate-900">{product.name}</h3>
                  <div className="product-rating text-sm text-amber-600">
                    {Array(product.rating).fill("★").join("")}{Array(5 - product.rating).fill("☆").join("")} ({product.reviews})
                  </div>
                  <div className="product-price flex items-center gap-2">
                    <span className="current-price text-base font-semibold text-amber-700">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="original-price text-sm text-slate-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button className="add-to-cart-btn inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-amber-400" onClick={(e) => handleAddToCart(e, product)}>
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Back Button - navigate to shop */}
          <div className="new-arrivals-all-products-container mt-8 flex justify-center">
            <button 
              className="new-arrivals-all-products-btn inline-flex items-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
              onClick={(e) => {
                e.preventDefault();
                navigateToShop(e);
              }}
            >
              Back
            </button>
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

export default Arrivals;

