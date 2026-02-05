/**
 * UI Store
 * 
 * Estado global de la interfaz con Zustand
 */

import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isLoading: boolean;
  toast: {
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  };
  toggleSidebar: () => void;
  setLoading: (isLoading: boolean) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isLoading: false,
  toast: {
    message: '',
    type: 'info',
    isVisible: false,
  },
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setLoading: (isLoading) => set({ isLoading }),
  showToast: (message, type) => set({ toast: { message, type, isVisible: true } }),
  hideToast: () => set({ toast: { message: '', type: 'info', isVisible: false } }),
}));
