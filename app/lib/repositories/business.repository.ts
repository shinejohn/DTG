import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, Businesses } from '../dtg-database.types'

export class BusinessRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async findAll(communityId: string, limit = 50) {
    const { data, error } = await this.supabase
      .from('businesses')
      .select('*')
      .eq('community_id', communityId)
      .eq('is_active', true)
      .limit(limit)
      .order('is_featured', { ascending: false })
      .order('rating_average', { ascending: false })

    if (error) throw new Error(`Failed to fetch businesses: ${error.message}`)
    return data
  }

  async findById(id: string) {
    const { data, error } = await this.supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw new Error(`Failed to fetch business: ${error.message}`)
    return data
  }

  async findBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('businesses')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) throw new Error(`Failed to fetch business: ${error.message}`)
    return data
  }

  async findByCategory(communityId: string, category: string) {
    const { data, error } = await this.supabase
      .from('businesses')
      .select('*')
      .eq('community_id', communityId)
      .eq('category', category)
      .eq('is_active', true)
      .order('rating_average', { ascending: false })

    if (error) throw new Error(`Failed to fetch businesses by category: ${error.message}`)
    return data
  }

  async search(communityId: string, searchTerm: string) {
    const { data, error } = await this.supabase
      .from('businesses')
      .select('*')
      .eq('community_id', communityId)
      .eq('is_active', true)
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      .limit(20)

    if (error) throw new Error(`Failed to search businesses: ${error.message}`)
    return data
  }

  async getFeatured(communityId: string, limit = 6) {
    const { data, error } = await this.supabase
      .from('businesses')
      .select('*')
      .eq('community_id', communityId)
      .eq('is_active', true)
      .eq('is_featured', true)
      .limit(limit)
      .order('rating_average', { ascending: false })

    if (error) throw new Error(`Failed to fetch featured businesses: ${error.message}`)
    return data
  }

  async getWithReviews(businessId: string) {
    const { data, error } = await this.supabase
      .from('businesses')
      .select(`
        *,
        reviews (
          id,
          rating,
          title,
          content,
          photos,
          helpful_votes,
          created_at,
          user:users (
            id,
            display_name,
            avatar_url
          )
        )
      `)
      .eq('id', businessId)
      .single()

    if (error) throw new Error(`Failed to fetch business with reviews: ${error.message}`)
    return data
  }

  async getWithDeals(businessId: string) {
    const { data, error } = await this.supabase
      .from('businesses')
      .select(`
        *,
        deals (
          id,
          title,
          description,
          discount_percentage,
          discount_amount,
          original_price,
          deal_price,
          start_date,
          end_date,
          is_active
        )
      `)
      .eq('id', businessId)
      .eq('deals.is_active', true)
      .gte('deals.end_date', new Date().toISOString())
      .single()

    if (error) throw new Error(`Failed to fetch business with deals: ${error.message}`)
    return data
  }
}