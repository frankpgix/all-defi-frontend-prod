import { create } from 'zustand'

export const useStoreFundList = create((set) => ({
  fundFist: [],
  update: (fundFist) => set({ fundFist })
}))

export const useStoreDerivativeList = create((set) => ({
  derivativeList: [],
  update: (derivativeList) => set({ derivativeList })
}))
