/**
 * Dashboard Layout
 * 
 * Layout protegido para la aplicación principal
 */

import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="bg-bg-secondary border-b border-border-default p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-accent-gold">METAMEN100</h1>
          <nav className="flex gap-4">
            <a href="/dashboard" className="text-text-secondary hover:text-text-primary">
              Dashboard
            </a>
            <a href="/dashboard/tasks" className="text-text-secondary hover:text-text-primary">
              Tareas
            </a>
            <a href="/dashboard/store" className="text-text-secondary hover:text-text-primary">
              Tienda
            </a>
          </nav>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
