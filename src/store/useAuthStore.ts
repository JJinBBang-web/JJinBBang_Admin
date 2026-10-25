import { create } from 'zustand';
import type { AdminSession } from '../api/auth';

interface AuthState {
  admin: AdminSession | null;
  accessToken: string | null;
  setAdmin: (admin: AdminSession) => void;
  clearAdmin: () => void;
  setAccessToken: (accessToken: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  accessToken: null,
  setAdmin: (admin) => set({ admin }),
  clearAdmin: () => set({ admin: null, accessToken: null }),
  setAccessToken: (accessToken) => set({ accessToken }),
}));
