/**
 * Supabase Client - Browser
 * 
 * Cliente de Supabase para uso en el navegador
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 * 
 * @returns Cliente de Supabase tipado para el browser
 * @throws {Error} Si las variables de entorno no están configuradas
 */

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database.types';

/**
 * Crea un cliente de Supabase para uso en el navegador
 * Valida que las variables de entorno requeridas estén configuradas
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
