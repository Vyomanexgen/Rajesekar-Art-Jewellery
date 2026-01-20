import React, { useState } from "react";
import NavbarOnly from "./NavbarOnly";

// Sample product data
const products = [
  { id: 1, name: "Traditional Gold Necklace", price: 2499, originalPrice: 3499, discount: 29, rating: 5, reviews: 128, badge: "Best Seller" },
  { id: 2, name: "Elegant Gold Earring", price: 899, originalPrice: 1299, discount: 31, rating: 5, reviews: 95, badge: "New" },
  { id: 3, name: "Gold Bangles Set (Set of 4)", price: 1899, originalPrice: 2699, discount: 30, rating: 4, reviews: 76, badge: "Hot" },
  { id: 4, name: "Temple Jewellery Set", price: 3299, originalPrice: 4499, discount: 27, rating: 5, reviews: 142 },
  { id: 5, name: "Bridal Necklace Set", price: 4999, originalPrice: 6999, discount: 29, rating: 5, reviews: 203, badge: "Best Seller" },
  { id: 6, name: "Kundan Earring", price: 1299, originalPrice: 1899, discount: 32, rating: 4, reviews: 88 },
  { id: 7, name: "Designer Gold Bracelet", price: 1599, originalPrice: 2299, discount: 30, rating: 4, reviews: 64, badge: "New" },
  { id: 8, name: "Antique Gold Ring", price: 799, originalPrice: 1099, discount: 27, rating: 5, reviews: 156 },
  { id: 9, name: "Pearl Choker Necklace", price: 2199, originalPrice: 3199, discount: 31, rating: 4, reviews: 112 },
  { id: 10, name: "Jhumka Earring", price: 1099, originalPrice: 1599, discount: 31, rating: 5, reviews: 98, badge: "Hot" },
  { id: 11, name: "Temple Kada Bangles", price: 2499, originalPrice: 3499, discount: 29, rating: 4, reviews: 67 },
  { id: 12, name: "Diamond Solitaire Ring", price: 3999, originalPrice: 5999, discount: 33, rating: 5, reviews: 234, badge: "Best Seller" },
  { id: 13, name: "Complete Bridal Set", price: 8999, originalPrice: 12999, discount: 31, rating: 5, reviews: 187, badge: "New" },
  { id: 14, name: "Lakshmi Temple Jewellery", price: 3599, originalPrice: 4999, discount: 28, rating: 4, reviews: 145 },
  { id: 15, name: "Long Haar Necklace", price: 2899, originalPrice: 3999, discount: 28, rating: 5, reviews: 91 },
  { id: 16, name: "Chandbali Earring", price: 1499, originalPrice: 2199, discount: 32, rating: 4, reviews: 78 },
  { id: 17, name: "Gold Chain Necklace", price: 1799, originalPrice: 2499, discount: 28, rating: 5, reviews: 123 },
  { id: 18, name: "Polki Earring", price: 1699, originalPrice: 2399, discount: 29, rating: 4, reviews: 87 },
  { id: 19, name: "Traditional Bangles", price: 1399, originalPrice: 1999, discount: 30, rating: 5, reviews: 156 },
  { id: 20, name: "Rose Gold Ring", price: 999, originalPrice: 1399, discount: 29, rating: 4, reviews: 104 },
  { id: 21, name: "Bridal Set Collection", price: 5999, originalPrice: 8499, discount: 29, rating: 5, reviews: 198, badge: "Best Seller" },
  { id: 22, name: "Temple Jewellery Collection", price: 4299, originalPrice: 5999, discount: 28, rating: 5, reviews: 167 },
  { id: 23, name: "Designer Necklace", price: 2799, originalPrice: 3899, discount: 28, rating: 4, reviews: 92 },
  { id: 24, name: "Classic Earring", price: 1199, originalPrice: 1699, discount: 29, rating: 5, reviews: 134 }
];

// Function to get image based on name
const getProductImage = (name) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes("ring")) return "/Rings.jpg";
  if (lowerName.includes("earing") || lowerName.includes("earring")) return "/Earings.jpg";
  if (lowerName.includes("bangles")) return "/Bangles.jpg";
  if (lowerName.includes("chain") || lowerName.includes("necklace")) return "/Necklaces.jpg";
  if (lowerName.includes("bridalset") || lowerName.includes("bridal set")) return "/Bridal_set.jpg";
  if (lowerName.includes("temple")) return "/Temple_Jewellery.jpg";
  return "/Necklaces.jpg"; // default
};

