/**
 * Domain Types
 * 
 * Tipos del dominio de negocio de METAMEN100
 */

// Enums del sistema
export type VectorType = 'AURA' | 'JAWLINE' | 'WEALTH' | 'PHYSIQUE' | 'ENV';

export type SubscriptionStatus = 'active' | 'canceled' | 'incomplete' | 'past_due';

export type TaskCategory = 'WEALTH' | 'PHYSIQUE' | 'AURA' | 'JAWLINE' | 'ENV';

export type ItemCategory = 'BOOSTER' | 'COSMETIC' | 'FEATURE';

// Tipos de entidades
export interface Vector {
  type: VectorType;
  value: number;
  maxValue: number;
}

export interface AvatarState {
  level: number;
  health: number;
  maxHealth: number;
  vectors: Record<VectorType, Vector>;
}

export interface Wallet {
  btcBalance: number;
  totalEarned: number;
  totalSpent: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  btcReward: number;
  vectorImpact: Partial<Record<VectorType, number>>;
  completed: boolean;
}

export interface StoreItem {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  priceBtc: number;
  vectorEffects?: Partial<Record<VectorType, number>>;
  duration?: number; // en días, undefined = permanente
}
