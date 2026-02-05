/**
 * Landing Page
 * 
 * Página de inicio pública (marketing)
 */

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
            METAMEN100
          </h1>
          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Sistema Operativo de Conducta de alto rendimiento para hombres.
            <br />
            Tu espejo bio-digital. 100 días de transformación.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/register"
              className="rounded-md bg-accent-gold px-6 py-3 text-sm font-semibold text-black shadow-sm hover:bg-accent-gold-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold"
            >
              Comenzar Ahora
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-text-primary hover:text-accent-gold"
            >
              Iniciar Sesión <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              5 Vectores de Transformación
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-7xl grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: 'AURA', desc: 'Claridad mental y enfoque', color: 'text-accent-purple' },
              { name: 'JAWLINE', desc: 'Presencia y comunicación', color: 'text-accent-blue' },
              { name: 'WEALTH', desc: 'Productividad y disciplina', color: 'text-accent-green' },
              { name: 'PHYSIQUE', desc: 'Salud y vitalidad física', color: 'text-accent-red' },
              { name: 'ENV', desc: 'Entorno y conexiones', color: 'text-accent-gold' },
            ].map((vector) => (
              <div
                key={vector.name}
                className="flex flex-col items-center text-center p-6 bg-bg-primary rounded-lg border border-border-default"
              >
                <h3 className={`text-2xl font-bold ${vector.color}`}>{vector.name}</h3>
                <p className="mt-2 text-text-secondary">{vector.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
