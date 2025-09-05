// Downtown Guide Database Types
// Generated from our B2C community platform schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Enums
export type event_category = 'community' | 'music' | 'sports' | 'arts' | 'food' | 'education' | 'business' | 'charity' | 'government' | 'other';
export type user_type = 'consumer' | 'business_owner' | 'admin';

export interface Database {
  public: {
    Tables: {
      communities: {
        Row: {
          id: string
          name: string
          slug: string
          county: string | null
          state: string | null
          country: string
          latitude: number | null
          longitude: number | null
          radius_miles: number
          timezone: string
          population: number | null
          description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Communities['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Communities['Row']>
      }
      users: {
        Row: {
          id: string
          email: string
          username: string | null
          first_name: string | null
          last_name: string | null
          display_name: string | null
          avatar_url: string | null
          bio: string | null
          user_type: user_type
          community_id: string | null
          is_active: boolean
          email_verified: boolean
          points_balance: number
          reputation_score: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Users['Row'], 'id' | 'points_balance' | 'reputation_score' | 'created_at' | 'updated_at'> & {
          id?: string
          points_balance?: number
          reputation_score?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Users['Row']>
      }
      businesses: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          category: string
          subcategory: string | null
          community_id: string
          owner_id: string | null
          is_verified: boolean
          is_featured: boolean
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          email: string | null
          website: string | null
          hours_of_operation: Json | null
          logo_url: string | null
          cover_image_url: string | null
          images: string[]
          amenities: string[]
          price_range: number | null
          rating_average: number | null
          rating_count: number
          social_media: Json | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Businesses['Row'], 'id' | 'rating_average' | 'rating_count' | 'created_at' | 'updated_at'> & {
          id?: string
          rating_average?: number | null
          rating_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Businesses['Row']>
      }
      reviews: {
        Row: {
          id: string
          business_id: string
          user_id: string
          rating: number
          title: string | null
          content: string
          photos: string[]
          helpful_votes: number
          response_from_owner: string | null
          response_date: string | null
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Reviews['Row'], 'id' | 'helpful_votes' | 'created_at' | 'updated_at'> & {
          id?: string
          helpful_votes?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Reviews['Row']>
      }
      deals: {
        Row: {
          id: string
          business_id: string
          title: string
          description: string
          discount_percentage: number | null
          discount_amount: number | null
          original_price: number | null
          deal_price: number | null
          start_date: string
          end_date: string
          terms_conditions: string | null
          redemption_limit: number | null
          redemption_count: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Deals['Row'], 'id' | 'redemption_count' | 'created_at' | 'updated_at'> & {
          id?: string
          redemption_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Deals['Row']>
      }
      events: {
        Row: {
          id: string
          community_id: string
          business_id: string | null
          organizer_id: string
          title: string
          description: string
          category: event_category
          start_datetime: string
          end_datetime: string
          location_name: string | null
          location_address: string | null
          location_city: string | null
          location_state: string | null
          location_zip: string | null
          latitude: number | null
          longitude: number | null
          is_online: boolean
          online_url: string | null
          ticket_price: number | null
          max_attendees: number | null
          current_attendees: number
          image_url: string | null
          is_featured: boolean
          is_cancelled: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Events['Row'], 'id' | 'current_attendees' | 'created_at' | 'updated_at'> & {
          id?: string
          current_attendees?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Events['Row']>
      }
      user_points_history: {
        Row: {
          id: string
          user_id: string
          points_change: number
          action_type: string
          action_description: string | null
          reference_id: string | null
          reference_type: string | null
          balance_after: number
          created_at: string
        }
        Insert: Omit<UserPointsHistory['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<UserPointsHistory['Row']>
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          badge_url: string | null
          points_value: number
          category: string
          criteria: Json
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Achievements['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Achievements['Row']>
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_date: string
          created_at: string
        }
        Insert: Omit<UserAchievements['Row'], 'id' | 'created_at'> & {
          id?: string
          created_at?: string
        }
        Update: Partial<UserAchievements['Row']>
      }
      loyalty_programs: {
        Row: {
          id: string
          business_id: string
          name: string
          description: string | null
          points_per_dollar: number
          reward_threshold: number
          reward_value: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<LoyaltyPrograms['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string
          created_at?: string
          updated_at?: string
        }
        Update: Partial<LoyaltyPrograms['Row']>
      }
      loyalty_members: {
        Row: {
          id: string
          loyalty_program_id: string
          user_id: string
          points_balance: number
          lifetime_points: number
          tier: string | null
          joined_date: string
          last_activity_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<LoyaltyMembers['Row'], 'id' | 'points_balance' | 'lifetime_points' | 'created_at' | 'updated_at'> & {
          id?: string
          points_balance?: number
          lifetime_points?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<LoyaltyMembers['Row']>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      event_category: event_category
      user_type: user_type
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Export individual table types for convenience
export type Communities = Database['public']['Tables']['communities']['Row']
export type Users = Database['public']['Tables']['users']['Row']
export type Businesses = Database['public']['Tables']['businesses']['Row']
export type Reviews = Database['public']['Tables']['reviews']['Row']
export type Deals = Database['public']['Tables']['deals']['Row']
export type Events = Database['public']['Tables']['events']['Row']
export type UserPointsHistory = Database['public']['Tables']['user_points_history']['Row']
export type Achievements = Database['public']['Tables']['achievements']['Row']
export type UserAchievements = Database['public']['Tables']['user_achievements']['Row']
export type LoyaltyPrograms = Database['public']['Tables']['loyalty_programs']['Row']
export type LoyaltyMembers = Database['public']['Tables']['loyalty_members']['Row']