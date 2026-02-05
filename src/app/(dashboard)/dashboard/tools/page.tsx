/**
 * Tools List Page
 * 
 * Página de listado del arsenal de herramientas
 */

import Link from 'next/link';

const tools = [
  { id: 'library', name: 'Biblioteca de Poder', description: 'Audiolibros y recursos' },
  { id: 'gym', name: 'Templo del Hierro', description: 'Rutinas de ejercicio' },
  { id: 'meditation', name: 'Cámara de Meditación', description: 'Meditaciones guiadas' },
  { id: 'journal', name: 'Bitácora de Guerra', description: 'Journaling diario' },
  { id: 'kegel', name: 'Vitalidad Sexual', description: 'Ejercicios de kegel' },
  { id: 'facial', name: 'Escultor Facial', description: 'Ejercicios faciales' },
  { id: 'hypnosis', name: 'Crea tu Hipnosis', description: 'Hipnosis personalizada [Premium]' },
  { id: 'mobility', name: 'Movilidad Táctica', description: 'Rutinas de movilidad' },
  { id: 'focus', name: 'Focus Chamber', description: 'Pomodoro y deep work' },
];

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text-primary">Arsenal de Herramientas</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/dashboard/tools/${tool.id}`}
            className="block p-6 bg-bg-secondary rounded-lg border border-border-default hover:border-accent-gold transition-colors"
          >
            <h3 className="text-lg font-semibold text-text-primary">{tool.name}</h3>
            <p className="mt-2 text-text-secondary">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
