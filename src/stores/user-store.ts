/**
 * User Store
 * 
 * Estado global del usuario con Zustand
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
  };
  isAuthenticated: boolean;
  setUser: (user: { id: string; email: string; name: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        id: null,
        email: null,
        name: null,
      },
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () =>
        set({
          user: { id: null, email: null, name: null },
          isAuthenticated: false,
        }),
    }),
    {
      name: 'user-storage',
    }
  )
);
