import { Brand } from '../contexts/BrandContext';
// Save brands to localStorage
export const saveBrands = (brands: Brand[]): void => {
  try {
    localStorage.setItem('brands', JSON.stringify(brands));
  } catch (error) {
    console.error('Error saving brands to localStorage:', error);
  }
};
// Load brands from localStorage
export const loadBrands = (): Brand[] | null => {
  try {
    const brandsJSON = localStorage.getItem('brands');
    if (brandsJSON) {
      return JSON.parse(brandsJSON);
    }
  } catch (error) {
    console.error('Error loading brands from localStorage:', error);
  }
  return null;
};
// Get a specific brand by ID
export const getBrandById = (brandId: string): Brand | null => {
  try {
    const brands = loadBrands();
    if (brands) {
      return brands.find(brand => brand.id === brandId) || null;
    }
  } catch (error) {
    console.error('Error getting brand by ID:', error);
  }
  return null;
};