import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, Reviews } from '../dtg-database.types'

export class ReviewRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async findByBusiness(businessId: string, limit = 20) {
    const { data, error } = await this.supabase
      .from('reviews')
      .select(`
        *,
        user:users (
          id,
          display_name,
          avatar_url
        )
      `)
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw new Error(`Failed to fetch reviews: ${error.message}`)
    return data
  }

  async findByUser(userId: string) {
    const { data, error } = await this.supabase
      .from('reviews')
      .select(`
        *,
        business:businesses (
          id,
          name,
          slug,
          category,
          logo_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw new Error(`Failed to fetch user reviews: ${error.message}`)
    return data
  }

  async create(review: {
    business_id: string
    user_id: string
    rating: number
    title?: string
    content: string
    photos?: string[]
  }) {
    const { data, error } = await this.supabase
      .from('reviews')
      .insert(review)
      .select()
      .single()

    if (error) throw new Error(`Failed to create review: ${error.message}`)
    return data
  }

  async incrementHelpful(reviewId: string) {
    const { data, error } = await this.supabase.rpc('increment_helpful_votes', {
      review_id: reviewId
    })

    if (error) throw new Error(`Failed to increment helpful votes: ${error.message}`)
    return data
  }

  async addOwnerResponse(reviewId: string, response: string) {
    const { data, error } = await this.supabase
      .from('reviews')
      .update({
        response_from_owner: response,
        response_date: new Date().toISOString()
      })
      .eq('id', reviewId)
      .select()
      .single()

    if (error) throw new Error(`Failed to add owner response: ${error.message}`)
    return data
  }
}