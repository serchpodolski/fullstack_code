import { create } from 'zustand';
import type { Diagnosis } from '../types';
import { getAll } from '../services/diagnoses';

interface DiagnoseState {
  diagnoses: Diagnosis[];
  // 1. Update the type interface to reflect the nested structural shape
  actions: {
    initialize: () => void;
  };
}

const diagnoseStore = create<DiagnoseState>((set) => ({
  diagnoses: [],
  actions: {
    initialize: () => {
      const initializeDiagnoses = async () => {
        const diagnoses = await getAll();
        set({ diagnoses });
      };
      void initializeDiagnoses();
    },
  }
}));

export const { initialize } = diagnoseStore.getState().actions;
export const useDiagnoseStore = () => diagnoseStore((state) => state.diagnoses);
export default diagnoseStore;