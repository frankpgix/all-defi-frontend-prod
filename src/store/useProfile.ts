import { create } from 'zustand'
import tokens from '@/config/tokens'
import { resetObjectValues } from '@/utils/tools'

export const useStoreProfile = create((set) => {
  // const balances = resetObjectValues(tokens)
  // console.log(balances)
  return {
    address: '',
    isManager: false,
    update: (address: string, isManager: boolean) => {
      set({ address, isManager })
    }
  }
})

export const useStoreBalances = create((set) => ({
  balances: resetObjectValues(tokens),
  update: (balances) => set({ balances })
}))
