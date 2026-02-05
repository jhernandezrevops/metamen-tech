/**
 * API Types
 * 
 * Tipos para respuestas y requests de API
 */

// Respuestas genéricas
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

// Auth
export interface AuthResponse {
  user: {
    id: string;
    email: string;
    phone?: string;
  };
  session: {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  };
}

// Tasks
export interface CompleteTaskRequest {
  taskId: string;
  userId: string;
}

export interface CompleteTaskResponse {
  task: {
    id: string;
    completed: boolean;
    completedAt: string;
  };
  rewards: {
    btcEarned: number;
    vectorChanges: Record<string, number>;
  };
  newAvatarState: {
    level: number;
    health: number;
    vectors: Record<string, number>;
  };
}

// Store
export interface PurchaseItemRequest {
  itemId: string;
  userId: string;
}

export interface PurchaseItemResponse {
  item: {
    id: string;
    name: string;
  };
  inventoryItem: {
    id: string;
    equipped: boolean;
    acquiredAt: string;
  };
  wallet: {
    btcBalance: number;
  };
}
