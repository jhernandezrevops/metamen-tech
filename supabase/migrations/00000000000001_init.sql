-- ==============================================================================
-- MIgración Inicial Consolidada: Metamen100
-- Fecha: 2026-02-04
-- Contenido:
-- 1. Funciones Utilitarias
-- 2. Enums y Tipos
-- 3. Tablas
-- 4. Funciones de Negocio (Triggers & Transacciones)
-- 5. Políticas RLS (Security)
-- ==============================================================================
-- 1. FUNCIONES UTILITARIAS
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.fn_update_updated_at () returns trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language plpgsql;

-- 2. ENUMS Y TIPOS DE DATOS
-- ==============================================================================
CREATE TYPE task_type AS ENUM('protocol', 'custom');

CREATE TYPE task_status AS ENUM('pending', 'completed', 'failed', 'expired');

CREATE TYPE task_category AS ENUM(
  'meditation',
  'cold_shower',
  'reading',
  'wake_early', -- Mental
  'posture',
  'facial',
  'kegel', -- Face
  'journal',
  'skill_learning',
  'focus_work', -- Productivity
  'strength',
  'cardio',
  'hydration' -- Physical
);

CREATE TYPE task_archetype AS ENUM('mental', 'face', 'productivity', 'physical');

CREATE TYPE day_status AS ENUM('success', 'partial', 'failed', 'death');

CREATE TYPE subscription_status AS ENUM('trial', 'active', 'limbo', 'cancelled');

CREATE TYPE item_category AS ENUM(
  'armor',
  'accessories',
  'vehicles',
  'properties',
  'companions',
  'pets',
  'powerups'
);

CREATE TYPE item_rarity AS ENUM('common', 'uncommon', 'rare', 'epic', 'legendary');

CREATE TYPE image_gen_status AS ENUM(
  'pending',
  'processing',
  'completed',
  'failed',
  'retrying'
);

CREATE TYPE notification_type AS ENUM(
  'task_completed',
  'level_up',
  'streak_milestone',
  'health_warning',
  'health_critical',
  'avatar_died',
  'image_ready',
  'trial_expiring',
  'payment_failed',
  'general'
);

-- 3. TABLAS PRINCIPALES
-- ==============================================================================
-- TABLA: profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  nickname VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20) UNIQUE,
  phone_verified BOOLEAN DEFAULT FALSE,
  timezone VARCHAR(50) DEFAULT 'America/Mexico_City',
  locale VARCHAR(10) DEFAULT 'es-MX',
  base_avatar_id SMALLINT CHECK (base_avatar_id BETWEEN 1 AND 6),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step SMALLINT DEFAULT 0,
  oath_signed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_profiles_nickname ON public.profiles (nickname);

CREATE INDEX idx_profiles_phone ON public.profiles (phone)
WHERE
  phone IS NOT NULL;

CREATE TRIGGER set_profiles_updated_at before
UPDATE ON public.profiles FOR each ROW
EXECUTE function public.fn_update_updated_at ();

-- TABLA: avatar_states
CREATE TABLE public.avatar_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  aura_lvl DECIMAL(4, 2) DEFAULT 1.00 NOT NULL CHECK (aura_lvl BETWEEN 1.00 AND 13.00),
  face_lvl DECIMAL(4, 2) DEFAULT 1.00 NOT NULL CHECK (face_lvl BETWEEN 1.00 AND 13.00),
  wealth_lvl DECIMAL(4, 2) DEFAULT 1.00 NOT NULL CHECK (wealth_lvl BETWEEN 1.00 AND 13.00),
  muscle_lvl DECIMAL(4, 2) DEFAULT 1.00 NOT NULL CHECK (muscle_lvl BETWEEN 1.00 AND 13.00),
  fat_lvl DECIMAL(4, 2) DEFAULT 13.00 NOT NULL CHECK (fat_lvl BETWEEN 1.00 AND 13.00),
  env_lvl SMALLINT DEFAULT 1 NOT NULL CHECK (env_lvl BETWEEN 1 AND 13),
  health_points SMALLINT DEFAULT 10 NOT NULL CHECK (health_points BETWEEN 0 AND 13),
  max_health_points SMALLINT DEFAULT 10 NOT NULL CHECK (max_health_points BETWEEN 10 AND 13),
  current_day SMALLINT DEFAULT 1 NOT NULL CHECK (current_day >= 1),
  current_level SMALLINT DEFAULT 1 NOT NULL CHECK (current_level BETWEEN 1 AND 13),
  streak_days SMALLINT DEFAULT 0 NOT NULL CHECK (streak_days >= 0),
  max_streak_days SMALLINT DEFAULT 0 NOT NULL CHECK (max_streak_days >= 0),
  last_image_url TEXT,
  last_image_generated_at TIMESTAMPTZ,
  total_days_completed SMALLINT DEFAULT 0 NOT NULL,
  total_tasks_completed INTEGER DEFAULT 0 NOT NULL,
  death_count SMALLINT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_avatar_states_user_id ON public.avatar_states (user_id);

