
import { create } from 'zustand';

export const useStore = create((set) => ({
  user: {
    name: "User",
    role: "admin", 
  },
  setUserRole: (newRole) => 
    set((state) => ({ 
      user: { ...state.user, role: newRole } 
    })),
  setUser: (userData) => set({ user: userData }),
}));