import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          username: string | null
          bio: string | null
          avatar_url: string | null
          languages_learning: string[] | null
          languages_native: string[] | null
          location: string | null
          website: string | null
          joined_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          username?: string | null
          bio?: string | null
          avatar_url?: string | null
          languages_learning?: string[] | null
          languages_native?: string[] | null
          location?: string | null
          website?: string | null
        }
        Update: {
          full_name?: string | null
          username?: string | null
          bio?: string | null
          avatar_url?: string | null
          languages_learning?: string[] | null
          languages_native?: string[] | null
          location?: string | null
          website?: string | null
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string | null
          type: "poetry" | "literature" | "resource" | "cultural" | "general"
          language: string | null
          tags: string[] | null
          author_id: string
          status: "draft" | "published" | "archived"
          likes_count: number
          comments_count: number
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          content: string
          excerpt?: string | null
          type: "poetry" | "literature" | "resource" | "cultural" | "general"
          language?: string | null
          tags?: string[] | null
          author_id: string
          status?: "draft" | "published" | "archived"
        }
        Update: {
          title?: string
          content?: string
          excerpt?: string | null
          type?: "poetry" | "literature" | "resource" | "cultural" | "general"
          language?: string | null
          tags?: string[] | null
          status?: "draft" | "published" | "archived"
        }
      }
      wiki_pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          language: string
          category: "grammar" | "vocabulary" | "culture" | "pronunciation" | "writing" | "general"
          tags: string[] | null
          created_by: string
          last_edited_by: string
          version: number
          status: "draft" | "published" | "archived"
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          slug: string
          content: string
          language: string
          category: "grammar" | "vocabulary" | "culture" | "pronunciation" | "writing" | "general"
          tags?: string[] | null
          created_by: string
          last_edited_by: string
        }
        Update: {
          title?: string
          content?: string
          category?: "grammar" | "vocabulary" | "culture" | "pronunciation" | "writing" | "general"
          tags?: string[] | null
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string
          event_time: string
          duration_hours: number | null
          location: string
          type: "poetry" | "literature" | "exchange" | "cultural" | "workshop"
          languages: string[] | null
          max_attendees: number | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          description: string
          event_date: string
          event_time: string
          duration_hours?: number | null
          location: string
          type: "poetry" | "literature" | "exchange" | "cultural" | "workshop"
          languages?: string[] | null
          max_attendees?: number | null
          created_by: string
        }
      }
    }
  }
}