CREATE INDEX idx_avatar_states_current_day ON public.avatar_states (current_day);

CREATE INDEX idx_avatar_states_current_level ON public.avatar_states (current_level);

CREATE TRIGGER set_avatar_states_updated_at before
UPDATE ON public.avatar_states FOR each ROW
EXECUTE function public.fn_update_updated_at ();

-- Comentarios para avatar_states
COMMENT ON TABLE public.avatar_states IS 'Estado actual del avatar: vectores, salud, progresión';

COMMENT ON COLUMN public.avatar_states.aura_lvl IS 'Vector AURA: presencia, magnetismo (1-13, Arquetipo Mental)';

COMMENT ON COLUMN public.avatar_states.face_lvl IS 'Vector JAWLINE: definición facial (1-13, Arquetipo Cara)';

COMMENT ON COLUMN public.avatar_states.wealth_lvl IS 'Vector WEALTH: apariencia de éxito (1-13, Arquetipo Productividad)';

COMMENT ON COLUMN public.avatar_states.muscle_lvl IS 'Vector PHYSIQUE-Músculo: masa muscular (1-13, Arquetipo Físico)';

COMMENT ON COLUMN public.avatar_states.fat_lvl IS 'Vector PHYSIQUE-Grasa: grasa corporal (13=obeso → 1=definido, INVERSO)';

COMMENT ON COLUMN public.avatar_states.env_lvl IS 'Vector ENV: calidad del entorno (1-13)';

-- TABLA: wallets
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  btc_balance INTEGER DEFAULT 0 NOT NULL CHECK (btc_balance >= 0),
  total_earned INTEGER DEFAULT 0 NOT NULL,
  total_spent INTEGER DEFAULT 0 NOT NULL,
  today_earned INTEGER DEFAULT 0 NOT NULL,
  daily_cap INTEGER DEFAULT 500 NOT NULL,
  last_reset_date date DEFAULT current_date,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_wallets_user_id ON public.wallets (user_id);

CREATE TRIGGER set_wallets_updated_at before
UPDATE ON public.wallets FOR each ROW
EXECUTE function public.fn_update_updated_at ();

-- Comentarios para wallets
COMMENT ON TABLE public.wallets IS 'Balance de BTC virtual del usuario';

COMMENT ON COLUMN public.wallets.btc_balance IS 'Balance actual de BTC (moneda virtual)';

COMMENT ON COLUMN public.wallets.daily_cap IS 'Máximo de BTC ganables por día (sin bonos)';

-- TABLA: subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  status subscription_status DEFAULT 'trial' NOT NULL,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  stripe_price_id VARCHAR(255),
  trial_starts_at TIMESTAMPTZ DEFAULT NOW(),
  trial_ends_at TIMESTAMPTZ,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  limbo_started_at TIMESTAMPTZ,
  limbo_health_penalty_applied_at TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  cancelled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_subscriptions_user_id ON public.subscriptions (user_id);

CREATE TRIGGER set_subscriptions_updated_at before
UPDATE ON public.subscriptions FOR each ROW
EXECUTE function public.fn_update_updated_at ();

-- Comentarios para subscriptions
COMMENT ON TABLE public.subscriptions IS 'Estado de suscripción y datos de Stripe';

COMMENT ON COLUMN public.subscriptions.trial_ends_at IS 'El trial termina el día 6 a las 00:00';

COMMENT ON COLUMN public.subscriptions.limbo_started_at IS 'Timestamp de entrada a modo limbo';

-- TABLA: daily_tasks
CREATE TABLE public.daily_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  day_number SMALLINT NOT NULL,
  task_date date NOT NULL,
  task_type task_type NOT NULL,
  task_category task_category NOT NULL,
  task_archetype task_archetype NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  status task_status DEFAULT 'pending' NOT NULL,
  completed_at TIMESTAMPTZ,
  btc_reward SMALLINT DEFAULT 0 NOT NULL,
  vector_modifiers JSONB DEFAULT '{}',
  duration_minutes SMALLINT,
  actual_duration_minutes SMALLINT,
  tool_id VARCHAR(50),
  is_custom BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_day_category UNIQUE (user_id, day_number, task_category, task_type)
);