export default function ShopPage({ onNavigateToHome }) {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [filtersOpen, setFiltersOpen] = useState({
    price: true,
    material: true,
    gemstone: true,
    designStyle: true,
    designer: true,
    collection: true
  });
  const [selectedFilters, setSelectedFilters] = useState({
    material: [],
    gemstone: [],
    designStyle: [],
    designer: [],
    collection: []
  });

  const toggleFilter = (category) => {
    setFiltersOpen(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleCheckboxChange = (category, value) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      material: [],
      gemstone: [],
      designStyle: [],
      designer: [],
      collection: []
    });
    setPriceRange([0, 50000]);
  };

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    if (index === 0 && newRange[0] > newRange[1]) newRange[1] = newRange[0];
    if (index === 1 && newRange[1] < newRange[0]) newRange[0] = newRange[1];
    setPriceRange(newRange);
  };

  return (
    <div className="shop-page-wrapper">
      <NavbarOnly onNavigateToShop={() => {}} />
      <div className="shop-page">
        {onNavigateToHome && (
          <div style={{ padding: "10px 20px", background: "#f5f5f5", borderBottom: "1px solid #e5e5e5", maxWidth: "1400px", margin: "0 auto" }}>
            <button 
              onClick={onNavigateToHome}
              style={{ 
                background: "#5f2b7f", 
                color: "#fff", 
                border: "none", 
                padding: "8px 16px", 
                borderRadius: "6px", 
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              ← Back to Home
            </button>
          </div>
        )}
        <div className="shop-container">
        {/* Left Sidebar - Filters */}
        <aside className="filter-sidebar">
          <div className="filter-header">
            <h2>Featured Products</h2>
            <p>Best sellers and new arrivals</p>
          </div>

          <div className="filter-content">
            {/* Price Range */}
            <div className="filter-section">
              <div className="filter-title" onClick={() => toggleFilter("price")}>
                <span>Price Range</span>
                <span className={`filter-arrow ${filtersOpen.price ? "open" : ""}`}>▲</span>
              </div>
              {filtersOpen.price && (
                <div className="filter-options">
                  <div className="price-slider-container">
                    <div 
                      className="price-slider-wrapper"
                      style={{
                        '--min-percent': `${(priceRange[0] / 50000) * 100}`,
                        '--max-percent': `${(priceRange[1] / 50000) * 100}`
                      }}
                    >
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(0, e.target.value)}
                        className="price-slider price-slider-min"
                      />
                      <input
                        type="range"
                        min="0"
                        max="50000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(1, e.target.value)}
                        className="price-slider price-slider-max"
                      />
                    </div>
                    <div className="price-display">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Material */}
            <div className="filter-section">
              <div className="filter-title" onClick={() => toggleFilter("material")}>
                <span>Material</span>
                <span className={`filter-arrow ${filtersOpen.material ? "open" : ""}`}>▲</span>
              </div>
              {filtersOpen.material && (
                <div className="filter-options">
                  {["14K Gold", "18K Gold", "22K Gold", "Silver", "Platinum", "Rose Gold"].map((item) => (
                    <label key={item} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedFilters.material.includes(item)}
                        onChange={() => handleCheckboxChange("material", item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Gemstone Type */}
            <div className="filter-section">
              <div className="filter-title" onClick={() => toggleFilter("gemstone")}>
                <span>Gemstone Type</span>
                <span className={`filter-arrow ${filtersOpen.gemstone ? "open" : ""}`}>▲</span>
              </div>
              {filtersOpen.gemstone && (
                <div className="filter-options">
                  {["Diamond", "Ruby", "Emerald", "Sapphire", "Pearl", "Kundan", "Polki"].map((item) => (
                    <label key={item} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedFilters.gemstone.includes(item)}
                        onChange={() => handleCheckboxChange("gemstone", item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Design Style */}
            <div className="filter-section">
              <div className="filter-title" onClick={() => toggleFilter("designStyle")}>
                <span>Design Style</span>
                <span className={`filter-arrow ${filtersOpen.designStyle ? "open" : ""}`}>▲</span>
              </div>
              {filtersOpen.designStyle && (
                <div className="filter-options">
                  {["Traditional", "Contemporary", "Art Nouveau", "Vintage", "Minimalist", "Temple"].map((item) => (
                    <label key={item} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedFilters.designStyle.includes(item)}
                        onChange={() => handleCheckboxChange("designStyle", item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Designer */}
            <div className="filter-section">
              <div className="filter-title" onClick={() => toggleFilter("designer")}>
                <span>Designer</span>
                <span className={`filter-arrow ${filtersOpen.designer ? "open" : ""}`}>▲</span>
              </div>
              {filtersOpen.designer && (
                <div className="filter-options">
                  {["Designer A", "Designer B", "Designer C", "Designer D"].map((item) => (
                    <label key={item} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedFilters.designer.includes(item)}
                        onChange={() => handleCheckboxChange("designer", item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Collection */}
            <div className="filter-section">
              <div className="filter-title" onClick={() => toggleFilter("collection")}>
                <span>Collection</span>
                <span className={`filter-arrow ${filtersOpen.collection ? "open" : ""}`}>▲</span>
              </div>
              {filtersOpen.collection && (
                <div className="filter-options">
                  {["Bridal Collection", "Festive Special", "Limited Edition", "New Arrivals"].map((item) => (
                    <label key={item} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedFilters.collection.includes(item)}
                        onChange={() => handleCheckboxChange("collection", item)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter-buttons">
            <button className="apply-filters-btn">Apply Filters</button>
            <button className="clear-all-btn" onClick={clearAllFilters}>Clear All</button>
          </div>
        </aside>

        {/* Right Side - Products Grid */}
        <div className="products-container">
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={getProductImage(product.name)} alt={product.name} className="product-image" />
                  {product.badge && (
                    <span className={`product-badge ${product.badge.toLowerCase().replace(" ", "-")}`}>
                      {product.badge}
                    </span>
                  )}
                  {product.discount && (
                    <span className="product-discount">-{product.discount}%</span>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    {Array(product.rating).fill("★").join("")}{Array(5 - product.rating).fill("☆").join("")} ({product.reviews})
                  </div>
                  <div className="product-price">
                    <span className="current-price">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <button className="add-to-cart-btn">
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

