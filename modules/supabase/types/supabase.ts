export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users_profile: {
        Row: {
          created_at: string | null
          email: string | null
          fullname: string | null
          id: string
          interval: string | null
          is_subscribed: boolean | null
          stripe_customer: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          fullname?: string | null
          id: string
          interval?: string | null
          is_subscribed?: boolean | null
          stripe_customer?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          fullname?: string | null
          id?: string
          interval?: string | null
          is_subscribed?: boolean | null
          stripe_customer?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
