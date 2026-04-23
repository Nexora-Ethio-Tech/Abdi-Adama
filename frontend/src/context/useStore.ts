
import { create } from 'zustand';

interface AppState {
  // Exam Lockdown
  isExamLockedDown: boolean;
  lockdownPassword: string | null;
  setExamLockedDown: (isLocked: boolean, password?: string) => void;

  // Branch Selection
  selectedBranchId: string | null;
  setSelectedBranchId: (id: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  isExamLockedDown: false,
  lockdownPassword: null,
  setExamLockedDown: (isLocked, password) => set({
    isExamLockedDown: isLocked,
    lockdownPassword: password || null
  }),

  selectedBranchId: null,
  setSelectedBranchId: (id) => set({ selectedBranchId: id }),
}));
