// Utility function to get product image
export const getProductImage = (product) => {
  // If product is an object with image property, use it
  if (typeof product === 'object' && product.image) {
    return product.image;
  }
  // If product is a string (name), use name-based logic for backward compatibility
  if (typeof product === 'string') {
    const lowerName = product.toLowerCase();
    if (lowerName.includes("ring")) return "/Rings.jpg";
    if (lowerName.includes("earing") || lowerName.includes("earring")) return "/Earings.jpg";
    if (lowerName.includes("bangles")) return "/Bangles.jpg";
    if (lowerName.includes("chain") || lowerName.includes("necklace")) return "/Necklaces.jpg";
    if (lowerName.includes("bridalset") || lowerName.includes("bridal set")) return "/Bridal_set.jpg";
    if (lowerName.includes("temple")) return "/Temple_Jewellery.jpg";
    return "/Necklaces.jpg"; // default
  }
  return "/Necklaces.jpg"; // default fallback
};

// Helper function to get product description
export const getProductDescription = (product) => {
  if (product.name.includes("Bangles")) {
    return "Beautiful set of 4 gold bangles with traditional design patterns.";
  } else if (product.name.includes("Earring")) {
    return "Elegant gold earrings crafted with intricate traditional designs.";
  } else if (product.name.includes("Necklace")) {
    return "Exquisite gold necklace featuring traditional craftsmanship and modern elegance.";
  } else if (product.name.includes("Ring")) {
    return "Stunning gold ring with intricate detailing and timeless design.";
  } else if (product.name.includes("Temple")) {
    return "Authentic temple jewellery with traditional motifs and divine craftsmanship.";
  } else if (product.name.includes("Bridal")) {
    return "Complete bridal jewellery set perfect for your special day.";
  }
  return "Premium quality jewellery crafted with love and tradition.";
};