CREATE INDEX idx_daily_tasks_user_id ON public.daily_tasks (user_id);

CREATE INDEX idx_daily_tasks_user_day ON public.daily_tasks (user_id, day_number);

CREATE INDEX idx_daily_tasks_user_date ON public.daily_tasks (user_id, task_date);

CREATE INDEX idx_daily_tasks_status ON public.daily_tasks (status);

CREATE INDEX idx_daily_tasks_pending ON public.daily_tasks (user_id, status)
WHERE
  status = 'pending';

CREATE TRIGGER set_daily_tasks_updated_at before
UPDATE ON public.daily_tasks FOR each ROW
EXECUTE function public.fn_update_updated_at ();

-- Comentarios para daily_tasks
COMMENT ON TABLE public.daily_tasks IS 'Tareas diarias del protocolo y personalizadas';

COMMENT ON COLUMN public.daily_tasks.vector_modifiers IS 'JSON con modificadores: {"aura_lvl": 0.05}';

COMMENT ON COLUMN public.daily_tasks.tool_id IS 'Herramienta asociada: library, gym, meditation, etc.';

-- TABLA: daily_logs
CREATE TABLE public.daily_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  day_number SMALLINT NOT NULL,
  log_date date NOT NULL,
  status day_status NOT NULL,
  tasks_completed SMALLINT NOT NULL,
  tasks_total SMALLINT NOT NULL,
  completion_rate DECIMAL(5, 2) NOT NULL,
  btc_earned INTEGER DEFAULT 0 NOT NULL,
  streak_bonus INTEGER DEFAULT 0,
  day_bonus INTEGER DEFAULT 0,
  health_change SMALLINT DEFAULT 0,
  health_after SMALLINT NOT NULL,
  streak_before SMALLINT NOT NULL,
  streak_after SMALLINT NOT NULL,
  vectors_snapshot JSONB NOT NULL,
  image_url TEXT,
  image_generated_at TIMESTAMPTZ,
  closed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_day_log UNIQUE (user_id, day_number)
);

CREATE INDEX idx_daily_logs_user_id ON public.daily_logs (user_id);

CREATE INDEX idx_daily_logs_user_day ON public.daily_logs (user_id, day_number);

CREATE INDEX idx_daily_logs_date ON public.daily_logs (log_date);

CREATE INDEX idx_daily_logs_status ON public.daily_logs (status);

-- Comentarios para daily_logs
COMMENT ON TABLE public.daily_logs IS 'Registro histórico inmutable de cada día';

COMMENT ON COLUMN public.daily_logs.vectors_snapshot IS 'Snapshot de todos los vectores al cierre';

COMMENT ON COLUMN public.daily_logs.closed_at IS 'Timestamp de Judgement Night';

-- TABLA: store_items
CREATE TABLE public.store_items (
  id serial PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  category item_category NOT NULL,
  rarity item_rarity DEFAULT 'common' NOT NULL,
  price_btc INTEGER NOT NULL CHECK (price_btc >= 0),
  level_required SMALLINT DEFAULT 1 NOT NULL CHECK (level_required BETWEEN 1 AND 13),
  vector_requirements JSONB DEFAULT '{}',
  prompt_tokens TEXT,
  preview_image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_limited BOOLEAN DEFAULT FALSE,
  stock_quantity INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_store_items_category ON public.store_items (category);

CREATE INDEX idx_store_items_level ON public.store_items (level_required);

CREATE INDEX idx_store_items_active ON public.store_items (is_active)
WHERE
  is_active = TRUE;

CREATE INDEX idx_store_items_price ON public.store_items (price_btc);

CREATE TRIGGER set_store_items_updated_at before
UPDATE ON public.store_items FOR each ROW
EXECUTE function public.fn_update_updated_at ();

-- Comentarios para store_items
COMMENT ON TABLE public.store_items IS 'Catálogo de items disponibles en tienda';

COMMENT ON COLUMN public.store_items.vector_requirements IS 'Requisitos de vectores: {"fat_lvl": {"max": 5}}';

COMMENT ON COLUMN public.store_items.prompt_tokens IS 'Tokens para agregar al prompt de IA';

-- TABLA: inventory
CREATE TABLE public.inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  item_id INTEGER NOT NULL REFERENCES public.store_items (id),
  equipped BOOLEAN DEFAULT FALSE,
  locked_until_level SMALLINT,
  purchased_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  price_paid INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_item UNIQUE (user_id, item_id)
);

