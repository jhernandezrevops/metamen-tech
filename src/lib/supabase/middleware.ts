/**
 * Supabase Middleware
 * 
 * Cliente de Supabase para uso en Next.js Middleware
 * Maneja la actualización de la sesión en las rutas protegidas
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs
 */

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database.types';
import type { User } from '@supabase/supabase-js';

interface UpdateSessionResult {
  supabaseResponse: NextResponse;
  user: User | null;
}

/**
 * Actualiza la sesión de Supabase en el middleware
 * Refresca tokens si es necesario y retorna el usuario actual
 * 
 * @param request - Request de Next.js
 * @returns Objeto con la respuesta y el usuario (si existe)
 */
export async function updateSession(request: NextRequest): Promise<UpdateSessionResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables in middleware');
    return {
      supabaseResponse: NextResponse.next({ request }),
      user: null,
    };
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
        });

        supabaseResponse = NextResponse.next({ request });

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  try {
    // Refrescar la sesión si expiró
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.warn('Error getting user in middleware:', error.message);
      return { supabaseResponse, user: null };
    }

    return { supabaseResponse, user };
  } catch (error) {
    console.error('Unexpected error in updateSession:', error);
    return { supabaseResponse, user: null };
  }
}
