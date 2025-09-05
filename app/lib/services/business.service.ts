import { BusinessRepository } from '../repositories/business.repository'
import { ReviewRepository } from '../repositories/review.repository'
import { DealRepository } from '../repositories/deal.repository'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../dtg-database.types'

export class BusinessService {
  private businessRepo: BusinessRepository
  private reviewRepo: ReviewRepository
  private dealRepo: DealRepository

  constructor(supabase: SupabaseClient<Database>) {
    this.businessRepo = new BusinessRepository(supabase)
    this.reviewRepo = new ReviewRepository(supabase)
    this.dealRepo = new DealRepository(supabase)
  }

  async getBusinessProfile(slug: string) {
    const business = await this.businessRepo.findBySlug(slug)
    const reviews = await this.reviewRepo.findByBusiness(business.id, 5)
    const deals = await this.dealRepo.findByBusiness(business.id)

    return {
      ...business,
      recentReviews: reviews,
      activeDeals: deals
    }
  }

  async getFeaturedBusinesses(communityId: string) {
    return this.businessRepo.getFeatured(communityId)
  }

  async searchBusinesses(communityId: string, searchTerm: string) {
    if (!searchTerm || searchTerm.length < 2) {
      return this.businessRepo.findAll(communityId, 20)
    }
    return this.businessRepo.search(communityId, searchTerm)
  }

  async getBusinessesByCategory(communityId: string, category: string) {
    return this.businessRepo.findByCategory(communityId, category)
  }

  async getBusinessDashboard(businessId: string) {
    const business = await this.businessRepo.findById(businessId)
    const recentReviews = await this.reviewRepo.findByBusiness(businessId, 10)
    const activeDeals = await this.dealRepo.findByBusiness(businessId)

    // Calculate metrics
    const metrics = {
      totalReviews: business.rating_count,
      averageRating: business.rating_average || 0,
      activeDeals: activeDeals.length,
      viewsThisMonth: 0, // Would come from analytics
      recentActivity: {
        reviews: recentReviews.slice(0, 5),
        deals: activeDeals.slice(0, 3)
      }
    }

    return {
      business,
      metrics,
      recentReviews,
      activeDeals
    }
  }
}