CREATE INDEX idx_inventory_user_id ON public.inventory (user_id);

CREATE TRIGGER set_inventory_updated_at before
UPDATE ON public.inventory FOR each ROW
EXECUTE function public.fn_update_updated_at ();

-- Comentarios para inventory
COMMENT ON TABLE public.inventory IS 'Items comprados por el usuario';

COMMENT ON COLUMN public.inventory.locked_until_level IS 'Si murió, debe alcanzar este nivel para usar el item';

-- TABLA: tool_progress
CREATE TABLE public.tool_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  tool_id VARCHAR(50) NOT NULL,
  progress_data JSONB DEFAULT '{}',
  total_sessions INTEGER DEFAULT 0,
  total_time_minutes INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ,
  current_streak SMALLINT DEFAULT 0,
  max_streak SMALLINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  CONSTRAINT unique_user_tool UNIQUE (user_id, tool_id)
);

CREATE INDEX idx_tool_progress_user_id ON public.tool_progress (user_id);

CREATE TRIGGER set_tool_progress_updated_at before
UPDATE ON public.tool_progress FOR each ROW
EXECUTE function public.fn_update_updated_at ();

-- Comentarios para tool_progress
COMMENT ON TABLE public.tool_progress IS 'Progreso del usuario en cada herramienta del arsenal';

COMMENT ON COLUMN public.tool_progress.progress_data IS 'JSON flexible con datos específicos de la herramienta';

-- TABLA: activity_logs
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address inet,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_activity_logs_user_id ON public.activity_logs (user_id);

-- Comentarios para activity_logs
COMMENT ON TABLE public.activity_logs IS 'Log de actividad para analytics y auditoría';

COMMENT ON COLUMN public.activity_logs.details IS 'JSON con detalles específicos de la acción';

-- TABLA: image_generation_queue
CREATE TABLE public.image_generation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  status image_gen_status DEFAULT 'pending' NOT NULL,
  priority SMALLINT DEFAULT 5 NOT NULL CHECK (priority BETWEEN 1 AND 10),
  day_number SMALLINT NOT NULL,
  day_status day_status,
  prompt TEXT NOT NULL,
  negative_prompt TEXT,
  generation_params JSONB DEFAULT '{}',
  result_url TEXT,
  result_metadata JSONB,
  attempts SMALLINT DEFAULT 0,
  max_attempts SMALLINT DEFAULT 3,
  last_error TEXT,
  queued_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_image_queue_user_id ON public.image_generation_queue (user_id);

CREATE TRIGGER set_image_queue_updated_at before
UPDATE ON public.image_generation_queue FOR each ROW
EXECUTE function public.fn_update_updated_at ();

-- Comentarios para image_generation_queue
COMMENT ON TABLE public.image_generation_queue IS 'Cola de generación de imágenes de avatar';

COMMENT ON COLUMN public.image_generation_queue.priority IS '1-3: Alta, 4-6: Normal, 7-10: Baja';

-- TABLA: notifications
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  type notification_type NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  data JSONB DEFAULT '{}',
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  action_url TEXT,
  action_label VARCHAR(50),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_notifications_user_id ON public.notifications (user_id);

-- Comentarios para notifications
COMMENT ON TABLE public.notifications IS 'Notificaciones in-app persistentes';

COMMENT ON COLUMN public.notifications.action_url IS 'Ruta interna o URL externa';

-- TABLA: idempotency_keys
CREATE TABLE public.idempotency_keys (
  key VARCHAR(255) PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles (id) ON DELETE CASCADE,
  action VARCHAR(100) NOT NULL,
  result JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours') NOT NULL
);

CREATE INDEX idx_idempotency_user ON public.idempotency_keys (user_id);

-- 4. FUNCIONES DE NEGOCIO (LOGICA CORE)
-- ==============================================================================
-- FUNCION: fn_handle_new_user
CREATE OR REPLACE FUNCTION public.fn_handle_new_user () returns trigger AS $$
DECLARE
  v_nickname VARCHAR(50);
  v_user_count INTEGER;
  v_trial_end TIMESTAMPTZ;
