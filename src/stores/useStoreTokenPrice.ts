import { create } from 'zustand'
import { baseTokenPriceInUSDTypes } from '@/class/FundFactory'

export interface StoreTokenPriceType {
  tokenPriceList: baseTokenPriceInUSDTypes[]
  update: (tokenPriceList: baseTokenPriceInUSDTypes[]) => void
}

export const useStoreTokenPrice = create<StoreTokenPriceType>((set) => ({
  tokenPriceList: [],
  update: (tokenPriceList: baseTokenPriceInUSDTypes[]) => set({ tokenPriceList })
}))
