/**
 * Not Found (404)
 * 
 * Página 404 - Recurso no encontrado
 */

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-bg-secondary p-8 rounded-lg border border-border-default text-center">
        <h2 className="text-4xl font-bold text-accent-gold mb-4">404</h2>
        <h3 className="text-xl font-semibold text-text-primary mb-4">
          Página no encontrada
        </h3>
        <p className="text-text-secondary mb-6">
          El recurso que buscas no existe o ha sido movido.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-accent-gold text-black font-semibold rounded-lg hover:bg-accent-gold-dim transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
