/**
 * Blocked Page
 * 
 * Página de trial expirado / acceso bloqueado
 */

import Link from 'next/link';

export default function BlockedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-bg-secondary p-8 rounded-lg border border-border-default text-center">
        <h1 className="text-3xl font-bold text-accent-gold mb-4">Acceso Limitado</h1>
        <p className="text-text-secondary mb-6">
          Tu período de prueba ha finalizado o tu suscripción está inactiva.
        </p>
        <Link
          href="/dashboard/store"
          className="inline-block px-6 py-3 bg-accent-gold text-black font-semibold rounded-lg hover:bg-accent-gold-dim transition-colors"
        >
          Ver Planes
        </Link>
      </div>
    </div>
  );
}