BEGIN
  SELECT COUNT(*) + 1 INTO v_user_count FROM public.profiles;
  v_nickname := 'MetaMen' || v_user_count::TEXT;
  v_trial_end := (DATE_TRUNC('day', NOW()) + INTERVAL '5 days')::TIMESTAMPTZ;

  INSERT INTO public.profiles (id, nickname, email) VALUES (NEW.id, v_nickname, NEW.email);

  INSERT INTO public.avatar_states (user_id, aura_lvl, face_lvl, wealth_lvl, muscle_lvl, fat_lvl, env_lvl, health_points, max_health_points, current_day, current_level, streak_days)
  VALUES (NEW.id, 1.00, 1.00, 1.00, 1.00, 13.00, 1, 10, 10, 1, 1, 0);

  INSERT INTO public.wallets (user_id, btc_balance) VALUES (NEW.id, 0);

  INSERT INTO public.subscriptions (user_id, status, trial_starts_at, trial_ends_at)
  VALUES (NEW.id, 'trial', NOW(), v_trial_end);

  INSERT INTO public.activity_logs (user_id, action, details)
  VALUES (NEW.id, 'user_registered', jsonb_build_object('nickname', v_nickname));

  RETURN NEW;
END;
$$ language plpgsql security definer;

CREATE TRIGGER on_auth_user_created
AFTER insert ON auth.users FOR each ROW
EXECUTE function public.fn_handle_new_user ();

-- FUNCION: fn_complete_task_transaction
CREATE OR REPLACE FUNCTION public.fn_complete_task_transaction (
  p_user_id UUID,
  p_task_id UUID,
  p_idempotency_key VARCHAR(255) DEFAULT NULL
) returns JSONB AS $$
DECLARE
  v_task RECORD;
  v_avatar RECORD;
  v_wallet RECORD;
  v_subscription RECORD;
  v_btc_reward INTEGER;
  v_streak_multiplier DECIMAL(3,2);
  v_final_reward INTEGER;
  v_vector_changes JSONB;
  v_result JSONB;
  v_existing_result JSONB;
BEGIN
  IF p_idempotency_key IS NOT NULL THEN
    SELECT result INTO v_existing_result FROM public.idempotency_keys WHERE key = p_idempotency_key AND user_id = p_user_id;
    IF FOUND THEN RETURN v_existing_result; END IF;
  END IF;

  PERFORM pg_advisory_xact_lock(hashtext(p_user_id::text || '_task'));

  SELECT * INTO v_task FROM public.daily_tasks WHERE id = p_task_id AND user_id = p_user_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Task not found'; END IF;
  IF v_task.status != 'pending' THEN RAISE EXCEPTION 'Task already processed'; END IF;

  SELECT * INTO v_avatar FROM public.avatar_states WHERE user_id = p_user_id FOR UPDATE;
  IF v_task.day_number != v_avatar.current_day THEN RAISE EXCEPTION 'Task day mismatch'; END IF;

  SELECT * INTO v_subscription FROM public.subscriptions WHERE user_id = p_user_id;
  IF v_subscription.status IN ('limbo', 'cancelled') THEN RAISE EXCEPTION 'Subscription not active'; END IF;

  v_streak_multiplier := CASE
    WHEN v_avatar.streak_days < 7 THEN 1.0
    WHEN v_avatar.streak_days < 14 THEN 1.1
    WHEN v_avatar.streak_days < 21 THEN 1.2
    WHEN v_avatar.streak_days < 30 THEN 1.3
    WHEN v_avatar.streak_days < 60 THEN 1.5
    WHEN v_avatar.streak_days < 90 THEN 1.75
    ELSE 2.0
  END;

  v_btc_reward := v_task.btc_reward;
  v_final_reward := FLOOR(v_btc_reward * v_streak_multiplier);
  v_vector_changes := COALESCE(v_task.vector_modifiers, '{}'::JSONB);

  UPDATE public.daily_tasks SET status = 'completed', completed_at = NOW(), updated_at = NOW() WHERE id = p_task_id;

  UPDATE public.avatar_states SET
    aura_lvl = LEAST(13, GREATEST(1, aura_lvl + COALESCE((v_vector_changes->>'aura_lvl')::DECIMAL, 0))),
    face_lvl = LEAST(13, GREATEST(1, face_lvl + COALESCE((v_vector_changes->>'face_lvl')::DECIMAL, 0))),
    wealth_lvl = LEAST(13, GREATEST(1, wealth_lvl + COALESCE((v_vector_changes->>'wealth_lvl')::DECIMAL, 0))),
    muscle_lvl = LEAST(13, GREATEST(1, muscle_lvl + COALESCE((v_vector_changes->>'muscle_lvl')::DECIMAL, 0))),
    fat_lvl = LEAST(13, GREATEST(1, fat_lvl + COALESCE((v_vector_changes->>'fat_lvl')::DECIMAL, 0))),
    total_tasks_completed = total_tasks_completed + 1,
    updated_at = NOW()
  WHERE user_id = p_user_id;

  UPDATE public.wallets SET
    btc_balance = btc_balance + v_final_reward,
    total_earned = total_earned + v_final_reward,
    today_earned = today_earned + v_final_reward,
    updated_at = NOW()
  WHERE user_id = p_user_id;

  INSERT INTO public.activity_logs (user_id, action, details)
  VALUES (p_user_id, 'task_completed', jsonb_build_object('task_id', p_task_id, 'btc_final', v_final_reward));

  SELECT * INTO v_avatar FROM public.avatar_states WHERE user_id = p_user_id;
  SELECT * INTO v_wallet FROM public.wallets WHERE user_id = p_user_id;

  v_result := jsonb_build_object('success', true, 'btc_earned', v_final_reward, 'new_balance', v_wallet.btc_balance);

  IF p_idempotency_key IS NOT NULL THEN
    INSERT INTO public.idempotency_keys (key, user_id, action, result) VALUES (p_idempotency_key, p_user_id, 'complete_task', v_result) ON CONFLICT (key) DO NOTHING;
  END IF;

  RETURN v_result;
