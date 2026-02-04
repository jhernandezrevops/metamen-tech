/**
 * Landing Page - METAMEN100
 *
 * @module app/page
 * @description Página principal de landing para METAMEN100
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'METAMEN100 - Inicio',
};

/**
 * Componente principal de la landing page
 * @returns {JSX.Element} Página de inicio
 */
export default function HomePage(): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-primary">
      <div className="space-y-6 text-center">
        <h1 className="animate-glow text-5xl font-bold text-accent-gold">METAMEN100</h1>
        <p className="mx-auto max-w-md text-xl text-text-secondary">
          Sistema Operativo de Conducta - Espejo Bio-Digital
        </p>
        <p className="text-sm text-text-tertiary">Próximamente...</p>
      </div>
    </main>
  );
}
