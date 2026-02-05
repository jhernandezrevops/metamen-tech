/**
 * Next.js Middleware
 * 
 * Maneja la protección de rutas y la actualización de sesión de Supabase
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

/**
 * Rutas públicas que no requieren autenticación
 * @constant {string[]}
 */
const PUBLIC_ROUTES = ['/', '/login', '/register', '/forgot-password', '/about', '/pricing'];

/**
 * Rutas de API que deben ignorar el middleware de auth
 * @constant {string[]}
 */
const API_ROUTES = ['/api/webhooks'];

/**
 * Middleware principal de Next.js
 * Maneja autenticación y redirecciones
 * 
 * @param request - Request de Next.js
 * @returns NextResponse con redirección o continuar
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignorar rutas de API webhooks
  if (API_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Verificar si es ruta pública
  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith('/auth/')
  );

  // Actualizar sesión de Supabase
  const { supabaseResponse, user } = await updateSession(request);

  // Redirigir a login si intenta acceder a ruta protegida sin sesión
  if (!isPublicRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirigir a dashboard si ya está autenticado e intenta acceder a login/register
  if (isPublicRoute && user && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