EXCEPTION WHEN OTHERS THEN RAISE;
END;
$$ language plpgsql security definer;

-- FUNCION: fn_process_judgement_night
CREATE OR REPLACE FUNCTION public.fn_process_judgement_night (p_user_id UUID) returns JSONB AS $$
DECLARE
  v_avatar RECORD;
  v_subscription RECORD;
  v_tasks_completed INTEGER;
  v_tasks_total INTEGER;
  v_completion_rate DECIMAL(5,2);
  v_day_status day_status;
  v_health_change INTEGER := 0;
  v_streak_broken BOOLEAN := false;
  v_streak_before INTEGER;
  v_btc_day_bonus INTEGER := 0;
  v_btc_streak_bonus INTEGER := 0;
  v_new_health INTEGER;
  v_new_streak INTEGER;
  v_had_fitness BOOLEAN;
  v_decay_applied JSONB := '{}';
  v_vectors_snapshot JSONB;
  v_result JSONB;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(p_user_id::text || '_judgement'));

  SELECT * INTO v_avatar FROM public.avatar_states WHERE user_id = p_user_id FOR UPDATE;
  SELECT * INTO v_subscription FROM public.subscriptions WHERE user_id = p_user_id;

  SELECT COUNT(*) FILTER (WHERE status = 'completed'), COUNT(*)
  INTO v_tasks_completed, v_tasks_total
  FROM public.daily_tasks
  WHERE user_id = p_user_id AND day_number = v_avatar.current_day AND task_type = 'protocol';

  v_completion_rate := CASE WHEN v_tasks_total > 0 THEN (v_tasks_completed::DECIMAL / v_tasks_total) * 100 ELSE 0 END;

  SELECT EXISTS(SELECT 1 FROM public.daily_tasks WHERE user_id = p_user_id AND day_number = v_avatar.current_day AND task_category IN ('cardio', 'strength') AND status = 'completed') INTO v_had_fitness;

  v_streak_before := v_avatar.streak_days;

  IF v_completion_rate >= 100 THEN
    v_day_status := 'success'; v_new_streak := v_avatar.streak_days + 1; v_btc_day_bonus := 50;
  ELSIF v_completion_rate >= 80 THEN
    v_day_status := 'partial'; v_new_streak := v_avatar.streak_days + 1;
  ELSE
    v_day_status := 'failed'; v_health_change := -1; v_new_streak := 0; v_streak_broken := v_avatar.streak_days > 0;
    IF v_completion_rate = 0 THEN v_health_change := -2; END IF;
  END IF;

  IF v_new_streak = 7 THEN v_health_change := v_health_change + 1; v_btc_streak_bonus := 100;
  ELSIF v_new_streak = 14 THEN v_btc_streak_bonus := 500;
  ELSIF v_new_streak = 30 THEN v_btc_streak_bonus := 1500;
  ELSIF v_new_streak = 60 THEN v_btc_streak_bonus := 3000;
  END IF;

  v_new_health := GREATEST(0, LEAST(v_avatar.max_health_points, v_avatar.health_points + v_health_change));
  IF v_new_health = 0 THEN v_day_status := 'death'; END IF;

  IF NOT v_had_fitness THEN
    v_decay_applied := jsonb_build_object('fat_lvl', 0.02, 'muscle_lvl', -0.02);
  END IF;

  v_vectors_snapshot := jsonb_build_object('aura', v_avatar.aura_lvl, 'face', v_avatar.face_lvl, 'wealth', v_avatar.wealth_lvl);

  UPDATE public.avatar_states SET
    fat_lvl = LEAST(13, GREATEST(1, fat_lvl + COALESCE((v_decay_applied->>'fat_lvl')::DECIMAL, 0))),
    muscle_lvl = LEAST(13, GREATEST(1, muscle_lvl + COALESCE((v_decay_applied->>'muscle_lvl')::DECIMAL, 0))),
    health_points = v_new_health,
    streak_days = v_new_streak,
    max_streak_days = GREATEST(max_streak_days, v_new_streak),
    current_day = current_day + 1,
    total_days_completed = CASE WHEN v_day_status IN ('success', 'partial') THEN total_days_completed + 1 ELSE total_days_completed END,
    updated_at = NOW()
  WHERE user_id = p_user_id;

  IF v_btc_day_bonus > 0 OR v_btc_streak_bonus > 0 THEN
    UPDATE public.wallets SET btc_balance = btc_balance + v_btc_day_bonus + v_btc_streak_bonus, total_earned = total_earned + v_btc_day_bonus + v_btc_streak_bonus, updated_at = NOW() WHERE user_id = p_user_id;
  END IF;

  UPDATE public.daily_tasks SET status = 'failed', updated_at = NOW() WHERE user_id = p_user_id AND day_number = v_avatar.current_day AND status = 'pending';

  INSERT INTO public.daily_logs (user_id, day_number, log_date, status, tasks_completed, tasks_total, completion_rate, btc_earned, health_change, health_after, streak_after, vectors_snapshot)
  VALUES (p_user_id, v_avatar.current_day, CURRENT_DATE, v_day_status, v_tasks_completed, v_tasks_total, v_completion_rate, v_btc_day_bonus + v_btc_streak_bonus, v_health_change, v_new_health, v_new_streak, v_vectors_snapshot);

  INSERT INTO public.activity_logs (user_id, action, details)
  VALUES (p_user_id, 'judgement_night', jsonb_build_object('status', v_day_status));

  v_result := jsonb_build_object('success', true, 'status', v_day_status, 'new_health', v_new_health);
  RETURN v_result;

