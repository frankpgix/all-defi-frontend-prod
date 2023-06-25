import { create } from 'zustand'

export const useStoreFundList = create((set) => ({
  fundFist: [],
  update: (fundFist: any[]) => set({ fundFist })
}))

export const useStoreDerivativeList = create((set) => ({
  derivativeList: [],
  update: (derivativeList: any[]) => set({ derivativeList })
}))
