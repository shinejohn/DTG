export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      communities: {
        Row: {
          id: string
          slug: string
          name: string
          display_name: string
          state: string
          latitude: number
          longitude: number
          population: number | null
          timezone: string | null
          is_active: boolean
          search_vector: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          display_name: string
          state: string
          latitude: number
          longitude: number
          population?: number | null
          timezone?: string | null
          is_active?: boolean
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          display_name?: string
          state?: string
          latitude?: number
          longitude?: number
          population?: number | null
          timezone?: string | null
          is_active?: boolean
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          community_id: string | null
          username: string
          display_name: string | null
          email: string
          avatar_url: string | null
          bio: string | null
          user_type: 'consumer' | 'business_owner' | 'admin'
          is_active: boolean
          email_verified: boolean
          phone: string | null
          phone_verified: boolean
          date_of_birth: string | null
          notification_preferences: Json
          privacy_settings: Json
          search_vector: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          community_id?: string | null
          username: string
          display_name?: string | null
          email: string
          avatar_url?: string | null
          bio?: string | null
          user_type?: 'regular' | 'business_owner' | 'admin' | 'super_admin'
          is_active?: boolean
          email_verified?: boolean
          phone?: string | null
          phone_verified?: boolean
          date_of_birth?: string | null
          notification_preferences?: Json
          privacy_settings?: Json
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          community_id?: string | null
          username?: string
          display_name?: string | null
          email?: string
          avatar_url?: string | null
          bio?: string | null
          user_type?: 'regular' | 'business_owner' | 'admin' | 'super_admin'
          is_active?: boolean
          email_verified?: boolean
          phone?: string | null
          phone_verified?: boolean
          date_of_birth?: string | null
          notification_preferences?: Json
          privacy_settings?: Json
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      businesses: {
        Row: {
          id: string
          community_id: string
          owner_user_id: string | null
          category_id: string
          slug: string
          name: string
          description: string | null
          address: string
          city: string
          state: string
          zip_code: string
          latitude: number | null
          longitude: number | null
          phone: string | null
          email: string | null
          website: string | null
          hours_of_operation: Json | null
          business_images: Json
          logo_url: string | null
          is_active: boolean
          is_featured: boolean
          verification_status: 'pending' | 'verified' | 'rejected'
          verification_date: string | null
          claimed_at: string | null
          rating: number | null
          review_count: number
          avg_price_range: string | null
          social_media: Json
          amenities: string[]
          tags: string[]
          search_vector: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          community_id: string
          owner_user_id?: string | null
          category_id: string
          slug: string
          name: string
          description?: string | null
          address: string
          city: string
          state: string
          zip_code: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          email?: string | null
          website?: string | null
          hours_of_operation?: Json | null
          business_images?: Json
          logo_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          verification_status?: 'pending' | 'verified' | 'rejected'
          verification_date?: string | null
          claimed_at?: string | null
          rating?: number | null
          review_count?: number
          avg_price_range?: string | null
          social_media?: Json
          amenities?: string[]
          tags?: string[]
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          community_id?: string
          owner_user_id?: string | null
          category_id?: string
          slug?: string
          name?: string
          description?: string | null
          address?: string
          city?: string
          state?: string
          zip_code?: string
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          email?: string | null
          website?: string | null
          hours_of_operation?: Json | null
          business_images?: Json
          logo_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          verification_status?: 'pending' | 'verified' | 'rejected'
          verification_date?: string | null
          claimed_at?: string | null
          rating?: number | null
          review_count?: number
          avg_price_range?: string | null
          social_media?: Json
          amenities?: string[]
          tags?: string[]
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      business_categories: {
        Row: {
          id: string
          parent_id: string | null
          slug: string
          name: string
          description: string | null
          icon: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id?: string | null
          slug: string
          name: string
          description?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string | null
          slug?: string
          name?: string
          description?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          business_id: string
          user_id: string
          rating: number
          title: string | null
          content: string
          is_verified_purchase: boolean
          helpful_count: number
          photos: string[]
          owner_response: string | null
          owner_response_date: string | null
          is_flagged: boolean
          is_hidden: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          user_id: string
          rating: number
          title?: string | null
          content: string
          is_verified_purchase?: boolean
          helpful_count?: number
          photos?: string[]
          owner_response?: string | null
          owner_response_date?: string | null
          is_flagged?: boolean
          is_hidden?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          user_id?: string
          rating?: number
          title?: string | null
          content?: string
          is_verified_purchase?: boolean
          helpful_count?: number
          photos?: string[]
          owner_response?: string | null
          owner_response_date?: string | null
          is_flagged?: boolean
          is_hidden?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      deals: {
        Row: {
          id: string
          business_id: string
          title: string
          description: string
          terms_conditions: string | null
          discount_type: 'percentage' | 'fixed_amount' | 'bogo' | 'other'
          discount_value: number | null
          original_price: number | null
          deal_price: number | null
          start_date: string
          end_date: string
          is_recurring: boolean
          recurring_days: string[] | null
          max_redemptions: number | null
          current_redemptions: number
          is_active: boolean
          requires_coupon_code: boolean
          coupon_code: string | null
          deal_images: string[]
          search_vector: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          business_id: string
          title: string
          description: string
          terms_conditions?: string | null
          discount_type: 'percentage' | 'fixed_amount' | 'bogo' | 'other'
          discount_value?: number | null
          original_price?: number | null
          deal_price?: number | null
          start_date: string
          end_date: string
          is_recurring?: boolean
          recurring_days?: string[] | null
          max_redemptions?: number | null
          current_redemptions?: number
          is_active?: boolean
          requires_coupon_code?: boolean
          coupon_code?: string | null
          deal_images?: string[]
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          business_id?: string
          title?: string
          description?: string
          terms_conditions?: string | null
          discount_type?: 'percentage' | 'fixed_amount' | 'bogo' | 'other'
          discount_value?: number | null
          original_price?: number | null
          deal_price?: number | null
          start_date?: string
          end_date?: string
          is_recurring?: boolean
          recurring_days?: string[] | null
          max_redemptions?: number | null
          current_redemptions?: number
          is_active?: boolean
          requires_coupon_code?: boolean
          coupon_code?: string | null
          deal_images?: string[]
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          community_id: string
          business_id: string | null
          created_by_user_id: string
          title: string
          description: string
          event_type: string
          start_datetime: string
          end_datetime: string
          is_all_day: boolean
          location_name: string | null
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          latitude: number | null
          longitude: number | null
          is_virtual: boolean
          virtual_url: string | null
          max_attendees: number | null
          current_attendees: number
          registration_required: boolean
          registration_url: string | null
          ticket_price: number | null
          is_featured: boolean
          tags: string[]
          event_images: string[]
          search_vector: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          community_id: string
          business_id?: string | null
          created_by_user_id: string
          title: string
          description: string
          event_type: string
          start_datetime: string
          end_datetime: string
          is_all_day?: boolean
          location_name?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          latitude?: number | null
          longitude?: number | null
          is_virtual?: boolean
          virtual_url?: string | null
          max_attendees?: number | null
          current_attendees?: number
          registration_required?: boolean
          registration_url?: string | null
          ticket_price?: number | null
          is_featured?: boolean
          tags?: string[]
          event_images?: string[]
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          community_id?: string
          business_id?: string | null
          created_by_user_id?: string
          title?: string
          description?: string
          event_type?: string
          start_datetime?: string
          end_datetime?: string
          is_all_day?: boolean
          location_name?: string | null
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          latitude?: number | null
          longitude?: number | null
          is_virtual?: boolean
          virtual_url?: string | null
          max_attendees?: number | null
          current_attendees?: number
          registration_required?: boolean
          registration_url?: string | null
          ticket_price?: number | null
          is_featured?: boolean
          tags?: string[]
          event_images?: string[]
          search_vector?: any | null
          created_at?: string
          updated_at?: string
        }
      }
      user_points: {
        Row: {
          id: string
          user_id: string
          community_id: string
          total_points: number
          level: number
          points_this_week: number
          points_this_month: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          community_id: string
          total_points?: number
          level?: number
          points_this_week?: number
          points_this_month?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          community_id?: string
          total_points?: number
          level?: number
          points_this_week?: number
          points_this_month?: number
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          icon_url: string | null
          points_value: number
          requirement_type: string
          requirement_value: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          icon_url?: string | null
          points_value: number
          requirement_type: string
          requirement_value: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          icon_url?: string | null
          points_value?: number
          requirement_type?: string
          requirement_value?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          earned_at: string
          progress: number
          is_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          earned_at?: string
          progress?: number
          is_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          earned_at?: string
          progress?: number
          is_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: 'regular' | 'business_owner' | 'admin' | 'super_admin'
      verification_status: 'pending' | 'verified' | 'rejected'
      discount_type: 'percentage' | 'fixed_amount' | 'bogo' | 'other'
      deal_status: 'draft' | 'active' | 'scheduled' | 'expired' | 'sold_out'
      event_status: 'draft' | 'published' | 'cancelled' | 'completed'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}