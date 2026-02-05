/**
 * Dashboard Page
 * 
 * Página principal del dashboard protegido
 */

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="mt-2 text-text-secondary">
          Bienvenido a tu Sistema Operativo de Conducta
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Placeholder para estadísticas */}
        <div className="bg-bg-secondary p-6 rounded-lg border border-border-default">
          <h3 className="text-lg font-semibold text-text-primary">Nivel</h3>
          <p className="text-3xl font-bold text-accent-gold mt-2">1</p>
        </div>
        
        <div className="bg-bg-secondary p-6 rounded-lg border border-border-default">
          <h3 className="text-lg font-semibold text-text-primary">BTC</h3>
          <p className="text-3xl font-bold text-accent-gold mt-2">0.00</p>
        </div>
        
        <div className="bg-bg-secondary p-6 rounded-lg border border-border-default">
          <h3 className="text-lg font-semibold text-text-primary">Racha</h3>
          <p className="text-3xl font-bold text-accent-gold mt-2">0 días</p>
        </div>
      </div>
      
      <div className="bg-bg-secondary p-6 rounded-lg border border-border-default">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Vectores</h3>
        <p className="text-text-secondary">
          Visualización de vectores - Implementación pendiente (Cajas posteriores)
        </p>
      </div>
    </div>
  );
}
