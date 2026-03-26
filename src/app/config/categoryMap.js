/**
 * Category slug to display name mapping
 * Used for routing and category selection
 */
export const CATEGORY_MAP = {
  'necklace': 'Necklaces',
  'earring': 'Earrings',
  'bangle': 'Bangles',
  'bridal-set': 'Bridal Sets',
  'haram': 'Haram',
  'combo-set': 'Combo set',
  'hip-belts': 'Hip belts',
  'accessories': 'Accessories',
  'gentlemens-items': "Gentlemen's items",
  'beads': 'Beads',
  'mangalsutra': 'Mangalsutra',
  'sarudu': 'Sarudu',
  'chains': 'Chains',
  'choker-sets': 'Choker sets',
  'necklace-sets': 'Necklaces',
  'wedding-collection': 'Bridal Sets'
};

/**
 * Get category name from slug
 * @param {string} slug - The category slug
 * @returns {string|null} - The category name or null if not found
 */
export const getCategoryFromSlug = (slug) => {
  return CATEGORY_MAP[slug] || null;
};
