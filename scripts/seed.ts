// scripts/seed.ts
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Cargar variables de entorno
config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function seedStoreItems() {
  console.log('🌱 Seeding store items...');

  const storeItems = [
    // Armadura - Nivel 1-2
    {
      name: 'Harapos de Superviviente',
      description: 'Ropa desgastada pero funcional',
      category: 'armor',
      rarity: 'common',
      price_btc: 0,
      level_required: 1,
      vector_effects: null,
      duration_days: null,
    },
    // Boosters
    {
      name: 'Proteína de Emergencia',
      description: '+20% PHYSIQUE por 24h',
      category: 'booster',
      rarity: 'common',
      price_btc: 50,
      level_required: 1,
      vector_effects: { PHYSIQUE: 20 },
      duration_days: 1,
    },
    {
      name: 'Café de Desarrollador',
      description: '+15% WEALTH por 12h',
      category: 'booster',
      rarity: 'common',
      price_btc: 30,
      level_required: 1,
      vector_effects: { WEALTH: 15 },
      duration_days: 1,
    },
    {
      name: 'Meditación Guiada Premium',
      description: '+25% AURA por 24h',
      category: 'booster',
      rarity: 'uncommon',
      price_btc: 100,
      level_required: 3,
      vector_effects: { AURA: 25 },
      duration_days: 1,
    },
    // Cosméticos
    {
      name: 'Tatuaje Dorado',
      description: 'Marcas de guerra brillantes',
      category: 'cosmetic',
      rarity: 'rare',
      price_btc: 500,
      level_required: 5,
      vector_effects: null,
      duration_days: null,
    },
    {
      name: 'Aura de Campeón',
      description: 'Resplandor dorado permanente',
      category: 'cosmetic',
      rarity: 'epic',
      price_btc: 2000,
      level_required: 10,
      vector_effects: null,
      duration_days: null,
    },
  ];

  for (const item of storeItems) {
    const { error } = await supabase.from('store_items').insert(item);
    if (error) {
      console.error(`Error inserting ${item.name}:`, error);
    } else {
      console.log(`✅ Inserted: ${item.name}`);
    }
  }

  console.log('✅ Store items seeded successfully');
}

async function seedDailyTasks() {
  console.log('🌱 Seeding daily tasks...');

  const tasks = [
    // WEALTH
    {
      title: 'Completar 3 tareas prioritarias',
      description: 'Termina tus 3 tareas más importantes del día',
      category: 'WEALTH',
      btc_reward: 10,
      vector_impact: { WEALTH: 5 },
      is_custom: false,
    },
    {
      title: 'Trabajo Profundo 90 min',
      description: '90 minutos de focus sin distracciones',
      category: 'WEALTH',
      btc_reward: 15,
      vector_impact: { WEALTH: 8 },
      is_custom: false,
    },
    // PHYSIQUE
    {
      title: 'Entrenamiento de Fuerza',
      description: '45 minutos de levantamiento de pesas',
      category: 'PHYSIQUE',
      btc_reward: 15,
      vector_impact: { PHYSIQUE: 10 },
      is_custom: false,
    },
    {
      title: 'Cardio 30 min',
      description: 'Correr, nadar o bicicleta',
      category: 'PHYSIQUE',
      btc_reward: 10,
      vector_impact: { PHYSIQUE: 6 },
      is_custom: false,
    },
    // AURA
    {
      title: 'Meditación 20 min',
      description: 'Meditación guiada o mindfulness',
      category: 'AURA',
      btc_reward: 10,
      vector_impact: { AURA: 8 },
      is_custom: false,
    },
    {
      title: 'Lectura 30 min',
      description: 'Leer libro de desarrollo personal',
      category: 'AURA',
      btc_reward: 8,
      vector_impact: { AURA: 5 },
      is_custom: false,
    },
    // JAWLINE
    {
      title: 'Práctica de Comunicación',
      description: 'Grabar 5 minutos de discurso',
      category: 'JAWLINE',
      btc_reward: 8,
      vector_impact: { JAWLINE: 5 },
      is_custom: false,
    },
    // ENV
    {
      title: 'Limpieza del Espacio',
      description: 'Organizar y limpiar tu espacio de trabajo',
      category: 'ENV',
      btc_reward: 8,
      vector_impact: { ENV: 5 },
      is_custom: false,
    },
  ];

  for (const task of tasks) {
    const { error } = await supabase.from('daily_tasks').insert(task);
    if (error) {
      console.error(`Error inserting task ${task.title}:`, error);
    } else {
      console.log(`✅ Inserted task: ${task.title}`);
    }
  }

  console.log('✅ Daily tasks seeded successfully');
}

async function main() {
  console.log('🚀 Starting database seed...\n');

  try {
    await seedStoreItems();
    console.log('');
    await seedDailyTasks();
    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main();
