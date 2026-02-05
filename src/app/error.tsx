'use client';

/**
 * Global Error
 * 
 * Página de error global de la aplicación
 */

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-bg-secondary p-8 rounded-lg border border-border-default text-center">
        <h2 className="text-2xl font-bold text-error mb-4">Algo salió mal</h2>
        <p className="text-text-secondary mb-6">
          Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-accent-gold text-black font-semibold rounded-lg hover:bg-accent-gold-dim transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
