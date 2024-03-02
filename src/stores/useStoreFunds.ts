import { create } from 'zustand'
import { persist } from 'zustand/middleware'
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

export const useStoreManageFundVerifyList = create(
  persist(
    (set: any) => ({
      lastChangeTime: 0,
      createVerifyList: [],
      setCreateVerifyList: (createVerifyList: string[], lastChangeTime: number) =>
        set({ createVerifyList, lastChangeTime }),
      updateVerifyList: [],
      setUpdateVerifyList: (updateVerifyList: string[], lastChangeTime: number) =>
        set({ updateVerifyList, lastChangeTime })
    }),
    { name: 'StoreManageFundVerifyList' }
  )
)