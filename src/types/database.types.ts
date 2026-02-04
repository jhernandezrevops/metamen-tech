export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      avatar_states: {
        Row: {
          aura_lvl: number
          created_at: string
          current_day: number
          current_level: number
          death_count: number
          env_lvl: number
          face_lvl: number
          fat_lvl: number
          health_points: number
          id: string
          last_image_generated_at: string | null
          last_image_url: string | null
          max_health_points: number
          max_streak_days: number
          muscle_lvl: number
          streak_days: number
          total_days_completed: number
          total_tasks_completed: number
          updated_at: string
          user_id: string
          wealth_lvl: number
        }
        Insert: {
          aura_lvl?: number
          created_at?: string
          current_day?: number
          current_level?: number
          death_count?: number
          env_lvl?: number
          face_lvl?: number
          fat_lvl?: number
          health_points?: number
          id?: string
          last_image_generated_at?: string | null
          last_image_url?: string | null
          max_health_points?: number
          max_streak_days?: number
          muscle_lvl?: number
          streak_days?: number
          total_days_completed?: number
          total_tasks_completed?: number
          updated_at?: string
          user_id: string
          wealth_lvl?: number
        }
        Update: {
          aura_lvl?: number
          created_at?: string
          current_day?: number
          current_level?: number
          death_count?: number
          env_lvl?: number
          face_lvl?: number
          fat_lvl?: number
          health_points?: number
          id?: string
          last_image_generated_at?: string | null
          last_image_url?: string | null
          max_health_points?: number
          max_streak_days?: number
          muscle_lvl?: number
          streak_days?: number
          total_days_completed?: number
          total_tasks_completed?: number
          updated_at?: string
          user_id?: string
          wealth_lvl?: number
        }
        Relationships: [
          {
            foreignKeyName: "avatar_states_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_logs: {
        Row: {
          btc_earned: number
          closed_at: string
          completion_rate: number
          created_at: string
          day_bonus: number | null
          day_number: number
          health_after: number
          health_change: number | null
          id: string
          image_generated_at: string | null
          image_url: string | null
          log_date: string
          status: Database["public"]["Enums"]["day_status"]
          streak_after: number
          streak_before: number
          streak_bonus: number | null
          tasks_completed: number
          tasks_total: number
          user_id: string
          vectors_snapshot: Json
        }
        Insert: {
          btc_earned?: number
          closed_at?: string
          completion_rate: number
          created_at?: string
          day_bonus?: number | null
          day_number: number
          health_after: number
          health_change?: number | null
          id?: string
          image_generated_at?: string | null
          image_url?: string | null
          log_date: string
          status: Database["public"]["Enums"]["day_status"]
          streak_after: number
          streak_before: number
          streak_bonus?: number | null
          tasks_completed: number
          tasks_total: number
          user_id: string
          vectors_snapshot: Json
        }
        Update: {
          btc_earned?: number
          closed_at?: string
          completion_rate?: number
          created_at?: string
          day_bonus?: number | null
          day_number?: number
          health_after?: number
          health_change?: number | null
          id?: string
          image_generated_at?: string | null
          image_url?: string | null
          log_date?: string
          status?: Database["public"]["Enums"]["day_status"]
          streak_after?: number
          streak_before?: number
          streak_bonus?: number | null
          tasks_completed?: number
          tasks_total?: number
          user_id?: string
          vectors_snapshot?: Json
        }
        Relationships: [
          {
            foreignKeyName: "daily_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_tasks: {
        Row: {
          actual_duration_minutes: number | null
          btc_reward: number
          completed_at: string | null
          created_at: string
          day_number: number
          description: string | null
          duration_minutes: number | null
          id: string
          is_custom: boolean | null
          status: Database["public"]["Enums"]["task_status"]
          task_archetype: Database["public"]["Enums"]["task_archetype"]
          task_category: Database["public"]["Enums"]["task_category"]
          task_date: string
          task_type: Database["public"]["Enums"]["task_type"]
          title: string
          tool_id: string | null
          updated_at: string
          user_id: string
          vector_modifiers: Json | null
        }
        Insert: {
          actual_duration_minutes?: number | null
          btc_reward?: number
          completed_at?: string | null
          created_at?: string
          day_number: number
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_custom?: boolean | null
          status?: Database["public"]["Enums"]["task_status"]
          task_archetype: Database["public"]["Enums"]["task_archetype"]
          task_category: Database["public"]["Enums"]["task_category"]
          task_date: string
          task_type: Database["public"]["Enums"]["task_type"]
          title: string
          tool_id?: string | null
          updated_at?: string
          user_id: string
          vector_modifiers?: Json | null
        }
        Update: {
          actual_duration_minutes?: number | null
          btc_reward?: number
          completed_at?: string | null
          created_at?: string
          day_number?: number
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_custom?: boolean | null
          status?: Database["public"]["Enums"]["task_status"]
          task_archetype?: Database["public"]["Enums"]["task_archetype"]
          task_category?: Database["public"]["Enums"]["task_category"]
          task_date?: string
          task_type?: Database["public"]["Enums"]["task_type"]
          title?: string
          tool_id?: string | null
          updated_at?: string
          user_id?: string
          vector_modifiers?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      idempotency_keys: {
        Row: {
          action: string
          created_at: string
          expires_at: string
          key: string
          result: Json | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string
          expires_at?: string
          key: string
          result?: Json | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string
          expires_at?: string
          key?: string
          result?: Json | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "idempotency_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      image_generation_queue: {
        Row: {
          attempts: number | null
          completed_at: string | null
          created_at: string
          day_number: number
          day_status: Database["public"]["Enums"]["day_status"] | null
          generation_params: Json | null
          id: string
          last_error: string | null
          max_attempts: number | null
          negative_prompt: string | null
          priority: number
          prompt: string
          queued_at: string
          result_metadata: Json | null
          result_url: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["image_gen_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string
          day_number: number
          day_status?: Database["public"]["Enums"]["day_status"] | null
          generation_params?: Json | null
          id?: string
          last_error?: string | null
          max_attempts?: number | null
          negative_prompt?: string | null
          priority?: number
          prompt: string
          queued_at?: string
          result_metadata?: Json | null
          result_url?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["image_gen_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          attempts?: number | null
          completed_at?: string | null
          created_at?: string
          day_number?: number
          day_status?: Database["public"]["Enums"]["day_status"] | null
          generation_params?: Json | null
          id?: string
          last_error?: string | null
          max_attempts?: number | null
          negative_prompt?: string | null
          priority?: number
          prompt?: string
          queued_at?: string
          result_metadata?: Json | null
          result_url?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["image_gen_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "image_generation_queue_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          created_at: string
          equipped: boolean | null
          id: string
          item_id: number
          locked_until_level: number | null
          price_paid: number
          purchased_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          equipped?: boolean | null
          id?: string
          item_id: number
          locked_until_level?: number | null
          price_paid: number
          purchased_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          equipped?: boolean | null
          id?: string
          item_id?: number
          locked_until_level?: number | null
          price_paid?: number
          purchased_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_label: string | null
          action_url: string | null
          created_at: string
          data: Json | null
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string
          read_at: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          read_at?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          action_label?: string | null
          action_url?: string | null
          created_at?: string
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          read_at?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          base_avatar_id: number | null
          created_at: string
          email: string | null
          id: string
          locale: string | null
          nickname: string
          oath_signed_at: string | null
          onboarding_completed: boolean | null
          onboarding_step: number | null
          phone: string | null
          phone_verified: boolean | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          base_avatar_id?: number | null
          created_at?: string
          email?: string | null
          id: string
          locale?: string | null
          nickname: string
          oath_signed_at?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone?: string | null
          phone_verified?: boolean | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          base_avatar_id?: number | null
          created_at?: string
          email?: string | null
          id?: string
          locale?: string | null
          nickname?: string
          oath_signed_at?: string | null
          onboarding_completed?: boolean | null
          onboarding_step?: number | null
          phone?: string | null
          phone_verified?: boolean | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      store_items: {
        Row: {
          category: Database["public"]["Enums"]["item_category"]
          created_at: string
          description: string | null
          id: number
          is_active: boolean | null
          is_limited: boolean | null
          level_required: number
          name: string
          preview_image_url: string | null
          price_btc: number
          prompt_tokens: string | null
          rarity: Database["public"]["Enums"]["item_rarity"]
          slug: string
          sort_order: number | null
          stock_quantity: number | null
          updated_at: string
          vector_requirements: Json | null
        }
        Insert: {
          category: Database["public"]["Enums"]["item_category"]
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
          is_limited?: boolean | null
          level_required?: number
          name: string
          preview_image_url?: string | null
          price_btc: number
          prompt_tokens?: string | null
          rarity?: Database["public"]["Enums"]["item_rarity"]
          slug: string
          sort_order?: number | null
          stock_quantity?: number | null
          updated_at?: string
          vector_requirements?: Json | null
        }
        Update: {
          category?: Database["public"]["Enums"]["item_category"]
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean | null
          is_limited?: boolean | null
          level_required?: number
          name?: string
          preview_image_url?: string | null
          price_btc?: number
          prompt_tokens?: string | null
          rarity?: Database["public"]["Enums"]["item_rarity"]
          slug?: string
          sort_order?: number | null
          stock_quantity?: number | null
          updated_at?: string
          vector_requirements?: Json | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean | null
          cancelled_at: string | null
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          limbo_health_penalty_applied_at: string | null
          limbo_started_at: string | null
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_price_id: string | null
          stripe_subscription_id: string | null
          trial_ends_at: string | null
          trial_starts_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          limbo_health_penalty_applied_at?: string | null
          limbo_started_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          trial_starts_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean | null
          cancelled_at?: string | null
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          limbo_health_penalty_applied_at?: string | null
          limbo_started_at?: string | null
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_price_id?: string | null
          stripe_subscription_id?: string | null
          trial_ends_at?: string | null
          trial_starts_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tool_progress: {
        Row: {
          created_at: string
          current_streak: number | null
          id: string
          last_used_at: string | null
          max_streak: number | null
          progress_data: Json | null
          tool_id: string
          total_sessions: number | null
          total_time_minutes: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_used_at?: string | null
          max_streak?: number | null
          progress_data?: Json | null
          tool_id: string
          total_sessions?: number | null
          total_time_minutes?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number | null
          id?: string
          last_used_at?: string | null
          max_streak?: number | null
          progress_data?: Json | null
          tool_id?: string
          total_sessions?: number | null
          total_time_minutes?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tool_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          btc_balance: number
          created_at: string
          daily_cap: number
          id: string
          last_reset_date: string | null
          today_earned: number
          total_earned: number
          total_spent: number
          updated_at: string
          user_id: string
        }
        Insert: {
          btc_balance?: number
          created_at?: string
          daily_cap?: number
          id?: string
          last_reset_date?: string | null
          today_earned?: number
          total_earned?: number
          total_spent?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          btc_balance?: number
          created_at?: string
          daily_cap?: number
          id?: string
          last_reset_date?: string | null
          today_earned?: number
          total_earned?: number
          total_spent?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_complete_task_transaction: {
        Args: {
          p_user_id: string
          p_task_id: string
          p_idempotency_key?: string
        }
        Returns: Json
      }
      fn_process_judgement_night: {
        Args: {
          p_user_id: string
        }
        Returns: Json
      }
      fn_purchase_item_transaction: {
        Args: {
          p_user_id: string
          p_item_id: number
          p_idempotency_key?: string
        }
        Returns: Json
      }
    }
    Enums: {
      day_status: "success" | "partial" | "failed" | "death"
      image_gen_status:
        | "pending"
        | "processing"
        | "completed"
        | "failed"
        | "retrying"
      item_category:
        | "armor"
        | "accessories"
        | "vehicles"
        | "properties"
        | "companions"
        | "pets"
        | "powerups"
      item_rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
      notification_type:
        | "task_completed"
        | "level_up"
        | "streak_milestone"
        | "health_warning"
        | "health_critical"
        | "avatar_died"
        | "image_ready"
        | "trial_expiring"
        | "payment_failed"
        | "general"
      subscription_status: "trial" | "active" | "limbo" | "cancelled"
      task_archetype: "mental" | "face" | "productivity" | "physical"
      task_category:
        | "meditation"
        | "cold_shower"
        | "reading"
        | "wake_early"
        | "posture"
        | "facial"
        | "kegel"
        | "journal"
        | "skill_learning"
        | "focus_work"
        | "strength"
        | "cardio"
        | "hydration"
      task_status: "pending" | "completed" | "failed" | "expired"
      task_type: "protocol" | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

