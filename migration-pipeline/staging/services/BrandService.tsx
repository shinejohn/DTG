import React from 'react';
// Types
export interface Brand {
  id: string;
  name: string;
  domain: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  isActive: boolean;
  brandType: 'community' | 'interest'; // Add brand type
  features: {
    rewards: boolean;
    events: boolean;
    challenges: boolean;
    deals: boolean;
  };
  communities?: string[]; // Associated community IDs
  experience?: {
    headline?: string;
    description?: string;
    searchPlaceholder?: string;
    backgroundImage?: string;
    featuredCategories?: string[];
  };
}
// Default brand to use as fallback
const defaultBrand: Brand = {
  id: 'downtown-guide',
  name: 'Downtown Guide',
  domain: 'downtownguide.com',
  logo: '/images/placeholder.jpg',
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  isActive: true,
  brandType: 'community',
  features: {
    rewards: true,
    events: true,
    challenges: true,
    deals: true
  },
  communities: ['nyc', 'sf', 'chi', 'la', 'mia', 'sea', 'aus', 'den', 'bos', 'por'],
  experience: {
    headline: 'Discover {city}',
    description: 'Explore the best local businesses, events, and experiences in {city}.',
    searchPlaceholder: 'Search for restaurants, shops, events...',
    backgroundImage: '/images/placeholder.jpg',
    featuredCategories: ['Restaurants', 'Shopping', 'Entertainment', 'Services', 'Nightlife', 'Events']
  },
  pageSections: {
    hero: true,
    featuredCategories: true,
    popularPlaces: true,
    upcomingEvents: true,
    testimonials: false,
    newsletter: true,
    sectionsOrder: ['hero', 'featuredCategories', 'popularPlaces', 'upcomingEvents', 'testimonials', 'newsletter']
  }
};
// Get all brands from localStorage or return default if not available
export function getAllBrands(): Brand[] {
  try {
    const storedBrands = localStorage.getItem('brands');
    if (storedBrands) {
      return JSON.parse(storedBrands);
    }
  } catch (error) {
    // console.error('Error loading brands from localStorage:', error);
  }
  // Return default brands if none found in localStorage
  return [defaultBrand];
}
// Get a specific brand by ID
export function getBrandById(id: string): Brand | null {
  const brands = getAllBrands();
  return brands.find(brand => brand.id === id) || null;
}
// Detect current brand based on domain
export function detectCurrentBrand(): Brand {
  try {
    // Check if we're in the brand preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const previewBrandId = urlParams.get('brandId');
    if (previewBrandId) {
      const previewBrand = getBrandById(previewBrandId);
      if (previewBrand) {
        return previewBrand;
      }
    }
    // Check if we're on a brand preview page
    const pathParts = window.location.pathname.split('/');
    if (pathParts.includes('preview') && pathParts.includes('brand')) {
      const brandIdIndex = pathParts.indexOf('brand') + 1;
      if (brandIdIndex < pathParts.length) {
        const brandId = pathParts[brandIdIndex];
        const brand = getBrandById(brandId);
        if (brand) {
          return brand;
        }
      }
    }
    const currentDomain = window.location.hostname;
    const brands = getAllBrands();
    // First try to find an exact match
    let matchedBrand = brands.find(brand => brand.domain.toLowerCase() === currentDomain.toLowerCase() && brand.isActive);
    // If no exact match, try to find a partial match (subdomain)
    if (!matchedBrand) {
      matchedBrand = brands.find(brand => currentDomain.toLowerCase().includes(brand.domain.toLowerCase()) && brand.isActive);
    }
    // If still no match, use the primary brand if available
    if (!matchedBrand) {
      matchedBrand = brands.find(brand => brand.isPrimary && brand.isActive) || brands.find(brand => brand.isActive) || defaultBrand;
    }
    return matchedBrand;
  } catch (error) {
    // console.error('Error detecting current brand:', error);
    return defaultBrand;
  }
}
// Save brands to localStorage
export function saveBrands(brands: Brand[]): void {
  try {
    localStorage.setItem('brands', JSON.stringify(brands));
  } catch (error) {
    // console.error('Error saving brands to localStorage:', error);
  }
}
// Get brand-specific communities
export function getBrandCommunities(brandId: string): string[] {
  const brand = getBrandById(brandId);
  return brand?.communities || [];
}
// Apply brand styling to the document
export function applyBrandStyling(brand: Brand): void {
  const root = document.documentElement;
  root.style.setProperty('--primary-color', brand.primaryColor);
  root.style.setProperty('--secondary-color', brand.secondaryColor);
  // Update favicon if needed
  // const favicon = document.querySelector("link[rel='shortcut icon']")
  // if (favicon) {
  //   favicon.setAttribute('href', brand.favicon)
  // }
}