export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export type Database = {
  public: {
    Tables: {
      sotd: {
        Row: {
          id: number
          created_at: string | null
          title: string | null
          artist: string | null
          two_cents: string | null
          album: string | null
          written_by: string | null
          produced_by: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          title?: string | null
          artist?: string | null
          two_cents?: string | null
          album?: string | null
          written_by?: string | null
          produced_by?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          title?: string | null
          artist?: string | null
          two_cents?: string | null
          album?: string | null
          written_by?: string | null
          produced_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
