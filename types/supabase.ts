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
      users: {
        Row: {
          created_at: string | null
          email: string | null
          fullname: string | null
          id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          fullname?: string | null
          id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          fullname?: string | null
          id?: string
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
