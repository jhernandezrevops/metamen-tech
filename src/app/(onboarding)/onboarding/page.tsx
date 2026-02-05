/**
 * Onboarding Page
 * 
 * Flujo de bienvenida y configuración inicial
 */

export default function OnboardingPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-accent-gold">Bienvenido a METAMEN100</h1>
        <p className="mt-4 text-text-secondary">
          Tu transformación comienza ahora. Completa tu configuración inicial.
        </p>
      </div>
      
      <div className="bg-bg-secondary p-8 rounded-lg border border-border-default space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-accent-gold flex items-center justify-center text-black font-bold">1</div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Selecciona tu Arquetipo</h3>
            <p className="text-text-secondary text-sm">Define tu punto de partida</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-border-default flex items-center justify-center text-text-secondary font-bold">2</div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Tutorial de Vectores</h3>
            <p className="text-text-secondary text-sm">Entiende el sistema de progreso</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-border-default flex items-center justify-center text-text-secondary font-bold">3</div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Ceremonia del Juramento</h3>
            <p className="text-text-secondary text-sm">Compromiso de 100 días</p>
          </div>
        </div>
      </div>
      
      <p className="text-center text-text-secondary">
        Onboarding completo - Implementación pendiente (Caja 4)
      </p>
    </div>
  );
}
