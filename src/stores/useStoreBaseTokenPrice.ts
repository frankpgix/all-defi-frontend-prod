import { create } from 'zustand'
import { baseTokenPriceInUSDTypes } from '@/types/vault'

export interface StoreTokenPriceType {
  baseTokenPriceList: baseTokenPriceInUSDTypes[]
  update: (tokenPriceList: baseTokenPriceInUSDTypes[]) => void
}

export const useStoreBaseTokenPrice = create<StoreTokenPriceType>((set) => ({
  baseTokenPriceList: [],
  update: (baseTokenPriceList: baseTokenPriceInUSDTypes[]) => set({ baseTokenPriceList })
}))
