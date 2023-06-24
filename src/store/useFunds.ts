import { create } from 'zustand'

export const useStoreFundList = create((set) => ({
  fundFist: [],
  update: (fundFist) => set({ fundFist })
}))
