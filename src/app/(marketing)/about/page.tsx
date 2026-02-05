/**
 * About Page
 * 
 * Página sobre el proyecto
 */

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-text-primary mb-8">Sobre METAMEN100</h1>
      
      <div className="prose prose-invert max-w-none">
        <p className="text-text-secondary text-lg">
          METAMEN100 es un Sistema Operativo de Conducta y espejo bio-digital de alto rendimiento 
          diseñado para hombres que buscan transformación real en 100 días.
        </p>
        
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">La Misión</h2>
        <p className="text-text-secondary">
          Unificar las herramientas necesarias para el desarrollo integral del hombre moderno: 
          físico, mental, productivo y social. A través de un sistema de gamificación basado en 
          5 vectores, cada acción real se traduce en evolución visual inmediata de tu avatar digital.
        </p>
        
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">Los 5 Vectores</h2>
        <ul className="space-y-4 text-text-secondary">
          <li><strong className="text-accent-purple">AURA:</strong> Claridad mental y enfoque</li>
          <li><strong className="text-accent-blue">JAWLINE:</strong> Presencia y comunicación</li>
          <li><strong className="text-accent-green">WEALTH:</strong> Productividad y disciplina</li>
          <li><strong className="text-accent-red">PHYSIQUE:</strong> Salud y vitalidad física</li>
          <li><strong className="text-accent-gold">ENV:</strong> Entorno y conexiones</li>
        </ul>
      </div>
    </div>
  );
}
