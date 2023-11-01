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
      logs: {
        Row: {
          created_at: string | null
          data: Json | null
          environment: string | null
          message: string | null
          sector: string | null
          seq: number
          status: number | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          environment?: string | null
          message?: string | null
          sector?: string | null
          seq?: number
          status?: number | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          environment?: string | null
          message?: string | null
          sector?: string | null
          seq?: number
          status?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "logs_status_fkey"
            columns: ["status"]
            referencedRelation: "status"
            referencedColumns: ["id"]
          }
        ]
      }
      sotd: {
        Row: {
          album: string | null
          album_art: Json | null
          artists: string[] | null
          created_at: string | null
          description: string | null
          id: number
          name: string | null
          preview_url: string | null
          spotify_id: string | null
        }
        Insert: {
          album?: string | null
          album_art?: Json | null
          artists?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          preview_url?: string | null
          spotify_id?: string | null
        }
        Update: {
          album?: string | null
          album_art?: Json | null
          artists?: string[] | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string | null
          preview_url?: string | null
          spotify_id?: string | null
        }
        Relationships: []
      }
      sotd_test: {
        Row: {
          album: string | null
          album_art: Json | null
          artist: string | null
          created_at: string | null
          id: number
          produced_by: string | null
          title: string | null
          two_cents: string | null
          written_by: string | null
        }
        Insert: {
          album?: string | null
          album_art?: Json | null
          artist?: string | null
          created_at?: string | null
          id: number
          produced_by?: string | null
          title?: string | null
          two_cents?: string | null
          written_by?: string | null
        }
        Update: {
          album?: string | null
          album_art?: Json | null
          artist?: string | null
          created_at?: string | null
          id?: number
          produced_by?: string | null
          title?: string | null
          two_cents?: string | null
          written_by?: string | null
        }
        Relationships: []
      }
      status: {
        Row: {
          id: number
          status: string
        }
        Insert: {
          id?: number
          status: string
        }
        Update: {
          id?: number
          status?: string
        }
        Relationships: []
      }
      token: {
        Row: {
          access_token: string | null
          created_at: string | null
          expires_in: number | null
          id: number
          refresh_token: string | null
          scope: string | null
          token_type: string | null
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          expires_in?: number | null
          id?: number
          refresh_token?: string | null
          scope?: string | null
          token_type?: string | null
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          expires_in?: number | null
          id?: number
          refresh_token?: string | null
          scope?: string | null
          token_type?: string | null
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
