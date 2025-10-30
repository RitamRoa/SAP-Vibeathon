/**
 * Supabase Database Types
 * 
 * To generate these types automatically from your Supabase schema:
 * 1. Login to Supabase CLI: npx supabase login
 * 2. Generate types: npx supabase gen types typescript --project-id xteipiminuoezjdaqhcz > lib/supabase/types.ts
 * 
 * Or manually update this file based on your database schema
 */

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
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          website: string | null
          company: string | null
          job_title: string | null
          skills: string[] | null
          interests: string[] | null
          linkedin_url: string | null
          twitter_url: string | null
          github_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          company?: string | null
          job_title?: string | null
          skills?: string[] | null
          interests?: string[] | null
          linkedin_url?: string | null
          twitter_url?: string | null
          github_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          company?: string | null
          job_title?: string | null
          skills?: string[] | null
          interests?: string[] | null
          linkedin_url?: string | null
          twitter_url?: string | null
          github_url?: string | null
        }
      }
      events: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          start_time: string
          end_time: string
          location: string | null
          type: string
          organizer_id: string
          max_attendees: number | null
          image_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          start_time: string
          end_time: string
          location?: string | null
          type: string
          organizer_id: string
          max_attendees?: number | null
          image_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          start_time?: string
          end_time?: string
          location?: string | null
          type?: string
          organizer_id?: string
          max_attendees?: number | null
          image_url?: string | null
        }
      }
      event_attendees: {
        Row: {
          id: string
          created_at: string
          event_id: string
          user_id: string
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          event_id: string
          user_id: string
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          event_id?: string
          user_id?: string
          status?: string
        }
      }
      connections: {
        Row: {
          id: string
          created_at: string
          user_id: string
          connected_user_id: string
          status: string
          message: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          connected_user_id: string
          status?: string
          message?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          connected_user_id?: string
          status?: string
          message?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          created_at: string
          sender_id: string
          receiver_id: string
          content: string
          read: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          sender_id: string
          receiver_id: string
          content: string
          read?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          read?: boolean
        }
      }
      chat_conversations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user1_id: string
          user2_id: string
          last_message: string | null
          last_message_at: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user1_id: string
          user2_id: string
          last_message?: string | null
          last_message_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user1_id?: string
          user2_id?: string
          last_message?: string | null
          last_message_at?: string | null
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
  }
}

// Helper types for easier usage
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type EventAttendee = Database['public']['Tables']['event_attendees']['Row']
export type Connection = Database['public']['Tables']['connections']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
export type ChatConversation = Database['public']['Tables']['chat_conversations']['Row']
