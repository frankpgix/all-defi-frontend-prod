import { create } from 'zustand'
import { FundDetailProps, FundUserListDataProps } from '@/class/help'

export const useStoreFundList = create((set) => ({
  fundList: [],
  loading: true,
  getData: () => {},
  update: (fundList: FundDetailProps[], loading: boolean) => set({ fundList, loading }),
  setGetDataFunc: (func: () => void) => set({ getData: func })
}))

export const useStoreDerivativeList = create((set) => ({
  derivativeList: [],
  update: (derivativeList: any[]) => set({ derivativeList })
}))

export const useStoreManageFundList = create((set) => ({
  manageFundList: [],
  loading: true,
  getData: () => {},
  update: (manageFundList: FundDetailProps[], loading: boolean) => set({ manageFundList, loading }),
  setGetDataFunc: (func: () => void) => set({ getData: func })
}))

export const useStoreUserFundList = create((set) => ({
  fundList: [],
  loading: true,
  getData: () => {},
  update: (fundList: FundUserListDataProps[], loading: boolean) => set({ fundList, loading }),
  setGetDataFunc: (func: () => void) => set({ getData: func })
}))
