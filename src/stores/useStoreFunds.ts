import { create } from 'zustand'
import { FundDetailProps } from '@/class/help'

export const useStoreFundList = create((set) => ({
  fundFist: [],
  update: (fundFist: any[]) => set({ fundFist })
}))

export const useStoreDerivativeList = create((set) => ({
  derivativeList: [],
  update: (derivativeList: any[]) => set({ derivativeList })
}))

export const useStoreManageFundList = create((set) => ({
  manageFundFist: [],
  loading: true,
  getData: () => {},
  update: (manageFundFist: FundDetailProps[], loading: boolean) => set({ manageFundFist, loading }),
  setGetDataFunc: (func: () => void) => set({ getData: func })
}))
