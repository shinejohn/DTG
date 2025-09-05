import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database, Deals } from '../dtg-database.types'

export class DealRepository {
  constructor(private supabase: SupabaseClient<Database>) {}

  async findActive(communityId?: string) {
    let query = this.supabase
      .from('deals')
      .select(`
        *,
        business:businesses (
          id,
          name,
          slug,
          category,
          logo_url,
          address,
          rating_average,
          community_id
        )
      `)
      .eq('is_active', true)
      .gte('end_date', new Date().toISOString())
      .order('created_at', { ascending: false })

    if (communityId) {
      query = query.eq('business.community_id', communityId)
    }

    const { data, error } = await query

    if (error) throw new Error(`Failed to fetch deals: ${error.message}`)
    return data
  }

  async findByBusiness(businessId: string) {
    const { data, error } = await this.supabase
      .from('deals')
      .select('*')
      .eq('business_id', businessId)
      .eq('is_active', true)
      .gte('end_date', new Date().toISOString())
      .order('created_at', { ascending: false })

    if (error) throw new Error(`Failed to fetch business deals: ${error.message}`)
    return data
  }

  async findById(id: string) {
    const { data, error } = await this.supabase
      .from('deals')
      .select(`
        *,
        business:businesses (
          id,
          name,
          slug,
          category,
          logo_url,
          address,
          phone,
          website,
          rating_average
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw new Error(`Failed to fetch deal: ${error.message}`)
    return data
  }

  async incrementRedemption(dealId: string) {
    const { data, error } = await this.supabase.rpc('increment_deal_redemption', {
      deal_id: dealId
    })

    if (error) throw new Error(`Failed to increment redemption: ${error.message}`)
    return data
  }
}