EXCEPTION WHEN OTHERS THEN RAISE;
END;
$$ language plpgsql security definer;

-- FUNCION: fn_purchase_item_transaction
CREATE OR REPLACE FUNCTION public.fn_purchase_item_transaction (
  p_user_id UUID,
  p_item_id INTEGER,
  p_idempotency_key VARCHAR(255) DEFAULT NULL
) returns JSONB AS $$
DECLARE
  v_item RECORD;
  v_wallet RECORD;
  v_result JSONB;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext(p_user_id::text || '_purchase'));
  SELECT * INTO v_item FROM public.store_items WHERE id = p_item_id AND is_active = true;
  IF NOT FOUND THEN RAISE EXCEPTION 'Item not found'; END IF;
  IF EXISTS(SELECT 1 FROM public.inventory WHERE user_id = p_user_id AND item_id = p_item_id) THEN RAISE EXCEPTION 'Item already owned'; END IF;

  SELECT * INTO v_wallet FROM public.wallets WHERE user_id = p_user_id FOR UPDATE;
  IF v_wallet.btc_balance < v_item.price_btc THEN RAISE EXCEPTION 'Insufficient balance'; END IF;

  UPDATE public.wallets SET btc_balance = btc_balance - v_item.price_btc, total_spent = total_spent + v_item.price_btc, updated_at = NOW() WHERE user_id = p_user_id;
  INSERT INTO public.inventory (user_id, item_id, price_paid) VALUES (p_user_id, p_item_id, v_item.price_btc);

  INSERT INTO public.activity_logs (user_id, action, details) VALUES (p_user_id, 'item_purchased', jsonb_build_object('item_name', v_item.name));

  v_result := jsonb_build_object('success', true, 'new_balance', v_wallet.btc_balance - v_item.price_btc);
  RETURN v_result;
EXCEPTION WHEN OTHERS THEN RAISE;
END;
$$ language plpgsql security definer;

-- 5. POLITICAS RLS (SECURITY)
-- ==============================================================================
ALTER TABLE public.profiles enable ROW level security;

