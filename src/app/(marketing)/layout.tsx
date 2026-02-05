/**
 * Marketing Layout
 * 
 * Layout para páginas públicas de marketing
 */

import type { ReactNode } from 'react';

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="bg-bg-secondary border-b border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-accent-gold">METAMEN100</a>
          <nav className="flex gap-6">
            <a href="/about" className="text-text-secondary hover:text-text-primary">Sobre</a>
            <a href="/pricing" className="text-text-secondary hover:text-text-primary">Precios</a>
            <a href="/login" className="text-accent-gold hover:text-accent-gold-dim">Iniciar Sesión</a>
          </nav>
        </div>
      </header>
      
      <main>{children}</main>
      
      <footer className="bg-bg-secondary border-t border-border-default py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-text-secondary">
          <p>&copy; 2025 METAMEN100. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
