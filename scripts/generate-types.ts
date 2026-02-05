/**
 * Generate Supabase Types
 * 
 * Script para generar tipos TypeScript desde la base de datos de Supabase
 * @see https://supabase.com/docs/guides/api/rest/generating-types
 */

import { execSync } from 'child_process';
import { config } from 'dotenv';

// Cargar variables de entorno
config({ path: '.env.local' });

const PROJECT_ID = process.env.SUPABASE_PROJECT_ID;

if (!PROJECT_ID) {
  console.error('❌ Error: SUPABASE_PROJECT_ID not found in .env.local');
  process.exit(1);
}

console.log('🔧 Generating Supabase types...');

try {
  // Generar tipos usando Supabase CLI
  execSync(
    `npx supabase gen types typescript --project-id ${PROJECT_ID} --schema public > src/types/database.types.ts`,
    { stdio: 'inherit' }
  );

  console.log('✅ Types generated successfully!');
  console.log('📁 Output: src/types/database.types.ts');
} catch (error) {
  console.error('❌ Error generating types:', error);
  process.exit(1);
}
