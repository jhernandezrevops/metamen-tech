import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'METAMEN100 - Sistema Operativo de Conducta',
  description: 'Espejo Bio-Digital de alto rendimiento para hombres. Transforma tu disciplina diaria en evolución visual inmediata.',
  keywords: ['productividad', 'disciplina', 'desarrollo personal', 'gamificación', 'hábitos'],
  authors: [{ name: 'METAMEN100' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#0A0A0B',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="es">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
