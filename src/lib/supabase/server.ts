/**
 * Supabase Client - Server
 * 
 * Cliente de Supabase para uso en Server Actions y Route Handlers
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 * 
 * @returns Cliente de Supabase tipado para server-side
 * @throws {Error} Si las variables de entorno no están configuradas
 */

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database.types';

/**
 * Crea un cliente de Supabase para uso en Server Actions y Route Handlers
 * Incluye manejo de cookies para sesiones
 */
export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch (error) {
          // El método setAll se llamó desde un Server Component
          // Esto es esperado y se puede ignorar si el middleware refresca sesiones
          console.warn('Failed to set cookies from Server Component:', error);
        }
      },
    },
  });
}
