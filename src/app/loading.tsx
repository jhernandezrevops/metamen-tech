/**
 * Global Loading
 * 
 * Estado de carga global de la aplicación
 */

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-gold mx-auto"></div>
        <p className="mt-4 text-text-secondary">Cargando...</p>
      </div>
    </div>
  );
}
