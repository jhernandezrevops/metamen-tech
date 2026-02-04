/**
 * Landing Page - METAMEN100
 * 
 * @module app/page
 * @description Página principal de landing para METAMEN100
 */

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'METAMEN100 - Inicio',
};

/**
 * Componente principal de la landing page
 * @returns {JSX.Element} Página de inicio
 */
export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-accent-gold animate-glow">
          METAMEN100
        </h1>
        <p className="text-text-secondary text-xl max-w-md mx-auto">
          Sistema Operativo de Conducta - Espejo Bio-Digital
        </p>
        <p className="text-text-tertiary text-sm">
          Próximamente...
        </p>
      </div>
    </main>
  );
}
