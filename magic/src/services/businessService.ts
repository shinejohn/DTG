import { api } from '../utils/core/api';
import type { Business } from '../types/business';
// Fetch a business by its slug
export async function fetchBusinessBySlug(slug: string): Promise<Business> {
  const response = await api.get<Business>(`/businesses/${slug}`);
  if (response.error) {
    throw new Error(response.error.message || 'Failed to fetch business');
  }
  return response.data as Business;
}
// You can add more API functions here as needed:
// export async function fetchBusinesses(filters?: any): Promise<Business[]> { ... }
// export async function createBusinessReview(businessId: string, review: any): Promise<any> { ... }