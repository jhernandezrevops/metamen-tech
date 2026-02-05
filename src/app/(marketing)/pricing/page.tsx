/**
 * Pricing Page
 * 
 * Página de precios y planes
 */

import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary">Elige tu Plan</h1>
        <p className="mt-4 text-text-secondary">Inversión en tu transformación</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Plan Mensual */}
        <div className="bg-bg-secondary p-8 rounded-lg border border-border-default">
          <h2 className="text-2xl font-bold text-text-primary">Mensual</h2>
          <p className="mt-2 text-text-secondary">Flexibilidad total</p>
          <div className="mt-4">
            <span className="text-4xl font-bold text-accent-gold">$299</span>
            <span className="text-text-secondary">/mes</span>
          </div>
          <ul className="mt-6 space-y-3 text-text-secondary">
            <li>✓ Acceso completo a la plataforma</li>
            <li>✓ Avatar personalizable</li>
            <li>✓ Sistema de 5 vectores</li>
            <li>✓ 100 días de transformación</li>
            <li>✓ Judgement Night semanal</li>
            <li>✓ Economía BTC virtual</li>
            <li>✓ Arsenal de herramientas</li>
          </ul>
          <Link
            href="/register"
            className="mt-8 block w-full py-3 text-center bg-border-default text-text-primary rounded-lg hover:bg-border-strong transition-colors"
          >
            Comenzar
          </Link>
        </div>
        
        {/* Plan Anual */}
        <div className="bg-bg-secondary p-8 rounded-lg border-2 border-accent-gold relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-gold text-black text-sm font-bold rounded-full">
            MEJOR VALOR
          </span>
          <h2 className="text-2xl font-bold text-text-primary">Anual</h2>
          <p className="mt-2 text-text-secondary">2 meses gratis</p>
          <div className="mt-4">
            <span className="text-4xl font-bold text-accent-gold">$2,990</span>
            <span className="text-text-secondary">/año</span>
          </div>
          <ul className="mt-6 space-y-3 text-text-secondary">
            <li>✓ Todo lo del plan mensual</li>
            <li>✓ Ahorro de $598 al año</li>
            <li>✓ Acceso prioritario a nuevas features</li>
            <li>✓ Soporte prioritario</li>
          </ul>
          <Link
            href="/register"
            className="mt-8 block w-full py-3 text-center bg-accent-gold text-black font-semibold rounded-lg hover:bg-accent-gold-dim transition-colors"
          >
            Comenzar Ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