ALTER TABLE public.avatar_states enable ROW level security;

ALTER TABLE public.wallets enable ROW level security;

ALTER TABLE public.subscriptions enable ROW level security;

ALTER TABLE public.daily_tasks enable ROW level security;

ALTER TABLE public.daily_logs enable ROW level security;

ALTER TABLE public.store_items enable ROW level security;

ALTER TABLE public.inventory enable ROW level security;

ALTER TABLE public.tool_progress enable ROW level security;

ALTER TABLE public.activity_logs enable ROW level security;

ALTER TABLE public.image_generation_queue enable ROW level security;

ALTER TABLE public.notifications enable ROW level security;

ALTER TABLE public.idempotency_keys enable ROW level security;

CREATE POLICY "profiles_select_own" ON public.profiles FOR
SELECT
  USING (auth.uid () = id);

CREATE POLICY "profiles_update_own" ON public.profiles
FOR UPDATE
  USING (auth.uid () = id);

CREATE POLICY "avatar_states_select_own" ON public.avatar_states FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "wallets_select_own" ON public.wallets FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "subscriptions_select_own" ON public.subscriptions FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "daily_tasks_select_own" ON public.daily_tasks FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "daily_tasks_insert_own" ON public.daily_tasks FOR insert
WITH
  CHECK (
    auth.uid () = user_id
    AND task_type = 'custom'
  );

CREATE POLICY "daily_tasks_update_own" ON public.daily_tasks
FOR UPDATE
  USING (auth.uid () = user_id);

CREATE POLICY "daily_logs_select_own" ON public.daily_logs FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "store_items_select_active" ON public.store_items FOR
SELECT
  USING (is_active = TRUE);

CREATE POLICY "inventory_select_own" ON public.inventory FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "inventory_update_own" ON public.inventory
FOR UPDATE
  USING (auth.uid () = user_id);

CREATE POLICY "tool_progress_select_own" ON public.tool_progress FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "tool_progress_insert_own" ON public.tool_progress FOR insert
WITH
  CHECK (auth.uid () = user_id);

CREATE POLICY "tool_progress_update_own" ON public.tool_progress
FOR UPDATE
  USING (auth.uid () = user_id);

CREATE POLICY "activity_logs_select_own" ON public.activity_logs FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "image_queue_select_own" ON public.image_generation_queue FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "notifications_select_own" ON public.notifications FOR
SELECT
  USING (auth.uid () = user_id);

CREATE POLICY "notifications_update_own" ON public.notifications
FOR UPDATE
  USING (auth.uid () = user_id);

CREATE POLICY "notifications_delete_own" ON public.notifications FOR delete USING (auth.uid () = user_id);

CREATE POLICY "idempotency_select_own" ON public.idempotency_keys FOR
SELECT
  USING (auth.uid () = user_id);

-- ============================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- ============================================
-- Índice para búsqueda de usuarios por trial expirando
CREATE INDEX if NOT EXISTS idx_subscriptions_trial_expiring ON public.subscriptions (trial_ends_at)
WHERE
  status = 'trial'
  AND trial_ends_at IS NOT NULL;

-- Índice para usuarios en limbo
CREATE INDEX if NOT EXISTS idx_subscriptions_limbo ON public.subscriptions (limbo_started_at)
WHERE
  status = 'limbo';

-- Índice para tareas pendientes del día actual
CREATE INDEX if NOT EXISTS idx_daily_tasks_today_pending ON public.daily_tasks (user_id, day_number, status)
WHERE
  status = 'pending';

-- Índice para ranking de usuarios por nivel
CREATE INDEX if NOT EXISTS idx_avatar_states_leaderboard ON public.avatar_states (current_level DESC, streak_days DESC);

-- Índice para generación de imágenes pendientes
CREATE INDEX if NOT EXISTS idx_image_queue_worker ON public.image_generation_queue (status, priority, queued_at)
WHERE
  status IN ('pending', 'retrying');

-- Índice para notificaciones no leídas
CREATE INDEX if NOT EXISTS idx_notifications_unread_count ON public.notifications (user_id)
WHERE
  is_read = FALSE;

-- Índice parcial para items equipados
CREATE INDEX if NOT EXISTS idx_inventory_equipped_items ON public.inventory (user_id, item_id)
WHERE
  equipped = TRUE;

-- Índice para limpieza de idempotency keys
CREATE INDEX if NOT EXISTS idx_idempotency_cleanup ON public.idempotency_keys (expires_at);
