import { create } from 'zustand';
import type { AdminSession } from '../api/auth';

interface AuthState {
  admin: AdminSession | null;
  setAdmin: (admin: AdminSession) => void;
  clearAdmin: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  setAdmin: (admin) => set({ admin }),
  clearAdmin: () => set({ admin: null }),
}));
